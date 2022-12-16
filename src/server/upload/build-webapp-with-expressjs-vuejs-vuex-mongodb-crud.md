## Mở đầu
Như tiêu đề bài viết, nhân tiện mình đang tim hiểu về nodejs và dự án đang làm sử dụng vuejs thì bài viết lần này mình xin chia sẻ cách kết hợp giữa ExpressJS - VueJS - MongoDB để build webapp.
## A. Build server với Express
- Sử dụng đoạn code server như sau.
```
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
var Post = require("./post");

app.get('/posts', (req, res) => {
  Post.find({}, function (error, posts) {
	  if (error) { console.error(error); }
	  res.send({
			posts: posts
		})
	}).sort({_id:-1})
})

app.post('/create', (req, res) => {
	var title = req.body.title;
	var description = req.body.description;
	var newPost = new Post({
		title: title,
		description: description
	})

	newPost.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
})

app.post('/posts/:id', (req, res) => {
	Post.findById(req.params.id, function (error, post) {
	  if (error) { console.error(error); }

	  post.title = req.body.title
	  post.description = req.body.description
	  post.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true
			})
		})
	})
})

app.get('/posts/:id', (req, res) => {
	Post.remove({
		_id: req.params.id
	}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

mongoose.connect('mongodb://localhost:27017/mevn', { useNewUrlParser: true });
mongoose.connection.once("open", function(callback){
  console.log("Connection Succeeded");
});

app.listen(process.env.PORT || 3000)

```
Đoạn code trên cũng tương đối dễ hiểu, mình chỉ tóm tắt lại một vài cái mình dùng:
- body-parser: Đây là lớp trung gian, xỷ lý JSON, text và mã hóa URL.
- mongoose: kết nối server với database của mongodb
```
mongoose.connect('mongodb://localhost:27017/mevn', { useNewUrlParser: true });
mongoose.connection.once("open", function(callback){
  console.log("Connection Succeeded");
});

app.listen(process.env.PORT || 3000)
```
Thiết lập model Post
```
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: String,
    description: String
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;
```

