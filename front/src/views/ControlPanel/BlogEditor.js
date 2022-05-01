import { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { AppContext } from '../../App';
import {
    blog_editor, access_denied, log_out, 
    select_language, english, french, japanese, 
    post_new_article, select_article, no_article, modify_article, delete_article, 
    no_category, select_category, manage_categories, new_category, add_category, delete_category, modify_category, edit_category, 
    title, content, preview, 
    disclaimer_blog_editor_title, 
    disclaimer_blog_editor_category, 
    disclaimer_blog_editor_content 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faSquareXmark, faTools, faFolderPlus, faFolderMinus, faFolderOpen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import BlogArticlePreview from '../../assets/components/BlogArticlePreview';
import { parse_category } from '../../assets/functions/parsing';
import package_info from '../../../package.json';

// Markdown editor
import Yamde from 'yamde';

const icon_lock = <FontAwesomeIcon icon={faUserLock} />;
const icon_logout = <FontAwesomeIcon icon={faSquareXmark} />;
const icon_tools = <FontAwesomeIcon icon={faTools} />;
const icon_folder_plus = <FontAwesomeIcon icon={faFolderPlus} />
const icon_folder_minus = <FontAwesomeIcon icon={faFolderMinus} />
const icon_folder_open = <FontAwesomeIcon icon={faFolderOpen} />
const icon_eye = <FontAwesomeIcon icon={faEye} />
const icon_eye_slash = <FontAwesomeIcon icon={faEyeSlash} />

const BlogEditor = (props) => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = blog_editor(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', access_denied(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', blog_editor(ct.lang) + ' | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', access_denied(ct.lang));

    const default_article = 
    {
        _id: 'default',
        time_creation: Date.now(),
        time_modification: Date.now(),
        is_modified: false,
        categories: [],
        title: ['', '', ''],
        author: props.account_data?._id,
        content: ['', '', '']
    };

    const [articles, set_articles] = useState([]);
    const [article, set_article] = useState(default_article);
    const [selected_language, set_selected_language] = useState(ct.lang);
    const [selected_categories, set_selected_categories] = useState([]);
    const [is_category_management_shown, set_is_category_management_shown] = useState(false);
    const [managed_category, set_managed_category] = useState('default');
    const [is_preview_shown, set_is_preview_shown] = useState(false);

    useLayoutEffect(() => 
    {
        fetch(`${package_info.api}/blog/${ct.lang}/articles`)
        .then(res => res.json())
        .then(json => 
        {
            //console.log(json.message);
            //if (json.error)
                //console.log(json.error);
            if (json.is_success && json.data.length) 
                set_articles(json.data);
        });

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

    const handle_select_article = e => 
    {
        const id = e.target.value;
        const obj_article = articles.find(e => e._id === id);
        const arr_categories = [];

        obj_article.categories.map(cat_id => arr_categories.push(
        {
            _id: cat_id, 
            name: props.categories.find(cat => String(cat._id) === String(cat_id))?.name 
        }));

        set_selected_categories(arr_categories);

        set_article(
        {
            _id: obj_article._id,
            time_creation: obj_article.time_creation,
            time_modification: obj_article.time_modification,
            is_modified: obj_article.is_modified,
            categories: obj_article.categories,
            title: obj_article.title,
            author: props.account_data._id,
            content: obj_article.content
        });
    };

    const handle_select_categories = e => 
    {
        const id = e.target.value;
        let arr_categories = [...selected_categories];

        // The category was not selected --> add it
        if (!arr_categories.filter(e => e._id === id).length)
        {
            arr_categories.push(
            {
                _id: id, 
                name: props.categories.find(e => String(e._id) === String(id))?.name 
            });

            set_selected_categories(arr_categories);

            set_article(
            {
                _id: article._id,
                time_creation: article.time_creation,
                time_modification: article.time_modification,
                is_modified: article.is_modified,
                categories: [...article.categories, id],
                title: article.title,
                author: props.account_data._id,
                content: article.content
            });
        }
        // The category is already selected --> remove it
        else
        {
            arr_categories = arr_categories.filter(e => e._id !== id);

            set_selected_categories(arr_categories);

            set_article(
            {
                _id: article._id,
                time_creation: article.time_creation,
                time_modification: article.time_modification,
                is_modified: article.is_modified,
                categories: [...arr_categories],
                title: article.title,
                author: props.account_data._id,
                content: article.content
            });
        }
    };

    const reset_editor = (fetched_articles) => 
    {
        set_articles(fetched_articles);
        set_article(default_article);
        set_selected_categories([]);
        set_managed_category('default');
    };

    const handle_create_category = e => 
    {
        const new_category_eng = e.target[0].value;
        const new_category_fr = e.target[1].value;
        const new_category_jp = e.target[2].value;
        const parsed_category_eng = new_category_eng === '' ? '' : parse_category(new_category_eng);
        const parsed_category_fr = new_category_fr === '' ? '' : parse_category(new_category_fr);
        const parsed_category_jp = new_category_jp === '' ? '' : parse_category(new_category_jp);

        e.preventDefault();

        if (parsed_category_eng !== '' && parsed_category_fr !== '' && parsed_category_jp !== '')
        {
            fetch(`${package_info.api}/blog/${ct.lang}/categories`,
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
                    new_category: [parsed_category_eng, parsed_category_fr, parsed_category_jp]
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                ct.popup('alert', ct.lang, json.message);

                if (json.is_success)
                {
                    e.target[0].value = '';
                    e.target[1].value = '';
                    e.target[2].value = '';
                    set_managed_category('default');
                    props.set_categories(json.data);
                }
            });
        }
    };

    const handle_delete_category = () => 
    {
        if (managed_category !== 'default')
        {
            fetch(`${package_info.api}/blog/${ct.lang}/categories`,
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
                    _id: managed_category
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                ct.popup('alert', ct.lang, json.message);

                if (json.is_success)
                {
                    set_article(
                    {
                        _id: article._id,
                        time_creation: article.time_creation,
                        time_modification: article.time_modification,
                        is_modified: article.is_modified,
                        categories: article.categories.filter(id => id !== managed_category),
                        title: article.title,
                        author: props.account_data._id,
                        content: article.content
                    });

                    set_selected_categories(selected_categories.filter(obj => obj._id !== managed_category));
                    set_managed_category('default');
                    props.set_categories(json.data);
                }
            });
        }
    };

    const handle_modify_category = async () => 
    {
        let obj_category = null;
        let updated_eng = '';
        let updated_fr = '';
        let updated_jp = '';

        obj_category = managed_category === 'default' ? null : props.categories.find(e => e._id === managed_category);
        if (obj_category === null || obj_category === undefined)
            return;

        updated_eng = await ct.popup('prompt', ct.lang, edit_category(ct.lang), english(ct.lang), obj_category.name[0]);
        if (!updated_eng)
            return;

        updated_fr = await ct.popup('prompt', ct.lang, edit_category(ct.lang), french(ct.lang), obj_category.name[1]);
        if (!updated_fr)
            return;

        updated_jp = await ct.popup('prompt', ct.lang, edit_category(ct.lang), japanese(ct.lang), obj_category.name[2]);
        if (!updated_jp)
            return;

        updated_eng = updated_eng === '' ? '' : parse_category(updated_eng);
        updated_fr = updated_fr === '' ? '' : parse_category(updated_fr);
        updated_jp = updated_jp === '' ? '' : parse_category(updated_jp);

        if (updated_eng !== '' && updated_fr !== '' && updated_jp !== '')
        {
            fetch(`${package_info.api}/blog/${ct.lang}/categories`,
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
                    _id: managed_category,
                    updated_category: [updated_eng, updated_fr, updated_jp]
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                ct.popup('alert', ct.lang, json.message);

                if (json.is_success)
                {
                    const index = selected_categories.map(e => e._id).indexOf(managed_category);
                    if (index !== -1)
                    {
                        const arr = [...selected_categories];
                        arr[index].name = [updated_eng, updated_fr, updated_jp];
                        set_selected_categories(arr);
                    }

                    set_managed_category('default');
                    props.set_categories(json.data);
                }
            });
        }
    };

    const handle_create_article = () => 
    {
        const new_article = {};

        if (article.title[0] === '' || article.title[1] === '' || article.title[2] === '')
            ct.popup('alert', ct.lang, disclaimer_blog_editor_title(ct.lang));
        else if (!article.categories.length)
            ct.popup('alert', ct.lang, disclaimer_blog_editor_category(ct.lang));
        else if (article.content[0] === '' || article.content[1] === '' || article.content[2] === '')
            ct.popup('alert', ct.lang, disclaimer_blog_editor_content(ct.lang));
        else
        {
            new_article.categories = article.categories;
            new_article.title = article.title;
            new_article.author = props.account_data._id;
            new_article.content = article.content;

            fetch(`${package_info.api}/blog/${ct.lang}/articles`,
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
                    new_article: new_article
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                ct.popup('alert', ct.lang, json.message);

                if (json.is_success)
                    reset_editor(json.data);
            });
        }
    };

    const handle_modify_article = () => 
    {
        const updated_article = {};

        if (article.title[0] === '' || article.title[1] === '' || article.title[2] === '')
            ct.popup('alert', ct.lang, disclaimer_blog_editor_title(ct.lang));
        else if (!article.categories.length)
            ct.popup('alert', ct.lang, disclaimer_blog_editor_category(ct.lang));
        else if (article.content[0] === '' || article.content[1] === '' || article.content[2] === '')
            ct.popup('alert', ct.lang, disclaimer_blog_editor_content(ct.lang));
        else
        {
            updated_article.categories = article.categories;
            updated_article.title = article.title;
            updated_article.content = article.content;

            fetch(`${package_info.api}/blog/${ct.lang}/articles`,
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
                    _id: article._id,
                    article: updated_article
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                ct.popup('alert', ct.lang, json.message);

                if (json.is_success)
                    reset_editor(json.data);
            });
        }
    };

    const handle_delete_article = () => 
    {
        if (article._id !== 'default')
        {
            fetch(`${package_info.api}/blog/${ct.lang}/articles`,
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
                    _id: article._id,
                    author: props.account_data._id,
                    author_list_articles: props.account_data.articles
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                //console.log(json.message);
                //if (json.error)
                    //console.log(json.error);
                ct.popup('alert', ct.lang, json.message);

                if (json.is_success)
                    reset_editor(json.data);
            });
        }
    };

    const update_title_0 = e => 
    {
        set_article(
        {
            _id: article._id,
            time_creation: article.time_creation,
            time_modification: article.time_modification,
            is_modified: article.is_modified,
            categories: article.categories,
            title: [e.target.value, article.title[1], article.title[2]],
            author: props.account_data._id,
            content: article.content
        });
    };

    const update_title_1 = e => 
    {
        set_article(
        {
            _id: article._id,
            time_creation: article.time_creation,
            time_modification: article.time_modification,
            is_modified: article.is_modified,
            categories: article.categories,
            title: [article.title[0], e.target.value, article.title[2]],
            author: props.account_data._id,
            content: article.content
        });
    };

    const update_title_2 = e => 
    {
        set_article(
        {
            _id: article._id,
            time_creation: article.time_creation,
            time_modification: article.time_modification,
            is_modified: article.is_modified,
            categories: article.categories,
            title: [article.title[0], article.title[1], e.target.value],
            author: props.account_data._id,
            content: article.content
        });
    };

    const update_content_0 = value => 
    {
        set_article(
        {
            _id: article._id,
            time_creation: article.time_creation,
            time_modification: article.time_modification,
            is_modified: article.is_modified,
            categories: article.categories,
            title: article.title,
            author: props.account_data._id,
            content: [value, article.content[1], article.content[2]]
        });
    };

    const update_content_1 = value => 
    {
        set_article(
        {
            _id: article._id,
            time_creation: article.time_creation,
            time_modification: article.time_modification,
            is_modified: article.is_modified,
            categories: article.categories,
            title: article.title,
            author: props.account_data._id,
            content: [article.content[0], value, article.content[2]]
        });
    };

    const update_content_2 = value => 
    {
        set_article(
        {
            _id: article._id,
            time_creation: article.time_creation,
            time_modification: article.time_modification,
            is_modified: article.is_modified,
            categories: article.categories,
            title: article.title,
            author: props.account_data._id,
            content: [article.content[0], article.content[1], value]
        });
    };

    return (
        <main>
            <h1 className="title">{blog_editor(ct.lang)}</h1>
            
            {!props.is_access_granted ? 
                <p className="txt_access_denied"><span className="icon lock">{icon_lock}</span> {access_denied(ct.lang)}</p>
            :
            <>
                <span id="btn_logout" className="a" title={log_out(ct.lang)} onClick={logout}>{icon_logout}</span>

                <div id="blog_editor">
                    <select name="select_language" value={selected_language} onChange={e => set_selected_language(e.target.value)}>
                        <option disabled value="default">{select_language(ct.lang)}</option>
                        <option value="0">{english(ct.lang)}</option>
                        <option value="1">{french(ct.lang)}</option>
                        <option value="2">{japanese(ct.lang)}</option>
                    </select>

                    <div id="btn_article">
                        <input type="button" className="button" name="btn_post_article" value={post_new_article(ct.lang)} onClick={handle_create_article} />
                        {!articles.length ? null : 
                        <>
                            <select name="select_article" value={article._id} onChange={handle_select_article}>
                                <option disabled value="default">{select_article(ct.lang)}</option>
                                {props.categories.map((category, index) => 
                                    <optgroup label={category.name[ct.lang]} key={'category_' + index}>
                                        {!articles.filter(e => e.categories.includes(category._id)).length ? <option disabled>{no_article(ct.lang)}</option> 
                                        : articles.filter(e => e.categories.includes(category._id)).map(e => <option key={e._id} value={e._id}>{e.title[ct.lang]}</option>)}
                                    </optgroup>)}
                            </select>

                            <div>
                                <input type="button" className="button" name="btn_modify_article" value={modify_article(ct.lang)} onClick={handle_modify_article} />
                                <input type="button" className="button" name="btn_delete_article" value={delete_article(ct.lang)} onClick={handle_delete_article} />
                            </div>
                        </>}
                    </div>

                    <input type="text" name="field_article_title_0" value={article.title[0]} onChange={update_title_0} placeholder={title(ct.lang, 0)} title={english(ct.lang)} />
                    <input type="text" name="field_article_title_1" value={article.title[1]} onChange={update_title_1} placeholder={title(ct.lang, 1)} title={french(ct.lang)} />
                    <input type="text" name="field_article_title_2" value={article.title[2]} onChange={update_title_2} placeholder={title(ct.lang, 2)} title={japanese(ct.lang)} />

                    <div id="categories">
                        <div id="article_categories">
                            {!props.categories.length ? no_category(ct.lang) 
                            : 
                            props.categories.map(category => 
                                <div className="div_pointer" key={category._id} draggable>
                                    <input type="checkbox" name={category._id} id={category._id} value={category._id} 
                                        checked={selected_categories.filter(e => e._id === category._id).length} onChange={handle_select_categories} />
                                    <label htmlFor={category._id}>{category.name[ct.lang]}</label>
                                </div>)}

                            <button className="button" name="btn_manage_categories" onClick={() => set_is_category_management_shown(!is_category_management_shown)}>
                                <span className="icon">{icon_tools}</span> {manage_categories(ct.lang)}
                            </button>
                        </div>

                        {is_category_management_shown && 
                        <>
                            <form onSubmit={handle_create_category}>
                                <div>
                                    <input type="text" name="field_article_new_category_0" title={english(ct.lang)} placeholder={new_category(ct.lang, 0)} />
                                    <input type="text" name="field_article_new_category_1" title={french(ct.lang)} placeholder={new_category(ct.lang, 1)} />
                                    <input type="text" name="field_article_new_category_2" title={japanese(ct.lang)} placeholder={new_category(ct.lang, 2)} />
                                </div>
                                <button className="button" type="submit" title={add_category(ct.lang)}><span className="icon">{icon_folder_plus}</span></button>
                            </form>

                            <div>
                                <select name="select_managed_category" value={managed_category} onChange={e => set_managed_category(e.target.value)}>
                                    {!props.categories.length ? 
                                        <option disabled value="default">{no_category(ct.lang)}</option>
                                    :
                                    <>
                                        <option disabled value="default">{select_category(ct.lang)}</option>
                                        {props.categories.map(category => <option key={'man_' + category._id} value={category._id}>{category.name[ct.lang]}</option>)}
                                    </>}
                                </select>

                                <button className="button" name="btn_delete_category" title={delete_category(ct.lang)} 
                                    onClick={handle_delete_category}><span className="icon">{icon_folder_minus}</span></button>

                                <button className="button" name="btn_modify_category" title={modify_category(ct.lang)} 
                                    onClick={handle_modify_category}><span className="icon">{icon_folder_open}</span></button>
                            </div>
                        </>}
                    </div>

                    <div className="markdown_editor">
                        <Yamde value={article.content[0]} handler={update_content_0} theme="light" title={content(ct.lang, 0)} />
                    </div>

                    <div className="markdown_editor">
                        <Yamde value={article.content[1]} handler={update_content_1} theme="light" title={content(ct.lang, 1)} />
                    </div>

                    <div className="markdown_editor">
                        <Yamde value={article.content[2]} handler={update_content_2} theme="light" title={content(ct.lang, 2)} />
                    </div>

                    <button className="button" name="btn_preview_article" onClick={() => set_is_preview_shown(!is_preview_shown)}>
                        <span className="icon">{is_preview_shown ? icon_eye_slash : icon_eye}</span>{' '}{preview(ct.lang)}
                    </button>
                </div>

                {is_preview_shown && 
                    <BlogArticlePreview 
                        lang={parseInt(selected_language, 10)} 
                        article={article} 
                        txt_author={props.account_data?.username} 
                        selected_categories={selected_categories} />}
            </>}
        </main>
    );
};

export default BlogEditor;

