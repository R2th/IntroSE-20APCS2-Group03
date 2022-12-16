# I. Giới thiệu

Trong nhiều trường hợp viết ứng dụng, chúng ta sẽ có những lúc cần viết các UITableView mà trong đó, các table view cell của nó có kích thước không giống nhau. Việc đầu tiên có thể chúng ta nghĩ tới để giải quyết vấn đề này là sử dụng hàm tableView(_ tableView: , heightForRowAt indexPath: ) của UITableViewDelegate để gán giá trị cho từng Table View Cell. Tuy nhiên việc này chỉ làm được khi ứng dụng có một vài loại cell có kích thước khác nhau, trong trường hợp Table View có hàng chục cell, mỗi cell lại có thích thước không giống nhau, thì gán height cho từng cell là một việc rất mệt mỏi, mất thời gian và gây khó khăn cho việc thay đổi, maintain code sau này. 
Trong những trường hợp như bên trên, phương pháp đúng đắn chúng ta cần sử dụng là self-sizing Table View Cell. Đây là một kỹ thuật trong iOS, sử dụng auto layout để các Table View Cell tự động điều chỉnh kích thước của chính mình phù hợp với nội dung bên trong nó. Dưới đây tôi xin giới thiệu đến các bạn các sử dụng self-sizing Table View Cell trong ứng ụng iOS

# II. Nội dung

## 1. Tạo project

