Trong bài viết này tôi sẽ hướng dẫn các bạn về kiểm thử song song. Những ưu và nhược điểm của kiểm thử này. 
### Kiểm thử song song là gì ?
Kiểm thử song song được định nghĩa như một kiểm kiểm thử phần mềm, cái mà kiểm tra nhiều ứng dụng hoặc nhiều thành phần con của một ứng dụng đồng thời để giảm thời gian kiểm thử.
Trong kiểm thử song song, các nhân viên kiểm thử chạy hai phiên bản khác nhau của phần mềm đồng thời với cùng đầu vào như nhau. Mục đích là để tìm ra liệu hệ thống cũ và hệ thống mới có gì giống nhau hoặc có gì khác nhau. Nó đảm bảo rằng hệ thống mới đủ khả năng để chạy phần mềm hiệu quả.
Hình dưới đây miêu tả kiểm thử song song

![](https://images.viblo.asia/d07821c7-b321-407b-ac5d-89961a4bd522.png)

### Ví dụ về Kiểm thử song song

Khi bất kỳ một tổ chức di chuyển từ hệ thống cũ sang hệ thống mới , dữ liệu cũ là một phần quan trọng. Chuyển đổi dữ liệu này là một quy trình phức tạp. 
Trong kiểm thử phần mềm, việc xác thực tương thích của hệ thống được phát triển mới với hệ thống cũ được làm thông qua "kiểm thử song song"

![](https://images.viblo.asia/9fce633b-21c6-4440-b539-b420bc3f8a34.png)

### Tại sao phải làm kiểm thử song song

Kiểm thử song song được làm là do một số lí do sau:
* Để đảm bảo rằng phiên bản mới của ứng dụng thực hiện một cách chính xác
* Đảo bảo rằng tính nhất quán giống nhau giữa phiên bản cũ và mới
* Để kiểm tra xem định dạng dữ liệu giữa hai phiên bản có thay đổi không
* Để kiểm tra tính toàn vẹn của ứng dụng mới

Ví dụ: người dùng hiện tại đang sử dụng phiên bản của ứng dụng là 1.0 từ tháng ba, người sử dụng sẽ sử dụng một phiên bản khác của ứng dụng giả sử chúng ta gọi là phiên bản 1.1

![](https://images.viblo.asia/5ae6bfc5-4e23-4148-b3c5-c0a7e40456c3.png)

Trong trường hợp như vậy, các nhân viên kiểm thử cần phải thực hiện kiểm thử song song để đánh giá việc di chuyển dữ liệu được thực hiện một cách thành công. Ngoài ra cần phải kiểm tra liệu các thay đổi trong phiên bản mới không ảnh hưởng tới chức năng của hệ thống. Các nhân viên kiểm thử phải xác minh được rằng các thay đổi phải được thực hiện đúng và người dùng sẽ nhận được đầu ra mong muốn theo yêu cầu.

### Khi nào thì thực hiện kiểm thử song song

Kiểm thử song song có thể được sử dụng rộng rãi khi
* Công ty chuyển từ hệ thống cũ sang hệ thống mới
* Khi việc đồng bộ hóa được thực hiện trên hai hệ thống
* Dữ liệu cũ được nhập vào từ hệ thống này sang hệ thống khác
* Tất cả các kết quả nên được định nghĩa chính xác hơn. Ví dụ lĩnh vực về tài chính hoặc bảo hiểm trong đó tính toán là một chức năng chính của hệ thống.

### Kiểm thử song song được làm như thế nào: cách tiếp cận hoàn chỉnh

Đối với việc thực hiện kiểm thử song song, bạn có để tạo một số dự án đơn giản mà sẽ kiểm thử một phần khác của ứng dụng ( Slave Projects ) và một dự án ( master project ) sẽ chạy với các dự án khác. 
Kiểm thử song song có hai tiêu chí cấp độ

**1. Tiêu chí đầu vào kiểm thử song song**
 Tiêu chí đầu vào kiểm thử song song định nghĩa các nhiệm vụ mà phải được thỏa mãn trước khi kiểm thử song song có thể được thực hiện một cách hiệu quả. 
 
 **2. Tiêu chí đầu ra kiểm thử song song**

 Tiêu chí đầu ra kiểm thử song song định nghĩa đầu ra của giai đoạn kiểm thử song song thành công
 Trước khi thực hiện kiểm thử song song, có một vài tiền điều kiện và phải được thỏa mãn:
*  Kiểm thử song song không thể bắt đầu tới khi việc thiết lập môi trường được hoàn thành
*  Tất cả các tiền điều kiện và kịch bản nên được định nghĩa trước
*  Dữ liệu cũ và dữ liệu mới phải được di chuyển thành công
*  Kiểm thử song song không được hoàn thành cho đến khi tất cả các tiêu chí đầu ra được thỏa mãn

Để thực hiện kiểm thử song song, các step dưới đây nên được làm theo


**Step 1**: Chạy hệ thống cũng so với hệ thống được phát triển mới

**Step 2**: Hiểu sự khác nhau giữa cả hai hệ thống

**Step 3**: Đi qua toàn bộ bằng cách sử dụng cùng một đầu vào

**Step 4**: Đo đầu ra của hệ thống được phát triển mới so với hệ thống cũ

**Step 5**: Báo cái nguyên nhân của bug nếu tìm thấy

### Một số thực hành tốt cho kiểm thử song song

Để thực hiện kiểm thử song song ở đâu có một vài các mẹo và thủ thuật có thể được sử dụng một cách hữu ích


**Các lỗi điển hình được xác định trong kiểm thử song song**


Logic bên trong được thay đổi
Lưu lượng sản phẩm được thay đổi
Các chức năng chính bị sửa đổi


**Có bao nhiêu vòng được yêu cầu**

Số lượng của vòng kiểm thử phụ thuộc vào độ phức tạp của module

Chạy nhiều vòng kịch bản sử dụng dữ liệu kiểm thử được định nghĩa trước, cái mà đã đạt được từ các hệ thống trước


**Phân loại sự khác biệt**

Khi chúng ta chạy một vòng của kiểm thử song song, các kết quả của cả hệ thống mới và cũ nên được đo đạc từng dòng với các sự khác nhau nên được làm nổi bật lên. Mọi sự khác khác nhau chúng ta đã chụp ảnh lại nên được định nghĩa theo các kiểu của lỗi.


**Kiểu của lỗi được xảy ra trong suốt các vòng**

Đối với các lỗi nhân viên kiểm thử nên ghi lại các thứ dưới đây trong khi thực hiện kiểm thử song song

* Lỗi đầu vào
* Lỗi do hệ thống cũ
* Có thể giải thích được hoặc có thể chấp nhận được sự khác nhau
* Các lỗi không mong đợi

### Cái gì không phải là một kiểm thử song song

| Kiểm thử song song | Không phải là kiểm thử song song | 
| -------- | -------- | 
|Kiểm thử các ứng dụng được cập nhật so với các ứng dụng trước    |Kiểm thử chỉ trên một phần mềm     | 
|Chạy các kịch bản cũ với phần mềm mới với các đầu vào riêng    |Kiểm tra chéo hoặc đa nền tảng    | 
|Mục đích là tìm ra kết quả theo hệ thống trước đó  |Mục đích là tìm ra vấn đề về thiết kế    | 
|Nên có kiến thức về hệ thống cũ và hệ thống mới phát triển    |Biết sự khác nhau là không được yêu cầu   | 

### Những thách thức của kiểm thử song song

* Hiểu biết về sản phẩm được yêu cầu
* Mọi kết quả nên được kiểm thử
* Cần tập trung vào dữ liệu đầu vào và dòng sản phẩm

Tóm lại:
* Trong kỹ thuật phần mềm, kiểm thử song song là kiểm thử nhiều ứng dụng hoặc các thành phần con của một ứng dụng đồng thời để làm giảm thời gian kiểm thử.
* Nó đảm bảo rằng hệ thống mới có khả năng đủ để chạy phần mềm hiệu quả.

Hy vọng qua bài viết trên đây tôi đã giúp các bạn phần nào hiểu thêm về kiểm thử song song. Những kiến thức về nó sẽ giúp ích trong công việc của các bạn. Chúc các bạn thành công. 

*Tài liệu tham khảo* : https://www.guru99.com/parallel-testing.html