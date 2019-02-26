const express = require('express');
const router = express.Router();
const Hero = require("../model/hero")

//read all data
router.get('/hero', function (req, res, next) {
    // console.log(req.getAllResponseHeaders());
    // console.log(req.headers['canfly'] ,Boolean('true'));
    Hero.find().then((value) => res.send(value)).catch(next);
    //res.send({ "type": "Get Request" });
});

//read with can fly validation
router.get('/hero-canFly', function (req, res, next) {
    // console.log(req.getAllResponseHeaders());
    //console.log(req.headers['canfly'] ,Boolean('true'));
    Hero.find({canFly:Boolean(req.headers['canfly'])}).then((value) => res.send(value)).catch(next);
    //res.send({ "type": "Get Request" });
});


//read with id
router.get('/hero/:id', function (req, res, next) {
    console.log(req.header);
    Hero.findById({ _id: req.params.id }).then((value) => res.send(value)).catch(next);
    //res.send({ "type": "Get Request" });
});

//insert data
router.post('/hero', function (req, res, next) {
    /* let hero = new Hero(req.body);
    hero.save(); */
    Hero.create(req.body).then((value) => res.send("Data is saved successfully")).catch(next);

});

//update with id
router.put('/hero/:id', function (req, res, next) {
    console.log(req.params.id);
    Hero.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        // Hero.findByIdAndUpdate({ _id: req.params.id }, {$mul:{fightsWon:3}}).then(() => {
        Hero.findById({ _id: req.params.id }).then((value) => res.send(value)).catch(next);
    }).catch(next);
    // res.send("put Request");
});


//update with conditions
router.put('/hero', function (req, res, next) {
    // Hero.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Hero.updateMany({ $and: [{ fightsWon: { $gt: 10 } }, { $and: [{ superPower: { $in: ["Fly"] } }, { superPower: { $in: ["Fly"] } }] }] },
        { $mul: { fanFollowing: 2 } }).then(() => {
            Hero.find({ $and: [{ fightsWon: { $gt: 10 } }, { $and: [{ superPower: { $in: ["Fly"] } }, { superPower: { $in: ["Fly"] } }] }] })
                .then((value) => res.send(value)).catch(next);
        }).catch(next);
    // res.send("put Request");
});


//delete by id
router.delete('/hero/:id', function (req, res, next) {
    Hero.findByIdAndRemove({ _id: req.params.id }).then((value) => res.send(value)).catch(next);

});

//delete with conditions
router.delete('/hero-thanos', function (req, res, next) {
    Hero.remove({$where: "this.superPower.length <= 2"}).then((value) => res.send(value)).catch(next);
    // res.send("hi");

});



module.exports = router;