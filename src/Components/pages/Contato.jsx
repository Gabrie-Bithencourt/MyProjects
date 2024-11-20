import styles from './Contato.module.css' 

function Contato(){
    return (
        <div className={styles.contato_container}>
            <span><p>Desenvolvido por: </p> gabrieloficial1567@gmail.com</span>
            <span><p>Github: </p> <a href="https://github.com/Gabrie-Bithencourt" target="_blank">https://github.com/Gabrie-Bithencourt</a></span>
        </div>
    )
}

export default Contato