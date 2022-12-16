# Lời mở đầu
Chào mọi người, sau bài viết về Vuejs hôm trước, mình vẫn tiếp tục tìm tòi về nó và có tìm hiểu thêm ông bạn Nuxtjs - một framework được sử dụng để xây dựng các ứng dụng từ Vuejs. 

Nuxt.js là framework được phát triển dựa trên Vuejs. Có thể hình dung Nuxt là phiên bản được thiết lập sẵn để dễ dàng phát triển Universal App hoặc SPA. Do vậy core của Nuxt.js bao gồm Vuejs, Vue Router, VueX (được include chỉ khi bạn sử dụng store), Vue SSR và Vue Meta.

# Nuxt.js LifeCycle Hooks
Như mình đã nói phía trên, Nuxt.js là framework được xây dựng từ Vue.js nên vòng đời của Nuxt sẽ bao gồm vòng đời của Vue và vòng đời của Nuxt trước khi chương trình Vue được chạy. Lược đồ bên dưới hiển thị cách phản hồi và những phương thức được gọi bởi Nuxt.js khi có request đến server hoặc khi người dùng điều hướng thông qua `<nuxt-link>`.
    
Trước khi đi vào nội dung chính của bài viết, chúng ta sẽ dành một chút thời gian để nhìn qua Nuxt Schema/Lifecycle nhé!

