*Biểu thức chính quy* (Regular Expression) dùng để tìm một phần của chuỗi thông qua một pattern, hay còn gọi là một mẫu.

Trong Javascript thì biểu thức chính quy được tạo bằng cách* new RegExp()* hoặc là đặt giữa hai dấu gạch chéo* //* và có những methods đi theo chúng là *replace*, *test* and *match*.
Hãy cùng xem qua hình sau để hiểu hơn nhé.

![](https://images.viblo.asia/b14fbe23-ed62-4e3b-a391-9ad2b705c53f.png)

Ta có thể tìm chuỗi các kí tự, hoặc đặt nhiều ký tự một lúc trong dấu *[]*, hoặc dùng dấu gạch ngang *-* để tìm trong một khoảng các kí tự.

![](https://images.viblo.asia/999d9c4f-cff2-4e4e-b711-8cbc615f08bb.png)


Thêm flag vào cuối regex để thay đổi cách hoạt động của nó.
Trong Javascript, có những flag sau:

**i = case insensitive** : không phân biệt hoa thuờng

**g = global**: tìm tất cả thay vì tìm một

**m = multi line**


![](https://images.viblo.asia/66012f19-5ac6-44e3-a164-8babffed5139.png)


Sử dụng **^** ở đầu pattern để hiểu rằng "bắt đầu chuỗi string".

Dùng **$** ở cuối pattern để thêm điều kiện "cuối chuỗi".

![](https://images.viblo.asia/096557ed-0185-4759-826f-065aee3dba9f.png)

Sử dụng willcards và những kí tự đặt biệt.

**.** = bất kì kí tự nào ngoại trừ line break

**\d** = kí tự số
**\D** = không phải kí tự số

**\s** = white space
**\S** = any NON white space

**\n**  = new line

Cùng xem qua ảnh  để hiểu hơn

![](https://images.viblo.asia/3e88abd1-12ef-4a2d-a22e-fc02230fd72d.png)

Chỉ khớp một số lượng nhất định của các ký tự hoặc nhóm với số lượng

![](https://images.viblo.asia/80f4d018-6ade-4f61-8946-80d511ff55da.png)

Sử dụng parens () để chụp trong một nhóm
*match* sẽ trả lại đầy đủ cộng với các nhóm, trừ khi bạn sử dụng cờ g.

 Sử dụng toán tử  **|** bên trong parens **()** để chỉ định nhóm đó khớp với cái gì.
 
**|** = hoặc

![](https://images.viblo.asia/13446bc3-0f27-421b-8123-21fe2fb71ffb.png)


Để *match* kí tự đặc biệt, chúng ta phải sử dụng \

Những kí tự đặc biệt trong Javascript bao gồm: ^ $ \ . * + ? ( ) [ ] { } |


![](https://images.viblo.asia/e08f0a2e-dd13-4bd2-b0aa-6985f8e000b1.png)



Regex có thể được sử dụng để tìm và khớp tất cả các loại, từ url đến tên tệp.

TUY NHIÊN! hãy cẩn thận nếu bạn cố gắng sử dụng regex cho các tác vụ thực sự phức tạp, chẳng hạn như phân tích cú pháp email (thực sự khó hiểu, rất nhanh) hoặc HTML (không phải là ngôn ngữ thông thường và do đó không thể được phân tách hoàn toàn bằng biểu thức chính quy)
Cám ơn các  bạn đã đọc bài viết này.