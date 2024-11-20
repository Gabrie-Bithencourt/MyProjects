import { useLocation } from "react-router-dom"
import Message from "../Layout/Message"
import Container from "../Layout/Container"
import Loading from "../Layout/Loading"
import styles from './Projects.module.css'
import LinkButton from "../Layout/LinkButton"
import ProjectCart from "../Project/ProjectCard"
import { useState, useEffect } from "react"

function Projects(){
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState("")

    const location = useLocation()
    let message = ''

    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => (
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((result) => result.json())
            .then((data) => {
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((error) => console.log(error))
        ), 300)
    }, [])


    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((result) => result.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage("Projeto Removido com sucesso")
        })
        .catch((error) => console.log(error))
    }


    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h2>Meus Projetos</h2>
                <LinkButton to="/novos/projetos" text={"Criar Projeto"}/>
            </div>
            {message && <Message msg={message} type="success"/>}
            {projectMessage && <Message msg={projectMessage} type="success"/>}
            <Container customClass="start">
                {projects.length > 0 && projects.map((project) => (
                    <ProjectCart
                    id={project.id}
                    name={project.name}
                    price={project.price}
                    category={project.category ? project.category.nome : ''}
                    key={project.id}
                    handleRemove={removeProject}
                    />
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Ainda não há projetos cadastrados</p>
                )}
            </Container>
        </div>
    )
}

export default Projects