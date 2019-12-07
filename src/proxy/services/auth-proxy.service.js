import { BASE_URL } from '../../services/http-client/constants';
import { UserLoginModel } from '../models';

export class AuthProxyService {
  async login(user: UserLoginModel) {
    const data = `grant_type=password&username=${user.username}&password=${
      user.password
    }&client_id=1&client_secret=p@$$w0rd`;
    return await fetch(`${BASE_URL}/token`, {
      method: 'post',
      headers: { 'content-Type': 'application/x-www-form-urlencoded' },
      body: data
    });
  }
}
