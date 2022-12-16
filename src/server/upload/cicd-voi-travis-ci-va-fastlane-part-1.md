# Giới thiệu.

Có lẽ bây giờ khái niệm CI/CD đã không còn quá xa lạ và được ứng dụng vào qui trình sản xuất phần mềm của nhiều công ty. Tuy nhiên mình thấy còn nhiều nhóm phát triển phần mềm vẫn chưa áp dụng vì thế hôm nay mình sẽ giới thiệu và CI/CD những tiện ích của chúng cho nhóm phát triển ứng dụng IOS với 2 công cụ miễn phí là Travis-CI và fastlane.

Nào giờ chúng ta hãy nêu ra bài toán thực tế tại sao chúng ta nên sử dụng CI/CD và nếu sau khi bạn nào đọc xong mà vẫn cảm thấy không cần thiết thì hãy ấn nút close để đóng cái tab này lại cho đỡ mất thời gian.


Không biết các bạn sinh viên bây giờ làm bài tập nhóm thế nào có chia module, mỗi người code một phần rồi ghép lại qua công cụ quản lý code hay không ? Hay là tạo một nhóm rồi mỗi người code một bài tập lớn cho một môn học :). Ngày xưa hồi mình học năm thứ 3, nhóm mình có 5 người và chia nhau code phần mềm quản lý cho một công ty gồm : quản lý nhân sự, tính lương, tuyển dụng,.. và khi đó thì chưa đứa nào biết git là gì cả, chỉ chia ra mỗi đứa một phần code rồi đến gần hôm bảo vệ thì tập trung ghép code.

