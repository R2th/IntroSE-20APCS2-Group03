Method Swizzling là một thủ thuật siêu mạnh nhưng ít được biết tới và sử dụng (kiểu như phép thuật Hắc Ám trong Harry Potter) được cung cấp bởi Objective-C Runtime.
Vì thế đương nhiên thủ thuật này có từ thời Objective-C và nay vẫn được sử dụng ngon lành với Swift.
## Method Swizzling là gì?

Method Swizzling là thủ thuật giúp thay thế nội dung implement của một method có sẵn bằng nội dung khác tuỳ ý khi app đang chạy (runtime, khác với compile time).
Thử lấy một ví dụ:
UIColor có hàm description in ra giá trị RGBA. Hàm này được gọi khi ta thực hiện print.
```
print(UIColor.blue) 
```
Output
```
UIExtendedSRGBColorSpace 0 0 1 1
```
Thay vì việc in ra giá trị RGBA ta muốn in ra giá trị Hex thì phải làm thế nào?
Cách đơn giản nhất là viết 1 hàm tính ra Hex String rồi gọi trực tiếp hàm đó như sau:
```
extension UIColor {
    var hexString: String {
        var r: CGFloat = 0
        var g: CGFloat = 0
        var b: CGFloat = 0
        var a: CGFloat = 0
        getRed(&r, green: &g, blue: &b, alpha: &a)
        let rgb: Int = (Int)(r * 255) << 16 | (Int)(g * 255) << 8 | (Int)(b * 255) << 0
        return String(format: "#%06x", rgb)
    }
}

print(UIColor.blue.hexString)
```
Output : 
```
#0000ff
```
Tuy nhiên ta không muốn phải gọi thêm .hexString mà muốn gọi print(UIColor.blue) cũng in ra Hex thì phải làm thế nào.
Và đây là lúc cần dùng đến Method Swizzling.
## Implement Method Swizzling như thế nào?
Ta sử dụng hàm method_exchangeImplementations để chuyển đổi implementation giữa 2 selector.
Thực hiện hoán đổi implementation của description và hexDescription như đoạn code bên dưới.
```
extension UIColor {
    @objc func hexDescription() -> String {
        return hexString
    }
    func swizzleDesription() {
        if let aClass = object_getClass(self),
            let originalMethod = class_getInstanceMethod(aClass, #selector(getter: description)),
            let swizzledMethod = class_getInstanceMethod(aClass, #selector(hexDescription)) {
            method_exchangeImplementations(originalMethod, swizzledMethod)
            print("\nSwizzle\n")
        }
    }
}
```
Test thử hàm swizzleDesription ta vừa tạo ra.
```
let color = UIColor.blue
print("description: \(color)")
print("hexDescription: \(color.hexDescription())")

color.swizzleDesription()

print("description: \(color)")
print("hexDescription: \(color.hexDescription())")
```
Ta thu được output như bên dưới:
```
description: UIExtendedSRGBColorSpace 0 0 1 1
hexDescription: #0000ff

Swizzle

description: #0000ff
hexDescription: UIExtendedSRGBColorSpace 0 0 1 1
```
Vậy là 2 hàm description và hexDescription đã được hoán đổi implement lẫn nhau. Quá khủng phải không?
Nếu ta swizzle thêm lần nữa thì sao?
```
let color = UIColor.blue
print("description: \(color)")
print("hexDescription: \(color.hexDescription())")

color.swizzleDesription()

print("description: \(color)")
print("hexDescription: \(color.hexDescription())")

color.swizzleDesription()

print("description: \(color)")
print("hexDescription: \(color.hexDescription())")
```
Implement của 2 hàm sẽ quay lại như ban đầu. Ta thu được output như bên dưới:
```
description: UIExtendedSRGBColorSpace 0 0 1 1
hexDescription: #0000ff

Swizzle

description: #0000ff
hexDescription: UIExtendedSRGBColorSpace 0 0 1 1

Swizzle

description: UIExtendedSRGBColorSpace 0 0 1 1
hexDescription: #0000ff
```
## Ứng dụng Method Swizzling
Method Swizzling được sử dụng chủ yếu để thay đổi implement của những method trong standard library. Điều này cũng dễ hiểu vì với những method do ta viết ra, ta toàn quyền customize chúng thì cần gì phải swizzle nữa.
Hàm description như ở ví dụ bên trên là 1 standard method của UIColor. Sau khi bị swizzle, implement của hàm bị thay đổi. Giả sử không chỉ đoạn code của ta, mà cả những đoạn code trong các framework, library mà ta sử dụng cũng dùng đến hàm description này, kết quả thu được có thể khác với những ý đồ mà framework, library đó mong muốn.
Đây là con dao 2 lưỡi mà ta cần đặc biệt chú ý khi sử dụng Method Swizzling.
Method Swizzling được khuyến cáo là không sử dụng quá 1 lần vì việc swizzle nhiều lần sẽ khiến ta không kiểm soát được đâu mới là implement thực sự của method, dẫn đến bug ngoài ý muốn.
Theo mình nếu không thực sự cần thiết, ta nên tránh sử dụng Method Swizzling, có thể sử dụng để debug các static library, kiểm tra xem các method có được static library đó gọi hay không.