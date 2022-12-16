Trong khi Vuejs là framework được xây dựng bởi Javascript được sử dụng cho client-side app. Nuxt.js là framework được phát triển dựa trên Vue.js. Có thể hình dung Nuxt là phiên bản được thiết lập sẵn để dễ dàng phát triển universal app hoặc spa. Do vậy core của Nuxt.js bao gồm Vue.js, Vue Router, VueX, Vue SSR và Vue Meta.
### Nuxt Schema/Lifecycle
Như đã nói ở trên, Nuxt.js là framework được xây dựng từ Vue.js nên vòng đời của Nuxt sẽ bao gồm vòng đời của Vue. Trong bài viết này chúng ta sẽ tập trung tìm hiểu vòng đời của Nuxt.js trước khi chạy chương trình Vue.

Lược đồ bên dưới hiển thị những phương thức được gọi bởi Nuxt.js khi được gọi bởi server hoặc khi người dùng điều hướng thông qua nuxt-link.
![](https://images.viblo.asia/1586d1be-1ea0-4b58-9fed-43da881652b4.png)

Bởi vì đây là vòng đời được khởi chạy trước khi chạy chương trình vue nên bạn có thể hiểu nó chạy trước cả khi khai báo page component nên this sẽ không phải của vue instance. Bù lại các phương thức này đều nhận biến context là tham số đầu vào.

### nuxtServerInit
Phương thức này là 1 action của VueX, nếu nó được khai báo trong store thì Nuxt.js sẽ gọi action này mỗi khi Nuxt.js bắt đầu lifecycle mới. Do đó phương thức này rất hữu ích khi chúng ta muốn nhận và lưu trữ dữ liệu dùng chung cho tất cả pages từ server vào store của client.

```
// store/index.js
actions: {
  nuxtServerInit({ commit }, { req }) {
    if (req.session.user) {
      commit('setUser', req.session.user);
      return axios.get(`/users/${req.session.user}`).then((response) =>{
        commit('currentUserData', response.data);
      });
    }
  },
}
```

Lưu ý là **nuxtServerInit** chỉ được gọi ở main store.

### Middleware
**Middleware** cho phép bạn khai báo và thực thi các hàm trước khi khởi tạo page.

Không giống như nuxtServerInit (chạy cho tất cả các pages), bạn có thể sử dụng global middleware trong nuxt.config.js cho tất cả pages, hoặc sử dụng cho page cụ thể bằng phương thức middleware trong layout/page đó.

Đặc điểm của **middleware** là chúng ta có thể tái sử dụng được code vì vậy đây là nơi tốt nhất để kiểm tra đăng nhập hoặc lấy dữ liệu chung cho các pages cần sử dụng.

```
// middleware/check-authenticate.js
export default function({ store, redirect }) {
  if (!store.state.authenticated) {
    return redirect('/login');
  }
}
```
Vì có thể đặt middleware ở nhiều vị trí nên Nuxt.js quy ước thứ tự ưu tiên thực thi middleware như sau:

1. nuxt.config.js
2. Layouts có middleware
3. Pages có middleware

### Validate()
**Validate()** được gọi trước mỗi lần chuyển đến route mới. Đây là phương thức phù hợp nhất để kiểm tra tham số và xác nhận điều hướng.

Theo mặc định, Nuxt.js hiển thị trang 404 nếu trả về false và trang 500 nếu trả về Error hoặc xuất hiện lỗi
```
validate({ params, query, store }) {
  return true; // Tạo page component
  return false; // Dừng render và hiển thị 404
  throw new Error('Errors'); //hiển thị 500
}
```

### Fetch()
Phương thức fetch được sử dụng để lấy và lưu trữ dữ liệu vào store trước khi hiển thị page, nhưng khác với nuxtServerInit là thay vì áp dụng cho toàn bộ pages, phương thức này chỉ áp dụng cho 1 page cụ thể.

Nếu fetch() trả về Promise thì Nuxt.js sẽ đợi promise đó được giải quyết trước khi hiển thị page.
```
export default {
  async fetch (context) {
    await context.$store.dispatch('actions');
}
```

### AyncData()
AyncData thường được gọi nếu bạn chỉ muốn lấy dữ liệu từ server và hiển thị ra component luôn, không lưu trữ lại trong store.
```
export default {
   async asyncData(context) {
      return await context.$store.dispatch('actions');
    }
}
```

### Tổng kết
Vậy là chúng ta đã cùng tìm hiểu về vòng đời của Nuxt.js. Hy vọng sau bài này các bạn có thêm nhiều lựa chọn để giải quyết vấn đề trong ứng dụng Nuxt của mình.

### Nguồn tham khảo
* https://nuxtjs.org
* https://viblo.asia/p/phan-biet-giua-asyncdata-va-fetch-trong-nuxtjs-Qpmley3olrd
* https://zendev.com/2018/06/07/async-data-options-in-vue-nuxt.html
* https://levelup.gitconnected.com/the-complete-nuxt-guide-940751e1a6a5