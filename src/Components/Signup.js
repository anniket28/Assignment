import React,{useState} from 'react'
import Swal from 'sweetalert2'
import {Link,useHistory} from 'react-router-dom'

function Signup(props) {
    let history=useHistory()
    const host="http://localhost:4000"

    const loginClick=()=>{
        props.setprogress(50)
        props.setprogress(100)
    }

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')

    const handleChange1=(event)=>{
        setname(event.target.value)
    }
    const handleChange2=(event)=>{
        setemail(event.target.value)
    }
    const handleChange3=(event)=>{
        setpassword(event.target.value)
    }
    const handleChange4=(event)=>{
        setcpassword(event.target.value)
    }

    // User Signup
    const userSignup=async(event)=>{
        event.preventDefault()
        const signupResponse=await fetch(`${host}/api/auth/signup`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name,email,password})
        })
        const json=await signupResponse.json()
        console.log(json)
        if(json.exists){
            Swal.fire({
                title: 'Error',
                text: 'User account with this email already exists',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        else{
            Swal.fire({
                title: 'Success',
                text: 'Account Created Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            setname('')
            setemail('')
            setpassword('')
            setcpassword('')
            history.push('/')
        }
    }
    return (
    //   Signup
    <div className='d-flex justify-content-center signup'>
        {/* Signup Form */}
        <div className='my-auto mx-3 signupdiv' style={{width:'26%'}}>
            <div className='bg-light p-5 rounded shadow' style={{border:"1px solid lightgray"}}>
                <h1 className='text-center'>Signup</h1>
                <form onSubmit={userSignup} className='mt-4'>
                    <div className='mb-3'>
                        <input onChange={handleChange1} style={{fontSize:'18px'}} className='w-100 px-2 py-1' type="text" name="name" id="nam" placeholder='Enter your name here'/>
                    </div>
                    <div className='mb-3'>
                        <input onChange={handleChange2} style={{fontSize:'18px'}} className='w-100 px-2 py-1' type="email" name="email" id="mail" placeholder='Enter your email here'/>
                    </div>
                    <div className='mb-3'>
                        <input onChange={handleChange3} style={{fontSize:'18px'}} className='w-100 px-2 py-1' type="password" name="password" id="pass" placeholder='Enter your password here'/>
                    </div>
                    <div className='mb-3'>
                        <input onChange={handleChange4} style={{fontSize:'18px'}} className='w-100 px-2 py-1' type="password" name="cpassword" id="cpass" placeholder='Re Enter your password here'/>
                    </div>
                    <button disabled={name.length<2 || email.length<6 || password.length<8 || cpassword!==password} style={{fontSize:'18px'}} className='btn btn-info w-100 mt-1' type="submit">Signup</button>
                </form>
            </div>
            <div className='bg-light p-3 text-center rounded shadow my-2 loginClickDiv' style={{border:"1px solid lightgray"}}>
                Already have an account? <Link onClick={loginClick} className='text-dark text-center w-100 mt-3 text-decoration-none loginlink' to={'/'}>Login</Link>
            </div>
        </div>
    </div>
  )
}

export default Signup