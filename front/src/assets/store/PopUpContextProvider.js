import { useReducer } from 'react';
import { initial_state, reducer } from './PopUpReducer';
import PopUpContext from './PopUpContext';

export const PopUpContextProvider = ({ children }) => 
{
    const [state, dispatch] = useReducer(reducer, initial_state);

    return (
        <PopUpContext.Provider value={[state, dispatch]}>
            {children}
        </PopUpContext.Provider>
    );
};

