import {Link} from 'react-router-dom';
import {DateInLetters, Time} from './Time.js';

const BlogPage = (props) => 
{
	return (
		<main>
			<h1>Blog</h1>
			<div className="page_numbers page_numbers_top"><Link to="/blog/page.html">1</Link> <Link to="/blog/page.html">2</Link></div>

			{props.all_articles.map(article => 
				<article key={article._id}>
					<h2><Link to={'/blog/article' + article._id + '.html'}>{article.title}</Link></h2>
					<p>Category: {article.category}.<br />
					Created: On the <DateInLetters raw_time={new Date(article.time_creation)} /> at <Time raw_time={new Date(article.time_creation)} />.
					{article.is_modified && 
					<>
						<br />
						<span>Modified: On the <DateInLetters raw_time={new Date(article.time_modification)} /> at <Time raw_time={new Date(article.time_modification)} />.</span>
					</>}
					</p>
					<p>Content of first paragraph or up to nth character... <Link to={'/blog/article' + article._id + '.html'}>[More]</Link></p>
				</article>
			)}

			<div className="page_numbers page_numbers_bottom"><Link to="/blog/page.html">1</Link> <Link to="/blog/page.html">2</Link></div>
		</main>


	);
};

export default BlogPage;

