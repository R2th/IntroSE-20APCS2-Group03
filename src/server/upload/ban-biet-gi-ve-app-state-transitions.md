Bài viết được dịch từ tài liệu dành cho developer của Apple: [Strategies for Handling App State Transitions](https://developer.apple.com/library/archive/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/StrategiesforHandlingAppStateTransitions/StrategiesforHandlingAppStateTransitions.html).

Với mỗi trạng thái của ứng dụng, hệ thống luôn có những chuẩn bị trước. Khi sự thay đổi trạng thái xảy ra, hệ thống sẽ thông báo tới app object, từ đây sẽ thông báo tới cả app delegate. Bạn có thể tận dụng những method của `UIApplicationDelegate` protocol để bắt được những sự thay đổi trạng thái và từ đó thêm vào xử lí như mong muốn. Ví dụ: khi chuyển từ foreground sang background, bạn có thể sẽ muốn ghi nhận tất cả các dữ liệu chưa được lưu và dừng toàn bộ các task hiện hành lại. Theo sau dưới đây là một vài chỉ dẫn gợi ý cho bạn trong việc xử lí với các thay đổi về trạng thái của ứng dụng.

## Launch App thì làm gì?

Khi ứng dựng được khởi chạy( vào foreground hoặc background), hãy sử dụng `willFinishLaunchingWithOptions:` và `didFinishLaunchingWithOptions:` để có thể làm những điều sau:
* Kiểm tra thông tin tại sao ứng dụng lại được khởi chạy và xử lí.
* Để khởi tạo các cấu trúc dự liệu thiết yếu cho ứng dụng.
* Chuẩn bị các màn hình hiển thị cho ứng dụng:
    - Nếu ứng dụng dùng OpenGL ES thì không được sử dụng các methods này. Thay vào đó hãy gọi method `applicationDidBecomeActive` để xử lí hiển thị.
    - Hiện cửa sổ ứng dụng từ `application:willFinishLaunchingWithOptions:` method. UIKit sẽ dừng việc hiển thị cho đến khi `application:didFinishLaunchingWithOptions` method return.


Vào lúc khởi chạy, hệ thống sẽ tự động load main storybroad cùng với các initial view controller của ứng dụng. Các method trên nên được để tối giản nhất có thể để giảm thời gian app khởi chạy. Một ứng dụng được kì vọng phải khởi tạo chính nó và bắt đầu xử lí các events trong ít hơn 5 giây. Nếu một ứng dụng không thể hoàn thành việc khởi chạy kịp thời gian, hệ thống sẽ kill ứng dụng vì không hồi đáp. Thêm nữa, bất kì task nào vào lúc đó có thể làm chậm việc khởi chạy của app nên được đưa vào một thread thứ hai để xử lí.

### The Launch Cycle

Khi ứng dụng được khởi chạy, trạng thái chuyển từ not running sang active hoặc background. Như một phần của Launch cycle, hệ thống tạo ra một process và main thread và gọi main function của ứng dụng để chạy trên đó. Main function mặc định đi cùng với Xcode điều khiển UIkit làm hầu hết các công việc liên quan đến khởi tạo ứng dụng và chuẩn bị khởi chạy.

Dưới đây là hình ảnh thể hiện chuỗi các sự việc diễn ra khi ứng dụng khởi chạy vào foreground:

![](https://images.viblo.asia/263fb041-f0d3-486b-8d02-d3dd878d2748.png) 


Khi ứng dụng khởi chạy vào background, launch cycle sẽ có một chút thay đổi. Sự khác biệt rõ ràng nhất là thay vì trở nên active, ứng dụng được đưa vào background để xử lí sự kiện và có thể bị suspended sau đó. Khi khởi chạy vào background, hệ thống sẽ vẫn load UI của ứng dụng nhưng sẽ không hiển thị cửa sổ của ứng dụng.

![](https://images.viblo.asia/5ed6604c-adcf-4ea9-83f0-dbae4d788989.png)


Để kiểm tra xem ứng dụng sẽ chạy vào đâu khi khởi chạy, hãy kiểm tra biến `applicationState` trong các method được nhắc đến ở trên. Nếu ứng dụng sẽ vào foreground, biến này sẽ chưa giá trị `UIApplicationStateInactive`. Thay vào đó nếu ứng dụng sẽ vào background, biến này chứa giá trị `UIApplicationStateBackground`. Hãy tận dụng sự khác biệt này để điều chỉnh ứng dụng theo ý muốn.

### Khởi chạy ứng dụng khi màn hình nằm ngang

Những ứng dụng chỉ hiển thị ở chế độ màn hình ngang phải thông báo cho hệ thống để khởi chạy ứng dụng trên chế độ đó. Thường thấy, ứng dụng khởi chạy ở chế độ dọc và quay màn hình để phù hợp với trạng thái của máy nếu cần thiết. Đối với các ứng dụng hỗ trợ cả hiển thị dọc và ngang luôn điều chỉnh các view phù hợp với màn hình dọc và để viewController xử lí việc quay màn hình. Nếu ứng dụng của bạn chỉ hỗ trợ kiểu màn hình ngang, hay làm theo các bước sau:
* Thêm `UIInterfaceOrientation` key vào file `Info.plist` và set giá trị là `UIInterfaceOrientationLandscapeLeft` hoặc `UIInterfaceOrientationLandscapeRight` .
* Kiểm tra xem layout của các view đã được set phù hợp với kiểu màn hình ngang chưa.
* Override lại method `shouldAutorotateToInterfaceOrientation:`  và cho return YES để cho phép màn hình quay qua trái hoặc phải về kiểu màn hình ngang, return NO để màn hình về kiểu dọc.

`UIInterfaceOrientation` key nằm trong file `Info.plist` sẽ bảo iOS rằng status bar nên được cơ cấu lại, cùng với đó là chiều màn hình của view được quản lí bởi bất kì view controller nào vào lúc khởi chạy. Các view controller sẽ ưu tiên key này set trạng thái ban đầu của view của chúng. Sử dụng key này cũng tương tự như gọi hàm `setStatusBarOrientation:animated:` trong `UIApplication` trước đó khi hàm `applicationDidFinishLaunching:` đang được xử lí.

### Cài đặt một số file đặc thù của ứng dụng và lần đầu khởi chạy

Bạn có thể tận dụng chu trình khởi chạy đầu tiên của ứng dụng để setup dữ liệu hoặc cơ cấu các file cần thiết. Những file đặc thù của ứng dụng nên được để trong địa chỉ `Library/Application Support/<bundleID>/` trong sandbox cả app, mà <bundleID> là bundleID của ứng dụng. Nếu như bundle của ứng dụng chưa file dữ liệu mà bạn có dự định sửa đổi, hãy copy chỗ files đó ra ngoài và sửa đổi phần copy. Bạn không nên thay đổi file bên trong bundle của ứng dụng. Bởi vì ứng dụng iOS là kiểu code signed, việc sửa đổi file trong bundle ứng dụng có thể làm ảnh hưởng đến app's signature và sẽ ngăn ứng dụng khởi chạy sau này. Hãy copy các file đó vào `Application Support` và sửa đổi chúng nếu cần.
    
## Ứng dụng bị tạm thời bị ngưng thì làm gì
    
Đôi khi có những gián đoạn sẽ làm ứng dụng của bạn bị tạm ngưng. Ứng dụng tiếp tục chạy trên foreground, nhưng sẽ không nhận bất kì một touch event nào từ hệ thống. (Ứng dụng cẫn có thể tiếp tục nhận các thông báo và event khác) Để đối phó với sự thay đổi này, ứng dụng của bạn nên chuẩn bị một số điều sau trong hàm `applicationWillResignActive:` :
* Lưu lại dữ liệu và các thôn tin trạng thái.
* Dừng bộ đếm và các task hiện hành.
* Dừng bất kì các metadata query đang chạy.
* Không khởi tạo task gì mới.
* Dừng việc playback media (trừ khi đang playback thông qua AirPlay).
* Đưa vào trạng thái pause nếu ứng dụng của bạn là game.
* Throttle lại frame rate của OpenGL ES.
* Suspend bất kì dispatch queue hoặc operation nào đang thực thi phần code không quan trọng.
    
### Phản hồi với sự rạm ngưng của ứng dụng
    
 Khi gặp phải sự gián đoạn, ví dụ như có cuộc gọi đến chả hạn, ứng dụng sẽ tạm thời bị đưa vào trạng thái inactive, cho nên hệ thống sẽ hiện thị một cửa sổ thông báo cho người dùng. Ứng dụng sẽ ở nguyên trạng thái này đến khi người dùng ẩn cửa sổ này đi. Ngay lúc này, ứng dụng có thể trở về trạng thái active hoặc chuyển vào trạng thái background. Dưới đây là biểu đồ miêu tả diễn biến của app khi có sự gián đoạn xảy ra:
    
![](https://images.viblo.asia/0397eaa2-eb53-44fa-8983-906d21387599.png)
    
Thông báo hiển thị banner sẽ không deactive ứng dụng. Thay vào đó, banner sẽ nằm ở cạnh trên cùng của cửa sổ ứng dụng và ứng dụng vẫn tiép tục nhận được các touch event như thường. Nhưng nếu người dùng kéo banner xuống để mở màn hình notification, ứng dụng sẽ bị đưa vào trạng thái inactive giống như trường hợp bên trên. Người dùng có thể sử dụng phần cài đặt ứng dụng để điều chỉnh thông báo nào nên hiện là banner và thông báo nào nên hiện là cảnh báo.
    
## Ứng dụng vào foreground thì làm gì?
    
Khi trở về foreground, ứng dụng của bạn có thể khởi động lại các task mà đã bị dừng khi vào background. Hàm `applicationWillEnterForeground:` sẽ làm ngược lại mọi thứ đã diễn ra với hàm `applicationDidEnterBackground:` ,và hàm `applicationDidBecomeActive:` sẽ tiếp tục thực thi giống như lúc khởi chạy. Dưới đây là sơ đồ miêu tả quá trình này:
    
![](https://images.viblo.asia/e886a997-a911-4c37-a9e3-4becd879f351.png)
    
### Chuẩn bị để thực thi Notification Queue
    
Một ứng dụng trong trạng thái suspend phải được chuẩn bị trước cho việc xử lí notification queue khi trở về foreground hoặc trạng thái thực thi dưới background. Một suspended app sẽ không hoạt động cho nên cũng không thể xử lí các notification liên quan đến thay đổi hướng màn hình, thời gian, thiết lập, và rất nhiều yếu tố khác ảnh hưởng đến hiển thị và trạng thái của ứng dụng.  Để chắc chắn rằng những sự thay đổi này không bị mất, hệ thống sẽ tập hợp các notification này rồi đưa đến ứng dụng ngay khi bắt đầu thực thi code lại (cả từ foreground và background). Để tránh việc ứng dụng bị qua tải bởi notification khi tiếp tục trở lại, hệ thống truyền cho ứng dụng từng tập hợp notification mang sự thay đổi liên quan đến nhau từ khi ứng dụng bị suspended. Bảng dưới đây sẽ bao gồm các kiểu tập hợp có sẵn:
    
![](https://images.viblo.asia/3ce61e7d-9ea2-4dbc-ab7e-b7254709dade.png)
    
Notification queue sẽ được đưa tới ứng dụng trong vòng lặp chính và thường được đưa tới trước bất kì touch event nào mà người dùng truyền tới. Đa số các ứng dụng có thể xử lí event kiểu này mà không gây ra sự bất tiện đáng kể nào. Nếu như việc ứng dụng hiển thị lên bị chậm trễ, hãy kiểm tra xem liệu có phải do phần xử lí với notification này là nguyên nhân hay không.
    
Một ứng dụng trở lại foreground có thể sẽ được trả về một thông báo update view. Một ứng dụng chạy dưới background vẫn có thể gọi các hàm `setNeedsDisplay` và `setNeedsDisplayInRect:` để yêu cầu update cho view. Bởi vì view không hiển thị nên hê thống sẽ giữ lại request update cho đến khi ứng dụng vào lại foreground.
    
### Xử lí với sự thay đổi từ iClound
    
Nếu trạng thái của iClound thay đổi bất kể lí do, hệ thông sẽ đưa một `NSUbiquityIdentityDidChangeNotification` notification về ứng dụng của bạn. Trạng thái của iCloud thay đổi khi người dùng đăng nhập hoặc đăng xuất tài khoản iCloud hoặc bật tắt đồng bộ dữ liệu. Notification này là lí do để ứng dụng của bạn update caches và bất kì sự thay đổi nào trên UI liên quan đến iCloud.
Nếu ứng dụng của bạn đã chuẩn bị sẵn để xổ ra thông báo về việc lưu trữ dữ liệu trên iCloud thì không nên xổ thêm cửa sổ khác khi trạng thái của iCloud thay đổi. Sau khi hiện cửa sổ này lần đầu tiên, hãy lưu lại lưuaj chọn của người dùng trong phần thiết lập.
    
### Xử lí với thay đổi locale
    
Nếu một người dùng thay đổi locale hiện tại khi ứng dụng bị suspended, bạn có thể dùng `NSCurrentLocaleDidChangeNotification` notification để force update bất kì view nào có chưa thông tin về locale như ngày tháng năm, thời gian, các con số khi ứng dụng về foreground. Tất nhiên cách tối ưu nhất để tránh các vấn đề liên quan đến locale là viết code sao cho việc update view được tiện lợi. Ví dụ như sau:
* Sử dụng class `autoupdatingCurrentLocale` để lấy về `NSLocale` objects. Hàm này sẽ trả về locale object mà sẽ tự động update chính nó khi có sự thay đổi nên bạn sẽ không phải khởi tạo lại nó. Tuy nhiên khi locale thay đổi, bạn vẫn phải làm mới lại các view chứa thông tin liên quan đến locale.
* Khởi tạo lại cached data và các number formatter object khi thông tin của locale thay đổi.
    
### Xử lí với sự thay đổi trong thiết lập của ứng dụng
    
Nếu ứng dụng của bạn có phần thiết lập được quản lí bởi setting app thì nó sẽ theo dõi `NSUserDefaultsDidChangeNotification` notification. Bởi vì người dùng có thể thay đổi thiết lập khi ứng dụng bị suspended hoặc ở dưới background, bạn có thể sử dụng notification này để hồi đáp lại bất kì sự thay đổi nào trong thiết lập. Trong một số trường hợp, hồi đáp notification này có thể ngăn chăn một lỗ hổng bảo mật. Để ví dụ, một chương trifnh email nên phản hồi lại khi có thay đổi về thông tin người dùng. Nếu không bắt được những thay đổi này, việc nảy sinh vấn đề về ảo mật và quyền riêng tư là khó tránh khỏi. Đặc biệt, người dùng hiện tại cũng có thể gửi mail sử dụng thông tin của tài khoản cũ, kể cả khi nó không còn thuộc sở hữu của người này nữa.
    
Ngay khi nhận được `NSUserDefaultsDidChangeNotification` notification, ứng dụng của bạn sẽ nên reload lại các mục thiết lập liên quan nếu cần, khởi động lại các UI tương ứng. Trong trường hợp mật khẩu hoặc các thông tin bảo mật thay đổi, bạn nên ẩn các thông tin trước đó và bắt người dùng nhập lại mật khẩu mới.
    
## Ứng dụng vào Background thì làm gì?
    
Khi ứng dụng chuyển từ foreground sang background, hãy sử dụng hàm `applicationDidEnterBackground:` của app delegate để có thể thự thi những điều sau:
* **Chuẩn bị để chụp lại màn hình ứng dụng.** Khi hàm `applicationDidEnterBackground:` trả về, hệ thống sẽ chụp lại ảnh về UI của ứng dụng để dùng cho transition animation. Nếu bất kì view nào trong UI có chứa thông tin nhạy cảm, bạn nên ẩn hoặc thay đổi trước khi hàm `applicationDidEnterBackground:` trả về. Nếu bạn muốn thêm view mới trong qua trình này thì bạn phải bắt view này tự vẽ chính nó như đã được miêu tả trong phần "Chuẩn bị cho App Snapshot" bên dưới.
* **Lưu trữ lại các thông tin liên quan đến trạng thái cảu ứng dụng.** Ưu tiên việc trước khi vào background, bạn nên lưu lại tất cả dữ liệu qua trọng của người dùng. Tận dụng cả quá trình chuyển sang background để lưu lại trạng thái ứng dụng.
* **Giải phóng dữ liệu nếu cần.** Giải phóng bất kì dữ liệu được cached mà bạn không cần đến. Ứng dụng với lưu lượng dữ liệu lớn sẽ bị ưu tiên buộc ngưng bởi hệ thống.
    
Hàm `applicationDidEnterBackground:` trong app delagate của bạn có khoảng 5s hoàn thành tất cả các task và trả về. Trên thực tế, hàm này nên được trả về càng sớm càng tốt. Nếu hàm này không trả về trước khi hết thời hạn, ứng dụng của bạn sẽ bị kill bởi hệ thống. Nếu bạn cần thêm thời gian để xử lí các task, hãy gọi hàm `beginBackgroundTaskWithExpirationHandler:` để yêu cầu thời gian xử lí dưới background và sau đó bắt đầu bất kì task mất thời gian nào trong một thread khác. Cho dù bạn có chạy bao nhiêu background task đi nữa thì hàm `applicationDidEnterBackground:` vẫn phải thoát trong 5s.
    
### Chu trình di chuyển vào background
    
 Khi người dùng bấm nút Home hoặc bấm nút Sleep/Wake, hoặc hệ thống khởi chạy một ứng dụng khác, ứng dụng sẽ từ foreground chuyển sang inactive và sau đó là trạng thái background. Những sự chuyển đổi này cũng sẽ gọi các hàm của app delegate: `applicationWillResignActive:` và `applicationDidEnterBackground:`.  Sau khi trả về từ hàm `applicationDidEnterBackground:`, đa số các ứng dụng sẽ chuyển về trạng thái suspended ít lâu sau. Những ứng dụng mà sẽ request background task (ví dụ như chơi nhạc) có thể sẽ tiếp tục chạy thêm một chút. 
    
![](https://images.viblo.asia/6dc58c75-3779-4c39-b010-3cf9d644f915.png)
    
### Chuẩn bị cho App Snapshot
    
Không lâu sau khi hàm `applicationDidEnterBackground:` trả về, hệ thống sẽ lấy một ảnh chụp màn hình từ cửa sổ của ứng dụng. Tương tự, khi ứng dụng thức dậy để thực thi background task, hệ thống có thể sẽ lấy một ảnh chụp màn hình. Ví dụ, khi ứng dụng thức dậy để thực hiện task download, hệ thống sẽ chụp ảnh màn hình để nắm bắt nhữngg sự thay đổi  đối với các item. Hệ thống dùng nhữung ảnh màn hình này để multitasking UI để hiển thị trạng thái ứng dụng.
    
Nếu bạn thay đổi view khi vào background, bạn có thể gọi hàm `snapshotViewAfterScreenUpdates:` của main view để bắt nhữung thay đổi đó được render ra. 
    
### Giảm thiểu các phần bộ nhớ

Mỗi ứng dụng nên giải phóng càng nhiều bộ nhớ càng tốt khi vào background, Hệ thống sẽ cố gắng giữ càng nhiều bộ nhớ ứng dụng cùng lúc càng tốt miễn là có thể. Nhưng nếu bị thiếu bọ nhớ, nó sẽ kill các app bị suspended để lấy lại phần bộ nhớ đó. Ứng dụng càng tiêu thụ nhiều phần bộ nhớ càng dễ bị ưu tiên tạm ngừng.
    
Ứng dụng cảu bạn cũng nên loại bỏ các strong references tới object ngay khi không cần thiết nữa. Bỏ đi các strong reference sẽ cho complier khả năng giải thoát cho các object ngay lập tức để phần bộ nhớ được lấy lại. Tuy nhiên nếu bạn muốn cache lại một vài object, bạn có thể chờ đến khi ứng dụng chuyển sang background trước khi bỏ reference tới chúng.
    
Dưới đây là một số ví dụ cho việc nên loại bỏ strong reference ngay khi không còn cần thiết:
* Object liên quan tới hình ảnh. 
* Các file media và dữ liệu lớn mà bạn có thể load lại sau.
* Bất kì object nào không còn cần thiết và có thể khởi tạo lại sau này.
    
Để giúp cho việc Giảm thiểu phần bộ nhớ, hệ thống sẽ tự động loại bỏ các dữ liệu chứa trong app khi app được đưa vào background.
* Hệ thống loạ bỏ các backing store của tất cả Core Animation layer. Việc này không loại hết layer của object khỏi bộ nhớ hay thay đổi tính chất của layer, chỉ ngăn cản nó xuất hiện trên màn hình.
* Loại bỏ bất thiết lập nào để cache ảnh.
* Loại bỏ Strong reference tới một số dữ liệu liên quan tới quản lí hệ thống được cache.
    
Cảm ơn mọi người đã theo dõi bài viết!