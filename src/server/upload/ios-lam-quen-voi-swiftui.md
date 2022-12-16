# Giới thiệu
Trong sự kiện WWDC 2019 của Apple, họ đã giới thiệu đến chúng ta một cách mới để tạo giao diện người dùng trên bất kì nền tảng nào của Apple, họ nói ***Swift UI tạo các ứng dụng đẹp, năng động và nhanh hơn bao giờ hết***. Trong bài viết này, chúng ta cùng nhau tìm hiểu xem các ưu điểm của Swift là gì nhé!
# Các ưu điểm
## Khởi tạo layout chỉ một lần duy nhất
Khai báo nội dung và layout  cho bất kỳ trạng thái nào của *view*. SwiftUI biết khi nào trạng thái đó thay đổi và cập nhật ***view***  để phù hợp.!

```
List(landmarks) { landmark in
   HStack {
      Image(landmark.thumbnail)
      Text(landmark.name)
      Spacer()
      
      if landmark.isFavorite {
         Image(systemName: "star.fill")
            .foregroundColor(.yellow)
      }
   }
}
```

![](https://images.viblo.asia/a77da64d-89ee-4df0-835a-e38f035009ce.png)

## Xây dựng các thành phần tái sử dụng dễ dàng.
Kết hợp các view, control vào một giao diện phức tạp hơn, có thể chia sẻ đến bất kì giữa các app của hệ sinh thái Apple: iOS, Mac, AppleWatch, AppleTV.

```
struct FeatureCard: View {
   var landmark: Landmark
   
   var body: some View {
      landmark.featureImage
         .resizable()
         .aspectRatio(3/2, contentMode: .fit)
         .overlay(TextOverlay(landmark))
   }
}
```

![](https://images.viblo.asia/d2968a3b-24b9-45e2-a235-8881a7ced97e.png)

## Tạo animations dễ dàng hơn

Tạo animations mượt mà dễ dàng bằng cách gọi một hàm duy nhất. SwiftUI tự động tính toán và tạo hiệu ứng *transactions* khi cần.

```
VStack {
   Badge()
      .frame(width: 300, height: 300)
      .animation(.easeInOut())
   Text(name)
      .font(.title)
      .animation(.easeInOut())
}
```

![](https://images.viblo.asia/cb22aaa0-d01c-488e-86f5-8c61f9711adf.png)

## Xem trực tiếp được giao diện trên Xcode
Tôi nghĩ đây có lẽ đây sẽ là điều tuyệt với nhất, bạn sẽ không phải tốn thời gian cho việc preview UI của mình nữa. SwiftUI thiết kế, xây dựng và kiểm tra giao diện ứng dụng của bạn mà không cần chạy ứng dụng của bạn, bạn hoàn toàn có thể tương tác các control, flow ... trên Xcode, thật là vi diệu.

![](https://images.viblo.asia/57a4b815-a69c-46c5-9546-1f756105593a.png)

# Kết luận
Trên đây chúng ta cùng nhau liệt kê ra một số ưu điểm tuyệt vời nhất mà SwiftUI có thể đem lại, sẽ không còn là sớm để chúng ta bắt đầu học và làm với SwiftUI nữa, SwiftUI sẽ sớm xuất hiện trên dự án thật. 
Vậy còn chần chừ gì nữa mà không bắt đầu học SwiftUI đi thôi :)
Trong bài viết tiếp theo, tôi sẽ cùng với các bạn học cách build một ứng dụng sử dụng SwiftUI nhé! :v: 

[Nguồn](https://developer.apple.com/tutorials/SwiftUI)