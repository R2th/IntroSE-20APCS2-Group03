### Chuẩn bị 
Nếu người đọc mới hoàn toàn và chưa biết gì về  debug thì bạn nên đọc qua bài này trước: [link](https://viblo.asia/p/mot-so-huong-tim-va-xu-li-bug-cho-nguoi-moi-GrLZDAbVlk0), còn nếu người đọc là cao nhân, các tiền bối, các lão làng hay các lão quái vật trong lập trình IOS thì cũng ko cần đọc tiếp vì cái gì cũng biết rồi =)), Ở những bài này mình muốn tiếp tục các một loạt các bài viết hỗ trợ kiến thức cho người mới.

### LLDB là gì???:
LLDB là một bộ công cụ mạnh mẽ và hữu dụng trong việc tìm bug trong Xcode, ở những bài viết này mình sẽ không đi sâu vào tất cả bọn chúng, thay vào đó mình sẽ tập trung một số lệnh hữu ích thường dùng:

P1) Giải thích về : expression, e, print, po, p.

P2) Kiểm tra toàn bộ trạng thái của app + các lệnh: bugreport, frame, language.

P3) Điều khiển app thực hiện các luồn: process, breakpoint, thead, watchpoint.

P4) Các lưu ý khi dùng: command, platform, gui.

### Tại sao nên dùng LLDB???:
Nếu bạn muốn biết thêm một số tiện ích hỗ trợ việc debug ngay tại khi app đang chạy thay vì chỉnh sửa built lại nhiều lần các kiểu ... thì bạn nên tìm hiểu qua LLDB, nó có thể giúp bạn tiết kiệm thời gian hơn rất nhiều trong việc debug.

Ở đây tôi cũng đã có chuẩn bị các câu lệch hữu dụng khi dùng LLDB với mô tả và vd. Bạn có thể tải về kham khảo ở link sau:
[link download](https://www.dropbox.com/s/9sv67e7f2repbpb/lldb-commands-map.png?dl=0)
### Xem giá trị và trạng thái của biến
**Commands: expression, e, print, po , p**
![](https://images.viblo.asia/00dbb7d6-8645-4ac3-9411-c37000680a88.png)

Đây là hàm cơ bản dùng để xem và chỉnh sửa trạng thái của biến. Bạn có thể dùng lệnh này để xét các biểu thức hoặc câu lệnh ngay tại khi app đang chạy.

```
func sumOf(_ a: Int,  and b: Int) -> Int {
    let sum = a + b + 2 // "Giả sửa rằng hàm này rất phức tạp và bạn chưa phát hiện lỗi =))"
    return sum
}

func oneHundredSubtract(_ a: Int, and b: Int) -> Int {
    let sum = sumOf(a, and: b)
    let r = 100 - sum
    return r
}
```
Giả sử rằng bạn không biết tại sao sai, vì thế bạn phải đi điều tra nó, một trong những cách mà bạn có thể làm là thay giá trị và khởi động lại để kiểm tra, kiểu như thế này :]]:


