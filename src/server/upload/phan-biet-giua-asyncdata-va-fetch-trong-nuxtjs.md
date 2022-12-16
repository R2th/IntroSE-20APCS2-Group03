## Mở đầu
   Khi làm việc với nuxtJS bạn sẽ đụng tới hai khái niệm này là **fetch** và **asyncData**. Hai phương thức này giống nhau về cách sử dụng đó là cho phép xử lý dự kiện bất đồng bộ và nhận kết quả trả về và có một tham số đầu vào là context (trong context có lưu trữ các biến store, params, isDev,…). Khác nhau của hai phương thức nào là mục đích sử dụng. Cả **fetch** và **asyncData** đều được gọi một lần duy nhất (lần đầu tiên khi request trực tiếp đến server) và được gọi mổi lần ở client khi chuyển tới page tương ứng.
   
   
![](https://images.viblo.asia/cea16024-e6f9-4725-a28b-65db3b597a8a.png)

## Fetch
Mục đích là lấy dữ liệu từ api và cập nhập vào lại trong store của ứng dụng, từ đó mới lấy dữ liệu từ store ra dùng, hàm này không trả về dữ liệu.
```js
export default {
  async fetch (context) {
    await context.$store.dispatch('actions');
}
```
#### Một số lưu ý như sau:
1. Khi gọi API hoặc gọi actions trong fetch thì đều phải xử lý bất đồng bộ **async / await**.
2. Fetch có thể sử dụng ở cả page component và các components.
3. Có sử dụng **this** và có thể nhận **context** truyền vào.
4. Fetch gọi ở server-side một lần và mọi lúc ở client-side khi route thay đổi.

## AsyncData
Cũng lấy dữ liệu từ api, nhưng không cập nhật vào store, mà hàm này trả về là object, giá trị của object này sẽ được sử dụng trong component luôn không cập nhật trong store và giá trị này sẽ được merge với giá trị ban đầu mà bạn khai báo trong thuộc tính data. **asyncData** thường được gọi nếu bạn chỉ muốn lấy dữ liệu từ server và hiển thị ra component luôn, không lưu trữ lại trong store.
```js
export default {
    asyncData (context) {
      return await context.$store.dispatch('actions');
    }
}
```
#### Một số lưu ý như sau:
1. Khi gọi API hoặc gội actions trong asyncData thì đều phải xử lý bất đồng bộ **async / await**.
2. AsyncData chỉ có thể được sử dụng trong các page component.
3. AsyncData được gọi trước fetch và được gọi một lần ở phía server-side và mỗi lần trước khi router được thay đổi ở phía client-side.
4. AsyncData lấy context làm đối số đầu tiên và không có quyền truy cập bằng **this** của component instance

-----
Như vậy qua bài viết này mình cũng đã tìm hiểu được sự giống nhau cũng như khác nhau giữa hai phương thức fetch và asyncData. Khi nào nên sử dụng phương thức nào. Mong sẽ giúp ích được cho các bạn ít nhiều, cảm ơn các bạn đã đọc bài viết của mình!

Tài liệu tham khảo:
1. https://medium.com/@nestsera/nuxtjs-lifecycle-8a822af2c5a8
2. https://nuxtjs.org/blog/understanding-how-fetch-works-in-nuxt-2-12/
3. https://morioh.com/p/289c1f5b44ee