import { useContext } from 'react';
import { AppContext } from '../../App';
import { book_cover_cosmic_dust } from '../functions/lang';
import eng_book_cover from '../images/works/cosmic_dust/cover_eng.png';
import fr_book_cover from '../images/works/cosmic_dust/cover_fr.png';
import jp_book_cover from '../images/works/cosmic_dust/cover_jp.png';

const DisplayCover = (props) => 
{
    const ct = useContext(AppContext);

    const book_cover = props.lang === 1 ? fr_book_cover : props.lang === 2 ? jp_book_cover : eng_book_cover;

    return (
        <img src={book_cover} alt={book_cover_cosmic_dust(ct.lang)} id="book_cover" />
    );
};

export default DisplayCover;

