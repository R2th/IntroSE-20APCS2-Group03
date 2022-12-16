UITableView thường xuyên được sử dụng trong ứng dụng ios để biểu diễn thông tin dưới dạng bảng. Hôm nay mình sẽ hướng dẫn các bạn cách để custom TableViewCell như hình dưới đây!![](https://images.viblo.asia/651a8650-6b6c-484e-aa32-343576718d07.png)

## Tạo TableView và các class controller

Trước tiên mình đã tạo sẵn 1 TableView như bên dưới, My Custom Table View  được controll bằng class MyCustomTableView
![](https://images.viblo.asia/ed0fc41d-4868-4739-ad19-3c78b1aab83f.png)
Tiếp theo gắn dataSource và delegate của customCell cho ViewController
![](https://images.viblo.asia/2128a63b-c11c-4337-b54a-3a23826c4d7e.png)
Trong class MyCustomTableView chúng ta cần extend UITableViewDataSource và UITableViewDelegate,
chúng ta cũng phải implement 2 protocol của UITableViewDataSource là numberOfRowsInSection và cellForRowAt![](https://images.viblo.asia/709f96ee-6ded-440c-9b01-d1f3cc552228.png)
Khởi tạo 1 custom cell trong storyboard thêm các thành phần cần thiết vào cell(label, image, button...)
Tạo class custom cell có tên là MyCell trong  MyCustomTableView.swift và add MyCell là custom class của  customCell sau đó kéo các ánh xạ tương ứng từ storyboard sang class MyCell 
![](https://images.viblo.asia/dc0d2b91-2a35-408d-89f3-2e36e12df0a2.png)
```
class MyCell: UITableViewCell {
    @IBOutlet weak var lbUsername: UILabel!
    @IBOutlet weak var lbFollower: UILabel!
    @IBOutlet weak var imgAvatar: UIImageView!
    @IBOutlet weak var btnDelete: UIButton!   
}
```

## Custom TableCell

Tiến hành sửa code 2 function numberOfRowsInSection và cellForRowAt để custom cell:

```
 var userData = ["Box Fan", "Ceiling Fan", "Desk Fan", "Fish Tank", "Floor Lamp", "Front Door","Box Fan", "Ceiling Fan", "Desk Fan",  "Garege Door", "Box Fan", "Ceiling Fan", "Desk Fan", "Lava Lamp", "Box Fan", "Ceiling Fan", "Desk Fan", "Fish Box"]
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return userData.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "customCell", for: indexPath) as! MyCell
        cell.lbUsername.text = userData[indexPath.row]
        cell.imgAvatar.layer.cornerRadius = 20
        cell.imgAvatar.image = UIImage(named: userData[indexPath.row])
        let randomNum:UInt32 = arc4random_uniform(1000)
        let random = Int(randomNum)
        cell.lbFollower.text = "Follower \(random)"
        return cell
    }
```
Build thử và kết chúng ta nhận được: 
![](https://images.viblo.asia/0107c390-0ce3-4f99-84e1-2e245f6389eb.png)

## Xử lý sự kiện xoá Cell(Truyền data từ cell sang ViewController bằng protocol/delegate)

Kéo ánh xạ action button delete vào MyCell class. 
Để app biết khi click button delete sẽ xoá row nào của section nào chúng ta dùng protocol/ delegate để truyền data.

Khai báo 1 protocol CustomCellDelegte có funtion làm nhiệm vụ truyền data về chỉ số row và section của cell muốn xoá, sau đó MyCustomTableView sẽ extend nó và implement function này.
Trong class MyCell sẽ khai báo thêm 1 biến delegate có kiểu là CustomCellDelegte, có nhiệm vụ sẽ uỷ quyền cho MyCustomTableView thực hiện function deleteRow khi button delete được click.

Khai báo delegate:

```
protocol CustomCellDelegte {
    func deleteRow(section : Int, row : Int) -> Void
}
```

Khai báo biến delegate và các chỉ số index cell trong MyCell:

```
 var delegate : CustomCellDelegte?
 var section : Int = 0
 var row : Int = 0
```

sự kiện onclick button delete trong MyCell :

```
@IBAction func onClickBtnDelete(_ sender: Any) {
         delegate?.deleteRow(section: self.section, row: self.row)
    }
```

Implement function deleteRow trong MyCustomTableView :

```
 func deleteRow(section: Int, row: Int) {
        let alertView = UIAlertController(title: "Thông báo", message: "Có phải bạn muốn xoá cell ở section : \(section) row : \(row)", preferredStyle: UIAlertControllerStyle.alert)
        
        let alertCancelAction = UIAlertAction(title: "Cancel", style: UIAlertActionStyle.cancel, handler: nil)
        let alertConfirmAction = UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: { _ in
            let indexPath = IndexPath(row: row, section: section)
            self.listUserDatas.remove(at: row)
            self.myTable.deleteRows(at: [indexPath], with: UITableViewRowAnimation.automatic)
        })
        
        alertView.addAction(alertCancelAction)
        alertView.addAction(alertConfirmAction)
        
        self.present(alertView, animated: true, completion: nil)
    }
```

Uỷ quyền cho MycustomTableView:

``` 
cell.section = indexPath.section
cell.row = indexPath.row
cell.delegate = self
```
Build lại project kết quả nhận được:
![](https://images.viblo.asia/85ecc70a-32fa-444d-8e0e-73c18fb31cec.png)
![](https://images.viblo.asia/8faa8726-2e7f-4255-90b3-3d831aaf0055.png)

Sau khi ấn Ok Desk Fan đã được xoá khỏi TableView

## Kết luận 

Trên đây mình đã hướng dẫn cách để custom 1 tableCell hy vọng sẽ giúp ích được cho các bạn.

Example : 
[Tutorial_swift_tableView](https://drive.google.com/file/d/19zKV6s0YSsDmg1v0-vIWwD2QOZAw8wPT/view?usp=sharing)