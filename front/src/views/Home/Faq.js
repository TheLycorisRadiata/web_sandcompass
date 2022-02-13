import { useLayoutEffect, useContext } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { AppContext } from '../../App';
import { faq_long, ask_question, faq_is_empty } from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import package_info from '../../../package.json';

const icon_faq = <FontAwesomeIcon icon={faComment} />;
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
        <main id="faq">
            <h1 className="title">{faq_long(ct.lang)}</h1>

            <div id="ask_question">
                <Link to="contact#form" className="button"><span>{ask_question(ct.lang)}</span><span className="icon">{icon_faq}</span></Link>
            </div>

            {!props.questions?.length ?
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

