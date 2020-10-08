import { auth } from '../../firebase'

export const handleResetPasswordAPI = (email) => {
    const returnUrl = {
        url: 'http://localhost:3000/signin'
    };

    return new Promise((resolve, reject) => {
        auth.sendPasswordResetEmail(email, returnUrl)
            .then(() => {
                resolve();
            })
            .catch(() => {
                const err = ['Email không tìm thấy. Vui lòng nhập lại'];
                reject(err);
            });
    });
};