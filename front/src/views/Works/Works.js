import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Book_Cover from '../../assets/images/works/cosmic_dust/cover_eng.png';
import File_AZW from '../../assets/files/works/cosmic_dust/test.azw3';
import File_ePub from '../../assets/files/works/cosmic_dust/test.epub';
import File_PDF from '../../assets/files/works/cosmic_dust/test.pdf';
import File_Zip from '../../assets/files/works/cosmic_dust/test.zip';
import EbookFormatPicker from '../../assets/components/EbookFormatPicker';

const icon_download = <FontAwesomeIcon icon={faDownload} />

const Works = () => 
{
    return (
        <main id="works">
            <h1 className="title">Works</h1>
            <article>
                <h2 className="sub_title">Cosmic Dust</h2>

                <div id="book_presentation">
                    <img src={Book_Cover} alt="Book cover Cosmic Dust" id="book_cover" />

                    <div>
                        <ul>
                            <li><span className="txt_bold">Title:</span> Cosmic Dust</li>
                            <li><span className="txt_bold">Author:</span> Lycoris Radiata</li>
                            <li><span className="txt_bold">Type:</span> Standalone novel</li>
                            <li><span className="txt_bold">Genre:</span> Science fiction</li>
                            <li><span className="txt_bold">Release date:</span> Work In Progress</li>
                        </ul>

                        <p className="txt_bold">Summary:</p>
                        <p id="catch_phrase" className="txt_italic">Is Zekharia's urge to create the proof of his sickness, or is he one of the few who function properly?</p>

                        <p>Zekharia Bettelheim is an unpretentious citizen of the Society of Arks, a spaceship on a quest for a new planet. Suffering, he tries to find 
                        an explanation to his affliction and is helped for this by the character he created. His imaginary friend helps with putting his thoughts in 
                        order, but he knows that someday he will need to call on a real person.</p>
                        <p>A chain of circumstances leads him to contact a former classmate who, contrary to Zekharia, seems to blossom in their little world and have 
                        everything going for him. This man can become the friend he needs, but first his being trustworthy has yet to be confirmed.</p>
                        <p>There is a real difference between a creation we know about and a human being, who always keeps their share of mystery and is therefore able 
                        of betrayal. In a world elevating the useful in dogma, it is difficult to admit to anyone that art makes us going through the day, even more so 
                        to a person who could as well be the Society personified. But is it this crazy to say that art is not only useful, but also essential?</p>
                        <p>Is Zekharia's urge to create the proof of his sickness, or is he one of the few who function properly? No matter the answer, two roads lie 
                        before him: twisting himself to fit in or finding the way to change mentalities.</p>
                        <p className="clear"></p>
                    </div>
                </div>

                <div>
                    <h3 className="sub_title">Reviews</h3>
                    <p>The Booknode and Goodreads pages for <em>Cosmic Dust</em> will be available at release.</p>
                </div>
            </article>

            <aside>
                <div>
                    <h3 className="sub_title">The different formats</h3>

                    {/* 
                        AZW (Kindle)
                        ePub (All e-readers but Kindle)
                        PDF (Computers, smartphones and tablets)
                    */}

                    <ul>
                        <a href={File_AZW} download="Test AZW"><li><span className="icon">{icon_download}</span> AZW</li></a>
                        <a href={File_ePub} download="Test ePub"><li><span className="icon">{icon_download}</span> ePub</li></a>
                        <a href={File_PDF} download="Test PDF"><li><span className="icon">{icon_download}</span> PDF</li></a>
                        <a href={File_Zip} download="Test All"><li><span className="icon">{icon_download}</span> All</li></a>
                    </ul>
                </div>

                <div>
                    <h3 className="sub_title">The how-to of picking a format</h3>
                    <EbookFormatPicker />
                </div>
            </aside>
        </main>
    );
};

export default Works;

