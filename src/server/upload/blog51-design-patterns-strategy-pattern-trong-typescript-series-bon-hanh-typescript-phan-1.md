![image.png](https://images.viblo.asia/5c7055e0-843e-475e-af78-5a525d54f512.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

**Cách sử dụng Strategy Pattern bằng TypeScript để giải quyết các vấn đề thực tế trong các project web.**

Chào mừng bạn đến với loạt bài **Design Patterns trong TypeScript**, loạt bài này mình sẽ giới thiệu một số Design Patterns hữu ích trong phát triển web bằng TypeScript.

Các **Design Patterns** rất quan trọng đối với các web developer và chúng ta có thể code tốt hơn bằng cách thành thạo chúng. Trong bài viết này, mình sẽ sử dụng **TypeScript** để giới thiệu **Strategy Pattern** .

Vấn đề
----

Đăng ký và Đăng nhập là các tính năng quan trọng trong các ứng dụng web. Khi đăng ký một ứng dụng web, cách phổ biến hơn để đăng ký là sử dụng account/password, email hoặc số điện thoại di động... Khi bạn đã đăng ký thành công, bạn có thể sử dụng hàm tương ứng để Login.

```javascript
function login(mode) {
  if (mode === "account") {
    loginWithPassword();
  } else if (mode === "email") {
    loginWithEmail();
  } else if (mode === "mobile") {
    loginWithMobile();
  }
}
```

Khi ứng dụng web cần hỗ trợ các hàm Login khác, ví dụ: ngoài hàm Login email, trang Login còn hỗ trợ các tính năng Login của nền tảng bên thứ ba như Google, Facebook, Apple và Twitter.

![image.png](https://images.viblo.asia/c3d6f73e-934d-48c9-a0cf-86fa4ea0769c.png)

Vậy để hỗ trợ thêm các phương thức hàm Login của bên thứ ba, chúng ta cần sửa đổi function `login` trước đó:

```javascript
function login(mode) {
  if (mode === "account") {
    loginWithPassword();
  } else if (mode === "email") {
    loginWithEmail();
  } else if (mode === "mobile") {
    loginWithMobile();
  } else if (mode === "google") {
    loginWithGoogle();
  } else if (mode === "facebook") {
    loginWithFacebook();
  } else if (mode === "apple") {
    loginWithApple();
  } else if (mode === "twitter") {
    loginWithTwitter();
  } 
}
```

Nhìn có vẻ không ổn chút nào nhở!
Nếu sau này chúng ta tiếp tục thêm hoặc sửa đổi các phương thức Login, chúng ta sẽ thấy rằng function `login` này ngày càng trở nên khó maintenance hơn. Đối với vấn đề này, chúng ta có thể sử dụng **Strategy Pattern** để đóng gói các hàm Login khác nhau vào các **strategy** khác nhau.

Strategy Pattern
----

Để hiểu rõ hơn về đoạn **Strategy Pattern**, trước tiên chúng ta hãy xem sơ đồ UML tương ứng:

![image.png](https://images.viblo.asia/0cdd1453-2964-4b02-a43c-5e80499d9063.png)

Trong hình trên, chúng ta xác định một Interface `Strategy`, sau đó implement hai **strategy** Login cho **Twitter** và **account/password** dựa trên Interface này.

**Interface strategy**

```javascript
interface Strategy {
  authenticate(args: any[]): boolean;
}
```

**Strategy Twitter Class được triển khai từ Interface Strategy**

```javascript
class TwitterStrategy implements Strategy {
  authenticate(args: any[]) {
    const [token] = args;
    if (token !== "tw123") {
      console.error("Twitter account authentication failed!");
      return false;
    }
    console.log("Twitter account authentication succeeded!");
    return true;
  }
}
```

**LocalStrategy class cũng được triển khai từ Interface Strategy**

```javascript
class LocalStrategy implements Strategy {
  authenticate(args: any[]) {
    const [username, password] = args;
    if (username !== "bytefer" || password !== "666") {
      console.log("Incorrect username or password!");
      return false;
    }
    console.log("Account and password authentication succeeded!");
    return true;
  }
}
```

Sau khi có các được triển khai từ Interface Strategy khác nhau, chúng ta định nghĩa một lớp **Authenticator** để chuyển đổi giữa các **strategy Login** khác nhau và thực hiện các thao tác **authentication** tương ứng.

**Authenticator class**

```javascript
class Authenticator {
  strategies: Record<string, Strategy> = {};
  use(name: string, strategy: Strategy) {
    this.strategies[name] = strategy;
  }
  authenticate(name: string, ...args: any) {
    if (!this.strategies[name]) {
      console.error("Authentication policy has not been set!");
      return false;
    }
    return this.strategies[name].authenticate.apply(null, args);
    // authenticate.apply là cú pháp apply args của typescript
  }
}
```

**[**authenticate.apply** gọi hàm **authenticate** với giá trị **this** đã cho và các đối số được cung cấp dưới dạng một mảng (hoặc một đối tượng giống như mảng)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)**

Sau đó, chúng ta có thể sử dụng các hàm Login khác nhau để đạt được **authentication user** theo các cách sau:

```javascript
const auth = new Authenticator();
auth.use("twitter", new TwitterStrategy());
auth.use("local", new LocalStrategy());
function login(mode: string, ...args: any) {
  return auth.authenticate(mode, args);
}
login("twitter", "123");
login("local", "bytefer", "666");
```

Khi bạn chạy thành công đoạn code trên, output tương ứng được hiển thị trong hình sau:

![image.png](https://images.viblo.asia/7f13bfe6-2374-44ea-b47f-e890046feee7.png)

**Strategy Pattern** ngoài việc sử dụng cho trường hợp **authentication Login** cũng có thể được sử dụng trong nhiều kịch bản khác nhau (Ví dụ như: form validation). Nó cũng có thể được sử dụng để tối ưu hóa các vấn đề với quá nhiều nhánh if/else.

Nếu bạn sử dụng Node.js để phát triển các **authentication service**, thì thông thương các bạn sẽ sử dụng thư viện [passport.js](https://www.passportjs.org/) này đúng ko. Nếu các bạn đã từng sử dụng thư viện/Mô-đun **Passport.js** này nhưng ko biết cách nó hoạt động ra sao, thì **Strategy Pattern** sẽ giúp bạn hiểu về nó hơn. Dùng một thứ mình hiểu vẫn tốt hơn là dùng mà ko hiểu đúng ko. Ahihi

Mô-đun **passport.js** này rất mạnh mẽ và hiện hỗ trợ tới **538** strategy:

![image.png](https://images.viblo.asia/866a1e45-69fe-4b0e-96e1-5ce5ce590b3d.png)

Một số tình huống mà bạn có thể suy nghĩ đến việc sử dụng **Strategy Pattern**:

*   Khi một hệ thống cần tự động chọn một trong số các thuật toán. Và mỗi thuật toán có thể được gói gọn trong một **strategy**.
*   Nhiều **class** chỉ khác nhau về hành vi và có thể sử dụng **Strategy Pattern** để tự động chọn hành vi cụ thể sẽ được thực thi trong thời gian chạy.

Roundup
----
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
----

* https://tuan200tokyo.blogspot.com/2022/11/blog51-design-patterns-strategy-pattern.html