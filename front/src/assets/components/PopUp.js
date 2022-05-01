import ReactDOM from 'react-dom';
import usePopUp from '../hooks/usePopUp';
import { no, yes, cancel, confirm } from '../functions/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

const icon_close = <FontAwesomeIcon icon={faSquareXmark} />;

const PopUp = () =>
{
    const { on_confirm, on_cancel, popup_state } = usePopUp();

    const portal_element = document.getElementById('portal');

    /* Prevent scrolling when a popup is open */
    document.querySelector('body').style.position = popup_state.show ? 'fixed' : 'static';

    const handle_input = (e) => 
    {
        e.preventDefault();
        on_confirm(e.target[0].value);
    };

    const component = popup_state.show ? 
    (
        <div id="popup_background">
            <div id="popup">
                <div id="btn_close" onClick={on_cancel}>{icon_close}</div>
                <div id="text">{popup_state.text}</div>

                {popup_state.type === 'confirm' && 
                <div id="confirm_buttons">
                    <div onClick={on_cancel}>{no(popup_state.lang)}</div>
                    <div onClick={() => on_confirm(null)}>{yes(popup_state.lang)}</div>
                </div>}

                {popup_state.type === 'prompt' && 
                <form onSubmit={handle_input}>
                    <div id="div_input">
                        <input type="text" defaultValue={popup_state.prompt_default_value ?? ''} placeholder={popup_state.prompt_placeholder ?? ''} />
                    </div>
                    <div id="confirm_buttons">
                        <div onClick={on_cancel}>{cancel(popup_state.lang)}</div>
                        <button>{confirm(popup_state.lang)}</button>
                    </div>
                </form>}
            </div>
        </div>
    )
    : null;

    return ReactDOM.createPortal(component, portal_element);
};

export default PopUp;

