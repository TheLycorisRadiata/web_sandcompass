import { useContext } from 'react';
import { AppContext } from '../../App';
import { book_cover_cosmic_dust, placeholder } from '../functions/lang';
import eng_book_cover from '../images/works/cosmic_dust/cover_eng.png';
import fr_book_cover from '../images/works/cosmic_dust/cover_fr.png';
import jp_book_cover from '../images/works/cosmic_dust/cover_jp.png';
import placeholder_cover from '../images/works/placeholder.png';

const DisplayCover = (props) => 
{
    const ct = useContext(AppContext);

    const book_cover = props.lang === 1 ? fr_book_cover : props.lang === 2 ? jp_book_cover : eng_book_cover;

    return (
        <div className="work_cover">
            {props.work === 'cosmic_dust' ?
                <img src={book_cover} alt={book_cover_cosmic_dust(ct.lang)} />
            :
                <img src={placeholder_cover} alt={placeholder(ct.lang)} />}
        </div>
    );
};

export default DisplayCover;

