import jwt from 'jwt-decode';

export default function userId() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        let userData = user && jwt(user.token);
        return userData;
    }
}
