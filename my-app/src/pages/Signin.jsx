import { Link } from "react-router"
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router';
function Signin() {
    let navigate = useNavigate();
    let uName = useRef(null);
    let pass = useRef(null);
    const [serverError, setServerError] = useState("")
    async function onSubmit(e) {
        e.preventDefault();
        if (uName.current.value && pass.current.value) {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    "username": uName.current.value,
                    "password": pass.current.value
                })
            })
            const data = await response.json()
            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate("/todo")
            } else {
                setServerError(data.error)
            }
        }
    }
    return (
        <section className="px-8 md:px-6 max-w-7xl mx-auto bg-[#121212] py-10">
            <div className="flex items-center justify-center flex-col h-[90vh]">
                <title>login</title>
                <div className="bg-white p-[1.5em] rounded-[10px] w-full max-w-md">
                    <div className='flex items-center justify-between mb-6'>
                        <h1 className='text-[1.5rem] font-semibold'>Login</h1>
                        <Link to="/signup" className='text-[rgb(62,62,240)] hover:underline hover:underline-offset-2'>I dont have an account</Link>
                    </div>
                    <form onSubmit={onSubmit} className='space-y-3'>
                        <div className='flex items-center'>
                            <input
                                placeholder='Username'
                                required
                                type="text"
                                name="username"
                                id="username"
                                autoComplete='off'
                                ref={uName}
                                onChange={() => {
                                    setServerError(null)
                                }}
                                className='p-[8px] border border-[#6d758d] outline-none bg-transparent rounded-sm  text-[#111] grow' />

                        </div>

                        <div className='flex items-center'>
                            <input
                                placeholder='Password'
                                required
                                type="password"
                                name="password"
                                id="password"
                                autoComplete='off'
                                ref={pass}
                                onChange={() => {
                                    setServerError(null)
                                }}
                                className='p-[8px] border border-[#6d758d] outline-none bg-transparent rounded-sm  text-[#111] grow' />

                        </div>
                        {serverError && <span className='text-[#ed1537] text-[0.9rem] px-4 mt-1'>{serverError.msg}</span>}
                        <div className="mt-8 text-center flex items-center">
                            <button
                                className='grow p-[10px_20px] border border-[tomato] outline-none bg-[tomato] rounded-[10px] text-[1.2rem] text-white cursor-pointer hover:bg-[rgb(234,113,91)]'
                                type='submit'
                            >Submit</button>
                        </div>
                    </form></div>
            </div>
        </section>
    )
}

export { Signin }
