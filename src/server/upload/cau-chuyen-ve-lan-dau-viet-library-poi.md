Vài ngày trước tôi đã viết thư viện iOS [Poi](https://github.com/HideakiTouhara/Poi)
Thư viện `Poi` khá giống với `Tinder` đó là thư viện sử dụng để thực hiện UI đơn giản về Swipe Card 
![](https://camo.qiitausercontent.com/5e1c4d003a4b8e9ff35e822291c4235b7144c4ff/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3135353435392f66613935323063612d333565392d353566382d303262662d6131316132313238656264312e706e67)

Hiện tại đang là sinh viên vừa học vừa làm thêm nên mong muốn của mình đó là không chỉ là phát triển App mà tương lai muốn phát triển cả OSS. Chính vì động cơ đó mà mình đã viết thư viện lần đầu tiên này.
Công sức ở đây mình tâm đắc đó là người dùng sẽ sử dụng Lib và thực thi như một `TableView` quen thuộc, dễ dàng với đa số Dev iOS nhỉ? 

## Cách cài đặt 
### Thủ công 
Một cách thủ công thì ta Clone thẳng thư viện về từ git 
```
git clone git@github.com:HideakiTouhara/Poi.git
```
Và Add trực tiếp vào như bên dưới này là OK 

![](https://camo.qiitausercontent.com/53ca29f7f6e0a03f5b33b735a5d6513a18d1f880/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3135353435392f35653165363430352d353638642d636664662d343062382d3430666564636139326562332e6a706567)

### Carthage, CocoaPods 
Thư viện đã support Carthage và CocoaPods. 
Nếu là CocoaPods thì ở podfile 
```
pod ‘Poi’
```

Nếu là Carthage thì ở Cartfile : 

```
github "HideakiTouhara/Poi"
```

## Cách sử dụng 
Ta tạo CustomView "PoiView" 
Sau đó add view vào Storyboard 
Ở code sẽ như sau 
```
let poiView = PoiView()
self.view.addSubView(poiView)
```
(chú ý là cần import `Poi`) 
Sau đó mình chuẩn bị `delegate` và `datasource` 

```
class ViewController: UIViewController, PoiViewDataSource, PoiViewDelegate {
```

```
poiView.dataSource = self
poiView.delegate = self
```

Ở đây chúng ta có cảm giác giống như `TableView` 

## Giới thiệu một số method có thể sử dụng được 
### Method `PoiViewDataSource`

```
func numberOfCards(_ poi: PoiView) -> Int
```
Để setting số lượng card  

```
func poi(_ poi: PoiView, viewForCardAt index: Int) -> UIView
```

Setting cho card được swipe. Giá trị trả về là UIView 

```
func poi(_ poi: PoiView, viewForCardOverlayFor direction: SwipeDirection) -> UIImageView? {
    switch direction {
    case .right:
        return UIImageView(image: #imageLiteral(resourceName: "good"))
    case .left:
        return UIImageView(image: #imageLiteral(resourceName: "bad"))
    }
}
```
Khi card được lật trái/phải ta có thể setting image overlay được. 

### Method PoiViewDelegate 

```
func poi(_ poi: PoiView, didSwipeCardAt: Int, in direction: SwipeDirection)
```
Là method được gọi sau khi đã swipe 

```
func poi(_ poi: PoiView, runOutOfCardAt: Int, in direction: SwipeDirection)
```
Cuối cùng đây là hàm xử lý sau khi đã thực hiện swipe 

### Một số method khác 

```
func swipeCurrentCard(to direction: SwipeDirection)
```
Khi muốn cưỡng bức swipe một card thì ta sử dụng hàm này, animation cũng được thực hiện ở đây. 

```
func undo()
```
là hàm quay lại 1 card ở trước đó 
ở đây animation quay lại cũng được thực hiện. 

Ở trên Github các bạn có thể tham khảo ở mục `Sample`!!!!
Và nếu có thể xin hay cho mình star nhé 
https://github.com/HideakiTouhara/Poi

Tham khảo [Qiita](https://qiita.com/HideakiTouhara/items/1b317d076067b61f11c9)