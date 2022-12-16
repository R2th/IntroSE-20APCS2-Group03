Chắc hẳn sẽ có những người mới học react js như tôi sẽ gặp phải vấn đề với việc build app react bằng  các nguồn tài liệu học react trên mạng  - trong khi phiên bản của react liên tục được nâng cấp và thay đổi. Hy vọng bài viết này có thể hức ích với một số người.
![](https://images.viblo.asia/d308fbaf-24e6-4fed-bf65-014520c51a9a.png)

## Đối tượng: những người chỉ mới biết sử dụng duy nhất 1 thư viện jquery
Trong số những người chưa bao giờ dùng thử React, một số người cảm thấy thoải mái với các framework JS frontend như Backbone, Ember hoặc Angular. Một số người biết JavaScript khá tốt. Một số người biết chỉ cần đủ jQuery để học được. Một hướng dẫn mà hiệu quả với một nhóm đối tượng cụ thể có thể sẽ không tối ưu cho các nhóm khác.

Trong hướng dẫn này, tôi đã nhắm mục tiêu vào nhóm thứ ba mà tôi đã đề cập: những người biết đủ jQuery. Ví dụ về những người có thể phù hợp với thể loại này sẽ là:
* Cơ bản về HTML/CSS/jQuery.
* Biết dùng các jQuery plugins.
* Có kinh nghiệm với ứng dụng sử dụng HTML-CSS-JQUERY
* Có kinh nghiệm với ứng dụng sử dụng bootstrap và jquery cơ bản để làm việc với frontend
*  Bất cứ ai copy paste nhiều hơn là tự kiến trúc mã javascript của mình trong khi code =)).

