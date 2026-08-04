/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@undp/design-system/stories/assets/js/accordion.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@undp/design-system/stories/assets/js/accordion.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   accordion: function() { return /* binding */ accordion; }
/* harmony export */ });
/* accordion JS start custom */
function accordion(
  accordionSelector,
  accordionSiblingSelector,
  accordionActiveSelector,
) {
  const accordionElement = accordionSelector || ".accordion";
  const accordionPanel = accordionSiblingSelector || ".accordion__panel";
  const accordionActiveElement = accordionActiveSelector || "accordion--active";

  // Accordion Trigger Function as callback for Click and Keypress Events.
  const accordionTrigger = (
    currentElem,
    accordionListItem,
    accordinSiblingElement,
    accordionActiveElem,
    allowMultiExpand,
  ) => {
    // Check if 'accordion--active' class exists on current list item button.
    if (!jQuery(currentElem).hasClass(accordionActiveElem)) {
      // Add active class and show the accordion panel
      jQuery(currentElem)
        .addClass(accordionActiveElem)
        .attr("aria-expanded", true);
      jQuery(currentElem)
        .siblings(accordinSiblingElement)
        .slideDown("fast")
        .attr("aria-hidden", false);
      // Close all other list items and panels.
      if (!allowMultiExpand) {
        jQuery(accordionListItem)
          .not(jQuery(currentElem))
          .removeClass(accordionActiveElem)
          .attr("aria-expanded", false);
        jQuery(accordionListItem)
          .not(jQuery(currentElem))
          .siblings(accordinSiblingElement)
          .slideUp("fast")
          .attr("aria-hidden", true);
      }
    } else {
      jQuery(currentElem)
        // Close active list item if open.
        .removeClass(accordionActiveElem)
        .attr("aria-expanded", false);
      jQuery(currentElem)
        .siblings(accordinSiblingElement)
        .slideUp("fast")
        .attr("aria-hidden", true);
    }
  };

  const accordionClick = (
    accordion,
    accordionSibling,
    accordionActiveClass,
  ) => {
    const allowMultiExpand = jQuery(accordion).data("multi-expand") === true;
    const hasMobileAttr = jQuery(accordion).attr("data-accordion") == "mobile";

    jQuery(accordion)
      .each((index, element) => {
        const accordionListItem = jQuery(element).find("button");
        const activePanels = jQuery(element).find(".is-active");

        if (hasMobileAttr) {
          jQuery(accordionListItem)
            .addClass("desktop-event-none")
            .siblings(accordionSibling)
            .addClass("desktop-visible");
        }
        // Keep only the first .is-active if multi-expand=false
        if (!allowMultiExpand && activePanels.length > 1) {
          activePanels.each((i, panel) => {
            if (i === 0) {
              jQuery(panel)
                .attr("aria-expanded", true)
                .siblings(accordionSibling)
                .attr("aria-hidden", false)
                .show();
            } else {
              jQuery(panel)
                .removeClass("is-active")
                .attr("aria-expanded", false)
                .siblings(accordionSibling)
                .attr("aria-hidden", true)
                .hide();
            }
          });
        }

        // Init accordion onClick behavior and make sure it is initialized only once
        if (!jQuery(accordionListItem).data('inited')) {
          jQuery(accordionListItem, element).on('click keypress', e => {
            if (e.type === 'click' || (e.type === 'keypress' && (e.keyCode || e.which) == 13) ) {
              accordionTrigger(
                jQuery(e.currentTarget),
                accordionListItem,
                accordionSibling,
                accordionActiveClass,
                allowMultiExpand,
              );
            }
          });
          jQuery(accordionListItem).data('inited', true)
        }

      })
      .find(".is-active button")
      .each(function () {
        accordionTrigger(
          jQuery(this),
          jQuery(this).closest(accordionElement).find("button"),
          accordionPanel,
          accordionActiveElement,
          true,
        );
      });
  };

  accordionClick(accordionElement, accordionPanel, accordionActiveElement);
}


/***/ }),

