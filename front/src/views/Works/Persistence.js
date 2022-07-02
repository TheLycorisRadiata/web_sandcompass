import { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import {
    works, other_works, 
    title_persistence, vrmmorpg_project, demo, download, disclaimer_os, code, 
    info_title, info_author, lycoris_radiata, info_type, info_genre, fantasy, 
    info_release_date, work_in_progress, info_summary, reviews
} from '../../assets/functions/lang';
import { get_os } from '../../assets/functions/os';
import DisplayCover from '../../assets/components/DisplayCover';
import package_info from '../../../package.json';

const Persistence = () => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = title_persistence(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', vrmmorpg_project(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', title_persistence(ct.lang) + ' | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', vrmmorpg_project(ct.lang));

    const [os, set_os] = useState(null);

    useLayoutEffect(() => set_os(get_os()), []);

    useEffect(() => document.querySelector(window.innerHeight < 700 ? 'main' : 'body')?.scrollIntoView(), []);

    return (
        <main>
            <h1 className="title">{works(ct.lang)}</h1>
            <div className="btn_other_works"><Link to="/works" className="button">{other_works(ct.lang)}</Link></div>

            <article>
                <h2 className="sub_title">{title_persistence(ct.lang)}</h2>

                <div id="work_presentation">
                    <DisplayCover lang={ct.lang} work="persistence" />

                    <div>
                        <ul>
                            <li><span className="txt_bold">{info_title(ct.lang)}</span>{title_persistence(ct.lang)}</li>
                            <li><span className="txt_bold">{info_author(ct.lang)}</span>{lycoris_radiata(ct.lang)}</li>
                            <li><span className="txt_bold">{info_type(ct.lang)}</span>{vrmmorpg_project(ct.lang)}</li>
                            <li><span className="txt_bold">{info_genre(ct.lang)}</span>{fantasy(ct.lang)}</li>
                            <li><span className="txt_bold">{info_release_date(ct.lang)}</span>{work_in_progress(ct.lang)}</li>
                        </ul>

                        <p className="txt_bold">{info_summary(ct.lang)}</p>
                        <p>{work_in_progress(ct.lang)}</p>
                        <p className="clear"></p>
                    </div>
                </div>

                <div>
                    <h3 className="sub_title">{reviews(ct.lang)}</h3>
                    <p>{work_in_progress(ct.lang)}</p>
                </div>
            </article>

            <aside>
                <h4 className="sub_title">{download(ct.lang)}</h4>
                <ul className="download_buttons">
                    {!os?.is_pc ? 
                        <li className="a">{disclaimer_os(ct.lang)}</li>
                        :
                        <a href={`${package_info.api}/file/${ct.lang}/game/persistence/${os?.name}`}><li><span className="icon os">{os?.icon}</span> {demo(ct.lang)}</li></a>}
                </ul>

                <div id="see_code">
                    <a href="https://github.com/TheLycorisRadiata/game_persistence" rel="noreferrer" target="_blank"><button className="button">{code(ct.lang)}</button></a>
                </div>
            </aside>
        </main>
    );
};

export default Persistence;

