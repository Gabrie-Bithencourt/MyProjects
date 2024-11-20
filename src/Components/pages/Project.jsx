import {parse, v4 as uuidv4} from 'uuid'
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loading from '../Layout/Loading'
import Container from '../Layout/Container'
import ProjectForm from '../Project/ProjectForm'
import Message from '../Layout/Message'
import ServiceForm from '../Services/ServiceForm'
import ServiceCard from '../Services/ServiceCard'

function Project(){
    const { id } =  useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [messageType, setMessageType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((result) => result.json())
            .then((data) => {
                setProject(data)
            })
            .catch((error) => console.log(error))
        }, 300)
    }, id)
  
    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function removeService(id, cost){
        setMessage("")
        const serviceUpdate = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdate = project
        projectUpdate.services = serviceUpdate
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdate.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdate)
        })
        .then((response) => response.json())
        .then((data) => {
            setProject(data)
            setMessage("Serviço removido com sucesso")
            setMessageType("success")
        })
        .catch((error) => console.log(error))
    }

    function createService(){
        setMessage("")
        // Last Service //
        const lastService = project.services[project.services.length -1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        // Maxmum value validation //
        if(newCost > parseFloat(project.price)){
            setMessage("Orçamento ultrapassado, verifique o valor do serviço")
            setMessageType("error")
            project.services.pop()
            return false
        }

        // add service cost to total cost //
        project.cost = newCost

        // Aqui entra o update no project //
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((response) => response.json())
        .then((data) => {
            setProject(data)
            setShowServiceForm(false)
            setMessage("Serviço cadastrado com sucesso")
            setMessageType("success")

        })
        .catch((error) => console.log(error))
    }

    function editPost(project){
        setMessage("")

        if(project.price < project.cost){
            // validação de custos //
            setMessage("Orçamento não pode ser menor que o custo do projeto!")
            setMessageType("error")
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((response) => response.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage("Projeto atualizado com sucesso")
            setMessageType("success")
        })
        .catch((error) => console.log(error))

    }


    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={messageType} msg={message}/>}

                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ?  "Editar Projeto" : "Fechar"}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.nome}
                                    </p>
                                    <p>
                                        <span>Total de orçamento:</span> R$ {project.price}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R$ {project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Concluir edição"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um Serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ?  "Adicionar serviço" : "Fechar"}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm 
                                        handleSubmit={createService}
                                        btnText="Adicionar Serviço"
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {project.services.length > 0 && project.services.map((service) => (
                                <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />
                            ))}
                            {project.services.length === 0 && <p>Não há serviços cadastrados.</p>}
                        </Container>
                    </Container>
                </div>
            )
             : ( <Loading /> )}
        </>
    )
}

export default Project