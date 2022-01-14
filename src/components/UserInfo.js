export default class UserInfo {
    constructor(userInfoConfig) {
        this._userName = document.querySelector(userInfoConfig.userName);
        this._userAbout = document.querySelector(userInfoConfig.userAbout);
        this._userAvatar = document.querySelector(userInfoConfig.userAvatar);
    }

    getUserInfo() {
        return this.userData;
    }

    setUserInfo(name, about, avatar, _id) {
        this._userName.textContent = name;
        this._userAbout.textContent = about;
        this._userAvatar.src = avatar;
        this._id = _id;
    }
}