<div align="center">
    
# Lời nói đầu
</div>

Nếu các bạn đã từng là sinh viên học theo tín chỉ hay là sĩ tử thi ĐH những năm gần đây, chắc hẳn các bạn sẽ không quá xa lại với cái cảnh tranh nhau lên web để đăng kí học, để xem kết quả các thứ. Trong khi nước sôi lửa bỏng thì bạn lại chỉ nhận được một thông báo ngắn gọn là "500 Internal Server Error", nhưng quay sang thằng bên cạnh thì lại thấy nó vẫn vào được bình thường, thế là bạn ra sức F5 nhưng kết quả không khá hơn.

Và nguyên nhân ở đây là do có quá nhiều người truy cập vào trang web cùng một lúc nên server không thể tải nổi, do đó xảy ra hiện tượng một số người thì vào được, còn một số người thì không (các cụ bảo là do **nhân phẩm**).

Với vai trò là một web developer, chúng ta sẽ phải tìm hiểu và đưa ra giải pháp để tránh tình trạng này. Và bước đầu tiên là phải test đã, chắc chắn một mình bạn không thể gửi request `bằng cơm` để test chịu tải của server được, vì vậy các công cụ hỗ trợ test chịu tải của server ra đời để cho cuộc sống của dev dễ dàng hơn phần nào.

Trong bài viết này chúng ta hãy cùng đi tìm hiểu về 1 công cụ mình mới được khai sáng, đó chính là **Artillery**.

<div align="center">
    
# Nội dung
</div>

