import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom'; // Use Link for client-side routing

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
    // Set user data in local storage only if form is valid
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
        {({ errors, touched }) => (
          <Form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

            {/* Username Field */}
            <Field
              name="username"
              type="text"
              aria-label="Username"
              placeholder="Username"
              className={`mb-4 w-full px-3 py-2 border rounded-md focus:outline-none ${errors.username && touched.username ? 'border-red-500' : ''}`}
            />
            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />

            {/* Email Field */}
            <Field
              name="email"
              type="email"
              aria-label="Email"
              placeholder="Email"
              className={`mb-4 w-full px-3 py-2 border rounded-md focus:outline-none ${errors.email && touched.email ? 'border-red-500' : ''}`}
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

            {/* Password Field */}
            <Field
              name="password"
              type="password"
              aria-label="Password"
              placeholder="Password"
              className={`mb-4 w-full px-3 py-2 border rounded-md focus:outline-none ${errors.password && touched.password ? 'border-red-500' : ''}`}
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

            {/* Confirm Password Field */}
            <Field
              name="confirmPassword"
              type="password"
              aria-label="Confirm Password"
              placeholder="Confirm Password"
              className={`mb-4 w-full px-3 py-2 border rounded-md focus:outline-none ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''}`}
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Sign Up
            </button>

            {/* Login Link */}
            <div className="mt-4 text-center">
              {/* Use Link instead of <a> for client-side navigation */}
              <span className="text-sm">Already have an account? </span>
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
