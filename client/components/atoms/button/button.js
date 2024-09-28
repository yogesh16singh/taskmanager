'use client'
import styles from "./button.module.css"

export default function Button({
    text ='Proceed',
    handleClick = ()=>{},
    isPrimaryBtn = true,
    customStyle 
}){
    return(
        <button className={`${styles.mainWrapper} ${isPrimaryBtn && styles.primaryBtnBg} ${customStyle}`} onClick={()=>handleClick()}>
            {text}
        </button>
    )
}