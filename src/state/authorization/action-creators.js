import { authProxyService, TokenDto } from "../../proxy";
import { HttpClient } from "../../services/http-client/http-client-service";

import { UserLoginModel } from "../../proxy/models";
import { LOGIN_SUCCEESS, LOGIN_FAILED, TRY_LOGIN, LOGOUT } from "./actions";

export async function tryLogin(user: UserLoginModel) {
  let token = null;
  return async dispatch => {
    // try {
    dispatch({
      type: TRY_LOGIN,
      payload: user
    });
    let response = await authProxyService.login(user);
    token = await response.json();

    if (response.status === 200) {
      HttpClient.requestInterceptor.push(request => {
        let _token: TokenDto;
        if (token) _token = token;
        request.headers = Object.assign({}, request.headers, {
          Authorization: `bearer ${_token.access_token}`
        });
        return request;
      });
      dispatch({
        type: LOGIN_SUCCEESS,
        payload: token
      });
    } else {
      dispatch({
        type: LOGIN_FAILED,
        payload: "Invalid Username or Password"
      });
    }
    // } catch (err) {
    //   dispatch({
    //     type: LOGIN_FAILED,
    //     payload: 'Server Error'
    //   });
    // }
  };
}

export async function logOut() {
  return async dispatch => {
    // dispatch(await getIntialContent());
    dispatch({
      type: LOGOUT
    });
  };
}
