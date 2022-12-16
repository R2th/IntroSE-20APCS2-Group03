*Bài viết sau được dịch từ link: https://stackify.com/ultimate-guide-performance-testing-and-software-testing/*

*Đây là bài dịch tiếp nối từ bài [Kiểm thử hiệu năng và các bước thực hiện](https://viblo.asia/p/kiem-thu-hieu-nang-va-cac-buoc-thuc-hien-bJzKmg2Pl9N)*

Có thể nói bí quyết quan trọng nhất để kiểm thử hiệu năng thành công đó là kiểm thử sớm và kiểm thử liên tục. Một kiểm thử đơn lẻ sẽ không thể chỉ ra cho đội ngũ phát triển tất cả những gì họ cần phải biết. Quá trình kiểm thử hiệu năng thành công là một tập các kiểm thử nhỏ lẻ được lặp đi lặp lại nhiều lần.

* Kiểm thử hiệu năng sớm nhất có thể trong quá trình phát triển. Đừng chờ đợi và kiểm thử vội vàng khi hiệu năng có vấn đề
* Kiểm thử hiệu năng không chỉ dành cho toàn bộ hệ thống khi kết thúc dự án mà nó còn có giá trị với cả những chức năng hoặc module đơn lẻ
* Thực hiện kiểm thử hiệu năng để đảm bảo tính nhất quán và xác định số liệu trung bình.
* Ứng dụng thường bao gồm nhiều hệ thống như hệ thống lưu trữ dữ liệu, server và các dịch vụ khác. Hãy đảm bảo thực hiện kiểm thử từng phần đơn lẻ cũng như kiểm thử việc tích hợp chúng với nhau.

![](https://stackify.com/wp-content/uploads/2017/04/Testing-Life-Cycle.jpg)

Ngoài việc lặp lại việc thực hiện kiểm thử, kiểm thử hiệu năng còn có thể thành công hơn nữa bằng việc thực hiện các bài thực hành sau đây:

* Có sự tham gia của cả dev, Infra và tester trong việc xây dựng môi trường kiểm thử
* Ghi nhớ rằng người dùng thực sẽ sử dụng hệ thống và bị ảnh hưởng trực tiếp bởi hiệu năng. Hãy xác định ảnh hưởng của hiệu năng lên người dùng chứ đừng chỉ kiểm thử trên môi trường server
* Đi xa hơn các thông số. Phát triển mô hình kiểm thử bằng cách thiết kế môi trường thử nghiệm có tính đến số lượng nhiều người dùng nhất có thể.
* Dựa vào các phép đo lường để xác định các điểm bắt đầu cho các kiểm thử thành công và thất bại
* Kiểm thử hiệu năng sẽ cho kết quả tốt nhất khi thực hiện trên môi trường kiểm thử giống với môi trường thực tiễn nhất có thể
* Tách biệt môi trường kiểm thử hiệu năng từ môi trường dùng để kiểm thử chất lượng
* Không có công cụ kiểm thử hiệu năng nào có thể làm được mọi điều. Việc hạn chế tài nguyên có thể dẫn đến hạn chế các trường hợp kiểm thử. Vì vậy, hãy tìm kiếm những công cụ kiểm thử hiệu năng phù hợp nhất với dự án trước khi thực hiện kiểm thử
* Bảo toàn sự thống nhất của môi trường kiểm thử nhất có thể
* Các phép tính trung bình có thể đưa ra những con số giới hạn hành động của user. Nó có giá trị trong việc kiểm tra các ngoại lệ. Những phép đo cực đoan thì có thể tiết lộ điểm mà những thất bại có thể xảy ra
* Khi chuẩn bị các tài liệu báo cáo những thông tin về kiểm thử hiệu năng, hãy cân nhắc đến đối tượng sẽ tiếp nhận những thông tin đó, và đừng quên rằng cần phải đưa cả những thay đổi của hệ thống phần cứng cũng như phần mềm vào trong báo cáo

## 5 lỗi chung cơ bản trong kiểm thử hiệu năng
Dưới đây là một số lỗi cơ bản khiến cho việc kiểm thử hiệu năng mất đi tính thực tiễn và hiệu quả
* Không đủ thời gian kiểm thử
* Không có sự tham gia của dev
* Không sử dụng môi trường kiểm thử giống với môi trường thực tiễn
* Không điều chỉnh hệ thống
* Không có kế hoạch giải quyết vấn đề xảy ra trong quá trình kiểm thử


## Những nhận định sai lầm khi kiểm thử hiệu năng

Những sai lầm trong kiểm thử hiệu năng có thể dẫn đến lỗi hoặc thất bại trong việc thực hiện các bài thực hành kiểm thử. Như Sofia Palamarchuk đã nhận định thì những sai lầm này có thể dẫn đến việc lãng phí tài nguyên và tiền bạc rất lớn trong quá trình phát triển phần mềm.

### Sai lầm số 1: Kiểm thử hiệu năng là bước cuối cùng trong quá trình phát triển
Như đã nhắc đến trong phần các bài thực hành kiểm thử hiệu năng, biết trước và giải quyết các vấn đề hiệu năng cần phải ở giai đoạn đầu của quá trình phát triển phần mềm. Việc triển khai phương pháp giải quyết sớm sẽ tốn ít chi phí hơn là tập trung sửa lỗi ở giai đoạn cuối.

### Sai lầm số 2: Nhiều phần cứng hơn có thể giải quyết vấn đề hiệu năng
Thêm vào processor, server hoặc thêm bộ nhớ chỉ đơn giản tăng thêm chi phí chứ không thực sự giải quyết được vấn đề. Nhiều phần mềm có thể chạy tốt hơn và tránh được các vấn đề tiềm ẩn có thể xảy ra khi phần cứng tăng lên hoặc được nâng cấp hoặc không như vậy.

### Sai lầm số 3: Môi trường kiểm thử đã đáp ứng đúng mong đợi
Thực hiện kiểm thử hiệu năng trên môi trường giống với môi trường thực tế nhất chính là lý do để thực hiện các bài thực hành kiểm thử hiệu năng tốt nhất. Sự khác biệt giữa các yếu tố có thể ảnh hưởng đến hiệu năng của hệ thống. Có thể rất khó để thực hiện kiểm thử hiệu năng trên môi trường y hệt như môi trường thực tiễn nhưng hãy cố gắng để kết hợp những yếu tố sau:
* Phần cứng
* Hệ điều hành và các cài đặt liên quan
* Các ứng dụng được sử dụng trên hệ thống
* Cơ sở dữ liệu

![](https://stackify.com/wp-content/uploads/2017/04/stockfresh_7449840_software-development-cycle-infographic_sizeXS.jpg)

### Sai lầm số 4: Cái gì đang chạy đúng thì sẽ chạy đúng trong mọi trường hợp
Hãy cẩn thận với những kết luận suy diễn. Đừng làm một tập các kiểm thử hiệu năng đơn lẻ, đưa ra kết quả và giả định rằng mọi thứ sẽ xảy ra tương tự khi một yếu tố thay đổi. Ngay cả khi chúng hoạt động ở 2 phía đối lập. Đừng suy đoán hiệu năng tối thiểu và yêu cầu dựa trên kiểm thử tải trọng. Mọi giả định phải được xác nhận trong quá trình kiểm thử hiệu năng

### Sai lầm số 5: Chỉ cần một kịch bản kiểm thử hiệu năng là đủ
Không thể nào mọi vấn đề về hiệu năng lại có thể được phát hiện ra chỉ bằng một kịch bản kiểm thử. Tuy nhiên tài nguyên có thể bị giới hạn chỉ có thể thực hiện một số kịch bản kiểm thử nhất định có thể xảy ra. Ở phần giữa sẽ là 1 chuỗi các kiểm thử hiệu năng. Các kiểm thử này nhắm vào những tình huống mạo hiểm nhất và có ảnh hưởng lớn nhất đến performance. Mặc dù có những kế hoạch chi tiết và những thiết kế tốt nhất thì vấn đề vẫn có thể xảy ra. Việc theo dõi môi trường thực tế có thể phát hiện ra các vấn đề về hiệu năng.


### Sai lầm số 6: Kiểm thử từng phần bằng với kiểm thử toàn bộ hệ thống
Ngay cả khi việc kiểm thử hiệu năng đơn lẻ cho từng chức năng là đặc biệt quan trọng thì kết quả của việc kiểm thử đơn lẻ từng component cũng không thể đánh giá được cho toàn hệ thống. Tuy nhiên có thể sẽ không khả thi để kiểm thử hiệu năng của tất cả các chức năng trong hệ thống. Một thử nghiệm hiệu suất toàn phần có thể được thiết kế bằng cách sử dụng các nguồn lực sẵn có. Nhưng cần phải nhận biết những gì chưa được thử nghiệm.

### Sai lầm số 7: Cái gì hoạt động cho họ thì sẽ hoạt động cho chúng ta
Nếu như một tập người dùng gặp vấn đề hoặc có vấn đề trong hiệu năng sử dụng, đừng nhận định rằng đó là vấn đề của tất cả người dùng. Sử dụng kiểm thử hiệu năng là để chắc chắn rằng nền tảng và cấu hình hệ thống hoạt động đúng như mong đợi.

### Sai lầm số 7: Dev có nhiều kinh nghiệm rồi thì không cần đến kiểm thử hiệu năng
Sự thiếu sót kinh nghiệm không phải là lý do duy nhất đằng sau các vấn đề về hiệu năng. Sai lầm vẫn xảy ra kể cả là từ những dev đã xây dựng ra những phần mềm không có vấn đề trước đó. Có rất nhiều vấn đề có thể xảy ra đặc biệt là khi có nhiều người dùng cùng truy cập vào hệ thống

### Sai lầm số 8: Kiểm thử tải trọng có thể nói lên tất cả
Việc chỉ kiểm thử tải trọng và có thể phát hiện ra tất cả những vấn đề về hiệu năng thật sự rất cám dỗ. Ngoại trừ việc nó là loại thử nghiệm có xu hướng tiết lộ rất nhiều vấn đề về hiệu suất và điều đó khiến ta khó tập trung vào các giải pháp riêng lẻ. Bắt đầu với tải thấp hơn và tăng dần mức độ có thể có vẻ giống như một quá trình chậm không cần thiết, nhưng nó tạo ra kết quả dễ dàng hơn để khắc phục sự cố hiệu quả hơn.

### Sai lầm số 9: Kịch bản kiểm thử chính là người dùng thực
Đảm bảo rằng kiểm thử tự động sử dụng phần mềm giống như cách mà người dùng thực tế sẽ sử dụng. Đó là điều cực kỳ quan trọng khi các thông số kiểm thử hiệu năng thay đổi.