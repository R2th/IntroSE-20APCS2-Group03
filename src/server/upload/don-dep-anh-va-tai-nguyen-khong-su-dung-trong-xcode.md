Bài viết được dịch từ trang [medium.com](https://medium.com), các bạn có thể xem bài gốc tại https://medium.com/better-programming/unused-images-and-resources-clean-up-in-xcode-2fa68b4e202b
Làm sao chúng ta có thể dọn dẹp một cách dễ dàng các ảnh và tài nguyên đã không được sử dụng trong dự án của mình.

Ảnh không được sử dụng là kết quả của việc khi các chức năng không còn cần thiết và bị xoá bỏ khỏi dự án, nhưng những thứ liên quan đến chúng lại chưa được dọn dẹp một cách triệt để. Do đó, rất hữu ích khi biết cách dọn sạch tài nguyên không còn được sử dụng trong Xcode của bạn.

Giống như trong bài đăng trên blog của tôi về [việc dọn dẹp các localized string không sử dụng](https://www.avanderlee.com/xcode/unused-localized-strings/), tôi sẽ giới thiệu thêm hai công cụ giúp bạn có thể sử dụng để dọn dẹp dự án của mình:
* [**FengNiao**](https://github.com/onevcat/FengNiao/blob/master/README.md)
* [**LSUnusedResources**](https://github.com/tinymind/LSUnusedResources)

Trước đây có rất nhiều công cụ như [Slender](https://www.macupdate.com/v1/app/mac/41546/slender) đã từng làm công việc này. Nhưng không may, hiện giờ chúng không còn được duy trì. Vì vậy, chúng ta hãy xem xét các công cụ vẫn đang bảo trì hiện nay!

Hiện tôi đang làm việc tại dự án  [Collect by WeTransfer](https://collect.wetransfer.com/). Các tài nguyên trong dự án này đã được không được dọn dẹp trong hai năm trở lại đây.

### Dọn dẹp những ảnh không sử dụng bằng FengNiao
**FengNiao** là một công cụ *command-line* được viết chủ yếu bằng *Swift*. Nó là mã nguồn mở và có trên *Github*. Nó có thể được cài bằng cách *clone* *repository* về máy của bạn và chạy kịch bản cài đặt như sau:
```
> git clone https://github.com/onevcat/FengNiao.git
> cd FengNiao
> ./install.sh
```
Sau khi đã được cài đặt, việc sử dụng **FengNiao** rất đơn giản. Bạn chỉ cần chuyển đến thư mục dự án bằng *Terminal* và cho thự thi **FengNiao** bằng lệnh sau:
```
> fengniao
```
Đầu tiên, nó sẽ hiển thị cho bạn kết quả, và sau đó bạn có thể chọn các tuỳ chọn để *xoá*, *bỏ qua*, hoặc *liệt kê* các ảnh đã không còn được sử dụng.
```
Searching unused file. This may take a while...
218 unused files are found. Total Size: 19.09 MB
What do you want to do with them? (l)ist|(d)elete|(i)gnore
```
**FengNiao** cũng sẽ liệt kê cho các bạn các tệp không được sử dụng trong các *dependencies* mà dự án sử dụng. Rõ ràng, chúng ta sẽ không muốn tập trung vào các tệp này vì chúng không thuộc quyền quản lý của chúng ta.

```
1.57 KB /Users/antoinevanderlee/Documents/GIT-Projects/WeTransfer/Coyote/Submodules/Rabbit/Submodules/Alamofire/docs/docsets/Alamofire.docset/Contents/Resources/Documents/img/gh.png
```
Ngoài danh sách tài nguyên không còn được sử dụng của *dependencies*, công cụ này cũng liệt kê hình ảnh cho các thư mục tài liệu. Do đó, chúng ta cần chạy lại công cụ với một vài tùy chọn bổ sung, để có thể bỏ qua các tệp không muốn tập trung.
Chúng ta có thể liệt kê tất cả các tùy chọn có sẵn bằng cách sử dụng tham số - *help*.
```
$ fengniao --help
Usage: fengniao [options]
  -p, --project:
      Root path of your Xcode project. Default is current folder.
  --force:
      Delete the found unused files without asking.
  -e, --exclude:
      Exclude paths from search.
  -r, --resource-extensions:
      Resource file extensions need to be searched. Default is 'imageset jpg png gif'
  -f, --file-extensions:
      In which types of files we should search for resource usage. Default is 'm mm swift xib storyboard plist'
  --skip-proj-reference:
      Skip the Project file (.pbxproj) reference cleaning. By skipping it, the project file will be left untouched. You may want to skip ths step if you are trying to build multiple projects with dependency and keep .pbxproj unchanged while compiling.
  --version:
      Print version.
  -h, --help:
      Print this help message.
```
Chúng ta sẽ cần đến tuỳ chọn *exclude*. Sau khi xem xét tất cả các đường dẫn được liệt kê của dự án *Collect by WeTransfer*, tôi có thể bỏ qua một số các đường dẫn. Điều này dẫn đến lệnh sau:
```
fengniao --exclude Carthage Pods Submodules Vendor guides fastlane
```
Điều này nói cho công cụ bỏ qua các thư mục có chứa các *dependencies*, cũng như tài liệu và thư mục Fastlane của chúng tôi. Kết quả cuối cùng là dự án có 44 tài nguyên không sử dụng để dọn dẹp:
![](https://images.viblo.asia/690d30c1-3f2c-4be9-bfdf-855f07355612.png)

Để xác minh rằng đây là những ảnh không còn được sử dụng, tôi đã chọn ngẫu nhiên một số và thực hiện tìm kiếm trong Xcode. Những ảnh đó thực sự không còn được sử dụng và có thể dọn dẹp.
Chạy công cụ một lần nữa chứng minh rằng nó làm việc như mong đợi!
```
$ fengniao --exclude Carthage Pods Submodules Vendor guides fastlane
Searching unused file. This may take a while...
😎 Hu, you have no unused resources in path: /Users/antoinevanderlee/Documents/GIT-Projects/WeTransfer/Coyote.
```

### Dọn dẹp những ảnh không sử dụng bằng LSUnusedResources
[LSUnusedResources](https://github.com/tinymind/LSUnusedResources) là một ứng dụng trên Mac, nó hoạt động cũng giống với **FengNiao**: dọn dẹp những ảnh và tài nguyên không còn được sử dụng. Nó cũng là một mã nguồn mở, nhưng nó không còn được bảo trì nữa. Tại thời điểm, tôi viết bài viết này, *commit* cuối cùng đã từ một năm trước đây. 
Tuy nhiên, nó vẫn chạy và do đó vẫn đáng để thử!
Bạn có thể tải xuống tệp thực thi của LSUnusedResources từ trang Github. Nó có thể cho bạn biết rằng nó không an toàn để mở. Nếu vậy, bạn có thể sử dụng *Control + Open* để mở nó. Sau khi chạy nó với các cài đặt mặc định, nó hiển thị kết quả gần như tương tự của **FengNiao**: 

![](https://images.viblo.asia/cb4735fa-a5a3-41c1-a4f1-d3f9a4f3f418.png)

Và cũng giống như chúng ta đã làm với FengNiao, bây giờ chúng ta nên chạy lại nó với các thư mục bị loại trừ. Chúng ta phải điền vào *Resource Suffix* bằng cách tách các thư mục bằng ký hiệu ống dẫn "|":
```
Carthage|Pods|Submodules|Vendor|guides|fastlane
```
Và kết quả:
```
Total: 106, unused: 21, time: 1.53s, size: 328.92
```
Đây là tất cả các ảnh đã không còn sử dụng và chúng có thể được gỡ bỏ dễ dàng bằng nút xóa trong ứng dụng.

### So sánh kết quả giữa: FengNiao và LSUnusedResources
So sánh hai kết quả của 2 công cụ cho thấy một số khác biệt lớn:
```
FengNiao:          44 unused files / Total Size: 440.06 KB
LSUnusedResources: 21 unused files / Total Size: 328.92 KB
```
Lúc đầu, sự khác biệt này dường như chủ yếu liên quan đến hai *extension target* mà chúng ta có trong dự án. **FengNiao** đã kiểm tra chính xác những thứ đó, nhưng **LSUnuseResource** dường như bỏ qua chúng.
Để hoàn toàn chắc chắn, tôi đã tạo một nhánh cho mỗi công cụ và so sánh các thay đổi. Điều này khẳng định rằng **FengNiao** đã làm một công việc tốt hơn và tìm thấy nhiều tài nguyên không sử dụng hơn.

### Có phải luôn luôn an toàn khi dọn dẹp những hình ảnh không còn được sử dụng?
Chắc chắn không phải! Đây là một ý tưởng tốt để kiểm tra các tài nguyên trước khi bạn xóa chúng.
Có một ví dụ phổ biến về tài nguyên được sử dụng nhưng vẫn được liệt kê là không sử dụng. Đây là khi bạn xây dựng một tham chiếu đến một tài nguyên dựa trên các điều kiện nhất định.
Ví dụ: trong dự án, chúng tôi sử dụng mã sau:
```
UIImage(named: "\(iconName)\(iconSize.sizeString)")
```
Hóa ra tất cả những hình ảnh đó đều được liệt kê trong cả hai kết quả, và do đó, nó bắt buộc phải xem qua các kết quả theo cách thủ công trước khi xóa hình ảnh.

### Bonus: Dọn dẹp tập tin của nhà phát triển trong Xcode
Để dọn dẹp một cách triệt để, làm thế nào về việc dọn sạch các tệp của nhà phát triển trong Xcode?
Có một công cụ tuyệt vời có tên **[DevCleaner](https://github.com/vashpan/xcode-dev-cleaner)** sẽ dễ dàng xóa tới 20GB dữ liệu không sử dụng cho bạn. Đây là cách nó tìm kiếm sau khi chạy nó lần đầu tiên:
![](https://images.viblo.asia/408d4dfe-5324-447d-94e4-f94bc012c0a7.png)

Mặc định, ứng dụng này sẽ xóa tất cả các phiên bản iOS cũ của bạn. Ví dụ: trong trường hợp của tôi, nó đã chọn tất cả các tệp hỗ trợ thiết bị iOS 11 và 12, cho tôi chỉ hỗ trợ thiết bị cho iOS 13. Đây rõ ràng không phải là điều bạn muốn. Do đó, bạn cần điều chỉnh nó theo nhu cầu của bạn.
### Kết luận
Dọn dẹp dự án của bạn để xóa những ảnh không sử dụng chắc chắn là đáng thử. Nó sẽ giữ cho dự án của bạn sạch sẽ và không có tài nguyên nào mà bạn không còn sử dụng. Hãy chú ý và xem qua các kết quả bằng tay trước khi xóa chúng.