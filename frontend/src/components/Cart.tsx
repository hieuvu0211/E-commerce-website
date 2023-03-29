import {
  removeFromCart,
  decreaseQuantity,
  encreaseQuantity,
  clearCart,
  getTotal,
} from "../Slices/cartSilce";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state: any) => state.cart);
  const auth = useSelector((state: any) => state.auth);
  const disPatch = useDispatch();
  const navigate = useNavigate();
  const handleRemoveFromCart = (cartItem: any): void => {
    disPatch(removeFromCart(cartItem));
  };
  const handleDecrease = (cartItem: any): void => {
    disPatch(decreaseQuantity(cartItem));
  };
  const handleEncrease = (cartItem: any): void => {
    disPatch(encreaseQuantity(cartItem));
  };
  const handleClearCart = (): void => {
    disPatch(clearCart());
  };
  useEffect(() => {
    disPatch(getTotal());
  }, [cart, disPatch]);
  return (
    <>
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        {cart.cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>your cart is current empty</p>
            <div className="start-shopping">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="titles">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="Quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cart-items">
              {cart.cartItems.map((item: any, index: number) => (
                <div className="cart-item" key={index}>
                  <div className="cart-product">
                    <img src={item.image} alt="item.name" />
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.desc}</p>
                      <button onClick={() => handleRemoveFromCart(item)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">${item.price}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecrease(item)}>-</button>
                    <div className="count">{item.cartQuantity}</div>
                    <button onClick={() => handleEncrease(item)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    ${item.price * item.cartQuantity}
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <button className="clear-cart" onClick={handleClearCart}>
                Clear Cart
              </button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">${cart.cartTotalAmount}</span>
                </div>
                <p>Taxes and shipping calculated at check out</p>
                {auth._id ? <button>Check out</button>
                    :  <button className="cart-login" onClick={() => navigate("/login")}>Login</button>}
                <div className="continue-shopping">
                  <Link to="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
