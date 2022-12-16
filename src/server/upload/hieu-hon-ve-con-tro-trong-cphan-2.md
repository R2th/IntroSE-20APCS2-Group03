### Hiểu về địa chỉ trong bộ nhớ

### 1. Bộ nhớ(RAM)
Đầu tiên bạn hãy xem qua hình này 

![image.png](https://images.viblo.asia/fc1fa424-a254-40d0-a2ba-d77ea92e238c.png)

Đó là cách trình bày một RAM trong máy tính của bạn.

Hãy đọc kĩ từng dòng trong biểu đồ. Dòng đầu tiên tương ứng với "ô" đầu tiên của bộ nhớ (RAM).

Mỗi ô tương ứng với một số, là địa chỉ của nó (address)! Bộ nhớ chứa một số lượng lớn địa chỉ,
bắt đầu từ địa chỉ 0 đến một số nào đó (một số vô cùng lớn, số lượng địa chỉ phụ thuộc vào dung
lượng bộ nhớ được lắp đặt trong từng máy tính).

Mỗi địa chỉ có thể chứa một số. Một và chỉ một. Ta không thể nào chứa 2 số trong cùng một địa
chỉ.

Bộ nhớ của bạn tạo ra chỉ để chứa những con số. Nó không thể chứa chữ cái cũng như đoạn văn.
Để giải quyết vấn đề này, người ta tạo ra những bảng mã chứa trong đó số và chữ cái tương ứng.

Ví dụ "Số 89 tương ứng với chữ cái Y". Vấn đề này sẽ được giải thích rõ hơn ở bài học sau. Bây
giờ, chúng ta chỉ tập trung vào cách hoạt động của bộ nhớ.

### 2.Địa chỉ và giá trị
Khi bạn tạo ra một biến số tuoi type int, lấy ví dụ:

```C
int tuoi = 10;
```
... chương trình của bạn sẽ yêu cầu hệ điều hành (ví dụ là Windows) quyền sử dụng một ít bộ nhớ.
Hệ điều hành sẽ trả lời bằng cách đưa ra địa chỉ bộ nhớ được phép chứa con số bạn cần.
Đây cũng là một trong những nhiệm vụ chính của hệ điều hành:
Khi chúng ta yêu cầu mượn bộ nhớ cho chương trình. Máy tính giống như ông chủ, nó điều hành
từng chương trình và kiểm tra xem chúng có quyền sử dụng bộ nhớ tại vị trí được cấp hay không.
Và đây là một trong những nguyên nhân khiến máy tính bạn bị đơ: Nếu chương trình đột nhiên
hoạt động trên một vùng bộ nhớ không cho phép. Hệ điều hành (OS) sẽ từ chối và dừng ngay
chương trình, giống như nói với bạn "Mày nghĩ ai là chủ ở đây?" Người dùng, sẽ nhìn thấy một
cửa sổ hiện lên thông báo dạng "Chương trình bị dừng lại do thực hiện một công việc không được
phép".

Quay trở lại với biến số tuoi. Giá trị 10 được đưa vào một vị trí nào đó trong bộ nhớ, lấy ví dụ nó
được đưa vào địa chỉ 4655. Và điều xảy ra ở đây là (nhiệm vụ của compiler), từ tuoi trong chương
trình sẽ thay thế bằng địa chỉ 4655 khi được chạy.
Việc đó giống như, mỗi khi bạn điền vào tuoi trong code source, chúng sẽ được chuyển thành
4655, và máy tính sẽ biết được cần đến địa chỉ nào trong bộ nhớ để lấy giá trị . Và ngay sau đó,
máy tính xem giá trị được chứa trong địa chỉ 4655 và trả lời chúng ta "biến số tuoi co giá trị là
10"!

**Và để lấy giá trị một biến số, đơn giản chỉ cần đánh tên của biến số đó vào code source. Nếu ta
muốn hiển thị tuổi, ta có thể sử dụng function printf**:
```C
printf ("Bien so tuoi co gia tri la : %d", tuoi);
```

Bạn đã biết cách hiển thị giá trị của một biến số, nhưng bạn có biết chúng ta cũng có thể ***hiển thị
địa chỉ của biến số* đó?**

Để hiển thị địa chỉ của một biến số, chúng ta cần sử dụng kí hiệu ***%p*** (p ở đây viết tắt của từ
pointer) trong printf. Mặt khác, chúng ta phải đưa vào printf ***địa chỉ của biến số đó*** và để làm việc
này, bạn cần phải đặt kí hiệu ***&*** trước biến số đó (tuoi), giống như cách tôi hướng dẫn bạn sử dụng
scanf, xem code sau:

```C
printf ("Dia chi cua bien so tuoi la %p", &tuoi);
```

![image.png](https://images.viblo.asia/97c596e4-df70-40dd-a9a7-d7c4ee782fca.png)

Đó là *địa chỉ* của biến số tuoi trong thời điểm chương trình hoạt động. Vâng, ***0023FF74*** là một số,
nó đơn giản chỉ được viết trên hệ hexadecimal (thập lục phân), thay vì hệ decimal (thập phân) mà
chúng ta thường sử dụng. Nếu bạn thay kí hiệu %p thành %d, bạn sẽ nhận được một số thập phân
mà bạn biết.

Nếu bạn chạy chương trình này trên máy tính của bạn, địa chỉ sẽ khác hoàn toàn. Tất cả phụ
thuộc vào phần trống có trong bộ nhớ, chương trình bạn đang dùng,... Hoàn toàn không có khả
năng báo trước địa chỉ nào của biến số sẽ được cấp. Nếu bạn thử chạy chương trình liên tục nhiều
lần, địa chỉ có thể sẽ không đổi trong thời điểm đó. Nhưng nếu bạn khởi động lại máy tính, chương
trình chắc chắn sẽ hiển thị một giá trị khác.
Vậy chúng ta sẽ làm gì với tất cả những thứ đó?
Tôi cần bạn nẵm vững những điều sau:

 ***tuoi:*** tượng trưng cho giá trị của biến số.

 ***&tuoi:*** tượng trưng cho địa chỉ của biến số.

Với ***tuoi***, máy tính sẽ đọc và gửi lại giá trị của biến số.

Với ***&tuoi***, máy tính sẽ nói với chúng ta ở địa chỉ nào sẽ tìm thấy biến số.




-----

Ở bài viết này chúng ta đã học về ý nghĩa con trỏ trong với bộ nhớ ở bài viết tiếp theo mình sẽ giải thích kỹ hơn về cách sử dụng con trỏ trong C n