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
        const eng_question = e.target[0].value;
        const eng_answer = e.target[1].value;
        const fr_question = e.target[2].value;
        const fr_answer = e.target[3].value;
        const jp_question = e.target[4].value;
        const jp_answer = e.target[5].value;

        e.preventDefault();

        if (eng_question !== '' && eng_answer !== '' && fr_question !== '' && fr_answer !== '' && jp_question !== '' && jp_answer !== '')
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
                    arr_question: [eng_question, fr_question, jp_question],
                    arr_answer: [eng_answer, fr_answer, jp_answer]
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
                e.target[2].value = '';
                e.target[3].value = '';
                e.target[4].value = '';
                e.target[5].value = '';
            })
            .catch(err => console.log(err));
        }
    };

    const handle_edit = (e) => 
    {
        const eng_edited_question = window.prompt('Question (English)', e.question[0]);
        let eng_edited_answer = '';
        let fr_edited_question = '';
        let fr_edited_answer = '';
        let jp_edited_question = '';
        let jp_edited_answer = '';

        if (!eng_edited_question)
            return;

        eng_edited_answer = window.prompt('Answer (English)', e.answer[0]);
        if (!eng_edited_answer)
            return;

        fr_edited_question = window.prompt('Question (French)', e.question[1]);
        if (!fr_edited_question)
            return;

        fr_edited_answer = window.prompt('Answer (French)', e.answer[1]);
        if (!fr_edited_answer)
            return;

        jp_edited_question = window.prompt('Question (Japanese)', e.question[2]);
        if (!jp_edited_question)
            return;

        jp_edited_answer = window.prompt('Answer (Japanese)', e.answer[2]);
        if (!jp_edited_answer)
            return;


        if (eng_edited_question !== '' && eng_edited_answer !== '' && fr_edited_question !== '' && fr_edited_answer !== '' && jp_edited_question !== '' && jp_edited_answer !== '')
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
                    arr_question: [eng_edited_question, fr_edited_question, jp_edited_question],
                    arr_answer: [eng_edited_answer, fr_edited_answer, jp_edited_answer]
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
                    <div id="languages">
                        <div>
                            <label htmlFor="eng_ques">English</label>
                            <input type="text" name="new_question" id="eng_ques" placeholder="Question" />
                            <input type="text" name="new_answer" placeholder="Answer" />
                        </div>
                        <div>
                            <label htmlFor="fr_ques">French</label>
                            <input type="text" name="new_question" id="fr_ques" placeholder="Question" />
                            <input type="text" name="new_answer" placeholder="Réponse" />
                        </div>
                        <div>
                            <label htmlFor="jp_ques">Japanese</label>
                            <input type="text" name="new_question" id="jp_ques" placeholder="Question" />
                            <input type="text" name="new_answer" placeholder="Answer" />
                        </div>
                    </div>

                    <button className="button" title="Add a new question question"><span className="icon">{icon_add}</span></button>
                </form>

                {!props.questions?.length ?
                    <p className="txt_centered">The FAQ is empty.</p>
                :
                    <ol>
                        {props.questions?.map(e => 
                            <li key={e._id}>
                                <div>
                                    <div className="display_question">
                                        <div title="English"><p><strong>{e.question[0]}</strong>{e.answer[0]}</p></div>
                                        <div title="French"><p><strong>{e.question[1]}</strong>{e.answer[1]}</p></div>
                                        <div title="Japanese"><p><strong>{e.question[2]}</strong>{e.answer[2]}</p></div>
                                    </div>

                                    <span className="faq_icons">
                                        <button className="button" title="Edit the question" onClick={() => handle_edit(e)}><span className="icon">{icon_edit}</span></button>
                                        <button className="button" title="Delete the question" onClick={() => handle_delete(e)}><span className="icon">{icon_delete}</span></button>
                                    </span>
                                </div>
                            </li>)}
                    </ol>}
            </div>}
        </main>
    );
};

export default FaqEditor;

