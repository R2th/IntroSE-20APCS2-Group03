- Một ứng dụng khác nhau có các tính năng và hệ thống khác nhau nên được tách biệt rõ ràng về mặt chức năng và phạm vi ảnh hưởng của chúng là điều là điều rất được quan tâm trong công việc phát triển phần mềm. Vì vậy có nhiều cấu trúc cũng như  kỹ thuật + nguyên tắc đã được ra mắt trong những năm qua giúp chúng ta có thể viết code dễ hơn  trong Swift và nhiều ngôn ngữ khác.

- Với bất kỳ loại cấu trúc nào chúng ta chọn để áp dụng trong  dự án cụ thể nào đó chúng ta cần đảm bảo rằng mỗi type có một bộ trách nhiệm rõ ràng và duy nhất . Điều này đặc biệt trở nên khó khăn khi dự án tiếp tục được phát triển cũng như thêm nhiều tính năng mới.

- Chúng ta hãy xem một vài  kỹ thuật có thể giúp chúng ta thực hiện điều đó bằng cách phân tách các type một khi trách nhiệm của chúng đã vượt ra ngoài phạm vi cho phép.

## 1/  States and scopes:
- Một source code trở nên phức tạp khi một type duy nhất cần xử lý có nhiều ảnh hưởng`scope` cũng như nhiều trạng thái`state` khác nhau. Ví dụ,  chúng ta làm việc trên`networking layer`  của ứng dụng và chúng tai đã triển khai toàn bộ `class` đó trong một `class` duy nhất  là `NetworkController`:

```swift
class NetworkController {
    typealias Handler = (Result<Data, NetworkError>) -> Void

    var accessToken: AccessToken?
    
    ...

    func request(_ endpoint: Endpoint,
                 then handler: @escaping Handler) {
        var request = URLRequest(url: endpoint.url)

        if let token = accessToken {
            request.addValue("Bearer \(token)",
                forHTTPHeaderField: "Authorization"
            )
        }

        // Perform the request
        ...
    }
}
```

- Mặc dù việc triển khai toàn bộ 1 tính năng hoặc hệ thống trong một `class` không là điều xấu, nhưng trong trường hợp này chúng ta có 1 `source code` khó hiểu. Vì chúng ta sử dụng cùng một API để yêu cầu cả `endpoint` đầu và cuối công khai  cũng như những  thời điểm yêu cầu xác thực.

- Sẽ dễ dàng hơn nếu chúng ta có thể sử dụng hệ thống type Swift để ngăn chặn mọi `endpoint` yêu cầu xác thực được gọi mà không có mã thông báo truy cập hợp lệ. Bằng cách đó, chúng ta sẽ có thể xác thực mã mạng của mình kỹ lưỡng hơn nhiều vào `complie time`.

- Để thực hiện điều đó, hãy  di chuyển tất cả các code liên quan đến `authentication` và mã thông báo truy cập từ `NetworkContoder` và vào một khởi tạo mới của `class` đó, chúng tôi đặt tên là `AuthenticatedNetworkContoder`. Bộ `controller`  cho phép chúng ta thực hiện các `network call` dựa trên `endpoint`:

```swift
class AuthenticatedNetworkController {
    typealias Handler = (Result<Data, NetworkError>) -> Void

    private var tokens: NetworkTokens
    ...

    init(tokens: NetworkTokens, ...) {
        self.tokens = tokens
        ...
    }

    func request(_ endpoint: AuthenticatedEndpoint,
                 then handler: @escaping Handler) {
        refreshTokensIfNeeded { tokens in
            var request = URLRequest(url: endpoint.url)

            request.addValue("Bearer \(tokens.access)",
                forHTTPHeaderField: "Authorization"
            )
            
            // Perform the request
            ...
        }
    }
}
```

- Chúng ta cũng đã cung cấp cho `network controller`  loại `end point` chuyên dụng của riêng mình `AuthenticatedEndpoint`. Điều đó cũng chỉ rõ ràng các định nghĩa `endpoint` của chúng ta, do đó1  `endpoint` yêu cầu xác thực đã vô tình được chuyển đến `NetworkContoder` trước đó của chúng ta.

- Vì `type` đó không còn phải xử lý bất kỳ yêu cầu xác thực nào nên chúng ta có thể đơn giản hóa rất nhiều và đổi tên nó (và loại `end point` của nó)  mô tả tốt hơn vai trò mới của nó trong`network layer` của chúng ta :

```swift
class NonAuthenticatedNetworkController {
    typealias Handler = (Result<Data, NetworkError>) -> Void
    
    ...

    func request(_ endpoint: NonAuthenticatedEndpoint,
                 then handler: @escaping Handler) {
        var request = URLRequest(url: endpoint.url)
        ...
    }
}```

- Chúng ta cần một kiến trúc và độ rõ ràng của API thì cũng phải chấp nhận một số lượng code bị trùng lặp. Trong trường hợp này cả 2 `network controller` của chúng ta cần tạo các phiên bản `URLRequest` và thực hiện chúng, cũng như xử lý các tác vụ như lưu trữ và các hoạt động liên quan đến mạng khác. 

```swift
typealias NetworkResultHandler<T> = (Result<T, NetworkError>) -> Void
```

- Chúng ta có thể bắt đầu chuyển phần  triển khai `network` cơ bản ra khỏi `controller` và thành các `type` nhỏ hơn, chuyên dụng hơn . Ví dụ: chúng ta có thể tạo một loại `NetworkRequestPerformer` riêng mà cả 2 `controller` của chúng ta có thể sử dụng để thực hiện các yêu cầu của `controller`  trong khi vẫn giữ các `API` cấp cao nhất hoàn toàn tách biệt và an toàn về `type`:

