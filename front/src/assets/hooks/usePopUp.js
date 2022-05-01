import { useContext } from 'react';
import PopUpContext from '../store/PopUpContext';
import { HIDE_CONFIRM, SHOW_CONFIRM } from '../store/PopUpReducer';

let resolve_callback;

const usePopUp = () => 
{
    const [popup_state, dispatch] = useContext(PopUpContext);

    const on_confirm = (prompt_input) => 
    {
        close_popup();
        /*
            If the input exists then the pop-up is a prompt, so return the input, 
            otherwise return a boolean.
        */
        resolve_callback(prompt_input ?? true);
    };

    const on_cancel = () => 
    {
        close_popup();
        resolve_callback(false);
    };

    const popup = (type, lang, text, prompt_placeholder, prompt_default_value) => 
    {
        dispatch({ type: SHOW_CONFIRM, payload: { type, lang, text, prompt_placeholder, prompt_default_value } });
        return new Promise((res, rej) => { resolve_callback = res; });
    };

    const close_popup = () => dispatch({ type: HIDE_CONFIRM });

    return { popup, on_confirm, on_cancel, popup_state };
};

export default usePopUp;