![](https://images.viblo.asia/5965377a-6492-4246-b3e3-09e4f4d08c08.png)

Trước khi đi vào tìm hiểu về cách sử dụng Artillery thì mình cũng giới thiệu luôn là nó gồm 2 phiên bản, 1 là bản **Community Edition (miễn phí)** và bản **Pro (thu phí)**. Và trong phạm vi nghiên cứu tìm hiểu, sử dụng cá nhân thì chúng ta sẽ sử dụng bản miễn phí nhé, còn bạn nào có điều kiện hoặc làm theo team có thể thử bản thu phí (chi phí là khoảng > $199/tháng)

<div align="center">
    
## Cài đặt
</div>

Do Artillery được viết bằng Node.js nên để cài đặt được bạn cần phải cài Node.js phiên bản 10.16.3 trở lên, và câu lệnh cài đặt cũng rất đơn giản 
```bash
npm install -g artillery #cài đặt artillery

artillery -V #kiểm tra phiên bản, nếu không check được tức là việc cài đặt vẫn chưa thành công
```

<div align="center">
    
## Cấu hình và sử dụng
</div>

Sau khi cài đặt xong, hãy chạy thử một vài câu lệnh test đơn giản nhé
```bash
artillery quick --count 10 -n 20 https://artillery.io/
# Với câu lệnh trên, bạn đã tạo ra:
# - 10 user ảo
# - mỗi user gửi 20 request 
# đến địa chỉ https://artillery.io/
```

Tuy nhiên câu lệnh trên chỉ là một case rất đơn giản, trong thực tế thì user thường tương tác với Server theo một kịch bản chứ không chỉ đơn thuần là gửi request. Và để thực hiện test theo kịch bản, chúng ta cần tìm hiểu một số từ khóa để thiết lập cấu hình như sau:
- **target**: server muốn test (thường là base URL đối với HTTP application hoặc hostname đối với WebSocket Server)
- **phases**: khoảng thời gian chạy test và tần suất gửi request trong khoảng thời gian đó
    - trong **phases** có thể khai báo nhiều phase liên tiếp với khoảng thời gian và tần suất request khác nhau
    - có thể đặt tên cho từng **phases**
    - có thể sử dụng **pause** để tạo ra 1 phase tạm dừng, không thực hiện bất cứ thao tác gì
    - **rampTo**: bạn có thể hiểu nó giống như vòng `for`, ví dụ khi khai báo `arrivalRate: 0` và `rampTo: 10` thì artillery sẽ chia thành các phase liên tiếp với `arrialRate` lần lượt là 0, 1, 2, ... , 10.
- **headers**: khai báo HTTP header mặc định cho tất cả các requests mà bạn gửi đi
- **environments**: khi bạn muốn tái sử dụng phần test cho các môi trường khác nhau (staging, production, ...) với một số thay đổi nhỏ với từng môi trường, bạn có thể khai báo thêm môi trường như sau:
     ```yaml
     environments:
         production:
             target:
             phases:
         staging:
             target:
             phases:
     ```
     
 - **scenarios**: khai báo kịch bản test (được khai báo giống như một `object`, **BẮT BUỘC** chứa thuộc tính `flow` và có thể có một số thuộc tính khác)
     - **flow:** là một mảng, khai báo các hành động mà user ảo sẽ thực thi trong scenarios đó (có thể là request GET/POST đến HTTP application) 
     - **name:** mô tả chi tiét hoạt động của scenarios đó
     - **weight:** trọng số của scenarios, được hiểu là tỉ lệ % mà scenarios đó được chọn thực hiện (ví dụ 3 scenarios A,B,C có trọng số lần lượt là 2,3,5 thì A có 20% được chọn, B là 30% và C là 50%)

Và kết quả ta thu được là một file .yml có cấu trúc tương tự như bên dưới:

```yaml:example.yml
config:
  target: 'https://artillery.io' #địa chỉ muốn test
  phases: #có thể  khai báo để chạy nhiều phases với thiết lập cụ thể khác nhau 
    - duration: 60  #kéo dài trong 60s
      arrivalRate: 20 #trung bình 20 user/giây
      name: "tên phase 1"
    - pause: 60 #phase này sẽ không làm gì (pause) trong 60s
    - duration: 
      arrivalRate:
      name: "tên phase 2"
  defaults:
    headers:
      x-my-service-auth: '987401838271002188298567'
scenarios: #lên kịch bản cho cho từng user
  - flow:
    - get:
        url: "/docs"
    - post: 
        url: "/resource
```

Và để chạy test example.yml trên, ta thực hiện câu lệnh
```bash
artillery run example.yml 
```

Kết quả thu được sẽ có dạng như sau:
```bash
Complete report @ 2019-01-02T17:32:36.653Z
  Scenarios launched:  300 #số user ảo được tạo ra trong toàn bộ thời gian test
  Scenarios completed: 300 #số user ảo đã hoàn tất kịch bản test trong toàn bộ thời gian test
  Requests completed:  600 #số HTTP request và response  hoặc số messages WebSocket đã gửi
  RPS sent: 18.86 #số request trung bình đã hoàn tất mỗi giây (request per second)
  Request latency: #độ trễ request (được tính bằng đơn vị miliseconds)
    min: 52.1
    max: 11005.7
    median: 408.2
    p95: 1727.4 #95% số request cần <= 1727.4 milliseconds để hoàn tất
    p99: 3144 #99% số request cần <= 3144 milliseconds để hoàn tất
  Scenario counts:
    0: 300 (100%)
  Codes: #số lượng response trả về ứng với status code
    200: 300
    302: 300
```

Dựa vào report trên, chúng ta có thể nắm được tình trạng response mà server trả về trên tổng số users đã gửi request lên server:
-  Trong 600 request đã hoàn tất thì có 300 response trả về code 200 (OK) và 300 response trả về code 302 (Found). Ngoài ra còn có các status code khác, các bạn có thể tìm hiểu [tại đây](https://viblo.asia/p/tim-hieu-ve-http-response-status-code-gDVK2MgX5Lj). 
- Thời gian hoàn tất 1 request: 
    - nhanh nhất: 52.1 milliseconds (0.052s)
    -  lâu nhất: 11005.7 milliseconds (11s)
    -  trung bình: 408.2 milliseconds (0.4s)
    -  có 95% số request hoàn tất dưới 1727.4 milliseconds (1,7s)
    -  có 99% số request hoàn tất dưới 3144 milliseconds (3,1s)

-> từ những thống kê trên bạn có thể thấy server của bạn đang chạy khá là ổn với số lượng request như trên file `example.yml`, bạn có thể thử tăng `arrivalRate` lên xem khả năng tải của server chịu được đến đâu. 

Và khi đến mức giới hạn chịu tải của server, bạn có thể tìm hiểu thêm các cách để tăng chịu tải của server lên (ví dụ như refactor code, scale bằng cách thêm phần cứng server, ...)

<div align="center">
    
# Lời kết
</div>

Trong phạm vi bài viết này, mình mới chỉ giới thiệu sơ qua về các công cụ hỗ trợ test chịu tải của server thôi. Còn vấn đề làm thế nào để tăng chịu tải của server lên thì mình xin khất trong bài viết sau nhé, vì thú thực nó còn phụ thuộc vào rất nhiều vấn đề, nên không thể nói hết trong một bài viết được.

Cảm ơn các bạn đã theo dõi bài viết của mình, nếu thấy nó hữu ích, hãy upvote ủng hộ mình nhé!

<div align="center">
    
# Tài liệu tham khảo
</div>

- Artillery: https://artillery.io/
- Github: https://github.com/artilleryio/artillery
- Ngoài ra, Artillery còn đang phát động một chương trình khá thiết thực, đó là ủng hộ trồng 100,000 cây xanh tại địa chỉ https://offset.earth/artilleryio