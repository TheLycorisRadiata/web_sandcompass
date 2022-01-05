const Question = require('../models/question');

const retrieve_all_questions = (req, res) => 
{
    Question.find()
    .then(questions => res.status(200).json({ is_success: true, message: questions.length + ' questions loaded.', data: questions }))
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: The questions couldn\'t be retrieved.', error: err }));
};

const add_question = (req, res) => 
{
    new Question(
    {
        question: req.body.question,
        answer: req.body.answer
    })
    .save()
    .then(() => 
    {
        Question.find()
        .then(questions => res.status(201).json({ is_success: true, message: 'Question created', data: questions }))
        .catch(err => res.status(400).json({ is_success: false, message: 'Error: The question couldn\'t be created.', error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: An error occured. See the log.', error: err }));
};

const edit_question = (req, res) => 
{
    Question.updateOne({ _id: req.body._id },
    {
        question: req.body.question,
        answer: req.body.answer
    })
    .then(() => 
    {
        Question.find()
        .then(questions => res.status(200).json({ is_success: true, message: 'Question edited.', data: questions }))
        .catch(err => res.status(400).json({ is_success: false, message: 'Error: The question couldn\'t be edited.', error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: An error occured. See the log.', error: err }));
};

const remove_question = (req, res) => 
{
    Question.deleteOne({ _id: req.body._id })
    .then(() => 
    {
        Question.find()
        .then(questions => res.status(200).json({ is_success: true, message: 'Question removed.', data: questions }))
        .catch(err => res.status(400).json({ is_success: false, message: 'Error: The question couldn\'t be removed.', error: err }));
    })
    .catch(err => res.status(400).json({ is_success: false, message: 'Error: An error occured. See the log.', error: err }));
};

module.exports = 
{
    retrieve_all_questions,
    add_question,
    edit_question,
    remove_question
};

