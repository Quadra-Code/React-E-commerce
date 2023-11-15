/* eslint-disable no-unused-vars */
import React, {Fragment,useState,useEffect,useRef,useCallback  } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { Select, MenuItem } from '@material-ui/core';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { PrimeIcons } from 'primereact/api';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";      

export default function AddProduct() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryPrice, setCategoryPrice] = useState('');
  const [categoryUnit, setCategoryUnit] = useState('');
  const [categoryDisc, setCategoryDisc] = useState('');
  const [categoryCal, setCategoryCal] = useState('');
  const [categoryProtein, setCategoryProtein] = useState('');
  const [categoryFat, setCategoryFat] = useState('');
  const [categoryCarb, setCategoryCarb] = useState('');
  const [categoryImages, setCategoryImages] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [formData1, setFormData1] = useState({
    product_images :null,
});

let {productID} = useParams()

useEffect (()=>{
  console.log('2');
  const formReloading = setInterval(() => {
    setFormData1({...formData1,product_images: photos.map((arr) => arr.slice(-1)[0])})
  }, 1000);
  return () => {
    clearInterval(formReloading);
  };
},[photos,formData1])

  const handleOptionChange = (event) => {
    setCategoryUnit(event.target.value);
  }
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };
  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );
  const toast = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);

  const onTemplateSelect  = async (e) => {
    const newPhotos = [e.files];
    // const newPhotos = [ ...photos,e.files];
    setPhotos([newPhotos]);  
    let _totalSize = totalSize;
    let files = e.files;
    Object.keys(files).forEach((key) => {
        _totalSize += files[key].size || 0;
    });
    setTotalSize(_totalSize);
  };
  
  const onTemplateUpload = (e) => {
      let _totalSize = 0;
      console.log(e.files);
      // setCategoryImages((prevImages) => {
      //   return [...prevImages, e.files];
      // });
      e.files.forEach((file) => {
          _totalSize += file.size || 0;
      });
  
      setTotalSize(_totalSize);
      toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  };
  
  const onTemplateRemove = (file, callback) => {
    console.log(file);
    setPhotos([...photos[0].splice(file,1)])
    console.log(photos);
      setTotalSize(totalSize - file.size);
      callback();
  };
  
  const onTemplateClear = () => {
    setTotalSize(0);
    setPhotos([]);  
  };
  
  const headerTemplate = (options) => {
      const { className, chooseButton, uploadButton, cancelButton } = options;
      const value = totalSize / 10000;
      const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';
  
      return (
          <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
              {chooseButton}
              {cancelButton}
              <div className="flex align-items-center gap-3 ml-auto">
                  <span>{formatedValue} / 1 MB</span>
                  <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
              </div>
          </div>
      );
  };
  
  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
          <div className="flex align-items-center" style={{ width: '40%' }}>
            <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
            <span className="flex flex-column text-left ml-3">
                {file.name}
                <small>{new Date().toLocaleDateString()}</small>
            </span>
          </div>
          <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
          <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
      </div>
    );
  };
  
  const emptyTemplate = () => {
      return (
          <div className="flex align-items-center flex-column">
              <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
              <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                  Drag and Drop Image Here
              </span>
          </div>
      );
  };
  
  const chooseOptions = { icon: PrimeIcons.CLOUD_UPLOAD , iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
  // const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
  const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
  


// http://localhost:8000/crud-products/1
// http://localhost:9000/sections
  const handleSubmit = (e)=>{
    e.preventDefault();
    // handlePhoto()
    // setFormData1({...formData1,product_images: photos.map((arr) => arr.slice(-1)[0])});
    const formData = new FormData();
    if(formData1.product_images){
      formData1.product_images[0].map((image) => {
        formData.append('uploaded_images', image);
      });
    }
    formData.append('product_name', categoryName);
    formData.append('product_price', categoryPrice);
    formData.append('product_unit', categoryUnit);
    formData.append('product_description', categoryDisc);
    formData.append('product_calories', categoryCal);
    formData.append('product_protein', categoryProtein);
    formData.append('product_fat', categoryFat);
    formData.append('product_carbohydrates', categoryCarb);
    formData.append('sub_category_fk', productID);
    console.log(formData);
      axios.post(`https://reactdjangoecommerce.pythonanywhere.com/crud-products/${productID}`,formData)
      .then ((res)=>{
        console.log(res);
        // const newSection = {id:response.data.id, category_name };
        // setSections([...sections, newSection]);  
      })
      .catch ((error)=>{
      console.error(error)
      })
  }
  return (
    <Fragment>
      <section className="topSec">
        <div className="topSec-content" >
          <div>
            <img width="64" height="64" src="https://img.icons8.com/cotton/64/purchase-order.png" alt="purchase-order"/>
          </div>
          <h1 >اضافة منتج جديد</h1>
        </div>
        <div className='allElements'>
          <div className="container">
            <form onSubmit={handleSubmit} action="">
              <div className="section">
                <div className='label'>
                  معلومات اساسيه
                </div>
                <div className='inp-container' dir='rtl'>
                  <TextField id="filled-basic" onChange={(e)=>setCategoryName(e.target.value)} className='textField' label="أسم المنتج" variant="filled" />
                  <TextField id="filled-number" className='textField' onChange={(e)=>setCategoryPrice(e.target.value)} type="number" label='سعر المنتج' variant="filled" />
                  <FormControl variant="filled" className='textField' sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label"> وحدة القياس</InputLabel>
                    <Select 
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={categoryUnit}
                      onChange={handleOptionChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="section">
                <div className='label'>
                  وصف / صورة المنتج
                </div>
                <div className='inp-container'>
                  <div className='input-cont'>
                    <textarea name="" onChange={(e)=>{setCategoryDisc(e.target.value)}} placeholder='وصف المنتج' id="" cols="30" rows="10"></textarea>
                  </div>
                  <div className='image-container'>
                    <div className=' card flex justify-content-center'>
                      <div>
                        <Toast ref={toast}></Toast>
                        <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                        <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
                        <FileUpload ref={fileUploadRef} url={null} name="demo[]" multiple accept="image/*" maxFileSize={1000000}
                          onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                          headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                          chooseOptions={chooseOptions} cancelOptions={cancelOptions} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section">
                <div className='label'>
                  معلومات صحيه
                </div>
                <div className='inp-container'>
                  <TextField id="filled-basic" onChange={(e)=>{setCategoryCal(e.target.value)}} className='textField' label="السعرات الحراريه" variant="filled" />
                  <TextField id="filled-basic" onChange={(e)=>{setCategoryProtein(e.target.value)}} className='textField' label="البروتين" variant="filled" />
                  <TextField id="filled-basic" onChange={(e)=>{setCategoryFat(e.target.value)}} className='textField' label="الدهون" variant="filled" />
                  <TextField id="filled-basic" onChange={(e)=>{setCategoryCarb(e.target.value)}} className='textField' label="الكربوهيدرات" variant="filled" />
                </div>
              </div>
              <div className="submit-section section">
                <button type='submit'>اضافة المنتج</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  )
}




//url='http://localhost:9000/sections'