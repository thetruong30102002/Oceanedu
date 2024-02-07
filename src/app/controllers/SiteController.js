const Course = require("../models/Course");
const {mutipleMongoosetoObject} = require("../../util/mongoose")
class SiteController {
  //[GET] /
  index(req, res) {
    Course.find({})
      .then((courses) =>{
      
        res.render("home",{courses: mutipleMongoosetoObject(courses) })}
      )
      .catch((err) => console.log(err));
  }
  //[GET] /search
  search(req, res) {
    res.render("search");
  }
}
module.exports = new SiteController();
