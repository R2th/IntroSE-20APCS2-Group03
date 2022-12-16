Trong hướng dẫn này, bạn sẽ tìm hiểu một số ví dụ về crash, điều tra chúng, hiểu lý do tại sao lỗi crash xảy ra và cuối cùng là sửa chúng.

## Getting Started

[Tải xuống](https://koenig-media.raywenderlich.com/uploads/2020/01/CrashGallery.zip) Project cho hướng dẫn này. Bạn sẽ tìm thấy một dự án có tên là CrashGallery.

![](https://images.viblo.asia/96cb7d6d-9096-4a4d-ad72-86342463980b.png)

Project đưa ra một số tình huống phổ biến khiến app của bạn bị crash. Nó được làm chỉ để thể tái hiện những "kịch bản" crash và giúp bạn hiểu chúng.

Crash Gallery có 3 phần với các kiểu crash khác nhau:

1. **Force Unwrapping**: Trường hợp sử dụng giá trị là nil.

2. **Weak References**: Giải thích chuỗi tham chiếu trong UI của bạn từ storyboard và cách bạn có thể vô tình phá vỡ chuỗi tham chiếu và làm crash app.

3. **Invalid Table Updates**:  Đưa ra những trường hợp phổ biến khi dùng tableView và gây ra crash app.

 Bạn sẽ làm việc với từng tình huống crash này để tìm hiểu cách tìm ra chúng và cách khắc phục chúng khi bạn làm.
 
 Nhưng trước khi bạn bắt đầu xem xét các crash và nguyên nhân của chúng, hãy dành một chút thời gian để xem xét ba tool quan trọng để giúp bạn theo dõi crash khi chúng xảy ra.

## Tools to Help You Fix and Resolve Crashes

### Breakpoints

Công cụ tiện dụng đầu tiên mà bạn bao gồm là các Breakpoint, cái này làm cho app của bạn tạm dừng thực thi trên một dòng được chỉ định để bạn có thể điều tra trạng thái của các object tại thời điểm đó.

Hãy tạo một Breakpoint trên bất kỳ dòng nào, chỉ cần nhấp vào số dòng trong file của bạn nơi bạn muốn dừng thực thi lại.

![](https://images.viblo.asia/1b62b826-a431-4a03-85db-dcc708f0d2e1.gif)

Nhưng điều gì sẽ xảy ra nếu bạn không chắc chắn nên xem dòng nào?

Bất cứ khi nào một app run từ Xcode gặp crash, trình gỡ lỗi sẽ hiển thị cho bạn dòng bị lỗi. Tuy nhiên, đôi khi, dòng đó không thật sự có được ý nghĩa. Có một loại breakpoint khác mà tiện dụng cho các tình huống như thế này: **exception breakpoint.**

Exception breakpoint sẽ tự động dừng app khi xảy ra crash app và hiển thị cho bạn dòng gây ra crash. Thực tế, không phải lúc nào cũng là dòng bạn cần sửa. Crash có thể là do một vài lỗi trước đó, nhưng dòng này là nơi App nói rằng Hey Hey, tôi không có thể tiến hành nữa.

Để thêm 1 exception breakpoint, hãy mở Debug navigator và nhấp vào + trong điều hướng góc góc dưới bên trái. Chọn **Exception Breakpoint** từ menu. Nhấp vào bất cứ nơi nào bên ngoài dialog để đặt breakpoint.

Lưu ý: Exception breakpoint lệ được kích hoạt bởi crash xảy ra trong thời gian chạy Objective-C, trong hầu hết các trường hợp có nghĩa là những thứ bên trong UIKit. Hầu hết các crash Swift sẽ khiến trình gỡ lỗi dừng trên dòng thực tế mà bạn đang tìm kiếm.

![](https://images.viblo.asia/8756f738-938f-4798-be5e-152303e6d577.gif)

### Console Log

**Console Log** nằm ở cuối cửa sổ Xcode. Nó sẽ hiển thị nhiều log hữu ích trong khi app đang chạy. Bất cứ khi nào app của bạn crash, bạn sẽ tìm thấy một thông điệp tường trình chứa thông tin về bản chất của crash, cho dù đó là một chỉ mục nằm ngoài phạm vi ngoại lệ, tham chiếu nil hoặc một cái gì khác.

Log cũng chứa thông tin về các warning, vì vậy hãy chú ý đến nó ngay cả khi ứng dụng của bạn không bị crash. Nó có thể làm đưa ra gợi ý về cái gì đó có thể giúp bạn làm cho app của bạn tốt hơn. :]

Cửa sổ này sẽ hoàn toàn trống trong khi ứng dụng không chạy. Nó sẽ bắt đầu hiển thị log khi bạn chạy app.
![](https://images.viblo.asia/a3e4dd6b-9c89-4242-b103-090df0f58a03.png)

### Variables View

Công cụ có giá trị thứ ba để điều tra crash là Variables View. Tương tự như Console Log, nó sẽ hoàn toàn trống khi ứng dụng không chạy - nhưng nó cũng sẽ trống khi ứng dụng của bạn đang thực thi =))).

Variables View sẽ chỉ hiển thị các giá trị của các biến trong scopr hiện tại, khi việc thực thi mà bạn tạm dừng với các **breakpoint**.
![](https://images.viblo.asia/69fe6aef-15e2-4370-b8c2-3cd86a902d5d.png)

**Console Log** cũng hiển thị các giá trị của các biến, nhưng **Variables View** trực quan hơn và hiển thị cho bạn tất cả các biến thay vì chỉ một biến. Nó rất hữu dụng trong nhiều trường hợp, vì vậy nó rất tốt để làm quen với cả hai.
![](https://images.viblo.asia/4c24bc03-eb6f-4489-b301-61b1813489ba.png)

Console Log in giá trị của một biến cũng có trong Variables View.
![](https://images.viblo.asia/aebefe2a-5be8-494c-abd6-f11abebd2d2b.gif)

Variables View có thể hiển thị nhiều hơn là chỉ hiển thị thông tin text. Nó có thể hiển thị nội dung trực quan của một yếu tố UI.

Bây giờ bạn đã biết các tool bạn cần để khắc phục app bị crash, build và run app.

## The Infamous nil
Swift giới thiệu **optionals**, có nghĩa là một object hoặc một biểu thức có thể có một giá trị hoặc có thể không. Nhưng bạn có thể giả định rằng bạn sẽ luôn có một giá trị, đây là lý do phổ biến nhất khiến ứng dụng của bạn bị crash.

 Trong phần đầu, bạn sẽ thấy một số tình huống này, nhưng thật tốt để hiểu trước về những gì Xcode cung cấp để giúp bạn xác định nơi xảy ra crash.

### Exhibit A: Dark Force – Force Unwrapping

Build and run the app, sau đó mở mục đầu tiên - có tiêu đề Force Unwrapping - trong màn hình gallery.
![](https://images.viblo.asia/58acf97c-08dd-4c12-a2cc-94be3547bd0f.png)

Nhiệm vụ trên màn hình này là để tính tổng các số được viết ở trên cùng. Nhập các số đc ngăn cách bởi dấu phẩy.

Tổng các số sẽ xuất hiện trên màn hình khi bạn nhấn nút **Calculate**. 
![](https://images.viblo.asia/2624fe55-1739-46c2-8637-1a1175983af8.png)

Tuyệt vời, vì vậy nó hoạt động như bạn dự định. Bây giờ, hãy thêm "two" vào cuối:
![](https://images.viblo.asia/1af1c067-a5f2-486f-84bd-599e403952ec.png)

Tap Calculate và xảy ra ... crashes.
![](https://images.viblo.asia/1ce0849b-dc69-4ccf-a9b1-cb5a98ac92ba.png)

Crash nằm trong ForceUnwrappingViewController.swift trên dòng số 49. Hãy xem Xcode hiển thị cho bạn - có một điểm nhấn màu đỏ trên dòng kích hoạt crash.

Console Log có thông tin về crash và Variables View hiển thị các giá trị của item và finalValue trong calculateSum(items:)

Giá trị của item là "two", vì vậy khi bạn chuyển đổi nó thành Int thì nó bị lỗi, đưa ra giá trị nil. force unwrapping bởi "!"  có thể gây ra vụ crash.

### Proving Your Case

Khi bạn fix crash, bạn không muốn làm điều đó bằng cách chỉnh sửa và build lại. Bạn muốn chắc chắn 110% rằng bạn đã fix những gì crash.

Để kiểm tra dự đoán của bạn, hãy nhập lệnh này vào **Console Log:**

```
po Int(item)
```

Lệnh po tức là **print object**, đó là lệnh LLDB để in mô tả của một object. Bạn cũng có thể sử dụng p, nhưng kết quả trong console sẽ trông hơi khác.

output của console sẽ là nil:

![](https://images.viblo.asia/95e6e20a-2df7-410b-a83d-159ad14a8ffa.png)

Vì vậy Int(item) là nil, và khi bạn gõ po Int(item)! bạn sẽ nhân đc thông báo sau:

![](https://images.viblo.asia/05db2968-4b61-4edf-8814-532edff64243.png)

Kết quả này giống như lỗi được ghi trong vụ crash, do đó, bạn chắc chắn nó đúng là nguồn gốc của crash.

Nhưng chờ đã! Làm thế nào nó hoạt động cho các giá trị khác?

Thêm một **breakpoint** trên cùng một dòng gây ra crash và khởi động lại ứng dụng. Nhớ viết, "two" trước khi bạn tính tổng.

![](https://images.viblo.asia/3e2486b7-4f03-4b6a-bca4-857704710af7.png)

giá trị của item trên breakpoint là 4 và kết quả của Int(item) cho giá trị thay vì nil.

![](https://images.viblo.asia/8a606498-5521-4ed4-8b14-96964f389eab.png)

### Finding the Right Solution

Int (_ : ) hoạt động khi giá trị của item là 4, nhưng nó đã không hoạt động được khi nó là "two". Nói cách khác, nó hoạt động khi giá trị là một string có các chữ số, nhưng không phải với các chữ cái, ngay cả khi chúng tạo thành tên của số.

Để khắc phục crash này, hãy thay thế dòng code sau trong calculateSum(items: ) :

```
finalValue += Int(item)!
```

thành

```
if let intValue = Int(item) {
  finalValue += intValue
}
```

Đoạn code trên kiểm tra xem kết quả của Int (item) không phải nil trước khi sử dụng nó.

Bỏ breakpoint bằng cách nhấp vào mũi tên màu xanh và nó sẽ trở thành màu xanh bán trong suốt. Build and run và thêm bất kỳ loại văn bản nào bạn muốn trong trường văn bản sau các số.

![](https://images.viblo.asia/fb511e49-ace4-4c53-a7ae-a99c753e4cfd.png)

Nó không bị crash nữa, nhưng nó đã được fix hoàn toàn chưa? Thay vì thêm số, hãy xóa số cuối cùng và thử lại.

![](https://images.viblo.asia/475ff6ad-37ec-4b88-9936-40a8b4510838.gif)

Ứng dụng đã bị crash một lần nữa trong ForceUnwrappingViewControll.swift trên dòng 58.

![](https://images.viblo.asia/4bae02e9-4843-4e90-94fd-8189901fa710.png)

Thông báo liên quan từ log là:

```
Could not cast value of type 'Swift.String' (0x7fff879c3f88) to 'Swift.Int' (0x7fff879c1e48).
```


Dòng crash đang force kết quả là kết quả là Int, trong khi giá trị bạn cung cấp là String. Điều đó có nghĩa là valueToShow là nil và khi bạn buộc unwrap, ứng dụng crash, tương tự như crasg ở trên mà bạn đã fix.

calculateSum(items:) sẽ chỉ hiển thị tổng nếu tổng số lớn hơn 100. Nếu không, thông báo là “Sum is too low”.

Đây là một sửa chữa đơn giản. Thay thế code bên trong **showResult(result:)** bằng block này:

```
if let intValue = result as? Int {
  sumLabel.text = "\(intValue)"
} else if let stringValue = result as? String {
  sumLabel.text = stringValue
}

```

Tại đây, bạn kiểm tra xem bạn có thể truyền kết quả cho Int hay không, sau đó tạo String giá trị của nó và thêm nó Label. Bạn sử dụng giá trị như nếu bạn có thể chuyển nó thành String.

Build and run. Bạn có thể thấy thông báo lỗi “Sum is too low” khi tổng số dưới 100.

Mình xin dừng P1 ở đây, phần tiếp mình sẽ viết các trường hợp còn lại.
Nguồn: [link](https://www.raywenderlich.com/6334294-my-app-crashed-now-what#c-rate)