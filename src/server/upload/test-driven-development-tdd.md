Xin chào các bạn.   
Đối với mỗi công việc mà chúng ta làm, cần có một chuỗi các hành động để hoàn thành công việc không chỉ hiệu quả mà còn mang lại giá trị tốt nhất mà công việc đó có thể mang lại.
Để xây dựng một ngôi nhà, trước tiên bạn cần phải lên kế hoạch và xây dựng phần móng.
Để trồng cây, trước tiên bạn cần chuẩn bị xẻng và phân bón.
Chúng ta có ý niệm về việc cần chuẩn bị trước khi thực hiện công việc, vậy ý niệm này có nên áp dụng cho phát triển phần mềm không?  
Thông thường, chúng ta thu thập các yêu cầu và thông số kỹ thuật, phân tích, thiết kế, viết code, test code, v.v. và cuối cùng triển khai phần mềm của mình. Chắc chắn, việc xáo trộn các hành động này có vẻ giống như trồng một cái cây mà không đào hố trước, nhưng đây thực sự lại là những gì chúng ta phải làm trong Phát triển phần mềm hướng kiểm thử (Test-Driven Development).  

## Test-Driven Development là gì?
Phát triển theo hướng kiểm thử là một tập quán phát triển phần mềm cho phép chúng ta tạo ra các specifications  hoặc requirement thông qua các bước test. Các bước test này sẽ hữu ích cho các nhà phát triển phần mềm khi họ bắt đầu viết và triển khai code cho phần mềm.
Nói một cách đơn giản, trước khi viết mã, chúng ta test trước.
Khi sử dụng phương pháp này, cần tuân theo các bước sau trong quá trình develop:    
1. Write a test (RED): Đây là bước bạn tạo test case chắc-chắn-sẽ-thất-bại vì chưa có implement.  
2. Write the code (GREEN): Đây là bước mà bạn viết code, để pass được test case ở bước 1.  
3. Improve the code (REFACTOR): Đây là bước mà bạn tinh gọn code đã implement ở bước 2.  
4. Repeat.

## Vì sao chúng ta áp dụng Test-Driven Development?  

“Lập trình giống như khám phá một ngôi nhà tăm tối. Bạn đi từ phòng này sang phòng khác. Viết test giống như bật đèn. Sau đó, bạn có thể tránh được đồ đạc và bảo vệ ống chân của bạn (design rõ ràng là kết quả của việc refactor). Sau đó, bạn đã sẵn sàng khám phá căn phòng tiếp theo ”- (Nguyên văn: “Programming is like exploring a dark house. You go from room to room to room. Writing the test is like turning on the light. Then you can avoid the furniture and save your shins (the clean design resulting from refactoring). Then you’re ready to explore the next room”) — Kent Beck, Test-Driven Development By Example  
  
Việc lập trình có thể như mò mẫm trong bóng tối, có nghĩa là không có bất kỳ kế hoạch nào trước khi chúng ta bắt đầu viết code, chúng ta có thể gặp một số nhầm lẫn trong suốt quá trình đó, ví dụ như là quên input param nào mà một hàm có thể nhận, output nào mà hàm trả về, logic hoặc công thức một function, v.v...
Dưới đây là một ví dụ đơn giản về cách sử dụng test case trong một dự án Django:  ![](https://images.viblo.asia/8bd079e8-418b-4d1d-9a99-ee836b291c88.png)
Trước khi code một hàm trả về phạm vi trọng lượng lý tưởng từ chiều cao cơ thể của user, trước tiên, ta lên kế hoạch về cách tốt nhất để implement nó. Input của hàm này là một số nguyên sẽ đại diện cho chiều cao cơ thể và output của hàm này là một dictionary sẽ chứa cân nặng lý tưởng tối thiểu và tối đa. Sau đó, đưa ra công thức làm thế nào để có được trọng lượng lý tưởng tối thiểu và tối đa vào test case.  
Với test case này được lưu trong project, ta sẽ luôn có thể xem lại nó khi bắt đầu implement chức năng mà không phải lo lắng về việc quên input, output hoặc công thức.  
![](https://images.viblo.asia/729ffad0-a3c7-4ffc-9ebf-9216fd5d4aa5.png)
  
Test case có thể dùng làm tài liệu dành cho developer
Bạn đã bao giờ cảm thấy mệt mỏi khi cố gắng giải thích code của mình hoặc cách sử dụng code của mình cho người khác chưa? Tất nhiên bạn có thể viết tài liệu hướng dẫn, nhưng nếu bạn không thích làm nó sau khi code xong thì sao? Hoặc giả sử như nó quá phức tạp để giải thích bằng lời thì sao? Bạn đã bao giờ nghĩ đến việc tạo các test case giải thích mã của bạn làm gì chưa? Biết đâu một ngày nào đó, các lập trình viên thích đọc các test case để hiểu code của nhau hơn là đọc tài liệu đấy. Nếu vậy thì khi viết test case hoặc test code, cũng chính là bạn đang viết 1 dạng tài liệu cho code của mình đấy.    

Testing là một trong những thành tố quan trọng nhất trong kỹ thuật phần mềm khi đề cập đến các dự án quy mô lớn. Một thay đổi nhỏ để fix bug có thể dẫn đến nhiều bug tiềm ẩn mới. Nếu bạn đặt mình ở vị trí điều phối một dự án lớn mà nhiều người dùng phụ thuộc vào, bạn sẽ thấy điều đó thực sự cực kỳ đáng sợ.
Với TDD, chúng ta có thể ngăn điều này xảy ra. Do các bước test lặp đi lặp lại có thể được lặp lại mỗi khi chúng ta thay đổi hoặc thêm những thứ vào code của mình, và có thể đảm bảo rằng không có hậu quả nào dẫn đến thảm họa, ngay cả khi thay đổi hoặc bổ sung có phạm vi ảnh hưởng lớn.

## Tạm kết
Hi vọng qua các thông tin trên, các bạn ít nhiều có được ý niệm về Test-Driven Development, và đừng lười viết test code, test case nữa nhé. :wink:

## Tham khảo
https://en.wikipedia.org/wiki/Test-driven_development  
http://agiledata.org/essays/tdd.html