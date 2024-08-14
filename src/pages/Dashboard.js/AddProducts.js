import React, { useState } from 'react'
import FormRowSelect from './FormRowSelect';
import FormRow from './FormRow';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {createProduct, handleChange, clearValues, uploadImage, updateProduct, setEditJob} from '../../features/Product';
import { Imagee, selfie, tasweer, pic } from '../../features/Image';
import styled from 'styled-components';


const AddProducts = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState()
  const [file2, setFile2] = useState()
  const [file3, setFile3] = useState()
  const [file4, setFile4] = useState()
  const [file5, setFile5] = useState()
  const [ok, setOk] = useState(false);
  const {
    isLoading,
    name,
    price,
    image,
    discription,
    company,
    category,
    colors,
    inventory,
    isEditing,
    categoryOptions,
    url,
    isImageUpload,
    editProductId,
    shippingOptions,
    freeShipping = '',
    shipping = '',
  
  } = useSelector((store) => store.product)
  const {url3,url4, url5, url2 } = useSelector((store) => store.image);

  

  // image upload
  const handleUpload1 = () => {
    console.log(file);
    const formData = new FormData()
    formData.append('file', file)
    dispatch(uploadImage(formData))
  }

  const handleUpload2 = () => {
    console.log(file2);
    const formData2 = new FormData()
    formData2.append('file', file2)
    dispatch(Imagee(formData2))
  }
  const handleUpload3 = () => {
    console.log(file3);
    const formData3 = new FormData()
    formData3.append('file', file3)
    dispatch(pic(formData3))
  }

  const handleUpload4 = () => {
    console.log(file4);
    const formData4 = new FormData()
    formData4.append('file', file4)
    dispatch(selfie(formData4))
  }
  
  const handleUpload5 = () => {
    console.log(file5);
    const formData5 = new FormData()
    formData5.append('file', file5)
    dispatch(tasweer(formData5))
  }

  const handleUpload = (e) => {
    e.preventDefault()
    handleUpload1();
    handleUpload2();
    handleUpload3(); 
    handleUpload4();
    handleUpload5();
  }
  console.log(url,url2, url3, url4, url5);

// controlled react form

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({name, value}))

  };
  console.log(shipping);
  console.log( category);

  // submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditing === true) {
      console.log(category);
      dispatch(
        updateProduct({
          productId: editProductId,
          product: { name,
            colors,
            category,
            company,
            discription,
            freeShipping : shipping,
            inventory,
            price,},
        })
        );
        return;
      }

    if(!isImageUpload){
      toast.error("Please first upload the image")
      return
    }
    if(!name || !company || !price  || !discription || !category || !colors || !inventory){
      toast.error("Please Fill Out All Fields")
      return
    }

    if(!url || !url2 || !url3  || !url4 || !url5){
      toast.error("Something went wrong please try upload images again.")
      return
    }
    
    

    if(url || url2 || url3 || url4 || url5){
      dispatch(createProduct({
        name,
        price,
        images : [
          {
            src : url,
          },
          {

            src : url2,
          },
          {

            src : url3,
          },
          {

            src : url4,
          },
          {

            src : url5
          }
        ],
        discription,
        company,
        category,
        colors,
        inventory,
        freeShipping : shipping,
        }))
        return;
    }
  }
  console.log(freeShipping);
  // onSubmit={handleSubmit}
  return (
    <Wrapper>
      <form  className="form">
        <h3>{isEditing ? 'edit job' : 'add job ' }</h3>
      <div className="form-center">
        {/* name */}
        <FormRow 
        type='text'
        name='name'
        value={name}
        handleChange={handleInput}
        />
        {/* price */}
        <FormRow 
        type='number'
        name='price'
        value={price}
        handleChange={handleInput}
        />
        {/* discription */}
        <FormRow 
        type='text'
        name='discription'
        value={discription}
        handleChange={handleInput}
        />
        {/* inventory */}
        <FormRow 
        type='number'
        name='inventory'
        value={inventory}
        handleChange={handleInput}
        />
       {/* colors */}
       <FormRow 
        type='text'
        name='colors'
        value={colors}
        handleChange={handleInput}
        />
        {/* shipping status */}
        {/* company status */}
        <FormRowSelect
            name='shipping'
            value={shipping}
            handleChange={handleInput}
            lists={shippingOptions}
          />
          {/* company status */}
          <FormRow 
        type='text'
        name='company'
        value={company}
        handleChange={handleInput}
        />
          {/* category type */}
          <FormRowSelect
            name='category'
            labelText='category'
            value={category}
            handleChange={handleInput}
            lists={categoryOptions}
          />
          {!isEditing && (
            <>
            <input  className='form-inputt'  onChange={e => setFile(e.target.files[0])} type="file" name="img" id="" placeholder='image : 1'/>
            </>
          )
          }
          {!isEditing && (
            <>
            <input className='form-inputt'  onChange={e => setFile2(e.target.files[0])} type="file" name="img" id="" placeholder='image 2'/>
            </>
          )
          }

          {!isEditing && (
            <>
            <input className='form-inputt'  onChange={e => setFile3(e.target.files[0])} type="file" name="img" id="" placeholder='image 3'/>
            </>
          )
          }

          {!isEditing && (
            <>
            <input className='form-inputt'  onChange={e => setFile4(e.target.files[0])} type="file" name="img" id="" placeholder='image 4'/>
            </>
          )
          }
           
           {!isEditing && (
            <>
            <input className='form-inputt'  onChange={e => setFile5(e.target.files[0])} type="file" name="img" id="" placeholder='image 5'/>
            <button className='btn' onClick={handleUpload}>upload image</button>
            </>
          )
          }

          {/* btn container */}
          <div className='btn-container'>
            
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>


      </div>

      </form>

    </Wrapper>
  )
}




const Wrapper = styled.main`
border-radius: var(--borderRadius);
width: 100%;
background: var(--primary-50);
padding: 3rem 2rem 4rem;
box-shadow: var(--shadow-2);
h3 {
  margin-top: 0;
}
.form {
  margin: 0;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  max-width: 100%;
  width: 100%;
}
.form-row {
  margin-bottom: 0;
}
.form-center {
  display: grid;
  row-gap: 0.5rem;
}
.form-center button {
  align-self: end;
  height: 35px;
  margin-top: 1rem;
}
.btn-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  align-self: flex-end;
  margin-top: 0.5rem;
  button {
    height: 35px;
  }
}
.clear-btn {
  background: var(--grey-500);
}
.clear-btn:hover {
  background: var(--black);
}
.form-inputt{
  margin-top : 2.1rem;
  width: 100%;
  padding: 0.375rem 0.75rem;
  border-radius: var(--borderRadius);
  background: var(--backgroundColor);
  border: 1px solid var(--grey-200);
}
@media (min-width: 992px) {
  .form-center {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    column-gap: 1rem;
  }
  .btn-container {
    margin-top: 0;
  }
}
@media (min-width: 1120px) {
  .form-center {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .form-center button {
    margin-top: 0;
  }
}
`

export default AddProducts