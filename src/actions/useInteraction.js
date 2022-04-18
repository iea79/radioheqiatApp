import { useEffect, useState } from 'react';

const events = ['mouseenter', 'touchstart'];

export default function useInteraction() {
    const [ready, setReady] = useState(false);

    const listener = () => {
        console.log('listener');
        if (ready === false) {
            setReady(true);
        }
    };

    useEffect(() => {
        events.forEach((event) => {
            document.addEventListener(event, listener);
        });

        return () => {
            events.forEach((event) => {
                document.removeEventListener(event, listener);
            });
        };
    }, []);

    return ready;
}
