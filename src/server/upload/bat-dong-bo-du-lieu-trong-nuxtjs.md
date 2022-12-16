Xin chào các bạn. Hôm nay mình sẽ tiếp tục series về Nuxt.js. Cụ thể mình sẽ giới thiệu với các bạn 
Bất đồng bộ dữ liệu trong Nuxt.js



- [Phương thức asyncData](#The-asyncData-method)
    - [Trả lại một Promise](#Returning-Promise)
    - [Sử dụng async/await](#Using-async/await)
    - [Hiển thị dữ liệu](#Displaying-the-data) 
 - [Bối cảnh](#The-Context)
    - [Sử dụng  req/res ](#Use-req/res-objects)
    - [Truy cập dữ liệu route động](#Accessing-dynamic-route-data)
    - [Lắng nghe thay đổi truy vấn](#Listening-to-query-changes) 
- [Xử lý Lỗi](#Handling-Errors)



## Phương thức asyncData


Đôi khi bạn chỉ muốn lấy  dữ liệu và gửi lại về phía server mà không cần sử dụng store. asyncData được gọi mỗi lần trước khi tải page. Nó sẽ được gọi vào server một lần (tại yêu cầu đầu tiên cho ứng dụng Nuxt) và phía client  điều hướng đến routes tiếp theo. Phương thức này lấy bối cảnh làm đối số đầu tiên, bạn có thể sử dụng nó để lấy  một số dữ liệu và Nuxt.js sẽ hợp nhất nó với dữ liệu thành phần.

Nuxt.js cung cấp cho bạn những cách khác nhau để sử dụng `asyncData`.


  1. Trả lại một `Promise`. Nuxt.js sẽ cho `promise` được giải quyết trước khi thực hiện.
  2. Sử dụng [async/await](https://zeit.co/blog/async-and-await).


### Trả lại một Promise

```php
export default {
  asyncData ({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
  }
}
}
```


### Sử dụng async/await

```php
export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```


### Hiển thị dữ liệu

Kết quả từ async/await sẽ được hợp nhất với dữ liệu. Bạn có thể hiển thị dữ liệu bên trong template của mình giống như bạn đã từng làm.

```php
<template>
  <h1>{{ title }}</h1>
</template>
```


## Bối cảnh

Để xem danh sách các từ khóa trong `context`, hãy xem  [API Essential](https://nuxtjs.org/api/context) `context`.


### Sử dụng  req/res 

Khi `asyncData` được gọi từ phía server , bạn có thể truy cập vào `req` và `res` đối tượng của yêu cầu người dùng.

```php
export default {
  async asyncData ({ req, res }) {
    // Please check if you are on the server side before
    // using req and res
    if (process.server) {
     return { host: req.headers.host }
    }

    return {}
  }
}
```

### Truy cập dữ liệu route động

Bạn cũng có thể sử dụng `context` làm tham số để truy cập dữ liệu route động!. Ví dụ, các tham số của route có thể được truy cập bằng tên của file hoặc thư mục đã cấu hình lên nó. Nếu bạn xác định được một file có tên `_slug.vue` trong  `pages` thư mục của mình, bạn có thể truy cập giá trị qua `context.params.slug`: 

```php
export default {
  async asyncData ({ params }) {
    const slug = params.slug // When calling /abc the slug will be "abc"
    return { slug }
  }
}
```


### Lắng nghe thay đổi truy vấn

Các  phương pháp `asyncData`  sẽ không được gọi vào trong truy vấn mặc định. Nếu bạn muốn thay đổi thuộc tính này này, Ví dụ khi xây dựng chức năng phân trang, bạn có thể thiết lập các tham số cần `listen`  với thuộc tính `watchQuery` trong các compenent page của bạn. Tìm hiểu thêm  về  [API watchQuery](https://nuxtjs.org/api/pages-watchquery)



## Xử lý Lỗi
 Nuxt.js thêm một phương thức `error(params)` trong `context`,  bạn có thể dùng để hiện thị lỗi lên page của mình. `params.statusCode` cũng sẽ được sử dụng để hiển thị status code từ phía server.
 
 Ví dụ với một `Promise`: 
 
 ```php
export default {
  asyncData ({ params, error }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
    })
  }
}
```

Nếu muốn tùy chỉnh lại trang lỗi. Có thể [xem thêml](https://nuxtjs.org/guide/views#layouts)
 

    
Dưới đây mình  đã giới thiệu với các bạn về  bất đồng bộ dữ liệu trong Nuxt.js. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.
    
    
    
### Tham Khảo

https://nuxtjs.org/guide/async-data