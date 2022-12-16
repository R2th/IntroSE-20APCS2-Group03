# Programming 01
## Đề bài

```
nc 15.164.75.32 1999
```

## Lời giải

Connect thử chúng ta được màn hình như sau:

```
PROGRAMING - WHITEHAT GRANDPRIX 06:

--> COUNT THE NUMBER OF POSSIBLE TRIANGLES <--

HOW MANY TRIANGLES ARE CREATED BY N (1..N) NUMBER. N < 10^6

Example:  N = 5
OUTPUT : 3 

(2,3,4),(3,4,5),(2,4,5)
................/\...................|\...................
.............../  \..................| \..................
............../    \.................|  \.................
............./      \................|   \................
............/        \...............|    \...............
.........../          \..............|     \..............
........../____________\.............|______\.............

n = 11
Answer: %
```

    Vậy là đề bài yêu cầu tìm số hình tam giác có cạnh là số nguyên, có thể tạo được bằng các số tự nhiên từ 1 cho đến N. Vì N rất lớn (> 99999) nên khả năng cao là sẽ có công thức toán cho đáp án, ta có thể google hoặc ngồi phân tích thuật toán. Cơ mà mình dốt toán nên sẽ google :cry:. Code nhanh 1 chương trình tìm số tam giác theo đúng yêu cầu đề bài:

```python
from itertools import permutations

for N in range(4, 10):
    ans = []
    for a, b, c in permutations(range(1, N+1), 3):
        if a + b > c and b + c > a and a + c > b:
            ans.append("-".join(map(str, sorted([a, b, c]))))
    ans = set(ans)
    # print(ans)
    print(len(ans))
```

rồi thử chạy với các N nhỏ (4, 5, 6, 7,...) thì ra dãy sau:

```bash
➜  whqual2020 python brute_triangle.py
1
3
7
13
22
34
```

