export const SHOW_CONFIRM = 'SHOW_CONFIRM';
export const HIDE_CONFIRM = 'HIDE_CONFIRM';

export const initial_state = 
{
    show: false,
    type: '',
    lang: 0,
    text: '',
    prompt_placeholder: null,
    prompt_default_value: null
};

export const reducer = (state = initial_state, action) => 
{
    switch (action.type)
    {
        case SHOW_CONFIRM:
            return {
                show: true,
                type: action.payload?.type,
                lang: action.payload?.lang,
                text: action.payload?.text,
                prompt_placeholder: action.payload?.prompt_placeholder,
                prompt_default_value: action.payload?.prompt_default_value
            };
        case HIDE_CONFIRM:
            return initial_state;
        default:
            return initial_state;
    }
};

