{@embed: https://www.youtube.com/watch?v=4UMBOvkg4a0}
# Giới thiệu
Trong bài này, chúng ta sẽ tiếp tục tìm hiểu về những phím giúp chúng ta có thể thêm, xóa và sửa trong VIM nhé.
# Thêm chữ trong VIM
Trong VIM, chúng ta có phím `i` để thêm chữ vào trước con trỏ. Lấy ví dụ chúng ta có câu sau `abc def ghi`, giả sử con trỏ đang ở chữ `b`, nếu bấm `i` và gõ chữ `THICHHOC`  thì lúc này chữ `THICHHOC` sẽ được thêm ở đằng trước chữ `b`. Kết quả sẽ là `aTHICHHOCbc def ghi`. Đồng thời cũng có phím `I` để thêm chữ vào đầu câu. Ví dụ câu `abc def ghi`, giả sử con trỏ đang ở chữ `e` và chúng ta bấm `I` thì và gõ `THICHHOC` thì chúng ta sẽ có kết quả `THICHHOCabc def ghi`.

Bên cạnh đó, chúng ta có phím `a` để thêm chữ vào sau con trỏ. Ví dụ chúng ta có câu sau `abc def ghi`, giả sử con trỏ đang ở chữ `b`, nếu bấm `a` và gõ `THICHHOC` thì chúng ta sẽ được câu `abTHICHHOCc def ghi`. Tương tự chúng ta cũng có phím `A`, phím này dùng để thêm vào cuối câu. Ví dụ câu `abc def ghi` và con trỏ nằm ở chữ `b`, khi bấm `A` và gõ `THICHHOC` chúng ta được câu `abc def ghiTHICHHOC`.

Song song đó, chúng ta có phím `o` và phím `O`, `o` tức là thêm chữ ở dòng bên dưới và `O` là thêm chữ ở dòng bên trên. Lấy ví dụ như sau: 
```
1  
2 def
3
```
Giả sử con trỏ đang ở dòng số 2, khi bấm `o` thì con trỏ sẽ nhảy xuống dòng số 3 và nếu các bạn gõ chữ `THICHHOC` thì chúng ta sẽ có kết quả như thế này:
```
1
2 def
3 THICHHOC
```
`O` cũng như `o` nhưng mà là thêm bên trên, lấy cùng ví dụ bên trên, nếu nhấn `O` và gõ `THICHHOC` thì chúng ta có được kết quả như sau:
```
1 THICHHOC
2 def
3
```

# Sửa chữ trong VIM
Để sửa chữ trong VIM, chúng ta có 2 phím thông dụng đó là `r` và `s`. Phím `r` để sửa một kí tự trong VIM. Lấy ví dụ `abcdefghi`, giả sử con trỏ nằm ở chữ `d`, khi mình bấm `r` sau đó gõ chữ `T` thì chúng ta sẽ có kết quả là `abcTefghi`. Cũng lấy ví dụ này nhưng lần này chúng ta sẽ gõ `THICHHOC`, kết quả sẽ là `abcTHICHHOCefghi`. Như vậy sự khác biết là `r` chỉ thay thế một chữ thôi, khi bạn bấm `r` bạn sẽ thấy VIM chuyển sang chế độ Insert và khi bạn gõ 1 kí tự nào đó thì VIM sẽ chuyển sang chế độ Command. Còn với `s` thì VIM chuyển sang chế độ Insert nhưng mà bạn được thay thế nhiều hơn là 1 kí tự, gõ đến khi nào chán nhấn `ESC` thì VIM sẽ quay lại chế độ Command. Với phím `s` chúng ta có `S` dùng để thay thế nguyên cả dòng. Lấy ví dụ ban đầu `abcdefghi`, khi bấm `S` các bạn sẽ thấy cả dòng này mất đi và chuyển sang chế độ Insert, sau đó thì các bạn có thể gõ thỏa thích. Ngoài ra còn có phím `c` có thể kết hợp với các phím di chuyển con trỏ, `2c` thể thay đổi 2 chữ, `cw` để thay đổi cả từ.

# Xóa chữ trong VIM
Để xóa chữ trong VIM, chúng ta có phím `x` để xóa từng chữ, `d` để xóa nhiều chữ và `dd` hoặc `D` để xóa hết dòng. Cùng xem qua ví dụ mình có câu `abcdef`, giả sử con trỏ ở chữ `a`, khi nhấn `x` thì sẽ xóa một chữ là chữ `a` đi và chúng ta có kết quả là `bcdef`. Với phím `d` thì chúng ta có thể kết hợp được với những phím di chuyển con trỏ và số. Nếu muốn xóa hai chữ thì gõ `2d`, `dw` để xóa cả từ. Muốn xóa cả dòng thì đơn giản nhấn `D` hoặc `dd`.
# Kết lại
Như vậy trong bài này chúng ta đã tìm hiểu qua những phím như `i`, `a`, ... để thêm chữ vào, phím `r`, `s`, ... để sửa chữ và `x`, `d`,... để xóa chữ. Chúc các bạn dùng VIM vui vẻ, nếu có thắc mắc gì thì cứ hỏi nhé. Các bạn xem tóm tắt tại đây nhé:
{@embed: https://www.youtube.com/shorts/4wKS__tSXOI}