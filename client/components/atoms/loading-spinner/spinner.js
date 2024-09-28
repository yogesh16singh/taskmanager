import CircularProgress from '@mui/material/CircularProgress';
import styles from "./spinner.module.css"
import { useEffect } from 'react';

export default function Loading({
    isVisible = true
}){
    useEffect(() => {
        if (isVisible) {
          document.body.style.overflow = "hidden"; // Disable scrolling
        } else {
          document.body.style.overflow = ""; // Re-enable scrolling
        }
    
        return () => {
          document.body.style.overflow = ""; // Ensure scrolling is enabled again
        };
      }, [isVisible]);
    
    if(!isVisible) return null
    return (
        <div className={styles.overlay}>
            <div className={styles.spinner}>
                <CircularProgress />
            </div>
        </div>
    )
}