import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import {
    works, default_desc, 
    title_cosmic_dust, standalone_novel, 
    title_persistence, vrmmorpg_project 
} from '../../assets/functions/lang';
import DisplayCover from '../../assets/components/DisplayCover';

const Works = () => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = works(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', default_desc(ct.lang));
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', works(ct.lang) + ' | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', default_desc(ct.lang));

    useEffect(() => document.querySelector(window.innerHeight < 700 ? 'main' : 'body')?.scrollIntoView(), []);

    return (
        <main id="works">
            <h1 className="title">{works(ct.lang)}</h1>

            <div>
                <section>
                    <Link to="/works/cosmic_dust">
                        <ul>
                            <li>{title_cosmic_dust(ct.lang)}</li>
                            <li>{standalone_novel(ct.lang)}</li>
                            <li><DisplayCover lang={ct.lang} work="cosmic_dust" /></li>
                        </ul>
                    </Link>
                </section>

                <section>
                    <Link to="/works/persistence">
                        <ul>
                            <li>{title_persistence(ct.lang)}</li>
                            <li>{vrmmorpg_project(ct.lang)}</li>
                            <li><DisplayCover lang={ct.lang} work="persistence" /></li>
                        </ul>
                    </Link>
                </section>
            </div>
        </main>
    );
};

export default Works;

