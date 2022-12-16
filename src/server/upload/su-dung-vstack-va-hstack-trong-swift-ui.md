Chào các bạn thân mến ! Tôi lại có chút thời gian để ngồi viết lách một chút về Swift UI. Kể từ khi Apple giới thiệu về nó, tôi không ngừng cảm thấy hứng thú. Tôi cố gắng nghiên cứu từ những cái cơ bản nhất để cố gắng tiếp cận được với nó. Ở phần trước tôi đã giới thiệu sơ qua về Swift UI còn ở phần này chúng ta có thể gọi là pactice một chút. Tôi sẽ giới thiệu về VStack và HStack trong Swift UI.

**I. Giới thiệu**

Khi chúng ta code một màn hình nào đó dù khó hay dễ thì đều với mục đích là hiển thị giao diện cho người dùng trải nghiệm. Có thể là một view đơn giản và có thể là nhiều view cùng hiển thị tại một thời điểm. Cũng giống như chúng ta làm việc với storyboard để kéo thả nhiều vào views thì SwiftUI cũng biết cách làm việc như thế, chúng ta gọi đó là Stacks. 

**II. Khai quát**

Stacks - Tương tự với UIStackView trong UIKit thì Stacks trong SwiftUI cũng có 3 loại: 
- Ngang (HStack)
- Dọc (VStack)
- Depth-based (ZStack) 

Giờ thử code một chút với UI đơn giản nhé. Ở đây ta có một text view: 

`Text("SwiftUI")`

Nếu muốn thêm một Text View nữa ở dưới chúng ta nghĩ rằng chỉ cần viết thế này: 

```
var body: some View {
    Text("SwiftUI")
    Text("rocks")
}
```

Lưu ý một chút rằng chúng ta cần return một View để hiển thị nên chúng ta sẽ viết như sau để 2 Text View không bị chồng lên nhau: 

```
VStack {
    Text("SwiftUI")
    Text("rocks")
}
```

Bạn có thể nhìn thấy ngay ở Stacks đang được hiển thị giữa màn hình và các Text View được sắp xếp theo chiều dọc với khoảng cách giữa chúng chứ không bị chồng lên nhau.
Nếu muốn 2 Text trên hiển thị cạnh nhau theo chiều ngang thì chỉ cần đổi VStack bằng HStack : 

```
HStack {
    Text("SwiftUI")
    Text("rocks")
}
```

Vậy làm thế nào để tăng khoảng cách giữa các Text theo ý muốn các bạn chỉ code như sau : 

```
VStack(spacing: 50) {
    Text("SwiftUI")
    Text("rocks")
}
```

Mặc định các Stacks sẽ được hiển thị chính giữa màn hình. Nếu là HStack thì các items sẽ được căn chỉnh theo chiều dọc và ở giữa và VStack được căn chỉnh theo chiều ngang ở giữa. Nếu muốn điều chỉnh điều này theo ý muốn bạn sẽ viết thế này cho Stacks: 

```
VStack(alignment: .leading) {
    Text("SwiftUI")
    Text("rocks")
}
```

Để thêm khoảng cách mong muốn cho leading bạn vẫn dùng thuộc tính spacing và viết như sau: 

```
VStack(alignment: .leading, spacing: 20) {
    Text("SwiftUI")
    Text("rocks")
}
```

Tôi sẽ ví dụ cho các bạn một View phức tạp hơn một chút để các bạn có thể có cái nhìn tổng quan hơn 

```
struct TutorDetail: View {
    var body: some View {
        VStack {
            Image("Hai Ng")
                 .clipShape(Circle())
                .overlay(
                    Circle().stroke(Color.orange, lineWidth: 4)
                )
                .shadow(radius: 10)
            Text("Hai Ng")
                .font(.title)
            Text("Hai Ng of Sun-Asterisk")
                .font(.subheadline)
            Divider()
 
            Text("We will hello word")
                .font(.headline)
                .multilineTextAlignment(.center)
                .lineLimit(50)
        }.padding()
    }
}
```

**III. Kết luận**

Còn rất nhiều điều chúng ta phải tìm hiểu ở SwiftUI để thành thạo nó. Chúng ta sẽ cùng nhau tìm hiểu dần dần, đi đến đâu chắc đến đó để có nền tảng tốt cho SwiftUI. Hy vọng bài viết này sẽ giúp các bạn phần nào đó hình dùng được ra nhiệm vụ của Stacks trong SwiftUI. Bài viết tới tôi sẽ cố gắng truyền tải một chút nâng cao hơn để chúng ta cùng học hỏi và bàn luận. Chào các bạn !