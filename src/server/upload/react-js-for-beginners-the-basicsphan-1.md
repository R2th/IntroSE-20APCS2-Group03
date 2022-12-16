## Mở đầu
React JS là Thư viện JavaScript phổ biến nhất hiện nay để xây dựng UI (Giao diện người dùng), được tạo bởi Facebook. Chúng ta có thể xây dựng các ứng dụng hoặc trang web đơn hiện đại, nhanh chóng bằng React.

Hiện nay React JS rất phổ biến trong số các công ty trong Công nghiệp phần mềm, nhưng chúng ta cũng có thể thấy sự gia tăng mức độ phổ biến của React JS trong 5 năm qua, bởi Google Trends:
![](https://images.viblo.asia/a63ad8f0-055d-47be-9596-0a3788676f7f.png)
Độ phổ biến React JS trong 5 năm qua thống kê bởi Google Trends

Ở bài viết này, mình xin trình bày những kiến thức cơ bản nhất về React, dành cho các bạn beginners, nếu có dịp, mình sẽ trình bày thêm những kiến thức sâu hơn ở các phần sau.
> Quan trọng: Trước khi học React, bạn cần biết Javascript (và ES6 Features) 

## React JS là Library hay Framework?

*Đây là một trong những chủ đề không rõ ràng nhất của React. Hãy làm rõ điều này ngay từ đầu. **React là một Library, không phải là Framework.***
![](https://images.viblo.asia/b045d7c3-7066-44e9-9191-7dcbcfa93826.png)
Định nghĩa React từ website chính thức.

> Library là gì?
> Một library(thư viện) trong lập trình có thể được giải thích là một tập hợp các dòng code. Chúng ta sử dụng một thư viện để viết code theo cách tinh gọn hơn hoặc để import một feature vào dự án. JQuery là một thư viện chẳng hạn.
> Chúng ta có thể viết JavaScript đơn giản hơn nhiều bằng cách sử dụng JQuery hoặc có thể import các features đã được viết bởi JQuery vào dự án. Bản thân dự án không phụ thuộc vào thư viện.

> Framework là gì?
Mặt khác, Framework là một package hoàn chỉnh với các chức năng và thư viện riêng. Một framework có quy tắc riêng, bạn không có nhiều sự linh hoạt và dự án phụ thuộc vào Framework. Angular là một ví dụ về một framework.
Vì vậy, React là để build UI và cách bạn lập trình phần còn lại của dự án tùy thuộc vào bạn. Giống như JQuery, bạn có thể bao gồm React trong dự án 1 phần hoặc hoàn toàn. Vì vậy, React JS một library.
Bây giờ, hãy tiếp tục tìm hiểu cách mà React hoạt động

## React Virtual DOM
Để hiểu tầm quan trọng của React Virtual DOM, trước tiên, bạn cần biết DOM (Document Object Model) là gì.
DOM về cơ bản là sự thể hiện code HTML trong một trang web. Document chính là trang web, các objects chính là các thẻ HTML. Và cuối cùng, mô hình của DOM là một cấu trúc cây:
![](https://images.viblo.asia/ffc9acc0-c0be-4d9f-8383-e80d0c04d8d8.png)
Cấu trúc cây of the Document Object Model

### Lợi ích của Virtual DOM là gì?
Mỗi khi bạn thực hiện thay đổi code, DOM sẽ được cập nhật và viết lại hoàn toàn. Đây là một hoạt động tiêu tốn rất nhiều thời gian, làm giảm performance. Trong điểm này, React cung cấp một giải pháp: Virtual DOM.

Vì vậy, khi một cái gì đó thay đổi:
* Trước tiên, React tạo một bản sao chính xác của DOM
* Sau đó React chỉ ra phần nào mới và chỉ cập nhật phần cụ thể đó trong Virtual DOM
* Cuối cùng, React chỉ sao chép các phần mới của DOM ảo sang DOM thực tế, thay vì viết lại hoàn toàn.

Cách tiếp cận này làm cho một trang web nhanh hơn nhiều so với một trang web tiêu chuẩn. Đó cũng là một trong những lý do khiến React trở nên phổ biến.

## React’s Core Syntax: JSX
Trong lập trình Frontend cổ điển, chúng ta tách cấu trúc thành tệp HTML, CSS và JS. React có một chút khác biệt. Chúng ta không tách các tệp HTML riêng biệt trong React.

> Trong cú pháp JSX, chúng ta sẽ viết các thẻ HTML bên trong JavaScript.

**Wait... CÁI GÌ CƠ!?**

Chính xác :)  Trong React, ví dụ, một biến JavaScript đơn giản có thể như thế này:

```const element = <h1> Sun Asterisk </ h1>;```

Bình thường, mình không thể gán một thẻ HTML cho một biến JavaScript. Nhưng với JSX, chúng ta có thể. Code ở trên không phải là HTML hay JavaScript. Nó là một ví dụ về JSX.

**Vậy thế cái này là gì, JSX ấy?**

**JSX (JavaScript XML)** là một cú pháp mở rộng từ JavaScript được React sử dụng. Về cơ bản, JSX được sử dụng để viết các thẻ HTML bên trong JavaScript. Sau đó, mã JSX sẽ được dịch sang JavaScript thông thường, bởi **Babel**.

Tóm lại, React không có các file HTML, các thẻ HTML được hiển thị trực tiếp bên trong JavaScript. **Cách này làm cho React nhanh hơn**.

**Tôi có phải làm việc với JSX không?**

Bạn không cần phải sử dụng JSX với React, nhưng nó được khuyến khích. JSX đơn giản hóa React và làm cho nó dễ đọc hơn. Để tôi đưa ra một ví dụ về code React có và không có JSX.

**React với JSX:**
```
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

ReactDOM.render(
  <Hello toWhat="World"  />,
  document.getElementById('root')
)
```

Tôi sẽ giải thích ngắn gọn đoạn code trên. Chúng ta có một class React có tên là **"Hello"**. Đây là class React **mặc định** với hàm **render** chính nó. Class trả về một phần tử HTML là **div** để nó được render sau này dưới dạng một component, ở bất cứ nơi đâu trong dự án của bạn.

Bên dưới class, có một hàm React DOM Render đang gọi lớp Hello, như một component **(<Hello />)** và chỉ định object có Id là **(root)** code React của bạn sẽ được thực thi.

**React không dùng JSX:**
```
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`)
  }
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```

Còn đây là mã React giống như JavaScript nhưng không có JSX. Bạn thấy cái nào dễ hơn?

**Một vài rules quan trọng khi dùng JSX:**
* Chúng ta không thể cùng lúc return nhiều phần tử HTML, nhưng chúng ta có thể gói các phần tử bên trong thẻ HTML gốc:

```
class Test extends React.Component {
  render() {
    return (
      <div>
        <p>Hello</p>
        <p>World</p>
      </div>
    );
  }
}
```

* Chúng ta có thể sử dụng JSX bên trong các vòng lặp hoặc if-else:
```
render() {
    if(condition==true) {
        return <p>This text</p>;
    } else {
        return <p>Another text</p>;
    }
}
```

* Tên của thuộc tính HTML như "class" trở thành lớp "className", "tabindex" trở thành “tabIndex” theo kiểu camelCase
```
<div className="myClass"></div>
```
* Thẻ HTML phải luôn luôn được đóng nha.
## Installation
Cuối cùng, bạn có thể làm theo các hướng dẫn bên dưới để cài đặt React:
* React đòi hỏi Nodejs.  Để biết máy bạn có Nodejs chưa, bạn kiểm tra bằng cách gõ ```node -v``` trên terminal. 
* Sau khi cài đặt Nodejs, hãy mở Terminal hoặc Command Prompt và nhập lệnh sau để tạo app React:
```
npx create-react-app my-app
cd my-app
```
* Cuối cùng, gõ npm start và app sẽ chạy trên localhost.
Tham khảo thêm cài đặt tại [đây](https://github.com/facebook/create-react-app?source=post_page---------------------------)

Hy vọng rằng bài viết sẽ giúp bạn có được sự hiểu biết đầu tiên về React. React có vẻ phức tạp lúc ban đầu but that will be OK.

Cảm ơn bạn đã đọc và hẹn gặp lại các bạn sớm!

Tham khảo thêm tại: https://codeburst.io/react-js-for-beginners-the-basics-87ef6e54dae7