Bài viết lấy cảm hứng từ bài viết [Vì sao 0.1 + 0.1 + 0.1 không bằng 0.3?](https://kipalog.com/posts/Vi-sao-0-1---0-1---0-1-khong-bang-0-3) của anh [HVN_FAMILUG](https://kipalog.com/users/HVN_FAMILUG/) và mình cũng muốn note lại tí kiến thức đã học.

---

Dùng Python và nhập dòng dưới đây

`0.1 * 3 == 0.3`

Trong trường hợp bạn không biết, đó là lệnh so sánh hai vế với nhau.

Không lằng nhằng nữa, kết quả dòng trên trả về là `False` hay về trái không bằng vế phải. Hãy thử đổi sang bất kỳ ngôn ngữ nào phổ biến hiện nay, chân lí vẫn giữ nguyên.

Một lần nữa, nếu bạn không biết thì máy tính chỉ thực hiện được các phép toán trên các dãy bit (gọi là nhị phân gì đó).

## Cách chuyển phần thập phân của một số sang dạng nhị phân

Rất đơn giản, chỉ cần **lấy phần thập phân** nhân 2 rồi cứ tiếp tục cho đến khi phần thập phân này bằng 0 thì dừng. For example:

- `0.75 * 2 = 1.5`
- `0.5 * 2  = 1.0`

Sau khi chuyển đổi, kết quả cần tìm là phần nguyên sau các lần nhân (lấy từ trên xuống): 0.11 (không tin cứ Google xem)

Để dễ hình dung hơn, mình lấy thêm một ví dụ nữa với 0.36

- `0.36 * 2 = 0.72`
- `0.72 * 2 = 1.44`
- `0.44 * 2 = 0.88`
- `0.88 * 2 = 1.76`
- `0.76 * 2 = 1.52`
- `0.52 * 2 = 1.04`

À thôi mỏi tay rồi. Cứ tiếp tục làm như thế thì sau **n** bước nữa ta sẽ có kết quả mong muốn, **n** ở ví dụ trên có thể là vài chục, vài trăm hoặc đen nhất thì **n** có thể tiến đến dương vô cùng.

## Biểu diễn số thực trên máy tính

Mỗi thanh ghi tạm thời trong máy tính đều là hữu hạn. Cụ thể với float32 thì các bit được phân như sau:

| 1 bit đầu | 8 bit tiếp theo | 23 bit còn lại |
| --------- | --------------- | -------------- |
| dấu       | phần nguyên     | phần thập phân |

Đồng nghĩa với việc máy tính chỉ biểu diễn được 23 bit sau dấu phẩy. Và khi **n** trên kia vượt quá con số này thì phần đằng sau không được máy tính lưu trữ. Đó là lí do mà máy **không thể biểu diễn chính xác** một số thực có phần sau dấu phẩy dài hoặc là tuần hoàn.

## Sai số

Sai số là độ chênh lệch của giá trị sau tính toán và giá trị thực.

Có 3 nguyên nhân dẫn đến sai số phổ biến:
- **Do làm tròn**: cái này học từ cấp hai rồi, không nói nữa.

- **Do mất chữ số có nghĩa:** là lấy hai thằng có giá trị xấp xỉ bằng nhau rồi trừ đi nhau, kết quả = không phẩy en nờ số không và zed (0. 00..0z). Con số cực nhỏ này có thể bị máy tính đá ra rìa và biến thành số 0 tròn trĩnh.

- **Do cộng với một số rất nhỏ:** ví dụ như trường hợp lấy vài trăm hoặc vài tỉ cộng với 0. 00..0z thì vẫn nhận được vài trăm hoặc vài tỉ không hơn (tiếp tục bị đá).

Khá là may vì sai số này rất nhỏ nên không ảnh hưởng nhiều đến kết quả cuối cùng, nhưng cộng dồn các sai số vào thì hơi căng :). Đó là lí do số thực (hay kiểu float) không được dùng trong các ngành tài chính ngân hàng.

> Đến đây bạn đã có thể trả lời được câu hỏi đầu bài viết. Không có gì đảm bảo rằng tất cả các số thực được biểu diễn exactly trong máy tính.