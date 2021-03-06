import { useEffect, useLayoutEffect, useContext } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { AppContext } from '../../App';
import { faq_long, ask_question, faq_is_empty } from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import package_info from '../../../package.json';

// Markdown display
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const icon_faq = <FontAwesomeIcon icon={faComment} />;
const icon_close = <FontAwesomeIcon icon={faChevronUp} />;
const icon_open = <FontAwesomeIcon icon={faChevronDown} />;

const Faq = (props) => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = faq_long(ct.lang) + ' | Mofumofu';
    document.querySelector('meta[name="description"]').setAttribute('content', props.questions?.slice(0, 5).map(e => { return ' ' + e.question[ct.lang] }));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', faq_long(ct.lang) + ' | Mofumofu');
    document.querySelector('meta[property="og:description"]').setAttribute('content', props.questions?.slice(0, 5).map(e => { return ' ' + e.question[ct.lang] }));

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

    useEffect(() => document.querySelector(window.innerHeight < 700 ? 'main' : 'body')?.scrollIntoView(), []);

    return (
        <main id="faq">
            <h1 className="title">{faq_long(ct.lang)}</h1>

            <div id="ask_question">
                <Link to="/contact" className="button"><span>{ask_question(ct.lang)}</span><span className="icon">{icon_faq}</span></Link>
            </div>

            {!props.questions?.length ?
                <p className="txt_centered">{faq_is_empty(ct.lang)}</p>
            :
                <>
                    {props.questions.map((e, i) =>
                        <div className="qa" key={'qa_' + i}>
                            <div className="question" onClick={() => handle_chevrons(e, i)}>
                                <span className="icon">{e.is_deployed ? icon_close : icon_open}</span>
                                <strong><ReactMarkdown children={e.question[ct.lang]} remarkPlugins={[remarkGfm]} /></strong>
                                <span className="icon">{e.is_deployed ? icon_close : icon_open}</span>
                            </div>
                            {e.is_deployed && <div className="answer"><ReactMarkdown children={e.answer[ct.lang]} remarkPlugins={[remarkGfm]} /></div>}
                        </div>
                    )}
                </>}
        </main>
    );
};

export default Faq;