/***/ "./node_modules/@undp/design-system/stories/assets/js/animation.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@undp/design-system/stories/assets/js/animation.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ expandToSize; },
/* harmony export */   expandToSize: function() { return /* binding */ expandToSize; }
/* harmony export */ });
/* expand animation start custom */
function expandToSize(ele) {
  if (typeof ele === 'string') {
    ele = document.querySelector(ele);
  }
  if (ele) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('expand-to-size', entry.isIntersecting);
      });
    }, {
      rootMargin: '-50% 0px 50% 0px',
      threshold: 0.5,
    });
    observer.observe(ele);
  }
}
// for webpack build

/* expand animation end custom */


/***/ }),

/***/ "./node_modules/@undp/design-system/stories/assets/js/lang-switcher.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@undp/design-system/stories/assets/js/lang-switcher.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   langSwitch: function() { return /* binding */ langSwitch; }
/* harmony export */ });
function langSwitch() {
  jQuery('.dropdown-language').click(() => {
    jQuery('.dropdown-language').toggleClass('active');
    if (jQuery('.dropdown-language').hasClass('active')) {
      jQuery('.dropdown-language').find('a').attr('tabIndex', '0');
    } else {
      jQuery('.dropdown-language').find('a').attr('tabIndex', '-1');
    }
  });

  jQuery(document).on('click', (event) => {
    const $trigger = jQuery('.dropdown-language');
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
      jQuery('.dropdown-language').removeClass('active');
    }
  });
}


/***/ }),

/***/ "./node_modules/@undp/design-system/stories/assets/js/modal.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@undp/design-system/stories/assets/js/modal.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   modal: function() { return /* binding */ modal; }
/* harmony export */ });
/* Modal JS start custom */
function modal() {
  const $modalOverlay = jQuery('.modal');
  const $modal = jQuery('.modal-content');
  const $modalClose = jQuery('.modal-close-button');
  const $modalOpen = jQuery('[data-toggle="modal"]');

  // modal function
  function modalOpen(modal) {
    let modalSelector = '';
    $modalOpen.click((e) => {
      modalSelector = e.currentTarget.getAttribute('data-target-modal');
      e.preventDefault();
      jQuery(modalSelector).addClass('open');
    });
    $modalOverlay.click(() => {
      jQuery(modalSelector).removeClass('open');
    });
  }

  // stop close function for modal content
  $modal.click((e) => {
    e.stopPropagation();
  });

  // handle escape key
  jQuery(document).keydown((e) => {
    if (e.keyCode == 27 && $modalClose) {
      $modalClose.trigger('click');
    }
  });

  // Close icon function
  $modalClose.click((e) => {
    e.preventDefault();
    $modalOverlay.click();
  });

  modalOpen(modal);
}
/* Modal JS end custom */


/***/ }),

