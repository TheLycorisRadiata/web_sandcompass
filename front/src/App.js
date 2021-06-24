import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from './scripts/Home.js';
import Works from './scripts/Works.js';
import Blog from './scripts/Blog.js';
import BlogPage1 from './scripts/BlogPage1.js';
import BlogPage2 from './scripts/BlogPage2.js';
import BlogArticle1 from './scripts/BlogArticle1.js';
import BlogArticle2 from './scripts/BlogArticle2.js';
import BlogArticle3 from './scripts/BlogArticle3.js';
import BlogArticle4 from './scripts/BlogArticle4.js';
import Contact from './scripts/Contact.js';
import Licenses from './scripts/Licenses.js';
import ControlPanel from './scripts/ControlPanel.js';
import Banner from './images/banner.jpg';

function App()
{
	return (
		<Router>
			<header>
				<Link to="/home/">
					<div id="banner">
						<img src={Banner} alt="Banner Gareus temple in Uruk city" />
						<p>Sand Compass</p>
					</div>
				</Link>

				<nav>
					<ul>
						<Link to="/home/"><li>Home</li></Link>
						<Link to="/works/"><li>Works</li></Link>
						<Link to="/blog/"><li>Blog</li></Link>
						<Link to="/contact/"><li>Contact</li></Link>
					</ul>
				</nav>
			</header>

			<Switch>
				<Route exact path="/"><Home /></Route>
				<Route exact path="/home"><Home /></Route>
				<Route exact path="/works"><Works /></Route>
				<Route exact path="/blog"><Blog /></Route>
					<Route exact path="/blog/page1.html"><BlogPage1 /></Route>
					<Route exact path="/blog/page2.html"><BlogPage2 /></Route>
					<Route exact path="/blog/article1.html"><BlogArticle1 /></Route>
					<Route exact path="/blog/article2.html"><BlogArticle2 /></Route>
					<Route exact path="/blog/article3.html"><BlogArticle3 /></Route>
					<Route exact path="/blog/article4.html"><BlogArticle4 /></Route>
				<Route exact path="/contact"><Contact /></Route>
				<Route exact path="/licenses"><Licenses /></Route>
				<Route exact path="/controlpanel"><ControlPanel /></Route>
			</Switch>

			<footer>
				<ul>
					<Link to="/licenses/"><li>Licenses</li></Link>
					<Link to="/controlpanel/"><li>Control Panel</li></Link>
					<li>Lycoris Radiata &copy; 2021 All Rights Reserved</li>
				</ul>
			</footer>
		</Router>
	);
}

export default App;

