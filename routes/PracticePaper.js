const router = require('express').Router();

const { fetchPracticePaper, postPracticePaper, addQuestion, editQuestion, deleteQuestion } = require('../controllers/Profile/PractisePaper');

router.get('/practice_paper/fetch/', fetchPracticePaper);
router.post('/practice_paper/post/', postPracticePaper);
router.patch('/practice_paper/question/add/', addQuestion);
router.patch('/practice_paper/question/edit', editQuestion);
router.delete('/practice_paper/question/delete', deleteQuestion);

module.exports = router;