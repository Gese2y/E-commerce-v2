import { useParams, useNavigate } from "react-router-dom"
// import Products from "../components/Products"
// import products from "../Products";
// import axios from "axios";
import { useState } from "react"; 
import { Link } from 'react-router-dom';
import {Form, 
    Row, 
    Col, 
    Image, 
    ListGroup, 
    Card, 
    Button, 
    ListGroupItem } from 'react-bootstrap';
    import { useDispatch } from "react-redux";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productApiSlices.js";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {addToCart} from '../slices/cartSlice.js'
import {v4 as uuidv4} from 'uuid';
const ProductScreen = () => {

    const { id: productId } = useParams();
   
const dispatch = useDispatch();
const navigate = useNavigate();

    const [qty,setQty] = useState(1)
   
const addToCartHandler=()=>
{
    console.log(uuidv4());
dispatch(addToCart({...product, qty}));
navigate('/cart');
}; 
    const {
        data: product,
        isLoading,
        error,
    } = useGetProductDetailsQuery(productId);
    // const product= products.find((p)=>p._id===productId);
    return (
        <>
            <Link className="btn btn-light my-3" to='/'>
                Go Back
            </Link>
            {isLoading ? (

                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <Row>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={4}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price:${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>tatus:</Col>
                                        <Col>
                                            <strong>
                                                ${product.countIntock > 0 ? 'In stock' : 'out of tock'}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countIntock>0 && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                            <Form.Control
                                            as='select'
                                            value={qty}
                                            onChange={(e)=>setQty(Number(e.target.value))}
                                            >
                                                {[...Array(product.countIntock).keys()].map((x) =>(
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}
                                <ListGroup.Item>
                                    <Button
                                        className='btn-block'
                                        type='button'
                                        disabled={product.countIntock == 0}
                                        onClick={addToCartHandler}
                                        > Add to stock</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}

        </>
    )
}

export default ProductScreen