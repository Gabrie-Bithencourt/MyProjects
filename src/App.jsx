import {  BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Components/pages/Home"
import Contato from "./Components/pages/Contato"
import Sobre from "./Components/pages/Sobre"
import NewProjects from "./Components/pages/NewProjects"
import Container from "./Components/Layout/Container"
import Navbar from "./Components/Layout/Navbar"
import Footer from "./Components/Layout/Footer"
import Projects from "./Components/pages/Projects"
import Project from "./Components/pages/Project"

function App(){
  return (
    <BrowserRouter>
      <Navbar />
      
      <Container customClass="min-height">
        <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/meus/projetos" element={<Projects />}>Meus Projetos</Route>
            <Route path="/contato" element={<Contato />}></Route>
            <Route path="/sobre" element={<Sobre />}></Route>
            <Route path="/novos/projetos" element={<NewProjects />}></Route>
            <Route path="/projeto/:id" element={<Project />}></Route>
        </Routes>
      </Container>

      <Footer />
    </BrowserRouter>
  )
}

export default App