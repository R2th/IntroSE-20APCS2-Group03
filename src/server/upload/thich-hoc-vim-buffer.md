# Giới thiệu
Đến với bài này, mình nghĩ các bạn đã vững căn bản để có thể sử dụng VIM cho những việc đơn giản hằng ngày như mở file, đóng file, sửa text, thêm text, xóa text, copy, paste,... Hôm nay chúng ta sẽ cùng tìm hiểu về một phần có tí nâng cao xíu, đó là bộ đệm (buffer) ở trong VIM.
# Sử dụng buffer
Buffer là một vùng trong bộ nhớ của Vim được sử dụng để giữ văn bản được đọc từ một tệp. Ngoài ra, một bộ đệm trống không có tệp liên kết có thể được tạo để cho phép nhập văn bản.

Chúng ta có thể dùng lệnh `:e filename` để mở và chỉnh sửa một file nào đó. Khi mở file để chỉnh sửa như vậy thì file này được đọc ở trong một buffer (sẽ là một buffer rỗng nếu như mở file mới). Những thay đổi sẽ được ghi lại ở trong buffer, các bạn lưu ý là những thay đổi này chỉ được ghi trên buffer, nếu chúng ta thoát ra mà chưa lưu lại thì nó đồng nghĩa với việc bạn đóng buffer này nhưng mà không có ghi gì vào đĩa cả. Thì khi chúng ta dùng lệnh lưu lại, thì buffer sẽ ghi vào trong đĩa vào những thay đổi của bạn sẽ được áp dụng vào trong file. Chúng ta có thể xem danh sách các buffer bằng cách gõ lệnh `:ls` hoặc `:buffers`. Mỗi buffer sẽ tương ứng với 1 số được hiển thị ở cột đầu tiên. Cột thứ hai sẽ hiển thị state hiện tại của buffer tương ứng và cột thứ ba sẽ hiển thị tên của file được gắn với buffer đó.
![image.png](https://images.viblo.asia/b00df103-f348-4efb-a6ee-620e0091dc38.png)
Nguồn: https://vim.fandom.com/

Những command để quản lí vim:
```
:ls	hiển thị những buffer hiện tại cùng với số
:b <number>	hiển thị buffer với số tương ứng.
:b <partial> hiển thị buffer đầu tiên match với partial
:bd	xóa buffer hiện tại, nếu chưa lưu thì sẽ không xóa được
:bd! xóa buffer hiện tại, nếu không lưu thì coi như mất
```

Để di chuyển từ buffer này sang buffer khác, chúng ta có command `:bnext` và `:bprev` để di chuyển đến buffer tiếp theo hoặc buffer trước đó. Phiên bản ngắn hơn của câu command này là `:bn`, `:bp`. Command này còn có thể kết hợp với số để nhảy đến buffer với số tương ứng, ví dụ như `:b2` sẽ nhảy đến buffer số 2. Hoặc chúng ta có thể dùng chung command này với tên file, các bạn gõ `:b filename` thì vim sẽ nhảy đến buffer với tên file tương ứng. Để chuyển qua chuyển lại giữ buffer hiện tại và buffer cuối cùng thì dùng tổ hợp phím `Ctrl-^` ở trong normal mode.
# Tóm tắt
Qua bài này, mong là các bạn đã có kiến thức cơ bản về buffer, có thể quản lí và dùng buffer trong vim một cách hiệu quả hơn. Các bạn xem tóm tắt tại đây nhé: