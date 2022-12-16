Khi tìm hiểu về Ethereum, bạn sẽ thấy cụm từ Token ERC-20 xuất hiện thường xuyên. Vậy Token ERC-20 là gì và nó có liên quan đến đồng tiền Ethereum ra sao? Trong bài viết hôm nay công ty Devteam sẽ cùng các bạn tìm hiểu về Token ERC20

**Token ERC20 là gì?**
ERC là viết tắt của Ethereum Request for Comment. ERC-20 là một tiêu chuẩn kỹ thuật được sử dụng cho các hợp đồng thông minh trên chuỗi khối Ethereum để triển khai mã thông báo và 20 là con số ký hiệu được gán cho yêu cầu này.
ERC-20 định nghĩa một danh sách chung các quy tắc cho các mã thông báo Ethereum để tuân theo hệ sinh thái Ethereum lớn hơn, cho phép các nhà phát triển dự đoán chính xác sự tương tác giữa các chuỗi. Các quy tắc này bao gồm cách các mã thông báo được chuyển giữa các địa chỉ và cách truy cập dữ liệu trong mỗi mã thông báo.

Phần lớn các mã thông báo được phát hành trên blockchain Ethereum phải tuân theo chuẩn ERC-20. Từ năm 2018, tổng cộng 103621 mã thông báo tương thích ERC-20 được tìm thấy trên mạng chính Ethereum.

Hiện tại Ether không phù hợp với tiêu chuẩn ERC-20. Các giao thức yêu cầu sự tuân thủ ERC-20 đối với giao dịch đã tạo ra các thẻ Ether bọc như là một trình giữ chỗ cho ETH. Các mã thông báo “WETH ” này được giữ trong một hợp đồng thông minh riêng biệt và được gán cho Ether với tỉ lệ 1:1.
![](https://images.viblo.asia/c912836e-7b0c-4897-a7d3-9af46ffe96c9.png)

Cộng đồng Ethereum đã thiết lập ra 3 quy tắc tùy chọn và 6 quy tắc bắt buộc cho token ERC20 như sau:

**Quy tắc tuỳ chọn:**
+ Tên token
+ Ký hiệu
+ Thập phân (tối đa 18)

**Quy tắc bắt buộc:**
+ TotalSupply
+ BalanceOf
+ Transfer
+ TransferFrom
+ Approve
+ Allowance

**Vấn đề mà ERC-20 gặp phải**
Vẫn tồn tại một số vấn đề mà ERC-20 chưa thể giải quyết được. Đã có trường hợp xảy ra mà các thẻ vô tình bị phá huỷ trước khi được dùng để thanh toán cho một hợp đồng thông minh thay vì sử dụng Ether, dẫn đến thiệt hại lên đến 3 triệu đô la.

Để khắc phục điều này, những nhà phát triển Ethereum hiện đang nghiên cứu một tiêu chuẩn mới với tên gọi ERC-223. Tuy nhiên, tiêu chuẩn mới này vẫn chưa thể tương thích với ERC-20, do vậy các nhà phát triển khuyến khích tiếp tục người dùng sử dụng ERC-20 cho đến khi ERC-223 có thể tương thích với ERC-20.

Ngoài ra, vào tháng 4/2018, một số giao dịch các khoản tiền gửi và rút các mã thông báo dựa trên Ethereum bị tạm ngưng do lỗi batchOverflow. Điều này có thể dẫn đến việc những kẻ tấn công lợi dụng sơ hở để sở hữu một lượng lỗi mã thông báo. Hiện vẫn chưa có cách tiếp cận bảo mật truyền thống nào có thể sửa chữa lỗ hổng bảo mật này.

ERC-20 là token hỗ trợ nền tảng Ethereum, được xây dựng trên cơ sở các hợp đồng thông minh và do đó, mang trong mình những tính năng riêng biệt. ERC-20 có mối quan hệ mật thiết với Ethereum. Bạn có thể mua ERC-20 bằng ETH.

Token ERC20 buộc phải tuân thủ các tiêu chuẩn để có thể được chia sẻ, trao đổi với các token khác, hoặc chuyển sang một ví tiền điện tử khác.