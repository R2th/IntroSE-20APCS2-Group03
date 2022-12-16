# Introduction
I have been developed with `Node.js` for a while ago, but recently I have been sticking with `Python` everyday.

I think that there are many people out there who are using the front end and using `axios` to communicate with the external API when acquiring data.

I would recommend the `facade` pattern as one design pattern.

The following code uses `Vue.js` for front end development.

# Create `axios`'s instance
Create an instance of axios so that you don't have to do the same thing over and over again.

It also intercepts conversion into camel case.

* api-context.js
```
import Axios from 'axios';
import changeCase from "change-object-case";

// DEBUG
const isDebug = process.env.NODE_ENV !== 'production';

// set axios client
const client = Axios.create({
  baseURL: `${process.env.API_ENDPOINT}/api`,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json',
  timeout: 5000,
});

// intercept when request
client.interceptors.request.use(
  (config) => {
    if (isDebug) {
      // can output log here
    }

    // can make common setting while request here

    return config;
  },
  (error) => {
    return Promise.reject(error);
  });

// intercept while response
client.interceptors.response.use(
  (response) => {
    if (isDebug) {
      // can output log here
    }

    // change result to camel case
    if (response.data instanceof Array) {
      response.data = changeCase.camelArray(response.data, {recursive: true, arrayRecursive: true});
    } else {
      response.data = changeCase.camelKeys(response.data, {recursive: true, arrayRecursive: true});
    }

    return response;
  },
  (error) => {
    if (isDebug) {
      // can output log here
    }

    // change result to camel case
    if (error.response.data instanceof Array) {
      error.response.data = changeCase.camelArray(error.response.data, {recursive: true, arrayRecursive: true});
    } else {
      error.response.data = changeCase.camelKeys(error.response.data, {recursive: true, arrayRecursive: true});
    }

    return Promise.reject(error);
  },
);

export default client;
```markdown

# Access to resource
Create data access to resources for each REAT API.

The required parameters should simply be passed from the outside.

For example, when providing CRUD as user information
* user-dao.js
```
/**
 * User API
 */
export class UserDao {
  constructor(client) {
    this._client = client;
  }

  // API name
  get apiName() {
    return 'users';
  }

  // get data (list)
  async getManyAsync(config) {
    return this._client.get(`/${this.apiName}/`, config);
  }

  // get data
  async getAsync(id, config) {
    return this._client.get(`/${this.apiName}/${id}/`, config);
  }

  // register
  async addAsync(data, config) {
    return this._client.post(`/${this.apiName}/`, data, config);
  }

  // update
  async updateAsync(id, data, config) {
    return this._client.put(`/${this.apiName}/${id}/`, data, config);
  }

  // delete
  async deleteAsync(config) {
    return this._client.delete(`/${this.apiName}/${id}/`, config);
  }
}
```markdown

# Create Facade
This is the main we are talking about: `facade`.

Provides a simple API to use from the application side.

Enable to get `DAO` object with `getter`.

*api-facade.js
```
import client from './api-context';
import {UserDao} from './dao/user-dao';

/**
 * API Facade
 */
class ApiFacade {
  /**
   * user Dao
   * @returns {UserDao}
   */
  get user() {
    if (!this._userDao) {
      this._userDao = new UserDao(client);
    }

    return this._userDao;
  }
}

export default new ApiFacade();
```markdown

# Call example

```
import apiFacade from './api/api-facade';

export const actions = {
  async getUsersAsync({state, commit}) {
    // set condition
    const config = {
      params: {
        xxxxx: state.xxxxx,
      },
    };

    // get user information
    return apiFacade.user.getManyAsync(config)
      .catch((err) => {
        commit('xxxxxx', err);
      });
  },
}
```

# Conclusion
We did implement access to the API in the `facade` pattern using `axios`.

As resources and functions increase, it becomes difficult to see what is provided there.

Separating logic and using Facade makes it easier to use any resources and functions.

It may be easier to understand if it is officially announced.

I think that there are various implementation methods depending on the team and the project.

I hope that it is helpful for those who use `axios`.