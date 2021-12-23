export default class UserInfo {
    constructor(name, caption) {
        this._name = name;
        this._caption = caption;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            caption: this._caption.textContent
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._caption.textContent = data.caption;
    }
}