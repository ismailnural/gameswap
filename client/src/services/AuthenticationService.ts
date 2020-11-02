import Api from '@/services/Api';

interface UserRegisterModel {
  id: number;
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
}

interface UserLoginModel {
  email: string;
  password: string;
}

export default {
  register(credentials: UserRegisterModel) {
    return Api().post('register', credentials);
  },
  login(credentials: UserLoginModel) {
    return Api().post('login', credentials);
  },
};
