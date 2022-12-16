{@embed: https://www.youtube.com/watch?v=g1FavzG-4rQ}
# Giới thiệu
 Ở bài trước, chúng ta đã cùng tìm hiểu về cách mở VIM, thêm text vào file, lưu lại và thoát VIM. Hôm nay, chúng ta sẽ tiếp tục với những thao tác di chuyển con trỏ cơ bản
 
  # Di chuyển con trỏ lên, xuống, trái phải
 Thường khi sử dụng editor, chúng ta sẽ muốn di chuyển con trỏ sang trái, sang phải, đi lên và đi xuống. Ngoài ra còn có di chuyển từng từ, di chuyển lên đầu file và di chuyển xuống cuối file. Thì trong VIM, chúng ta có phím `h` để di chuyển sang trái 1 kí tự, phím `j` để di chuyển xuống 1 dòng, phím `k` để di chuyển lên 1 dòng và phím `l` để di chuyển qua bên phải 1 kí tự. Những phím này sẽ có đi kèm theo số, [số] [phím di chuyển]. Thì khi có thêm số n thì phím di chuyển của chúng ta sẽ có nghĩa là di chuyển n kí tự hoặc di chuyển n dòng. 
 
Cụ thể, khi nhấn phím `h` thì chúng ta sẽ di chuyển sang trái nhưng nếu nhấn phím `3h` thì chúng ta sẽ di chuyển sang trái 3 kí tự. Nếu nhấn phím `l` thì chúng ta sẽ di chuyển qua bên phải, còn nhấn `10l` thì chúng ta sẽ di chuyển qua bên phải 10 kí tự. Nếu nhấn phím `j` thì chúng ta sẽ di chuyển xuống 1 dòng, còn `10j` thì chúng sẽ di chuyển xuống 10 dòng. Nếu nhấn phím `k` thì chúng ta sẽ di chuyển lên 1 dòng và nhấn `6k` thì chúng ta sẽ di chuyển lên 6 dòng. Lưu ý là nếu chúng ta ở đầu file thì khi nhấn phím di chuyển lên, chúng ta sẽ thấy con trỏ giữ nguyên vì không còn chỗ để di chuyển lên nữa. Tương tự cho phím di chuyển xuống nếu chúng ta đang ở cuối file. Di chuyển sang trái và sang phải cũng vậy, nếu cùng một dòng mà đang ở đầu câu thì di chuyển sang trái sẽ không có tác dụng và ở cuối câu thì di chuyển sang phải sẽ không có tác dụng nữa. Do đó giả sử chúng ta ở cuối câu rồi và muốn di chuyển sang câu ở dòng tiếp theo thì sẽ cần nhấn `j` thay vì tiếp tục nhấn `l`.

# Di chuyển con trỏ từng từ
Để di chuyển con trỏ qua phải (hay còn gọi là di chuyển tới) theo từng từ một, chúng ta có `w`. Khi nhấn `w`, thì con trỏ sẽ nhảy theo từng từ, bao gồm cả những kí tự đặc biệt, dấu phẩy, dấu chấm. Có nghĩa là nếu chúng ta có câu `abc def, ghi` thì lúc ban đầu, giả sử con trỏ sẽ nằm ở chữ a, chúng ta bấm `w` thì con trỏ sẽ nhảy đến chữ `d`, nhấn `w` lần nữa thì con trỏ sẽ nhảy đến dấy phẩy, nhấn `w` lần nữa thì con trỏ sẽ nhảy đến chữ `g`. Bên cạnh `w` chúng ta có `W`, với phím `W` thì con trỏ sẽ bỏ qua những kí tự đặc biệt, dấu phẩy, dấu chấm. Lấy lại ví dụ cũ `abc def, ghi`, ban đầu con trỏ sẽ nằm ở chữ `a`, nhấn `W` thì con trỏ sẽ nhảy đến chữ `d`, nhấn `W` con trỏ sẽ nhảy đến chữ `g` thay vì nhảy đến dấu phẩy khi chúng ta nhấn `w`. Như vậy, `w` để nhảy từng từ từng từ một về phía bên phải và dùng `W` nếu bạn muốn bỏ qua những kí tự đặc biệt và dấu cách câu như phẩy, chấm,... 

Với `w` chúng ta có có thể di chuyển con trỏ từng từ qua bên phải thì đồng thời chúng ta cũng có `b` để di chuyển qua trái (hay còn gọi là di chuyển lùi) từng từ một. Lại lấy ví dụ cũ :D `abc def, ghi`, giả sử con trỏ lúc này đang ở chữ `g`, nhấn `b` con trỏ sẽ nhảy đến dấu phẩy, nhấn `b` con trỏ sẽ nhảy đến chữ `d`, nhấn `b` con trỏ sẽ nhảy đến chữ `a`. Trường hợp phím `b` này chúng ta cũng có `B` là di chuyển qua trái mà không tính những kí tự đặc biệt, dấu cách câu như dấu chấm, dấu phẩy,.... Quay trở lại ví dụ khi nãy, `abc def, ghi`, giả sử con trỏ nằm ở chữ `g`, khi bấm `B`, con trỏ sẽ nhảy đến chữ `d`, bấm `B` lần nữa, con trỏ sẽ nhảy đến chữ `a`.

Để ý kĩ thì `w` và `b` di chuyển con trỏ qua trái và qua phải từng từ nhưng con trỏ sẽ luôn nằm ở kí tự đầu của từ đó. Vậy trong trường hợp chúng ta muốn con trỏ nằm ở kí tự cuối của từ thì sao? Đó là lúc chúng ta dùng phím `e`. Ví dụ `abc def, ghi`, giả sử con trỏ nằm ở chữ `a`, khi bấm `e` con trỏ sẽ nằm ở chữ `c`, bấm `e`, con trỏ sẽ ở chữ `f`, bấm `e` lần nữa, con trỏ sẽ nằm ở dấu phẩy, bấm `e` lần nữa con trỏ sẽ nằm ở chữ `i`. Cũng như `w` và `b` chúng ta cũng sẽ có `E`. Khi bấm `E` thì con trỏ sẽ nhảy đến cuối từ đó. Ví dụ `abc def, ghi`, giả sử con trỏ ở chữ `a`, khi bấm `E`, con trỏ sẽ nhảy đến chữ `c`, bấm `E` con trỏ sẽ nhảy đến dấu phẩy, bấm `E` con trỏ nhảy đến `i`. Sự khác biệt giữa `e` và `E` đó là `e` sẽ đến cuối từ nhưng sẽ tính luôn cả kí tự đặc biệt, dấu cách câu là 1 từ, còn `E` thì không quan tâm, cứ nhảy đến cuối của từ đó.

Đối với những phím này, chúng ta cũng có thể áp dụng số vào đằng trước. Ví dụ như `2w` sẽ là di chuyển con trỏ tới 2 từ, `10b` sẽ là di chuyển con trỏ lùi 10 từ.
# Di chuyển con trỏ đến đầu câu, cuối câu, đầu file, cuối file và dòng thứ n
Để di chuyển con trỏ đến đầu câu, chúng ta nhấn phim `0` và để di chuyển con trỏ đến cuối câu thì chúng ta nhấm phím `$`. Lấy ví dụ như câu `Hello World`. Giả sử con trỏ đang nằm ở chữ `H`, khi bấm `$` thì con trỏ sẽ nhảy đến kí tự cuối câu là chữ `d`. Ngược lại, giả sử con trỏ đang nằm ở chữ `d` thì khi bấm `0` con trỏ sẽ nhảy đến chữ `H`. 

Ngoài ra khi bạn đang ở đâu đó trong file, để đưa con trỏ lên kí tự đầu của file đó, chúng ta dùng `gg`. Tương tự để đưa con trỏ xuống kí tự đầu của dòng cuối cùng của file đó, chúng ta dùng `G`. Để mô tả mình có ví dụ như sau: 
```
abcdef
ghijklm
```
Giả sử con trỏ đang ở chữ `a`, khi bấm `G` con trỏ sẽ nhảy xuống kí tự đầu của dòng cuối cùng của file đó. Dòng cuối cùng là dòng `ghijklm` kí tự đầu của dòng này là chữ `g`. Như vậy khi bấm `G` thì con trỏ sẽ nằm ở chữ `g`. Giả sử con trỏ đang nằm đâu đó cho là ở chữ `e` đi, thì để di chuyển con trỏ lên kí tự đầu tiên của file tức là chữ `a` thì mình sẽ nhấn `gg`.

Cuối cùng, để di chuyển con trỏ đến dòng thứ n, chúng ta có công thức: số dòng + G hoặc `:` + số dòng. Mình lấy lại ví dụ này:
```
abcdef
ghijklm
```
Nhấn `2G` sẽ đưa con trỏ đến dòng thứ 2 là dòng `ghijklm`, nhấn `:2` cũng cho ra kết quả tương tự. Nhấn `1G` sẽ đưa con trỏ đến dòng thứ 1 là dòng `abcdef`, nhấn `:1` cũng cho ra kết quả tương tự. Mặc định, VIM không hiện số dòng nên sẽ khá khó khăn để dùng phím nhảy đến dòng thứ n vì cơ bản là chúng ta sẽ không biết đó là dòng thứ mấy, dòng đó là dòng mấy ngàn thì đang đếm cái xỉu ngang tại dài quá, mà chưa kể là đếm lộn nữa. Nên để chính xác, thì các bạn nhấn phím `ESC` để qua command mode, sau đó gõ `:set number`, các bạn sẽ thấy số dòng sẽ được hiển thị bên tay trái. Để tắt, nhấn phím `ESC` sau đó gõ `:set number!`. 

# Lời kết
Mong là sau bài viết này, các bạn đã có thể sử dụng những phím cơ bản để có thể di chuyển con trỏ ở trong VIM.