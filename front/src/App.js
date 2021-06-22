import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Banner from './images/banner.jpg';
import Home from './scripts/Home.js';
import Works from './scripts/Works.js';
import Blog from './scripts/Blog.js';
import Contact from './scripts/Contact.js';
import Licenses from './scripts/Licenses.js';
import ControlPanel from './scripts/ControlPanel.js';

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
				<Route path="/home"><Home /></Route>
				<Route path="/works"><Works /></Route>
				<Route path="/blog"><Blog /></Route>
				<Route path="/contact"><Contact /></Route>
				<Route path="/licenses"><Licenses /></Route>
				<Route path="/controlpanel"><ControlPanel /></Route>
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

