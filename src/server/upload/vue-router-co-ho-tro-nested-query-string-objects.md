Chắc không cần nói nhiều các bạn cũng đã biết về module [`vue-router`](https://router.vuejs.org/), một thư viện router official dành cho Vue. 

Với Vue-router bạn có thể dễ dàng tạo ra một thẻ liên kết đến trang khác dễ dàng thông qua một built-in component `<router-link>. Ví dụ:

```html
<router-link to="{name: 'Home', query: { q: 'viblo' }}">Home<router-link>
```
Vue-router sẽ compile component trên thành một thẻ html như sau:

```html
<a href="/?q=viblo">Home</a>
```

Thật dễ dàng phải không nào.

Vậy vấn đề là với những query phứt tạp hơn đòi hỏi lồng ghép các giá trị trong objects thay vì string thì phải làm thế nào. Dĩ nhiên, bạn có thể "flatten" cái object đó thành 1 obect 1 cấp duy nhất. Nhưng nếu object quá phứt tạp thì việc chuyển đổi qua lại giữa các tên query thành 1 object route như ban đầu cũng sẽ tốn kha khá dòng code ko đáng có, và nó làm code của bạn trở nên xấu xí đi.

Ví dụ:
```html
<router-link 
  to="{
    name: 'Home', 
    query: {
      q: 'viblo',
      date: {
        from: '2020-01-01',
        to: '2020-02-20',
      },
      status: ['Public', 'Protected'],
    }
  }">
  Home
<router-link>
```
Mặc định Vue-router sẽ compile route trên thành như sau
```
localhost:3000/?q=viblo&date=%5Bobject%20Object%5D&status=Public&status=Protected
```

Object `date` bị `toString()` một cách ko thuơng tiếc và giá trị nhận được chỉ là `"[object Object]"` 

_Vậy có cách nào truyền đi được 1 object trên query URL không?_

__Có!__ Câu trả lời của bạn là __[parseQuery / stringifyQuery](https://router.vuejs.org/api/#parsequery-stringifyquery)__ nhưng trên document của Vue-router không hề hướng dẫn cách thức sử dụng. Bài viết này sẽ hướng dẫn các bạn cách implement.

Đầu tiên bạn cần cài một thư viện stringify query có hỗ trợ nested object.

Điển hình ở đây có [qs](https://github.com/ljharb/qs) với dung lượng chỉ hơn 3KB (sau khi gzip).

```shell
$ npm install qs
# or
$ yarn add qs
```
Document chỉ đề cập `parseQuery` và `stringifyQuery` là `Function` nhưng lại không chỉ ra các tham số và kiểu dữ liệu trả về cũng như cách thức nó hoạt động.

Ở đây mình giả sữ `parseQuery` receives một `String` và `stringifyQuery` receives mộ `Object`. Bạn có thể viết file router như bên dưới.

```router/index.js
import qs from 'qs';

const router = new Router({
    routes: [
        // App routes go here...
    ],
    parseQuery(query) {
        return qs.parse(query);
    },
    stringifyQuery(query) {
        var result = qs.stringify(query);

        return result ? ('?' + result) : '';
    }
});
```

Như vậy route trên sẽ được compile ra thành đường dẫn như sau:
```
http://localhost:3000/?q=viblo&date%5Bfrom%5D=2020-01-01&date%5Bto%5D=2020-02-20&status%5B0%5D=Public&status%5B1%5D=Protected
```
Như vậy việc lấy lại các object, mảng truyền đi trên URL trở nên đơn giản hơn và gọn gàng hơn rất nhiều.

Ở đây mình có 1 lưu ý nhỏ cho các bạn dùng [Nuxt.js](https://nuxtjs.org), Nuxt cũng mặc định dùng Vue-router, bạn sẽ phải config đoạn `parseQuery` và `stringifyQuery` đó bên trong [`nuxt.config.js`](https://nuxtjs.org/api/configuration-router#parsequery-stringifyquery).

```nuxt.config.js
export default {
  router: {
    parseQuery(query) {
      return require("qs").parse(query);
    },
    stringifyQuery(query) {
      var result = require("qs").stringify(query);
      return result ? "?" + result : "";
    }
  }
};
```
Vậy thì có gì mà đáng lưu ý?

Bạn sẽ không thể sử dụng cú pháp `import` hoặc `require` thư viện `qs` ở đầu file được, làm vậy bạn sẽ nhận được lỗi 
> [vue-router] qs is not defined

Nguyên nhân là config `router` này sẽ đuợc merge vào phần config khi khởi tạo instance của router, và những gì bạn `import` ở đầu file không có nghĩa là nó sẽ có sẵn ở trong file tạo ra router.

Trên đây là những lưu ý từ kinh nghiệm của mình, hy vọng có thể có ích cho bạn khi gặp phải. :v: