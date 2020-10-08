import { firestore } from '../../firebase';
import firebase from '../../firebase'

export const handleAddProduct = (product, image) => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .add(product)
            .then((res) => {
                const storageRef = firebase.storage().ref();
                storageRef
                    .child('products/' + image.name)
                    .put(image).then((respon) => {
                        respon.ref.getDownloadURL().then((url) => firestore
                            .collection('products').doc(res.id).set({
                                ...product,
                                productThumbnail: url
                            }))
                    });
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    });
}

export const handleFetchProducts = () => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .get()
            .then(snapshot => {
                const productsArray = snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                });
                resolve(productsArray);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const handleDeleteProduct = documentID => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc(documentID)
            .delete()
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    });
}