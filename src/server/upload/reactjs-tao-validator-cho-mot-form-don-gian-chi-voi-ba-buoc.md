Xin chào mọi người, như mọi người đã biết, đối với một trang web hay một phần mềm, với các developer chúng ta thì việc Validation là một trong những thứ không thể thiếu, nó xác định xem hệ thống có phù hợp với yêu cầu và thực hiện các chức năng mà nó được dự định và đáp ứng các mục tiêu của tổ chức và nhu cầu của người dùng hay không.

Việc validatiion nó sẽ trả lời cho những câu hỏi như: Tôi đang xây dựng đúng sản phẩm hay không? Tôi đang truy cập vào đúng dữ liệu hay không?

Vì vậy, trong bài viết hôm nay. Mình sẽ hướng dẫn các bạn cách tạo một validator nhanh chóng và mạnh mẽ chỉ với 3 bước ^_^

### **1. Simple-react-validator**

Trước tiên, muốn làm bất cứ điều gì thì chúng ta cần phải biết rằng chúng ta nên chuẩn bị những cái gì và cần tìm hiểu những cái gì trước đúng không nào ^^ 

Và không đợi lâu nữa, mình giới thiệu với các bạn luôn là chúng ta sẽ sử dụng một thư viện để validation đó là **simple-react-validator** . Vậy simple-react-validator là gì ? Nó là một package hỗ trợ cho việc validation của ReactJS, với việc cấu hình và sử dụng rất nhanh chóng và đơn giản, giúp việc xác thực dễ dàng trên một dòng nên nó rất được ưa chuộng hiện nay.

Các bạn có thể tham khảo và đọc thêm [ở đây](https://github.com/dockwa/simple-react-validator)

### **2. Thực hiện**
Vậy là các bạn đã hoàn thành xong bước tìm hiểu **Simple-react-validator** . Bây giờ chúng ta sẽ bắt đầu tiến hành cài đặt và chạy chỉ với 3 bước thôi các bạn nhé ^_^

***Cài đặt:***

npm: 

> npm install simple-react-validator --save

bower:

> bower install simple-react-validator --save


**Bước 1:** Khởi tạo validator

Để khởi tạo 1 validator thì việc đầu tiên bạn phải nhúng thư viện vào sau khi cài đặt nhé :D 
```
import SimpleReactValidator from 'simple-react-validator';
```

Ok vậy là đã hoàn tất việc nhúng thư viện, tiếp theo là chúng ta sẽ khởi tạo :
```
    constructor() {
        this.validator = new SimpleReactValidator();
    }
```

**Bước 2:** Thêm các validation rules của inputs 

```
this.validator.message('title', this.state.title, 'required|email')
```

Trong lệnh code dưới đây, chúng ta có thể thấy được trong hàm this.validator.message thì:
```
field: chính là name của thẻ chúng ta muốn validate ( ở đây là title )
value: chính là state hiện tại ( được dùng để check có đáp ứng đúng rules được đưa ra hay không )
rules: cuối cùng là các rule bạn muốn validation như required hay email ,...
```

**Ví dụ**

```
render() {
  return (
    <div className="container">
      <h1>Write a Review</h1>
      <div className="form-group">
        <label>Title</label>
        <input className="form-control" value={this.state.title} onChange={this.setTitle} />
 
        {/**********   This is where the magic happens     ***********/}
        {this.validator.message('title', this.state.title, 'required|alpha')}
 
      </div>
      
      <div className="form-group">
        <label>Email</label>
        <input className="form-control" value={this.state.email} onChange={this.setEmail} />
 
        {/**********   This is where the magic happens     ***********/}
        {this.validator.message('email', this.state.email, 'required|email', 'text-danger')}
 
      </div>
      
      <div className="form-group">
        <label>Review</label>
        <textarea className="form-control" value={this.state.review} onChange={this.setReview} />
 
        {/**********   This is where the magic happens     ***********/}
        {this.validator.message('review', this.state.review, 'required|min:20|max:120'})}
 
      </div>
      <button className="btn btn-primary" onClick={this.submitForm}>Save Review</button>
    </div>
  );
}
```

**Bước 3:** Submit validate

```
    submitForm = () => {
        if (this.validator.allValid()) {
        
            // Code những gì bạn cần làm khi đã validate hết tất cả các trường hợp...
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
```

> Simple-react-validator hỗ trợ các hàm dùng cho việc submit validation và hiển thị các message. Các bạn có thể tham khảo thêm ở mục [Available Public Methods](https://www.npmjs.com/package/simple-react-validator#available-public-methods)

Như vậy là mình đã hướng dẫn xong cho bạn 3 bước đơn giản nhất để validation inputs form. Chúc các bạn thành công ^_^

Vì là mình vừa học vừa làm ReactJS nên không tránh khỏi những thiếu sót trong khi viết bài. Nếu có bất kì thắc mắc hay tips nào các bạn hãy comment phía dưới. Mình sẽ ghi nhận hoặc trả lời sớm nhất có thể nhé. 

Cảm ơn các bạn đã đọc bài viết của mình ^^ Hẹn gặp các bạn vào bài viết tiếp theo.