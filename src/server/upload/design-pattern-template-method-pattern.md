# Template Method Pattern

Nội dung: Vẫn sẽ như những bài trước chúng ta sẽ đi theo 3 phần chính:


+ Tổng quan về Template Method
+ Cách sử dụng Template Method
+ Ứng dụng của Template Method trong lập trình IOS

## Tổng quan về Template Method
Là một pattern thuộc nhóm behavior -  định nghĩa một bộ khung của một thuật toán trong một chức năng, chuyển giao việc thực hiện nó cho các lớp con. Template Method Pattern cho phép lớp con định nghĩa lại cách thực hiện của một thuật toán, mà không phải thay đổi cấu trúc thuật toán.

Điều này có nghĩa là Template method giúp cho chúng ta tạo nên một bộ khung (template) cho một vấn đề đang cần giải quyết. Trong đó các đối tượng cụ thể sẽ có cùng các bước thực hiện, nhưng trong mỗi bước thực hiện đó có thể khác nhau. Điều này sẽ tạo nên một cách thức truy cập giống nhau nhưng có hành động và kết quả khác nhau.
![](https://images.viblo.asia/c81ccb16-add4-436f-ae12-de3b1d73e876.png)

Các thành phần của một Template Method
![](https://images.viblo.asia/933ad882-eb8a-4a75-8bc4-660063120666.png)

Trong đó thì:

+ **AbstractClass(Protocol)** :
Định nghĩa các phương thức trừu tượng cho từng bước có thể được điều chỉnh bởi các lớp con.
Cài đặt một phương thức duy nhất điều khiển thuật toán và gọi các bước riêng lẻ đã được cài đặt ở các lớp con.
+ **ConcreteClass** : là một thuật toán cụ thể, cài đặt các phương thức của AbstractClass. Các thuật toán này ghi đè lên các phương thức trừu tượng để cung cấp các triển khai thực sự. Nó không thể ghi đè phương thức duy nhất đã được cài đặt ở AbstractClass (templateMethod).

## 
Việc sử dụng template method có nhiều lợi ích trong việc lập trình
* Tái sử dụng code (reuse), tránh trùng lặp code (duplicate): đưa những phần trùng lặp vào lớp cha (abstract class).
* Cho phép người dùng override chỉ một số phần nhất định của thuật toán lớn, làm cho chúng ít bị ảnh hưởng hơn bởi những thay đổi xảy ra với các phần khác của thuật toán.
## 

Vơi những lợi ích như thế thì template method rất hay được sử dụng khi:
* Khi có một thuật toán với nhiều bước và mong muốn cho phép tùy chỉnh chúng trong lớp con.
* Mong muốn chỉ có một triển khai phương thức trừu tượng duy nhất của một thuật toán.
* Mong muốn hành vi chung giữa các lớp con nên được đặt ở một lớp chung.
* Các lớp cha có thể gọi các hành vi trong các lớp con của chúng một cách thống nhất (step by step).

## Cách sử dụng Template Method Pattern
Chúng ta sẽ đi vào một ví dụ cụ thể để hiểu hơn về pattern này.

Cấu trúc của một website thông thường gồm các phần header, footer, navigation (menu), body. Riêng phần body thường xuyên thay đổi, sẽ hiển thị riêng theo từng trang. Những phần khác ít khi thay đổi, trừ khi có yêu cầu đặt biệt. Thay vì phải viết tất cả các phần ở mỗi trang, chúng ta có thể gom chúng lại và đặt trong một template để tái sử dụng mà không duplicate code ở nhiều nơi.

Đầu tiên chúng ta sẽ đi vào khởi tạo một **AbstractProtocol** tên PageTemplate
```Swift
protocol PageTemplate {
    func showPage()

    func showHeader()

    func showNavigation()

    func showFooter()

    func showBody()
}
```

viết extension triển khai các phương thức chung cho các lớp con 
```Swift
extension PageTemplate {

    func showPage() {
        showHeader()
        showNavigation()
        showBody()
        showFooter()
    }

    func showHeader() {
        print("<header />\n")
    }

    func showNavigation() {
        print("<nav />\n")
    }

    func showFooter() {
        print("<footer />\n")
    }
}
```

Tiến hành khởi tạo các **concreteClass** adopt  **PageTemplate** và khởi tạo **Client** để thử template method.
```Swift
class HomePage: PageTemplate {

    func showBody() {
        print("Content of home page page\n")
    }
}

class DetailPage: PageTemplate {

    func showBody() {
        print("Content of detail\n")
    }
}

class ContactPage: PageTemplate {

    func showNavigation() {
        // Just do nothing
        // Because we don't want to show navigation bar on contact page
    }
    
    func showBody() {
        print("Content of contact page\n")
    }
}

class Client {
    static func clientCode(use object: PageTemplate) {
        object.showPage()
    }
}
```

tiến hành test kết quả

```Swift
    Client.clientCode(use: HomePage())
    Client.clientCode(use: DetailPage())
    Client.clientCode(use: ContactPage())
```

kết quả nhận được như sau:
```
<header />

<nav />

Content of home page page

<footer />

<header />

<nav />

Content of detail

<footer />

<header />

Content of contact page

<footer />

```
Thông qua ví dụ trên chúng ta cũng hiểu cách thức hoạt động của template method như thế nào. Giờ chúng ta đi đến ứng dụng của pattern này được áp dụng như thế nào trong IOS.

## Ứng dụng của Template Method trong lập trình IOS
Template Method thể hiện rõ ràng nhất trong **Overridden Framework Methods** và **Document Architecture in OS X**
Cụ thể là:
+ Template Method là một thiết kế cơ bản của Cocoa và của các object-oriented frameworks nói chung. cho phép các thành phần tùy chỉnh của chương trình móc vào một thuật toán, nhưng các thành phần framework xác định thời điểm và cách chúng thể hiện.
+ Kiến trúc tài liệu được xác định bởi AppKit Framewoks là một thể hiện riêng biệt và quan trọng của thiết kế chung của các phương thức trong framework được ghi đè như là một sự điều chỉnh của template method.  Các ứng dụng Cocoa có thể tạo và quản lý nhiều tài liệu, mỗi tài liệu trong cửa sổ riêng, hầu như luôn dựa trên kiến trúc tài liệu.