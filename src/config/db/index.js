const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/ocean_education_dev');
    console.log("sucsses");
    } catch (error) {
        console.log("faild");
    }
}
module.exports = {connect}