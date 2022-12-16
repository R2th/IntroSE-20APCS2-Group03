# Intro
Tiếp tục với series write-up các rev challenges của Nahamcon2022, lần này sẽ là 1 bài ở mức độ medium: **Kamikaze**. Không hiểu sao bài này không thấy team nào writeup luôn, trên CTF Time cũng ko có 🤕. Whatever, mình sẽ điền vào chỗ trống vậy :triumph: 

## Kamikaze

> Point: 495
> 
> Rating: medium
> 
> Solved: hình như hơn 50 team gì đó, trang CTF chết rồi nên ko xem được :face_with_head_bandage: 

File binary: https://mega.nz/file/LlVGRJqR#PoTNc3XNXf7LZVMFJ7x0DK3MOBfxauuV2VHhDNqvMHg

Độ khó đã được +1. Check file:

```
➜  rev file kamikaze
kamikaze: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=10b91b097890dc22b1ccf7beea3887c9dfaca8c1, for GNU/Linux 3.2.0, stripped
```

và chạy thử:

```bash
➜  ~ ./kamikaze
./kamikaze: /lib/x86_64-linux-gnu/libc.so.6: version `GLIBC_2.32' not found (required by ./kamikaze)
./kamikaze: /lib/x86_64-linux-gnu/libc.so.6: version `GLIBC_2.34' not found (required by ./kamikaze)
```

oạch, lỗi này là do file được compile với libc mới hơn so với libc trong WSL2 của mình, có thể khắc phục bằng nhiều cách, nâng cấp libc hoặc đơn giản nhất là mount folder vào và chạy trong docker `debian:latest`:

```bash
docker run -it -v $(pwd):/src --rm debian bash
```

Sau khi fix và chạy lại ta có màn hình sau:

```
➜  rev ./kamikaze
▓██   ██▓ ▒█████   █    ██    ▓█████▄  ██▓▓█████ ▓█████▄
 ▒██  ██▒▒██▒  ██▒ ██  ▓██▒   ▒██▀ ██▌▓██▒▓█   ▀ ▒██▀ ██▌
  ▒██ ██░▒██░  ██▒▓██  ▒██░   ░██   █▌▒██▒▒███   ░██   █▌
  ░ ▐██▓░▒██   ██░▓▓█  ░██░   ░▓█▄   ▌░██░▒▓█  ▄ ░▓█▄   ▌
  ░ ██▒▓░░ ████▓▒░▒▒█████▓    ░▒████▓ ░██░░▒████▒░▒████▓
   ██▒▒▒ ░ ▒░▒░▒░ ░▒▓▒ ▒ ▒     ▒▒▓  ▒ ░▓  ░░ ▒░ ░ ▒▒▓  ▒
 ▓██ ░▒░   ░ ▒ ▒░ ░░▒░ ░ ░     ░ ▒  ▒  ▒ ░ ░ ░  ░ ░ ▒  ▒
 ▒ ▒ ░░  ░ ░ ░ ▒   ░░░ ░ ░     ░ ░  ░  ▒ ░   ░    ░ ░  ░
 ░ ░         ░ ░     ░           ░     ░     ░  ░   ░
 ░ ░                           ░                  ░
core.exception.AssertError@source/app.d(137): Assertion failure
----------------
??:? _d_assertp [0x562ed6c8e3c0]
??:? _Dmain [0x562ed6c79d55]
```

ok fine, đề bài cũng nó đến việc chương trình chạy sẽ bị exception, không rõ nguyên nhân tại đâu và chúng ta sẽ là người tìm hiểm giải quyết vấn đề này (chứ còn ai vào đây nữa 😹)

Nhìn vào log debug, ta thấy source code là file: `app.d`, có lẽ nào là 🤔

