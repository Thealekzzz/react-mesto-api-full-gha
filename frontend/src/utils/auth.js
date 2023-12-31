class AuthApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  async register({ email, password }) {
    const res = await fetch(this.baseUrl + "/signup", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password })
    });

    return this._checkResponce(res);
  }

  async login({ email, password }) {
    const res = await fetch(this.baseUrl + "/signin", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password })
    });

    return this._checkResponce(res);
  }

  async auth(token) {
    const res = await fetch(this.baseUrl + "/users/me", {
      method: "GET",
      headers: {
        ...this.headers,
        token,
      },
    });

    return this._checkResponce(res);
  }

}

const authApi = new AuthApi({
  baseUrl: 'https://api.kznv.alex.nomoreparties.co',
  headers: {
    'content-type': 'application/json',
    'token': localStorage.getItem('token'),
  }
});

export default authApi;