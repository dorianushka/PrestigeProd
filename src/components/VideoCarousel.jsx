import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { hightlightsSlides } from '../constants';
import { pauseImg, playImg, replayImg } from '../utils';

gsap.registerPlugin(ScrollTrigger);

// Consistent gold colors
const GOLD = '#C9A961';
const GOLD_LIGHT = '#E8D5A3';

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  const progressAnims = useRef([]);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);
  const mouseStartX = useRef(0);
  const mouseEndX = useRef(0);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  // Handle touch events
  const handleTouchStart = e => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = e => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50; // Minimum distance required for a swipe
    const swipeDistance = touchStartX.current - touchEndX.current;

    // If swipe distance is greater than threshold
    if (Math.abs(swipeDistance) > swipeThreshold) {
      // Swiped left (next slide)
      if (swipeDistance > 0 && videoId < hightlightsSlides.length - 1) {
        handleProcess('set-video', videoId + 1);
      }
      // Swiped right (previous slide)
      else if (swipeDistance < 0 && videoId > 0) {
        handleProcess('set-video', videoId - 1);
      }
    }
  };

  // Handle mouse events for desktop swiping
  const handleMouseDown = e => {
    isDragging.current = true;
    mouseStartX.current = e.clientX;
  };

  const handleMouseMove = e => {
    if (!isDragging.current) return;
    mouseEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;

    const swipeThreshold = 50; // Same threshold as touch
    const swipeDistance = mouseStartX.current - mouseEndX.current;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      // Swiped left (next slide)
      if (swipeDistance > 0 && videoId < hightlightsSlides.length - 1) {
        handleProcess('set-video', videoId + 1);
      }
      // Swiped right (previous slide)
      else if (swipeDistance < 0 && videoId > 0) {
        handleProcess('set-video', videoId - 1);
      }
    }

    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 1.5,
      ease: 'power2.inOut',
    });

    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo(pre => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? '10vw'
                  : window.innerWidth < 1200
                  ? '10vw'
                  : '4vw',
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: 'white',
            });
          }
        },

        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: '12px',
            });
            gsap.to(span[videoId], {
              backgroundColor: '#afafaf',
            });
          }
        },
      });

      progressAnims.current[videoId] = anim;

      const tickerUpdate = () => {
        const videoEl = videoRef.current[videoId];
        if (videoEl && hightlightsSlides[videoId]) {
          anim.progress(
            videoEl.currentTime / hightlightsSlides[videoId].videoDuration,
          );
        }
      };

      gsap.ticker.add(tickerUpdate);
      anim.tickerUpdate = tickerUpdate;
    }

    return () => {
      const anim = progressAnims.current[videoId];
      if (anim) {
        anim.kill();
        if (anim.tickerUpdate) gsap.ticker.remove(anim.tickerUpdate);
      }
    };
  }, [videoId, startPlay]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleProcess = (type, i) => {
    const resetVideosAndProgress = () => {
      // Stop any running animations
      progressAnims.current.forEach(anim => {
        if (anim) {
          anim.kill();
          if (anim.tickerUpdate) gsap.ticker.remove(anim.tickerUpdate);
        }
      });

      // Reset all videos and progress bars
      videoRef.current.forEach((video, idx) => {
        if (video) {
          video.pause();
          video.currentTime = 0; // Rewind
        }

        const span = videoSpanRef.current[idx];
        const div = videoDivRef.current[idx];

        if (span) gsap.set(span, { width: 0, backgroundColor: '#afafaf' });
        if (div) gsap.set(div, { width: '12px' });

        progressAnims.current[idx] = null;
      });
    };

    switch (type) {
      case 'video-end':
        setVideo(pre => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case 'video-last':
        setVideo(pre => ({ ...pre, isLastVideo: true }));
        break;

      case 'video-reset':
        resetVideosAndProgress();
        setVideo({
          videoId: 0,
          isEnd: false,
          isLastVideo: false,
          startPlay: true,
          isPlaying: true,
        });
        break;

      case 'pause':
      case 'play':
        setVideo(pre => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case 'set-video':
        resetVideosAndProgress();
        setVideo({
          videoId: i,
          isEnd: false,
          isLastVideo: i === hightlightsSlides.length - 1,
          startPlay: true,
          isPlaying: true,
        });
        break;

      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) => setLoadedData(pre => [...pre, e]);

  return (
    <>
      <div
        className={`flex items-center pl-[6vw] sm:pl-[15vw] ${
          isDragging.current ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
            <div className='video-carousel_container'>
              <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                <video
                  id='video'
                  playsInline
                  preload='auto'
                  muted
                  className={`pointer-events-none ${
                    list.id === 2 ? 'translate-x-100' : ''
                  }`}
                  ref={el => (videoRef.current[i] = el)}
                  onEnded={() =>
                    i !== hightlightsSlides.length - 1
                      ? handleProcess('video-end', i)
                      : handleProcess('video-last')
                  }
                  onPlay={() => setVideo(pre => ({ ...pre, isPlaying: true }))}
                  onLoadedMetadata={e => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type='video/mp4' />
                </video>
              </div>

              <div className='absolute top-12 left-[5%] z-10'>
                {list.textLists.map((text, idx) => (
                  <p
                    key={idx}
                    className='md:text-3xl text-xl'
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 400,
                      letterSpacing: '-0.01em',
                      color: 'rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='relative flex-center mt-10'>
        <div
          className='flex-center py-4 px-6 rounded-full border'
          style={{
            background: 'rgba(10, 10, 10, 0.8)',
            borderColor: `${GOLD}26`,
            backdropFilter: 'blur(12px)',
          }}
        >
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className='mx-2 w-2.5 h-2.5 rounded-full relative cursor-pointer transition-all duration-300 hover:scale-125'
              style={{ background: `${GOLD}40` }}
              ref={el => (videoDivRef.current[i] = el)}
              onClick={() => handleProcess('set-video', i)}
            >
              <span
                className='absolute h-full w-full rounded-full'
                style={{ background: GOLD }}
                ref={el => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button
          className='ml-4 p-3.5 rounded-full border transition-all duration-300'
          style={{
            background: 'rgba(10, 10, 10, 0.8)',
            borderColor: `${GOLD}26`,
            backdropFilter: 'blur(12px)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = `${GOLD}66`}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = `${GOLD}26`}
          onClick={
            isLastVideo
              ? () => handleProcess('video-reset')
              : !isPlaying
              ? () => handleProcess('play')
              : () => handleProcess('pause')
          }
        >
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            className='w-4 h-4 opacity-70'
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
