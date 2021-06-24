import {Link} from 'react-router-dom';

const BlogPage1 = () => 
{
	return (
		<main>
			<h1>Blog</h1>
			<div className="page_numbers"><p>Pages: 1 . <Link to="/blog/page2.html">2</Link></p></div>

			<article>
				<h2><Link to="/blog/article1.html">[01/16/2017] How to make a lovable character and what heroes are made of</Link></h2>
				<p>It's my first article, congrats me! I've been thinking of a few topics since the creation of the website but I was never in the right mood to write. I've just seen on 
				YouTube the video of K.M. Weiland entitled <a href="https://www.youtube.com/watch?v=1tmuv2qjlU4" rel="nofollow noreferrer" target="_blank">"I Hate Your Protagonist! Want 
				to Know Why?"</a> and a comment struck me. So I decided to answer it and this article is a version a little bit more polished. I am Kazan on YouTube if you wonder. I find 
				the topic very interesting and that's why I write an article. In short the author was saying that the goodness in a protagonist can make them distateful, instead of making 
				us feel close to them and appreciate them even a little. Because when some people want to make a hero protagonist, they make them deeply good, who don't say a word higher 
				than the other and who always keep calm, etc. On top of being boring, we do not care about the fate of such a character. If we don't have to make an anti-hero, we can find 
				it interesting to make a real "person" and not an always perfect kind of saint. She said also that a character deceives us when we learn to know them and they change all 
				of a sudden, making us realize that everything we believed about them only was an illusion, or rather a lie on behalf of the author. The comment I answered to therefore 
				asked to K.M., worried: "What if my protagonist's goal is to find out who he is? He will transform, but I warned everyone ^^' He starts out as nice guy, then he becomes a 
				jerk, and does something very good to the world at the end. I read a few stories like this and I loved them, but I really wonder of your opinion." 
				<Link to="/blog/article1.html">[More]</Link></p>
			</article>

			<article>
                                <h2><Link to="/blog/article2.html">[02/11/2018] The character and the player</Link></h2>
                                <p>In my video game project, there are several ethnicities. If some have the same face, others distinguish themselves by their physique. I thought that would be a problem for 
				players, but I then remember of my own experience. In World of Warcraft, we chose a race depending on their physique, at the risk of missing out on an interesting lore. This 
				will therefore not be a designing mistake on my side, but simply a part of the game, and I don't have to worry that some people miss out on a culture that suits them most, 
				just because they don't like an appearance or prefer another. I can stop the article here, but it needs to be filled, doesn't it? So I think about the detractors of video 
				games. Some people would see racism in this choice the players made. Yet, I'll go as far as saying that this choice is as legitimate in reality. One has the right to have 
				the tastes they want, whether it be for our own appearance or the one of our lovers. It doesn't mean we can't befriend all the origins in the world. And if, to go back to 
				the game, ethnicities are insulted in it, this is not a criticism of the real ethnicity from which their physique is inspired, but simple rivalities in this roleplaying 
				game. For yes, we have the right to hate a fictitious ethnicity, if this is what our character feels. <Link to="/blog/article2.html">[More]</Link></p>
                        </article>

                        <article>
                                <h2><Link to="/blog/article3.html">[02/15/2018] The VR film</Link></h2>
                                <p>If we use virtual reality (VR) for something else than video game, we might as well do our best to revolutionize the film. This was my thinking as I watched the 
				<a href="https://www.youtube.com/watch?v=D2-JvarJiqI" rel="nofollow noreferrer" target="_blank">video</a> of the Fossoyeur last March (no eng subtitles yet). The article 
				has lied around for a long time among my notes, and being tired that day I haven't noted all my conclusions, but today I finally clean up what I have. Yes, I took the time 
				to note this detail, though. When VR film is evoked several questions come up. Is it a film or a video game, and does it even have a future? To answer it, let's first have 
				a look at the difference between film and video game. Although both media illustrate fiction with image and sound, they distinguish from one another on the place they give 
				to the "user." In the story, he plays in a movie the viewer role and in a video game the actor role. The viewer observes without intervening, when the actor benefits from an 
				interaction to a certain degree, which will depend on the experience the game developer wants to offer. This interaction goes from the moving of setting's elements to help 
				the characters, without being noticed by them, to the fact of being himself a character of the story. Thus my vision of what must be called "VR film" is well and truly a 
				film and not a video game or an experience. VR film already exist, I'm said... That is true, and it corresponds to a 3D film in 360°. Does it have, in my opinion, a future? 
				I don't think so. Should I stop here? No. I don't see the point of VR film in its current version, and I will prove in this article that we can offer a better experience 
				without tumbling into a video game. I am convinced we can do a narrative medium where we move about the setting, and that distinguishes itself enough from games and other 
				experiences in virtual reality to be qualified as film. <Link to="/blog/article3.html">[More]</Link></p>
                        </article>

			<div className="page_numbers"><p>Pages: 1 . <Link to="/blog/page2.html">2</Link></p></div>
		</main>


	);
};

export default BlogPage1;

