## Môi trường phát triển:
- **Swift Language Version:** Swift 5
- **Xcode:** Version 10.3
- **Deployment Target:** 12.0

## Bước 1: Khởi tạo màn hình ViewController
Ta tạo màn hình ViewController như hình dưới đây:
![](https://images.viblo.asia/1c054ef7-b3bd-49a6-99a9-1f0a4b8f183a.png)

![](https://images.viblo.asia/c87ad06a-2720-4963-aea8-53d0a1056114.png)

Trong đó, ViewController gồm các thành phần sau:
- **CollectionView:** Thêm leading, trailing constraint với View's Safe Area và top, bottom constraint với superView.
- **CollectionViewCell:** với Identifier = "CollectionCell"
- **image1:** Thêm top, leading, trailing, bottom constraint với CollectionViewCell. ContentMode = ScaleToFill.


Ta set **backgroundImage** và **shadowImage** = UIImage() -> Tạo Transparent Navigation Bar

```
final class ViewController: UIViewController {
    @IBOutlet private weak var collectionView: UICollectionView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        config()
    }
    
    private func config() {
        // CollectionView's Settings
        collectionView.delegate = self
        collectionView.dataSource = self
        collectionView.contentInsetAdjustmentBehavior = .never
        
        // NavigationController's Settings
        title = "Navigation Bar"
        navigationController?.navigationBar.setBackgroundImage(UIImage(), for: .default)
        navigationController?.navigationBar.shadowImage = UIImage()
        navigationController?.navigationBar.titleTextAttributes =
            [NSAttributedString.Key.foregroundColor: UIColor (red: 1.0/255.0, green: 1.0/255.0, blue: 1.0/255.0, alpha: 0)]
    }
}
```
Ta thêm **statusBarView** vào extension **UIApplication** để gọi các properties của status bar.
```
extension UIApplication {
    var statusBarUIView: UIView? {
        if #available(iOS 13.0, *) {
            let tag = 38482
            let keyWindow = UIApplication.shared.windows.filter {$0.isKeyWindow}.first
            
            if let statusBar = keyWindow?.viewWithTag(tag) {
                return statusBar
            } else {
                guard let statusBarFrame = keyWindow?.windowScene?.statusBarManager?.statusBarFrame else { return nil }
                let statusBarView = UIView(frame: statusBarFrame)
                statusBarView.tag = tag
                keyWindow?.addSubview(statusBarView)
                return statusBarView
            }
        } else if responds(to: Selector(("statusBar"))) {
            return value(forKey: "statusBar") as? UIView
        } else {
            return nil
        }
    }
}
```

## Bước 2:  CollectionView Delegate and DataSource

```
extension ViewController: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 10
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "CollectionCell", for: indexPath) as UICollectionViewCell
        return cell
    }
}

extension ViewController: UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: collectionView.frame.size.width, height: 300)
    }
}
```

## Bước 3:  Tạo fade animation cho navigation bar
Ta set **tintColor**, **backgroundColor**, **titleColor** cho **NavigationBar** và **backgroundColor** cho **statusBarView**.
Giá trị alpha của **whiteColor** và **blackColor** thay đổi theo giá trị **offset**. 
Khi **offset** tăng dần đến 1, giá trị **alpha** = **offset** và **NavigationBar** từ từ hiện ra.
Khi **offset** > 1 (scroll down), ta set **offset** = 1 -> **alpha** = 1 và **NavigationBar** hiện ra 100%.
```
extension ViewController {
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        var offset = scrollView.contentOffset.y / 150
        if offset > 1 {
            offset = 1
        }
        
        let whiteColor = UIColor(red: 255.0/255.0, green: 255.0/255.0, blue: 255.0/255.0, alpha: offset)
        let blackColor = UIColor (red: 1.0/255.0, green: 1.0/255.0, blue: 1.0/255.0, alpha: offset)
        navigationController?.navigationBar.tintColor = blackColor
        navigationController?.navigationBar.backgroundColor = whiteColor
        UIApplication.shared.statusBarUIView?.backgroundColor = whiteColor
        navigationController?.navigationBar.titleTextAttributes =
            [NSAttributedString.Key.foregroundColor: blackColor]
    }
}
```

Và đây là kết quả: 
![](https://images.viblo.asia/9f2b7efe-014a-4467-8056-7654286d0010.gif)
## Tài liệu tham khảo:
https://www.youtube.com/watch?v=rNy6aQQYbuY

## Link github:
https://github.com/ndhuy96/SwiftTips/tree/navBarFadeAnimation