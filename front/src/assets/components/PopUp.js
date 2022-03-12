import { yes, no } from '../functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

const icon_close = <FontAwesomeIcon icon={faSquareXmark} />;

const PopUp = (props) => 
{
    const confirm_no = () => 
    {
        props.set_pop_up({ ...props.pop_up, confirm: false });
        props.set_is_pop_up_open(false);
    };

    const confirm_yes = () => 
    {
        props.set_pop_up({ ...props.pop_up, confirm: true });
        props.set_is_pop_up_open(false);
    };

    return (
        <div id="pop_up">
            <div id="close_and_text">
                <div id="btn_close" onClick={confirm_no}>{icon_close}</div>
                <div id="text">{props.pop_up.text}</div>
            </div>

            {props.pop_up.type === 'confirm' && 
            <div id="confirm_buttons">
                <div id="yes" onClick={confirm_yes}>{yes(props.lang)}</div>
                <div id="no" onClick={confirm_no}>{no(props.lang)}</div>
            </div>}
        </div>
    );
};

export default PopUp;

