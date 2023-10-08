import React, { useContext } from 'react';
import './product-info.style.scss';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';

function ProductInfo() {
    const param = useParams();

    const { products } = useContext(ShopContext);

    const product = products.find(item => item.id === param.productID);

    return (
        <div className='product-info-page-container'>
            <h1 className='product-name'>{product.name}</h1>

            <div className="product-details">
                <div className="product-image-container">
                    <img src={product.imageURL} alt='' />
                </div>

                <div className="product-info">
                    <h3>${product.price}</h3>

                    <p>Product description: Introducing the Apple iPhone 13 Pro, a masterpiece of innovation and style. With its Pro Camera System, Super Retina XDR Display, A15 Bionic Chip, 5G connectivity, and the latest iOS 15, this smartphone offers an unparalleled experience. Capture professional-quality photos and videos, enjoy stunning visuals, and experience lightning-fast performance. The iPhone 13 Pro combines power and elegance in a sustainable design, featuring Ceramic Shield and Face ID security. It's not just a phone; it's a creative tool and a statement of sophistication. Elevate your mobile experience with the iPhone 13 Pro today.</p>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo;
