(function ($, Drupal) {

  Drupal.behaviors.slickQuizConfig = {
    
    attach: function (context, settings) {

      $(document).ready(function(e) {
        $('.steps').testQuiz();
      });
    }
  
  };

})(jQuery, Drupal);
