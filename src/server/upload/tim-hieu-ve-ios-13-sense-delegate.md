Khi bạn tạo một project mới trong Xcode 11, bạn có thể nhận thấy điều gì đó mà bạn chưa từng thấy trước đây. Thay vì chỉ tạo một file `AppDelegate.swift`, một `ViewController.swift`, một `Storyboard` và một số file khác thì bây giờ từ Xcode 11 sẽ tạo một file mới cho bạn `SceneDelegate.swift`. Nếu bạn chưa từng thấy file này trước đây, có thể sẽ khá khó hiểu khi hiểu nó là gì và cách bạn phải sử dụng nó trong app của mình.
# Ví dụ về template mới của Xcode project
Bất cứ khi nào bạn tạo một project Xcode mới, bạn có tùy chọn để chọn xem bạn muốn sử dụng `SwiftUI` hay `Storyboards`. Bất kể lựa chọn của bạn ở đây là gì, Xcode sẽ tạo ra một loại template project mới để bạn sử dụng. Chúng ta sẽ xem xét kỹ hơn các file `SceneDelegate.swift` và `AppDelegate.swift` trong phần tiếp theo, điều quan trọng lúc này là bạn hiểu rằng Xcode đã tạo các tệp này cho bạn.

Ngoài hai file này, Xcode thực hiện một cái gì đó khác một chút. Hãy xem kỹ file `Info.plist` của bạn. Bạn sẽ thấy một key mới có tên là `Application Scene Manifest` với nội dung tương tự như hình ảnh sau:
![](https://images.viblo.asia/dab81cad-bf92-48d7-9e14-882d450280e3.png)
File `SceneDelegate.swift` này chỉ định tên và class đại diện cho Scene của bạn. Lưu ý rằng các thuộc tính này thuộc về một array (`Application Session Role`), gợi ý rằng bạn có thể có nhiều configurations trong Info.plist của mình. Một key quan trọng hơn nhiều mà bạn có thể đã phát hiện trong ảnh chụp màn hình ở trên là `Enable Multiple Windows`. Thuộc tính này mặc định được set là `NO`. Khi set thuộc tính này thành `YES` thì nó sẽ cho phép người dùng mở nhiều window ứng dụng của bạn trên iPadOS (hoặc thậm chí trên macOS). Việc có thể chạy nhiều window song song của một ứng dụng iOS là một sự khác biệt rất lớn so với môi trường một window mà chúng ta đã làm việc từ trước đến nay và khả năng có nhiều window là toàn bộ lý do app lifecycle của chúng ta hiện được duy trì ở hai nơi hơn là một.

Chúng ta hãy xem xét kỹ hơn `AppDelegate` và `SceneDelegate` để hiểu rõ hơn cách hai đại diện này làm việc cùng nhau để hỗ trợ nhiều cửa sổ.

# Hiểu về vai trò của AppDelegate và SceneDelegate
Nếu bạn đã từng build app trước iOS 13, bạn có thể biết `AppDelegate` là nơi thực hiện khá nhiều thứ liên quan đến khởi chạy ứng dụng của bạn, foregrounding, backgrounding, ... Trong iOS 13, Apple đã chuyển một số nhiệm vụ của `AppDelegate` sang `SceneDelegate`. Hãy cùng xem qua từng file này.
## AppDelegate’s responsibilities
`AppDelegate` vẫn là điểm truy cập chính của một ứng dụng trong iOS 13. Apple gọi các phương thức `AppDelegate` cho một số sự kiện cho app lifecycle. Trong default template của Apple, bạn sẽ tìm thấy ba phương thức mà Apple coi là quan trọng để bạn sử dụng:
* `func application(_:didFinishLaunchingWithOptions:) -> Bool`
* `func application(_:configurationForConnecting:options:) -> UISceneConfiguration`
* `func application(_:didDiscardSceneSessions:)`
Những phương thức này có một số comment mô tả cách nó hoạt động và đủ thông tin để hiểu. Nhưng dù sao chúng ta cũng chỉ hay đọc lướt qua nó.

Khi ứng dụng của bạn vừa được khởi chạy, `func (_: didFinishLaunchingWithOptions :) -> Bool` được gọi. Phương thức này được sử dụng để thực hiện thiết lập ứng dụng. Trong iOS 12 trở xuống, bạn có thể đã sử dụng phương thức này để tạo và cấu hình một đối tượng `UIWindow` và gán một `UIViewController` cho window để nó xuất hiện.

Nếu ứng dụng của bạn đang sử dụng `Scenes`, thì `AppDelegate` của bạn không còn chịu trách nhiệm thực hiện việc này nữa. Vì ứng dụng của bạn hiện có thể có nhiều window hoặc `UISceneSessions` đang hoạt động, nên việc quản lý một đối tượng window trong `AppDelegate` không có ý nghĩa gì.

`func (_: configurationForConnecting: options :) -> UISceneConfiguration` được gọi bất cứ khi nào ứng dụng của bạn dự kiến cung cấp scene mới hoặc window cho iOS hiển thị. Lưu ý rằng phương thức này không được gọi khi ứng dụng của bạn khởi chạy ban đầu, nó chỉ được gọi để lấy và tạo các scenes mới.

Phương thức cuối cùng trong file `AppDelegate` là `func (_: didDiscardSceneSessions :)`. Phương thức này được gọi bất cứ khi nào người dùng loại bỏ một scene, chẳng hạn bằng cách vuốt nó ra xa trong cửa sổ đa nhiệm. Nếu ứng dụng của bạn không chạy khi người dùng thực hiện việc này, phương thức này sẽ được gọi cho mọi scene bị loại bỏ ngay sau khi `func (_: didFinishLaunchingWithOptions :) -> Bool` được gọi.

Ngoài các phương thức mặc định này, `AppDelegate` của bạn vẫn có thể được sử dụng để mở URL, bắt memory warnings, phát hiện khi nào ứng dụng của bạn kết thúc, phát hiện khi người dùng đã đăng ký nhận thông báo từ xa, v.v.


**Điều quan trọng cần lưu ý là nếu bạn hiện đang sử dụng `AppDelegate` để quản lý status bar của ứng dụng, bạn có thể phải thực hiện một số thay đổi trong iOS 13. Một số phương thức liên quan đến status bar đã không còn được dùng trong iOS 13.**
## SceneDelegate’s responsibilities
Khi bạn coi `AppDelegate` là đối tượng chịu trách nhiệm về app lifecycle của mình,thì  `SceneDelegate` chịu trách nhiệm về những gì hiển thị trên màn hình; scenes hoặc window. Trước khi tiếp tục, hãy thiết lập một số từ vựng liên quan đến scene vì không phải thuật ngữ nào cũng có nghĩa như bạn nghĩ.

Khi bạn xử lý các scene, thứ trông giống như một window đối với người dùng của bạn được gọi là `UIScene` được quản lý bởi `UISceneSession`. Vì vậy, khi chúng ta đề cập đến window, chúng ta đang thực sự đề cập đến các đối tượng `UISceneSession`.

Hãy xem file `SceneDelegate.swift` mà Xcode đã tạo khi tạo dự án của chúng ta.

Có một số phương thức trong tệp SceneDelegate.swift theo mặc định:
* `scene(_:willConnectTo:options:)`
* `sceneDidDisconnect(_:)`
* `sceneDidBecomeActive(_:)`
* `sceneWillResignActive(_:)`
* `sceneWillEnterForeground(_:)`
* `sceneDidEnterBackground(_:)`
Các phương thức này sẽ rất quen thuộc với bạn nếu bạn đã quen thuộc với `AppDelegate` đã tồn tại trước iOS 13. Hãy xem `scene(_: willConnectTo: options :)`, phương thức này có thể trông ít quen thuộc nhất với bạn và đó là phương thức đầu tiên được gọi trong vòng đời của một `UISceneSession`.

Default implementation của `scene(_: willConnectTo: options :)` tạo một `ContentView` (`ContentView` nếu bạn đang sử dụng `SwiftUI`), tạo `UIWindow` mới, set window’s  `rootViewController` và làm cho window này thành key window. Bạn có thể coi window này là window mà người dùng của bạn nhìn thấy.Thật không may, windows đã có từ trước iOS 13 và chúng đại diện cho viewport mà ứng dụng của bạn hoạt động. Vì vậy, `UISceneSession` kiểm soát window hiển thị mà người dùng nhìn thấy, `UIWindow` bạn tạo là container view cho ứng dụng của bạn.

Ngoài việc khởi tạo các chế độ xem ban đầu, bạn có thể sử dụng `scene(_: willConnectTo: options :)` để khôi phục scene UI của mình trong trường hợp scene của bạn đã bị ngắt kết nối trong quá khứ. Ví dụ, vì nó đã được gửi đến background. Bạn cũng có thể đọc đối tượng `connectionOptions` để xem liệu scene của bạn có được tạo do yêu cầu `HandOff` hay có thể để mở một URL.

Khi scene của bạn đã được kết nối, phương thức tiếp theo trong scene lifecycle của bạn là `sceneWillEnterForeground (_ :)`. Phương thức này được gọi khi scene của bạn sẽ chuyển sang stage. Đây có thể là khi ứng dụng của bạn chuyển từ background sang foreground hoặc nếu ứng dụng mới hoạt động lần đầu tiên. Tiếp theo, `sceneDidBecomeActive (_ :)` được gọi. Đây là điểm mà scene của bạn được thiết lập, hiển thị và sẵn sàng sử dụng.

Khi ứng dụng của bạn chuyển sang chế độ background, thì `sceneWillResignActive (_ :)` và `sceneDidEnterBackground (_ :`) được gọi. Chúng ta sẽ không đi sâu vào các phương thức này ngay bây giờ vì mục đích của chúng khác nhau đối với mọi ứng dụng và các comment trong template Xcode thực hiện khá tốt việc giải thích khi nào các phương thức này được gọi. Trên thực tế, chắc chắn rằng bạn có thể tự tìm được lúc khi các phương thức này được gọi.

