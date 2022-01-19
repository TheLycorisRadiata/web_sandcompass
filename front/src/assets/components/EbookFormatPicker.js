import { useState, useContext } from 'react';
import { AppContext } from '../../App';
import {
    redo, next_question, ebook_format_picker_error 
} from '../functions/lang';

const EbookFormatPicker = (props) =>
{
    const ct = useContext(AppContext);

    const [question, set_question] = useState(props.questions[0]);
    const [option1, set_option1] = useState(props.options[0]);
    const [option2, set_option2] = useState(props.options[1]);
    const [option3, set_option3] = useState(props.options[2]);
    const [user_choice, set_user_choice] = useState('');
    const [is_option1_checked, set_is_option1_checked] = useState(false);
    const [is_option2_checked, set_is_option2_checked] = useState(false);
    const [is_option3_checked, set_is_option3_checked] = useState(false);
    const [is_questionnaire_finished, set_is_questionnaire_finished] = useState(false);
    const [answer, set_answer] = useState('');

    const handle_click_option1 = () => 
    {
        set_is_option1_checked(true);
        set_is_option2_checked(false);
        set_is_option3_checked(false);
        set_user_choice(option1);
    };

    const handle_click_option2 = () => 
    {
        set_is_option1_checked(false);
        set_is_option2_checked(true);
        set_is_option3_checked(false);
        set_user_choice(option2);
    };

    const handle_click_option3 = () => 
    {
        set_is_option1_checked(false);
        set_is_option2_checked(false);
        set_is_option3_checked(true);
        set_user_choice(option3);
    };

    const handle_click_redo = () => 
    {
        set_question(props.questions[0]);
        set_option1(props.options[0]);
        set_option2(props.options[1]);
        set_option3(props.options[2]);
        set_answer('');
        set_is_questionnaire_finished(false);
    };

    const handle_click_next = () => 
    {
        if (user_choice !== '')
        {
            set_is_option1_checked(false);
            set_is_option2_checked(false);
            set_is_option3_checked(false);

            switch (question)
            {
                case props.questions[0]:
                    if (user_choice === option1)
                    {
                        set_question(props.questions[1]);
                        set_option1(props.options[3]);
                        set_option2(props.options[4]);
                        set_option3('');
                    }
                    else
                    {
                        set_question(props.questions[2]);
                        set_option1(props.options[0]);
                        set_option2(props.options[5]);
                        set_option3(props.options[6]);
                    }
                    set_user_choice('');
                    break;
                case props.questions[1]:
                    set_is_questionnaire_finished(true);
                    user_choice === option1 ? set_answer(props.answers[0]) : set_answer(props.answers[1]);
                    set_user_choice('');
                    break;
                case props.questions[2]:
                    if (user_choice === option1)
                    {
                        set_question(props.questions[3]);
                        set_option1(props.options[7]);
                        set_option2(props.options[8]);
                        set_option3('');
                    }
                    else
                    {
                        set_is_questionnaire_finished(true);
                        user_choice === option2 ? set_answer(props.answers[2]) : set_answer(props.answers[3]);
                    }
                    set_user_choice('');
                    break;
                case props.questions[3]:
                    if (user_choice === option1)
                    {
                        set_question(props.questions[4]);
                        set_option1(props.options[0]);
                        set_option2(props.options[1]);
                        set_option3('');
                    }
                    else
                    {
                        set_question(props.questions[5]);
                        set_option1(props.options[0]);
                        set_option2(props.options[1]);
                        set_option3('');
                    }
                    set_user_choice('');
                    break;
                case props.questions[4]:
                    set_is_questionnaire_finished(true);
                    user_choice === option1 ? set_answer(props.answers[4]) : set_answer(props.answers[5]);
                    set_user_choice('');
                    break;
                case props.questions[5]:
                    set_is_questionnaire_finished(true);
                    user_choice === option1 ? set_answer(props.answers[3]) : set_answer(props.answers[6]);
                    set_user_choice('');
                    break;
                default:
                    alert(ebook_format_picker_error(ct.lang));
                    set_question(props.questions[0]);
                    set_option1(props.options[0]);
                    set_option2(props.options[1]);
                    set_option3(props.options[2]);
                    set_user_choice('');
            }
        }
    };

    return (
        <div id="ebook_format_picker">
            {is_questionnaire_finished ? 
            <>
                <p id="answer">{answer}</p>
                <input type="button" className="button" name="btn_redo_ebook_format" value={redo(ct.lang)} onClick={handle_click_redo} />
            </>
            :
            <>
                <p id="question" className="txt_bold">{question}</p>
                <div>
                    <div className="div_pointer">
                        <input type="radio" name="option" id="option_1" value="option_1" checked={is_option1_checked} onChange={handle_click_option1} />
                        <label htmlFor="option_1">{option1}</label>
                    </div>

                    <div className="div_pointer">
                        <input type="radio" name="option" id="option_2" value="option_2" checked={is_option2_checked} onChange={handle_click_option2} />
                        <label htmlFor="option_2">{option2}</label>
                    </div>

                    {option3 !== '' && 
                    <div className="div_pointer">
                        <input type="radio" name="option" id="option_3" value="option_3" checked={is_option3_checked} onChange={handle_click_option3} />
                        <label htmlFor="option_3">{option3}</label>
                    </div>}
                </div>
                <input type="button" className="button" name="btn_next_ebook_format" value={next_question(ct.lang)} onClick={handle_click_next} />
            </>}
        </div>
    );
}

export default EbookFormatPicker;

