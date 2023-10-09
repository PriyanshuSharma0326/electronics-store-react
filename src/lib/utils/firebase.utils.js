import { auth, db, provider, storage } from "../config/firebase";

import { 
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
} from 'firebase/firestore';

import { 
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth';

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { v4 as uuidv4 } from 'uuid';

// Method to Users Info from collection
const getUsers = async () => {
    const collectionRef = collection(db, 'users');

    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map(docSnapshot => {
        return docSnapshot.data();
    });

    return users;
}

// Method to Create User Doc to collections
const createUserDoc = async (user, formData, imageURL) => {
    const {
        firstName,
        lastName,
        address,
        phoneNumber,
    } = formData;

    if(!user) return;

    const userDocRef = doc(db, 'users', user.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { email, uid } = user;

        try {
            await setDoc(userDocRef, {
                uid,
                displayName: firstName + ' ' + lastName,
                email,
                photoURL: imageURL,
                address,
                phoneNumber,
                admin: false,
                cart: [],
                orders: [],
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    return userDocRef;
}

// Method to Create Google User Doc to collections
const createGoogleUserDoc = async (user) => {
    if(!user) return;

    const userDocRef = doc(db, 'users', user.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { email, uid, displayName, photoURL } = user;

        try {
            await setDoc(userDocRef, {
                uid,
                displayName,
                email,
                photoURL,
                address: '',
                phoneNumber: '',
                admin: false,
                cart: [],
                orders: [],
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    return userDocRef;
}

// Retrieve user doc
const getUserDocFromCollection = async (userID) => {
    const userDocRef = doc(db, 'users', userID);

    const userDoc = await getDoc(userDocRef);

    return userDoc;
}

// Method to Sign User In with Google Popup
const googlePopupSignIn = () => signInWithPopup(auth, provider);

// Method to Sign User Up with Email and Password
const createUserEmailPasswordMethod = async (email, password) => {
    if(!email || !password) {
        return;
    }

    return createUserWithEmailAndPassword(auth, email, password);
}

const addImageToStorage = async (file, formData, user) => {
    const {
        firstName,
        lastName,
        phoneNumber,
    } = formData;
    const { uid } = user;

    const storageRef = ref(storage, uid);

    await uploadBytesResumable(storageRef, file)
    .then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
                await updateProfile(user, {
                    displayName: firstName + ' ' + lastName,
                    photoURL: downloadURL,
                    phoneNumber: phoneNumber,
                });
                await createUserDoc(user, formData, downloadURL);
            }
            catch (err) {
                console.log(err);
            }
        });
    });
}

// Method to Sign User In with Email and Password
const signInUserEmailPasswordMethod = async (email, password) => {
    if(!email || !password) {
        return;
    }

    return signInWithEmailAndPassword(auth, email, password);
}

// Method to Sign User Out
const signOutUser = () => signOut(auth);

// Method to Listen to Auth State Changes
const authStateChangeListener = (callback) => {
    onAuthStateChanged(auth, callback);
}

// Admin Function - Add product to collection
const addProductToCollection = async (productDoc) => {
    const {
        productName,
        productPrice,
        productDescription,
        category,
        image
    } = productDoc;

    const categoriesDocRef = doc(db, 'categories', category);

    const storageRef = ref(storage, productName);

    await uploadBytesResumable(storageRef, image)
    .then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
                await updateDoc(categoriesDocRef, {
                    products: arrayUnion({
                        id: uuidv4(),
                        imageURL: downloadURL,
                        name: productName,
                        price: productPrice,
                        desc: productDescription,
                    })
                })
            }
            catch (err) {
                console.log(err);
            }
        });
    });
}

