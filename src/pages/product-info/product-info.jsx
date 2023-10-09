import React, { useContext } from 'react';
import './product-info.style.scss';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';
import Button from '../../components/button/button.component';
import { addProductToCart, increaseQuantityOfProductInCart } from '../../lib/utils/firebase.utils';
import { UserContext } from '../../context/user-context';
import { CartContext } from '../../context/cart-context';

function ProductInfo() {
    const param = useParams();

    const { products } = useContext(ShopContext);

    const { currentUser } = useContext(UserContext);

    const { userCart } = useContext(CartContext);

    const product = products.find(item => item.id === param.productID);

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

    return (
        <div className='product-info-page-container'>
            <h1 className='product-name'>{product.name}</h1>

            <div className="product-details">
                <div className="product-image-container">
                    <img src={product.imageURL} alt='' />
                </div>

                <div className="product-info">
                    <h3>Price: ${product.price}</h3>

                    <p>Product description: <span>{product.desc}</span></p>
                </div>
            </div>

            <Button 
                buttonText='Add to cart' 
                type='button' 
                onClick={addToCartButtonHandler} 
            />
        </div>
    )
}

export default ProductInfo;
