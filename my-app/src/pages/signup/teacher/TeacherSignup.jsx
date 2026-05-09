import { Link } from 'react-router'
import { useNavigate } from 'react-router';
import { useRef, useState } from 'react'
export function TeacherSignup() {
    let navigate = useNavigate();
    let fName = useRef(null);
    let lName = useRef(null);
    let uEmail = useRef(null);
    let uSubject = useRef(null);
    let pass = useRef(null);
    const [serverError, setServerError] = useState("");

    async function onSubmit(e) {
        e.preventDefault();
        if (fName.current.value && lName.current.value && uEmail.current.value && pass.current.value && uSubject.current.value) {
            let response = await fetch("http://localhost:5000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    first_name: fName.current.value,
                    last_name: lName.current.value,
                    subject: uSubject.current.value,
                    email: uEmail.current.value,
                    password: pass.current.value,
                    role:"teacher"

                })
            })
            let data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token)
                navigate("/login")

            } else {
                setServerError(data.error[0])
            }

        }
    }
    return (
        <section className="px-8 md:px-6 max-w-7xl mx-auto bg-[#121212] py-10">
            <div className="flex items-center justify-center flex-col h-[90vh]">
                <title>signup</title>
                <div className="bg-white p-[1.5em] rounded-[10px] w-full max-w-md">
                    <div className='flex items-center justify-between mb-6'>
                        <h1 className='text-[1.5rem] font-semibold'>Signup</h1>
                        <Link to="/signin" className='text-[rgb(62,62,240)] hover:underline hover:underline-offset-2'>I have an account</Link>
                    </div>

                    <form onSubmit={onSubmit} className='space-y-3'>
                        <div className='flex items-center mt-2'>
                            <input
                                placeholder='First name'
                                required
                                type="text"
                                name="firstName"
                                autoComplete='off'
                                ref={fName}
                                className='p-[8px] border border-[#6d758d] outline-none bg-transparent rounded-sm text-[#111] grow'
                            />

                        </div>

                        <div className='flex items-center'>
                            <input
                                placeholder='Last name'
                                required
                                type="text"
                                name="lastName"
                                autoComplete='off'
                                ref={lName}
                                className='p-[8px] border border-[#6d758d] outline-none bg-transparent rounded-sm text-[#111] grow' />
                        </div>

                        <div className='flex items-center'>
                            <input
                                placeholder='subject'
                                required
                                type="text"
                                name="subject"
                                autoComplete='off'
                                ref={uSubject}
                                className='p-[8px] border border-[#6d758d] outline-none bg-transparent rounded-sm text-[#111] grow' />
                        </div>

                        <div className='flex items-center'>
                            <input
                                placeholder='Email'
                                required
                                type="email"
                                name="email"
                                autoComplete='off' ref={uEmail}
                                className='p-[8px] border border-[#6d758d] outline-none bg-transparent rounded-sm   text-[#111] grow' />
                        </div>

                        <div className='flex items-center'>
                            <input
                                placeholder='Password'
                                required
                                type="password"
                                name="password"
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
                                className='grow p-[10px_20px] border border-[tomato] outline-none bg-[tomato] rounded-[10px]  text-[1.2rem] text-white cursor-pointer hover:bg-[rgb(234,113,91)]'
                                type='submit'
                            >Submit</button>
                        </div>
                    </form></div >
            </div >
        </section>
    )
}