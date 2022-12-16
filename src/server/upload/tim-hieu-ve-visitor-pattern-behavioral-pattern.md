Do gần đây mình có đọc qua một số bài viết về Visitor Pattern và nhận ra việc góc nhìn của mỗi người về pattern này là khác nhau. Do đó mình đã tham khảo lại từ nhiều trang và cả nơi chuyên sản xuất các bài viết về Design Pattern đó là [Refactoring Guru](https://refactoring.guru/), tổng kết và viết lại theo hướng ngắn gọn dễ tiếp cập hơn và bám sát với mục tiêu của Visitor Pattern. Không giông dài nữa vào vấn đề luôn :joy:

## Visitor
> Cho phép thay đổi, mở rộng các thao tác cho đối tượng mà không thay đổi cấu trúc, nội dung bên trong đối tượng

Để làm được điều này, các đối tượng (**Element**) phải tách các thao tác đó ra phương thức riêng và định nghĩa chúng trên các lớp tách biệt gọi là các lớp **Visitor**. Nhờ vậy các thao tác được tách độc lập ra khỏi cấu trúc đối tượng, giúp cho việc thay đổi thao tác trở nên linh hoạt. 

Với mỗi một thao tác mới cho đối tượng được tạo ra, một lớp visitor tương ứng cũng được tạo ra.

Ngoài ra đây cũng là một kỹ thuật giúp chúng ta phục hồi lại **kiểu dữ liệu** bị mất của đối số truyền vào. Vì nó thực hiện gọi phương thức tương ứng dựa trên kiểu dữ liệu của cả đối tượng gọi và của đối số truyền vào (**Double Dispatch**).

### 1. Double Dispatch và Single Dispatch là gì?
- **Single Dispatch**: Tên phương thức được gọi chỉ dựa vào kiểu dữ liệu của đối tượng gọi nó
```js
class TestClass {
    testMethod(param: string) {
        console.log(param)
    }
}
new TestClass().testMethod("Hello World")
```
- **Double Dispatch**: Tên phương thức được gọi dựa vào kiểu dữ liệu của đối tượng gọi nó và kiểu dữ liệu của đối tượng đầu vào. Cũng là công nghệ mà Visitor Pattern sử dụng, do đó nó còn có tên là Double Dispatch
```js
class Visitor {
    visit(element: Element) {
        console.log(element.hello())
    }
}
class Element {
    hello() {
        return "Xin chào"
    }
    accept(Visitor: visitor) {
        visitor.visit(this)
    }
}
new Element().accept(new Visitor())
```

### 2. Ưu điểm
- Cho phép một hoặc nhiều hành vi được áp dụng cho một tập hợp các đối tượng tại thời điểm run-time, tách rời các hành vi khỏi cấu trúc đối tượng
- Đảm bảo nguyên tắc Open/Close: Đối tượng gốc không bị thay đổi, dễ dàng thêm hành vi mới cho đối tượng thông qua visitor

### 3. Khi nào nên dùng Visitor Pattern?
- Khi có một cấu trúc đối tượng phức tạp với nhiều class và interface. Người dùng cần thực hiện một số hành vi cụ thể của riêng đối tượng, tùy thuộc vào concrete class của chúng
- Chúng ta muốn di chuyển logic hành vi từ các đối tượng sang một lớp khác để xử lí để giảm phức tạp
- Khi cấu trúc dữ liệu của đối tượng ít khi thay đổi nhưng hành vi của chúng được thay đổi thường xuyên
- Khi muốn tránh sử dụng toán tử `instanceof`
### 4. Cấu trúc
![](https://images.viblo.asia/ccd166c4-dd34-457b-a6ab-0e8e391c4b72.png)

Các thành phần tham gia vào Visitor Pattern:
- **Element**: Interface khai báo khung xương cho đối tượng xử lí dữ liệu. Đặc biệt phải khai báo phương thức `accept()` để nhận các thao tác đưa vào
- **ConcreteElement**: Đối tượng xử lí dữ liệu triển khai từ **Element**
- **Visitor**: Interface khai báo khung xương cho các visitor hỗ trợ định nghĩa và đưa các thao tác thay thế vào ConcreteElement
- **ConcreteVisitor**: Lớp hỗ trợ gọi các thao tác thay thế trên ConcreteElement được triển khai từ Visitor

### 5. Ví dụ
Giả sử chúng ta có một bài toán như sau: Bạn là một ladykiller, bạn muốn tỏ tình với một cô gái nhưng không biết quốc tịch của cô gái ấy là gì, đơn giản là chúng ta không thể nói "anh yêu em" với một cô gái người Nhật Bản được, vì cô ấy sẽ chẳng hiểu gì cả, thay vì vậy chúng ta sẽ nói "Aishite imasu" 😃. Do đó ta sẽ viết một hàm chung để nói lời yêu thương của ta đó là `saylove()` và truyền vào lời yêu tùy theo quốc tịch của mỗi nàng.
```js
interface Lady {
    sayLove(): void;
}

class AmericanLady implements Lady {
    sayLove(): void {
        console.log("I love you");
    }
}

class JapanLady implements Lady {
    sayLove(): void {
        console.log("Aishite imasu");
    }
}

let lady : Lady = new JapanLady();
lady.sayLove(); // Kết quả: Aishite imasu
```
Vấn đề lại xuất hiện khi bạn muốn thay đổi, ví dụ khi chúng ta muốn thêm một phương thức `sayGoodBye()` nữa đi, lại phải thêm vào inferface `Lady` rồi implement cho tất cả những lớp đã triển khai sẽ thay đổi rất mất thời gian cũng thêm rủi ro. Do đó giờ là lúc sử dụng Visitor Partten.
- Đầu tiên ta sửa lại interface `Lady` và triển khai lại `JapanLady` và `AmericaLady` chỉ với phương thức `accept()` để giảm độ phức tạp xử lí và đem phần xử lí đó sang cho `ConcreteVisitor`
```js
interface Lady {
    accept(visitor: Visitor): void
}

class AmericanLady implements Lady {
    accept(visitor: Visitor): void {
        visitor.visit(this)
    }
}

class JapanLady implements Lady {
    accept(visitor: Visitor): void {
        visitor.visit(this)
    }
}
```
- Khai táo interface `Visitor` tạo khung xương và triển khai `SayLoveVisitor` có chức năng in ra lời iu với các lady (do Javascript không hỗ trợ đa hình mà không kế thừa nên tạm thời dùng `instanceof` để thay thế)
```js
interface Visitor {
    visit(lady: Lady): void
}

class SayLoveVisitor implements Visitor {
    visit(lady: Lady): void {
        if (lady instanceof AmericanLady)
            console.log('I love you')
        if (lady instanceof JapanLady)
            console.log('Aishite imasu')
    }
}
```
- Chạy thử
```js
let lady: Lady = new AmericaLady()
lady.accept(new SayLoveVisitor()) // Kết quả: I love you
```
- Ví dụ sau này chúng ta chán chê rồi và muốn `SayGoodBye` lady này để tán lady khác. Ta sẽ tạo thêm một ConcreteVisitor cho chức năng này
```js
class SayGoodByeVisitor implements Visitor {
    visit(lady: Lady): void {
        if (lady instanceof AmericanLady)
            console.log('Good bye!')
        if (lady instanceof JapanLady)
            console.log('Sayounara!')
    }
}
```
- Chạy thử nào
```js
let lady: Lady = new JapanLady()
lady.accept(new SayGoodByeVisitor()) // Kết quả: Sayounara!
```

### 6. Kết luận
Khi muốn mở rộng thao tác của đối tượng xử lí ConcreteElement thì ta chỉ cập nhật trên Visitor mà không cần sửa đổi ConcreteElement. Điều này thỏa mã quy tắc Open/Close.

Hạn chế lớn nhất của Visitor Pattern đó là không hỗ trợ cho việc mở rộng Element, do việc mở rộng Element sẽ dẫn đến cập toàn bộ interface và class của Visitor. Nhưng ta có thể sửa lỗi này bằng các tinh chỉnh khác nhau cho Pattern cộng với một chút khéo léo trong chỉnh sửa cấu trúc dữ liệu và xử lí dữ liệu.

*Tham khảo:*

*[https://viblo.asia/p/single-dispatch-and-double-dispatch-with-visitor-design-pattern-in-java-part-2-gAm5ypyLldb/](https://viblo.asia/p/single-dispatch-and-double-dispatch-with-visitor-design-pattern-in-java-part-2-gAm5ypyLldb/)*

*[https://gpcoder.com/4813-huong-dan-java-design-pattern-visitor/](https://gpcoder.com/4813-huong-dan-java-design-pattern-visitor/)*