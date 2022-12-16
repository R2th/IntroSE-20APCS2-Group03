# Forwarding Refs
Forwarding Refs là kỹ thuật cho phép chúng ta sử dụng `ref` từ một phần tử con của component, thông thường thì điều này không cần thiết nhưng ở trong một vài trường hợp thì nó lại khá là hữu ích trong việc tái sử dụng một số thành phần.

## Forwarding refs to DOM components
Chúng ta cùng xem ví dụ sau:

```Javascript
function FancyButton(props) {
  return (
    <button className="FancyButton">
      {props.children}
    </button>
  );
}
```

Trong ví dụ trên thì React sẽ ẩn đi các thành phần con của component `FancyButton`, khi một component khác sử dụng `FancyButton` thì sẽ không cần quan tâm tới trong `FancyButton` có gì và không cần thiết phải điều khiển các thành phần con của `FancyButton`. Điều này là tốt bởi vì nó sẽ giảm tải việc phụ thuộc lẫn nhau giữa các component và đúng với tư tưởng tái sử dụng của React.

Việc đóng gói các component riêng biệt là cần thiết và hữu ích nhưng trong một số trường hợp thì nó lại trở nên bất tiện, ví dụ như trong một ứng dụng bao gồm nhiều component ví dụ như  `FancyButton`, `Input` thì việc quản lý các hiệu ứng như `focus`, `selection`, `animations` khá là khó khăn và bất tiện.

`Ref forwarding` là một tính năng có thể giúp chúng ta xử lý những case như nói trên nó cho phép chúng ta nhận tạo ra 1 `ref` và đưa chúng xuống các thành phần con của Component.

Trong ví dụ dưới đây thì `FancyButton` sử dụng `React.forwardRef` để tạo ra 1 `ref` và nó được đưa xuống thành phần con là `button`

```Javascript
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

Với cách này thì các component sử dụng `FancyButton` có thể sử dụng `button` và truy cập trực tiếp vào nó.

Sau đây là các bước mà đã xảy ra ở Component trên

- Trước tiên chúng ta Sử dụng `React.createRef` để tạo ra 1 biến `ref`
- Sau khi đã tạo xong biến `ref` thì chúng ta đưa nó vào `FancyButton` như đoạn code `<FancyButton ref={ref}>Click me!</FancyButton>;`
- React sẽ đưa ref đó vào Component giống như là một parameter thứ 2, ngang hàng với props, chứ không phải nằm trong props nha
- Ở trong `FancyButton` thì chúng ta tiếp tục đưa `ref` này xuống button như là một attributes  `<button ref={ref}>`
- Và khi chúng ta sử dụng `ref.current` thì đồng nghĩa với việc chúng ta đang sử dụng button trong `FancyButton`

> Các bạn chú ý parameter thứ 2 ở component `FancyButton` chỉ xuất hiện khi chúng ta định nghĩa component bằng `React.forwardRef`, còn với các function component hoặc class bình thường thì sẽ không nhận và trong props cũng sẽ không tồn tại biến `ref` nha.
> 

## Forwarding refs in higher-order components
Đây là kỹ thuật khá là hữu ích  với `higher-order components (HOC)`. Cùng bắt đầu với một HOC component, component này cho phép chúng ta log lại sự thay đổi của props:

```Javascript
function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return LogProps;
}
```

Component `logProps` sẽ chuyển toàn bộ các props được truyền vào  component mà nó đang bọc nên các component được bọc trong nó khi render sẽ không bị thay đổi gì, nhưng với `logProps` chúng ta có thêm một chức năng nữa là log lại được sự thay đổi của props.

Và nó được sử dụng như này

```Javascript
class FancyButton extends React.Component {
  focus() {
    // ...
  }

  // ...
}

// Rather than exporting FancyButton, we export LogProps.
// It will render a FancyButton though.
export default logProps(FancyButton);
```

Nhưng khi sử dụng HOC các bạn sẽ không sử dụng đc `forwardRef`, vì sao lại như vậy, như đã nói ở ví dụ phía trên thì muốn sử dụng được `forwardRef` thì component phải được khai báo với `React.forwardRef` như ví dụ

```Javascript
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));
```
Và nếu như bạn đưa ref vào HOC thì chắc chắn sẽ không sử dụng được bởi vì
 - Thường thì HOC không phải là loại component `forwardRef` nên việc đưa `ref` vào sẽ ko nhận trong props
 - Khi sử dụng `forwardRef` thì sẽ ảnh hưởng tới HOC chứ không phải là các component được nó bọc.

Giống như ví dụ này:

```Javascrip
import FancyButton from './FancyButton';

const ref = React.createRef();

// The FancyButton component we imported is the LogProps HOC.
// Even though the rendered output will be the same,
// Our ref will point to LogProps instead of the inner FancyButton component!
// This means we can't call e.g. ref.current.focus()
<FancyButton
  label="Click Me"
  handleClick={handleClick}
  ref={ref}
/>;
```

Khi các bạn đưa `ref` vào `FancyButton` thì thực tế `ref` đang được đưa vào `LogProps` và chúng ta ko thể sử dụng được.

May mắn thay, chúng ta có thể chuyển tiếp rõ ràng các ref đến thành phần FancyButton bên trong bằng API React.forwardRef. React.forwardRef chấp nhận chức năng render và nhận các props và ref và trả về React node

Với trường hợp trên chúng ta có thể xử lý như sau:

```Javascript
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;

      // Assign the custom prop "forwardedRef" as a ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // Note the second param "ref" provided by React.forwardRef.
  // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
  // And it can then be attached to the Component.
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
```

## Displaying a custom name in DevTools

`React.forwardRef` chấp nhận render function. React DevTools sử dụng function này để xác định những gì sẽ hiển thị cho ref component.

Ví dụ:

```Javascript
const WrappedComponent = React.forwardRef((props, ref) => {
  return <LogProps {...props} forwardedRef={ref} />;
});
```
Với ví dụ trên thì ở trên `DevTool` sẽ hiển thị là `ForwardRef`

Còn nếu render với function thì `DevTool` sẽ thêm tên của function vào 

```Javscript
const WrappedComponent = React.forwardRef(
  function myFunction(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }
);
```

 `DevTool` sẽ hiển thị là `ForwardRef(myFunction)`
 
 Và bạn có thể đặt tên cho dễ debug qua property `displayName `
 
 ```Javascript
 function logProps(Component) {
  class LogProps extends React.Component {
    // ...
  }

  function forwardRef(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }

  // Give this component a more helpful display name in DevTools.
  // e.g. "ForwardRef(logProps(MyComponent))"
  const name = Component.displayName || Component.name;
  forwardRef.displayName = `logProps(${name})`;

  return React.forwardRef(forwardRef);
}
 ```