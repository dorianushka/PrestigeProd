import {
  blackImg,
  blueImg,
  highlightFirstVideo,
  highlightSecondVideo,
  highlightThirdVideo,
  highlightFourthVideo,
  highlightFifthVideo,
  whiteImg,
  yellowImg,
  exp1Img,
  exp2Img,
  exp3Img,
  logo1Img,
  logo2Img,
  logo3Img,
} from '../utils';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

export const GRADIENT_CLASS = 'bg-gradient-to-r from-[#25d0ab] to-[#2d5f59]';
export const navLists = [
  { label: 'Home', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
];

export const hightlightsSlides = [
  {
    id: 1,
    textLists: ['Real Estate'],
    video: highlightSecondVideo,
    videoDuration: 8.12,
    isVertical: false,
  },
  {
    id: 2,
    textLists: ['Aerial Visuals'],
    video: highlightFirstVideo,
    videoDuration: 10.21,
    isVertical: false,
  },
  {
    id: 3,
    textLists: ['Social Media Content'],
    video: highlightThirdVideo,
    videoDuration: 11.01,
    isVertical: true,
  },
  {
    id: 4,
    textLists: ['Interviews'],
    video: highlightFourthVideo,
    videoDuration: 12,
    isVertical: false,
  },
  {
    id: 5,
    textLists: ['Events'],
    video: highlightFifthVideo,
    videoDuration: 20.01,
    isVertical: false,
  },
];

export const models = [
  {
    id: 1,
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#ffe7b9', '#6f6c64'],
    img: yellowImg,
  },
  {
    id: 2,
    title: 'iPhone 15 Pro in Blue Titanium',
    color: ['#53596E', '#6395ff', '#21242e'],
    img: blueImg,
  },
  {
    id: 3,
    title: 'iPhone 15 Pro in White Titanium',
    color: ['#C9C8C2', '#ffffff', '#C9C8C2'],
    img: whiteImg,
  },
  {
    id: 4,
    title: 'iPhone 15 Pro in Black Titanium',
    color: ['#454749', '#3b3b3b', '#181819'],
    img: blackImg,
  },
];

export const sizes = [
  { label: '6.1"', value: 'small' },
  { label: '6.7"', value: 'large' },
];

export const footerLinks = [
  'Privacy Policy',
  'Terms of Use',
  'Sales Policy',
  'Legal',
  'Site Map',
];

export const expCards = [
  {
    logoPath: `${import.meta.env.VITE_CLOUDFRONT_URL}/images/consultant-services.png`,
    titleKey: 'discovery',
    defaultTitle: 'Discovery & Brief',
    responsibilityKeys: ['discovery0', 'discovery1', 'discovery2'],
    defaultResponsibilities: [
      'Conduct stakeholder workshop to capture objectives, audience, and key messages.',
      'Research market trends and competitor content for strategic insights.',
      'Draft a comprehensive creative brief outlining scope, deliverables, and timelines.',
    ],
  },
  {
    logoPath: `${import.meta.env.VITE_CLOUDFRONT_URL}/images/script.png`,
    titleKey: 'script',
    defaultTitle: 'Script & Storyboard',
    responsibilityKeys: ['script0', 'script1', 'script2'],
    defaultResponsibilities: [
      'Develop compelling narrative structure and write detailed script.',
      'Design storyboard panels illustrating key scenes and camera angles.',
      'Review and refine script/storyboard with client approvals at each stage.',
    ],
  },
  {
    logoPath: `${import.meta.env.VITE_CLOUDFRONT_URL}/images/logo2.png`,
    titleKey: 'preProduction',
    defaultTitle: 'Pre-Production & Logistics',
    responsibilityKeys: ['preProduction0', 'preProduction1', 'preProduction2'],
    defaultResponsibilities: [
      'Scout locations, acquire permits, and schedule shoot logistics.',
      'Coordinate crew, equipment rental, casting talent, and wardrobe.',
      'Create shooting schedule and call sheets for seamless production flow.',
    ],
  },
  {
    logoPath: `${import.meta.env.VITE_CLOUDFRONT_URL}/images/videography.png`,
    titleKey: 'filming',
    defaultTitle: 'Filming & Capture',
    responsibilityKeys: ['filming0', 'filming1', 'filming2'],
    defaultResponsibilities: [
      'Direct on-set production, manage camera, lighting, and sound.',
      'Guide talent performance and ensure alignment with creative vision.',
      'Monitor and back up captured footage for quality assurance.',
    ],
  },
  {
    logoPath: `${import.meta.env.VITE_CLOUDFRONT_URL}/images/film-editing.png`,
    titleKey: 'postProduction',
    defaultTitle: 'Post-Production & Feedback',
    responsibilityKeys: [
      'postProduction0',
      'postProduction1',
      'postProduction2',
    ],
    defaultResponsibilities: [
      'Edit raw footage, apply color correction, sound mixing, and graphics.',
      'Integrate client feedback through iterative review cycles.',
      'Finalize video master and prepare versions for different platforms.',
    ],
  },
  {
    logoPath: `${import.meta.env.VITE_CLOUDFRONT_URL}/images/video.png`,
    titleKey: 'delivery',
    defaultTitle: 'Delivery & Distribution',
    responsibilityKeys: ['delivery0', 'delivery1', 'delivery2'],
    defaultResponsibilities: [
      'Export videos in required formats and resolutions.',
      'Upload to hosting platforms and optimize metadata.',
      'Develop distribution strategy across owned and paid channels, track analytics.',
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: 'Swiss Mining Institute 2025',
    video: `${import.meta.env.VITE_CLOUDFRONT_URL}/videos/SMI_NOV_2025_OFFICIAL_TEASER.mp4`,
    image: '/assets/images/SMI_NOV_2025_thumbnail.png',
    link: '/portfolio/smi-2025',
    category: 'events',
    typeKey: 'portfolio.types.eventProduction',
    isVertical: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Swiss Mining Institute 2024',
    video: `${import.meta.env.VITE_CLOUDFRONT_URL}/videos/SMI_logo_final.mp4`,
    link: '/portfolio/smi',
    category: 'events',
    typeKey: 'portfolio.types.eventProduction'
  },
  {
    id: 3,
    title: 'Penthouse Zurich',
    image: `${import.meta.env.VITE_CLOUDFRONT_URL}/images/thumbnail_penthouse.png`,
    link: '/portfolio/penthouse-zurich',
    category: 'realEstate',
    typeKey: 'portfolio.types.realEstate'
  },
];
