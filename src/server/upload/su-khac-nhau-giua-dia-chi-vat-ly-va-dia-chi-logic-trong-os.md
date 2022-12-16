![](https://images.viblo.asia/d548ab70-21c2-4e4b-94a0-6c2cfaab9737.jpg)

Địa chỉ xác định duy nhất một vị trí trong bộ nhớ. Chúng ta có hai loại địa chỉ là địa chỉ logic và địa chỉ vật lý. Địa chỉ logic là một địa chỉ ảo và người dùng có thể xem được. Người dùng không thể xem trực tiếp địa chỉ vật lý. Địa chỉ logic được sử dụng giống như một tham chiếu, để truy cập địa chỉ vật lý.

Sự khác biệt cơ bản giữa địa chỉ logic và vật lý là địa chỉ logic được tạo ra bởi CPU trong quá trình thực thi chương trình trong khi địa chỉ vật lý đề cập đến một vị trí trong đơn vị bộ nhớ.

Có một số khác biệt khác giữa địa chỉ logic và địa chỉ vật lý.

## Biểu đồ so sánh

| Tiêu chí | Địa chỉ logic | Địa chỉ vật lý |
| -------- | -------- | -------- |
| Định nghĩa     | là địa chỉ ảo do CPU tạo ra    | là một vị trí trong một đơn vị bộ nhớ.     |
| Không gian địa chỉ     | Tập hợp tất cả các địa chỉ logic được tạo bởi CPU tham chiếu đến một chương trình    | Tập hợp tất cả các địa chỉ vật lý được ánh xạ tới các địa chỉ logic tương ứng     |
| Hiển thị     | Người dùng có thể xem địa chỉ logic của một chương trình   | Người dùng không bao giờ có thể xem địa chỉ vật lý của chương trình     |
| Truy cập     | Người dùng sử dụng địa chỉ logic để truy cập địa chỉ vật lý    | Người dùng không thể truy cập trực tiếp vào địa chỉ vật lý     |
| Generation     | Địa chỉ logic được tạo bởi CPU    | Địa chỉ vật lý được tính bằng MMU     |

## Định nghĩa địa chỉ logic

Địa chỉ do CPU tạo ra trong khi chương trình đang chạy được gọi là địa chỉ logic. Địa chỉ logic là ảo vì nó không tồn tại trên thực tế. Do đó, nó còn được gọi là địa chỉ ảo. Địa chỉ này được sử dụng làm tham chiếu để truy cập vị trí bộ nhớ vật lý. Tập hợp tất cả các địa chỉ logic được tạo ra bởi một phối cảnh chương trình được gọi là Không gian địa chỉ logic.

Địa chỉ logic được ánh xạ tới địa chỉ vật lý tương ứng của nó bởi một thiết bị phần cứng được gọi là Bộ quản lý bộ nhớ (MMU). Các phương pháp ràng buộc địa chỉ được sử dụng bởi MMU tạo ra địa chỉ vật lý và logic giống hệt nhau trong thời gian biên dịch và thời gian tải. Tuy nhiên, trong khi thời gian chạy, các phương thức ràng buộc địa chỉ tạo ra địa chỉ vật lý và logic khác nhau.

## Định nghĩa địa chỉ vật lý

Địa chỉ vật lý xác định một vị trí thực trong bộ nhớ. MMU tính toán địa chỉ vật lý cho địa chỉ logic tương ứng. MMU cũng sử dụng địa chỉ vật lý tính toán địa chỉ logic. Người dùng không bao giờ tương tác với địa chỉ thực. Thay vào đó, địa chỉ vật lý được người dùng truy cập bằng địa chỉ logic tương ứng của nó.

Chương trình người dùng tạo ra địa chỉ logic và nghĩ rằng chương trình đang chạy trong địa chỉ logic này. Nhưng chương trình cần bộ nhớ vật lý để thực thi. Do đó, địa chỉ logic phải được ánh xạ tới địa chỉ vật lý trước khi chúng được sử dụng.

Địa chỉ logic được ánh xạ tới địa chỉ vật lý bằng phần cứng gọi là Bộ quản lý bộ nhớ. Tập hợp tất cả các địa chỉ vật lý tương ứng với các địa chỉ lôgic trong không gian địa chỉ lôgic được gọi là Không gian địa chỉ vật lý.

## Tổng kết

Địa chỉ logic là một tham chiếu được sử dụng để truy cập địa chỉ vật lý. Người dùng có thể truy cập địa chỉ vật lý trong bộ nhớ bằng địa chỉ logic này.

REF: https://techdifferences.com/difference-between-logical-and-physical-address.html