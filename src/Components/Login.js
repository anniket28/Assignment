import React,{useState} from 'react'
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'

function Login(props) {

    const host="http://localhost:4000"

    const signupClick=()=>{
        props.setprogress(50)
        props.setprogress(100)
    }

    const [email, setemail] = useState('')
    const changeHandle1=(event)=>{
        setemail(event.target.value)
    }

    const [password, setpassword] = useState('')
    const changeHandle2=(event)=>{
        setpassword(event.target.value)
    }

    const userLogin=async(event)=>{
        event.preventDefault()
        const loginResponse=await fetch(`${host}/api/auth/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
        })
        const loginjson=await loginResponse.json()
        if(!loginjson.account){
            Swal.fire({
                title: 'Error',
                text: 'User Account with this email does not exists',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        else if(!loginjson.success && loginjson.account){
            Swal.fire({
                title: 'Error',
                text: 'Invalid Password',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        else if(loginjson.success && loginjson.account){
            Swal.fire({
                title: 'Success',
                text: 'Login Successful.',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        }
    }

  return (
    //   Login
    <div className='d-flex justify-content-center login'>
        {/* Login Form */}
        <div className='my-auto mx-3 logindiv' style={{width:'26%'}}>
            <div className='bg-light p-5 rounded shadow' style={{border:"1px solid lightgray"}}>
                <h1 className='text-center'>Login</h1>
                <form onSubmit={userLogin} className='mt-4'>
                    <div className='mb-3'>
                        <input onChange={changeHandle1} value={email} style={{fontSize:'18px'}} className='w-100 px-2 py-1' type="email" name="email" id="mail" placeholder='Enter your email here'/>
                    </div>
                    <div className='mb-3'>
                        <input onChange={changeHandle2} value={password} style={{fontSize:'18px'}} className='w-100 px-2 py-1' type="password" name="password" id="pass" placeholder='Enter your password here'/>
                    </div>
                    <button style={{fontSize:'18px'}} className='btn btn-info w-100 mt-1' type="submit">Login</button>
                </form>
            </div>
            <div className='bg-light p-3 text-center rounded shadow my-2 signupClickDiv' style={{border:"1px solid lightgray"}}>
                Don't have an account? <Link onClick={signupClick} className='text-dark text-center w-100 mt-3 text-decoration-none signuplink' to={'/signup'}>Signup</Link>
            </div>
        </div>
    </div>
  )
}

export default Login