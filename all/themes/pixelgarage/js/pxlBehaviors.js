/**
 * This file contains all Drupal behaviours of the Apia theme.
 *
 * Created by ralph on 05.01.14.
 */

(function ($) {

  /**
   * This behavior adds shadow to header on scroll.
   *
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
   */

  /**
   * Allows full size clickable items.
   */
   Drupal.behaviors.fullSizeClickableItems = {
    attach: function () {
      var $clickableItems = $('.view-pages  .views-row').add('.view-documents .views-row').add('.view-view-news .views-field');

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
        $paragraphItems = $('.node-page').find('.entity-paragraphs-item'),
        $documentItems = $('#block-views-documents-block').find('.view-grouping'),
        paragraphItemsTop = new Array(),
        $activeAnchorMenuItem = null;

      // leave for pages without paragraphs
      if ($paragraphItems.length <= 0) return;

      //
      // create anchor menu in main container
      $mainContainer.once('anchor-menu', function() {
        $mainContainer.prepend('<div class="menu-anchor-container"><div class="menu-anchor-label">Menu</div><ul class="menu-anchor"></ul></div>');

        var $anchorMenuCont = $mainContainer.find('.menu-anchor-container'),
          $anchorMenu = $anchorMenuCont.find('.menu-anchor'),
          $anchorMenuLabel = $anchorMenuCont.find('.menu-anchor-label');

        //
        // add anchor menu item for each paragraph, if corresponding anchor title exists
        $anchorMenuCont.hide();
        $paragraphItems.each(function(index) {
          var $item = $(this),
            anchor = 'paragraph-item-' + index,
            anchorTitle = $item.attr('data-anchor-title') ? $item.attr('data-anchor-title') : false;

          //
          // create anchor menu item for paragraph
          if (anchorTitle) {
            // add anchor (id) to paragraph and store top position of it
            $item.attr('id', anchor);
            paragraphItemsTop.push($item.offset().top - 200);

            // append anchor menu item
            $anchorMenu.append('<li class="leaf"><a href="#' + anchor + '">' + anchorTitle + '</a></li>');
            $anchorMenuCont.show();
          }
        });
        $documentItems.each(function(index) {
          var $item = $(this),
            anchor = 'document-item-' + index,
            anchorTitle = $item.attr('data-anchor-title') ? $item.attr('data-anchor-title') : false;

          //
          // create anchor menu item for paragraph
          if (anchorTitle) {
            // add anchor (id) to paragraph and store top position of it
            $item.attr('id', anchor);
            paragraphItemsTop.push($item.offset().top - 200);

            // append anchor menu item
            $anchorMenu.append('<li class="leaf sub-leaf"><a href="#' + anchor + '">' + anchorTitle + '</a></li>');
            $anchorMenuCont.show();
          }
        });

        //
        // animate anchor menu, if visible
        if ($anchorMenuCont.is(':visible')) {
          $anchorMenuLabel.hide();

          //
          // position anchor menu during scrolling
          $(window).on('scroll resize', function() {
            var scrollPos = $(window).scrollTop();

            //
            // define position of anchor menu
            if ($(window).width() < 1300) {
              //  menu position on top of page
              $anchorMenuCont.css({'position': 'static'});
            }
            else {
              // animate menu to position
              $anchorMenuCont.css({'position': 'fixed'});
              //$anchorMenuCont.animate({'top': scrollPos+20}, {duration:300, queue:false, easing:'swing'});
            }

            //
            // highlight anchor menu according to scroll position
            var $anchorMenuItems = $anchorMenu.find('li.leaf a');
            $.each( paragraphItemsTop, function( index, paragraphTopPosition ) {
              if (scrollPos > paragraphTopPosition) {
                var $anchorMenuItem = $($anchorMenuItems[index]);

                if ($activeAnchorMenuItem) {
                  $activeAnchorMenuItem.removeClass('active');
                }
                $anchorMenuItem.addClass('active');
                $activeAnchorMenuItem = $anchorMenuItem;
              }
            });
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
      var $anchorMenuItems = $('.menu-anchor li.leaf a');

      $anchorMenuItems.once(function() {
        $anchorMenuItems.on('click', function() {
          var anchorPos = this.href.indexOf('#'),
            $mainContainer = $('.main-container'),
            mainTop = $mainContainer.offset().top;

          // no anchor available, perform click
          if (anchorPos == -1) return true;

          // menu item references anchor, get anchor target
          var $target = $(this.href.slice(anchorPos));
          if ($target.length) {
            $('html, body').stop().animate({scrollTop: $target.offset().top - mainTop}, 800, 'linear');
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
