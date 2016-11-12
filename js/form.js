(function($) {
    "use strict";

    const form = $("#register_form");
    var email;

    function updateValues() {
        email = form.find("input[name=email]").val();
    }

    function isValidEmail(text) {
        const re = /\S+@\S+\.\S+/;
        return re.test(text);
    }

    form.find("#email").on('propertychange change keyup input paste', function(e) {
        const input = $(this);
        const form = input.parent("form");

        const validEmail = isValidEmail(input.val());
        if (input.val() !== "" && validEmail) {
            form.removeClass("has-error");
        } else {
            form.addClass("has-error");
        }

        updateValues();

        if (email !== "" && isValidEmail(email)) {
            form.find("button[type=submit]").removeAttr("disabled");
        } else {
            form.find("button[type=submit]").attr("disabled", "disabled")
        }
    });

    form.submit(function(e) {
        $("#register_form_submitted_success").hide();
        $("#register_form_submitted_error").hide();

        $.ajax({
            url: "https://formspree.io/ali.scott@gmail.com",
            method: "POST",
            data: {
                email: email,
            },
            dataType: "json"
        }).done(function() {
            $("#register_form").hide();
            $("#register_form_submitted_success").show();
        }).fail(function() {
            $("#register_form_submitted_error").show();
        });

        e.preventDefault();
    });

})(jQuery);
