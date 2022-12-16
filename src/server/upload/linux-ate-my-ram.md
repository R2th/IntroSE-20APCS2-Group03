# Lời nói đầu.
Gần đây, mình có cơ hội deploy Laravel lên một server có RAM khá yếu  nên bản thân mình khi deploy đã khá lo lắng về việc hoạt động cũng như sự mượt mà của server đó. Và sau khi deploy xong mình tá hoả vì vấn đề RAM . Phần RAM free còn quá ít và bản thân mình lo sợ app sẽ không chạy mượt mà . Sau đó mình đã xin nâng RAM lên gấp 4 lần tuy nhiên sau khi nâng RAM thì lượng RAM free có tăng lên 1 xíu , có lại phần sử dụng lại trở nên nhiều hơn =)) WTF ?? Chuyện gì xảy ra ở đây ? Tại sao tăng RAM lên gấp 4 lần mà lượng RAM free chả có bao nhiêu. Thật sự vô lý. Tuy nhiên sau một hồi tìm hiều mình cũng ra được một vài vấn đề . Nào cùng tìm hiểu nhé !

# Nội dung
## 1: Hệ điều hành và cách check RAM
Cũng như các web server thông thường khác , mình sử dụng Ubuntu 18.04 (cùng hệ điều hành với máy tính cá nhân của bản thân). Và đến đây thì chăc hẳn 90% các ae dùng ubuntu biết cách check RAM như thế nào rồi đúng không. Đúng vậy ta có 2 command `free` và chi tiết hơn nữa thì ta có thể dùng `top`. Mình sẽ dùng lệnh `free -h` để có thể nhìn tổng quát hơn. Và bạn sẽ có kết quả đại khái như sau :
![](https://images.viblo.asia/edc17289-0380-4ced-82e0-c9887a39e237.png)

Bỏ qua phần `swap` mình sẽ trình bày trong một bài viết khác (Nếu bạn quan tâm thì có thể vào [đây](https://viblo.asia/p/swap-eW65GWBJ5DO) để đọc nhé ). Hay chú ý vào phần `Mem` nhé . Ok, nhìn có vẻ dễ hiểu . Chúng ta có :

* Tổng Mem: 7.5G
* Đã sử dụng : 2.2G
* Shared : 380M 
* Dùng đề buff/cache : 3.5G
* Avaiable : 4.6G
* Free (rảnh rỗi): 1.8G

Như vậy ta có thể nhìn ra rằng máy mình hiện tại còn `24% Ram trống` và có thể được cấp phát cho các application khác . Hiện tại máy minhf chỉ bật 1 vài tab chrome mà free chỉ còn có ngần ấy, nghe có vẻ căng :D

## 2: Chuyện gì thực sự đang diễn ra nhỉ ?
Thực sự thì đây là 1 cơ chế khá hay ho của Linux. Đó chính là việc Linux mượn một số phần RAM không được sử dụng để làm bộ nhớ đệm cho hệ thống(`Disk Caching`). Điều này có vẻ như đang chiếm dụng RAM nhưng thực tế thì không phải vậy 

## 3: Tại sao lại có cơ chế này ?
Để hiểu được vì sao có cơ chế này bạn hãy xem 1 ví dụ dễ hiểu sau đây: 

Nhà bạn có 2 cái xe máy bình thường 1 cái bạn dùng đi làm còn dư 1 cái nằm để đấy. Khá là lãng phí đungs không ? Thay vào đó bạn cho thuê cái xe máy đấy, lúc nào cần thì lại thu về sử dụng . Vừa tăng thêm thu nhập lại ko lãng phí tài nguyên.

Dễ hiểu đúng không, ở đây cũng vậy thôi. Linux mượn phần RAM không sử dụng làm bộ nhớ đệm làm tăng cường tốc độ đọc ghi dữ liệu của ổ cưng . Thực tế thì cơ chế này đã rất hoàn thiện và không hề có điểm yếu, trừ việc gây khó hiểu cho người mới (ít kiến thức như mình)

## 4: Điều gì sẽ xảy ra khi application của chúng ta cần thêm RAM hay cài thêm application

Nếu điều trên xảy ra, thì đơn giản là chúng sẽ lấy lại 1 phần RAM đã được chuyển đội làm bộ nhớ đệm. Bộ nhơ đệm sẽ luôn luôn trả lại cho app ngay lập tức khi chúng cần :D

## 5: Làm thế nào để cản trở cơ chế này.
Thực tế thì chúng ta không thể cản trở hay dùng nó lại. Lý do duy nhất khiến bất kì ai muốn loại bỏ cơ chế này đó là họ nghĩ rằng cơ chế này sẽ lấy đi memory của các app đang chạy. Trong khi đó thì thưu tế thì lại không phải thế. Cơ chế này giúp các application load nhanh hơn và mượt mà hơn mà thôi . Và chính vì thế chúng ta không có lý do gì để loại bỏ nó 

## 6: Điều gì đã diễn ra trong command free
Thực sự thì đây chỉ là sự khác nhau về sự hiểu về các thuật ngữ. Tất cả chúng ta đều hiểu rằng :

- `used` là phần memory đã bị các applications sử dụng
- `free` là phần memory chưa sử dụng cho bất kì điều gì

Tuy nhiên ta cần tính đến phần memory đã được sử dụng cho `thứ gì đó khác` nhưng vẫn có thể cấp phát cho một application khác khi chúng cần .



| Memory | Bạn gọi nó là  |  Linux gọi nó |
| -------- | -------- | -------- |
| Sử dụng bởi các app      | `Used`     |  `Used`     |
| Đã sử dụng nhưng vẫn có thể cấp phát cho app khi cần      | `Free (or Available)`     |  `Used (and Available)`     |
| Không Sử dụng       | `Free`     |  `Free`     |



`Thứ gì đó khác` ở đấy đó là thứ mà `free` gọi là `buff/cache`. Vì chúng ta và Linux có nhưng cách hiểu thuật ngũ là khác nhau nên khiến chúng ta nghĩ ràng mình sắp hết Memory còn thực tế thì không phải vậy.

## 7: Vậy thực tế thì chúng ta còn bao nhiêu memory ?

Sau những điều mình viết bên trên cách sẽ không còn ai ngây thơ suy nghĩ máy mình chỉ còn `24% Ram trống` nữa nhỉ . Đơn giản là chũng ta không lưu ý đến phần avaiable . Như vậy lượng RAM mà chúng ta còn có thể sử dụng là `free` + `avaiable` = 6.6G . Tức là xấp xỉ 88%. 1 con số không tồi.



## 8: Vậy thực tế thì lúc nào chúng ta nên lo lắng về memory ?
Sau  khi đã hiểu khá khá thì chúng ta có thể dừng việc lo lắng khi :

* `free` memory tiến dần đến sát giá trị 0.
* `used` memory tiến dần đến sát giá trị `total`.
* `available` memory tiến dần đến sát giá trị max của nó (~ 80% total).
* `swap used` không thay đổi .

Chúng ta chỉ nên lo lắng khi :

* `available` memory tiến dần đến sát giá trị 0.
* `swap used` tăng liên tục đến gần sát total
* `dmesg | grep oom-killer` show ra thứ gì đó (Các Process bị dùng do hết RAM)

# Kết luận.
Ok, vậy là mình đã kết thúc bài tìm hiểu ngày hôm này của mình tại đây.Bài viết trên dựa them kiến thức hạn hẹp của bản thân mong các a/c/e góp ý thêm cho mình nhé. Cám ơn các bạn đã đọc hết bài viêt của mình !

# Tài liệu tham khảo.

[https://www.linuxatemyram.com/](https://www.linuxatemyram.com/)

[https://www.cloudways.com/blog/linux-ate-my-ram-memory-myth-busted/](https://www.cloudways.com/blog/linux-ate-my-ram-memory-myth-busted/)