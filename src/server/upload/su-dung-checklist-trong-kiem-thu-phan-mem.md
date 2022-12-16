![](https://images.viblo.asia/c5b939fb-fce3-40c3-a425-3ef8db71858b.png)
# I. Checklist là gì?
Checklist là danh sách các đầu mục cần kiểm tra về nghiệp vụ, chức năng của hệ thống. Nó chỉ là các mục mang tính tổng quan. Bạn có thể phát triển nó thành bộ testcase hoàn chỉnh.
# II. Khi nào cần tạo checklist?
Lí do phổ biến nhất để tạo checklist thay vì testcase là không đủ thời gian, dự án yêu cầu phải test trong thời gian ngắn.

# III. Tiêu chí tạo checklist
- Xác định đối tượng nào cần tạo checklist
- Tạo checklist dựa trên kinh nghiệm bản thân
- Nhờ các thành viên trong team review để đảm bảo không thiếu sót

# IV. Ưu nhược điểm của checklist?
## 1. Ưu điểm:
- Ngắn gọn, đảm báo tính đúng đắn, chính xác cho phần mềm kiểm thử
- Giúp tester nhìn thấy rõ và bao quát quy trình kiểm tra
- Mất ít thời gian phù hợp những dự án có specs thay đổi nhiều, lượng công việc lớn
- Kết quả phân tích (Tiến độ công việc, tình trạng hoàn thành) là rất dễ dàng
- Rất linh hoạt (Bạn có thể thêm hoặc bỏ các mục không cần thiết)
 
## 2. Nhược điểm:
- Kiểm thử viên cần khả năng nhìn nhận để thực hiện được nhiều case test dựa trên các hạng mục ở checklist
- Sẽ khó khăn cho những bạn kiểm thử viên mới vì trong checklist không có thao tác rõ ràng

# V. Checklist cho một số item cơ bản trên website
## 1. Dropdown:
- Khi nào nên enabled/disabled 
- Khi nào bắt buộc/không bắt buộc chọn data
- Giá trị mặc định là gì
- Giá trị trong dropdown được sắp xếp tăng hay giảm
- Có thể chọn một giá trị trong dropdown bằng cách nhập một số kĩ tự rồi nhấn enter
- Có thể chọn nhiều giá trị cùng lúc nếu dropdown cho phép

## 2. Button:
- Khi nào nên enabled/disabled 
- Điều gì xảy ra nếu click vào button

## 3. Textbox:
- Khi nào nên enabled/disabled 
- Có bắt buộc nhập dữ liệu hay không
- Giá trị mặc định khi vừa mở page lên là gì
- Giá trị nhập vào như thế nào là hợp lệ/không hợp lệ
- Định dạng của giá trị nhập vào
- Độ dài lớn nhất của gía trị nhập vào

##  4. Checkbox:
- Khi nào nên enabled/disabled 
- Giá trị mặc định checked/unchecked

## 5. Grid:
- Grid gồm bao nhiêu column
- Giá trị mặc định của grid là gì
- Dữ liệu trong grid được sắp xếp như thế nào

## 6. Phân trang
- Khi nào xuất hiện/không xuất hiện phân trang
- Chuyện gì xảy ra khi click vào các số trang

## 7. Menu
- Menu gồm những mục nào
- Chuyện gì sẽ xảy ra khi click vào một item trên menu

## 8. Hyperlink
- Chuyện gì xảy ra khi hover và click vào hyperlink

## 9. Upload dialog file/image
- Upload được tất cả các định dạng file cho phép không
- Sau khi upload thì hiển thị có đúng không

## 10. UI
- UI có bị vỡ không khi zoom in  (150%)/zoom out  (75%)
- UI có đúng font/size/màu sắc/ hiệu ứng/ vị trí các item so với thiết kế hay không
- UI có bị vỡ khi mở trên các trình duyệt khác nhau hay không

# VI. Kết luận:
Cho dù là tạo testcase hay checklist thì mục đích cuối cùng vẫn là đảm bảo được chất lượng dự án. Do đó không được sơ sài cẩu thả. Phải đảm bảo bao quát được tất cả nghiệp vụ hệ thống. Bài viết này dựa trên dự án thực tế mình đang làm và tham khảo ở https://labs.septeni-technology.jp/none/checklist-based-testing/ . Mong rằng bài viết sẽ giúp cho các bạn trong việc tạo một checklist đơn giản và hiệu quả. 

![](https://images.viblo.asia/86bfe12c-e249-455b-9e51-f84262fbcc01.jpg)