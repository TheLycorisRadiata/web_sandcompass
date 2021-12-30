import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './views/Home/Home';
import Works from './views/Works/Works';
import Contact from './views/Contact/Contact';
import Licenses from './views/Licenses/Licenses';
import ControlPanel from './views/ControlPanel/ControlPanel';
import Blog from './views/Blog/Blog';
import BlogPage from './views/BlogPage/BlogPage';
import BlogArticle from './views/BlogArticle/BlogArticle';
import BlogEditor from './views/ControlPanel/BlogEditor';
import PageNotFound from './views/PageNotFound/PageNotFound';
import Banner from './assets/images/banner.jpg';
import './style.css';

const App = () => 
{
    const [is_admin_logged_in, set_is_admin_logged_in] = useState(false);
    const [all_categories, set_all_categories] = useState([]);
    const [all_articles, set_all_articles] = useState([]);

    const set_access = (is_access_granted) => set_is_admin_logged_in(is_access_granted);

    useEffect(() => 
    {
        fetch('http://localhost:3001/api/connection/admin/connected',
        {       
            method: 'get',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => set_is_admin_logged_in(json.message));

        fetch('http://localhost:3001/api/blog/articles',
        {
            method: 'get',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => json.status >= 400 ? console.warn('Error: The articles can\'t be retrieved.') : set_all_articles(json.message));

        fetch('http://localhost:3001/api/blog/categories',
        {
            method: 'get',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => json.status >= 400 ? console.warn('Error: The category can\'t be retrieved.') : set_all_categories(json.message));
    }, []);

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
                <Route exact path="/controlpanel"><ControlPanel is_access_granted={is_admin_logged_in} grant_access={set_access} close_access={set_access} /></Route>
                <Route exact path="/controlpanel/blogeditor"><BlogEditor is_access_granted={is_admin_logged_in} close_access={set_access} /></Route>
                <Route path="/"><PageNotFound /></Route>
            </Switch>

            <footer>
                <ul>
                    <Link to="/licenses/"><li>Licenses</li></Link>
                    <Link to="/controlpanel/"><li>Control Panel</li></Link>
                    <li id="copyright">Lycoris Radiata &copy; 2021 All Rights Reserved</li>
                </ul>
            </footer>
        </Router>
    );
};

export default App;

