import "./checkout-item.styles.scss";
import { CartContext } from "../../context/cart.context";
import { useContext } from "react";

const CheckoutItem = ({ cartItem}) => {
    const { id, name, quantity, price, imageUrl } = cartItem;
    const { decreaseCartItemQuantity, increaseCartItemQuantity, removeCartItem} = useContext(CartContext);
    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <div className="name">{name}</div>
            <div className="quantity">
                <span className="arrow" onClick={() => decreaseCartItemQuantity(id)}>&lt;</span>
                <span className="value">{quantity}</span>
                <span className="arrow" onClick={() => increaseCartItemQuantity(id)}>&gt;</span>
            </div>
            <div className="price">${price}</div>
            <div className="remove-button" onClick={() => removeCartItem(id)}>&#10005;</div>
        </div>
    );
}

export default CheckoutItem;