![](https://images.viblo.asia/87038c00-15b8-460c-ba0e-9d4bc836ca91.png)


 Hoặc một số cách khác như print các kiểu... Có một phương pháp tốt hơn là dùng LLDB expression thay vì thay đổi giá trị rồi khởi động lại để kiểm. Và tìm ra nơi phát sinh vấn đề. Đầu tiên, thiết lập một breakpoint và nơi mà bạn nghi ngờ. Sau đó chạy app của bạn.
 
 Để print ra giá trị cụ thể của variable trong LLDB bạn cần gọi:
 
 `(lldb) e <Tên biến>`
 
Hoặc một câu lệnh dùng để đánh giá biểu thức:

 `(lldb) e <Biểu thức>`
 
   Khi app chạy tới chỗ bạn tạo breakpoint (nếu bạn ko biết cách tạo breakpoint thì xem bài mình đã viết - có để  link ở trên), nó sẽ tự dừng lại ngay tại đó và bạn có thể nhìn thấy các giá trị hiện tại trong cửa sổ bên trái (a=2,b=2...).
 
   Ở cửa sổ bên phải sẽ hiển thị các thông tin khi bạn debug, và khi nó dừng lại tại vị trí mà bạn tạo breakpoint thì bạn có thể viết các lệnh lldb trong cửa sổ này.
   
   Một lưu ý là nó chỉ có thể lấy ra các giá trị ngay **trên khung hiện tại**, vd như hình bên dưới, mình tạo ra 1 breakpoint ngay tại dòng let sum = ... , điều này có nghĩa là dòng này chưa được thực thi trong Xcode, do đó sum chưa được gán giá trị nên nếu lúc này bạn gõ 'e sum' thì nó sẽ báo lỗi. (Hình bên dưới)
    
![](https://images.viblo.asia/6f4e3f99-bffa-4295-a2b5-1281ed059c24.png)

  Nên bạn muốn lấy biến sum thì phải ít nhất dừng ngay tại 1 dòng sau khi nó đã được tạo.
  
Ở đây bạn chỉ cần ấn cái nút OverStep bên cạch cái biểu tượng play (nó thực thi dòng này và dừng tại dòng tiếp theo)

Bây giờ bạn có thể gõ các lệch trong khung của sổ debug.
    
![](https://images.viblo.asia/565596fb-3906-496e-abbd-03b3b61c228c.png)

```
(lldb) e sum 
(Int) $R0 = 6 // giá trị của biến sum
(lldb) e sum = 4 // Thay đổi giá trị biến sum
(lldb) e sum 
(Int) $R2 = 4 // Bây giờ sum đã mang giá trị là 4 cho tới khi kết thúc phần debug này.
```
Bây giờ sum của bạn đang mang giá trị mà bạn giả định (số 4) bạn có thể bấm nút play, bên cạch nút OverStep để tiếp tục chạy hoặc có thể chạy qua từng dòng (bấm Overstep) và thay đổi các tham số khác để tìm bug.

Như vậy bạn đã biết cách thay đổi giá trị ngay tại khi app đang chạy bằng cách dùng lệnh e, code vui 1 tí giả sử bạn đang trong viewController và muốn đổi background thành màu đỏ thì có thể gõ:
```
(lldb) e self.view.backgroundColor = UIColor.red
```

expression command cũng có một vài *tham số*. Để phân biệt *tham số* và *biểu thức* ta dùng dấu **--** ngay phía sau biểu thức:

```
(lldb) expression <some flags> -- <variable>
```

expression có khoảng 30 tham số khác nhau. Và mình khuyến khích các bạn nên tìm hiểu thêm về chúng.

Bạn có thể viết command bên dưới vào terminal để lấy full doc:
```
> lldb
> (lldb) help                          " ---> In ra tất cả các lệnh có thể dùng"
> (lldb) help expression               " ----> In ra tất cả các sub-command của expressions"
```
 Một số flags hay dùng của expression:
*  -D <count> (--depth <count>)   : Thiết lập tối đa sự truy cập sâu vào loại dữ liệu (mặc định và vô cùng).
*  -O (--object-description) : Hiển thị mô tả cụ thể được viết trong biến description. 
*  -T (--show-types) : Hiển thị loại dữ liệu.
*  -f <format> (--format <formant>) : Định dạng hiển thị.
*   -i <boolean> (--ignore-breakpoints <boolean>) : Bỏ qua breakpoint khi đang chạy trong các biểu thức.

  Để rõ hơn các bạn có thể xem một số vd sau đây:
  
  Đầu tiên mình sẽ tạo các class sau:
```
class ClassA { var a = 1 }
class ClassB: ClassA { var b = 2 }
class ClassC: ClassB { var c = 3 }
class ClassD: ClassC { var d = 4 }
```
Nếu mình debug và gõ e classD thì nó sẽ in ra toàn bộ thông tin classD, bao gồm tất cả class mà classD kế thừa:
![](https://images.viblo.asia/47089106-c564-43d3-9e2e-4368a9044f9c.png)

Điều này có vẻ là không thật sự cần thiết khi ta chỉ muốn xét các giá trị của riêng classD. Để chặn lại xét duyệt vào toàn bộ nguồn gốc của classD ta dùng tham số D.
 Ở đây mình chỉ muốn xét riêng class D chứ không phải các class cha của nó nên tham số sẽ là 1.
![](https://images.viblo.asia/12926883-818f-4240-b836-573d63e76500.png)
    Bạn có thể dùng lệnh e -O -- classD hoặc đơn giản hơn là viết tắt của command **po** để lấy ra sự mô tả mặc định của object, giống như sau:
```
(lldb) e  -O -- classD
<ClassD: 0x6000002442c0>
```
 Trông nó không thật sự rõ ràng, nếu bạn muốn in ra thông tin dễ đọc hơn bạn cần sử dụng protocol **CustomStringConvertible** và chỉnh lại biến **description**: String {return "thông tin mà bạn muốn in ra trong debug"}.
 
 Khi đó bạn chỉ cần gõ po là nó sẽ trả về môt tả dễ đọc hơn.
 Vd: thay classD cũ thành như sau
```
class ClassD: ClassC, CustomStringConvertible {
    var d = 4
    var description: String {
        return "Đây là ClassD với d = \(d)"
    }
}
```
Và bây giờ bạn có thể in lấy ra lượng thông tin được mô tả của classD qua biến description thông qua lệnh e -O -- hoặc po
Tương tự ta cũng có lệnh print hoặc p, cú pháp như sau: `print <Biểu thức/ Biến>` hoặc `expression -- <Biểu thức/biến>`
![](https://images.viblo.asia/f7a32f54-3fce-4709-8bac-0c1508baabd7.png)

Ở phần tiếp theo mình sẽ viết về cách kiểm tra toàn bộ trạng thái của app + các lệnh: bugreport, frame, language.
Bài viết được dịch và chỉnh sửa từ bài gốc của Ahmed Sulaiman: [link](https://medium.com/flawless-app-stories/debugging-swift-code-with-lldb-b30c5cf2fd49)