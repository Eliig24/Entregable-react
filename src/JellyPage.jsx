import React, { useEffect, useState } from 'react'
import axios from "axios"

const JellyPage = () => {
  const [jellys, setJellys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJellys = async () => {
      try {
        const response = await axios.get("https://jellybellywikiapi.onrender.com/api/Beans?pagesize=200")
        console.log(typeof response.data)
        console.log("informacion de la API",response.data)
        setJellys(response.data.items)
      } catch (error) {
        console.error("Error al cargar Jellys:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJellys();
  }, [])

  if (loading) {
    return <div className='flex justify-center p-6 m-6 text-4xl'>Cargando Jelly beans...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

    return (
      <>
        <h1 className="text-4xl font-bold text-stone-400 text-center p-4 m-4">Jelly Beans</h1>
        <div className="grid grid-cols-3 p-4 m-4">
    {jellys.map((jelly) => (
      <div className='p-2 m-2 hover:translate-1 hover:border hover:border-red-400 rounded-2xl' key={jelly.beanId}>
        <h3 className='text-1xl m-1 text-center mx-4'>{jelly.groupName}</h3>
        <img className="w-full p-4" src={jelly.imageUrl} alt={jelly.name} />
        <p className='text-xs text-center p-4'>{jelly.description}</p>
        </div>
    ))}
  </div>
  </>
    )
}

export default JellyPage