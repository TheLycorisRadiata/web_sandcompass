import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { backend } from '../../../package.json';

const icon_lock = <FontAwesomeIcon icon={faUserLock} />;
const icon_add = <FontAwesomeIcon icon={faPlus} />;
const icon_edit = <FontAwesomeIcon icon={faEdit} />;
const icon_delete = <FontAwesomeIcon icon={faTrash} />;

const FaqEditor = (props) => 
{
    const handle_add = (e) => 
    {
        e.preventDefault();

        if (e.target[0].value !== '' && e.target[1].value !== '')
        {
            fetch(backend + '/faq/add',
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    question: e.target[0].value,
                    answer: e.target[1].value
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                props.set_questions(json.is_success ? json.data : []);
                e.target[0].value = '';
                e.target[1].value = '';
            })
            .catch(err => console.log(err));
        }
    };

    const handle_edit = (e) => 
    {
        const edited_question = window.prompt('Question', e.question);
        let edited_answer = '';

        if (!edited_question)
            return;

        edited_answer = window.prompt('Answer', e.answer);

        if (!edited_answer)
            return;

        if (edited_question !== '' && edited_answer !== '' && (edited_question !== e.question || edited_answer !== e.answer))
        {
            fetch(backend + '/faq/edit',
            {
                method: 'PUT',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    _id: e._id,
                    question: edited_question,
                    answer: edited_answer
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                props.set_questions(json.is_success ? json.data : []);
            })
            .catch(err => console.log(err));
        }
    };

    const handle_delete = (e) => 
    {
        if (window.confirm('Are you sure you want to delete the question?'))
        {
            fetch(backend + '/faq/remove',
            {
                method: 'DELETE',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: e._id })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                props.set_questions(json.is_success ? json.data : []);
            })
            .catch(err => console.log(err));
        }
    };

    return (
        <main>
            <h1 className="title">Frequently Asked Questions</h1>

            {!props.is_access_granted ? 
                <p className="txt_access_denied"><span className="icon lock">{icon_lock}</span> Access denied.</p>
            :
            <div id="faq_editor">
                <form onSubmit={handle_add}>
                    <input type="text" name="new_question" placeholder="Question" />
                    <input type="text" name="new_answer" placeholder="Answer" />
                    <button className="button" title="Add a new question question"><span className="icon">{icon_add}</span></button>
                </form>

                {!props.questions?.length ?
                    <p className="txt_centered">The FAQ is empty.</p>
                :
                    <ol>
                        {props.questions?.map(e => 
                            <li key={e._id}>
                                <p>
                                    <strong>{e.question}</strong>
                                    <br />
                                    {e.answer}

                                    <span className="faq_icons">
                                        <button className="button" title="Edit the question" onClick={() => handle_edit(e)}><span className="icon">{icon_edit}</span></button>
                                        <button className="button" title="Delete the question" onClick={() => handle_delete(e)}><span className="icon">{icon_delete}</span></button>
                                    </span>
                                </p>
                            </li>)}
                    </ol>}
            </div>}
        </main>
    );
};

export default FaqEditor;

