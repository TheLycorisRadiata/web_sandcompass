import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const icon_close = <FontAwesomeIcon icon={faChevronUp} />;
const icon_open = <FontAwesomeIcon icon={faChevronDown} />;

const Faq = (props) => 
{
    const handle_chevrons = (element, index) =>
    {
        const arr = props.questions.map(obj => ({...obj}));

        arr[index].is_deployed = arr[index].is_deployed ? false : true;
        props.set_questions(arr);
    };

    return (
        <main id="faq">
            <h1 className="title">Frequently Asked Questions</h1>
            {!props.questions.length ?
                <p className="txt_centered">The FAQ is empty.</p>
            :
                <>
                    {props.questions.map((e, i) =>
                        <div key={"qa" + i}>
                            <p className="question" onClick={() => handle_chevrons(e, i)}>
                                <span className="icon">{e.is_deployed ? icon_close : icon_open}</span>
                                <strong>{e.question[0]}</strong>
                                <span className="icon">{e.is_deployed ? icon_close : icon_open}</span>
                            </p>
                            {e.is_deployed && <p className="answer">{e.answer[0]}</p>}
                        </div>
                    )}
                </>}
        </main>
    );
};

export default Faq;

