Chào mọi người, bài viết này mình sẽ hướng dẫn các bạn làm thế nào để chạy và test một document API được viết bằng Swagger. Ở đây mình không đề cập đến các khái niệm, cú pháp và cách viết một file document API sử dụng Swagger, những thứ đó các ban có thể tham khảo ở trang chủ của Swagger [swagger.io](https://swagger.io/),  mà chỉ đề cập cách để config swaagger làm thế nào để chạy trong dự án mà bạn đang làm mà thôi.
## Hạn chế của các gem swagger trong Rails
Thực ra chủ đề này xuất phát từ thực tiễn mà team mình đang gặp phải. Bọn mình đang viết API bằng framework **Rails** cho ứng dụng của khách hàng,  và khách hàng yêu cầu bọn mình viết document cho API. Sau một hồi tìm kiếm thì mình thấy trong các diễn đàn và trang mạng đa phần hướng dẫn sử dụng gem  [*swagger-docs*](https://github.com/richhollis/swagger-docs),  tuy nhiên nó có 1 hạn chế đó là sử dụng nền tảng Swagger 1.x trong khi hiện tại thì Swagger đã lên đến version 2.x, thay đổi rất nhiều về các tool tùy biến cho người dùng và đáp ứng được nhiều hơn yêu cầu từ người dùng. Sau một hồi làm thử thì mình thấy nó có quá nhiều hạn chế nên mình chuyển sang tìm kiếm các gem khác. Có một điều mà mình nhận thấy ở các gem đó là đa phần sẽ phải viết mô tả document API vào trực tiếp file Controller, ví dụ như: 
```
class Api::V1::UsersController < ApplicationController

  swagger_controller :users, "User Management"

  swagger_api :index do
    summary "Fetches all User items"
    notes "This lists all the active users"
    param :query, :page, :integer, :optional, "Page number"
    param :path, :nested_id, :integer, :optional, "Team Id"
    response :unauthorized
    response :not_acceptable, "The request you made is not acceptable"
    response :requested_range_not_satisfiable
  end
  .........
```

Mặc dù nó không ảnh hưởng gì đến quá trình hoạt động của API, tuy nhiên nó gây khó chịu cho việc đọc code và việc nhúng vào file controller như thế này quả là không hay tí nào, vả lại nó cũng không hoàn toàn tuân theo cách viết document trên trang chủ của Swagger, nên đôi khí sẽ khó để config cho lập trình viên. Và thế là mình suy nghĩ làm cách nào để nhùng trực tiếp thư viện của thằng Swagger vào project của mình hay không ? Sau một hồi tìm hiểu thì *Ơ rê ka ra rồi*, và đôi khi nó đơn giản đến không ngời.
## Option 1: Import thư viện Swagger UI
Thực chất thì để hiển thị một document API cho người dùng đọc, thì chỉ cần 2 thứ, đó là thư viện Swagger UI và file document API được viết theo cú pháp và cấu trúc của Swagger có định dạng là ***.yaml**.  Để cài đặt nó trong project của mình thì bạn làm như sau:

Thực hiện pull thư viện swagger-ui từ trang [github của nó](https://github.com/swagger-api/swagger-ui) vào project của mình như sau:
```
git clone git@github.com:swagger-api/swagger-ui.git public/swagger-ui
```
Sau đó config trong file config/routes.rb để Rails có thể nhận đường dẫn đến file html tĩnh để chạy màn hình document API:
```
get '/swagger-ui', to: redirect('swagger-ui/dist/index.html?url=%2Fswagger.yaml')
```
Và file document API mẫu của minhf là swagger.yaml có nội dung như sau:
```
swagger: 2.0
info:
  description: Example of integration swagger with Rails
  version: 1.0.0
  title: Rails 5 Swagger
schemes:
  - http
host: "localhost:3000"
basePath: "/api/v1"
paths:
  /users:
    post:
      tags:
        - Register user
      description: Create new user
      produces:
        - application/json
      parameters:
        - in: "formData"
          name: "user[nickname]"
          required: true
        - in: "formData"
          name: "user[birthday]"
          required: true
          type: string
        - in: "formData"
          name: "user[avatar_id]"
          required: true
          type: number
      responses:
        200:
          description: User created
```
Các bạn chú ý, như mình đã nói ở trên thì để chạy màn hình hiển thị document API của thằng swagger, thì ở đây mình đã pull thư viện swagger UI về project của mình và mình có file swagger.yaml, việc của mình chỉ là khai báo đường dẫn vào đến file chạy mà thôi.
Sau khi đã cài đặt xong, khởi động server Rails và truy cập vào đường dẫn: localhost:3000/swagger-ui, mình sẽ có kết quả như sau:
![swagger-index](https://images.viblo.asia/09085570-4333-484b-b105-bb31b0bf5e43.png)

Hura, vậy là mình đã nhúng thành công nó, thấy có vể đơn giản quá nhỉ, và nó thực sự ok nếu các bạn không có yêu cầu gì thêm. Tuy nhiên vẫn có một vấn đề đặt ra ở giải pháp này đó là thư viện Swagger UI có dung lượng lên đến gần 200MB, và nó được push trực tiếp vào sourecode của dự án mình, thực sự thì k hay tí nào, và việc get đến url document API trực tiếp trên server API đang chạy cũng làm cho dễ bị lộ cấu trúc của API, vì thực chất thằng giao diện của Swagger UI là một file tĩnh và nó chỉ handle lại response trả về mà thôi. Hãy tương tượng nó như thằng Postman, tuy nhiên nó cung cấp thêm phần mô tả cho API mà thôi.

## Option 2: Swagger with Docker
Như đã nói ở trên, để chạy swagger thì chỉ cần thư viện swagger-ui và file document API. Và ở đây mình muốn chạy server document API riêng với server API của mình. May thay Swagger đã support tận răng cho người dùng một image để chạy trên docker mà không cần phải config gì. Các bước thực hiện nó như sau:

**Step 1**: Cài đặt Docker.

**Step 2**: Sau khi cài đặt docker thì các bạn tiến hành pull image của swagger ui về bằng cách sử dụng command sau:
```
docker pull swaggerapi/swagger-ui
```
**Step 3**: Convert file *.yaml thành *.json

**Step 4**: Sau đó chạy command sau để khởi chạy server swagger
```
docker run -p 80:8080 -e "SWAGGER_JSON=/api.json" -v /actual/path/to/swagger.json:/api.json swaggerapi/swagger-ui
```

**Step 5**: Config CORS cho rails server API. Phương pháp này có một hạn chế đó là giữa 2 server phải giao tiếp với nhau. Vì vậy chúng ta phải config rack cors cho rails API. Ở đây mình sử dụng gem rack-cors, 1 gem thông dụng cho việc setting này.
Các bạn có thể tham khảo cách config ở trang github của nó: [rack-cors gem](https://github.com/cyu/rack-cors).

**Step 6:** Khởi động server API và kiếm tra thành quả của mình thôi.

## Option 3: Take it easy
Ở hai option trên, thì mình đã cung cấp cho các bạn cách làm thế nào để hiển thị một document viết bằng swagger, tuy nhiên, giả sử mình chỉ có một dự án nhỏ, API không nhiều lắm, có cần phải tốn công tải nguyên cả thư viện về hoặc phải cài docker để build hay không, giống như dùng dao mổ trâu mà giết gà vậy ? Sau khi vọc thư viện của nó thì mình nhận ra thằng swagger UI thì khi chạy, nó sẽ tìm đến file index.html trong thư mục dist của thư viện.
```
<!-- HTML for static distribution bundle build -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Swagger UI</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Source+Code+Pro:300,600|Titillium+Web:400,600,700" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="./swagger-ui.css" >
  <link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="./favicon-16x16.png" sizes="16x16" />
  ..........
</head>

<body>

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
  <defs>
    <symbol viewBox="0 0 20 20" id="unlocked">
          <path d="M15.8 8H14V5.6C14 2.703 12.665 1 10 1 7.334 1 6 2.703 6 5.6V6h2v-.801C8 3.754 8.797 3 10 3c1.203 0 2 .754 2 2.199V8H4c-.553 0-1 .646-1 1.199V17c0 .549.428 1.139.951 1.307l1.197.387C5.672 18.861 6.55 19 7.1 19h5.8c.549 0 1.428-.139 1.951-.307l1.196-.387c.524-.167.953-.757.953-1.306V9.199C17 8.646 16.352 8 15.8 8z"></path>
    </symbol>
................
  </defs>
</svg>

<div id="swagger-ui"></div>

<script src="./swagger-ui-bundle.js"> </script>
<script src="./swagger-ui-standalone-preset.js"> </script>
<script>
window.onload = function() {
  
  // Build a system
  const ui = SwaggerUIBundle({
    url: "http://petstore.swagger.io/v2/swagger.json",
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  })
  window.ui = ui
}
</script>
</body>

</html>
```

Nếu để ý thì các bạn có thể nhận ra rằng để hiển thị một document đơn giản thật ra k cần nhiều lắm, 1 file css có tên là swagger-ui.css, 2 file js là swagger-ui-bundle.js, swagger-ui-standalone-preset.js. Uhm, vậy mấy thư viện css và js đó lấy đâu ra, tất nhiên là nó nằm ở cùng thư mục với file index.html rồi, tuy nhiên, có cách nào đơn giản hơn nữa không ??? Search google 1 xí là ra ngay ấy mà, phải nói là thằng swagger này đã support tận răng cho dev, mình lên cdn search cái là ra liền à.

![](https://images.viblo.asia/a2a9ba5e-766c-45b4-8261-0f93495d34bf.png)

Và ở đây bạn chỉ cần thay attribute src của thẻ script và thẻ style thằng những link thư viện online tương ứng mà thôi. Vậy còn file document thì sao, đọc kĩ 1 tí thì bạn sẽ thấy dòng này.
```
url: "http://petstore.swagger.io/v2/swagger.json",
```
Thực ra đường dẫn này swagger cung cấp cho mình đến file document mẫu mà swagger cung cấp. Vì thế, để chạy document của riêng mình, thì chỉ cần parse file document API của chúng ta, up lên một server online nào đó và thay thế đường dẫn trên bằng đường dẫn đến file json của mình thôi. Ví dụ như file mình đã chỉnh sửa như sau:
```
<!-- HTML for static distribution bundle build -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Swagger UI</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Source+Code+Pro:300,600|Titillium+Web:400,600,700" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.13.2/swagger-ui.css" >
  <link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="./favicon-16x16.png" sizes="16x16" />
.................
</head>

<body>
.......................
<div id="swagger-ui"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.13.2/swagger-ui-bundle.js"> </script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.13.2/swagger-ui-standalone-preset.js"> </script>
<script>
window.onload = function() {
  
  // Build a system
  const ui = SwaggerUIBundle({
    url: "https://api.myjson.com/bins/15vk4z",
    dom_id: '#swagger-ui',
................
</script>
</body>
</html>
```

Như vậy, với cách này, chúng ta chỉ cần duy nhất 1 file tĩnh index.html theo mẫu của thằng swagger là đã hiển thị được document API rồi. Cực kì đơn giản phải không.
## Kết luận
Như vậy ở bài này mình đã hướng dẫn cho các bạn các cách làm thế nào để config swagger để hiển thị document API. Tùy từng trường hợp và yêu cầu của mỗi người để chọn ra option phù hợp nhất, vì không có cái nào là tốt nhất cả. Ngoài thằng Swagger ra thì còn có thằng API Blueprint cũng được nhiều lập trình viên sử dụng. Hy vọng mình sẽ có điều kiện tìm hiểu và giới thiệu nó cho các bạn trong tương lai.
Cảm ơn các bạn đã theo dõi.