Một phương thức thú vị hơn là `sceneDidDisconnect (_ :)`. Bất cứ khi nào scene của bạn được gửi xuống background, iOS có thể quyết định ngắt kết nối và xóa scene của bạn để giải phóng tài nguyên. Điều này không có nghĩa là ứng dụng của bạn đã bị kill hoặc không chạy nữa, nó chỉ có nghĩa là scene được chuyển đến phương thức này không còn hoạt động nữa và sẽ ngắt kết nối khỏi session của nó.

Lưu ý rằng bản thân session đó cũng không nhất thiết phải bị loại bỏ, iOS có thể quyết định kết nối lại một scene với một scene session bất kỳ lúc nào, chẳng hạn như khi người dùng đưa một scene cụ thể lên foreground một lần nữa.

Điều quan trọng nhất cần làm trong `sceneDidDisconnect (_ :)` là loại bỏ bất kỳ tài nguyên nào mà bạn không cần giữ lại. Đây có thể là dữ liệu được tải dễ dàng từ disk hoặc mạng hoặc dữ liệu khác mà bạn có thể tạo lại dễ dàng. Điều quan trọng nữa là đảm bảo bạn giữ lại mọi dữ liệu không thể dễ dàng tạo lại, chẳng hạn như bất kỳ thông tin đầu vào nào mà người dùng cung cấp trong một scene mà họ mong đợi vẫn ở đó khi họ quay lại nó.

