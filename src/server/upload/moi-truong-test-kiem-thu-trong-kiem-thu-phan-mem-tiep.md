Link phần 1: https://viblo.asia/p/moi-truong-test-kiem-thu-trong-kiem-thu-phan-mem-924lJbxalPM
## 7. Checklist cho môi trường kiểm thử
![](https://images.viblo.asia/aa38dc27-3e19-4d7e-9c1f-4dfdf928c103.png)
Ngoài ra, cần trả lời một số câu hỏi sau trước khi thiết lập môi trường kiểm thử.
* Có nên phát triển môi trường thử nghiệm nội bộ hay thuê ngoài?
* Liệu có tuân theo tiêu chuẩn nội bộ của công ty hay theo bất kỳ tiêu chuẩn bên ngoài nào (IEE, ISO, v.v.) không?
* Thiết lập môi trường kiểm thử cần bao nhiêu thời gian?
* Sự khác biệt giữa các hệ thống thử nghiệm và production  và cần xác định được các ảnh hưởng của chúng đến việc kiểm thử.
* Các thiết lập lại có thể tái sử dụng cho các dự án khác trong công ty hay không?
#  Những khó khăn gặp phải khi thiết lập Quản lý môi trường kiểm thử
## 1. Lên kế hoạch phù hợp cho việc sử dụng tài nguyên:
Việc lập kế hoạch sử dụng tài nguyên không hiệu quả có thể ảnh hưởng đến kết quả đầu ra thực tế. Ngoài ra, nó còn có thể dẫn đến mâu thuẫn giữa các team với nhau.
## 2. Môi trường từ xa:
Có thể môi trường kiểm thử được thiết lập cách xa nhau. Trong trường hợp như vậy, đội ngũ kiểm thử phải nhờ đội ngũ hỗ trợ các vấn đề liên quan đến kiểm thử (phần mềm, phần cứng, và các vấn đề khác).
## 3. Thời gian thiết lập phức tạp, tỉ mỉ:
Đôi khi, việc thiết lập môi trường kiểm thử lại khá phức tạp khi thực hiện kiểm thử tích hợp.
## 4. Các team sử dụng chung với nhau:
Nếu team phát triển và kiểm thử sử dụng môi trường kiểm thử cùng một lúc, kết quả kiểm thử sẽ bị hỏng.
## 5. Cấu hình kiểm thử phức tạp:
Một số kiểm thử cụ thể đòi hỏi cấu hình môi trường kiểm thử phức tạp. Có thể gây khó khăn cho đội ngũ kiểm thử.
# Những điều cần biết để quản lý Môi trường kiểm thử
1.  Hiểu rõ các yêu cầu kiểm thử và phổ biến lại cho các thành viên trong nhóm kiểm thử.
2. Nên kiểm tra kết nối trước khi tiến hành kiểm thử.
3. Kiểm tra các phần cứng, phần mềm, và license cần thiết.
4. Trình duyệt và version của trình duyệt
5. Lên kế hoạch cho việc sử dụng môi trường kiểm thử.
6. Các tool test tự động và cấu hình của chúng.
# Thế nào là Test bed?
Nói chung, Test bed là một môi trường phát triển phần mềm. Nó cho phép các nhà phát triển kiểm tra các mô-đun của họ mà không ảnh hưởng trực tiếp đến server trên production. Test bed không chỉ giới hạn cho các nhà phát triển mà còn được sử dụng bởi những tester. Đó là một môi trường thử nghiệm tốt.
## Tóm tắt:
* Môi trường kiểm thử là tổ hợp cài đặt bao gồm phần mềm và phần cứng để đội ngũ tester tiến hành kiểm thử.
* Đối với môi trường kiểm thử,  các key để thiết lập bao gồm:
    - Hệ thống và các ứng dụng
    - Dữ liệu kiểm thử
    - Máy chủ cơ sở dữ liệu
    - Môi trường để chaỵ Front End...
* Một số khó khăn khi thiết lập môi trường kiểm thử:
     - Môi trường từ xa
     - Các team sử dụng chung, dẫn đến nguy cơ rò rỉ các thông tin liên quan đến dự án, khách hàng ra bên ngoài, đặc biệt là các account test mà khách hàng cung cấp khi quên không logout.
     - Thời gian thiết lập phức tạp, tỉ mỉ
     - Việc sử dụng tài nguyên để tích hợp chưa được lên kế hoạch hiệu quả.
     - Cấu hình môi trường kiểm thử phức tạp

Link tham khảo: https://www.guru99.com/test-environment-software-testing.html