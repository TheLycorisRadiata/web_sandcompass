import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import {
    works, other_works, 
    info_title, info_author, info_type, info_genre, info_release_date, info_summary, 
    radiata_lycoris, standalone_novel, science_fiction, work_in_progress, 
    title_cosmic_dust, catch_phrase_cosmic_dust, summary_cosmic_dust, link_to_cosmic_dust_cover, 
    reviews, disclaimer_reviews_1_on_2, disclaimer_reviews_2_on_2, 
    different_formats, azw, epub, pdf, all, how_to_pick_format 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import DisplayCover from '../../assets/components/DisplayCover';
import Questionnaire from '../../assets/components/Questionnaire';
import package_info from '../../../package.json';

const icon_download = <FontAwesomeIcon icon={faDownload} />

const CosmicDust = () => 
{
    const ct = useContext(AppContext);

    // HTML standard meta tags
    document.title = title_cosmic_dust(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', summary_cosmic_dust(ct.lang)[0] + ' ' + summary_cosmic_dust(ct.lang)[1] + '..');
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]').setAttribute('content', title_cosmic_dust(ct.lang) + ' | Sand Compass');
    document.querySelector('meta[property="og:description"]').setAttribute('content', summary_cosmic_dust(ct.lang)[0] + ' ' + summary_cosmic_dust(ct.lang)[1] + '..');
    document.querySelector('meta[property="og:image"').setAttribute('content', link_to_cosmic_dust_cover(ct.lang));
    document.querySelector('meta[property="og:type"').setAttribute('content', 'book');

    useEffect(() => document.querySelector(window.innerHeight < 700 ? 'main' : 'body')?.scrollIntoView(), []);

    return (
        <main>
            <h1 className="title">{works(ct.lang)}</h1>
            <div className="btn_other_works"><Link to="/works" className="button">{other_works(ct.lang)}</Link></div>

            <article>
                <h2 className="sub_title">{title_cosmic_dust(ct.lang)}</h2>

                <div id="book_presentation">
                    <DisplayCover lang={ct.lang} work="cosmic_dust" />

                    <div>
                        <ul>
                            <li><span className="txt_bold">{info_title(ct.lang)}</span>{title_cosmic_dust(ct.lang)}</li>
                            <li><span className="txt_bold">{info_author(ct.lang)}</span>{radiata_lycoris(ct.lang)}</li>
                            <li><span className="txt_bold">{info_type(ct.lang)}</span>{standalone_novel(ct.lang)}</li>
                            <li><span className="txt_bold">{info_genre(ct.lang)}</span>{science_fiction(ct.lang)}</li>
                            <li><span className="txt_bold">{info_release_date(ct.lang)}</span>{work_in_progress(ct.lang)}</li>
                        </ul>

                        <p className="txt_bold">{info_summary(ct.lang)}</p>
                        <p id="catch_phrase" className="txt_italic">{catch_phrase_cosmic_dust(ct.lang)}</p>

                        {summary_cosmic_dust(ct.lang).map((e, i) => <p key={'summary_' + i}>{e}</p>)}
                        <p className="clear"></p>
                    </div>
                </div>

                <div>
                    <h3 className="sub_title">{reviews(ct.lang)}</h3>
                    {ct.lang === 2 ? <p>{disclaimer_reviews_1_on_2(ct.lang)}{'「'}{title_cosmic_dust(ct.lang)}{'」'}{disclaimer_reviews_2_on_2(ct.lang)}</p>
                    : <p>{disclaimer_reviews_1_on_2(ct.lang)}<em>{title_cosmic_dust(ct.lang)}</em>{disclaimer_reviews_2_on_2(ct.lang)}</p>}
                </div>
            </article>

            <aside>
                <div>
                    <h3 className="sub_title">{different_formats(ct.lang)}</h3>

                    {/* 
                        AZW (Kindle)
                        ePub (All e-readers but Kindle)
                        PDF (Computers, smartphones and tablets)
                    */}

                    <ul className="download_buttons">
                        <a href={`${package_info.api}/file/${ct.lang}/book/cosmic_dust/azw3`}><li><span className="icon">{icon_download}</span>{' ' + azw(ct.lang)}</li></a>
                        <a href={`${package_info.api}/file/${ct.lang}/book/cosmic_dust/epub`}><li><span className="icon">{icon_download}</span>{' ' + epub(ct.lang)}</li></a>
                        <a href={`${package_info.api}/file/${ct.lang}/book/cosmic_dust/pdf`}><li><span className="icon">{icon_download}</span>{' ' + pdf(ct.lang)}</li></a>
                        <a href={`${package_info.api}/file/${ct.lang}/book/cosmic_dust/zip`}><li><span className="icon">{icon_download}</span>{' ' + all(ct.lang)}</li></a>
                    </ul>
                </div>

                <div>
                    <h3 className="sub_title">{how_to_pick_format(ct.lang)}</h3>
                    <Questionnaire />
                </div>
            </aside>
        </main>
    );
};

export default CosmicDust;

