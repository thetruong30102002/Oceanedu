const Course = require("../models/Course");
const { mongoosetoObject } = require("../../util/mongoose");
class CourseController {
  //[GET] / courses/:slug
  show(req, res) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mongoosetoObject(course) });
      })
      .catch((err) => {
        {
          console.log(err);
        }
      });
  }
  create(req, res) {
    res.render("courses/create");
  }
  //[POST] / courses/store
  stored(req, res) {
    const formData = req.body;

    formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_g6AArgIigIMCAAQARhlIE0oQzAP&rs=AOn4CLDt1PGzlRM667v1pjR-g61gdoqx2Q"`;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect("/me/course/stored"))
      .catch((error) => {});
  }

  edit(req, res) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", { course: mongoosetoObject(course) })
      )
      .catch((error) => {});
  }
  //PUT
  update(req, res) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch((error) => {});
  }
  //delete
  destroy(req, res) {
    Course.delete({ _id: req.params.id }, req.body).then(() =>
      res.redirect("/me/stored/courses")
    );

    // Soft DELETE
    //Restore
  }
  forcedestroy(req, res) {
    Course.deleteOne({ _id: req.params.id }, req.body).then(() =>
      res.redirect("/me/stored/courses")
    );
  }
  restore(req, res) {
    Course.restore({ _id: req.params.id }, req.body).then(() =>
      res.redirect("/me/stored/courses")
    );
  }

  //[POST] /courses/handle-form-action
  handleFormAction(req, res) {
    switch (req.body.action) {
      case "delete":
      Course.delete({ _id: {$in: req.body.courseIds}}).then(() =>
          res.redirect("/me/stored/courses")
        );
        break;
      default:
        res.json({ message: "Action is invaled" });
    }
  }
}
module.exports = new CourseController();
