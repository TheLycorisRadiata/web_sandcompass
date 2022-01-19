import { useContext } from 'react';
import { AppContext } from '../../App';
import { faq_long, faq_is_empty } from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const icon_close = <FontAwesomeIcon icon={faChevronUp} />;
const icon_open = <FontAwesomeIcon icon={faChevronDown} />;

const Faq = (props) => 
{
    const ct = useContext(AppContext);

    const handle_chevrons = (element, index) =>
    {
        const arr = props.questions.map(obj => ({...obj}));

        arr[index].is_deployed = arr[index].is_deployed ? false : true;
        props.set_questions(arr);
    };

    return (
        <main id="faq">
            <h1 className="title">{faq_long(ct.lang)}</h1>
            {!props.questions.length ?
                <p className="txt_centered">{faq_is_empty(ct.lang)}</p>
            :
                <>
                    {props.questions.map((e, i) =>
                        <div key={"qa" + i}>
                            <p className="question" onClick={() => handle_chevrons(e, i)}>
                                <span className="icon">{e.is_deployed ? icon_close : icon_open}</span>
                                <strong>{e.question[ct.lang]}</strong>
                                <span className="icon">{e.is_deployed ? icon_close : icon_open}</span>
                            </p>
                            {e.is_deployed && <p className="answer">{e.answer[ct.lang]}</p>}
                        </div>
                    )}
                </>}
        </main>
    );
};

export default Faq;

