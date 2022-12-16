Trong các bài viết trước, các bạn đã từng thấy các thuộc tính của Component như this.props.color ... , có lẽ nhìu người vẫn chưa hiểu được thế nào được gọi là 1 props trong React, nhân đây chúng ta cùng tìm hiểu qua 1 chút nhé

Với ReactJS, Props đơn giản là viết tắt của Properties. Trong thực tế nó là 1 object lưu trữ các giá trị (attributes) của 1 thẻ (tag). Khi chúng ta tạo 1 Component cũng tương tự như khi chúng ta tạo 1 thẻ (tag) mới trong HTML, và mỗi 1 property tương ứng của 1 Component cũng chính là 1 attributes của thẻ(tag).
Props này thường được sử dụng để truyền giá trị vào các Component. Ngoài ra 1 Component còn 1 khái niệm là State, các bạn có thể tìm hiểu thêm về [props](https://reactjs.org/docs/components-and-props.html) và [state](https://reactjs.org/docs/state-and-lifecycle.html).
# Phát hiện vấn đề
Có 1 vấn đề đối với ReactJS, chúng ta cùng tìm hiểu qua ví dụ sau
Trong các bài toán thực tế, có thể chúng ta sẽ có các Component lồng nhau và tạo thành  kiến trúc dạng chuỗi như thế này :

![](https://images.viblo.asia/9e102d3f-f338-492e-a8d5-802b3f401345.png)

Giả sử, hình tròn màu đỏ là 1 Component cha, và tiếp theo từ trên xuống là các Component con được lồng vào. Bây giờ ta có 1 Giá trị cần gửi từ đỏ xuống tím. Theo cách thông thường, chúng ta sẽ truyền thẳng giá trị :
![](https://images.viblo.asia/e4aea910-6678-4d77-90e7-19078f78b994.png)

Nhưng đối với ReactJS việc này là không thể. Trong kiến trúc luồng dữ liệu của ReactJS, các giá trị chỉ có thể truyền thông qua từng bậc liên kết với nhau, nghĩa là để tím có thể nhận được giá trị từ đỏ chúng ta chỉ có 1 con đường là truyền từ đỏ -> vàng -> xanh lá -> tím.
![](https://images.viblo.asia/58ca318f-e98c-4eaf-aa42-b6c9a07a4589.png)

Đây chính là cách mà React truyền dữ liệu giữa các Component.
Cũng dễ hiểu thôi, thế nhưng trong thực tế, mỗi lần như thế không phải chúng ta chỉ truyền 1 thuộc tính hay giá trị xuống cho các component con

![](https://images.viblo.asia/8ec3ece2-661b-41f9-8f4c-bbe84e4d0588.png)

Có thể là 1, cũng có thể 2 hoặc 10, 100 giá trị, khi đó code chúng ta sẽ dài lượt thược

![](https://images.viblo.asia/f2ba44ff-13f7-4259-9d61-b58ce60af003.png)
```js
class Display extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.color}</p>
        <p>{this.props.num}</p>
        <p>{this.props.size}</p>
      </div>
    );
  }
}
 
class Label extends React.Component {
  render() {
    return (
      <Display color={this.props.color}
               num={this.props.num}
               size={this.props.size}/>
    );
  }
}
 
class Shirt extends React.Component {
  render() {
    return (
      <div>
        <Label color={this.props.color}
               num={this.props.num}
               size={this.props.size}/>
      </div>
    );
  }
}
 
ReactDOM.render(
  <div>
    <Shirt color="steelblue" num="3.14" size="medium" />
  </div>,
  document.querySelector("#container")
);
```

Ở đây, muốn truyền 3 giá trị color, num, và size đã dài ngoằng rồi.

May mắn thay, có 1 cách để chúng ta có thể rút ngắn code của mình đó là `Spread Operator`

Hãy xem qua đoạn code này :
```js
var items = ["1", "2", "3"];
 
function printStuff(a, b, c) {
  console.log("Printing: " + a + " " + b + " " + c);
}
```
ở đây chúng ta sẽ gọi 1 cách khá rườm rà 

```js
printStuff(items[0], items[1], items[2]);
```

và nếu lên n phần tử, chả biết viết bao giờ mới xong. Thay vào đó khi sử dụng `Spread Operator` , chúng ta sẽ đỡ được phần nào
```js
printStuff(...items);
```

Và đương nhiên cú pháp này áp dụng tốt cho ReactJS

```js
class Display extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.color}</p>
        <p>{this.props.num}</p>
        <p>{this.props.size}</p>
      </div>
    );
  }
}
 
class Label extends React.Component {
  render() {
    return (
      <Display {...this.props} />
    );
  }
}
 
class Shirt extends React.Component {
  render() {
    return (
      <div>
        <Label {...this.props} />
      </div>
    );
  }
}
```

# Kết luận
Bài viết này, chúng ta tìm hiểu nhẹ qua thế nào là props, cách truyền dữ liệu giữa các component trong ReactJS, và 1 Trick nhỏ cho việc viết lách của chúng ta dễ dàng hơn. Hy vọng có ích với mọi người
Trong phần tiếp theo, chúng ta sẽ lại trở về với JSX và cùng nghiên cứu 1 vài điểm đặc biệt về nó nhé. Hẹn gặp lại!

*https://www.kirupa.com/react/transferring_properties.htm*