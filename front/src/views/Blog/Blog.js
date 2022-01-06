import { Link } from 'react-router-dom';

const Blog = (props) => 
{
    return (
        <main>
            <h1 className="title">Blog</h1>

            <section className="blog_section">
                <div className="button"><Link to="/blog/page.html">All articles</Link></div>
            </section>

            {props.categories.map(category => 
                <section className="blog_section" key={category._id}>
                    <h2 className="sub_title">{category.name}</h2>
                    {props.articles.map(article => article.category === category.name ? 
                        <p key={article._id}><Link to={'/blog/article' + article._id + '.html'}>{article.title}</Link></p>
                        : ''
                    )}
                </section>)}
        </main>
    );
};

export default Blog;

