Xin chào tất cả mọi người.
Mình tên là nooptr đang làm việc tại 1 công ty startup Nhật Bản, có tên là [Artrigger](https://artrigger.jp/). 1 công ty chuyên cung cấp các giải pháp về Blockchain và License Business.

Hôm nay mình chia sẻ đến mọi người 1 giải pháp khá hay trong vấn đề giải quyết các bài toán liên quan đến xử lí error retries, có tên gọi là Exponential Backoff.

## Vấn đề đặt ra

Khi làm việc với API thì việc gửi request đến API để lấy dữ liệu về là việc làm không thể thiếu. Thế nhưng không phải lúc nào API cũng hoạt động bình thường.
Thi thoảng server có vấn đề và nó không thể xử lí request và sẽ trả về lỗi.
Vậy để giải quyết vấn đề này thì chúng ta sẽ làm thế nào? Đa số chúng ta sẽ retries lại mấy lần, kiểu như sau:
```
retries = 0

DO
    wait 1 second

    status = Get the result of response

    IF status = SUCCESS
        retry = false
    ELSE
        retry = true
    END IF

    retries = retries + 1

WHILE (retry AND (retries < MAX_RETRIES))
```
Đoạn code này dường như hoàn hảo nhưng mà nếu suy nghĩ kĩ thì nó thật sự không hiệu quả trong 1 số trường hợp. Vậy cùng nhau xem nó đang gặp vấn đề nào nhé.

## Exponential Backoff là gì?

**Exponential Backoff** là 1 thuật toán tính toán thời gian đợi giữa mỗi lần retries theo hàm luỹ kế để việc thực hiện gửi lại request được hiệu quả nhất.

Ví dụ như lần retries thứ 1 sẽ đợi 1s, lần retries thứ 2 sẽ đợi 2s, lần thứ 3 sẽ đợi 4s .... Tức là thời gian đợi sau mỗi lần retries sẽ không cố định mà sẽ tăng theo hàm luỹ kế. Và theo như thống kê, nếu làm theo cách này thì sẽ mang lại những hiệu quả sau:
* Giảm tải của server
* Loại bỏ đi những request lãng phí
* Trước khi retries lại thì có thể ở phía server đã giải quyết xong lỗi

## Vấn đề gì xảy khi không dùng Exponential Backoff

Bây giờ chúng ta quay lại ví dụ lúc trước.

```
retries = 0

DO
    wait 1 second

    status = Get the result of response

    IF status = SUCCESS
        retry = false
    ELSE
        retry = true
    END IF

    retries = retries + 1

WHILE (retry AND (retries < MAX_RETRIES))
```

![](https://images.viblo.asia/8286508a-2d5b-40c9-bed2-466ca40ee0ed.jpg)

Giả sử như web server của chúng ta có 2 con (con thứ 1, con thứ 2).
Request gửi từ client, thông qua Load Balancer sẽ gửi lần lượt đến con thứ 1 và con thứ 2.

Giả sử như request gửi từ client thông qua Load balancer sẽ đến con thứ 1. Và lúc này con thứ 1 đang bị lỗi. Khi đó chúng ta sẽ thực hiện retries lại. 
Và những request tiếp theo chắc chắn sẽ gửi đến con thứ 2. 

Nếu như bây giờ thời gian retries của chúng ta fix cứng là 1 giây chẳng hạn. Khi đó toàn bộ request từ client sẽ được gửi liên tiếp đến con thứ 2. 
Điều này đồng nghĩa với việc server thứ 2 sẽ nhận 1 số lượng request lớn, liên tục từ các client. Nó cũng giống như việc tấn công DDos vậy. Và hậu quả là con thứ 2 này cũng có khả năng bị down.

### Ví dụ về thuật toán Exponential Backoff

Vậy chúng ta nên retries lại như nào cho hợp lý? Câu trả lời khá đơn giản. Chúng ta chỉ cần cài đặt thời gian retries là hàm luỹ kế là xong.

```
retries = 0

DO
    wait for random from 0 to (2^retries * 100) milliseconds

    status = Get the result of response

    IF status = SUCCESS
        retry = false
    ELSE
        retry = true
    END IF

    retries = retries + 1

WHILE (retry AND (retries < MAX_RETRIES))
```

Như trong ví dụ trên ta có thể thấy được:

* Nếu request bị thất bại thì chúng ta sẽ đợi (1 + random_number_milliseconds) giây và thực hiện retries
* Nếu request bị thất bại thì chúng ta sẽ đợi (2 + random_number_milliseconds) giây và thực hiện retries
* Nếu request bị thất bại thì chúng ta sẽ đợi (4 + random_number_milliseconds) giây và thực hiện retries

Và sẽ loop cho đến khi số lần retries đạt MAX_RETRIES thì thôi. 
Nếu MAX_RETRIES = 5 thì chúng ta sẽ có 2^5 = 32 giây, MAX_RETRIES = 6 thì chúng ta sẽ có 2^6 = 64 giây. Tuỳ thuộc vào từng use case mà chúng ta sẽ chọn ra giá trị MAX_RETRIES phù hợp.

### Ví dụ thực tế

### Ví dụ 1: Google HTTP client

```
retry_interval = retry_interval * multiplier ^ (N - 1)
randomized_interval := retry_interval * 
(random value in range [1 - randomization_factor, 1 + randomization_factor])
```

* Nếu status của response là 5xx thì sẽ thực hiện retries.
* Mặc định thì retry_interval = 0.5s, randomization_factor = 0.5, multiplier= 1.5, max_interval = 1 minute, max_elapsed_time = 15s
* Nếu retry_interval > max_elapsed_time (15s) thì sẽ stop lại quá trình loop

Kết quả:

```
request retry_interval randomized_interval
01      00.50          [0.25, 0.75]
02      00.75          [0.38, 1.12]
03      01.12          [0.56, 1.69]
04      01.69          [0.84, 2.53]
05      02.53          [1.27, 3.80]
06      03.80          [1.90, 5.70]
07      05.70          [2.85, 8.54]
08      08.54          [4.27, 12.81]
09      12.81          [6.41, 19.22]
10      19.22          STOP
```

### Ví dụ 2：AWS SimpleDB

```
currentRetry = 0
 DO
   status = execute Amazon SimpleDB request
   IF status = success OR status = client error (4xx)
     set retry to false
     process the response or client error as appropriate
   ELSE
     set retry to true
     currentRetry = currentRetry + 1
     wait for a random delay between 0 and (4^currentRetry * 100) milliseconds
   END-IF
 WHILE (retry = true AND currentRetry < MaxNumberOfRetries) 
 ```
 
Kết quả:

```
request randomized_interval
1       [0, 400)
2       [0, 1600)
3       [0, 6400)
4       [0, 25600)
5       [0, 102400)
```

## Tổng kết

Hi vọng qua bài này các bạn cũng hiểu rõ được Exponential Backoff là gì, làm thế nào để retries error hiệu qủa.
Chúc các bạn thành công.

Tài liệu tham khảo:

すべてのプログラマ必見！リトライ処理の効率的な手法、それは「Exponential Backoff」
https://note.mu/artrigger_jp/n/n0795148b062d

Error Retries and Exponential Backoff in AWS:
https://docs.aws.amazon.com/general/latest/gr/api-retries.html

Exponential Backoff And Jitter:
https://www.awsarchitectureblog.com/2015/03/backoff.html

Building for Performance and Reliability with Amazon SimpleDB:
https://aws.amazon.com/articles/Amazon-SimpleDB/1394