function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Bienvenido a nuestro sitio de cursos</h1>
            <p className="text-lg text-gray-700 text-center mb-8">Aquí encontrarás una amplia selección de cursos para desarrollar tus habilidades</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-7xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src="https://picsum.photos/id/237/300/200" alt="Curso 1" className="w-full h-56 object-cover"/>
                    <div className="p-4">
                        <h2 className="text-lg font-bold text-gray-800">Curso 1</h2>
                        <p className="text-gray-700 mt-2">Descripción del curso 1.</p>
                        <a href="#" className="block mt-3 text-base font-medium text-blue-500 hover:text-blue-400">Más información</a>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src="https://picsum.photos/id/238/300/200" alt="Curso 2" className="w-full h-56 object-cover"/>
                    <div className="p-4">
                        <h2 className="text-lg font-bold text-gray-800">Curso 2</h2>
                        <p className="text-gray-700 mt-2">Descripción del curso 2.</p>
                        <a href="#" className="block mt-3 text-base font-medium text-blue-500 hover:text-blue-400">Más información</a>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src="https://picsum.photos/id/239/300/200" alt="Curso 3" className="w-full h-56 object-cover"/>
                    <div className="p-4">
                        <h2 className="text-lg font-bold text-gray-800">Curso 3</h2>
                        <p className="text-gray-700 mt-2">Descripción del curso 3.</p>
                        <a href="#" className="block mt-3 text-base font-medium text-blue-500 hover:text-blue-400">Más información</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;