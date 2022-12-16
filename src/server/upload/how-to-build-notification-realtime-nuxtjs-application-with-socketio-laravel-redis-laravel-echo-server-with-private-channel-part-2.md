Continue part 1 [here](https://viblo.asia/p/how-to-build-notification-realtime-nuxtjs-application-with-socketio-laravel-redis-laravel-echo-server-with-private-channel-part-1-Do7544q35M6)
I will create `laravel-echo-server` config and basic `nuxt.js` to listen notification.

## NuxtJS
Guide to install https://nuxtjs.org/guide/installation
 
I install nuxt-client-2 inside project laravel

```
$ npx create-nuxt-app nuxt-client-2
```

It will ask you some questions:
1. Choose between integrated server-side frameworks: `None`
2. Choose your favorite UI framework: `Bootstrap`
3. Choose your favorite testing framework: `None`
4. The Nuxt mode you want (Universal or SPA): `Universal`
5. Add axios module to make HTTP request easily into your application. `Yes`

After that you make sure enter folder `/nuxt-client-2`

```
npm install laravel-echo socket.io socket.io-client js-cookie
```

My `nuxt.config.js`

```nuxt.config.js
import path from 'path'
import fs from 'fs'
const pkg = require('./package')

module.exports = {
  server: {
    // port: 3030, // default: 3000
    // host: '0.0.0.0', // default: localhost
    https: {
        key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
        cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    }
  },
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/laravel-echo', ssr:false},
    { src: '~/plugins/axios'}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
```

I run my laravel with https so Nuxt need run on https

i create `server.key` and `sever.crt`, you can use this for your project or can create new key and crt with SSL if you want.

[server.crt](https://github.com/quanghung97/laravel-nuxt-realtime-example/blob/e3473abb5c94b87b1bcbc9a99ba33266df0ed3d6/nuxt-client-2/server.crt)

[server.key](https://github.com/quanghung97/laravel-nuxt-realtime-example/blob/e3473abb5c94b87b1bcbc9a99ba33266df0ed3d6/nuxt-client-2/server.key)

### Config base module axios

```nuxt-client-2/plugins/axios.js
import axios from 'axios'
import https from 'https'

let instance = axios.create({
    baseURL: 'https://laravel1.test',
    //Authorize https dont have CA so disable each axios request
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
})

export default instance
```

### Config laravel echo in client

```nuxt-client-2/plugins/laravel-echo.js
import Echo from 'laravel-echo'
import Cookie from 'js-cookie'

let token = Cookie.get('token')

window.io = require('socket.io-client')
        window.Echo = new Echo({
            broadcaster: 'socket.io',
            host: 'https://laravel1.test:6001',
            auth: {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        }) 
```

### Create modular Store vuex

```nuxt-client-2/store/index.js
import axios from '~/plugins/axios'
const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
    id: null,
    token: null,
    email: null,
    name: null
})

export const mutations = {
    SET_USER(state, user) {
        state.email = user.email
        state.name = user.name
        state.id = user.id
    },
    SET_TOKEN(state, token) {
        state.token = token
    }
}

export const getters = {
}

export const actions = {
    async nuxtServerInit({ commit, state }, { req }) {
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            //console.log(parsed.token)
            try {
                await axios
                    .get('/api/user', {
                        headers: {
                            Authorization: `Bearer ${parsed.token}`
                        }
                    })
                    .then(response => {
                        console.log(response.data)
                        if (response.data) {
                            
                            commit('SET_TOKEN', parsed.token)
                            commit('SET_USER', response.data)
                        } else {
                            commit('SET_TOKEN', null)
                            commit('SET_USER', '')
                        }
                    })
                    .catch(error => {
                        commit('SET_TOKEN', null)
                        commit('SET_USER', '')
                    })
            } catch (err) {
                // No valid cookie found
                console.log(err)
            }
        } else {
            commit('SET_TOKEN', null)
            commit('SET_USER', '')
        }
    }
}
```

### Create pages/login.vue
In backend i have method POST to login

```nuxt-client-2/pages/login.vue
<template>
    <div >
        <b-container>
            <div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                            id="exampleInputEmail1"
                            v-model="userInfo.email"
                            type="email"
                            class="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Enter email">
                    <small
                            id="emailHelp"
                            class="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                            id="exampleInputPassword1"
                            v-model="userInfo.password"
                            type="password"
                            class="form-control"
                            placeholder="Password">
                </div>
                <div class="form-group form-check">
                    <input
                            id="exampleCheck1"
                            type="checkbox"
                            class="form-check-input" >
                    <label
                            class="form-check-label"
                            for="exampleCheck1">
                        Check me out
                    </label>
                </div>
                <button
                        type="button"
                        class="btn btn-primary"
                        @click="goLogin">
                    Submit
                </button>
                <Button class="ml-auto p-2 bd-highlight" primary @click="redirect">Redirect to another Page</Button>
            </div>
        </b-container>

    </div>
</template>
<script>
export default {
    data() {
        return {
            userInfo: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async goLogin() {
            await this.$store.dispatch('auth/goLogin', this.userInfo)
        },
        redirect() {
            this.$router.push({ path: '/socket' })
        }
    }
}
</script>
```

create folder `auth` inside `nuxt-client-2/store` and i will create 4 file `actions.js` `getters.js` `mutations.js` `state.js`

```nuxt-client-2/store/auth/actions.js
import axios from '~/plugins/axios'
import Cookie from 'js-cookie'

export default {
    async goLogin({ commit, state, rootState }, userInfo) {
            await axios
                .post('/api/login', {
                    email: userInfo.email,
                    password: userInfo.password
                })
                .then(response => {
                    console.log(response.data)
                    commit('SET_TOKEN', response.data.token, { root: true })
                    commit('SET_USER', response.data, { root: true })
                    Cookie.set('token', rootState.token)
                })
                .catch(error => {
                    console.log(error)
                })
    },
    async getMes({ commit, rootState }) {
        await axios
            .get('/api/mes', {
                headers: {
                    Authorization: `Bearer ${rootState.token}`
                }
            })
            .then(response => {
                commit('SET_STATUS', response.data.status)
            })
    }
    // logOut({ commit, state }) {
    //     //console.log(rootState.auth.token)
    //     commit('SET_TOKEN', null)
    //     commit('SET_USER', '')
    //     Cookie.remove('token_cookie')
    //     Cookie.remove('name')
    //     Cookie.remove('email')
    // }
} 
```

```nuxt-client-2/store/auth/getters.js
export default {
    getMessage(state) {
        return state.message
    }
}
```

```nuxt-client-2/store/auth/mutations.js
export default {
    SET_STATUS(state, status) {
        state.status = status
    },
    SET_MESSAGE(state, message) {
        state.message = message
    }
}
```

```nuxt-client-2/store/auth/state.js
export default () => ({
    status: null,
    message: null
})
```

### Create pages/socket.vue
This page will send message default call API and we can check WS (web socket message)
```nuxt-client-2/pages/socket.vue
<template>
  <div>
      <button
        type="button"
        class="btn btn-primary"
        @click="getMes">
            Submit
      </button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data () {
      return {
          message: null
      }
    },
    computed: {
       ...mapState({
            email: state => state.email,
            id: state => state.id,
            token: state => state.token
        })
    },
    mounted() {
        // websocket
        window.Echo.private(`notification-${this.id}`)
          .listen('PrivateMessage', (e) => {
              this.message = e.message
              console.log(e)
          })
    },
    methods: {
        async getMes() {
            await this.$store.dispatch('auth/getMes')
        }
    }
}
</script>
```

## Laravel-echo-server

in My project i create `laravel-echo-server.json`
```laravel-cho-server.json
{
	"authHost": "https://laravel1.test",
	"authEndpoint": "/broadcasting/auth",
	"clients": [],
	"database": "redis",
	"databaseConfig": {
		"redis": {
			"port": "6379",
		   	"host": "redis"
		},
		"sqlite": {
			"databasePath": "/database/laravel-echo-server.sqlite"
		}
	},
	"devMode": true,
	"host": null,
	"port": "6001",
	"protocol": "https",
	"socketio": {},
	"sslCertPath": "nuxt-client-2/server.crt",
	"sslKeyPath": "nuxt-client-2/server.key",
	"sslCertChainPath": "",
	"sslPassphrase": "",
	"subscribers": {
		"http": true,
		"redis": true
	},
	"apiOriginAllow": {
		"allowCors": true,
		"allowOrigin": "https://localhost:3000",
		"allowMethods": "GET, POST",
		"allowHeaders": "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization, X-CSRF-TOKEN, X-Socket-Id"
	}
}
```

In my `laravel-echo-server.json`, i config ssl with 2 file `crt`, `key` i use and shared with nuxt config server.

Run `laravel-echo-server start` to listen message 

Nuxt run on https://localhost:3000

laravel run https://laravel1.test

redis port config in 6379 and broadcaster in port 6001 default to listen message

## Run
You go to https://localhost:3000/login and fill email, password compare this with database.

![](https://images.viblo.asia/b09e0220-3f20-4626-9614-5c58e2363389.png)

After i click `Submit` we have information user store this into vuex 

i click to `redirect to test message` we have

![](https://images.viblo.asia/5a8859cb-52b9-43f9-9429-14fb4f8bdc84.png)

This notification to enroll pages have channels, you can see this in file `socket.vue`

This will check authenticated with `jwt.auth` accept to enroll private-channel with individual {id} user

```
mounted() {
        // websocket
        window.Echo.private(`notification-${this.id}`)
          .listen('PrivateMessage', (e) => {
              this.message = e.message
              console.log(e)
          })
    },
```

```nuxt-client-2/plugins/laravel-echo.js
...
auth: {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
```

So, we have WS network to running behind your web to `spy` message in `laravel-echo-server`

![](https://images.viblo.asia/a6c8c61a-4cc4-4ea8-b836-5c22277f1dff.png)

After I click `Submit`

![](https://images.viblo.asia/a986f749-f2e7-45d4-a61d-6dc9585640ca.png)

We send request -> check middleware and run method 
```app/Http/API/LoginController.php
public function getMes(Request $request)
    {
        $user = JWTAuth::toUser($request->token);
        broadcast(new PrivateMessage('sfgdhfjgk', $user, $user->id));
        return response()->json(['status' => 'ok']);
    }
```

After that, message will send to `queue` and work with redis send to `Laravel-echo-server` to listen.

WS client listen in `laravel-echo-server` received message log in `chorme` 

Data in log, We can using it into notification or upgrade project into chat realtime private.

## Conclusion
At the end article, I hope you can apply new brainstorm idea and modify anything, maybe apply this with docker, change port to listen message... etc. Hope you enjoy to my tutorial. Make greate awesome thing that matters :grinning: (thankyou)


facebook: https://www.facebook.com/quanghung997
source code: https://github.com/quanghung97/laravel-nuxt-realtime-example