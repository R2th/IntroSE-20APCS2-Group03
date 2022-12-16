# Introduction
* Core của React là các component. Bạn có thể lồng các component vào với nhau giống như các thẻ HTML vậy, điều đó làm cho JSX trông giống với HTML. Và các component hay nội dung được lồng ở trong các component được gọi là `children`.
* Khi lúc đầu học React tôi nghĩ `children` chỉ đơn giản là `props.children` nhưng sau đó tôi biết tôi đã nhầm rồi.
* Chúng ta có thể thay đổi được `children`. Có thể truyền xuống cho `children` các props đặc biệt, cho chúng hiển thị hoặc ẩn đi và thay đổi chúng tùy vào mục đích của chúng ta.
* Rồi giờ chúng ta bắt đầu tìm hiểu `children` trong React.

# Contents
## 1. Child component

* Bây giờ chúng ta có component `<Dad />` chứa nhiều component `<Son />` như này:
```Javascript
<Dad>
    <Son />
    <Son />
    <Son />
</Dad>
```

* Ở đây ta có 3 component `<Son />`, chúng sẽ là `props.children` của component `<Dad />`. Để render ra các children ta có thể viết như này:
```Javascript
class Dad extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}
```

* Đây là cách viết thông thường nhất, sử dụng `expression container` (thuật ngữ của dấu {} trong JSX). Hoặc nếu bạn không muốn trả về 3 component `<Son />` đó thì bạn có thể trả về bất cứ gì bạn muốn như này:

```Javascript
class Dad extends Component {
    render() {
        return (
            <h1>Xin chào viblo</h1>
        );
    }
}
```

* Trong trường hợp này thì bất kể children của component `<Dad />` là gì thì nó vẫn chỉ render ra dòng chữ `Xin chào viblo`.
* JSX cũng tự động loại bỏ các kí tự khoảng trắng đầu dòng và cuối dòng cũng như các dòng trống. Nó chuyển tất cả trở thành 1 dấu cách. Nên dù bạn viết như sau:

```Javascript
<h1>Xin chào viblo</h1>

<h1>Xin chào

viblo</h1>

<h1>
    Xin chào viblo
</h1>
```

thì cũng đều ra một kết quả như nhau.
### 1.1. Everything can be a child

* `Children` trong React thì không nhất thiết phải là cái gì, nó có thể là 1 component hay nhiều component, 1 thẻ h1 hoặc nhiều thẻ h1, 1 chữ hoặc nhiều chữ... 
* Như ở trên thì child của component `<Dad />` có thể là 3 component `<Son />` hoặc 1 thẻ h1.
* Hoặc bạn cũng có thể trộn lẫn chúng với nhau như sau:
```Javascript
class Dad extends Component {
    render() {
        return (
            <div>
                {this.props.children}
                <h1>Xin chào viblo</h1>
                <Son />
            </div>
        );
    }
}
```

### 1.2. Function as a child

* Ta có thể sử dụng bất cứ Javascript expression nào như là 1 children, kể cả các function.
* Xem ví dụ sau:

** Đây là chỗ gọi component `<Dad />`:
```Javascript
<Dad>
    {() => <h1>Xin chào viblo</h1>}
</Dad>
```
** Và component `<Dad />` sẽ như này:
```Javascript
class Dad extends Component {
    render() {
        return this.props.children();
    }
}
```

* Do `children` của component `<Dad />` là 1 function nên nếu ta chỉ sử dụng cách gọi children thông thường là `this.props.children` thì component của ta sẽ trắng trơn, ta sẽ phải sử dụng `this.props.children()`.
## 2. Manipulating children

* Nếu bạn đang đọc document của React bạn sẽ thấy có đoạn là `children are an opaque data structure`. Cái họ muốn nói với chúng ta ở đây là `children` có thể là bất cứ kiểu dữ liệu nào, 1 array, 1 object, thậm chí 1 function... Bởi vì bạn có thể truyền vào bất cứ gì nên bạn không bao giờ có thể biết chắc chắn được.
* React cũng đã cung cấp sẵn 1 số hàm để hỗ trợ việc thao tác với `children` được dễ dàng và nhẹ nhàng hơn. Như là `React.Children`.

### 2.1. Looping over children
* 2 hàm chúng ta thường gặp là `React.Children.map` và `React.Children.forEach`. Chúng hoạt động giống
như khi chúng ta dùng `map` và `forEach` đối với mảng. Chỉ khác là `React.Children` cho phép chúng ta thao tác với cả object hay là function tương tự như vậy.

* Xem ví dụ dưới đây để hiểu rõ hơn `React.Children` hoạt động như nào:
```Javascript
<Dad>
    <h1>First message</h1>
    <h2>Second message</h2>
</Dad>
```
* Giờ ở component `<Dad />` chúng ta muốn hiển thị ra 2 thẻ h1 và h2 ta có 2 cách như sau:
```Javascript
return (
  <div>
    {React.Children.map(this.props.children, child => {
      return child;
    })}
  </div>
);
```
hoặc là:
```Javascript
return (
  <div>
    {this.props.children.map(child => {
      return child;
    })}
  </div>
);
```
* 2 cách trên đều cho ra kết quả như nhau tuy nhiên nếu ta gọi component `<Dad />` như thế này:
```Javascript
<Dad>
    <h1>First message</h1>
    <h2>Second message</h2>
    {() => <h3>Third message</h3>}
</Dad>
```
* Nếu gọi như này thì khi ta sử dụng `this.props.children` sẽ raise lên warning là `Functions are not valid as a React child` còn sử dụng `React.Children.map` thì không.