Đây là file package.json để bạn có thể cấu trúc lại thư mục của mình cũng như là các package cần cài đặt.
```
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "./node_modules/nodemon/bin/nodemon.js src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.18.1",
    "cors": "^2.8.4",
    "express": "^4.15.4",
    "mongoose": "^5.2.8",
    "morgan": "^1.8.2",
    "nodemon": "^1.12.1"
  }
}
```
Vậy là build server vậy đã xong, bước tiếp theo ta sẽ build client sử dụng VueJS (Vuex)
## B. Build client với VueJS
Trước tiên hãy xem qua cấu trúc thư mục của folder client (mình dụng vue@cli và cài đặt ở chế độ cơ bản nhất)
![](https://images.viblo.asia/00f8f3b2-9aaf-481a-bbc1-44cd1c5d0f15.png)
Và điểm qua cách package ta sẽ sử dụng nhé
```
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  },
  "dependencies": {
    "axios": "^0.18.0",
    "vue": "^2.5.17",
    "vue-axios": "^2.1.3",
    "vue-router": "^3.0.1",
    "vue-sweetalert2": "^1.5.2",
    "vuex": "^3.0.1"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.0.1",
    "@vue/cli-service": "^3.0.1",
    "vue-template-compiler": "^2.5.17"
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```
Mình sẽ sử dung vuex theo dạng chia modules vì theo mình biết thực tế nếu những dự án lớn một chút thì chia theo modules sẽ dễ quản lý và nhìn các dòng code trông cũng `sexy` hơn.
```
import Vue from 'vue'
import Vuex from 'vuex'
import post from './modules/post'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        post
    },
    strict: true
})

export default store
```
Module `post` sẽ được import vào store
```
import Http from '@/Http'

const state = {
    posts: [],
    post: {}
}

const getters = {
    getAllPosts: (state) => state.posts,
    getPost: (state) => state.post
}

const actions = {
    getPosts(context) {
        Http.get('/posts')
        .then(response => {
            context.commit('setPosts', response.data.posts);
        });
    },
    createPost(context, obj) {
        return new Promise((res, rej) => {
            Http.post('/create', obj)
            .then(response => {
                res(response);
            })
        })
    },
    updatePost(context, obj) {
        return new Promise((res, rej) => {
            Http.post('/posts/' + obj._id, obj)
            .then(response => {
                res(response);
            })
        })
    },
    getPost(context, id) {
        return new Promise((res, rej) => {
            Http.get('/post/' + id)
            .then(response => {
                res(response.data)
            })
        })
    },
    deletePost(context, id) {
        return new Promise((res, rej) => {
            Http.get('/posts/' + id)
            .then(response => {
                res(response)
            })
        })
    }
}

const mutations = {
    setPosts(state, posts) {
        state.posts = posts;
    },
    setPost(state, post) {
        state.post = post
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}
```
Vậy để chia theo được đúng nghĩa module thì trong module đó ta phải thêm gía trị `namespaced: true`, điều này mang ý nghĩa như thế nào? Gỉa sử các actions trong các modules có tên giống nhau thì mình sẽ không thể gọi được hay thậm chí nói chính xác hơn là vuex sẽ không hiểu rằng bạn muốn gọi action nào. Bởi vậy thay vì ta gọi `this.$store.dispatch('methodName')` thì ta sẽ ghi thành `this.$store.dispatch('moduleName/methodName')` 

File `router.js`
```
import Vue from 'vue'
import Router from 'vue-router'
import ActionPost from './components/post/ActionPost'
import Posts from './components/post/Posts'
import Home from './components/home/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/posts/create',
      component: ActionPost,
      name: 'create'
    },
    {
      path: '/posts/:id/edit',
      component: ActionPost,
      name: 'edit'
    }
  ]
})
```
Ở đây mình sẽ set cho `Create`, `Update` sẽ sử dụng chung 1 component nên trong router mình chỉ cần set 2 path khác nhau là được

Điểm qua file `Http.js`
```
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const Http = {
    init() {
        Vue.use(VueAxios, axios)
        Vue.axios.defaults.baseURL = process.env.URL | 'http://localhost:3000'
    },

    get(url) {
        return Vue.axios
            .get(`${url}`)
            .catch((error) => {
                throw new Error(`[Error] Http ${error}`)
            })
    },

    post(resource, params) {
        return Vue.axios.post(`${resource}`, params)
    }
}

export default Http;
```
Nhìn sơ các bạn cũng biết để làm gì rồi đúng không? Cách làm việc của nó là nó sẽ kết nối đến server, mình override lại axios để sử dụng một cách thuận tiện nhất.

Giờ hãy xem file `main.js` và `App.vue`
```
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import Http from './Http';
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)
Vue.config.productionTip = false
Http.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```
Dùng gì thì cho vào `main.js` và đừng quên gọi `Http.init()` nhé.
```
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
```
Khi Vue@cli được khởi tạo thì cũng tạo ra trong folder một file `index.html` bạn thêm 3 dòng này vào thẻ head để sử dụng được bootstrap nhanh nhất nhé (nhớ rằng import lúc làm practice thôi nhé, project thật thì đừng làm không là ăn X đấy nhé :D ) 
```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
```
Râu ria đã xong bây giờ ta sẽ vào từng component để làm viêc. Cấu trúc folder của components theo mình thì nên chia theo `components/name-folder-component/list-components` thế này để dễ quản lý nhé, có nhiều người cho hết component vào trong folder components làm rất khó nhìn.

Ở trong home mình redirect sang `posts` luôn vì ở đoạn `/` cũng chả có gì mà cho thêm giao diện thì cũng chả biết cho gì :D
```
<template>
  <div class="container">
  </div>
</template>

<script>
  export default {
    created() {
      this.$router.push({name:'posts'})
    }
  }
</script>
```

file `Posts.vue`
```
<template>
  <div class="container">
    <h1>List Post</h1>
    <div>
      <div class="text-center">
        <router-link :to="{ name: 'create' }" class="btn btn-primary">Add Post</router-link>
      </div>
      <table class="table table-striped text-center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th width="20%">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts">
            <td>{{ post.title }}</td>
            <td>{{ post.description }}</td>
            <td>
              <router-link :to="{ name: 'edit', params: { id: post._id } }" class="btn btn-sm btn-success col-md-5">Edit</router-link>
              <a href="javascript:;" @click="deletePost(post._id)" class="btn btn-sm btn-warning col-md-offset-1 col-md-5">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
  name: 'posts',
  data () {
    return {
    }
  },
  mounted () {
    this.$store.dispatch('post/getPosts');
  },
  computed: {
    ...mapGetters({
      posts: 'post/getAllPosts'
    })
  },
  methods: {
      deletePost (id) {
        let $this = this;
        $this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it?'
        }).then(function () {
          $this.$store.dispatch('post/deletePost', id)
          .then(res => {
            $this.$router.push({name: 'home'})
          })
        })
      }
    }
  }
</script>
```
- Sweatalert thì chắc mọi người dùng nhiều rồi, không cần phải nói gì về package tuyệt vời này.
- code cũng tương đối rõ ràng :D bạn chỉ cần chú ý đoạn gọi trong store thì nhớ thêm tên module nhé, bởi vì mình đã set `namespaced: true` trong module rồi mà
- Giao diện thì nó hơi tệ thế này :))
![](https://images.viblo.asia/68cb3cd5-2aa6-41c6-a56b-4e49f0ee9881.png)
- Ở trang list này mình có làm thêm cái `delete` nữa nhé, trông nó khá ổn đấy.
![](https://images.viblo.asia/e18a0982-8c8d-44c6-b092-6186cb1d53df.png)
file `ActionPost.vue` (Update, Create)
```
<template>
  <div class="container">
    <h1 v-if="!id">Create Post</h1>
    <h1 v-else>Edit Post ({{ obj._id }})</h1>
    <div class="form">
      <div>
        <input class="form-control" type="text" name="title" placeholder="TITLE" v-model="obj.title">
      </div><br/>
      <div>
        <textarea class="form-control" rows="15" cols="15" placeholder="DESCRIPTION" v-model="obj.description"></textarea>
      </div><br/>
      <div>
        <button class="app_post_btn btn btn-default" @click="create" v-if="!id">Create</button>
        <button class="app_post_btn btn btn-default" @click="update" v-else>Update</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      obj: {
        title: '',
        description: '',
      },
      id: ''
    }
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.$store.dispatch('post/getPost', this.id)
      .then(res => {
        Object.assign(this.obj, res)
      })
    }
  },
  methods: {
    create () {
      this.$store.dispatch('post/createPost', this.obj)
        .then(res => {
          this.$swal(
            'Great!',
            `Your post has been created!`,
            'success'
          )
          this.$router.push({name: 'posts'})
        })

    },
    update () {
      this.$store.dispatch('post/updatePost', this.obj, this.id)
        .then(res => {
          this.$swal(
            'Great!',
            `Your post has been updated!`,
            'success'
          )
          this.$router.push({name: 'posts'})
        })
    }
  }
}
</script>
```
- Phần này thì lại chỉ cần quan tâm lúc edit
+ khi bạn click vào edit ở trang list thì nó sẽ redirect sang trang chi tiết kèm 1 cái `_id` (id này đươc mặc định khi tạo mới một record trong mongodb), để bắt được `_id` này mình sẽ làm nó trong `Lifecycle` `created()` và request lên server để lấy ra object ứng với `_id` đó, vậy để giá trị này được import vào ô input thì mình sẽ sử dụng Object.assign (trong vuex có sử dụng set get nhưng mình thấy không hay lắm)
+ Và về cơ bản thì nó sẽ ra thế này (create chỉ khác tí thôi)
![](https://images.viblo.asia/e686225b-95bd-4b96-9c70-69295a352a0d.png)

## Kết thúc
Trên đây là những chia sẻ của mình về bài `Build webapp with ExpressJS - VueJS (Vuex) - MongoDB (CRUD)`, Những kiến thức này mình chia sẻ ở mức cơ bản nhưng tương đối đầy đủ, nếu bạn muốn sâu hơn thì làm nhiều hơn vào nhé :D Hi vọng có thể giúp đỡ được các bạn phần nào.