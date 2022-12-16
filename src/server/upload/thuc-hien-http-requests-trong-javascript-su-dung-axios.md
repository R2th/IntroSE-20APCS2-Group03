## Giới thiệu
Axios là một thư viện JavaScript rất phổ biến mà bạn có thể sử dụng để thực hiện các yêu cầu HTTP. Nó hoạt động trong cả hai nền tảng Browser và [Node.js](https://nodejs.org/en/).

Hỗ trợ tất cả các trình duyệt hiện đại (modern browsers), bao gồm IE8 trở lên.

Axios là một Promise (lời hứa), vì vậy nó cho phép chúng ta viết code `async/await` để thực hiện các yêu cầu [XHR](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) rất dễ dàng.

Sử dụng Axios có một vài lợi thế so với native [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API):

* Hỗ trợ các trình duyệt cũ hơn (native fetch cần một polyfill)
* Tích hợp sẵn tính năng bảo vệ [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery)
* Thực hiện chuyển đổi dữ liệu JSON tự động
* Hoạt động trong Node.js
* ...

## Cài đặt

Axios có thể được cài đặt bằng cách sử dụng [npm](https://www.npmjs.com/):

```
npm install axios
```

hoặc [yarn](https://yarnpkg.com/lang/en/)

```
yarn add axios
```

hoặc chỉ cần gọi nó trong trang của bạn bằng cách sử dụng [unpkg.com](https://unpkg.com/#/):

```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## Axios API

Bạn có thể bắt đầu một yêu cầu HTTP sử dụng `axios` như sau:

```JavaScript
axios({ url: 'https://dog.ceo/api/breeds/list/all', method: 'get' })
```

nhưng để thuận tiện, bạn thường sẽ sử dụng:

* `axios.get()`
* `axios.post()`

(như trong JQuery, bạn sẽ sử dụng `$.get()` và `$.post()` thay vì `$.ajax()`)

Axios cung cấp các phương thức cho tất cả các hoạt động từ HTTP, vốn ít phổ biến hơn nhưng vẫn được sử dụng:

* `axios.delete()`
* `axios.put()`
* `axios.patch()`
* `axios.options()`

## GET requests

Một cách thuận tiện để sử dụng Axios là sử dụng cú pháp `async/await` (ES2017).

Ví dụ này truy vấn [Dog API](https://dog.ceo/) để truy xuất danh sách tất cả các giống chó, sử dụng `axios.get()` và đếm chúng:

```JavaScript
const axios = require('axios')

const getBreeds = async () => {
  try {
    return await axios.get('https://dog.ceo/api/breeds/list/all')
  } catch (error) {
    console.error(error)
  }
}

const countBreeds = async () => {
  const breeds = await getBreeds()

  if (breeds.data.message) {
    console.log(`Got ${Object.entries(breeds.data.message).length} breeds`)
  }
}

countBreeds()
```

Nếu bạn không muốn sử dụng `async/await`, bạn có thể sử dụng cú pháp [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise):

```JavaScript
const axios = require('axios')

const getBreeds = () => {
  try {
    return axios.get('https://dog.ceo/api/breeds/list/all')
  } catch (error) {
    console.error(error)
  }
}

const countBreeds = () => {
  const breeds = getBreeds()
    .then(response => {
      if (response.data.message) {
        console.log(
          `Got ${Object.entries(response.data.message).length} breeds`
        )
      }
    })
    .catch(error => {
      console.log(error)
    })
}

countBreeds()
```

## Thêm tham số vào GET requests

Một GET response có thể chứa các tham số trong URL, như sau: 

https://sydinh.com/?foo=bar.

Với Axios, bạn có thể thực hiện điều này bằng cách sử dụng URL đó:

```JavaScript
axios.get('https://sydinh.com/?foo=bar')
```

hoặc bạn có thể sử dụng thuộc tính `params` trong options API mà Axios cung cấp sẵn:

```JavaScript
axios.get('https://sydinh.com/', {
  params: {
    foo: 'bar'
  }
})
```

## POST Requests

Thực hiện yêu cầu POST (POST Requests) tương tự như thực hiện yêu cầu GET (GET requests), nhưng thay vì `axios.get()`, bạn sử dụng `axios.post()`:

```JavaScript
axios.post('https://sydinh.com/')
```

Một đối tượng chứa tham số POST là đối số thứ hai:

```JavaScript
axios.post('https://sydinh.com/', { foo: 'bar' })
```

## Kết luận

Trên đây mình giới thiệu một cách rất khái quát về thư viện Axios. Một thư viện đang được đại đa số Developer sử dụng để thực hiện HTTP requests. Để nắm bắt được cụ thể, biết được nhiều API hơn, các bạn đọc thêm ở tài liệu official của Axios nhé:

https://github.com/axios/axios

Chúc các bạn học tốt !!!