# Intro
![image.png](https://images.viblo.asia/11bfddb5-d8b0-4946-8918-9bf4611a9d51.png)

Gần đây thì team mình có rủ nhau tham gia cuộc thi CTF Namhamcon2022 và nhờ sự try hard của mọi người, team cũng kết thúc giải ở vị trí top 200 của cuộc thi😂. Qua cuộc thi này, mọi người cũng học được thêm nhiều trick và skill mới 😍. Mình cũng tham gia với anh em trong team một vài bài web và rev. Sau cuộc thi, xem trên CTF thì đã có rất nhiều writeup, tuy nhiên các bài rev thì có vẻ lại không hút người đọc lắm😢 (mãi sau CTF 1-2 tuần mới có người viết, mà lại còn không đủ hết các challenges💔), tiện có sự kiện Viblo Mayfest nên mình viết writeup cho các rev (Reverse Engineering) challenges: **babyrev**, **Kamikaze**, **Time Machine** luôn 🤪. Gét gô!

Phần một chúng ta sẽ bắt đầu bằng một challenge easy: **babyrev** 👶

# babyrev
![image.png](https://images.viblo.asia/e278bc73-697b-407f-bc6c-7b5c842a6f0b.png)

(ảnh chôm của team khác)

> Author: @birch#9901
> 
> Point: 392
> 
> Rating: easy
> 
> Aw look! Baby is using a disassembler!

File binary: https://mega.nz/file/W1FETbZR#v6xyPDxwUWhdJZTyBFu3jltHf62HyQXeUaVOxfRskGM

Vâng, giải CTF nào thì tất nhiên sẽ có những bài dễ dễ baby rồi. Check thử xem file là gì:

```bash
➜  rev file babyrev
babyrev: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=1a48d52c4e5d664115f6cd11651f9c688e8198db, for GNU/Linux 3.2.0, stripped
```

Chạy thử xem thế nào:

```bash
➜  rev ./babyrev
Welcome to baby's first rev! :>
Please enter your username: vigo
Please enter your password: password
vigo? I don't know you... stranger danger...%
```

ok fine, chương trình yêu cầu nhập vào username và password, nếu đúng thì chắc là sẽ trả ra flag?

Load file vào IDA, tìm đến hàm main và bấm decompile 😈

![image.png](https://images.viblo.asia/eec7ca20-3416-4e0a-8d88-009337b6ed84.png)

Code khá là tường minh rồi (level easy mà):
- username nhập vào sẽ được lưu ở `s1` và so sánh với `bossbaby` nếu không đúng thì thoát.
- password nhập vào sẽ được lưu ở `v5` sau đó đưa vào hàm `sub_12B2`, kết quả trả về bằng 38 thì là đúng.

Đi tiếp vào hàm `sub_12B2` chúng ta có:

> Right-click và chọn `Hide casts` cho dễ nhìn nhé

![image.png](https://images.viblo.asia/8e0f2e8f-cacc-4366-ab75-40c72ba68054.png)

 Đổi tên tham số của hàm thành `password` và một số biến khác để dễ hiểu hơn:

![image.png](https://images.viblo.asia/824a2f35-f173-459b-9d84-ae870dfb2ba9.png)

Ở đây có một đoạn khá rối rắm, tạm thời chưa cần quan tâm vội (thực ra là do mình lười đọc 🤣):

```c
while ( buffer != (buffer - (v2 & 0xFFFFFFFFFFFFF000LL)) )
    ;
  v3 = alloca(v2 & 0xFFF);
  if ( (v2 & 0xFFF) != 0 )
    *(&buffer[-1] + (v2 & 0xFFF)) = *(&buffer[-1] + (v2 & 0xFFF));
```

Chú ý đến dòng 29:

```c
((&sub_1208 + 1))(same_pass, buffer);
```

Đây là một đoạn gọi hàm, truyền vào 2 tham số là password của chúng ta và một buffer, tuy nhiên IDA đã decompile sai (hoặc là trick anti-debug của tác giả) dẫn đến hàm đúng phải có địa chỉ là `sub_1209`. Kiểm tra thử hàm `sub_1208`, ta cũng thấy báo lỗi  như sau:

![image.png](https://images.viblo.asia/a42ee9f0-80b1-42e4-9978-4f807b9c0779.png)

Ok, let's fix that. Đầu tiên là undefine hết đoạn code này đi:

![image.png](https://images.viblo.asia/2e0fb1ce-5342-4c9a-a60b-4083643da45b.png)

Sau đó click chọn ở địa chỉ `.text:0000000000001209`, chuyển thành code:

![image.png](https://images.viblo.asia/cc7cd6c0-f263-44db-b567-18cee4892c25.png)

vẫn ở địa chỉ đó, giờ chúng ta `Create function...`:

![image.png](https://images.viblo.asia/7bbe5bd4-f7e3-49cc-a1a4-589c22f74259.png)

bấm F5 lần nữa và Voilà:

![image.png](https://images.viblo.asia/28084266-7dab-4051-bdf1-65051ba3dc83.png)

Hàm này có nhiện vụ tính toán giá trị của các phần tử trong mảng `buffer` dựa trên giá trị các ký tự của password. Biến `a1` tương ứng với password, biến `a2` tương ứng với `buffer` theo lệnh call ở trên. Kết quả lưu vào các phần tử kích thước 4 bytes. Vậy là chúng ta cũng không cần quan tâm đoạn code rối rắm ở trên nữa vì đằng nào thì giá trị của buffer cũng sẽ được thiết lập ở đây.

Quay lại với hàm `sub_12B2`,  ở vòng for cuối cùng:

```c
for ( i = 0; ; ++i )
{
	v4 = i;
	if ( v4 >= strlen(same_pass) )
	  break;
	if ( dword_4020[i] == *(same_buffer + i) )
	  ++result;
}
return result
```

Kết quả tính toán trên password được lưu vào `same_buffer`, các giá trị này sẽ được so sánh với giá trị lưu sẵn trong binary ở `dword_4020`, nếu đúng sẽ tăng `result` thêm 1, cuối cùng trả về kết quả này. Để có được password ban đầu (và cũng chính là flag) ta cần đảo ngược thuật toán của `sub_1209` với đầu vào là các phần tử của mảng `dword_4020`:

Flag sẽ có độ dài là 38 ký tự.

Kiểm tra `dword_4020` trong IDA:

![image.png](https://images.viblo.asia/257abd86-e57b-4b79-95fa-06685d343b00.png)

Đúng chuẩn mảng 38 phần tử luôn :detective:. Như vậy ta đã có đủ các dữ kiện để tìm ra flag:

Code nhanh đoạn script để decode ra flag như sau:

```python
magic = [0x66, 0x0D9, 0x188, 0x341, 0x7C0, 0x6F9, 0x18A4, 0x95, 0x10A, 0x1D5, 0x37C, 0x3A9, 0x7B0, 0x1969, 0x127, 0x1A3, 0x1C4, 0x2B9, 0x754,
         0x889, 0x0F50, 0x1F0, 0x254, 0x2D9, 0x558, 0x571, 0x924, 0x1019, 0x342, 0x3AD, 0x508, 0x6E9, 0x0A30, 0x10E1, 0x1284, 0x500, 0x5D2, 0x74D]

flag = ""
for i in range(38):
    flag += chr((magic[i] - i * i) >> (i % 7))
print(flag)
```

Kết quả:

![image.png](https://images.viblo.asia/d9fce957-c757-4b2f-989d-97f1699aee8d.png)