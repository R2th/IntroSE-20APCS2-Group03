# JSX là gì ?
* Trong bài viết lần này, chúng ta sẽ cùng nhau tìm hiểu về ReactJS JSX là gì, nó làm gì và cấu trúc như thế nào. Tại sao nhìn lại giống HTML nhưng không gọi nó là HTML, điều gì làm cho nó trở nên khác biệt.

* Chúng ta cùng tìm hiểu nhé

## What Happens with JSX?
* Trong bài viết này, điều mà chúng ta quan tâm đến là cái gì sẽ xãy ra sau khi chúng ta viết 1 đoạn JSX. Cách mà trình duyệt hiểu JSX và chuyển nó thành HTML thông thường.

* Chúng ta hãy cùng xem lại ví dụ về 1 component Card:

```
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
     
    return React.createElement(
      "div",
      { style: cardStyle },
      React.createElement(Square, { color: this.props.color }),
      React.createElement(Label, { color: this.props.color })
    );
  }
};
```
* Thoạt nhìn chúng ta biết ngay đâu là cú pháp JSX:
```
<div style={cardStyle}>
  <Square color={this.props.color}/>
  <Label color={this.props.color}/>
</div>
```
* Chúng ta đã biết rằng trình duyệt web của chúng ta không thể hiểu được mã JSX, chúng thậm chí còn không biết JSX là cái gì. Ngay cả khi chúng ta cố gắn mô tả cụ thể về JSX, chính vì thế mà chúng ta cần sử dụng đến thư viện Babel để phiên dịch JSX trở thành thứ mà trình duyệt có thể hiểu được: Javascript.
* Điều đó có nghĩa là đoạn code JSX ở trên sau khi phiên dịch, nó sẽ trở thành 1 đoạn mã Javascript thuần túy như thế này:

```
return React.createElement(
  "div",
  { style: cardStyle },
  React.createElement(Square, { color: this.props.color }),
  React.createElement(Label, { color: this.props.color })
);
```
* Toàn bộ các thành phần, thuộc tính này được gọi trong hàm khởi tạo createElement với các giá trị khởi tạo. Và đây là toàn bộ code Javascript của component Card sau khi chuyển thành javascript:

```
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
     
    return React.createElement(
      "div",
      { style: cardStyle },
      React.createElement(Square, { color: this.props.color }),
      React.createElement(Label, { color: this.props.color })
    );
  }
};
```
* Và điều đó giải đáp cho câu hỏi của chúng ta ban đầu, làm thế nào để 1 đoạn JSX của chúng ta có thể hoạt động? Nó sẽ được chuyển từ JSX sang Javascript 1 cách cực thân thiện.

## Evaluating Expressions

* JSX cũng tương tự như Javascript thôi. Và đương nhiên JSX cũng không phải bó buộc chúng ta vào những nội dung cố định:

```
class Stuff extends React.Component {
  render() {
    return (
      <h1>Boring static content!</h1>
    );
  }
};
```
* Chúng ta vẫn có thể làm thêm vài thứ khác, ví dụ như cho ra 1 con số ngẫu nhiên, việc của chúng ta là đưa cái biểu thức đó vào cặp dấu { }.

```
class Stuff extends React.Component {
  render() {
    return (
      <h1>Boring {Math.random() * 100} content!</h1>
    );
  }
}
```

* Và đương nhiên Math.random()*100 là 1 biểu thức lấy ra 1 số ngẫu nhiên, và nếu chúng ta không đưa vào trong { } thì nó cũng sẽ chỉ là 1 đoạn text. Cái này nhắc thôi chứ chắc ai cũng biết rồi.

## Returning Multiple Elements
* Trong nhiều các ví dụ lần trước. Chúng ta đã thường return về các element, đại loại như 1 div. Thực ra chúng ta có thể làm nhiều hơn thế như return về nhiều các element khác nhau.

* Có 2 cách có thể làm được như vậy:

