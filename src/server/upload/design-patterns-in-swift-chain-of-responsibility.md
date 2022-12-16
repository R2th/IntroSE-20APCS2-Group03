Ở bài chia sẻ trước chúng ta đã tìm hiểu về Design Patterns: [State Pattern](https://viblo.asia/p/design-patterns-in-swift-state-pattern-gDVK2jkwKLj), ở bài chia sẻ này chúng ta cùng tìm hiểu về một pattern khá hay mà chúng ta ít nhận ra nó là **Chain of responsibility**.

<br>

#### Chain of Responsibility
<br>

**Định nghĩa:**

> Chain of Responsibility tách rời một bên gửi yêu cầu và một bên nhận và nó cung cấp cho nhiều hơn một đối tượng một cơ hội để xử lý yêu cầu.

<br>


Hãy nghĩ về pattern này như một chuỗi các đối tượng thực tế (về mặt kỹ thuật nó là một danh sách liên kết), nơi mọi đối tượng đều biết về người kế thừa của nó (nhưng không phải là predecessor). Vì vậy, mỗi đối tượng có một liên kết đến đối tượng tiếp theo trong chuỗi. Khi người gửi tạo yêu cầu, đối tượng đầu tiên trong chuỗi được gọi và nó có cơ hội xử lý yêu cầu. Nếu đối tượng đầu tiên trong chuỗi không thể xử lý yêu cầu, nó sẽ chuyển yêu cầu tới đối tượng tiếp theo. Và như vậy cho đến khi yêu cầu đạt đến cuối chuỗi.

<br>

#### Custom Cache

<br>

 Chúng ta sẽ tìm một bộ phim từ bộ controller của chúng ta và nếu bộ phim không được lưu trong bộ nhớ, chúng ta sẽ cố tải nó từ disk. Nếu nó không có trên disk, chúng ta sẽ tải nó từ API. Và nếu cuộc gọi API không thành công, chúng tôi sẽ quay lại API dự phòng. Nếu đó là một thất bại, well, tough cookie.
 
 Ở đây chúng ta có thể thấy chuỗi sự kiện như chúng được cho là xảy ra. Mô hình chúng:
 ![](https://images.viblo.asia/e3b8d6b5-9a53-4b91-9511-838b9a0500bc.png)
 
 Mỗi hình chữ nhật trên sơ đồ sẽ thực sự là một lớp sẽ có cơ hội xử lý yêu cầu. Ví dụ: nếu chúng tôi không thể tìm thấy movie trong bộ nhớ cache chính hoặc trong bộ đệm ẩn thứ cấp (secondary cache), chúng ta thực hiện cuộc gọi đến điểm cuối API. Cuộc gọi thành công và cung cấp kết quả sao lưu chuỗi. Bằng cách này, bộ nhớ đệm chính và thứ cấp sẽ có cơ hội lưu trữ đối tượng mới được tìm nạp nếu chúng chọn.
 
 <br>
 
#### The Code

<br>

 Tất cả các classes của chúng ta trong sơ đồ trên sẽ thực hiện cùng một giao thức(protocol). Dưới đây là ý tưởng chung về giao thức sẽ như thế nào:
 
 ![](https://images.viblo.asia/7faff9b5-64e7-4a7e-a43d-f823e84cc858.png)
 
 Giao thức thực tế sẽ hơi khác, nhưng ý tưởng là như nhau. Chúng ta sẽ có một con trỏ tới phần response tiếp theo trong chuỗi và chúng ta sẽ có một hàm để thực hiện.
 
 <br>
 
#### Protocols

Với mục đích của ví dụ này, chúng tôi sẽ sử dụng hai giao thức chính. Đầu tiên là dành cho trình xử lý:

```
protocol GetMovieHandler {
    init(nextHandler: GetMovieHandler?)
    func getMovie(_ movieID: Int, onCompleted: ((MovieItem?) -> ())?)
}
```

Tất cả các đối tượng trong chuỗi sẽ thực hiện điều này. Chúng ta cũng sẽ sử dụng ‘MovieItem’:

```
protocol MovieItem {
    var movieID: Int { get }
    var title: String { get }
    var synopsis: String { get}
    var year: Int { get }
}
```

Các giao thức khác trong dự án ví dụ ít quan trọng hơn. Hai cái này là cái chính.

<br>

#### Classes

<br>

Chúng ta sẽ bắt đầu tạo các lớp mà chúng ta sẽ sử dụng trong luồng chính. Hãy bắt đầu từ đầu. Cache chính sẽ tìm nạp các đối tượng từ bộ nhớ và nó có thể trông giống như sau:

```
class GetMovieFromCache: GetMovieHandler
{
    private let nextHandler: GetMovieHandler?
    
    required init(nextHandler: GetMovieHandler?) {
        self.nextHandler = nextHandler
    }
    
    func getMovie(_ movieID: Int, onCompleted: ((MovieItem?) -> ())?) {
        // You could use NSCache here or a Dictionary... What ever floats your boat.
        let success = Bool.random
        
        // Not all movies will be cached, so let's simulate some failures.
        if success {
            let movieItem = CachedMovieItem(movieID: movieID, title: "Very Fast Movie", synopsis: "You wanted a movie really fast... Well, you got it", year: 2018)
            onCompleted?(movieItem)
        } else {
            nextHandler?.getMovie(movieID) { item in
                if item != nil {
                    // Since we didn't have the movie cached in the first place, maybe we'll cache it if the next responder has it.
                }
                onCompleted?(item)
            }
        }
    }
    
    // For testing only
    private struct CachedMovieItem: MovieItem {
        var movieID: Int
        var title: String
        var synopsis: String
        var year: Int
    }
}
```

Những ví dụ này sẽ không bao gồm bất kỳ business logic nào. Điều đó sẽ cụ thể cho dự án của bạn. Chúng sẽ minh họa cách mô hình hoạt động trên một ví dụ thực. Trong Constructor , chúng ta đã lưu trình xử lý tiếp theo của mình. Khi chức năng ‘**getMovie**’ được gọi là chúng ta đang mô phỏng lỗi bộ nhớ cache. Nếu đối tượng không có trong bộ nhớ cache cục bộ, chúng ta chỉ cần gọi trình xử lý tiếp theo với cùng các tham số. Khi ‘**nextHandler**’ gọi kết thúc với kết quả, chúng ta sẽ kiểm tra xem chúng ta có một bộ phim mới và lưu nó vào bộ nhớ hay không. Bước cuối cùng, chúng tôi gọi là đóng cửa ‘**onCompleted**’ với mục phim.

<br>

Tất cả các lớp trong chuỗi sẽ theo pattern hình khá giống nhau. Kiểm tra xem đối tượng có sẵn không, nếu không, hãy gọi trình xử lý tiếp theo, nếu bạn lấy lại đối tượng từ nó, hãy lưu nó và truyền nó đi. Trình xử lý API hơi khác một chút, nó không lưu mục, nó chỉ truyền đi:

```
func getMovie(_ movieID: Int, onCompleted: ((MovieItem?) -> ())?) {
    // This should be a real API request
    let success = Bool.random
        
    // Simulate random API failures
    if success {
        let movieItem = APIMovieItem(movieID: movieID, title: "Real Movie", synopsis: "This is, without a doubt, a real movie", year: 1999)
        onCompleted?(movieItem)
    } else {
        nextHandler?.getMovie(movieID, onCompleted: onCompleted)
    }
}
```


Ngoại lệ duy nhất ở đây là triển khai lớp '**EndOfChain**', đây chỉ là triển khai sơ khai. Nếu yêu cầu của bạn đạt đến lớp này, bạn không cần phải làm gì ngoài việc in thông báo lỗi:

```
class EndOfChain: GetMovieHandler
{
    required init(nextHandler: GetMovieHandler?) {
        // Stub Implementation
    }
    
    func getMovie(_ movieID: Int, onCompleted: ((MovieItem?) -> ())?) {
        print("If you're reading this, it't the end of the road my friend :)")
        onCompleted?(nil)
    }
}
```

<br>

#### Building the Chain

<br>

Chúng ta phải xây dựng chuỗi tiếp theo. Và chúng ta sẽ bắt đầu từ cuối chuỗi. Nó thực sự khá đơn giản. Đây là class để xây dựng các chuỗi main và dummy:

```
class MovieChainBuilder
{
    static func mainChain() -> GetMovieHandler {
        let endOfChain = EndOfChain(nextHandler: nil)
        let secondaryEndpoint = GetMovieFromSecondaryEndpoint(nextHandler: endOfChain)
        let primaryEndpoint = GetMovieFromEndpoint(nextHandler: secondaryEndpoint)
        let secondaryCache = GetMovieFromDisk(nextHandler: primaryEndpoint)
        let primaryCache = GetMovieFromCache(nextHandler: secondaryCache)
        
        return primaryCache
    }
    
    static func dummyChain() -> GetMovieHandler {
        return DummyGetMovie(nextHandler: nil)
    }
}
```


Bạn có thể thấy một hàm ở đây trả về ‘**dummyChain**’. Chỉ ở đây để minh họa rằng bạn có thể tạo động nhiều loại chuỗi khác nhau. Bạn nên giữ tất cả các lớp giả trong mục tiêu thử nghiệm của bạn

<br>

#### Using the Chain

<br>

Trong ví dụ này, tôi cho rằng bạn sẽ có một controller thuộc loại nào đó sẽ sử dụng luồng chạy này. controller của bạn có lẽ sẽ có rất nhiều business logic trong đó. Bộ khung của nó có thể trông giống như thế này:

```
class MovieController: MovieControllable {
    // This is your main controller for the movie. You'll probably do some fancy business logic here.
    
    private let movieHandler: GetMovieHandler
    
    required init(movieHandler: GetMovieHandler) {
        self.movieHandler = movieHandler
    }
    
    func getMovie(_ movieID: Int, onCompleted: ((MovieItem?) -> ())?) {
        self.movieHandler.getMovie(movieID, onCompleted: onCompleted)
    }
}
```

Chúng ta chỉ chuyển kết quả đến đây cho người gọi để chúng ta có thể in chúng trong bảng điều khiển. Có thể bạn sẽ muốn làm điều gì đó với đối tượng phim của mình mà bạn đã quay lại từ trình xử lý. Lưu ý cách chúng ta có thể khởi tạo bộ điều khiển này với nhiều chuỗi khác nhau và nó sẽ hoạt động. Từ quan điểm của controller, nó hoạt động với một đối tượng duy nhất. Trên thực tế, nó hoạt động với năm vật thể khác nhau. Bộ điều khiển là không rõ ràng, như nó phải được.

<br>

#### Test Ride
 
<br>

Trong ‘**AppDelegate**’, chúng tôiôi sẽ có một phương pháp rất lạ mắt để thử nghiệm điều này:

```
private func testMoviesController() {
    let movieController = MovieController(movieHandler: MovieChainBuilder.mainChain())
        
    for i in 0...10000 {
        movieController.getMovie(i) { (item) in
            print("movie item: \(item?.title)")
        }
    }
}
```

Chúng tôi xây dựng bộ điều khiển với chuỗi chính và chỉ cần thử và nhận các bộ phim 10k. Nếu chúng ta nhìn vào đầu ra của bàn điều khiển, chúng ta sẽ thấy chuỗi hoạt động như thế nào:

```
movie item: Optional("Cached Movie")
movie item: Optional("Real Movie")
movie item: Optional("Cached Movie")
movie item: Optional("Very Fast Movie")
movie item: Optional("Very Fast Movie")
movie item: Optional("Very Fast Movie")
movie item: Optional("Very Fast Movie")
movie item: Optional("Cached Movie")
If you're reading this, it't the end of the road my friend :)
movie item: nil
movie item: Optional("Very Fast Movie")
movie item: Optional("Cached Movie")
```

Đôi khi chúng tôi nhận được một bộ phim từ bộ nhớ cache chính, đôi khi từ API. Và một số cuộc gọi thậm chí được quản lý để đạt được kết thúc của chuỗi.


<br>

#### Conclusion

**Chain of responsibility** là một pattern tuyệt vời khi bạn cần cung cấp cho nhiều đối tượng một cơ hội để xử lý yêu cầu. Ví dụ chúng tôi sử dụng ở đây là tập trung vào bộ nhớ đệm và tìm nạp các đối tượng từ API. Đây chỉ là một ví dụ về cách bạn có thể sử dụng mẫu này. Một ví dụ nổi tiếng khác là xử lý sự kiện chạm trên giao diện người dùng.
Bạn có thể tham khảo nhiều loại design pattern hơn tại [đây](https://agostini.tech/category/swift/design-patterns/).