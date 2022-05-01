import { useState, useLayoutEffect, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import usePopUp from './assets/hooks/usePopUp';
import {
    index_to_language_code, language_code_to_index, 
    english, french, japanese, 
    sign_up, log_in, user_account, 
    home, faq_short, works, blog, contact, 
    licenses, legal_notices, control_panel, copyright
} from './assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUserPlus, faUser, faChevronCircleUp, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import Home from './views/Home/Home';
import Faq from './views/Home/Faq';
import Works from './views/Works/Works';
import Contact from './views/Home/Contact';
import Licenses from './views/Home/Licenses';
import LegalNotices from './views/Home/LegalNotices';
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
import Persistence from './views/Works/Persistence';
import PageNotFound from './views/PageNotFound';
import Flag_Eng from './assets/images/flags/usa.png';
import Flag_Fr from './assets/images/flags/france.png';
import Flag_Jp from './assets/images/flags/japan.png';
import package_info from '../package.json';
import './style.css';

const icon_lang = <FontAwesomeIcon icon={faGlobe} />;
const icon_user_new = <FontAwesomeIcon icon={faUserPlus} />;
const icon_user = <FontAwesomeIcon icon={faUser} />;
const icon_up = <FontAwesomeIcon icon={faChevronCircleUp} />;
const icon_down = <FontAwesomeIcon icon={faChevronCircleDown} />;

export const AppContext = createContext({});

const App = () => 
{
    // Function to open the custom pop-up window (alert, confirm, prompt)
    const { popup } = usePopUp();

    const [lang, set_lang] = useState(0);
    const [is_flag_menu_displayed, set_is_flag_menu_displayed] = useState(false);

    document.documentElement.setAttribute('lang', index_to_language_code(lang));

    const [admin_account_data, set_admin_account_data] = useState(null);
    const [is_admin_access_granted, set_is_admin_access_granted] = useState(false);
    const [admin_rank, set_admin_rank] = useState(null);
    const [user_account_data, set_user_account_data] = useState(null);
    const [is_user_access_granted, set_is_user_access_granted] = useState(false);
    const [user_rank, set_user_rank] = useState(null);

    const [all_questions, set_all_questions] = useState(null);
    const [all_categories, set_all_categories] = useState([]);
    const [blog_page, set_blog_page] = useState(1);

    const context_value = 
    {
        lang, set_lang,
        popup
    };

    const update_lang = (index) => 
    {
        set_lang(index);
        localStorage.setItem('lang', JSON.stringify({ index: index }));
    };

    useLayoutEffect(() => 
    {
        const login_token = document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || '';
        const login_id = document.cookie.match('(^|;)\\s*id\\s*=\\s*([^;]+)')?.pop() || '';

        const lang_machine = navigator.language || navigator.userLanguage;
        const lang_localstorage = JSON.parse(localStorage.getItem('lang'));
        const var_lang = lang_localstorage ? lang_localstorage.index : language_code_to_index(lang_machine.split('-')[0]);

        set_lang(var_lang);
        // var_lang exists because I need to pass lang into the fetch and at this step the state isn't updated yet

        fetch(`${package_info.api}/blog/${var_lang}/categories`)
        .then(res => res.json())
        .then(json => 
        {
            //console.log(json.message);
            //if (json.error)
                //console.log(json.error);
            if (json.is_success)
                set_all_categories(json.data);
        });
        //.catch(err => console.log(err));

        // If cookie to log in automatically
        if (login_token !== '' && login_id !== '')
        {
            fetch(`${package_info.api}/token/0/${login_token}/${login_id}`)
            .then(res => res.json())
            .then(json => 
            {
                if (json.is_success)
                {
                    if (json.account_data.is_admin)
                    {
                        set_admin_account_data(json.account_data);
                        set_is_admin_access_granted(true);
                    }
                    else
                    {
                        set_user_account_data(json.account_data);
                        set_is_user_access_granted(true);
                    }
                }
            });
            //.catch(err => console.log(err));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AppContext.Provider value={context_value}>
            <Router>
                <div>
                    <header>
                        <div id="icon_lang" className="button" onMouseEnter={() => set_is_flag_menu_displayed(true)}><span className="icon">{icon_lang}</span></div>
                        {is_flag_menu_displayed && 
                            <ul id="flag_menu" onMouseLeave={() => set_is_flag_menu_displayed(false)}>
                                <li onClick={() => update_lang(0)}><img src={Flag_Eng} alt={english(lang)} className="icon" /> <span>{english(lang)}</span></li>
                                <li onClick={() => update_lang(1)}><img src={Flag_Fr} alt={french(lang)} className="icon" /> <span>{french(lang)}</span></li>
                                <li onClick={() => update_lang(2)}><img src={Flag_Jp} alt={japanese(lang)} className="icon" /> <span>{japanese(lang)}</span></li>
                            </ul>}

                        <Link to="/home">
                            <div id="banner">
                                <div id="title">Sand Compass</div>
                            </div>
                        </Link>

                        <div id="user_buttons">
                            <ul>
                                <li><Link to="/user/signup"><span>{icon_user_new}</span> {sign_up(lang)}</Link></li>
                                <li><Link to="/user"><span>{icon_user}</span> {is_user_access_granted ? user_account(lang) : log_in(lang)}</Link></li>
                            </ul>
                        </div>

                        <nav>
                            <ul>
                                <Link to="/home"><li>{home(lang)}</li></Link>
                                <Link to="/faq"><li>{faq_short(lang)}</li></Link>
                                <Link to="/works"><li>{works(lang)}</li></Link>
                                <Link to="/blog" onClick={() => set_blog_page(1)}><li>{blog(lang)}</li></Link>
                                <Link to="/contact"><li>{contact(lang)}</li></Link>
                            </ul>
                        </nav>
                    </header>

                    <Switch>
                        <Route exact path="/"><Home /></Route>
                        <Route exact path="/home"><Home /></Route>
                        <Route exact path="/faq"><Faq questions={all_questions} set_questions={set_all_questions} /></Route>
                        <Route exact path="/works"><Works /></Route>

                        <Route path={'/blog/article'}>
                            <BlogArticle 
                                admin_account_data={admin_account_data} user_account_data={user_account_data} 
                                set_admin_account_data={set_admin_account_data} set_user_account_data={set_user_account_data} />
                        </Route>
                        <Route path="/blog"><BlogPage blog_page={blog_page} set_blog_page={set_blog_page} categories={all_categories} /></Route>

                        <Route exact path="/contact"><Contact username={user_account_data?.username} email={user_account_data?.email_address} /></Route>
                        <Route exact path="/licenses"><Licenses /></Route>
                        <Route exact path="/legal"><LegalNotices /></Route>

                        <Route exact path="/admin/stats">
                            <Stats 
                                account_data={admin_account_data} set_account_data={set_admin_account_data} 
                                is_access_granted={is_admin_access_granted} set_is_access_granted={set_is_admin_access_granted} />
                        </Route>
                        <Route exact path="/admin/blog">
                            <BlogEditor 
                                account_data={admin_account_data} set_account_data={set_admin_account_data} 
                                is_access_granted={is_admin_access_granted} set_is_access_granted={set_is_admin_access_granted} 
                                categories={all_categories} set_categories={set_all_categories} />
                        </Route>
                        <Route exact path="/admin/newsletter">
                            <NewsletterEditor 
                                account_data={admin_account_data} set_account_data={set_admin_account_data} 
                                is_access_granted={is_admin_access_granted} set_is_access_granted={set_is_admin_access_granted} />
                        </Route>
                        <Route exact path="/admin/faq">
                            <FaqEditor 
                                account_data={admin_account_data} set_account_data={set_admin_account_data} 
                                is_access_granted={is_admin_access_granted} set_is_access_granted={set_is_admin_access_granted} 
                                questions={all_questions} set_questions={set_all_questions} />
                        </Route>
                        <Route exact path="/admin">
                            <ControlPanel 
                                account_data={admin_account_data} set_account_data={set_admin_account_data} 
                                is_access_granted={is_admin_access_granted} set_is_access_granted={set_is_admin_access_granted} 
                                admin_rank={admin_rank} set_admin_rank={set_admin_rank} 
                                categories={all_categories} />
                        </Route>

                        <Route exact path="/user/signup"><SignUp /></Route>
                        <Route exact path="/user">
                            <UserPanel 
                                account_data={user_account_data} set_account_data={set_user_account_data} 
                                is_access_granted={is_user_access_granted} set_is_access_granted={set_is_user_access_granted} 
                                user_rank={user_rank} set_user_rank={set_user_rank} 
                                categories={all_categories} />
                        </Route>
                        <Route path="/password"><Password /></Route>
                        <Route path="/token"><ExecuteToken /></Route>

                        <Route exact path="/works/persistence"><Persistence /></Route>

                        <Route path="/"><PageNotFound /></Route>
                    </Switch>
                </div>

                <footer>
                    <ul id="bottom">
                        <Link to="#top"><li id="btn_top">{icon_up}</li></Link>
                        <Link to="/licenses"><li>{licenses(lang)}</li></Link>
                        <Link to="/legal"><li>{legal_notices(lang)}</li></Link>
                        <Link to="/admin"><li>{control_panel(lang)}</li></Link>
                        <li className="txt_default_cursor">{copyright(lang)}</li>
                        <Link to="#bottom"><li id="btn_bottom">{icon_down}</li></Link>
                    </ul>
                </footer>
            </Router>
        </AppContext.Provider>
    );
};

export default App;

