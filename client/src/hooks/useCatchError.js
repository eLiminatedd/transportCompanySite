import { useState } from 'react';


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
