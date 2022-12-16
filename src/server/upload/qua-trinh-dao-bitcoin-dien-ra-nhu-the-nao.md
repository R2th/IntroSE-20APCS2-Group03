![](https://media.giphy.com/media/XjXtEuBHulPcQ/giphy.gif)

Nhân dịp Bitcoin vừa mới chia đôi phần thưởng từ 12.5 BTC/Block xuống còn 6.25 BTC/block chưa lâu. Chúng ta cùng tìm hiểu quá trình đào bitcoin được diễn ra như thế nào, cùng một số thông tin hữu ích khác.

## 1. Giới thiệu

Đào Bitcoin (Mining) thường được biết đến như là một quá trình chạy đua giữa các thợ đào (miner) hay các mỏ đào (poll) để giành được phần thưởng thông qua việc giải các câu đố (puzzle) toán học. Điều đó cũng đúng, nhưng chưa đủ. Mục đích quan trọng nhất của quá trình đào bitcoin là giúp bảo mật dữ liệu trên mạng P2P, tránh được các cuộc tấn công, gian lận của kẻ xấu nhằm chuộc lợi bất chính. Việc tạo phần thưởng cho người đào thành công nhằm giúp tạo mới dòng tiền lưu thông trên mạng cũng khuyến khích các người khác đóng góp vào mạng.

### Các thông tin khác
- Thời gian trung bình để đào được 1 block là 10 phút.
- Sau 2 tuần (2016 Blocks) thì mạng sẽ tính toán để điều chỉnh độ khó nhằm đảm bảo thời gian đào được 1 block rơi vào khoảng 10 phút (Trong 2 tuần thì khối lượng tính toán của mạng có thể thay đổi như việc chế ra 1 loại GPU mới giúp đào 1 block trong 5-6 phút chẳng hạn).
- Số lượng Bitcoin được Satoshi và đội ngũ cộng sự giới hạn ở mức 21 triệu BTC.
- Phần thưởng ban đầu giành cho người đào một block thành công là 50 BTC.
- Phần thường sẽ bị chia đôi sau 210.000 Blocks (25 BTC vào tháng 11/2012, 12.5 BTC vào tháng 7/2016 và vài ngày trước đây chỉ còn 6.25 BTC).
- Ngoài phần thưởng cố định cho một block đào được, thợ đào còn nhận được toàn bộ phí giao dịch chứa trong block đó.
- Để cho an toàn, tránh các cuộc tấn công 51%, đảo ngược block thì sau 100 Blocks, thì thợ đào mới nhận được phần thưởng.


## 2. Việc đào Bitcoin tốn năng lượng khủng khiếp như thế nào ?

Chúng ta cũng đã ít nhiều nghe về những câu chuyện những mỏ đào Bitcoin với những con "trâu cày" chạy quanh năm suốt tháng, tiêu tốn một lượng điện năng khổng lồ. Vậy cụ thể đào bitcoin tốn điện như thế nào ? Chúng ta hãy cùng xem qua **Infographic** dưới đây.

![](https://images.viblo.asia/3d0c9c3f-bd6b-4fb7-a996-61fe3d8e0a48.png)

Với mỗi giao dịch trên mạng Bitcoin:
- Thải ra 267.97kg khí C02, tương đương với hơn 600 ngàn giao dịch VISA hoặc hơn 40 ngàn giờ xem Youtube :scream:
- Tốn hơn 500 số điện, bằng năng lượng 1 gia đình dùng cả tháng. 
- Thải ra 78.2 gam chất thải điện năng

## 3. Thuật toán đào bitcoin

Lan man các thông tin bên lề nhiều rồi, giờ chúng ta hãy cùng tìm hiểu chi tiết thuật toán và cách thức để đào bitcoin

### Mã băm

Như chúng ta đã biết, Bitcoin sử dụng hàm băm SHA-256 để mã hóa các thông tin. Giá trị băm sau khi băm bằng SHA-256 ở dạng hexa, đơn giản chúng cũng chỉ là các số, chúng ta hoàn toàn có thể chuyển sang dạng thập phân.

### Độ khó trong việc đào bitcoin

Lấy một ví dụ vì việc gieo 2 con xúc xắc, tổng số số chấm của 2 con xúc xắc nằm trong khoảng [2, 12]. Nếu bây giờ bạn cần gieo xúc xắc mà tổng 2 mặt bé hơn 11 thì đấy không phải là công việc khó lắm, gieo 10 lần ít nhất bạn cũng được 8-9 lần. Nhưng nếu yêu cầu gieo sao cho tổng 2 mặt bé hơn 4 chẳng hạn, thì đó là lại 1 công việc khó nhằn hơn.

Độ khó trong việc đào Bitcoin cũng cùng chung đạo lý với việc gieo xúc xắc ở trên. Với block header đã có cộng thêm số **nonce** (tùy ý), bạn phải tìm ra số **nonce** sao cho giá trị băm **SHA-256** của block header và số **nonce** đó phải bé hơn số cụ thể ở dạng hexa (Số hexa càng có nhiều số 0 liên tiếp ở đầu thì càng bé). Tìm được số **nonce** thỏa mãn, tức là đã thành công trong quá trình đào bitcoin :laughing:

Chúng ta cùng xem đoạn code dưới đây mô tả thuật toán và cách thức đào bitcoin

```python
#!/usr/bin/env python
# example of proof-of-work algorithm

import hashlib
import time

try:
    long        # Python 2
    xrange
except NameError:
    long = int  # Python 3
    xrange = range

max_nonce = 2 ** 32  # 4 billion


def proof_of_work(header, difficulty_bits):
    # calculate the difficulty target
    target = 2 ** (256 - difficulty_bits)

    for nonce in xrange(max_nonce):
        hash_result = hashlib.sha256((str(header) + str(nonce)).encode()).hexdigest()

        # check if this is a valid result, below the target
        if long(hash_result, 16) < target:
            print("Success with nonce %d" % nonce)
            print("Hash is %s" % hash_result)
            return (hash_result, nonce)

    print("Failed after %d (max_nonce) tries" % nonce)
    return nonce
```

- `max_nonce = 2 ** 32`, đoạn code trên thử 4 tỷ số nonce từ 0 đến 2^32 - 1
- `target` là mà trong quá trình đào cần tạo giá trị trị băm < target. Do **SHA-256** có không gian giá trị là **2^256** nền số `difficulty_bits` càng nhiều thị độ khó càng cao (càng nhiều số 0 ở đầu).
- Trong quá trình brute force ở hàm `proof_of_work`, giá trị băm được convert sang kiểu số thập phân để tiện trong quá trình so sánh với giá trị `target`.


## Tài liệu tham khảo
- https://digiconomist.net/bitcoin-energy-consumption
- Mastering Bitcoin: Programming the Open Blockchain