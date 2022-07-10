import { useState, useLayoutEffect, useEffect, useContext } from 'react';
import Parser from 'html-react-parser';
import { AppContext } from '../../App';
import {
    access_denied, log_out, product_manager, 
    english, french, japanese, 
    title, author, select_type, book, game, subtype, genre, subtype_and_genre_combined, release_date, catch_phrase, summary, link_codebase, 
    add_product, no_product, edit_product, delete_product 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faSquareXmark, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import package_info from '../../../package.json';

const icon_lock = <FontAwesomeIcon icon={faUserLock} />;
const icon_logout = <FontAwesomeIcon icon={faSquareXmark} />;
const icon_add = <FontAwesomeIcon icon={faPlus} />;
const icon_edit = <FontAwesomeIcon icon={faEdit} />;
const icon_delete = <FontAwesomeIcon icon={faTrash} />;

const ProductManager = (props) => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = product_manager(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', access_denied(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', product_manager(ct.lang) + ' | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', access_denied(ct.lang));

    const [products, set_products] = useState([]);

    useLayoutEffect(() => 
    {
        const id_token = document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || '';
        const id_account = document.cookie.match('(^|;)\\s*id\\s*=\\s*([^;]+)')?.pop() || '';

        fetch(`${package_info.api}/product/${ct.lang}/all/full/${id_token}/${id_account}`)
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

    const handle_add = () => 
    {
    };

    const handle_edit = () => 
    {
    };

    const handle_delete = () => 
    {
    };

    return (
        <main>
            <h1 className="title">{product_manager(ct.lang)}</h1>

            {!props.is_access_granted ? 
                <p className="txt_access_denied"><span className="icon lock">{icon_lock}</span> {access_denied(ct.lang)}</p>
            :
            <div id="product_manager">
                <span id="btn_logout" className="a" title={log_out(ct.lang)} onClick={logout}>{icon_logout}</span>

                <form onSubmit={handle_add}>
                    <div id="languages">
                        <div>
                            <label htmlFor="eng_prod">{english(ct.lang)}</label>
                            <input type="text" name="title" id="eng_prod" placeholder={title(ct.lang)} />
                            <input type="text" name="author" placeholder={author(ct.lang)} />
                            <select name="type" defaultValue="default" autoComplete="new-password">
                                <option disabled value="default">{select_type(ct.lang)}</option>
                                <option value="book">{book(ct.lang)}</option>
                                <option value="game">{game(ct.lang)}</option>
                            </select>
                            <input type="text" name="subtype" placeholder={subtype(ct.lang)} />
                            <input type="text" name="genre" placeholder={genre(ct.lang)} />
                            <input type="text" name="subtype_and_genre_combined" placeholder={subtype_and_genre_combined(ct.lang)} />
                            <input type="text" name="release_date" placeholder={release_date(ct.lang)} />
                            <input type="text" name="catch_phrase" placeholder={catch_phrase(ct.lang)} />
                            <input type="text" name="summary" placeholder={summary(ct.lang)} />
                            {/* COVER PICTURE */}
                            {/* FILE(S) */}
                            {/* LINKS TO REVIEW PAGES */}
                            <input type="text" name="link_codebase" placeholder={link_codebase(ct.lang)} />
                            {/* PRICE IN ALL THE CURRENCIES */}
                        </div>
                        <div>
                            <label htmlFor="fr_prod">{french(ct.lang)}</label>
                            <input type="text" name="title" id="fr_prod" placeholder={title(ct.lang)} />
                            <input type="text" name="author" placeholder={author(ct.lang)} />
                            <select name="type" defaultValue="default" autoComplete="new-password">
                                <option disabled value="default">{select_type(ct.lang)}</option>
                                <option value="book">{book(ct.lang)}</option>
                                <option value="game">{game(ct.lang)}</option>
                            </select>
                            <input type="text" name="subtype" placeholder={subtype(ct.lang)} />
                            <input type="text" name="genre" placeholder={genre(ct.lang)} />
                            <input type="text" name="subtype_and_genre_combined" placeholder={subtype_and_genre_combined(ct.lang)} />
                            <input type="text" name="release_date" placeholder={release_date(ct.lang)} />
                            <input type="text" name="catch_phrase" placeholder={catch_phrase(ct.lang)} />
                            <input type="text" name="summary" placeholder={summary(ct.lang)} />
                            {/* COVER PICTURE */}
                            {/* FILE(S) */}
                            {/* LINKS TO REVIEW PAGES */}
                            <input type="text" name="link_codebase" placeholder={link_codebase(ct.lang)} />
                            {/* PRICE IN ALL THE CURRENCIES */}
                        </div>
                        <div>
                            <label htmlFor="jp_prod">{japanese(ct.lang)}</label>
                            <input type="text" name="title" id="jp_prod" placeholder={title(ct.lang)} />
                            <input type="text" name="author" placeholder={author(ct.lang)} />
                            <select name="type" defaultValue="default" autoComplete="new-password">
                                <option disabled value="default">{select_type(ct.lang)}</option>
                                <option value="book">{book(ct.lang)}</option>
                                <option value="game">{game(ct.lang)}</option>
                            </select>
                            <input type="text" name="subtype" placeholder={subtype(ct.lang)} />
                            <input type="text" name="genre" placeholder={genre(ct.lang)} />
                            <input type="text" name="subtype_and_genre_combined" placeholder={subtype_and_genre_combined(ct.lang)} />
                            <input type="text" name="release_date" placeholder={release_date(ct.lang)} />
                            <input type="text" name="catch_phrase" placeholder={catch_phrase(ct.lang)} />
                            <input type="text" name="summary" placeholder={summary(ct.lang)} />
                            {/* COVER PICTURE */}
                            {/* FILE(S) */}
                            {/* LINKS TO REVIEW PAGES */}
                            <input type="text" name="link_codebase" placeholder={link_codebase(ct.lang)} />
                            {/* PRICE IN ALL THE CURRENCIES */}
                        </div>
                    </div>

                    <button className="button" title={add_product(ct.lang)}><span className="icon">{icon_add}</span></button>
                </form>

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

