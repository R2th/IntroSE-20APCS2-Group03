> Xem thêm về chuỗi bài viết về [**React.js - Những Câu Hỏi Phỏng Vấn Thường Gặp**](https://viblo.asia/s/reactjs-interview-pmleB8rD5rd).
 
## 1. Ưu điểm của việc dùng Fragment so với thẻ div?
Với việc sủ dụng thẻ Fragment, ta có những ưu điểm sau:
- Fragment nhanh hơn và chiếm ít bộ nhớ hơn nhờ việc không tạo một phần tử trên DOM node. Điều này sẽ rất hữu ích cho các component lớn và có nhiều component con
- Một số style của CSS đòi hỏi cần có sự ràng buộc cha con, anh em giữa các phần tử HTML. Việc sử dụng thẻ div sẽ có thể gây ra sự phá vỡ về CSS. Fragment không tạo ra phần tử trên DOM nên sẽ khắc phục được điều trên

## 2. Tạo sao React khuyến khích sử dụng 'key' khi render từ Array?
Key (khoá) được xem như là khoá định danh cho phần tử. Nhờ việc sử dụng key, React sẽ dễ dàng nhận biết được phần tử nào đang thật sự bị thay đổi, từ đó giúp việc render lại DOM chính xác hơn và nhanh hơn

## 3. Có những cách nào để re-render 1 component?
- Thay đổi state hay props
- Gọi hàm [forceUpdate()](https://reactjs.org/docs/react-component.html#forceupdate)

## 4. Tại sao phải dùng className thay cho class?
Câu trả lời vẫn là JSX. Ta cần phải dùng className để tránh nhầm lẫn với class trong JavaScript

## 5. Sự khác biệt của `userMemo` và `useCallback`?
- `useMemo` giữ cho một hàm không được thực thi lại nếu nó không nhận được một tập hợp các tham số đã được sử dụng trước đó. Nó sẽ trả về kết quả của một function. Sử dụng nó khi bạn muốn ngăn một số thao tác nặng hoặc tốn kém tài nguyên được gọi trên mỗi lần render.
- `useCallback` giữ cho một hàm không được tạo lại lần nữa, dựa trên mảng các phần phụ thuộc. Nó sẽ trả về chính function đó. Sử dụng nó khi mà bạn muốn truyền fuction vào component con và chặn không cho một hàm nào đó tiêu thời gian, tài nguyên phải tạo lại.

## 6. Sự khác biệt giữa `super()` và `super(props)` trong class contructor?
Khi bạn muốn sử dụng `this.props` ở trong contructor thì bạn sẽ cần phải truyền props vào trong hàm super

**Sử dụng `super(props)`:**

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props) // { name: 'John', ... }
  }
}
```

**Sử dụng `super()`:**

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super()
    console.log(this.props) // undefined
  }
}
```

## 7. Tại sao khi sử dụng `this.setState()` , đôi khi ta cần truyền vào nó là 1 hàm thay vì 1 object?
Như đã biết, hàm `this.setState()` là hàm bất đồng bộ. Do đó, trong 1 số trường hợp, nếu state của chúng ta thay đổi dựa trên state trước nó, việc chỉ truyền vào 1 object chứa state mới có thể làm sai lệch kết quả. Với việc sử dụng hàm, ta sẽ có thể truy suất vào state trước đó, nhờ đó đảm bảo kết quả đúng. Một bài toán rất hay gặp đó chính là bài toán đếm:
```jsx
this.setState((prevState, props) => ({
  count: prevState.count + props.increment
}))
```

## 8. Context là gì? Cho 1 ví dụ về việc dùng context?
Context là 1 cách mà React cung cấp để chúng ta có thể truyền dữ liệu vào các component mà không cần phải đi qua từng bậc trong "cây component" của nó. Điều này rất hữu ích trong thực tế, mà 1 ví dụ điển hình nhất là việc xác thực người dùng (Auhthentication)

## 9. Reconciliation là gì?
Nghe thì có vẻ lạ đúng không? Nhưng thực chất, đây cũng chỉ là tên gọi cho việc "React cập nhật DOM thông qua cơ chế Virtual DOM như thế nào". Cơ chế này hoạt động như thế nào đã được mình nói ở [phần 1](https://viblo.asia/p/reactjs-nhung-cau-hoi-phong-van-thuong-gap-phan-1-Ljy5VDkbZra) nhé

## 10. Điều gì sẽ xảy ra khi bạn gọi hàm setState() trong constructor?
Khi bạn sử dụng setState(), thì ngoài việc gán cho giá trị, React còn re-render lại component và các component con của nó. Như vậy, bạn sẽ gặp lỗi: _Can only update a mounted or mounting component_. Vì vậy, chúng ta cần sử dụng this.state để khởi tạo các biến bên trong contructor

## 11. Những phương thức nào trong vòng đời của 1 component không còn được dùng từ React v16?
- componentWillMount()
- componentWillReceiveProps()
- componentWillUpdate()

## 12. Strict mode trong React là gì?
`React.StrictMode` là một component hỗ trợ cho việc đánh dấu các lỗi tiềm ẩn trong ứng dụng. Cũng giống như Fragment, StrictMode sẽ không tạo ra 1 phần tử trên DOM node. Và lưu ý rằng, component này chỉ hoạt động ở môi trường development

## 13. Làm thế nào để re-render component khi kích thước trình duyệt bị thay đổi?
Bạn có thể lắng nghe sự kiện `resize` bên trong hàm `componentDidMount`. Ngoài ra, bạn nên xoá sự kiện này ở `componentWillUnmount`
```jsx
class WindowDimensions extends React.Component {
  constructor(props){
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
  }
   
  componentWillMount() {
    this.updateDimensions()
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions() {
    this.setState({width: window.innerWidth, height: window.innerHeight})
  }

  render() {
    return <span>{this.state.width} x {this.state.height}</span>
  }
}
```

## 14. Có thể sử dụng React mà không render HTML trong component không?
Sẽ có những cách sau để bạn có thể làm được điều đó
```jsx
render() {
  return false
}
```

```jsx
render() {
  return null
}
```

```jsx
render() {
  return []
}
```

```jsx
render() {
  return <React.Fragment></React.Fragment>
}
```

```jsx
render() {
  return <></>
}
```
Lưu ý rằng, bạn không thể return giá trị undefined trong trường hợp này

## 15. Bạn có thể chỉnh sửa props được không?
Triết lý của React là `props` phải là bất biến và từ trên xuống (theo quan hệ cha con). Điều này có nghĩa là cha mẹ có thể gửi bất kỳ `props` nào cho con, nhưng con không thể sửa đổi các `props` đã nhận

> Bài viết được viết dựa trên kinh nghiệm phỏng vấn thực tiễn và các nguồn tài liệu phổ biến. Rất mong nhận được đóng góp và phản hồi của bạn đọc. Hẹn gặp lại các bạn trong phần tiếp theo