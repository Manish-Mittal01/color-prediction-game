import jwt from 'jwt-decode';

export default function userId() {
    let user = JSON.parse(localStorage.getItem("winmallUser"));

    if (user) {
        let userData = user && jwt(user.token);
        return userData;
    }
}
