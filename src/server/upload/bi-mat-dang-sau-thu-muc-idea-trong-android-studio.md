Cũng như rất nhiều developers khác, Tôi luôn thấy thư mục `.idea` của Android Studio là một hộp đen. Tôi biết nó tồn tại, tôi biết `.gitignore` có xử lý nó nhưng tôi muốn biết chính xác là thư mục nào và tệp nào được xử lý để có thể xử lý các tình huống conflicts với git khi nó xảy ra. Tôi muốn biết chính xác file nào có thể thêm vào `.gitignore` một cách an toàn, file nào không nên thêm vào.

Tôi quyết định chia sẻ kết quả mà tôi đã tìm được vì tôi không thấy tài liệu nào về nó cả.

* ❌ Biểu tượng này cho biết 1 path nên để trong `.gitignore`
* ❎ Biểu tượng cho biết path này đã được add vào trong `.gitignore` bởi Android Studio và bạn không nên giữ chúng trên git
* ✅ Biểu tượng cho biết bạn nên giữ path này trong git và nó được giữ lại bởi Android Studio

## ❌ assetWizardSettings.xml
File này lưu giữ cài đặt cho icon được thêm vào cuối cùng với Android Studio Wizard. Nó có thể được xóa khỏi git an toàn.
![](https://images.viblo.asia/2582b569-d495-4baa-88b7-b77bffd0049f.jpeg)

## ❌ caches
Bộ nhớ tạm thời, như tên của nó, có thể thêm nó vào `.gitignore`

## build_file_checksums.ser
Thực tế, file này là một đối tượng của [ProjectBuildFileChecksums](https://github.com/JetBrains/android/blob/master/android/src/com/android/tools/idea/gradle/project/ProjectBuildFileChecksums.java) được serialize
File này tồn tại để kiểm tra liệu rằng `build,gradle`, `setting.gradle`, `~/.gradle/gradle.properties`, `gradle.properties` hoặc `build.gradle` của một module đã được thay đổi.
Đây chính là file mà Android Studio sử dụng để nhắc bạn rằng bạn cần sync gradle

## ✅ codeStyles
Thư mục này chứa các cài đặt về code styles của project. Nó có thể được giữ lại trong git nếu bạn thay đổi các giá trị mặc định của code styles.

Ví dụ bạn thay đổi giá trị code style cho line break theo dạng Linux line break (để tránh các vấn đề về git). File của bạn sẽ như thế này:

```XML
<component name="ProjectCodeStyleConfiguration">
  <code_scheme name="Project" version="173">
    <option name="LINE_SEPARATOR" value="&#10;" />
  </code_scheme>
</component>
```
Buộc sử dụng Linux line breaks.

```XML
<component name="ProjectCodeStyleConfiguration">
  <state>
    <option name="USE_PER_PROJECT_SETTINGS" value="true" />
  </state>
</component>
```
Báo cho Android Studio rằng sử dụng code style riêng.

## ✅ dictionaries
Thư mục chứa các entry bạn đã thêm vào dictionary. Điều này liên quan đến việc inspection code, và dictionary có thể quan trọng nếu bạn giới hạn các rules trong hệ thống CI

## ❌ gradle.xml
Tôi khuyên bạn nên loại bỏ file này. Nó có thể chứa các đường dẫn local đến gradle và các đường dẫn đến các modules.

## ✅ inspectionProfiles
Thư mục chứa các Lint rules cho dự án. Giống như thư mục dictionary, nên giữ nó lại trên git.

## ❎ libraries
Thư mục chứa các files cho biết nơi các files jar của các thư viện được lưu trữ. Không nên giữ trên git vì mỗi user sẽ khác nhau.

## ✅ misc.xml
Chứa thông tin về dự án như Java version, project type ...
Các thông tin này là về dự án, không phải cho từng user vì vậy nó nên giữ lại trên git.

## ❎ modules.xml
File này chứa path tới các .iml của modules của bạn, tương tự như gradle.xml, không nên giữ lại trên git.

## ✅ navEditor.xml
Chứa vị trí các thành phần trong Navigation Editor

## ✅ runConfigurations.xml
Lưu giữ các cài đặt cho việc chạy dự án, bạn có thể thêm bằng cách nhấn Edit Configurations. Bạn hoàn toàn nên giữ file này.

![](https://images.viblo.asia/36cdb457-dda2-434f-a6c6-f9d2fd1d1996.png)

## ✅ vcs.xml
Chứa thông tin về hệ thống quản lý source code trong dự án. cho phép bạn sử dụng GUI để thực hiện các thao tác với git. Bạn hoàn toàn nên giữ file này.

## ❎ workspace.xml
File này chứa thông tin về workspace trên Android Studio, ví dụ vị trí con trỏ của bạn trên file được mở, ... nó là riêng cho mỗi user vì vậy chắc chắn nên loại bỏ khỏi git.

## Tóm tắt
Cuối cùng tôi gợi ý cho bạn chỉ cần thêm 2 dòng nữa vào file `.gitignore` có sẵn của Android Studio đó là:

```XML
/.idea/assetWizardSettings.xml
/.idea/gradle.xml
/.idea/caches
# Uncomment next line if keeping position of elements in Navigation Editor is not relevant for you
# /.idea/navEditor.xml
```

Như tôi đã nói lúc đầu, không có tài liệu nào nói về .idea cho nên bài viết này có thể chưa đầy đủ hoặc chưa chính xác. Bạn có thể gửi đóng góp nếu như bạn biết điều gì đó.

HẾT
[Nguồn](https://proandroiddev.com/deep-dive-into-idea-folder-in-android-studio-53f867cf7b70)