* Cách thứ nhất đấy là chúng ta dùng cú pháp tương tự như Array:
```
class Stuff extends React.Component {
  render() {
    return (
      [
        <p>I am</p>,
        <p>returning a list</p>,
        <p>of things!</p>
      ]
    );
  }
}
```

* Ở trên, chúng ta trả về 3 thẻ 'p',Giữa chúng không có chung 1 yếu tố nào. Bây giờ chúng ta sẽ return nhiều lần như vậy, và ở đây có 1 điều cần chú ý đó là khi trả về 3 thẻ p chúng không có gì đễ phân biệt nên có thể sẽ gây nhầm lẫn trong các mục đích sử dụng lại sau này.

* Vì thế mà chúng ta nên thêm 1 key để phân biệt chúng :

```
class Stuff extends React.Component {
  render() {
    return (
      [
        <p key="1">I am</p>,
        <p key="2">returning a list</p>,
        <p key="3">of things!</p>
      ]
    );
  }
};
```

* Điều này giúp React hiểu được, cụ thể ở mỗi element mà các bạn return về, cái nào đang thay đổi, cái nào không. Và đương nhiên nếu chúng ta không cần làm gì thì không cần thêm Key vào. Nếu các bạn quên, thì React cũng sẽ nhắc cho các bạn biết được thông qua Dev Tools Console.

* Đại loại như: Warning: Each child in an array or iterator should have a unique "key" prop.

* Cách thứ 2 chúng ta có thể làm, không phải khai báo dạng [ ] là sử dụng React.Fragment.
* Đoạn code trên sẽ thành :

```
 
class Stuff extends React.Component {
  render() {
    return (
      <React.Fragment>
        <p>I am</p>
        <p>returning a list</p>
        <p>of things!</p>
      </React.Fragment>
    );
  }
};
```

* Nhưng có 1 số điều cần lưu ý khi dùng Fragment:

1.  Component này không thực sự sẽ tạo ra 1 DOM element, chúng chỉ như là 1 JSX và không được chuyển thành HTML.
1.  Nó không có cú pháp như 1 Array nên chúng ta viết chúng mà không cần dùng dấu 
1. Không cần chỉ định key.
1. Thay vì gọi <React.Fragment và </ React.Fragment> chúng ta viết đơn giản như là <> và </>.

## Can’t Specify CSS Inline
* Trong bài viết trước về styling trong React chúng ta biết rằng JSX khác với HTML và các bạn sẽ không thể viết CSS kiểu inline như:
```
<div style="font-family:Arial;font-size:24px">
    <p>Blah!</p>
</div
```
Với JSX, chúng ta buộc phải định nghĩa nó riêng ra:

```
class Letter extends React.Component {
  render() {
    var letterStyle = {
      padding: 10,
      margin: 10,
      backgroundColor: this.props.bgcolor,
      color: "#333",
      display: "inline-block",
      fontFamily: "monospace",
      fontSize: "32",
      textAlign: "center"
    };
 
    return (
      <div style={letterStyle}>
        {this.props.children}
      </div>
    );
  }
}
```
## Comment code

* Về block comment thì JSX cũng tương tự như JS. Nhưng chú ý 1 chút, nếu chúng ta comment vào trong 1 element thì chúng ta vẫn phải thêm vào cặp dấu { } để React biết đây là phần đang comment

```
{/* I am a child comment */}
```
* Còn nếu dùng cho nhiều line và bên trong 1 thẻ thì nó sẽ như này:
```
ReactDOM.render(
  <div className="slideIn">
    <p className="emphasis">Gabagool!</p>
    <Label
      /* This comment
         goes across
         multiple lines */
         className="colorCard" // end of line
    />
  </div>,
  document.querySelector("#container")
);
```
## Kết luận

* Bài này chúng ta tìm hiểu lại sơ qua cách mà trình duyệt chúng ta có thể hiểu với JSX và 1 vài lưu ý khi sử dụng JSX. Nó trông giống như HTML nhưng thật ra thì không phải.

* Cảm ơn các bạn đã theo dõi, chúc các bạn 1 ngày làm việc vui vẻ!