Cân nhắc một ứng dụng xử lý văn bản hỗ trợ nhiều scene. Nếu người dùng đang làm việc trong một scebe, sau đó xuống background để tìm một số thứ trên Safari, họ hoàn toàn mong đợi tất cả công việc của họ vẫn tồn tại trong ứng dụng xử lý văn bản, mặc dù iOS có thể đã ngắt kết nối xử lý văn bản scene của ứng dụng trong một thời gian. Để đạt được điều này, ứng dụng phải giữ lại dữ liệu cần thiết và nó phải mã hóa trạng thái ứng dụng hiện tại trong một đối tượng `NSUserActivity` có thể được đọc sau này trong `scene(_: willConnectTo: options :)` khi scene được kết nối lại.

Vì quy trình kết nối, ngắt kết nối và kết nối lại các scene này sẽ tách các ứng dụng tốt ra khỏi ứng dụng tuyệt vời, hãy cùng xem cách bạn có thể triển khai khôi phục trạng thái trong ứng dụng của mình.

# Performing additional scene setup
Có một số lý do để bạn phải thực hiện perform additional setup khi một scene được thiết lập. Bạn có thể phải mở một URL, xử lý yêu cầu Handoff hoặc khôi phục trạng thái. Trong phần này, tôi sẽ tập trung chủ yếu vào việc khôi phục trạng thái vì đó có thể là tình huống phức tạp nhất mà bạn có thể phải xử lý.

Khôi phục trạng thái bắt đầu khi scene của bạn bị ngắt kết nối và `sceneDidDisconnect (_ :)` được gọi. Tại thời điểm này, điều quan trọng là ứng dụng của bạn đã được thiết lập trạng thái để có thể khôi phục. Cách tốt nhất để làm điều này là sử dụng `NSUserActivit`y trong ứng dụng của bạn. Nếu bạn đang sử dụng `NSUserActivity` để hỗ trợ Handoff, Siri Shortcuts, Spotlight indexing và hơn thế nữa, bạn không có nhiều việc phải làm. Nếu bạn chưa sử dụng `NSUserActivity`, đừng lo lắng. Một hoạt động đơn giản của người dùng có thể trông giống như sau:
```Swift
let activity = NSUserActivity(activityType: "com.donnywals.DocumentEdit")
activity.userInfo = ["documentId": document.id]
```
Lưu ý rằng hoạt động của người dùng này không được cấu trúc như cách Apple đề xuất, đó là một ví dụ rất đơn giản nhằm minh họa cho việc khôi phục trạng thái. Để có hướng dẫn đầy đủ về `NSUserActivity`, tôi khuyên bạn nên xem tài liệu của Apple về chủ đề này.

