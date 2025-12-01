// videos
const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const hmv = `${CLOUDFRONT_URL}/videos/hero.mp4`;
const smallmv = `${CLOUDFRONT_URL}/videos/smallHero.mp4`;
const highlight1 = `${CLOUDFRONT_URL}/videos/highlight1.mp4`;
const highlight2 = `${CLOUDFRONT_URL}/videos/soroush_touring_penthouse.mp4`;
const highlight3 = `${CLOUDFRONT_URL}/videos/hightlight3.mp4`;
const highlight4 = `${CLOUDFRONT_URL}/videos/hightlight4.mp4`;
const highlight5 = `${CLOUDFRONT_URL}/videos/hightlight5.mp4`;
const exploremv = `${CLOUDFRONT_URL}/videos/explore.mp4`;
const framemv = `${CLOUDFRONT_URL}/videos/lowres_short_reel_showcase_v2_1.mp4`;
const reelsoroush = `${CLOUDFRONT_URL}/videos/reel_soroush.mp4`;

// images
const logo = `${CLOUDFRONT_URL}/images/logo.svg`;
const pplogo = `${CLOUDFRONT_URL}/images/logo.png`;
const search = `${CLOUDFRONT_URL}/images/search.svg`;
const right = `${CLOUDFRONT_URL}/images/right.svg`;
const replay = `${CLOUDFRONT_URL}/images/replay.svg`;
const play = `${CLOUDFRONT_URL}/images/play.svg`;
const pause = `${CLOUDFRONT_URL}/images/pause.svg`;

const yellow = `${CLOUDFRONT_URL}/images/yellow.jpg`;
const blue = `${CLOUDFRONT_URL}/images/blue.jpg`;
const white = `${CLOUDFRONT_URL}/images/white.jpg`;
const black = `${CLOUDFRONT_URL}/images/black.jpg`;
const explore1 = `${CLOUDFRONT_URL}/images/explore1.jpg`;
const explore2 = `${CLOUDFRONT_URL}/images/explore2.jpg`;
const frame = `${CLOUDFRONT_URL}/images/frame.png`;

const star = `${CLOUDFRONT_URL}/images/star.png`;
const exp1 = `${CLOUDFRONT_URL}/images/exp1.png`;
const exp2 = `${CLOUDFRONT_URL}/images/exp2.png`;
const exp3 = `${CLOUDFRONT_URL}/images/exp3.png`;
const logo1 = `${CLOUDFRONT_URL}/images/logo1.png`;
const logo2 = `${CLOUDFRONT_URL}/images/logo2.png`;
const logo3 = `${CLOUDFRONT_URL}/images/logo3.png`;
const smilogo = `${CLOUDFRONT_URL}/logos/smi_logo.png`;
// declare
export const heroVideo = hmv;
export const smallHeroVideo = smallmv;
export const highlightFirstVideo = highlight1;
export const highlightSecondVideo = highlight2;
export const highlightThirdVideo = highlight3;
export const highlightFourthVideo = highlight4;
export const highlightFifthVideo = highlight5;
export const exploreVideo = exploremv;
export const frameVideo = framemv;
export const reelSoroush = reelsoroush;

export const logoImg = logo;
export const ppLogo = pplogo;
export const searchImg = search;
export const rightImg = right;
export const replayImg = replay;
export const playImg = play;
export const pauseImg = pause;

export const yellowImg = yellow;
export const blueImg = blue;
export const whiteImg = white;
export const blackImg = black;
export const explore1Img = explore1;
export const explore2Img = explore2;
export const frameImg = frame;

export const starImg = star;
export const exp1Img = exp1;
export const exp2Img = exp2;
export const exp3Img = exp3;
export const logo1Img = logo1;
export const logo2Img = logo2;
export const logo3Img = logo3;
export const smiLogo = smilogo;

/**
 * Smoothly scrolls to an element with the given ID
 * @param {string} elementId - The ID of the element to scroll to
 * @param {Object} options - Additional options for scrolling
 * @param {string} options.behavior - The scroll behavior ('auto', 'smooth')
 * @param {string} options.block - Vertical alignment ('start', 'center', 'end', 'nearest')
 * @param {string} options.inline - Horizontal alignment ('start', 'center', 'end', 'nearest')
 */
export const smoothScrollTo = (
  elementId,
  options = { behavior: 'smooth', block: 'start' },
) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView(options);
  }
};

export const sonyCameraImg = `${CLOUDFRONT_URL}/gear/sony_camera.jpg`;
export const droneImg = `${CLOUDFRONT_URL}/gear/dji_drone.jpg`;
