Xin chào mọi người mình là Khánh, trong bài viết này mình sẽ hướng dẫn mọi người cài đặt thư viện và sử dụng Nuke trong một project iOS :heart_eyes:.<br>
<br>**Giới thiệu**<br>
Khi lập trình một ứng dụng di động iOS, các lập trình viên phải luôn chú ý đến giới hạn bộ nhớ di động, nếu không thì ứng dụng sẽ bị crash hoặc giật lag khi memory usage lên đến vài GB. Lấy ví dụ một ứng dụng di động dùng để load ảnh với dung lượng lớn tầm vài chục MB và lên đến hàng 100 tấm... Việc loading số lượng lớn ảnh như thế này có lẽ sẽ đưa điện thoại chúng ta về thời đồ đá.:sweat_smile:<br>
Để giải quyết vấn đề trên thì ta có thể phải cắn răng mà viết hàng ngàn dòng code boilerplate kết hợp với OperationQueues. Nhưng tin vui là ta có thể sử dụng thư viện Nuke để xử lí đống lộn xộn này.<br>
<br>**Bắt đầu**<br>
Việc đầu tiên là mình kiếm một nguồn ảnh với kích cỡ lớn, ở đây mình sử dụng ảnh từ NASA cho kích thước lớn và bỏ đường dẫn vào thư mục NASAPhotos.plist. Tiếp theo, chúng ta thêm Nuke vào project bằng cocoapods:<br>
```
pod 'Nuke', '~> 7.0'
```
Chúng ta tạo một file UICollectionView tên PhotoGalleryViewController.swift và một file Cell tên PhotoCell.swift ( kéo thả một UIImageView trong file Cell này)
Thiết lập file class PhotoGalleryViewController với như sau:<br>
```
 var photoURLs: [URL] = []
  
  let cellSpacing: CGFloat = 1
  let columns: CGFloat = 3
  var cellSize: CGFloat = 0
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    navigationController?.navigationBar.topItem?.title = "NASA Photos"
    
    guard
      let plist = Bundle.main.url(forResource: "NASAPhotos", withExtension: "plist"),
      let contents = try? Data(contentsOf: plist),
      let plistSerialized = try? PropertyListSerialization.propertyList(from: contents, options: [], format: nil),
      let urlPaths = plistSerialized as? [String]
      else {
        return
    }
    
    photoURLs = urlPaths.compactMap { URL(string: $0) }
  }
```
Trong func cellForItemAt: <br>
```
    let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "PhotoCell", for: indexPath) as! PhotoCell
    
    if let imageData = try? Data(contentsOf: photoURLs[indexPath.row]),
      let image = UIImage(data: imageData) {
        cell.imageView.image = image
    } else {
      cell.imageView.image = nil
    }    
    return cell
```
Thiết lập kích thước Cell trong sizeForItemAt:<br>
```
    if let layout = collectionViewLayout as? UICollectionViewFlowLayout {
      let emptySpace = layout.sectionInset.left + layout.sectionInset.right + (columns * cellSpacing - 1)
      cellSize = (view.frame.size.width - emptySpace) / columns
      return CGSize(width: cellSize, height: cellSize)
    }    
    return CGSize()
```

