import { useState, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUserPlus, faUser, faChevronCircleUp, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import Home from './views/Home/Home';
import Faq from './views/Home/Faq';
import Works from './views/Works/Works';
import Contact from './views/Home/Contact';
import Licenses from './views/Home/Licenses';
import ControlPanel from './views/ControlPanel/ControlPanel';
import Stats from './views/ControlPanel/Stats';
import BlogEditor from './views/ControlPanel/BlogEditor';
import NewsletterEditor from './views/ControlPanel/NewsletterEditor';
import FaqEditor from './views/ControlPanel/FaqEditor';
import UserPanel from './views/Account/UserPanel';
import SignUp from './views/Account/SignUp'
import Password from './views/Account/Password';
import ExecuteToken from './views/Account/ExecuteToken';
import BlogPage from './views/Blog/BlogPage';
import BlogArticle from './views/Blog/BlogArticle';
import PageNotFound from './views/PageNotFound';
import './style.css';
import { backend } from '../package.json';

const icon_lang = <FontAwesomeIcon icon={faGlobe} />;
const icon_user_new = <FontAwesomeIcon icon={faUserPlus} />;
const icon_user = <FontAwesomeIcon icon={faUser} />;
const icon_up = <FontAwesomeIcon icon={faChevronCircleUp} />;
const icon_down = <FontAwesomeIcon icon={faChevronCircleDown} />;

const App = () => 
{
    const [language, set_language] = useState(0);

    const [admin_account_data, set_admin_account_data] = useState(null);
    const [is_admin_access_granted, set_is_admin_access_granted] = useState(false);
    const [user_account_data, set_user_account_data] = useState(null);
    const [is_user_access_granted, set_is_user_access_granted] = useState(false);

    const [all_questions, set_all_questions] = useState([]);
    const [all_categories, set_all_categories] = useState([]);
    const [all_articles, set_all_articles] = useState([]);

    useLayoutEffect(() => 
    {
        const lang = navigator.language || navigator.userLanguage;
        const faq_arr = [];

        if (lang === 'fr' || lang.split('-')[0] === 'fr')
            set_language(1); // French
        else if (lang === 'ja' || lang.split('-')[0] === 'ja')
            set_language(2); // Japanese
        else
            set_language(0); // English (default)

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
    }, []);

    return (
        <Router>
            <div>
                <header>
                    <div id="icon_lang" className="button"><span className="icon">{icon_lang}</span></div>

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
                    <Route exact path="/blog"><BlogPage articles={all_articles} categories={all_categories} /></Route>

                        {all_articles.map(article => 
                            <Route exact path={'/blog/article' + article._id} key={article._id}>
                                <BlogArticle 
                                    is_preview={false} article={article} category={all_categories.find(e => e._id === article.category)?.name} 
                                    articles={all_articles} set_articles={set_all_articles} 
                                    admin_account_data={admin_account_data} user_account_data={user_account_data} 
                                    set_admin_account_data={set_admin_account_data} set_user_account_data={set_user_account_data} />
                            </Route>)
                        }

                    <Route exact path="/contact"><Contact /></Route>
                    <Route exact path="/licenses"><Licenses /></Route>

                    <Route exact path="/admin/stats"><Stats is_access_granted={is_admin_access_granted} /></Route>
                    <Route exact path="/admin/blog">
                        <BlogEditor 
                            account_data={admin_account_data} is_access_granted={is_admin_access_granted} 
                            articles={all_articles} set_articles={set_all_articles} 
                            categories={all_categories} set_categories={set_all_categories} />
                    </Route>
                    <Route exact path="/admin/newsletter"><NewsletterEditor is_access_granted={is_admin_access_granted} /></Route>
                    <Route exact path="/admin/faq"><FaqEditor is_access_granted={is_admin_access_granted} questions={all_questions} set_questions={set_all_questions} /></Route>
                    <Route exact path="/admin">
                        <ControlPanel 
                            account_data={admin_account_data} set_account_data={set_admin_account_data} 
                            is_access_granted={is_admin_access_granted} set_is_access_granted={set_is_admin_access_granted} 
                            categories={all_categories} />
                    </Route>

                    <Route exact path="/user/signup"><SignUp /></Route>
                    <Route exact path="/user">
                        <UserPanel 
                            account_data={user_account_data} set_account_data={set_user_account_data} 
                            is_access_granted={is_user_access_granted} set_is_access_granted={set_is_user_access_granted} 
                            categories={all_categories} />
                    </Route>
                    <Route path="/password"><Password /></Route>
                    <Route path="/token"><ExecuteToken /></Route>
                    <Route path="/"><PageNotFound /></Route>
                </Switch>
            </div>

            <footer>
                <ul id="bottom">
                    <Link to="#top"><li id="btn_top">{icon_up}</li></Link>
                    <Link to="/licenses"><li>Licenses</li></Link>
                    <Link to="/admin"><li>Control Panel</li></Link>
                    <li className="txt_default_cursor">Lycoris Radiata &copy; 2022 All Rights Reserved</li>
                    <Link to="#bottom"><li id="btn_bottom">{icon_down}</li></Link>
                </ul>
            </footer>
        </Router>
    );
};

export default App;

