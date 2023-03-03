export function blockedUser(errMsg) {
    if (errMsg === "User is blocked") {
        localStorage.clear()
    }
}
