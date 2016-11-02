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
      var $clickableItems = $('.node-page.node-teaser').add('.view-documents .views-row');

      $clickableItems.once('click', function () {
        $(this).on('click', function () {
          var url = $(this).find("a:first").attr("href"),
              newWindow = $(this).find("a:first").attr("target") == '_blank';

          if (newWindow) {
            window.open(url, '_blank');
          }
          else {
            window.location = url;
          }
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
      var $mainContainer = $('.main-container'),
        $paragraphItems = $('#block-system-main').find('.entity-paragraphs-item');

      // leave for pages without paragraphs
      if ($paragraphItems.length <= 0) return;

      //
      // create anchor menu in main container
      $mainContainer.once('anchor-menu', function() {
        $mainContainer.prepend('<div class="menu-anchor-container"><div class="menu-anchor-label">Menu</div><ul class="menu-anchor"></ul></div>');

        var $anchorMenu = $mainContainer.find('.menu-anchor'),
          $anchorMenuLabel = $mainContainer.find('.menu-anchor-label'),
          $anchorMenuCont = $mainContainer.find('.menu-anchor-container');

        //
        // add anchor menu entry for each paragraph, if corresponding anchor title exists
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
        // animate anchor menu, if visible
        if ($anchorMenuCont.is(':visible')) {
          //
          // expand anchor menu on mouse hover
          $anchorMenu.hide();
          $anchorMenuCont.hover(
            function() {
              // mouse over
              $anchorMenuLabel.hide();
              $anchorMenu.fadeIn(500);
            }, function() {
              // mouse out
              $anchorMenuLabel.fadeIn(500);
              $anchorMenu.hide();
            });

          //
          // position anchor menu during scrolling
          $(window).on('scroll resize', function() {
            if ($(window).width() < 1024) {
              // hide menu
              $anchorMenuCont.hide();
            }
            else {
              // animate menu to position
              var scrollPos = $(window).scrollTop();
              $anchorMenuCont.show();
              $anchorMenuCont.animate({'top': scrollPos+20}, {duration:300, queue:false, easing:'swing'});
            }
          });
        }
      }); // once
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
