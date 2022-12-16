Ok mình đã trở lại đây, dạo này hơi bận bịu tí nên ra bài hơi lâu, mong các bạn thông cảm :stuck_out_tongue_winking_eye: Hôm nay chúng ta sẽ cùng nhau "mổ xẻ" bên trong controller như thế nào và cách hoạt động của nó nhé. Ok let's go.

## 1. Controller là gì, hoạt động ra sao?

### 1.1. Controller là gì?

Như đã nói ở các bài trước, Controller trong ứng dụng Spring Boot là nơi tiếp nhận request và trả về response cho client. Có thể hiểu controller chính là lớp trung gian giữa server của bạn và bên ngoài.

Về mặt code, Controller chỉ đơn thuần là một bean được đánh dấu với `@Controller` hoặc `@RestController`.

Trong Spring Boot, có hai dạng Controller, tương ứng hai annotation trên:

* `@Controller` có thể trả về View qua một String hoặc JSON data trong response body (nếu được chỉ định). Thích hợp cho các controller có routing, chuyển trang các kiểu.
* `@RestController` chỉ có thể trả về data trong response body. Thích hợp cho các controller để cung cấp API.

Do đó, ta có thể nói `@RestController` = `@Controller` + `@ResponseBody`.

### 1.2. Code ví dụ

Bên dưới là cấu trúc một controller nhé.

```HomeController.java
@Controller
public class HomeController {
    // Bên trong controller sẽ có nhiều method, mỗi cái sẽ bắt request cụ thể
    
    // Bắt GET /home request và trả về view
    @GetMapping("/home")
    public String home(Model model) {
        model.addAttribute("name", "John");
        return "index";  // Return tên của View, model sẽ tự động pass vào view
    }
    
    // Hoặc có thể trả về data trong response body (như các API)
    @GetMapping("/users")
    @ResponseBody
    public List<User> getUserList() {
        return new ArrayList<>();
    }
    
    // Hoặc cái này tương tự như trên, nhưng có thể tùy chỉnh response status code, header,...
    @GetMapping("/users/{id})
    public ResponseEntity<User> getUserById(@PathVariable("id") String userId) {
        // Không cần @ResponseBody do có body rồi
        return ResponseEntity.status(200).body(new User());
    }
}
```

### 1.3. Các hoạt động của controller

