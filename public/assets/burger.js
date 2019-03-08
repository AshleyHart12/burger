$(function() {

    // ADD NEW BURGER
    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#newBurger").val().trim(),
            devoured: 0
        };
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("Added New Burger");
            location.reload();
        });
    });

    $(".eatburger").on("click", function(event) {
        event.preventDefault();

        var id = $(this).data("id");
        var devouredBurger = {
            devoured: 1
        };
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredBurger
        }).then(function() {
            console.log("Burger Devoured");
            location.reload;
        });
    });

    $(".trashburger").on("click", function(event) {
        event.preventDefault();

        var id = $(this).data("id");

        $.ajax({
            type: "DELETE",
            url: "/api/burgers/" + id
        }).then(location.reload());
    });
  

});