Google thử dãy này thì ra kết quả: [https://oeis.org/A173196](https://oeis.org/A173196)

> a(n-1) is the number of integer-sided scalene triangles with largest side <= n, including degenerate (i.e., collinear) triangles. a(n-2) is the number of non-degenerate integer-sided scalene triangles. - Alexander Evnin, Oct 12 2010

OK, vậy công việc chỉ còn implement công thức tính, kết nối và lấy flag thôi (chú ý offset của N đề bài so với n của dãy):

```python
from netcatlib import Netcat

nc = Netcat('15.164.75.32', 1999)
resp = nc.read_until("Answer:")
while True:
    for line in resp.split("\n"):
        print(line)
        if "n = " in line:
            N = int(line[line.index("n = ") + 4:])
            print(N)
            break
    K = N - 2
    ans = (4*K**3 + 6*K**2 - 4*K - 3 + 3*(-1)**K)/48
    print("ans = ", ans)
    nc.write(str(ans) + "\n")
    resp = nc.read_until(":")
    print(resp)
```

Chạy và lấy flag:

```bash
➜  whqual2020 python prog01.py      

PROGRAMING - WHITEHAT GRANDPRIX 06:

--> COUNT THE NUMBER OF POSSIBLE TRIANGLES <--

HOW MANY TRIANGLES ARE CREATED BY N (1..N) NUMBER. N < 10^6

Example:  N = 5
OUTPUT : 3 

(2,3,4),(3,4,5),(2,4,5)
................/\...................|\...................
.............../  \..................| \..................
............../    \.................|  \.................
............./      \................|   \................
............/        \...............|    \...............
.........../          \..............|     \..............
........../____________\.............|______\.............

n = 7
7
('ans = ', 13)
 Well done! Let's accelerate.n = 9999
Answer:
 Well done! Let's accelerate.n = 9999
9999
('ans = ', 83270847499)
 Great ! the last challenge. n = 1000000
Answer:
 Great ! the last challenge. n = 1000000
1000000
('ans = ', 83332958333750000)
  You are Victorious : 
  You are Victorious : WhiteHat{Y0u_h4v3_4_Sm4rt_Br41n}
('ans = ', 83332958333750000)
Traceback (most recent call last):
  File "prog01.py", line 18, in <module>
    resp = nc.read_until(":")
  File "/Users/nguyen.anh.tien/ctf/whqual2020/netcatlib.py", line 22, in read_until
    self.buff += self.socket.recv(1024)
socket.error: [Errno 54] Connection reset by peer
```

Vậy flag là `WhiteHat{Y0u_h4v3_4_Sm4rt_Br41n}`.

# Blockchain - Misc

## Đề bài

```
Blockchain application in IOT system.
Using vulnerable chipset to generate public keys.

http://52.78.210.118/Blockchain.zip
```

## Lời giải

   Mới nhìn tên đề bài, cứ ngỡ là là sẽ có chút gì đó liên quan đến blockchain với hash, timestamp, block, vân vân nhưng sau khi làm xong, đơn giản lại là 1 bài crypto trá hình :anguished: . Giải nén file zip ta có:

```
.
├── 34a7370734caff5d129ad355f78f3ccf.pem
├── 8a95963d7bedd2b81ad09cd1838c7a4d.pem
├── block1.json
├── block2.json
├── block3.json
└── flag.zip
```

File `flag.zip` bên trong có một file `flag.txt` có password, nhiệm vụ của ta sẽ là tìm password để giải mã file này. Xem lại 2 file pem thì thấy public key rất ngắn, thêm hint đề bài `Using vulnerable chipset to generate public keys.` thì khả năng là sẽ factor được hoặc 2 public keys này sẽ có chung factor. Và đúng là đề bài theo hướng thứ 2. Nhanh chóng chúng ta tìm ra được `p`, `q` tương ứng cho 2 key:

```python
# 8a95963d7bedd2b81ad09cd1838c7a4d

p1 = 1091951834898382993408357240646061116416467734213916798265279491274843400183
q1 = 968357930958770928862265655524254201820039464684491130864944605493368598601

# 34a7370734caff5d129ad355f78f3ccf
p2 = 1091951834898382993408357240646061116416467734213916798265279491274843400183
q2 = 3602083547017910155331521957638413821351348404017103506647493207187611603783
```

cùng xem thử nội dung `block1.json`:

```json
{
  "data_block": [
    {
      "34a7370734caff5d129ad355f78f3ccf": {
        "messger": "864826346328927043007924641380681736981324987926997370887020532699182309378599192043216478265476219278213123962074508284028662403643532629433329761492"
      }
    },
    {
      "8a95963d7bedd2b81ad09cd1838c7a4d": {
        "messger": "259242051785557714557594066190019826465030870294179284671916925100489488841761299528416294893049464518482888070747927907550583942630013791833474340284"
      }
    }
  ]
}
```

Ta thử decrypt với private key tương ứng cho 2 message sẽ ra plaintext, và thật ngạc nhiên là cả block 2, block 3 ta có thể làm tương tự (mà không cần quan tâm đến block đằng trước ?!!, có vẻ là do phần checking kia đã bị loại bỏ, chỉ còn lại data bên trong). Code nhanh file giải mã:

```python
import binascii
# 8a95963d7bedd2b81ad09cd1838c7a4d

p1 = 1091951834898382993408357240646061116416467734213916798265279491274843400183
q1 = 968357930958770928862265655524254201820039464684491130864944605493368598601
d1 = 890409172165972946654999517131765096619044495455563634699347004973962052351583003107345858884088740814369362782066954018932838938065269321325801558673
n1 = p1*q1

# 34a7370734caff5d129ad355f78f3ccf
p2 = 1091951834898382993408357240646061116416467734213916798265279491274843400183
q2 = 3602083547017910155331521957638413821351348404017103506647493207187611603783
d2 = 693850823202558629985086506870478277795253330491028235428549797234329350960719509661597224650158883970045955832376666148611503822720520111138909455845
n2 = p2*q2

b1m1 = 259242051785557714557594066190019826465030870294179284671916925100489488841761299528416294893049464518482888070747927907550583942630013791833474340284
b1m2 = 864826346328927043007924641380681736981324987926997370887020532699182309378599192043216478265476219278213123962074508284028662403643532629433329761492

b2m1 = 260259490441096686614518844301454718739843509738983969165420676005404297357230613482141235832583253831691051931351295653801889428212969414301414329852
b2m2 = 3467074671076858427887425157777463145087476633275513864943463990703623032280801013924306443879332057123214793127862390154827554625137418534583896303616

b3m2 = 1535086324597057729311343510271769159442400498252787851926410538373297030193590329732950032623600137243772129943527400615893561445637150940979108765230
b3m1 = 182842058942028668693782090218012558408325328016978308589264490683273716484502724907545336344750909005728737352410277713521976130375761311818569486299


def decrypt1(x):
    return pow(x, d1, n1)


def decrypt2(x):
    return pow(x, d2, n2)


def de(x):
    k = hex(x)[2:-1]
    if len(k) % 2 != 0:
        k = "0" + k
    return binascii.unhexlify(k)


print(de(decrypt1(b1m1)))
print(de(decrypt2(b1m2)))

print(de(decrypt1(b2m1)))
print(de(decrypt2(b2m2)))

print(de(decrypt1(b3m1)))
print(de(decrypt2(b3m2)))
```

và chạy:

```
➜  whqual2020 python blockchain.py 
Password using open flag.zip
Do you understand the blockchain?
Password = Password1+Password2
flag in flag.txt
Password2:'D@V!4P##Ij'
Password1:'irVOwoJR7d'
```

Dùng password `irVOwoJR7dD@V!4P##Ij` giải nén file `flag.zip` ta nhận được một file mới với nội dung là base64, decode ra được 1 file ảnh QR. Scan QR code này ta có flag:

![](https://images.viblo.asia/b8312cfb-6826-477c-9ced-367e3af26632.png)

Flag: `Whitehat{the_ flag_blockchain_ iot}`

# Kết