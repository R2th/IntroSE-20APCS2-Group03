Xin chào tất cả mọi người. Hôm nay mình sẽ viết tiếp phần 3, cũng là phần cuối trong loạt bài xây dựng một ứng dụng đơn giản giữa Laravel và Nuxt.js sử dụng `GraphQL`. Vì phần này khá dài nên mình sẽ bắt đầu luôn nhé.Các bạn có thể tìm hiểu về Nuxt.js tại trang chủ của [Nuxt.js](https://nuxtjs.org/) hoặc một số bài viết trên Viblo như: <br>
- [Tìm hiểu về Nuxt.js](https://viblo.asia/p/tim-hieu-ve-nuxtjs-ORNZqgjb50n)
- [Vue.js Server-Side Rendering với Nuxt.js - Phần 1](https://viblo.asia/p/vuejs-server-side-rendering-voi-nuxtjsphan-1-GrLZDxkgZk0)
- [Server-side Nuxt.js for Vue.js Apps](https://viblo.asia/p/server-side-nuxtjs-for-vuejs-apps-Do754wX0lM6)

### Setup Project
Trước hết máy bạn cần cài đặt npm hoặc yarn :)
```shell
$ npx create-nuxt-app nuxtjs-frontend
```

Đoạn cài đặt này các bạn cần nhớ đến lúc yêu cầu chọn UI framework nào thì các bạn chọn cho mình framework mình muốn hoặc không, tùy các bạn. Mình sẽ chọn **[element-ui](https://element.eleme.io/#/en-US)**, vì mình thấy nó khá đẹp và dễ dùng, cùng với đó là `yarn` thay vì `npm` nhé.
### Bắt đầu
Trước hết các bạn sẽ cài cho mình một số package trong quá trình sử dụng như `axios`, `lodash`, `bootstrap`:
```shell
$ yarn add axios lodash bootstrap
```
Các dependencies trong file `package.json` của mình tạm thời sẽ như sau:
```js
  "dependencies": {
    "axios": "^0.18.0",
    "bootstrap": "^4.1.3",
    "cross-env": "^5.2.0",
    "element-ui": "^2.4.6",
    "lodash": "^4.17.11",
    "nuxt": "^2.0.0"
  },
```
Vì mỗi query là một string khá dài nên mình sẽ tạo một file `libs/queryData.js` là nơi sẽ chứa query để dùng cho việc gọi lên API.<br>

File `queryData.js`:
```javascript
export const queryUsers = (page) => `query {
    users(take:10,page:${page}) {
    items {
        id,name,email
    } cursor {
        currentPage,total,hasPages,perPage
        }
    }
}`;

export const getUser = (id) => `query {
    user(id:${id}) {
        id,
        name,
        email,
        profile {
            address
            company
            dob
        }
    }
}`

export const createNewUser = (user) => `mutation{
    createUser(name: "${user.name}",
    email: "${user.email}",
    password: "${user.password}"){id, name, email}
}`;

export const updateOldUser = (user) => `mutation{updateUser(id:${user.id}, email:"${user.email}", name:"${user.name}",password:"${user.password}"){id,name,email}}`;

export const removeUser = (user) => `mutation{deleteUser(id:${user.id}){id}}`;
```
`libs/axios.js`:
```js
import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:9999', //cái này mình run port bên server là 4 con 9
})
```
Tạo một file `api/users.js`:
```js
import axios from '~/libs/axios'

export const api = (query) => axios.get(`/graphql?query=${query}`);
```
Giờ các bạn tạo lấy dữ liệu tại
`pages/users/index.vue`:
```js
import { api } from '../../api/users'
import { queryUsers, createNewUser, updateOldUser, removeUser } from '../../libs/queryData'

async asyncData({ route, query }) {
    const response = await api(queryUsers(query.page || 1))
        .then(( response ) => response.data.data.users)

    return {
        users: response.items,
        cursor: _assign({}, response.cursor, {
            totalPage: Math.ceil(response.cursor.total / response.cursor.perPage) // ở đây mình tự tính cái totalPage rồi truyền vào Pagination
        })
    }
},
```
Thêm mới một user:
```js
methods: {
    store(user) {
        api(createNewUser(user))
            .then (response => {
                this.users = [response.data.data.createUser, ...this.users]
            }).catch((err) => {
            this.$message.warning('Please try again later');
            throw err
        })
    }
},
```
Sửa một user:
```js
async update(user) {
    try {
        await api(updateOldUser(user))
        this.users = updateData(this.users, 'id', user)
    } catch (e) {
        this.$message.warning('Please try again later');
        throw e
    }
},
```
Xóa một user:
```js
async remove(user) {
    try {
        await api(removeUser(user))
        this.users = updateRemoveData(this.users, user)
    } catch (e) {
        this.$message.warning('Please try again later');
        throw e
    }
}
```
Tạm thời mình chỉ nểu ra các methods cần thiết, còn về các component các bạn có thể tham khảo ở source code phía dưới nhé. 
### Test thử
Chạy server và client lên rồi truy cập địa chỉ `localhost:3000` để xem sao nhé. Đây là thành quả của mình. :) 
![](https://images.viblo.asia/0bc913e3-7337-4a1f-bec7-bb8256d3e641.png)<br>
Giờ mình sẽ thử thêm mới, update và xóa một user
![](https://images.viblo.asia/0480adfb-2801-4b33-bc5e-1799685dc96d.gif)
Nghe có vẻ ngon rồi nhỉ. Tuy nhiên khi chúng ta nhấn F12 mở vào phần network sẽ thấy các request này bị lộ hết sạch thông tin lên đó (facepalm). Giờ phải làm sao. Chả nhẽ gg (đầu hàng). <br>
### Giải pháp cho Client
Mình cũng đã lên mạng tìm hiểu và thấy rằng khi dùng với `Vue.js`, phía Client sẽ sử dụng một số package như `Vue-apollo`, `graph`, `apollo-client`, `apollo-link`...
Sau khi tìm hiểu một số package thì mình đã tìm ra. <br>Nuxt.js có một package hỗ trợ rất ngắn gọn, đó là  [@nuxtjs/apollo](https://github.com/nuxt-community/apollo-module).
Mình sẽ cài package này và [grapql-tag](https://github.com/apollographql/graphql-tag). <br>
Giờ thì không cần dùng đến `axios` nữa, bạn có thể remove nó nếu bạn không cần. Code mình cuối cùng sẽ như dưới đây<br>
File `libs/queryData.js`:
```js
export const FETCH_USER = (page) => gql`
query {
    users(take:10,page:${page}) {
    items {
        id,name,email
    } cursor {
        currentPage,total,hasPages,perPage
        }
    }
}
`
export const CREATE_USER = (user) => gql`
    mutation{
    createUser(name: "${user.name}",
    email: "${user.email}",
    password: "${user.password}"){id, name, email}
}
`
export const UPDATE_USER = (user) => gql`mutation{updateUser(id:${user.id}, email:"${user.email}", name:"${user.name}",password:"${user.password}"){id,name,email}}`;

export const DELETE_USER = (user) => gql`mutation{deleteUser(id:${user.id}){id}}`;
```

File `pages/users/index.vue`:
```js
import { FETCH_USER, CREATE_USER, UPDATE_USER, DELETE_USER } from '../../libs/queryData'

async asyncData({ app, route, query }) {
    const response = await app.apolloProvider.defaultClient.query({
        query: FETCH_USER(query.page || 1)
    })
},
        
methods: {
    store(user) {
        this.$apollo.mutate({
            mutation: CREATE_USER(user)
        }).then(response => {
            this.users = [response.data.createUser, ...this.users]
        })
    },
    
    async update(user) {
        try {
            await this.$apollo.mutate({
                mutation: UPDATE_USER(user)
            })

            this.users = updateData(this.users, 'id', user)
        } catch (e) {
            this.$message.warning('Please try again later');
            console.log(e)
        }
    },
    
    async remove(user) {
        try {
            await this.$apollo.mutate({
                mutation: DELETE_USER(user)
            });

            this.users = updateRemoveData(this.users, user)
        } catch (e) {
            this.$message.warning('Please try again later');
            console.log(e)
        }
    }
}
```
Giờ các bạn thử lại và xem kết quả nhé. Mọi thứ đã hoàn tất. :) <br> Dưới đây là **source code** của mình :<br>
https://github.com/vunguyen10111995/graphql-todos/tree/master/nuxt-frontend
### Lời kết
Qua loạt bài tìm hiểu và xây dựng một ứng dụng đơn giản với Laravel và Nuxt.js sử dụng GraphQL, mình hi vọng các bạn có thể cảm thấy một chút gì đó hiểu được về `GraphQL` cũng như tính ứng dụng của nó trong các dự án lớn so với việc sử dụng `RESTful API`. Ngoài ra các bạn có thể tìm hiểu thêm về `GraphQL` tại các bài viết trên **[Viblo](https://viblo.asia)** như:
<br>
- [Xây dựng ứng dụng đơn giản với Laravel và Nuxt.js sử dụng GraphQL (Phần 1)](https://viblo.asia/p/xay-dung-ung-dung-don-gian-voi-laravel-va-nuxtjs-su-dung-graphql-phan-1-Do754J2LZM6)
- [Xây dựng ứng dụng đơn giản với Laravel và Nuxt.js sử dụng GraphQL (Phần 2)](https://viblo.asia/p/xay-dung-ung-dung-don-gian-voi-laravel-va-nuxtjs-su-dung-graphql-phan-2-XL6lAxDJZek)
- [Xây dựng api sử dụng laravel và GraphQL](https://viblo.asia/p/xay-dung-api-su-dung-laravel-va-graphql-4P856aOLlY3)
- [Build Api dùng laravel và GraphQL](https://viblo.asia/p/build-api-dung-laravel-va-graphql-part-1-1VgZv9v9KAw)

Trong lúc đọc bài của mình, có gì còn không hiểu, hãy comment lại nhé. Cảm ơn các bạn đã theo dõi bài viết của mình. Mình xin cảm ơn và tạm biệt :) .