import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { yes, no } from '../functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

const icon_close = <FontAwesomeIcon icon={faSquareXmark} />;

const PopUp = (props) => 
{
    const confirm_no = () => props.set_pop_up({ ...props.pop_up, confirm: false, answer: true });
    const confirm_yes = () => props.set_pop_up({ ...props.pop_up, confirm: true, answer: true });

    useEffect(() => 
    {
        if (props.pop_up.answer)
            props.set_is_pop_up_open(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.pop_up.answer]);

    return ReactDOM.createPortal(
        <div id="pop_up_background">
            <div id="pop_up">
                <div id="btn_close" onClick={confirm_no}>{icon_close}</div>
                    <div id="text">{props.pop_up.text}</div>

                {props.pop_up.type === 'confirm' && 
                <div id="confirm_buttons">
                    <div id="yes" onClick={confirm_yes}>{yes(props.lang)}</div>
                    <div id="no" onClick={confirm_no}>{no(props.lang)}</div>
                </div>}
            </div>
        </div>,
        document.getElementById('portal')
    );
};

export default PopUp;

