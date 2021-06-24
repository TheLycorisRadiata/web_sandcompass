import SocialMedia from './SocialMedia.js';
import Book_Cover from '../images/cosmic_dust_cover_eng.png';

const Home = () => 
{
	return (
		<main>
			<h1>Home</h1>
			<article>
				<h2>What is this website?</h2>
				<p>"Sand Compass" is the name of a future French company. Sand Compass has for ambition to go tickle the known world's frontiers, but will for now settle for its 
				favorite domain: storytelling! This website therefore presents the fictitious works of Lycoris Radiata, self-proclaimed CEO, and... Lil' lady whose coding skills 
				surely need some refining.</p>
				<p>If this is not your first visit, welcome back! I thank you for your patience and loyalty, they will be rewarded.</p>
			</article>

			<section id="current_work">
				<h2><a href="./works.html">Cosmic Dust: Sci-fi standalone novel</a></h2>
				<a href="./works.html"><img src={Book_Cover} alt="Book cover Cosmic Dust" id="book_cover" /></a>
				<p id="book_catch_phrase"><em>Is Zekharia's urge to create the proof of his sickness, or is he one of the few who function properly?</em></p>
				<p>Zekharia Bettelheim is an unpretentious citizen of the Society of Arks, a spaceship on a quest for a new planet. Suffering, he tries to find an explanation to his 
				affliction and is helped for this by the character he created. His imaginary friend helps with putting his thoughts in order, but he knows that someday he will need 
				to call on a real person.</p>
				<p>A chain of circumstances leads him to contact a former classmate who, contrary to Zekharia, seems to blossom in their little world and have everything going for 
				him. This man can become the friend he needs, but first his being trustworthy has yet to be confirmed.</p>
				<p>There is a real difference between a creation we know about and a human being, who always keeps their share of mystery and is therefore able of betrayal. In a world 
				elevating the useful in dogma, it is difficult to admit to anyone that art makes us going through the day, even more so to a person who could as well be the Society 
				personified. But is it this crazy to say that art is not only useful, but also essential?</p>
				<p>Is Zekharia's urge to create the proof of his sickness, or is he one of the few who function properly? No matter the answer, two roads lie before him: twisting 
				himself to fit in or finding the way to change mentalities.</p>
			</section>

			<SocialMedia />

			<section id="last_article">
				<h2><a href="#">Last article</a></h2>
				<p>It's my first article, congrats me! I've been thinking of a few topics since the creation of the website but I was never in the right mood to write. I've just 
				seen on YouTube the video of K.M. Weiland entitled <a href="https://www.youtube.com/watch?v=1tmuv2qjlU4" rel="noreferrer" target="_blank">"I Hate Your Protagonist! 
				Want to Know Why?"</a> and a comment striked me. So I decided to answer it and this article is a version a little bit more polished. <a href="#">[More]</a></p>
			</section>
		</main>
	);
};

export default Home;

