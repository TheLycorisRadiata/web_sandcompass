const Question = require('../models/question');
const {
    success_questions_retrieval, failure_questions_retrieval, 
    success_question_created, failure_question_created, failure, 
    success_question_edited, failure_question_edited, 
    success_question_removed, failure_question_removed 
} = require('../lang');

const retrieve_all_questions = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Question.find()
    .then(questions => res.status(200).json({ is_success: true, message: success_questions_retrieval(lang, questions.length), data: questions }))
    .catch(err => res.status(400).json({ is_success: false, message: failure_questions_retrieval(lang), error: err }));
};

const add_question = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    new Question(
    {
        question: req.body.arr_question,
        answer: req.body.arr_answer
    })
    .save()
    .then(() => 
    {
        Question.find()
        .then(questions => res.status(201).json({ is_success: true, message: success_question_created(lang), data: questions }))
        .catch(err => res.status(400).json({ is_success: false, message: failure_question_created(lang), error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
};

const edit_question = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Question.updateOne({ _id: req.body._id },
    {
        question: req.body.arr_question,
        answer: req.body.arr_answer
    })
    .then(() => 
    {
        Question.find()
        .then(questions => res.status(200).json({ is_success: true, message: success_question_edited(lang), data: questions }))
        .catch(err => res.status(400).json({ is_success: false, message: failure_question_edited(lang), error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
};

const remove_question = (req, res) => 
{
    const lang = parseInt(req.params.lang);

    Question.deleteOne({ _id: req.body._id })
    .then(() => 
    {
        Question.find()
        .then(questions => res.status(200).json({ is_success: true, message: success_question_removed(lang), data: questions }))
        .catch(err => res.status(400).json({ is_success: false, message: failure_question_removed(lang), error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
};

module.exports = 
{
    retrieve_all_questions,
    add_question,
    edit_question,
    remove_question
};

