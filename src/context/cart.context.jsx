import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const changeCartItemQuantity = (cartItems, productId, amount) => {
        return cartItems.map((cartItem) =>
            cartItem.id === productId
                ? { ...cartItem, quantity: (cartItem.quantity + amount) > 0? (cartItem.quantity + amount): cartItem.quantity }
                : cartItem
        );
};

const removeCartItemFromItems = (cartItems, productId) => {
    return cartItems.filter((cartItem) =>
        cartItem.id !== productId);
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartItemCount: 0,
    cartTotal: 0,
    increaseCartItemQuantity: () => {},
    decreaseCartItemQuantity: () => {},
    removeCartItem: () => {}
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const count = cartItems.reduce(
          (total, cartItem) => total + cartItem.quantity,
          0
        );
        const total = cartItems.reduce(
            (total, cartItem) => total + (cartItem.quantity * cartItem.price),
            0
          );
        setCartItemCount(count);
        setCartTotal(total);
      }, [cartItems]);

    const addItemToCart = (product) =>
        setCartItems(addCartItem(cartItems, product));

    const increaseCartItemQuantity = (productId) => setCartItems(changeCartItemQuantity(cartItems, productId, 1));
    const decreaseCartItemQuantity = (productId) => setCartItems(changeCartItemQuantity(cartItems, productId, -1));
    const removeCartItem = (productId) => setCartItems(removeCartItemFromItems(cartItems, productId));

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart,  cartItemCount, cartTotal, increaseCartItemQuantity, decreaseCartItemQuantity, removeCartItem};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};