import './App.css'
import Footer from './components/footer/Footer'
import Nav from './components/header/Nav'
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
    <Nav/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
