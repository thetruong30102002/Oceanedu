const Course = require("../models/Course");
const {mutipleMongoosetoObject} = require("../../util/mongoose")
class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => 
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongoosetoObject(courses),
                }),
            
            )
            
            .catch(next);
        
    }
    // trashCourses(req, res) {
    //     Course.findDeleted({})
    //     .then(courses => res.render('me/trash-courses', {
    //         courses : mutipleMongoosetoObject(courses)
    //     }))
    //     .catch(error => {
            
    //     });
    // }
    trashCourses(req, res) { 
        Course.findDeleted({ deleted: true })
        .then((courses) => res.render('me/trash-courses', { 
            courses: mutipleMongoosetoObject(courses.filter(course => course.deleted)), }), ) 
            .catch(error => {
            
            });
}

}

module.exports = new MeController();

