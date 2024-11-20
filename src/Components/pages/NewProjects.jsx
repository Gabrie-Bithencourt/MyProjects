import { useNavigate } from 'react-router-dom' 
import styles from './NewProjects.module.css'
import ProjectForm from '../Project/ProjectForm'

function NewProjects(){

    const navigate = useNavigate()

    function createPost(project){
        // Inserindo projeto no db.json -> Banco temporário //
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects",{
            // Não sei exatamente como funciona em partes essa request //
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
        .then((response) => response.json())
        .then((data) => {
            return navigate("/meus/projetos", {state: {message: "Projeto cadastrado com sucesso"} })
        })
        .catch()
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm  handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProjects