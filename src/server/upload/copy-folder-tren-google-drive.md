Chắc hẳn trong chúng ta, không ít lần có nhu cần cần copy folder từ chỗ này sang chỗ khác trên google drive. Khác với việc copy trên PC, google drive chỉ cho phép copy file.

![](https://images.viblo.asia/ab89cf13-2e5b-42d0-8770-d9446ba13e98.png)

Tôi cũng không hiểu sao google không cho copy thư mục :sweat_smile:
![](https://images.viblo.asia/6e2efaf4-4891-49f9-bea8-75eb5b7f11f2.png)

Tôi tra trên mạng thì có khá nhiều cách,  hoặc là các bạn dùng sức cơm đó có thể là download thư mục đó về và lại up lên, hoặc là sử dùng extension bên thứ 3. Tôi đoán hầu hết các bạn dùng cách sử dụng extension bên thứ 3 vừa nhanh vừa dễ. Nhưng đối với folder là tài liệu dự án, việc sử dụng bất kì phần mềm bên thứ 3 là một điều cần tránh vì lí do **bảo mật**. 

Vậy nên hôm nay, tôi xin giới thiệu một cách khác, có thể mất chút thời gian cài đặt ban đầu, nhưng sau đó mỗi lần các bạn muốn copy thư mục thì chỉ cần 2, 3 thao tác nhẹ là được.

Nội dung bài viết
> 1. Cài đặt
> 2. Sử dụng
 
### 1. Cài đặt
Chúng ta sẽ sử dụng Google Apps Scripts. Đối với những bạn lập trình có lẽ sẽ dễ hiểu hơn, các bạn thuộc các ngành khác cũng không phải lo ngại vì đơn giản chỉ cần copy đoạn code của mình là ok nhé :nerd_face:

Google Apps Script - là 1 ngôn ngữ lập trình dựa trên Javascript với trình biên tập, biên dịch đều nằm trên máy chủ của Google. Với công cụ này bạn có thể lập trình để thao tác, can thiệp trực tiếp đến các dịch vụ của Google.

Các bạn vào trang https://script.google.com/, vì là dịch vụ của google nên các bạn đăng nhập bằng tài khoản google nhé. Sau khi đăng nhập xong, các bạn nhấn vào nút **New Project**

![](https://images.viblo.asia/d8383924-af5a-44b5-ae60-0b91545183a5.png)

Sẽ mở sang màn hình mới, các bạn copy đoạn code tôi có để bên dưới ảnh và thêm vào như hình bên sau:

![](https://images.viblo.asia/abcb1815-6d06-46ce-858d-e8547fca0a69.png)

Sau khi thêm code xong, các bạn nhớ `Ctrl S` để save, đồng thời thêm tên project tùy ý.

```php
function start() {
  var sourceFolder = "<sourceFolderID>";
  var targetFolder = "<destFolderID/namefolder>";
  
  var source = DriveApp.getFolderById(sourceFolder);
  //var target = DriveApp.createFolder(targetFolder); // copy về driver của mình
  var target = DriveApp.getFolderById(targetFolder); // copy về một folder xác định bằng ID
  copyFolder(source, target);
}

function copyFolder(source, target) {
  var folders = source.getFolders();
  var files = source.getFiles();
  
  while(files.hasNext()){
  var file = files.next();
  file.makeCopy(file.getName(), target);
  }
  
  while(folders.hasNext()){
    var subFolder = folders.next();
    var folderName = subFolder.getName();
    var targetFolder = target.createFolder(folderName);
    copyFolder(subFolder, targetFolder);
  }
}
```

Sẽ có nhiều option cho các bạn lựu chọn trong việc copy, nhưng ở đây mình giới thiệu 2 option mình hay dùng : 
* Copy về chính drive của mình.
* Copy về một thư mục khác mà các bạn có quyền modify.

### 2. Sử dụng

**1. Copy về chính drive của mình**
Trong đoạn code trên, có 2 phần quan trọng đó là 
```php
  var sourceFolder = "<sourceFolderID>";
  var targetFolder = "<destFolderID/namefolder>";
```
- sourceFolderID là ID của folder mà các bạn muốn copy
- destFolderIDlà ID của folder đích mà các bạn muốn copy tới, các bạn tạm thời bỏ qua.
- namefolder là tên của folder mà các bạn muốn đặt cho folder copy
 sau khi nó lưu về My folder của các bạn.
 
 Đầu tiên, các bạn vào trong folder cần copy để lấy ID. Trong ví dụ này, mình giả sử muốn copy thư mục `album1` về My drive.
 
 ![](https://images.viblo.asia/a1749acc-19f6-420d-bf13-1eadf151f257.png)

Thay vào phần `<sourceFolderID>`
```php
var sourceFolder = "15yg-jIdQO5RLv7lyT54ehZOg_sQBPKyj";
```

Sau đó phần `targetFolder` sẽ điền tên tùy các bạn ví dụ
```php
var targetFolder = "album anh";
```

Lúc này, các bạn sẽ cần thay đổi một chút trong đoạn code trên : bỏ  comment - 2 dấu `//` khỏi dòng 1 và thêm 2 dấu này vào trong thứ 2 như bên dưới.
```php
var target = DriveApp.createFolder(targetFolder); // copy về driver của mình
 //var target = DriveApp.getFolderById(targetFolder); // copy về một folder xác định bằng ID
```

Sau khi xong, hãy nhấn `Ctrl S` để lưu code. Bước cuối cùng là nhấn `Start` như hình dưới và chờ đợi.

![](https://images.viblo.asia/1a913e16-0cca-4dfd-9b32-dd5690129678.png)

Khi nào thông báo bên dưới tắt là coi như đã chạy xong.
![](https://images.viblo.asia/87a00e10-11ff-400d-8dea-13d270bbdb3a.png)

Các bạn thử vào `My Drive` kiểm tra nhé :grinning:

**2. Copy về một thư mục khác mà các bạn có quyền modify**

Mình xin giới thiệu option thứ 2. Quay lại đoạn code về source và target
```php
var sourceFolder = "<sourceFolderID>";
var targetFolder = "<destFolderID/namefolder>";
```
 Lúc này, các bạn vẫn vào trong folder cần copy để lấy ID và thay vào phần `<sourceFolderID>`
```php
var sourceFolder = "15yg-jIdQO5RLv7lyT54ehZOg_sQBPKyj";
```

Sau đó, vào thư mục đích - là thư mục các bạn muốn copy tới để cũng lấy ID và thay thế phần `destFolderID`. Ví dụ mình muốn copy folder `album1` sang folder `videos` 
```php
var targetFolder = "1DyR4IlV2rXbZaW1rEUddC_p1bz2KCG8W";
```
![](https://images.viblo.asia/1b282295-41ec-4eab-8cf0-20304dff72f5.png)

Lúc này, đoạn code copy sẽ như sau.
```php
//var target = DriveApp.createFolder(targetFolder); // copy về driver của mình
 var target = DriveApp.getFolderById(targetFolder); // copy về một folder xác định bằng ID
```
Tương tự như phần trên các bạn save và start code, chờ đợi copy và check hàng nhé.

> Lưu ý : Trong option 2, sẽ copy nội dung bên trong của folder album1. Ví dụ trong album1, các bạn có 2 file ảnh thì nó sẽ chỉ copy 2 file ảnh thôi. Còn thư mục album1 sẽ không dc bê sang. Do đó, hãy tạo folder chứa nội dung của folder album1 trước, lấy ID đó là sourceID và ID của album1 là targetID.
 
Từ lần sau trở đi, các bạn chỉ việc thay đổi `sourceID`, `targetID` và 2 dòng code liên quan đến copy của 2 option là ok.

Cảm ơn các bạn đã đọc bài. Nếu có gì khó hiểu, hãy comment bên dưới nhé.