// Admin Function - Update product in collection
const updateProductInCollection = async (defaultProductInfo, productDoc, imageFile, id) => {
    const {
        productName,
        productPrice,
        productDescription,
        category
    } = productDoc;

    const {
        defaultProductName,
        defaultProductPrice,
        defaultProductImageURL,
        defaultProductDescription,
    } = defaultProductInfo;

    const categoriesDocRef = doc(db, 'categories', category);

    const storageRef = ref(storage, productName);

    if(imageFile) {
        await uploadBytesResumable(storageRef, imageFile)
        .then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                    await updateDoc(categoriesDocRef, {
                        products: arrayRemove({
                            id: id,
                            imageURL: defaultProductImageURL,
                            name: defaultProductName,
                            price: defaultProductPrice,
                            desc: defaultProductDescription
                        })
                    })
                    await updateDoc(categoriesDocRef, {
                        products: arrayUnion({
                            id: id,
                            imageURL: downloadURL,
                            name: productName,
                            price: productPrice,
                            desc: productDescription
                        })
                    })
                }
                catch (err) {
                    console.log(err);
                }
            });
        });
    }
    else {
        try {
            await updateDoc(categoriesDocRef, {
                products: arrayRemove({
                    id: id,
                    imageURL: defaultProductImageURL,
                    name: defaultProductName,
                    price: defaultProductPrice,
                    desc: defaultProductDescription
                })
            })
            await updateDoc(categoriesDocRef, {
                products: arrayUnion({
                    id: id,
                    imageURL: defaultProductImageURL,
                    name: productName,
                    price: productPrice,
                    desc: productDescription
                })
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}

// Admin Function - Delete product from collection
const deleteProductFromCollection = async (productDoc) => {
    const {
        productID,
        productName,
        productPrice,
        productImageURL,
        productDescription,
        category
    } = productDoc;

    const categoriesDocRef = doc(db, 'categories', category);

    try {
        await updateDoc(categoriesDocRef, {
            products: arrayRemove({
                id: productID,
                imageURL: productImageURL,
                name: productName,
                price: productPrice,
                desc: productDescription
            })
        })
    }
    catch(err) {
        console.log(err);
    }
}

// Add a product to user's cart
const addProductToCart = async (productDoc, userID) => {
    const {
        id,
        name,
        price,
        imageURL
    } = productDoc;

    const userCartDocRef = doc(db, 'users', userID);

    try {
        await updateDoc(userCartDocRef, {
            cart: arrayUnion({
                id: id,
                quantity: 1,
                imageURL: imageURL,
                name: name,
                price: price
            })
        })
    }
    catch (err) {
        console.log(err);
    }
}

// Increase quantity of a product from user's cart
const increaseQuantityOfProductInCart = async (productDoc, productQuantity, userID) => {
    const {
        id,
        name,
        price,
        imageURL,
    } = productDoc;

    const userCartDocRef = doc(db, 'users', userID);

    try {
        await updateDoc(userCartDocRef, {
            cart: arrayRemove({
                id: id,
                quantity: productQuantity,
                imageURL: imageURL,
                name: name,
                price: price
            })
        })
        await updateDoc(userCartDocRef, {
            cart: arrayUnion({
                id: id,
                quantity: productQuantity + 1,
                imageURL: imageURL,
                name: name,
                price: price
            })
        })
    }
    catch (err) {
        console.log(err);
    }
}

// Decrease quantity of a product from user's cart
const decreaseQuantityOfProductInCart = async (productDoc, productQuantity, userID) => {
    const {
        id,
        name,
        price,
        imageURL,
    } = productDoc;

    const userCartDocRef = doc(db, 'users', userID);

    try {
        await updateDoc(userCartDocRef, {
            cart: arrayRemove({
                id: id,
                quantity: productQuantity,
                imageURL: imageURL,
                name: name,
                price: price
            })
        })
        await updateDoc(userCartDocRef, {
            cart: arrayUnion({
                id: id,
                quantity: productQuantity - 1,
                imageURL: imageURL,
                name: name,
                price: price
            })
        })
    }
    catch (err) {
        console.log(err);
    }
}

// Delete a product from user's cart
const deleteProductFromCart = async (productDoc, userID) => {
    const {
        id,
        name,
        price,
        imageURL,
        quantity,
    } = productDoc;

    const userCartDocRef = doc(db, 'users', userID);

    try {
        await updateDoc(userCartDocRef, {
            cart: arrayRemove({
                id: id,
                quantity: quantity,
                imageURL: imageURL,
                name: name,
                price: price
            })
        })
    }
    catch (err) {
        console.log(err);
    }
}

// Clear all items from user's cart
const clearUserCart = async (userID) => {
    const userCartDocRef = doc(db, 'users', userID);

    try {
        await updateDoc(userCartDocRef, {
            cart: []
        })
    }
    catch (err) {
        console.log(err);
    }
}

// Add product to orders collection
const addOrderedProductToCollection = async (orderInfo) => {
    const orderDocRef = doc(db, 'orders', orderInfo.orderID);

    const {
        orderID,
        userID
    } = orderInfo;

    const userOrdersRef = doc(db, 'users', userID)

    const orderSnapshot = await getDoc(orderDocRef);

    if(!orderSnapshot.exists()) {
        try {
            await setDoc(orderDocRef, orderInfo);
            await updateDoc(userOrdersRef, {
                orders: arrayUnion(
                    orderID,
                )
            })
        }
        catch(err) {
            console.log(err);
        }
    }
}

// Function to update order status with the provided status
const updateOrderStatus = async (newStatus, orderID) => {
    const orderDocRef = doc(db, 'orders', orderID);

    try {
        await updateDoc(orderDocRef, {
            orderStatus: newStatus
        })
    }
    catch (err) {
        console.log(err);
    }
}

// Fucntion to update user profile
const updateUserProfile = async (profileDoc, imageFile, id) => {
    const {
        displayName,
        phoneNumber,
        photoURL,
        address
    } = profileDoc;

    const userDocRef = doc(db, 'users', id);

    const storageRef = ref(storage, uuidv4());

    if(imageFile) {
        await uploadBytesResumable(storageRef, imageFile)
        .then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                    await updateDoc(userDocRef, {
                        displayName,
                        phoneNumber,
                        photoURL: downloadURL,
                        address,
                    })
                }
                catch (err) {
                    console.log(err);
                }
            });
        });
    }
    else {
        try {
            await updateDoc(userDocRef, {
                displayName,
                phoneNumber,
                photoURL,
                address,
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}

export {
    getUsers,
    getUserDocFromCollection,
    googlePopupSignIn,
    createUserDoc,
    createGoogleUserDoc,
    createUserEmailPasswordMethod,
    signInUserEmailPasswordMethod,
    signOutUser,
    authStateChangeListener,
    addProductToCollection,
    addImageToStorage,
    updateProductInCollection,
    deleteProductFromCollection,

    addProductToCart,
    increaseQuantityOfProductInCart,
    decreaseQuantityOfProductInCart,
    deleteProductFromCart,
    clearUserCart,

    addOrderedProductToCollection,
    updateOrderStatus,

    updateUserProfile,
}
