**Combine** được giới thiệu vài WWDC 2019, là một framework "reactive" của chính Apple. Bạn có thể dùng nó để việc code của mình đơn giản hơn khi dùng các thứ như: delegate, notification, timer, block completion, callback...

Trong hướng dẫn này sẽ bao gồm:
1. Cách dùng Pulisher và Subcriber.
2. Handler event streams.
3. Dùng Timer theo cách của Combine
4. Khi nào nên dùng Combine vào project của bạn.

Bạn sẽ được giới thiệu về các khai niệm chính về nó qua game FindOrLose - một game tìm image khác biệt so với 3 image khác.

## Getting Started

[Download](https://koenig-media.raywenderlich.com/uploads/2020/04/FindOrLose.zip) 

Tải về và thử build project.

Trước khi bạn có thể chơi game, bạn phải register tại [Unsplash Developers Portal](https://unsplash.com/developers)  để API key.
Sau khi đăng ký, bạn sẽ cần tạo một ứng dụng. Sau khi hoàn thành, bạn sẽ thấy một màn hình như thế này:

![](https://images.viblo.asia/3ba8fc0a-6dc5-46ec-a7e2-fbe21defbdc9.jpg)

Open UnsplashAPI.swift và thêm Unsplash API key vào UnsplashAPI.accessToken, kiểu như thế này:

```
enum UnsplashAPI {
  static let accessToken = "<your key>"
  ...
}
```

Build and Run. Màn hình chính hiển thị cho bạn bốn hình vuông màu xám. Bạn cũng sẽ thấy một button để play hoặc pause trò chơi:

![](https://images.viblo.asia/7a0d88bc-4396-40ca-b15c-4b7a13b08015.png)

Tap Play to start the game:

![](https://images.viblo.asia/d03959f6-5aec-4013-8a6f-eb6e4011d39d.png)

Ngay bây giờ, đây là game hoạt động đầy đủ, nhưng hãy xem playGame () trong GameViewControll.swift. Method ở cuối như thế này:

```
            }
          }
        }
      }
    }
  }
```

Đó là quá nhiều "}" lồng nhau. Bạn có thể tìm ra những gì xảy ra, và theo thứ tự nào? Điều gì sẽ xảy ra nếu bạn muốn thay đổi thứ tự xảy ra, hoặc bảo lãnh hoặc thêm chức năng mới? Đã tới lúc để nhận được sự giúp đỡ từ Combine! =)).

## Introduction to Combine

Framework Combine cung cấp API khai báo để xử lý các giá trị theo thời gian. Có ba thành phần chính:

**Publishers**: Những thứ  gì đó mà bắn ra value.

**Operators**: Những thứ gì đó mà làm việc với các value.

**Subscribers**: Những thứ gì đó mà lấy value để làm gì đó.

Lần lượt lấy từng thành phần:

### Publishers

Các Object phù hợp với Publisher cung cấp một chuỗi các value theo thời gian. Giao thức có hai loại liên quan: Output - loại giá trị mà nó tạo ra và Failure - loại error mà nó có thể gặp phải.

Mỗi publisher có thể emit nhiều sự kiện:

Một giá trị đầu ra của loại **Output**.

Một tín hiệu cho biết đã hoàn thành luồng.

Một lỗi Failure.

Một số loại Foundation đã được cải tiến để thể hiện chức năng của chúng thông qua các publisher, bao gồm Timer và URLSession, mà bạn sẽ sử dụng trong hướng dẫn này.

### Operators

Operator là các method đặc biệt được gọi trên các publisher và trả về cùng hoặc một publisher khác. Một operator mô tả một hành vi để thay đổi value, thêm value, loại bỏ value hoặc nhiều hoạt động khác. Bạn có thể xâu chuỗi nhiều toán tử lại với nhau để thực hiện xử lý phức tạp.

Hãy nghĩ về các giá trị nhận được từ publisher gốc thông qua một loạt các toán tử. Giống như một dòng sông, các giá trị đến từ publisher này và đi đến publisher khác.

## Subscribers

Các Publisher và operator là vô nghĩa trừ khi có gì đó đang "lắng nghe" các sự kiện được công bố. Đó là một cái gì đó là **Subscriber**.

**Subscriber** là một giao thức khác. Giống như Publisher, nó có hai loại liên kết: **Input** và **Failure**. Chúng phải phù hợp với **Output** và **Failure** của publisher.

Subscriber nhận được một luồng giá trị, sự kiện completion hoặc sự kiện failure từ publisher.

### Putting it together

Publisher bắt đầu phát các value khi bạn gọi *subscribe(  : )* trên đó, chuyển qua subscriber của bạn. Tại thời điểm đó, publisher gửi một subscription cho subscriber. Sau đó, subscriber có thể sử dụng subscription này để đưa ra yêu cầu từ publisher về số lượng giá trị xác định hoặc không xác định.

Sau đó, publisher có thể tự do gửi các value cho Subscriber. Nó có thể gửi đầy đủ số lượng value được yêu cầu, nhưng nó cũng có thể gửi ít hơn. Nếu publisher là hữu hạn thì cuối cùng nó sẽ trả về event completion hoặc có thể là 1 error nào đó. 

Sơ đồ này tóm tắt quá trình:

![](https://images.viblo.asia/c38fc03d-7cdf-49cb-8ad4-73df83556fb5.png)

## Networking with Combine

Ở đây sẽ cung cấp cho bạn một cái nhìn tổng quan nhanh chóng về Combine. Khi nào để sử dụng nó trong project của bạn!

Trước tiên, bạn cần tạo enum **GameError** để xử lý tất cả các error **Publisher**. Từ menu chính của Xcode, chọn  **File ▸ New ▸ File** và chọn  template **iOS ▸ Source ▸ Swift File**.

Đặt tên cho file mới là **GameError.swift** và thêm nó vào thư mục **Game**.

Bây giờ thêm enum **GameError**:

```
enum GameError: Error {
  case statusCode
  case decoding
  case invalidImage
  case invalidURL
  case other(Error)
  
  static func map(_ error: Error) -> GameError {
    return (error as? GameError) ?? .other(error)
  }
}
```

Điều này cung cấp cho bạn tất cả các loại error có thể xảy ra trong khi chơi game, cùng với một func tiện dụng để nhận error thuộc bất kỳ loại nào trong GameError và đảm bảo rằng đó là một GameError. Bạn sẽ sử dụng điều này khi làm việc với các publisher.

Cùng với đó, giờ đây, bạn đã sẵn sàng xử lí HTTP status code và decoding error.

Tiếp theo, import Combine. Mở **UnsplashAPI.swift** và thêm phần sau vào đầu file:

```
import Combine
```

Sau đó thay đổi randomImage(completion :) thành như sau:

```
static func randomImage() -> AnyPublisher<RandomImageResponse, GameError> {
```

Bây giờ, phương thức không cần 1 closure completion như là 1 tham số. Thay vào đó, nó trả về một publisher, với loại đầu ra RandomImageResponse và một loại GameError nếu thất bại.

**AnyPublisher** là một loại hệ thống mà bạn có thể sử dụng để wrap cho bất kỳ publisher nào.

Tiếp theo, bạn sẽ cập nhật code của mình để sử dụng các func Combine mới của **URLSession**. Tìm dòng bắt đầu **session.dataTask(with: )**. Thay thế từ dòng đó đến cuối method bởi code sau:

```
// 1
return session.dataTaskPublisher(for: urlRequest)
  // 2
  .tryMap { response in
    guard
      // 3
      let httpURLResponse = response.response as? HTTPURLResponse,
      httpURLResponse.statusCode == 200
      else {
        // 4
        throw GameError.statusCode
    }
    // 5
    return response.data
  }
  // 6
  .decode(type: RandomImageResponse.self, decoder: JSONDecoder())
  // 7
  .mapError { GameError.map($0) }
  // 8
  .eraseToAnyPublisher()
```

Điều này có vẻ như rất nhiều code, nhưng nó sử dụng nhiều tính năng của Combine. 

Đây là giải thích bước từng bước:

1. Bạn nhận được một publisher từ URL session cho request URL. Đây là **URLSession.DataTaskPublisher**, có loại output là **(data: Data, response: URLResponse)**. Đó không phải là loại output phù hợp, do đó, bạn sẽ sử dụng một loạt các operator để để làm nó trở nên phù hợp.

2. Áp dụng toán tử **tryMap**. Operator này nhận giá trị và thử chuyển đổi nó sang một loại khác, với khả năng bắn ra error. Ngoài ra còn có một toán tử map cho các hoạt động đảm bảo rằng nó không thể ném ra error.

3. Kiểm tra trạng thái 200 OK HTTP.

4. Ném error GameError.statusCode nếu bạn không nhận được trạng thái HTTP 200 OK.

5. Trả về response.data nếu mọi thứ đều OK. Điều này có nghĩa là loại output của bạn hiện là Data.

6. Áp dụng operator **decode**, sẽ thử tạo ra **RandomImageResponse** từ giá trị nhận được ở trên bằng cách sử dụng **JSONDecoder**.

7. Kiểu failure của bạn vẫn chưa hoàn toàn đúng. Nếu có error trong quá trình decoding, nó sẽ không là một GameError. Toán tử mapError cho phép bạn xử lý và ánh xạ mọi error thành loại error của bạn, sử dụng func bạn đã thêm vào GameError.

8. Nếu bạn đã kiểm tra kiểu trả về của mapError vào thời điểm này, bạn sẽ được nhận được với một thứ gì đó khá không rõ ràng. Toán tử .eraseToAnyPublisher thu dọn tất cả những thứ gây rối để bạn có thể  có kiểu trả về hữu dụng hơn.

Bây giờ, bạn có thể đã viết gần như tất cả những điều này trong một operator duy nhất, nhưng điều đó không thực sự theo ý nghĩa của Combine.
Hãy nghĩ về nó giống như các công cụ UNIX, mỗi bước làm một việc và chuyển kết quả trên.

## Downloading an Image With Combine

Bây giờ bạn đã có logic networking, đã đến lúc tải xuống một số hình ảnh.

Mở tệp **ImageDownloader.swift** và import Combine ở đầu file với code sau:

```
import Combine
```

Giống như **randomImage**, bạn không cần phải dùng closure với Combine. Thay thế **download(url:, completion: )** bằng điều này:

```
// 1
static func download(url: String) -> AnyPublisher<UIImage, GameError> {
  guard let url = URL(string: url) else {
    return Fail(error: GameError.invalidURL)
      .eraseToAnyPublisher()
  }

  //2
  return URLSession.shared.dataTaskPublisher(for: url)
    //3
    .tryMap { response -> Data in
      guard
        let httpURLResponse = response.response as? HTTPURLResponse,
        httpURLResponse.statusCode == 200
        else {
          throw GameError.statusCode
      }
      
      return response.data
    }
    //4
    .tryMap { data in
      guard let image = UIImage(data: data) else {
        throw GameError.invalidImage
      }
      return image
    }
    //5
    .mapError { GameError.map($0) }
    //6
    .eraseToAnyPublisher()
}

```

Rất nhiều code này tương tự như ví dụ trên. Đây là giải thích cho bước từng bước:

1. Giống như trước đây, thay đổi func để method trả về publisher thay vì nhận 1 block completion.

2. Nhận một **dataTaskPublisher** cho URL image.

3. Sử dụng **tryMap** để kiểm tra response code và trích xuất dữ liệu nếu mọi thứ đều OK.

4. Sử dụng một toán tử **tryMap** khác để thay đổi **Data** thành **UIImage** - có thể trả về error nếu điều này không thành công.

5. Map error thành GameError.

6. .eraseToAnyPublisher để trả về một kiểu dữ liệu thuận tiện cho việc sử dụng.

## Using Zip

Tại thời điểm này, bạn đã thay đổi tất cả các method kết nối mạng của mình để sử dụng các publisher thay vì các block *completion*. Bây giờ bạn đã sẵn sàng sử dụng chúng.

Mở **GameViewController.swift**. Import Combine ở top file:

```
import Combine
```

Thêm thuộc tính sau vào đầu class **GameViewController**:

```
var subscriptions: Set<AnyCancellable> = []
```

Bạn sẽ sử dụng property này để lưu tất cả các subscription của bạn. Cho đến nay, bạn đã xử lý các publisher và operator, nhưng chưa có gì subscribed cả.

Bây giờ, xóa tất cả code trong playGame (), ngay sau lệnh gọi startLoaders (). Thay thế nó bằng cái này:

```
// 1
let firstImage = UnsplashAPI.randomImage()
  // 2
  .flatMap { randomImageResponse in
    ImageDownloader.download(url: randomImageResponse.urls.regular)
  }
```

Trong đoạn code trên, bạn:

1. Nhận một publisher sẽ đưa cho cho bạn một random image value.

2. Thực hiện toán tử **flatMap**, biến đổi các giá trị từ một publisher sang một publisher mới. Trong trường hợp này, bạn đang chờ output của cuộc gọi random image, sau đó chuyển nó thành publisher cho quá trình download image.

Tiếp theo, bạn sẽ sử dụng cùng một logic để lấy hình ảnh thứ hai. Thêm phần này ngay sau firstImage:

```
let secondImage = UnsplashAPI.randomImage()
  .flatMap { randomImageResponse in
    ImageDownloader.download(url: randomImageResponse.urls.regular)
  }
```

Tại thời điểm này, bạn đã tải xuống hai random image. Bây giờ nó đã đến lúc combine chúng lại. Bạn có thể sử dụng zip để làm điều này. Thêm code sau đây ngay sau **secondImage**:

```
// 1
firstImage.zip(secondImage)
  // 2
  .receive(on: DispatchQueue.main)
  // 3
  .sink(receiveCompletion: { [unowned self] completion in
    // 4
    switch completion {
    case .finished: break
    case .failure(let error): 
      print("Error: \(error)")
      self.gameState = .stop
    }
  }, receiveValue: { [unowned self] first, second in
    // 5
    self.gameImages = [first, second, second, second].shuffled()

    self.gameScoreLabel.text = "Score: \(self.gameScore)"

    // TODO: Handling game score

    self.stopLoaders()
    self.setImages()
  })
  // 6
  .store(in: &subscriptions)

```

1. **zip** làm ra một publisher mới bằng cách kết hợp các output của những cái hiện có. Nó sẽ đợi cho đến khi cả hai publisher đã phát ra một giá trị, sau đó nó sẽ gửi các giá trị kết hợp với nhau vào luồng.

2. Toán tử **receive (on : )** cho phép bạn chỉ định nơi bạn muốn các event từ luồng được xử lý. Vì bạn đang hoạt động trên UI, nên bạn sẽ sử dụng main dispatch queue.

3. Nó là subscriber đầu tiên của bạn! **sink(receiveCompletion:receiveValue:)** tạo một subscriber cho bạn, nó sẽ thực hiện các closure đó khi hoàn thành hoặc nhận một giá trị.

4. Publisher của bạn có thể hoàn thành theo hai cách - có thể finishes hoặc failure. Nếu có một failure, bạn dừng game.

5. Khi bạn nhận được hai hình ảnh ngẫu nhiên của mình, hãy thêm chúng vào một array và xáo trộn, sau đó update UI.

6. Lưu các subscription trong subscriptions. Nếu không giữ tham chiếu này, subscription sẽ hủy và publisher sẽ terminate ngay lập tức.

Cuối cùng, build and run!

![](https://images.viblo.asia/65fd5265-02ee-4ccc-9ca6-ca7963b9432f.png)

Xin chúc mừng, app của bạn hiện sử dụng Combine thành công để xử lý các luồng event!

## Adding a Score

Như bạn có thể nhận thấy, việc ghi điểm không còn hoạt động nữa. Trước đây, điểm số của bạn được đếm trong khi bạn chọn đúng hình ảnh, bây giờ nó chỉ nằm ở đó. Bạn sẽ rebuild chức năng hẹn giờ đó, nhưng với Combine!

Đầu tiên, khôi phục chức năng hẹn giờ ban đầu bằng cách thay thế **// TODO: Handling game score in playGame() with this code**:

```
self.gameTimer = Timer
  .scheduledTimer(withTimeInterval: 0.1, repeats: true) { [unowned self] timer in
  self.gameScoreLabel.text = "Score: \(self.gameScore)"

  self.gameScore -= 10

  if self.gameScore <= 0 {
    self.gameScore = 0

    timer.invalidate()
  }
}
```

Trong đoạn code trên, bạn lên lịch cho trò **gameTimer** để bắn mỗi **0.1** giây và giảm xuống **10** điểm. Khi điểm đạt **0**, bạn sẽ invalidate timer.

Bây giờ, build and run để xác nhận rằng điểm số trò chơi giảm khi thời gian trôi qua.

![](https://images.viblo.asia/619e7562-d8ae-45e7-b8f1-6662b7d5cac1.png)

## Using Timers in Combine

Timer là một loại Foundation khác có chức năng Combine được thêm vào nó. Bạn sẽ chuyển sang phiên bản Combine để thấy sự khác biệt.

Ở đầu **GameViewController**, thay đổi định nghĩa của **gameTimer**:

```
var gameTimer: AnyCancellable?
```

Bây giờ bạn đang lưu trữ một subscription vào timer. Điều này có thể được đại diện với **AnyCancellable** trong Combine.

Thay đổi dòng đầu tiên của playGame () và stopGame () bằng code sau:

```
gameTimer?.cancel()
```

```
// 1
self.gameTimer = Timer.publish(every: 0.1, on: RunLoop.main, in: .common)
  // 2
  .autoconnect()
  // 3
  .sink { [unowned self] _ in
    self.gameScoreLabel.text = "Score: \(self.gameScore)"
    self.gameScore -= 10

    if self.gameScore < 0 {
      self.gameScore = 0

      self.gameTimer?.cancel()
    }
  }
```

1. Bạn sử dụng API mới cho các publisher từ **Timer**. Publisher sẽ liên tục gửi date hiện tại theo khoảng thời gian nhất định mà trên vòng lặp đã cho.

2. Publisher là một loại publisher đặc biệt cần được nói rõ ràng để start hoặc stop. Toán tử .autoconnect xử lý vấn đề này bằng cách connecting hoặc disconnecting ngay khi subscriptions start hoặc canceled.

3. Publisher này không bắn ra fail, vì vậy bạn không cần phải gửi event completion nên để là "_ " . Trong trường hợp này, **sink** làm cho một subscriber chỉ xử lý các value bằng cách sử dụng closure mà bạn cung cấp.

Build and run và play với Combine nào!

![](https://images.viblo.asia/332eb46f-e05b-4d40-ab40-084ef5252ba3.png)

## Refining the App

Chỉ có một vài tinh chỉnh bị thiếu. Bạn đang liên tục thêm subscriber với **.store(in: &subscriptions)** mà không bao giờ xóa chúng. Tiếp theo, bạn sẽ fix nó.

Thêm dòng sau vào đầu **resetImages** ():

```
subscriptions = []
```

Tại đây, bạn chỉ định một mảng trống sẽ loại bỏ tất cả các tham chiếu đến các subscriptions không sử dụng.

Tiếp theo, thêm dòng sau vào đầu stopGame ():

```
subscriptions.forEach { $0.cancel() }
```

Tại đây, bạn lặp đi lặp lại tất cả các subscriptions và cancel chúng.

build and run một lần cuối cùng!

![](https://images.viblo.asia/2f3e0894-89c4-4b64-be7a-465d167cad38.gif)