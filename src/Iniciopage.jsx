import React from 'react'

    

const Iniciopage = () => {
    return (
        <div className="min-h-screen flex flex-col space-y-5 items-center">
            <h1 className="text-6xl font-bold text-red-600 p-8">¡Bienvenidos!</h1>
            <p className='text-center max-w-xl text-lg p-4'>
                Explora el mundo de los Jelly Beans con nuestra completa wiki. Descubre variedades, sabores e historia de estos deliciosos dulces. ¡Sumérgete en la diversión y aprende todo sobre los Jelly Beans aquí!
            </p>
            <img src="./src/img/jelly.gif" alt="jellybeans-welcome" className='w-2/5 rounded-2x'/>
        </div>
    )
}

export default Iniciopage