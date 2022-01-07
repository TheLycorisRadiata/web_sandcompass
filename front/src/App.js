import { useState, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUser, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import Home from './views/Home/Home';
import Faq from './views/Home/Faq';
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
import './style.css';
import { backend } from '../package.json';

const icon_user_new = <FontAwesomeIcon icon={faUserPlus} />;
const icon_user = <FontAwesomeIcon icon={faUser} />;
const icon_up = <FontAwesomeIcon icon={faChevronCircleUp} />;

const App = () => 
{
    const [admin_account_data, set_admin_account_data] = useState(null);
    const [is_admin_access_granted, set_is_admin_access_granted] = useState(false);
    const [user_account_data, set_user_account_data] = useState(null);
    const [is_user_access_granted, set_is_user_access_granted] = useState(false);

    const [all_questions, set_all_questions] = useState([]);
    const [all_categories, set_all_categories] = useState([]);
    const [all_articles, set_all_articles] = useState([]);

    useLayoutEffect(() => 
    {
        const faq_arr = [];

        fetch(backend + '/faq/all')
        .then(res => res.json())
        .then(json =>
        {
            console.log(json.message);
            if (json.error)
                console.log(json.error);

            if (json.is_success)
            {
                json.data.forEach(e => faq_arr.push(
                {
                    _id: e._id,
                    question: e.question,
                    answer: e.answer,
                    is_deployed: false
                }));
            }

            set_all_questions(faq_arr);
        })
        .catch(err => console.log(err));

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
            if (json.is_success)
                set_all_articles(json.data);
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
            if (json.is_success)
                set_all_categories(json.data);
        });
    }, []);

    return (
        <Router>
            <div>
                <header>
                    <Link to="/home">
                        <div id="banner">
                            <div id="title">Sand Compass</div>
                        </div>
                    </Link>

                    <div id="user_buttons">
                        <ul>
                            <li><Link to="/user/signup"><span>{icon_user_new}</span> Sign Up</Link></li>
                            <li><Link to="/user"><span>{icon_user}</span> Log In</Link></li>
                        </ul>
                    </div>

                    <nav>
                        <ul>
                            <Link to="/home"><li>Home</li></Link>
                            <Link to="/faq"><li>FAQ</li></Link>
                            <Link to="/works"><li>Works</li></Link>
                            <Link to="/blog"><li>Blog</li></Link>
                            <Link to="/contact"><li>Contact</li></Link>
                        </ul>
                    </nav>
                </header>

                <Switch>
                    <Route exact path="/"><Home last_article={all_articles[all_articles.length - 1]} /></Route>
                    <Route exact path="/home"><Home last_article={all_articles[all_articles.length - 1]} /></Route>
                    <Route exact path="/faq"><Faq questions={all_questions} set_questions={set_all_questions} /></Route>
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
                    <Route exact path="/controlpanel">
                        <ControlPanel 
                            account_data={admin_account_data} set_account_data={set_admin_account_data} 
                            is_access_granted={is_admin_access_granted} set_is_access_granted={set_is_admin_access_granted} 
                            questions={all_questions} set_questions={set_all_questions} 
                            articles={all_articles} set_articles={set_all_articles} 
                            categories={all_categories} set_categories={set_all_categories} />
                    </Route>
                    <Route exact path="/user/signup"><SignUp /></Route>
                    <Route exact path="/user">
                        <UserPanel 
                            account_data={user_account_data} set_account_data={set_user_account_data} 
                            is_access_granted={is_user_access_granted} set_is_access_granted={set_is_user_access_granted} />
                    </Route>
                    <Route path="/password"><Password /></Route>
                    <Route path="/token"><ExecuteToken /></Route>
                    <Route path="/"><PageNotFound /></Route>
                </Switch>
            </div>

            <footer>
                <ul>
                    <Link to="/licenses"><li>Licenses</li></Link>
                    <Link to="/controlpanel"><li>Control Panel</li></Link>
                    <li className="txt_default_cursor">Lycoris Radiata &copy; 2022 All Rights Reserved</li>
                    <Link to="#top"><li id="btn_top">{icon_up}</li></Link>
                </ul>
            </footer>
        </Router>
    );
};

export default App;

