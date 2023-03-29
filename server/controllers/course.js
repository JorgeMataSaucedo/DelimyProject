const Course = require('../models/course');
const image = require('../utils/image');

function createCourse(req, res) {
    const course = new Course(req.body);
    if (req.files.miniature) {
        const imagePath = req.files.miniature.path.replace(/\\/g, '/');
        const imagePathWithoutUploads = imagePath.substring('uploads'.length + 1);
        course.miniature = imagePathWithoutUploads;
        console.log(imagePathWithoutUploads);
    }
    course.save((err, courseStored) => {
        if (err) {
            res.status(500).send({ message: "Server error" });
        } else {
            if (!courseStored) {
                res.status(404).send({ message: "Course not found" });
            } else {
                res.status(200).send({ course: courseStored });
            }
        }
    });
}

function updateCourse(req, res) {
    const { id } = req.params;
    const courseData = req.body;

    if (req.files.miniature) {
        const imagePath = req.files.miniature.path.replace(/\\/g, '/');
        const imagePathWithoutUploads = imagePath.substring('uploads'.length + 1);
        courseData.miniature = imagePathWithoutUploads;
        console.log(imagePathWithoutUploads);
    }

    Course.findByIdAndUpdate({ _id: id }, courseData, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error al actualizar el curso" });
        } else {
            res.status(200).send({ msg: "Actualizacion correcta" });
        }
    });
}


function deleteCourse(req, res) {
    const { id } = req.params;

    Course.findByIdAndDelete(id, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error al eliminar el curso" });
        } else {
            res.status(200).send({ msg: "Curso eliminado" });
        }
    });
}

function getCourse(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    Course.paginate({}, options, (error, courses) => {
        if (error) {
            res.status(400).send({ msg: "Error al obtener los cursos" });
        } else {
            res.status(200).send(courses);
        }
    });
}

module.exports = {
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse,
}