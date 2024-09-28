'use client'
import { useSyncExternalStore } from 'react';
export default function useScreen(){
    const subscribe = (callback) => {
        window.addEventListener('resize', callback);
        return () => window.removeEventListener('resize', callback);  // Cleanup the listener on unmount
    };
    const getSnapshot = () => {
        return window.innerWidth < 768;  // Returns true if screen width is less than 768px (mobile)
    };
    const getServerSnapshot = () => false;
    const isMobile = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    return isMobile
}