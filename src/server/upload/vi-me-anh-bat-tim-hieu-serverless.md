## 1. Lịch sử hình thành

Để bắt đầu tìm hiểu về serverless, mình sẽ tóm lược sơ lịch sử phát triển phần mềm
| ![image](https://dashbird.io/wp-content/uploads/2018/06/image1.png) |
|:--:|
| Nguồn https://dashbird.io/|

Từ thuở sơ khai, systems administrators chuẩn bị server vật lý như cài đặt OS, driver, đảm bảo memory/disk/processor để deploy phần mềm. Ngoài ra họ còn phải quan tâm tới việt upgrades và những thứ khác liên quan phần cứng để deploy phần mềm(software). Phần cứng(hardware) bị gắn chặt với software. Giai đoạn này có tên là **Bare metal**

Tiếp theo đó tới giai đoạn **virtual machine**, ở giai đoạn này, người ta tạo ra các máy ảo, khi phần hardware bị lỗi, người ta có thể migrate máy ảo sang phần hardware khác. Ngoài ra system administrator cũng có thể cho chạy nhiều máy ảo trên cùng một phần cứng để tiết kiệm chi phí. Tuy nhiên máy ảo có khá nhiều hạn chế.

Kỉ nguyên **containerized development**, tiêu biểu của containerized development là Docker, OpenVZ... Kỹ thuật này cho phép system administrator chạy nhiều ứng dụng khác nhau trên cùng hệ thống mà không làm ảnh hưởng tới nhau, cung cấp môi trường nhẹ hơn nhiều so với virtual machine, hoạt động thống nhất giữa các môi trường.... bạn có thể tìm hiểu thêm về điểm vượt bật của containerized development so với virtual machine [tại đây](https://www.netapp.com/blog/containers-vs-vms/#:~:text=Conclusion%20Virtual%20machines%20and%20containers,to%20run%20multiple%20OS%20instances.)

Với các kiểu mô hình server truyền thống ở trên, chúng ta xây dựng và triển khai trang web/ứng dụng trên một số cơ sở hạ tầng và phải có trách nhiệm cung cấp, quản lý tài nguyên cho server. Tuy nhiên, chúng ta có thể gặp một số vấn đề sau:

- Bạn phải config server, áp dụng các cách bảo mật thích hợp với server, cũng như phải upgrade OS, driver của server.
- Phải duy trì server chạy liên tục 24/7 ngay cả khi server không nhận/xử lý request nào. Ví dụ như ứng dụng của bạn xây dựng nhắm tới lượng khách hàng là các gymer. Gymer chỉ hoạt động vào ban ngày, những ai siêng lắm thì tập tới 12h khuya. Vậy nên ứng dụng của bạn phải duy trì hoạt động vào ban ngày, tuy nhiên, sau 12h đêm bạn không thể tắt server đi và bật lại vào sáng sớm hôm sau để tiết kiệm chi phí được. Biết đâu có ai đó tập vào lúc 2h sáng?
- Phải chịu trách nhiệm, bảo trì, đảm bảo hệ thống hoạt động 24/7. Quay lại ví dụ ứng dụng tập gym phía trên, giả sử ứng dụng của bạn bị chết bất đắc kì tử lúc 2h sáng hoặc trong dịp lễ tết, bạn đang đi chúc tết gia đình, hàng xóm. Bạn vẫn phải ngay lập tức truy cập vào server để restart, maintain nó. Nếu bạn nghỉ, không restart lại server, sếp sẽ cho bạn nghĩ luôn.
- Khi server của bạn có quá nhiều lượt request, bạn phải áp dụng các cơ chế auto scales, hoặc dùng kubernetes, docker swarm. Lúc đó bạn sẽ cần tính toán cơ chế auto scales như thế nào, tối thiểu cần bao nhiêu pod, tối đa cần bao nhiêu pod... và nhiều thứ khác liên quan. Tuy nhiên, khi lượng request tăng đột ngột, thiếu memory vẫn có thể dẫn tới chương trình của bạn bị chết bất đắc kì tử trong một thời gian ngắn.

Đối với một công ty nhỏ, hoặc dự án nhỏ, việc bạn - developer có thể handle các vấn đề trên một cách dễ dàng. Nhưng đối với một công ty lớn, dự án lớn được triển khai bằng microservice, khối lượng công việc của bạn rất nhiều, lúc đó cần tới systems administrators/operation team. Bạn hãy thử tưởng tượng một team develop có thể phát triển, vận hành 7 service(team size trung bình 7 người một team, mỗi người đảm nhiệm 1 service). Dự án có 10 team develop => có 70 service. Khi maintain, upgrade, trace log, systems administrators/operation team cần có sự hỗ trợ của team develop. Đến một thời điểm khi lượng service đủ lớn, nhân sự team systems administrators/operation team sẽ phình to ra, lúc đó rất khó để quản lý, upgrade, maintain.

Từ những vấn đề gặp phải ở trên, vào năm 2008, Google phát hành Google App Engine - serverless computing đầu tiên. Đây là lần đầu tiên developer biết đến việc khởi chạy phần mềm mà không cần quan tâm tới server. Năm 2015, AWS cũng tung ra một service tương tự nhưng với tên gọi là lambda.

## 2. Serverless Computing là gì?

- Serverless computing là một mô hình thực thi trong đó nhà cung cấp cloud(AWS, Azure, Google cloud) có trách nhiệm thực hiện một đoạn code bằng cách phân bổ động các tài nguyên. Serverless cho phép chúng ta viết code và deploy một cách dễ dàng mà không cần quan tâm tới cơ sở hạ tầng bên dưới. Chúng ta - những người sử dụng dịch vụ cloud chỉ cần trả chi phí dựa trên số lượng tài nguyên sử dụng. Các phần code trong serverless có thể được trigger để chạy bằng nhiều cách như: http request, upload file, queue service, monitoring alert...
  Code đưa lên cloud để thực thi thông thường dưới dạng function. Vậy nên serverless đôi khi được coi là "Function as a service"

## 3. Ưu điểm của serverless

- **Chi phí thấp:**
  Về mặc chi phí, serverless sử dụng bao nhiêu sẽ trả bấy nhiêu. Với mô hình truyền thống, hay kubernetes, khi cần đáp ứng được lượng lớn request, chúng ta sẽ nâng cấp server, tăng RAM/CPU(scale chiều sâu) hoặc tạo thêm pod(scale chiều rộng). Ví dụ như một pod của kubernetes đáp ứng được 10k request, khi có 11k request, chúng ta phải trả chi phí cho 2 pod. Khi có 19k request, chúng ta cũng phải trả tiền cho 2 pod. Khi có 21k request, chúng ta phải trả chi phí cho 3 pod vận hành. Với trường hợp 11k request, chúng ta phải trả chi phí cho pod thứ 2 mặc dù không dùng hết, hay như 21k request, chúng ta phải trả chi phí cho pod thứ 3 mặc dù chỉ dùng một ít. Tuy nhiên với serverless. Bạn sử dụng bao nhiêu thì chi trả bấy nhiêu dựa trên số lượng sử dụng. Bạn có thể xem hình bên dưới để có thể hiểu rõ hơn.
  ![image](https://cf-assets.www.cloudflare.com/slt3lc6tev37/7nyIgiecrfe9W6TfmJRpNh/dfc5434659e31300d1918d4163dfb263/benefits-of-serverless.svg)

  Nhìn chung, serverless đạt hiệu quả về mặt chi phí hơn server truyền thống. Chúng ta chỉ cần trả tiền cho phần sử dụng, không giống như server truyền thống, chúng ta phải duy trì server hoạt động liên tục mặc dù không dùng hết công suất của nó.

- **Đơn giản để mở rộng:**
  Developer chỉ việc sử dụng kiến trúc serverless của các dịch vụ cloud. Còn lại thế giới để cloud provider lo.
- **Code đơn giản hơn:**
  Với kiến trúc function as a service của serverless. Chúng ta - developer có thể code dễ dàng bằng cách tạo ra các function đơn giản đảm nhiệm một vai trò, ví dụ như gọi API

## 4. Các vấn để cần quan tâm khi sử dụng serverless

- Kiến trúc:
  Nếu bạn đã tiếp xúc với monolithic và microservice, bạn sẽ thấy mindset phát triển ứng dụng theo hai kiến trúc này khác nhau. Nếu microservice là bảng băm nhỏ của monolithic, thì serverless(Function as a service) là bảng băm nhỏ của microservice. Thông thường, người ta có thể giữ một microservice chạy trên một lambda của serverless, nhưng đôi lúc mọi người cũng sẽ tách microservice chạy trên nhiều lambda, tùy thuộc vào chức năng.
- Stateless Functions:
  Function của bạn sẽ được chạy trong stateless containers, điều đó có nghĩa là sau khi function thực thi xong, container có thể bị kill(container sẽ bị kill sau một khoảng thời gian dài không được trigger), điều đó dẫn tới việc bạn không thể lưu giá trị trong bộ nhớ RAM của container cho lần thực thi tiếp theo. Vậy nên, nếu bạn muốn lưu trữ giá trị quan trọng cho lần thực thi tiếp theo, thông thường bạn phải dùng tới một nơi khác để lưu trữ như redis.
- Cold Starts:
  Code của bạn sẽ chạy trong container - container này chỉ chạy khi có event được kích hoạt. Sau một khoảng thời gian không thực thi, container thông thường sẽ bị kill. Khi có trigger mới vào serverless, hệ thống cần một khoản thời gian ngắn để khởi chạy container(tuy phải khởi chạy mới container nhưng vẫn nhanh hơn nhiều so với start mới một pod trong kubernetes), dẫn tới lần trigger đầu tiên sau khi container bị kill sẽ mất nhiều thời gian hơn bình thường. Vấn đề này gọi là cold start. Tuy nhiên, với trải nghiệm của mình với lambda của AWS thì khoảng thời gian đó khoảng 100ms tới 1s. Khoảng thời gian này còn phụ thuộc vào ngôn ngữ code, kích thước của function/package. Để khắc phục vấn đề đó, các cloud cung cấp mode warm start, các container sẽ chuyển qua trạng thái ngủ đông mà không bị kill hẳn.

## 5. Tổng kết
Từ những vấn đề đã nêu ở trên, các bạn đã có cái nhìn tổng quan về serverless là gì, ưu, nhược điểm của serverless. Ở bài tiếp theo mình sẽ nêu một ví dụ cụ thể của serverless mà AWS cung cấp qua bài **[Vũ trụ trong lambda](https://viblo.asia/p/vu-tru-trong-lambda-XL6lAe8plek)**. Các bạn cùng đón đọc nhé.
Ngoài ra, để ủng hộ cho mình trong quá trình tìm hiểu những kiến thức, công nghệ mới và ngồi cả ngày để tổng hợp và viết lại thì nhờ các follow github của mình: https://github.com/caophuc799 nhé.