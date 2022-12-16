### Projec 1: Tap Counter
![](https://images.viblo.asia/b8193c45-4621-4d0c-9c5b-23c3da60f984.gif)


xây dựng giao diện gồm có: label để hiển thị counter, 2 button là Tap để đếm, Reset để reset count về 0


![](https://images.viblo.asia/1df2552e-9fd8-49d6-af61-5fc2a1cf815d.png)

Các bạn nhớ kéo outlet và các action để implement code.


tiếp theo viết code để thực hiện việc đếm


![](https://images.viblo.asia/5543c58c-8b2c-431a-ac73-703173011057.png)

Bây giờ bạn hãy build và run ứng dụng để xem nó hoạt động như thế nào nhé, có giống với hình ảnh từ đầu bài hướng dẫn hay không nhé!

### Project 2: Tap or Hold counter

![](https://images.viblo.asia/32808b6f-9519-4a6e-b8b2-f6644eb3bd9e.gif)


Các bạn có thể tận dụng lại giao diện từ project trước (Tap Counter)
kéo thêm outlet cho button tap là button, rename thành Tap or Hold

Bây giờ chúng ta add các gestures cho button bằng code trong method ViewDidload
```
    override func viewDidLoad() {
        super.viewDidLoad()
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(tapAction))  //Tap function will call when user tap on button
        let longGesture = UILongPressGestureRecognizer(target: self, action: #selector(holdAction)) //Long function will call when user long press on button.
        tapGesture.numberOfTapsRequired = 1
        button.addGestureRecognizer(tapGesture)
        button.addGestureRecognizer(longGesture)
    }
```

tiếp đến là hàm được gọi đến để thay đổi giá trị counter
```
    @objc func gestureReconierAction() {
        self.count = count + 1
        self.countLb.text = "\(self.count)"
    }
```

Build and run ta sẽ có kết quả như phần đầu project 2 mình có show




> Đây là 2 ứng dụng đầu tiên, rất đơn giản phải không nào. Từ những bài sau thì số lượng có thể project trong 1 bài sẽ tăng lên và độ khó, phức tạp cũng tăng lên. Mong được các bạn ủng hộ!



Peaceeee!