Thử chạy ứng dụng và ta sẽ thấy độ giật lag kinh khủng như thế nào:<br>
![](https://images.viblo.asia/281af394-96bd-4a99-b1dc-c1ccb9baf9ce.gif)

Để giải quyết vấn đề giật lag khi scroll ta thay đoạn code trong func cellForItemAt với 2 dòng code dưới đây sử dụng Nuke:<br>
```
let url = photoURLs[indexPath.row]
Nuke.loadImage(with: url, into: cell.imageView)
```
2 dòng code trên dùng để lấy URL cho ảnh dựa trên indexPath và sử dụng Nuke để load ảnh từ URL vào trực tiếp ImageView của Cell.<br>
![](https://images.viblo.asia/37609b6d-62b8-4b5a-aa63-41df62b36266.gif)<br>
Giờ thì chúng ta thấy khi scroll app không còn giật lag như trước. Nhưng khi người dùng scroll quá nhanh thì chỉ thấy được những ô màu đen?? Đó là vì ảnh chưa được load lên, chắc tầm vài giây nữa là ô đen đó sẽ được thay bằng một tấm ảnh hoặc có lẽ không :)). Vậy làm sao để người dùng có thể biết là đang có ảnh được load lên?<br>
Nuke có một structure gọi là ImageLoadingOptions, cho phép chúng ta đặt một placeholder trong khi ảnh được load.<br>
Quay trở lại func collectionView(:cellForItemAt:), thay thế 2 dòng code cũ bằng:<br>
```
let url = photoURLs[indexPath.row]
let options = ImageLoadingOptions(
  placeholder: UIImage(named: "dark-moon"),
  transition: .fadeIn(duration: 0.5)
)
Nuke.loadImage(with: url, options: options, into: cell.imageView)
```
Kết quả là:<br>
![](https://images.viblo.asia/10298806-a9c6-49ce-af22-7de174dd03d6.gif)<br>
<br>**Vậy về bộ nhớ thì sao?**<br>
Để xem app tiêu hao bao nhiêu bộ nhớ của chiếc điện thoại chúng ta làm theo bước sau:<br>
1.  Ở xcode chọn Debug navigator trong Navigator panel.<br>
2.  Chọn Memory.<br>
3.  Chọn Profile in Instrucments.<br>
4.  Cuối cùng, chọn Restart.<br>
![](https://images.viblo.asia/130de7a6-8392-4a81-b7cf-d0c63e395f75.png)<br>
![](https://images.viblo.asia/2d1c83df-459d-48b9-9eb8-7f755baa9e38.png)<br>
![](https://images.viblo.asia/bdc26a79-ddc8-427c-b5a4-6f38f1adb3a3.png)<br>
Chú ý vào dòng VM: CG raster data, Lên tới gần 800 MB<br>
Dù tấm ảnh được tải về trông có vẻ nhỏ trên màn hình điện thoại, nhưng chúng vẫn là ảnh kích thước full-sized và được lưu hoàn toàn trong bộ nhớ, điều này không ổn tí nào và Nuke có thể giúp chúng ta việc này :D.<br>
Chúng ta đã truyền vào loadImage một URL, những phương thức này có tuỳ chọn là một ImageRequest. ImageRequest có thể định nghĩa được kích thước của ảnh và Nuke sẽ tự động điều chỉnh kích cỡ ảnh được tải về trước khi gán vào imageView.<br>
Trở lại với func collectionView(:cellForItemAt:), thay thế hàm Nuke.loadImage(_:_:_:)  với dòng code sau:<br>
```
let request = ImageRequest(
  url: url, 
  targetSize: CGSize(width: pixelSize, height: pixelSize), 
  contentMode: .aspectFill)
  Nuke.loadImage(with: request, options: options, into: cell.imageView)
```
Trong đoạn code trên, chúng ta tạo một ImageRequest cho image URL tương ứng, với kích cỡ mong muốn là pixelSize x pixelSize và Nude sẽ load ảnh dựa trên ImageRequest sử dụng options trước khi chúng ta gán nó vào imageView của Cell.<br>
Vậy pixelSize là gì?<br>
Nuke sẽ điều chỉnh kích cỡ của ảnh dựa trên pixel thay vì points. Trên đầu của class chúng ta định nghĩa pixelSize như sau:<br>
```
var pixelSize: CGFloat {
  get {
    return cellSize * UIScreen.main.scale
  }
}
```
Giờ hãy build and run app lại và mở memory profiler như cách chúng ta làm phía trên.<br>
![](https://images.viblo.asia/86e20a7f-6e3a-46d5-962a-0aeb779a8a9a.gif)<br>
Và cùng xem memory usage như thế nào nhé<br>
![](https://images.viblo.asia/59f1ae1f-9b7f-428e-91d0-3734cb03781a.png)<br>
Wow :heart_eyes: giảm đến ~100 lần.<br>
<br>**Kết luận**<br>
Trong bài viết này chúng ta đã thử tìm hiểu cơ bản về cài đặt, sự khác nhau khi sử dụng Nuke và không sử dụng. Cảm ơn mọi người đã đọc viết, lần đâu viết có nhiều sai sót mong mọi người thông cảm và đóng góp.:hugs:<br>
Bài viết mình tham khảo ở https://www.raywenderlich.com/9229-nuke-tutorial-for-ios-getting-started .