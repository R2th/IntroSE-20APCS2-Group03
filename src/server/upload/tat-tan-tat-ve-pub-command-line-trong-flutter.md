![image.png](https://images.viblo.asia/56233864-383e-4697-9ded-9c39a9ee1777.png)

Bài viết được dịch từ bài viết của [Suragch](https://suragch.medium.com/)

Bạn có thể xem thêm các bài viết khác tại đây: https://200lab.io/blog/pub-command-line-tool-trong-flutter/

Nếu bạn là Flutter Developer, chắc hẳn bạn rất quen thuộc với câu lệnh `flutter pub get`,  nhưng bạn biết không ngoài câu lệnh đó còn rất nhiều câu lệnh khác rất hữu ích trong Flutter mà bạn nên biết. Và trong bài viết này, chúng ta cùng nhau tìm hiểu những câu lệnh hữu ích còn lại nha!

Công cụ Pub cung cấp cho bạn rất nhiều thứ hơn bạn nghĩ. Pub là kho lưu trữ chính thức cho các package Flutter và Dart có sẵn tại [pub.dev](https://pub.dev/) và Pub là giao diện dòng lệnh của bạn để truy cập và lấy dữ liệu từ kho đó. Bài viết này sẽ giới thiệu nhiều tùy chọn có sẵn với công cụ Pub.

## 1. Overview:

Giả sử bạn đã cài đặt phiên bản mới phát hành gần đây của [Flutter and Dart và trong đường dẫn của bạn](https://flutter.dev/docs/get-started/install), hãy mở một terminal và chạy lệnh sau để xem tất cả các tùy chọn mà pub cung cấp:

```
flutter pub -h
```

`-h` có nghĩa là giúp đỡ, cụ thể ở đây là giúp bạn tìm ra câu lệnh `flutter pub` mà bạn đang tìm kiếm. Bạn cũng có thể sử dụng `--help` để thay thế.‌‌ Xuất ra màn hình:

```
add         Add a dependency to pubspec.yaml..
cache       Work with the Pub system cache.
deps        Print package dependencies.
downgrade   Downgrade packages in a Flutter project.
get         Get packages in a Flutter project.
global      Work with Pub global packages.
login       Log into pub.dev..
logout      Log out of pub.dev..
outdated    Analyze dependencies to find which ones can be upgraded.
pub         Pass the remaining arguments to Dart's "pub" tool.
publish     Publish the current package to pub.dartlang.org.
remove      Removes a dependency from the current package..
run         Run an executable from a package.
test        Run the "test" package.
upgrade     Upgrade the current package's dependencies to latest versions..
uploader    Manage uploaders for a package on pub.dev.
version     Print Pub version.
```

Các phần dưới đây sẽ giới thiệu cho bạn từng điều này. Vui lòng scroll xuống những trang mà bạn quan tâm nhất. Lệnh pub cũng hoạt động với Dart. Chạy lệnh sau vào terminal:

```
dart pub -h
```

Bạn sẽ thấy một danh sách tương tự:

```
add         Add a dependency to pubspec.yaml.
cache       Work with the system cache.
deps        Print package dependencies.
downgrade   Downgrade the current package's dependencies to oldest versions.
get         Get the current package's dependencies.
global      Work with global packages.
login       Log into pub.dev.
logout      Log out of pub.dev.
outdated    Analyze your dependencies to find which ones can be upgraded.
publish     Publish the current package to pub.dartlang.org.
remove      Removes a dependency from the current package.
upgrade     Upgrade the current package's dependencies to latest versions.
uploader    Manage uploaders for a package on pub.dartlang.org.
```

Chỉ có pub, run, test và version bị thiếu trong danh sách này.‌‌Bạn có thể đã xem các hướng dẫn sử dụng lệnh pub trực tiếp như sau:‌

```
pub get
```

Cách sử dụng công cụ Pub này hiện không được dùng nữa và bạn nên sử dụng nó kết hợp với flutter hoặc dart như sau:

```
flutter pub get
dart pub get
```

Nếu bạn đang ở trong một dự án Flutter, hãy sử dụng câu lệnh đầu tiên ở trên. Ngược lại, đối với một dự án Dart thuần túy, hãy sử dụng cái sau.

## 2. Thiết lập dự án:

Để sử dụng một số lệnh Pub, bạn cần phải ở trong thư mục gốc của dự án Flutter hoặc Dart có chứa tệp pubspec.yaml. Nếu bạn không có sẵn, hãy tạo một dự án Flutter mới như vậy:

```
flutter create my_project
```

Sau đó truy cập vào dự án:

```
cd my_project
```

Ok, vậy là bạn đã thiết lập xong dự án Flutter rồi đó! Bây giờ chúng ta hãy xem xét các option Pub khác nhau thôi.

## 2. Phiên bản (version)

Điều này cho bạn biết phiên bản hiện tại của Pub. Hãy dùng thử nhé!:

```
flutter pub version
```

Kết quả là:

```
Pub 2.13.1
```

Điều này giống với phiên bản Dart hiện tại tại thời điểm viết bài này.

## 3. Pub get

Có thể bạn đã quen thuộc với điều này, nhưng bạn cần phải xem lại đôi chút. Và  thật tốt khi vẫn còn điều gì đó để học hỏi.

Optionget nhận một package Flutter hoặc Dart từ pub.dev repository. Package này chỉ là code mà những người khác đã viết để bạn sử dụng mà không cần phải làm lại. Không cần phải chế lại cái "bánh xe" :v hoặc viết lại plugin có chức năng tương tự như plugin audio_video_progress_bar

Mỗi khi bạn bắt đầu một dự án mới hoặc clone một repo từ GitHub, bạn cần chạy pub get trong thư mục của dự án:

```
flutter pub get
```

Nếu bạn chưa từng chạy câu lệnh này trước đây, có thể là do Android Studio hoặc VS Code đã làm điều đó cho bạn.

### 3.1 Thêm một package mới:

Để xem những gì `get` thực sự mang lại, hãy thêm một package mới vào dự án của bạn. Mở pubspec.yaml và thêm package audio_video_progress_bar vào phần dependencies.

```
dependencies:
  flutter:
    sdk: flutter
  audio_video_progress_bar: ^0.3.0
```

Ghi chú:

* Thụt lề hai dấu cách rất quan trọng trong các tệp yaml. Đừng quên điều đó!
* Bạn cũng có thể xóa package cupertino_icons nếu bạn thấy nó ở đó. Chúng ta sẽ không sử dụng nó.
* Tôi đã cố ý sử dụng phiên bản cũ của packageaudio_video_progress_bar. Phiên bản hiện tại tại thời điểm viết bài này là 0.4.0. Bạn sẽ thấy lý do tại sao chúng ta sử dụng phiên bản cũ sau một phút nữa.

Bây giờ, hãy mở một terminal và chạy lệnh sau trong thư mục của dự án:

```
flutter pub get
```

3.2 The pubspec.lock file:
Bây giờ, hãy mở pubspec.lock (ngay bên cạnh pubspec.yaml) và tìm kiếm audio_video_progress_bar. Bạn sẽ tìm thấy một cái gì đó như thế này:

```
packages:
  ...
  audio_video_progress_bar:
    dependency: "direct main"
    description:
      name: audio_video_progress_bar
      url: "https://pub.dartlang.org"
    source: hosted
    version: "0.3.2"
```

Lưu ý rằng phiên bản hiện tại là 0.3.2. Đó là vì bạn đã thêm ^ vào trước phiên bản ^ 0.3.0 trong pubspec.yaml. ^ nói với Pub rằng hãy lấy phiên bản mới nhất sau 0.3.0, trong trường hợp này là 0.3.2. Điều này được gọi là semantic versioning  và nếu bạn chưa biết về điều đó, bạn chắc chắn nên tìm hiểu. Bạn có thể bắt đầu với this Stack Overflow Q&A.

3.3 Nơi các package của bên thứ ba được lưu trữ
Sau khi thực hiện thao tác trên, Pub đã có code cho audio_video_progress_bar. Vậy nó ở đâu?

Để tìm hiểu, hãy mở .dart_tool / package_config.json trong thư mục gốc của dự án Flutter của bạn. Sau đó, tìm kiếm lại audio_video_progress_bar. Bạn sẽ thấy một cái gì đó như thế này:

```
{
  "configVersion": 2,
  "packages": [
    ...
    {
      "name": "audio_video_progress_bar",
      "rootUri": "file:///Users/suragch/.pub-cache/hosted/pub.dartlang.org/audio_video_progress_bar-0.3.2",
      "packageUri": "lib/",
      "languageVersion": "2.12"
    },
```

rootUri cho biết nơi nó được lưu trữ trên máy của tôi, trong thư mục .pub-cache. Làm theo đường dẫn và bạn có thể thấy toàn bộ package ngay tại đó:

![image.png](https://images.viblo.asia/a8a847e3-8f34-4e92-ab30-fdcb6d62c958.png)

3.4 Chỉ định các phiên bản cụ thể
Khi bạn chạy flutter pub get, nó sẽ nhận được phiên bản chính xác của package được chỉ định bởi tệp pubspec.lock của bạn. Để thấy điều đó đang hoạt động, hãy mở pubspec.lock và thay đổi số phiên bản versionla thành 0.3.1 thay vì 0.3.2:

```
packages:
  ...
  audio_video_progress_bar:
    dependency: "direct main"
    description:
      name: audio_video_progress_bar
      url: "https://pub.dartlang.org"
    source: hosted
    version: "0.3.1"
```

Bây giờ làm một pub khác get:

```
flutter pub get
```

Kiểm tra lại .dart_tool / package_config.json và bạn sẽ thấy nó trỏ đến phiên bản mới:

```
"rootUri": "file:///.../audio_video_progress_bar-0.3.1",
```

Và điều hướng đến vị trí đó bằng file explorer sẽ hiển thị thư mục mới được tải xuống:‌

![image.png](https://images.viblo.asia/5de26f07-abb6-429f-a6c5-ad95255774c4.png)

Cả hai phiên bản của package đều nằm trong cache Pub, nhưng dự án của bạn hiện đang sử dụng phiên bản 0.3.1.

Vậy tại sao những điều đó lại hữu ích? Chà, nếu bạn bao gồm tệp pubspec.lock của mình khi chia sẻ dự án với người khác, họ sẽ nhận được dependencies chính xác giống như bạn khi họ chạy flutter pub get. Điều đó làm cho việc đảm bảo cùng một hành vi trở nên dễ dàng hơn rất nhiều.

## 4. Pub upgrade

Không giống như flutter pub get, lệnh update không sử dụng phiên bản package cụ thể từ pubspec.lock. Nó nhận phiên bản mới nhất không phá vỡ dựa trên cài đặt pubspec.yaml và sau đó cập nhật vào pubspec.lock với số phiên bản đó.‌‌Nhớ lại rằng pubspec.yaml của bạn có phiên bản chung như sau:

```
audio_video_progress_bar: ^0.3.0
```

Trong khi pubspec.lock có phiên bản cụ thể:

```
audio_video_progress_bar:
  version: "0.3.1"
```

Bây giờ hãy chạy upgrade:‌

```
flutter pub upgrade
```

Nếu bạn nhìn vào pubspec.yaml thì nó vẫn ^ 0.3.0 nhưng bây giờ pubspec.lock chỉ định 0.3.2, một version upgrade!

### 4.1 Upgrading beta packages

Do semantic versioning số package bắt đầu bằng 0.x.x sẽ chỉ nâng cấp số cuối cùng trong ba số phiên bản (được gọi là patch version). Đó là lý do tại sao lệnh upgrade chỉ chuyển từ 0.3.1 sang 0.3.2 chứ không phải 0.4.0, lệnh này cũng tồn tại. Đối với các bản phát hành trước 1.0.0, một trình thay đổi changeune trong số secondla seconde (phiên bản thứ yếu) có khả năng là thay đổi lớn. Và bạn sẽ không muốn một thay đổi phá vỡ xảy ra tự động!

### 4.2 Upgrading stable packages

Nếu phiên bản hiện tại của một số package là ^1.0.0 trong pubspec.yaml và 1.2.0 trong pubspec.lock, nhưng phiên bản 1.3.0 tồn tại trên pub.dev, thì việc chạy flutter pub upgrade sẽ làm tăng số phiên bản nhỏ: đó là, pubspec.lock bây giờ sẽ có 1.3.0.

Tuy nhiên, nếu phiên bản 2.0.0 cũng có sẵn trên pub.dev (trong đó 2 là phiên bản chính), thì việc upgrade sẽ không thực hiện thay đổi đó. Đó là bởi vì sự thay đổi trong mã số phiên bản bất khả kháng chính cho các package ổn định có thể là một thay đổi phá vỡ. Công cụ Pub muốn cho phép các nhà phát triển tự đưa ra quyết định về thời điểm thực hiện nâng cấp đột phá.

### 4.3 Upgrading major versions

Cuối cùng, bạn muốn nâng cấp lên các phiên bản package có thể chứa các thay đổi phá vỡ. Bạn có thể yêu cầu Pub làm điều đó bằng cách thêm cờ --major-versions. Hãy thử ngay bây giờ:

```
flutter pub upgrade --major-versions
```

Điều này không chỉ cập nhật tệp pubspec.lock của bạn mà còn cả pubspec.yaml. Bạn sẽ nhận được thông báo sau về thay đổi đó:

```
Changed 1 constraint in pubspec.yaml: 
audio_video_progress_bar: ^0.3.0 -> ^0.4.0
```

Xác nhận điều đó đúng bằng cách kiểm tra tệp pubspec.yaml của bạn:

```
audio_video_progress_bar: ^0.4.0
```

Khi bạn có nhiều package trong dự án của mình, việc sử dụng cờ --major-versions dễ dàng hơn nhiều so với việc kiểm tra pub.dev cho mọi package để xem một trong số chúng có bản cập nhật hay không!

### 4.4 Honorable mention

flutter pub upgrade --dry-run: Điều này cho phép bạn xem phiên bản package mới nào mà máy chủ quản lý có thể cung cấp được mà không cần thực sự nâng cấp. Tuy nhiên, bạn cũng có thể sử dụng outdated nếu đây là những gì bạn muốn. Xem phần tiếp theo.

## 5. Pub outdated

Lệnh này cung cấp cho bạn thông tin về những gì bạn có thể cập nhật. Để xem nó hoạt động, hãy thay đổi phiên bản audio video progress bar của bạn trở lại ^ 0.3.0 trong pubspec.yaml và 0.3.1 trong pubspec.lock, và chạy lại flutter pub get.

Sau đó chạy lệnh sau:

```
flutter pub outdated
```

Đây là những gì bạn nhận được:

![image.png](https://images.viblo.asia/a60a5a68-6d00-46b2-915e-0293c3a875b2.png)

Current hiển thị phiên bản trong pubspec.lock, Upgradable hiển thị những gì đang chạy flutter pub upgrade sẽ mang lại cho bạn và Resolvable hiển thị cho bạn những gì đang chạy flutter pub upgrade --major-versions sẽ mang lại cho bạn. Dấu * chỉ ra rằng phiên bản không phải là phiên bản mới nhất hiện có.

Lưu ý: package meta ở trên không thể giải quyết được cho phiên bản mới nhất vì nó là phụ thuộc trực tiếp (transitive dependency). Đó là, nó là một phụ thuộc (dependency) của một phụ thuộc (có thể là trong framework Flutter), vì vậy bạn sẽ phải đợi phụ thuộc (dependency) đó cập nhật trước khi bạn có phiên bản meta mới nhất. Tôi đoán rằng không có bất kỳ bản cập nhật nào thay đổi cuộc sống trong meta 1.4.0.

## 6. Pub downgrade

Bạn có thể không sử dụng cái này thường xuyên, nhưng nó ngược lại với việc upgrade. Miễn là bạn vẫn đặt pubspec.yaml thành ^0.3.0 cho audio_video_progress_bar và pubspec.lock được đặt thành 0.3.1, thì hãy thử chạy như sau:

```
flutter pub downgrade
```

Điều này cập nhật phiên bản trong pubspec.lock lên 0.3.0, nhưng không thấp hơn, mặc dù các phiên bản thấp hơn tồn tại trên pub.dev. Hạ cấp (downgrading) xuống 0.1.0 sẽ là một thay đổi phá vỡ lớn, vì vậy Pub không làm điều đó.‌‌Được rồi, bây giờ chúng ta đã khám phá xong với các phiên bản, vì vậy bạn có thể nâng cấp sao lưu lên phiên bản mới nhất:

```
flutter pub upgrade --major-versions
```

## 7. Pub deps

Điều này cung cấp cho bạn một hình ảnh đại diện của tất cả các phụ thuộc (dependencies) trong dự án của bạn. Hãy dùng thử:

```
flutter pub deps
```

Đây là kết quả:

```
Dart SDK 2.13.1
Flutter SDK 2.2.1
my_project 1.0.0+1
|-- audio_video_progress_bar 0.4.0
|   '-- flutter...
|-- cupertino_icons 1.0.3
|-- flutter 0.0.0
|   |-- characters 1.1.0
|   |-- collection 1.15.0
|   |-- meta 1.3.0
|   |-- sky_engine 0.0.99
|   |-- typed_data 1.3.0
|   |   '-- collection...
|   '-- vector_math 2.1.0
'-- flutter_test 0.0.0
    |-- async 2.6.1
    |   |-- collection...
    |   '-- meta...
    |-- boolean_selector 2.1.0
    |   |-- source_span...
    |   '-- string_scanner...
    |-- characters...
    |-- charcode 1.2.0
    |-- clock 1.1.0
    |-- collection...
    |-- fake_async 1.2.0
    |   |-- clock...
    |   '-- collection...
    |-- flutter...
    |-- matcher 0.12.10
    |   '-- stack_trace...
    |-- meta...
    |-- path 1.8.0
    |-- source_span 1.8.1
    |   |-- collection...
    |   |-- path...
    |   '-- term_glyph...
    |-- stack_trace 1.10.0
    |   '-- path...
    |-- stream_channel 2.1.0
    |   '-- async...
    |-- string_scanner 1.1.0
    |   |-- charcode...
    |   '-- source_span...
    |-- term_glyph 1.2.0
    |-- test_api 0.3.0
    |   |-- async...
    |   |-- boolean_selector...
    |   |-- collection...
    |   |-- matcher...
    |   |-- meta...
    |   |-- path...
    |   |-- source_span...
    |   |-- stack_trace...
    |   |-- stream_channel...
    |   |-- string_scanner...
    |   '-- term_glyph...
    |-- typed_data...
    '-- vector_math...
```

Chà, dù sao thì điều đó cũng trả lời câu hỏi về meta phụ thuộc của ai.

flutter pub deps --no-dev: Điều này loại trừ các phụ thuộc của nhà phát triển, do đó loại bỏ tất cả các phụ thuộc flash_test đó trong bản xuất ra màn hình ở trên.

## 8. Pub cache

Bất cứ khi nào bạn chạy flutter pub get or flutter pub upgrade, Pub sẽ lưu trữ các thành phần phụ thuộc vào dự án của bạn ở một vị trí trung tâm, được gọi là hệ thống bộ cache (system cache). Bằng cách đó, tất cả các dự án của bạn có thể chia sẻ các package giống nhau, giúp tiết kiệm dung lượng đĩa. Như bạn đã thấy trước đó, bạn có thể tìm thấy vị trí của hệ thống bộ cache của mình bằng cách kiểm tra nội dung của .dart_tools / package_config.json. Đối với tôi, nó nằm trong thư mục .pub-cache của thư mục chính của tôi.

Đôi khi bạn muốn lưu vào bộ đệm một package từ pub.dev mà không thực sự gặp rắc rối khi thêm package đó vào tệp pubspec.yaml và chạy flutter pub get.‌‌Hãy thử điều đó. Chạy lệnh sau để thêm package mongol vào hệ thống bộ cache:

```
flutter pub cache add mongol
```

Thao tác này tải xuống phiên bản mới nhất, tại thời điểm viết bài này là 2.0.0, nhưng nếu bạn muốn tải xuống mọi phiên bản mà tôi đã từng xuất bản thì bạn có thể thêm flag --all:

```
flutter pub cache add mongol --all
```

Bạn có thể thấy điều đó bằng cách kiểm tra hệ thống bộ cache folder trong máy tính của bạn:

![image.png](https://images.viblo.asia/99916e58-2f7b-434b-82fe-da96a36e8df7.png)

Đúng, chúng đang ở đó. Bây giờ bạn đã sẵn sàng để thêm chữ Mongolian theo chiều dọc vào ứng dụng khi bạn ra ngoài thăm bạn bè ở giữa Gobi và không có quyền truy cập Internet.

![image.png](https://images.viblo.asia/693daf0a-968d-43c7-8f63-801b4fcf3aaa.png)

## 9. Repairing the cache

Nếu bạn sợ rằng hệ thống bộ cache của mình bị hỏng, bạn có thể dễ dàng sửa chữa nó. Thử xóa một tệp ngẫu nhiên bên trong một trong cached packages trong hệ thống bộ cache (nhưng không phải toàn bộ thư mục). Bây giờ hãy chạy lệnh sau:

```
flutter pub cache repair
```

Thao tác này sẽ tải xuống lại tất cả các package trong hệ thống bộ cache của bạn. Bạn sẽ thấy rằng tệp bạn đã xóa đã quay trở lại.

## 10. Clearing the cache

Không có lệnh Pub nào tôi biết để xóa bộ cache, nhưng bạn có thể dễ dàng xóa tất cả các package ở đó theo cách thủ công. Dù sao thì phiên bản 0.0.1 của package mongol cũng không thực sự tốt, vì vậy bạn không cần nó chiếm dung lượng ổ đĩa của mình nữa.

Pub sẽ tải xuống tất cả các package mà nó cần vào lần sau khi bạn chạy flutter pub get. Miễn là bạn không ở giữa môi trường của Gobi mà không có Wi-Fi.

## 11. Upgrading and downgrading without an internet connection

Nâng cấp (upgrading) và hạ cấp (downgrading) mà không cần kết nối internet. Nếu bạn không có quyền truy cập Internet nhưng bạn đã lưu vào bộ cache các phiên bản khác nhau của một package thì bạn có thể nâng cấp hoặc hạ cấp bằng cách sử dụng flag--offline.

`flutter pub upgrade --offline flutter pub downgrade --offline`

Điều này sẽ chỉ xem xét những gì có sẵn trong bộ nhớ cache system của bạn hơn là kiểm tra pub.dev.

## 12. Add

Nếu bạn quá lười mở pubspec.yaml và viết tên package bạn muốn sử dụng, thì lệnh `add` là dành cho bạn!

`flutter pub add mongol`

Kiểm tra tệp pubspec.yaml của bạn và `mongol`  sẽ nằm trong danh sách các phụ thuộc của bạn ngay bây giờ:

```
dependencies:
  flutter:
    sdk: flutter
  audio_video_progress_bar: ^0.4.0
  cupertino_icons: ^1.0.2
  mongol: ^2.0.0
```

Tôi chỉ đùa về bình luận lười biếng. Đây là cách pub.dev chỉ cho bạn cách cài đặt các package cho một dự án ngay bây giờ (ví dụ).‌‌Lệnh add cũng có thể giúp các plugin IDE thêm các package cho bạn dễ dàng hơn. Hoặc bạn có thể là thiên tài về dòng lệnh mà không cần chạm vào chuột.

Như với hầu hết các lệnh Pub, bạn có thể thấy các tùy chọn phụ khả dụng khác bằng cách thêm flag -h:

`flutter pub add -h`

Có khá nhiều tùy chọn phụ khác có sẵn ở đây, nhưng tôi sẽ để chúng cho các nhà phát triển plugin IDE và các thiên tài dòng lệnh khám phá.

## 13. Remove

Đây chỉ là câu lệnh chức năng trái ngược với `add.` Để xóa package `mongol` khỏi tệp pubspec.yaml của bạn, hãy chạy lệnh sau

`flutter pub remove mongol`

Cá nhân tôi, có lẽ tôi sẽ không sử dụng remove nhiều. Tôi sẽ chỉ mất thêm năm giây để mở pubspec.yaml và tự xóa dòng đó. Nhưng sau đó, tôi không phải là nhà phát triển plugin IDE hay thiên tài về dòng lệnh.

## 14. Global

Lệnh này hữu ích để chạy các ứng dụng Dart từ mọi nơi trên máy của bạn.

### 14.1 Kích hoạt package pub.dev

Lệnh sau sẽ cài đặt package flutter_gen trong các thư mục global_packages và bin của hệ thống bộ cache Pub của bạn:

`dart pub global activate flutter_gen`

Điều này cho phép bạn chạy lệnh fluttergen từ bất kỳ đâu (miễn là bạn có path set up).

## 15. Kích hoạt local package

Bạn cũng có thể sử dụng lệnh global để chạy các tập lệnh Dart của riêng mình. Thông thường khi tạo ứng dụng Dart, bạn chỉ có thể chạy ứng dụng đó bằng cách chỉ định đường dẫn:

`dart create hello_app dart run hello_app/bin/hello_app.dart`

Tuy nhiên, nếu bạn cài đặt ứng dụng bằng global và chỉ định --source path đến thư mục gốc của dự án như sau:

`dart pub global activate --source path hello_app/`

Sau đó, bạn có thể chạy ứng dụng từ bất kỳ đâu trên máy tính của mình như sau:

`dart pub global run hello_app`

## 16. Liệt kê các package đã cài đặt

Bạn có thể thấy tất cả các package global đã kích hoạt như sau:

`dart pub global list`

sẽ hiển thị một cái gì đó như thế này:

```
devtools 2.2.4
flutter_gen 3.1.1
hello_app 1.0.0 at path "/Users/suragch/dev/hello_app"
```

Hai cái đầu tiên là từ pub.dev và cái cuối cùng là của riêng tôi.

## 17. Gỡ cài đặt package global

Nếu bạn muốn gỡ cài đặt package global, hãy sử dụng từ khóa deactivate:

`dart pub global deactivate hello_app`

## 18. Publishing packages

Pub có một số lệnh liên quan đến xuất bản các package trên pub.dev.

### 18.1 Login and logout

Để xuất bản một package lên pub.dev, bạn cần đăng nhập. Bạn có thể đăng nhập hoặc đăng xuất như sau:

`flutter pub login flutter pub logout`

Đăng nhập sẽ lưu trữ thông tin đăng nhập của bạn trong một tệp có tên là credentials.json trong thư mục gốc của hệ thống bộ cache Pub.‌‌Nhưng tôi không bao giờ trực tiếp sử dụng login và logout. Tôi nghĩ rằng lệnh publish đã kết hợp login nếu bạn chưa đăng nhập.

### 18.2 Publish

Mỗi khi tôi hoàn thành bản cập nhật cho một trong các package của mình trên pub.dev, tôi sẽ chạy nhanh trong gốc package của mình để xem mọi thứ có ổn không:

`flutter pub publish --dry-run`

Điều này không thực sự publish các bản cập nhật. Nó chỉ cho tôi biết nếu có bất kỳ vấn đề nào. Còn nếu không có, sau đó tôi sẽ publish nó như vậy:‌

`flutter pub publish`

Sau một vài giây, bản cập nhật package của tôi có sẵn trên pub.dev và tất cả các bạn đều có thể sử dụng nó bằng cách chạy flutter pub upgrade.

### 18.3 Uploader

Nếu nhiều người đang làm việc trên một package, bạn có thể thêm những uploader bổ sung như vậy từ thư mục gốc của dự án:

`dart pub uploader add friend@example.com`

Bạn có thể đã thấy điều này trên pub.dev rồi:

![image.png](https://images.viblo.asia/a4086e9d-40e7-4463-9de7-d508577d81f4.png)

Uploaders cho package máy chủ web jaguar
Tuy nhiên, các tài liệu khuyên bạn nên sử dụng nhà xuất bản đã xác minh thay vì ngay bây giờ, vì vậy tôi hơi không rõ về cách nhiều người tải lên hoạt động trong trường hợp đó. Bản thân tôi cũng chưa cần đến tính năng đó.

## 19. Hơn nữa

Chỉ có một số lệnh khác mà chúng ta chưa đề cập đến, nhưng chúng có vẻ không quá quan trọng. Tôi sẽ chỉ đề cập ngắn gọn về chúng.

### 19.1 Pub pub

Đây là một ví dụ về ví dụ về pub đôi:

`flutter pub pub get`

pub đầu tiên là phiên bản Flutter của Pub và pub thứ hai cung cấp cho bạn phiên bản Dart của Pub. Tôi không rõ tại sao điều này lại cần thiết. Bạn chỉ có thể sử dụng dart pub get, phải không?

### 19.2 Pub test

Bạn sẽ chạy nó trong root của một dự án.‌

`flutter pub test`

Thao tác này sẽ tìm kiếm package test và chạy các test trong thư mục test. Tuy nhiên, tôi không rõ tại sao điều này lại cần thiết. Chỉ cần sử dụng flutter test hoặc dart test, phải không?

### 19.3 Pub run

Đây là một ví dụ generic:

`flutter pub run some_executable`

Nếu bạn chỉ muốn chạy ứng dụng Flutter hoặc Dart, bạn có thể sử dụng Flutter run hoặc dart run. Tôi thực sự không chắc pub run ở đó để làm gì trừ khi nó chạy một tệp thực thi bên trong dự án ngoài ứng dụng.‌‌

Điều đó bao gồm hầu hết mọi ngóc ngách của công cụ dòng lệnh Pub. Có một số lệnh con khác, nhưng bạn có thể đọc về chúng trong tài liệu.