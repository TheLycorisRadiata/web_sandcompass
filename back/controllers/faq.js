const Question = require('../models/question');
const Token = require('../models/token');
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
    const id_token = decodeURIComponent(req.body.id_token);
    const id_hashed_account = decodeURIComponent(req.body.id_account);

    const arr_question = req.body.arr_question;
    const arr_answer = req.body.arr_answer;
    let is_input_valid = true;

    // Input must be two arrays of 3 elements each
    if (!Array.isArray(arr_question) || !Array.isArray(arr_answer) 
        || arr_question.length !== 3 || arr_answer.length !== 3)
        is_input_valid = false;

    // Elements must be non-empty strings
    for (const element of arr_question)
    {
        if (!element || typeof element !== 'string')
        {
            is_input_valid = false;
            break;
        }
    }

    if (is_input_valid)
    {
        for (const element of arr_answer)
        {
            if (!element || typeof element !== 'string')
            {
                is_input_valid = false;
                break;
            }
        }
    }

    // Input is invalid
    if (!is_input_valid)
    {
        res.status(400).json({ is_success: false, message: failure(lang) });
        return;
    }

    // Protect the access with an admin token
    Token.findOne({ code: id_token })
    .then(token => 
    {
        if (!token || token.action !== 'login')
            res.status(400).json({ is_success: false, message: failure(lang) });
        else
        {
            User.findOne({ _id: token.account, is_admin: true })
            .then(admin => 
            {
                if (!admin)
                    res.status(400).json({ is_success: false, message: failure(lang) });
                else if (bcrypt.compareSync(admin._id.toString(), id_hashed_account))
                {
                    // Access granted
                    new Question(
                    {
                        question: arr_question,
                        answer: arr_answer
                    })
                    .save()
                    .then(() => 
                    {
                        Question.find()
                        .then(questions => res.status(201).json({ is_success: true, message: success_question_created(lang), data: questions }))
                        .catch(err => res.status(400).json({ is_success: false, message: failure_question_created(lang), error: err }));
                    })
                    .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
                }
                else
                    res.status(400).json({ is_success: false, message: failure(lang) });
            })
            .catch(err => res.status(400).json({ is_success: false, message: failure(lang), error: err }));
        }
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

