import { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import {
    vrmmorpg_project, game, disclaimer_os, go_back_portfolio 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { get_os } from '../../assets/functions/os';
import package_info from '../../../package.json';

const icon_download = <FontAwesomeIcon icon={faDownload} />

const Persistence = () => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = 'Persistence | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', vrmmorpg_project(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', 'Persistence | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', vrmmorpg_project(ct.lang));

    const [is_user_on_pc, set_is_user_on_pc] = useState(false);

    useLayoutEffect(() => 
    {
        if (get_os() !== 'unknown')
            set_is_user_on_pc(true);
    }, []);

    useEffect(() => document.querySelector('main')?.scrollIntoView(), []);

    return (
        <main>
            <h1 className="title">Persistence</h1>
            <p className="txt_centered">{vrmmorpg_project(ct.lang)}</p>

            <ul className="download_buttons">
                {is_user_on_pc ? 
                    <a href={`${package_info.api}/file/${ct.lang}/game/persistence/${get_os()}`}><li><span className="icon">{icon_download}</span> {game(ct.lang)}</li></a>
                :
                    <li className="a" title={disclaimer_os(ct.lang)}>{icon_download} {game(ct.lang)}</li>}
            </ul>

            <div id="go_back_portfolio">
                <Link to="/portfolio"><button className="button">{go_back_portfolio(ct.lang)}</button></Link>
            </div>
        </main>
    );
};

export default Persistence;

