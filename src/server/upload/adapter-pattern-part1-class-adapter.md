# Adapter Pattern là gì
Khi sử dụng laptop hay điện thoại chắc hẳn bạn đã biết đến adapter (hay còn gọi là cục sạc), thiết bị giúp chuyển đổi dòng điện xoay chiều điện lưới thành dòng một chiều để máy tính có thể sử dụng được. Trong ngôn ngữ lập trình, Adapter Pattern cũng mang ý nghĩa tương tự như vậy. Bằng cách chuyển đổi interface của một class sang một interface khác mà client mong muốn, Adapter giúp các class có thể tương tác với nhau cho dù không tương thích về mặt interface ( [1], Trang 139). Adapter Pattern bao gồm 2 dạng thức : Class Adapter và Object Adapter. Ở phần 1 của bài viết này, chúng ta hãy cùng tìm hiểu về Class Adapter.

# Tại sao cần sử dụng Adapter Pattern
Có khi nào bạn cảm thấy chán nản khi phải viết đi viết lại những đoạn code giống nhau từ dự án này sang dự án khác? Bạn đi đến quyết định cần phải tự viết library để tái sử dụng, tuy nhiên sẽ có tình huống interface mà bạn viết phù hợp với dự án cũ nhưng sang dự án mới thì không dùng được. Bạn lại hì hục ngồi sửa lại thư viện của mình để phù hợp với dự án mới.  Adapter Pattern chính là cứu tinh của bạn trong trường hợp này.
 Apdater Pattern nên được sử dụng trong trường hợp :
* Bạn muốn sử dụng một Class đã có sẵn mà interface của nó lại không tương thích với interface bạn mong muốn. Chẳng hạn bạn muốn sử dụng một library của bên thứ ba nhưng interface của nó lại không phù hợp với dự án của bạn.
* Bạn muốn tạo ra một Class có khả năng tái sử dụng cao. Class của bạn có thể tương tác với các class có interface không tương thích sau này.

# Class Adapter
Trước hết, để giúp bạn dễ dàng hình dung Class Adapter là gì hãy tham khảo sơ đồ UML của Class Adapter ([1], Trang 141)
![](https://images.viblo.asia/005fb069-55cd-4191-ae7b-12f39e26eadf.png)

Có một lưu ý nhỏ ở đây, do Objective-C và Swift không hỗ trợ đa kế thừa, nên ta cần chỉnh sửa Target trở thành Protocol chứ không phải là Class như trong sơ đồ ở trên.

Theo sơ đồ trên Class Adapter sẽ triển khai Target interface bằng việc kết thừa từ một Adaptee class .([2])

Có vẻ như vẫn rất mơ hồ phải không? Hãy trở lại với ví dụ về cục sạc, tương ứng với các thành phần trong sơ đồ trên ta sẽ có:
1. Client : Laptop hoặc điện thoại của bạn
2. Target : Nguồn điện
3. Adapter: Cục sạc
4. Adaptee: Converter hay bộ biến đổi dòng xoay chiều (AC)  thành một chiều (DC)

Chúng ta hãy cùng mô phỏng hoạt động của cục sạc. Đầu tiên ta sẽ tạo một protocol PowerSource với hàm cấp nguồn powerOn(). Các thiết bị điện sẽ đều phải triển khai protocol này
```
// Target
protocol PowerSource {
    func powerOn()
}
```
Tiếp theo ta sẽ tạo Converter (Adaptee) -  bộ biến đổi dòng điện từ AC sang DC. Converter sẽ có hàm convertACToDC()
```
// Adaptee
class Converter {
    func convertACToDC() {
        print("Converter: Convert AC to DC")
    }
}
```
Cục sạc (Adapter) sẽ cần chức năng biến đổi AC thành DC. Do vậy ta sẽ cho cục sạc (Adapter) "kế thừa" từ Converter (Adaptee)
```
// Adapter
class Adapter : Converter {}
```
Cục sạc (Adapter) sẽ triển khai protocol PowerSource như sau
```
extension Adapter: PowerSource {
    func powerOn() {
        print("PowerSource: Power on")
        convertACToDC()
    }
}
```
Mac Book (Client) của bạn sẽ được sạc khi được kết nối với Adapter
```
// Client
class MacBook {
    var source: PowerSource?
    init(source: PowerSource) {
        self.source = source
    }
    func charging() {
        source?.powerOn()
        print("MacBook : Charging")
    }
}
// usage
let client = MacBook(source: Adapter())
client.charging()
```

Và kết quả :
```
PowerSource: Power on
Converter: Convert AC to DC
MacBook : Charging
```

Như vậy sơ đồ UML ở trên sẽ được diễn giải như sau : Cục sạc (Adapter) sẽ cấp nguồn ( triển khai PowerSource ) cho máy MacBook (Client) bằng việc kế thừa từ bộ Converter chuyển đổi AC sang DC (Adaptee).

# Hạn chế của Class Adapter Pattern
Class Adapter sẽ có  điểm hạn chế như sau:
*  Class Adapter chỉ hoạt đông với Class Adaptee mà nó trực tiếp kế thừa, mà không thể hoạt động với các lớp con của Class Adaptee
Điểm hạn chế này sẽ được khắc phục với Object Adapter Pattern được giới thiệu vào phần tiếp theo của bài viêt này.
# Lời kết
Cho dù đoạn code trên mới chỉ dừng lại ở mức nguyên lý, nhưng hy vọng đã giúp bạn có thể hình dung Class Adapter là gì. Phần tiếp theo sẽ cung cấp cho các bạn những ứng dụng thực tế hơn của Adapter Pattern.
# Tài liệu tham khảo
[1] Erich Gamma, Richard Helm, Ralph Johnson, John M. Vlissides - Design Patterns Elements of Reusable Object Oriented Software  - Addison Wesley Professional (1994)

[2] https://en.wikipedia.org/wiki/Adapter_pattern