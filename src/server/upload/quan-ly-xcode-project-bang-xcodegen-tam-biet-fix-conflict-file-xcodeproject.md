### What is the problem with xcodeprojects?
Xcode code quản lý file bằng file **.xcodeproj**, file này biết về toàn bộ source và resource và thông tin cài đặt cần thiết cần thiết cho để phục vụ cho việc lập trình cho ứng dụng iOS. Sau một thời gian dài sử dụng thì quản lý file **.xcodeproj** cũng xuất hiện các vấn đề của riêng nó:
* Chúng ta thường xuyên bị conflict file này khi làm project với team, cứ 2 bên thêm hoặc xóa file vào project, là ngay lập tức xuất hiện conflict khi chúng ta merge code từ branch khác và việc này chúng ta thường phải fix bằng tay, đôi khi không cẩn thận, việc fix không đúng cách lại làm hỏng luôn cả file .xcodeproj mà không biết phải fix như thế nào để cho thể chạy lại. (Thường thì revert lại rồi tự add file mới vào lại thôi)
* Quản lý code một cách kĩ lưỡng và đồng bộ, chúng ta thường đồng bộ cách sắp xếp file trong file .xcodeproj và folder thực bên ngoài cho thật giống nhau (cũng không tốn thời gian lắm nhưng vẫn là việc nên phải làm). 
* Xcode không hề báo việc bị thiếu file (file .xcodeproj có biết file đó nhưng file đó đã bị xóa) cho tới khi bạn compile source thì nó mới báo mà thường thời gian compile khá là lâu rồi mới báo.

### Introducing Xcodegen
[Xcodegen](https://github.com/yonaskolb/XcodeGen) đơn giản là 1 tool general file **.xcodeproj** theo một số rule được định sẳn dựa vào các file trong folder thực của project. Bạn có thể cài rule theo bất cứ cách nào bạn muốn trong file **project.yml** và bạn chỉ cần thêm file **xcodeproj** vào **gitignore** để đở phải đau đầu về việc conflict file này nửa của các source từ branch khác nửa.

Xcodegen có 2 chức năng chính:
* Bạn có thể định nghĩa tất cả target của Xcode (application, framework, etc cho tất cả các platform (iOS, tvOS, macOS, watchOS).
* Nó cũng chó phép connect source theo các target của project, dễ dàng phân định source code được giữ bởi target nào trong project.

XCodegen vẫn còn là một tool mới và còn đang được phát triển thêm nhưng nó vẫn đã làm được phát nhiều thứ rồi.

### How to install xcodegen
Đơn giản chúng ta cần cài thêm vào máy bằng cách dùng brew trên terminal:
```
brew install xcodegen
```
Hoặc một vài cách cài đặt khác thì bạn có thể xem tại đây: **[Xcodegen](https://github.com/yonaskolb/XcodeGen)**

### Generating an App Project
Đầu tiên, chúng ta chỉ cần tạo project bằng Xcode như mọi project mà chúng ta thường tạo để nó tạo sẳn cho ta các file cần thiết ban đầu.
Sau đó chúng ta tạo thêm file **project.yml** bằng text editer (ở đây mình dùng visual studio)
```
name: XcodegenApp # The name of the App
options: # Some general settings for the project
  createIntermediateGroups: true # If the folders are nested, also nest the groups in Xcode
  indentWidth: 2 # indent by 2 spaces
  tabWidth: 2 # a tab is 2 spaces
  bundleIdPrefix: "de.number42"
targets: # The List of our targets
  XcodegenApp:
    type: application
    platform: iOS
    deploymentTarget: "10.3"
    sources:
      #Sources
      - path: XcodegenApp
```
![](https://www.number42.de/blog/articles/2018-07-24-xcodegen/assets/projectyml.png)

Bạn có thể backup file .xcodeproj cũ lại để phòng ngừa hoặc xóa luôn cũng được.
và chạy lệnh xcodegen tại folder của project trong terminal. Xcodegen sẻ tạo cho bạn một file .xcodeproj mới hoàn toàn toàn dự theo configure và các file có sẳn trong folder. Như vậy chúng ta đã có tool tự động gen ra file .xcodeproj rồi, không cần thiết phải lưu file .xproject trên git làm gì để nó bị conflict khi merge code hoặc tạo pull request.

### Where to go from here?
Đây chỉ là nhưng configure đơn giản nhất, ngoài ta bạn có thể xem thêm configure về các target Unit Test, UITest, hoặc các build scheme để phân định môi trường thêm tại trang github của [xcodegen](https://github.com/yonaskolb/XcodeGen)

Đây chỉ là một trick đơn giản để chúng ta có thể tăng tốc độ phát triển dự án iOS, đở gặp các vấn đề vặt vảnh làm chậm tốc độ của chúng ta. Ngoài ra khi tự tay configure project thì bạn sẽ hiểu rõ hơn về cấu trúc project của mình hơn là để cho xcode làm hết sẳn, gặp lỗi lại lên stackoverflow xem các fix file .xcodeproj mà không hiểu nó có tác dụng làm gì (làm cho chạy được cái đã).