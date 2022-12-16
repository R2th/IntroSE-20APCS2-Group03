Đây là bài dịch từ trang [medium.com](https://medium.com), mời các bạn xem bài gốc tại đây: https://medium.com/@m.delgiudice/builder-pattern-in-swift-ce87b40de597

Nếu bạn đã từng phải đối mặt với một hàm khởi tạo có quá nhiều tham số hoặc đối tượng, việc tạo ra một đối tượng nào đó được quyết định bởi hàng tá các cài đặt, thì đã đến lúc bạn tìm hiểu về *Builder Pattern*

![](https://images.viblo.asia/df28deab-739d-426a-a288-1751f8c1249e.jpeg)

### Mở đầu
*Builder pattern* được thiết kế để cung cấp một giải pháp linh hoạt cho việc khởi tạo các đối tượng phức tạp trong lập trình hướng đối tượng.
Mục đích của *pattern* này là tách việc tạo ra một đối tượng khỏi đại diễn của nó.
*Pattern* này rất phổ biến trong Swift vì nó cho phép chúng ta xây dựng các đối tượng phức tạp theo từng bước một.
Bằng cách này, bản thân quá trình xây dựng có thể tạo ra các biểu diễn khác nhau của đối tượng.
Bạn nên áp dụng *Builder pattern* trong các trường hợp sau:
* Khi một hàm tạo có quá nhiều tham số
* Khi bạn cần tạo các view khác nhau của một đối tượng cụ thể
* Khi bạn cần khởi tạo một đối tượng phức tạp
### Vấn đề
Một tình huống phổ biến trong quá trình phát triển một ứng dụng iOS là khởi tạo View và sau đó đi đến thiết lập tất cả các giá trị của đối tượng mới vừa được tạo.
Ví dụ như thế này:
```
let view = MovieView()
view.titleLabel.text = movie.title
view.descriptionLabel.text = movie.description
view.coverImage.isHidden = false
view.coverImage.image = movie.coverImage
view.favouriteImage.isHidden = false
if movie.isFavourite {
    view.favouriteImage.image = UIImage(named: "favourite_true")
}else {
    view.favouriteImage.image = UIImage(named: "favourite_false")
}
```

Trong trường hợp này, nếu chúng ta muốn tạo một View tương tự, nhưng lần này không có thuộc tính coverImage, chúng ta sẽ phải làm như sau:
```
let view = MovieView()
view.titleLabel.text = movie.title
view.descriptionLabel.text = movie.description
view.favouriteImage.isHidden = false
if movie.isFavourite {
    view.favouriteImage.image = UIImage(named: "favourite_true")
}else {
    view.favouriteImage.image = UIImage(named: "favourite_false")
}
```

Như bạn có thể thấy gặp phải tình huống này không thú vị cho lắm, hãy xem cách chúng ta có thể cải thiện mã của mình như sau.

### Giải pháp
*Builder pattern* cho phép chúng ta làm cho mã ở trên sạch hơn và dễ đọc. Nó sử dụng một loạt các phương thức nối nhau để thiết lập đối tượng, sau đó gọi phương thức `build` để tạo đối tượng.
```
let view = MovieViewBuilder()
    .withTitle(movie.title)
    .withDescription(movie.description)
    .withCoverImage(movie.coverImage)
    .withFavouriteIcon(movie.isFavourite)
    .build()

let view = MovieViewBuilder()
    .withTitle(movie.title)
    .withDescription(movie.description)
    .withFavouriteIcon(movie.isFavourite)
    .build()
```

Bằng cách tạo lại các View giống nhau áp dụng *builder pattern*, mã của chúng ta thay đổi hoàn toàn.

#### Tạo trình xây dựng
Một cách tiếp cận đơn giản là trả về chính trình xây dựng từ mỗi lần gọi phương thức, để dễ dàng ghép các phương thức cấu hình.
```
class MovieViewBuilder {
    private let view = MovieView()
    
    public func withTitle(_ title: String) -> MovieViewBuilder{
        view.titleLabel.text = title
        return self
    }
    
    public func withDescription(_ description: String) -> MovieViewBuilder{
        view.descriptionLabel.text = description
        return self
    }
    
    public func withCoverImage(_ image: UIImage) -> MovieViewBuilder{
        //by default the coverImage is hidden
        view.coverImage.isHidden = false
        view.coverImage.image = image
        return self
    }
    
    public func withFavouriteIcon(_ isFavourite: Bool) -> MovieViewBuilder {
        //by default the favouriteImage is hidden
        view.favouriteImage.isHidden = false
        if isFavourite {
            view.favouriteImage.image = UIImage(named: "favourite_true")
        }else {
            view.favouriteImage.image = UIImage(named: "favourite_false")
        }
        return self
    }
    
    public func build () -> MovieView{
        return self.view
    }
}
```

### Ưu điểm & Nhược điểm
Nhược điểm thực sự duy nhất của phương pháp này là chúng ta phải xác định một lớp xây dựng cho mỗi lớp cần nó, điều này sẽ có thể làm tăng thời gian phát triển.

Theo ý kiến của tôi, thời gian đầu tư vào việc chuẩn bị trình xây dựng sẽ luôn có lợi sau này, giúp tăng tốc độ hiểu mã và giúp bảo trì mã dễ dàng hơn.