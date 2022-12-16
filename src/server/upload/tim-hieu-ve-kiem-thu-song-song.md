# 1. Khái niệm kiểm thử song song
Kiểm thử song song là kiểm thử nhiều ứng dụng hoặc những thành phần phụ của một ứng dụng cùng lúc nhằm giảm thiểu thời gian kiểm thử.
Khi bất kỳ tổ chức nào chuyển từ hệ thống cũ sang hệ thống mới thì việc giữ và chuyển dữ liệu cũ là một phần quan trọng và phức tạp. Kỹ thuật này thường được dùng để đảm bảo tính nhất quán của ứng dụng.
Kiểm thử song song được thực hiện khi có một ứng dụng mới hoặc ứng dụng thay thế (do nâng cấp hoặc thay đổi công nghệ) được đưa vào sử dụng mà có chức năng giống như ứng dụng cũ. Kiểm thử này được thực thi để đảm bảo phiên bản mới nhất của ứng dụng được cài đặt và vận hành tốt, không sai xót gì. Đây là điều rất quan trọng bởi, có thể tuy ứng dụng mới có chức năng giống phiên bản cũ, nhưng rất có thể, nó không hoạt động như mong muốn, làm chậm hiệu năng của phần mềm hay sản phẩm.
![](https://images.viblo.asia/df646392-5210-4cb2-9493-82239bd40984.PNG)
# 2. Khi nào cần kiểm thử song song
* Công ty chuyển từ hệ thống cũ sang hệ thống mới
* Đồng bộ dữ liệu được thực hiện trên hai hệ thống
* Xác nhập dữ liệu từ một hệ thống sang hệ thống khác
* Tất cả các kết quả đầu ra cần được xác định là chính xác. 

*Ví dụ: trong lĩnh vực tài chính, lĩnh vực bảo hiểm thì việc tính toán là một chức năng quan trọng của hệ thống, nên cần đảm bảo đầu ra phải chính xác*
# 3. Tại sao cần kiểm thử song song
Để đảm bảo sự nhất quán giữa phiên bản mới và cũ (Hầu hết chức năng của phiên bản cũ sẽ được giữ lại trong phiên bản mới. Vì thế cần có sự nhất quán)
Để kiểm tra xem các định dạng dữ liệu giữa hai phiên bản có thay đổi gì không
Để kiểm tra tính toàn vẹn của ứng dụng mới
Để đảm bảo các phiên bản mới của ứng dụng thực hiện một cách chính xác.

*Ví dụ:
 Một ví dụ đơn giản về một phần mềm, khi bạn mới cài đặt phiên bản của nó là 2.0 tuy nhiên 3 tháng sau, nhà phát triển đã tung ra bản cập nhật 2.1, 3 tháng sau nữa ta lại thấy có phiên bản mới 2.2 Về cơ bản thì phần mềm không có gì thay đổi về chức năng cả.*

=> Trong trường hợp này, người kiểm thử cần thực hiện việc kiểm thử song song, để đánh giá rằng dữ liệu được chuyển thành công. Ngoài ra để kiểm tra xem những thay đổi trong phiên bản mới không ảnh hưởng đến chức năng hệ thống. Kỹ sư kiểm thử phải kiểm tra các trường hợp để đảm bảo rằng những thay đổi được thực hiện đúng cách, và người sử dụng là nhận được kết quả mong muốn theo yêu cầu.

# 4. Chiến lược kiểm thử song song

## 4.1 Tiêu chí của kiểm thử song song
* Tiêu chí “Bắt đầu”:

     Tiêu chí “bắt đầu” định nghĩa các nhiệm vụ mà các nhiệm vụ đó phải được thỏa mãn trước khi thực hiện kiểm thử song song.
* Tiêu chí “Kết thúc”:

     Tiêu chí “Kết thúc” định nghĩa các kết luận khi test song song kết thúc
## 4.2. Điều kiện tiên quyết trước khi thực hiện kiểm thử song song
* Test song song không thể bắt đầu khi môi trường chưa cài đặt xong
* Tất cả các pre-condition và các scenario cần được xác định đầu tiên
* Dữ liệu cũ và dữ liệu mới phải được chuyển đổi thành công

Kiểu kiểm thử song song được coi là hoàn thành cho đến khi tất cả các tiêu chí “kết thúc” được thỏa mãn.
# 5. Các bước thực hiện kiểm thử song song
Bước 1 : Khởi động hệ thống cũ chống lại hệ thống mới được phát triển

Bước 2 : Hiểu sự khác nhau giữa hai hệ thống

Bước 3 : Thực hiện các testcase trên 2 hệ thống sử dụng cùng một đầu vào

Bước 4 : Đo lường đầu ra của hệ thống mới được phát triển so với hệ thống cũ

Bước 5 : Báo cáo nguyên nhân gây ra lỗi nếu tìm thấy

# 6. Một số mẹo và thủ thuật thường dùng trong kiểm thử song song
### 6.1. Một số lỗi điển hình
- Logic nội bộ thay đổi
- Dòng sản phẩm thay đổi
- Chức năng chính có sự thay đổi
### 6.2. Số chu kỳ nên được thực hiện
Số chu kỳ của kiểm thử phần mềm phụ thuộc vào độ phức tạp của mô-đun. Chạy nhiều chu kỳ kịch bản bằng cách sử dụng dữ liệu thử nghiệm xác định trước đó, đã chuyển từ hệ thống trước đó.
### 6.3. Loại lỗi xảy ra trong các chu kỳ
Để kiểm tra lỗi, cần lưu ý những điều sau khi thực hiện kiểm tra song song.
* Lỗi đầu vào
* Lỗi do hệ thống cũ
* Những giải thích hoặc chấp nhận khác
* Lỗi không giống mong đợi
# 7. Phân biệt kiểm thử song song với loại kiểm thử khác 
### Kiểm thử song song :

* Là sự kiểm tra ứng dụng được cập nhật và ứng trước trước đó.
* Chạy kịch bản cũ với phần mềm mới với điều kiện “entry” dành riêng.
* Mục đích là để tìm ra kết quả của theo hệ thống trước đó.
* Người kiểm thử cần có kiến thức về cả phần mềm cũ lẫn bản cập nhật mới.
 
### Kiểu kiểm thử không phải là kiểm thử song song.

* Chỉ thử nghiệm một phần mềm riêng biệt
* Mục đích là để tìm hiểu các vấn đề thiết kế.
* Người kiểm thử không nhất thiết phải biết đến các phiên bản trước có sự khác nhau như thế nào với phiên bản mới.

# 8. Một số khó khăn khi thực hiện kiểm thử song song
* Bắt buộc phải có hiểu về sản phẩm
* Mọi kết quả nên được kiểm tra
* Cần để ý đến đầu vào dữ liệu và dòng sản phẩm
# KẾT LUẬN
Kiểm thử song song là một trong những kỹ thuật kiểm thử phổ biến trong lĩnh vực kiểm thử phần mềm. Như đã trình bày ở trên phần mềm, ứng dụng luôn được cập nhật liên tục để vá những lỗ hổng hay nâng cấp ứng dụng. Trên đây là toàn bộ những điều cần biết về kiểm thử song song. Rất hi vọng nó có thể giúp ích cho bạn.

*Nguồn tham khảo:https://www.guru99.com/parallel-testing.html*