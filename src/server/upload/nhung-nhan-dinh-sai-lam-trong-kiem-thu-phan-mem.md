Kiểm thử phần mềm (Testing) là một công việc quan trọng và không thể thiếu trong quá trình phát triển phần mềm, đang ngày càng được quan tâm và phát triển tại Việt Nam. Có rất nhiều vấn đề khiến chúng ta hiểu không chính xác về công việc này. Trong bài này viết này, mình sẽ giới thiệu một số suy nghĩ sai lệch phổ biến nhất trong kiểm thử phần mềm mà nhiều người thường mắc phải.
![](https://images.viblo.asia/fd3716b2-2d18-4c91-b6ca-5315935fed60.jpg)
## 1. Kiểm thử là tốn kém
Việc trả ít hơn cho việc kiểm thử trong quá trình phát triển phần mềm hoặc trả nhiều hơn cho việc bảo trì hoặc sửa chữa sau này. Kiểm thử sớm sẽ tiết kiệm cả thời gian và chi phí ở nhiều khía cạnh, tuy nhiên việc giảm chi phí thay vì không thực hiện kiểm thử có thể dẫn đến việc thiết kế phần mềm không đúng yêu cầu, khiến sản phẩm phần mềm trở nên vô ích.

## 2. Kiểm thử là tốn nhiều thời gian
Trong giai đoạn phát triển phần mềm, kiểm thử không bao giờ là một quá trình tốn thời gian. Sản phẩm dù có được coder code tốt đến đâu cũng đều xuất hiện bug. Việc đoán lỗi và sửa các lỗi được tìm thấy trong quá trình kiểm thử là một hoạt động tốn thời gian nhưng nó hiệu quả bởi có quá trình này sản phẩm sẽ được hoàn thiện hơn.

## 3. Chỉ khi sản phẩm được phát triển hoàn thiện mới cần kiểm thử
Thực tế  việc kiểm thử phụ thuộc vào mã nguồn nhưng việc rà soát các yêu cầu và xây dựng các testcase là độc lập với mã nguồn đã được phát triển. Tuy nhiên việc lặp lại hay tiếp cận gia tăng giống như một vòng đời phát triển phần mềm, có thể làm giảm sự phụ thuộc của việc kiểm thử với một phần mềm đã được phát triển hoàn thiện.

Quá trình kiểm thử không nhất thiết phải đợi tới khi sản phẩm được phát triển hoàn thiện, mà sản phẩm có thể được kiểm tra ngay từ những giai đoạn đầu (phân tích yêu cầu) của quá trình phát triển phần mềm, bởi kiểm thử càng sớm thì tần suất xảy ra bug càng thấp

## 4. Kiểm thử toàn bộ là có thể
Thực tế - Khi khách hàng hoặc người kiểm thử (tester) nghĩ rằng test toàn bộ là có thể, điều này khả thi khi các kịch bản được thực thi bởi nhóm nhân viên kiển thử. Nhưng kiểm thử toàn bộ là không thể. Có thể có một số kịch bản không được người kiểm thử hoặc khách hàng thực thi trong suốt vòng đời phát triển nhưng lại được thực thi khi dự án đã được triển khai.

## 5. Phần mềm đã được test là không có lỗi 
Thực tế - Đây là một sai lầm rất phổ biến mà khách hàng, người quản lý dự án và nhóm quản lý thường tin. Không ai có thể khẳng định chắc chắn rằng phần mềm 100% không có lỗi ngay cả khi người kiểm thử có kỹ năng kiểm thử tốt đã test phần mềm đó.

Bạn đừng tạo những ý nghĩ trước rằng sẽ không có bất kỳ bugs nào trong ứng dụng. Nếu bạn kiểm tra ứng dụng với ý định tìm ra lỗi thì chắc chắn rằng bạn cũng sẽ tìm ra được những lỗi khó phát hiện khác.

## 6. Các lỗi không được phát hiện là do người kiểm thử
Thực tế - Đây không phải là hướng tiếp cận chính xác để đổ lỗi cho người kiểm thử khi các lỗi vẫn còn trong ứng dụng ngay cả sau khi đã được thực hiện test. Tuy nhiên, chiến lược kiểm thử cũng có thể dẫn đến lỗi do nhóm kiểm thử bỏ qua.
## 7. Người kiểm thử chịu trách nhiệm về chất lượng sản phẩm
Thực tế - Một sai lầm rất phổ biến là chỉ những người kiểm thử hoặc nhóm kiểm thử phải chịu trách nhiệm về chất lượng sản phẩm. Trách nhiệm của người kiểm thử bao gồm việc xác định lỗi cho các bên liên quan, sau đó quyết định xem có sửa lỗi hay phát hành phần mềm. Việc phát hành phần mềm vào thời điểm đó sẽ gây thêm áp lực cho tester, vì họ sẽ bị đổ lỗi khi có bất kỳ lỗi nào xảy ra.

## 8. Test tự động (Test Automation) nên được sử dụng bất cứ khi nào có thể để giảm thời gian
Thực tế - Đúng là Test Automation giảm thời gian kiểm thử, nhưng không thể lúc nào cũng sử dụng automation test. Automation test nên được bắt đầu khi phần mềm đã được kiểm tra bằng tay và ổn định ở một mức độ nào đó. Hơn nữa Test Automation không thể được sử dụng nếu yêu cầu liên tục thay đổi. Ngoài ra, trong trường hợp cần kiểm thử nhiều lần với nhiều môi trường khác nhau, chúng ta nên sử dụng tool để test tự động.

## 9. Bất cứ ai cũng có thể test một ứng dụng phần mềm
Thực tế - Những người ngoài ngành công nghiệp CNTT đều nghĩ và thậm chí tin rằng bất cứ ai cũng có thể kiểm thử một phần mềm và kiểm thử không phải là một công việc sáng tạo. Tuy nhiên những tester biết rất rõ rằng đây là một sai lầm. Suy nghĩ về các kịch bản thay thế, cố gắng phá vỡ một phần mềm với mục đích tìm lỗi tiềm ẩn không thể là người đã phát triển phần mềm đó.


## 10. Nhiệm vụ duy nhất của Tester là tìm lỗi
Thực tế - Tìm lỗi trong phần mềm là nhiệm vụ của người kiểm thử, nhưng đồng thời, họ là những chuyên gia của phần mềm đó. Developers chỉ chịu trách nhiệm cho một phần cụ thể hoặc chức năng đã được giao cho họ, nhưng Tester sẽ hiểu rõ hoạt động tổng thể của phần mềm, những gì phụ thuộc và tác động của một mô-đun lên một mô-đun khác.

Trên đây là tổng hợp 10 sai lầm mà người ta hay nghĩ tới khi nhắc đến testing, hiểu rõ 10 vấn đề đó thì bạn sẽ thấy làm tester cũng không hề đơn giản, phải chịu nhiều áp lực khi bị những hiểu nhầm không đáng có như: Tại sao test rồi mà vẫn xuất hiện lỗi :) câu hỏi muôn thuở dành cho tester.