![](https://images.viblo.asia/050c0fcd-0ae2-41af-993a-de20eaf4178c.jpg)

Mất hơn một ngày để có thể ghép đống shit đó lại với nhau (tất nhiên là copy của từng đứa một) Mãi tới năm thứ 4, lúc bắt đầu đi thực tập, khi đó mình mới biết tới git thần thánh.

Sau khi biết tới git, code trở nên chuyên nghiệp hơn, nhóm có nhiều người hơn, mỗi lần code xong bạn phải tạo new branch, new pull, check conflict,.. rồi chờ mọi người vào review code trước khi được phép merge. Tuy nhiên người review code cũng chỉ là đọc code check logic nên không thể biết là code đó có chạy ổn không có ảnh hưởng tới phần khác không, hơn nữa là con người dù cẩn thận mấy nhiều khi vẫn xảy ra sai sót, hay deadline dí sát đít nên review qua loa và nghiêm trọng hơn nữa là do người tạo pull quên không build, test thử trước dẫn đến lúc người khác pull code về build bị lỗi,... và nếu nhiều người cùng merge code thì sẽ rất mất công tìm vết xem lỗi ở đâu và do ai.

Tiếp đến mỗi lần cần build cho tester hoặc khách hàng lại mất rất nhiều thời gian, ngày xưa hồi còn code objective-c mình thấy việc build còn khá là nhanh nhưng từ hồi code swift mỗi lần build phải chờ đến cả nửa giờ hoặc hơn. Một ngày chỉ cần chờ mọi người merge code build 3 bản cho tester là chẳng còn cảm hứng ngồi code nữa. Nhất là khi hẹn về đón gấu thì khách hàng gửi cái request build cho tao một bản thì đúng là tiến thoái lưỡng nan.


Túm lại vấn đề là chúng ta mất nhiều thời gian cho việc tích hợp code của mọi người mà vẫn không đảm bảo được code đó là chạy đúng và và thoả mãn hết các test case. Chúng ta cũng mất rất nhiều thời gian vào việc build, một công việc rất nhàm chán chưa kể đôi khi bạn quên thứ này quên thứ kia phải ngồi build lại hay nhầm lẫn bản build để rồi ăn tổng sỉ vả và thường thì lúc nào cũng sẽ chỉ có một người chịu trận và nếu không may bạn là người đó thì bạn cũng thấu hiểu cảm giác ấy chứ.

Nếu bạn không muốn gặp phiền phức về các vấn đề trên thì sau đây mình sẽ giới thiệu về CI/CD và triển khai chúng với 2 công cụ Travis-CI và fastlane.

# CI/CD là gì ?

### CI(Continuous integration)

![](https://images.viblo.asia/1c6d3d86-6ce8-4706-8793-53d661b911b0.png)

Dịch theo tiếng việt CI là tích hợp liên tục nghĩa là mỗi dự án của bạn sẽ lặp đi lặp lại một qui trình 

- Khi một member commit code, git sẽ thông báo để hệ thống CI biết.
- CI sẽ chạy đoạn script mà bạn đã cấu hình sẵn ví dụ như build, chạy test case.
- Sau khi chạy xong script thì CI sẽ gửi thông báo cho tất cả member trong team kêt quả qua email, tool chat nào đó và mọi người đều xem được và nếu xảy ra lỗi member kia phải fix và commit lại

Túm lại là nó đảm bảo cho mọi code được đẩy lên không gây ra lỗi gì ảnh hưởng tới hệ thống hiện tại.

### CD (Continuous delivery)


Dịch theo tiếng việt CD là chuyển giao liên tục nghĩa là trong dự án của bạn việc deploy luôn sẵn sàng tại mọi thời điểm, code của bạn sẽ được luôn được kiểm theo các test case trước khi build ra file .ipa.

# Travis-CI

Travis-ci là một dự án mã nguồn mở, được xây dựng đầy đủ các tính năng CI, giúp chúng ta dễ dàng test và deploy các dự án được lưu trữ trên GitHub
Nó gồm có 2 nhánh dành riêng cho các public project(miễn phí) trên GitHub là travis-ci.org và private project(trả phí) là travis-ci.com.

Mô hình hoạt động của Travis-ci diễn ra như sau :

![](https://images.viblo.asia/73bd7ca9-e22f-4d0d-9681-0ad219f748be.png)

- Devloper sẽ push code lên github
- Thông qua webhooks, Travis-ci sẽ biết được có code mới được commit, nó sẽ pull code đó về
- Dựa vào file cấu hình .travis.ym travis sẽ tiến hành chạy và thông báo trở ngược lại cho người dùng.


Okay, lý thuyết vậy là đủ rồi, giờ sẽ tiến hành làm thử xem thế nào.


Bước 1, bạn tạo một public repo trên github sau đó tạo một Xcode project và push code đó lên như bình thường.

Bước 2, bạn hãy truy cập trang travis-ci.org và đăng ký lấy cho mình một cái tài khoản free, trong quá trình đăng ký, travis sẽ yêu cầu bạn đồng bộ với github, sau hoàn thành thì được cái trang như phía dưới đây. Việc của bạn bây giờ là bật project mà bạn muốn tích hợp CI bằng cách gạt nút từ màu xám thành màu xanh là được.
![](https://images.viblo.asia/f5becf62-f47d-4d85-83d7-71a13c47e80a.png)

Bước 3, bây giờ hãy quay trở lại Github -> Repo -> Setting -> Integrations & services. Bạn nhìn thấy travis CI đã được thêm vào, click vào nó đến trang Services / Manage Travis CI, click vào Test serivice, Sau đó bạn sẽ thấy thông báo "Okay, the test payload is on its way" . vậy là CI đã kết nối thành công với Github

![](https://images.viblo.asia/6b29a77e-a001-4cf5-b0eb-bd3a5b9d0293.png)

Bước 4, Xong với Github, giờ chỉ còn lại việc cấu hình để Travis hiểu chúng ta muốn làm những việc gì với code. Bạn chuyển đến thư mục project (ở đây project mình vừa tạo là PhotoMemories) và làm theo các bước sau : 


> Tạo file .travis.ym

```
Touch .travis.ym
```

> Sau đó, mở file 
```
Open -e .travis.ym
```

> Thêm đoạn mã sau : 

```
language: objective-c
xcode_workspace: PhotoMemories.xcworkspace # path to your xcodeproj folder
xcode_scheme: PhotoMemories
xcode_sdk: iphonesimulator11.3
osx_image: xcode9.4

script:
  - xcodebuild clean build -sdk iphonesimulator -workspace PhotoMemories.xcworkspace -scheme PhotoMemories CODE_SIGNING_REQUIRED=NO
```

Okay, để mình giải thích đoạn mã trên một chút.

Travis hỗ trợ hơn 20 ngôn ngữ, vì thế bạn cần khai báo language cho nó, với IOS dù code bằng objective-c hay swift thì bạn cũng đều sử dụng khai báo là "objective-c".


Tiếp theo là khai báo project, ở đây mình khai báo là xcode_workspace bởi vì mình có sử dụng cocoapods nên sẽ khai báo xcode_workspace, còn trong trường hợp không sử dụng thì bạn khai báo là "xcode_project: PhotoMemories.xcodeproj", như thế travis sẽ hiểu là chạy chương trình của bạn từ đâu.


Tiếp nữa bạn cần khai báo xcode_scheme, trong một dự án chắc chắn các bạn sẽ có rất nhiều các scheme khác nhau để cấu hình cho việc build test, staging hay production,... bạn sẽ cần khai báo để travis có thể hiểu được. Và nhớ một điều nữa là scheme bạn cần phải setup ở chế độ shared (bạn nào chưa biết thì có thể tra google, mục đích của việc này là bởi vì khi tạo một scheme mà bạn chưa shared thì push nó sẽ không push cùng code của bạn mà chỉ ở local thôi).

Tiếp nữa khai báo xcode_sdk và osx_image, 2 cái này bạn có thể vào trang travis để tìm hiểu thêm về các loại mà nó hỗ trợ.

Cuối cùng là script, script này sẽ chứa tất cả kịch bản mà bạn muốn Travis thực hiện. Nếu bạn không khai báo script thì mặc định travis sẽ chỉ build project của bạn theo cấu hình trên mà không làm gì nữa. Ở đây bạn có thể viết các đoạn script để Travis thực hiện clean, test, send message ,...
Lưu ý một chút trong trường hơp bạn bỏ script trên thì khi bạn chạy travis sẽ báo build lỗi, bạn hãy thử bỏ script và chạy thử sẽ thấy bởi vì mặc định travis sử dụng xctool để build (bạn có thể google để tìm hiểu thêm vì sao xctool lại lỗi). Trên đoạn mã trên mình sử dung xcodebuild để build, trước khi build thì clean và setup không cần code-signing bởi vì chỉ cần build để chạy trên máy ảo.

(bạn có thể tìm hiểu thêm ở đây https://docs.travis-ci.com/user/getting-started/)

Bước 5: Giờ bạn chỉ còn 1 công việc cuối cùng nữa thôi, tạo new branch, commit và push thử lên xem sao.
Sau khi push code, bạn quay về Github và tạo pull mới, tiếp đến nhâm nhi cốc cafe, travis sẽ tự động check giúp bạn xem code có vấn đề gì không.

![](https://images.viblo.asia/9ebc2275-4dd0-413b-a0f7-bffa37709872.png)


Và đây là thành quả của mình, All checks have passed.

![](https://images.viblo.asia/5ede53ef-6904-4131-9f2b-6c4b802f5086.png)


# Kết luận

Như vậy ở phần 1 này mình đã giới thiệu về CI/CD hướng dẫn các bạn cách cài đặt Travis-ci cho project. 

Trong phần 2 mình sẽ hướng dẫn các bạn cách cài đặt fastlane. Đây là một công cụ sẽ giúp bạn có thể cài đặt chạy testcase, tự động build file .ipa và gửi link qua hockey, sau đó link hockey sẽ được gửi tới group chat nào đó như Slack, Chatwork, ...

Cảm ơn các bạn đã theo dõi.