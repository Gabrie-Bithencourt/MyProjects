import { Link } from 'react-router-dom'
import Container from './Container'
import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png'

function Navbar(){
    return (
        <div className={styles.navbar}>
            <nav>
                <Container>
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                    </Link>
                    <ul className={styles.list}>
                        <li className={styles.item}><Link to="/">Home</Link></li>
                        <li className={styles.item}><Link to="/meus/projetos">Meus Projetos</Link></li>
                        <li className={styles.item}><Link to="/contato">Contato</Link></li>
                        <li className={styles.item}><Link to="/sobre">Sobre</Link></li>
                        <li className={styles.item}><Link to="/novos/projetos">Novos Projetos</Link></li>                
                    </ul>
                </Container>
            </nav>
        </div>
    )
}

export default Navbar