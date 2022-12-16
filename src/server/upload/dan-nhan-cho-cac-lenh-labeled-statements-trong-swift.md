Đây là bài dịch từ của một chia sẻ trên trang [medium](https://medium.com), bài viết nguồn mời các bạn xem tại đây: https://medium.com/@rwgrier/swift-labeled-statements-3624ff30e0e7

Tôi sẽ thành thật. Tôi đã không biết tới khái niệm **Labeled Statements** (cũng như trong Swift nói riêng) cho đến một vài ngày trước. Tôi đã phát hiện ra chúng khi đọc [Pro Swift] (https://gumroad.com/l/proswift) của [Paul Hudson](https://twitter.com/twostraws) cho [câu lạc bộ sách Philly CocoaHeads](https://www.meetup.com/PhillyCocoaHeads/).

**Labeled Statements** cho phép lập trình viên dán nhãn cho các câu lệnh điều khiển. Dưới đây là một vòng lặp **for** sẽ trông như thế nào khi được dán nhãn.
```
fancyLabel: for each in array {
    ...
}
```
Một lệnh **if** khi dán nhãn cũng sẽ trông gần tương tự như vậy:
```
anotherLabel: if known == test {
    ...
}
```
Cuối cùng một lệnh **switch** khi dán nhãn sẽ trông như sau:
```
switchLabel: switch(myEnum) {
    ...
}
```
Như bạn có thể thấy cú pháp cho việc dán nhãn là *label* theo sau là dấu hai chấm (:) và sau đó là câu lệnh như thông thường.

Được rồi, vậy những việc gì chúng ta có thể làm với việc dán nhãn các lệnh này?

Đây có thể được coi như là một lệnh **goto**. Bạn có thể tiếp tục hoặc thoát khỏi lệnh để thay đổi luồng điều khiển của lệnh được dán nhãn, hoặc thoát ra ngoài lệnh được dán nhãn.

Việc dán nhãn này có thể thuận tiện cho việc thoát ra các vòng lặp lồng nhau. Thông thường, thoát ra một vòng lặp lồng bị lồng trong một vòng lặp khác thì chỉ thoát được vòng lặp đó, không thoát ra khỏi được vòng lặp bên ngoài. Bằng các dán nhãn cho vòng lặp bên ngoài, bạn có thể đi tới hoặc thoát ra khỏi vòng lặp bên ngoài một cách hiệu quả.
Dưới đây là 2 ví dụ:

Một vòng lặp sử dụng **continue** :
```
fancyLabel: for each in array {
    for eachSubItem in subArray {
        switch statement {
        case one:
            continue fancyLabel
        ...
        }
    }
    ...
}
```
Còn đây là việc thoát ra khỏi vòng lặp phía ngoài bằng lệnh **break**
```
fancyLabel: for each in array {
    for eachSubItem in subArray {
        if statement {
            break fancyLabel
        }
        ...
    }
    ...
}
```

Nếu bạn có một phương thức phức tạp bao gồm các vòng lặp lồng nhau, việc dán nhãn lệnh sẽ cho phép bạn thoát khỏi từ vòng lặp bên ngoài và tiếp tục thực hiện các câu lệnh khác trong phương thức.
```
func findNeedle() -> Coordinates {
    var x: Int = 0, y:Int = 0
    searchHaystack: for row in haystack {
        for each in row {
            if each == needle {
                break searchHaystack
            }
            
            y += 1
        }
        x += 1
        y = 0
    }
    doStuffWithResults()
    return (x, y)
}
```
Ví dụ này sẽ lặp qua một mảng liên quan để tìm kiếm một giá trị. Khi tìm thấy *needle*, nó sẽ thoát ra khỏi các vòng lặp lồng nhau và tiếp tục với phương thức. Đây là một ví dụ thực sự đơn giản về cách sử dụng các câu lệnh được dán nhãn. Tôi đã cố gắng nghĩ về một ví dụ tốt hơn, nhưng không có gì thực sự cảm thấy tốt. Tôi cảm thấy như những ví dụ tôi đưa ra có thể được viết tốt hơn mà không cần tuyên bố dán nhãn nào cả.

Tôi không nghĩ rằng những điều này sẽ hoàn toàn hữu ích trong thực tế. Về bản chất, chúng là những lệnh goto và sử dụng chúng có cảm giác như một *code smell* đối với tôi. Nếu bạn cần sử dụng chúng, có lẽ bạn có thể cấu trúc lại mã của mình để tránh chúng. Nhưng nó rất vui khi biết rằng chúng tồn tại.