Khi bạn cung cấp một hoạt động của người dùng có thể được khôi phục sau đó, hệ thống sẽ gọi phương thức `stateRestorationActivity (for :)` trên `SceneDelegate` của bạn. Lưu ý rằng phương thức này không phải là một phần của default template.
```Swift
func stateRestorationActivity(for scene: UIScene) -> NSUserActivity? {
  return scene.userActivity
}
```
Việc làm này liên kết activity hiện đang hoạt động của người dùng cho một scene với scene session. Hãy nhớ rằng bất cứ khi nào một scene bị ngắt kết nối, `UISceneSession` sở hữu `UIScene` sẽ không bị hủy bỏ để cho phép session kết nối lại với một scene. Khi điều này xảy ra, `scene(_: willConnectTo: options :)` được gọi lại. Trong phương thức này, bạn có quyền truy cập vào `UISceneSession` sở hữu `UIScene` để bạn có thể đọc `stateRestorationActivity` của session và khôi phục trạng thái ứng dụng nếu cần:
```Swift
if let activity = session.stateRestorationActivity,
  activity.activityType == "com.donnywals.DocumentEdit",
  let documentId = activity.userInfo["documentId"] as? String {

  // find document by ID
  // create document viewcontroller and present it
}
```
Tất nhiên, các chi tiết của đoạn code này sẽ khác nhau dựa trên ứng dụng của bạn, nhưng ý tưởng chung là giống nhau.

Nếu `UISceneSession` của bạn dự kiến sẽ xử lý một URL, bạn có thể kiểm tra `urlContexts` của đối tượng `connectOptions` để tìm các URL mà scene của bạn sẽ mở và thông tin về cách ứng dụng của bạn thực hiện việc này:
```Swift
for urlContext in connectionOptions.urlContexts {
  let url = urlContext.url
  let options = urlContext.options

  // handle url and options as needed
}
```

Đối tượng `options` sẽ chứa thông tin về việc liệu scene của bạn có nên mở URL tại chỗ hay không, ứng dụng nào đã yêu cầu mở URL này và siêu dữ liệu khác yêu cầu.

Các khái niệm cơ bản về khôi phục trạng thái trong iOS 13 với `SceneDelegate` đơn giản một cách đáng ngạc nhiên, đặc biệt là vì nó được xây dựng dựa trên `NSUserActivity`, có nghĩa là nhiều ứng dụng sẽ không phải làm quá nhiều việc để bắt đầu hỗ trợ khôi phục trạng thái cho các scene của chúng.

Hãy nhớ rằng nếu bạn muốn hỗ trợ nhiều scene cho ứng dụng của mình trên iPadOS, thì việc khôi phục scene là đặc biệt quan trọng vì iOS có thể ngắt kết nối và kết nối lại các scene của bạn khi chúng chuyển từ foreground sang background và quay lại lần nữa. Đặc biệt nếu ứng dụng của bạn cho phép người dùng tạo hoặc thao tác các đối tượng trong một scene, người dùng sẽ không mong đợi công việc của họ sẽ biến mất nếu họ chuyển một scene sang background trong giây lát.
# Tổng kết
Trong bài viết này, bạn đã học được rất nhiều điều. Bạn đã biết được các vai trò của `AppDelegate` và `SceneDelegate` trong iOS 13 và vòng đời của chúng trông như thế nào. Bây giờ bạn biết rằng `AppDelegate` chịu trách nhiệm phản ứng với các sự kiện cấp ứng dụng, chẳng hạn như khởi chạy ứng dụng. `SceneDelegate` chịu trách nhiệm về các sự kiện liên quan đến vòng đời của scene. Ví dụ: tạo scene, phá hủy và khôi phục trạng thái của một `UISceneSession`. Nói cách khác, lý do chính để Apple thêm `UISceneDelegate` vào iOS 13 là để tạo ra một điểm vào tốt cho các ứng dụng đa cửa sổ.

Sau khi tìm hiểu những điều cơ bản về `UISceneDelegate`, bạn đã thấy một ví dụ rất đơn giản về việc khôi phục trạng thái trông như thế nào trong iOS 13 với `UISceneSession` và `UIScene`. Tất nhiên, còn nhiều điều cần tìm hiểu về cách ứng dụng của bạn hoạt động khi người dùng tạo nhiều `UISceneSessions`và cách những scene này có thể phải đồng bộ hóa hoặc chia sẻ dữ liệu.

Cảm ơn bạn đã đọc!

Nguồn: https://www.donnywals.com/understanding-the-ios-13-scene-delegate/