/***/ "./node_modules/@undp/design-system/stories/assets/js/navigation.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@undp/design-system/stories/assets/js/navigation.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   navigationInitialize: function() { return /* binding */ navigationInitialize; },
/* harmony export */   navigationMultiLevelEdgeDetection: function() { return /* binding */ navigationMultiLevelEdgeDetection; },
/* harmony export */   navigationOverFlow: function() { return /* binding */ navigationOverFlow; }
/* harmony export */ });
/* eslint-disable no-inner-declarations */
/* eslint-disable no-restricted-syntax */
const navigationInitialize = (locale) => {
  const $menu = jQuery('.menu >ul');
  const $menuItem = jQuery('.menu li a');
  const $megaMenu = jQuery('.show-mega');
  const $megaWrapper = jQuery('.mega-wrapper');
  let $header = jQuery('.header');
  let $main_nav_height = jQuery('.header nav.menu');

  // Track if a menu item is being hovered.
  let hovering_item = false;
  let hovering_panel = false;

  $menuItem.on('mouseenter click', function (event) {
    hovering_item = true;

    // Find the panel that matches with the parent menu link item in the main nav.
    const navId = jQuery(this).parent().attr('data-menu-id');
    let $menuItemId = jQuery(document).find(`[data-menu-item-id='${navId}']`);
    let $triggering_menu_item = jQuery(event.target);

    // Show the mega menu panel. Position it at the bottom of the header or overflow.
    let extra = 0;
    if ($triggering_menu_item.parents('.menu__overflow__container').length) {
      extra = $triggering_menu_item.height();
    }
    $menuItemId.css({ top: ($main_nav_height.height() + extra) });
    $menuItemId.addClass('show-mega').siblings().removeClass('show-mega').addClass('no-effect');

    // If the overflow is open, z-index the mega menu above everything.
    $menuItemId.removeClass('float-higher');
    if (jQuery('.menu__overflow__container').length && !jQuery('.menu__overflow__container').hasClass('hidden')) {
      $menuItemId.addClass('float-higher');
    }

    // Set the first link in the sub menus to the active link.
    $megaMenu.find('.sub-menu-content:first-of-type').addClass('active-content').siblings().removeClass('active-content');
    $megaMenu.find('.submenu li:first-of-type').addClass('active').siblings().removeClass('active');

    // Set the tabIndex value for sub menu links on displayed mega menu panels.
    if ($menuItemId.hasClass('show-mega')) {
      $menuItem.attr('tabIndex', '-1');
      jQuery('.logo, .top-right button').attr('tabIndex', '-1');
    } else {
      $menuItem.attr('tabIndex', '0');
      jQuery('.logo, .top-right button').attr('tabIndex', '0');
    }
  });

  $menuItem.on('mouseleave', (event) => {
    hovering_item = false;

    // Alter the tab index of a menu item.
    $menuItem.attr('tabIndex', '0');
    jQuery('.logo, .top-right button').attr('tabIndex', '0');
  });

  jQuery(document).on('click', '.show-on-focus', (event) => {
    // If the user clicks anywhere, close the mega menu panel, and reset the
    // tab index values.
    jQuery('.mega-nav-option').removeClass('show-mega');
    $menuItem.attr('tabIndex', '0').focus();
    $menuItem.first().focus();
    jQuery('.logo, .top-right button').attr('tabIndex', '0');
    jQuery('.submenu li a').attr('tabIndex', '0');
    jQuery('.sub-sub-menu li').find('a').attr('tabIndex', '-1');
  });

  /**
   * Manage the open and closing animation of the mega menu.
   */
  $menu.on('mouseenter', (event) => {
    hovering_item = true;
    hovering_panel = false;
  });
  $menu.on('mouseleave', (event) => {
    if (event.type === 'mouseleave') {
      const el = event.toElement;
      // Set a timeout delay to check if the mega panel is now hovered after
      // leaving the menu, before dismissing the associated mega menu panel.
      setTimeout(() => {
        if (!hovering_panel) {
          if (jQuery('.mega-nav-option').hasClass('show-mega')) {
            jQuery('.mega-nav-option.show-mega').removeClass('show-mega no-effect')
              .addClass('show-mega-back');
            setTimeout(() => {
              jQuery('.mega-nav-option.show-mega-back').removeClass('show-mega-back');
            }, 300);
          }
        }
      }, 0);
    }
  });
  $megaWrapper.on('mouseleave', (event) => {
    hovering_panel = false;
    if (event.type === 'mouseleave') {
      const el = event.toElement;
      if (jQuery('.mega-nav-option').hasClass('show-mega')) {
        // Set a timeout delay to check if the menu or a menu item is hovered
        // after leaving the mega panel, before dismissing the associated
        // mega menu panel.
        setTimeout(() => {
          if (!hovering_item) {
            jQuery('.mega-nav-option.show-mega').removeClass('show-mega no-effect')
              .addClass('show-mega-back');
            setTimeout(() => {
              jQuery('.mega-nav-option.show-mega-back').removeClass('show-mega-back');
            }, 300);
          }
        }, 0);
      }
    }
  });
  $megaWrapper.on('mouseenter', (event) => {
    hovering_panel = true;
  });

  /**
   * Work with tab settings and active content states for the mega menu.
   */
  $megaWrapper.on('mouseenter focus keydown', '.submenu li', function (e) {
    jQuery('.sub-sub-menu li').find('a').attr('tabIndex', '-1');
    jQuery(this).addClass('active').siblings().removeClass('active');
    const navId = jQuery(this).attr('id');
    jQuery(this).parents('.mega-wrapper').find(`[data-submenu-id='${navId}']`).addClass('active-content')
      .siblings()
      .removeClass('active-content');
    e.stopImmediatePropagation();
    var key = e.which;
    if (key == 39) {
      jQuery('.submenu li').find('a').attr('tabIndex', '-1');
      jQuery(this).parents('.mega-wrapper').find(`[data-submenu-id='${navId}']`).addClass('active-content')
        .siblings()
        .removeClass('active-content')
        .find('a')
        .attr('tabIndex', '0');
      jQuery('.sub-sub-menu li').find('a').attr('tabIndex', '0');
      jQuery('.sub-sub-menu ul:first-of-type li:first-of-type a').focus();
    }
  });
  $megaWrapper.on('focus keydown', '.sub-sub-menu ul li a', (e) => {
    e.stopImmediatePropagation();
    var key = e.which;
    if (key == 37) {
      jQuery('.submenu li.active').find('a').focus();
      jQuery('.submenu li').find('a').attr('tabIndex', '0');
      jQuery('.sub-sub-menu li').find('a').attr('tabIndex', '-1');
    }
  });
  $megaWrapper.on('focus keydown', '.sub-sub-menu ul:last-of-type li:last-of-type a:last-of-type', (e) => {
    e.stopImmediatePropagation();
    jQuery('.submenu li a').attr('tabIndex', '0');
    var key = e.which;
    if (key == 9) {
      jQuery('.submenu li.active').next().find('a').focus();
    }
  });

  /**
   * Mobile navigation related functionality.
   */
  jQuery(document).on('click', '.mobile-links .cta__link:not(.no-submenu)', function (e) {
    const navId = jQuery(this).attr('id');
    const navText = jQuery(this).text();
    e.preventDefault();
    jQuery('.mobile-mega-content').find('.sub-heading').text(navText);
    jQuery('.mobile-mega-wrapper').find(`[data-mobile-id='${navId}']`).addClass('show-content');
    jQuery('.mobile-links').addClass('hide');
    jQuery('.mobile-sub-menu').addClass('show');
  });

  jQuery('.back-nav').on('click', () => {
    jQuery('.mobile-sub-menu, .mob-sub-lang').removeClass('show');
    jQuery('.mobile-mega-content').removeClass('show-content');
    jQuery('.mobile-links').removeClass('hide');
  });

  jQuery('.menu-hamburger').on('click', function (e) {
    e.stopImmediatePropagation();
    jQuery('.mobile-nav').toggleClass('show');
    jQuery('.mobile-sub-menu').toggleClass('show');
    jQuery(this).toggleClass('is-active');
    jQuery('.back-nav').trigger('click');
  });

  /**
   * Animation functionality
   *
   * Displays the logo moving into position and then displays the rest of the header content.
   */
  // const headerClass = localStorage.getItem('current-nav');
  // if (headerClass == 'global-header') {
  //   jQuery('.global-header').removeClass('global-load-animation');
  //   jQuery('.country-load-animation').addClass('run-animation');
  //   setTimeout(() => {
  //     jQuery('.country-load-animation.run-animation').removeClass('country-load-animation run-animation').addClass('show-content');
  //   }, 800);
  //   setTimeout(() => {
  //     jQuery('.country-header').removeClass('show-content');
  //     if (document.getElementsByTagName('header')[0].classList.length) {
  //       localStorage.setItem('current-nav', document.getElementsByTagName('header')[0].classList[0]);
  //     }
  //   }, 1000);
  // } else {
  //   jQuery('.country-header').removeClass('country-load-animation');
  //   jQuery('.global-load-animation').addClass('run-animation');
  //   setTimeout(() => {
  //     jQuery('.global-load-animation.run-animation').removeClass('global-load-animation run-animation').addClass('show-content');
  //   }, 800);
  //   setTimeout(() => {
  //     jQuery('.global-header').removeClass('show-content');
  //     if (document.getElementsByTagName('header').length && document.getElementsByTagName('header')[0].classList.length) {
  //       localStorage.setItem('current-nav', document.getElementsByTagName('header')[0].classList[0]);
  //     }
  //   }, 1000);
  // }

  /**
   * Language switch toggle effect.
   */
  jQuery('.mob-lang-switcher').on('click', (ev) => {
    ev.preventDefault();
    jQuery('.mob-sub-lang').addClass('show');
    jQuery('.mobile-links').addClass('hide');
  });

  /**
   * Scrolled logo effect.
   */
  // jQuery(window).scroll(() => {
  //   var winScroll = jQuery(window).scrollTop();
  //   if (winScroll >= 1) {
  //     jQuery('.logo img').addClass('scrolled');
  //   } else {
  //     jQuery('.logo img').removeClass('scrolled');
  //   }
  // });
  const logo_scroller = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const logo = document.querySelector('.logo img');
      if (logo) {
        logo.classList.toggle('scrolled', !entry.isIntersecting);
      }
    });
  }, {threshold: 1});
  logo_scroller.observe(document.querySelector('header'));
};

