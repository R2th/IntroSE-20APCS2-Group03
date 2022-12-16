Hello mọi người, mình đã come back đây. Hôm nay chúng ta tiếp tục tìm hiểu về cách Controller trả về response cho client như thế nào nhé.

## 1. Cơ bản về HTTP response

Khi Controller nhận được dữ liệu request, nó sẽ đẩy xuống cho tầng Service xử lý. Sau đó dữ liệu sẽ được Service trả về, và Controller sẽ phải return về lại cho client.

Ở bài trước chúng ta đã biết request là thứ được gửi lên, thì response ngược lại, là dữ liệu trả về cho mỗi request. Ví dụ bạn đưa tiền cho tôi (gửi request), thì tôi trả về cho bạn một tô phở (response).

![](https://images.viblo.asia/cbaca6e2-a074-44a3-9486-9c0c40badc5d.jpg)

HTTP response có 3 thông tin chính cần quan tâm:

* Status code: một con số báo response có thành công hay không. Ví dụ 200 là OK, 401 là không được xác thực, 403 là không đủ quyền, 404 là không tìm thấy.
* Header: tương tự request, response cũng có các header
* Body: ví dụ chỉ trả về status code thì chưa đủ, có thể bạn sẽ muốn thêm 1 số thông báo, hay dữ liệu gì đó. Thì lúc này chúng sẽ được chứa trong response body.

Spring Boot sử dụng các annotation, một vài class khác để thực hiện xử lý response trả về.

## 2. Xử lý response trong Controller

### 2.1. `@ResponseBody` và `@ResponseStatus`

Với REST API, dữ liệu khi trả về sẽ nằm trong response body, dạng JSON. Như ở bài trước mình có nói, nếu dùng `@RestController` thì không cần `@ResponseBody` vì nó mặc định có rồi, còn ngược lại `@Controller` thì phải chỉ định rõ dữ liệu nằm ở đâu trong response.

```UserController.java
@Controller
public class UserController {
    @GetMapping("/")
    public String homePage() {
        return "index";  // Trả về view có tên là index
    }

    @GetMapping("/info")
    @ResponseBody
    public UserInfo getUserInfo() {
        ...
        return userInfo;  // Do có @ResponseBody nên userInfo sẽ nằm trong body
    }
}
```

Mặc định Spring Boot sẽ trả về 1 số status code như 200, 401,... tự động nếu bạn không cấu hình tùy chỉnh. Ví dụ khi request không hợp lệ thì status 400 (Bad request) sẽ được tự động return nếu bạn không có code xử lý việc đó.

Bên cạnh đó, Spring Boot còn có `@ResponseStatus` để chỉ định controller sẽ trả về status nào đó, ngay cả khi thực hiện thành công. Ví dụ mình muốn cho thằng bạn fix bug chơi, thì chỉ cần thêm dòng này vào code.

```UserController.java
@Controller
public class UserController {
    @GetMapping("/info")
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)  // Đây
    public UserInfo getUserInfo() {
        ...
        return userInfo;
    }
}
```

Lúc này, mặc dù xử lý thành công (nên trả về 200), nhưng do có `@ResponseStatus` nên lúc này status code luôn trả về là 404 :D

### 2.2. Dùng đối tượng `HttpServletResponse` param

Hm cách này không khuyến khích dùng lắm, tuy nhiên đôi lúc các bạn vẫn sẽ thấy nó trong các project Servlet cũ.

Cách này sử dụng đối tượng tham số `HttpServletResponse` trong method của Controller, khi Controller method được gọi thì đối tượng này tự động truyền vào. Thường thì nó sẽ đi kèm với `HttpServletRequest` như sau.

```UserController.java
public class UserController {
    @GetMapping("/info")
    public void getUserInfo(HttpServletRequest req, HttpServletResponse res) {
        ...
        res.setHeader("abc", "123");
        res.setStatus(404);
        ...
    }
}
```

### 2.3. Dùng class `ResponseEntity<T>`

Đây là cách sử dụng repsonse tốt nhất và mình khuyến khích sử dụng. Nó có ưu điểm hơn hai cách trước như sau:

* Không cần code dài dòng, class này có sử dụng builder nên dùng khá tiện.
* Với `@ResponseStatus` thì chỉ set cứng status code, tuy nhiên nếu mình muốn status code khác nhau tùy vào điều kiện thì sao. `ResponseEntity<T>` sẽ giải quyết được hết.
* Có thể vừa đặt data trong body, vừa tùy chỉnh header, vừa,... cùng lúc được luôn.

Trong code thì các bạn chỉ cần đổi return type của method từ return gì đó (tạm gọi là `X`) thành kiểu `ResponseEntity<X>` là được.

```UserController.java
public class UserController {
    @GetMapping("/info")
    public ResponseEntity<User> getUserInfo(@RequestParam("username") String username) {
        // Tìm User trong database bằng username
        User user = userRepository.findByUsername(username);
        
        // Nếu không tìm thấy, trả về message lỗi 404 Not found
        if (user == null)
            return ResponseEntity.notFound();  // Tạm thời là vậy, thực tế người ta dùng AOP để bắt exception
            
        // Nếu tìm thấy return 200 OK
        return ResponseEntity.ok(user);
    }
}
```

`ResponseEntity<T>` có thể dùng 3 cách:

* Tạo mới object dạng `new ResponseEntity<>(user, HttpStatus.OK)`
* Dùng dạng static method `ResponseEntity.ok(user)`
* Dùng dạng builder `ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found").build()`

Với `ResponseEntity`, bạn vừa có thể tùy chỉnh status code, body response tùy vào các điều kiện khác nhau, vừa có thể chỉnh các thông số response khác như header,... khá tiện.

---

Ok bài tới đây là hết rồi. Qua hai phần mình đã trình bày về một số khái niệm của Controller, hi vọng mọi người đã hiểu được phần nào. Cảm ơn các bạn đã theo dõi series, và đừng quên upvote nếu thấy bài viết hữu ích nhé. Thân.