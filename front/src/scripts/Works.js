import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDownload} from '@fortawesome/free-solid-svg-icons';
import EbookFormatPicker from './EbookFormatPicker.js';
import Book_Cover from '../images/cosmic_dust_cover_eng.png';
import File_AZW from '../files/cosmic_dust/test.azw3';
import File_ePub from '../files/cosmic_dust/test.epub';
import File_PDF from '../files/cosmic_dust/test.pdf';
import File_Zip from '../files/cosmic_dust/test.zip';
import '../styles/Works.css';

const icon_download = <FontAwesomeIcon icon={faDownload} />

const Works = () => 
{
	return (
		<main id="works">
			<h1>Works</h1>
			<article>
				<h2>Cosmic Dust</h2>

				<div id="book_presentation">
					<img src={Book_Cover} alt="Book cover Cosmic Dust" id="book_cover" />

					<div>
						<p id="book_info_main"><strong>Title:</strong> Cosmic Dust<br />
						<strong>Author:</strong> Lycoris Radiata<br />
						<strong>Type:</strong> Standalone novel<br />
						<strong>Genre:</strong> Science fiction</p>

						<p id="book_info_date"><strong>Release date:</strong> Work In Progress</p>

						<p id="book_info_summary_title"><strong>Summary:</strong></p>
						<p id="book_catch_phrase"><em>Is Zekharia's urge to create the proof of his sickness, or is he one of the few who function properly?</em></p>
						<div id="book_summary">
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
						</div>
					</div>
				</div>

				<h3>Reviews</h3>
				<p>The Booknode and Goodreads pages for <em>Cosmic Dust</em> will be available at publication.</p>
			</article>

			<aside>
				<h3>The different formats</h3>

				{/* 
					AZW (Kindle)
					ePub (All e-readers but Kindle)
					PDF (Computers, smartphones and tablets)
				*/}

				<ul id="ebook_formats">
					<a href={File_AZW} download="Test AZW"><li>{icon_download} AZW</li></a>
   					<a href={File_ePub} download="Test ePub"><li>{icon_download} ePub</li></a>
   					<a href={File_PDF} download="Test PDF"><li>{icon_download} PDF</li></a>
   					<a href={File_Zip} download="Test All"><li>{icon_download} All</li></a>
	   			</ul>

				<h3>The how-to of picking a format</h3>
				<div>
					<EbookFormatPicker />
				</div>
			</aside>
		</main>
	);
};

export default Works;

