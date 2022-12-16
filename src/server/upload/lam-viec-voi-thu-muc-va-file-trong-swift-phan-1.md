Đôi khi chúng ta dễ dàng quên mât rằng iOS là một hệ điều hành giống như những hệ điều hành khác chạy trên máy tính ngày nay.

Với thực tế này, không ngạc nhiên rằng iOS có một hệ thống file giống như những hệ điều hành khác, cho phép ứng dụng lưu trữ dữ liệu của người dùng.

Cũng giống những nên tảng khác, hệ thống file của ios cung cấp một cấu trúc thư mục. dựa vào đó các file có thể được tạo mới và tổ chức trong các thư mục

Từ iOS 5 iOS cung cấp 2 lựa chọn để lưu trữ data. File và dữ liệu có thể được lưu trữ trên hệ thống file của máy local hoặc lưu trữ qua dịch vụ iCloud của Apple.

Topic này sẽ tìm hiểu về tài liệu và thư mục tạm của ứng dụng, tìm thư mục hiện hành đang làm việc, tạo, xoá, đổi tên thư mục và lấy danh sách content của một thư mục.
# Phần 1: Làm việc với thư mục
## 1. Thư mục tài liệu của ứng dụng
Người dùng iPhone/ iPad có thể cài đặt nhiều ứng dụng trên thiết bị của mình. iOS chịu trách nhiệm đảm bảo rằng các ứng dụng này không thể can thiệp lẫn nhau kể cả về mức sử dụng bộ và lưu trữ dữ liệu. Như vậy mỗi ứng dụng bị hạn chế về nơi lưu trữ dữ liệu trên hệ thống file của thiết bị.

iOS chỉ cho phép ứng dụng được quyền đọc và ghi chỉ trong thư mục Documents và thư mục tmp của ứng dụng đó. Ứng dụng không được quyền tạo hoặc sửa file hoặc thư mục bên ngoài khu vực này trừ khi sử dụng lớp UIDocumentPickerViewController
## 2. FileManager, FileHandle và Data Class

Framework Foundation cung cấp 3 lớp để làm việc với file và thư mục

### a. File Manager:

Lớp FileManager sử dụng để thực hiện những công việc cơ bản với file và thư mục như tạo, sửa, ghi , di chuyển, đọc nội dung, đọc thông tin thuộc tính của file, thư mục. Ngoài ra cũng cung cấp phương thức lấy thư mục hiện hành, thay đổi, tạo mới thư mục, liệt kê danh sách nội dung có trong thư mục

### b. FileHandle:

Lớp này được cung cấp để làm những công việc cấp thấp trên file, ví dụ như tìm kiếm một vị trí cụ thể trong một file, đọc, ghi nội dung một file với một số lượng byte được chỉ định, hoặc thêm dữ liệu vào một file đã có sẵn

### c. Data:

Lớp này cung cấp một bộ đệm từ đó nội dung của một file có thể được đọc, hoặc một để lưu trữ dữ liệu động sẽ được ghi vào file

## 3. Tên đường dẫn trong Swift

Giống như macOS, iOS định nghĩa đường dẫn theo cú pháp UNIX. Mỗi thành phần của đường dẫn ngăn cách bởi dấu /.

Khi ứng dụng bắt đầu chạy, thực mục làm việc hiện tại là thưc mục gốc được biểu diễn bằng một dấu /. Từ vị trí này, ứng dụng phải điều hướng tới tự mục Documents và tmp của nó để có thể ghi file vào hệ thống file

Tên đường dẫn bắt đầu bằng một dấu / được gọi là đường dẫn tuyệt đối chỉ địn vị trí của file trong thư mục gốc. Vd: /var/mobile

Ngược lại đường dẫn khôgn bắt đầu bằng dấu / là đường dẫn tương đối chỉ định vị trí của file đó trong thư mục hiện hành. Vd thư mục làm việc hiện hành dang là /User/demo và tên đường dẫn là mapdata/local.xml . Từ đó có thể suy ra tên đường dẫn tuyệt đối của file đó là /User/demo/ mapdata/local.xml

## 4. Tham chiếu tới đối tượng Default của FileManager:

Lớp FileManager chứa một thuộc tính tên là default sử dụng để tham chiếu tới thực thể mặc định của FileManager. Đối tượng này sẽ giups chúng ta làm việc với file và thư mục

Let fileMgr = FileManager.default

## 5. Xác định thư mục làm việc hiện hành:

Như đã đề cập ở trên, mỗi khi ứng dụng bắt đầu chạy lên. Thư mục làm việc hiện hành của nó là thư mục gốc của ứng dụng được biếu diễn bằng 1 dấu /.

Thư mục hiện hành có thể lấy được bất cứ lúc nào bằng cú pháp:

Let curentPath = fileMgr.currentDirectoryPath

## 6. Xác định thư mục Document

