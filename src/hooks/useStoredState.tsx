import { useEffect, useState } from "react";

function useStoredState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {

    const [value, setValue] = useState<T>(() => {
        const rkey = `projectcalculator-storedstate-${key}`;
        const storedValue = localStorage.getItem(rkey);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    });

    useEffect(() => {
        const rkey = `projectcalculator-storedstate-${key}`;
        localStorage.setItem(rkey, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];

}

export default useStoredState;