Đầu tiên, các bạn [vào đây](https://www.dropbox.com/sh/bieu5gyxqwhdg3n/AAA72_3r10ucB3RHmipdDisFa?dl=0) download starter project.

Hãy nhìn qua starter project, chúng ta có 2 file iPhones.swift và iPhones.json để load dữ liệu, và 1 loạt ảnh trong Assets.xcassets

Tiếp theo, chúng ta sẽ tạo Table View cho ViewController. Việc tạo Table View là một việc rất căn bản của iOS nên mình sẽ chỉ nói qua thôi: 
* Vào Main.storyboard, tạo Table View cho ViewController
* Kéo vị trí Table View và thêm AutoLayout để Table View hiển thị trên toàn bộ view của ViewController
* Thêm Table View Cell, đặt tên class và Reuse Identifier của Table View Cell là SelfSizingTableViewCell
* Tạo file SelfSizingTableViewCell.swift với class SelfSizingTableViewCell thừa kế từ UITableViewCell

Sau khi thêm các view bên trên, chúng ta được như hình sau:

![](https://images.viblo.asia/d160c4ab-f03f-477d-ad9d-1b53f66ffe37.png)

Tiếp theo, chúng ta kéo delegate và datasource cho Table View, kéo tạo IBOutlet cho Table View vào ViewController.swift:

```swift
@IBOutlet weak var tableView: UITableView!
```

Để ý hàm viewDidLoad() của class ViewController, data từ file json đã được load vào instance “iphones”, bây giờ chúng ta sẽ thêm property để giữ data trong ViewController:
```swift
	var iphones = [IPhone]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        iphones = IPhone.dataFromBundle()
    }
```

Tiếp tục viết ViewController extension thêm các hàm datasource của Table View cho ViewController:

```swift
extension ViewController: UITableViewDataSource {
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return iphones.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "SelfSizingTableViewCell", for: indexPath) as! SelfSizingTableViewCell
        let iphone = iphones[indexPath.row]
        cell.textLabel?.text = iphone.information
        
        return cell
    }
}
```

Trong đoạn code implement các function của Table View Datasource bên trên, chúng ta lần lượt fill information của array iphones vào table. Build chạy thử project, chúng ta sẽ được App chạy như hình sau:

![](https://images.viblo.asia/90b4d6ac-e211-42a1-8fbe-2288f762c2bc.png)

Đến thời điểm hiện tại, chúng ta đã hiển thị được thông tin information của các iphone ra Table View. Tuy nhiên để ý các bạn sẽ thấy, các thông tin này chỉ được hiển thị 1 phần, trên 1 dòng của textLabel, phần lớn information bị cắt vì khoảng không gian hiển thị cho mỗi cell là tương đối khiêm tốn. Phần dưới đây, chúng ta sẽ sử dụng Self-sizing Table View Cell để hiển thị toàn bộ information và ảnh, tên của từng data.

## 2. Self-sizing Table View Cell

Bí quyết để sử dụng Self-sizing Table View Cell thật ra không có gì to tác cả, chúng ta chỉ cần sử dụng Auto Layout. Vấn đề ở chỗ chúng ta phải sử dụng đúng các layout cần thiết một cách hợp lý. Khi sử dụng Auto Layout, chúng ta cần thêm các constraint cho nội dung với tất cả các bên của cell. Cụ thể, chúng ta cần thêm leading, top, trailing và bottom constraint cho subview. từ các constraint này, cộng với kích thước nội tại của subview, iOS sẽ tính được ra kích thước cần thiết của Table View Cell.

OK, bây giờ chúng ta sẽ làm thực tế. đầu tiên, các bạn mở Main.storyboard lên, tăng size cho Table View Cell lên 140, kéo thả 1 UIImageView, 1 UILabel name và 1 UILabel information, sắp xếp các view như hình sau:

![](https://images.viblo.asia/9a65a37b-48b3-4afb-8f58-93ae78af69cf.png)

Để content mode của Image View là Aspest Fit, Alignment của name Label là center và Lines của information Label là 0.

Tiếp theo, đây là bước quan trọng nhất, chúng ta cần thêm constraint cho các subview này để Table View Cell có thể self-sizing. Các bạn lần lượt làm như sau:
* Image View: thêm leading, top constraint với Super View, trailing constraint với information Label, bottom constraint với name Label, giá trị các constraint đều bằng 0. Thêm equal width constraint với information Label
* Information Label: thêm top, trailing, bottom constraint với Super View, các giá trị của constraint đều bằng 0
* Name Label: thêm leading, bottom constraint với Super View, trailing constraint với Information Label, các giá trị constraint cũng đều bằng 0

Sau khi xây dựng xong layout, chúng ta cần tạo IBOutlet cho các subview để hiển thị dữ liệu trên Table View Cell. Các bạn kéo thả IBOutlet cho Image View, name Label và information Label vào SelfSizingTableViewCell và thêm code như sau:

```swift
class SelfSizingTableViewCell: UITableViewCell {

    @IBOutlet weak var phoneImageView: UIImageView!
    
    @IBOutlet weak var nameLabel: UILabel!
    
    @IBOutlet weak var informationLabel: UILabel!
    
    var iphone: IPhone? {
        didSet {
            phoneImageView.image = iphone?.image
            nameLabel.text = iphone?.name
            informationLabel.text = iphone?.information
        }
    }
}
```

Build chạy thử project, chúng ta có được kết quả như hình sau:

![](https://images.viblo.asia/1581e2c9-95ec-47c9-a687-6191f91e0cfb.png)


Để ý information của các cell trong App, chúng ta thấy information vẫn chưa được hiển thị hết, và các cell vẫn chưa được giãn ra để có thể hiển thị hết information. Bây giờ, chúng ta vào ViewController.swift và thêm code sau vào hàm viewDidLoad() để hoàn thành:
```swift
    override func viewDidLoad() {
        super.viewDidLoad()
        
        iphones = IPhone.dataFromBundle()
        
        tableView.rowHeight = UITableViewAutomaticDimension
        tableView.estimatedRowHeight = 140
    }
```


Build chạy thử project, chúng ta sẽ được kết quả như hình sau:

![](https://images.viblo.asia/197d2b4d-30ff-4cfd-9d43-8dcd1a5cc94a.png)

Để ý App chúng ta thấy, các cell trong Table View đã tự động giãn chiều cao để hiển thị toàn bộ thông tin của information Label. Thông tin càng nhiều thì Cell sẽ càng rộng ra để hiển thị hết thông tin. Việc tạo Table View với Self-sizing Table View Cell đã hoàn thành.

# III. Kết luận

trên đây tôi đã giới thiệu đến các bạn Self-sizing Table View Cell và cách sử dụng nó trong ứng dụng thực tế. Với việc sử dụng Self-sizing Table View Cell, việc viết code cho Table View với các Cell có chiều cao linh hoạt không còn là vấn đề phức tạp nữa.

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^!