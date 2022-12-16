Kiểm thử phần mềm là công việc cần thiết nhằm đảm bảo ứng dụng của bạn sẽ hoạt động một cách chính xác đi kèm với việc phát triển chức năng ứng dụng. Để thực hiện được công việc đó thì ta có thể áp dụng các phuơng pháp kiểm thử cơ bản: unit test (test levels), white box test, black box test.

Đầu tiên sẽ là White box testing

### White box testing

![](https://images.viblo.asia/469bbaab-da36-4314-849b-a6d29c21d1ce.png)

White box test là kiểm tra cấu trúc, thiết kế và mã của phần mềm. Tập trung vào việc các định đầu vào (input) và đầu ra (output) nhằm cải thiện thiết kế, khả năng sử dụng và tăng cường bảo mật dựa trên hoạt động bên trong của ứng dụng cũng như việc thử nghiệm nội bộ. Và cái tên nói lên tất cả, nó tượng trưng cho việc ta có thể nhìn được hoạt động bên trong nó.

Để thực hiện được kiểm thử hộp trắng, ta cần tuân thủ các bước cơ bản

* Hiểu được mã nguồn: Đây là việc cần thiết cần làm đầu tiên, vì kiểm thử hộp trắng liên quan đến kiểm tra các hoạt động bên trong nên bắt buộc phải hiểu được mã nguồn mà ta cần kiểm tra. Ngoài ra, ta cần phải thực hiện chặt chẽ vấn đề mã hóa an toàn vì bảo mật là cốt lỗi của việc kiểm thử này.

* Tạo và thực hiện các trường hợp kiểm thử: Việc viết thêm các đoạn mã để kiểm tra đoạn mã nguồn của ứng dụng sẽ là việc tiếp theo cần làm. Cần phải phát triển các thử nghiệm nhỏ cho từng quy trình hoặc cho từng chuỗi quy trình trong ứng dụng (có thể tìm hiểu thêm [ở đây](https://www.guru99.com/manual-testing.html))

Một ví dụ đơn giản với đoạn mã như sau

```
Printme (int a, int b) {                       ------------  Printme is a function 
    int result = a+ b; 
    If (result> 0)
    	Print ("Positive", result)
    Else
    	Print ("Negative", result)
}                                        -----------   End of the source code 
```

Mục tiêu đặt ra là xác định tất cả các nhánh, các vòng lặp và câu lệnh trong đoạn mã trên.

Và các trường hợp thử nghiệm của white box testing sẽ là

```
A = 1, B = 1
A = -1, B = -3
```
Các trường hợp thử nghiệm trên sẽ bao phủ được các điều kiện, các nhánh cũng như các lệnh trong đoạn mã.

Các loại kiểm thử hộp trắng

* Unit testing: đây là phương pháp kiểm thử đầu tiên được thực hiện để kiểm tra một ứng dụng. Phuơng pháp này khá quan trọng nên ta sẽ bàn về nó ngay sau khi đọc xong phuơng pháp kiểm thử Black box testing.

* Testing for Memory Leaks (kiểm tra rò rỉ bộ nhớ): Rò rỉ bộ nhớ là nguyên nhân hàng đầu khiến cho việc chạy ứng dụng trở nên chậm chạp hơn. Và khi có hiện tượng như trên thì cần phải nghĩ ngay đến trường hợp này.

Ngoài ra cũng có một số phương pháp khác như: White Box [Penetration Testing](https://www.guru99.com/learn-penetration-testing.html) và White Box Mutation Testing

White box testing cũng có những ưu điểm nhất định:

* Tối ưu hóa mã nguồn bằng cách tìm ra các lỗi ẩn.

* Dễ dàng thực hiện tự động nhưng cũng kỹ lưỡng hơn

* Và việc kiểm tra có thể bắt đầu sớm ngay cả khi GUI không khả dụng. 

Nhược điểm của nó:

* Thực hiện khá phức tạp và tốn kém chi phí.

* Đòi hỏi người kiểm thử phải thực sự chuyên nghiệp và hiểu biết về lập trình.

* Tốn rất nhiều thời gian

### Black box testing

![](https://images.viblo.asia/96c8f094-af53-409c-9b85-d3fd9b4fee11.png)

Black box testing là một kỹ thuật kiểm thử phần mềm kiểm tra chức năng của ứng dụng dựa vào các đặc điểm kỹ thuật mà không cần xem cấu trúc mã bên trong như thế nào. Nó dựa hoàn toàn trên các yêu cầu và thông số kỹ thuật của phần mềm. Black box test chỉ tập trung vào đầu vào và đầu ra khi thực hiện kiểm tra mà không cần quan tâm đến bên trong mã được xây dựng như nào.

Để tiến hành thử nghiệm hộp đen, thực hiện theo các bước sau:

* Chọn đầu vào hợp lệ (kịch bản thử nghiệm tích cực) để kiểm tra việc xử lý có được chính xác hay không. Đồng thời các kịch bản với đầu vào không hợp lệ cũng được tiến hành để phát hiện lỗi.

* Người thử nghiệm cần phải xác định dự kiến tất cả các đầu vào.

* Thực hiện kiểm thử với các đầu vào đã được chuẩn bị cho từng trường hợp

* Các trường hợp thử nghiệm được thực hiện.

* So sánh đầu ra nhận được với đầu ra dự kiến đã chuẩn bị.

* Xác định các điểm gây lỗi và thực hiện kiểm tra lại.

### Thực hiện so sánh 2 phuơng pháp White box testing và Black box testing



| Black Box Testing |White Box Testing |
| -------- | -------- |
| Trọng tâm là xác nhận các yêu cầu chức năng     | Xác nhận cấu trúc bên trong và hoạt động của từng đoạn mã     |
| Tập trung vào kết quả của hệ thống phần mềm và có thể bỏ qua việc xem xét mã nguồn  | Việc hiểu được mã nguồn là vô cùng cần thiết     |
| Tạo điều kiện để kiểm tra giao tiếp giữa các module  | Không tạo điều kiện để kiểm tra giao tiếp giữa các module     |

### Unit test

Unit test là một loại kiểm thử phần mềm mà các thành phần của nó sẽ được thực hiện kiểm tra đơn lẻ, các thành phần đó có thể là method, class, module... nhằm cô lập từng phần mã riêng biệt để kiểm tra độ chính xác của nó. Và nó được thực hiện bởi lập trình viên. Đôi khi, họ sẽ bỏ qua unit test và chỉ thực hiện [`Integration test` ](https://www.guru99.com/integration-testing.html). Tuy nhiên, không phải các lỗi đều có thể phát hiện nếu thực hiện kiểm tra tích hợp, và việc tìm và sửa lỗi lại vô cùng phức tạp và gây mất thời gian. Vậy nên có thể nói, đừng bỏ qua unit test vì cho rằng ta sẽ tiêu tốn quá nhiều thời gian để viết nó.

Một số ưu điểm của unit test khiến bạn không thể nói không với nó:

* Kiểm tra từng đoạn mã trong giai đoạn phát triển giúp sớm tìm ra lỗi và sửa chữa ---> tiết kiệm chi phí.

* Các lập trình viên hiểu được từng đoạn mã và có thể sửa đổi nhanh chóng nếu có yêu cầu.

* Tạo ra tài liệu tham khảo của dự án.

* Sử dụng lại các đoạn mã mà vẫn đảm bảo được tính chính xác của nó ---> tiết kiệm cả về thời gian và chi phí.

* Vì là thực hiện test từng đơn vị nên có thể thực hiện song song các thành phần của dự án mà không bị ràng buộc hay phụ thuộc vào người khác.

Unit test gồm 2 loại: manual và automated, và thông thường thì automated được sử dụng phổ biến hơn mặc dù nó vẫn có thể thực hiện một cách thủ công.

Việc unit test chỉ test từng đoạn mã với từng chức năng riêng lẻ khiến nó không thể phát hiện những lỗi tích hợp hoặc lỗi hệ thống khi mà nhiều đoạn mã được thực hiện cùng lúc. Ưu điểm của nó cũng trở thành chính nhược điểm lớn nhất của nó.

Để tiến hành thực hiện unit test, ta nên chuẩn bị:

* Các đơn vị cần kiểm tra phải thực sự độc lập.

* Chỉ kiểm tra một đoạn mã tại một thời điểm.

* Việc đặt tên cho từng đoạn test phải thống nhất và rõ ràng.

* Nếu có module nào đó thay đổi cần phải có các trường hợp kiểm tra tương ứng trước khi áp dụng nó.

Tài liệu tham khảo

[https://www.guru99.com/unit-testing-guide.html](https://www.guru99.com/unit-testing-guide.html)

[https://www.guru99.com/white-box-testing.html](https://www.guru99.com/white-box-testing.html)

[https://www.guru99.com/black-box-testing.html](https://www.guru99.com/black-box-testing.html)