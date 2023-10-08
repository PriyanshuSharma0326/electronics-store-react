import React, { useContext } from 'react';
import './product-card.styles.scss';
import Button from '../button/button.component';
import { CartContext } from '../../context/cart-context';
import { addProductToCart, increaseQuantityOfProductInCart } from '../../lib/utils/firebase.utils';
import { UserContext } from '../../context/user-context';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
    const { id, name, imageURL, price } = product;

    const { userCart } = useContext(CartContext);

    const { currentUser } = useContext(UserContext);

    const navigate = useNavigate();

    const addToCartButtonHandler = async () => {
        let productFound;
        if(userCart.length === 0) {
            addProductToCart(product, currentUser.uid);
        }
        else {
            productFound = userCart.some(item => item.id === product.id);

            if(!productFound) {
                addProductToCart(product, currentUser.uid);
            }
            else if(productFound) {
                let productQuantity = userCart.find(item => item.id === product.id)?.quantity;
                increaseQuantityOfProductInCart(product, productQuantity, currentUser.uid);
            }
        }
    }

    const visitProductPage = (productID) => {
        navigate(`/products/${productID}`);
    }

    return (
        <div className='product-card-container'>
            <h1>{name}</h1>

            <div className="product-image-container">
                <img src={imageURL} alt={name} />
            </div>

            <h2>Price: <span className='actual-price'>${price}</span></h2>

            <Button 
                buttonText='See details' 
                type='button' 
                buttonType='inverted' 
                onClick={() => visitProductPage(id)} 
            />

            <Button 
                buttonText='Add to cart' 
                type='button' 
                onClick={addToCartButtonHandler}
            />
        </div>
    )
}

export default ProductCard;
