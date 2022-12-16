## 1. Giới thiệu
### 1.1. Vim Là Gì
`Vim` là chương trình soạn thảo văn bản (text editor) mạnh mẽ và được sử dụng phổ biến hiện nay. Vim được phát triển dành cho các bản phân phối của Linux (Linux distro) và sau đó mở rộng cho Windows.

Trên hệ điều hành Ubuntu chạy trên Desktop, Vim được cài đặt mặc định. Chúng ta cũng có thể tải về phần mềm này và cài đặt miễn phí.

### 1.2. Vim và Vi
`Vi` cũng là một text editor tương tự như `Vim`. Vi được phát triển cho những phiên bản đầu tiên của hệ điều hành Unix. Tuy nhiên khác với Vim, Vi vào thời điểm đó không phải là phần mềm miễn phí. Mãi cho tới năm 2002 thì Vi mới chính thức trở thành phần mềm miễn phí.

Chính vì lý do trên mà các bản text edtor miễn phí trong đó có Vim (Vi Improved) được cho ra đời.

Hiện tại giống như Vim, Vi cũng được cài đặt miễn phí trên các phiên bản phân phối dành cho Desktop của Linux.

### 1.3. Ưu điểm cuả vi/vim
Ưu điểm của VIM là mọi thao tác đều có thể thực hiện thông qua các phím tắt, vì vậy bạn không cần dùng tới con chuột khi dùng VIM nữa. Cũng chính vì vậy nên VIM có một lượng phím tắt đồ sộ đủ để làm nản lòng bất cứ ai có ý định học sử dụng nó.
<br/><br/>
Trong bài viết sau, mình giới thiệu một số phím tắt cơ bản đủ để bạn có thể thao tác trên VIM một cách bình thường, thực hiện các tác vụ di chuyển con trỏ, chỉnh sửa tài liệu.
<br/><br/>
**Note**: Bài viết sử dụng 1 số hình ảnh tại https://kipalog.com/posts/Lam-quen-VIM-trong-5-phut
## 2. Các câu lệnh cơ bản trong vi
![](https://images.viblo.asia/81e8b6cb-cd5e-4a5b-9bef-91898886c7c6.png)
#### 2.1. Cơ bản
– Sử dụng vi kèm theo tên file(s) muốn edit:
```sh
vi one.txt two.txt etc.txt
```

– Có 2 chế độ trong vi: `command mode` và `insert mode`. Khi bắt đầu sử dụng lệnh vi, vi mặc định ở command mode. Hoặc ấn Esc để chuyển sang command mode khi người dùng đang ở insert mode.
<br/><br/>
#### 2.2. Các lệnh edit cơ bản

– Ấn phím lệnh `i` hoặc `a` từ chế độ `command mode` để chuyển sang `insert mode`. `i` để thêm ký tự trước con trỏ, `a` để thêm ký tự sau con trỏ.

– Sử dụng phím `h j k l` hoặc các phím mũi tên tương ứng để di chuyển con trỏ sang trái, xuống, lên, sang phải.

![](https://images.viblo.asia/83fded79-438f-4449-b0c0-0b76186508f7.png)

– Sử dụng `x` xóa 1 ký tự, `dw` xóa 1 từ, `dd` xóa cả 1 dòng.

– Sử dụng số `n` đi trước phím lệnh để lặp lại `n` lần tác dụng của lệnh. Ví dụ, `3d` sẽ xóa 3 dòng tính từ vị trí con trỏ.

– Sử dụng `u` (undo) để khôi phục lại những thay đổi trước đó.

- Sử dụng `:w` để lưu lại những thay đổi.

– Sử dụng `ZZ` hay `:wq` lưu lại tất cả thay đổi và thoát.

– Sử dụng `:q!` thoát ra không lưu lại bất kỳ thay đổi nào.
![](https://images.viblo.asia/da51e97e-6799-479e-836a-23fb78a13ea9.png)
<br/><br/>
#### 2.3. Cắt và dán

– `yy` sao chép dòng hiện tại vào buffer, `Nyy` sao chép N dòng.

– `p` (paste) dán nội dung từ buffer vào dưới dòng hiện tại
<br/><br/>
#### 2.4. Nhảy đến hàng hay cột

– Gõ một số trước ký tự `G` để đi đến dòng đó, vd `23G` sẽ nhảy đến dòng `23`.

– Gõ một số trước ký tự `|` để nhảy đến cột đó.
<br/><br/>
#### 2.5. Sử dụng `.` để lặp lại action gần

– Ví dụ người dùng gõ `i` để insert dòng chữ `“hello world”`, sau đó chuyển sang chế độ command mode bằng phím Esc, nhảy xuống dòng và gõ `.`, dòng chữ “hello world” sẽ hiện ra.
<br/><br/>
#### 2.6. Tìm kiếm

– Sử dụng cú pháp `/TỪ_CẦN_TÌM_KIẾM` hoặc `?TỪ_CẦN_TÌM_KIẾM` để tìm kiếm từ trong phần văn bản. ví dụ /foobar hay ?foobar.

– Sau khi kết quả tìm kiếm đầu tiên hiện ra, sử dụng `n` để tìm kiếm tiếp trong phần văn bản còn lại sau con trỏ, `N` để tìm kiếm ngược trở lại đầu văn bản trước con trỏ.
![](https://images.viblo.asia/5d52dafe-63fe-43bd-9b19-cd84e4ffa2d3.png)
<br/><br/>
#### 2.7. Các lệnh colon ( đi sau dấu `:` )

– `:%s/foo/bar/g` tìm sự xuất hiện của `“foo”` trong toàn bộ file và thay thế bằng `“bar”`, `/foo/bar/g` chỉ thay thế ở dòng hiện tại.

– `:et nu` hiển thị số dòng trước mỗi dòng, `:et nonu` để bỏ hiển thị số dòng.

– `:1,8d` xóa từ dòng 1 cho đến dòng 8 trong file.

– Sử dụng `ma` để đánh dấu dòng hiện tại là `a` ( có thể là bất cứ ký tự nào từ `a-z` ). Sau đó dùng `‘a` để nhảy đến dòng đã được dánh dấu là `a` từ bất cứ đâu. Có thể sử dụng với colon, `:’a,’b d` xóa tất cả các dòng bắt đầu từ dòng được đánh dấu là `a` cho đến dòng được đánh dấu là `b`, hoặc ngược lại.

– `:w newfile.txt` để save nội dung của file hiện tại vào một file mới là `newfile.txt` (tương tự “save as”).

– `:8,16 co 32` để copy dòng 8 đến 16 đến điểm sau dòng 32.

– `:3,16 m 32` để chuyển rời dòng 8 đến 16 đến điểm sau dòng 32.

– Nếu dùng `vi` để mở nhiều file (`vi file1 file2 file3`), có thể sử dụng `:n` để nhảy đến file tiếp theo và `:rew` để nhảy quay ngược lại đến file đầu tiên, `:args` để hiện thị tất cả các file đang được mở.
<br/><br/>
#### 2.8. Vi for Smarties

– Sử dụng `G` (in hoa) để nhảy đến dòng cuối cùng của file.

– Khi xóa nhiều dòng, di chuyển con chuột đến dòng đầu tiên, gõ `ma` để đánh dấu, sau di đến dòng cuối cùng và gõ `d’a` để xóa những dòng đó.

– `$` để nhảy xuống cuối dòng, `:$` để nhảy đến dòng cuối của file.

– `0` để nhảy đến đầu dòng, `:0` để nhảy tới dòng đầu tiên của file.

– `d$` xóa từ vị trí con trỏ hiện tại đến cuối dòng.

– `:10,$ d` xóa từ dòng 10 cho đến dòng cuối cùng của file, hoặc ngược lại.

– `:10,20 m 0` chuyển rời dòng 10 đến 20 lên trên dòng đầu tiên của file.
<br/><br/>
#### 2.9. Shell

– Sử dụng `: !command` để thi hành lệnh command trong môi trường vi.

<br/><br/>
Trên đây là giới thiệu cách sử dụng vi một cách cơ bản và đủ dùng cho mọi đối tượng người sử dụng linux. Người dùng muốn tham khảo thêm có thể lên website của vim tại http://www.vim.org/.