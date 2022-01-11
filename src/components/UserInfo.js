export default class UserInfo {
    constructor(userInfoConfig) {
        this._userName = document.querySelector(userInfoConfig.userName);
        this._userCaption = document.querySelector(userInfoConfig.userCaption);
        this._userAvatar = document.querySelector(userInfoConfig.userAvatar);
    }

    getUserInfo() {
        return this.userData;
        console.log(userData);
    }

    setUserInfo(name, caption, avatar) {
        this._name.textContent = name;
        this._caption.textContent = caption;
        this._avatar.src = avatar;
    }
}