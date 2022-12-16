Tôi đã gặp 1 số khó khăn khi kết hợp UICollectionView với UITableViewCell, vì vậy giờ tôi đọc nhiều nguồn khác nhau và giờ sẽ tổng kết lại và tạo thành 1 sự hướng dẫn rõ ràng hơn.

**Lưu ý: Bài viết này không dành cho những bạn mới bắt đầu, mặc định bạn đã biết về tableView và việc tạo các tuỳ chọn cell với file xib.

Và nó sẽ không làm điều gì giúp cho giao diện của bạn trông đẹp, chỉ đơn thuần là chạy được code, và hiển thị lên như yêu cầu**

![](https://images.viblo.asia/d9f30375-42ea-4795-87ce-a988f5c6bdcf.png)

Khởi đầu bạn tạo 1 project với 1 tableView, đã được connect qua storyboard, ngoài ra tạo 1 file xib và lớp UITableViewCell để kết hợp với UICollectionView.

# 1. Thêm UICollectionView vào file Xib TableViewCell
1. Kéo thả 1 collection view
2. Thêm các constraints
3. Tìm hiểu vì sao bạn không thể thêm các CollectionViewCell vào collection view bạn vừa thả bên trên

Và thật ra bạn cần 1 file riêng để chứa bất cứ collection view cell nào bạn muốn hiển thị. (Khi UICollectionView của bạn ở trong 1 file Xib)

# 2. Thêm 1 file và 1 Xib UICollectionViewCell vào Project của bạn

![](https://images.viblo.asia/4640c3fb-d130-4540-8ad8-1f7db8e62bae.png)

Bạn có thể làm điều này bất cứ điều gì mà bạn muốn hiển thị với Xib CollectionViewCell, cho mục đích của bài hướng dẫn này, tôi chỉ đơn gỉan thay đổi màu nền của chúng.

Đảm bảo rằng bạn cung cấp cho cell của bạn 1 resuableIdentifier

![](https://images.viblo.asia/9148287a-db6c-4e98-a767-c1795faf9720.png)

# 3. Cấu tạo lớp TableViewCell của bạn với các giao thức UICollectionView Data Source và Delegate

### Bước 1: Trở lại file Xib tableViewCell
### Bước 2: Vào phần Outline Document 

![](https://images.viblo.asia/f293e255-0082-4f27-a647-d37e4f325bc0.png)

### Bước 3: Kéo thả từ collectionView của bạn tới 'File Owner' và chọn dataSource và tiếp đến là delegate. ( Có thể giữ phím Cmd để lựa chọn đồng thời)
### 
![](https://images.viblo.asia/2886f40d-ac1d-4df3-8996-64d43d65d59e.png)

### Bước 4: Kết nối collectionView của bạn tới lớp TableViewCell thông qua việc tạo 1 IBOutlet, kéo thả

![](https://images.viblo.asia/04e10837-12e2-4d9e-ae76-a73b89b40825.png)


### Bước 5: Cấu hình lớp tableViewCell của bạn phù hợp với giao thức UICollectionViewDelegate và UICollectionViewDataSource

```
class TableViewCell: UITableViewCell, UICollectionViewDelegate, UICollectionViewDataSource {
    @IBOutlet weak var collectionView: UICollectionView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        self.collectionView.dataSource = self
        self.collectionView.delegate = self
        self.collectionView.register(UINib.init(nibName: "CollectionViewCell", bundle: nil), forCellWithReuseIdentifier: "collectionViewID")
        
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 15
    }
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "collectionViewID", for: indexPath as IndexPath) as! CollectionViewCell
        
        
        return cell
    }
}
```

1. Thêm giao thức UICollectionViewDelegate và UICollectionViewDataSource ở phần mở rộng của lớp 
2. Kết nối collectionView’s data source và delegate = self trong awakeFromXib
3. Thêm hàm numberOfItemsInSection
4. Thêm hàm cellForItemAt
5. Tạo 1 cell với reuseIdentifier của bạn và ép kiểu về cell bạn tuỳ biến

Đến đây, nó sẽ crash. Chúng ta cần đăng kí file nib hoặc lớp cho định danh hoặc kết nối 1 thuộc tính cell trong storyboard.

# 4. Đăng ký Xib của bạn
ở phần awake của tableViewCell của bạn, thêm dòng này:

```
self.collectionView.register(UINib.init(nibName: “CollectionViewCell”, bundle: nil), forCellWithReuseIdentifier: “collectionViewID”)
```

Biên dịch và chaỵ, nó sẽ hoạt động. Tiếp đây là phần bổ sung code cho tableViewCell

```
class TableViewCell: UITableViewCell, UICollectionViewDelegate, UICollectionViewDataSource {
    @IBOutlet weak var collectionView: UICollectionView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        self.collectionView.dataSource = self
        self.collectionView.delegate = self
        self.collectionView.register(UINib.init(nibName: "CollectionViewCell", bundle: nil), forCellWithReuseIdentifier: "collectionViewID")
        
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 15
    }
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "collectionViewID", for: indexPath as IndexPath) as! CollectionViewCell
        
        
        return cell
    }
}
```

### Các sự cố có thể gặp
* Các định danh sai và kết nối nhầm ?
* Đã kéo thả collectionView vào File's Owner trong file Xib chưa ?

Hi vọng bài này sẽ giúp đỡ cho bạn.