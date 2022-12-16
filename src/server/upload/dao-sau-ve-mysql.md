Hôm nay tình cờ đọc được 1 quyển sách về MySQL thấy khá hay nên muốn chia sẻ lại với mọi người những cái mình đã học được.

Về MySQL thì chắc ai cũng đã từng dùng hay đang dùng nó cho một số dự án từ vài người dùng đến hàng triệu người dùng. Từ các website về blog cho đến các trang thương mại điện tử, các server dành cho game...

Với hệ thống nhỏ nhỏ thì chắc chẳng cần quan tâm gì nhiều đến cách hoạt động của nó làm gì cho mệt. Nhưng mà khi hệ thống dã lớn lên, phải xử lí hàng nghìn, hàng triệu queries/s thì việc hiểu rõ được cơ chế hoạt động cũng nó là điều vô cùng quan trọng.

Việc master được tất tần tật về MySQL thì vô cùng khó, nhưng mà hiểu được cái gì đó sâu sâu 1 chút thì cũng giúp chúng ta hơn hẳn được nhiều người rồi.

Nên hôm nay mình sẽ giới thiệu đến mọi người 1 số vấn đề mà mọi người đang chưa hiểu hoặc hiểu nhầm về MySQL nhé.

**Mục tiêu bài viết:**  
・Hiểu được chức năng bên trong MySQL  
・Biết cách thiết kế dữ liệu cho tối ưu nhất  

**Đối tượng hướng đến:**  
・Người đã từng làm việc với MySQL  
・Người muốn tối ưu hiệu năng MySQL  

## 1. Đơn vị I/O

Khi dùng MySQL thì đa số là thao tác trên các record(bản ghi) của MySQL. Nên đa số chúng ta đều nghĩ là dữ liệu được xử lí theo đơn vị record. Nhưng thực tế MySQL lại thao tác dữ liệu theo từng đơn vị page (trang) có kích thước được định nghĩa trước.

Để dễ hiểu thì chúng ta cùng xem ảnh bên dưới:

![](https://images.viblo.asia/d0defadc-88af-4c11-98ff-dbad65a0375a.png)


Nhìn vào ảnh bên trên thì mình nghĩ mọi người có thể hiểu được. Thì đơn vị I/0 nhỏ nhất trong MySQL không phải là record mà là page nhé.

Với MySQL thì kích thước của page default là 16KB. (Ở đây mọi người nên chú ý 1 điểm là nếu muốn change size của page thì chúng ta phải xoá instance đi và tạo lại thì mới change được, còn chỉ start stop mysql thì không thể change được nhé)

Chính vì lí do đó mà thằng RDS của AWS không có option change được size của page.

Vậy đến đây đa số cũng biết được đơn vị cấu tạo nhỏ nhất của I/O trong MySQL là gì rồi đúng không ak? 

Vậy biết được cái này để làm gì? Thì đi đến phần tiếp theo nhá.

## 2. Ảnh hưởng to lớn của AUTO_INCREMENT

Việc setting primary key (khoá chính) với AUTO_INCREMENT thì chắc ai cũng biết rồi. Nhưng mà việc setting này có ảnh hưởng to lớn đến hiệu năng như thế nào thì chúng ta cùng đi xem 2 ví dụ dưới đây nhé.

Để dễ hiểu, mình sẽ lấy 1 ví dụ trong game nhé. Đó là muốn tạo ra 1 bảng lưu giữ thông tin nhân vật(character) của người dùng.

Ví dụ 1:
```bash
CREATE TABLE user_characters {
  user_id INT NOT NULL DEFAULT 0,
  user_character_id INT NOT NULL DEFAULT 0,
  character_id INT NOT NULL DEFAULT 0,
  PRIMARY_KEY (user_id, user_character_id),
}
```

Ví dụ 2:
```bash
CREATE TABLE user_characters {
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL DEFAULT 0,
  user_character_id INT NOT NULL DEFAULT 0,
  character_id INT NOT NULL DEFAULT 0,
}
```

Khi chúng ta muốn lấy thông tin nhân vật mà người dùng có ID =4 1234 đang giữ thì sẽ thực hiện câu SQL như sau:
```
SELECT * FROM user_characters WHERE user_id = 41234
```

Vậy hiệu năng khi thực hiện câu SQL này trên 2 ví dụ trên khác nhau thế nào?

Cụ thể như ảnh bên dưới:
![](https://images.viblo.asia/22e54044-6ccd-4072-b44e-2a499a8799b0.png)


Với ví dụ 1, thì user_id được gắn là khoá chính. Nên dữ liệu sẽ được sắp xếp theo thứ tự của user_id. Do đó mà thông tin lấy được từ user_characters khả năng cao sẽ được nằm trong 1 page. Mà nếu dữ liệu được nằm trong 1 page thì chắc chắn I/O sẽ được giảm mạnh, và hiệu suất query sẽ tốt hơn.

Nhưng với ví dụ 2 thì hoàn toàn khác. Lúc này khoá chính của chúng ta là id. Nên việc dữ liệu tất cả nhân vật mà user_id = 41234 đang nắm giữ khả năng cao sẽ nằm rải rác trên nhiều page khác nhau. Kết quả là I/O sẽ tăng và hiệu năng query sẽ giảm đi rất là nhiều.

Chính vì vậy, với nhiều dữ liệu sử dụng đồng thời như ví dụ trên thì chúng ta cố gắng sắp xếp nó cùng vào 1 page nhé.

## Kết luận

Hôm nay thế thôi nhỉ. Để hôm khác mình sẽ bổ sung thêm(Tại ngại vẽ hình). Hi vọng qua bài này sẽ giúp ích mọi người trong quá trình thiết kế cơ sở dữ liệu sao cho hiệu năng tốt nhất.

Chúc mọi người cuối tuần vui vẻ.

==============

Để nhận thông báo khi có bài viết mới nhất thì các bạn có thể like fanpage của mình ở bên dưới nhé:

→→→ [Nghệ thuật Coding Fanpage Facebook](https://www.facebook.com/669339543503374)