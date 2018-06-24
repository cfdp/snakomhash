(function ($) {
    $.testQuiz = function (element, options) {
        var plugin = this,
            $element = $(element),
            _element = '#' + $element.attr('id'),

            defaults = {
                'animSpeed': 300
            };

        plugin.config = $.extend(defaults, options);

        plugin.state = {
            'currentStep': 1
        }

        plugin.method = {
      
            // Moves to the next question OR completes the quiz if on last question
            nextStep: function (options) {
                var nextStep = plugin.state.currentStep + 1;
                $('#step-' + 1).fadeOut(plugin.config.animSpeed, function () {
                    $('#step-' + nextStep).fadeIn(plugin.config.animSpeed);
                });
                plugin.state.currentStep++;
            },

            // Go back to the last question
            backToQuestion: function (options) {

            },
        };

        plugin.init = function () {

            $('#step-1').fadeIn();

            // Bind "back" buttons
            $('.back').on('click', function (e) {
                e.preventDefault();
                plugin.method.backToQuestion();
            });

            // Bind "next" buttons
            $('.correct').on('click', function (e) {
                e.preventDefault();
                plugin.method.nextStep();
            });
        };

        plugin.init();
    };

    $.fn.testQuiz = function (options) {
        return this.each(function () {
            if (undefined === $(this).data('testQuiz')) {
                var plugin = new $.testQuiz(this, options);
                $(this).data('testQuiz', plugin);
            }
        });
    };

})(jQuery);
