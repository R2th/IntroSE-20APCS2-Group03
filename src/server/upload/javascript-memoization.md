Khi các ứng dụng của chúng ta phát triển và bắt đầu thực hiện các tác vụ tính toán nặng hơn, nhu cầu về tốc độ xử lý ngày càng tăng, và việc tối ưu hóa các quy trình trở nên cần thiết. Khi chúng ta bỏ qua điều này (tối ưu hóa code của mình), chúng ta sẽ nhận được các chương trình tiêu tốn rất nhiều thời gian và sử dụng một khối tài nguyên hệ thống khủng khiếp trong quá trình thực thi.

**1. Khái niệm**   
Memoization là một kỹ thuật tối ưu hóa, giúp tăng tốc các ứng dụng bằng cách lưu trữ kết quả của các lệnh gọi hàm (mà các hàm này được gọi là expensive function) và trả về kết quả được lưu trong bộ nhớ cache khi có cùng một đầu vào yêu cầu (đã được thực thi ít nhất 1 lần trước đó rồi).

**2. Ví dụ để hiểu**   
Hãy xem ví dụ
```
function addTo768(number) {
    return number + 768;
}
addTo768(10); // Outputs 778
addTo768(50); // Outputs 818
addTo768(10); // Outputs 778
```
Tất cả những gì hàm addTo768 làm là cộng bất kỳ số gì được truyền vào thêm 768. Vì thế mỗi khi ta gọi hàm addTo768 thì nó sẽ thực hiện number + 768.
Về thông thường thì hàm này không tiêu tốn quá nhiều. Nhưng với những chức năng to hơn thì đây thực sự là vấn đề.
Vì thế với hàm cơ bản này ta sẽ tối ưu hóa nó.

Nhắc lại khái niệm trên "giúp tăng tốc các ứng dụng bằng cách lưu trữ kết quả của các lệnh gọi hàm (mà các hàm này được gọi là expensive function) và trả về kết quả được lưu trong bộ nhớ cache khi có cùng một đầu vào yêu cầu (đã được thực thi ít nhất 1 lần trước đó rồi)."
Vì vậy cách làm ở đây là ta sẽ cache lại một chức năng đã được thực hiện, giá trị của nó sẽ được lưu lại trong cache. Nếu giá trị đã được tính toán rồi thì sẽ trả về giá trị trong bộ nhớ cache, nếu chưa thì sẽ thực hiện phép tính toán.

Chúng ta sẽ viết lại như thế này
```
function memoizedAddTo768() {
    let cache = {};
    return function addTo768(number) {
        if (number in cache) {
            return cache[number]
        } else {
            cache[number] = number + 768;
            return cache[number];
        }
    }
}
```
Giải thích: Ở đây ta dùng một biến cache để cache lại, và return nó về một funtion. Đây là nguyền tắt áp dụng closure. Nếu chưa rõ về closure thì bạn có thể đọc nó tại đây [Khái niệm closure](https://viblo.asia/p/ban-nen-biet-closure-hoat-dong-nhu-the-nao-aWj53VQQl6m)


```
function memoizedAddTo768() {
    let cache = {};
return function addTo768(number) {
        if (number in cache) {
            return cache[number]
        } else {
            cache[number] = number + 768;
            return cache[number];
        }
    }
}
let memoizedFunctionCall = memoizedAddTo768();
memoizedFunctionCall(10); // Performs calculation, Outputs 778
memoizedFunctionCall(10); // Calculation already performed, Outputs
                             cached 778
```
Giải thích: 
- Khi memoizedFunctionCall(nó là một closure).
- Ta thực hiện gọi memoizedFunctionCall và truyền có nó number = 10. Thì nó sẽ đi vào điều kiện `number in cache` và thực hiện móc tới biến cache để kiểm tra, và nhận thấy điều kiện này là false nên nó thực hiện phép tính toán number + 768 hay chính xác là 10 + 768, rồi add nó vào bộ nhớ caching là biến cache.
- Tiếp theo ta lại gọi memoizedFunctionCall và cũng truyền cho nó đối số là 10. Thì behavior lúc này nó vẫn sẽ đi vào điều kiện `number in cache` và thực hiện móc tới biến cache để kiểm tra, và nhận thấy điều kiện này là true nên nó sẽ trả trực tiếp kết quả nó đã móc từ bộ nhớ cache về luôn.
=> Việc này giúp tăng hiệu suất đáng kể. 

**3. Tổng kết**   
Khái niệm memoization trong JavaScript được xây dựng chủ yếu trên hai khái niệm:
- Closures.
- Higher Order Functions (returning functions from functions).

**Reference**   
https://viblo.asia/p/ban-nen-biet-closure-hoat-dong-nhu-the-nao-aWj53VQQl6m