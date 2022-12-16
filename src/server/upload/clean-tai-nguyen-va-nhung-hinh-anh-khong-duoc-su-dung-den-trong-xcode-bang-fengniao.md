### Sử dụng Fengniao để clean tài nguyên và hình ảnh không sử dụng đến trong Xcode

  Những hình ảnh không được sử dụng đến có thể tồn tại sau mỗi lần build project bởi vì chúng không phải lúc nào cũng được dọn dẹp hoàn toàn trong các project lớn. Khi một tính năng không còn cần thiết và bạn muốn loại bỏ nó mà phải tìm kiếm trong một project khổng lồ thì thật là vất vả phải không nào :tired_face: . Đừng lo mình sẽ giới thiệu cho bạn 1 cách đơn giản để clean nó, đó là sử dụng [Fengniao](https://github.com/onevcat/FengNiao/blob/master/README.md)  :heart_eyes:

> FengNiao là một dòng lệnh đơn giản được viết bằng Swift, nó là mã nguồn mở và có sẵn trên Github. Chúng được sử dụng để xóa các tệp tài nguyên hình ảnh không được sử dụng khỏi project Xcode của bạn.

### 1. Cài đặt 

Mở Terminal của bạn và gõ lần lượt những câu lệnh sau: 

```
> git clone https://github.com/onevcat/FengNiao.git
> cd FengNiao
> ./install.sh
```

### 2. Sử dụng 

Trên Terminal điều hướng đến thư mục project của bạn bằng cách chạy lại câu lệnh "cd" và theo sau là đường dẫn đến thư mục project của bạn, tiếp theo là chạy câu lệnh: 
```
> fengniao
```

Nó sẽ quét thư mục hiện tại và tất cả các thư mục con của nó để tìm hình ảnh không sử dụng. Vui lòng đảm bảo rằng bạn có bản sao lưu trước khi xóa hình ảnh; vì khi xoá sẽ không thể khôi phục lại được.
Nó sẽ hiển thị cho bạn kết quả lúc đầu sau đó bạn có tùy chọn xóa(d), bỏ qua(i) hoặc liệt kê(l) các tài nguyên không sử dụng.

```
Searching unused file. This may take a while...
2 unused files are found. Total Size: 19.09 MB
What do you want to do with them? (l)ist|(d)elete|(i)gnore 
```

**Fengniao** cũng hỗ trợ thêm 1 số options có sẵn, chúng ta có thể xem nó bằng cách sử dụng câu lệnh : 
```
fengniao --help
```

Đây là 1 vài option :

```
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

Ở đây mình có gợi ý nên sử dụng option exclude, ví dụ như sau:

```
fengniao --exclude Carthage Pods
```

Vì câu lệnh này sẽ tìm kiếm trong thư mục hiện tại, nhưng bỏ qua thư mục Carthage và Pods, trong đó có thể có chứa một số **third party** (tài nguyên bên thứ ba) mà bạn không muốn đụng vào đâu :joy:

Sau đây là ví dụ của mình : 

![](https://images.viblo.asia/f363e0f3-6085-4895-9f35-0f7f72d0b3ae.png)

Ở đây mình đã tìm được 2 hình ảnh không được sử dụng đến và mình đã sử dụng "**l**" để liệt kê những file đó ra. Tiếp theo mình sẽ xoá chúng đi để cho project được clean nhất có thể :grin:

![](https://images.viblo.asia/dba92019-ec8c-446a-9bf4-007fc0f1b1b2.png)

Như các bạn thấy thông báo hiện lên và nó báo đã xoá 2 file đó thành công khỏi project, chạy lại câu lệnh **"fengniao"** để xem và kết quả là project của chúng ta đã clean hoàn toàn rồi, thật tuyệt vời phải không nào :heart_eyes::heart_eyes: 

### 3. Tổng kết 

Dọn dẹp project của bạn để xóa những hình ảnh không sử dụng đến chắc chắn là đáng để thử phải không nào. Nó sẽ giữ cho project của bạn được clean hơn. 

Vậy là bài viết của mình đến đây là hết 😁. Mong rằng bài viết của mình sẽ giúp các bạn áp dụng để clean project một cách nhanh chóng và tiện lợi.

Cảm ơn các bạn đã theo dõi bài viết. 😃