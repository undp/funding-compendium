import $ from 'jquery';

// Load individual modules
// import { expandSearch } from '@undp/design-system/stories/assets/js/expand-search';
// import { multiSelect } from '@undp/design-system/stories/assets/js/multi-select';
import { select } from '@undp/design-system/stories/assets/js/select';
// import { sidebarNav, sidebarMenu } from '@undp/design-system/stories/assets/js/sidebar';
 import { navigationInitialize, navigationMultiLevelEdgeDetection, navigationOverFlow } from '@undp/design-system/stories/assets/js/navigation';
 import { accordion } from '@undp/design-system/stories/assets/js/accordion';
// import { parallaxEffect } from '@undp/design-system/stories/assets/js/parallax';
// import { swiper } from '@undp/design-system/stories/assets/js/swiper';
// import { fitText } from '@undp/design-system/stories/assets/js/fitText';
 import { modal } from '@undp/design-system/stories/assets/js/modal';
// import { lightboxGallery } from '@undp/design-system/stories/assets/js/lightbox-gallery';
// import { GLightbox } from 'glightbox';
 import { expandToSize } from '@undp/design-system/stories/assets/js/animation';
// import { statsHover } from '@undp/design-system/stories/assets/js/stats';
import { langSwitch } from '@undp/design-system/stories/assets/js/lang-switcher';
import { tabs } from '@undp/design-system/stories/assets/js/tabs';

window.jQuery = $;

// Enable in view animations, wired via data-viewport=true attribute
 require('@undp/design-system/stories/assets/js/viewport');
// global constants
require('@undp/design-system/stories/assets/js/undp');

// Smart resize
// require('@undp/design-system/stories/assets/js/smartresize');

// Progress bar
// require('@undp/design-system/stories/assets/js/scrolling-progress-bar');

// Components visualization should be done implicitly as of UNDP Design System v1.4
// https://github.com/undp/design-system/releases/tag/v1.4.0

// fitText(selector, options);


modal();

select();


expandToSize('.pagehero-full');

// Mega menu / Dropdown menu
navigationInitialize();
navigationOverFlow()

$(document).ready(function() { 
   accordion(); 
});

// Language switcher
langSwitch();

$(document).ready(function() { 
   accordion(); 
   tabs();
});

import chartManager from './charts/chartManager';

// Initialize any charts declared via data-chart-type attributes
document.addEventListener('DOMContentLoaded', function () {
  chartManager.initCharts(document);
});

expandToSize('.pagehero-full');