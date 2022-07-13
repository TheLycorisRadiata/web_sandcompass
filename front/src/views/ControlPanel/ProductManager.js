import { useState, useLayoutEffect, useEffect, useContext } from 'react';
import Parser from 'html-react-parser';
import { AppContext } from '../../App';
import {
    access_denied, log_out, product_manager, 
    english, french, japanese, 
    select_type, select_subtype, select_genre, book, game, standalone_novel, vrmmorpg, science_fiction, fantasy, 
    title, author_name, release_date, catch_phrase, summary, link_codebase, link_review, 
    browse_system_for_cover_picture, browse_system_for_product, 
    add_product, no_product, edit_product, delete_product, 
    confirm_delete_product
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faSquareXmark, faChevronUp, faChevronDown, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import package_info from '../../../package.json';

const icon_lock = <FontAwesomeIcon icon={faUserLock} />;
const icon_logout = <FontAwesomeIcon icon={faSquareXmark} />;
const icon_close = <FontAwesomeIcon icon={faChevronUp} />;
const icon_open = <FontAwesomeIcon icon={faChevronDown} />;
const icon_add = <FontAwesomeIcon icon={faPlus} />;
const icon_edit = <FontAwesomeIcon icon={faEdit} />;
const icon_delete = <FontAwesomeIcon icon={faTrash} />;

const ProductManager = (props) => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = product_manager(ct.lang) + ' | Mofumofu';
    document.querySelector('meta[name="description"]').setAttribute('content', access_denied(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', product_manager(ct.lang) + ' | Mofumofu');
    document.querySelector('meta[property="og:description"]').setAttribute('content', access_denied(ct.lang));

    const [products, set_products] = useState([]);
    const [is_add_product_open, set_is_add_product_open] = useState(false);
    const [new_product_type, set_new_product_type] = useState('default');

    useLayoutEffect(() => 
    {
        const id_token = document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || '';
        const id_account = document.cookie.match('(^|;)\\s*id\\s*=\\s*([^;]+)')?.pop() || '';

        fetch(`${package_info.api}/product/${ct.lang}/full/all/${id_token}/${id_account}`)
        .then(res => res.json())
        .then(json =>
        {
            //console.log(json.message);
            //if (json.error)
                //console.log(json.error);

            if (json.is_success)
                set_products(json.data);
        });
        //.catch(err => console.log(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => document.querySelector(window.innerHeight < 700 ? 'main' : 'body')?.scrollIntoView(), []);

    const logout = () => 
    {
        const id_token = document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || '';
        const id_account = document.cookie.match('(^|;)\\s*id\\s*=\\s*([^;]+)')?.pop() || '';

        // Make a request so login tokens can be deleted
        fetch(`${package_info.api}/token/${ct.lang}/login/${id_token}/${id_account}/${props.account_data?._id}`,
        {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(json => 
        {
            //if (json.message !== '')
                //console.log(json.message);
            //if (json.error)
                //console.log(json.error);
        });

        // Reset user data
        props.set_is_access_granted(false);
        props.set_account_data(null);
    };

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
            fetch(`${package_info.api}/product/${ct.lang}`,
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    id_token: decodeURIComponent(document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || ''),
                    id_account: decodeURIComponent(document.cookie.match('(^|;)\\s*id\\s*=\\s*([^;]+)')?.pop() || ''),
                    /*product: product*/
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                set_products(json.is_success ? json.data : []);

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

    const handle_edit = async (e) => 
    {
        /*
        const eng_edited_question = await ct.popup('prompt', ct.lang, edit_question(ct.lang), question_eng(ct.lang), e.question[0]);
        let eng_edited_answer = '';
        let fr_edited_question = '';
        let fr_edited_answer = '';
        let jp_edited_question = '';
        let jp_edited_answer = '';

        if (!eng_edited_question)
            return;

        eng_edited_answer = await ct.popup('prompt', ct.lang, edit_answer(ct.lang), answer_eng(ct.lang), e.answer[0]);
        if (!eng_edited_answer)
            return;

        fr_edited_question = await ct.popup('prompt', ct.lang, edit_question(ct.lang), question_fr(ct.lang), e.question[1]);
        if (!fr_edited_question)
            return;

        fr_edited_answer = await ct.popup('prompt', ct.lang, edit_answer(ct.lang), answer_fr(ct.lang), e.answer[1]);
        if (!fr_edited_answer)
            return;

        jp_edited_question = await ct.popup('prompt', ct.lang, edit_question(ct.lang), question_jp(ct.lang), e.question[2]);
        if (!jp_edited_question)
            return;

        jp_edited_answer = await ct.popup('prompt', ct.lang, edit_answer(ct.lang), answer_jp(ct.lang), e.answer[2]);
        if (!jp_edited_answer)
            return;

        if (eng_edited_question !== '' && eng_edited_answer !== '' && fr_edited_question !== '' && fr_edited_answer !== '' && jp_edited_question !== '' && jp_edited_answer !== '')
        {
        */
            fetch(`${package_info.api}/product/${ct.lang}`,
            {
                method: 'PUT',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    id_token: decodeURIComponent(document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || ''),
                    id_account: decodeURIComponent(document.cookie.match('(^|;)\\s*id\\s*=\\s*([^;]+)')?.pop() || ''),
                    /*product: product*/
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                set_products(json.is_success ? json.data : []);
            });
            //.catch(err => console.log(err));
        /*
        }
        */
    };

    const handle_delete = async (e) => 
    {
        if (await ct.popup('confirm', ct.lang, confirm_delete_product(ct.lang)))
        {
            fetch(`${package_info.api}/product/${ct.lang}`,
            {
                method: 'DELETE',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    id_token: decodeURIComponent(document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || ''),
                    id_account: decodeURIComponent(document.cookie.match('(^|;)\\s*id\\s*=\\s*([^;]+)')?.pop() || ''),
                    _id: e._id
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                set_products(json.is_success ? json.data : []);
            });
            //.catch(err => console.log(err));
        }
    };

    return (
        <main>
            <h1 className="title">{product_manager(ct.lang)}</h1>

            {!props.is_access_granted ? 
                <p className="txt_access_denied"><span className="icon lock">{icon_lock}</span> {access_denied(ct.lang)}</p>
            :
            <div id="product_manager">
                <span id="btn_logout" className="a" title={log_out(ct.lang)} onClick={logout}>{icon_logout}</span>

                <button className="button" onClick={() => set_is_add_product_open(!is_add_product_open)}>
                    <span className="icon">{is_add_product_open ? icon_close : icon_open}</span>
                    {add_product(ct.lang)}
                    <span className="icon">{is_add_product_open ? icon_close : icon_open}</span>
                </button>

                {is_add_product_open && 
                <form onSubmit={handle_add}>
                    <input type="text" name="author_name" placeholder={author_name(ct.lang)} />
                    <select name="type" value={new_product_type} onChange={e => set_new_product_type(e.target.value)} autoComplete="new-password">
                        <option disabled value="default">{select_type(ct.lang)}</option>
                        <option value="book">{book(ct.lang)}</option>
                        <option value="game">{game(ct.lang)}</option>
                    </select>
                    <select name="subtype" defaultValue="default" autoComplete="new-password">
                        <option disabled value="default">{select_subtype(ct.lang)}</option>
                        <option value="standalone_novel">{standalone_novel(ct.lang)}</option>
                        <option value="vrmmorpg">{vrmmorpg(ct.lang)}</option>
                    </select>
                    <select name="genre" defaultValue="default" autoComplete="new-password">
                        <option disabled value="default">{select_genre(ct.lang)}</option>
                        <option value="science_fiction">{science_fiction(ct.lang)}</option>
                        <option value="fantasy">{fantasy(ct.lang)}</option>
                    </select>
                    <input type="date" name="release_date" placeholder={release_date(ct.lang)} />
                    <input type="number" name="price_eur" placeholder="EUR" min="0" step=".01" pattern="^\d*(\.\d{0,2})?$" />
                    <input type="number" name="price_usd" placeholder="USD" min="0" step=".01" pattern="^\d*(\.\d{0,2})?$" />
                    <input type="number" name="price_gbp" placeholder="GBP" min="0" step=".01" pattern="^\d*(\.\d{0,2})?$" />
                    <input type="number" name="price_jpy" placeholder="JPY" min="0" step="1" pattern="[0-9]" />
                    {new_product_type === 'game' && <input type="text" name="link_codebase" placeholder={link_codebase(ct.lang)} />}

                    <div id="languages">
                        <div>
                            <label htmlFor="eng_prod">{english(ct.lang)}</label>
                            <input type="text" name="link_review" id="eng_prod" placeholder={link_review(ct.lang)} />
                            <input type="text" name="title" placeholder={title(ct.lang)} />
                            <input type="text" name="catch_phrase" placeholder={catch_phrase(ct.lang)} />
                            <input type="text" name="summary" placeholder={summary(ct.lang)} />
                            <label htmlFor="img_browse_system" className="button">{browse_system_for_cover_picture(ct.lang)}</label>
                            <input type="file" name="cover_picture" accept="image/jpeg, image/png" id="img_browse_system" style={{ display: 'none' }} />
                            <label htmlFor="prod_browse_system" className="button">{browse_system_for_product(ct.lang)}</label>
                            <input type="file" name="product_file" accept="image/jpeg, image/png" id="prod_browse_system" style={{ display: 'none' }} />
                        </div>
                        <div>
                            <label htmlFor="fr_prod">{french(ct.lang)}</label>
                            <input type="text" name="link_review" id="fr_prod" placeholder={link_review(ct.lang)} />
                            <input type="text" name="title" placeholder={title(ct.lang)} />
                            <input type="text" name="catch_phrase" placeholder={catch_phrase(ct.lang)} />
                            <input type="text" name="summary" placeholder={summary(ct.lang)} />
                            <label htmlFor="img_browse_system" className="button">{browse_system_for_cover_picture(ct.lang)}</label>
                            <input type="file" name="cover_picture" accept="image/jpeg, image/png" id="img_browse_system" style={{ display: 'none' }} />
                            <label htmlFor="prod_browse_system" className="button">{browse_system_for_product(ct.lang)}</label>
                            <input type="file" name="product_file" accept="image/jpeg, image/png" id="prod_browse_system" style={{ display: 'none' }} />
                        </div>
                        <div>
                            <label htmlFor="jp_prod">{japanese(ct.lang)}</label>
                            <input type="text" name="link_review" id="jp_prod" placeholder={link_review(ct.lang)} />
                            <input type="text" name="title" placeholder={title(ct.lang)} />
                            <input type="text" name="catch_phrase" placeholder={catch_phrase(ct.lang)} />
                            <input type="text" name="summary" placeholder={summary(ct.lang)} />
                            <label htmlFor="img_browse_system" className="button">{browse_system_for_cover_picture(ct.lang)}</label>
                            <input type="file" name="cover_picture" accept="image/jpeg, image/png" id="img_browse_system" style={{ display: 'none' }} />
                            <label htmlFor="prod_browse_system" className="button">{browse_system_for_product(ct.lang)}</label>
                            <input type="file" name="product_file" id="prod_browse_system" style={{ display: 'none' }} />
                        </div>
                    </div>

                    <button className="button" title={add_product(ct.lang)}><span className="icon">{icon_add}</span></button>
                </form>}

                {!products?.length ?
                    <p className="txt_centered">{no_product(ct.lang)}</p>
                :
                    <ol>
                        {products?.map((e, i) => 
                            <li key={'prod_edit_' + i}>
                                <div>
                                    <div className="display_product">
                                        <div title={english(ct.lang)}>
                                            <p><strong>{e.title[0]}</strong></p>
                                            <div>{Parser(e.summary[0])}</div>
                                        </div>
                                        <div title={french(ct.lang)}>
                                            <p><strong>{e.title[1]}</strong></p>
                                            <div>{Parser(e.summary[1])}</div>
                                        </div>
                                        <div title={japanese(ct.lang)}>
                                            <p><strong>{e.title[2]}</strong></p>
                                            <div>{Parser(e.summary[2])}</div>
                                        </div>
                                    </div>

                                    <span className="prod_icons">
                                        <button className="button" title={edit_product(ct.lang)} onClick={() => handle_edit(e)}><span className="icon">{icon_edit}</span></button>
                                        <button className="button" title={delete_product(ct.lang)} onClick={() => handle_delete(e)}><span className="icon">{icon_delete}</span></button>
                                    </span>
                                </div>
                            </li>)}
                    </ol>}
            </div>}
        </main>
    );
};

export default ProductManager;

