export default class UserInfo {
    constructor(userInfoConfig) {
        this._name = document.querySelector(userInfoConfig.userName);
        this._caption = document.querySelector(userInfoConfig.userCaption);
        this._avatar = document.querySelector(userInfoConfig.userAvatar);
    }

    getUserInfo() {
        return this.userData;
    }

    setUserInfo(userName, userCaption, userAvatar) {
        this._name.textContent = userName;
        this._caption.textContent = userCaption;
        this._avatar.src = userAvatar
    }
}