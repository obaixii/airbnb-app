import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios"

function FormPage() {
    const { pathname } = useLocation();

    const { handleChange, handleBlur, handleSubmit, handleReset, errors, values, touched,setSubmitting } = useFormik({

        initialValues: {
            email: "",
            password: "",
            ...(pathname === "/register" && { name: "" })
        },
        validationSchema: Yup.object({
            ...(pathname === "/register" && {
                name: Yup.string().min(3, "Please Enter A Valid Name").required("Name is required")
            }),
            email: Yup.string().email().required("Email is required"),
            password: Yup.string().min(3, "Please Enter A Valid Password").required("Password is required")
        }),
        onSubmit: async (values) => {
            setSubmitting(false)
            if (pathname === "/login") {
                let { email, password } = values
                await axios.post('/login', {
                    email,
                    password
                });
                console.log(values);
            }
            if (pathname === "/register") {
                let { name, email, password } = values
                await axios.post('/register', {
                    name,
                    email,
                    password
                });
                console.log(values);

            }
            setSubmitting(true)
        }
    });

    return (
        <div className='mt-4 grow flex justify-center items-center'>
            <div className='mb-32'>
                <h1 className='text-4xl text-center mb-4'>{pathname === "/login" ? "Login" : "Register"}</h1>
                <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
                    {
                        pathname === "/register" ?
                            <>
                                <input className='relative' type="text" onChange={handleChange} value={values.name} onBlur={handleBlur} placeholder='Obaid Awan' name="name" id="name" />
                                <span className='inline-block w-full text-red-500 text-xs m-0 py-0 pl-1'>
                                    {touched.name && errors.name ? errors.name : null}
                                </span>
                            </>

                            : null
                    }
                    <input className='relative' type="email" onChange={handleChange} value={values.email} onBlur={handleBlur} placeholder='obaidawan567@gmail.com' name="email" id="email" />
                    <span className='inline-block w-full text-red-500 text-xs m-0 py-0 pl-1'>
                        {touched.email && errors.email ? errors.email : ""}
                    </span>
                    <input className='relative' type="password" onChange={handleChange} value={values.password} onBlur={handleBlur} placeholder='********' name="password" id="password" />
                    <span className='inline-block w-full text-red-500 text-xs m-0 py-0 pl-1'>
                        {touched.password && errors.password ? errors.password : null}
                    </span>
                    <button type="submit" className='primary'>{pathname === "/login" ? "Login" : "Become a Member"}</button>
                </form>
                {
                    pathname === "/login" ?
                        <div className='mt-4 py-2 text-gray-500'>
                            <span>Don't have an Account?&nbsp;<Link to="/register" className='underline text-primary font-medium'>Register Now</Link></span>
                        </div> : null
                }
                {
                    pathname === "/register" ?
                        <div className='mt-4 py-2 text-gray-500'>
                            <span>Already have an Account?&nbsp;<Link to="/login" className='underline text-primary font-medium'>Login Now</Link></span>
                        </div> : null
                }

            </div>
        </div>
    )
}

export default FormPage
