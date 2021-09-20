import { useState } from 'react';

const EbookFormatPicker = () =>
{
    const questions = 
    [
        'Do you have an e-reader?', 
        'Kindle or other?', 
        'Do you have a computer of yours?', 
        'Do you prefer to read on it or on a smartphone/tablet?', 
        'Are you currently on your computer?', 
        'Are you on your smartphone or tablet?'
    ];

    const options = 
    [
        'Yes.', 
        'No.', 
        'What is it?', 
        'Kindle.', 
        'Other.', 
        'No, and I am on a computer that doesn\'t belong to me.', 
        'No, but I am on my smartphone or my tablet.', 
        'Computer.', 
        'Smartphone or tablet.'
    ];

    const answers = 
    [
        'Download the AZW file, plug in the e-reader, and slide the file in there. You can now read anytime!', 
        'Download the ePub file, plug in the e-reader, and slide the file in there. You can now read anytime!', 
        'Come back with your smartphone or tablet, install Adobe Acrobat, download the PDF file, and open it. You can now read anytime!', 
        'Install Adobe Acrobat, download the PDF file, and open it. You can now read anytime!', 
        'Download the ePub file, and open it. You can now read anytime!', 
        'Come back with your computer, download the ePub file, and open it. You can now read anytime!', 
        'Come back with your smartphone or tablet, install Adobe Acrobat, download the PDF file, and open it. You can now read anytime!'
    ];

    const [question, set_question] = useState(questions[0]);
    const [option1, set_option1] = useState(options[0]);
    const [option2, set_option2] = useState(options[1]);
    const [option3, set_option3] = useState(options[2]);
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
        set_question(questions[0]);
        set_option1(options[0]);
        set_option2(options[1]);
        set_option3(options[2]);
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
                case questions[0]:
                    if (user_choice === option1)
                    {
                        set_question(questions[1]);
                        set_option1(options[3]);
                        set_option2(options[4]);
                        set_option3('');
                    }
                    else
                    {
                        set_question(questions[2]);
                        set_option1(options[0]);
                        set_option2(options[5]);
                        set_option3(options[6]);
                    }
                    set_user_choice('');
                    break;
                case questions[1]:
                    set_is_questionnaire_finished(true);
                    user_choice === option1 ? set_answer(answers[0]) : set_answer(answers[1]);
                    set_user_choice('');
                    break;
                case questions[2]:
                    if (user_choice === option1)
                    {
                        set_question(questions[3]);
                        set_option1(options[7]);
                        set_option2(options[8]);
                        set_option3('');
                    }
                    else
                    {
                        set_is_questionnaire_finished(true);
                        user_choice === option2 ? set_answer(answers[2]) : set_answer(answers[3]);
                    }
                    set_user_choice('');
                    break;
                case questions[3]:
                    if (user_choice === option1)
                    {
                        set_question(questions[4]);
                        set_option1(options[0]);
                        set_option2(options[1]);
                        set_option3('');
                    }
                    else
                    {
                        set_question(questions[5]);
                        set_option1(options[0]);
                        set_option2(options[1]);
                        set_option3('');
                    }
                    set_user_choice('');
                    break;
                case questions[4]:
                    set_is_questionnaire_finished(true);
                    user_choice === option1 ? set_answer(answers[4]) : set_answer(answers[5]);
                    set_user_choice('');
                    break;
                case questions[5]:
                    set_is_questionnaire_finished(true);
                    user_choice === option1 ? set_answer(answers[3]) : set_answer(answers[6]);
                    set_user_choice('');
                    break;
                default:
                    alert('An error occurred with the questionnaire.\nRestarting at question 1...');
                    set_question(questions[0]);
                    set_option1(options[0]);
                    set_option2(options[1]);
                    set_option3(options[2]);
                    set_user_choice('');
            }
        }
    };

    return (
        <>
            {!is_questionnaire_finished && 
            <>
                <p><strong>{question}</strong></p>
                <p id="ebook_format_options">
                    <input type="radio" name="option" id="option_1" value="option_1" checked={is_option1_checked} onClick={handle_click_option1} />
                    <label htmlFor="option_1">{option1}</label><br />

                    <input type="radio" name="option" id="option_2" value="option_2" checked={is_option2_checked} onClick={handle_click_option2} />
                    <label htmlFor="option_2">{option2}</label><br />

                    {option3 !== '' && 
                    <>
                        <input type="radio" name="option" id="option_3" value="option_3" checked={is_option3_checked} onClick={handle_click_option3} />
                        <label htmlFor="option_3">{option3}</label>
                    </>}
                </p>
                <input type="button" name="btn_next_ebook_format" id="btn_next_ebook_format" value="Next question" onClick={handle_click_next} />
            </>}

            {is_questionnaire_finished && 
            <>
                <p>{answer}</p>
                <input type="button" name="btn_redo_ebook_format" id="btn_redo_ebook_format" value="Redo" onClick={handle_click_redo} />
            </>}
        </>
    );
}

export default EbookFormatPicker;

