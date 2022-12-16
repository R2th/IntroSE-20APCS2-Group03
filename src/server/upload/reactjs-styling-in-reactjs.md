Như đã đề cập đến trong bài viết trước đó về [Component in ReactJS](https://viblo.asia/p/components-in-react-1VgZvXgM5Aw), trong bài viết này chúng ta sẽ cùng nhau tìm hiểu về cách thức đưa CSS vào React App. Thực ra thì cứ đưa vào như bình thường thôi :v: 
# 1. Ví dụ: Hiển thị các chữ cái 
Để tìm hiểu về cách thêm css vào nội dung của React, chúng ta đi vào 1 ví dụ đơn giản là hiển thị các chữ cái nguyên âm ra trang web của mình. Vẫn như mọi khi, chúng ta cần 1 file HTML chứa link ReactJS, còn nếu chưa có thì coppy cái này :

```html
<!DOCTYPE html>
<html>
  
<head>
  <meta charset="utf-8">
  <title>Styling in React</title>
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
</body>
```

Trước tiên, để hiển thị các chữ cái, chúng ta tạo ra 1 [Component](https://viblo.asia/p/components-in-react-1VgZvXgM5Aw) gọi là Letter
```js
class Letter extends React.Component {
    render() {
      return(
        <div>
          {this.props.children}
        </div>
      );
    }
  }
```
Và hiển thị chúng ra view qua `render`
```js
var destination = document.querySelector("#container");
ReactDOM.render(
    <div>
      <Letter>A</Letter>
      <Letter>E</Letter>
      <Letter>I</Letter>
      <Letter>O</Letter>
      <Letter>U</Letter>
    </div>,
    destination
  );
```
![](https://images.viblo.asia/eaa94628-e327-489a-b8fb-a40c509e297e.png)
Việc này đơn giản, và chúng ta đã làm được nó trong tutorial trước đó. Nhưng nhìn thì nó khá xấu, và chúng ta cần trang trí lại một chút cho nó. 
Đừng lo, CSS có thể giúp được chúng ta
# 2. Trang trí nội dung cho React App với CSS
Việc sử dụng CSS trong React thực sự đơn giản và giống như đối với các JS framwork khác. Nhưng trước tiên, chúng ta cần tìm hiểu về cách mà các thẻ HTML được tạo ra từ JSX

```html
<div>
  <Letter>A</Letter>
  <Letter>E</Letter>
  <Letter>I</Letter>
  <Letter>O</Letter>
  <Letter>U</Letter>
</div>    
```
Ở đây chúng ta hiển thị ra các Component Letter với nội dung là các chữ cái được truyền vào thuộc tính `this.props.children`.
```
<div>
  {this.props.children}
</div>    
```
Cũng không khác gì nhau, sau đó DOM sẽ cấu trúc lại các thẻ này và hiển thị chúng ra view như 1 cấu trúc HTML thông thường
![](https://images.viblo.asia/d38ed21d-f04e-41bd-ac73-0faa9efea4a2.png)

Ở đây, mỗi chữ cái được lồng nhau bởi 3 thẻ `div`.  Việc chúng ta cần làm là viết 1 Style cho `div div div` mà thôi. 

```css
div div div {
  padding: 10px;
  margin: 10px;
  background-color: #ffde00;
  color: #333;
  display: inline-block;
  font-family: monospace;
  font-size: 32px;
  text-align: center;
}
```

Tiếp theo, việc chúng ta cần làm là đặt thêm các class `letter` vào Component Letter

```js
class Letter extends React.Component {
  render() {
    return (
      <div className="letter">
        {this.props.children}
      </div>
    );
  }
}
```

Mỗi thẻ `div` sinh ra sẽ nhận 1 giá trị class tương ứng là `className="letter"`

```css
.letter {
  padding: 10px;
  margin: 10px;
  background-color: #ffde00;
  color: #333;
  display: inline-block;
  font-family: monospace;
  font-size: 32px;
  text-align: center;
}   
```

Việc dùng CSS cho JSX React thực sự đơn giản, và đây là kết quả
![](https://images.viblo.asia/2d15ce59-321a-4e71-bdee-98e70b93c433.png)


```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Styling in React</title>
  <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

  <style>
    #container {
      padding: 50px;
      background-color: #FFF;
    }

    div div div {
      padding: 10px;
      margin: 10px;
      background-color: #ffde00;
      color: #333;
      display: inline-block;
      font-family: monospace;
      font-size: 32px;
      text-align: center;
    }

    .letter {
      padding: 10px;
      margin: 10px;
      background-color: #ffde00;
      color: #333;
      display: inline-block;
      font-family: monospace;
      font-size: 32px;
      text-align: center;
    }
  </style>
</head>

<body>
  <div id="container"></div>
  <script type="text/babel">
  var destination = document.querySelector("#container");

  class Letter extends React.Component {
    render() {
      return(
        <div className="letter">
          {this.props.children}
        </div>
      );
    }
  }

  ReactDOM.render(
    <div>
      <Letter>A</Letter>
      <Letter>E</Letter>
      <Letter>I</Letter>
      <Letter>O</Letter>
      <Letter>U</Letter>
    </div>,
    destination
  );
</script>
</body>

```

Tuy nhiên, đây không hẵn là 1 cách thông thường mà 1 dev React sử dụng.  Mặc dù nó đơn giản, nhưng việc tối ưu hóa tài nguyên và clear hơn trong việc code, chúng ta hãy tìm hiểu cách tiếp cận mới dưới đây.
Đầu tiên, trả lại nguyên trạng Letter Component trước khi chúng ta thêm CSS vào 
```js
class Letter extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
```
Sau đó thay vì viết css ngoài, chúng ta tạo 1 object chứa css bên trong Component
```js
class Letter extends React.Component {
  render() {
    var letterStyle = {
      padding: 10,
      margin: 10,
      backgroundColor: "#ffde00",
      color: "#333",
      display: "inline-block",
      fontFamily: "monospace",
      fontSize: 32,
      textAlign: "center"
    };
 
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
```
Ở đây, chúng ta sẽ có 1 object có tên letterStyle, và phần tử bên trong object này là các CSS Attributes, và tên các thuộc tính này có 1 chút thay đổi :
1.  Các thuật tính có tên là 1 chữ, ví dụ như padding, margin, color ... sẽ được giữ nguyên
2.  Các thuật tính có tên kết hợp 2 hay nhiều chữ ví dụ background-color, border-radius... Sẽ được đặt lại tên theo kiểu "camel cased" trở thành backgroundColor, borderRadius ...

Bây giờ, chúng ta đã có 1 object chứa các thuộc tính css. Việc chúng ta cần là gán nó vào html tag trong Component mà chúng ta cần:

```js
return(
    <div style={letterStyle}>
        {this.props.children}
    </div>
);
```

Và đây là kết quả 
![](https://images.viblo.asia/7402b6bb-8641-46c2-979c-e367bdeac82f.png)

Các thuộc tính CSS trong Component được parse ra thành các thuộc tính CSS inline.

Vậy nếu chúng ta muốn cho mỗi chữ cái có 1 backgroundColor khác nhau thì sẽ như nào :-?
Việc này đơn giản thôi, chúng ta  sẽ truyền lên các màu #FFFFFF riêng biệt thông qua this.props.bgcolor. Và truyền chúng vào object letterStyle

```js
ReactDOM.render(
    <div>
        <Letter bgcolor="#58B3FF">A</Letter>
        <Letter bgcolor="#FF605F">E</Letter>
        <Letter bgcolor="#FFD52E">I</Letter>
        <Letter bgcolor="#49DD8E">O</Letter>
        <Letter bgcolor="#AE99FF">U</Letter>
    </div>,
    destination
);
```
```
backgroundColor: this.props.bgcolor,
```

Và bây giờ, chúng ta dễ dàng thay đổi được CSS cho các chữ cái của mình. Dễ hơn rất nhìu so với việc các bạn sử dụng class .letter như ban đầu

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Styling in React</title>
  <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

  <style>
    #container {
      padding: 50px;
      background-color: #FFF;
    }

    div div div {
      padding: 10px;
      margin: 10px;
      background-color: #ffde00;
      color: #333;
      display: inline-block;
      font-family: monospace;
      font-size: 32px;
      text-align: center;
    }

  </style>
</head>

<body>
  <div id="container"></div>
  <script type="text/babel">
  var destination = document.querySelector("#container");

  class Letter extends React.Component {
    render() {
        var letterStyle = {
            padding: 10,
            margin: 10,
            backgroundColor: this.props.bgcolor,
            color: "#333",
            display: "inline-block",
            fontFamily: "monospace",
            fontSize: 32,
            textAlign: "center"
        };

        return(
            <div style={letterStyle}>
                {this.props.children}
            </div>
        );
    }
}


  ReactDOM.render(
    <div>
      <Letter bgcolor="#58B3FF">A</Letter>
      <Letter bgcolor="#FF605F">E</Letter>
      <Letter bgcolor="#FFD52E">I</Letter>
      <Letter bgcolor="#49DD8E">O</Letter>
      <Letter bgcolor="#AE99FF">U</Letter>
    </div>,
    destination
  );
</script>
</body>

```

![](https://images.viblo.asia/e100a90a-2598-499f-85a3-6cb4dac8f4d3.png) 

Đến đây các bạn thấy sự lợi hại của nó chưa :v: , Good Practice
# 3. Tổng kết
Ở trên, chúng ta tìm hiểu qua 2 cách thêm CSS cho nội dung các thẻ HTML trên JSX ReactJS. Hy vọng mọi người có cái nhìn tổng quát, và cân nhắc việc lựa chọn phương pháp phù hợp với từng thời điển sử dụng.

Hẹn các bạn ở bài viết tiếp theo: Creating Complex Component
Chúc các bạn 1 ngày tốt lành!


*https://www.kirupa.com/react/styling_in_react.htm*