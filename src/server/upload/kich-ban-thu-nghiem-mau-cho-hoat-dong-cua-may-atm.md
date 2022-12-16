*Hiện nay máy ATM được sử dụng rất phổ biến, từ thành thị, tới nông thôn. Các cơ quan, doanh nghiệp thay vì trả tiền lương, tiền công bằng tiền mặt, thì chuyển sang chi trả qua ngân hàng. Hoặc trả tiền, vay tiền cũng thực hiện nhanh gọn qua thẻ ATM.
Chúng ta dùng thẻ ATM thì khá nhiều rồi, tuy nhiên mỗi một máy ATM của mỗi ngân hàng thì có cấu trúc và logic hoạt động không hoàn toàn giống nhau. Bản thân tôi cũng không chắc mình hiểu hết, và đã sử dụng hết các chức năng của máy ATM.*

Đọc được bài viết chia sẻ về thử nghiệm máy ATM, kèm với những hiểu biết nhất định của bản thân mình, trong giới hạn bài viết này nêu ra mẫu testcase cơ bản để thử nghiệm hoạt động của 1 máy ATM. Nó không hoàn hảo, nhưng mong rằng cũng tích lũy chút kiến thức cơ bản cho những ai còn mơ hồ về thử nghiệm hoạt động của máy ATM

Khi thử nghiệm hoạt động của máy ATM, bắt buộc thử nghiệm ở tất cả mức độ.  Điều này có nghĩa là:
- Ở cấp độ đầu phải thực hiện Kiểm thử đơn vị để kiểm tra các thành phần độc lập, đảm bảo chúng hoạt động chính xác
- Tiếp theo là kiểm thử tích hợp các thành phần, đảm bảo khi tích hợp các thành phần, chúng hoạt động chính xác, không xảy ra lỗi hay bất thường gì
- Sau đó thử nghiệm hệ thống và hiệu năng, đảm bảo toàn bộ hệ thống hoạt động trơn tru, hiệu suất sử dụng cao

Việc chúng ta thường xuyên sử dụng máy ATM, nhưng thường thì chỉ sử dụng các chức năng đơn giản như: rút tiền, chuyển tiền, kiểm tra số dư,… Nhưng thực thế, một máy ATM còn rất nhiều tính năng khác mà chúng ta ít sử dụng như: Thanh toán dịch vụ, đăng ký dịch vụ....