/**
 * Menu multi-level functionality.
 */
const navigationMultiLevelEdgeDetection = () => {
  // Determine if a multilevel menu item will go off the screen.
  // Change the side it renders on, if it will go off screen, by
  // adding the "edge" class. The formula to determine changes for
  // the language direction.
  jQuery('.menu ul li').on('mouseenter mouseleave', 'li', function (e) {
    let $this = jQuery(this);
    $this.removeClass('edge');
    if (jQuery('ul.submenu', $this).length) {
      let dir = getComputedStyle(document.body).direction;
      let elm = jQuery('ul:first', $this);
      let offset = elm.offset();
      let elm_w = elm.width();
      let docW = jQuery('.header').width();
      let isEntirelyVisible = (dir === 'rtl') ? (offset.left >= elm_w) : (offset.left + elm.width() <= docW);
      if (!isEntirelyVisible) {
        $this.addClass('edge');
      }
    }
  });
};

/**
 * Navigation overflow functionality.
 */
const navigationOverFlow = () => {
  if (jQuery('.menu > ul.overflow').length !== 0) {
    /**
     * Generate the button and add to navigation if it doesn't exist.
     */
    let $button = jQuery(document.createElement('button')).prop({
      innerHTML: '<span class="hidden">Menu toggle</span>',
      class: 'menu__overflow__toggle',
      'aria-hidden': 'false',
      'aria-controls': 'navigation-overflow',
      'aria-label': 'Menu overflow toggle',
    });

    // Add the button to an overflow item in the main nav.
    if (jQuery('.menu__overflow__item').length === 0) {
      let $item = jQuery(document.createElement('li')).prop({
        class: 'menu__overflow__item hidden',
      });
      jQuery('.menu > ul.overflow').prepend($item.append($button));
    }

    /**
     * Toggle overflow section via button.
     */
    jQuery('.menu__overflow__toggle').on('click', (e) => {
      if (jQuery('.menu__overflow__container').hasClass('hidden')) {
        jQuery('.menu__overflow__toggle').addClass('toggled');
        jQuery('.menu__overflow__container').removeClass('hidden');
      } else {
        jQuery('.menu__overflow__toggle').removeClass('toggled');
        jQuery('.menu__overflow__container').addClass('hidden');
      }
    });

    /**
     * Add the menu items width as a data attribute.
     */
    jQuery('.menu > ul.overflow > li').each(function () {
      jQuery(this).attr('data-item-width', jQuery(this).width());
    });

    /**
     * Clear out the overflow before deciding what goes in there.
     */
    // jQuery('.menu__overflow__container > ul.overflow').empty();

    /**
     * Trigger the overflow navigation setup.
     * @param {*} header_container_width
     */
    function TriggerOverFlowFunctionality(header_container_width) {
      if (typeof (header_container_width) === 'number') {
        // Get the width of the holding menu container.
        let menu_container_width = jQuery('.menu').width();

        /**
         * Move extra menu items to the overflow container.
         */
        let current_combined_width = 0;
        let $items_to_move_to_overflow = [];
        jQuery('.menu > ul.overflow > li').each(function (index, value) {
          current_combined_width += parseInt(jQuery(this).width(), 10);
          if (current_combined_width > menu_container_width) {
            $items_to_move_to_overflow.push(jQuery(this));
          }
        });
        jQuery('.menu__overflow__container > ul.overflow').prepend($items_to_move_to_overflow);

        /**
         * Move an overflow item back to the main menu if there is room.
         * Calculate the open pixel value by comparing the main menu container
         * with the combined total of all active main menu items. When the open
         * space is greater than the width of the first item in the overflow,
         * move that item back into the active main nav.
         */
        if (jQuery('.menu__overflow__container > ul.overflow > li').length) {
          let total_width_of_active_main_nav_items = 0;
          jQuery('.menu > ul.overflow > li').each(function (index) {
            total_width_of_active_main_nav_items += parseInt(jQuery(this).width(), 10);
          });
          let open_pixel_value = menu_container_width - total_width_of_active_main_nav_items;
          if (open_pixel_value >= jQuery('.menu__overflow__container > ul.overflow > li').first().attr('data-item-width')) {
            jQuery('.menu__overflow__container > ul.overflow > li').first().appendTo('.menu > ul.overflow');
          }
        }

        /**
         * Display the overflow button if there are more items then can fit.
         */
        jQuery('.menu__overflow__item').addClass('hidden');
        if (jQuery('.menu__overflow__container > ul.overflow > li').length > 0) {
          jQuery('.menu__overflow__item').removeClass('hidden');
        }

        if (!jQuery('.menu__overflow__container > ul.overflow > li').length) {
          jQuery('.menu__overflow__container').addClass('hidden');
        }
      }
    }

    // Trigger a recalculation on any resize to figure out if menu items should
    // be moved to overflow section.
    const resize_observer = new ResizeObserver((items) => {
      for (const item of items) {
        // Set the width of the menu, to the width of the parent.
        jQuery('.menu').width(jQuery('.top-center').width() - 40);

        // Trigger the overflow rebuild.
        TriggerOverFlowFunctionality(Math.floor(item.contentRect?.width));
      }
    });

    if (jQuery('.header').length !== 0) {
      resize_observer.observe(jQuery('.header')[0], { box: 'border-box' });
    }
  }
};


