import { useState, useEffect } from "react"
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, Button, FormGroup} from 'react-bootstrap';
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { useUpdateProductMutation,
useGetProductDetailsQuery,
useUploadProductImageMutation } from "../../slices/productApiSlices";
import {toast} from 'react-toastify';
// import { LinkContainer } from "react-router-bootstrap";


const ProductEditScree = () => {
const {id:productId} = useParams();

const [name,setName]=useState('');
const [price, setPrice]= useState('');
// const [user, setUser] =useState('');
const [image, setImage] = useState('');
const [brand, setBrand] = useState(''); 
const [category, setCategory] = useState('');
const [countIntock, setCountInStock] = useState('');
const [description, setDescription] = useState('');
 
const {data:product, isLoading, refetch, error} = useGetProductDetailsQuery(productId);
console.log(product);

const [updateProduct, { isLoading: loadingUpdate }] =
useUpdateProductMutation();

const [uploadProductImage, {isLoading: loadingUpload}]=useUploadProductImageMutation();

const navigate = useNavigate();

useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countIntock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        _id:productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countIntock
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Product updated');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

return (
    <>
    <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
        </Link>
        <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}

        {isLoading?<Loader />:error?
        <Message variant='danger'>{error}</Message>
    :(
        <Form onSubmit={submitHandler}>
            <FormGroup controlId="name" className="my-2">
                 <Form.Label>Name</Form.Label>
                 <Form.Control
                 type='text'
                 placeholder="enter name"
                 value={name}
                 onChange={(e)=>setName(e.target.value)}></Form.Control>
            </FormGroup>
            <FormGroup controlId="price" className="my-2">
                 <Form.Label>Price</Form.Label>
                 <Form.Control
                 type='number'
                 placeholder="enter price"
                 value={price}
                 onChange={(e)=>setPrice(e.target.value)}></Form.Control>
            </FormGroup>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group>

            <FormGroup controlId="brand" className="my-2">
                 <Form.Label>Brand</Form.Label>
                 <Form.Control
                 type='text'
                 placeholder="enter brand"
                 value={brand}
                 onChange={(e)=>setBrand(e.target.value)}></Form.Control>
            </FormGroup>
            <FormGroup controlId="countIntock"className="my-2">
                 <Form.Label>count In stock</Form.Label>
                 <Form.Control
                 type='number'
                 placeholder="enter countIntock"
                 value={countIntock}
                 onChange={(e)=>setCountInStock(e.target.value)}></Form.Control>
            </FormGroup>
            <FormGroup controlId="category"className="my-2">
                 <Form.Label>category</Form.Label>
                 <Form.Control
                 type='text'
                 placeholder="enter category"
                 value={category}
                 onChange={(e)=>setCategory(e.target.value)}></Form.Control>
            </FormGroup>
            <FormGroup controlId="description"className="my-2">
                 <Form.Label>description</Form.Label>
                 <Form.Control
                 type='text'
                 placeholder="enter description"
                 value={description}
                 onChange={(e)=>setDescription(e.target.value)}></Form.Control>
            </FormGroup>
<Button type="submit" variant='primary' className="my-2">
    Update
</Button>
        </Form>
    )}
        </FormContainer> 
    </>
  )
}

export default ProductEditScree