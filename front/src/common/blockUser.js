
export function blockUser({ errMsg, navigate }) {
    if (errMsg === "User is blocked") {
        localStorage.removeItem("winmallUser");
        navigate("/login");
    }
};