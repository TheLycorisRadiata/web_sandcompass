import { useState } from 'react';
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
    const default_category = 'No category';
    const default_title = 'No title';
    const default_content = '<p>No content.</p>';

    const default_article = 
    {
        likes: 0,
        time_creation: Date.now(),
        time_modification: Date.now(),
        is_modified: false,
        category: default_category,
        title: default_title,
        author: props.account_data?._id,
        content: default_content
    };

    const [article, set_article] = useState(default_article);
    const [id_selected_article, set_id_selected_article] = useState(null);
    const [new_category, set_new_category] = useState('');
    const [is_preview_shown, set_is_preview_shown] = useState(false);

    const handle_select_article = e => 
    {
        const id = e.target.value;
        const selected_article = props.articles.find(e => e._id === id);

        set_id_selected_article(id);

        set_article(
        {
            likes: selected_article.likes,
            time_creation: selected_article.time_creation,
            time_modification: selected_article.time_modification,
            is_modified: selected_article.is_modified,
            category: selected_article.category,
            title: selected_article.title,
            author: props.account_data._id,
            content: selected_article.content
        });
    };

    const handle_select_category = e => 
    {
        set_article(
        {
            likes: article.likes,
            time_creation: article.time_creation,
            time_modification: article.time_modification,
            is_modified: article.is_modified,
            category: e.target.value,
            title: article.title,
            author: props.account_data._id,
            content: article.content
        });
    };

    const handle_create_category = () => 
    {
        const parsed_category = new_category === '' ? '' : parse_category(new_category);

        if (parsed_category !== '')
        {
            fetch(backend + '/blog/categories',
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ new_category: parsed_category })
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
                    set_new_category('');
                    props.set_categories(json.data);
                }
            });
        }
    };

    const handle_delete_category = () => 
    {
        if (article.category !== default_category)
        {
            fetch(backend + '/blog/categories',
            {
                method: 'DELETE',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ category: article.category })
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

                set_article(
                {
                    likes: article.likes,
                    time_creation: article.time_creation,
                    time_modification: article.time_modification,
                    is_modified: article.is_modified,
                    category: default_category,
                    title: article.title,
                    author: props.account_data._id,
                    content: article.content
                });
            });
        }
    };

    const handle_create_article = () => 
    {
        if (article.category !== default_category && article.title !== default_title && article.content !== default_content 
            && article.category !== '' && article.title !== '' && article.content !== '')
        {
            set_article(
            {
                likes: 0,
                time_creation: Date.now(),
                time_modification: Date.now(),
                is_modified: false,
                category: article.category,
                title: article.title,
                author: props.account_data._id,
                content: article.content
            });

            fetch(backend + '/blog/articles',
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ new_article: article })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                alert(json.message);

                if (json.is_success)
                    props.set_articles(json.data);
            });

            set_article(default_article);
        }
    };

    const handle_modify_article = () => 
    {
        if (id_selected_article !== '')
        {
            set_article(
            {
                likes: article.likes,
                time_creation: article.time_creation,
                time_modification: Date.now(),
                is_modified: true,
                category: article.category,
                title: article.title,
                author: props.account_data._id,
                content: article.content
            });

            fetch(backend + '/blog/articles',
            {
                method: 'PUT',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id_selected_article, article: article })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                alert(json.message);

                if (json.is_success)
                    props.set_articles(json.data);
            });

            set_id_selected_article('');
            set_article(default_article);
        }
    };

    const handle_delete_article = () => 
    {
        if (id_selected_article !== '')
        {
            fetch(backend + '/blog/articles',
            {
                method: 'DELETE',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id_selected_article })
            })
            .then(res => res.json())
            .then(json => 
            {
                console.log(json.message);
                if (json.error)
                    console.log(json.error);
                alert(json.message);

                if (json.is_success)
                    props.set_articles(json.data);
            });

            set_id_selected_article('');
            set_article(default_article);
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
            <h1 className="title">Blog Editor</h1>
            
            {!props.is_access_granted ? 
                <p className="txt_access_denied"><span className="icon lock">{icon_lock}</span> Access denied.</p>
            :
            <>
                <div id="blog_editor">
                    <div id="btn_article">
                        <input type="button" className="button" name="btn_post_article" value="Post a new article" onClick={handle_create_article} />
                        {!props.articles.length ? null : 
                        <>
                            <select name="select_article" defaultValue="default" onChange={handle_select_article}>
                                <option disabled value="default">Select an article</option>
                                {props.categories.map(category => 
                                    <optgroup label={category.name} key={category._id}>
                                        {!props.articles.filter(article => article.category === category.name).length ? <option disabled>No article</option> 
                                        : props.articles.filter(article => article.category === category.name).map((e) => <option key={e._id} value={e._id}>{e.title}</option>)}
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
                            <select name="select_category" defaultValue="default" onChange={handle_select_category}>
                                {!props.categories.length ? 
                                    <option disabled value="default">No category</option>
                                :
                                <>
                                    <option disabled value="default">Select a category</option>
                                    {props.categories.map(category => <option key={category._id}>{category.name}</option>)}
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

                {is_preview_shown && <BlogArticle is_preview={true} id_selected_article={id_selected_article} article={article} />}
            </>}
        </main>
    );
};

export default BlogEditor;

