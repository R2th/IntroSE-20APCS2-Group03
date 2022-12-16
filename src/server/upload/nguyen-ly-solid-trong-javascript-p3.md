Ở bài này chúng ta cùng tìm hiểu về nguyên lý thứ 4 của SOLID, đó là Interface Segregation principle thông qua 2 mục:
- Nguyên lý Interface Segregation là gì ?
- Áp dụng nguyên lý Interface Segregation trong JavaScript như thế nào?
# Nguyên lý Interface Segregation là gì ?

Nội dung:
> Một class không nên bị buộc phải thực hiện các phương thức mà nó không sử dụng.
> Nhiều Interface với những mục đích cụ thể sẽ tốt hơn một Interface có mục đích chung.

Ví dụ:![](https://images.viblo.asia/8fdcd75a-6856-4dd4-b855-d48c377782ae.png)

   
   Trong hình bạn có thể thấy chúng ta có class cha là `Shape` và 2 class con gồm `Retangle` và `Line`. Class `Shape` được kế thừa từ Interface `IDrawable`. Interface này có 2 phương thức là `draw` và `calculateArea` dùng cho vẽ hình và tính toán diện tích. Điều đó có nghĩa là tất cả các class con cũng sẽ phải có 2 phương thức này. 
   
   Tuy nhiên `Line` không phải hình 2 chiều nên không có diện tích. Vậy nhưng nó vẫn cần triển khai phương này. Việc này là vi phạm nguyên lý .
    
  OK, vậy giờ giải quyết thế nào nhỉ ? Bạn có thể thấy  `draw` và `calculateArea` là 2 phương thức với 2 mục đích khác nhau, bạn không nên gộp chúng lại. Bản chất của nguyên lý là chia nhỏ Interface theo mục đích nên giờ chúng ta sẽ thêm 1 interface nữa cho phần tính diện tích. Đó là `IDrawable2D` và interface này sẽ áp dụng cho những hình tính diện tích như `Shape`. Còn `IDrawable` giờ chỉ còn 1 phương thức duy nhất là `draw` đúng với tên gọi của nó. Tường minh hơn nhiều rồi phải không nào?
  
![](https://images.viblo.asia/80aeb09a-2275-4927-94b5-969cd5b54cac.png)

# Áp dụng nguyên lý Interface Segregation trong JavaScript như thế nào?
JavaScript thì không có Interface. Nhưng các bạn có thể hiểu về nguyên lý qua ví dụ này

Ví dụ:

```js

// Validate in any case
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.initiateUser();
  }
  
  initiateUser() {
    this.username = this.username;
    this.validateUser()
  }

  validateUser = (user, pass) => {
    console.log("validating..."); // chèn logic validate ở đây!
  }
}
const user = new User("Francesco", "123456");
console.log(user);
// validating...
// User {
//   validateUser: [Function: validateUser],
//   username: 'Francesco',
//   password: '123456'
// }
```

Chúng ta có class `User` và như bạn thấy trong phần khởi tạo lúc nào cũng cần check validation. Tuy nhiên có những trường hợp bạn không cần đến validate thì sao? Vậy là khi không cần validate nhưng bạn vẫn phải thực hiện validate và vi phạm nguyên lý này rồi.

Để xử lý cho trường hợp này thì cũng khá đơn giản, bạn chỉ cần truyền thêm validate = true/false rồi kiểm tra điều kiện cần check validation trong phần khởi tạo. Như vậy phần nào cần check validate thì sẽ được check, còn phần nào không cần thì sẽ được bỏ qua.
```js

//ISP: Validate chỉ khi cần thiết
class UserISP {
  constructor(username, password, validate) {
    this.username = username;
    this.password = password;
    this.validate = validate;

    if (validate) {
      this.initiateUser(username, password);
    } else {
      console.log("no validation required"); 
    }
  }

  initiateUser() {
    this.validateUser(this.username, this.password);
  }

  validateUser = (username, password) => {
    console.log("validating...");
  }
}

// User khi bắt buộc phải validation
console.log(new UserISP("Francesco", "123456", true));
// validating...
// UserISP {
//   validateUser: [Function: validateUser],
//   username: 'Francesco',
//   password: '123456',
//   validate: true
// }


// User khi không bắt buộc validation
console.log(new UserISP("guest", "guest", false));
// no validation required
// UserISP {
//   validateUser: [Function: validateUser],
//   username: 'guest',
//   password: 'guest',
//   validate: false
// }
```
Bài viết đến đây là hết, cảm ơn các bạn đã theo dõi bài viết. Hẹn gặp các bạn ở phần cuối nha.