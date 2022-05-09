const router = require('express').Router();

const { fetchPracticePaperByExamType } = require('../controllers/PartialFetch/PracticePaperList');
const { fetchPracticePaperById, postPracticePaper, addQuestion, editQuestion, deleteQuestion } = require('../controllers/Profile/PractisePaper');

router.get('/practice_paper/fetch/:paperId', fetchPracticePaperById);
router.get('/practice_paper/fetch/', fetchPracticePaperByExamType);
router.post('/practice_paper/post', postPracticePaper);
router.patch('/question/add/', addQuestion);
router.patch('/question/edit', editQuestion);
router.delete('/question/delete', deleteQuestion);

module.exports = router;