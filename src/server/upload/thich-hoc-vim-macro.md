{@embed: https://www.youtube.com/watch?v=0HCJx7CojO0}
# Mở bài
Bạn đang phải làm một công việc buồn tẻ lặp đi lặp lại hàng ngày? Bạn đang buồn chán, bạn đang ngán ngẫm? Bạn không thể tự cứu rỗi cuộc đời mình? Nhưng Vim thì có, đến với macro, những công việc buồn tẻ lặp đi lặp lại sẽ hết buồn tẻ mà sẽ trở nên buồn đôi buồn đôi :D.
# Thân bài
Để sử dụng macro để ghi lại những hành động mà chúng ta thường xuyên làm thì chúng ta sẽ bắt đầu bằng cách nhấn phím `q` sau đó là một phím bất kì từ a đến z. Điều này có nghĩa là bạn đã khởi động và bắt đầu ghi những hành động của mình vào một macro có tên là cái kí tự bạn mới nhấn. Ví dụ bạn nhấn `qa` thì bạn đang ghi và trong macro tên `a`. Sau đó, để ý ở màn hình dưới bên trái, các bạn sẽ thấy `recording @a` tức là đang ghi vào trong macro tên là `a`. Sau đó, chúng ta sẽ gõ một lệnh những thao tác mà các bạn sẽ dùng lại nhiều lần, cuối cùng kết thúc bằng cách nhấn `q`. Khi đã ghi vào macro xong, để lấy ra sử dụng, chúng ta sẽ nhấn phím `@` cộng với tên của macro và macro đó sẽ được sử dụng và thao tác lại những lệnh mà chúng ta đã làm khi đang trong quá trình ghi vào macro.  Các bạn có thể bấm `@@` để lặp lại macro đó thay vì phải bấm `@` cộng tên macro nhiều lần.
Ví dụ cụ thể như sau. Mình có đoạn text như sau:
```
I like
Thich Hoc
Vim
```
Giờ mình muốn kết quả của mình sẽ là
``` 
echo I like;
echo Thich Hoc;
echo Vim;
```

Thì mình sẽ phải đến đầu câu, gõ chữ echo, rồi cuối câu gõ dấu `;`. Làm vậy 3 lần, thật là nhiều, làm xong chắc xỉu ngang. Nên mình sẽ dùng macro. Mình sẽ đặt tên macro là `a`. Nhấn `qa`, sau đó mình sẽ nhấn `I` để đến đầu câu và gõ `echo ` sau đó bấm `ESC` để trở về command mode, như vậy câu đầu tiên của mình sẽ là `echo I like`. Sau đó mình nhấn `A` để đến cuối câu và gõ `;` và bấm `ESC` để trở về command mode,  như vậy câu đầu tiên của mình sẽ thành `echo I like;`. kết quả hiện tại là vầy
``` 
echo I like;
Thich Hoc
Vim
```
Sau đó, mình nhấn `q` để kết thúc record macro. Rồi mình đến dòng thứ hai, mình nhấn `@a` và thế là dòng thứ hai của mình sẽ thành `echo Thich Hoc;`. Xuống dòng thứ 3, mình nhấn `@@`, dòng thứ 3 của mình sẽ thành `echo Vim;`. Và mình sẽ có kết quả được như mong muốn:
``` 
echo I like;
echo Thich Hoc;
echo Vim;
```
Ngoài ra, các bạn có thể kết hợp với số để có thể thực hiện macro n lần. Ví dụ muốn lặp lại như vậy cho 10 câu thì chúng ta sẽ gõ `10@a` và chúng ta sẽ thực hiện lại thao tác thêm echo đầu câu và thêm ; cuối câu được 10 lầ.
# Kết bài
Mong là sau bài, tuy vẫn chưa biết cách cứu rỗi cuộc đời mình khỏi những task lặp đi lặp lại chán ngắt mỗi ngày nhưng ít nhất bạn cũng đã biết cách cứu rỗi mình khỏi những công việc lặp đi lặp lại mỗi ngày trong VIM. Xem tắt ở đây nhé.

{@embed: https://www.youtube.com/shorts/aCq9olvrUrQ}