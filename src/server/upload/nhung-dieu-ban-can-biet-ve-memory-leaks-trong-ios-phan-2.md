# Phần 2
### Rò rỉ bộ nhớ trong Closure
Khi chúng ta tạo 1 closure với giá trị nó cần sử dụng nó yêu cầu giữ 1 tham chiếu mạnh tới giá trị đó nếu giá trị đó cần thiết cho closure và closure lại chính là thành phần của controller.

Như hình dưới, chúng ta tạo 1 optional closure như 1 thuộc tính của controller với kiểu `() -> Int` và đăng ký giá trị đó trong `viewDidLoad.` Closure cần thuộc tính `a` và `b` để thực thi. Cũng vì thế `a` và `b` là những thuộc tính của 1 lớp nó sẽ  chụp tham chiếu lớp thông qua từ khoá `self`. Đây là những giá trị nó cần bên ngoài, và giữ cho những giá trị đó có thể sử dụng được

![](https://images.viblo.asia/9c281570-17fe-45d3-8c44-b79892f8ad1e.png)

``` swift
var someClosure: (() -> Int)?
```

Đầu tiên, chúng ta có `self.someClosure` lưu trữ 1 tham chiếu mạnh tới closure:

`someClosure = { return self.a + self.b }`

Từ đó `ViewController` và `Closure` cả 2 đều loại tham chiếu hệ thống đếm tham chiếu của ARC đều đếm trên cả 2.

Để thực thi câu lệnh, chúng ta định nghĩa closure và gán nó với thuộc tính của lớp nơi giữ tham chiếu mạnh tới closure và tăng số tham chiếu của closure lên 1 trong hình dưới. Từ khi Controller được push từ navigation controller. `Navigation Controller` tạo tham chiếu mạnh tới 
tới ViewController nơi tăng số tham chiếu lên 1 điều đó ngăn cho ViewController không bị giải phóng  

Từ thời điểm closure cần thuộc tính `a` và `b` nó giữ/chụp tham chiếu tới `class` điều đó khiến cho số tham chiếu lên lớp tăng lên 2

![](https://images.viblo.asia/7bf813fe-cdd7-48c5-8d71-cce764011813.png)

Khi bạn pop ViewController nó được xoá khỏi stack của navigation khiến số tham chiếu giảm đi 1.

Thực tế, ViewController deinit nên được gọi nhưng chúng ta đã tạo ra retain cycle. Nó xảy ra khi chúng ta tạo nên vòng tham chiếu giữa 2 hoặc nhiều các đối tượng tới nhau như minh hoạ.

ARC tìm và không thấy số tham chiếu là 0 nên nó sẽ không giải phóng cả 2 khỏi bộ nhớ:

![](https://images.viblo.asia/b608bb5d-2d94-4736-9db4-40698a2c0af1.png)

### Giải pháp
Khiến 1 trong những tham chiếu trở thành weak/unowned và còn lại là tham chiếu mạnh, và vì thế, vòng tròn tham chiếu sẽ bị phá vỡ

Xem hình bên dưới, closure giờ chụp tham chiếu yếu tới self. Từ đó chúng ta sử dụng weak với việc khiến cho self trở thành kiểu optional đó là lý do sử dụng guard để unwarp an toàn cho giá trị của self.

![](https://images.viblo.asia/20ab6760-59b1-41d0-87f1-cd72f1e01ced.png)

``` swift
var someClosure: (() -> Int)?
self.someClosure = { [weak self] in guard let `self` = self else { 
return 0 return self.a + self.b}
```

Navigation toạ 1 tham chiếu mạnh tới `SecondViewController` khiến số tham chiếu tăng lên 1 và `SecondViewController` đang sở hữu closure từ khi closure là thuộc tính của lớp, số tham chiếu lên closure là 1. Nhưng giờ clossure chụp yếu lên `self` như chúng ta đã định nghĩa trong closure vì thế số tham chiếu sẽ không tăng lên như hình:

![](https://images.viblo.asia/309103a4-8e3e-4660-b4a1-38dc55bef74a.png)

Giờ, sau khi popViewController sẽ diễn ra các hoạt động sau:
1. Navigation controller xoá ViewController khỏi stack và giảm số đếm tham chiếu thành 0.
2. ARC tìm đối tượng không có tham chiếu tới và thấy ViewController tiếp đó xoá nó khỏi bộ nhớ và cũng gỡ các liên kết mà nó sở hữu
3. Vì tham chiếu mạnh và yếu của ViewController cũng được xoá vì thế giảm bộ đếm tham chiếu của closure thành 0 và cuối cùng gỡ nó khỏi bộ nhớ.

## Sự khác biệt giữa weak và unowned
### Unowned

Giống như tham chiếu weak, tham chiếu unowned không giữ tham chiếu mạnh tới đối tượng nó chỉ tới( nghĩa là nó có thể dùng để phá vỡ vòng lặp tham chiếu)

Không như tham chiếu weak, tuy nhiên, 1 tham chiếu unowned được sử dụng khi đối tượng còn lại có vòng đời tương tự hoặc dài hơn.
Cùng đặt vào trong trường hợp như sau nếu bạn chắc rằng khi closure thực thi `self` thành công nếu không thì ứng dụng sẽ crash. **HOẶC** `self` có vòng đời dài hơn closure

[Tải ứng dụng mẫu](https://github.com/aliakhtar49/MemoryLeaks)

Chạy ứng dụng >> nó sẽ hiển thị màn hình và có nút >> chạm vào nút nó sẽ push SecondViewController >>
Ở `viewDidLoad` nó sẽ thực thi `someMethodThatTakeClosure` nó mất 4 giây. Sau 4 giây nó sẽ thực thi closure và yêu cầu `self` vì thế sau 4 giây nếu chúng ta pop secondViewController ứng dụng sẽ bị crash như hình miêu tả bên dưới từ khi closure có thời gian sống dài hơn và SecondViewController cũng được huỷ:

![](https://images.viblo.asia/1a1eceba-5248-4015-aeda-8c0edb8f69c3.png)

### Sửa
Sử dụng `weak self` sẽ dùng self thành optional và có thể guard để mở nó. Nếu self thực sự được huỷ chúng ta có thể xử lý nó

![](https://images.viblo.asia/4b2a7551-6f99-4198-9af9-17ad95c259fe.png)

### Quy tắc nhớ

Sử dụng `weak` nếu bạn không chắc chắn `self` mà bạn chụp trong closure có thể hoặc không có sẵn trong vài trường hợp

Sử dụng `unowned` nếu bạn chắc rằng 100% `self` sẽ luôn có sẵn khi bạn thực thi closure

### Luật 2:
Khi bạn có closure bên trong class và bạn muốn truy cập bất cứ gì mà cần dùng self hãy sử dụng self qua weak/ `unowned`.

### Không rò rỉ bộ nhớ trong trường hợp 1
Hàm Closure  chụp self nhưng không gây ra rò rỉ
Như hình dưới chúng ta tạo closure trong vòng nội bộ của `someMethod` khi closure không còn là thuộc tính của controller, controller không giữ ham chiếu mạnh tới closure nhưng closure chụp self mạnh điều này nghĩa là khi thực thi controller sẽ tự deallocate. Trong trường hợp này, closure có vòng đời dài hơn

![](https://images.viblo.asia/2b578b4e-d8c3-49ee-9310-baf458eb7f78.png)

1. Navigation Controller giữ tham chiếu mạnh tới SecondViewController khiến số tham chiếu là 1.
2. Closure chụp self mạnh khiến số tham chiếu đối tượng SecondViewController tăng lên 0
3. biến newSomeClosure giữ tham chiếu mạnh tới closure khiến RF = 1.

![](https://images.viblo.asia/29672890-61cf-420b-8446-fed1c0f03f21.png)

Giờ xem những điều sẽ xảy ra khi chúng ta popViewController:
1. SecondViewController RF = 1
2. Khi closure thực thi và trong phạm vi nội bộ giữ nó được gỡ khỏi stack. Closure RF sẽ giảm bớt 1 và trở về 0.
3. Closure RF = 0 sẽ xoá tất cả mọi thứ nó đang giữ từ nó và khiến cho SecondViewController RF = 0 và khiến cho ViewController được giải phóng.

### Không rò rì bộ nhớ trường hợp 2
Phương thức static sẽ chụp self mà không tạo nên bất kỳ rò rỉ bộ nhớ.
`self` không sở hữu lớp static nhưng lớp static closure chụp self mạnh

Static Class --> Closure --> Self ( không tạo nên rò rỉ bộ nhớ)

![](https://images.viblo.asia/0168b89f-68b4-4cbb-af9f-41b624638d3d.png)

Mã bên dưới sẽ không rò rỉ bất kỳ bộ nhớ nào kể từ khi Class không sở hữu `DispatchQueue`.

``` swift
DispatchQueue.main.asyncAfter(deadline: .now() + 2) {

self.execute()

}
```

## Rò rỉ bộ nhớ
### Rule of Thumb:
Nếu bạn sử dụng Singleton / Static class để giữ closure trong lớp của nó. Thời gian mà nó giữ closure bộ nhớ sẽ bị mất trong thời gian này. 
Minh hoạ bên dưới, chúng ta cí 1 singleton class sẽ giữ closure trong `someSingletonMethod` và sau khi thực thi closure, phạm vi phương thức sẽ kết thúc và closure sẽ được giải phóng bộ nhớ sau khi biến địa phương giữ closure được giải phóng:

``` swift
SingletonClass.shared.someSingletonMethod(self.a) { (value) in

self.execute()
}
```

![](https://images.viblo.asia/64144d44-f643-4d70-8f4f-4772590d7feb.png)

Chúng ta có singleton class sẽ giữ closure trong `someSingletonMemoryLeakMethod` và khi thực thi, nó giữ tham chiếu mạnh tới closure như thuộc tính class và sau khi thực thi closure, nó sẽ không được giải phóng bởi lớp Singleton luôn tồn tại trong bộ nhớ và nó sẽ giữ closure và tạo nên memory leak. Trong trường hợp này, lỗi rò rỉ bộ nhớ xảy ra.

### Memory Leak = SingletonClass -> Closure -> Self
Cho đến khi SingletonClass tồn tại trong Memory, self (ViewController) sẽ tồn tại trong bộ nhớ.

Khi chúng ta pop controller sẽ không được deadllocate từ khi closure sẽ giữ nó mạnh nó sẽ được lưu trữ và không được giải phóng bởi Singleton Class:

```
SingletonClass.shared.someSingletonMemoryLeakMethod(self.a) {
(value) in

self.execute()
}
```

![](https://images.viblo.asia/601d6376-14fb-4aa6-8c3d-69b3c2353dae.png)

### Giải pháp
Sử dụng weak self để tránh memory leak:

**No Memory Leak = SingletonClass → Closure**

Từ giờ **SingletonClass** chỉ giữ tham chiếu tới closure từ khi closure weak self khi chúng ta pop controller nó sẽ deallocate vì nó chỉ sở hữu navigation controller.

Ví dụ này sẽ tiến tới lớp tĩnh:

![](https://images.viblo.asia/43ad3226-657a-4dfb-8731-2a3fc5554d1c.png)

### Truy tìm Memory Leak sử dụng Memory Graph Debugger

Chúng ta sẽ tìm cách sửa lỗi chúng ta sẽ tìm lỗi và sử dụng bằng công nghệ trước. Nhiệm vụ chính là sử dụng Memory Graph Debugger để tìm lỗi trong dự án. [Tải dự án ví dụ.](https://github.com/aliakhtar49/MemoryLeaks)

### Memory Graph Debugger

Để tìm cách, chúng ta hãy trả lời câu hỏi: **Vì sao đối tượng tồn tại trong bộ nhớ?**

Memory graph debugger giúp tìm và sửa lỗi vòng lặp tham chiếu và rò rỉ bộ nhớ. Khi kích hoạt nó sẽ dừng ứng dụng, và hiển thị những đối tượng tồn tại trong heap, và tham chiếu sẽ giữ chúng tồn tại.

Mở dự án đã tải và chạy ứng dụng, tap nút sẽ chuyển hướng  tới màn hình mới. Tap từ khi bạn chạm màn hình và có chữ ""Third View Controller Title", giờ chạm vào nút pop Third View Controller sẽ hiển thị "Second View Controller". Sau đó tap trở lại bạn cần thấy rò rỉ bộ nhớ trong Third View Controller hoặc không.

Như hình dưới, giờ trong `SecondViewController` nhưng `ThirdViewController` vẫn còn trong bộ nhớ nghĩa là chưa được giải phóng. Chạm vào nó, chúng ta sẽ định nghĩa vài closure giữ nó mạnh:

![](https://images.viblo.asia/845cbc2e-ff51-4b8b-aca2-8c27e1b58c02.png)

Chúng ta sẽ tìm thấy trong ViewDidLoad:

![](https://images.viblo.asia/7de44c05-ec4c-4425-bd2d-293e21f61e6f.png)

![](https://images.viblo.asia/167436d5-8aec-4ac9-bb4f-bfb664bac186.png)

Giờ chạy lại ứng dụng và theo dõi các bước, sẽ không thấy memory leak. Như hình không còn ThirdViewController trong heap nghĩa là nó đã được giải phóng:

![](https://images.viblo.asia/18b68356-9180-4472-8053-67815138ab92.png)

Chúng ta đã giải quyết các lỗi rò rỉ bộ nhớ, vẫn còn 1 số chỗ gây ra nó trong controller. Chạy ứng dụng lại và tới `ThirdViewController` và tap Button 1. Việc tapp này sẽ tạo ra memory leak bên trong nó như hình 

![](https://images.viblo.asia/6c651e3c-a7aa-458c-bf82-886fc1c54fd4.png)

## Tòm tắt:
### Để tìm rò rỉ bộ nhớ bạn cần thực hiện mọi flow mà controller của bạn sẽ thực hiện và kiểm tra memory graph debugger heap hoặc in cái gì đó trong deinit

Vậy là đã hết phần 2 của bài dịch của  [bài viết](https://medium.com/flawless-app-stories/all-about-memory-leaks-in-ios-cdd450d0cc34) của tác giả Ali Akhtar, cám ơn các bạn đã dành thời gian đọc.