![image.png](https://images.viblo.asia/f78a9014-639d-404e-86ec-a4288e16444d.png)

Load vào IDA nào:

![image.png](https://images.viblo.asia/52adaec7-7f63-42c8-9c70-3e07dc7e0d41.png)

không còn nghi ngờ gì nữa rồi: https://dlang.org/library/rt/dmain2/_d_run_main.html :joy:

Đây là lần đầu mình RE một binary viết bằng ngôn ngữ này nên cũng ko biết bắt đầu từ đâu, chúng ta trace ngược lại từ log ở trên, lỗi nằm ở hàm `_d_assertp` được gọi từ `_Dmain`:

![image.png](https://images.viblo.asia/a9917684-d182-4073-a723-83ef11bea8a2.png)

hàm siêu ngắn, để ý `D3app3artFZv` nếu bỏ bớt các char thừa sẽ có thể hiểu là `D_app_art`, khả năng là hàm in ra dòng ASCII Art `you died` rồi.

đổi tên 1 chút cho dễ nhìn:

```c
__int64 Dmain()
{
  __int64 v0; // rax
  __int64 v1; // rdx

  v0 = D_app_handler(0LL, 0LL, 0);
  D_app_handler(v0, v1, 5);
  D_app_art();
  d_assertp("source/app.d", 0x89u);
  return 0LL;
}
```

Vậy thứ mà chúng ta cần quan tâm ở đây chính là hàm `D_app_handler`, tiếp tục đi vào hàm này đọc và đổi tên biến/hàm cho dễ hiểu nhé 😄:

![image.png](https://images.viblo.asia/40536a66-3ae1-4ac6-9780-6fe59cb2466d.png)

Đây là một switch-case với nhiều lựa chọn, theo flow chương trình ở `Dmain` thì đầu tiên chúng ta sẽ đi vào case 0, tức là đi vào `D_app_stage1`:

![image.png](https://images.viblo.asia/42c65408-9858-4041-ae78-ed24df9a9bfb.png)

nhìn trông thật kinh dị á 😱. đọc dần từ đoạn 1 nào:
1. Đầu tiên là khởi tạo một mảng `v8` gồm 47 phần tử.
2. Sau đó chúng ta thấy 2 lệnh call đến `D_app_handler` với `choice` tương ứng là 2 và 6. Xem lại switch-case ở trên thì tương ứng với hàm `D_app_vault1` và tham số là 2 và 0. Xem thử hàm `D_app_vault1`:

![image.png](https://images.viblo.asia/33cd86e7-faa9-4cc2-a64c-052ac03535c9.png)

Hàm này cơ bản là trả ra giá trị tương ứng của phần tử trong mảng 4 phần tử được định nghĩa sẵn:

   - với `a1` bằng 0 sẽ trả về `ef66958a6097f790`
   - với `a1`bằng 2 sẽ trả về `5b462fe26831553204b66d88d2bb05c9`

chút nữa ta sẽ thấy 2 giá trị này có vai trò gì.

- Quay lại với `D_app_stage1`, hai giá trị lấy ra từ vault, cùng với các giá trị khác sẽ được đưa vào làm tham số của `D6crypto3aes8AESUtils__T7decryptTCQBhQBd__T3AESVki4Vki4Vki10ZQsZQBoFIAhIAaIQgEQCz7padding11PaddingModeZAh`. Nhìn sơ sơ thì đây là hàm decrypt của AES. Đến đây ta cần debug 1 chút.
- Đặt breakpoint ở lệnh call vào hàm này vào debug bằng IDA:

![image.png](https://images.viblo.asia/fffda1c0-a617-4970-9de0-592e69462a30.png)

+ `00007FB289595000` sẽ là chuỗi `5b462...`, ngay trên đó là chiều dài của nó `0x20` (32 ký tự)
+ `00007FB289593000` sẽ là mảng `v8` có chiều dài `0x30` (= 48, tính cả null byte)
+ tương tự, `00007FB289596000` là chuỗi `ef669...` 
- Kết hợp đọc thêm doc ở đây: https://github.com/shove70/crypto/blob/master/src/crypto/aes.d#L391 suy ra `5b462...` chính là key ở dạn hex-encoded còn `ef669...` là IV.

Vậy hàm gọi sẽ là:

```c
  v9 = D_crypto_aes_AESUtils__T_decrypt__PaddingMode(
         3, // padding mode
         iv_len,
         iv,
         v6,
         key_len,
         key,
         48LL, // cipher len
         cipher);
```

`PaddingMode` có giá trị là 3, tương ứng sẽ là `PKCS5` theo như document ở đây: https://github.com/shove70/crypto/blob/effb9357d8de9205cf8047f6777abc34bf8f28d0/src/crypto/padding.d

```d
enum PaddingMode
{
    NoPadding,       // None
    ANSIX923,        // 00 00 00 04 (Zero   + size)
    ISO10126,        // 0A EB 02 04 (Random + size)
    PKCS5,           // 04 04 04 04 (All size)
    PKCS7,           // 04 04 04 04 (All size)
    Zeros,           // 00 00 00 00 (All zero)
    Customized       // 00 00 00 00 + (00 00 00 04) (Zero + Original size)
}
```

Tuy nhiên trong thời gian thi thì mình không code lại được bằng code python để ra được kết quả decrypt như bên dưới, nên đành tạm thời debug tiếp.

Tiếp tục debug qua hàm này, ta thấy kết quả trả về ở `RDX` tại `0x00007FB289593040` (nhận biết bằng đoạn padding `0xA` ở cuối đặc trưng theo chuẩn của `PKCS5`). Bỏ phần padding đi thì phần decrypt ra sẽ có chiều dài 38, đúng với format flag của cuộc thi: `flag{md5_hash_of_something}` nên khả năng cao đây chính là flag rồi, tuy nhiên còn cần một (hoặc nhiều bước giải mã nữa).

![image.png](https://images.viblo.asia/8a486191-764e-406e-aa14-c40c1c87d81a.png)

OK xong `D_app_stage1`, quay lại với flow của switch-case, choice tiếp theo là 5, đưa chúng ta vào hàm `D_app_stage2`:

![image.png](https://images.viblo.asia/bb3c5422-96f0-45e2-98bb-d99d5b74bf5a.png)

`v2` chính là mảng kết quả ở bước trước. Ở đây là vòng for ngược từ cuối về đầu (chú ý cụm `i - 1`), và đến khi `i - 1 = 4` (tức là trước khi xor ra đoạn `flag`) thì văng exception 🤨 (chính là lỗi mà chúng ta gặp phải ở đầu bài)

Đặt breakpoint sau mỗi bước XOR và quan sát `00007FB289595060` sẽ thấy có flag:

![image.png](https://images.viblo.asia/16bffef4-0083-40b9-8d44-5d0c3499ef3c.png)

hoặc chạy script sau:

```python
magic = [0x67, 0x6E, 0x62, 0x63, 0x7E, 0x3E, 0x3F, 0x38, 0x3B, 0x3B, 0x68, 0x68, 0x34, 0x39, 0x3E, 0x28, 0x22, 0x21, 0x25,
         0x27, 0x74, 0x74, 0x23, 0x7A, 0x2A, 0x79, 0x2D, 0x7E, 0x7B, 0x2A, 0x2A, 0x11, 0x18, 0x1B, 0x12, 0x14, 0x12, 0x5B]
flag = ""
for i in range(38):
    flag += chr(magic[i] ^ (i+1))
print(flag)
```

```
flag{88021cd97183363ab4b3c6bf45199107}
```

# End

Ở phần 3 cũng là phần cuối của series, chúng ta sẽ đến với một sự thú vị.