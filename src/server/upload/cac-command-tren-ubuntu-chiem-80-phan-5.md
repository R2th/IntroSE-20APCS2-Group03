Hello 500 ae, sau 4 số trong seri này mình thấy có vẻ ae có hứng thú đọc chủ đề này ghê. Hi vọng những gì mình tìm hiểu được sẽ giúp ích được cho nhiều bạn hơn. Vậy là chúng ta đã đi ra được gần hết được các command quan trọng rồi đó. Sốc lại tinh thần với bài tiếp theo thôi. Cho một thế giới awesome hơn.

![](https://images.viblo.asia/fc8dcf65-1d7c-4261-b3eb-7f19eaf1f353.jpg)

Nào tiếp tục seri 20% command line sử dụng nhiều nhất. Bạn có thể xem phần trước tại [đây](https://viblo.asia/p/cac-command-tren-ubuntu-chiem-80-phan-4-QpmleNnr5rd).

# ps
Ngay cả những lúc máy của bạn chạy bình thường nhất cũng có thể chạy rất nhiều các process - tiến trình khác nhau. Bạn có thể hiển thị tất cả chúng bằng cách sử dụng command  `ps`:

![](https://images.viblo.asia/4b24527b-f0c0-44ec-bbae-f3ae9978a741.png)

Command này sẽ liệt kê tất cả các tiến trình do người dùng khởi tạo hiện đang chạy trong phiên đăng nhập hiện tại. Trong hình trên có một vào shell fish đang chạy. Để liệt kê tất cả các tiến trình, chúng ta cần sử dụng với các option với `ps`. Tôi thường sử dụng option `ax`:

![](https://images.viblo.asia/71d00aa0-4636-4a42-a6c7-aa87c2f77e81.png)

Option `a` được sử dụng để liệt kê các tiến trình của các user khác. `x` dùng để liệt kê các tiến trình không được link đến bất kì terminal nào (không được khởi tạo bởi người đung thông qua terminal). Như trên hình, kết quả của command quá dài.

Việc tìm kiếm trên kết quả này có vẻ nhọc. Chúng ta có thể sử dụng tìm kiếm trực tiếp trên kết quả đầu ra này bằng câu lệnh `grep`. Giống như dưới đây:

![](https://images.viblo.asia/06e03177-2777-4d10-abd1-400b24b7ba28.png)

Các thông tin mà command `ps` cho các thông tin: 

* Thông tin đầu tiên là `PID` - process ID. Khi muốn tương tác với tiến trình này cần phải lấy được PID này, ví dụ kill process này.
* Tiếp theo là `TT`  cho bạn biết terminal id được sử dụng
* Tiếp theo `STAT` cho bạn biết trang thái của tiến trình. `I`  là process nhàn rỗi (đã ngủ lâu hơn 20 giây). `R` là một tiến trình đang chạy. `S` là một tiến trình đang ngủ ít hơn 20s. `T` là một tiến trình đã dừng. `U` là một tiến trình uninterruptible wait - chờ đợi, `Z` là một tiến trình đã chết.

Dấu + cho biết tiến trình đang chạy ở dưới terminal.

# top
Command top được sử dụng để lấy danh sách các tiến trình đang chạy thực tế - real time, được sử dụng để hiển thị thông tin thực tế về tiến trình đang chạy trong hệ thống. Để sử dụng, các bạn chỉ cần gõ cmmand `top` trong terminal:

![](https://images.viblo.asia/9d002ce1-2626-42e5-badc-f21da2e33fda.png)

Nó sẽ hiển thị 1 loạt các thông tin khác nhau, trông khá ngầu chứ. Trông không khác gì hắc cơ rầu đó. Nó sẽ chạy đến khi bạn dừng, thoát nó bằng phím `Q` hoặc tổ hợp phím `Ctrll + C`. 

Nó đem lại nhiều thông tin khác nhau: PID - id của process, tiến trình của người dùng nào, CPU và Mem dùng bao nhiêu, có bao nhiêu tiến trình đang chạy, bao nhiêu tiến trình đang "ngủ đông" và nhiều thông tin khác. Phía dưới là danh sách các process sử dụng nhiều CPU và Mem nhất từ trên xuống - và được update thường xuyên.

Ngoài ra có thẻ sử dụng thêm các option khác nhau thể hiển thị được thông tin theo ý đồ nào đó. Ví dụ hiện thị thông tin được sắp xếp theo dung lượng Mem:

`top -o +%MEM`

![](https://images.viblo.asia/fd864967-a137-41f0-a3fc-3729c06ff9c5.png)
Nếu tinh mắt các bạn có thẻ nhìn thấy luôn 1 tiến trình top :v running.

Mặc định thì command top đã có sẵn chỉ việc đem ra sử dụng, nhưng có vẻ giao diện cũng như các tính năng hơi khó dùng. Mình thì hay sử dụng công cụ khác đó là `htop` về cơ bản giống `top` nhưng dễ dùng hơn. Bạn cài đặt `htop` bằng cách run command install: `apt intsall -y htop`. Sau đó sun `htop` thì giao diện như sau:

![](https://images.viblo.asia/1341d29e-459c-4c24-ab86-956c21a3ca87.png)

Bên dưới có các hướng dẫn chi tiết về kill tiến trình, tìm kiếm. Các bạn tự tìm hiểu nhé.

# kill
Giống như tên gọi kill - cho phép dừng 1 tiến trình nào đó đang running (khác với cầm vật nhọn kill 1 cái gì nhá :v). Cách sử dụng:

`
kill <PID>
`

Dành cho bạn nào hỏi PID lấy ở đâu ra. Lấy PID bằng command top bên trên nha. Mặc định khi không sử dụng option nào thì nó tự động sử dụng option `TERM`. Ngoài ra còn có nhiều option khác.

```
kill -HUP <PID>
kill -INT <PID>
kill -KILL <PID>
kill -TERM <PID>
kill -CONT <PID>
kill -STOP <PID>
```

* HUP - hang up.
* INT - interrupt
* KILL - dừng tiến trình
* TERM - terminate dừng 1 tiến trình
* CONT - continue sử dụng để tiếp tục một tiến trình đã dừng
* STOP - dừng tiến trình

# killall
Tương tự như lệnh kill, killall thay vì gửi tín hiệu đến một id tiến trình cụ thể, sẽ gửi tín hiệu đến nhiều tiến trình cùng một lúc. Cú pháp:

```
killall <name>
```

Với `name` là tên của một chương trình nào đó và nó sẽ kill tất cả các tiến trình của chương trình đó. vd: `killall top`

# jobs

Khi bạn sử dụng Linux/Mac, chúng ta có thể cài đặt chạy task ở background bằng cách sử dụng thêm symbol & ở cuối command. Ví dụ cho top command chạy ở background:

```
top &
```

![](https://images.viblo.asia/ab27676a-8928-4cb7-abb4-7c66fa82727f.png)

Điều này rất tiện dụng cho các chương trình chạy lâu. Chúng ta có thể quay lại chương trình đó bằng lệnh `fg`. Nếu chỉ có 1 chương thì sẽ vào thằng command đang chạy đó. Nếu có nhiều chương trình đang chạy ở background thì chúng ta phải sử dụng thêm chỉ số định danh của công việc đó - job number đó `fg 1`, `fg 2`, ... Để lấy được con số này thì chúng ta sử dụng câu lệnh jobs đồng thời lấy thông tin của các job đanh run background luôn:

![](https://images.viblo.asia/5c2b9de1-422e-4799-8e8d-07f2e6938279.png)

Phần command `fg` này mình sẽ tiếp tục ở phần sau.

-----

Done. Đây là phần 5 nhé. Mình sẽ back lại chuỗi bài này sau. Các bạn đón đọc phần 6 [link ở đ](https://viblo.asia/p/cac-command-tren-ubuntu-chiem-80-phan-6-Az45bL1VZxY)ây. Cảm ơn mọi người đã quan tâm.