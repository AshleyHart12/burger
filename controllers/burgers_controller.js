var express = require("express");
var burger = require("../models/burger.js"); // CONFIRM FILE PATH
var router = express.Router();

router.get("/", function(req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index");
    });
});

// ADD NEW BURGER
router.post("/api/burgers", function (req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function (result) {
        res.json({
            id: result.insertID
        });
    });
});

// SET BURGER TO DEVOURED
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.updateOne({
            devoured: req.body.devoured
        },
        condition,
        function (result) {
            if (result.changeRows === 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
});

// DELETE BURGER FROM DATABASE
// router.deleteOne("/api/burgers/:id", function(req, res) {
//     var condition = "id = " + req.params.id;

//     burger.deleteOne(condition, function (result) {
//         if (result.changeRows === 0) {
//             return res.status(404).end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });


// Export routes for server.js to use.
module.exports = router;