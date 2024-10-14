import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = (values) => {
    // Set user data in local storage
    localStorage.setItem('email', values.email);
    localStorage.setItem('password', values.password);
    localStorage.setItem('username', values.username);

    alert('Signed up successfully');
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Formik
        initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <Field name="username" type="text" placeholder="Username" className="mb-4 w-full px-3 py-2 border rounded-md focus:outline-none" />
          <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
          
          <Field name="email" type="email" placeholder="Email" className="mb-4 w-full px-3 py-2 border rounded-md focus:outline-none" />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

          <Field name="password" type="password" placeholder="Password" className="mb-4 w-full px-3 py-2 border rounded-md focus:outline-none" />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

          <Field name="confirmPassword" type="password" placeholder="Confirm Password" className="mb-4 w-full px-3 py-2 border rounded-md focus:outline-none" />
          <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
          
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none">
            Sign Up
          </button>
          <div className="mt-4 text-center">
            <a href="/login" className="text-blue-500 hover:underline">Already have an account? Login</a>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
