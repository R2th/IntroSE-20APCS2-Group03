Xin chào các bạn. Tiếp theo [phần trước](https://viblo.asia/p/swift-4-do-du-lieu-vao-tableview-tu-api-RQqKLv7Nl7z) mình đã đổ data từ API vào tableView.

Nhưng còn tồn tại những vấn đề như sau.

Lý thuyết là mỗi cell sẽ có một image. Nhưng các bạn nhìn hình bên dưới, mình cùng tìm nguyên nhân và cách chữa image của các cell bị đè lên nhau nhé.

![](https://images.viblo.asia/79327061-278f-4ec3-9800-bd54089268bd.png)

Nguyên nhân:

Đầu tiên mình cùng review lại layout của cell trong file CustomCell:

```js
//Hiện tại
func setup() {
        //imageSize: CGFloat = 30
        contentView.addSubview(cellImage)
        cellImage.centerYAnchor.constraint(equalTo: contentView.centerYAnchor).isActive = true
        cellImage.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 10).isActive = true
        cellImage.heightAnchor.constraint(equalToConstant: imageSize).isActive = true
        cellImage.widthAnchor.constraint(equalToConstant: imageSize).isActive = true
        
        contentView.addSubview(cellLabel)
        cellLabel.leadingAnchor.constraint(equalTo: cellImage.trailingAnchor, constant: 5).isActive = true
        cellLabel.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -5).isActive = true
        cellLabel.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 5).isActive = true
        cellLabel.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -5).isActive = true
    }
```
cellImage cố định height và width = 30.

Cạnh dưới (bottomAnchor) của cell (contentView là phần chứa view của cell) cách cạnh dưới của cellLabel là 5px. 

Trong trường hợp này cạnh dưới của cell sẽ căn theo cạnh dưới của cellLabel chứ không liên quan gì đến cellImage.

Vì vậy những cellLabel nào có 1 dòng thì chiều cao của cell sẽ bị co hẹp đến mức các cellImage bị chồng lên nhau như hình trên.
### Vấn đề cần giải quyết:
- Trường hợp cellLabel chỉ có 1 dòng => mong muốn chiều cao tối thiểu của cell bằng chiều cao của cellImage.
- cellLabel nhiều hơn 1 dòng => chiều cao của cell sẽ tự giãn (self-sizing).
### Băt đầu sửa
Mình thêm bottomConstraint cho cellImage như sau.
```js
//Hiện tại
func setup() {
        //imageSize: CGFloat = 30
        contentView.addSubview(cellImage)
        cellImage.centerYAnchor.constraint(equalTo: contentView.centerYAnchor).isActive = true
        cellImage.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 10).isActive = true
        cellImage.heightAnchor.constraint(equalToConstant: imageSize).isActive = true
        cellImage.widthAnchor.constraint(equalToConstant: imageSize).isActive = true
        cellImage.bottomAnchor.constraint(equalTo: contentView.bottomAnchor).isActive = true
        
        contentView.addSubview(cellLabel)
        cellLabel.leadingAnchor.constraint(equalTo: cellImage.trailingAnchor, constant: 5).isActive = true
        cellLabel.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -5).isActive = true
        cellLabel.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 5).isActive = true
        cellLabel.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -5).isActive = true
    }
```
KẾT QUẢ
![](https://images.viblo.asia/366fb8eb-1dd0-4ec1-888d-b26b330de0dc.png)
cellImage không bị chồng lên nhau nữa rồi nè. 

Nhưng lại gặp vấn đề nữa là text trong cellLabel không hiển thị hết (dull).
### Lại sửa tiếp
Các bạn để ý đoạn code này nhé.
```js
        cellImage.bottomAnchor.constraint(equalTo: contentView.bottomAnchor).isActive = true
        và
        cellLabel.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -5).isActive = true
```
Cạnh dưới của contentView được constraint với cả cạnh dưới của cellImage và cellLabel. 

Vì mình muốn chiều cao của cell giãn ra theo độ dài của cellLabel nên mình sẽ break cellImage.bottomAnchor.constraint bằng cách set độ ưu tiên của cellImage.bottomAnchor.constraint thấp hơn cellLabel.bottomAnchor.constraint như sau.
```js
    //Khai báo constraint
    var imageBottom = NSLayoutConstraint()
    
    func setup() {
        contentView.addSubview(cellImage)
        cellImage.centerYAnchor.constraint(equalTo: contentView.centerYAnchor).isActive = true
        cellImage.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 10).isActive = true
        cellImage.widthAnchor.constraint(equalToConstant: imageSize).isActive = true
        cellImage.heightAnchor.constraint(equalToConstant: imageSize).isActive = true
        
        //gán constraint khai báo bên trên cho cellImage.bottomAnchor
        imageBottom = cellImage.bottomAnchor.constraint(equalTo: contentView.bottomAnchor)
        //set độ ưu tiên (priority) thấp hơn 1000
        //Vì độ ưu tiên mặc định = 1000
        imageBottom.priority = UILayoutPriority(rawValue: 750)
        imageBottom.isActive = true
        
        contentView.addSubview(cellLabel)
        cellLabel.leadingAnchor.constraint(equalTo: cellImage.trailingAnchor, constant: 5).isActive = true
        cellLabel.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -5).isActive = true
        cellLabel.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 5).isActive = true
        cellLabel.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -5).isActive = true
    }
```

KẾT QUẢ

Mọi thứ đều như mong muốn. Image không bị chồng nhau như lúc đầu nữa :D
![](https://images.viblo.asia/a019b0c0-0189-45c6-b42a-6cb6b2517461.png)

Và đây chính là self-sizing trong UITableViewCell các bạn nhé.
### Sửa phần giật lag khi scroll.
- Tại sao: vì phải load data từ models cho cell. Trường hợp này là load ảnh từ URL.
- Lý thuyết về vòng đời của cell (Cell Lifecycle):
    - Table view sẽ request content cho cell để hiển thị thông qua tableView(_ :cellForItemAt:)
    - Table view yêu cầu hiển thị cell, lúc cell khi chuẩn bị hiển thị trên màn hình.
tableView(_:willDisplay:forRowAt:)
    - Table view remove cell khi Cell ra khỏi màn hình.
tableView(didEndDisplaying:forRowAt:) 

=> Như vậy có nghĩa là: Khi user croll liên tục thì cell sẽ phải load lại ảnh từ URL liên tục. Điều đó khiến trải nghiệm không tốt chút nào và rất tốn dung lượng nếu user sử dụng 3G/4G.

- GIẢI PHÁP: Cache lại những image đã load.
    - Tạo một biến Global instance của NSCache()
    - Load được cái gì cache lại cái đó luông. Key là url của thumbnailImage.
```js
//cached data sẽ được lưu lại dạng key: Value
var imageCache = NSCache<AnyObject, AnyObject>()
```
```js
//Trong CustomCell.swift
var img: ImageModel? {
        didSet {
            guard let img = img else { return }
            guard let thumbnailString = img.thumbnailUrl else { return }
            
            cellLabel.text = img.title
            if let thumbnailUrl = URL(string: thumbnailString) {
                
                //Nếu show lại image đã cache.
                if let image = imageCache[thumbnailString] {
                    self.cellImage.image = image
                } else {
                    //Nếu chưa cache thì cache thôi :D
                    let data = try! Data(contentsOf: thumbnailUrl)
                    let image = UIImage(data: data)
                    imageCache[thumbnailString] = image
                    self.cellImage.image = image
                }
            }
        }
    }
```

Các bạn chạy thử rồi scroll tới lui và cảm nhận thử xem nhé.

### Nhưng chưa kết thúc.
- Tại sao: Vì những image chưa được cache thì vẫn có hiện tượng giật và vẫn chưa kiểm soát được dung lượng cache. Về giải pháp cho phần này mình sẽ viết ở những bài tiếp theo :D


Cảm ơn các bạn đã theo dõi.