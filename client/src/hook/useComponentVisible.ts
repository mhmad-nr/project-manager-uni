import { useState, useEffect, useRef } from 'react';

export const useComponentVisible = (initialIsVisible: boolean) => {
    const [isComponentVisible, setIsComponentVisible] = useState<boolean>(initialIsVisible);
    const ref = useRef<HTMLElement>(null);
    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event)) {
            setIsComponentVisible(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);
    return { ref, isComponentVisible, setIsComponentVisible };
}