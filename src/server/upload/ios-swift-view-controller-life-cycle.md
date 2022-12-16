## View Controller Life Cycle
View Controller life cycle là gì? chính là vòng đời của một view controller được tính từ lúc nó được nạp vào bộ nhớ(RAM) cho tới khi nó bị huỷ khỏi bộ nhớ.

  Một cách hiểu đơn gian về UIViewController chính là một class cung cấp mọi thứ cần thiết để quản lý View in iOS app.

  View controller có nhiệm vụ chính sau :

Update nội dung của view theo thay đổi tới các data bên dưới.
Tương tác với view và system.
Thay đổi size view và quản lý các layout.
  Lưu ý: Một View Controller chỉ có thể được quản lý được một View và tập hợp các Subview(Các control như button, label, UIView….).

Dưới đây là sơ đồ nói về hoạt động sống của một view controller cùng với các hàm nó sẽ được gọi tự động tại một thời điểm xác định nào đó. Chi tiết xin tham khảo mô tả bên dưới.
![](https://images.viblo.asia/c7a3245c-6d21-4cc1-b914-d6948a91c6c2.jpg)

Danh sách các hàm sẽ được gọi tự động trong chu kỳ:

**LoadView**

* Hàm này sẽ được gọi đầu tiên khi khởi tạo một view controller.

* Hàm này được dùng khá nhiều vào cái thời code giao diện bằng tay hay nói cách khác là thời chưa có Storyboard.

* Mục đích chính là dùng để khởi tạo các UI (Label, Button, Text Field…) chứa trong View lớn này.

**viewDidLoad**

* Khi view controller đã được nạp vào bộ nhớ( điều kiện là cái view controller này chưa tồn tại trong bộ nhớ), thì hàm viewDidLoad được gọi.

* Chỉ được gọi một lần duy nhất trong chu kỳ sống của view đó thôi.

* Thường dùng để chuẩn bị data hoặc là khởi tạo các giá trị mặc định cho các object cũng như UI trên màn hình.

**viewDidUnload**

* Khi app của bạn nhận được cảnh báo từ hệ thống về trạng thái bộ nhớ đang gần hết thì hàm này sẽ được gọi

* Tại hàm này sẽ giải phóng bớt các property không cần dùng, gán nil chúng để giải phóng bộ nhớ.

**viewWillAppear**

* Hàm sẽ được gọi trước khi một view được thêm vào hệ thống view và trước animation hiển thị một view.

* Tại thời điểm animation để hiển thị view thì nếu bạn muốn tuỳ chỉnh gì thì hàm này sẽ giúp bạn làm điều đó.

**viewDidAppear**

* Hàm sẽ được gọi khi một view đã được thêm vài hệ thống view và đã hiển thị lên màn hình.

**viewWillDisappear**

* Gọi khi một view đã được ẩn khỏi màn hình và amination khi ẩn view đó.

**viewDidDisappear**

* Gọi khi một view đã được ẩn khỏi màn hình.

## Xậy dựng ứng dụng và xem nó chạy như nào

- Ta có 2 màn hình Vàng + Xanh và button chuyênr màn hình
![](https://images.viblo.asia/cb2b102c-167d-4993-9de4-04a4717f1fa7.png)
- Ở ViewController : 
```swift
class ViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        print("Man Hinh 1 : View DidLoad")
    }
    
    @IBAction func goToXanh(_ sender: Any) {
        let sb = UIStoryboard(name: "Main", bundle: nil)
        let manHinhXanh = sb.instantiateViewController(withIdentifier: "MauXanhViewController") as! MauXanhViewController
        self.navigationController?.pushViewController(manHinhXanh, animated: true)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        print("Man Hinh 1 : viewWillAppear")
    }
    
    override func viewDidAppear(_ animated: Bool) {
        print("Man Hinh 1 : viewDidAppear")
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        print("Man Hinh 1 : viewWillDisappear")
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        print("Man Hinh 1 : viewDidDisappear")
    }

}
```
+ Khi start app ta được :
![](https://images.viblo.asia/11288a05-8ff4-4ac6-a5b4-b1b434e74772.png)
Ở đây ta sẽ gọi 3 func là viewDidLoad, viewWillAppear, viewDidAppear
+ Khi click button "go to Xanh" ta được : 
![](https://images.viblo.asia/a4a6fd10-debb-4adf-9d17-684113fd4d12.png)
Tiếp theo sẽ gọi thêm 2 func là viewWillDisappear và viewDidDisappear
+ Khi back quay trở lại màn hình màu vàng ta được : 
![](https://images.viblo.asia/248a8241-a694-4816-9857-88921d30a2bc.png)
Lưu ý ở đây khi quay trở lại màn hình màu vàng thì func luồng dữ liệu đã không đi vào viewDidLoad mà chỉ vào func viewWillAppear, viewDidAppear

**Vậy nếu di chuyển 2 VC với nhau thì luồng dữ liệu sẽ di chuyển như thế nào ???**

Để hiểu rõ Ở MauXanhViewController ta thêm code sau :
```swift
class MauXanhViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        print("Man Hinh 2 : viewDidLoad")
        // Do any additional setup after loading the view.
    }

    override func viewWillAppear(_ animated: Bool) {
        print("Man Hinh 2 : viewWillAppear")
    }
    
    override func viewDidAppear(_ animated: Bool) {
        print("Man Hinh 2 : viewDidAppear")
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        print("Man Hinh 2 : viewWillDisappear")
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        print("Man Hinh 2 : viewDidDisappear")
    }
}
```

+ Khi start app : 

![](https://images.viblo.asia/8b9ead44-d65c-477b-b405-2a857d502578.png)

Có 3 func được chạy

+ Khi click button "Go To Xanh"

![](https://images.viblo.asia/b9d1aa2d-3272-48d9-9742-bd3d5d06e98a.png)

Lần lượt các func được chạy như ở log

+ Khi back về màn hình vàng

![](https://images.viblo.asia/a939335e-0576-41a2-b8b8-c1436908be2a.png)

Thanks for reading !!