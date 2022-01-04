import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import Home from './views/Home/Home';
import Works from './views/Works/Works';
import Contact from './views/Home/Contact';
import Licenses from './views/Home/Licenses';
import ControlPanel from './views/ControlPanel/ControlPanel';
import UserPanel from './views/Account/UserPanel';
import SignUp from './views/Account/SignUp'
import Password from './views/Account/Password';
import ExecuteToken from './views/Account/ExecuteToken';
import Blog from './views/Blog/Blog';
import BlogPage from './views/Blog/BlogPage';
import BlogArticle from './views/Blog/BlogArticle';
import PageNotFound from './views/PageNotFound';
import Banner from './assets/images/banner.jpg';
import './style.css';
import { backend } from '../package.json';

const icon_user_new = <FontAwesomeIcon icon={faUserPlus} />;
const icon_user = <FontAwesomeIcon icon={faUser} />;

const App = () => 
{
    const [all_categories, set_all_categories] = useState([]);
    const [all_articles, set_all_articles] = useState([]);

    useEffect(() => 
    {
        fetch(backend + '/blog/articles',
        {
            method: 'GET',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => 
        {
            console.log(json.message);
            if (json.error)
                console.log(json.error);
            json.is_success ? set_all_articles(json.data) : console.warn(json.message);
        });

        fetch(backend + '/blog/categories',
        {
            method: 'GET',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => 
        {
            console.log(json.message);
            if (json.error)
                console.log(json.error);
            json.is_success ? set_all_categories(json.data) : console.warn(json.message);
        });
    }, []);

    return (
        <Router>
            <div>
                <header>
                    <div id="user_buttons">
                        <ul>
                            <li><Link to="/user/signup" title="Sign Up"><span>{icon_user_new}</span></Link></li>
                            <li><Link to="/user" title="Log In"><span>{icon_user}</span></Link></li>
                        </ul>
                    </div>

                    <Link to="/home">
                        <div id="banner">
                            <img src={Banner} alt="Banner Gareus temple in Uruk city" />
                            <p>Sand Compass</p>
                        </div>
                    </Link>

                    <nav>
                        <ul>
                            <Link to="/home"><li>Home</li></Link>
                            <Link to="/works"><li>Works</li></Link>
                            <Link to="/blog"><li>Blog</li></Link>
                            <Link to="/contact"><li>Contact</li></Link>
                        </ul>
                    </nav>
                </header>

                <Switch>
                    <Route exact path="/"><Home last_article={all_articles[all_articles.length - 1]} /></Route>
                    <Route exact path="/home"><Home last_article={all_articles[all_articles.length - 1]} /></Route>
                    <Route exact path="/works"><Works /></Route>
                    <Route exact path="/blog"><Blog categories={all_categories} articles={all_articles} /></Route>

                    <Route exact path="/blog/page.html"><BlogPage all_articles={all_articles} /></Route>

                        {all_articles.map(article => 
                            <Route exact path={'/blog/article' + article._id + '.html'} key={article._id}>
                                <BlogArticle is_preview={false} article={article} />
                            </Route>)
                        }

                    <Route exact path="/contact"><Contact /></Route>
                    <Route exact path="/licenses"><Licenses /></Route>
                    <Route exact path="/controlpanel"><ControlPanel articles={all_articles} set_articles={set_all_articles} categories={all_categories} set_categories={set_all_categories} /></Route>
                    <Route exact path="/user/signup"><SignUp /></Route>
                    <Route exact path="/user"><UserPanel /></Route>
                    <Route path="/password"><Password /></Route>
                    <Route path="/token"><ExecuteToken /></Route>
                    <Route path="/"><PageNotFound /></Route>
                </Switch>
            </div>

            <footer>
                <ul>
                    <Link to="/licenses"><li>Licenses</li></Link>
                    <Link to="/controlpanel"><li>Control Panel</li></Link>
                    <li id="copyright">Lycoris Radiata &copy; 2021 All Rights Reserved</li>
                </ul>
            </footer>
        </Router>
    );
};

export default App;

