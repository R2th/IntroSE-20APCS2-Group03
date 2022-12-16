`React` đang nhanh chóng trở thành bộ thư viện JavaScript phổ biến, so với một số lượng không ít các thư viện và framework JavaScript hiện nay thì React nổi trội ở tính đơn giản và hiệu quả và thích hợp để build các ứng dụng UI phức tạp. 

Vậy `React` là gì, sử dụng như thế nào và tại sao lại sử dụng react? Trong phạm vi bài viết này chúng ta sẽ cùng nhau tìm hiểu về những điều đó.

### 1. What React?

> React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components".

`React` là một thư viện JavaScript linh hoạt, hiệu quả để xây dựng các UI component viết bằng HTML, CSS và JavaScript. Nó cho phép lập trình viên chúng ta xây dựng các UI component phức tạp từ những đoạn code nhỏ và độc lập.

*Note*:  

-  `React` không phải là một MVC framework như những framework khác,  nó chỉ là thư viện của Facebook giúp render ra phần view. Vì thế React sẽ không có phần Model và Controller, mà phải kết hợp với các thư viện khác. React cũng sẽ không có 2-way binding hay là Ajax, ...

- React cho phép bạn viết JavaScript sử dụng cú pháp được định nghĩa trong tiêu chuẩn ECMAScript 6 (ES6 hay ECMAScript 2015), tuy nhiên một số trình duyệt chưa chấp nhận phiên bản mới này. Babel là một JavaScript compiler giúp biên dịch mã JavaScript viết theo chuẩn ECMAScript 6 về ECMAScript 5.

### 2. Làm quen với React
Cùng xem qua ví dụ sau:

```
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// Example usage: <ShoppingList name="Mark" />
```

Ở đây, `ShoppingList` có thể là một `React component class` hoặc `React component type`. Một `component` thì có các tham số được gọi là `props` (các thuộc tính) và trả về một hệ thống phân cấp các `view` được hiển thị thông qua phương thức `render`.
Method `render` sẽ trả về phần view hiển thị mong muốn của bạn. `React` có nhiệm vụ lấy ra những mô tả và hiển thị kết quả mô tả đó. Đặc biệt, render trả về một phần tử `React` - là một mô tả nhẹ về những gì cần render ra.

### 3. Dùng progs trong React:
 - `props` chứa giá trị được chuyển từ bên ngoài vào trong Component.
- `propTypes` định nghĩa, ràng buộc cho `Props` trong `React Components`, `propTypes` giúp cho người khác sử dụng các `Components` của chúng ta an toàn hơn.

```
const ListOfNumbers = props => (
  <ol className={props.className}>
    {
      props.numbers.map(number => (
        <li>{number}</li>)
      )
    }
  </ol>
);

ListOfNumbers.propTypes = {
  className: React.PropTypes.string.isRequired,
  numbers: React.PropTypes.arrayOf(React.PropTypes.number)
};
```

### 4. Write functional components

React được xây dựng xung quanh các component, chứ không dùng template như các framework khác. Có nhiều cách để viết components như sau:

- **Sử dụng `React.createClass()`**

```
const MyComponent = React.createClass({
  render: function() {
    return <div className={this.props.className}/>;
  }
});
```

- **Viết bằng ES6**

```
class MyComponent extends React.Component {
  render() {
    return <div className={this.props.className}/>;
  }
}

# ReactDOM.render(<MyComponent/>,  document.querySelector("#app"));
```

- **`React 0.14` mới cho phép viết nhanh 1 Components bằng 1 hàm với tham số `props`**:

```
const MyComponent = props => (
  <div className={props.className}/>
);
```

`Với các Components lớn và nhiều xử lý, nên sử dụng 2 cách đầu. Còn trong đa số các trường hợp khác, Components không cần `state`, chỉ `render()` từ `props` thì nên sử dụng cách cuối giúp cho ứng dụng sáng sủa và nhanh hơn.`

- **Nested View:**
Ngoài ra, chúng ta cũng có thể sử dụng các component lồng nhau, như ví dụ dưới đây:

```
class Form extends React.Component{
    render(){
        return (
            <div>
                <h3>Click the button</h3>
                <input type="submit" />
            </div>
        );
    }
}
class App extends React.Component{
    render(){
        return (
            <div>
                <h1> Welcome to my app!</h1>
                <Form />
            </div>
        );
    }
}
ReactDOM.render(<App/>,  document.querySelector("#app"));
```

### 5.  Why react?

Có nhiều lý do giải thích tại sao chúng ta nên chọn dùng `react`:

-  `React` giúp việc viết Javascript dễ dàng hơn: 
`React` sử dụng cú pháp đặc biệt gọi là `JSX`, cho phép bạn trộn HTML và JavaScript. Điều này không phải là bắt buộc, chúng ta vẫn có thể viết thuần JavaScript, nhưng nên sử dụng cú pháp mới bởi nó giúp việc viết ‘components’ đơn giản hơn.
-  Các thành phần có thể tái sử dụng được:
Mỗi thành phần tự quyết định cách nó render và logic riêng của nó. Cách tiếp cận này tạo ra kết quả tuyệt vời và chúng ta có thể tái sử dụng các thành phần bất cứ nơi nào ta cần.
- Render nhanh chóng với Virtual DOM: 
Cập nhật DOM là một vấn đề khi nói đến hiệu suất web. React đang cố gắng để xử lý vấn đề này bằng cách sử dụng virtual DOM - một DOM lưu giữ trong bộ nhớ. Bất kì view nào thay đổi đều được phản ứng qua virtual DOM, sau đó thì một thuật toán so sánh hiệu quả để chọn trạng thái nào tốt nhất và áp dụng thay đổi này. Cuối cùng, những bản cập nhật DOM đảm bảo sẽ được nén lại, tối ưu cho việc đọc/viết. Đây chính là lý do chính về hiệu suất cao của React.
- React Native: một thư viện tuyệt vời, `viết một lần, dùng mọi nơi`.

**Thanks for your reading!**