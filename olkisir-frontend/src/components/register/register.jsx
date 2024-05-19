// import React from 'react';
import PropTypes from 'prop-types';

function Register({ toggleForm }) {
  return (
    <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
      <header>
        <img className="w-20 mx-auto mb-5" src="https://img.icons8.com/fluent/344/year-of-tiger.png" alt="Tiger" />
      </header>
      <form>
        <div>
          <label className="block mb-2 text-indigo-500" htmlFor="username">Username</label>
          <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="text" name="username" />
        </div>
        <div>
          <label className="block mb-2 text-indigo-500" htmlFor="email">Email</label>
          <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="email" name="email" />
        </div>
        <div>
          <label className="block mb-2 text-indigo-500" htmlFor="password">Password</label>
          <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="password" name="password" />
        </div>
        <div>
          <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit" value="Register" />
        </div>
      </form>
      <footer>
        <a className="text-indigo-700 hover:text-pink-700 text-sm float-left" href="#" onClick={toggleForm}>Already have an account? Login</a>
      </footer>
    </div>
  );
}

Register.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default Register;
