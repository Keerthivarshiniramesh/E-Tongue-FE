import React, { useState, useContext } from 'react';
import { DContext } from '../../context/Datacontext';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiCheck, FiX, FiArrowRight } from 'react-icons/fi'

const Register = () => {

    const { BeURL } = useContext(DContext)

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const passwordMatch = password && confirmPassword && password === confirmPassword;
    const passwordMismatch = password && confirmPassword && password !== confirmPassword;

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (name === "" || email === "" || contact === "" || password === "") {
            setError("All fields are required!")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!")
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters!")
            return
        }

        setLoading(true)

        fetch(`${BeURL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ fullname: name, email, contact, password }),
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                if (data.success) {
                    setSuccess("Account created successfully! Redirecting...")
                    setName('')
                    setEmail('')
                    setContact('')
                    setPassword('')
                    setConfirmPassword('')
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 2000)
                } else {
                    setError(data.message || "Registration failed. Please try again.")
                }
            })
            .catch(err => {
                setLoading(false)
                setError('Connection error. Please try again later.')
                console.log('Error in Register: ' + err)
            })
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center px-4 py-12'>
            {/* Animated background elements */}
            <div className='fixed inset-0 overflow-hidden pointer-events-none'>
                <div className='absolute top-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
                <div className='absolute bottom-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000'></div>
            </div>

            <div className='relative z-10 w-full max-w-lg'>

                {/* Top Section - Welcome */}
                <div className='text-center mb-8 animate-fade-in'>
                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-2xl mb-4 shadow-lg'>
                        ET
                    </div>
                    <h1 className='text-4xl font-bold text-white mb-2'>Create Account</h1>
                    <p className='text-gray-300'>Join E-Tongue to start monitoring water quality</p>
                </div>

                {/* Register Card */}
                <div className='backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 mb-6'>

                    {/* Error Message */}
                    {error && (
                        <div className='mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 flex items-start gap-3'>
                            <div className='text-red-400 mt-0.5'>⚠️</div>
                            <p className='text-red-200 text-sm font-medium'>{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className='mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/50 flex items-start gap-3'>
                            <div className='text-green-400 mt-0.5'>✓</div>
                            <p className='text-green-200 text-sm font-medium'>{success}</p>
                        </div>
                    )}

                    <form onSubmit={handleRegister} className='space-y-4'>

                        {/* Full Name Input */}
                        <div>
                            <label htmlFor="InputName" className="block text-sm font-semibold text-gray-200 mb-2">
                                Full Name
                            </label>
                            <div className='relative'>
                                <FiUser className='absolute left-4 top-3.5 w-5 h-5 text-gray-400' />
                                <input
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); setError('') }}
                                    required
                                    type="text"
                                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    id="InputName"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="InputEmail" className="block text-sm font-semibold text-gray-200 mb-2">
                                Email Address
                            </label>
                            <div className='relative'>
                                <FiMail className='absolute left-4 top-3.5 w-5 h-5 text-gray-400' />
                                <input
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                                    required
                                    type="email"
                                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    id="InputEmail"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Contact Input */}
                        <div>
                            <label htmlFor="InputContact" className="block text-sm font-semibold text-gray-200 mb-2">
                                Phone Number
                            </label>
                            <div className='relative'>
                                <FiPhone className='absolute left-4 top-3.5 w-5 h-5 text-gray-400' />
                                <input
                                    value={contact}
                                    onChange={(e) => { setContact(e.target.value); setError('') }}
                                    required
                                    type="tel"
                                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    id="InputContact"
                                    placeholder="+91 9876543210"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="InputPassword" className="block text-sm font-semibold text-gray-200 mb-2">
                                Password
                            </label>
                            <div className='relative'>
                                <FiLock className='absolute left-4 top-3.5 w-5 h-5 text-gray-400' />
                                <input
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError('') }}
                                    required
                                    type={showPassword ? "text" : "password"}
                                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    id="InputPassword"
                                    placeholder="••••••••"
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-4 top-3.5 text-gray-400 hover:text-gray-300'
                                >
                                    {showPassword ? <FiEyeOff className='w-5 h-5' /> : <FiEye className='w-5 h-5' />}
                                </button>
                            </div>
                            <p className='text-xs text-gray-400 mt-1.5'>Minimum 6 characters</p>
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="InputConfirmPassword" className="block text-sm font-semibold text-gray-200 mb-2">
                                Confirm Password
                            </label>
                            <div className='relative'>
                                <FiLock className='absolute left-4 top-3.5 w-5 h-5 text-gray-400' />
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value); setError('') }}
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    id="InputConfirmPassword"
                                    placeholder="••••••••"
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className='absolute right-4 top-3.5 text-gray-400 hover:text-gray-300'
                                >
                                    {showConfirmPassword ? <FiEyeOff className='w-5 h-5' /> : <FiEye className='w-5 h-5' />}
                                </button>
                            </div>
                            {password && confirmPassword && (
                                passwordMatch && (
                                    <div className='flex items-center gap-2 mt-1.5'>
                                        <FiCheck className='w-4 h-4 text-green-400' />
                                        <span className='text-xs text-green-400 font-medium'>Passwords match</span>
                                    </div>
                                ) || (
                                    <div className='flex items-center gap-2 mt-1.5'>
                                        <FiX className='w-4 h-4 text-red-400' />
                                        <span className='text-xs text-red-400 font-medium'>Passwords do not match</span>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Register Button */}
                        <button
                            disabled={loading || passwordMismatch}
                            type='submit'
                            className='w-full mt-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl'
                        >
                            {loading ? (
                                <>
                                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <FiArrowRight className='w-5 h-5' />
                                </>
                            )}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className='relative my-6'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-white/20'></div>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='px-2 bg-white/10 text-gray-400'>or</span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <p className='text-center text-gray-300'>
                        Already have an account?{' '}
                        <a
                            href='/login'
                            className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold hover:underline transition'
                        >
                            Sign in
                        </a>
                    </p>

                </div>

                {/* Footer */}
                <p className='text-center text-gray-400 text-xs'>
                    By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>

            </div>
        </div>
    )
}

export default Register