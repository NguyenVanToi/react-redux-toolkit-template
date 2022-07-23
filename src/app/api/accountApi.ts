import { LoginForm } from './../redux/slices/authSlice';
// A mock function to mimic making an async request for data
export function login(loginForm: LoginForm) {
  return new Promise<{ data: LoginForm }>((resolve, reject) => {
    if (
      loginForm.email === 'toinv2610@gmail.com' &&
      loginForm.password === 'test'
    ) {
      setTimeout(() => resolve({ data: loginForm }), 500);
    } else {
      reject('Email or password is invalid!');
    }
  });
}

export function logout() {
  return new Promise<{ status: boolean }>((resolve, reject) => {
    if (1) {
      setTimeout(() => resolve({ status: true }), 500);
    } else {
      reject('Email or password is invalid!');
    }
  });
}
