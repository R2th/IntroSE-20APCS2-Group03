# 1. Unit test là gì?
Trong kiểm thử phần mềm có 4 mức độ kiểm thử: Unit test ( kiểm thử mức đơn vị), Intergration test ( kiểm thử tích hợp), System test (kiểm thử hệ thống), Acceptance test (kiểm thử chấp nhận).

Unit test  là mức độ kiểm thử nhỏ nhất trong quy trình kiểm thử phần mềm. Unit test kiểm thử các đơn vị nhỏ nhất trong mã nguồn như method, class, module...Do đó Unit test nhằm kiểm tra mã nguồn của các chương trình, các chức năng riêng rẽ hoạt động đúng hay không.

Unit testing được thực hiện bởi lập trình viên.
# 2. Lợi ích của Unit test
* Viết Unit test tốt giúp tăng sự tin tưởng vào mã nguồn được thay đổi hoặc bảo trì. Bởi lẽ, nếu viết Unit test tốt, mỗi lần có sự thay đổi bên trong mã nguồn và chạy unit test, chúng ta có thể bắt được những lỗi sảy ra do thay đổi mã nguồn.
* Chúng ta có thể kiểm thử từng thành phần riêng rẽ của dự án mà không cần đợi các thành phần khác hoàn thành.
* Do thực hiện test trên từng đơn vị nhỏ của các module riêng rẽ nên khi phát hiện lỗi cũng dễ dàng khoanh vùng và sửa chữa.
* Có thể tái sử dụng mã nguồn
* Chi phí cho việc sửa chữa lỗi trong giai đoạn unit test sẽ ít hơn so với các giai đoạn sau
* Mã nguồn đáng tin cậy hơn nếu viết tốt unit test
# 3. Những ngộ nhận về Unit test
* Intergration test (test tích hợp) sẽ tìm thấy tất cả lỗi bằng mọi cách: Đây là một trong những quan niệm sai lầm thường gặp. Độ khó của các vấn đề sẽ tăng trong quy trình kiểm thử phần mềm. Càng ở những giai đoạn kiểm thử sau thì lỗi càng phức tạp, khó tìm và giải quyết hơn.
* Nhiều lập trình viên cho rằng không bắt buộc phải có Unit test. Nhiều người tin tưởng rằng khả năng lập trình của họ đã tốt và phần mềm của họ không cần thiết phải có Unit test. Nhưng trong thế giới thực tế này, tất cả mọi người đều có thể gây ra lỗi và các hệ thống phần mềm thực tế còn phức tạp hơn rất nhiều. 
* Viết Unit test mất quá nhiều thời gian: Lập trình viên thường cho rằng unit test với họ là vô nghĩa bởi lẽ họ nghĩ rằng mã nguồn sẽ luôn luôn được kiểm thử bởi kiểm thử viên. Tuy nhiên, nếu không thực hiện Unit test, số lỗi được tìm thấy ở các giai đoạn sau càng nhiều và càng ở giai đoạn sau thì lỗi càng phức tạp, tốn rất nhiều thời gian và chi phí để sửa chữa.
# 4. Một số lưu ý khi viết Unit test
* Chắc chắn rằng mỗi test case kiểm thử mức đơn vị sẽ độc lập với những test case khác. Không nên gọi một test case khác trong một test case. Test case không nên phụ thuộc vào nhau cả về data và thứ tự thực hiện.
* Luôn luôn  kiểm tra từng mô-đun một cách độc lập. Nếu không, sẽ có nhiều sự chồng chéo giữa các ca thử nghiệm và việc thay đổi đối với một đơn vị có thể ảnh hưởng đến tất cả các mô-đun khác và khiến phần mềm bị lỗi.
* Đặt tên các đơn vị kiểm thử một cách rõ ràng và nhất quán. Đảm bảo rằng các test case dễ đọc, bất kỳ ai cũng có thể chọn test case và chạy nó mà không gặp bất kỳ vấn đề nào.
* Khi triển khai việc thay đổi giao diện hoặc chức năng, cần chạy lại các test case trước đó nhằm đảm bảo việc thay đổi này không làm ảnh hưởng đến những test case cũ đã pass.
* Luôn đảm bảo lỗi được xác định trong quá trình Unit test được sửa trước khi chuyển sang giai đoạn tiếp theo.
* Không cố gắng viết test case để kiểm thử tất cả mọi thứ, thay vào đó nên tập chung vào kiểm thử sự ảnh hưởng của hành vi hệ thống
* Bên cạnh viết test case để test hành vi hệ thống, cần viết thêm test case để kiểm thử hiệu năng của mã nguồn
* Các testsuit nên đặt riêng ra, độc lập code với module
* Không nên có nhiều assert trong một test case vì khi một điều kiện không thỏa mãn thì các assert khác sẽ bị bỏ qua
* Sau một thời gian dài, số lượng test case nhiều, thời gian chạy lớn. Nên chia ra nhóm test case cũ và test case mới, test case cũ sẽ chạy với tần xuất ít hơn

# Như vậy, thế nào được gọi là Unit test tốt?
* Chạy nhanh
* Chạy độc lập giữa các test case, không phụ thuộc vào thứ tự kiểm thử
* Sử dụng data dễ đọc, dễ hiểu
* Sử dụng dữ liệu thực tế có thể
* Test case đơn giản, dễ đọc, dễ bảo trì
* Phản ảnh đúng hoạt động của module

### Tài liệu tham khảo:
http://www.softwaretestingstuff.com/2010/09/unit-testing-best-practices-techniques.html
http://softwaretestingfundamentals.com/unit-testing/
https://www.slideshare.net/guest45ac48/unit-test