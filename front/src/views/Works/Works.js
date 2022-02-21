import { useContext } from 'react';
import { AppContext } from '../../App';
import {
    works, info_title, info_author, info_type, info_genre, info_release_date, info_summary, 
    radiata_lycoris, standalone_novel, science_fiction, work_in_progress, 
    title_cosmic_dust, catch_phrase_cosmic_dust, summary_cosmic_dust, 
    reviews, disclaimer_reviews_1_on_2, disclaimer_reviews_2_on_2, 
    different_formats, file_name_azw, file_name_epub, file_name_pdf, file_name_all, all, how_to_pick_format 
} from '../../assets/functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import File_AZW from '../../assets/files/works/cosmic_dust/test.azw3';
import File_ePub from '../../assets/files/works/cosmic_dust/test.epub';
import File_PDF from '../../assets/files/works/cosmic_dust/test.pdf';
import File_Zip from '../../assets/files/works/cosmic_dust/test.zip';
import DisplayCover from '../../assets/components/DisplayCover';
import Questionnaire from '../../assets/components/Questionnaire';

const icon_download = <FontAwesomeIcon icon={faDownload} />

const Works = () => 
{
    const ct = useContext(AppContext);
    document.title = works(ct.lang) + ' | Sand Compass';
    document.querySelector('meta[name="description"]').setAttribute('content', summary_cosmic_dust(ct.lang)[0] + ' ' + summary_cosmic_dust(ct.lang)[1] + '..');

    return (
        <main id="works">
            <h1 className="title">{works(ct.lang)}</h1>
            <article>
                <h2 className="sub_title">{title_cosmic_dust(ct.lang)}</h2>

                <div id="book_presentation">
                    <DisplayCover lang={ct.lang} />

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

                    <ul>
                        <a href={File_AZW} download={file_name_azw(ct.lang)}><li><span className="icon">{icon_download}</span> AZW</li></a>
                        <a href={File_ePub} download={file_name_epub(ct.lang)}><li><span className="icon">{icon_download}</span> ePub</li></a>
                        <a href={File_PDF} download={file_name_pdf(ct.lang)}><li><span className="icon">{icon_download}</span> PDF</li></a>
                        <a href={File_Zip} download={file_name_all(ct.lang)}><li><span className="icon">{icon_download}</span> {all(ct.lang)}</li></a>
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

export default Works;

