import { useState, useContext } from 'react';
import { AppContext } from '../../App';
import {
    blog_editor, access_denied, 
    select_language, english, french, japanese, 
    select_category 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faFolderMinus, faFolderPlus, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import BlogArticle from '../Blog/BlogArticle';
import { parse_category } from '../../assets/functions/parsing';
import { backend } from '../../../package.json';

const icon_lock = <FontAwesomeIcon icon={faUserLock} />;
const icon_folder_minus = <FontAwesomeIcon icon={faFolderMinus} />
const icon_folder_plus = <FontAwesomeIcon icon={faFolderPlus} />
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
    const [new_category, set_new_category] = useState('');
    const [is_preview_shown, set_is_preview_shown] = useState(false);

    const handle_select_article = e => 
    {
        const id = e.target.value;
        const obj_article = props.articles.find(e => e._id === id);

        set_selected_article(id);

        set_article(
        {
            likes: obj_article.likes,
            time_creation: obj_article.time_creation,
            time_modification: obj_article.time_modification,
            is_modified: obj_article.is_modified,
            category: obj_article.category,
            title: obj_article.title,
            author: props.account_data._id,
            content: obj_article.content
        });
    };

    const handle_select_category = e => 
    {
        const id = e.target.value;
        set_selected_category(id);

        set_article(
        {
            likes: article.likes,
            time_creation: article.time_creation,
            time_modification: article.time_modification,
            is_modified: article.is_modified,
            category: id,
            title: article.title,
            author: props.account_data._id,
            content: article.content
        });
    };

    const reset_form = (fetched_articles) => 
    {
        set_selected_language('default');
        set_selected_article('default');
        set_selected_category('default');
        set_article(default_article);
        props.set_articles(fetched_articles);
    };

    const handle_create_category = () => 
    {
        const parsed_category = new_category === '' ? '' : parse_category(new_category);
        const arr = ['', '', ''];

        if (parsed_category !== '')
        {
            arr[selected_language] = parsed_category;

            fetch(backend + '/blog/categories',
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ new_category: arr })
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
                    set_new_category('');
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

                set_article(
                {
                    likes: article.likes,
                    time_creation: article.time_creation,
                    time_modification: article.time_modification,
                    is_modified: article.is_modified,
                    category: '',
                    title: article.title,
                    author: props.account_data._id,
                    content: article.content
                });
            });
        }
    };

    const handle_create_article = () => 
    {
        const new_article = {};

        if (selected_language !== 'default')
            alert('The article needs a language.');
        else if (article.title === '')
            alert('The article needs a title.');
        else if (article.category === '')
            alert('The article needs a category.');
        else if (article.content === '')
            alert('The article needs a content.');
        else
        {
            new_article.likes = 0;
            new_article.time_creation = Date.now();
            new_article.time_modification = Date.now();
            new_article.is_modified = false;
            new_article.language = selected_language;
            new_article.category = article.category;
            new_article.title = article.title;
            new_article.author = props.account_data._id;
            new_article.content = article.content;

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
                    reset_form(json.data);
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

            fetch(backend + '/blog/articles',
            {
                method: 'PUT',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: selected_article, article: updated_article })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                alert(json.message);

                if (json.is_success)
                    reset_form(json.data);
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
                    id: selected_article,
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
                    reset_form(json.data);
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
            content: article.content
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
            content: e.target.value
        });
    };

    const handle_preview = () => set_is_preview_shown(is_preview_shown ? false : true);

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
                        <input type="button" className="button" name="btn_post_article" value="Post a new article" onClick={handle_create_article} />
                        {!props.articles.length ? null : 
                        <>
                            <select name="select_article" value={selected_article} onChange={handle_select_article}>
                                <option disabled value="default">Select an article</option>
                                {selected_language === 'default' ? <option disabled>No language selected</option> 
                                :
                                    props.categories.map(category => 
                                        <optgroup label={category.name[ct.lang]} key={category._id}>
                                            {selected_language === 0 && !category.articles.eng.length ? <option disabled>No article</option> 
                                            : selected_language === 0 ? category.articles.eng.map(e => <option key={e} value={e}>{props.articles.find(i => i._id === e).title}</option>) 
                                            : selected_language === 1 && !category.articles.fr.length ? <option disabled>No article</option> 
                                            : selected_language === 1 ? category.articles.fr.map(e => <option key={e} value={e}>{props.articles.find(i => i._id === e).title}</option>) 
                                            : selected_language === 2 && !category.articles.jp.length ? <option disabled>No article</option> 
                                            : selected_language === 2 ? category.articles.jp.map(e => <option key={e} value={e}>{props.articles.find(i => i._id === e).title}</option>) 
                                            : <option disabled>No language selected</option>}
                                        </optgroup>
                                    )}
                            </select>

                            <div>
                                <input type="button" className="button" name="btn_modify_article" value="Modify an article" onClick={handle_modify_article} />
                                <input type="button" className="button" name="btn_delete_article" value="Delete an article" onClick={handle_delete_article} />
                            </div>
                        </>}
                    </div>

                    <input type="text" name="field_article_title" value={article.title} onChange={update_title} placeholder="Title" />

                    <div id="categories">
                        <div>
                            <select name="select_category" value={selected_category} onChange={handle_select_category}>
                                {!props.categories.length ? 
                                    <option disabled value="default">No category</option>
                                :
                                <>
                                    <option disabled value="default">{select_category(ct.lang)}</option>
                                    {props.categories.map(category => <option key={category._id} value={category._id}>{category.name[ct.lang]}</option>)}
                                </>}
                            </select>
                            <button className="button" name="btn_delete_category" onClick={handle_delete_category}><span className="icon">{icon_folder_minus}</span></button>
                        </div>

                        <div>
                            <input type="text" name="field_article_new_category" placeholder="New category" value={new_category} onChange={e => set_new_category(e.target.value)} />
                            <button className="button" name="btn_add_category" onClick={handle_create_category}><span className="icon">{icon_folder_plus}</span></button>
                        </div>
                    </div>

                    <textarea name="field_article_content" value={article.content} onChange={update_content} placeholder="Content"></textarea>

                    <button className="button" name="btn_preview_article" onClick={handle_preview}>
                        <span className="icon">{is_preview_shown ? icon_eye_slash : icon_eye}</span>{' '}Preview
                    </button>
                </div>

                {is_preview_shown && <BlogArticle is_preview={true} selected_article={selected_article} article={article} />}
            </>}
        </main>
    );
};

export default BlogEditor;

