import styles from './SubmitButton.module.css' 

function SubimitButton({ text }){
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default SubimitButton