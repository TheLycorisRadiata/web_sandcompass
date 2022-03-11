import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

const icon_close = <FontAwesomeIcon icon={faSquareXmark} />;

const PopUp = (props) => 
{
    return (
        <div id="pop_up">
            <div id="btn_close" onClick={props.close_pop_up}>{icon_close}</div>
            <div id="text">{props.pop_up.text}</div>
        </div>
    );
};

export default PopUp;

