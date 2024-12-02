import React, { useState } from 'react';
import circle from "./../../assets/Image/circle3.svg";
import circle2 from "./../../assets/Image/circle4.svg";
import logo from "./../../assets/Image/logo2.svg";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const blueVariants = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
};

const whiteVariants = {
  initial: { y: '-100%' },
  animate: { y: 0 },
  exit: { y: '-100%' },
};

function Loginpeserta() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      try {
        // Ganti URL endpoint ke URL login yang benar
        const response = await fetch('https://campushub.web.id/api/login', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Login successful:', data);

          
          if (data.token) {
            localStorage.setItem('token', data.token);
          }

          
          navigate('/Homepage');
        } else {
          console.error('Login failed:', response.status);
          alert('Login gagal, periksa kembali email atau password Anda.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat login.');
      }
    }
  };

  return (
    <motion.div
      className="flex h-screen relative"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-5/12 sm:w-1/2 flex flex-col justify-center items-center mb-32 text-balance bg-white sm:px-1"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={whiteVariants}
        transition={{ duration: 0.5 }}
      >
        <div className='tengah:mb-12 tengah:mt-5 sm:mb-5  w-full sm:max-w-[282px] lg:max-w-[420px] max-w-[250px]'>
          <h1 className="font-semibold tengah:text-[48px] sm:text-[40px] text-[#003266]">Selamat Datang!</h1>
          <p className="text-[#003266] font-normal text-[24px] mb-8">
            Tidak punya akun?
            <a href="/Signinpeserta" className="text-[#027FFF] hover:underline ml-1">
              Daftar
            </a>
          </p>
        </div>

        <form
          className='w-full flex flex-col max-w-[250px] lg:max-w-[420px] sm:max-w-[282px] items-center'
          onSubmit={handleLogin}
        >
          <div className="mb-6 w-full max-w-[420px]">
            <label htmlFor="email" className="block mb-2 text-[20px] font-medium text-[#003266]">
              Alamat email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className=" w-full flex justify-center h-[59px] px-4 py-2 border-2 border-[#003266] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="breece@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6 relative w-full max-w-[420px]">
            <label htmlFor="password" className="block mb-2 text-[20px] font-medium text-[#003266]">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className=" w-full h-[59px] px-4 py-2 border-2 border-[#003266] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="breece123#"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 top-7 text-[50px] flex items-center cursor-pointer text-[#003266]"
            >
              👁
            </span>
          </div>

          <div className="flex items-center justify-between w-full mb-6 max-w-[420px]">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="w-4 h-4 text-[#003266] border-[#003266] rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-[#003266]">
                Ingat saya
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-[#003266] hover:underline">
                Lupa password?
              </a>
            </div>
          </div>

          <div className='w-full max-w-[420px]'>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full px-[24px] py-[16px] text-[20px] font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isFormValid
                  ? 'bg-[#003266] hover:bg-[#002855] focus:ring-[#003266]'
                  : 'bg-[#A2A2A2] cursor-not-allowed'
              }`}
            >
              Masuk
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        className="w-7/12 sm:w-1/2 bg-[#003266] flex items-center justify-center"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={blueVariants}
        transition={{ duration: 0.5 }}
      >
        <img src={circle2} alt="" className="max-w-[284px] max-h-[284px] absolute top-0 right-0 sm:hidden tengah:block" />
        <img src={logo} alt="" />
      </motion.div>
    </motion.div>
  );
}

export default Loginpeserta;