```swift
private struct NetworkRequestPerformer {
    var url: URL
    var accessToken: AccessToken?
    var cache: Cache<URL, Data>

    func perform(then handler: @escaping NetworkResultHandler<Data>) {
        if let data = cache.data(forKey: url) {
            return handler(.success(data))
        }
                        
        var request = URLRequest(url: url)

        // This if-statement is no longer a problem, since it's now
        // hidden behind a type-safe abstraction that prevents
        // accidential misuse.
        if let token = accessToken {
            request.addValue("Bearer \(token)",
                forHTTPHeaderField: "Authorization"
            )
        }
        
        ...
    }
}
```

-Bây giờ đây chúng ta có thể cho phép cả hai `network controller` của mình chỉ tập trung vào việc cung cấp `API` an toàn loại để thực hiện các yêu cầu  trong khi các triển khai cơ bản của chúng đang được giữ đồng bộ thông qua các loại tiện ích:

```swift
class AuthenticatedNetworkController {
    ...

    func request(
        _ endpoint: AuthenticatedEndpoint,
        then handler: @escaping NetworkResultHandler<Data>
    ) {
        refreshTokensIfNeeded { [cache] tokens in
            let performer = NetworkRequestPerformer(
                url: endpoint.url,
                accessToken: tokens.access,
                cache: cache
            )

            performer.perform(then: handler)
        }
    }
}
```

## 2/ Loading versus managing objects:
- Tiếp theo, hãy  xem xét một loại tình huống khác có thể làm cho một số phần nhất định của`source code` phức tạp hơn mức cần thiết, khi cùng loại chịu trách nhiệm cho cả việc `loading` và `managing` 1 `object` nhất định. Một ví dụ rất phổ biến đó là khi mọi thứ liên quan đến `session` của người dùng đã được triển khai trong một `type` duy nhất - chẳng hạn như `UserManager`.

- Ví dụ: ở đây một `type` như vậy chịu trách nhiệm cho cả người dùng đăng nhập vào và thoát khỏi ứng dụng , giữ cho`User`  hiện đang đăng nhập đồng bộ hóa với máy chủ của chúng ta:

```swift
class UserManager {
    private(set) var user: User?
    
    ...

    func logIn(
        with credentials: LoginCredentials,
        then handler: @escaping NetworkResultHandler<User>
    ) {
        ...
    }

    func sync(then handler: @escaping NetworkResultHandler<User>) {
        ...
    }

    func logOut(then handler: @escaping NetworkResultHandler<Void>) {
        ...
    }
}
```
- Điều đầu tiên chúng ta sẽ làm là trích xuất tất cả các `code` liên quan đến việc tải các phiên bản`USer` từ `UserManager` và vào một `type` mới  riêng biệt. Chúng ta sẽ gọi nó là `UserLoader` và sử dụng `AuthenticatedNetworkControll` của chúng ta từ trước để yêu cầu `endpoint` của `user`:

```swift
struct UserLoader {
    var networkController: AuthenticatedNetworkController

    func loadUser(
        withID id: User.ID,
        then handler: @escaping NetworkResultHandler<User>
    ) {
        networkController.request(.user(withID: id)) { result in
            // Decode the network result into a User instance,
            // then call the passed handler with the end result.
            ...
        }
    }
}
```

- Bằng cách phân tách `UserManager` của chúng ta thành các khối nhỏ hơn chúng ta có thể cho phép nhiều chức năng của chúng ta được triển khai dưới dạng cấu trúc không `state` vì các `type` đó sẽ đơn giản thực hiện các tác vụ thay cho các đối tượng khác (giống như `NetworkRequestPerformer` của chúng ta trước đó).

```swift
struct LoginPerformer {
    var networking: NonAuthenticatedNetworkController

    func login(
        using credentials: LoginCredentials,
        then handler: @escaping NetworkResultHandler<NetworkTokens>
    ) {
        // Send the passed credentials to our server's login
        // endpoint, and then call the passed completion handler
        // with the tokens that were returned.
        ...
    }
}
```

- Ưu điểm của đoạn code trên là giờ đây chúng ta có thể sử dụng 1 trong 2 `type` mới của mình bất cứ khi nào chúng ta cần thực hiện nhiệm vụ cụ thể của `type` đó thay vì luôn phải sử dụng cùng một loại `UserManager` bất kể chúng ta đăng nhập, đăng xuất hay đơn giản cập nhật `User` hiện tại.

```swift
class UserManager {
    private(set) var user: User
    private let loader: UserLoader

    init(user: User, loader: UserLoader) {
        self.user = user
        self.loader = loader
    }

    func sync(then handler: @escaping NetworkResultHandler<User>) {
        loader.loadUser(withID: user.id) { [weak self] result in
            if let user = try? result.get() {
                self?.user = user
            }

            handler(result)
        }
    }
}
```

- Công cụ tái cấu trúc ở trên không chỉ cho phép chúng ta loại bỏ 1 tùy chọn không cần thiết  mà còn cho phép chúng tai loại bỏ rất nhiều câu lệnh không rõ ràng nếu và bảo vệ khỏi bất kỳ code nào phụ thuộc vào `User` đang đăng nhập  cung cấp cho chúng ta mức độ linh hoạt cao hơn vì giờ đây chúng ta có thể chọn mức độ trừu tượng liên quan đến `User` mà chúng ta muốn làm việc trong mỗi tính năng mới mà chúng ta sẽ xây dựng.