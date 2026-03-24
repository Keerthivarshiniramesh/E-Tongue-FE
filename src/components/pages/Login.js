import React, { useState, useContext } from 'react'
import { DContext } from '../../context/Datacontext'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'

const Login = () => {

    const { handleLogout, BeURL } = useContext(DContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const HandleLogin = async (e) => {

        e.preventDefault()
        setError('')

        if (email !== "" && password !== "") {
            setLoading(true)

            fetch(`${BeURL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email, password
                })
            })
                .then(res => res.json())
                .then(data => {
                    setLoading(false)
                    if (data.success) {
                        setEmail('')
                        setPassword('')
                        window.location.href = "/"
                    } else {
                        setError(data.message || "Login failed. Please try again.")
                    }
                })
                .catch(err => {
                    setLoading(false)
                    setError('Connection error. Please try again later.')
                    console.log('Error in Login:', err)
                })
        }
        else {
            setError("All fields are required!")
        }

    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 flex items-center justify-center px-4 py-12'>
            {/* Animated background elements */}
            <div className='fixed inset-0 overflow-hidden pointer-events-none'>
                <div className='absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
                <div className='absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000'></div>
            </div>

            <div className='relative z-10 w-full max-w-md'>

                {/* Top Section - Welcome */}
                <div className='text-center mb-8 animate-fade-in'>
                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold text-2xl mb-4 shadow-lg'>
                        ET
                    </div>
                    <h1 className='text-4xl font-bold text-white mb-2'>Welcome Back</h1>
                    <p className='text-gray-300'>Sign in to access your E-Tongue dashboard</p>
                </div>

                {/* Login Card */}
                <div className='backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 mb-6'>

                    {/* Error Message */}
                    {error && (
                        <div className='mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 flex items-start gap-3'>
                            <div className='text-red-400 mt-0.5'>⚠️</div>
                            <p className='text-red-200 text-sm font-medium'>{error}</p>
                        </div>
                    )}

                    <form onSubmit={HandleLogin} className='space-y-5'>

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
                                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    id="InputEmail"
                                    placeholder="you@example.com"
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
                                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                        </div>

                        {/* Login Button */}
                        <button
                            disabled={loading}
                            type='submit'
                            className='w-full mt-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl'
                        >
                            {loading ? (
                                <>
                                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
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

                    {/* Register Link */}
                    <p className='text-center text-gray-300'>
                        Don't have an account?{' '}
                        <a
                            href='/register'
                            className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold hover:underline transition'
                        >
                            Create one
                        </a>
                    </p>

                </div>

                {/* Footer */}
                <p className='text-center text-gray-400 text-xs'>
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </p>

            </div>
        </div>
    )
}

export default Login