> Xem thêm về chuỗi bài viết về [**React.js - Những Câu Hỏi Phỏng Vấn Thường Gặp**](https://viblo.asia/s/reactjs-interview-pmleB8rD5rd). Từ phần này, mình sẽ giảm số câu hỏi mỗi phần xuống 10 câu thay vì 15 để các bạn dễ theo dõi và ghi nhớ kiến thức nhé.

## 1. Làm thể nào để kiểm tra props trong React?
Khi ứng dụng của bạn đang được chạy ở chế độ development, React sẽ tự động kiểm tra các props trong component để chắc chắn rằng prop đó đúng kiểu dữ liệu. Nếu kiểu dữ liệu không đúng, React sẽ hiện 1 cảnh báo (warning) ở console. Tuy nhiên, ở môi trường production, chức năng này không được thêm vào để đảm bảo về hiệu suất ứng dụng. Do vậy, bạn có thể sử dụng `PropTypes` thông qua thư viện `props-type` để kiểm tra props
```js
import React from 'react'
import PropTypes from 'prop-types'

class User extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
  }

  render() {
    return (
      <>
        <h1>{`Xin chào, ${this.props.name}`}</h1>
        <h2>{`Tuổi của bạn là:, ${this.props.age}`}</h2>
      </>
    )
  }
}
```

## 2. Event trong React có những sự khác biệt nào?
- Được đặt tên bằng *camelCase* thay cho *lowercase*
- Với JSX, bạn sẽ truyền 1 hàm để xử lý sự kiện thay cho 1 string tên hàm

## 3. CRA là gì?
CRA là tên viết tắt của `create-react-app`. Đây là một công cụ CLI cho phép bạn nhanh chóng tạo và chạy các ứng dụng React mà không cần bước cấu hình.

## 4. Những lợi ích mà CRA mang lại?
CRA bao gồm toàn bộ những thứ mà chúng ta sử dụng để xây dựng 1 ứng dụng React

- React, JSX, ES6
- Ngôn ngữ bổ sung ngoài ES6  như  toán tử spread.
- Autoprefixed CSS, do đó, bạn không cần phải dùng -webkit- hay 1 số prefixes khác
- Unit test runner
- Máy chủ ở môi trường development giúp cảnh báo về lỗi
- Một tập lệnh xây dựng để gói, bọc JS, CSS và hình ảnh để sản xuất, với các hàm băm và sơ đồ nguồn

## 5. Bạn có thể sử dụng custom DOM attribute hay không?
Trước đây, React thường bỏ qua các thuộc tính DOM không xác định. Nếu bạn đã viết JSX với một thuộc tính mà React không nhận ra, React sẽ bỏ qua nó. Tuy nhiên, từ React v16 trở đi, điều này là hoàn toàn có thể. Ví dụ
```js
<div mycustomattribute={'something'} />
```
Sẽ cho ra kết quả trên DOM:
```
// Trước v16
<div />
// Sau v16
<div mycustomattribute='something' />
```

## 6. Làm thế nào để có thể kết hợp nhiều inline style CSS trong React?
Bạn có thể sử dụng toán tử spread để làm điều này. Ví dụ:
```js
<button style={{...styles.panel.button, ...styles.panel.submitButton}}>{'Submit'}</button>
```

## 7. Làm thế nào để in ra JSON với cấu trúc đẹp trong React?
Bạn có thể sử dụng thẻ `<pre>` kết hợp với `JSON.stringify()` để làm điều này:
```js
const data = { name: 'Đức Phúc', gender: 'male'  }

class User extends React.Component {
  render() {
    return (
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    )
  }
}
```

## 8. Có những cách nào để cập nhật state là 1 object?
> Gọi hàm setState() với object để hợp nhất state

- Sử dụng `Object.assign()`:
```js
const user = Object.assign({}, this.state.user, { age: 24 })
this.setState({ user })
```

- Sử dụng toán tử spread:
```js
const user = { ...this.state.user, age: 42 }
this.setState({ user })
```

> Gọi hàm setState với 1 hàm:
```js
this.setState(prevState => ({
  user: {
    ...prevState.user,
    age: 42
  }
}))
```

## 9. Làm cách nào chúng ta có thể tìm thấy phiên bản React trong thời gian chạy trên trình duyệt?
Chúng ta có thể sử dụng `React.version` để làm điều này. Ví dụ:
```js
ReactDOM.render(
  <div>{`React version: ${React.version}`}</div>,
  document.getElementById('app')
)
```

## 10. Làm thế nào để thêm Google Analyst (ga) cho Router?
Thêm một *listener* trên đối tượng history để ghi lại mỗi lần xem trang:
```js
history.listen(function (location) {
  window.ga('set', 'page', location.pathname + location.search)
  window.ga('send', 'pageview', location.pathname + location.search)
})
```


> Bài viết được viết dựa trên kinh nghiệm phỏng vấn thực tiễn và các nguồn tài liệu phổ biến. Rất mong nhận được đóng góp và phản hồi của bạn đọc. Đừng quên upvote, comment nếu bài viết này hữu ích cho các bạn nhé. Hẹn gặp lại các bạn trong phần tiếp theo