import React, { useContext } from 'react';
import './product-bar.style.scss';
import Button from '../button/button.component';
import { faBucket, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { DashboardContext } from '../../context/dashboard-context';
import { ShopContext } from '../../context/shop-context';

function ProductBar({ product }) {
    const navigate = useNavigate();

    const { setIsBoxOpen, setProductToDelete } = useContext(DashboardContext);

    const { shop } = useContext(ShopContext);

    const goToUpdateProduct = () => {
        navigate(`update-product/${product.id}`);
    }

    const showConfirmationBox = () => {
        try {
            let foundProduct = null;

            for (const category in shop) {
                for(const item of shop[category]?.products) {
                    if (item.id === product.id) {
                        foundProduct = item;
                        setProductToDelete({
                            productID: item.id,
                            productName: item.name,
                            productPrice: item.price,
                            productImageURL: item.imageURL,
                            productDescription: item.desc,
                            category: shop[category]?.title
                        });
                        break;
                    }
                }
                if(foundProduct) {
                    break;
                }
            }
        }
        catch(err) {
            console.log(err);
        }
        setIsBoxOpen(true);
    }

    return (
        <div className='product-bar'>
            <div className="product-info">
                <div className="product-image-container">
                    <img src={product.imageURL} alt={product.name} />
                </div>

                <div className="product-details">
                    <h1>{product.name}</h1>
                    <h2>Price: <span>${product.price}</span></h2>
                </div>
            </div>

            <div className="buttons-container">
                <Button 
                    buttonType='icon' 
                    onClick={goToUpdateProduct}
                    icon={faPencil} 
                />

                <Button 
                    buttonType='icon' 
                    onClick={showConfirmationBox} 
                    icon={faBucket} 
                />
            </div>
        </div>
    )
}

export default ProductBar;
