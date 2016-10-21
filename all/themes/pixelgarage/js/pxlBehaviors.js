/**
 * This file contains all Drupal behaviours of the Apia theme.
 *
 * Created by ralph on 05.01.14.
 */

(function ($) {

  /**
   * This behavior adds shadow to header on scroll.
   *
   */
  Drupal.behaviors.addHeaderShadow = {
    attach: function (context) {
      $(window).on("scroll", function () {
        if ($(window).scrollTop() > 10) {
          $("header.navbar .container").css("box-shadow", "0 4px 3px -4px gray");
        }
        else {
          $("header.navbar .container").css("box-shadow", "none");
        }
      });
    }
  };

  /**
   * Allows full size clickable items.
   */
   Drupal.behaviors.fullSizeClickableItems = {
    attach: function () {
      var $clickableItems = $('.node-page.node-teaser');

      $clickableItems.once('click', function () {
        $(this).on('click', function () {
          window.location = $(this).find("a:first").attr("href");
          return false;
        });
      });
    }
  };

  /**
   * Add a floating paragraphs anchor menu to the body and position it
   * according to the scroll position.
   */
  Drupal.behaviors.createParagraphAnchorMenu = {
    attach: function () {
      // add anchor menu container
      var $mainContainer = $('.main-container');

      $mainContainer.prepend('<div class="menu-anchor-container"><ul class="menu-anchor"></ul></div>');

      var $anchorMenu = $mainContainer.find('.menu-anchor'),
        $anchorMenuCont = $mainContainer.find('.menu-anchor-container'),
        $paragraphItems = $('#block-system-main').find('.entity-paragraphs-item');

      // add anchor menu for each paragraph
      $anchorMenuCont.hide();
      $paragraphItems.each(function(index) {
        var $item = $(this),
            anchor = 'paragraph-item-' + index,
            anchorTitle = $item.attr('data-anchor-title') ? $item.attr('data-anchor-title') : false;

        // add anchor (id) to paragraph
        $item.attr('id', anchor);

        // create anchor menu for paragraph
        if (anchorTitle) {
          $anchorMenu.append('<li class="leaf"><a href="#' + anchor + '">' + anchorTitle + '</a></li>');
          $anchorMenuCont.show();
        }
      });

      //
      // position anchor menu during scrolling
      if ($anchorMenuCont.is(':visible')) {
        $(window).on('scroll', function() {
          var scrollPos = $(window).scrollTop();

          $anchorMenuCont.css({'top': scrollPos});
        });
      }
    }
  };

  /**
   * Anchor menus: Scrolls smoothly to anchor due to menu click.
   */
  Drupal.behaviors.smoothScrolltoAnchors = {
    attach: function(context, settings) {
      $(function() {
        $('.menu-anchor li.leaf a').click(function() {
          var anchorPos = this.href.indexOf('#'),
            $mainContainer = $('.main-container'),
            mainTop = $mainContainer.offset().top;

          // no anchor available, perform click
          if (anchorPos == -1) return true;

          // menu item references anchor, get anchor target
          var target = $(this.href.slice(anchorPos));
          if (target.length) {
            $('html, body').stop().animate({
              scrollTop: target.offset().top - mainTop
            }, 800, 'swing');
            return false;
          }
          // no target available, perform click
          return true;
        });
      });
    }
  };

  /**
   * Swaps images from black/white to colored on mouse hover.
   Drupal.behaviors.hoverImageSwap = {
    attach: function () {
      $('.node-project.node-teaser .field-name-field-images a img').hover(
        function () {
          // mouse enter
          src = $(this).attr('src');
          $(this).attr('src', src.replace('teaser_bw', 'teaser_normal'));
        },
        function () {
          // mouse leave
          src = $(this).attr('src');
          $(this).attr('src', src.replace('teaser_normal', 'teaser_bw'));
        }
      );
    }
  }
   */

  /**
   * Open file links in its own tab. The file field doesn't implement this behaviour right away.
   Drupal.behaviors.openDocumentsInTab = {
    attach: function () {
      $(".field-name-field-documents").find(".field-item a").attr('target', '_blank');
    }
  }
   */

})(jQuery);
