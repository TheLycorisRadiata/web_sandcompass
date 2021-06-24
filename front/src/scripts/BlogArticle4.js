import {Link} from 'react-router-dom';

const BlogArticle4 = () => 
{
	return (
		<main>
			<h1>Blog</h1>
			<div className="page_numbers"><Link to="/blog/page2.html">Other articles</Link></div>

			<article>
				<h2>[02/15/2018] Interactive movie and a rhythm issue</h2>
				<p>(See the previous article <Link to="/blog/article3.html">"The VR film"</Link> for the remark on interaction = video game)</p>

				<p>Proposing an interaction, interactive movie is for me a video game... Of poor quality. The why? The matter of rhythm. In a video game, the player decides of the rhythm, 
				while such a movie is cut to give the viewer time to make a choice, which chops rhythm into pieces.</p>

				<p>In a game on the contrary, there is no too much or too few concerning rhythm. We propose a ton of experiences to the player and he will pick among them to write his own 
				story. Whatever the player decides to do, he is right. He is not too slow or too fast in his consumption of the game, when in the case of an interactive movie, the rhythm is 
				rightly broken, and it is difficult to grasp the characters' feelings or to enjoy the atmosphere of a scene if we're cut off every two minutes. Maybe is it a problem just for 
				me, though.</p>

				<p>The medium that works well with this interaction idea found in interactive movies, is the novel or the comics version "choose your own adventure." Depending of the chosen 
				answer, the reader will go to a precise page, and pursue his adventure from there on. Being written material, the reader imposes his own rhythm and nothing is broken, 
				exactly as with a game. Letting only a few seconds to make a choice? The rhythm of the interactive movie would still be altered, because the story completely stills during 
				these meager seconds... If one wishes for an audiovisual medium, what should be is that the action continues even while we're proposed a choice. The <em>Until 
				Dawn</em> game did it sometimes and it fixes the issue.</p>
			</article>

			<div className="page_numbers"><Link to="/blog/page2.html">Other articles</Link></div>
		</main>
	);
};

export default BlogArticle4;

