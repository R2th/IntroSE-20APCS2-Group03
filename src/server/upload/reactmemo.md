## Giới thiệu

OK, chào tất cả các bạn. Hôm nay mình sẽ trở lại với một chủ đề khá thú vị về React, đó chính là `React.memo`, một concept được React giới thiệu khi cho ra đời version 16.6.

## React.memo

Class components có thể skip việc render khi props được truyền vào là giống nhau bằng cách sử dụng [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) hoặc [shouldComponentUpdate](https://reactjs.org/docs/react-component.html#shouldcomponentupdate). Bây giờ bạn cũng có thể làm điều này tương tự với function components bằng cách gói chúng trong `React.memo`.

```JSX
const MyComponent = React.memo(function MyComponent(props) {
  /* Chỉ render khi props change */
});
```

`React.memo` là một [higher order component](https://reactjs.org/docs/higher-order-components.html). Nó tương tự như [React.PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) nhưng dành cho function components thay vì là class.

Nếu function component của bạn render cùng một kết quả được cung cấp cùng một props. Bạn có thể gói nó trong `React.memo` để giúp tăng hiệu suất trong một số trường hợp bằng cách ghi nhớ kết quả. Điều này có nghĩa là React sẽ bỏ qua việc render component và sử dụng lại kết quả được render cuối cùng.

Theo mặc định, `React.memo` sẽ chỉ làm shallowly compare đối với các object phức tạp trong props object. Nếu bạn muốn kiểm soát việc compare, bạn cũng có thể cung cấp một custom comparison function ở đối số thứ hai của `React.memo`

```JSX
function MyComponent(props) {
  /* Render sử dụng props */
}

function areEqual(prevProps, nextProps) {
  /* Trả về true nếu nextProps bằng prevProps, ngược lại trả về false */
}

export default React.memo(MyComponent, areEqual);

```

`React.memo` là một phương pháp được sử dụng như là một tiện ích cho việc tối ưu hoá hiệu suất ứng dụng ([performance optimization](https://reactjs.org/docs/optimizing-performance.html)). Bạn không nên dùng nó để ngăn chặn việc render component  vì điều này có thể dẫn đến lỗi bất cứ lúc nào.

> **Note** 
> 
> Không giống như phương thức [shouldComponentUpdate()](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) trong class components, hàm `areEqual` trả về `true` nếu props bằng nhau và `false` nếu props khác nhau. Đây là nghịch đảo từ `ShouldComponentUpdate`.


Nguồn: https://reactjs.org/docs/react-api.html#reactmemo