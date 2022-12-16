Trong bài viết này, tôi sẽ chỉ tập trung xử lý mã hoá thông tin password được lưu tại "payload" mỗi khi người dùng đăng nhập hoặc đăng ký. Về phần tạo trang web - controller - cấu hình elasticsearch tôi đã có hướng dẫn chi tiết trong bài viết bên dưới:

https://viblo.asia/p/tao-mot-project-voi-spring-boot-thymeleaf-elasticsearch-su-dung-http2-tao-service-run-elasticsearch-yZjJYjolLOE

### Công cụ và thư viện được sử dụng trong bài viết:

+ Spring boot 2.7.4
+ Spring tool suite 4
+ Spring data elasticsearch 4.4.2
+ Maven 3
+ Java 11
+ Elasticsearch 7.17.6
+ Elasticsearch head extension


### Trước khi đi chi tiết từng bước, tôi sẽ tóm lược những việc cần xử lý:

+ Không sử dụng form để gửi dữ liệu trong html file
+ Mã hoá thông tin password thực hiện tại 2 trang html là "index.html" và "register.html"
+ Thêm 1 package service
+ Chỉnh sửa lại controller cho xử lý 2 trang "index.html" và "register.html"


## 1. Cấu trúc thư mục project:

![image.png](https://images.viblo.asia/c6729735-e420-4788-86f8-b72b41c3f96d.png)

## 2.  Tạo 1 package "com.example.thymeleaf.service":

Trong package tạo 1 class "UserService" và 1 interface "IUserService":

+ UserService:

![image.png](https://images.viblo.asia/ef9a3af9-cd6d-4c8e-b47c-762f8c28b0ac.png)

Trong class "UserService" có function thực hiện giải mã(decode base64 đến utf8) chuỗi truyền vào(encoded đến base64)

+ IUserService:

![image.png](https://images.viblo.asia/bbcbca7f-a319-41ba-8a19-d286927b880c.png)

## 3. Xử lý chức năng đăng ký tại frontend:

+ Với register page:

Tôi tạo 1 file "script.js" trong thư mục "static":

![image.png](https://images.viblo.asia/0d33d0df-c374-4a31-a415-c8db0448c0fd.png)

Trong file "script.js" tôi sẽ tạo 2 function:

### * Function 1: Xử lý mã hoá chuỗi truyền vào sang base64:
```js
    function encodeStrToBase64(str) {
              return window.btoa(unescape(encodeURIComponent(str)));
            };
```
### * Function 2: Xử lý dữ liệu user khi đăng ký:

Tôi sẽ sửa lại nội dung file "register.html", tôi dùng cú pháp "<!-- .... -->" để bỏ tag <form> ra:
    
![image.png](https://images.viblo.asia/a75048d6-efc3-4736-b494-759915129812.png)

Tại 2 field là "userName" và "password" tôi thêm thuộc tính "id" để get value 2 field này trong script file

Với button **"Sign up"** tôi sẽ thêm sự kiện **"onClick()"** để bắt sự kiện mỗi khi click button và khai báo function tên **"requestData()"** để xử lý sự kiện này

```js
     function requestData(page){
            let name = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            // Validate username and password not null
            if((!name || name.length === 0) || (!password || password.length === 0)){
                document.getElementById("message").innerHTML = "Username and Password not blank";
                return;
            }

            $.ajax({
              type: "POST",
              url: "https://localhost:8080/" + page,
              data: JSON.stringify({ "name": name, "password" : encodeStrToBase64(password) }),
              contentType: "application/json",
              success: function (result) {
                console.log(result);
                // redirect it's self if user existed
                if(result == "register"){
                    document.getElementById("message").innerHTML = "Username or Password incorrect";
                    return;
                }
                    window.location.href = result;

              },
            });
```

Thêm file "script.js" tại html file:
    
![image.png](https://images.viblo.asia/3d9d7c01-4d10-406f-b0d1-5a2385921ae6.png)
    
## 3. Xử lý chức năng đăng ký tại backend:
     
Tại UserController thêm 2 mapping:
    
+ "/register": mapping này dùng để load page đăng ký
+ "/createUser": Mapping này dùng để kiểm tra dữ liệu user đăng ký và tạo mới user
    
![image.png](https://images.viblo.asia/c1a2b1e8-f311-42e5-8346-9f37e1e1215d.png)
    
Trong phương thức "createUser" tôi có thêm annotation "@RequestBody", annotation này dùng để nhận lấy data json được gửi đến. Ngoài ra, tôi cũng xài thêm annotation "@ResponseBody" tôi sẽ giải thích thêm về việc sử dụng annotation này
    
Trong controller hiện tại tôi sử dụng annotation "@Controller" và khi sử dụng annotation này nếu trong phương thức trả về tên 1 page html có trong thư mục "templates" -> nó sẽ tự động load page tương ứng lên, nhưng nếu trả về một tên bất kỳ mà hệ thống kiểm tra không thấy page nào tương ứng trong thư mục "templates" -> sẽ báo lỗi. 
    
Hiện tại tôi sử dụng ajax để request data json và tại controller sẽ dùng annotation "@ResquestBody" nhận data, sau khi xử lý tất cả sẽ trả về html page tương ứng nhưng khi trả về như vậy nó sẽ không load trực tiếp html page mà sẽ quay lại function xử lý gửi request data và lúc này giá trị trả về sẽ là toàn bộ nội dung "text" của html page. Vì thế nên tôi sẽ thêm annotation "@ResponseBody" để chỉ trả về tên. Ví dụ, nếu trả về dòng lệnh (return: "register") mà không dùng annotation "@ResponseBody" -> như tôi nói nó sẽ load nội dung html page tương ứng, và tôi chỉ muốn lấy đúng giá trị tên là **"register"** -> tôi sử dụng annotation "@ResponseBody" và tại function xử lý request data tôi sẽ dùng giá trị này để redirect đến page tôi mong muốn
    
Tiến hành kiểm tra với các kịch bản:
    
### * Kịch bản 1: Tại trang đăng ký, nhập thông tin user chưa tồn tại trong database và kiểm tra xem thông tin password có được mã hoá chưa và user được tạo mới thành công
    
![image.png](https://images.viblo.asia/c9397712-8037-492b-8804-d5526bb981dd.png)
    
Như các bạn thấy, thông tin password đã được mã hoá thành công, bây giờ tôi sẽ lên elasticsearch kiểm tra dữ liệu user đã được tạo thành công chưa:
    
![image.png](https://images.viblo.asia/5e4726e0-83ff-4830-9840-a7c2795f722d.png)
    
=> Dữ liệu được thêm mới thành công
    
## 4. Xử lý chức năng đăng nhập tại frontend:
    
Tôi sẽ sửa lại nội dung file **"index.html"**, tôi dùng cú pháp "<!-- .... -->" để bỏ tag <form> ra:
    
![image.png](https://images.viblo.asia/844b4943-795a-4b05-afcd-3a2a0c9e6e48.png)

Tại 2 field là "userName" và "password" tôi thêm thuộc tính "id" để get value 2 field này trong script file

Với button **"Login"** tôi sẽ thêm sự kiện **"onClick()"** để bắt sự kiện mỗi khi click button và khai báo function tên **"requestData()"** để xử lý sự kiện này
    
Xài chung script file:
```js  
         function requestData(page){
            let name = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            // Validate username and password not null
            if((!name || name.length === 0) || (!password || password.length === 0)){
                document.getElementById("message").innerHTML = "Username and Password not blank";
                return;
            }

            $.ajax({
              type: "POST",
              url: "https://localhost:8080/" + page,
              data: JSON.stringify({ "name": name, "password" : encodeStrToBase64(password) }),
              contentType: "application/json",
              success: function (result) {
                console.log(result);
                // redirect it's self if user existed
                if(result == "register"){
                    document.getElementById("message").innerHTML = "Username or Password incorrect";
                    return;
                }
                    window.location.href = result;

              },
            });
```
## 5. Xử lý chức năng đăng nhập tại backend:
    
Tại UserController thêm 2 mapping:
    
+ "/dashboard": mapping này dùng để load page dashboard
+ "/login": Mapping này dùng để kiểm tra dữ liệu user đăng nhập
    
![image.png](https://images.viblo.asia/8027d94c-27b8-4c94-89a1-d80600c50b61.png)
    
Trong phương thức "checkInfoUserLogin" tôi có gọi đến function "decodeStr" trong class UserService, nhiệm vụ của function lá đề xử lý giải mã(decode) thông tin password từ dạng base64 trở về lại dạng utf8
    
Ví dụ, tôi nhập password là **"123456"(utf8)** -> sau khi mã hoá(encode) đến base64 sẽ thành **"MTIzNDU2"** và lưu vào database, đến khi giải mã(decode) password này sẽ trở về lại dạng utf8 là "123456"
    
Thực chất tôi không cần phải decode thông tin password rồi mới đem so sánh bởi vì thông tin password khi user nhập tại trang login đã được mã hoá và gửi về nên có thể so sánh trực tiếp dưới dạng base64, nhưng tôi muốn thêm vào để giải thích các bạn biết nguyên lý làm việc của encode và decode này
    
Tiép theo, trong phương thức "checkInfoUserLogin" tôi có dòng code này:
    
    System.setProperty("login.page", users.getName());
    
Mục đích của đoạn code này là để lưu thông tin "username" vào giá trị property trong "application.yml", các bạn thấy trong controller này tôi dùng annotation "@Value" để lấy ra giá trị Property này:
    
![image.png](https://images.viblo.asia/9e01a0a8-ae72-4479-97e4-1523a8577385.png)
    
Và tôi khai báo giá trị này trong "application.yml":
    
![image.png](https://images.viblo.asia/6ab85274-43e6-4950-b8c9-7d9f0245deb9.png)
    
Vậy tại sao tôi sử dụng điều này thay vì dùng "Model", bởi vì sau khi kiểm tra thông tin user đăng nhập và thấy user này có trong hệ thống -> sẽ trả về trang dashboard và tôi có giải thích ở mục 3 là thay vì trực tiếp load trang "dashboard" -> sẽ trả về giá trị về lại function xử lý request data, vì thế nếu sử dụng "Model" -> sau khi redirect đến page dashboard -> giá trị model này chắc chắn sẽ mất và tôi thì muốn tại page dashboard in ra userName của user đăng nhập thành công
    
Có nhiều cách để xử lý điều này nhưng tôi sẽ hướng dẫn cách dễ làm nhất và quan trọng hơn hết là tuỳ theo project mà ta áp dụng những cách thức khác nhau để xử lý vấn đề
    
Tôi sẽ kiểm tra để thấy mọi thứ có làm việc ổn hay không, đầu tiên tại trang đăng nhập tôi nhập thông tin user đã có trong hệ thống:
    
![image.png](https://images.viblo.asia/f5cbc5a2-ef81-4e5b-9043-9b473375ee6a.png)
    
Tôi sẽ kiểm tra thông tin user này trong database:
    
![image.png](https://images.viblo.asia/5174a20d-852e-4868-9c62-bb9c7584670f.png)
    
=> 2 dữ liệu này giống nhau
    
![image.png](https://images.viblo.asia/9f5b3a2b-79c0-4e44-8237-7270481d61c7.png)
    
=> Dashboard được load và username được in ra thành công. Để in giá trị property trong "application.yml" ra html file, tôi sử dụng Thymeleaf với cú pháp:
    
    ${@environment.getProperty('login.page')}    
    
![image.png](https://images.viblo.asia/fd3fa23e-836c-4812-beeb-745caf089ca1.png)
    
Đây là nội dung của bài viết hôm nay. Trong thời gian tới, có thể tôi sẽ demo 1 project sử dụng captcha cho xác thực khi user đăng nhập nhằm mục đích hạn chế việc call api nhiều lần.