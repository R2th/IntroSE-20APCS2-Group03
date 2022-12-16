### Nội dung

- Giới thiệu
- Declarative Programming là gì?
- Lợi ích mang lại của Declarative Programming
- Kết Luận

### Giới thiệu

![](https://images.viblo.asia/6d209465-4f0e-4a4e-9105-9059dd27f401.jpg)

Chắc hẳn đa số các bạn lập trình viên đều nghe qua hoặc đã làm quen với khái niệm Functional Programming vì nó đã quá quen thuộc với các developer ngay từ những ngày đầu. Nhưng có một khái niệm khác mà hiếm khi bạn biết đến đó là Declarative Programming(DP), thứ mà nằm ở một “thái cực” đối với Imperative Programming(IP) thứ thường được gắn liền với Object-Oriented Programming (OOP) hay gọi là lập trình hướng đối tượng. Imperative Programming thì đã quá quen thuộc với lập trình viên nói chung, có thể nói là thống trị thế giới lập trình trong suốt hơn 50 năm qua.
Vậy **Declarative Programming** là gì?

**Nào chúng ta cùng tìm hiểu nhé!**

### Declarative Programming là gì?

Hai mô hình trên vốn khá rộng, thậm chí khá là mơ hồ nhưng để định nghĩa thì có thể gói gọn 1 cách tương phản rõ ràng như sau:
- Imperative Programming: nói với "machine" làm thế nào để giải quyết nó và kết quả bạn muốn là gì.
- Declarative Programming: nói với "machine" bạn muốn gì xảy ra và máy tính tính toán làm thế nào để làm ra nó. 

Bạn có thể hình dung là với Imperative Programming thì bạn quan tâm tới việc làm thế nào để giải quyết bài toán còn Declarative Programming quan tâm tới đầu vào và đầu ra của bài toán.

![](https://images.viblo.asia/37218776-b716-4682-b5d0-b8b682d704b6.png)

Nghe có vẻ vẫn khá khó hiểu?

Chúng ta cùng theo dõi đoạn code dưới đây viết theo Imperative Programming sau:

```Swift
getRemoteData("example.com", { data, error in
  if error == nil {
    parseData(data, { parsed, error in
      if error == nil {
        handleParsedData(parsed, { error in
          if error != nil {
            displayError(error)
          }
        })
      } else {
        displayError(error)
      }
    })
  } else {
    displayError(error)
  }
}
```

Đoạn code trên nhìn có vẻ rất phức tạp, nó chỉ thực hiện download, parse và xử lý một vài dữ liệu. Vậy với Declarative programming thì mọi thứ sẽ thay đổi như thế nào. 
Chúng ta thử xem nhé!

```Swift
getRemoteData("example.com")
  .then(parseData)
  .then(handleParsedData)
  .onError(displayError)
```

 Bạn có thể thấy rằng các bước thực hiện đã rõ ràng hơn, người khác nhìn vào cũng nắm được chức năng và cách bước thực hiện hơn.

  Chúng ta cùng xem thêm ví dụ viết theo Imperative Programming khác:

```Swift
let array = [1, 2, 3, 4, 5, 6]
var reduced = 0
var filtered = []

for element in array {
  reduced += element
  if element % 2 == 1 {
    filtered.append(element)
  }
}
```

Còn đây là Declarative Programming:

```Swift
let numbers = [1, 2, 3, 4, 5, 6]
let sum = reduce(numbers, 0, +)
let odds = filter(numbers, { $0 % 2 == 1})
```

Rõ ràng là việc viết code trở lên mạch lạc, rõ ràng hơn rất nhiều.

### Lợi ích mang lại của Declarative Programming

#### 1. Hạn chế sự thay đổi

Các đối tượng, dữ liệu trong chương trình sẽ rất ít khi bị thay đổi, thậm chí là nó xuyên suốt trong quá trình thực hiện. Bạn gần như không phải bận tâm dữ liệu có bị thay đổi ở những hàm nào, luồng (thread) nào tác động đế nó…?

#### 2. Giảm thiểu state side-effects

Đến nay vẫn chưa có định nghĩa cụ thể side-effects là gì? Nhưng hãy tưởng tượng bạn debug 1 lỗi được tạo khi sử dụng function của người động nghiệp A viết ra. Bạn tìm ra nguyên nhân là do biến "x". Sau khi search thì bạn thấy biến "x" này được gọi trong 10 hàm khác nhau. Và tất nhiên là bạn sẽ phải đọc, hiểu kỹ 10 hàm đấy để tìm ra nguyên nhân cuối cùng là vì sao…

![1425999735-1425293914-windows8-bsod-780x488.jpg](/uploads/b2802aec-22d5-457b-a292-d4f35649343e.jpg)

Và nếu bạn lập trình đa luồng(multi-thread) hoặc hơn nữa là lập trình tính toán song song  sử dụng Multi-core(CPU) thì sẽ thấy việc kiểm soát sự thay đổi dữ liệu giữa các luồng/CPU core sẽ rất phức tạp và gây thật nhiều khó khăn khi có vấn đề xảy ra.

#### 3. Code ngắn hơn, dễ hiểu hơn

Ở 2 ví dụ trên tôi đã cho các bạn thấy khi sử dụng Declarative, code của bạn sẽ ngắn hơn và dễ đọc hơn rất nhiều. Nó tập trung vào input, bạn muốn làm gì với input để tạo ra ouput. Hãy hình dung bạn phải đọc hàng loạt các vòng lặp lồng nhau rồi vắt óc xâu chuỗi để biết người tiền nhiệm viết code này với mục đích gì.

#### 4. Dễ dàng mở rộng

Declarative Programming dễ đọc hơn, đơn giản và an toàn hơn nên nó sẽ dễ dàng để mở rộng, thực hiện việc maintain hơn.

### Kết Luận

Thực sự việc quá quen với "Functional Programming" dẫn tới việc thay đổi tư duy hướng đối tượng ngay từ những ngày đầu này là rất khó khăn. Tư duy lập trình theo lối mòn “how” đã ăn sâu vào máu nên việc chuyển qua tư duy “what” khiến ta gặp nhiều trở ngại. Hi vọng bài viết có nhiều bổ ích và mở ra hướng tìm hiểu mới với bạn đọc!

##### _Nguồn:_

[https://www.netguru.co/blog/imperative-vs-declarative](https://www.netguru.co/blog/imperative-vs-declarative)
[https://en.wikipedia.org/wiki/Declarative_programming](https://en.wikipedia.org/wiki/Declarative_programming)