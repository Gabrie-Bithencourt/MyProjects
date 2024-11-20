import { Link } from 'react-router-dom'
import styles from './ProjectCart.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function ProjectCart({ id, name, price, category, handleRemove }){

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.project_cart}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R$ {price}
            </p>
            { category && (
                <p className={styles.category_text}>
                    <span className={`${styles[category.toLowerCase()]}`}></span> {category}
                </p>
            )}
            <div className={styles.project_cart_actions}>
                <Link to={`/projeto/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default ProjectCart