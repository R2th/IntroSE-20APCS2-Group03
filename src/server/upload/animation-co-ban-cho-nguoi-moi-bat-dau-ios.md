## Mở đầu:
Hôm nay mình sẽ hướng dẫn làm **animation** cơ bản cho các bạn mới bắt đầu tìm hiểu về vấn đề này. Cơ bản nhất thì chắc phải nói đến thuộc tính **animation** của **UIView()** nên mình bắt đầu từ đây nhé! 

### Login
Mình có một màn hình login như sau:
![](https://images.viblo.asia/6016f0a9-e887-4492-9ee7-f95615f80ddc.png)

Thường thì đây là mặc định các bạn có thể nhìn thấy khi chạy project, chúng ta có thể làm cho màn hình login trở lên sinh động hơn nhờ dùng thêm **animation** cho nó. Lấy **Label Header** và 2 **TextFields** làm ví dụ, chúng ta sẽ xét lại **position** cho chúng:

```
override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        heading.center.x  -= view.bounds.width
        username.center.x -= view.bounds.width
        password.center.x -= view.bounds.width
}
```
Lý do mình phải set lại **position** trong **viewWillAppear** là lúc này thì frame của các thành phần bên trong **View** mới được hình thành, lúc đó chúng ta mới xác định được chính xác vị trí của các thành phần để set lại vị trí cho chúng.

![](https://images.viblo.asia/1ac0c5ff-8374-4f04-9389-a0292c92b89a.png)

Và khi chạy code lên nó sẽ như thế này: 
![](https://images.viblo.asia/d9d383db-a9d1-41b1-95fc-9735ff4d79dd.png)

Perfect :D Giờ chúng ta sẽ thêm animation để cho chúng di chuyển về vị trí ban đầu nhé. Chúng ta sẽ thêm đoạn code sau vào cuối của viewDidAppear():
```
UIView.animate(withDuration: 0.5) {
  self.heading.center.x += self.view.bounds.width
}
```
Để dùng animation cho **Title Header** chúng ta cần gọi phương thức **animate(withDuration:animations:)** của class **UIView**, **animation** sẽ hoạt động ngay lập tức với thời gian hoàn thành dựa vào **duration** mà chúng ta truyền vào. Thật đơn giản đúng không!!!. 

Tất cả những gì chúng ta thay đổi đối với chế độ xem trong **animations closure**  sẽ được hoạt động với **animation** bởi **UIKit** . Chúng ta thử chạy project sẽ thấy được **Title Header** di chuyển như sau: 

![](https://images.viblo.asia/2d254003-c156-449e-a023-5406a5768966.png)

Cool! :v chúng ta đã có **animation** đầu tiên!!!

Vì **animate(withDuration:animations:)** là một phương thức của **class** nên nó sẽ không giới hạn **animation** cho một chế độ xem cụ thể. Trong thực tế chúng ta có thể chạy nhiều **animation** như mong muốn ở bên trong **animations closure**, hãy thêm vào đoạn code sau và chạy: 
```
self.username.center.x += self.view.bounds.width
```

Chúng ta có thể thấy cả 2 đều đang thực hiện **animation**, thật là tuyệt. Nhưng để ý thì thấy cả 2 đang thực hiện cùng một khoảng cách và cùng một thời gian bắt đầu và kết thúc, nhìn khá là cứng nhắc. Chúng ta hãy sửa lại một chút, đầu tiên hãy xoá dòng **self.username.center.x += self.view.bounds.width** cũ đi và thêm đoạn code dưới đây vào:
```
UIView.animate(withDuration: 0.5, delay: 0.3, options: [],
  animations: {
    self.username.center.x += self.view.bounds.width
  },
  completion: nil
)
```

và chạy:
![](https://images.viblo.asia/fdbdef2d-c4ce-41b2-91c6-8d608fc99dcd.png)

Ngon, chúng đã chạy so le chứ không đồng thời cùng lúc rồi! 

Phương thức chúng ta sử dụng lần này nhìn khá giống phương thức ở trên chúng ta sử dụng nhưng có thêm 1 vài thuộc tính khác để **customize animation**:

```
1. withDuration: Thời gian thực hiện animation.
2. delay: Thời gian chờ trước khi bắt đầu animation.
3. options: cho phép tuỳ chỉnh một số khía cạnh của animation, ví dụ như bắt đầu nhanh dần đều, bắt đầu chậm dần đều, vv.. Ở đây chúng ta để là [] nghĩa là không có tuỳ chỉnh nào.
4. animations: Nơi chứa các thành phần thực hiện animation.
5. completion: Nơi xử lý các hành động sau khi animation thực hiện xong.
```

Như đoạn code chúng ta thêm ở trên đã set thuộc tính **delay** cho **username** là 0.3 vậy là tính từ lúc chạy **animation** đến 0.3 giây sẽ thực hiện **animation** cho **username**. Chúng ta thử thêm cho **password** như sau: 

```
UIView.animate(withDuration: 0.5, delay: 0.4, options: [],
  animations: {
    self.password.center.x += self.view.bounds.width
  },
  completion: nil
)
```

Ở đây chúng ta đang làm giống như **username**, chỉ khác là thay đổi độ trễ của nó, chúng ta chạy code:

![](https://images.viblo.asia/ccc6ac0e-7923-4ece-8979-8a32d6074fe3.png)

Ngon, nó đang hoạt động **animation** khá tốt!

Đó là tất cả những gì chúng ta cần làm để tạo hiệu ứng cho các lượt xem trên màn hình bằng **animation** của **UIKit**. Đó chỉ là sự khởi đầu của nó - bạn sẽ học được một vài kỹ thuật làm **animation** tuyệt vời hơn trong phần các phàn tiếp theo! :D 

## Lời kết: 
Bài viết về **animation** được dịch theo sách **"iOS AnimationsAnimations by TutorialTutorials"** bởi **Marin Todorov**. Sách này rất hay, các bạn có thể mua sách trực tiếp để ủng hộ tác giả nhé. Và đừng quên theo dõi những bài dịch tiếp theo của mình về chủ đề này! :-*