![](https://images.viblo.asia/8e1d82ef-0047-4ab6-a381-5dd281191268.png)

Như hình trên, khi client gửi một request tới server Spring Boot của mình, thì nó sẽ đi qua thứ gọi là Front controller trước. Đây là controller có sẵn, nó có tác dụng sau:

* Phân giải request, tìm coi request gọi tới method nào của controller nào để gọi đúng tới đó
* Các data của request sẽ được parse ra và mapping tương ứng vào các tham số controller method (có `@RequestParam`, `@PathVariable`, `@Header`,... tương ứng).
* Đặc biệt, Spring MVC có thể parse được các data phức tạp như enum, List hay object. Ví dụ enum trong request là dạng string, vẫn sẽ được parse đúng thành enum.
* Nếu data không thể parse được, front controller sẽ trả về bad request (hoặc có cơ chế khác để chúng ta ghi đè lại việc này).

Với chiều ngược lại cũng tương tự như vậy. Dữ liệu trả về từ controller sẽ được build thành response và trả cho client.

## 2. Controller mapping

### 2.1. Các loại HTTP request

Bạn nào học về web hẳn đã rõ về khái niệm HTTP request. Mình sẽ không nói sâu về phần này, nhưng tạm hiểu mỗi HTTP request sẽ gồm 2 thông tin quan trọng:

* Request tới URL nào (request tới đâu)
* HTTP method là gì (thể hiện hành động gì đấy với URL)

Trong controller, chỉ cần nắm được hai thông tin trên thì sẽ bắt được mọi request được gửi tới, sau đó mới xử lý tiếp.

Trong Rest API design, thì người ta thường dùng **danh từ** trong URL để chỉ đối tượng được tác động. Còn các HTTP method để đại diện cho **hành động** nào sẽ áp dụng lên đối tượng đó.

Ví dụ như:

* Request tới `GET /users` có đối tượng tác động là `users` (tất cả user), và hành động là `GET` (lấy thông tin)
* Request tới `PUT /users/123` có đối tượng là `users/123` (user có mã là 123) và hành động là `PUT` (cập nhật thông tin)

Thường thì theo khuyến nghị người ta sử dụng đúng HTTP method với các hành động CRUD tương ứng:

* Create: dùng POST method
* Read: dùng GET method
* Update: dùng PUT method
* Delete: dùng DELETE method

Hầu hết các ứng dụng web đều sử dụng 4 hành động CRUD cơ bản trên tới hơn 2/3 rồi. Ngoài ra có thể có các hành động khác mà không có method tương ứng, như login thì có thể thêm vào endpoint như `POST /login` (dùng POST sẽ an toàn hơn, đọc thêm về các HTTP method để hiểu rõ hơn ý nghĩa của chúng).

### 2.2. Bắt các request

Spring Boot dùng các annotation sau, đánh dấu lên từng **method** của controller, để chỉ định rằng khi HTTP method tương ứng gọi tới thì method sẽ được thực thi.

```UserController.java
@RestController
public class UserController {
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {}
    
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable("id") int id) {}
}
```

Ví dụ trên có 2 method, bắt tương ứng hai request là `GET /users` và `DELETE /users/{id}`. Khi có request tương ứng gửi tới, thì hai method trên sẽ thực thi và trả về kết quả cho client.

Các annotation phổ biến như `@GetMapping`, `@PostMapping`, `@PutMapping`,... có dạng là tên HTTP method cộng với từ "mapping". Ngoài ra còn có thể dùng `@RequestMapping` và chỉ định thuộc tính `method` như sau.

```java
@RequestMapping(value = "/users", method = RequestMethod.GET)
```

Ngoài ra, `@RequestMapping` còn có thể dùng bên trên class controller, để chỉ định endpoint gốc cho toàn bộ method bên trong nó. Ví dụ như sau.

```UserController.java
@RestController
@RequestMapping("/users")
public class UserController {
    // Kết hợp với route gốc ở trên, ta có /users/info
    @GetMapping("/info")
}
```

## 3. Nhận request data trong Controller

Controller nhận dữ liệu từ request, tùy vào dữ liệu nằm ở đâu mà chúng ta có cách lấy ra khác nhau:

* Request param (query string)
* Path variable
* Request body
* Header

### 3.1. Request param (query string)

Ví dụ như request sau `GET /users?age=18&name=Dũng` thì chúng ta có 2 request param là `age = 18` và `name = Dũng`. Khi đó, muốn lấy được hai giá trị trên chúng ta dùng `@RequestParam` như sau.

```UserController.java
@RestController
public class UserController {
    ...
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(
        @RequestParam("age") int age,
        @RequestParam("name") String name) {
        // Lúc này hai biến age và name đã có dữ liệu tương ứng
    }
}
```

Trong trường hợp `@RequestParam` có thêm các tham số khác, thì chúng ta phải viết như sau. Ví dụ cả hai trường `age` và `name` trên đều là optional, không bắt buộc, nên chúng ta dùng thuộc tính `required = false` cho `@RequestParam` (mặc định là true).

```UserController.java
@RestController
public class UserController {
    ...
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(
        @RequestParam(value = "age", required = false) Integer age,
        @RequestParam(value = "name", required = false) String name) {
        // Lúc này hai biến age và name đã có dữ liệu tương ứng
    }
}
```

Lúc này, do biến `age` có thể không có, nên phải cho nó kiểu `Integer` có giá trị null để biết được `age` có được gửi lên hay không. Nếu là kiểu primitive thì nó sẽ luôn có giá trị mặc định.

Ngoài ra `@RequestParam` cũng có thuộc tính `defaultValue`, nếu request không chỉ định thì giá trị default đó sẽ được sử dụng.

### 3.2 Path variable

Path variable là một phần trong đường dẫn URL, ví dụ `GET /users/123/info` thì `123` là path variable. Sử dụng `@PathVariable` để làm việc này, tương tự như dùng `@RequestParam`.

```UserController.java
@GetMapping("/users/{id}/info")
public ResponseEntity<?> getUserInfo(
    @PathVariable(value = "id", defaultValue = "0") int userId) {
    // id là tên path variable, tương ứng trên url {id}
}
```

`@PathVariable` cũng có các thuộc tính tương tự `@RequestParam`.

### 3.3. Request body

Request method PUT, POST mới có request body, đây là nơi chứa data chính để gửi lên. Thường thì request body sẽ ở dạng JSON hoặc form-data, khi vào controller sẽ được tự động parse ra thành Object (ví dụ DTO chẳng hạn).

```UserController.java
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
    // Dữ liệu trong request body có thể là JSON, form-data,...
    // Tuy nhiên khi vào controller sẽ bị parse thành object hết
}
```

Đây là ví dụ về class `LoginDto` ở trên (có dùng lombok).

```LoginDto.java
@Getter
@Setter
public class LoginDto {
    private String username;
    private String password;
}
```

### 3.4. Header

```UserController.java
@PostMapping("/login")
public ResponseEntity<?> login(@Header("Authorization") String authHeader) {
    // Biến authHeader sẽ có giá trị là giá trị của Authorization header
}
```

Ví dụ như trên mình muốn thực hiện xác thực người dùng bằng Basic authentication. Thông tin username, password được encode trong header có tên là Authorization. Muốn lấy được value trong header, thì các bạn sử dụng `@Header` như trên.

---

Okay bài viết tới đây là hết rồi. Bài tiếp theo mình sẽ nói tiếp về cách return dữ liệu về cho client nhé. Nhớ đón xem và đừng quên ủng hộ mình bằng cách vote và clip thật nhiều nhé. Thân :heart_eyes: