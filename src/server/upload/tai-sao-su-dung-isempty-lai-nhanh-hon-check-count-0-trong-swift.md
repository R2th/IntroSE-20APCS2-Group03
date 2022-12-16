![](https://images.viblo.asia/bf1b896d-10df-4ff0-83c3-8d82dc32b980.jpg)

Nếu bạn muốn kiểm tra một array, set, string hoặc collection type khác có rỗng hay không, bạn sẽ viết đoạn code như sau : 

```swift
let name = ""

if name.count == 0 {
    print("You're anonymous!")
}
```

Tuy nhiên, đoạn code sau đây sẽ hiệu quả hơn so với cách viết trên: 

```swift
if name.isEmpty {
    print("You're anonymous!")
}
```

=> Việc sử dự isEmpty sẽ dễ hiểu cũng như chạy nhanh hơn so với cách thông thường

## 1. Cách mà String được tạo ra trong swift.
Để hiệu được tại sao isEmpty lại nhanh hơn count == 0 với String, chúng ta cần hiểu được cách để tạo ra String trong Swift.

Chuỗi trong Swift là tập hợp các kí tự phức tạp, trong đó có thể kết hợp giữa cả kí tự và biểu tượng thành một chuỗi hiển thị cho người dùng.
Ví dụ, một biểu tượng lá cờ Anh thực sự được tạo thành từ 2 kí tự "G" và "B". Tất nhiên nó không phải tạo từ các chữ cái đó mà là do mã Unicode khi được đặt cạnh nhau sẽ tạo thành biểu tượng.

Chúng ta sẽ tạo 2 biến lưu trữ kí hiệu "G" và "B", và tạo biến thứ 3 kết hợp 2 biến đó với nhau. Kết quả là nó sẽ không hiển thị dạng "GB" mà chúng được chuyển thành biểu tượng cờ nước Anh.

![](https://images.viblo.asia/aefe09cf-eb34-457a-8569-fa659ecb1ee6.png)

Tiếp theo, bạn hãy chú ý đến count của các biến, tất cả đều là 1. Vì vậy, khi nhìn từ code thì bạn sẽ thấy chuỗi thứ 3 là 2 kí tự, nhưng từ góc nhìn của người dùng thì nó chỉ là một. 
Swift được thiết kế để ngăn việc phá vỡ các chuỗi Unicode như thế, do đó nó coi biểu tượng chỉ là một kí tự.

## 2. Index trong String.
Do sự phức tạp này, chuỗi không thể đọc các kí tự riền lẻ bằng index, điều đó có nghĩa là đoạn code sau sẽ không được biên dịch:
```swift
let name = "Guybrush Threepwood"
print(name[0])
```

Điều đó không đồng nghĩa với việc chúng ta không thể lấy các kí tự theo index. Chúng ta có thể dùng theo cách sau: 
```swift
extension String {
    subscript(i: Int) -> Character {
        return self[index(startIndex, offsetBy: i)]
    }
}
```

Tuy nhiên, mọi thứ không đơn giản như vậy, mỗi kí tự trong chuỗi của Swift có thể được lưu trữ dưới dạng một, hai, hoặc nhiều giá trị. Swift không thể biết trước được kí tự thứ 5 ở đây sẽ là gì, subscript ở đây sẽ duyệt chuỗi từ đầu cho đến khi tìm thấy kí tự bạn yêu cầu.
Điều này trở lên có vấn đề bời khi bạn viết code như thể để in ra các kí tự của String sử dụng subscript:

```swift
for i in stride(from: 0, to: name.count, by: 2) {
    print(name[i])
}
```

Chúng ta thấy rằng độ phức tạp ở đây là O(n), có nghĩa là chiều dài của chuỗi sẽ ảnh hướng tới tốc độ chạy của đoạn code. Vì vậy, chuỗi 1 kí tự có thể mất 1 giây để chạy, chỗi 2 kí tự có thể là 2 giây,... 

Tuy nhiên, phần subscript ở trên cũng có độ phức tạp là O(n), bởi vì nó được tính thông qua từng chuỗi kí tự. Vì thế ở đây chúng ta sẽ có độ phức tạp O(n^2) khi in các kí tự của chuỗi. 
Chính vì vậy, đoạn code của chúng ta tưởng chừng là nhanh nhưng thực chất nó rất chậm.

## 3. Quay trở lại với isEmpty.
Chúng ta đã hiểu được cách  Swift tạo ra chuỗi, giờ hãy quay trở lại vấn đề isEmpty và count ==0.
Như bạn đã thấy, Swift che dấu đi sự phức tạp của chuỗi: một kí tự hiển thị có thể được tạo thành từ nhiều kí tự khác, nên khi sử dụng `count` thì swift cần kiểm tra tất cả các kí tự của chuỗi, nó sẽ đếm từ đầu đến cuối.
Có nghĩa là sử dụng `count` sẽ có độ phức tạp là O(n) sẽ mất thời gian để tính toán.
Trong khi đó với isEmpty sẽ sử dụng một so sánh đơn giản: chỉ mục bắt đầu và kết thúc của chuỗi có giống nhau không? Ở đây bạn sẽ không cần duyệt qua tất cả các kí tự.

May mắn là cả SwiftLint và SwiftFormat đều có thể cảnh báo cho bạn, bởi vì họ các quy tắc chọn để phát hiện chính xác tình huống này.

Nguồn tham khảo: https://www.hackingwithswift.com/articles/181/why-using-isempty-is-faster-than-checking-count-0