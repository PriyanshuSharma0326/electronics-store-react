import React, { useContext, useEffect, useRef } from 'react';
import './confirmation-box.style.scss';
import { ConfirmBoxContext } from '../../context/confirm-box-context';
import Button from '../button/button.component';
import { deleteProductFromCollection } from '../../lib/utils/firebase.utils';

function useOutsideAlerter(ref) {
    const { setIsBoxOpen } = useContext(ConfirmBoxContext);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsBoxOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

function ConfirmationBox() {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const { setIsBoxOpen, productToDelete } = useContext(ConfirmBoxContext);

    const hideConfirmationBox = () => {
        setIsBoxOpen(false);
    }

    const handleDeleteProduct = async () => {
        try {
            await deleteProductFromCollection(productToDelete);
        }
        catch(err) {
            console.log(err);
        }
        setIsBoxOpen(false);
    }

    return (
        <div className='confirmation-box-container'>
            <div className="confirmation-box" ref={wrapperRef}>
                <div className='text'>
                    <h1>Do you really want to delete this product?</h1>
                    <h2>{productToDelete?.name} - <span>&#40;${productToDelete?.price}&#41;</span></h2>
                </div>

                <div className="buttons-container">
                    <Button 
                        type='button' 
                        buttonType='inverted' 
                        buttonText='No' 
                        onClick={hideConfirmationBox}
                    />

                    <Button 
                        type='button' 
                        buttonText='Yes' 
                        onClick={handleDeleteProduct} 
                    />
                </div>
            </div>
        </div>
    )
}

export default ConfirmationBox;