/***/ }),

/***/ "./node_modules/@undp/design-system/stories/assets/js/select.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@undp/design-system/stories/assets/js/select.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   select: function() { return /* binding */ select; }
/* harmony export */ });
function select() {
  let $selectButton = jQuery('.select-box button');
  let $selectList = jQuery('.select-box li');

  $selectButton.on('click', function () {
    jQuery(this).parent().toggleClass('expanded').find('ul')
      .toggleClass('active');
  });

  $selectList.on('click keypress', function () {
    jQuery(this).parent().siblings().text(jQuery(this).find('span').text());
    jQuery(this).parent().removeClass('active').parents()
      .removeClass('expanded');
  });

  jQuery(document).mouseup((e) => {
    if (!$selectButton.is(e.target) && $selectButton.has(e.target).length === 0) {
      $selectButton.parent().removeClass('expanded').find('ul').removeClass('active');
    }
  });
}


/***/ }),

/***/ "./node_modules/@undp/design-system/stories/assets/js/tabs.js":
/*!********************************************************************!*\
  !*** ./node_modules/@undp/design-system/stories/assets/js/tabs.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tabs: function() { return /* binding */ tabs; }
/* harmony export */ });
/**
 * tabs.js library
 */
function tabs() {
  // select all tabs on page
  let $tabs = jQuery('.tabs ul');

  // Init foundation tabs function on each tablist.
  jQuery($tabs).each((i, elem) => {
    let tab = new Foundation.Tabs(jQuery(elem));
  });
}


