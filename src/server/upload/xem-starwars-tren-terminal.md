Trước đây mình cũng có 1 bài viết giới thiệu về việc nghe nhạc trên terminal, vậy xem phim thì sao nhỉ ??

Chắc chẳng ai ngờ tới việc xem phim trên terminal phải không ? Cơ mà luôn có những lập trình viên vui tính, giúp chúng ta làm những điều hơi kỳ quặc nhưng cũng rất thú vị !

## Nguyên lý hoạt động

À thì nghe có vẻ nguy hiểm, tuy nhiên việc này rất đơn giản ! Đầu tiên ta sẽ kết nối với 1 server phim có sẵn, sau đó load phim. Phim ở đây được chủ server sử dụng code để vẽ từng cảnh lên màn hình terminal cho bạn xem. Nghe thì rất mất công sức đúng không ? Tuy nhiên có những người cũng rảnh mà =))

## Giao thức Telnet

Ok, vậy chúng ta kết nối với server đó bằng cách nào ? Chắc chắn không phải sử dụng http rồi ! Chúng ta sẽ sử dụng giao thức [Telnet](https://vi.wikipedia.org/wiki/Telnet) (một giao thức được sử dụng khá rộng rãi trước khi SSH xuất hiện). 

Telnet mặc định sẽ có trên Linux, MacOS và Windows. Tuy nhiên với một số trường hợp sử dụng Windows, Telnet sẽ bị chuyển sang off. Các bạn sẽ bật nó lên bằng các bước sau:

1.  Chọn Control panel
2.  Mở mục Programs
3.  Chọn Turn Windows Features on or off
4.  Tick vào phần **Telnet Client**
5.  Ấn OK

![](https://images.viblo.asia/05cff74e-cc6e-4c9d-a90f-231c4ebb7b16.jpg)

**Lưu ý**: Việc bật Telnet sẽ mất 1 chút thời gian. Bao giờ việc bật hoàn thành, bạn sẽ thấy một thông điệp: "Windows completed the requested changes". 

## Xem Star Wars thôi !

Có 2 kiểu để xem trên Windows (thực ra nó cũng gần như nhau) !

### Kiểu 1:

1. Mở command promt lên
2. Gõ `pkgmgr /iu:"TelnetClient"`
3. Gõ tiếp `telnet towel.blinkenlights.nl`

![](https://images.viblo.asia/7de948bf-ce40-4022-a562-12b909f17c65.png)

### Kiểu 2:

1. Ấn tổ hợp phím Windows + R
2. Gõ Telnet.exe
3. Gõ tiếp `telnet towel.blinkenlights.nl`

![](https://images.viblo.asia/a52b7f0b-af26-42a6-afc3-383d739e2cdd.jpg)

Trên Linux và MacOS thì các bạn chỉ cần bật Terminal và gõ `telnet towel.blinkenlights.nl` thôi nhé !

Và xin chào mừng các bạn đến với phiên bản ASCII của Star Wars !!

![](https://images.viblo.asia/016ac7a2-ec59-474b-927d-6149581efcc9.gif)

## Nguồn tham khảo

https://www.thewindowsclub.com/watch-star-wars-windows-telnet