![](https://images.viblo.asia/d7ff3501-3762-4357-b36b-2d6f0d12dd66.png)

Theo sơ đồ này, các hook xảy ra theo thứ tự sau: **nuxtServerInit**, **middleware**, **validate** sau đó **asyncData** và **fetch**. Tuy nhiên ở bài viết này, ta chỉ cần tập trung vào ba hooks được thiết kế rõ ràng cho việc xử lý dữ liệu 'bất đồng bộ':
    
* **nuxtServerInit**: Được sử dụng để lấy dữ liệu cho Vuex store, được gọi tại bất kỳ trang nào.
* **fetch**: Được sử dụng để lấy dữ liệu cho Vuex store với dữ liệu, được gọi từ trong một trang.
* **asyncData**: Được dùng để lấy một số dữ liệu và Nuxt.js sẽ hợp nhất nó với dữ liệu trong component.
    
# 1. nuxtServerInit
Đây là một hook mà Nuxt đã chèn vào quá trình khởi tạo, để lấy dữ liệu ban đầu cho VueX store. Nó chỉ được gọi trên máy chủ và được sử dụng để điền dữ liệu lưu trữ cần có ở mỗi lần tải lại trang. Phương thức này là 1 action của VueX, nếu nó được khai báo trong store thì Nuxt.js sẽ gọi action này mỗi khi Nuxt.js bắt đầu lifecycle mới. Do đó phương thức này rất hữu ích khi chúng ta muốn nhận và lưu trữ dữ liệu dùng chung cho tất cả pages từ server vào store của client.
    
Giả sử chúng ta có các phiên ở phía máy chủ và chúng ta có thể truy cập người dùng được kết nối thông qua `req.session.user`. Để cung cấp cho người dùng đã xác thực vào store, chúng ta cập nhật `store/index.js` như sau:
    
```
actions: {
    nuxtServerInit ({ commit }, { req }) {
        if (req.session.user) {
          commit('user', req.session.user)
        }
    }
}
```
Nếu action này trả về Promise thì Nuxt.js sẽ chờ promise đó được giải quyết xong rồi mới tiếp tục chạy phương thức tiếp theo.
    
Tuy nhiên, có chút lưu ý là **nuxtServerInit** chỉ được gọi ở main store nên nếu muốn sử dụng Modules mode cho Vuex thì cần gộp những actions lại. Ví dụ: nếu tôi muốn khởi tạo mọi thứ trong cả module `user` và module `posts`, ta có thể làm như sau:

```
actions: {
    nuxtServerInit ({ dispatch }, context) {
        return Promise.all([
            dispatch('user/nuxtServerInit', context),
            dispatch('posts/nuxtServerInit', context)
        ]);
    }
}
```

# 2. fetch

Phương thức `fetch` được sử dụng để lấy và lưu trữ dữ liệu vào store trước khi hiển thị page, nhưng khác với `nuxtServerInit` là nó sẽ không được gọi nếu được define trên layouts hoặc sub-page components, phương thức này chỉ áp dụng cho 1 page cụ thể.
    
`fetch` được define trên một component của trang sẽ được gọi sau khi đã chạy qua tất cả các middleware() và validate() cho nên ta chắc chắn rằng các trang này sẽ được hiển thị. Điều này làm cho nó rất lý tưởng để fetching expensive data cần thiết cho render page nhưng ta sẽ không muốn thực hiện nó một cách suy đoán.
    
Mặc dù được định nghĩa trong một page component, nó được gọi trước khi component đó được khởi tạo hoàn toàn, vì vậy nó không có quyền truy cập vào data của component đó, hay computed attributes, v.v. Thực tế, điều này sẽ không tham chiếu đến components đó. Thay vào đó, phương thức `fetch` được chuyển context object để bạn có thể truy cập store và các chức năng cần thiết khác.
    
Ví dụ về việc sử dụng phương pháp `fetch` để tìm nạp thông tin của một `product` có `id` cụ thể vào store:
 
```
// pages/products/_id.vue
export default {
    fetch(({ store, params }) {
      if (typeof (store.state.products.byId[params.id]) === 'undefined') {
        return store.dispatch('products/loadProduct', {id: params.id});
      }
    }
  ...
}
```
    
Nếu fetch() trả về Promise thì Nuxt.js sẽ đợi promise đó được giải quyết trước khi hiển thị page.
    
**Note**: Từ phiên bản 2.12 trở lên, fetch có thể được gọi ở bất kỳ Vue component nào đó. Nhưng nó cũng bị khuyến khích không dùng đối với page component nữa rồi, thay vào đó bạn có thể sử dụng middleware(context) cho page. Bạn có thể xem tại đây [The fetch method - Nuxt >= 2.12](https://nuxtjs.org/guides/components-glossary/pages-fetch).
    
Quan sát Nuxt.js LifeCycle Hooks ở phía đầu bài viết. Chúng ta thấy có các $fetchState như sau:
    
* **$fetchState.pending**: `Boolean`, cho phép bạn hiển thị placeholder khi fetch đang được gọi ở phía client-side.
* **$fetchState.error**: `null` hoặc `Error`, cho phép bạn hiển thị error message.
* **$fetchState.timestamp**: `Integer`, là timestamp (dấu thời gian) của lần fetch cuối cùng, hữu ích cho việc caching với tính năng duy trì hoạt động `keep-alive`

fecth đã cung cấp cho ta `$fetchState` object để kiểm tra xem yêu cầu đã kết thúc và quá trình đã thực hiện thành công hay chưa. Một `$fetchState` object sẽ có dạng như sau:

```
$fetchState = {
    pending: true | false,
    error: null | {},
    timestamp: Integer
};
```
    
Ngoài ra thì fetch() cũng đã cung cấp 2 options:
 
* **fetchOnServer**: `Boolean` hoặc `Function` (mặc định: true), gọi fetch() khi server-rendering page.
    
* **fetchDelay**: `Integer` (mặc định: 200), đặt thời gian thực thi tối thiểu tính bằng mili giây (để tránh nhấp nháy nhanh).
    
# 3. asyncData
    
Tất cả các hooks mà mình đã đề cập ở trên đều tập trung vào việc đưa dữ liệu vào store VueX. Nhưng đôi khi lại không cần lưu trữ mà lại chỉ muốn đưa dữ liệu vào data object trong component. `asyncData()` có rất nhiều sự tương đồng với `fetch()` ngoại trừ kết quả được return từ `asyncData` sẽ hợp nhất với data của page component vì vậy phương thức này rất hữu ích nếu bạn không muốn lưu dữ liệu vào store.
    
Chúng ta không thể truy cập `this` ở trong asyncData bởi vì nó được gọi trước khi khởi tạo component. Và Nuxt hỗ trợ chúng ta trong việc sử dụng `asycnData` như sau:
 
1. Trả về một Promise và sẽ chờ cho đến khi `promise` được thực hiện trước khi thực hiện render component.
    
```
export default {
    asyncData ({ params }) {
      return axios.get(`https://my-api/posts/${params.id}`).then(res => {
          return { title: res.data.title }
      })
    }
}
```
    
2. Sử dụng `async/await`
    
```
export default {
    async asyncData({ params }) {
        const { data } = await axios.get(`https://my-api/posts/${params.id}`)
        return { title: data.title }
    }
}
```
    
Kết quả từ async/await sẽ được hợp nhất với dữ liệu. Bạn có thể hiển thị dữ liệu bên trong template của mình.
    
**Ví dụ**: nếu vì lý do nào đó, chúng ta không muốn sử dụng store VueX trong ví dụ phía trên để giữ dữ liệu sản phẩm. Có thể thực hiện nó theo cách này:
    
```
// pages/products/_id.vue
export default {
    asyncData(context) {
      return axios.get(`https://my-api-server/api/products/${params.id}, (response) => {
          return { product: response.data };
      });
    }
    ...
}
```
    
`asyncData` trả dữ liệu về vào data của component cho nên để hiển thị ở component thì bạn có thể thực hiện bình thường như cách mà bạn sử dụng `data`. Ngoài ra, bạn cũng có thể:
* Dễ dàng sử dụng `req` và `res` để tương tác với `request` và `response` của server. 
* Khi bạn cần sử dụng dữ liệu dynamic route thì ở trong `asyncData` cũng cung cấp cho bạn `params` để lấy thông tin cần dùng. 
* Còn đối với việc xử lý các lỗi của server trả về Nuxt cũng cung cấp cho ta phương thức `error(params)` để hiển thị trang lỗi.
    
Vì các component không có phương thức `asyncData`, nên chúng ta không thể trực tiếp tìm nạp data bất đồng bộ phía client trong một component. Để khắc phục hạn chế này, bạn có hai tùy chọn cơ bản như sau: 
    
* Thực hiện lệnh gọi API trong `mounted` hook và set data properties khi được tải. **Nhược điểm**: Không hoạt động đối với kết xuất phía server.
    
* Thực hiện lệnh gọi API trong `asyncData` hoặc các phương thức fetch của page component và chuyển dữ liệu dưới dạng props cho các sub components. Server rendering sẽ hoạt động tốt. **Nhược điểm**: `asyncData` hoặc lần fetch của trang có thể khó đọc hơn vì nó đang tải dữ liệu cho các component khác.
    
# Kết luận
    
Bài viết này mình đã chia sẻ về cách mà Nuxt.js xử lý dữ liệu bất đồng bộ như nào. Thực ra là những gì mình note lại sau vài ngày đọc docs và thực hành nên có thể vẫn còn thiếu và sai sót ở đâu đó, nếu các bạn quan tâm thì hãy để lại comment để chúng ta cùng hiểu rõ hơn về nó nhé =))

Hẹn mọi người ở bài viết sau. Xin cảm ơn!!! (bow)
    
# Tài liệu tham khảo
 
https://nuxtjs.org/guide/async-data#the-asyncdata-method
    
https://viblo.asia/p/dao-mot-vong-voi-nuxt-asynchronous-data-phan-2-OeVKBM4d5kW
    
https://zendev.com/2018/06/07/async-data-options-in-vue-nuxt.html