/***/ }),

/***/ "./node_modules/@undp/design-system/stories/assets/js/undp.js":
/*!********************************************************************!*\
  !*** ./node_modules/@undp/design-system/stories/assets/js/undp.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   desktopView: function() { return /* binding */ desktopView; }
/* harmony export */ });
const UNDP = window.UNDP || {};

UNDP.keyCode = {
  TAB: 9,
  RETURN: 13,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

UNDP.breakpoints = {
  TINY: 320,
  SMALL: 767,
  MEDIUM: 768,
  LARGE: 1024,
  EXTRALARGE: 1440,
  MEDIUMTAB: 1439,
  TABLET: 834,
};

window.UNDP = window.UNDP || UNDP;

const desktopView = window.innerWidth > 1439;


/***/ }),

/***/ "./node_modules/@undp/design-system/stories/assets/js/viewport.js":
/*!************************************************************************!*\
  !*** ./node_modules/@undp/design-system/stories/assets/js/viewport.js ***!
  \************************************************************************/
/***/ (function() {

jQuery(window).on('load', () => {

  const $objs = jQuery('[data-viewport=true]');
  if ($objs.length > 0) {

    const isElementInViewport = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          jQuery(entry.target).addClass('inviewport');
          isElementInViewport.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 // Trigger when at least 10% of the element is visible
    });

    $objs.each((i, element) => {
      isElementInViewport.observe(element);
    });

  }

});

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = jQuery;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";
/*!******************************!*\
  !*** ./src/assets/js/app.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _undp_design_system_stories_assets_js_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @undp/design-system/stories/assets/js/select */ "./node_modules/@undp/design-system/stories/assets/js/select.js");
