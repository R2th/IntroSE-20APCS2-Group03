Vòng đời của 1 ứng dụng khá là quan trọng đối với các bạn developer - những người luôn muốn mang tới các trải nghiệm, phong phú, đa dạng và tốt nhất cho người dùng.

![](https://images.viblo.asia/0bb61459-5b15-49c9-abb0-ab32f448b076.jpeg)

## Từ viết tắt và giải thích
Trong bài có một số thuật ngữ thật sự dịch ra tiếng Việt sẽ rất khó hiểu nên mình xin phép giữ nguyên 1 vài thuật ngữ để các bạn dễ hiểu. :v dù gì code và làm việc cũng dùng tiếng anh và đụng tới chúng mà :D 

1 số từ viết tắt trong bài:

+ App --- Application --- Ứng dụng
+ OS --- Operation system --- hệ điều hành
+ Springboard:  Ứng dụng tiêu chuẩn quản lý màn hình chính của iOS trong hệ điều hành iOS

## Vậy thì app khởi động như thế nào?


Khi user mở điện thoại của mình lên thì không có ứng dụng nào chạy cã ngoài những thứ nằm trong OS. App của bạn cũng sẽ không chạy. Sau khi user nhấn vào icon của app, Springboard sẽ kích hoạt app của bạn. App cùng với các thư viện của nó sẽ được thực thi và được tải vào bộ nhớ, trong khi đó thì Springboard sẽ nhận nhiệm vụ  hiển thị màn hình launch screen của app. Sau cùng thì app của bạn bắt đầu được chạy và application delegate sẽ nhận được các notification
![](https://images.viblo.asia/9534fd71-b77c-4f2b-9623-aa1bdb76b33e.gif)

Các iOS app chạy trên các thiết bị đều có các trạng thái chuyển đổi như: `Not running, In active, Active, Background, Suspended`. Tại bất kì thời điểm nào, app của bạn đều rơi vào các trạng thái trên.

> The iOS operating system manages the application states, but the app is responsible for handling user-experience through these state transitions.


+ **Not running** --- App của bạn chưa được chạy hoặc là đang chạy nhưng đã bị hệ thống chấm dứt kết nối (terminated)
+ **In active** --- App đang chạy ở Foreground nhưng không nhận bất kì sự kiện tương tác nào. Nó có thể xảy ra trong trường hợp có cuộc gọi hoặc có tin nhắn tới. App còn có thể ở trạng thái này khi bạn đang trong quá trình chuyển đổi qua các trạng thái khác và chúng ta không thể tương tác bất kì sự kiện nào với UI của app.
+ **Active** --- App đang chạy trên Foreground và nhận các sự kiện tương tác. Đây là một trạng thái bình thường của Foreground apps. Cách duy nhất để để đi tới (hoặc đi từ) trạng thái Active là qua trạng thái Inactive. User thường tương tác với UI 1 cách dễ dàng.
+ **Background** --- App chạy dưới background và vẫn thực thi code. Các ứng dụng mới chạy sẽ lập tức đi qua trạng thái `In-Active` và sau đó là `Active`. App nếu như bị đình chỉ(suspended) sẽ quay về trạng thái `Background` sau đó chuyển sang trạng thái `In-Active` -> `Active`. Ngoài ra, app được khởi chạy trực tiếp vào background sẽ chuyển sang trạng thái này thay vì trạng thái `In-Active`.
+ **Suspended** --- App chạy dưới background nhưng **không** thực thi code. Hệ thống sẽ tự động chuyển trạng thái của app sang trạng thái và không báo cho chúng ta biết trước. Trong trường hợp thiếu bộ nhớ, hệ thống sẽ lọc và tắt các ứng dụng đang trong trạng thái `Suspended` để tạo không gian trống cho các ứng dụng khác. Thông thường sau 5s ở dưới background, app sẽ chuyển trạng thái sang `Suspended` nhưng chúng ta có thể nới rộng thời gian ấy ra nếu như muốn.

-----
UIApplication object của Apple định nghĩa cho chúng ta các methods được gọi và phản hồi cho các trạng thái trên. Thật ra thì chúng khá là quan trọng đấy nhé! Chúng góp phần giúp chúng ta có thể làm việc với sự thay đổi của các trạng thái trong apps. (như notification chẳng hạn). Cùng xem nào:
![](https://images.viblo.asia/502f24ed-4b1b-45f2-ad76-04670c00e4f8.jpeg)
Ngay khi app bắt đầu được khởi chạy thì sẽ theo các bước sau đây:

+ **application:willFinishLaunchingWithOptions** --- Method này sẽ được gọi sau khi app của bạn đã khởi chạy thành công. Đây là method đầu tiên được gọi trong AppDelegate. Bạn có thể thực thi code trong hàm này khi việc khởi chạy đã hoàn thành.
+ **application:didFinishLaunchingWithOptions** --- Method này được gọi trước khi window của app được hiển thị. Bạn có thể hoàn thiện giao diện của mình và cung cấp root viewcontroller cho window.
+ **applicationDidBecomeActive** --- Method này được gọi để báo cho app của bạn biết khi nó chuyển trạng thái từ `In-Active ` sang `Active`hoặc hệ thống và user khơi động app hoặc trong trường hợp user bỏ quan các gián đoạn làm app ngay lập tức chuyển sang `In-Active `(như là huỷ cuộc gọi hoặc tin nhắn). Bạn nên dùng method này để chạy lại các tác vụ đang bị dừng(hoặc chưa chạy) khi app bắt đầu chạy lại.
+ **applicationWillResignActive**  --- Method này được gọi để báo cho app biết rằng nó sắp chuyển từ trạng thái  `Active` sang `In-Active ` . Nó xãy ra khi trường hợp bị gián đoạn (có cuộc gọi tới hoặc SMS hoặc báo thức) hay là khi user tắt app đi. Bạn nên dùng method này để dừng các task đang chạy hoặc vô hiệu hoá timer trong app, hoặc nhiều thứ khác :D.
+ **applicationDidEnterBackground**  --- Method này được gọi để báo cho app biết nó đang không chạy ở dưới foreground. Bạn có khoảng tầm 5 giây để thực thi các task . Trong trường hợp bạn muốn có nhiều thời gian hơn để xử lý, bạn có thể yêu cầu hệ thống cấp cho thời gian thực thi bằng cách gọi hàm [**beginBackgroundTask(expirationHandler:)**](https://developer.apple.com/documentation/uikit/uiapplication/1623031-beginbackgroundtask) . Nếu như method của bạn không được thực thi và trả về trước thời gian hết hạn thì app sẽ bị hệ thống chấm dứt và xoá khỏi bộ nhớ.
+ **applicationWillEnterForeground** --- Method này được gọi như là 1 phần trong việc chuyển trạng thái từ `Background` sang `Active`. Bạn nên dùng method này để hoàn thành các thay đổi đối với app trước khi nó xuống Background. **applicationDidBecomeActive** sẽ được gọi ngay khi method này đã hoàn thành việc chuyển trạng thái của app từ `In-Active ` sang `Active`.
+ **applicationWillTerminate**  --- Method này được gọi khi app của bạn sắp bị hệ thống khai tử khỏi bộ nhớ. Bạn nên dùng method này để thực thi các tác vụ dọn dẹp. Bạn có tầm khoảng 5 giây để thực thi tác vụ. Nếu hàm của bạn không trả về trước thời gian hết hạn, hệ thống sẽ tự động khai tử app kèm cã task đang thực thi của bạn khỏi bộ nhớ. Method này cũng được gọi trong trường hợp app đang chạy ở dưới background( không bị suspended) nhưng hệ thống lại cần phải huỷ nó vì vài lí do gì đó. Bạn không nên đợi **applicationWillTerminate** được gọi rồi mới lưu lại data. Trong 1 vài trường hợp hi hữu, 
**applicationWillTerminate** sẽ không được gọi trước khi app bị khai tử (Vd như trong trường hợp máy của bạn reboot lại thì method này sẽ không được gọi).



-----

Bài viết này được mình tham khảo và dịch lại tại đây: [The iOS Application Lifecycle
](https://hackernoon.com/application-life-cycle-in-ios-12b6ba6af78b)
Mong bài viết sẽ hữu ích và giúp các bạn ^^