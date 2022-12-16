Authentication trong SPAs thường là một chủ đề hot, đối với những người không chắc chắn về cách thức triển khai một hệ thống authentication với đầy đủ tính năng - registration, login and access token refreshing thông qua refresh tokens. 

Trong bài viết này, chúng ta sẽ cùng thảo luận về cách triển khai một endpoints thay vì triển khai một JWT (Json web tokens) API. Vì vậy, chúng ta có thể linh hoạt trong việc viết JWT API cho riêng mình. 

Tham khảo JWT Laravel tại https://sal.vn/oMStwi.

## Triển khai

Với giao diện người dùng, chúng ta sẽ sử dụng các packages như sau: **[vuex-persistedstate](https://www.npmjs.com/package/vuex-persistedstate)**, **[js-cookie](https://www.npmjs.com/package/js-cookie)** và **[@nuxtjs/axios](https://www.npmjs.com/package/@nuxtjs/axios)**. Chúng ta cần cho phép chúng lưu tokens và thông tin user có thể truy cập song song vào cả server và client, do đó việc xác thực có thể thực hiện ở cả 2. 

Cài đặt packages:
```
npm install --save vuex-persistedstate js-cookie @nuxtjs/axios
```

## VueX State Persistence
Để thực hiện gọi authenticated API từ server và brower (client), chúng ta cần đảm bảo tokens được quyền truy cập giữa 2 điểm. **Vuex-persistedstate** đơn giản hóa việc này với hỗ trợ của js-cookie sẽ duy trì tokens trên tcookie.

Sau khi cài đặt packages, chúng ta cần cấu hình cho vuex-persistedstate như một plugin. 

**`plugins/local-storage.js`**
```JS
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

// access the store, http request and environment from the Nuxt context
// https://nuxtjs.org/api/context/
export default ({ store, req, isDev }) => {
  createPersistedState({
    key: 'authentication-cookie', // choose any name for your cookie
    paths: [
      // persist the access_token and refresh_token values from the "auth" store module
      'auth.access_token',
      'auth.refresh_token',
    ],
    storage: {
      // if on the browser, parse the cookies using js-cookie otherwise parse from the raw http request
      getItem: key => process.client ? Cookies.getJSON(key) : cookie.parse(req.headers.cookie || '')[key],
      // js-cookie can handle setting both client-side and server-side cookies with one method
      // use isDev to determine if the cookies is accessible via https only (i.e. localhost likely won't be using https)
      setItem: (key, value) => Cookies.set(key, value, { expires: 14, secure: !isDev }),
      // also allow js-cookie to handle removing cookies
      removeItem: key => Cookies.remove(key)
    }
  })(store)
}
```

Tiếp đó là add plugin này vào nuxt.config.js:
```JS
plugins: [
  '~/plugins/local-storage',
],
```
## VueX Store

Chúng ta cần thiết lập VueX store, đó là nơi sẽ lưu trữ dữ liệu về người dùng, access token và refresh token. Chúng sẽ bao gồm các actions cho việc gọi API để register, login và refresh user, cũng như các mutations để chuyển dữ liệu được trả về tới state.

**`store/auth.js`**
```JS
// reusable aliases for mutations
export const AUTH_MUTATIONS = {
  SET_USER: 'SET_USER',
  SET_PAYLOAD: 'SET_PAYLOAD',
  LOGOUT: 'LOGOUT',
}

export const state = () => ({
  access_token: null, // JWT access token
  refresh_token: null, // JWT refresh token
  id: null, // user id
  email_address: null, // user email address
})

export const mutations = {
  // store the logged in user in the state
  [AUTH_MUTATIONS.SET_USER] (state, { id, email_address }) {
    state.id = id
    state.email_address = email_address
  },

  // store new or updated token fields in the state
  [AUTH_MUTATIONS.SET_PAYLOAD] (state, { access_token, refresh_token = null }) {
    state.access_token = access_token

    // refresh token is optional, only set it if present
    if (refresh_token) {
      state.refresh_token = refresh_token
    }
  },

  // clear our the state, essentially logging out the user
  [AUTH_MUTATIONS.LOGOUT] (state) {
    state.id = null
    state.email_address = null
    state.access_token = null
    state.refresh_token = null
  },
}

export const actions = {
  async login ({ commit, dispatch }, { email_address, password }) {
    // make an API call to login the user with an email address and password
    const { data: { data: { user, payload } } } = await this.$axios.post(
      '/api/auth/login', 
      { email_address, password }
    )
    
    // commit the user and tokens to the state
    commit(AUTH_MUTATIONS.SET_USER, user)
    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
  },

  async register ({ commit }, { email_addr, password }) {
    // make an API call to register the user
    const { data: { data: { user, payload } } } = await this.$axios.post(
      '/api/auth/register', 
      { email_address, password }
    )
    
    // commit the user and tokens to the state
    commit(AUTH_MUTATIONS.SET_USER, user)
    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
  },

  // given the current refresh token, refresh the user's access token to prevent expiry
  async refresh ({ commit, state }) {
    const { refresh_token } = state

    // make an API call using the refresh token to generate a new access token
    const { data: { data: { payload } } } = await this.$axios.post(
      '/api/auth/refresh', 
      { refresh_token }
    )

    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
  },

  // logout the user
  logout ({ commit, state }) {
    commit(AUTH_MUTATIONS.LOGOUT)
  },
}

export const getters = {
  // determine if the user is authenticated based on the presence of the access token
  isAuthenticated: (state) => {
    return state.access_token && state.access_token !== ''
  },
}
```

Tiếp đó, chúng ta cần tạo một Form Components cho trang đăng nhập và đăng ký (registration). Phần này chúng ta sẽ đề cập chi tiết sau. Cơ bản, form của chúng ta nên gọi các authentication module actions để đăng nhập hoặc đăng ký thông tin người dùng.

```JS
const email_address = 'me@example.com'
const password = 'abc123'

await $store.dispatch('auth/login', { email_address, password })
```

## Authenticated API Requests
Phần này, chúng ta sẽ sử dụng tính năng **Interceptors** có sẵn của Axios, nó cho phép chúng ta thay đổi request và responses cũng như handle tất cả các lỗi trả về. @nuxtjs/axios cung cấp đầy đủ: https://axios.nuxtjs.org/extend/#adding-interceptors

Chúng ta sẽ sử dụng 1 request interceptor để đính kèm access token với mỗi request.

**`plugins/axios.js`**
```JS
// expose the store, axios client and redirect method from the Nuxt context
export default function ({ store, app: { $axios }, redirect }) {
  $axios.onRequest((config) => {
    // check if the user is authenticated
    if (store.state.auth.access_token) {
      // set the Authorization header using the access token
      config.headers.Authorization = 'Bearer ' + store.state.auth.access_token
    }

    return config
  })
}
```

Plugin này khá đơn giản, nó sẽ nắm bắt mọi request và nếu người dùng được xác thực, sẽ thêm một Authorization header.

Thêm vào `nuxt.config.js`:
```
plugins: [
  '~/plugins/local-storage',
  '~/plugins/axios',
],
```

## Refresh Tokens

Vì lý do bảo mật, nên 1 mã access tokens không nên để tồn tại quá lâu và nên dễ dàng thu hồi nếu cần thiết.  Khi access token hết hạn hoặc không hợp lệ nhưng ứng dụng vẫn cần bảo vệ, vậy ứng dụng cần tạo một access token mới mà người dùng không cần cấp quyền truy cập một lần nữa. 

Để giải quyết vấn đề này, chúng ta có thể sửa đổi interceptor plugin, thêm trình xử lý lỗi để tự động tạo mã access token mới trong trường hợp nó hết hạn. 

Trong trường hợp access token hết hạn, API sẽ cần thông báo cho client rằng token không hợp lệ và cần được làm mới. Thường chúng ta sẽ trả về với status code là 401.

```JSON
{ 
  "status": "failed", 
  "text_code": "TOKEN_EXPIRED",
  "message": "The JWT token is expired",
  "status_code": 401
}
```

Lúc này, client đã nhận biết được token hết hạn, có thể chuyển tới để làm mới lại token, trước khi thử lại mộ request như ban đầu.

Thường endpoint Refresh Token cung cấp 1 giá trị refresh_token thông qua POST request, nên API sẽ cần tạo ra một access token mới để trả về phía client. Nếu token mới hết hạn, bị thu hồi hoặc không hợp lệ, nó có thể trả về mã lỗi để phía client là không thể xác thực lại và cần logout ra.

Chúng ta sẽ cần chỉnh sửa lại interceptor plugin để bắt lỗi **`plugins/axios.js`**:

```JS
// expose the store, axios client and redirect method from the Nuxt context
// https://nuxtjs.org/api/context/
export default function ({ store, app: { $axios }, redirect }) {
  const IGNORED_PATHS = ['/auth/login', '/auth/logout', '/auth/refresh']

  $axios.onRequest((config) => {
    // check if the user is authenticated
    if (store.state.auth.access_token) {
      // set the Authorization header using the access token
      config.headers.Authorization = 'Bearer ' + store.state.auth.access_token
    }

    return config
  })

  $axios.onError((error) => {
    return new Promise(async (resolve, reject) => {
      // ignore certain paths (i.e. paths relating to authentication)
      const isIgnored = IGNORED_PATHS.some(path => error.config.url.includes(path))
      
      // get the status code from the response
      const statusCode = error.response ? error.response.status : -1

      // only handle authentication errors or errors involving the validity of the token
      if ((statusCode === 401 || statusCode === 422) && !isIgnored) {
        // API should return a reason for the error, represented here by the text_code property
        
        // Example API response: 
        // { 
        //   status: 'failed', 
        //   text_code: 'TOKEN_EXPIRED',
        //   message: 'The JWT token is expired',
        //   status_code: 401
        // }
        
        // retrieve the text_code property from the response, or default to null
        const { data: { text_code } = { text_code: null } } = error.response || {}
        
        // get the refresh token from the state if it exists
        const refreshToken = store.state.auth.refresh_token
        
        // determine if the error is a result of an expired access token
        // also ensure that the refresh token is present
        if (text_code === 'TOKEN_EXPIRED' && refreshToken) {
          
          // see below - consider the refresh process failed if this is a 2nd attempt at the request
          if (error.config.hasOwnProperty('retryAttempts')) {
            // immediately logout if already attempted refresh
            await store.dispatch('auth/logout')
            
            // redirect the user home
            return redirect('/')
          } else {
            // merge a new retryAttempts property into the original request config to prevent infinite-loop if refresh fails
            const config = { retryAttempts: 1, ...error.config }

            try {
              // attempt to refresh access token using refresh token
              await store.dispatch('auth/refresh')

              // re-run the initial request using the new request config after a successful refresh
              // this response will be returned to the initial calling method
              return resolve($axios(config))
            } catch (e) {
              // catch any error while refreshing the token
              await store.dispatch('auth/logout')

              // redirect the user home
              return redirect('/')
            }
          }
        } else if (text_code === 'TOKEN_INVALID') {
          // catch any other JWT-related error (i.e. malformed token) and logout the user
          await store.dispatch('auth/logout')
          
          // redirect the user home
          return redirect('/')
        }
      }
      
      // ignore all other errors, let component or other error handlers handle them
      return reject(error)
    })
  })
}
```
 
 Ở đây, plugin đã được ghi chú rất cụ thể, nhưng về cơ bản trình đánh chặn mới sẽ kiểm tra xem lỗi có liên quan đến token đã hết hạn hay không và sau đó cố gắng làm mới access token nếu có.
 
 Nếu xử lý thành công Promise sẽ trả về một bản sao request ban đầu, làm cho chức năng gọi hoàn toàn không biết rằng token đã được làm mới trước khi nhận được phản hồi của nó. Tuy nhiên, nếu quá trình xử lý làm mới không thành công Interceptor sẽ tự động logout và điều đướng tới trang chủ. 
 
 ```JS
 const { data: { ... } } = await $axios.get('/api/my-account')
 ```
 
 Nuxt cung cấp [nuxtServerInit](https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action) hook cho SSR request tới server.  Chúng ta có thể tự động làm mới access token khi người dùng đã đăng nhập với kết nối đầu tiên tới server. 
 
 Với SPA sẽ không cần thiết phải làm mới thường xuyên, nên khi nó xảy ra, chúng ta có thể cug cấp một token ngắn hạn. 
 Để thực hiện điều này, cần thêm vào root store:
 
 **`store/index.js`**
```JS
// ....
export const actions = {
  // https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action
  // automatically refresh the access token on the initial request to the server, if possible
  async nuxtServerInit ({ dispatch, commit, state }) {
    const { access_token, refresh_token } = state.auth

    if (access_token && refresh_token) {
      try {
        // refresh the access token
        await dispatch('auth/refresh')
      } catch (e) {
        // catch any errors and automatically logout the user
        await dispatch('auth/logout')
      }
    }
  },
}
// ...
```

Bây giờ, khi người dùng điều hướng ứng dụng thông qua URL hoặc liên kết đến bên ngoài, chúng ta sẽ tự động làm mới access token của họ nếu họ đã đăng nhập trước đó.

## Kết Luận
Ở bài viết này, chúng ta sẽ chỉ thảo luận sơ qua về việc triển khai Authentication trong SPAs nhưng cung cấp cho chúng ta những khí niệm cần thiết để có thể triển khai một universal client và server-side JWT authentication trong Nuxt. Bài viết sau chúng ta sẽ cùng xây dựng một ứng dụng cụ thể bao gồm đây đủ hơn về Authentication trong SPAs.