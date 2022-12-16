## Bản chất của con trỏ
Con trỏ là một loại biến đặc biệt mà chỉ có ở họ ngôn ngữ C/C++.<br>
Mỗi biến trong một chương trình đều có 2 thuộc tính cơ bản: địa chỉ và giá trị. Địa chỉ 1 dãy kí tự được viết ở hệ Hexa nhằm giúp chương trình kiểm soát biến. Giá trị là thông tin của biến.<br>
Còn con trỏ là một loại biến đặc biệt, nó chứa tới 3 thuộc tính: địa chỉ , giá trị và miền giá trị <br>
Con trỏ là một biến mà *giá trị* của nó là *địa chỉ* của một biến khác.<br>
Nghĩa là sao? Biến thông thường sẽ như ví dụ sau: 
```
int n = 10;
char c='H';
```
Giá trị của biến n là 10, giá trị của biến c là 'H'. Còn con trỏ, giá trị của nó có dạng như thế nào?<br>
Ví dụ , ta khởi tạo 1 biến `int a=1;`, kết quả sẽ như sau:<br>
![](https://images.viblo.asia/a25df9ef-d6fa-4377-b480-e5ddef728d4f.png)<br>
Trong đó, & là toán tử để lấy địa chỉ của một biến.<br><br>
Bây giờ, ta khởi tạo một biến con trỏ aPtr và gán giá trị cho nó là biến a, kết quả như sau:<br>
![](https://images.viblo.asia/1a7832b4-c0ed-4be2-845f-a8c2e577cd8f.png)<br>
Trong đó, toán tử * là toán tử để lấy giá trị của một biến.<br>
Bạn có để ý rằng, miền giá trị của con trỏ aPtr chính là địa chỉ của biến a không?<br>
Khi ta gán địa chỉ của một biến cho một con trỏ, tức là ta đã cho phép con trỏ dùng chung ô nhớ của biến đó. Và lúc đó mọi thay đổi trên biến sẽ dẫn đến thay đổi trên con trỏ và ngược lại. Giống như lúc đo có một sợi dây liên kết giữa chúng vậy.<br>
Với phép khởi tạo và gán `int *aPtr = &a;` trên, ta nói: con trỏ *aPtr* đang trỏ đến biến *a*;<br>
## Sử dụng con trỏ
Thông thường, sau khi khai báo một con trỏ, ta phải gán cho nó một địa chỉ của biến nào đó thì mới sử dụng được. Khi ấy con trỏ mới bắt đầu có hiệu lực, nếu không thì chỉ làm cảnh thôi:sweat_smile:<br>
Sau khi gán địa chỉ của biến khác cho con trỏ, nó sẽ dùng ké ô nhớ của biến kia (có thể truy xuất dữ liệu, tăng, giảm giá trị biến,..). Giống như khi bạn và người yêu bạn về chung một nhà ấy, đi chơi thì cùng đi, ăn thì cùng ăn...:joy:<br>
*Note: có thể gán con trỏ cho con trỏ, khi ấy 1 sợi dây liên kết giữa chúng hình thành.*<br>
Một câu hỏi rất được quan tâm là: vậy thì ta cứ phải gán cho con trỏ một địa chỉ thì mới dùng được à, mà cứ đi dùng ké nhà người khác mãi sao:roll_eyes:? Có cách nào khác để sử dụng cũng như khẳng định vị thế cho con trỏ không?<br>
Và câu trả lời là...Có. Lúc này, ta cấp phát bộ nhớ động cho nó. Bằng cách này, con trỏ sẽ được khởi tạo một vùng nhớ sẵn, thay vì phải đi dùng ké.<br>
+ Con trỏ cấp phát động<br>
Cú pháp khai báo con trỏ cấp phát động như sau:<br>
  `<kiểu DL> <tên con trỏ> = new <kiểu DL>;`<br>Ví dụ: `int *con_tro = new int;`<br>
  <br>
Lưu ý: Đây là cách khai báo trong C++, trong C sẽ khai báo khác với các hàm realloc, calloc, malloc và phức tạp hơn một chút.<br>
*Note: cách khai báo này rất hay được áp dụng cho mảng.*<br>
Cú pháp: `<kiểu DL> *<tên con trỏ> = new <kiểu DL>;`<br><br>
Hãy xem ví dụ sau:<br>
![](https://images.viblo.asia/59130655-e9d0-4137-96d9-5a007c0d6756.png)<br>

Cách này cực kì có ích khi ta muốn tối ưu hóa hiệu suât của máy tính. Ta chỉ cung cấp số lượng ô nhớ đúng bằng số lượng ta cần. Như hình trên, ta chỉ định cấp phát *n* ô nhớ.<br>
    Cần biết rằng 1 mảng chính là một dãy các phần tử cùng kiểu và **được quản lí bởi 1 con trỏ**. Địa chỉ của phần tử đầu tiên trong mảng chính là địa chỉ của mảng đó.<br>
    ![](https://images.viblo.asia/66f3382c-9c6c-42c6-ac61-c83ca9921a29.png)
    <br>
## Kết
Tóm lại, con trỏ là một biến mà giá trị của nó là địa chỉ của một biến khác. Ta dùng nó để nâng cao hiệu quả sử dụng bộ nhớ và sử dụng một cách linh hoạt.
Vậy là chúng ta hiểu kha khá bản chất của con trỏ rồi. Đây cũng là phần kiến thức mà khá trừu tượng, nhưng dần dần rồi bạn sẽ làm chủ được nó, cố lên!
Có một nguồn học ngôn ngữ C/C++ khá hay, bạn có thể tham khảo tại đây:<br>
[Nguồn 1](https://www.cprogramming.com/)<br>
[Nguồn 2](http://www.cplusplus.com/)<br>
Mong được các bạn đóng góp, bổ sung ý kiến!