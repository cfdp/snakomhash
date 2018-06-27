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
            'currentStep': 1,
            'totalSteps': 0,
        }

        plugin.method = {
            nextStep: function (options) {
                var nextStep = plugin.state.currentStep + 1;

                if(nextStep <= plugin.state.totalSteps) {
                    $('#step-' + plugin.state.currentStep).fadeOut(plugin.config.animSpeed, function () {
                        $('#step-' + nextStep).fadeIn(plugin.config.animSpeed);
                    });
                    plugin.state.currentStep++;
                    plugin.method.setStepCounter(nextStep);
                }
                else {
                    $('#step-' + plugin.state.currentStep).fadeOut(plugin.config.animSpeed, function () {
                        $('.field--name-field-test-complete').fadeIn(plugin.config.animSpeed);
                    });
                    $('.step-counter').html('');
                }
            },
            backToQuestion: function (currentResponse) {
                var currentStepObj = $('#step-' + plugin.state.currentStep);
                $(currentResponse).fadeOut(plugin.config.animSpeed, function () {
                    $('.step__question, .step__answers', currentStepObj).fadeIn(plugin.config.animSpeed);
                });
            },
            checkAnswer: function(answer) {
                var currentStepObj = $('#step-' + plugin.state.currentStep);
                $('.step__question, .step__answers', currentStepObj).fadeOut(plugin.config.animSpeed, function() {
                    $(currentStepObj).find('.step__response.' + answer).fadeIn(plugin.config.animSpeed);
                });
            },
            setStepCounter: function(step) {
                $('.step-counter__current').html(step);
            }
        };

        plugin.init = function () {
            plugin.state.totalSteps = $('.steps .step__item').length;

            // Bind "check answer" buttons
            $('.step__answer a').on('click', function (e) {
                e.preventDefault();
                plugin.method.checkAnswer($(this).data('answer'));
            });
            // Bind "next" buttons
            $('.next').on('click', function (e) {
                e.preventDefault();
                plugin.method.nextStep();
            });
            // Bind "back" buttons
            $('.back').on('click', function (e) {
                e.preventDefault();
                var currentResponse = $(this).parent();
                plugin.method.backToQuestion(currentResponse);
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
