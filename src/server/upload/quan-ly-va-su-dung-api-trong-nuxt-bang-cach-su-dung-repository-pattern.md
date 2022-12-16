### Mở đầu năm mới, à nhầm, mở đầu bài viết

Cái tên [NuxtJS](https://laptrinhx.com/10-ly-do-su-dung-nuxt-js-cho-ung-dung-web-cua-ban-1747650485/) chắc hẳn cũng không còn xa lạ gì với những bạn yêu thích [VueJS](https://vi.vuejs.org/v2/guide/) nữa, đương nhiên mình cũng là một chàng trai dành tình yêu to lớn cho frameworks này. :heart_eyes:

Thế nhưng, quay lại những ngày đầu bắt đầu với NuxtJS, mình quả thực gặp rất nhiều khó khăn để nắm bắt và làm quen với vô vàn thứ có trong Nuxt. Song, khó khăn nhất hồi đó với mình là việc quản lý và sử dụng API sao cho hiệu quả và thông minh nhất trong dự án. Rồi sau quá trình ngâm cứu và tìm tòi, mình đã tìm ra một cách rất tốt để giải quyết bài toán đó: [Repository Pattern](https://deviq.com/design-patterns/repository-pattern).

Tuy là mình có đính kèm link đọc thêm cho mẫu thiết kế này nhưng bản thân mình thấy nó hơi khó hiểu nên nếu các bạn muốn hiểu nhanh và dùng ngay thì chúng ta cùng bắt đầu nhé! :satisfied:

# Hiểu biết tiên quyết
* Kiến thức cơ bản về các mẫu thiết kế, đặc biệt là mẫu kho lưu trữ
* Kiến thức cơ bản về Nuxtjs
* Kiến thức cơ bản về JavaScript

Đừng lo nếu bạn chưa hiểu rõ về kiến thức nào đó trong danh sách trên, bạn hoàn toàn có thể cập nhật thêm nó sau khi đọc xong bài viết của mình. :stuck_out_tongue_closed_eyes:

Khi làm việc và sử dụng API, với tư cách là những lập trình viên tương lai, ta cần phải chú trọng tới những phương pháp tốt, "chuẩn nghành" nhất để dễ dàng debug, code ít hơn cũng như đảm bảo được các nguyên tắc trong lập trình (như DRY)...

Trong bài này, ta chọn phương pháp/mẫu thiết kế Repository đồng thời tạo ra plugin cho Nuxtjs để phục vụ API trong ứng dụng của riêng mình!

Repository chắc chắn là mẫu thiết kế "xịn sò", phổ biến nhất trong các ứng dụng doanh nghiệp. Nó giúp lập trình viên hạn chế tối đa việc tiếp xúc trực tiếp với dữ liệu, cũng như tạo ra các lớp mới cho các hoạt động CSDL, logic nghiệp vụ hay giao diện người dùng.

# Các bước thực hiện
Mình không muốn nói quá nhiều lý thuyết dài dòng và khó hiểu, nên mình sẽ đi thẳng vào vấn đề nha. Nhìn chung thì chúng ta sẽ cần thực hiện một số bước cơ bản sau đây:

1. Tạo thư mục Repository.
1. Tạo một lớp Repository chung nơi chứa các repositories riêng lẻ. *Ví dụ: Repository.js*
1. Tạo một plugin cho Nuxtjs.
1. Cài cắm lớp Repository chung vào plugin NuxtJs.
1. Thêm plugin vừa tạo vào trong file nuxt.config.js
1. Tạo các repositories riêng lẻ bên trong thư mục Repository.
1. Nhập tất cả các repositories riêng lẻ vào trong lớp Repository chung ở trên. *Ví dụ: Đưa PostRepository.js vào trong lớp Repository chung (Repository.js).*
1. Sử dụng các repositories đã tạo bên trong Vuex Store hoặc các Vue components của bạn (đại loại là nó đã sử dụng trong code được rồi nhé).

Chốt lại là chúng ta có **8 bước cơ bản** như vậy. Vậy giờ ta cùng đi sâu vào từng bước nhé. :sunglasses:

## 1. Tạo thư mục Repository
Dễ như ăn cháo, tạo folder trong Project thì có khó gì!
```
cd src && mkdir repositories
```

## 2. Tạo lớp Repository chung 
Lớp này đóng vai trò như một điểm đầu ra duy nhất cho tất cả các repositories riêng lẻ mà chúng ta tạo sau này. Bất cứ khi nào bạn tạo ra 1 repository mới, bạn chỉ cần đưa nó vào trong lớp Repository chung là xong ngay! Quá tuyệt! :100:

```
cd repositories
touch Repository.js
```

## 3. Tạo plugin Nuxtjs
Nếu bạn chưa biết plugin cho Nuxtjs là gì thì bạn có thể đọc thêm [tại đây](https://nuxtjs.org/docs/2.x/directory-structure/plugins/). Hiểu đơn giản là plugins sẽ được thực thi trước khi ứng dụng gốc được chạy, đây chính là nơi bạn **"cài cắm" (inject)** các biến, hằng số, hàm, lớp... vào ứng dụng của mình để sử dụng lại một cách dễ dàng ở bất cứ đâu. Thấy phép thuật chưa????? :joy:

```
cd plugins && touch repositories.js
```

## 4. Cài cắm lớp Repository chung vào plugin NuxtJs
Ở đây mình sẽ sử dụng hàm inject để "cài" lớp Repository vào context API đóng gói trong NuxtJs, các bạn nên đọc thêm về NuxtJs Context [tại đây](https://nuxtjs.org/docs/2.x/internals-glossary/context) để hiểu hơn nó nha. Nhìn chung context API được hỗ trợ bởi Nuxt để đóng gói và cung cấp các phương thức, tham số bổ sung trong suốt vòng đời của Vue Component. Đó là lý do bạn có thể sử dụng được các phương thức của mình trong repositories ở bất cứ đâu trong 1 component. 

```js
import createRepository from '~/repositories/Repository'

export default (ctx, inject) => {
  inject('repositories', createRepository(ctx.$axios))
}
```

Dễ thấy ở trên ta đã lấy hết mọi thứ trong Repository chung đã tạo để đưa vào trong biến $repositories của context API. Thế là từ giờ, ta chỉ cần sử dụng biến $repositories là có thể truy cập vào bên trong lớp Repository rồi!!!

## 5. Thêm plugin vừa tạo vào trong file nuxt.config.js
Nếu các bạn đã tìm hiểu về Nuxt thì đây chắc chắn là bước phải làm và dễ hiểu để có thể sử dụng được plugin mình đã tạo ở bước trước. :satisfied:

```js
require('dotenv').config()
export default {
  mode: 'universal',
  
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/repositories.js'],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com'
  },
}
```

## 6. Tạo thử một repository riêng lẻ
Ở đây mình sẽ thử tạo ra một repository nhỏ là PromotionRepository bên trong thư mục Repository. Lớp này sẽ có một số hàm cơ bản thực hiện việc gọi API xuống Back-end và trả về các promise của axios.

```
cd repositories && touch PromotionRepository.js
```

Cụ tỉ code bên trong lớp PromotionRepository sẽ như sau:

```js
const resource = '/posts'
export default ($axios) => ({
  all() {
    return $axios.get(`${resource}`)
  },

  show(id) {
    return $axios.get(`${resource}/${id}`)
  },

  create(payload) {
    return $axios.post(`${resource}`, payload)
  },

  update(id, payload) {
    return $axios.post(`${resource}/${id}`, payload)
  },

  delete(id) {
    return $axios.delete(`${resource}/${id}`)
  }
})
```

## 7. Nhập tất cả các repositories riêng lẻ vào trong lớp Repository chung
Giả sử chúng ta đã tạo ra rất nhiều các repositories riêng lẻ để phục vụ các mục đích riêng biệt, giờ đây là lúc đưa chúng về "Một nhà" như Da LAB nhé! :laughing:

Nhìn chung thì cái file Repository.js của chúng ta sẽ trông như sau:
```js
import PostRepository from '~/repositories/PostRepository'
import UserRepository from '~/repositories/UserRepository'
import CommentRepository from '~/repositories/CommentRepository'
import AlbumRepository from '~/repositories/AlbumRepository'
import PhotoRepository from '~/repositories/PhotoRepository'
import TodoRepository from '~/repositories/TodoRepository'

export default ($axios) => ({
  post: PostRepository($axios),
  user: UserRepository($axios),
  comment: CommentRepository($axios),
  album: AlbumRepository($axios),
  photo: PhotoRepository($axios),
  todo: TodoRepository($axios)
})
```

Đương nhiên là ta phải lấy $axios từ context API của Nuxtjs để truyền xuống cho các repositories vì chúng phải có axios mới gọi được API đúng không các bạn? :ok_hand:

## 8.1. Sử dụng trong Vuex Store
Nếu bạn nào chưa biết Vuex Store thì có thể tìm hiểu thêm [tại đây](https://viblo.asia/p/vuex-va-vi-du-don-gian-GrLZDpzgZk0). Đại loại, nó là 1 framework cung cấp mô hình quản lý và lưu trữ dữ liệu tập trung cho toàn bộ các Vue Components trong ứng dụng nha.

Thì như mình đã nói, ta đã inject lớp Repository vào $repositories trong NuxtJs nên giờ trong Vuex ta sẽ có thể sử dụng như code dưới đây *(ví dụ với file posts.js bên trong thư mục store của project)*:
```js
export const state = () => ({
  posts: [],
  post: []
})

export const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts
  },
  SET_POST(state, post) {
    state.post = post
  }
}

export const actions = {
  async get_posts({ commit }) {
    const res = await this.$repositories.post.all()
    const { status, data } = res
    if (status === 200 && data.success && data.code) {
      const { data } = data
      commit('SET_POSTS', data)
    } else {
      // Handle error here
    }
  },

  async get_post({ commit }, post) {
    const res = await this.$repositories.post.show(post)
    const { status, data } = res
    if (status === 200 && data.success && data.code) {
      const { data } = data
      commit('SET_POST', data)
    } else {
      // Handle error here
    }
  },

  async create_post({ commit }, id, post) {
    const res = await this.$repositories.post.create(id, post)
    const { status, data } = res
    if (status === 200 && data.success && data.code) {
      const { data } = data
      commit('SET_POST', data)
    } else {
      // Handle error here
    }
  },

  async update_post({ commit }, id, post) {
    const res = await this.$repositories.post.update(id, post)
    const { status, data } = res
    if (status === 200 && data.success && data.code) {
      const { data } = data
      commit('SET_POST', data)
    } else {
      // Handle error here
    }
  },

  async delete_post({ commit }, id) {
    const res = await this.$repositories.post.delete(id)
    const { status, data } = res
    if (status === 200 && data.success && data.code) {
      // Remove from store
    } else {
      // Handle error here
    }
  }
}
```

## 8.2. Sử dụng trong Vue Component
Đương nhiên là ta có thể lấy ngay $repositories ở bất cứ các lifecycle methods nào trong Vue Component để sử dụng nó, nhưng mà điều này sẽ phá vỡ việc phân chia các lớp giao tiếp trong ứng dụng. Vì thế ta chỉ nên sử dụng Repository thông qua Vuex Store thôi nha! :sneezing_face::sneezing_face:

Thì mọi thứ thật là đơn giản như sau:
```js
<template>
  <div class="container-fluid">
    <div class="p-4 justify-content-center">
      <logo />
    </div>
    <div class="row">
      <post v-for="(post, i) in posts" :key="i" :post="post" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '~/components/Logo.vue'
import Post from '~/components/Post.vue'
export default {
  components: {
    Logo,
    Post
  },
  async fetch({ store }) {
    await store.dispatch('post/get_posts')
  },
  computed: {
    ...mapState({
      posts: (state) => {
        return state.post.posts
      }
    })
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
```

### Kết lại thì...
Rõ ràng thực tế chỉ ra rằng việc sử dụng mẫu thiết kế Repository trong cấu trúc sử dụng API sẽ giúp code của bạn trở nên "chất" và đẹp hơn bao giờ hết!

Mình thực sự mong bài viết sẽ "chỉ lối" cho những bạn nào còn đang gặp vấn đề với API trong một ứng dụng Vue (đặc biệt là NuxtJs) như cách mà Tố Hữu đã "bừng nắng hạ". :joy:

Cảm ơn các bạn đã đọc hết bài viết của mình ạ! Chúc các bạn một năm mới thật hạnh phúc, khỏe mạnh và thành công nhé!

---
*Bài viết gốc mình đã tham khảo [tại đây](https://medium.com/js-dojo/consuming-apis-in-nuxt-using-the-repository-pattern-8a13ea57d520).*