![](https://images.viblo.asia/ced274d7-f8b0-4286-9c53-27eb8656d8fb.jpg)

Vậy khi gặp một câu hỏi đặt ra rằng: Hãy viết các trường hợp thử nghiệm cho máy ATM thì chúng ta có hình dung ra ngay lập tức hay không?

Với những câu hỏi như vậy về bản chất, người hỏi đặt ra để đánh giá bạn suy nghĩ như thế nào, cách bạn sẽ cố gắng để bao quát các chức năng chính, trí tưởng tượng của bạn như thế nào và cách tiếp cận vấn đề của bạn đến đâu.

Dưới đây là các trường hợp thử nghiệm tổng quát các khía cạnh chính của máy ATM.

### A. Các trường hợp kiểm tra ATM

Các trường hợp thử nghiệm khác nhau dành cho cho ATM.

1. Xác minh xem đầu đọc thẻ có hoạt động chính xác không. 

    Sau khi lắp thẻ ATM hợp lệ:
    Một màn hình sẽ yêu cầu bạn nhập mã pin => Chứng tỏ đầu đọc thẻ hoạt động tốt

2. Xác minh nếu máy rút tiền hoạt động như mong đợi.

    Hiểu đơn giản như là: Với điều kiện hợp lệ, trong máy ATM còn tiền, không bị mất điện thì, thẻ ATM còn đủ số dư cần thiết thì sẽ Rút tiền thành công, vấn tin số dư thành công, chuyển tiền thành công…

3. Xác minh xem máy in hóa đơn có hoạt động chính xác không. 

    Điều đó có nghĩa là nó có thể in dữ liệu trên giấy và giấy ra đúng cách.

    Cụ thể như một số trường hợp sau:

      VD1: Giao dịch, chọn có in hóa đơn
      
      - Sau khi giao dịch thành công, hóa đơn được trả ra và in đúng thông tin của giao dịch
      
      VD2: Giao dịch, chọn không in hóa đơn

      - Sau khi rút tiền thành công, hóa đơn KHÔNG được trả ra và sẽ không thông báo gì về hóa đơn

    Ngoài ra, còn các giao dịch khác cũng sẽ có tính năng in hóa đơn kèm theo, ví dụ như chuyển tiền, thanh toán dịch vụ….

4. Xác minh xem các nút Màn hình có hoạt động chính xác không. Đối với màn hình cảm ứng: Xác minh xem nó có hoạt động và hoạt động theo mong đợi hay không.

    Những nút trên màn hình được hiển thị tùy thuộc vào từng ngân hàng, thông thường sẽ có các nút như sau:
    - Rút tiền
    - In sao kê
    - Đổi mật khẩu
    - Thanh toán dịch vụ
    - Đăng ký dịch vụ
    - Chuyển khoản
    - Giao dịch khác….

5. Xác minh hiển thị văn bản trên các nút màn hình cần rõ ràng, chính xác.

6. Xác minh phông chữ của văn bản trên các nút trên màn hình.

7. Xác minh số nút số trên Bàn phím.

8. Xác minh thứ tự các nút số trên Bàn phím.

9. Xác minh màu văn bản của các nút bàn phím. Các số phải được hiển thị rõ ràng.

![](https://images.viblo.asia/189b1df7-f59c-4467-9501-7a59cbca256e.jpg)

10. Xác minh chức năng của nút Xóa/?Clear trên Bàn phím.

    Nhấn nút Xóa, sẽ xóa lần lượt những thông tin đang nhập trên màn hình

11. Xác minh chức năng của nút Hủy/Cancel trên Bàn phím.

    Nhấn Hủy/Cancel bằng với việc Hủy thao tác đang muốn thực hiện. Tùy thuộc vào trạng thái hiện tại mà sẽ có xử lý phù hợp

12. Xác minh chức năng của nút Enter trên Bàn phím.

    Nhấn Enter bằng với việc chấp nhận thực hiện xử lý. Tùy thuộc vào trạng thái hiện tại của thẻ, các tùy chọn mà cần có xử lý chính xác

13. Xác minh chức năng của các nút số trên Bàn phím.

    Nhập số trên bàn phím, hiển thị chính xác số trên màn hình

14. Xác minh màu văn bản và phông chữ của dữ liệu được hiển thị trên màn hình. 

    Màu sắc chính xác, dữ liệu hiển thị chính xác, người dùng có thể đọc rõ ràng.

15. Xác minh tùy chọn lựa chọn ngôn ngữ. 

    Thông báo và dữ liệu được hiển thị chính xác bằng ngôn ngữ đã chọn.

16. Xác minh thời gian hệ thống đăng xuất.

17. Xác minh chức năng hết thời gian cho phiên hoạt động.

18. Xác minh chức năng vị trí tiền gửi theo khả năng của nó (Tiền mặt hoặc séc hoặc cả hai) bằng cách chèn séc hợp lệ.

19. Xác minh bằng các thẻ khác nhau (Thẻ của các ngân hàng khác nhau).

    - Xác nhận viện chấp nhận thẻ của ngân hàng khác (với những thẻ của ngân hàng có liên kết với hệ thống ATM đang thử nghiệm)
    - Xác nhận việc không chấp nhận thẻ của ngân hàng khác (với những thẻ của ngân hàng không có liên kết với hệ thống ATM đang thử nghiệm), đảm bảo rằng có thông báo, và  thẻ không bị nuốt….

### B. Kiểm tra các thông báo

1. Thông báo mã PIN không chính xác

    Chèn vào thẻ ATM hợp vệ và nhập mã PIN không chính xác để xác minh thông báo.

2. Thông báo thẻ không đủ tiền mặt

    Thực hiện giao dịch có liên quan đến sử dụng tiền mặt, tuy nhiên thẻ ATM đã hết tiền, hoặc không đủ số tiền để thưc hiện để xác minh có thông báo xuất hiện

3. Thông báo sau khi giao dịch.

    Mỗi giao dịch thành công hay thât bại, đều cần xác minh thông báo sau khi thực hiện

4. Thông báo lắp thẻ không chính xác

    Thực hiện chèn thẻ ATM vào không đúng cách sẽ phải nhận được thông báo chính xác

### C. Rút tiền mặt

1. Xác minh chức năng rút tiền mặt 

    Thực hiện nhập một số tiền hợp lệ. Xác minh chức năng rút tiền mặt thực hiện chính xác

2. Xác minh việc rút tiền 1 lần duy nhất

    Với yêu cầu này, không phải tất cả máy ATM đều đòi hỏi. Chỉ một số ngân hàng có yêu cầu này. Chức năng yêu cầu mỗi giao dịch rút tiền mặt thực hiện xong phải nhập lại mã PIN

3. Xác minh các kết hợp hoạt động khác nhau và kiểm tra xem có bị mất điện ở giữa hoạt động không.

4. Trường hợp hết giấy in hóa đơn

    Trường hợp hết giấy để in hóa đơn: Sau khi giao dịch thành công, hóa đơn không được in ra, cần có thông báo về việc hết giấy

### D. Trường hợp thử nghiệm bác bỏ

1. Xác minh chức năng nhập  số PIN

    - Nhập sai mã PIN 1 lần => Phải có thông báo việc sai mã PIN
    - Nhập sai mã PIN 2 lần => Phải có thông báo việc sai mã PIN
    - Nhập sai mã PIN 3 lần => Thông thường với trường hợp này phải có thông báo Khóa thẻ

2. Xác minh chức năng đọc thẻ 

    - Đặt vào 1 thẻ hết  hạn
    - Đặt vào 1 thẻ VISA thay vì thẻ ATM
    - Đặt vào 1 thẻ từ bất kỳ, không phải là thẻ ATM (ví dụ thẻ từ xe máy, các loại thẻ thành viên….)
    - Đặt vào 1 thẻ của ngân hàng khác có liên kết

3. Xác minh chức năng vị trí tiền gửi bằng cách chèn một kiểm tra không hợp lệ.

4. Xác minh chức năng rút tiền mặt bằng cách chèn các số không hợp lệ như 10, 20, 50, v.v.

5. Xác minh chức năng rút tiền mặt bằng cách nhập số tiền lớn hơn giới hạn mỗi ngày,

6. Xác minh chức năng rút tiền mặt bằng cách nhập số tiền lớn hơn giới hạn một lần giao dịch.

7. Xác minh chức năng rút tiền mặt bằng cách nhập số tiền lớn hơn số dư khả dụng trong tài khoản.

***Tóm tắt:***

*Máy ATM phải được kiểm tra độ chính xác, độ tin cậy và hiệu suất. Nó sẽ được kiểm tra kỹ lưỡng về thời gian phản hồi trên mỗi giao dịch vì nó hoạt động trong 24  7.
Về hoạt động chung là như thế. Tuy nhiên về chức năng sẽ tùy thuộc vào từng ngân hàng sẽ khác nhau*

Tài liệu tham khảo

https://www.softwaretestinghelp.com/test-cases-for-atm/#Test_Cases_for_ATM