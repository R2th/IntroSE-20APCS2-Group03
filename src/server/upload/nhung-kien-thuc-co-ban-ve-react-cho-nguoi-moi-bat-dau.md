Khi tiếp cận một công nghệ mới, mỗi developer cần một khoảng thời gian để tìm hiểu và hình dung ra cách tổ chức và hoạt động của nó. Khi mới đầu đọc tài liệu tôi thường hay có những chiều hướng suy nghĩ sai lệch hoặc quá xa vời dẫn đến mất nhiều thời gian để có thể sử dụng được. Nhưng khi hiểu được rồi thì nhìn lại thấy nó rất đơn giản, tôi nhận ra là nếu trong lúc mới đầu học mà có người để hỏi hoặc biết trước một vài kiến thức chắc chắn để suy luận thì sẽ nhanh hơn. Cho nên hôm nay tôi sẽ trình bảy tổng quan về những kiến thức cần nắm được về React để các bạn đọc và dễ dàng nắm bắt được cách hoạt động của nó, từ đó việc tìm hiểu chuyên sâu dễ dàng hơn.

**1. JSX là gì**

Là file có đuôi .jsx chứa cúa pháp của javascript và html.
Ví dụ:

```
const element = <h1>Hello, world!</h1>;
```

Lệnh trên tạo một biến bằng một thẻ html. Bạn hãy coi thẻ html là một đối tượng HTML. Nếu lệnh trên viết bằng js thì sẽ cần parse từ `string` thành component , ví dụ như sau:

```
var str = "<h1>Hello, world!</h1>";
element = $.parseHTML( str );
```

Như vậy có thể thấy cú pháp của jsx rất gọn và linh hoạt. hãy xem ví dụ sau:

```
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

-> Rất nhanh và nguy hiểm đúng không.@@

**2. Sử dụng các `variable ` trong thẻ html trong file jsx**

Trong đoạn code sau, biến name được địng nghĩa và sử dụng trong thẻ h1.

```
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
```

Như vậy là có thể gọi biến js trong html để sử dụng giá trị của biến đó chuyển thành text.
Hoặc sử dụng trong giá trị attributes của thẻ html:

```
const element = <img src={user.avatarUrl}></img>;
```


Tương tự ta cũng có thể gọi cả function:

```
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
```

+ OK. bạn đã hiểu về jsx rồi nhỉ, bây giờ cần hỏi là file jsx để làm gì. Trong React file jsx thường sẽ là một componet và component này có thể tạo nên một giao diện trên trình duyệt.
Xem này:  
```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

Biến này đưa lên màn hình thì sẽ hiển thị dòng chữ `Hello, world!` đúng không, đó đó là giao diện đó.
Việc còn lại là đưa lên màn hình, trong react sẽ có một hàm render làm việc đó:

```
class Hello extends React.Component {
  constructor(props) {
  }

  render() {
    return (
      <h1 className="greeting">
        Hello, world!
      </h1>
    );
  }
}
```

chỉ cần return về 1 thẻ html trong hàm render là dòng chữ "Hello, world" sẽ được đưa lên màn hình.
Câu hỏi đặt ra là dòng chữ sẽ hiển thị ở đâu và cách phân phối nó như thế nào. Ừm, đơn giản là website sẽ gồm nhiều đối tượng ghép lại, đối tượng này lại chứ nhiều đối tượng khác. Khi ráp lại ta được một giao diện hoàn chỉnh thôi.

![](https://images.viblo.asia/b76f14e3-5809-4e77-967d-94a7077f7a0a.png)

-> Tương đương như vậy nè.

```
    <body>
       <Header></Header>
       <Sidebar></Sidebar>
       <Content>
          </Hello></Hello>
       </Content>
    </body>
```

Như hình trên thì đối tượng Hello nằm trong đối tượng Content, bạn có thể chia nhỏ thành các đối tượng khác nữa tùy bạn. Cuối cùng gheps chúng lại được một html đầy đủ, việc còn lại là thêm css để trang trí thôi.:)

----> Lưu ý một đối tượng jsx chỉ render 1 thẻ html thôi nhé, viết 2 thẻ song song nhau như này là sai nhé:

```
  render() {
    return (
      <h1 className="greeting">
        Hello, world!
      </h1>
      <h2>@@</h2>
    );
  }
```

**3. State.**

State là giá trị nội tại của một component, Một button màu xanh là một trạng thái, màu đỏ là một trnajg thái. Tương tự component jsx cũng có trạng thái, bạn có thể quản lý nó bằng state. 

```
class Square extends React.Component {
  constructor(props) {
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button>
        {this.state.value}
      </button>
    );
  }
}
```

-> Sẽ show ra giá trị của this.state.value làm text của button , vậy thì khi thay đổi giá trị của state.value thì text button sẽ thay đổi theo. Đó là ý nghĩ của state.

**4.Props.**

Là dữ liệu truyền cho đối tượng. Thường thì là thằng cha truyền cho thằng con, ví dụ thằng content là cha của thằng hello nó muốn truyền thêm tên người để hiển thị "Hello Nam" chẳng hạn:

```
  class Content extends React.Component {
  render() {
    return (
      <Hello [name]="Nam"  ></Hello>
    );
  }
}
```
Trong đối tượng Hello thì sẽ nhận giá trị biến name thông qua props,
```
 class Hello extends React.Component {
  render() {
    return (
      <h1>{this.props.name}</h1>
    );
  }
}
```
->> Bạn cũng có thể truyền function vào đối tượng con. Như vậy là tạo lên sự tương tác giữa các component rồi,  phần này bạn có thể rự suy luận hoặc tìm hiểu thêm nhé.
->> Khi mà có đối tượng khác nằm bên trong thẻ thì những đối tượng đó cũng là props.vd
```
    class Content extends React.Component {
  render() {
    return (
      <Hello [name]="Nam"  >
         <Welcome></Welcome>
      </Hello>
    );
  }
}
```
-> thẻ Welcome nằm bên trong thì sẽ gọi bằng this.props.children.
```
 class Hello extends React.Component {
  render() {
    return (
      <h1>
         {this.props.name}
         {this.props.children}
      </h1>
    );
  }
}
```
-> Như vậy thằng cha có thể quyết định đưa ra hàm hình thằng con hay không nhỉ?@@

Về cơ bản đó là cấu tạo và cách hoạt động của React, nắm được là lên đọc docs của react bạn sẽ học nhanh hơn nhiều và không bị hiểu sai hướng. Những bài sau có thể minh sẽ trình bày những kiến thức khác để các bạn nắm rõ hơn. Xin cảm ơn!