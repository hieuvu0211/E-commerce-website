import { addToCart } from "../Slices/cartSilce";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../Slices/productApi";

const Home = () => {
  const {items:products, status:string} = useSelector((state:any) => state.products);
  const auth = useSelector((state:any) => state.auth);
  console.log(auth);
  const { data, error, isLoading } = useGetAllProductsQuery("");
  const disPath = useDispatch();
  const navigate = useNavigate();
  const handleToCart = (product: any) => {
    disPath(addToCart(product));
    navigate("/cart");
  };
  return (
    <>
      <div className="home-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>An error occurred...</p>
        ) : (
          <>
            <h2>New Arrivals</h2>
            <div className="products">
              {data.map((item: any, index: number) => {
                return (
                  <div key={index} className="product">
                    <h3>{item.name}</h3>
                    <img src={item.image} alt={item.name} />
                    <div className="details">
                      <span>{item.desc}</span>
                      <span className="price">${item.price}</span>
                    </div>
                    <button onClick={() => handleToCart(item)}>
                      Add To Cart
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Home;
