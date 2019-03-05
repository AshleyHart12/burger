$(function() {
    $("submit").on("click", function(event) {
        var id = $(this).data("id");
        var devoured = $(this)data("devoured");

        var devourBurger = {
            devoured: devoured
        };

        $.ajax("/api/burgers" + id, {
            type: "PUT",
            data: devourBurger
        }).then(function() {
            console.log("Burger Devoured", devoured);
            location.reload();
        });
    });


});