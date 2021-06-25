import {Link} from 'react-router-dom';

const BlogPage2 = () => 
{
	return (
		<main>
			<h1>Blog</h1>
			<div className="page_numbers page_numbers_top"><Link to="/blog/page1.html">1</Link> <Link to="/blog/page2.html">2</Link></div>

			<article>
				<h2><Link to="/blog/article4.html">[02/15/2018] Interactive movie and a rhythm issue</Link></h2>
				<p>Proposing an interaction, interactive movie is for me a video game... Of poor quality. The why? The matter of rhythm. In a video game, the player decides of the rhythm, 
				while such a movie is cut to give the viewer time to make a choice, which chops rhythm into pieces. <Link to="/blog/article4.html">[More]</Link></p>
			</article>

			<div className="page_numbers page_numbers_bottom"><Link to="/blog/page1.html">1</Link> <Link to="/blog/page2.html">2</Link></div>
		</main>
	);
};

export default BlogPage2;

