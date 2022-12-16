Chào các bạn.

[phần trước](https://viblo.asia/p/swift-4-fix-hien-tuong-cell-bi-chong-cheo-va-giup-tableview-muot-ma-hon-yMnKMJNNZ7P) mình giới thiệu sơ qua cách giúp tableview scroll mượt hơn bằng việc cache lại ảnh. Nhưng nó thực sự chưa tối ưu chút nào.

#### Tại sao:
- Vì tableview còn giật tưng bừng khi scroll.

#### Nguyên nhân:
- Vì mọi thứ (tasks) hiện tại đang được thực hiện ở main thread. Mà main thread chỉ nên thực hiện việc update UI.

Và để khắc phục vấn đề này, các bạn nên tham khảo loạt bài IOS Concurrency siêu chi tiết và dễ hiểu tại [đây](https://viblo.asia/u/tuananhsteven) nhé.


## Khắc phục.
### Phân tích
Fetch data từ API, sau đó truyền từng img link vào cell và thực hiện download img và hiển thị.


=> download img thread phải thread khác main thread.

=> download dựa vào index chuẩn bị được show và đang  trong tableView. 

=> Cần animation thể hiện quá trình download.
## Custom Operation
Các bạn tham khảo bài viết về operation tại [đây](https://viblo.asia/p/ios-concurrency-phan-4-operation-va-operationqueue-RQqKLxqrK7z) nhé.

Khi cell lấy được url của ảnh sẽ thực hiện download trên customOperation mình tạo như dưới. Sau khi download xong sẽ hiển thị thông qua main thread.

Mình tạo một file CustomOperation.swift trong file này chứa operation thực hiện việc download image. Và đưa operation tạo được vào queue. Đặt tên cho queue và set số lượng Concurrent Operation tối đa. Ở đây mình set bằng 1.

```js
import UIKit

class DownloadImage: Operation {
    
    var urlString: String?
    var image: UIImage?
    
    init(urlString: String) {
        self.urlString = urlString
    }
    
    override func main() {
        //Kiểm tra cancel trước khi bắt đầu. 
        if self.isCancelled {
            return
        }
        
        //5: download data bức hình.
        let imageData = NSData(contentsOf: URL(string: self.urlString!)!)
        
        //6: Kiểm tra cancel một lần nữa 
        if self.isCancelled {
            return
        }
        
        //7: Chúng ta kiểm tra thử dữ liệu có được down thành công không. 
        //Nếu có dữ liệu mình đổ vào image được tạo bên trên.
        if (imageData?.length)! > 0 {
            self.image = UIImage(data: imageData! as Data)
        } else {
            self.image = UIImage(named: "Close")
            downloadState = .failed
        }
    }
}

class ExcutingOperation {
    lazy var downloadQueue:OperationQueue = {
        var queue = OperationQueue()
        queue.name = "Download queue"
        queue.maxConcurrentOperationCount = 1
        return queue
    }()
}

```

#### Thực hiện

Trong file ViewController mình đã fetch data và đổ cả array data vào tableView. Từ tableView mình đưa từng phần tử cuả mảng vào cell dựa vào indexPath.

Trong file MainTableView.
```js
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cellID", for: indexPath) as! CustomCell
        
        //Mỗi một cell được gen ra sẽ có default Layout để tránh layout của reusable cell. 
        //Code cụ thể mình sẽ viết bên dưới.
        cell.defaultLayout() 
        
        cell.img = images![indexPath.item] //Truyền từng phần tử của mảng vào cell dựa vào indexPath
        
        //Update cell layout khi download xong image.
        //Code cụ thể mình sẽ viết bên dưới.
        cell.reloadData() 
        
        return cell
    }
```

Trong file CustomCell, mình thêm indicator để biết trạng thái đang download image.
```js
let indicator = UIActivityIndicatorView()

//Mỗi lần cell được gọi thì mặc định xuất hiện indicator.
func defaultLayout() {
        //Khi chưa download xong img mình sẽ để 1 ảnh mặc định trong cellImage.
        cellImage.image = UIImage(named: "default")
        contentView.addSubview(indicator)
        indicator.translatesAutoresizingMaskIntoConstraints = false
        indicator.backgroundColor = UIColor.black.withAlphaComponent(0.3)
        NSLayoutConstraint.activate([
            indicator.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),
            indicator.trailingAnchor.constraint(equalTo: contentView.trailingAnchor),
            indicator.topAnchor.constraint(equalTo: contentView.topAnchor),
            indicator.bottomAnchor.constraint(equalTo: contentView.bottomAnchor)
        ])
        indicator.startAnimating()
}


//Tạo 1 instance để thực thi operation download image
let excutingOperation = ExcutingOperation()

//Việc download image và hiển thị sẽ được thực hiện bởi function này.
func reloadData() {
        guard let img = img else { return }
        cellLabel.text = img.title
        
        guard let thumbnailString = img.thumbnailUrl else { return }
        
        //bắt đầu thực hiện operation download image data.
        let imageDownloadOperation = DownloadImage(urlString: thumbnailString)
        
        //add operation vào queue
        excutingOperation.downloadQueue.addOperation(imageDownloadOperation)
        
        //Sau khi download xong, completionBlock sẽ được gọi.
        //Khi này image sẽ được hiển thị bởi main thread.
        //và remove indicator.
        imageDownloadOperation.completionBlock = {
            DispatchQueue.main.async {
                self.cellImage.image = imageDownloadOperation.image
                self.indicator.stopAnimating()
                self.indicator.removeFromSuperview()
            }
        }
    }
```

Các bạn làm thử và cảm nhận nhé.
Tuy nhiên vẫn còn một vài vấn đề nữa cần giải quyết đó là cancel download tại những cell chưa down xong mà bị scroll khỏi màn hình. Kỹ thuật prefetch, cancel prefetch trong tableView.

Những index chưa được scroll tới sẽ không thực hiện download. Và những index đã down xong img sẽ thực hiện cache lại img, phòng trường hợp user scroll lại sẽ đỡ mắc công down lại.

Hoặc trường hợp cũng là fetch data về nhưng với một model khác.

Mình sẽ giới thiệu dần trong những bài tiếp theo nhé :D

https://gitlab.com/nguyentienhoang810/Viblo-TableView/tree/fix_overlapping_cell_and_make_table_smoother