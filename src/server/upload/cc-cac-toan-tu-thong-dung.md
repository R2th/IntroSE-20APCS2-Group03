## Các toán tử thông dụng
Nói đến toán tử trong C/C++, bạn sẽ nghĩ ngay đến những toán tử nào?<br>
Các loại toán tử trong ngôn ngữ lập trình là cực kì đa dạng. Chúng ta sẽ cùng điểm qua một số toán tử thông dụng nhất.<br>
#### Toán tử gán
Đây là toán tử thông dụng nhất, được sử dụng để gán một giá trị nào đó cho biến, hoặc gán giá trị biến này cho biến khác<br>
Ví dụ: `int a; a=5;` - gán giá trị 5 cho biến a.<br>
`char x = 'I'; char y; y = x;`  -  gán giá trị có trong biến x cho biến y.<br>
*Note: cần phân biệt giữa toán tử  gán "=" với dấu "=" mà ta sẽ tìm hiểu ở phấn Toán tử logic bên dưới.*<br>
#### Toán tử số học
Phần này không cần nói quá nhiều, đây là các toán tử cộng( + ), trừ( - ), nhân( * ), chia nguyên( / ) và chia lấy dư( % ).<br>
*Note: phép chia lấy dư chỉ áp dụng đối với số nguyên.*<br>
Ví dụ:<br>
`cout << 5 / 2;` Kết quả sẽ là 2<br>
`cout << 5 % 2;` Kết quả sẽ là 1<br>
#### Toán tử quan hệ
*Toán tử quan hệ* dùng để có thể so sánh hai biểu thức với nhau. Theo chuẩn ANSI-C++ thì *giá trị* của thao tác quan hệ chỉ có thể là *giá trị logic* - chúng chỉ có thể có giá trị *true* hoặc *false*, tuỳ theo biểu thức kết quả là đúng hay sai.<br>

|Toán tử | Tên gọi |
| -------- | -------- |
| ==     | Bằng     | 
| !=     | Khác     |
| >     | Lớn hơn |
| <     | Nhỏ hơn     |
| >=     |Lớn hơn hoặc bằng     |
| <=     | Nhỏ hơn hoặc bằng     |
<br>*Note: đừng quên dấu "=" trong phép so sánh Bằng nhé, nếu không nó sẽ trở thành phép gán. Đây là một lỗi sai rất cơ bản của chúng ta cái thời chân ướt chân ráo bước vào thế giới lập trình :wink:*<br>
#### Toán tử logic
Đây đây, chính là phần mà kết hợp với toán tử quan hệ để ra giá trị *true* hoặc *false* đây.<br>
1. Toán tử !<br> 
Tương đương với toán tử logic NOT, nó chỉ có một đối số ở phía bên phải và việc duy nhất mà nó làm là đổi ngược giá trị của đối số từ true sang false hoặc ngược lại.<br>
 Ví dụ:<br>
 ` !(1==0) ` sẽ trả về *true*
 ` !(4==4) ` sẽ trả về *false*
 <br>
 2. Toán tử &&<br>
 -Toán tử này trả về giá trị *true* trong điều kiện duy nhất là cả 2 vế của nó đều *true*. <br>
 -Chỉ cần có giá trị *false* xuất hiện ở 1 trong 2 vế là nó sẽ trả vê giá trị *false*.<br>
 Ví dụ:<br>
 Phép toán ` (5>0 && 5==0) ` sẽ trả về giá trị *false*.<br>
 Phép toán ` (10!=0 && 10>=5) ` sẽ trả về giá trị *true*<br>
 *Note: Nếu muốn làm phép so sánh theo kiểu ` a < x < b `    0<x<5 chẳng hạn.
 Nếu bạn viết ` (0<x<5) ` thì nó sẽ bị lỗi, bạn phải viết như sau: ` (0<x && x<5) ` nó mới trả về giá trị cho bạn. Đây cũng là một lỗi rất hay gặp.*<br>
 3. Toán tử ||.
 -Thằng này thì khá dễ tính, chỉ cần có giá trị *true* xuất hiện trong biểu thức là nó sẽ trả về *true*.<br>
 -Nó chỉ trả về giá trị *false* khi cả 2 vế cùng mang giá trị *false*.<br>
 #### Toán tử tăng giảm
 Cái này do mình tự đặt<br>
 Đó là 2 toán tử ` ++ và -- ` rất hay được sử dụng trong cấu trúc vòng lặp.<br>
 Khi dùng toán tử ++, biến hoặc giá trị sẽ tăng lên 1 đơn vị.<br>
  Khi dùng toán tử -- biến hoặc giá trị sẽ giảm lên 1 đơn vị.<br>
  Ví dụ:<br>
  ```
  int x = 2;
  x++;
  cout << x;
  ```
  Lúc này, x bằng 3.<br>
  *Note: ta có thể đặt toán tử này ở trước hoặc sau của toán hạng đều được.*<br>
 Ví dụ: ` ++x hoặc x++ ` đều được chấp nhận, nhưng cách thực hiện của chúng sẽ khác nhau 1 chút, tương tự với toán tử --<br>
 #### Toán tử phức hợp
 Không có gì xa lạ, chính là các toán tử ` +=, -=, *=, /= ` mà ta hay dùng trong các bài tập trên lớp:sweat_smile:. ngoài ra còn có các toán tử khác như ` %=, >>=, <<=, &=, ^=, |= ` nhưng vì ít được sử dụng nên mình sẽ chỉ tập trung vào 4 toán tử cơ bản.<br>
 Khi ta có phép toán thuộc dạng ` a = a + (một giá trị không đổi); ` thì ta sử dụng toán tử phức hợp.<br>
 Ví dụ:<br>
 ` x = x + 5; ` và ` x += 5; ` là tương đương nhau.<br>
 ` z = z - 1; ` và ` z -= 1; ` là tương đương nhau.<br>
 
 **Tất cả những toán tử chúng ta vừa đọc qua là các toán tử 2 ngôi, tức là có 2 toán hạng tham gia trong biểu thức**<br>
 #### Toán tử điều kiện (3 ngôi)
 Toán tử này được sử dụng như một dạng viết tắt của cấu trúc điều khiển `if-else`. Cú pháp như sau:<br>
 ```
 (điều kiện) ? lệnh 1  :  lệnh 2;
 ```
Nếu điều kiện trả về *true* thì thực hiện câu lệnh 1, trả về *false* thì thực hiện câu lệnh 2.<br>
## Kết
Chúng ta đã review qua các toán tử thông dụng trong ngôn ngữ lập trình C/C++, không cần học thuộc nhưng việc hiểu nguyên tắc hoạt động của chúng ta cần thiết, nó là nền tảng để chúng ta tiến đến các kiến thức nâng cao.<br>
Chúc các bạn học tốt :heart: