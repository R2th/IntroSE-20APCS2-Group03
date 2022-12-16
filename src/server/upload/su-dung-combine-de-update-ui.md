Combine framework là gì? Theo như những gì mình đọc được thì framework mới này nó tương tự với RxSwift. Combine cho phép chúng ta khai báo các reactive function bằng cách sử dụng sẵn các Swift API đã được định nghĩa sẵn. Ví dụ như, chúng ta khai báo một property có tên là X, khi value của  X thay đổi thì giao diện của chúng ta cũng sẽ được tự động update.
Như trong Rxswift thì  chắc hẳn chúng ta đều quen đến 2 khái niệm đó là Obserables và Observers. Thì ở trong Combine framework cũng có 2 thằng tương tự như vậy đó là:
Publishers  <=> Observables 
Subcribers <=> Observers

###  Hãy cùng nhau tìm hiểu qua ví dụ:
Ở trong bài viết này, mình sẽ sử dụng SwiftUI và Combine framework để thực hiện  1 ví dụ như sau: Request api, và hiển thị lên List
Đầu tiên, mình cần chuẩn bị 1 url, sau khi tìm trên mạng thì mình có kiếm đc 1 api như sau:
```
http://api.icndb.com/jokes/random/
```
Trong example này mình sẽ sử dụng alamofire để request api. Sau khi đã dựng xong network thì mình sẽ tiến hành dựng UI
UI này của mình đơn giản là chỉ có 1 cái List để hiển thị data như sau: 
![](https://images.viblo.asia/59e4afa2-b6ee-416c-b9a0-d9a6b8055876.png)
Dưới đây là đoạn code mình dựng UI, đây là trong file ContentView.swift:
```
NavigationView{
                List(self.jokesObs.jokes) { i in
                    HStack {
                        Text(i.joke ?? "")
                    }
                }.navigationBarItems(
                trailing: Button(action: {
                    self.jokesObs.getJokes(count: 10)
                }, label: {
                    Text("Fetch")
                }))
                .navigationBarTitle("SwiftUI Alamofire")
            }
```
Ở đây, mình sử dụng Codable để bind data, nên mình chuẩn bị 2 thằng object như sau:
```

struct JokesData: Codable {
    let type: String?
    let value: [Joke]
}

struct Joke: Codable, Identifiable {
    let id = UUID()
    let joke: String?
}
```
* **Identifiable** là một protocol được xây dựng sẵn nhằm giúp List có thể phân biệt được các row khác riêng biệt. Khi mà object conform với protocol này thì chúng ta phải khai báo 1 thuộc tính có tên là id. Và kiểu dữ liệu của thuộc tính id này phải là Hashable (Int, Double, String)
#### Xây dựng ObserverObject.
**ObservableObject** là môt  protocol mới được cung cấp sẵn. Theo như tài liệu của apple viết thì một ObservableObject sẽ emit value changed trước khi bất kỳ @Published properties nào đc thay đổi dữ liệu. 
**Published** là một generic structure dùng để khởi tạo một thuộc tính là publisher. 
Tiếp theo mình sẽ tạo ra một class nhằm xử lý response từ việc request api và xử lý dữ liệu:
```
import Foundation

class JokesObserver: ObservableObject {
    @Published var jokes: [Joke] = [Joke]()
    @Published var isShow = false
    
    
    func getJokes(count: Int = 10) {
        isShow = true
        NetworkingManager.request(NetworkRouter.jokes(count: count), out: JokesData.self) { (success, data, error) in
            if let _data = data {
                self.jokes = _data.value
            }
            self.isShow = false
        }
    }
}
```
-> Trong class trên, minhf để nó conform với ObservableObject protocol. Bên trong mình tạo ra 2 thuộc tính là jokes và isShow. Cả 2 thuộc tính này đếu được hiểu là Publisher thông qua từ khoá @Published. Hiểu nôm na rằng, khi dữ liệu request api thành công, dữ liệu được gán cho 2 thuộc tính trên, thì UI sẽ được update.

Tiếp theo, mình sẽ trở lại màn hình UI vừa tạo, tại file ContentView.swift, lúc này đầy đủ sẽ là:
```
import SwiftUI

struct ContentView: View {
    @ObservedObject var jokesObs = JokesObserver()
    
    var body: some View {
        BaseView(isShowing: self.jokesObs.isShow) {
            NavigationView{
                List(self.jokesObs.jokes) { i in
                    HStack {
                        Text(i.joke ?? "")
                    }
                }.navigationBarItems(
                trailing: Button(action: {
                    self.jokesObs.getJokes()
                }, label: {
                    Text("Fetch")
                }))
                .navigationBarTitle("SwiftUI Alamofire")
            }
        }
    }

}
```
--> Theo như giao diện ở trên thì, List sẽ subcribe data của Publisher là jokes mà mình vừa tạo ra trong class  JokesObserver. 
Sau khi request api thành công, lúc này dữ liệu sẽ tự động được update lên UI.
![](https://images.viblo.asia/3df011b9-60da-4dcc-9916-0b5441d451c8.png)
Cảm ơn các bạn đã đọc qua bài viết này
Link example github: https://github.com/dungkv-1044/Learning1/tree/master/Learning1