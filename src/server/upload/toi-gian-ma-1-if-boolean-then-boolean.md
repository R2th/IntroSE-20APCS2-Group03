Trong loạt bài này, chúng ta sẽ xem các tình trạng dư thừa phổ biến khiến mã của chúng ta trở nên phức tạp không cần thiết và khó đọc hơn, và chúng ta sẽ tìm hiểu cách tránh gặp phải.

Chúng ta có thể tóm tắt các quy tắc chung của mã tối giản trong hai nguyên tắc đơn giản:

* Giữ cho mã của bạn rõ ràng và dễ đọc.
* Để không vi phạm nguyên tắc đầu tiên: hãy loại bỏ mọi thứ dư thừa.

Để đạt được điều này, bạn nên:
* Nâng cao kiến thức của bạn về lôgic.
* Hiểu sâu hơn về ngôn ngữ cụ thể mà bạn đang viết mã.

Thêm vào đó: Hãy quan sát và học hỏi từ những người có chuyên môn. Tạo thói quen kiểm tra giải pháp của người khác.  Hoàn toàn không có gì sai trong việc đồng hóa các tính năng của phong cách mã hóa của người khác, đặc biệt nếu bạn đang trong quá trình học hỏi.

***Mẹo**: Sử dụng câu lệnh `if` để trả về **boolean** hoặc đặt một biến thành **boolean** là không cần thiết.*
## Ví dụ
Một hàm trả về `true` nếu tuổi của một người từ 18 trở lên và ngược lại trả về `false`, có thể được viết là:
```
def legal_age(age):
  if age >= 18:
    return true
  else:
    return false
```
Lưu ý rằng `age> = 18` đã cung cấp cho chúng ta một boolean (`true` hoặc `false`).  Điều này có nghĩa là hàm có thể được viết theo cách đơn giản và gọn gàng hơn nhiều:
```
def legal_age(age):
  return age >= 18
```

## Luyện tập
Viết một hàm trả về `true` nếu số nguyên đã cho là **chẵn** và `false` nếu là số **lẻ**.

Hãy comment code bên dưới nhé !!!
## Lưu ý:
Viết sao cho **dễ đọc** thực sự là một khái niệm chủ quan.  Chúng ta cùng thảo luận nhé!  Hãy để lại ý kiến của bạn bên dưới nhé.