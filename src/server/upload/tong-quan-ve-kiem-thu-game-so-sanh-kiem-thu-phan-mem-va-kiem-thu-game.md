# 1. Kiểm thử game là gì?
**Kiểm thử game** là một giai đoạn trong quá trình phát triển game - quá trình kiểm thử phần mềm ở đầy đủ các khía cạnh: 
- Soát lỗi kỹ thuật 

- Kiểm tra logic game 

- Kiểm tra nội dung 

- Thử nghiệm khả năng thích ứng 

- Thu thập ý kiến của người chơi 

**Công việc chính của game tester**: 

- Phát hiện lỗi 

- Viết tài liệu hướng dẫn về lỗi của game 

- Trải nghiệm và đóng góp ý tưởng để cải tiến game 

# 2. So sánh kiểm thử phần mềm và kiểm thử game 
## 2.1 Giống nhau
Giống nhau:

- Black Box Software Testing có thể áp dụng cho cả 2 

- ISTQB testing certifications có thể áp dụng cho cả 2 

- Test automation có thể áp dụng cho cả 2 

## 2.2 Khác nhau
- Fun Factor Testing 
-  Balance Testing 
- Game Level/World Testing 
- Multiplayer/Network Testing 
- Audio Testing 
-  Physics Testing 

# 3. Các giai đoạn kiểm thử game
## 3.1 Giai đoạn đầu tiên là quá trình phát triển của trò chơi
- Thời gian này game chưa thành hình và tồn tại ở dạng các module chưa hoàn toàn được gắn kết với nhau hoặc chỉ mới có một vài tính năng cơ bản nhất. 
- Tester trong giai đoạn này chính là các lập trình viên 

## 3.2 Giai đoạn thứ hai là giai đoạn game đã thành hình và được tiến hành test nội bộ
- Tester bắt đầu tham gia vào quy trình kiểm thử. Đây là giai đoạn phát hiện nhiều bug nhất của game. 
- Đội ngũ phát triển game sẽ theo đó để tiếp tục khắc phục những bug game, thiết kế lại game 
## 3.3  Giai đoạn thứ ba là gold testing 
- Beta testing: Đưa sản phẩm cho 1 số lượng nhỏ user theo các tiêu chí được định sẵn để sử dụng và phản hồi về game 
- Gold testing: Thực hiện phát hành game đến mọi user và thu thập phản hồi, qua đó đưa ra các bản cập nhật vá lỗi khi cần thiết 
# 4. Các kĩ thuật kiểm thử game 
- Smoke Testing: Quá trình để kiểm tra liệu build đã triển khai ổn định hay không, 
các tính năng chính có hoạt động bình thường hay không 
-  Whitebox Testing: Phương pháp kiểm thử cấu trúc code, thuật toán của game 
- Blackbox Testing: Phương pháp kiểm thử các chức năng của game dựa trên đặc tả 
- Play Testing (QA testing): Kiểm thử các tính năng trong trò chơi như yếu tố vui 
nhộn, độ khó, mức độ cân bằng... và đưa ra ý kiến cải tiến 
- Adhoc Testing: Phương pháp kiểm thử nhằm mục đích phá vỡ hệ thống mà không 
dựa trên test case hay tài liệu nào

# 5. Nội dung kiểm thử game
**Các nội dung kiểm thử thông thường:**

## 5.1 Installation Test
- Kiểm tra game có cài đặt thành công, dung lượng sau khi cài đặt, nơi đặt các file sau khi cài đặt 

## 5.2 Gameplay Tests
- Hoàn thành gameplay ở tất cả các chế độ (full walkthrough) 
- Chơi game không theo cách thông thường 
- Thực hiện kiểm thử hiệu năng 
- Kiểm thử âm thanh 
- Đảm bảo gameplay tuân thủ đúng thiết kế 

## 5.3 Interrupt Tests 
- Cắm và rút sạc 
-  Nhận, từ chối, nhỡ cuộc gọi đến 
- Nhận tin nhắn thoại, tin nhắn đa phương tiện 
- Gập điện thoại 
-  Nhận báo thức 
- Nhấn các phím vật lý của điện thoại 
- Nhận các thông báo: pin yếu, thông báo của ứng dụng khác 

## 5.4 IAP (In-App Purchase) Tests 
- Kiểm tra tính năng mua bán sản phẩm trong game, mua bán bằng các loại kết nối khác nhau 

## 5.5 Localization Tests 
- Kiểm tra các tính năng của game khi thay đổi ngôn ngữ, thực hiện chơi game với các ngôn ngữ khác nhau, kiểm tra hiện thị và nội dung của các ngôn ngữ 

## 5.5 Carrier/manufacturer/Game design document Test 
- Kiểm tra game đúng theo thiết kế, kiểm tra game tuân thủ luật lệ của các thị trường, các nền tảng khác nhau 

## 5.6 Performance Test 
-  Kiểm tra cách thức hoạt động của game trong điều kiện thiếu thốn tài nguyên: cài đặt khi thiếu bộ nhớ, cài đặt trên các thiết bị yếu, download data với điều kiện mạng không ổn định, chạy game khi bộ nhớ gần đầy 
- Kiểm tra khả năng đáp ứng của game khi nhiều người cùng truy cập: với các game có chế độ 
multiplayer, cần kiểm thử trường hợp có nhiều người cùng truy cập, nhiều người cùng vào 1phòng chơi... 

# Kết Luận:
Bài viết này chỉ hy vọng giúp các bạn hiểu cơ bản về Kiểm thử game là gì ?, so sánh kiểm thử game với kiểm thử phần mềm, các giai đoạn kiểm thử game, kỹ thuật kiểm thử game, nội dung kiểm thử game. Bạn cần tìm hiểu thêm để có thể hiểu sâu hơn về Kiểm thử game để áp dụng hiệu quả nó vào công việc của bạn.

Tài liệu tham khảo:

https://www.devpro.edu.vn/su-khac-biet-giua-kiem-thu-phan-mem-va-kiem-thu-game
 https://techblog.vn/game-testing-cach-test-cac-ung-dung-game-tren-dien-thoai-va-may-tinh