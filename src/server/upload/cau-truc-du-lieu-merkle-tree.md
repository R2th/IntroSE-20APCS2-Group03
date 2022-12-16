> Cây Merkle là một cây nhị phân có thứ tự được xây dựng từ một dãy các đối tượng dữ liệu (d1, d2,...,dn) sử dụng hàm băm h. Các “lá” của cây là các giá trị băm h(di) đối với 1 ≤ i ≤ n. Các nốt là h(l||r), ở đó các cây con left (l) và right (r) được nối lại với nhau bằng (||).
> 
> Cây Merkle có thể được sử dụng để kiểm tra xem một đối tượng dữ liệu có phải là một thành viên ở một vị trí đúng đắn trong mô hình cây hay không. Gốc của cây đóng vai trò là một bản băm đối với toàn bộ cây. Việc kiểm tra được thực hiện bằng cách xây dựng lại đường đi từ lá đến gốc cây, sử dụng đường xác thực bao gồm các nhánh đồng hạng của các nốt trên đường.

# Merkle Tree hoạt động như thế nào?

Merkle tree tóm tắt tất cả các giao dịch trong một khối bằng cách tạo dấu vân tay kỹ thuật số của toàn bộ  giao dịch, từ đó cho phép người dùng xác minh xem có bao gồm giao dịch trong một khối hay không.

Cây Merkle được tạo bằng cách liên tục băm các cặp nút cho đến khi chỉ còn lại một hàm băm (hàm băm này được gọi là Root Hash hoặc Root Merkle). Chúng được xây dựng từ dưới lên, từ băm của các giao dịch riêng lẻ (được gọi là ID giao dịch).

Mỗi nút lá là một hàm băm của dữ liệu giao dịch và mỗi nút không lá là một hàm băm của các giá trị băm trước đó. Merkle tree là nhị phân và do đó yêu cầu số nút chẵn. Nếu số lượng giao dịch là số lẻ, hàm băm cuối cùng sẽ được nhân đôi một lần để tạo số nút chẵn.

![](https://images.viblo.asia/ac2dd744-6c91-41e2-a9e8-8243350939fe.jpg)

Hãy xem xét một ví dụ về bốn giao dịch trong một khối: A, B, C và D. Mỗi giao dịch được băm và hàm băm được lưu trữ trong mỗi nút lá, dẫn đến các cặp Hash A, B, C và D. Liên tiếp các nút lá sau đó được tóm tắt trong một nút cha bằng cách băm Hash A và Hash B, dẫn đến Hash AB và băm riêng Hash C và Hash D, dẫn đến Hash CD. Hai băm (Hash AB và Hash CD) sau đó được băm lại để tạo Root Hash (Root Merkle).

Quá trình này có thể được tiến hành trên các tập dữ liệu lớn hơn: các khối liên tiếp có thể được băm cho đến khi chỉ có một nút ở trên cùng. Băm thường được tiến hành bằng cách sử dụng hàm băm mật mã SHA-2 , mặc dù các chức năng khác cũng có thể được sử dụng.

Root Merkle tóm tắt tất cả dữ liệu trong các giao dịch liên quan và được lưu trữ trong tiêu đề khối. Nó duy trì tính toàn vẹn của dữ liệu. Nếu một chi tiết duy nhất trong bất kỳ giao dịch hoặc thứ tự giao dịch nào thay đổi, thì Merkle Root cũng vậy. Sử dụng cây Merkle cho phép kiểm tra nhanh chóng và đơn giản xem liệu một giao dịch cụ thể có được bao gồm trong tập hợp hay không.

![](https://images.viblo.asia/67357fa1-8eb7-4fa5-8026-80ebaac6c14c.png)

Cây Merkle có thể được tải xuống tại một thời điểm và tính toàn vẹn của mỗi nhánh có thể được xác minh ngay lập tức, ngay cả khi phần còn lại của cây chưa có sẵn. Điều này là thuận lợi vì các tệp có thể được chia thành các khối dữ liệu rất nhỏ, do đó chỉ các khối nhỏ cần được tải xuống lại nếu phiên bản gốc bị hỏng.

# Merkle Tree được sử dụng trong blockchain như thế nào?
Sử dụng Merkle tree có thể giảm đáng kể lượng dữ liệu mà cơ quan đáng tin cậy phải duy trì cho mục đích xác minh. Nó phân tách xác nhận dữ liệu từ chính dữ liệu. Cây Merkle có thể được lưu trữ tại cục bộ hoặc trên hệ thống phân tán.

**Cây Merkle có 3 lợi ích chính:**

* Cây Merkle cung cấp một phương tiện để chứng minh tính toàn vẹn và hợp lệ của dữ liệu
* Cây Merkle đòi hỏi ít bộ nhớ hoặc dung lượng ổ đĩa vì các bằng chứng được tính toán dễ dàng và nhanh chóng
* Bằng chứng và quản lý của nó chỉ yêu cầu một lượng nhỏ thông tin được truyền qua mạng


Khả năng chứng minh rằng một bản ghi là đầy đủ và nhất quán là điều cần thiết cho công nghệ blockchain và khái niệm sổ cái chung. Cây Merkle giúp xác minh rằng các phiên bản sau của nhật ký bao gồm mọi thứ từ phiên bản cũ hơn và tất cả dữ liệu được ghi lại và trình bày theo thứ tự thời gian. Chứng minh rằng một bản ghi là nhất quán yêu cầu cho thấy rằng không có bản ghi trước nào được thêm vào, thay đổi hoặc giả mạo và bản ghi đó chưa bao giờ được phân nhánh hoặc rẽ nhánh.

Cây Merkle mang lại lợi ích cho người khai thác và người dùng trên blockchain. Một người khai thác có thể tính toán băm, vì người khai thác nhận được các giao dịch từ các đồng nghiệp. Một người dùng có thể xác minh các phần của các khối riêng lẻ và có thể kiểm tra các giao dịch riêng lẻ bằng cách sử dụng băm của các nhánh khác của cây.

## Xác minh thanh toán đơn giản (SPV)

Xác minh thanh toán đơn giản (SPV) là một phương thức xác minh nếu các giao dịch cụ thể được bao gồm trong một khối mà không tải xuống toàn bộ khối. Cây Merkle được sử dụng rộng rãi bởi các nút SPV.

Các nút SPV không có dữ liệu từ tất cả các giao dịch trong một khối. Họ chỉ tải về tiêu đề khối. Cây Merkle cho phép các nút SPV trên blockchain xác minh các giao dịch trong một khối mà không tải xuống tất cả các giao dịch trong một khối. Phương pháp này hiện đang được sử dụng bởi một số ứng dụng khách Bitcoin.

Kết luận
Cây Merkel rất quan trọng đối với các blockchain và cho phép chúng hoạt động hiệu quả cùng với việc duy trì tính toàn vẹn giao dịch. Blockchains, cơ sở dữ liệu và mạng trên toàn thế giới sử dụng cây Merkle để phối hợp nhanh chóng và hiệu quả các bản ghi trên nhiều máy tính. Merkle Tree làm cho blockchain an toàn và hiệu quả.