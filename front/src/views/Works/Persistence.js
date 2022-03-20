import { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { AppContext } from '../../App';
import {
    vrmmorpg_project, game, disclaimer_os, code 
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

            <div id="see_code">
                <a href="https://github.com/thelycorisradiata/game_persistence" rel="noreferrer" target="_blank"><button className="button">{code(ct.lang)}</button></a>
            </div>
        </main>
    );
};

export default Persistence;

