# I. Giới thiệu
Chắc hẳn tại thời điểm hiện tại, hầu hết ai trong giới lập trình viên chúng ta cũng đã từng và đang sử dụng Github. Các lợi ích mà Github và git mang lại cho chúng ta như quản lý code, quản lý các version của code,... đã biến Git thành một phần không thể thiếu của lập trình viên.

Nhiều bạn có thể nhầm lẫn rằng Github là Git, GitHub và Git là một, nhưng thật ra đây là 2 khái niệm khác nhau:
 * Git là một hệ thống kiểm soát version, và được chạy local trên máy tính của chúng ta
 * GitHub là một dịch vụ trực tuyến cho phép chúng ta lưu trữ git repository trên cloud, nó là một dạng cloud lưu trữ

Bằng việc sử dụng kết hợp Git và GitHub, chúng ta có một nơi tuyệt vời để lưu trữ code, chia sẻ code với các lập trình viên khác. Apple tất nhiên là nhận ra được những lợi ích tuyệt vời của Github và Git đối với lập trình viên, vì vậy họ đã tích hợp khá đầy đủ các tính năng của Git vào Xcode, và với mỗi version cập nhật của Xcode, chúng ta thấy Git lại được tích hợp nhiều tool hơn. Bằng Xcode, chúng ta có thể sử dụng Git mà không phải viết các câu lệnh Git trên Terminal nữa. Dưới đây, tôi sẽ giới thiệu đến các bạn cách sử dụng git trên Xcode 9

# II. Nội dung

