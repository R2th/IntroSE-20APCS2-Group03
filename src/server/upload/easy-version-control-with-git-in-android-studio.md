Như bạn đã biết, chúng ta nên luôn sử dụng `source control management (SCM)` cho các dự án kể cả là dự án cá nhân. Điều sẽ giúp ta chánh được nhiều phièn toái hay những rủi ro không đáng có trong quá trình phát triển. Bạn có biết rằng Android Studio có một sự tích hợp tuyệt vời với Git để quản lý kiểm soát source không? Nếu bạn không biết hoặc không có kinh nghiệm sử dụng nó, thì hãy tiếp tục đọc bài viết này. Ngay cả khi bạn đã sử dụng tích hợp Git của Android Studio, bạn vẫn có thể đạt được một số thủ thuật hữu ích trong bài viết này.

Tôi sẽ cho bạn thấy nhiều tính năng của Git được hỗ trợ trong Android Studio và cũng dễ dàng thực hiện các thao tác với Git khác nhau (commit, push, pull, branch, v.v.) từ bên trong Android Studio.

Trong bài viết này, tôi sẽ chỉ cho bạn các tính năng SCM có sẵn trong Android Studio. Chúng ta sẽ xem xét các lĩnh vực sau:
* Tích hợp git và một project mới trên Android studio
* Làm việc với GitHub hoặc Bitbucket
* Khám phá Version Control Window
* Commits
* Branches
* Pushing và  Pulling từ một  Remote Repository

Để có thể làm theo hướng dẫn này, bạn sẽ cần:
* Hiểu biết cơ bản về Git
* Android Studio 3.0 hoặc mới hơn

### 1. Tích hợp git và một project mới trên Android studio
Với một project mới, ta cần click vào `Import into Version Control` trong tab `VCS` sau đó chọn `Create Git Repository...`

