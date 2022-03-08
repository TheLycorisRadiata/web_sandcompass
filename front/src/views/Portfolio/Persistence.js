import { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import {
    vrmmorpg_project, game, disclaimer_os, go_back_portfolio 
} from '../../assets/functions/lang';
import { get_os } from '../../assets/functions/os';
import package_info from '../../../package.json';

const Persistence = () => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = 'Persistence | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', vrmmorpg_project(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', 'Persistence | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', vrmmorpg_project(ct.lang));

    const [os, set_os] = useState(null);

    useLayoutEffect(() => set_os(get_os()), []);

    useEffect(() => document.querySelector(window.innerHeight < 700 ? 'main' : 'body')?.scrollIntoView(), []);

    return (
        <main>
            <h1 className="title">Persistence</h1>
            <p className="txt_centered">{vrmmorpg_project(ct.lang)}</p>

            <ul className="download_buttons">
                {!os?.is_pc ? 
                    <li className="a">{disclaimer_os(ct.lang)}</li>
                :
                    <a href={`${package_info.api}/file/${ct.lang}/game/persistence/${os?.name}`}><li><span className="icon os">{os?.icon}</span> {game(ct.lang)}</li></a>}
            </ul>

            <div id="go_back_portfolio">
                <Link to="/portfolio"><button className="button">{go_back_portfolio(ct.lang)}</button></Link>
            </div>
        </main>
    );
};

export default Persistence;

