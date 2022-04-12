import { NoItems } from './Cart.styles';
import { useSelector } from 'react-redux';

const CartItems = () => {
    const cartItems = useSelector((state) => state.cartItems.cartItems);

    return (
        <>
            {cartItems.length === 0 ? <NoItems>There are no items in your cart, so go back and order some cards</NoItems> :<></>}
        </>
    );
};

export default CartItems;