import "./checkout.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../../context/cart.context";
import CheckoutItem from "../../checkout-item/checkout-item.component";

const Checkout = () => {
    const { cartItems, cartTotal} = useContext(CartContext);
    const showCheckoutList = () => {
        return (
            <div className='checkout-container'>
                <div className="checkout-header">
                    <div className="header-block">Product</div>
                    <div className="header-block">Description</div>
                    <div className="header-block">Quantity</div>
                    <div className="header-block">Price</div>
                    <div className="last-child ">Remove</div>
                </div>
                {
                    cartItems.map((cartItem) => (
                        <CheckoutItem key={cartItem.id}
                            cartItem={cartItem}/>
                    ))
                }
                <div className="total">Total: ${cartTotal}</div>
            </div>
        );
    }

    const showEmptyCart = () => {
        return (
            <div className='checkout-container empty-message'>
                Your cart is empty
            </div>
        );
    }

    return (
        <div>
            {cartItems.length ? showCheckoutList() : showEmptyCart()}
        </div>
    );
};

export default Checkout;