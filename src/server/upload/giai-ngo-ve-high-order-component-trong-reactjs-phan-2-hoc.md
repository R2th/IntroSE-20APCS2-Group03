### Mở đầu
Trong bài viết trước mình đã giới thiệu với tất cả mọi người về **Currying function** và để tiếp tục series bài viết tìm hiểu về **High Order Component** thì ngày hôm nay mình sẽ cùng mọi người tìm hiểu nốt về **High Order Component**, để xem nó là gì và có liên quan gì đến **Currying function** nhé.

### High Order Component
Như trong cuối bài viết trước thì mình đã có nói rằng **HOC** hoạt động dựa trên nguyên lý của **Currying function**, tức là 1 function sẽ return ra 1 function mới, vậy thì cũng tương tự như vậy, trong React **HOC** cũng là 1 function và nó sẽ return ra 1 **Component**

1 **HOC** cơ bản sẽ trông như thế này:
```js
const EnhancedComponent = () => WrappedComponent => {
  return <WrappedComponent />;
};

export default EnhancedComponent ;
```

Nhìn qua thì có vẻ trông rất giống với **Currying function** phải không nào, nhưng khác biệt ở chỗ là **HOC** nó nhận vào 1 Component và return ra Component. Nghe hơi confused 1 tí, vậy thì để cho dễ hiểu thì chúng ta sẽ cùng nhau đi vào ví dụ sau:

##### Bài toán
Giả sử ta có 2 màn hình khác nhau cùng click vào button để show ra alert của trình duyệt. Nếu như bình thường thì trong mỗi component ta sẽ implement sự kiện hiển thị alert khi user click vào button, và đoạn code này trong 2 component này sẽ trông như thế này

```js
// Component A:
export default function AComponent() {
  const showAlert = () => {
    window.alert('User clicked!');
  };

  return (
      <button onClick={showAlert}>Click me!<button>
  );
};

// Component B:
export default function BComponent() {
  const showAlert = () => {
    window.alert('User clicked!');
  };

  return (
      <button onClick={showAlert}>Click me!<button>
  );
};
```

Như mọi người có thể thấy là 2 Component trên đang bị lặp logic hiển thị alert và nếu có nhiều Component cũng muốn hiển thị alert thì sao, lúc đấy rõ ràng là chúng ta đang vi phạm phải nguyên tắc DRY (Don't Repeat Yourself).

Để giải quyết được vấn đề này ta có thể áp dụng **HOC** vào bài toán, tức là ta sẽ viết hàm xử lý logic hiển thị alert ra trong **HOC** như sau:
```js
const EnhancedComponent = () => WrappedComponent => {
  // Viết hàm xử lý hiển thị alert trong HOC
  const showAlert = () => {
    window.alert('create HOC successfully!');
  };

 // Return ra 1 Component và truyền hàm xử lý hiển thị alert vào trong Component đó như là 1 prop
 return () => <WrappedComponent showAlert={showAlert} />;
};

export default EnhancedComponent;
```

Rồi, như vậy là ta đã vừa định nghĩa xong 1 **HOC** dùng để xử lý việc hiển thị alert và ta chỉ việc sử dụng **HOC** giống như làm việc với **Currying function** thôi:

```js
// Component A:
function AComponent(props) {
  return (
      <button onClick={props.showAlert}>Click me!<button>
  );
};

export default EnhancedComponent()(AComponent);

// Component B:
function BComponent(props) {
  return (
      <button onClick={props.showAlert}>Click me!<button>
  );
};

export default EnhancedComponent()(BComponent);
```

Đã xong, đoạn code bị lặp ở 2 component trên đã không còn nữa và nhìn trông chúng có vẻ gọn hơn trước khá là nhiều đấy :D

Nhưng mà khoan đã có phải ở Component nào cũng hiển thị alert với cùng 1 nội dung đâu, vậy để thay đổi nội dung alert chúng ta có thể truyền vào **HOC** nội dung như là param đầu tiên:
```js
// Truyền nội dung muốn hiển thị trên alert vào param đầu tiên
const EnhancedComponent = content => WrappedComponent => {
  const showAlert = () => {
   // Hiển thị content
    window.alert(content);
  };

 return (props) => <WrappedComponent {...props} showAlert={showAlert} />;
};

export default EnhancedComponent;
```
Sau đó ta chỉ việc update lại nội dung muốn hiển thị trong 2 component A và B:
```js
// Component A:
...
export default EnhancedComponent('Component A was displayed')(AComponent);

// Component B:
...
export default EnhancedComponent('Component B was displayed')(BComponent);
```

Đến đây thì chắc có lẽ mọi người đã phần nào hiểu được cách hoạt động của **HOC** rồi nhỉ. Ở trên là ví dụ cơ bản nhất về cách sử dụng **HOC** với vai trò là 1 **WrappedComponent**, ngoài ra thì **HOC** còn có thể sử dụng để truyền các props không liên quan đến các thẻ được bao bọc. Ví dụ:
```js
...
const showAlert = () => {
    window.alert(content);
};
 
return (props) => <WrappedComponent {...props} showAlert={showAlert} />;
...
```
Ngoài ra còn có 1 số pattern nâng cao khác về **HOC**, tuy nhiên trong khuôn khổ bài viết thì mình không sẽ không đề cập đến chúng, mọi người có thể tìm hiểu thêm sau khi đã nắm được những kiến thức cơ bản về **HOC** và sử dụng chúng 1 cách thuần thục trong các dự án. 

##### Lưu ý
Khi sử dụng **HOC** thì có 3 điểm bạn cần lưu ý khi sử dụng là:
- Không sử dụng **HOC** trong phương thức render()
- Các phương thức static cần phải được copy lại
- Refs không được truyền qua **HOC**

### Kết luận

Trong quá trình làm việc với React thì mọi người có thể bắt gặp **HOC** ở rất nhiều chỗ như là **withRouter** của React Router hay hàm **connect** của React-redux. Mỗi hàm thì đều có 1 đặc điểm riêng, ví dụ như **withRouter** chỉ nhận vào 1 đối số duy nhất là Component. Để có thể hiểu thêm về HOC thì mọi người có thể tìm hiểu thông qua core của hàm **withRouter** và **connect**

Cuối cùng thì mình xin chúc mọi người tự tạo và áp dụng thành công **HOC** vào dự án của riêng mình nhé!