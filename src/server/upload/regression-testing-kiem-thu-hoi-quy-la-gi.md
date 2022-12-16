# 1. Kiểm thử hồi quy là gì?
KIỂM THỬ HỒI QUY được định nghĩa là một loại thử nghiệm phần mềm để xác nhận rằng một khi có một sự thay đổi về code hoặc phần nào đó của phần mềm thì cũng không ảnh hưởng xấu đến các tính năng hiện có.

KIỂM THỬ HỒI QUY là lựa chọn toàn bộ hoặc một phần các trường hợp kiểm thử đã được thực hiện và tái thực hiện lại những trường hợp kiểm thử đó nhằm đảm bảo các chức năng hiện có hoạt động tốt.

Phương pháp kiểm thử này được thực hiện để đảm bảo rằng các thay đổi code mới sẽ không có gây ra bất kỳ ảnh hưởng nào tới các chức năng hiện có. Đồng thời đảm bảo rằng toàn bộ code cũ vẫn hoạt động bình thường sau khi những thay đổi của code mới nhất được đưa vào phần mềm.

**Những trường hợp cần phải được kiểm thử hồi quy:**
- Thay đổi trong yêu cầu và mã code được sửa đổi theo yêu cầu
- Tính năng mới được thêm vào phần mềm
- Sửa lỗi (Fixed bug)
- Khắc phục sự cố về hiệu suất

# 2. Làm thế nào để thực hiện kiểm thử hồi quy?
Bảo trì phần mềm là một hoạt động bao gồm cải tiến, sửa lỗi, tối ưu hóa và xóa các tính năng hiện có. Những sửa đổi này có thể khiến hệ thống hoạt động không chính xác. Do đó, Kiểm tra hồi quy trở nên cần thiết. Kiểm tra hồi quy có thể được thực hiện bằng các kỹ thuật sau:
![](https://images.viblo.asia/e0b1907a-d81a-4ba7-8ee2-fdb540ca7e61.png)

## a. Thực hiện test lại tất cả các trường hợp kiểm thử
Đây là một trong những phương pháp để Kiểm tra hồi quy trong đó tất cả các trường hợp kiểm thử đã được thực hiện sẽ được thực hiện lại. Điều này rất tốn kém vì nó đòi hỏi thời gian và nguồn lực rất lớn.

## b. Lựa chọn kiểm tra hồi quy
Thay vì thực hiện lại toàn bộ các trường hợp kiểm thử, tốt hơn là chỉ thực hiện một phần mà thôi.
Các trường hợp kiểm thử được chọn có thể được phân thành 2 loại:
1) Các trường hợp kiểm thử có thể tái sử dụng: 
Là các trường hợp kiểm thử có thể được sử dụng trong các vòng đời kiểm thử hồi quy thành công.
3) Các trường hợp thử nghiệm lỗi thời:
Là các trường hợp không thể sử dụng trong các vòng đời kiểm thử hồi quy thành công.

## c. Ưu tiên các trường hợp kiểm thử 

Ưu tiên các trường hợp kiểm thử dựa trên ảnh hưởng tới luồng hoạt động của phần mềm, các chức năng quan trọng và được sử dụng thường xuyên. Lựa chọn các trường hợp thử nghiệm dựa trên mức độ ưu tiên sẽ giảm đáng kể thời gian và công sức để kiểm thử hồi quy.

# 3. Công cụ kiểm tra hồi quy
Nếu code hoặc phần nào đó của phần mềm luôn có những thay đổi thường xuyên thì chi phí kiểm thử hồi quy sẽ gia tăng.
Trong các trường hợp như vậy, việc thực hiện thủ công các trường hợp kiểm thử làm tăng thời gian thực hiện kiểm thử cũng như chi phí.
Tự động hóa các trường hợp kiểm tra hồi quy là sự lựa chọn thông minh trong các trường hợp như vậy.

Sau đây là các công cụ quan trọng nhất được sử dụng cho cả kiểm thử chức năng và hồi quy trong công nghệ phần mềm.

**Ranorex Studio:** 
    Tự động kiểm tra hồi quy tất cả trong một cho máy tính để bàn, web và ứng dụng di động với Selenium WebDriver tích hợp. Bao gồm một IDE đầy đủ cộng với các công cụ để tự động mã hóa.

**Selenium:** 
    Đây là một công cụ nguồn mở được sử dụng để tự động hóa các ứng dụng web. Selenium có thể được sử dụng để kiểm tra hồi quy trên trình duyệt.

**Quick Test Professional (QTP):** 
    HP Quick Test Professional là phần mềm tự động được thiết kế để tự động hóa các trường hợp kiểm tra chức năng và hồi quy. QTP sử dụng ngôn ngữ VBScript để tự động hóa và là một công cụ dựa trên dữ liệu, dựa trên từ khóa.

**Trình kiểm tra chức năng hợp lý (RFT):** 
    Trình kiểm tra chức năng hợp lý của IBM là một công cụ Java được sử dụng để tự động hóa các trường hợp kiểm thử của các ứng dụng phần mềm. RFT chủ yếu được sử dụng để tự động hóa các trường hợp kiểm thử hồi quy và nó cũng tích hợp với Rational Test Manager.

# 4. Sự khác biệt giữa Kiểm thử lại (Re-testing) và Kiểm thử hồi quy (Regression testing):
Kiểm thử lại có nghĩa là kiểm tra lại các chức năng hoặc các lỗi để đảm bảo mã code đã hoàn chỉnh. Nếu vẫn còn bugs thì tiến hành log bug để sửa lỗi cho đến khi phần mềm hoàn chỉnh.
Kiểm tra hồi quy có nghĩa là kiểm tra ứng dụng phần mềm khi trải qua thay đổi về mã code để đảm bảo rằng code mới không ảnh hưởng đến các phần khác của phần mềm.

Tham khảo từ nguồn: https://www.guru99.com/regression-testing.html