Trong bài viết này, tôi sẽ không trình bày đến những khái niệm quen thuộc của Git như Git làm việc như thế nào, các state của Git ra làm sao, git add, git commit, git push là lệnh gì,… Nếu các bạn chưa từng sử dụng Git, chưa có khái niệm về các câu lệnh như trên, thì các bạn có thể tìm hiểu về Git tại đây[https://git-scm.com/doc]

Chúng ta sẽ thông qua ví dụ thực tế để tìm hiểu về việc sử dụng Git trong Xcode. Vì bài viết này tập chung vào Git, nên chúng ta sẽ chỉ tạo một project hết sức đơn giản để minh hoạ cho các tính năng của Git trong Xcode.

Trong bài viết này, tôi sử dụng cụ thể là Xcode 9, vì vậy có thể sẽ có một vài tính năng chưa được tích hợp tại các bản Xcode thấp hơn. Các bạn nên sử dụng Xcode 9 trong tutorial này.

## 1. Tạo project

Các bạn mở Xcode, tạo 1 project với tên là GitTutorial -> Next. Các bạn có thể thấy ngay tại bước này Xcode đã cho chúng ta lựa chọn tạo Git repository cho project chúng ta đang tạo. Các bạn tích vào tuỳ trọn này và tạo project.

![](https://images.viblo.asia/e2bbaec2-f790-43b9-943d-fd13a9b3af33.png)

Đối với các bạn đã tạo project từ trước, mà trong khi tạo lại chưa tích vào tuỳ chọn tạo Git repository cho project, thì các bạn có thể vào Source Control -> Create Git Repositories… để tạo.

![](https://images.viblo.asia/7943da11-b646-475f-b7a1-e9e8344d9b48.png)

## 2. Git commit

Đầu tiên, chúng ta sẽ tạo một vài thay đổi nhỏ trong ViewController.swift. Các bạn vào ViewController.swift và sửa hàm viewDidLoad() như sau:
```swift
    override func viewDidLoad() {
        super.viewDidLoad()
        
        print("Git Tutorial")
    }
```
Sau khi sửa file ViewController.swift, nhìn vào Project navigator. các bạn có thể thấy bên cạnh file ViewController.swift xuất hiện chữ M, biểu thị rằng file này đã được thay đổi.

![](https://images.viblo.asia/421ae19b-6146-4265-a11b-d1f3a8ba1a67.png)

Để xem được cụ thể file của chúng ta đã thay đổi những gì, các bạn có thể chọn "Show the Version editor" để hiển thị tất cả các thay đổi của file ViewController.swift so với bản commit mới nhất như hình sau

![](https://images.viblo.asia/a848f00e-2a0d-4273-8995-1f5d5c1ec608.png)

Như trong hình trên, chúng ta thấy file ViewController.swift có một sự thay đổi, với bên trái là bên file sau khi thay đổi, còn bên phải là bên file trước khi thay đổi. Phần được tô màu cam ở 2 bên là các phần đã bị biến mất/được thêm vào khi file thay đổi.

Bằng cách sử dụng Version editor, chúng ta có thể có được cái nhìn rất trực quan về việc thay đổi code. Đôi khi việc kiểm tra này có thể giúp chúng ta tiết kiệm được rất nhiều thời gian để kiểm tra các đoạn code được thêm vào project trước khi commit code.

Sau khi kiểm tra hết các code cần commit, giờ là lúc chúng ta commit code lên repository. Các bạn vào Source Control -> Commit, một bảng như sau sẽ xuất hiện:

![](https://images.viblo.asia/a06535fe-22c4-41ed-b558-9feacec89e1f.png)

Như trong ảnh chúng ta thấy, có 3 vùng chúng ta cần để ý:
* Vùng 1: các file đã được chỉnh sửa sẽ xuất hiện ở đây. Bình thường khi sử dụng Terminal để commit code, chúng ta phải sử dụng git add để thêm các file chúng ta muốn commit, rồi sau đó mới commit. Tuy nhiên khi sử dụng Xcode để commit, chúng ta sẽ lựa chọn tích/bỏ tích các file trong vùng này, khi chúng ta bấm vào nút commit bên dưới, các file được tích sẽ được add và commit lên repository
* Vùng 2: Đây là vùng để chúng ta xem lại sự thay đổi của code trong các file chúng ta đã thay đổi. Chúng ta có thể kiểm tra lại code ở chỗ này, rất tiện lợi và trực quan
* Vùng 3: Đây là vùng để viết message khi commit. Bình thường khi dùng Terminal, các bạn sẽ phải gõ lệnh git commit -m "message here" để commit code kèm theo message. Message chúng ta gõ trong lệnh được viết tại vùng 3 này. Các bạn nên nhớ rằng message khi commit càng rõ ràng, ý nghĩa bao nhiêu thì sau này khi lục lại code, nhìn vào các message chúng ta có thể nhớ và tìm lại code càng dễ dàng bấy nhiêu

## 3. Tạo branch

Đầu tiên, các bạn vào Source Control Navigator, các bạn có thể thấy như hình sau

![](https://images.viblo.asia/dd4ba782-a964-4130-be4b-e084df7178b1.png)

Trong hình trên:
* Phía bên trái, chúng ta có danh sách các Branchs, Tags, Remotes, ở đây chúng ta đang ở branch master (current branch)
* Phía bên phải chúng ta có danh sách các commit của branch master, ở đây chúng ta đã tạo 2 commit, 1 commit Xcode tự tạo khi chúng ta tạo project, và 1 commit ở bên trên chúng ta thực hiện việc commit code

Để tạo branch mới, chúng ta chuột phải vào branch master, chọn Branch from "master"... đặt tên branch mới là develop và bấm create để tạo. Khi tạo xong branch develop, danh sách của chúng ta sẽ có thêm branch develop, và branch hiện tại sẽ được trỏ sang develop như hình sau

![](https://images.viblo.asia/3ed2c42f-4002-4b92-80e9-2d6df8d1718e.png)

Sau khi có branch develop, chúng ta sẽ thêm code và tạo commit mới cho branch này. Các bạn thay đổi code trong hàm viewDidLoad() của file ViewController.swift như sau:
```swift
    override func viewDidLoad() {
        super.viewDidLoad()
        
        print("Git Tutorial")
        print("Hi there, this is branch develop")
    }
```

Sau đó commit như phần bên trên với commit message "commit to branch develop". Sau khi commit, chúng ta kiểm tra branch develop sẽ có kết quả như hình sau:

![](https://images.viblo.asia/79f2757b-f892-4333-86e5-13faba4faa8a.png)

Như trong hình chúng ta thấy, commit với nội dung "commit to branch develop" đã xuất hiện trong branch develop. để ý các commit, chúng ta thấy branch develop đang ở bên trên branch master, điều này có nghĩa code trên branch master là cũ hơn trên branch develop. Bây giờ chúng ta sẽ thực hiện việc merge code từ branch develop về branch master.

Để thực hiện merge branch develop vào master, các bạn chuột phải vào branch master, chọn Merge "develop" into "master"... như hình sau

![](https://images.viblo.asia/f3e5d468-a064-450a-a5a5-4893af974ca9.png)

Khi chọn merge develop vào master, một cửa sổ hiện ra để chúng ta confirm các file thay đổi, các dòng code sẽ thêm vào branch master, chúng ta bấm nút merge để thực hiện việc merge branch

## 4. Push code lên GitHub

Để push code lên GitHub, chúng ta cần cung cấp GitHub account cho Xcode. Các bạn vào mục Account trong Xcode Preferences, thêm GitHub account, và đăng nhập với username và password GitHub của các bạn.

Sau khi đăng nhập GitHub, các bạn vào mục Remotes của Source Control Navigator, chuột phải vào mục Remotes và chọn Create "GitTutorial" Remote on GitHub... để tạo 1 remote trên GitHub

![](https://images.viblo.asia/97d4ddc5-dac4-4f60-b6d4-b7676a3f78b2.png)

Khi tạo remote, các bạn điền Repository name cho tên Git repository và Remote name cho tên của remote sẽ tạo trên GitHub. Các bạn đặt tên cho Git repository là GitTutorial và Remote là origin và bấm create tạo Remote. Sau bước này, Xcode sẽ tạo cho chúng ta 1 repository với tên GitTutorial trên GitHub, gán repository này cho remote tên origin, và toàn bộ code đã commit của chúng ta sẽ được đẩy lên repository trên GitHub.

Ok, giờ chúng ta đang ở branch master, chúng ta sẽ thêm 1 commit nữa vào branch này để thực hiện việc đẩy commit này lên remote. Các bạn lại thực hiện các bước commit như bên trên với code trong viewDidLoad() sau:
```swift
    override func viewDidLoad() {
        super.viewDidLoad()
        
        print("Git Tutorial")
        print("Hi there, this is branch develop")
        print("Hello, this is commit to remote")
    }
```

Sau khi thực hiện các bước như bên trên để commit, branch master của chúng ta đã có commit mới hơn commit trên origin/master.
Để push commit này lên origin/master, các bạn vào Source Control->Push... Một bảng sẽ hiện ra cho chúng ta lựa chọn nơi để push code lên như hình

![](https://images.viblo.asia/3269a9f2-01f0-49cd-868e-04f1ca7659b3.png)

Các bạn chọn origin/master và bấm push để push code lên GitHub

Vậy là quá trình push code lên GitHub đã hoàn tất. Việc pull code từ GitHub về cũng tương tự, chúng ta vào Source Control->Pull... và chọn remote để pull code về máy.

# III. Kết luận

Trên đây tôi đã giới thiệu đến các bạn cách sử dụng Xcode như một tool để làm việc với Git mà không cần phải sử dụng Terminal. Làm việc với Git trong Xcode trong nhiều trường hợp có thể giúp ích chúng ta rất nhiều, giảm thiểu thời gian phải bỏ ra để làm việc với Git. Làm việc với Git trên Xcode cũng đơn giản hơn rất nhiều, chúng ta không cần phải sử dụng các câu lệnh phức tạp của Git. Tuy nhiên, các bạn chỉ nên sử dụng các tool trên Xcode để commit/push/pull code khi đã nắm rõ các khái niệm, cơ chế hoạt động của Git, không nên chủ quan, dựa dẫm vào tool mà không thèm để ý đến cách mà Git hoạt động để tránh gặp các tình huống mất code/conflict code không đáng có.

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^!