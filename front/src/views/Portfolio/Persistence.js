import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import {
    vrmmorpg_project, go_back_portfolio 
} from '../../assets/functions/lang';

const Persistence = () => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = 'Persistence | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', vrmmorpg_project(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', 'Persistence | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', vrmmorpg_project(ct.lang));

    return (
        <main>
            <h1 className="title">Persistence</h1>
            <p className="txt_centered">{vrmmorpg_project(ct.lang)}</p>

            <div id="go_back_portfolio">
                <button className="button"><Link to="/portfolio">{go_back_portfolio(ct.lang)}</Link></button>
            </div>
        </main>
    );
};

export default Persistence;

