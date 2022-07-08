import { useContext } from 'react';
import Parser from 'html-react-parser';
import { AppContext } from '../../App';
import {
    access_denied, log_out, 
    product_manager 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import package_info from '../../../package.json';

const icon_lock = <FontAwesomeIcon icon={faUserLock} />;
const icon_logout = <FontAwesomeIcon icon={faSquareXmark} />;

const ProductManager = (props) => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = product_manager(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', access_denied(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', product_manager(ct.lang) + ' | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', access_denied(ct.lang));

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

    return (
        <main>
            <h1 className="title">{product_manager(ct.lang)}</h1>

            {!props.is_access_granted ? 
                <p className="txt_access_denied"><span className="icon lock">{icon_lock}</span> {access_denied(ct.lang)}</p>
            :
            <div id="product_manager">
                <span id="btn_logout" className="a" title={log_out(ct.lang)} onClick={logout}>{icon_logout}</span>

                {/*
                <form onSubmit={handle_add}>
                    <div id="languages">
                        <div>
                            <label htmlFor="eng_prod">{english(ct.lang)}</label>
                            <input type="text" name="new_question" id="eng_prod" placeholder={question(ct.lang)} />
                            <input type="text" name="new_answer" placeholder={answer(ct.lang)} />
                        </div>
                        <div>
                            <label htmlFor="fr_prod">{french(ct.lang)}</label>
                            <input type="text" name="new_question" id="fr_prod" placeholder={question(ct.lang)} />
                            <input type="text" name="new_answer" placeholder={answer(ct.lang)} />
                        </div>
                        <div>
                            <label htmlFor="jp_prod">{japanese(ct.lang)}</label>
                            <input type="text" name="new_question" id="jp_prod" placeholder={question(ct.lang)} />
                            <input type="text" name="new_answer" placeholder={answer(ct.lang)} />
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
                */}
            </div>}
        </main>
    );
};

export default ProductManager;

