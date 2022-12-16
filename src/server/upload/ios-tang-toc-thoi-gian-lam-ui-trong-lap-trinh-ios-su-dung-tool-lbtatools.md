# Giới thiệu
Chào các bạn, hẳn khi chúng ta làm việc, đôi lúc sẽ có sự nhàm chán cho các dòng code cứ lặp đi lặp lại. Lúc đó chúng ta nên tìm kiếm những ý tưởng mới với hi vọng học được những cách làm hay hơn, giúp cho công việc cảm thấy thú vị hơn, và đương nhiên khi đó chúng ta sẽ dev bay hơn :v: Và hôm nay tôi sẽ giới thiệu đến các bạn một công cụ giúp chúng ta thực hiện việc làm UI trong phát triển ứng dụng iOS nhanh hơn và thú vị hơn: đó là [LBTATools](https://github.com/bhlvoong/LBTATools) của tác giả ***Brian Voong*** với [chanel](https://www.youtube.com/channel/UCuP2vJ6kRutQBfRmdcI92mA) training về iOS rất nổi tiếng trên Youtube. Bây giờ chúng ta cùng nhau tìm hiểu xem công cụ này có gì hay ho nào.
# 1. Sử Stack vertically và horizontally
Chúng ta chắc hẳn vẫn thường quen sử dụng contraint hoặc frame để layout cho UI trên iOS, nhưng các bạn đừng quên từ iOS 9 Apple đã giới thiệu StackView, giúp cho việc thiết kế UI trở nên phẳng hơn.
Và trong công cụ  [LBTATools](https://github.com/bhlvoong/LBTATools) cũng sử dụng UIStackViews ngang và dọc để có thể bố cục các item trong UI.

Ví dụ 1:

![](https://images.viblo.asia/25310198-4961-4b74-8065-692e24e6c212.png)

```
        layer.borderWidth = 0.5

        let imageView = UIImageView(image: #imageLiteral(resourceName: "girl.png"), contentMode: .scaleAspectFill)
        let nameLabel = UILabel(text: "Girly McGirly", textAlignment: .center)
        
        imageView.layer.cornerRadius = 80 / 2
        
        stack(imageView.withSize(.init(width: 80, height: 80)),
              nameLabel,
              alignment: .center).padTop(8)
        
```

Ví dụ 2: 
![](https://images.viblo.asia/b8b70f72-5c48-449f-b81b-d812ca9ec8bb.png)

```
        let imageView = UIImageView(image: #imageLiteral(resourceName: "girl.png"), contentMode: .scaleAspectFill)
        let nameLabel = UILabel(text: "Girly McGirly", font: .boldSystemFont(ofSize: 14))
        let messageLabel = UILabel(text: "Did you enjoy last night? I had a great time. Let's meet up again later this week, I'll show you what's up", font: .systemFont(ofSize: 12), textColor: .gray, numberOfLines: 0)
    
        imageView.layer.cornerRadius = 60 / 2
        
        hstack(imageView.withSize(.init(width: 60, height: 60)),
               stack(nameLabel, messageLabel, spacing: 6),
               spacing: 16,
               alignment: .center).withMargins(.allSides(12))
        
        layer.borderWidth = 1
    }
```

Ví dụ 3: 
![](https://images.viblo.asia/79b9c5ca-50cf-40b8-be29-48a4afcfd91d.png)

```
        let imageView = UIImageView(image: #imageLiteral(resourceName: "girl.png"), contentMode: .scaleAspectFill)
        let nameLabel = UILabel(text: "Girly McGirly", font: .boldSystemFont(ofSize: 14))
        let messageLabel = UILabel(text: "Did you enjoy last night? I had a great time. Let's meet up again later this week, I'll show you what's up", font: .systemFont(ofSize: 12), textColor: .gray, numberOfLines: 2)
    
    let exploreLabel = UILabel(text: "Explore", font: .boldSystemFont(ofSize: 12))
    
    let arrowImageView = UIImageView(image: #imageLiteral(resourceName: "girl.png"))
        
        stack(imageView.withHeight(200),
              stack(nameLabel,
                    messageLabel,
                    UIView(),
                    hstack(exploreLabel, arrowImageView.withWidth(16).withHeight(16), UIView(), spacing: 8),
                    spacing: 8).withMargins(.allSides(14)))
        
        layer.borderWidth = 2
```

Qua 3 ví dụ trên, chúng ta thấy việc sử dụng stack và hstack để layout cho UI rất đơn giản, đoạn code nhìn sẽ không phức tạp và rắc rối khi các bạn sử dụng layout bằng contraint hay frame.

# Tạo UI Elements với 1 dòng code
Một vấn đề chính với việc tạo các thành phần UI là số lượng thuộc tính chúng ta có các đoạn code nhìn không được trực quan cho lắm, trở nên xấu xí:
Ví dụ:
```
let nameLabel: UILabel = {
    let label = UILabel()
    label.text = "Name"
    label.textColor = .black
    label.textAlignment = .center
    label.font = .boldSystemFont(ofSize: 16)
    label.numberOfLines = 2
    return label
}()
```

Tổng cộng, đây là 9 dòng code và rất khó chịu khi  khi tạo nhiều *label*, *button* phải không. Vì vậy, thay vào đó, hãy làm cho đơn giản và gọn gàng này bằng một dòng:
```
let nameLabel = UILabel(text: "Name", font: .boldSystemFont(ofSize: 16), textColor: .black, 
	textAlignment: .center, numberOfLines: 2)
```

hoặc với UIButton

```
let nextButton = UIButton(title: "Next", titleColor: .white, font: .boldSystemFont(ofSize: 18), 
	backgroundColor: .white, target: self, action: #selector(handleNext))
```

# Kết luận
Trên đây tôi đã giới thiệu đến các bạn một công cụ giúp chúng ta thực hiện layout UI một cách khác, khá thú vị phải không nào.
Khi chúng ta dev, có nhiều cách để thực hiện một tác vụ, nhưng đôi khi có những cách mà chúng ta cứ làm đi lặp lại khiến chúng ta sẽ chỉ làm việc như một cái máy. Vì vậy, đôi khi hãy nên thử tìm hiểu những phương án khác, đôi khi nó chỉ khiến cảm thấy ta vui nhưng sẽ đem lại cảm hứng làm việc tốt hơn. Cám ơn các bạn đã đọc bài viết

[Nguồn](https://github.com/bhlvoong/LBTATools)