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
    ListGroupItem, 
    FormGroup} from 'react-bootstrap';
    import { useDispatch,useSelector } from "react-redux";
import { toast } from "react-toastify";
    import Rating from "../components/Rating";
import { useCreateReviewMutation, useGetProductDetailsQuery } from "../slices/productApiSlices.js";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {addToCart} from '../slices/cartSlice.js'
import {v4 as uuidv4} from 'uuid';
import Meta from "../components/Meta.jsx";


const ProductScreen = () => {

    const { id: productId } = useParams();
   
const dispatch = useDispatch();
const navigate = useNavigate();

const [qty,setQty] = useState(1);
const [rating, setRating] = useState(0);
const [comment, setComment] = useState('');

const {userInfo} = useSelector((state) => state.auth);

const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation();

   
const addToCartHandler=()=>
{
    console.log(uuidv4());
dispatch(addToCart({...product, qty}));
navigate('/cart');
}; 
    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetProductDetailsQuery(productId);
    const submitHandler = async (e) => {
        e.preventDefault();
    
        try {
          await createReview({
            productId,
            rating,
            comment,
          }).unwrap();
          refetch();
          toast.success('Review created successfully');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };
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
                <>
                <Meta title={product.name} />
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
                                        disabled={product.countInStock === 0}
                                        onClick={addToCartHandler}
                                        > Add to stock</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                <Row className="review">
<Col md={6}>
    <h2>Reviews</h2>
    {product.reviews.length === 0 && <Message>No Reviews</Message>}
    <ListGroup  variant="flush">
        {product.reviews.map(review => (
            <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0,10)}</p>
                <p>{review.comment}</p>
            </ListGroup.Item>
        ))}
        <ListGroup.Item>
            <h2>Write a Customer Review</h2>
            {loadingProductReview && <Loader />}

            {userInfo ? (
                <Form onSubmit={submitHandler}>
                    <FormGroup controlId="rating" className="my-2">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e)=>setRating(Number(e.target.value))}>
                            <option value=''>select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                        </Form.Control>
                    </FormGroup>
                    <FormGroup controlId="comment" className="my-2">
<Form.Label>Comment</Form.Label>
<Form.Control
as='textarea'
row='3'
onChange={(e) => setComment(e.target.value)}></Form.Control>
                    </FormGroup>
<Button
disabled={loadingProductReview}
type='submit'
variant='primary'>
    Submit
</Button>
                </Form>
            ):(
                <Message>
                    please <Link to='/login'>Sign in</Link>to write a review{''}
                </Message>
            )}
        </ListGroup.Item>
    </ListGroup>
</Col>
                </Row>
                </>
            )}

        </>
    )
}

export default ProductScreen