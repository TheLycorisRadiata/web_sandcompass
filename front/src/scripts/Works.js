import {useState} from 'react';
import '../styles/Works.css';
import Book_Cover from '../images/cosmic_dust_cover_eng.png';

const EbookFormatPicker = () =>
{
	const questions = 
	[
		'Do you have an e-reader?', 
		'Kindle or other?', 
		'Do you have a computer of yours?', 
		'Do you prefer to read on it or on a smartphone/tablet?', 
		'Are you currently on your computer?', 
		'Are you on your smartphone or tablet?'
	];
	const options = 
	[
		'Yes.', 
		'No.', 
		'What is it?', 
		'Kindle.', 
		'Other.', 
		'No, and I am on a computer that doesn\'t belong to me.', 
		'No, but I am on my smartphone or my tablet.', 
		'Computer.', 
		'Smartphone or tablet.'
	];
	const answers = 
	[
		'Download the AZW file, plug in the e-reader, and slide the file in there. You can now read anytime!', 
		'Download the ePub file, plug in the e-reader, and slide the file in there. You can now read anytime!', 
		'Come back with your smartphone or tablet, install Adobe Acrobat, download the PDF file, and open it. You can now read anytime!', 
		'Install Adobe Acrobat, download the PDF file, and open it. You can now read anytime!', 
		'Download the ePub file, and open it. You can now read anytime!', 
		'Come back with your computer, download the ePub file, and open it. You can now read anytime!', 
		'Come back with your smartphone or tablet, install Adobe Acrobat, download the PDF file, and open it. You can now read anytime!'
	];

	const [question, set_question] = useState(questions[0]);
	const [option1, set_option1] = useState(options[0]);
	const [option2, set_option2] = useState(options[1]);
	const [option3, set_option3] = useState(options[2]);
	const [user_choice, set_user_choice] = useState('');
	const [is_questionnaire_finished, set_is_questionnaire_finished] = useState(false);
	const [answer, set_answer] = useState('');

	const handle_click_redo = () => 
	{
		set_question(questions[0]);
		set_option1(options[0]);
		set_option2(options[1]);
		set_option3(options[2]);
		set_answer('');
		set_is_questionnaire_finished(false);
	};

	const handle_click_next = () => 
	{
		if (user_choice !== '')
		{
			switch (question)
			{
				case questions[0]:
					if (user_choice === option1)
					{
						set_question(questions[1]);
						set_option1(options[3]);
						set_option2(options[4]);
						set_option3('');
					}
					else
					{
						set_question(questions[2]);
						set_option1(options[0]);
						set_option2(options[5]);
						set_option3(options[6]);
					}
					set_user_choice('');
					break;
				case questions[1]:
					set_is_questionnaire_finished(true);
					user_choice === option1 ? set_answer(answers[0]) : set_answer(answers[1]);
					set_user_choice('');
					break;
				case questions[2]:
					if (user_choice === option1)
					{
						set_question(questions[3]);
						set_option1(options[7]);
						set_option2(options[8]);
						set_option3('');
					}
					else
					{
						set_is_questionnaire_finished(true);
						user_choice === option2 ? set_answer(answers[2]) : set_answer(answers[3]);
					}
					set_user_choice('');
					break;
				case questions[3]:
					if (user_choice === option1)
					{
						set_question(questions[4]);
						set_option1(options[0]);
						set_option2(options[1]);
						set_option3('');
					}
					else
					{
						set_question(questions[5]);
						set_option1(options[0]);
						set_option2(options[1]);
						set_option3('');
					}
					set_user_choice('');
					break;
				case questions[4]:
					set_is_questionnaire_finished(true);
					user_choice === option1 ? set_answer(answers[4]) : set_answer(answers[5]);
					set_user_choice('');
					break;
				case questions[5]:
					set_is_questionnaire_finished(true);
					user_choice === option1 ? set_answer(answers[3]) : set_answer(answers[6]);
					set_user_choice('');
					break;
				default:
					alert('An error occurred with the questionnaire.\nRestarting at question 1...');
					set_question(questions[0]);
					set_option1(options[0]);
					set_option2(options[1]);
					set_option3(options[2]);
					set_user_choice('');
			}
		}
	};

	return (
		<>
			{!is_questionnaire_finished && 
			<>
				<p><strong>{question}</strong></p>
				<p id="ebook_format_options">
					<input type="radio" name="option" id="option_1" value="option_1" onClick={() => set_user_choice(option1)} />
					<label htmlFor="option_1">{option1}</label><br />

					<input type="radio" name="option" id="option_2" value="option_2" onClick={() => set_user_choice(option2)} />
					<label htmlFor="option_2">{option2}</label><br />

					{option3 !== '' && 
					<>
						<input type="radio" name="option" id="option_3" value="option_3" onClick={() => set_user_choice(option3)} />
						<label htmlFor="option_3">{option3}</label>
					</>}
				</p>
				<input type="button" name="btn_next_ebook_format" id="btn_next_ebook_format" value="Next question" onClick={handle_click_next} />
			</>}
			{is_questionnaire_finished && 
			<>
				<p>{answer}</p>
				<input type="button" name="btn_redo_ebook_format" id="btn_redo_ebook_format" value="Redo" onClick={handle_click_redo} />
			</>}
		</>
	);
}

