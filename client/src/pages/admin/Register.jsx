import React, {useState} from 'react'
import {useFormik} from "formik";
import {initialValues, validationSchema} from "./RegisterForm.form";
import {Auth} from "../../api/index.js";
const AuthController = new Auth();


export function Register() {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (values) => {
            try {
                const response = await AuthController.register(values);
                console.log(response)
            } catch (error) {
                console.log(error)
            }

        }
    });


    return (
        <div className="min-h-screen py-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="container mx-auto">
                <div
                    className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    <div
                        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center  bg-[url('assets/comidacocinada.jpg')] brightness-70">
                        <h1 className="text-black bg-salmon text-4xl mb-3 font-bold ">Bienvenido</h1>
                        <div className="bg-salmon">
                            <p className="text-black text-center font-roboto font-bold brightness-150" > Te damos la bienvenida a Delimy el sitio web de cursos de cocina </p>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 py-16 px-12">
                        <h2 className="text-3xl text-center mb-4">Registro</h2>
                        <p className="mb-4">
                            Crea tu cuenta, es gratis y te llevará menos de un minuto.
                        </p>
                        <form action="#">
                            <div className="grid grid-cols-2 gap-5">
                                <input type="text" placeholder="Firstname"  onChange={formik.handleChange}
                                       name="firstname"
                                       id="firstname"
                                       value={formik.values.firstname}
                                       error={formik.errors.firstname} className="border border-gray-400 py-1 px-2"/>
                                    <input type="text" placeholder="Lastname" onChange={formik.handleChange}
                                           name="lastname"
                                           id="lastname"
                                           value={formik.values.lastname}
                                           error={formik.errors.lastname}
                                           className="border border-gray-400 py-1 px-2"/>
                            </div>
                            <div className="mt-5">
                                <input type="email" placeholder="Email" onChange={formik.handleChange}
                                       name="email"
                                       id="email"
                                       value={formik.values.email}
                                       error={formik.errors.email}
                                       className="border border-gray-400 py-1 px-2 w-full"/>
                            </div>
                            <div className="mt-5">
                                <input type="password" placeholder="Password"
                                       name="password"
                                       id="password"
                                       onChange={formik.handleChange}
                                       value={formik.values.password}
                                       error={formik.errors.password}
                                       className="border border-gray-400 py-1 px-2 w-full"/>
                            </div>
                            <div className="mt-5">
                                <input type="password" placeholder="Confirm Password"
                                       className="border border-gray-400 py-1 px-2 w-full"/>
                            </div>
                            <div className="mt-5">

                <span>
                 ¿Ya tienes cuenta? <a href="Login" className="text-purple-500 font-semibold">Inicia sesión</a>
                </span>
                            </div>
                            <div className="mt-5">
                                <button type="submit" loading={formik.isSubmitting.toString()} className="w-full bg-purple-500 py-3 text-center text-white ">Register Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}