### 2.2. Counting children
* Bởi vì `children` của React có thể là bất cứ gì nên việc đếm số lượng children cũng dễ nhầm lẫn.
* Ví dụ như sau:
```Javascript
<Dad>
    <h1>First message</h1>
    <h2>Second message</h2>
    {() => <h3>Third message</h3>}
</Dad>
```
* Khi ta sử dụng `this.props.children.length` thì trả về kết quả là 3, nhưng khi sử dụng `React.Children.count(this.props.children)` thì lại trả về kết quả là 2.
* Thêm ví dụ nữa như này:
```Javascript
<Dad>
    "First message"
</Dad>
```
* Trong trường hợp này thì nếu ta sử dụng `this.props.children.length` thì sẽ ra kết quả là 15 bởi nó nghĩ đây là 1 chuỗi nhưng `React.Children.count(this.props.children)` thì trả ra kết quả đúng là 1.
* Vì vậy ta phải lưu ý khi sử dụng 1 trong 2 cách này tùy vào từng trường hợp để cho kết quả chính xác.

### 2.2. Enforcing a single child

* Bây giờ nếu chúng ta muốn component chỉ có duy nhất một children là function ta có thể làm như sau:
```Javascript
Dad.propTypes = {
  children: PropTypes.func.isRequired
}
```

* Nhưng cách trên sẽ raise lên một warning `Failed prop type: Invalid prop children of type string supplied to Dad, expected function.`, thay vào đó ta có thể dùng cách này
```Javascript
class Dad extends Component {
  render() {
    return React.Children.only(this.props.children)();
  }
}
```

* Nó sẽ trả về duy nhất một `child` của `this.props.children`. Nếu `this.props.children` có nhiều hơn 1 child nó sẽ raise lên error `React.Children.only expected to receive a single React element child.` Nó sẽ rất tốt trong việc ràng buộc dữ liệu để tránh những lập trình viên ẩu vào làm component trở lên lộn xộn.

## 3. Editing children

* Chúng ta có thể render tùy ý các component như là `children` của component `<Dad />`, tuy nhiên ta vẫn có thể điều chỉnh chúng tùy ý từ component `<Dad />`.
* Bây giờ tôi sẽ lấy một ví dụ khác:
  * Ta có một form cho người dùng đăng kí thành viên, trong đó có một form input để người dùng nhập giới tính của mình, vậy nó sẽ có 3 component radio button gồm `Nam`, `Nữ` và `Không xác định`. Giả sử ta sẽ render nó như này:
  
  ```Javascript
      <FormGroup>
          <RadioButton value="Nam" />
          <RadioButton value="Nữ" />
          <RadioButton value="Không xác định" />
      </FormGroup>
  ```

    * Nhưng nó sẽ không chạy đúng bởi cả 3 ô input đều có thể được chọn do nó chưa có chung 1 attribute name, ta có thể làm thủ công như này:
    ```Javascript
        <FormGroup>
            <RadioButton name="gioitinh" value="Nam" />
            <RadioButton name="gioitinh" value="Nữ" />
            <RadioButton name="gioitinh" value="Không xác định" />
        </FormGroup>
    ```

    * Như vậy thì nó  hoạt động đúng. Nhưng cách này không phải cái tôi muốn nói ở đây, chúng ta có cách khác để làm việc này mà không phải pass props qua từng component con như vậy. Ta có thể làm việc này từ component <FormGroup />.
    * Ta sẽ sử dụng hàm hỗ trợ của React có tên là `cloneElement`. Ý tưởng là ta sẽ clone lại các `children` của `this.props.children` và tạo 1 element mới với thêm 1 `props` là name. Ta sẽ làm như sau:
    ```Javascript
        import React, {Component} from 'react';
        
        export default class FormGroup extends Component {
            renderChildren() {
                return React.Children.map(this.props.children, child => {
                    return React.cloneElement(child, {
                        name: this.props.name
                    })
                });
            }
            
            render() {
                return (
                    <div>
                        {this.renderChildren()}
                    </div>
                );
            }
        }
    ```
    * Và khi gọi component `<FormGroup />` ta sẽ truyền như sau:
    ```Javascript
        <FormGroup name="gioitinh">
          <RadioButton value="Nam" />
          <RadioButton value="Nữ" />
          <RadioButton value="Không xác định" />
        </FormGroup>
    ```
    * Cách này sẽ rất có hiệu quả khi `children` của FormGroup có rất nhiều phần tử và không được render trực tiếp như này.
## 4. Conclusion
* Hi vọng với những hàm hỗ trợ hay kiến thức tôi chia sẻ ở trên sẽ giúp ích phần nào cho các bạn khi làm dự án với React và gặp phải đối tượng `children` này.