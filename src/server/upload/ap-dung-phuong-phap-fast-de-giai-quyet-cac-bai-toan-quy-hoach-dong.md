Trong khi lập trình chắc hẳn chúng ta đã từng tiếp cận với quy hoạch động và các bài toán liên quan đến thằng này thường khá khó "nhằn" :D. Bài viết này sẽ tìm hiểu một phương pháp để giúp chúng ta có thể dễ dàng hơn trong việc "xử đẹp" những bài toán liên quan đến nó.
![](https://images.viblo.asia/f30281c7-2095-47b7-a7b7-c63d4fee81e5.jpg)
# Phương pháp "FAST" này là gì vậy?
"FAST" ở đây thực ra là tên các chữ cái lấy ra từ các bước trong phương pháp này trong tiếng anh. Mình có "việt sắp" nó ra. Các bước đó là:
- Tìm giải pháp đầu tiên (**F**irst Solution)
- Phân tích giải pháp đầu tiên vừa tìm ra (**A**nalyze the first solution)
- Tìm các đoạn lặp của chúng (Identify the **S**ubproblems)
- Chuyển về dạng của quy hoạch động(**T**urn the solution around)

Và để cho đơn giản và giải thích cho các bước của phương pháp này mình sẽ sử dụng ví dụ về số Fibonacci. Bài toán như sau: Cho 1 số nguyên n. Viết một hàm để trả về số Fibonacci số n.
OK let's go!
# Step1: First solution
Bước đầu tiên trong phương pháp này là tìm ra giải pháp đầu tiên. Nhớ lại về số Fibonacci
``` java
fibonacci(n) = fibonacci(n-1) + fibonacci(n-2) // định nghĩa
fibonacci(0) = 0, fibonacci(1) = 1 // các điều kiện cơ sở
```
Nhìn vào định nghĩa trên ta có thể dễ dàng tìm ra "first solution" của nó bằng cách viết một hàm đệ quy
``` java
public int fibonacci(int n) {
    if(n<2) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}
```
OK xong, "easy vồn" :D
Nhưng sự thật là giải pháp trên trong thuật ngữ người ta gọi là "Naive method" (mình dịch là phương pháp ngây thơ )
Hãy chuyển sang bước 2 để xem tại sao nó lại là "ngây thơ".
# Step 2: Analyze the first solution
Hãy cùng phân tích phương pháp ở bước 1 vừa tạo ra.
Hãy thử chạy nó với n = 4 xem điều gì xảy ra.
``` java
fibonacci(4) = fibonacci(3) + fibonacci(2); // bước 1
// tiếp theo các hàm fibonacci(3) và fibonacci(2) sẽ được tính theo công thức đệ quy 
fibonacci(3) = fibonacci(2) + fibonacci(1);  // tại đây hàm fibonacci(2) lại được gọi và sẽ được thực hiện lại mặc dù tại bước 1 đã được tính rồi 
fibonacci(2) = fibonacci(1) + fibonacci(0); 
...
cho đến khi gặp "base solution" tại n = 0 hoặc n = 1 sẽ trả về kết quả tương ứng là fibonacci(0) = 0, fibonacci(1) = 1
```
Chúng ta có thể tính được "run time" của phương pháp này. Có thể thấy độ sâu của cây khi ta gọi đệ quy là n, với mỗi lần đệ quy sẽ gọi 2 hàm. Vậy ta có thể tính toán được số lần gọi là **2^0 + 2^1 + ... + 2^n-1** rút gọn thành **o(2^n)** (đúng là "ngây thơ" thật :( )
Hãy cùng sang bước 3 để cùng xem các bước lặp của phương pháp này.
# Step 3: Find the subproblems
Tại mỗi bước gọi ta chia ra được thành 2 subproblems, sau đó ta sẽ dùng kết quả của các subproblems này để tính toán cho kết quả cuối cùng.
```
 với mỗi lần gọi fibonacci(n) sẽ có 2 subproblems là fibonacci(n-1) và fibonacci(n-2)
 Với bài toán Fibonacci này ta có thể dễ dàng tìm được subproblems của nó, tuy nhiên với nhiều bài việc tìm ra nó có thể sẽ phức tạp hơn.
```
ví dụ
```
fibonacci(4) = fibonacci(3) + fibonacci(2)
fibonacci(3) = fibonacci(2) + fibonacci(1)
```
Có thể thấy fibonacci(2) được gọi trong cả 2 lần và mỗi lần phải xử lý lại, nên ta có thể nghĩ ra ý tưởng sử dụng một cấu trúc dữ liệu như là cache để lưu lại kết quả cho nó, để lần sau khi gặp lại lời gọi với n=2 ta có thể có ngay kết quả mà không cần xử lý lại nữa.
Mình sẽ dùng mảng để cache lại kết quả của nó và sẽ được hàm code lại như sau:
``` java
public int fibonacci(int n) {
    if (n < 2) return n;
    // tạo mảng cache
    int[] cache = new int[n+1];
    for (int i = 0; i < cache.length; i++) {
        cache[i] = -1; // gán các phần tử trong cache ban đầu = -1
    }
    // gán giá trị cho các "base"
    cache[0] = 0;
    cache[1] = 1;
    return fibonacci(n, cache);
}
private int fibonacci(int n, int[] cache) {
    // nếu giá trị đã có trong cache return luôn mà không cần tính lại
    if (cache[n] >= 0) return cache[n];
    // nếu không thì tính và lưu vào cache
    cache[n] = fibonacci(n-1, cache) + fibonacci(n-2, cache);
    return cache[n];
}
```
OK. đến đây ta có thể thấy độ phức tạp được giảm xuống còn **o(n)** và bộ nhớ phải sử dụng là mảng với n phần tử. Bước này là giải quyết theo kiểu top-down.
# Step 4: Turn the solution around
Sau khi đã giải quyết được vấn đề ở bước 3, chúng ta sẽ chuyển nó về dạng của quy hoạch động là bottom-up. Lúc này do đã hiểu được vấn đề nên bước này có thể dễ dàng thực hiện được.
Ta thấy fibonacci(0) = 0, fibonacci(1) = 1 và các bước với n cao hơn sẽ dựa vào 2 điều kiện này để tính tiếp cho đến khi đạt đến n. Do vậy như kiểu ta "thông" ngược từ dưới lên nên nó mới gọi là bottom-up :D
Vậy có được hàm như sau:
``` java
public int fibonacci(int n) {
    if (n == 0) return 0;
    // khởi tạo cache
    int[] cache = new int[n+1];
    cache[1] = 1;
    // chạy vòng lặp và lưu vào cache
    for (int i = 2; i <= n; i++) {
        cache[i] = cache[i-1] + cache[i-2];
    }
    return cache[n];
}
```
Với nhiều bài toán thì sẽ thực hiện đến bước này. Trong trường hợp bài này có thể có giải pháp tốt hơn mà không cần sử dụng đến mảng để lưu cache và độ phức tạp vẫn là **o(n)**.
``` java
public int fibonacci(int n) {
    if (n < 2) return n;
    int n1 = 1, n2 = 0; // lưu cơ sở vào các biến
    for (int i = 2; i < n; i++) {
        int n0 = n1 + n2;
        n2 = n1;
        n1 = n0;
    }
    return n1 + n2;
}
```
OK. xong vậy là ta đã chuyển về thành một đoạn code với độ phức tạp và bộ nhớ được lưu trữ được giảm đi đáng kể. :D
# Kết luận
Như vậy khi gặp 1 bài toán với quy hoạch động chúng ta có thể áp dụng các bước của phương pháp "FAST" này để giải quyết chúng. Mặc dù với những bài toán khác các bước để thực hiện sẽ phức tạp hơn nhưng chúng sẽ "kiểu kiểu" thế này. Mình sẽ trình bày các ví dụ khác áp dụng phương pháp này trong các bài viết tới.Nếu có gì sai sót, bổ sung hay thảo luận hãy để lại bình luận phía dưới. Cảm ơn đã đọc! :D

References: <br>
https://www.byte-by-byte.com/fast-method/ <br>
https://www.geeksforgeeks.org/solve-dynamic-programming-problem/