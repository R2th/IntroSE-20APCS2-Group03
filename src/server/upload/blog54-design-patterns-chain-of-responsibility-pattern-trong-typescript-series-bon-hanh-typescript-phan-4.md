![image.png](https://images.viblo.asia/1958d061-17b7-4a0e-915d-a36d09466071.png)

Mình là TUẤN hiện đang là một Full-stack Web Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

**Cách sử dụng Chain of Responsibility bằng TypeScript để giải quyết các vấn đề thực tế trong các project web.**

Chào mừng bạn đến với loạt bài **Design Patterns trong TypeScript**, loạt bài này mình sẽ giới thiệu một số Design Patterns hữu ích trong phát triển web bằng TypeScript.

Các **Design Patterns** rất quan trọng đối với các web developer và chúng ta có thể code tốt hơn bằng cách thành thạo chúng. Trong bài viết này, mình sẽ sử dụng **TypeScript** để giới thiệu **Chain of Responsibility**.

Các Design Patterns rất quan trọng đối với các Dev web và chúng ta có thể good code hơn bằng cách thành thạo chúng. Trong bài viết này, mình sẽ sử dụng **TypeScript** để giới thiệu **Chain of Responsibility** .

Chain of Responsibility
----

**Chain of Responsibility** là một cách để tránh ghép nối giữa `sender` và `receiver` của các request bằng cách cho nhiều đối tượng xử lý request. Trong Chain of Responsibility, nhiều đối tượng được kết nối bằng một tham chiếu từ mỗi đối tượng đến đối tượng tiếp theo của nó để tạo thành một chuỗi (next,next,next...). Các request được truyền dọc theo chuỗi cho đến khi một trong các đối tượng trong chuỗi quyết định xử lý request.

![image.png](https://images.viblo.asia/3d2f43d8-1321-4c0f-9ebc-48c53b46a1ce.png)

Các vị trí khác nhau trong công ty có trách nhiệm và quyền hạn khác nhau. Lấy ví dụ về quy trình nghỉ của một công ty, khi xin nghỉ chỉ cần được sự đồng ý của tổ trưởng, không cần phải chuyển cho cấp trên và giám đốc. Nếu một liên kết trong **Chain of Responsibility** không thể xử lý request hiện tại, nếu có liên kết tiếp theo, request sẽ được chuyển tiếp đến liên kết tiếp theo để xử lý.

Trong quá trình phát triển phần mềm, đối với **Chain of Responsibility**, một kịch bản ứng dụng phổ biến là **middleware**. Chúng ta hãy xem cách sử dụng **Chain of Responsibility** để xử lý các request.

Để hiểu rõ hơn về đoạn code sau, trước tiên chúng ta hãy xem sơ đồ UML tương ứng:

![image.png](https://images.viblo.asia/a30c54c5-8447-4b76-8837-5a04534b53eb.png)

Trong hình trên, chúng ta xác định một Interface `Handler`. Hai hàm sau đây được định nghĩa trong Interface này:

*   **use(h: Handler): Handler** => Dùng để đăng ký handler (middleware)
*   **get(url: string, callback: (data: any) => void): void** => Đăng ký get request handler

**Handler interface**

```javascript
interface Handler {
  use(h: Handler): Handler;
  get(url: string, callback: (data: any) => void): void;
}
```

Sau đó, chúng ta định nghĩa một abstract Class `AbstractHandler`, gói gọn logic xử lý của **Chain of Responsibility**. Tức là kết hợp các trình xử lý khác nhau để tạo thành một chuỗi tham chiếu.

**AbstractHandler abstract class**

```javascript
abstract class AbstractHandler implements Handler {
  next!: Handler;
  use(h: Handler) {
    this.next = h;
    return this.next;
  }
  get(url: string, callback: (data: any) => void) {
    if (this.next) {
      return this.next.get(url, callback);
    }
  }
}
```

Dựa trên abstract Class `AbstractHandler`, chúng ta định nghĩa `AuthMiddleware` và `LoggerMidddleware` tương ứng. `AuthMiddleware` middleware được sử dụng để xử lý authentication user và `LoggerMidddleware` middleware được sử dụng để ghi log cho từng request.

**AuthMiddleware class**

```javascript
class AuthMiddleware extends AbstractHandler {
  isAuthenticated: boolean;
  constructor(username: string, password: string) {
    super();
    this.isAuthenticated = false;
    if (username === "bytefer" && password === "666") {
      this.isAuthenticated = true;
    }
  }
  get(url: string, callback: (data: any) => void) {
    if (this.isAuthenticated) {
      return super.get(url, callback);
    } else {
      throw new Error("Not Authorized");
    }
  }
}
```

**LoggerMiddleware class**

```javascript
class LoggerMiddleware extends AbstractHandler {
  get(url: string, callback: (data: any) => void) {
    console.log(`Request url is: ${url}`);
    return super.get(url, callback);
  }
}
```

Với middleware `AuthMiddleware` và `LoggerMidddleware`, hãy định nghĩa một `Route class` để đăng ký các middleware này.

**Route class**

```javascript
class Route extends AbstractHandler {
  urlDataMap: { [key: string]: any };
  constructor() {
    super();
    this.urlDataMap = {
      "/api/todos": [
        { title: "Learn Design Pattern" },
      ],
      "/api/random": () => Math.random(),
    };
  }
 get(url: string, callback: (data: any) => void) {
    super.get(url, callback);
  if (this.urlDataMap.hasOwnProperty(url)) {
      const value = this.urlDataMap[url];
      const result = typeof value === "function" ? value() : value;
      callback(result);
    }
  }
}
```

Sau khi định nghĩa `Route` Route class, chúng ta có thể sử dụng nó và đăng ký các middleware theo cách sau:

```javascript
const route = new Route();
route.use(new AuthMiddleware("bytefer", "666"))
 .use(new LoggerMiddleware());
route.get("/api/todos", (data) => {
  console.log(JSON.stringify({ data }, null, 2));
});
route.get("/api/random", (data) => {
  console.log(data);
});
```

![image.png](https://images.viblo.asia/741b7268-5ff8-4491-b540-de4af0856d99.png)

Khi bạn chạy thành công đoạn code trên, output tương ứng được hiển thị trong hình sau:

![image.png](https://images.viblo.asia/3bf89619-0f33-40f2-bb3e-ffdb3933fb63.png)

Các tình huống sử dụng của **Chain of Responsibility**:

*   Muốn gửi request tới một trong nhiều đối tượng mà không chỉ định rõ ràng đối tượng nhận request.
*   Có nhiều đối tượng có thể xử lý một request và đối tượng nào xử lý request được xác định tự động trong thời gian chạy và Client chỉ cần gửi request đến Chain mà thôi.

Roundup
----
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
----
*https://tuan200tokyo.blogspot.com/2022/11/blog54-design-patterns-chain-of.html