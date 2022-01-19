import eng_book_cover from '../images/works/cosmic_dust/cover_eng.png';
import fr_book_cover from '../images/works/cosmic_dust/cover_fr.png';
import jp_book_cover from '../images/works/cosmic_dust/cover_jp.png';

const DisplayCover = (props) => 
{
    const book_cover = props.lang === 1 ? fr_book_cover : props.lang === 2 ? jp_book_cover : eng_book_cover;
    const alt = props.lang === 1 ? 'Première de couverture de "Une Poussière du cosmos"' : props.lang === 2 ? '「宇宙塵」の書皮' : 'Book cover of "Cosmic Dust"';

    return (
        <img src={book_cover} alt={alt} id="book_cover" />
    );
};

export default DisplayCover;

