import { LinkContainer} from 'react-router-bootstrap';
import {Table, Button, Row, Col} from 'react-bootstrap';
import {FaTimes, FaEdit, FaTrash} from 'react-icons/fa';
import Massage from '../../components/Message';
import Loader from '../../components/Loader';
import {useGetOrdersQuery} from '../../slices/orderdApiSlice';
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../../slices/productApiSlices';
import Message from '../../components/Message';
import {toast} from 'react-toastify'
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';
const ProductListScreen = () => {
  const {pageNumber} = useParams();
  const {data, refetch, isLoading, error} =useGetProductsQuery({pageNumber});

const [deleteProduct,{isLoading: loadingDelete }] = useDeleteProductMutation();


  const [createProduct,{isLoading:loadingCreate}]=useCreateProductMutation();


 const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        toast.success('Product Deleted')
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
const createProductHandler= async ()=>{
    if(window.confirm('are you sure you want to create')){
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }  
    }
}
    return (
        <>
    <Row className='align-items-center'>
      <Col>
      <h1>Products</h1>
      </Col>
      <Col className='text-end'>
        <Button className='btn-sm m-3' onClick={createProductHandler}>
            <FaEdit /> Create Product
        </Button>
      </Col>  
    </Row>
    {loadingCreate &&<Loader />}
    {loadingDelete && <Loader />}
    {isLoading?(<Loader />):error?(
<Massage variant='danger'>{error}</Massage>
    ):(
<>
<Table striped bordered hover responsive className='table-sm'>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {data.products.map((product)=>(
            <tr key={product._id}>
                 <td>{product._id}</td>
                 <td>{product.name}</td>
                 <td>{product.price} Birr</td>
                 <td>{product.category}</td>
                 <td>{product.brand}</td>
                 <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm mx-2'>
                            <FaEdit />
                        </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm'
                    onClick={()=>deleteHandler(product._id)}>
                        <FaTrash style={{color:'white'}}/>
                    </Button>
                 </td>
            </tr>
        ))}
    </tbody>
</Table>
<Paginate
          pages={data.pages}
          page={data.page} 
          isAdmin={'true'}/>
</>
    )}
        </>
  )
}

export default ProductListScreen