const Works = () => 
{
	return (
		<main id="works">
			<h1>Works</h1>
			<article>
				<h2>Cosmic Dust</h2>

				<div id="works_book_presentation">
					<img src={Book_Cover} alt="Book cover Cosmic Dust" id="book_cover" />

					<div>
						<p id="book_info_main"><strong>Title:</strong> Cosmic Dust<br />
						<strong>Author:</strong> Lycoris Radiata<br />
						<strong>Type:</strong> Standalone novel<br />
						<strong>Genre:</strong> Science fiction</p>

						<p id="book_info_date"><strong>Release date:</strong> Work In Progress</p>

						<p id="book_info_summary_title"><strong>Summary:</strong></p>
						<p id="book_catch_phrase"><em>Is Zekharia's urge to create the proof of his sickness, or is he one of the few who function properly?</em></p>
						<p className="book_summary_paragraph">Zekharia Bettelheim is an unpretentious citizen of the Society of Arks, a spaceship on a quest for a new planet. 
						Suffering, he tries to find an explanation to his affliction and is helped for this by the character he created. His imaginary friend helps with putting 
						his thoughts in order, but he knows that someday he will need to call on a real person.</p>
						<p className="book_summary_paragraph">A chain of circumstances leads him to contact a former classmate who, contrary to Zekharia, seems to blossom in 
						their little world and have everything going for him. This man can become the friend he needs, but first his being trustworthy has yet to be confirmed.</p>
						<p className="book_summary_paragraph">There is a real difference between a creation we know about and a human being, who always keeps their share of 
						mystery and is therefore able of betrayal. In a world elevating the useful in dogma, it is difficult to admit to anyone that art makes us going through 
						the day, even more so to a person who could as well be the Society personified. But is it this crazy to say that art is not only useful, but also 
						essential?</p>
						<p className="book_summary_paragraph">Is Zekharia's urge to create the proof of his sickness, or is he one of the few who function properly? No matter the 
						answer, two roads lie before him: twisting himself to fit in or finding the way to change mentalities.</p>
					</div>
				</div>

				<h3>Reviews</h3>
				<p>The Booknode and Goodreads pages for <em>Cosmic Dust</em> will open when the novel is available.</p>
			</article>

			<aside>
				<h3>The different formats</h3>

				{/* 
					AZW (Kindle)
					ePub (All e-readers but Kindle)
					PDF (Computers, smartphones and tablets)
				*/}

				<ul id="ebook_formats">
					<a href="../files/cosmic_dust/test.azw3" download="Test AZW"><li>AZW</li></a>
   					<a href="../files/cosmic_dust/test.epub" download="Test ePub"><li>ePub</li></a>
   					<a href="../files/cosmic_dust/test.pdf" download="Test PDF"><li>PDF</li></a>
   					<a href="../files/cosmic_dust/test.zip" download="Test All"><li>All</li></a>
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

