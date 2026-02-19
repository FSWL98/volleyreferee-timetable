import './App.css'
import { NavLink } from "react-router";

function App() {

  return (
    <>
        <NavLink to='/universities'>
          Чемпионат ВУЗов
        </NavLink>
        <NavLink to='/city'>
            Первенство и Чемпионат Санкт-Петербурга
        </NavLink>
    </>
  )
}

export default App
