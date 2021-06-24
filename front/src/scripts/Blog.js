import {Link} from 'react-router-dom';
import '../styles/Blog.css';

const Blog = () => 
{
	return (
		<main>
			<h1>Blog</h1>

			<section className="blog_section">
				<h2>All articles by page</h2>
				<p className="page_numbers"><Link to="/blog/page1.html">1</Link> <Link to="/blog/page2.html">2</Link></p>
			</section>

			<section className="blog_section">
				<h2>Characterization</h2>
				<p><Link to="/blog/article1.html">How to make a lovable character and what heroes are made of</Link></p>
			</section>

			<section className="blog_section">
				<h2>Video games</h2>
				<p><Link to="/blog/article2.html">The character and the player</Link></p>
				<p><Link to="/blog/article4.html">Interactive movie and a rhythm issue</Link></p>
			</section>

			<section className="blog_section">
				<h2>Virtual reality</h2>
				<p><Link to="/blog/article3.html">The VR film</Link></p>
			</section>
		</main>
	);
};

export default Blog;

