import { buildPath } from '../utils/helpers';

export async function loginUser(credentials) {
  const url = '/auth/login';

  return fetch(buildPath('http://localhost:2022', url), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    }),
  }).then((data) => data.json());
}

export async function SignupUser(credentials) {
  const url = '/auth/signup';

  return fetch(buildPath('http://localhost:2022', url), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      day: credentials.day,
      month: credentials.month,
      year: credentials.year,
    }),
  }).then((data) => data.json());
}
