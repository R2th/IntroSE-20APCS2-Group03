Kiểm thử phần mềm là quá trình  xác nhận một ứng dụng phần mềm có hoạt động như mong đợi hay không. Mục đích là để tìm ra khuyết tật và cải thiện chất lượng sản phẩm. 

Có hai cách để kiểm tra phần mềm:
* Kiểm tra tích cực 
* Kiểm tra tiêu cực.

## 1. Kiểm thử tích cực 
### 1.1. Kiểm thử tích cực là gì?
Kiểm thử tích cực là một loại kiểm thử, được thử nghiệm trên ứng dụng phần mềm với bộ dữ liệu đầu vào là giá trị tích cực. Kiểm thử tích cực được thực hiện để kiểm tra xem ứng dụng phần mềm có thực hiện chính xác với những gì nó mong đợi hay không

Ví dụ : 1 textbox chỉ cho nhập số có giá trị bé hơn hoặc bằng 99999

Kiểm tra xem đầu vào có được ứng dụng chấp nhận không khi nhập: số với giá trị từ 0 đến 99999

### 1.2. Khi nào thì thực hiện kiểm thử tích cực?

* Kiểm thử tích cực được thực hiện khi ứng dụng đã sẵn sàng để kiểm thử. Một người kiểm thử có thể thực hiện tất cả các kịch bản khác được lên kế hoạch cho chức năng đó như kiểm thử tiêu cực, kiểm thử cơ sở dữ liệu, v.v chỉ sau khi kiểm thử tích cực được thông qua.
* Thực hiện kiểm thử tích cực bất cứ khi nào bản dựng sẵn sàng được gọi là smoke testing, kiểm thử xác minh bản dựng, kiểm thử độ chính xác và cổng chất lượng, v.v., dù tên là gì, nhưng thực hiện kiểm thử tích cực là bước đầu tiên của thực hiện kiểm thử.

### 1.3. Ưu điểm và tác dụng của kiểm thử tích cực

Kiểm thử tích cực là bước đầu tiên của kiểm thử để dễ dàng kiểm thử đến các cấp độ tiếp theo.

Kiểm thử này được sử dụng để kiểm thử đường dẫn tích cực của một ứng dụng. Nếu kểm thử này thất bại, điều đó có nghĩa là chức năng cơ bản của ứng dụng không hoạt động và cần thực hiện ngay hành động tương ứng để tiếp tục kiểm thử thêm.

 Kiểm thử tích cực sẽ có phạm vi bao phủ ít hơn và nó xác nhận rằng ứng dụng đang hoạt động cho phạm vi đầu vào được chỉ định như mong đợi và nó không đảm bảo chất lượng của ứng dụng vì người kiểm thử không thể xác minh hành vi của ứng dụng trong các tình huống bất ngờ như 'khi người dùng vào dữ liệu sai'.

## 2. Kiểm thử tiêu cực
### 2.1 Kiểm thử tiêu cực là gì?
Kiểm thử tiêu cực là một loại kiểm thử, được thử nghiệm trên ứng dụng phần mềm với bộ dữ liệu đầu vào là các giá trị không hợp lệ hoặc không đúng. Kiểm thử tích cực được thực hiện để đảm bảo ứng dụng phần mềm không bị crash and duy tri ftrangj thái ổn định với các giá trị không hợp lệ

Ví dụ: Cùng ô  textbox chỉ cho nhập số có giá trị bé hơn hoặc bằng 99999
Kiểm thử tiêu cực được thực hiện khi nhập các giá trị: chữ alphabe, nhập số lớn hơn 99999



### 2.2. Tại sao kiểm thử tiêu cực lại cần thiết ?
Như ta đã biêt, Độ tin cậy chức năng của 1 ứng dụng hoặc phần mềm chỉ có thể được định lượng với việc thiết kế hiệu quả đối với các tình huống tiêu cực. Kiểm thử tiêu cực không chỉ nhằm mục đích đưa ra bất kỳ lỗ hổng tiềm năng nào có thể gây ra tác động nghiêm trọng đến việc sử dụng sản phẩm mà còn có thể là công cụ xác định các điều kiện mà ứng dụng có thể gặp sự cố. Cuối cùng, nó đảm bảo rằng có đủ các xác nhận lỗi trong cả phần mềm khi nó gặp bất kỳ vấn đề nào.

Trong cả 2 loại kiểm thử, cần xem xét trên các yếu tố:
*  Dữ liệu đầu vào
*  Thao tác thực hiện kiểm thử
*  Đầu ra, kết quả mong muốn

Các kỹ thuật sử dụng để kiểm thử tích cực và kiểm thử tiêu cực
*  Phân tích giá trị biên
*  Phân vùng tương đương

## 3. Ví dụ
Với ô textbox trên ta có các trường hợp kiểm thử:
* Các trường hợp Kiểm thử tích cực : 

  - 500 (dựa vào kỹ thuật phân vùng tương đương)
  - 0, 99999 (dựa vào kỹ thuật phân tích giá trị biên)
* Các trường hợp Kiểm thử tiêu cực:
  - Nhập Ab (dựa vào kỹ thuật phân vùng tương đương)
  - Nhập -1, 10000 (dựa vào kỹ thuật phân tích giá trị biên)

### Kết luận
Việc kiểm thử giúp  đảm bảo chất lượng phần mềm không có lỗi trước khi phần mềm được khởi chạy. Để kiểm tra hiệu quả, hãy sử dụng cả hai - Kiểm tra Tích cực và Tiêu cực để chất lượng của phần mềm được nâng cao. Người dùng thực có thể nhập bất kỳ giá trị nào và những giá trị đó cần được kiểm tra trước khi phát hành.

### Tài liệu tham khảo
https://www.guru99.com/positive-and-negative-testing.html