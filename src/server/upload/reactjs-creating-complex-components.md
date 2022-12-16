Trong bài viết lần trước về [Component](https://viblo.asia/p/reactjs-components-in-react-1VgZvXgM5Aw), chúng ta đã tìm hiểu sơ qua khái niệm và cách tạo 1 React Component. Trong bài viết lần này, chúng ta cùng tìm hiểu thêm 1 điểm mạnh tuyệt vời của Component nữa. Đấy là kết hợp các Component với nhau, hay còn gọi là tạo ra các component phức tạp.

Trong các seri bài viết, chúng ta thường lấy các ví dụ đơn giản nhất cho người đọc có thể dễ dàng hình dung và tiếp cận, nhưng trong thực tế, để tạo ra được 1 website sinh động, không đơn giản như vậy. Còn nhiều hơn là việc chúng ta đưa ra hình ảnh các cái tên hay các chữ cái như trong 3 bài viết trước đây.
![](https://images.viblo.asia/c7cc4907-e566-4052-b61a-cf7dcc7b84a8.png)

Với 1 yêu cầu phức tạp hơn, 1 ví dụ về việc tạo ra 1 bảng mã màu 
![](https://images.viblo.asia/91d9dacb-3ae8-4165-b4b8-22efbc2de126.png)

Ở đây chúng ta thấy đây chỉ là 1 bảng mã màu đơn giản thôi nhỉ, nhưng khi bắt tay vào code, cho 1 mã màu, rồi cho n n mã màu khác nhau chúng ta sẽ phải làm gì :-?
Cùng phân tích 1 chút trước khi ngồi cào phím 

Trước khi đi sâu vào phân tích các thành phần con, hãy cùng để ý đến cái tổng thể, ví dụ ở đây chúng ta có 1 Component Lớn là 1 thẻ mã màu 
![](https://images.viblo.asia/eb2bf5a6-d91d-42b5-9b6a-8576edd8e4d6.png)

Tiếp đến cái ai cũng thấy rõ là ở cái thẻ màu này có 2 phần : 1 là phần hiển thị màu, nằm phía trên. 2 là phần hiển thị mã màu nằm ở dưới.
![](https://images.viblo.asia/e8e20a17-ab5b-4524-af19-fc48b0228855.png)

Tiếp tục, ở thành phần thứ 2 là phần hiển thị mã màu, chúng ta lại có thể chia nó thành 2 phần con nữa: 1 là phần background màu trắng, và 2 là đoạn text mã màu 

![](https://images.viblo.asia/9b9306ca-4d35-4888-bfb7-848d6981021c.png)

Như vậy, nhìn sơ qua chúng ta đã có ít nhất 5 Component, chỉ từ 1 phiếu mã màu đơn giản.

Okay, xong cái nhẹ bước phân tích, chúng ta bắt tay vào làm nó thôi.
# Tạo các Component
Và vẫn như mọi khi chúng ta cần 1 trang HTML chứa ReactJS source link, và nếu chưa có, coppy đoạn code dưới đây :
```html
<!DOCTYPE html>
<html>
 
<head>
  <meta charset="utf-8">
  <title>More Components</title>
  <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
 
  <style>
    #container {
      padding: 50px;
      background-color: #FFF;
    }
  </style>
</head>
 
<body>
  <div id="container"></div>
 
  <script type="text/babel">
    ReactDOM.render(
      <div>
       
      </div>,
      document.querySelector("#container")
    );
  </script>
</body>
 
</html>
```

Như phân tích ban đầu, chúng ta cần 3 thành phần con bao gồm 1 là Square(hình vuông màu), 2 Card( thằng cha) 3, Lable( cái nhãn màu dưới). Tạo 3 Component tương ứng thôi 
```js
class Square extends React.Component {
  render() {
    return(
      <br/>
    );
  }
}
 
class Label extends React.Component {
  render() {
    return(
      <br/>
    );
  }
}
 
class Card extends React.Component {
  render() {
    return(
      <br/>
    );
  }
}
```


## 1. Card Component
Chúng ta sẽ bắt đầu với Component Cha trước, bao gồm việc tạo ra styling cho nó
```js
class Card extends React.Component {
  render() {
    var cardStyle = {
      height: 200,
      width: 150,
      padding: 0,
      backgroundColor: "#FFF",
      WebkitFilter: "drop-shadow(0px 0px 5px #666)",
      filter: "drop-shadow(0px 0px 5px #666)"
    };
 
    return (
      <div style={cardStyle}>
 
      </div>
    );
  }
}
```
Đây là Component cha ngoài cùng, sẽ bọc 2 component con là Square và Label.

![](https://images.viblo.asia/38c3306b-f3cc-47d9-b07b-20e0fc831c4e.png)

## Square Component
Tiếp theo cũng ta tạo tiếp 1 Component là Square
```js
class Square extends React.Component {
  render() {
    var squareStyle = {
      height: 150,
      backgroundColor: "#FF6663"
    };
 
    return (
      <div style={squareStyle}>
 
      </div>
    );
  }
}
```

Vì đây là Component con của Card, nên chúng ta sẽ nhét nó vào bên trong Card Component
```js
class Card extends React.Component {
  render() {
    var cardStyle = {
      height: 200,
      width: 150,
      padding: 0,
      backgroundColor: "#FFF",
      WebkitFilter: "drop-shadow(0px 0px 5px #666)",
      filter: "drop-shadow(0px 0px 5px #666)"
    };
 
    return (
      <div style={cardStyle}>
        <Square />
      </div>
    );
  }
}
```

Mỗi khi gọi tới Card, đồng thời chúng ta sẽ gọi luôn Square. Thành quả sẽ là 
![](https://images.viblo.asia/70a82566-4d1a-4a35-8c6a-f7fb318ba54d.png)

Trông có vẻ dễ nhỉ :v: 

## Label Component
Và cuối cùng là label mã màu. Chúng ta viết thêm 1 tý vào Label Component 
```js
class Label extends React.Component {
  render() {
    var labelStyle = {
      fontFamily: "sans-serif",
      fontWeight: "bold",
      padding: 13,
      margin: 0
    };
 
    return (
      <p style={labelStyle}>#FF6663</p>
    );
  }
}
```

vẫn như khi nãy, sau khi viết xong, chúng ta lại gọi nó ở bên trong Card Component.
```js
class Card extends React.Component {
  render() {
    var cardStyle = {
      height: 200,
      width: 150,
      padding: 0,
      backgroundColor: "#FFF",
      WebkitFilter: "drop-shadow(0px 0px 5px #666)",
      filter: "drop-shadow(0px 0px 5px #666)"
    };
 
    return (
      <div style={cardStyle}>
        <Square />
        <Label />
      </div>
    );
  }
}
```

Và đây là kết quả hoàn thành 1 card màu 
![](https://images.viblo.asia/8c00daaa-60ec-45ad-b23a-7c6c45863123.png)

Nhưng đây chỉ mới là 1 Card màu cố định, vậy thì nếu nhiều màu chúng ta làm sao ? 

Tiếp tục, chúng ta sẽ thay đổi 1 chút, cho việc hiển thị nhiều card màu khác nhau. Bằng cách thêm thuộc tính `color` bên trong Square Component
```js
class Square extends React.Component {
  render() {
    var squareStyle = {
      height: 150,
      backgroundColor: this.props.color
    };
 
    return (
      <div style={squareStyle}>
 
      </div>
    );
  }
}
```

Giá trị background color bây giờ đã được thay đổi mỗi khi chúng ta truyền vào 

```js
class Label extends React.Component {
  render() {
    var labelStyle = {
      fontFamily: "sans-serif",
      fontWeight: "bold",
      padding: 13,
      margin: 0
    };
 
    return (
      <p style={labelStyle}>{this.props.color}</p>
    );
  }
}
```

Và cuối cùng là gọi nó 
```js
class Card extends React.Component {
  render() {
    var cardStyle = {
      height: 200,
      width: 150,
      padding: 0,
      backgroundColor: "#FFF",
      WebkitFilter: "drop-shadow(0px 0px 5px #666)",
      filter: "drop-shadow(0px 0px 5px #666)"
    };
 
    return (
      <div style={cardStyle}>
        <Square color={this.props.color} />
        <Label color={this.props.color} />
      </div>
    );
  }
}
 
ReactDOM.render(
  <div>
    <Card color="#FF6663" />
    <Card color="#FFA737" />
    <Card color="#FFFFFF" />
  </div>,
  document.querySelector("#container")
);
```

Và đây là thành quả 
![](https://images.viblo.asia/2bdc43ef-9cbd-4124-b18d-2109892864d5.png)

# Tổng kết
Qua bài viết này, chúng ta đã cùng tìm hiểu tiếp làm cách nào mà các Component trong ReactJS hoạt động kết hợp được với nhau. Hy vọng bài viết này giúp các bạn có thể có cái nhìn khác hơn việc thiết kế kiến trúc cho các Component trong project của mình.
Hẹn gặp lại các bạn ở phần tiếp theo: Transferring Properties


*https://www.kirupa.com/react/creating_complex_components.htm*