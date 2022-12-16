Xin chào các bạn.

Trong [phần trước](https://viblo.asia/p/swift-4-cung-build-tableview-bang-code-OeVKBRdJKkW) mình đã giới thiệu cách autolayout một tableView bằng code, và ở phần này mình sẽ pass data từ API vào từng cell trong tableView đã tạo nhé.

Mình sử dụng free API này: https://jsonplaceholder.typicode.com/photos
Gồm có các trường:


albumId: 

id: 

title: 

url: 

thumbnailUrl: 


Và mình sẽ tạo Model tương ứng,
```swift
struct ImageModel: Decodable {
    var albumId: Int?
    var id: Int?
    var title: String?
    var url: String?
    var thumbnailUrl: String?
}
```


Sau đó tạo function fetchImage() tại ViewController để lấy data về.

```swift
func fetchImage(completion: @escaping ([ImageModel]) -> ()) {
        let urlSring = "https://jsonplaceholder.typicode.com/photos"
        guard let url = URL(string: urlSring) else { return }
        
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            let decoder = JSONDecoder()
            do {
                guard let data = data else { return }
                let dataArray = try decoder.decode([ImageModel].self, from: data)
                DispatchQueue.main.async {
                    completion(dataArray)
                }
            } catch {
                print(error)
            }
        }.resume()
}
```

Trong function trên mình có sử dụng closure completion và đưa data lấy được vào main thread để đổ ra view.

Các bạn tham khảo thêm closure tại [đây](https://viblo.asia/p/su-dung-closure-protocol-lam-code-gon-gang-de-hieu-hon-PaLkDYAavlX) nhé.

Vì mình truyền 1 array [ImageModel] vào tableView nên phải khai báo [ImageModel] trong tableView.
```swift
var images: [ImageModel]?
```

Và mỗi cell sẽ có một ImageModel nên mình cũng khai báo luôn trong CustomCell.
```swift
var img: ImageModel?
```

Sau đó sử dụng func fetchImage() tại viewDidLoad() trong ViewController và truyền toàn bộ data vào mainTableView.
```swift
fetchImage { (images) in
            self.mainTableView.images = images
            self.mainTableView.reloadData()
}
```

Khi này mainTableView sẽ có số row tương ứng với số item nhận được.
```swift
func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if let images = self.images {
            return images.count
        }
        return 0
}
```

Và mỗi cell sẽ tương ứng với 1 phần tử trong array có index tương ứng là indexPath.
```swift
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cellID", for: indexPath) as! CustomCell
        if let images = self.images {
            cell.img = images[indexPath.item]
        }
        return cell
}
```

Sau đó trong file CustomCell mình sẽ update layout.
Đầu tiên thử với title trước nhé.
Sau khi biến img nhận được dữ liệu hàm didSet sẽ thực thi.
cụ thể về didSet tại [đây](https://niviki.com/property-observers-didset-va-willset-trong-swift/).
```swift
var img: ImageModel? {
        didSet {
            cellLabel.text = img?.title
        }
    }
```

Kết quả
![](https://images.viblo.asia/fa7599a3-aede-4f05-bfb4-98e6db3bbab1.png)
Rât kinh. Và mình cần sửa 1 chút layout cho Label.
Đầu tiên trong ViewController mình để mainTableView Full màn hình bằng cách bỏ toàn bộ constant trong constraint
```swift
self.view.addSubview(mainTableView)
        mainTableView.leadingAnchor.constraint(equalTo: self.view.leadingAnchor).isActive = true
        mainTableView.trailingAnchor.constraint(equalTo: self.view.trailingAnchor).isActive = true
        mainTableView.topAnchor.constraint(equalTo: self.view.topAnchor).isActive = true
        mainTableView.bottomAnchor.constraint(equalTo: self.view.bottomAnchor).isActive = true
```
Tiếp theo trong file CustomCell mình bỏ backgroundColor của Label đi vì màu da cam thấy gớm =.=


Sau đó sửa lại constraint của label như sau.
Cạnh trái của label cách cạnh phải của image 5px.
Cạnh trên của label cách cạnh trên của cell contentView 5px.
Tương tự vậy cạnh phải và cạnh đáy của label cách cạnh phải và cạnh đáy của cell contentView 5px.
```swift
contentView.addSubview(cellLabel)
        cellLabel.leadingAnchor.constraint(equalTo: cellImage.trailingAnchor, constant: 5).isActive = true
        cellLabel.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -5).isActive = true
        cellLabel.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 5).isActive = true
        cellLabel.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -5).isActive = true
```

Kết quả

![](https://images.viblo.asia/2f69d871-ef3d-43f2-ad68-ee0497869b38.png)

Phần label vừa sửa có vẻ có học hơn rồi.

Tiếp theo mình sẽ đổ ảnh vào từng cell.


Image từ API trả về có dạng như sau.

url: "http://placehold.it/600/92c952",

thumbnailUrl: "http://placehold.it/150/92c952"

url: là link fullsize của image.

thumbnailUrl: là ảnh thumbnail. Mình sẽ đổ ảnh thumbnail vào từng cell trong tableView.


Trong file CustomCell
```js
var img: ImageModel? {
        didSet {
            guard let img = img else { return }
            guard let thumbnailString = img.thumbnailUrl else { return }
            
            cellLabel.text = img.title
            if let thumbnailUrl = URL(string: thumbnailString) {
                let data = try! Data(contentsOf: thumbnailUrl)
                cellImage.image = UIImage(data: data)
            }
        }
    }
```

Kết quả

![](https://images.viblo.asia/2b006c6d-875a-47a5-963c-d26e555f8749.png)

Hôm nay mình dừng ở đây nhé.
Bài tới mình sẽ khắc phục hiện tượng load lâu, cell bị chồng chéo nhé các bạn.

Source: https://gitlab.com/nguyentienhoang810/Viblo-TableView