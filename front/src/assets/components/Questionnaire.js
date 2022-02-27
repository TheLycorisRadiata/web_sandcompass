import { useState, useLayoutEffect, useContext } from 'react';
import { AppContext } from '../../App';
import {
    error_questionnaire, try_again, 
    redo, next_question 
} from '../functions/lang';
import package_info from '../../../package.json';

const Questionnaire = (props) =>
{
    const ct = useContext(AppContext);

    const [questionnaire, set_questionnaire] = useState([]);
    const [index_question, set_index_question] = useState(0);
    const [user_choice, set_user_choice] = useState(-1);
    const [is_questionnaire_finished, set_is_questionnaire_finished] = useState(false);
    const [answer, set_answer] = useState('');

    const handle_fetch = () => 
    {
        fetch(`${package_info.api}/file/${ct.lang}/questionnaire/ebook_format_picker`)
        .then(res => res.json())
        .then(json => 
        {
            if (json.is_success)
                set_questionnaire(json.data);
        });
        //.catch(err => console.log(err));
    };

    useLayoutEffect(() => 
    {
        handle_fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ct.lang]);

    const handle_click_redo = () => 
    {
        set_index_question(0);
        set_user_choice(-1);
        set_is_questionnaire_finished(false);
        set_answer('');
    };

    const handle_click_next = () => 
    {
        const choice = user_choice;

        if (choice > -1)
        {
            // Reset user choice so everything goes unchecked
            set_user_choice(-1);

            // If "index next question" is defined
            if (questionnaire[index_question].choices[choice].index_next_question)
                set_index_question(questionnaire[index_question].choices[choice].index_next_question);
            else
            {
                set_answer(questionnaire[index_question].choices[choice].answer);
                set_is_questionnaire_finished(true);
            }
        }
    };

    return (
        <div id="questionnaire">
            {!questionnaire.length ? 
                <>
                    <p>{error_questionnaire(ct.lang)}</p>
                    <input type="button" className="button" name="btn_questionnaire_fetch" value={try_again(ct.lang)} onClick={handle_fetch} />
                </>
            :
            <>
                {is_questionnaire_finished ? 
                <>
                    <p id="answer">{answer}</p>
                    <input type="button" className="button" name="btn_questionnaire_redo" value={redo(ct.lang)} onClick={handle_click_redo} />
                </>
                :
                <>
                    <p id="question" className="txt_bold">{questionnaire[index_question]?.question}</p>
                    <div>
                        {questionnaire[index_question]?.choices.map((choice, index) => 
                            <div className="div_pointer" key={'choice_' + index}>
                                <input type="radio" name="choice" id={'choice_' + index} 
                                    value={index} checked={user_choice === index} onChange={e => set_user_choice(parseInt(e.target.value, 10))} />
                                <label htmlFor={'choice_' + index}>{choice.text}</label>
                            </div>)}
                    </div>

                    <div>
                        <input type="button" className="button" name="btn_questionnaire_redo" value={redo(ct.lang)} onClick={handle_click_redo} />
                        <input type="button" className="button" name="btn_questionnaire_next" value={next_question(ct.lang)} onClick={handle_click_next} />
                    </div>
                </>}
            </>}
        </div>
    );
}

export default Questionnaire;