![](https://images.viblo.asia/dba2a8da-7150-4163-9d15-c3aca4bc8b45.png)

Sau đó ta chọn thư mục gốc của project và nhấn `Ok`

![](https://images.viblo.asia/2c2c4b30-d99d-4014-bb05-0fa276de1a0d.png)

Khi ta nhấn nút `Ok`, ngay sau đó Git sẽ thực hiện lệnh `git init`

Một hộp thoại thông tin sẽ bật lên:

![](https://images.viblo.asia/48a05782-1733-4b39-8339-9074c67eab8c.png)

Điều này cho chúng ta biết về một tệp có tên vcs.xml trong thư mục .idea. Thư mục này chỉ chứa các cài đặt dành riêng cho dự án. Lưu ý rằng đây là định dạng được sử dụng bởi tất cả các phiên bản IntelliJ IDEA gần đây. 

Tốt nhất là các tệp trong `.idea/` nên thêm nó vào `.gitignore`.

Theo mặc định, chúng ta đã chuyển sang nhánh `master`. Bạn luôn có thể xem nhánh hiện tại của project ở góc dưới bên phải của Android Studio.

![](https://images.viblo.asia/b1b74d04-4767-419f-84e1-b30ae51a9bab.png)

### 2. Làm việc với GitHub hoặc Bitbucket
Bạn có thể dễ dàng làm việc với bất kỳ repository chứa source code Android nào trong tài khoản GitHub hoặc Bitbucket với Android Studio. Hãy để tôi chỉ cho bạn cách làm điều đó.

Navigate to File > New > Project from Version Control > GitHub. 

![](https://images.viblo.asia/9559da86-caa4-4c58-b7e9-e5eadf5ffb3e.png)

(Nếu bạn muộn làm việc với Bitbucket, hãy chọn nó. Trong trường hợp này tôi chọn Github)

Tiếp theo, nhập thông tin đăng nhập tài khoản GitHub của bạn và nhấp `Login`.

![](https://images.viblo.asia/a12da33a-4c5e-4886-81fd-c434828232ab.png)

Nếu đăng nhập thành công, hộp thoại `Clone Repository` sẽ bật lên. Hộp thoại này hiển thị select box chứa danh sách các repository trên GitHub mà bạn hiện đang sở hữu hoặc đã làm việc. Và công việc còn lại đợn giản là chọn và nhấn `Clone`

### 3. Version Control Window
Sau khi khởi tạo thành công project với Git, Android Studio sẽ hiển thị của sổ Version Control. Nhấp vào tab Version Control (ở phía dưới bên trái của Android Studio) và hãy khám phá những gì chúng ta có ở đó. Lưu ý rằng bạn có thể sử dụng Alt-9 để mở nhanh cửa sổ này.

![](https://images.viblo.asia/3afccc2d-5211-491c-9c45-db0538008278.png)

Trong cửa sổ này, chúng ta có ba tab khác nhau: Local Changes, Console và Log. 

**Local Changes**

Tab này cho thấy danh sách các file đã có sự thay đổi mà chưa được commit.

![](https://images.viblo.asia/3b1685c8-cf8f-403f-beb6-fa95ecc500cc.png)

**Console**

Trong tab này, chúng ta thấy kết quả của việc thực hiện các lệnh liên quan đến Git. Lưu ý rằng bạn không thể viết các lệnh Git bên trong tab này. Thay vào đó, hãy thực hiện điều đó trong cửa sổ terminal của Android Studio.

![](https://images.viblo.asia/a8db5b89-e07a-4eca-adae-a3d8215a4292.png)

**Log**

Tab này hiển thị tất cả các thay đổi đã được commit cho tất cả các nhánh của local và remote repository. Trong tab này, bạn có thể duyệt các commit đến từ bất kỳ chi nhánh nào.

### 4. Commits
Thay vì thực hiện lệnh `git add <file> || <directory>`. Ta có thể thao tác như sau và nhận được kết quả tương tự.

Chọn `Unversioned Files`  trong `Local Changes` tab. Click chuột phải và chọn Git > Add. Bạn cũng có thể sử dụng phím tắt `Control-Alt-A`.

![](https://images.viblo.asia/c56c441a-9985-4b37-8648-46b0060235fe.png)

Tiếp theo nhấn vào nút Commit Changes  và hộp thoại sau sẽ bật lên: 

![](https://images.viblo.asia/a18abeb1-0525-4674-bad8-8ba373e3826a.png)

Sau khi hoàn thành thông tin của commit. Ta nhấn nút `Commit` hoàn thành.

### 5. Branchs
Nhánh master là mặc định. Tuy nhiên, ta có thể phan nhánh từ master để thực hiện các công việc riêng. Khi hoàn thành thì có thể merge vào master.

Để tạo một nhánh từ master, ta chỉ cần chuột phải vào `Git: master`  và chọn `New Branch`.

![](https://images.viblo.asia/48abc14c-3547-46ef-8cc5-02c02c76f3b7.png)

Điền tên nhánh và nhấn `ok`. Thế là ta đã có một nhánh mới từ master. Thao tác này tương với lệnh `git checkout -b BranchName`. Ta cũng có thể sử dụng `VCS > Git > Branches > New Branch`. 

### 6. Pushing và  Pulling từ một  Remote Repository
Để thực hiện `pull` từ một remote repository. Ta chọn `VCS > Git > Pull`. Thao tác này tương đương với lệnh `git pull`

Để thực hiện `push` ta chọn `VCS > Git > Push... `. Sau đó thêm thông tin về remote repository và nhấn `push`. Thao tác này tương đương với lệnh ` git push`

### Tổng kết
Trên đây là hướng dẫn sử dụng một số các chức năng cơ bản của git được tích hợp trong Android Studio. Còn rất nhiều tính năng khác giúp cho developer có thể sử dụng và tiết kiệm thời gian khi phát triển một project với Android Studio.

 refer: https://code.tutsplus.com/tutorials/working-with-git-in-android-studio--cms-30514