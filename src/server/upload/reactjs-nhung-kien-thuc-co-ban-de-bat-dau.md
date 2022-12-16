<br>&emsp; Chào các bạn, hôm nay mình sẽ giới thiệu cho các bạn những kiến thức cần có để bắt đầu học Reactjs. Điển hình là JSX, Component, Props.
<br>
&emsp; Reactjs là một thư viện javascript mã nguồn mở giúp cho việc xây dựng giao diện người dùng có thể tái sử dụng. Hiện nay, thư viện này nhận được rất nhiều sự quan tâm đến từ cộng đồng. Nó đang được bảo trì (maintain) bởi Facebook và Instagram, cũng với sự đóng góp của cộng đồng các lập trình viên giỏi trên Thế giới.
<br>
### 1. JSX
&emsp; JSX là viết tắt của từ Javascript syntax extention (phần bổ sung cú pháp của javascript). Là một sự hòa trộn của Javascript và XML. Là một dạng ngôn ngữ cho phép viết các mã HTML trong Javascript. Giúp ta viết mã HTML đơn giản hơn trong javascript.
<br>
&emsp; JSX = JS + XML
<br>&ensp;  Ưu điểm của nó bao gồm:
- Nhanh hơn:  JSX thực hiện tối ưu hóa trong khi biên dịch sang mã Javacsript. Các mã này cho thời gian thực hiện nhanh hơn nhiều so với một mã tương đương viết trực tiếp bằng Javascript.
- An toàn hơn:  JSX là kiểu statically-typed , nghĩa là nó được biên dịch trước khi chạy. Vì vậy khi có lỗi nó sẽ báo ngay trong lúc biên dịch. 
- Dễ dàng sử dụng.

Ví dụ:
<br>HTML thông thường:
```html
<div class="card">
    <img class="card-img-top" src="" alt="Card image cap">
    <div class="card-body">
        <h5 class="card-title">Hello World!</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>

```
Chuyển sang JSX:
```html
<div className="card">
    <img className="card-img-top" src alt="Card image cap" />
    <div className="card-body">
        <h5 className="card-title">Hello World!</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
</div>
```

Về cơ bản thì nó cũng không có gì thay đổi nhiều. :)
<br> <br>
**Tips:** Bạn có thể vào đây để chuyển đổi HTML sang JSX [đây](https://magic.reactjs.net/htmltojsx.htm)
<br> <br>
Cụ thể hơn các bạn có thể xem qua bài viết này, bạn ấy đã viết khá cụ thể về nó rồi. Nên mình không viết lại nữa. [Xem thêm ở đây](https://viblo.asia/p/jsx-trong-reactjs-ORNZq6Vrl0n)
### 2. Component
&emsp; Một trong những khái niệm quan trọng trước khi học reactjs đó là component.
<br>
&emsp; Component một khối đóng gói, bên trong gồm các thẻ html, props, state ... hiểu đơn giản là một thẻ html mình tự định nghĩa ra đế đóng gói một component lại. Mỗi component này sẽ có mỗi chức năng, mục đích riêng biệt để ta có thể quản lý cũng như xử lý dữ liệu dễ dàng hơn. 
<br>&emsp; Đây là 1 nền tảng của reactjs, Với một trang web thông thường có chung một trang lớn, một trang lớn có nhiều component, điều này làm ta sẽ dễ bị nhầm lẫn giữa các component, ko thể hiện rõ được chức năng của từng component. Vì vậy bạn nên chuyển đổi html thông thường sang dạng component. Một trang web được chia nhỏ ra làm nhiều component để ta dễ quản lý và xử lý dữ liệu cho mỗi component. Nếu ta ko chia nhỏ ra các component thì việc xử lý dữ liệu sẽ khá phức tạp và rắc rối. Vì component đc viết bằng js nên bạn có thể dễ dang truyền dữ liệu cũng như xử lý dữ liệu ở đây. <br>
<br>*Ví dụ:*
<br>&emsp; Ta có 1 component với chức năng làm menu cho trang web của chúng ta.
```js
class Nav extends Component {
   render() {
      return (
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                    </li>
                </ul>
            </div>
        </nav>
      );
   }
}

export default Nav;
```

&emsp; Ở đây mình tạo một component tên là `Nav` có chức năng là để làm menu cho page của mình.
<br> <br>**Chú ý:** <br>
&emsp; Theo quy định của Reactjs thì không có chứa 2 thẻ html ngang hàng với nhau. Nếu có 2 thẻ ngang hàng nhau thì cần có thẻ cha bọc bên ngoài. <br>
<br> *Ví dụ:*
<br>
```js
class NewComponent extends Component {
   render() {
      return (
        <div className="alert alert-primary" role="alert">
          This is a primary alert—check it out!
        </div>
        <div className="alert alert-secondary" role="alert">
          This is a secondary alert—check it out!
        </div>
      );
   }
}

export default NewComponent;
```
Cách viết trên là 1 ví dụ sai về lỗi mà mình nêu trên. Để có 1 component chuẩn thì trong trường hợp này mình sẽ gộp 2 thẻ div ngang hàng vài 1 div lớn.

```js
class NewComponent extends Component {
   render() {
      return (
         <div>
            <div className="alert alert-primary" role="alert">
              This is a primary alert—check it out!
            </div>
            <div className="alert alert-secondary" role="alert">
              This is a secondary alert—check it out!
            </div>
         </div>
      );
   }
}

export default NewComponent;
```
**Tips:** Nếu bạn dùng [Link convert](https://magic.reactjs.net/htmltojsx.htm) này thì nó sẽ tự động thêm 1 div lớn cho mình. :)
<br> <br>
Có 4 cách để chúng ta có thể tạo nên 1 component:
- Kiểu hàm function bình thường
- Function không tên. Anonymous function
- Arrow function
- Class

Tùy vào mục đích ta sẽ sử dụng các cách cho hợp lý.
<br>
Thông thường những component có chức năng riêng sẽ có một class riêng và ta sẽ sử dụng cách 4 để tạo nên một component.
### 3. Props
&emsp; Props là viết tắt của từ Properties, là một thuộc tính của component. Chúng ta có thể thay đổi props của một component bằng cách truyền một tham số vào. 
<br> *Ví dụ:*
```html
 <Company name="framgia" />
```
Ở đây mình tự đinh nghĩa 1 component có tên là `Company` và truyền props `name` vào.
<br>Cụ thể hơn:

<br> ta sẽ làm như sau:  (ở đây mình khai báo theo kiểu function)<br>

```js
function Company (props) {
	return (
		<div> {props.name} </div>
    )
}
// gọi như sau:
<Company name="framgia"/>
```
`props` ở đây là từ khóa và không thay đổi nhé.
<br> <br>
Qua đây mình đã nói vễ những kiến thức cơ bản nhất về reactjs để chúng ta có thể bắt đầu với nó. Hẹn gặp lại các bạn trong những bài sau nhé.