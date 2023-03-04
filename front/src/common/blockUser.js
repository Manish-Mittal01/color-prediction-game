
export function blockUser({ errMsg, navigate }) {
    if (errMsg === "User is blocked") {
        localStorage.clear();
        navigate("/login");
    }
};