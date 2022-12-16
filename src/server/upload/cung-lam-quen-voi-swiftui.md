Xin chào mọi người, chắc hẳn sau sự kiện gần đây của Apple các bạn đều rất hứng thú với SwiftUI và Combine. Đây là 2 framework mới mà được Apple khoe với đại ý rằng "Code ít hơn, hiệu năng cao hơn".
Trong bài viết này chúng ta sẽ cùng làm quen với VStack, HStack, ZStack, List, NavigationView. 
### VStack
VStack là một view mà các view con bên trong nó sẽ được sắp xếp theo chiều dọc. VStack này tương tự với thằng Vertical Stack View trước đây.
Ví dụ mình muốn tạo UI với một Image ở trên, ngay bên dưới của Image sẽ là title. Trong phần body, mình chỉ cần tạo ra một VStack như dưới đây.
```
var body: some View {
        VStack {
            Image("Intro1") //Image name
            Text("Moon") // Trong SWiftUI thì UILabel đã bị đổi thành Text
        }
    }
```
Kết quả: 
![](https://images.viblo.asia/20dc7c9f-f172-4337-8652-426106798b32.png)
### HStack
Cũng tương tự vơi Vstack, thay vì sắp xếp các view con theo chiều dọc thì HStack sắp xếp các view con theo chiều ngang. HStack tương tự với thằng Horizontal Stack View.
Như ví dụ ở trên, thay vì mình sử dụng VStack, giờ mình sẽ thay bằng HStack, và sửa lại 1 chút cho ảnh nhỏ lại.
```
HStack {
            Image("Intro1").resizable().frame(width: 200, height: 200).clipShape(Circle())
                .overlay(Circle().stroke(Color.green, lineWidth: 2)).shadow(radius: 1) //Image name
            Text("Moon").font(.title) // Trong SWiftUI thì UILabel đã bị đổi thành Text
        }
```
Kết quả:
![](https://images.viblo.asia/3824126e-1936-480f-90d0-74559780acce.png)
=> Như ở trong ảnh trên, mình thấy SwiftUI rất tiện, nó cung cấp sẵn cho chúng ta một số thuộc tính rất hữu ích. Ví dụ với Image ở trên, chúng ta có thể dễ dàng clip, set border, show radius.

### ZStack
ZStack là một view mà nó sẽ sắp xếp các view con đè lên nhau. Trong ZStack, view con nào được tạo cuối cùng thì sẽ được đưa lên trên cùng.
Giờ hãy cùng sửa HStack ở ví dụ trên thành ZStack. Mình sẽ thêm **.color(Color.red)** cho Text.
```
ZStack(alignment: .center) { //chúng ta có thể set alignment cho ZStack, mặc định là center
            Image("Intro1").resizable().frame(width: 200, height: 200).clipShape(Circle())
                .overlay(Circle().stroke(Color.green, lineWidth: 2)).shadow(radius: 1) //Image name
            Text("Moon").font(.title).color(Color.red) // Trong SWiftUI thì UILabel đã bị đổi thành Text
        }
```
Kết quả:
![](https://images.viblo.asia/a2cd044a-452f-4e25-a1d0-00301aaf53af.png)

### List
Trong SwiftUI chúng ta sẽ làm việc với List thay vì TableView như trước đây. 
> A container that presents rows of data arranged in a single column

Như trước đây, để làm việc với TableView, chúng ta cần phải tạo ra cell, set reuseidentifier, register nib. Nhưng với SwiftUI, chúng ta chỉ cần tạo ra một view cho cell đó.
Ví dụ dưới đây mình sẽ tạo ra 1 list thời tiết của vài thành phố.
##### Tạo object
```

import SwiftUI

struct Weather: Identifiable {
    var id = UUID()
    var image: String
    var temp: Int
    var city: String
}

```
##### Tạo Cell
```
import SwiftUI

struct WeatherCell : View {
    var weather: Weather
 
    var body: some View {
        HStack { Image(weather.image).resizable().frame(width: 50, height: 50, alignment: .leading).clipShape(Circle())
            .overlay(Circle().stroke(Color.green, lineWidth: 2)).shadow(radius: 1)
            VStack(alignment: .leading) {
                Text(weather.city).font(.subheadline)
                Text("\(weather.temp) ºC").font(.subheadline)
                
            }
        }
    }
}
```
##### Tạo List với Cell vừa tạo
```
import SwiftUI

struct ContentView : View {
    
    let data: [Weather] = [
        Weather(image: "Intro1", temp: 28, city: "HN - TP Ha Noi"),
        Weather(image: "Intro2",   temp: 29, city: "SG - TP  Sai Gon"),
        Weather(image: "Intro3", temp: 30, city: "DN - TP Da Nang"),
        Weather(image: "Intro4", temp: 31, city: "PQ - Phu Quoc"),
        Weather(image: "Intro5", temp: 32, city: "HP - TP Hai Phong")
    ]
    
    var body: some View {
        List(data) { weather in
            WeatherCell(weather: weather)
        }
    }
}
```

Kết quả: 
![](https://images.viblo.asia/c17c4c07-c427-4b01-86ff-adf2e4add1e1.png)
### NavigationView
NavigationView cũng tương tự với NavigationBar trước đây. 
Ở ví dụ trên, giờ mình muốn thêm title cho màn hình này, đồng thời khi người dùng click vào một item thì sẽ được chuyển sang màn hình khác.
Đầu tiên, mình sẽ cần tạo ra một màn detail.
```
struct DetailView: View {
    var title: String
    var body: some View {
        VStack {
            Text(title).color(.red).font(.headline)
        }
    }
}
```

Tiếp theo, mình sẽ sửa lại một chút code, thêm vào NavigationView và NavigationButton để thực hiện việc chuyển màn hình.
```
var body: some View {
        NavigationView {
            List(data) { weather in
                NavigationButton(destination: DetailView(title: weather.city)) { //Action khi click vào cell sẽ điều hướng đến màn hình Detail dựa vào destination
                    WeatherCell(weather: weather)
                }
                }
                .navigationBarTitle(Text("Weather List")) // Set title cho màn hinh
        }
    }
```

### Kết thúc.
Mình nghĩ rằng đúng như apple nói **Code ít hơn** . Mình thấy việc sử dụng code như thế này khá tiện, live preview cũng khá ok. Tuy nhiên giờ còn khá nhiều lỗi trên bản beta dẫn đến bị treo xcode hoặc k thể preview được mượt mà. Đây chỉ là trên máy mình gặp phải ^^. 
Cảm ơn các bạn đã đọc bài viết.
Link github: https://github.com/dungkv-1044/SwiftUIList