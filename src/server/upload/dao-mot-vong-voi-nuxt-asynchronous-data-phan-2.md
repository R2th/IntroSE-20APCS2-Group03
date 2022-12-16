Tiếp nối ở [bài trước](https://viblo.asia/p/dao-mot-vong-voi-nuxt-yMnKMbWmZ7P) , hôm nay mình sẽ tiếp tục giới thiệu qua với các bạn một số vấn đề của việc sử dụng Nuxt.js. Ở phần này, mình sẽ nói chi tiết về lấy dữ liệu bất đồng bộ trong Nuxt.

![](https://images.viblo.asia/409313a5-2f44-4cb2-ac5a-25f53e1f7123.png)

Ở hình trên, chúng ta đã thấy cách mà Nuxt xử lý các request và đưa ra phản hồi như thế nào. Ta hãy chú ý vào các hook sau liên quan đến vấn đề lấy dữ liệu bất đồng bộ.

* **nuxtServerInit**: Được sử dụng để lấy dữ liệu cho Vuex store, được gọi tại bất kỳ trang nào.
* **fetch**: Được sử dụng để lấy dữ liệu cho Vuex store với dữ liệu, được gọi từ trong một trang.
* **asyncData**: Được dùng để lấy dữ liệu cho `data` của page component.

# nuxtServerInit
Đây là hook được thêm vào ngay đầu quá trình khởi tạo, với mục đích là lấy dữ liệu ban đầu cho Vuex store. Nó được gọi trên server và thực hiện mỗi lần mà bạn tải lại trang. Nuxt gọi `nuxtServerInit` cùng với `context`. Đây là cách mà chúng ta vẫn hay sử dụng khi mà muốn cung cấp trực tiếp dữ liệu cho phía client.

Chúng ta xem ví dụ sau:
```js 
//store/index.js
export const actions = {
    async nuxtServerInit({ commit }) {
        // Call api to get init data from server
        const { data } = await axios.get("/users");
        const index = Math.floor(Math.random() * 10);

        commit('auth/set', data[index]);
    },
};
```

Như ở phẩn lưu ý trong doc của Nuxt có nói rằng:
> Nếu bạn sử dụng Module mode của Vuex store thì chỉ primary module (trong `store/index.js`) mới nhận action này. Nếu các store khác muốn dùng thì phải tự dispatch action đấy.

Và đây là cách mà bạn sử dụng nuxtSererInit các module khác.
```js
// store/index.js
actions: {
    nuxtServerInit ({ dispatch }, context) {
        return Promise.all([
            dispatch('post/nuxtServerInit', context)
        ]);
    }
}
```
# fetch
> `fetch` được sử dụng để nạp dữ liệu vào store trước khi render. Nó giống như `asyncData` ngoại trừ việc nó không set dữ liệu cho component.


![](https://images.viblo.asia/b78121b7-50df-4b62-9908-ffea1a840b65.png)

Như hình trên mô tả chi tiết về một phẩn lifecycle của Nuxt thì `fetch` ở sau `created`. `fetch` được gọi sau khi component instance được tạo từ phía server. Vì vậy, chúng ta có thể sử dụng `this` ở trong `fetch`.

`fetch` cũng được sử dụng để khởi tạo Vuex store trước khi render. Nhưng nó chỉ được áp dụng cho một trang cụ thể. Nó sẽ không được gọi nếu được định nghĩa trên layout hoặc các component của sub-page. 

`fetch` được xác trên một component của trang sẽ được gọi sau khi đã chạy qua tất cả các `middleware` và `validate` cho nên ta chắc chắn rằng các trang này sẽ được hiển thị.

Bằng cách sử dụng `fetch`, chúng ta có thể gọi API trực tiếp từ các layout. Một số trường hợp sử dụng:

* Nạp dữ liệu cấu hình từ back-end trong Nuxt layout để tạo footer và navbar linh hoạt.
* Nạp dữ liệu người dùng trong navbar.
* Nạp dữ liệu liên quan đến `layouts/error.vue`.

Khi nhìn lại hình mô tả ở phần này ta thấy có các `$fetchState`như sau: 

* `$fetchState.pending`: `Boolean`, cho phép hiển thị placeholder khi `fetch` được gọi ở phía client.
* `$fetchState.error`: `null` hoặc `Error`, cho phép bạn hiển thị tin nhắn lỗi.
* `$fetchState.timestamp`: `Integer`, là timestamp (dấu thời gian) của lần nạp dữ liệu cuối cùng.

`fecth` cung cấp cho ta đối tượng `$fetchState` để kiểm tra xem yêu cầu đã kết thúc và quá trình đã thực hiện thành công chưa. Một đối tượng `$fetchState` sẽ có dạng như sau:
```js
$fetchState = {
  pending: true | false,
  error: null | {},
  timestamp: Integer
};
```

Chúng ta có thể theo dõi xem các trạng thái này được sử dụng như nào với ví dụ như sau ở [doc](https://nuxtjs.org/api/pages-fetch) (mình custom lại 1 chút):
```js
// pages/users/_id.vue
<template>
  <div v-if="$fetchState.pending">Fetching user #{{$route.params.id}}...</div>
  <div v-else>
    <h1>{{ user.name }}</h1>
    <pre>{{ user.username }}</pre>
    <pre>{{ user.email }}</pre>

    <p><n-link to="/users">Back to users</n-link></p>
  </div>
</template>

<script>
import axios from '~/utils/axios';
export default {
  name: 'UserDetail',
  layout: 'dashboard',
  data () {
    return {
      user: {}
    }
  },
  async fetch() {
    this.user = await axios.get(`/users/${this.$route.params.id}`);
  }
}
</script>
```
Khi bạn thực hiện điều hướng thì ta có thể thấy `Fetching user #...` ở phía client và không có bị loading khi thực hiện tải lại trang.

# asyncData
Đối với 2 phương thức kể trên thì chúng ta đều thực hiện đưa dữ liệu mong muốn vào Vuex store. Nhưng đôi khi ta không cần thiết sửa dụng store mà bạn chỉ muốn đưa dữ liệu vào `data` của component. Và đây chính là thời điểm mà chúng ta sử dụng đến `asyncData`. Nó sẽ được gọi trước khi render trang và đối tượng mà nó trả về sẽ được merge vào `data` trong component.

Có một chú ý là bạn không thể truy cập `this` ở trong `asyncData` bởi vì nó được gọi trước khi khởi tạo component. Có 2 cách mà Nuxt hỗ trợ chúng ta trong việc sử dụng `asycData` như sau:

* Trả về một `Promise` và sẽ chờ cho đến khi promise được thực hiện trước khi thực hiện render component.

```js
export default {
  asyncData ({ params }) {
    return axios.get(`/posts/${params.id}`)
      .then((res) => {
        return { title: res.data.title }
      })
  }
}
```
* Sử dụng `async/await`

```js
export default {
  async asyncData ({ params }) {
    const { data } = await axios.get(`/posts/${params.id}`)
    return { title: data.title }
  }
}
```
`asyncData` trả dữ liệu về vào `data` của component cho nên để hiển thị ở component thì bạn có thể thực hiện bình thường như cách mà bạn sử dụng `data`. Ngoài ra, bạn cũng có thể dễ dàng sử dụng `req` và `res` để tương tác với request và response của server. Khi bạn cần sử dụng dữ liệu dynamic route thì ở trong `asyncData` cũng cung cấp cho bạn `params` để lấy thông tin cần dùng. Còn đối với việc xử lý các lỗi của server trả về Nuxt cũng cung cấp cho ta phương thức `error(params)` để hiển thị trang lỗi.

# Kết luận
Nội dung bài viết đã đưa ra cho bạn một số cách để lấy dữ liệu từ server mà Nuxt cung cấp cho chúng ta. Toàn bộ các ví dụ code ở trong bài bạn có thể xem ở [đây](https://github.com/hieubt-1409/init-nuxt/commit/733a266c89d36de8022cc1564a4899c45ecf8493) . Cảm ơn bạn đã theo dõi :bowing_woman: 

**Tham khảo**

https://nuxtjs.org/blog/understanding-how-fetch-works-in-nuxt-2-12/
https://nuxtjs.org/guide/async-data