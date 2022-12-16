# Waits, Verify phần tử present/visible trong Selenium IDE
Trong hướng dẫn này, chúng ta xem xét các lệnh sẽ làm cho automation scrip của bạn thông minh và đầy đủ hơn.

**Verify present của một phần tử**

Chúng ta có thể sử dụng hai lệnh sau đây để xác minh present của một phần tử:
* verifyElementPresent: trả về TRUE nếu phần tử được chỉ định là FOUND trong trang; FALSE nếu không tìm thấy.
* verifyElementNotPresent:t  trả về TRUE nếu phần tử được chỉ định NOT FOUND ở bất kỳ đâu trong trang; FALSE nếu nó có mặt.
Test script bên dưới xác minh rằng text box UserName là present trong trang chủ của Mercury Tours trong khi text box First Name thì không. 
Text box First Name thực sự là một phần tử có trong trang Đăng ký của Mercury Tours, chứ không phải trong trang chủ.

![](https://images.viblo.asia/502e3f69-0bce-458d-b4b6-74096e8e3822.png)

**Verify present của một văn bản nhất định**
* verifyTextPresent: trả về TRUE nếu chuỗi văn bản được chỉ định là FOUND ở đâu đó trong trang; FALSE nếu không tìm thấy.
* verifyTextNotPresent: trả về TRUE nếu chuỗi văn bản được chỉ định là NOT FOUND ở bất kỳ đâu trong trang; FALSE nếu nó được tìm thấy.
Hãy nhớ rằng các lệnh này phân biệt chữ hoa chữ thường.

![](https://images.viblo.asia/24e30d88-c5f1-4a79-ba16-638688891824.png)

Trong scenario trên, "Atlanta to Las Vegas" được xử lý khác với "atlanta to Las Vegas" vì chữ "A" của "Atlanta" được viết hoa trên chữ cái đầu tiên trong khi chữ kia là chữ thường. Khi lệnh verifyTextPresent được sử dụng trên mỗi phần tử trong số đó, một lệnh thì pass trong khi lệnh kia thì fail.

**Verify vị trí cụ thể của một phần tử**
Selenium IDE cho biết vị trí của một phần tử bằng cách đo (tính bằng pixel) khoảng cách từ cạnh trái hoặc trên của cửa sổ trình duyệt.
* verifyElementPositionLeft: xác minh xem số pixel đã chỉ định có khớp với khoảng cách của phần tử từ cạnh trái của trang hay không. Trả về FALSE nếu giá trị được chỉ định không khớp với khoảng cách từ cạnh trái.
* verifyElementPositionTop: xác minh xem số pixel đã chỉ định có khớp với khoảng cách của phần tử từ cạnh trên của trang hay không. Trả về FALSE nếu giá trị được chỉ định không khớp với khoảng cách từ cạnh trên cùng.

![](https://images.viblo.asia/7dc9edd3-845f-499c-bf99-c7c4a6977621.png)

# Lệnh Wait
**Lệnh andWait**
Đây là các lệnh sẽ đợi một trang mới tải trước khi chuyển sang lệnh tiếp theo.
Ví dụ là:
* clickAndWait
* typeAndWait
* chọnAndWait

![](https://images.viblo.asia/a95937e6-21a5-4a89-9c9b-6ab3d8043017.png)

**Lệnh waitFor**
Đây là các lệnh chờ một điều kiện xác định trở thành true trước khi tiếp tục lệnh tiếp theo (bất kể tải trang mới). Các lệnh này thích hợp hơn để được sử dụng trên các trang web động dựa trên AJAX, thay đổi các giá trị và các phần tử mà không cần tải lại toàn bộ trang. 
Những ví dụ bao gồm:
* waitForTitle
* waitForTextPresent
* waitForAlert
Hãy xem xét kịch bản Facebook bên dưới.

![](https://images.viblo.asia/a8743649-9d4a-4e3c-9533-a4d82fec2b77.png)

Chúng ta có thể sử dụng kết hợp "click" và "waitForTextPresent" để xác minh sự hiện diện của văn bản "Providing your birthday".

![](https://images.viblo.asia/323a96fa-c34c-406c-82c5-1ff34116d126.png)

Chúng ta không thể sử dụng clickAndWait vì không có trang nào được tải khi nhấp vào liên kết"Why do I need to provide my birthday?" . Nếu chúng ta làm, thử nghiệm sẽ fail.

![](https://images.viblo.asia/f206096d-6fb9-4f70-bedd-537491ebe25b.png)

# Tóm lược
Ba lệnh được sử dụng phổ biến nhất trong việc verify các phần tử trang là:
* verifyElementPresent / verifyElementNotPresent
* verifyTextPresent / verifyTextNotPresent
* verifyElementPositionLeft / verifyElementPositionTop
Lệnh wait được phân thành hai:
* Lệnh andWait: được sử dụng khi trang được dự kiến sẽ được tải
* Lệnh waitFor commands:  được sử dụng khi không có trang mới được dự kiến sẽ được tải

Nguồn tham khảo: https://www.guru99.com/enhancing-selenium-ide-script.html