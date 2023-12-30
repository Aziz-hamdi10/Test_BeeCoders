const express = require('express');
const router = express.Router();
const course = require('../models/course');

module.exports = router;

const multer = require('multer');

const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect) => {
        let date = Date.now();
        let f1 = date + '.' + file.mimetype.split('/')[1];
        redirect(null, f1);
        filename = f1;
    }
});

const upload = multer({ storage: mystorage });

router.post('/addcourse', upload.any('image'), (req, res) => {
    data = req.body;
    const newCourse = new course(data);
    newCourse.image = filename;
    filename = '';

    newCourse.save()
        .then(savedCourse => {
            console.log(savedCourse);
            res.send(savedCourse); 
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
});

router.get('/getcourses', (req, res) => {
    course.find()
        .then(courses => {
            console.log("get");
            res.send(courses);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
});
router.get('/getcourse/:id', (req, res) => {
    const courseId = req.params.id;

    course.findById(courseId)
        .then(course => {
            if (!course) {
                return res.status(404).send({ error: 'Course not found' });
            }

            res.send(course);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
});

router.delete('/deletecourse/:id', (req, res) => {
    const courseId = req.params.id;

    course.findOneAndDelete({ _id: courseId })
        .then(deletedCourse => {
            console.log(deletedCourse);
            res.send(deletedCourse);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
});

router.put('/updatecourse/:id', (req, res) => {
    const courseId = req.params.id;
    const data = req.body;

    console.log('Request Params:', req.params);
    console.log('Request Body:', req.body);

    course.findByIdAndUpdate({ _id: courseId }, data, { new: true })
        .then(updatedCourse => {
            if (!updatedCourse) {
                return res.status(404).send({ error: 'Course not found' });
            }

            res.send(updatedCourse);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
});

