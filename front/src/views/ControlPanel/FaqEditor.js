import { useLayoutEffect, useContext } from 'react';
import { AppContext } from '../../App';
import {
    access_denied, 
    faq_editor, faq_is_empty, 
    english, french, japanese, 
    question, answer, 
    question_eng, answer_eng, question_fr, answer_fr, question_jp, answer_jp, 
    add_question, edit_question, delete_question, confirm_delete_question 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import package_info from '../../../package.json';

const icon_lock = <FontAwesomeIcon icon={faUserLock} />;
const icon_add = <FontAwesomeIcon icon={faPlus} />;
const icon_edit = <FontAwesomeIcon icon={faEdit} />;
const icon_delete = <FontAwesomeIcon icon={faTrash} />;

const FaqEditor = (props) => 
{
    const ct = useContext(AppContext);

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
            fetch(`${package_info.api}/faq/${ct.lang}/add`,
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
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                props.set_questions(json.is_success ? json.data : []);

                e.target[0].value = '';
                e.target[1].value = '';
                e.target[2].value = '';
                e.target[3].value = '';
                e.target[4].value = '';
                e.target[5].value = '';
            });
            //.catch(err => console.log(err));
        }
    };

    const handle_edit = (e) => 
    {
        const eng_edited_question = window.prompt(question_eng(ct.lang), e.question[0]);
        let eng_edited_answer = '';
        let fr_edited_question = '';
        let fr_edited_answer = '';
        let jp_edited_question = '';
        let jp_edited_answer = '';

        if (!eng_edited_question)
            return;

        eng_edited_answer = window.prompt(answer_eng(ct.lang), e.answer[0]);
        if (!eng_edited_answer)
            return;

        fr_edited_question = window.prompt(question_fr(ct.lang), e.question[1]);
        if (!fr_edited_question)
            return;

        fr_edited_answer = window.prompt(answer_fr(ct.lang), e.answer[1]);
        if (!fr_edited_answer)
            return;

        jp_edited_question = window.prompt(question_jp(ct.lang), e.question[2]);
        if (!jp_edited_question)
            return;

        jp_edited_answer = window.prompt(answer_jp(ct.lang), e.answer[2]);
        if (!jp_edited_answer)
            return;


        if (eng_edited_question !== '' && eng_edited_answer !== '' && fr_edited_question !== '' && fr_edited_answer !== '' && jp_edited_question !== '' && jp_edited_answer !== '')
        {
            fetch(`${package_info.api}/faq/${ct.lang}/edit`,
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
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                props.set_questions(json.is_success ? json.data : []);
            });
            //.catch(err => console.log(err));
        }
    };

    const handle_delete = (e) => 
    {
        if (window.confirm(confirm_delete_question(ct.lang)))
        {
            fetch(`${package_info.api}/faq/${ct.lang}/remove`,
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
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                props.set_questions(json.is_success ? json.data : []);
            });
            //.catch(err => console.log(err));
        }
    };

    useLayoutEffect(() => 
    {
        const arr_faq = [];

        if (!props.questions)
        {
            fetch(`${package_info.api}/faq/${ct.lang}/all`)
            .then(res => res.json())
            .then(json =>
            {
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);

                if (json.is_success)
                {
                    json.data.forEach(e => arr_faq.push(
                    {
                        _id: e._id,
                        question: e.question,
                        answer: e.answer,
                        is_deployed: false
                    }));
                }

                props.set_questions(arr_faq);
            });
            //.catch(err => console.log(err));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main>
            <h1 className="title">{faq_editor(ct.lang)}</h1>

            {!props.is_access_granted ? 
                <p className="txt_access_denied"><span className="icon lock">{icon_lock}</span> {access_denied(ct.lang)}</p>
            :
            <div id="faq_editor">
                <form onSubmit={handle_add}>
                    <div id="languages">
                        <div>
                            <label htmlFor="eng_ques">{english(ct.lang)}</label>
                            <input type="text" name="new_question" id="eng_ques" placeholder={question(ct.lang)} />
                            <input type="text" name="new_answer" placeholder={answer(ct.lang)} />
                        </div>
                        <div>
                            <label htmlFor="fr_ques">{french(ct.lang)}</label>
                            <input type="text" name="new_question" id="fr_ques" placeholder={question(ct.lang)} />
                            <input type="text" name="new_answer" placeholder={answer(ct.lang)} />
                        </div>
                        <div>
                            <label htmlFor="jp_ques">{japanese(ct.lang)}</label>
                            <input type="text" name="new_question" id="jp_ques" placeholder={question(ct.lang)} />
                            <input type="text" name="new_answer" placeholder={answer(ct.lang)} />
                        </div>
                    </div>

                    <button className="button" title={add_question(ct.lang)}><span className="icon">{icon_add}</span></button>
                </form>

                {!props.questions?.length ?
                    <p className="txt_centered">{faq_is_empty(ct.lang)}</p>
                :
                    <ol>
                        {props.questions?.map(e => 
                            <li key={e._id}>
                                <div>
                                    <div className="display_question">
                                        <div title={english(ct.lang)}><p><strong>{e.question[0]}</strong>{e.answer[0]}</p></div>
                                        <div title={french(ct.lang)}><p><strong>{e.question[1]}</strong>{e.answer[1]}</p></div>
                                        <div title={japanese(ct.lang)}><p><strong>{e.question[2]}</strong>{e.answer[2]}</p></div>
                                    </div>

                                    <span className="faq_icons">
                                        <button className="button" title={edit_question(ct.lang)} onClick={() => handle_edit(e)}><span className="icon">{icon_edit}</span></button>
                                        <button className="button" title={delete_question(ct.lang)} onClick={() => handle_delete(e)}><span className="icon">{icon_delete}</span></button>
                                    </span>
                                </div>
                            </li>)}
                    </ol>}
            </div>}
        </main>
    );
};

export default FaqEditor;

