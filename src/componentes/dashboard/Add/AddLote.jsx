import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const AddLote= () => {

  const [category, setCategory] = useState([]) 
  const [employee, setEmployee] = useState({
      name: "",
      email: "",
      password: "",
      salary: 0,
      category_id: 0,
      image: ""
  })

  useEffect(()=>{
    axios.get('http://localhost:5000/auth/category')
    .then(result => {
        if(result.data.Status){
            setCategory(result.data.Result)
        }else{
            alert(result.data.Error)
        }
    }).catch(err => console.log(err))
}, [])
 const navigation = useNavigate()
  const handleSubmit = (e) =>{
      e.preventDefault()
      const formData = new FormData();
      formData.append('name', employee.name)
      formData.append('email', employee.email)
      formData.append('password', employee.password)
      formData.append('salary', employee.salary)
      formData.append('category_id', employee.category_id)
      formData.append('image', employee.image)
      console.log(employee.image)
     
      axios.post('http://localhost:5000/auth/add_employee', formData)
      .then(result => {
        if(result.data.Status){
          navigation('/dashboard/employee')
      }else{
          alert("error adding")
      }
      }).catch(err => console.log(err))
      
   
  }


  return (
  <div className='d-flex justify-content-center align-items-center mt-5 '>
    <div className='p-3 rounded w-50 border '>
        <h3 className='text-center'>Add Employee</h3>
        <form  autoComplete="off" className='row g-1' onSubmit={handleSubmit}> 
            <div className='col-12 mt-4'>
                <label for="inputName" className='form-label'>Name</label>
                <input type="text" id="inputName"  placeholder='Enter Name' 
                  className='form-control rounded-0' onChange={(e)=> setEmployee({...employee, name: e.target.value})}/>
            </div>
            <div className='col-12 mt-4'>
                <label for="inputMail4" className='form-label'>Email</label>
                <input type="text" id="inputMail4" autoComplete='off'  placeholder='Enter Email' 
                  className='form-control rounded-0'  onChange={(e)=> setEmployee({...employee, email: e.target.value})}/>
            </div>
            <div className='col-12 mt-4'>
                <label for="inputPassword04" className='forml-label'>Password</label>
                <input type="password" id="inputPassword4"  placeholder='Enter Pasworrd' 
                  className='form-control rounded-0'  onChange={(e)=> setEmployee({...employee, password: e.target.value})}/>
            </div>
            <div className='col-12 mt-4'>
                <label for="inputSalary" className='forml-label'>Salary</label>
                <input type="text"  autoComplete='off' id="inputSalary"  placeholder='Enter Salary' 
                  className='form-control rounded-0'  onChange={(e)=> setEmployee({...employee, salary: e.target.value})}/>
            </div>
            <div className='col-12 mt-4'>
                <label for="category" className='forml-label'>Category</label>
                <select name="category" id="category" className='form-select'  
                  onChange={(e)=> setEmployee({...employee, category_id: e.target.value})}>
                    {category.map(c => {
                    return (
                      <option value={c.id_category}>{c.nombre}</option>
                    )
                    })}
                </select> 
            </div>
            <div className='col-12 mt-4'>
                <label for="inputGroupFile01" className='forml-label'>Select Image</label>
                <input  accept="image/*" type="file" name="image"  id="inputGroupFile01" className='form-control rounded-0'  
                onChange={(e)=> setEmployee({...employee, image: e.target.files[0]})}/>
            </div>
            <div className='col-12 mt-2'>
            <button className='btn btn-primary w-100 mt-3' type='submit'>Add Employee</button>
            </div>
        </form>
    </div>
</div>
  )
}

export default AddLote