var express = require("express");
var burger = require("../models/burger.js") // CONFIRM FILE PATH
var router = express.Router();

router.get("/", function(req, res) {
    // burger.all(function(data) {
    //     var hbsObject = {
    //         burgers: Data
    //     };
        // console.log(hbsObject);
        res.render("index");
    });
// });

router.post("/api/burgers", function(req, res) {
    burger.create([
        "burger_name"
    ], [
        req.body.burger_name
    ], function(result) {
            res.json({ id: result.insertID });
        });
});





// Export routes for server.js to use.
module.exports = router;