/* harmony import */ var _undp_design_system_stories_assets_js_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @undp/design-system/stories/assets/js/navigation */ "./node_modules/@undp/design-system/stories/assets/js/navigation.js");
/* harmony import */ var _undp_design_system_stories_assets_js_accordion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @undp/design-system/stories/assets/js/accordion */ "./node_modules/@undp/design-system/stories/assets/js/accordion.js");
/* harmony import */ var _undp_design_system_stories_assets_js_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @undp/design-system/stories/assets/js/modal */ "./node_modules/@undp/design-system/stories/assets/js/modal.js");
/* harmony import */ var _undp_design_system_stories_assets_js_animation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @undp/design-system/stories/assets/js/animation */ "./node_modules/@undp/design-system/stories/assets/js/animation.js");
/* harmony import */ var _undp_design_system_stories_assets_js_lang_switcher__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @undp/design-system/stories/assets/js/lang-switcher */ "./node_modules/@undp/design-system/stories/assets/js/lang-switcher.js");
/* harmony import */ var _undp_design_system_stories_assets_js_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @undp/design-system/stories/assets/js/tabs */ "./node_modules/@undp/design-system/stories/assets/js/tabs.js");
// Load individual modules
// import { expandSearch } from '@undp/design-system/stories/assets/js/expand-search';
// import { multiSelect } from '@undp/design-system/stories/assets/js/multi-select';
// import { sidebarNav, sidebarMenu } from '@undp/design-system/stories/assets/js/sidebar';
// import { parallaxEffect } from '@undp/design-system/stories/assets/js/parallax';
// import { swiper } from '@undp/design-system/stories/assets/js/swiper';
// import { fitText } from '@undp/design-system/stories/assets/js/fitText';
// import { lightboxGallery } from '@undp/design-system/stories/assets/js/lightbox-gallery';
// import { GLightbox } from 'glightbox';
// import { statsHover } from '@undp/design-system/stories/assets/js/stats';
window.jQuery=(jquery__WEBPACK_IMPORTED_MODULE_0___default()),// Enable in view animations, wired via data-viewport=true attribute
__webpack_require__(/*! @undp/design-system/stories/assets/js/viewport */ "./node_modules/@undp/design-system/stories/assets/js/viewport.js"),// global constants
__webpack_require__(/*! @undp/design-system/stories/assets/js/undp */ "./node_modules/@undp/design-system/stories/assets/js/undp.js"),// Smart resize
// require('@undp/design-system/stories/assets/js/smartresize');
// Progress bar
// require('@undp/design-system/stories/assets/js/scrolling-progress-bar');
// Components visualization should be done implicitly as of UNDP Design System v1.4
// https://github.com/undp/design-system/releases/tag/v1.4.0
// fitText(selector, options);
(0,_undp_design_system_stories_assets_js_modal__WEBPACK_IMPORTED_MODULE_4__.modal)(),(0,_undp_design_system_stories_assets_js_select__WEBPACK_IMPORTED_MODULE_1__.select)(),(0,_undp_design_system_stories_assets_js_animation__WEBPACK_IMPORTED_MODULE_5__.expandToSize)(".pagehero-full"),// Mega menu / Dropdown menu
(0,_undp_design_system_stories_assets_js_navigation__WEBPACK_IMPORTED_MODULE_2__.navigationInitialize)(),(0,_undp_design_system_stories_assets_js_navigation__WEBPACK_IMPORTED_MODULE_2__.navigationOverFlow)(),jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).ready(function(){(0,_undp_design_system_stories_assets_js_accordion__WEBPACK_IMPORTED_MODULE_3__.accordion)()}),// Language switcher
(0,_undp_design_system_stories_assets_js_lang_switcher__WEBPACK_IMPORTED_MODULE_6__.langSwitch)(),jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).ready(function(){(0,_undp_design_system_stories_assets_js_accordion__WEBPACK_IMPORTED_MODULE_3__.accordion)(),(0,_undp_design_system_stories_assets_js_tabs__WEBPACK_IMPORTED_MODULE_7__.tabs)()});
}();
/******/ })()
;
//# sourceMappingURL=app.js.map