import { useState } from 'react';
// import ErrorPage from '../components/error/ErrorPage.jsx';


export default function useCatchError(defaultValue) {
    const [state, setState] = useState(defaultValue);

    const setError = (error) => {
        setState(error);

    };


    return [
        state,
        setError,
    ];
}
