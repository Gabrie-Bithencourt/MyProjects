import { useEffect, useState } from 'react'

import styles from './ProjectForm.module.css'
import Input from '../Form/Input'
import Select from '../Form/Select'
import SubimitButton from '../Form/SubmitButton'

function ProjectForm({ handleSubmit, btnText, projectData }){

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        // Isto é uma Promises / - Sem o useEffect seria feito diversas requisições /
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((result) => result.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((error) => { console.log(error) })
        // O segundo parâmetro do useEffect [] vazio significa que vai ser executado apenas no inicio do componente
        // Se tive uma variavel ali o método rodaria sempre que houvesse alteração no estado da variavel //
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({ ...project, [e.target.name]: e.target.value})
    }

    function handleCategory(e){
        setProject({ ...project, category: {
            id: e.target.value ? e.target.value : 0,
            nome: e.target.options[e.target.selectedIndex] ? e.target.options[e.target.selectedIndex].text : "Sem Categoria"
        }})
    }


    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />

            <Input
                type="number"
                text="Insira o orçamento total"
                name="price"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.price ? project.price : ''}
            />

            <Select
                text="Defina uma categoria"
                name="category_id"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />

            <SubimitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm