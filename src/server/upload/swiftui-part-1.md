Nhiều bạn đã từng lập trình mobile cho ứng dụng android rồi chuyển qua lập trình ứng dụng IOS đều thấy rằng Xcode tạo UI quá dễ dàng và tiện lợi với khả năng kéo thả và contraint layout trên Xib hay Storyboard. 
Trong lúc các nhà phát triển Google còn đang loay hoay tìm cách để đuổi kịp Apple, thì mới đây Apple bất ngờ công bố một API mới sẽ có mặt trên Xcode 11 và Swift 5. Đó chính là SwiftUI

SwiftUI được Apple PR với slogan "Ứng dụng tốt hơn và ít code hơn".
Nghe có vẻ như một cuộc cách mạng mới trong phát triển ứng dụng IOS, vậy chúng ta hãy tìm hiểu xem SwiftUI có gì và liệu nó có thể thay thế hoàn toàn xib hay Storyboard trong tương lai không!

## Let's go !
Để tìm hiểu về swiftUI, mình sẽ tạo một project đặt tên là Fruity, một ứng dụng dậy cho bọn trẻ con chưa biết phân biệt các loại trái cây nhé  :v

## Step 1: 
Mở Xcode 11 lên và tạo một project như bình thương thôi, nhưng chú ý có 1 option mới ở đây chính là SwiftUI, bạn nhơ tick vào nó 

![](https://images.viblo.asia/37d04db8-20d2-4c05-80f5-67138336815d.png)

## Step 2 : 
Sau khi tạo xong bạn sẽ thấy project được khởi tạo. Có một chút lạ lẫm khi không còn file **main.storyboard**, điều này cũng dễ hiểu vì SwiftUI tạo ra để thay thế cho xib và storyboard. Tiếp theo quan sát chúng ta cũng thấy không còn file ViewController, thay vào đó là 2 file SceneDelegate và ContentView

![](https://images.viblo.asia/f16fe973-0e7d-41f8-9c42-e6659e7ef523.png)

Quan sát một chút trong code ta dễ thấy một số điểm :
- Không còn UIWindow được khai báo trong AppDelegate.swift, thay vào đó nó được chuyển vào class SceneDelegate.swift
- Trong class SceneDelegate.swift ta thấy class ContentView được khởi tạo và gắn vào rootView

Okay vậy là chúng ta đã hiểu cấu trúc mới của SwiftUI có chút thay đổi để quản lý UI

## Step 3 : 
Giờ chúng ta sẽ bắt tay vào xây dựng thử UI 

- Đầu tiên mình xây dựng lấy 1 class model để chưa data đã tên là Fruit.

```
import SwiftUI

struct Fruit: Identifiable {
    var id: String
    var name: String
    var image: String
    var description: String
    
    init(name: String, descripton: String) {
        self.id = name
        self.name = name
        self.image = name
        self.description = descripton
    }
}

```
ok, trái cây của mình thì bao gồm có tên, có ảnh và mô tả.
Tuy nhiên các bạn để ý class của mình kế thừa Identifiable, lý do tại sao bắt buộc phải kế thừa chút mình sẽ nói.

- Tiếp theo mở class ContentView.swift lên code thử chút nào 

```
struct ContentView : View {
    
    var fruits: [Fruit] = []
    
    init() {
        fruits = [
            Fruit(name: "Apple", descripton: "Apples is red"),
            Fruit(name: "Banana", descripton: "Bananas are yellow and long"),
            Fruit(name: "Cherry", descripton: "Cherry are red and grows in bunch"),
            Fruit(name: "Grape", descripton: "Grapes are purple and grow in bunches"),
            Fruit(name: "Mango", descripton: "Mangoes are yellow and oval"),
        ]
    }

    var body: some View {
        List(fruits) { fruit in
            Image(fruit.image) //1
            Text(fruit.name) //2
        }
    }
}

```

Run thử và đây là thành quả 

![](https://images.viblo.asia/33d9401b-6a31-4757-8209-ea58de579ec9.png)

Wow ! Chỉ vài dòng code là có thể implement được cả tableView mặc dù chưa được đẹp cho lắm :v

Thảo luận một chút về code phía trên, dễ thấy tableView được thay thế bằng List, các component được gói gọn trong block. Quay trở lại lý do mình nêu ở trên về  **fruit tại sao phải kế thừa Identifiable**, nguyên nhân là do List yêu cầu đối tượng đầu vào phải là kiểu **Identifiable**, nó cần định danh cho các đối tượng.

Nhìn xem các component của List bao gồm 1 Image và 1 Text, rất đơn giản. Có lẽ các bạn đang thắc mắc làm sao để sắp xếp các component này đúng không. Cái đó sẽ bàn tới sau, trước tiên chúng ta thấy trong code mình đặt Image phía trên và Text phía dưới, kết qủa là nó hiển thị từ trái sang phải, chắc các bạn cũng đoán được thứ tự mặc định của nó rồi.

Mình đang cảm thấy rất ấn tượng với SwiftUI từ cách đóng gói List vào một chỗ trông vừa gọn mà lại dễ quản lý, làm như thế này mọi thuộc tính của List từ data đến color,... đều có thể lưu trữ ở 1 model nào đó. Thêm vào nữa các đối tượng được định nghĩa bằng những cái tên cũng rất đơn giản và dễ nhớ Image, Text,...


Tiếp theo, chúng ta sẽ đi chỉnh sửa cell cho đẹp chút xem thế nào nhé.


```
   var body: some View {
        List(fruits) { fruit in
            Image(fruit.image) //1
                .resizable()
                .frame(width: 40, height: 40)
            VStack(alignment: .leading, spacing: 5) { //2
                Text(fruit.name).font(.headline) //3
                Text(fruit.description).font(.subheadline).color(.gray)
            }
        }
    }
```

(1) Đầu tiên mình resize cho image thành size 40-40
(2) SwiftUI cung cấp cho chúng ta 2 stack tương tự như trên xib đó là HStack và VStack giúp hiển thị view theo chiều dọc hoặc chiều ngang. Chỗ này mình dùng VStack để hiển thị với 2 tham số đầu vào : 
- alignment : để căn nội dung trong stack, mình đang để leading
- space : chính là khoảng cách giữa các component trong stack
(3) text ở đây mình chỉnh sửa bằng cách thêm font, SwiftUI đã định nghĩa cho chúng ta một số font chuẩn để hiển thị rồi nên dùng luôn cho tiện :v: 

Nào cùng xem kêt quả nhé :

![](https://images.viblo.asia/1e18d2ff-f32e-4312-8408-dda10692078d.png)


Cuối cùng mình muốn giới thiệu cho các ban thêm một chút nữa để xem khi tap vào cell nó sẽ present lên như thế nào

- Đầu tiên mình tạo view FruitDetail để hiển thị tên và hình ảnh của loại trái cây

```
struct FruitDetail: View {
    let fruit: Fruit
    
    var body: some View {
        return HStack {
            Image(fruit.image)
            Text(fruit.name)
        }
    }
}
```

Tiếp đó mình có sửa một chút code đó là tạo riêng ra hẳn một view gọi là FruitCell

```
struct FruitCell: View {
    let fruit: Fruit
    var body: some View {
        return HStack {
            Image(fruit.image)
                .resizable()
                .frame(width: 40, height: 40)
            VStack(alignment: .leading, spacing: 5) {
                Text(fruit.name).font(.headline)
                Text(fruit.description).font(.subheadline).color(.gray)
            }
        }
    }
}
```


Cuối cùng mình viết lại body của contentView như sau :

```
  var body: some View {
        List(fruits) { fruit in
            PresentationLink(destination: FruitDetail(fruit: fruit)) {
                FruitCell(fruit: fruit)
            }
        }
        
    }
```

Xong, cuối cùng ở đây swiftUI tạo ra một cái gói là PresentationLink để present ra màn fruitDetail, và bên trong nó là FruitCell. Trông thì có vẻ hơi ngược, theo logic dễ hiểu thì mình nghĩ nó nên FruitCell trước sau đó xử lý link bên trong nhưng không sao chắc là swift sẽ còn cải thiện nhiều chỗ :)

Xem kết quả nhé 

![](https://images.viblo.asia/07fecd77-a8dd-4e83-b9fe-0e62b83a4dd3.png)

Vậy đó chỉ vài dòng code mà làm được khá nhiều thứ, đến đây phải cùng công nhận rằng Apple có lẽ không ngoa khi nói rằng "Ứng dụng tốt hơn và ít code hơn", nó tốt hơn bởi vì sự sắp xếp code khiến mọi thứ dễ quản lý hơn và ít code hơn thì chúng ta đã thấy rất rõ rồi.

## Kết luận

Như vậy mình đã cùng các bạn xem qua một chút các tính năng của SwiftUI, vẫn còn nhiều thứ để khám phá, hẹn các bạn trong bài viết lần sau.

Thanks for watching ~