Mỗi ứng dụng iOS trên thiết bị đều có thư mục Document và tmp của riêng nó, và có quyền đọc, ghi dữ liệu trên đó. Bới vì vị trí của các thư mục này là khác nhau đối vỡi mỗi ứng dụng nên cách duy nhất để biết chính xác đường dẫn của chúng là hỏi iOS. Thực tế, vị trí chính xác sẽ khác nhau tuỳ thuộc vào nơi chạy ứng dụng là iPhone, iPad hay máy ảo. Cú pháp xác định thư mục Document:
```
Let fileMgr = FileManager.default

Let dirPaths = fileMgr.urls(for: .documentDirectory, in: .userDomainMask)

Let docsDir = dirPaths[0].path
```

Đối số .userDomainMask chỉ định rằng chúng ta đang muốn tìm thư mục Document nằm trong thư mục chính của ứng dụng. Phương thức này sẽ trả về một đối tượng dưới dạng 1 mảng chứa các kết quả của yêu cầu. Từ mảng đó ta lấy ra đối tượng tại index đầu tiên

Khi thực thi công việc trên trên máy ảo, đường dẫn nhận được sẽ có dạng:

“/Users/<user name>/Library/Developer/CoreSimulator/Devices/<device id>/data/Containers/Data/Application/<app id>/Documents”

Với <username> là tên của user hiện tại đang login vào macOS mà máy ảo đang chạy.

<device id> là ID duy nhất của máy ảo

<app id > là id duy nhất của ứng dụng: “06A3AEBA-8C34-476E-937F-A27BDD2E450A”

Khi thực thi trên thiết bị thật đường dẫn ta có được sẽ có dạng:

“/var/mobile/Containers/Data/Application/<app id>/Documents”

## 7. Xác định thư mục tạm (tmp)

Bên cạnh thư mục Document, ứng dụng iOS cũng cung cấp một thư mục tmp để lưu trữ file tạm:

```Let tmpDir = NSTemporaryDiretory()```

## 8. Thay đổi thư mục:

Có được đường dẫn của thư mục Document hoặc tmp sẽ giúp ích cho chúng ta trong việc đọc ghi dữ liệu, công việc của chúng ta tiếp theo là chuyển thư mục hiện hành tới thư mục Document hoặc tmp để có quyền đọc ghi file. Sử dụng phương thức changeCurrentDirectoryPath của lớp FileManager để làm công việc này. Lưu ý rằng phương thức changeCurrentDirectoryPath trả về giá trị Bool để thông báo việc chuyển thư mục có thành công hay không. Trường hợp chuyển thư mục thất bại có thể do thư mục đó không tồn tại hoặc không có quyền truy cập

// Lấy đường dẫn thư mục document

```
let dirPaths = fileManager.urls(for: .documentDirectory, in: .userDomainMask)

let docsDir = dirPaths[0].path```

// Thay đổi thư mục hiện hành

```if fileManager.changeCurrentDirectoryPath(docsDir) {

// Success

} else {

// Failure

}
```

## 9. Tạo mới một thư mục

Tạo mới thư mục ta sử dụng phương thức createDirectory

```
let newDir = dirPaths[0].appendingPathComponent("data").path

do {

try fileManager.createDirectory(atPath: newDir, withIntermediateDirectories: true, attributes: nil)

} catch let error {

print(error.localizedDescription)

}
```

Đối số withIntermediateDirectories: xác định xem có tự động tạo cấp thư mục trung gian khi cần thiết không

Ví dụ: nếu muốn tạo một thư mục với đường dẫn :

“/var/mobile/Containers/Data/Application/<app id>/Documents/mydata/maps”

Và thư mục con mydata không tồn tại, nếu withIntermediateDirectories = true sẽ tự động tạo thư mục mydata trước khi tạo thư mục maps

## 10. Xoá một thư mục:

```
do {

try fileManager.removeItem(atPath: newDir)

} catch let error {

print(error.localizedDescription)

}
```

## 11. Liệt kê nội dung của một thư mục:

Vd: liệt kê danh sách file, thư mục trong thư mục gốc

// Liệt kê danh sách trong thư mục

```
do {

let fileList = try fileManager.contentsOfDirectory(atPath: "/")

for filename in fileList {

print(filename)

}

} catch let err {

print(err.localizedDescription)

}
```

## 12. Lấy thuộc tính của file hoặc thư mục

```
do {

let attribs: Dictionary = try fileManager.attributesOfItem(atPath: "/.com.apple.timemachine.donotpresent") as Dictionary

let type = attribs[FileAttributeKey.type] as! String

print(type)

} catch let err {

print(err.localizedDescription)

}
```
# Tổng kết
Trên đây mình đã giới thiệu các bạn cách thức làm việc với 1 thư mục. Trong phần tiếp theo mình sẽ giới thiệu về việc làm việc với file. Cảm ơn các bạn đã chú ý theo dõi. Hẹn gặp lại lần sau!