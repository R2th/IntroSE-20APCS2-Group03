Hôm nay mình xin chia sẻ về cách get Data API với Combine framework và SwiftUI.

### **Combine framework:**

Được giới thiệu từ tháng 6/2019. Comebine phục vụ cho việc xử lý sự kiện và dữ liệu bất đồng bộ.
Có 3 khái niệm về Combine:
- Publishers: phát sự kiện/dữ liệu đi.
- Subscribers: Nhận sự kiện/dữ liệu (cả error) từ Publishers, Subscribers thông dụng nhất là sink() và assign().
- Operators: gồm các phương thức biến đổi dữ liệu trước khi Publishers.

**Vào làm thử nha:**

Mình sẽ lấy danh sách posts từ api: https://jsonplaceholder.typicode.com/posts 

(Mình lấy api từ https://jsonplaceholder.typicode.com/)

**- Đầu tiên mình tạo 1 object PostModel:**
```
struct PostModel: Identifiable, Codable {
    let userId: Int
    let id: Int
    let title: String
    let body: String
}
```
**- Tạo 1 PostViewModel có kiểu là ObservableObject để lấy data từ api:**

```
import Combine

class PostViewModel: ObservableObject {
    @Published var posts = [PostModel]()
    var cancellables = Set<AnyCancellable>()
    
    init() {
        getPost()
    }
    
    func getPost() {
        guard let url = URL(string: "https://jsonplaceholder.typicode.com/posts") else { return }
        
        //1. create a publisher
        //2. subcribe the publisher on background thread
        //3. receive on main thread
        //4. tryMap (check the data)
        //5. decode data (decode data into PostModel with JSONDecoder())
        //6. replace error with nil data
        //7. sink (get and put items into app)
        //8. store (cancel subscription if needed)
        
        URLSession.shared.dataTaskPublisher(for: url) //1
            .subscribe(on: DispatchQueue.global(qos: .background)) //2
            .receive(on: DispatchQueue.main) //3
            .tryMap { (data, response) -> Data in //4
                guard let response = response as? HTTPURLResponse, response.statusCode == 200 else {
                    throw URLError(.badServerResponse)
                }
                return data
            }
            .decode(type: [PostModel].self, decoder: JSONDecoder()) //5
            .replaceError(with: []) //6
            .sink { (completion) in //7
                print("completion: \(completion)")
            } receiveValue: { [weak self] (returnPosts) in
                self?.posts = returnPosts
            }
            .store(in: &cancellables) //8
    }
}
```

- Cuối cùng là hiển thị data lên UI:
```
// MARK: View
struct Posts: View {
    @StateObject var viewModel = PostViewModel()
    
    var body: some View {
        List {
            ForEach (viewModel.posts) { post in
                Text(post.title)
                    .font(.subheadline)
                    .fontWeight(.bold)
                    .foregroundColor(.blue)
                Text(post.body)
                    .font(.subheadline)
                    .foregroundColor(.gray)
            }
        }
        .padding([.top, .bottom], 10)
    }
}

struct Posts_Previews: PreviewProvider {
    static var previews: some View {
        Posts()
    }
}
```

Ở đây mình có sử dụng các kiểu dữ liệu:

@ObservedObject : là 1 protocol dùng để quan sát sự thay đổi của các @Published properties.

@Published: là 1 property wrapper nằm trong một observable object, khi property có thay đổi thì sẽ trigger cho view update lại.

@StateObject: là 1 instances của observable object, được tạo trong một view cập nhật lại data trên view.

Trong `class PostViewModel: ObservableObject` có instance `@Published var posts = [PostModel]()` khi instance`posts` này nhận được data mới từ api thì sẽ phát trigger ra ngoài. 

Ở ngoài View có `@StateObject var viewModel = PostViewModel()` (nó giống như là thể hiện của `class PostViewModel: ObservableObject`) khi nó lắng nghe được sự thay đổi thì sẽ update lại data trên view.



Và đây là kết quả:
![](https://images.viblo.asia/a8e23f0c-4ad7-40f6-a4a9-f0dbd7d8f7b3.png)



Hy vọng bài viết này hữu ích! Cảm ơn các bạn!

Nguồn: https://www.youtube.com/watch?v=fdxFp5vU6MQ