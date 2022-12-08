export class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.userName);
    this._desc = document.querySelector(data.userDesc);
  }
  getUserInfo() {
    const userInfoObj = {
      name: this._name,
      desc: this._desc
    };

    return userInfoObj;
  }
  setUserInfo(fieldObj) {
    this._name.textContent = fieldObj.name;
    this._desc.textContent = fieldObj.desc;
  }
}