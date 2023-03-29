import React, {useState} from 'react'
import {useFormik} from "formik";
import {initialValues, validationSchema} from "./RegisterForm.form";
import {Auth} from "../../api/index.js";
import { FaSun, FaMoon } from 'react-icons/fa';

const AuthController = new Auth();


export function Register() {

    const [hasError, setHasError] = useState(false);


    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    function Alert(props) {
        const [show, setShow] = useState(true);

        setTimeout(() => {
            setShow(false);
        }, 2000);

        return (
            <>

                {show && (
                    <div className="alert alert-success shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6"
                                 fill="none" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span>{props.message}</span>
                        </div>
                    </div>
                )}
            </>
        );

    }


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (values) => {
            try {
                const response = await AuthController.register(values);
                console.log(response)
                setHasError('Usuario registrado correctamente');
            } catch (error) {
                console.log(error)
                setHasError('Usuario registrado correctamente');

            }

        }
    });


    return (
        <div className={`min-h-screen py-40 ${theme === 'dark' ? 'bg-gradient-to-r from-salmon to-gray-700' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}`}>
            <div  className="m-auto justify-center" style={{ position: 'fixed', top: 0, zIndex: 999 }}>
                {hasError && (
                    <Alert message={hasError} />

                )}
            </div>
            <div className="container mx-auto">

                <div
                    className={`flex flex-col lg:flex-row w-10/12 lg:w-8/12 rounded-xl mx-auto shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>

                    <div
                        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center  bg-[url('assets/comidacocinada.jpg')] brightness-70">
                        <h1 className={`text-black bg-salmon text-4xl mb-3 font-bold ${theme ==='dark' ? 'bg-salmon' : 'bg-purple-600'}`}>Bienvenido</h1>
                        <div className={`${theme === 'dark' ? 'bg-salmon' : 'bg-purple-600'}`}>
                            <p className={`text-center font-roboto font-bold brightness-150`}> Te damos la bienvenida a Delimy el sitio web de cursos de cocina </p>
                        </div>

                    </div>


                    <div className="w-full lg:w-1/2 py-16 px-12">
                        <div className="flex justify-end mb-12">
                            <button onClick={toggleTheme}>
                                {theme === 'light' ?  <FaMoon className="h-6 w-6 text-yellow-500" /> : <FaSun className="h-6 w-6 text-orange-500" /> }
                            </button>
                        </div>
                        <h2 className={`text-3xl text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Registro</h2>
                        <p className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                            Crea tu cuenta, es gratis y te llevará menos de un minuto.
                        </p>
                        <form action="#" onSubmit={formik.handleSubmit}>
                            <div className="grid grid-cols-2 gap-5">
                                <input type="text" placeholder="Firstname"  onChange={formik.handleChange}
                                       name="firstname"
                                       id="firstname"
                                       value={formik.values.firstname}
                                       error={formik.errors.firstname} className={`border ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} bg-gray-100 border-gray-400 py-1 px-2 w-full  text-${theme === 'dark' ? 'white' : 'gray-500'}`}/>
                                    <input type="text" placeholder="Lastname" onChange={formik.handleChange}
                                           name="lastname"
                                           id="lastname"
                                           value={formik.values.lastname}
                                           error={formik.errors.lastname}
                                           className={`border ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} bg-gray-100 border-gray-400 py-1 px-2 w-full  text-${theme === 'dark' ? 'white' : 'gray-500'}`}/>
                            </div>
                            <div className="mt-5">
                                <input type="email" placeholder="Email" onChange={formik.handleChange}
                                       name="email"
                                       id="email"
                                       value={formik.values.email}
                                       error={formik.errors.email}
                                       className={`border ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} bg-gray-100 border-gray-400 py-1 px-2 w-full  text-${theme === 'dark' ? 'white' : 'gray-500'}`}/>
                            </div>
                            <div className="mt-5">
                                <input type="password" placeholder="Password"
                                       name="password"
                                       id="password"
                                       onChange={formik.handleChange}
                                       value={formik.values.password}
                                       error={formik.errors.password}
                                       className={`border ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} bg-gray-100 border-gray-400 py-1 px-2 w-full  text-${theme === 'dark' ? 'white' : 'gray-500'}`}/>
                            </div>
                            <div className="mt-5">
                                <input type="password" placeholder="Confirm Password"
                                       name="repeatPassword"
                                       onChange={formik.handleChange}
                                       value={formik.values.repeatPassword}
                                       error={formik.errors.repeatPassword}
                                       className={`border ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} bg-gray-100 border-gray-400 py-1 px-2 w-full  text-${theme === 'dark' ? 'white' : 'gray-500'}`}/>
                            </div>
                            <div className="mt-5">

                <span className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                 ¿Ya tienes cuenta? <a href="Login" className={`${theme === 'dark' ? 'text-salmon' : 'text-purple-500'} font-semibold`}>Inicia sesión</a>
                </span>
                            </div>
                            <div className="mt-5">
                                <button type="submit" loading={formik.isSubmitting.toString()} className={`${theme === 'dark' ? 'bg-salmon' : 'bg-purple-600'} w-full font-bold ${theme === 'dark' ? 'text-gray-900' : 'text-white'  } py-2 rounded ${theme === 'dark' ? 'hover:bg-salmon2' : 'hover:bg-purple-900'} transition-colors`}>Registrarse
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}