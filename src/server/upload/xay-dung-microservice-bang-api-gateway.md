Ở [bài biết](https://viblo.asia/p/gioi-thieu-ve-microservices-gAm5y4Ewldb) trước, mình có chia sẻ một số thông tin cơ bản mà mình tìm hiểu được về mô hình Microservice. 

Không giống như mô hình nguyên khối (Monolithic Architecture) chỉ có một đầu vào và một đầu ra, mô hình Microservices là tập hợp của nhiều khối nhỏ có các chức năng riêng biệt có đầu vào và đầu ra riêng. Và để vận hành được thì các khối đó phải được liên kết với nhau một cách chặt chẽ để có thể tạo ra sự thống nhất, điều mà trực tiếp tác động đến giao tiếp ứng dụng của khách hàng và đến ứng dụng.

Và một trong các phương pháp được đề xuất ở đây sẽ là sử dụng API Gateway.

Vậy nó được tạo ra thế nào, cách thức vận hành và các ưu nhược điểm của chúng ra sao, ta sẽ phân tích kĩ hơn :D

 ## 1. Giới Thiệu
Hẫy tưởng tượng giờ bạn đang phát triển một sản phẩm ứng dụng mobile mua sắm. Trong đó bạn sẽ cần có một màn hình giao diện hiển thị thông tin chi tiết của bất cứ một sản phẩm nào.

Ví dụ: Đây là các giao diện quen thuộc của Shopee: 

![](https://images.viblo.asia/57bf7c50-8f8b-4470-9774-c006221c808c.png)

Mặc dù đây là một ứng dụng điện thoại thông minh, trang chi tiết sản phẩm hiện thị rất nhiều thông tin, ví dụ: không chỉ có thông tin sản phẩm cơ bản ( như tên, mô tả, giá cả) mà trang này còn hiển thị cả:

* Số lượng sản phẩm trong giỏ hàng
* Lịch sử đơn hàng
* Phản hồi khách hàng
* Cảnh báo tồn tại kho thấp
* Tùy chọn vẩn chuyển
* Các khuyến mại khác
* Tùy chọn thay thế

Khi sử dụng kiến trúc nguyên khối, phía client sẽ truy xuất dữ liệu này bằng cách tạo ra một request REST() cho ứng dụng. Một bộ cân bằng tải định tuyến yêu cầu đến một trong N trường hợp ứng dụng giống hệt nhau. Sau đó ứng dụng sẽ truy vấn các bảng cơ sở dữ liệu khác nhau và trả về cho phía client dữ liệu.

Ngược lại, khi sử dụng mô hình Microservices, dữ liệu được hiện thị trên màn hình chi tiết sản phẩm được sở hữu bởi nhiều microservices.

Có thể kể đến một số dịch vụ tiềm năng sở hữu dữ liệu được hiển thị trên màn hình chi tiết như:
* Dịch vụ giỏ hàng - Số lượng mặt hàng trong giỏ hàng
* Dịch vụ đặt hàng - Lịch sử mua hàng
* Dịch vu danh mục - Thông tin sản phẩm cơ bản như tên, giá, hình ảnh
* Đánh giá dịch vụ - Đánh giá của khách hàng
* Dich vụ kiểm kê - cảnh báo hàng tồn kho thấp
* Dịch vụ vận chuyển - Tùy chọn vận chuyển, thời hạn, chi phí vận chuyển
* Dịch vụ đề xuất - Các mặt hàng được đề xuất

![](https://images.viblo.asia/d4228994-9682-4780-b686-60afb525ceec.png)

## 2. Direct Client‑to‑Microservice Communication
Thuật ngữ trên có thể hiểu là người dùng trong mô hình có thể trực tiếp tương tác đến từng dịch vụ nhỏ bên trong. Tưởng tượng mỗi microservice sẽ có một điểm cuối công khai là api url (https:// serviceName . api. company. name). URL này sẽ ảnh xạ tới bộ cân bằng tải của microservices, phân phối các yêu cầu trên các phiển bản có sẵn. Để lấy thông tin chi tiết về sản phẩm, phía client sẽ yêu cầu từng dịch vụ được liệt kê ở trên.

Nhưng đấy chỉ là lý thuyết thôi, không may là nó sẽ có những vấn đề phát sinh với cái tùy chọn này. Thứ nhất, nó sẽ không phù hợp giữa nhu cầu của khách hàng và các API chi tiết được thể hiện bởi mỗi khối dịch vụ nhỏ này. Khách hàng trong ví dụ này yêu cầu riêng biệt, Trong khi các ứng dụng phức tạp hơn nên nó phải tạo ra nhiều hơn thế.

Một vấn đề khác với khách hàng gọi trực tiếp microservice là một số có thể sử dụng các giao thức không thân thiện với web. Một dịch vụ có thể sử dụng RPC nhị phân Thrift trong khi dịch vụ khác có thể sử dụng giao thức nhắn tin AMQP. Không giao thức nào đặc biệt là trình duyệt hay tường lửa, thân thiện và được sử dụng tốt nhất trong nội bộ. Một ứng dụng nên sử dụng các giao thức như HTTP và WebSocket bên ngoài tường lửa.

Một nhược điểm khác với cách tiếp cận này là nó gây khó khăn cho việc cấu trúc lại các dịch vụ siêu nhỏ. Theo thời gian, chúng tôi có thể muốn thay đổi cách hệ thống được phân vùng thành các dịch vụ. Ví dụ: chúng tôi có thể hợp nhất hai dịch vụ hoặc tách một dịch vụ thành hai hoặc nhiều dịch vụ. Tuy nhiên, nếu khách hàng giao tiếp trực tiếp với các dịch vụ, thì việc thực hiện loại tái cấu trúc này có thể cực kỳ khó khăn.

Do những loại vấn đề này, hiếm khi có ý nghĩa cho client nói chuyện trực tiếp với microservice.

## 3. API Gateway
Từ những nhược điểm của các tiếp cận phía trên, chúng ta đã có một phương pháp tiếp cận mới là sử dụng API Gateway. Thực chất vẫn là việc giao tiếp giữa client và microservice nhưng chúng ta sẽ không giao tiếp trực tiếp mà thông qua một thằng gọi là Gateway, nó giống như một người quản gia vậy. Từ xác thực, giám sát, lưu trữ, cân bằng tải hay xử lý phản hồi tình, .... đều làm được hết.

![](https://images.viblo.asia/1d64287b-4e87-4242-988b-8ad65caac9a2.png)

API Gateway chịu trách nhiệm định tuyến yêu cầu, thành phần và dịch giao thức.Tất cả các yêu cầu từ khách hàng trước tiên phải đi qua API Gateway. Sau đó, nó định tuyến các yêu cầu đến microservice thích hợp. API Gateway thường sẽ xử lý một yêu cầu bằng cách gọi nhiều dịch vụ siêu nhỏ và tổng hợp kết quả. Nó có thể dịch giữa các giao thức web như HTTP và WebSocket và các giao thức không thân thiện với web được sử dụng trong nội bộ.

API Gateway cũng có thể cung cấp cho mỗi khách hàng một API tùy chỉnh. Nó thường hiển thị API chi tiết thô cho các máy khách di động. Xem xét, ví dụ, kịch bản chi tiết sản phẩm. Cổng API có thể cung cấp điểm cuối ( / productdetails? Productid = xxx ) cho phép client truy xuất tất cả các chi tiết sản phẩm chỉ với một yêu cầu. API Gateway xử lý yêu cầu bằng cách gọi các dịch vụ khác nhau - thông tin sản phẩm, đề xuất, đánh giá, v.v. - và kết hợp các kết quả.

Có vẻ cách thực trên đã giải quyết được các nhược điểm của cách thức liên kết trực tiếp kia xong nó vẫn sẽ có một số nhược điểm.
## 3. Nhược Điểm
*  Nó là một thành phần rất sẵn có khác phải được phát triển, triển khai và quản lý. 
*  Cũng có nguy cơ rằng API Gateway trở thành nút cổ chai phát triển. Các nhà phát triển phải cập nhật API Gateway để hiển thị từng điểm cuối của microservice. 
*  Điều quan trọng là quá trình cập nhật API Gateway phải nhẹ nhất có thể. Nếu không, các nhà phát triển sẽ buộc phải chờ xếp hàng để cập nhật cổng

Tuy vẫn có nhược điểm xong nó cũng có một số ưu điểm mà người ta vẫn sự dụng nó.
## 5. Ưu Điểm
*  Một lợi ích chính của việc sử dụng API Gateway là nó đóng gói cấu trúc bên trong của ứng dụng. Thay vì phải gọi các dịch vụ cụ thể, client chỉ cần nói chuyện với cổng.
*  API Gateway cung cấp cho mỗi loại khách hàng một API cụ thể. Điều này làm giảm số lượng các chuyến đi khứ hồi giữa client và server. Nó cũng đơn giản hóa mã client
##  6. Triển Khai
Khi thực hiện triển khai microservice bằng cách sử dụng API Gateway, chúng ta sẽ phải chú ý một số vấn đề sau:

> **Hiệu suất và khả năng mở rộng**
> 
> Xây dựng API Gateway trên nền tảng hỗ trợ I / O không đồng bộ, không chặn.

> **Sử dụng mô hình lập trình phản ứng**
> 
> Viết mã API Gateway theo kiểu khai báo bằng cách sử dụng phương pháp phản ứng.

> **Yêu cầu dịch vụ**
> 
> Sử dụng cơ chế dựa trên tin nhắn, không đồng bộ hoặc cơ chế đồng bộ như HTTP hoặc Thrift.

>  **Khám phá dịch vụ**
>  
>  API Gateway cần biết vị trí (địa chỉ IP và cổng) của từng microservice mà nó giao tiếp. 
 
> **Xử lý các lỗi một phần**
> 
> API Gateway có thể trả về dữ liệu được lưu trong bộ nhớ cache nếu có sẵn, giúp ngặn chặn việc lỗi một phần.

## 7. Tóm Lược
Đối với hầu hết các ứng dụng dựa trên microservice, việc triển khai API Gateway, hoạt động như một điểm nhập duy nhất vào hệ thống. API Gateway chịu trách nhiệm định tuyến yêu cầu, thành phần và dịch giao thức. Nó cung cấp cho mỗi khách hàng của ứng dụng một API tùy chỉnh. API Gateway cũng có thể che giấu các lỗi trong dịch vụ phụ trợ bằng cách trả lại dữ liệu được lưu trong bộ nhớ cache hoặc mặc định.
<br/><br/>
<hr/>

**Một số chia sẻ mình tìm hiểu được mong rằng có thể giải đáp phần nào câu hỏi của bạn về mô hình Microservice.**

**Cảm ơn các bạn đã đọc bài viết <3**