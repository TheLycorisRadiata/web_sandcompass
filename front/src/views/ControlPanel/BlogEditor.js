import { useState, useContext } from 'react';
import { AppContext } from '../../App';
import {
    blog_editor, access_denied, 
    select_language, english, french, japanese, dynamic_language_short, 
    post_new_article, select_article, no_article, modify_article, delete_article, 
    no_category, select_category, manage_categories, new_category, add_category, delete_category, modify_category, 
    title, content, preview, 
    disclaimer_blog_editor_language, 
    disclaimer_blog_editor_title, 
    disclaimer_blog_editor_category, 
    disclaimer_blog_editor_content, 
    confirm_change_article_language 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faTools, faFolderPlus, faFolderMinus, faFolderOpen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import BlogArticle from '../Blog/BlogArticle';
import { parse_category } from '../../assets/functions/parsing';
import { backend } from '../../../package.json';

const icon_lock = <FontAwesomeIcon icon={faUserLock} />;
const icon_tools = <FontAwesomeIcon icon={faTools} />;
const icon_folder_plus = <FontAwesomeIcon icon={faFolderPlus} />
const icon_folder_minus = <FontAwesomeIcon icon={faFolderMinus} />
const icon_folder_open = <FontAwesomeIcon icon={faFolderOpen} />
const icon_eye = <FontAwesomeIcon icon={faEye} />
const icon_eye_slash = <FontAwesomeIcon icon={faEyeSlash} />

const BlogEditor = (props) => 
{
    const ct = useContext(AppContext);

    const default_article = 
    {
        likes: 0,
        time_creation: Date.now(),
        time_modification: Date.now(),
        is_modified: false,
        category: '',
        title: '',
        author: props.account_data?._id,
        content: ''
    };

    const [article, set_article] = useState(default_article);
    const [selected_language, set_selected_language] = useState('default');
    const [selected_article, set_selected_article] = useState('default');
    const [selected_category, set_selected_category] = useState('default');
    const [selected_category_name, set_selected_category_name] = useState(null);
    const [is_category_management_shown, set_is_category_management_shown] = useState(false);
    const [is_preview_shown, set_is_preview_shown] = useState(false);

    const handle_select_article = e => 
    {
        const id = e.target.value;
        const obj_article = props.articles.find(e => e._id === id);
        const obj_category = props.categories.find(e => e._id === obj_article.category);

        set_selected_article(id);
        set_selected_category_name(obj_category.name);

        set_article(
        {
            likes: obj_article.likes,
            time_creation: obj_article.time_creation,
            time_modification: obj_article.time_modification,
            is_modified: obj_article.is_modified,
            category: obj_article.category,
            title: obj_article.title,
            author: props.account_data._id,
            content: obj_article.content,
            language: obj_article.language
        });
    };

    const handle_select_category = e => 
    {
        const id = e.target.value;
        const obj = props.categories.find(e => e._id === id);

        set_selected_category(id);
        set_selected_category_name(obj.name);

        set_article(
        {
            likes: article.likes,
            time_creation: article.time_creation,
            time_modification: article.time_modification,
            is_modified: article.is_modified,
            category: id,
            title: article.title,
            author: props.account_data._id,
            content: article.content,
            language: article.language
        });
    };

    const reset_editor = (fetched_articles) => 
    {
        set_selected_language('default');
        set_selected_article('default');
        set_selected_category('default');
        set_selected_category_name(null);
        set_article(default_article);
        props.set_articles(fetched_articles);
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
            fetch(backend + '/blog/categories',
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ new_category: [parsed_category_eng, parsed_category_fr, parsed_category_jp] })
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
                    e.target[0].value = '';
                    e.target[1].value = '';
                    e.target[2].value = '';
                    set_selected_category('default');
                    props.set_categories(json.data);
                }
            });
        }
    };

    const handle_delete_category = () => 
    {
        if (article.category !== '')
        {
            fetch(backend + '/blog/categories',
            {
                method: 'DELETE',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: selected_category })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                alert(json.message);

                if (json.is_success)
                    props.set_categories(json.data);

                set_selected_category('default');
                set_selected_category_name(null);

                set_article(
                {
                    likes: article.likes,
                    time_creation: article.time_creation,
                    time_modification: article.time_modification,
                    is_modified: article.is_modified,
                    category: '',
                    title: article.title,
                    author: props.account_data._id,
                    content: article.content,
                    language: article.language
                });
            });
        }
    };

    const handle_modify_category = () => 
    {
        let obj_category = null;
        let updated_eng = '';
        let updated_fr = '';
        let updated_jp = '';

        if (article.category !== '')
            obj_category = props.categories.find(e => e._id === article.category);
        if (obj_category === null || obj_category === undefined)
            return;

        updated_eng = window.prompt(english(ct.lang), obj_category.name[0]);
        if (!updated_eng)
            return;

        updated_fr = window.prompt(french(ct.lang), obj_category.name[1]);
        if (!updated_fr)
            return;

        updated_jp = window.prompt(japanese(ct.lang), obj_category.name[2]);
        if (!updated_jp)
            return;

        updated_eng = updated_eng === '' ? '' : parse_category(updated_eng);
        updated_fr = updated_fr === '' ? '' : parse_category(updated_fr);
        updated_jp = updated_jp === '' ? '' : parse_category(updated_jp);

        if (updated_eng !== '' && updated_fr !== '' && updated_jp !== '')
        {
            fetch(backend + '/blog/categories',
            {
                method: 'PUT',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    _id: selected_category,
                    updated_category: [updated_eng, updated_fr, updated_jp]
                })
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
                    set_selected_category('default');
                    props.set_categories(json.data);
                }
            });
        }
    };

    const handle_create_article = () => 
    {
        const new_article = {};

        if (selected_language === 'default')
            alert(disclaimer_blog_editor_language(ct.lang));
        else if (article.title === '')
            alert(disclaimer_blog_editor_title(ct.lang));
        else if (article.category === '')
            alert(disclaimer_blog_editor_category(ct.lang));
        else if (article.content === '')
            alert(disclaimer_blog_editor_content(ct.lang));
        else
        {
            new_article.likes = 0;
            new_article.time_creation = Date.now();
            new_article.time_modification = Date.now();
            new_article.is_modified = false;
            new_article.category = article.category;
            new_article.title = article.title;
            new_article.author = props.account_data._id;
            new_article.content = article.content;
            new_article.language = selected_language;

            fetch(backend + '/blog/articles',
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ new_article: new_article })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                alert(json.message);

                if (json.is_success)
                    reset_editor(json.data);
            });
        }
    };

    const handle_modify_article = () => 
    {
        const updated_article = {};

        if (selected_article !== 'default')
        {
            updated_article.likes = article.likes;
            updated_article.time_creation = article.time_creation;
            updated_article.time_modification = Date.now();
            updated_article.is_modified = true;
            updated_article.category = article.category;
            updated_article.title = article.title;
            updated_article.author = props.account_data._id;
            updated_article.content = article.content;
            updated_article.language = article.language;

            if (selected_language !== 'default' && selected_language !== article.language)
            {
                if (window.confirm(confirm_change_article_language(ct.lang)))
                    updated_article.language = selected_language;
            }

            fetch(backend + '/blog/articles',
            {
                method: 'PUT',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    _id: selected_article,
                    article: updated_article
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                alert(json.message);

                if (json.is_success)
                    reset_editor(json.data);
            });
        }
    };

    const handle_delete_article = () => 
    {
        if (selected_article !== 'default')
        {
            fetch(backend + '/blog/articles',
            {
                method: 'DELETE',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                { 
                    _id: selected_article,
                    author: props.account_data._id,
                    author_list_articles: props.account_data.articles
                })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                alert(json.message);

                if (json.is_success)
                    reset_editor(json.data);
            });
        }
    };

    const update_title = e => 
    {
        set_article(
        {
            likes: article.likes,
            time_creation: article.time_creation,
            time_modification: article.time_modification,
            is_modified: article.is_modified,
            category: article.category,
            title: e.target.value,
            author: props.account_data._id,
            content: article.content,
            language: article.language
        });
    };

    const update_content = e => 
    {
        set_article(
        {
            likes: article.likes,
            time_creation: article.time_creation,
            time_modification: article.time_modification,
            is_modified: article.is_modified,
            category: article.category,
            title: article.title,
            author: props.account_data._id,
            content: e.target.value,
            language: article.language
        });
    };

    return (
        <main>
            <h1 className="title">{blog_editor(ct.lang)}</h1>
            
            {!props.is_access_granted ? 
                <p className="txt_access_denied"><span className="icon lock">{icon_lock}</span> {access_denied(ct.lang)}</p>
            :
            <>
                <div id="blog_editor">
                    <select name="select_language" value={selected_language} onChange={e => set_selected_language(e.target.value)}>
                        <option disabled value="default">{select_language(ct.lang)}</option>
                        <option value="0">{english(ct.lang)}</option>
                        <option value="1">{french(ct.lang)}</option>
                        <option value="2">{japanese(ct.lang)}</option>
                    </select>

                    <div id="btn_article">
                        <input type="button" className="button" name="btn_post_article" value={post_new_article(ct.lang)} onClick={handle_create_article} />
                        {!props.articles.length ? null : 
                        <>
                            <select name="select_article" value={selected_article} onChange={handle_select_article}>
                                <option disabled value="default">{select_article(ct.lang)}</option>
                                {props.categories.map(category => 
                                    <optgroup label={category.name[ct.lang]} key={category._id}>
                                        {!props.articles.filter(e => e.category === category._id).length ? <option disabled>{no_article(ct.lang)}</option> 
                                        : props.articles.filter(e => e.category === category._id).map(e => 
                                            <option key={e._id} value={e._id}>[{dynamic_language_short(ct.lang, e.language)}] {e.title}</option>)}
                                    </optgroup>)}
                            </select>

                            <div>
                                <input type="button" className="button" name="btn_modify_article" value={modify_article(ct.lang)} onClick={handle_modify_article} />
                                <input type="button" className="button" name="btn_delete_article" value={delete_article(ct.lang)} onClick={handle_delete_article} />
                            </div>
                        </>}
                    </div>

                    <input type="text" name="field_article_title" value={article.title} onChange={update_title} placeholder={title(ct.lang)} />

                    <div id="categories">
                        <div>
                            <select name="select_category" value={selected_category} onChange={handle_select_category}>
                                {!props.categories.length ? 
                                    <option disabled value="default">{no_category(ct.lang)}</option>
                                :
                                <>
                                    <option disabled value="default">{select_category(ct.lang)}</option>
                                    {props.categories.map(category => <option key={category._id} value={category._id}>{category.name[ct.lang]}</option>)}
                                </>}
                            </select>

                            <button className="button" name="btn_manage_categories" title={manage_categories(ct.lang)}
                                onClick={() => set_is_category_management_shown(!is_category_management_shown)}><span className="icon">{icon_tools}</span></button>
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
                                <select name="select_category" value={selected_category} onChange={handle_select_category}>
                                    {!props.categories.length ? 
                                        <option disabled value="default">{no_category(ct.lang)}</option>
                                    :
                                    <>
                                        <option disabled value="default">{select_category(ct.lang)}</option>
                                        {props.categories.map(category => <option key={category._id} value={category._id}>{category.name[ct.lang]}</option>)}
                                    </>}
                                </select>

                                <button className="button" name="btn_delete_category" title={delete_category(ct.lang)} 
                                    onClick={handle_delete_category}><span className="icon">{icon_folder_minus}</span></button>

                                <button className="button" name="btn_modify_category" title={modify_category(ct.lang)} 
                                    onClick={handle_modify_category}><span className="icon">{icon_folder_open}</span></button>
                            </div>
                        </>}
                    </div>

                    <textarea name="field_article_content" value={article.content} onChange={update_content} placeholder={content(ct.lang)}></textarea>

                    <button className="button" name="btn_preview_article" onClick={() => set_is_preview_shown(!is_preview_shown)}>
                        <span className="icon">{is_preview_shown ? icon_eye_slash : icon_eye}</span>{' '}{preview(ct.lang)}
                    </button>
                </div>

                {is_preview_shown && <BlogArticle is_preview={true} selected_article={selected_article} article={article} category={selected_category_name} />}
            </>}
        </main>
    );
};

export default BlogEditor;

