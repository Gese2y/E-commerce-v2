import { Row, Col } from 'react-bootstrap'
// import products from '../Products'
import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Products'
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productApiSlices.js'
import Paginate from '../components/Paginate.jsx';

const HomeSceens = () => {
  const {pageNumber,keyword}=useParams();
  const { data, isLoading, error } = useGetProductsQuery({keyword,pageNumber});
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (<Message variant='danger'>
        {error?.data?.message || error.error}
      </Message>) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
          pages={data.pages}
          page={data.page} 
          keyword={keyword ? keyword:''}/>
        </>
      )}

    </>
  );
};

export default HomeSceens