**Nếu bạn có skill JavaScript ngon lành hoặc biết bất kỳ framework nào như Backbone / Ember / Angular / Vue ... thì hướng dẫn này KHÔNG dành cho bạn** và bạn sẽ rất thất vọng với phong cách viết của tôi. Có rất nhiều hướng dẫn tuyệt vời mà bạn có thể học hỏi, bao gồm cả hướng dẫn trên trang chủ [React chính thức](https://reactjs.org/tutorial/tutorial.html)
Ngoài ra, nếu bạn **đã biết React,** bạn cũng sẽ rất khó chịu với tôi vì tôi sẽ nói chủ yếu về **state** thay vì immutability hoặc các component. Tuy nhiên, tôi thấy rằng học state trước tiên là cách tốt nhất để các nhà phát triển jQuery thấy lý do tại sao React lại vượt trội.

*Không dài dong nữa, bắt đầu thôi!*

## Tổng quan: Chúng ta sẽ xây dựng một Tweet Box
Giao diện người dùng mà chúng ta xây dựng sẽ giống với Tweet Box mà bạn tìm thấy trên Twitter. Nó không được chính xác như Tweet Box thật nhưng nó sẽ khá giống nhau. Hy vọng rằng bạn sẽ  thấy ví dụ này là khá thực tế.

### Bước 1: Giới thiệu CodePen
Chúng ta sẽ sử dụng [Codepen](https://codepen.io/julienben/pen/XoYQyj), một trình soạn thảo code editor trực tuyến hỗ trợ cả jQuery và React. Click *“Run Pen"* để xem kết quả. Click *"Edit on codepen"* để chỉnh sửa code. Đặp nhập bằng facebook để fork về tương tự như github. Sau đó mỗi khi bạn thay đổi Code trên codepen sẽ thấy kết quả ngay. Thường thì đã tích hợp sẵn twitter-bootstrap nếu không bạn sẽ phải tìm kiếm trong phần setting.

### Bước 2: Tính năng đầu tiên - disable Twitter Bootstrap
Bạn cần chắc rằng jquery đã được add  vào project. Twitter button ban ban đầu sẽ disable đi. [Link Demo](https://codepen.io/julienben/pen/gZKVjd)

HTML:
```html
<body>
  <div class="card bg-light">
    <div class="card-body text-right">
      <textarea class="form-control"></textarea>
      <br/>
      <button class="btn btn-primary">Tweet</button>
    </div>
  </div>
</body>
```
JS:
```javascript
// Initially disable the button
$("button").prop("disabled", true);

// When the value of the text area changes...
$("textarea").on("input", function() {
  // If there's at least one character...
  if ($(this).val().length > 0) {
    // Enable the button.
    $("button").prop("disabled", false);
  } else {
    // Else, disable the button.
    $("button").prop("disabled", true);
  }
});
```
### Bước 3: Tweet Box sử dụng React
Chức năng tương tự như Bước 2. nhưng lần này sử dụng mã react.
[Link Demo](https://codepen.io/julienben/pen/majbMg)
HTML:
```html
<body>
  <div id="container"></div>
</body>
```
JS(babel)
```js
class TweetBox extends React.Component {
  render() {
    return (
      <div className="card bg-light">
        <div className="card-body text-right">
          <textarea className="form-control"></textarea>
          <br/>
          <button className="btn btn-primary">Tweet</button>
        </div>
      </div>
    );
  }
};

ReactDOM.render(
  <TweetBox />,
  document.getElementById("container")
);
```
Quan sát một chút:
* Bên trong reuturn (...) là mã giống như HTML, không phải JavaScript. Trong React, bạn sẽ viết theo một cú pháp đặc biệt gọi là JSX cho phép bạn đặt mã giống như HTML bên trong JavaScript.
* Nó chỉ giống như thôi bởi vì nó phải sử dụng className thay vì class, tuy nhiên không vấn đề vì bạn sẽ rất dễ học.
* Trình duyệt không hiểu JSX vì vậy, trước khi mã có thể được chạy, nó sẽ tự động được chuyển đổi thành JavaScript tương thích với trình duyệt bởi trình biên dịch JS (được gọi là Babel).
* Không có gì khác bên trong thẻ body ngoài 1 cái thẻ DIV có ID là container. Và vì vậy có thể nói chúng ta đang không viết HTML mà là markup in JavaScript (JSX).

**Câu hỏi ở đây là mã HTML sẽ được render như thể nào ?**
Đó là nhờ html được render bởi object của class TweetBox (chỉ cầnextend từ React Component) đã được gọi vào ReactDOM.render và chỉ định render vào thẻ html có ID là *"container"*
### Bước 4: Viết code react lần đầu tiên.
Hãy chỉnh sửa mã js theo ý của bạn.
```js
class TweetBox extends React.Component {
  render() {
    return null;
  }
};
```
Đặt trọng tâm vào bên trong hàm render. bản chấtcủa nó tương tự với *$(selector).append('your HTML code or element')* trong jQuery.
Ok bấy giờ thích thêm gì bên trong cũng được:
```js
class TweetBox extends React.Component {
  render() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
};
```
```js
return 'Hello World!';
```
babel sẽ tự biên dịch nên không cần nháy kép bên trong return(...)
```js
return (
  Hello World!
);
```
Nhớ rằng khi có nhiều phần tử bên trong, luôn phải có 1 thẻ bao ngoài nếu không sẽ báo lỗi:
```js
return (
  <div>
    <span>
      Hello
    </span>
    <span>
      World
    </span>
  </div>
);
```
**trả về HTML cho Tweet Box:**
```js
return (
  <div className="card bg-light">
    <div className="card-body text-right">
      <textarea className="form-control" />
      <br />
      <button className="btn btn-primary">Tweet</button>
    </div>
  </div>
);
```
Chú ý:
* không dung *class* mà dùng *className*. Vì JSX dịch sang JS mà̀ *class* là từ khóa riêng trong js JS.
* không dùng thẻ \<br> thay \<br/>, sẽ lỗi.
### Bước  5: Thực hiện lại bước 1 disable button dùng react
Đầu tiên button sẽ ở trạng thái bị disable. Khi nhập 1 ký tự bất kì button sẽ được enable. 
[Demo với jquery](https://codepen.io/julienben/pen/gZKVjd)

Ban đầu:
```js
render() {
  return (
    ...
    <button className="..." disabled>Tweet</button>
    ...
  );
}
```
Tương tự như sử dụng dòng jquery này:
```jquery
$("button").prop("disabled", true);
```
Nếu bắt sự kiện với jquery là thế này:
```js
$("textarea").on("input", function() {
  ...
}
```
Thì với react,̀ ta sẽ dùng **class method**:
```js
class TweetBox extends React.Component {
  handleChange = () => {
  };
  render() {
    ...
  }
}
```
> Lưu ý rằng chúng ta sử dụng arrow function của ES6 để  có thể truy cập vào context của class (this) mà không phải bind trong constructor. Giải thích sâu này nằm ngoài phạm vi của hướng dẫn này nhưng bạn rất có thể sẽ tìm hiểu về nó trong thời gian tới.

Để thẻ textarea nhận sư kiện ta cần thay đổi như sau:
```html
<textarea className="form-control" onChange={this.handleChange}>
</textarea>
```
Chú ý:
* chúng ta sử dụng sự kiện *input* trong jquery nhưng với react thì là *onChange *
* **Quan trọng hơn**, chúng ta đã sử dụng dấu **{}** để bao gồm mã JavaScript bên trong phần cú pháp HTML của JSX. Trong trường hợp này, chúng ta đã thông qua trình xử lý handChange và đã thêm tiền tố **this.** vào nó bởi vì nó là một **class method**.

### Bước 6: state trong react giúp thay đổi trạng thái button
Bây giờ sẽ giải thích một trong những khác biệt lớn nhất giữa code kiểu jQuery và code kiểu React. Đó là **state**.

Trong jQuery, khi một số sự kiện xảy ra, bạn thường sửa đổi trực tiếp DOM
![](https://images.viblo.asia/728de582-27f3-46ae-aa70-012b1a60ffe3.png)

Trong React, bạn **không bao giờ sửa đổi DOM trực tiếp**. Thay vào đó, trong một trình xử lý sự kiện, bạn sửa đổi một cái gì đó được gọi là "**Component state**". Và điều này được thực hiện bằng cách gọi **this.setState**.
![](https://images.viblo.asia/42897ff4-4ba1-4e97-a734-4ecdcc0b048c.png)

Sau đó, mỗi khi state được cập nhật, render () sẽ được gọi lại. Và bên trong render () bạn có thể truy cập state để cho React biết bạn muốn sửa đổi DOM như thế nào.
![](https://images.viblo.asia/7e40ebc2-7406-4051-acb7-dd20e4f130e7.png)

Đây là cách bạn cập nhật giao diện người dùng để phản hồi lại một sự kiện. Nó lúc đầu khó hiểu vì vậy hãy để tôi giải thích bằng cách sử dụng code:
```js
class TweetBox extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      text: '',
    };
  }
  
  handleChange = (e) => {...};
  render() {...}
};
```
Không cần quan tâm về super(props); vì nó không quan trọng bài này chỉ tập trung vào state, còn props (cũng là 1 khái niệm trong react) thì ta bỏ qua.
ban đầu state chứa thông tin text nhập vào là ''.
và sau khi nhập key vào input state cũng phải đổi theo. bạn có thể console.log(this.state) để xem thông tin về state.
```js
handleChange = (e) => {
  this.setState({ text: e.target.value });
};
```
Và khi state đã thay đổi thì ta sẽ sử dụng state để xử lý trạng thái, nếu độ dài text = 0 thì button sẽ phải disable, một khi đã setState sau  sự kiện nhập input có nghĩa là môĩ khi nhập input state của đối tượng sẽ thay đổi và sau đó render sẽ update lại html.
```html
<button className="btn btn-primary" disabled={this.state.text.length === 0}>Tweet</button>
```
[Demo](https://codepen.io/julienben/pen/GPXKYa)
{@embed: https://codepen.io/julienben/pen/GPXKYa}

## Tobe continue ...
Đến đây các bạn đã cảm nhận được vì sao lại cần có state, và mặc dù mình đã rút ngắn đi rất nhiều nhưng bài viêt vẫn khá dài. Trong phần tiếp theo chúng ta sẽ sử dụng state để thêm 1 vài chức năng cho twiter button để hiểu hơn về cách sử dụng state sẽ giúp ích nhiều như thế nào so với jquery

**Bài dịch:**  https://medium.freecodecamp.org/react-introduction-for-people-who-know-just-enough-jquery-to-get-by-2019-version-28a4b4316d1a

**Phần tiếp** [React.js - Cách tiếp cận cho những người chỉ biết jquery. Phần 2 - lợi thế của state](https://viblo.asia/p/reactjs-cach-tiep-can-cho-nhung-nguoi-chi-biet-jquery-phan-2-loi-the-cua-state-RQqKLNyrl7z)