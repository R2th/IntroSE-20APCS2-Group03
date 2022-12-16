Ở phần trước chúng ta đã tìm hiểu cách làm việc với thư mục trên Swift. Hôm nay mình sẽ giới thiệu các cách thao tác với file trong Swift.
Link phần 1 : https://viblo.asia/p/lam-viec-voi-thu-muc-va-file-trong-swift-phan-1-m68Z0M3AlkG
# I. Các Thao Tác Với File
## 1. Lấy một instance của FileManager
```
Let fileMgr = FileManager.default
```

## 2. Kiểm tra sự tồn tại của một file

FileManager cung cấp phương thức fileExits(atPath: ) Phương thức này trả về giá trị bool cho biết file có tồn tại không
```
if fileManager.fileExists(atPath: "/Applications") {

print("File exists")

} else {

print("File not found")

}
```

## 3. So sánh nội dung của 2 file

Sử dụng phương thức contentsEqual(atPath: andPath:)

## 4. Kiểm tra một file có quyền đọc, ghi, thực thi, xoá không:

Sử dụng phương thức:

* isReadableFile(atPath:)

* isWritableFile(atPath:)

* isExecutableFile(atPath:)

* isDeletableFile(atPath:)

## 5. Di chuyển, copy, remove file

Phương thức:

moveItem(atPath: toPath:)

copyItem(atPath: toPath:)

removeItem(atPath:)

## 6. Đọc, ghi file sử dụng FileManager

Contents(atPath:)

CreateFile
```
let stDataToWrite = "Hello world".data(using: .utf8)

guard let fileName = documentsPath.first?.appendingPathComponent("/text.txt").path else {

return

}
```

let isCreateSuccess = fileManager.createFile(atPath: fileName, contents: stDataToWrite, attributes: nil)

## 7. Làm việc với file sử dụng FileHandle class

Tạo một đối tượng FileHandle

Một đối tượng FileHandle được tạo khi mở một file để đọc, ghi hoặc update file.

Một lưu ý khi đã mở một file cần đóng file sau khi làm việc xong, sử dụng phương thức closeFile

Vd: đoạn code sau mở một file ra để đọc sau đó đóng file và không làm bất cứ tác động gì lên file
```
let file: FileHandle? = FileHandle(forReadingAtPath: "/Application/Text.txt")

if file == nil {

print("File open failed")

} else {

file?.closeFile()

}
```

## 8. File Offsets và Seeking

Đối tượng FileHandle duy trì một con trỏ tới vị trí hiện tại trong một file. Điều này gọi là offset.

Khi mở file lần đầu offset bằng 0 (vị trí đầu của file). Điều này có nghĩa rằng bất cứ hoạt động đọc, ghi nào sử dụng FileHandle sẽ bắt đầu tại offset 0 của file

Để thực hiện tại vị trí khác trong file (ví dụ để thêm data vào cuối của một file), điều đầu tiên cần làm là seek tới offset nào đó. Ví dụ để di chuyển offset hiện tại tới cuối của file ta sử dụng phương thức seekToEndOfFile

Ngoài ra phương thức seek(toFileOffset:) cho phép chỉ định vị trí chính xác trong tập tin để định vị offset

Cuối cùng phương thức offsetInFile sẽ xác định vị trí của offset hiện tại

## 9. Đọc data từ file

Khi một file được mở, nột dung của file có thể đọc từ vị trí offset hiện tại

Phưogn thức readData(ofLength:) sẽ đọc một độ dài byte xác định trong file bắt đầu từ offset hiện tại
```
let file: FileHandle? = FileHandle(forReadingAtPath: "/Application/Text.txt")

if file == nil {

print("File open failed")

} else {

file?.seek(toFileOffset: 10)

let dataBuffer = file?.readData(ofLength: 5)

file?.closeFile()

}
```
Hoặc sử dụng readDataToEndOfFile sẽ đọc toàn bộ data từ offset hiện tại tới cuối file

## 10 .Ghi data vào File

Phương thức write sẽ ghi data chứa trong một đối tượng Data vào file bắt đầu từ vị trí của offset hiện tại. Lưu ý rằng phương thức này không chỉ thêm data mà còn ghi đè bất kì dữ liệu nào sẵn có tại vị trí được chỉ định

Vd: tạo một file test.txt chứa chuỗi : “The quick brown fox jumped over the lazy dog”

Đoạn code sau sẽ mở file để update, tim đến offset 10 và ghi data vào file
```
let file: FileHandle? = FileHandle(forUpdatingAtPath: filePath1)

if file == nil {

print("File open failed")

} else {

if let data = ("black cat" as NSString).data(using: String.Encoding.utf8.rawValue) {

file?.seek(toFileOffset: 10)

file?.write(data)

file?.closeFile()

}

}
```
# II. Tổng Kết
Qua 2 bài viết vừa rồi của mình hy vọng có thể giúp các bạn nắm được cách thức để làm việc với file và thư mục trong Swift. Cám ơn các bạn đã theo dõi. Hẹn gặp lại trong bài viết tới!