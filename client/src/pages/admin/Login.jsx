import React, {useState} from 'react'
import {useFormik} from "formik";
import {initialValues, validationSchema} from "./LoginForm.form.js";
import {Auth} from "../../api/index.js";
import Delimy from "./delymy.png";
import Fondo from "./comidacocinada.jpg";
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { FaSun, FaMoon } from 'react-icons/fa';
const AuthController = new Auth();
export function Login() {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (values) => {S
            try{
                const response = await AuthController.login(values);
                console.log(response)
            } catch (error) {
                console.log(error)
            }

        }


    });
//Delimy
    return (
        <section className="flex items-center justify-center min-h-screen bg-cover" style={{backgroundImage: "url('https://assets.puzzlefactory.pl/puzzle/298/268/original.webp)"}}>
            <form onSubmit={formik.handleSubmit} className={`flex rounded-2xl shadow-lg max-w-3xl p-5 items-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="w-96 p-6 rounded shadow-sm">
                    <div className="flex justify-end">
                        <button onClick={toggleTheme}>
                            {theme === 'light' ?  <FaMoon className="h-6 w-6 text-yellow-500" /> : <FaSun className="h-6 w-6 text-orange-500" /> }
                        </button>
                    </div>
                    <h1 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Iniciar sesión</h1>
                    <div className="flex items-center mb-4">
                        <img src={Delimy} className={`h-64 m-auto rounded-full ${theme === 'dark' ? 'backdrop-grayscale' : 'grayscale-0'}`}/>
                    </div>
                    <div className="relative mb-4">
                        <HiOutlineMail className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"/>
                        <input
                            className={`w-full py-2 bg-gray-50  text-${theme === 'dark' ? 'white' : 'gray-500'} px-10 outline-none ${theme === 'dark' ? 'bg-gray-800' : ''}`}
                            type="email"
                            id="email"
                            name="email"
                            required
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            error={formik.errors.email}
                            placeholder="Correo electrónico"
                        />
                    </div>
                    <div className="relative mb-6">
                        <HiOutlineLockClosed className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"/>
                        <input
                            className={`w-full py-2 bg-gray-50  text-${theme === 'dark' ? 'white' : 'gray-500'} px-10 outline-none ${theme === 'dark' ? 'bg-gray-800' : ''}`}
                            type="password"
                            name="password"
                            id="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={formik.errors.password}
                            placeholder="Contraseña"
                            required
                        />
                    </div>
                    <div className="flex items-center mb-6">
                        <span>
                 ¿No tienes cuenta? <a href="Register" className="text-purple-500 font-semibold">Registrate</a>
                </span>
                    </div>
                    <button
                        type="submit"
                        loading={formik.isSubmitting.toString()}
                        className={`${theme === 'dark' ? 'bg-salmon' : 'bg-beige'} w-full ${theme === 'dark' ? 'text-white' : 'text-gray-600'  } py-2 rounded ${theme === 'dark' ? 'hover:bg-salmon2' : 'hover:bg-beige2'} transition-colors`}
                    >
                        Iniciar sesión
                    </button>
                </div>
            </form>
        </section>
    )
}


