# 1. Giới thiệu qua về Vapor? 
- Vapor là web framework dùng cho ngôn ngữ Swift chạy được trên macOS, Ubuntu và tất cả các packages mà Vapor hỗ trợ.
- Vapor là web framework được sử dụng nhiều cho swift, bao gồm giao diện đơn giản và dễ sử dụng cho website hoặc API.
# 2.Tại sao sử dụng Vapor? 
- Phát triển app sử dụng Vapor là một trải nghiệm độc đáo. 
- Swift là một ngôn ngữ với các đặc điểm strongly statically-typed -> giảm thiểu số lần runtime crash của app IOS. Server-side app cũng được hưởng lợi từ điều này.
- Tuy nhiên lợi thế lớn nhất của việc sử dụng server-side Swift app là bạn sử dụng ngôn ngữ Swift! Swift là một trong những ngôn ngữ có tốc độ phát triển nhanh. Nếu bạn đang phát triển app IOS, bạn sẽ có hiểu biết tốt về Swift do đó bạn có thể chia sẻ business logic code giữa serer-side app và IOS app.
- Chọn Swift cũng có nghĩa bạn sẽ sử dụng Xcode để phát triển seriver-side app. Điều này khiến cho bạn debugging tốt với IDE, điều mà các ngôn ngữ server-side không có.
# 3.First code Vapor.
- Vapor Toolbox là một CLI (command line interface) mà bạn sẽ sử dụng khi phát triển Vapor app. Nó bao gồm một vài đặc điểm sau:
    - Tạo app mới từ các templates
    - Khởi tạo và chạy project sử dụng Swift.
    - Khời tạo Xcode Project
    - Deploying project với Vapor cloud.
 - Trước khi bạn cài đặt toolbox, bạn cần chắc chắn thiết bị của bạn phải phù hợp (macOS), bằng cách mở terminal lên thực hiện câu lệnh:
 ```javascript
eval "$(curl -sL check.vapor.sh)"
```
![](https://images.viblo.asia/2f0e6cbc-aeaa-4f83-be7a-ba7b60c4fea2.png)
- Khi đã check công cụ phù hợp bạn sẽ tiếp tục cài đặt vapor toolbox trên macOS:
 ```javascript
brew install vapor/tap/vapor
```
- Sau khi đã cài vapor toolbox, chúng ta thực hiện tiếp các câu lệnh để thực hiện khởi tạo app đầu tiên:

1/ mkdir ~/vapor

2/ cd ~/vapor

3/ vapor new HelloVapor

![](https://images.viblo.asia/ea7cea0e-2a7b-4b16-ac63-0d3d29890c28.png)

- Để build và start app bạn sẽ thực hiện các dòng lệnh sau:

1/ cd HelloVapor

2/ vapor build

3/ vapor run

![](https://images.viblo.asia/2602bdce-4125-4d65-b91c-6aa07386c73a.png)https://images.viblo.asia/2602bdce-4125-4d65-b91c-6aa07386c73a.png
- Template này đã sẵn có route, vậy để kiểm tra hãy mở browser của bạn lên và gõ http://localhost:8080/hello để thấy kết quả.

![](https://images.viblo.asia/66cc3340-1361-4a7d-b7b6-dc76291541d8.png)

# 4.Createing custom routes.
- Vapor sử dụng Swift Package Manager(SPM) - một hệ thống quản lý giống Cocoapods trên IOS - để configure và build Vapor app.
-  Thực hiện câu lệnh: "vapor xcode -y " để khởi tạo Xcode project và mở nó. Mở routes.swift trong Sources/App.
-  Để tạo một route khác , ta thêm những dòng code sau ngay route.get("hello"):
 ```javascript
router.get("hello", "vapor") {  req -> String in
    return "Hello Vapor!"
}
```
- Đây là những điều chúng ta vừa nhận diện:
    - Thêm một route xử lý GET request. Mỗi paramater của router.get là một path component trong URL. route này sẽ được nhận diện khi users ấn vào link: http://localhost:8080/hello/vapor 
    - Cho phép closure chaỵ khi route được nhận diện. Closure nhận được một Request object- điều mà chúng ta sẽ được tìm hiểu ở phần sau:
    - Trả về một chuỗi string kết quả cho route này.
 - Trên Xcode toolbar, chọn Run scheme và chọn thiết bị Mac:
 
![](https://images.viblo.asia/40089648-908a-4a19-85a4-906fd68a2b22.png)
- Ấm Build và trong browser : http://localhost:8080/hello/vapor bạn nhận được:
![](https://images.viblo.asia/8323ef37-7cbd-4285-8809-9721792d00be.png)
- Thế nếu bạn muốn say Hello với một ai đó thăm app của bạn thì sao? Ví dụ bạn tên là Khanh sử dụng URL: http://localhost:8080/hello/Khanh thì kết quả sẽ là "Hello, Khanh!"
```javascript
// 1
router.get("hello", String.parameter) { req -> String in
// 2
    let name = try req.parameters.next(String.self)
// 3
    return "Hello, \(name)!"
}
```

- Chúng ta sẽ giải thích kỹ những điều vừa thực hiện bên trên:

1/ Sử dụng String.parameter để định nghĩa paramter thứ 2 có thể là any String.

2/ Giải nén name users được truyền vào Request Object.

3/ Sử dụng name để trả về danh tính của bạn

- Buid and run, Trong browser của bạn: http://localhost:8080/hello/Khanh. Thử thay thế Khanh với 1 vài giá trị khác:
![](https://images.viblo.asia/be4cad5f-235a-4aa6-b717-0201235ec9b7.png)
# 5.Accept Data.
- Hầu hết các web đều sử dụng data. Một ví dụ dễ hình dung là User-Login. Để làm tác vụ này, client sẽ gửi POST-request với JSON body - app sẽ phải decode và process. Chúng ta sẽ tìm hiểu kỹ hơn ở mục HTTP Basics.
- Ở đây chúng ta sẽ sử dụng RESTed app có thể download free trên Mac App Store.
- Chúng ta sẽ set up request như sau:
    - URL: http://localhost:8080/info
    - Method: POST
    - Thêm một parameter - name.
    - Chọn JSON-encoded cho kiểu reuquest type.  Điểu này bảo đảm cho việc data sẽ được gửi đi  như JSON và Content-Type header được set cho application/json. Nếu bạn sử dụng client khác bạn sẽ phải set những điều này thủ công.
 - Reqquest của bạn sẽ trông như sau:
   ![](https://images.viblo.asia/6cd910f8-50d3-4197-981a-883e97f555e7.png)
- Trở lại Xcode, mở routes.swift và thêm vào cuối file struct tên InfoData cho request:
```javascript
struct InfoData: Content {
    let name: String
}
```
- Tiếp đó chúng ta thêm một router mới ngay sau router.get:
```javascript
router.post(InfoData.self, at: "info") { req, data -> String in
        return "Hello \(data.name)!"
    }
```
- Đây là điều chúng ta vừa thực hiện;
    - Thêm vào một router mới để xử lý POST request cho URL: http://localhost:8080/info. Router này sẽ xử lý và trả về chuỗi String. Router xác nhận Content như parameter đầu tiên và bất kì parameter path tại at: parameter name. Router xử lý decode và truyền nó vào closure như một parameter thứ 2.
    - Trả về chuỗi string bằng cách kéo name ra khỏi biến data.
- Build and run. Gửi một request và bạn sẽ thấy response trả về:
![](https://images.viblo.asia/128c0fe6-f993-4fa0-b7b4-3459c2a1ccc8.png)
- Trông có vẻ dễ hiểu với việc extract 1 parameter đơn từ JSON. Tuy nhiên, Codable cho phép bạn decode nhũng JSON object phức tạp với nhiều type trong 1 dòng.
# 6.Returning JSON.
- Vapor cũng làm cho việc trả về JSON trong router của bạn dễ dàng hơn. Đây là điều cần thiết khi app của bạn bao gồm API Services.
- Ví dụ: một VAPOR app sẽ tiền hành xử lý request từ app IOS và cần trả về JSON response. Vapor lại sử dụng Content để encode response như JSON.
- Mở routes.swift và thêm vào struct tên InfoResponse ở cuối file:
```javascript
struct InfoResponse: Content {
    let reuquest: InfoData
}
```
- Struct này có dạng Content và chứ property cho request. Tiếp đó, thay thế router.post như sau:
```javascript
router.post(InfoData.self, at: "info") { req, data -> InfoResponse in
        return InfoResponse(reuquest: data)
    }
```
- Chúng ta đã thay đổi những điều sau:
    - Router xử lý giờ trả về dạng mới là InfoResponse.
    - Struct InfoResponse giờ sử dụng decode request.
 - Build and run. Gửi một request từ RESTed. Bạn sẽ thấy JSON response bao gồm cả request data gốc của bạn:
 ![](https://images.viblo.asia/729b9d84-c78f-48e5-b686-1db933266048.png)
 
 - Ở chương sau, chúng ta sẽ tìm hiểu về HTTP Basic. Nhiều kiến thức sẽ được đưa ra hơn yêu cầu chúng ta sự tập trung cũng như thời gian chuẩn bị tốt hơn. Hẹn sớm gặp lại các bạn