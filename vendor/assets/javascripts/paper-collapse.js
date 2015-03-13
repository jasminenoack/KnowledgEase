
/*!
  Paper Collapse v0.4.0

  Collapsible paper cards.

  Made with love by bbo - ©2015 Alexander Rühle
  MIT License http://opensource.org/licenses/MIT
 */

(function() {

  (function($) {
    'use strict';
    $.fn.paperCollapse = function() {
      var animationDuration = 400
      var easing = 'swing'

      if ($(this).closest('.collapse-card').hasClass('active')) {
        $(this)
          .closest('.collapse-card')
          .removeClass('active');
        $(this)
          .closest('.collapse-card')
          .find('.collapse-card__body')
          .slideUp(animationDuration);
      } else {
        $(this)
          .closest('.collapse-card')
          .addClass('active');
        $(this)
          .closest('.collapse-card')
          .find('.collapse-card__body')
          .slideDown(animationDuration);
      }
    };
  })(jQuery);

}).call(this);
