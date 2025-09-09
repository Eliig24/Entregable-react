const SuscripcionPage = () => {
    
    return (
        <div>
            <h1 className="text-4xl font-bold text-red-600 text-center p-4 m-4">Suscribirse</h1>
            <form onSubmit={(e) => e.preventDefault()} className='space-y-6 px-100'>
            <div className='bg-red-100 p-4 rounded-2xl'>
                <label htmlFor='username' className='block text-sm font-medium text-red-600'>
                    Nombre
                </label>
                <input 
                type="text"
                id='username'
                name='username'
                defaultValue="Eliana Gonzalez"
                className='mt-1 block w-full bg-white border border-red-300 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                />
                <label htmlFor='email' className='block text-sm font-medium text-red-600 py-1'>
                    Correo electrónico
                </label>
                <input 
                type="email"
                id='email'
                name='email'
                defaultValue="eli-g@example.com"
                className='mt-1 block w-full bg-white border border-red-300 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                />

                <div className='p-4 px-37'>
                    <button
                    type="submit"
                    className='inline-flex justify-center py-2 px-4 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700'
                    >
                        Enviar
                    </button>
                </div>
            </div>
            </form>
        </div>
    )
}

export default SuscripcionPage