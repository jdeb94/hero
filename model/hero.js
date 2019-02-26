const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HeroSchema = new Schema({
    heroName: {
        type: String
    },
    heroHeight: {
        type: Number
    },
    heroType: {
        type: Boolean,
        default: false
    },
    canFly: {
        type: Boolean,
        default: false
    },
    fanFollowing: {
        type: Number
    },
    superPower: {
        type: Array
    },
    fightsWon: {
        type: Number
    }
});
const Hero = mongoose.model("hero", HeroSchema);
module.exports = Hero;