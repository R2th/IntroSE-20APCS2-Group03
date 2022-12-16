## Monkey testing là gì?
Monkey testing là loại kiểm thử liên quan đến đầu vào ngẫu nhiên.
Trong loại kiểm thử này, người thử nghiệm (đôi khi cũng là nhà phát triển) được coi là 'Monkey'
Giả sử có một con khỉ sử dụng máy tính, nó sẽ ngẫu nhiên thực hiện bất kỳ nhiệm vụ nào trên hệ thống theo sự hiểu biết của mình, việc này cũng giống như người kiểm tra sẽ áp dụng các trường hợp kiểm tra ngẫu nhiên trên hệ thống đang kiểm tra để tìm lỗi mà không xác định trước bất kỳ trường hợp kiểm thử nào
Trong một số trường hợp,  monkey testing là dành riêng cho đơn vị kiểm tra hoặc kiểm tra GUI. 
![](https://images.viblo.asia/71fd8012-30cc-4aef-944e-e4d5511c0c40.jpg)

## Gorilla Testing là gì?
Gorilla Testing là một kỹ thuật kiểm thử phần mềm trong đó một mô-đun của chương trình được kiểm tra nhiều lần để đảm bảo rằng nó hoạt động chính xác và không có lỗi trong mô-đun đó.
Một mô-đun có thể được kiểm tra hơn một trăm lần, và theo cách tương tự. Vì vậy, Gorilla Testing còn được gọi là "Kiểm thử bực bội"/"Frustrating Testing".
![](https://images.viblo.asia/d46b2ee4-a9e4-4c6e-950e-9ad8f12d535b.jpg)

## Ưu điểm của Monkey testing 
1. Với các loại lỗi mới: Người kiểm thử có thể tiếp xúc hoàn toàn với việc thực hiện các thử nghiệm theo sự hiểu biết của mình ngoài các tình huống đã nêu trước đây, điều này có thể phát hiện ra  lỗi / lỗi mới còn tồn tại trong hệ thống.
2. Dễ thực hiện: Sắp xếp các kiểm tra ngẫu nhiên dựa trên dữ liệu ngẫu nhiên là một cách dễ dàng để kiểm tra hệ thống
3. Người ít kỹ năng hơn: Kiểm tra khỉ có thể được thực hiện mà không cần người kiểm tra có kỹ năng (nhưng không phải lúc nào cũng vậy)
4. Ít tốn kém hơn: Yêu cầu số tiền chi tiêu ít hơn đáng kể để thiết lập và thực hiện các trường hợp thử nghiệm

## Nhược điểm của Monkey testing
1. Không có lỗi nào có thể bị lặp lại: Vì người kiểm tra thực hiện các thử nghiệm ngẫu nhiên với dữ liệu ngẫu nhiên sao chép bất kỳ lỗi hoặc lỗi nào có thể không thực hiện được.
2. Độ chính xác ít hơn: Người kiểm tra không thể xác định kịch bản kiểm tra chính xác và thậm chí không thể đảm bảo tính chính xác của các trường hợp kiểm tra
3. Yêu cầu chuyên môn kỹ thuật rất tốt: Không phải lúc nào cũng phải thỏa hiệp với độ chính xác, vì vậy để làm cho các trường hợp kiểm thử chính xác hơn, người kiểm tra phải có kiến ​​thức kỹ thuật tốt về miền
4. Ít lỗi hơn và tốn thời gian hơn: Thử nghiệm này có thể kéo dài hơn vì không có thử nghiệm được xác định trước và có thể tìm thấy số lượng lỗi ít hơn có thể gây ra sơ hở trong hệ thống

## So sánh Monkey Testing Vs Gorilla Testing
![](https://images.viblo.asia/2a21fcfe-f22f-4831-b277-53d43a082e43.png)

| Monkey Testing  | Gorilla Testing | 
| -------- | -------- | -------- |
| Test 1 cách ngẫu nhiên     |  Testcase không được xác định trước nhưng cũng không là ngẫn nhiên     |
| Được thực hiện trên toàn bộ hệ thống    |  Chọn lọc một số testcase và thực hiện trên vài modul    |
| Thường dùng để kiểm tra hệ thống có bị crash hay không    |  Thường chỉ dùng để kiểm tra modul có hoạt động tốt hay không   |

## Phân loại Monkey Testing
Đối với Monkey Testing  ta có  cách phân loại như sau:
![](https://images.viblo.asia/6ccf54bf-190a-4f83-abf2-c45e9bae738b.png) 
- Dumb Monkey: Tester không có hiểu biết về hệ thống và chức năng của nó, cũng không có sự đảm bảo về tính hợp lệ của testcase.
- Smart Monkey: Tester có hiểu biết về hệ thống, hiểu rõ mục đích và chức năng của nó, đầu vào của testcase là hợp lệ.
- Brilliant Monkey: Tester thực hiện test theo hành vi của người dùng, một số bug đặc biệt có thể xảy ra. 

Monkey Testing cũng có thể được thực hiện cho Android. Monkey Testing có thể có hiệu quả với việc sử dụng các công cụ test. Thậm chí nó có thể được sử dụng để tìm thêm lỗi như các loại thử nghiệm khác. Nếu chúng ta sử dụng công cụ để Monkey Testing thì quá trình chung có thể xảy ra với nó sẽ như thế nào? Ta cần có một cái nhìn nhanh chóng;

1. Giống như bất kỳ công cụ kiểm tra nào khác, bước đầu tiên là đăng ký phần mềm của bạn với máy chủ chuyên dụng
2. Hãy chắc chắn rằng bạn đã chuẩn bị tốt với tất cả các tài liệu tham khảo cần thiết để xây dựng test suite.
3. Chạy test suite được xây dựng
4. Hãy nhớ rằng thử nghiệm sẽ tiếp tục cho đến khi hệ thống đến điểm sự cố mà tại đó hành động được ghi lại vào một file log
5. Cuối cùng, test report được chia sẻ với người liên quan và dữ liệu thử nghiệm có thể được lưu trữ và sử dụng để tham khảo trong tương lai
Quá trình Monkey Testing có thể được tự động ngay cả khi sử dụng các công cụ nhưng vì đây là một loại thử nghiệm mới được giới thiệu và chưa được thiết lập ở cấp độ phổ biến, các công cụ này có ít bản sắc hơn, không giống như các công cụ khác. Tình hình này có thể được thay đổi với kỷ nguyên sắp tới của Testing Process, sau đó chúng ta sẽ xem xét tác động sắp tới của Monkey Testing và ảnh hưởng đáng kể của nó đối với các tiêu chuẩn ngành. Đây là một hướng dẫn giới thiệu cho Monkey Testing để bao quát ý tưởng cơ bản về nó.

Nguồn tham khảo: https://www.guru99.com/monkey-testing.html http://istqbexamcertification.com/what-is-monkey-testing-advantages-and-disadvantages/