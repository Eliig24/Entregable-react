import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from './Context/useTheme';

const Navigation = () => {
    const { theme, toggleTheme } = useTheme();

    return (
    <nav className='flex justify-start bg-stone-300 p-2 rounded-2xl'>
        <img src="./src/img/jellybelly.png" alt="jellybelly" className='w-12 h-12 mx-4' />
        <ul className='flex justify-end space-x-10 mx-6 my-4'>
            <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "text-white font-bold" : "text-red-600"}
                >
                    Inicio
                    </NavLink>
            </li>
            <li>
                <NavLink to="/wiki" className={({ isActive }) => isActive ? "text-white font-bold" : "text-red-600"}
                >
                    Jelly Beans
                    </NavLink>
            </li>
            <li>
                <NavLink to="/iniciarsesion" className={({ isActive }) => isActive ? "text-white font-bold" : "text-red-600"}
                >
                    Inicia Sesion
                    </NavLink>
            </li>
            <li>
                <NavLink to="/publicar" className={({ isActive }) => isActive ? "text-white font-bold" : "text-red-600"}
                >
                    Publicar
                    </NavLink>
            </li>
        </ul>
        <button onClick={toggleTheme} className="bg-red-300 rounded-2xl p-2 cursor-pointer">
            {theme === "custom-light" ? "Dark Mode" : "Light Mode"}
        </button>
    </nav>
    )
}

export default Navigation