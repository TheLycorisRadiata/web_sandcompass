import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { DateInLetters, Time } from './Time';
import { backend } from '../../../package.json';

const icon_fetch = <FontAwesomeIcon icon={faRedoAlt} />;

const NewsletterEditor = () => 
{
    const [newsletters, set_newsletters] = useState([]);
    const [selected_newsletter, set_selected_newsletter] = useState('default');
    const [object, set_object] = useState('');
    const [html_message, set_html_message] = useState('<hr /><h1 style="text-align: center;">Hello world!</h1><hr /><p>Lorem ipsum</p>');
    const [checkbox, set_checkbox] = useState(false);

    const fetch_newsletters = (trigger_alert) => 
    {
        fetch(backend + '/mailing/newsletter/all')
        .then(res => res.json())
        .then(json => 
        {
            console.log(json.message);
            if (!json.is_success)
                console.log(json.error);
            if (trigger_alert)
                alert(json.message);
            set_newsletters(json.data);
        })
        .catch(err => console.log(err));
    };
    
    const clear_form = () => 
    {
        set_selected_newsletter('default');
        set_object('');
        set_html_message('<hr /><h1 style="text-align: center;">Hello world!</h1><hr /><p>Lorem ipsum</p>');
        set_checkbox(false);
    };

    const handle_select = e => 
    {
        const option = e.target.value;

        if (option === 'new')
            clear_form();
        else if (option !== 'default')
        {
            set_object(newsletters[option].object);
            set_html_message(newsletters[option].html_message);
            set_checkbox(false);
        }

        set_selected_newsletter(option);
    };

    const handle_submit = e => 
    {
        // e.target[0].value --> selected_newsletter
        const newsletter = 
        {
            object: e.target[1].value,
            html_message: e.target[2].value,
            do_send: e.target[3].checked,
            _id: selected_newsletter === 'new' ? null : newsletters[selected_newsletter]._id
        };

        e.preventDefault();

        if (newsletter.object === '' || newsletter.html_message === '')
            alert('The object and the message must be filled.');
        else
        {
            fetch(backend + '/mailing/newsletter/send',
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newsletter: newsletter })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                alert(json.message);
                
                if (json.is_success)
                {
                    clear_form();
                    fetch_newsletters(false);
                }
            })
            .catch(err => console.log(err));
        }
    };

    return (
        <section id="newsletter_editor">
            <h2 className="sub_title">Newsletters</h2>
            <button className="button" title="Refresh newsletters" onClick={() => fetch_newsletters(true)}><span className="icon">{icon_fetch}</span></button>
    
            <form onSubmit={handle_submit}>
                <select defaultValue="default" onChange={handle_select}>
                    <option value="default" disabled>Select a newsletter</option>
                    <option value="new">Write a new newsletter</option>
                    {newsletters.map((e, i) => <option key={"newsletter_" + i} value={i}>{e.is_sent ? '[Sent]' : '[Not sent]'} {e.object}</option>)}
                </select>

                {selected_newsletter === 'default' ?
                    null
                : selected_newsletter === 'new' || !newsletters[selected_newsletter].is_sent ?
                    <>
                        <input type="text" name="object" placeholder="Object" title="Object" value={object} onChange={e => set_object(e.target.value)} />
                        <textarea title="Message" value={html_message} onChange={e => set_html_message(e.target.value)}></textarea>

                        <div id="preview_newsletter" dangerouslySetInnerHTML={{__html: html_message}} />

                        <div className="div_pointer">
                            <input type="checkbox" name="send" id="send" checked={checkbox} onChange={() => set_checkbox(checkbox ? false : true)} />
                            <label htmlFor="send">Send the newsletter to subscribers</label>
                        </div>

                        <input type="submit" className="button" value="Confirm" />
                    </>
                : 
                    <div>
                        <p><strong>Object:</strong> {newsletters[selected_newsletter].object}</p>
                        <p><strong>Date:</strong> <DateInLetters raw_time={newsletters[selected_newsletter].date} /> at <Time raw_time={newsletters[selected_newsletter].date} seconds={true} /></p>
                        <p><strong>Message:</strong></p>
                        <div id="preview_newsletter" dangerouslySetInnerHTML={{__html: newsletters[selected_newsletter].html_message}} />
                    </div>}
            </form>
        </section>
    );
};

export default NewsletterEditor;

