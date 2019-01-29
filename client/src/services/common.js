import decode from "jwt-decode";
export default class CommonService {
  isTokenExpired() {
    try {
      const token = this.getLocalStorageData("token");
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        this.removeLocalStorageData();
      } else return false;
    } catch (err) {
      return false;
    }
  }

  isAdmin() {
    var role = this.getLocalStorageData("role");
    return role == "admin" || role == "super_admin";
  }

  removeLocalStorageData() {
    localStorage.clear();
  }

  setLocalStorageData(key, value) {
    // Saves user token to localStorage
    localStorage.setItem(key, value);
  }

  getLocalStorageData(key) {
    // Retrieves the user token from localStorage
    return localStorage.getItem(key);
  }
  getTokenHeader() {
    return {
      Authorization: `Bearer ${this.getLocalStorageData("token")}`
    };
  }
}
