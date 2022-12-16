### Giới thiệu

Có thể nói với mỗi ae lập trình thì khái niệm đã gắn sâu vào tiềm thức từ khi mới bắt đầu đó là Functional Programming tuy nhiên trong quá trình thực tế, khá niệm lập trình này đã bộc lộ khá nhiều vấn đề khi bài toán thực tế lớn và Declarative Programming(DP) ra đời, thứ mà nằm ở một “thái cực” đối với Imperative Programming(IP) thứ thường được gắn liền với Object-Oriented Programming (OOP) hay gọi là lập trình hướng đối tượng. Imperative Programming thì đã quá quen thuộc với lập trình viên nói chung, có thể nói là thống trị thế giới lập trình trong suốt hơn 50 năm qua. Vậy **Declarative Programming** là gì?

![](https://images.viblo.asia/6d209465-4f0e-4a4e-9105-9059dd27f401.jpg)

**Nào chúng ta cùng tìm hiểu nhé!**

### Declarative Programming là gì?

Hai mô hình trên vốn khá rộng, nghe khá là mơ hồ nhưng tóm lại có thể hiểu như sau:
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

Đoạn code trên nhìn qua có vẻ rất phức tạp, tuy nhiên chỉ thực hiện download, parse và xử lý một vài dữ liệu. Vậy chúng ta thử xem nếu với Declarative programming thì mọi thứ sẽ thay đổi như thế nào.

```Swift
getRemoteData("example.com")
  .then(parseData)
  .then(handleParsedData)
  .onError(displayError)
```

 Có thể thấy rằng các bước thực hiện đã rõ ràng hơn, một người mới nhìn vào cũng dễ dàng thấy được chức năng và cách bước thực hiện hơn.

 Tiếp tục với ví dụ khác viết theo Imperative Programming sau:

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

Và khi viết lại với Declarative Programming:

```Swift
let numbers = [1, 2, 3, 4, 5, 6]
let sum = reduce(numbers, 0, +)
let odds = filter(numbers, { $0 % 2 == 1})
```

Rõ ràng code trở lên mạch lạc và rõ ràng hơn rất nhiều.

### Lợi ích của Declarative Programming

#### 1. Hạn chế sự thay đổi

Hạn chế sự thay đổi của các đối tượng, dữ liệu trong chương trình. Bạn gần như không phải bận tâm dữ liệu được gọi tới, có bị thay đổi không ở hàm nào, luồng (thread) nào tác động đến nó…?

#### 2. Giảm thiểu side-effects

Khái niệm side-effect hiện vẫn chưa có định nghĩa cụ thể, nhưng hãy tưởng tượng khi bạn debug 1 lỗi sinh ra trong function của dev khác viết. Sau khi tìm ra nguyên nhân do biến X nào đó, bạn search thì thấy biến X này xuất hiện trong 10 hàm khác nhau, và rõ ràng bạn sẽ phải đọc, hiểu thật kỹ tất cả các hàm này và đề tìm ngay nguyên nhân cuối cùng là nó đã bị thay đổi ở đâu, lý do gì?

![1425999735-1425293914-windows8-bsod-780x488.jpg](/uploads/b2802aec-22d5-457b-a292-d4f35649343e.jpg)

Đặc biệt với bài toán lập trình đa luồng(multi-thread) hoặc hơn nữa là lập trình tính toán song song  sử dụng Multi-core(CPU) thì  bạn sẽ thấy việc kiểm soát sự thay đổi dữ liệu giữa các luồng/CPU core sẽ rất phức tạp và gây rất nhiều khó khăn khi có vấn đề xảy ra.

#### 3. Code ngắn, rõ ràng, dễ hiểu hơn

Ở 2 ví dụ trên các bạn đã thấy khi sử dụng Declarative, code của bạn sẽ ngắn gọn hơn, rõ ràng và dễ đọc hơn rất nhiều. Đơn giản vì nó tập trung vào với đầu vào input, bạn muốn làm gì với nó để tạo ra ouput. Hãy hình dung với Imperative thì bạn phải đọc hàng loạt các vòng lặp lồng nhau, câu lệnh gọi rồi vắt óc xâu chuỗi để biết dev khác viết code này với mục đích gì.

#### 4. Dễ dàng mở rộng

Declarative Programming dễ đọc hơn, đơn giản, rõ ràng hơn nên chắc chắn nó sẽ dễ dàng để mở rộng, maintain hơn.

### Kết Luận

 "Functional Programming" đã quá quen, thậm chí ăn sâu vào tiềm thức của các lập trình viên dẫn tới việc thay đổi tư duy này sẽ rất khóc khăn, thay vì việc tư duy "What" của Declarative thì tư duy "How" đã thành lối mòn. Hi vọng bài viết mang tới một hướng tiếp cận mới về lập trình tới bạn đọc.
 
 Cám ơn bạn đã dành thời gian cho bài viết!

##### _Nguồn:_

[https://www.netguru.co/blog/imperative-vs-declarative](https://www.netguru.co/blog/imperative-vs-declarative)
[https://en.wikipedia.org/wiki/Declarative_programming](https://en.wikipedia.org/wiki/Declarative_programming)