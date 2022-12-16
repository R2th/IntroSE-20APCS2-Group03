> Bên cạnh việc sử dụng robot framework bằng cách chạy RIDE, bài viết sẽ chia sẻ về cách sử dụng robotframework với Eclipse. 

Để có thể sử dụng được robot framework trên eclipse sẽ đi theo các bước sau: 
## 1. Cài đặt Eclipse
* Download Eclipse tại link sau: https://www.eclipse.org/downloads/ -> Chạy file .exe rồi cài đặt.
## 2. Thêm RED Robot Editor
* Cách 1: 
* Sau khi cài đặt xong Eclipse. 
Mở Eclipse --> Help -->  Eclipse Marketplace
![](https://images.viblo.asia/82c3d5d4-9fac-4e4d-89f2-513940f325a9.png)
* Search từ khóa: **red robot editor** -> click install.
![](https://images.viblo.asia/017a1a87-c92e-488c-b5f6-dfcbe8cf142c.png)
* Cách 2: 
Một số bạn khi cài theo cách 1 có thể gặp lỗi. Nếu thử cách 1 không được có thể thử theo cách sau nhé.
* Mở Eclipse --> Help -->  Install New Software --> Click Add
* Paste link: https://sourceforge.net/projects/red-robot-editor/files/repository/0.9.5/ vào mục số 2. -> Click Add. 
## 3. Cài đặt Robot Framework
Mở Eclipse --> Windows --> Preferences --> RobotFramework --> Install RobotFramework
## 4. Tạo project đầu tiên
Làm theo thứ tự như sau nhé: 
* Eclipse --> Windows --> Perspective --> Open Perspective --> Robot
* New --> Project --> Đặt tên project : "RobotProject1"-> Click Finish
![](https://images.viblo.asia/dd645775-8373-42b1-af02-05b860abc455.png)
*  Create new TestSuites:
    Đầu tiên tạo New Folder tên :"TestDemo"  --> Tạo 1 new test suite "TestSuite01"--> đặt tên testcase là: SunnyFirstTest ví dụ như sau: 
         ![](https://images.viblo.asia/fa681050-b020-4445-a19c-43bfb1db0ee2.png)
     ![](https://images.viblo.asia/0494a63a-94cf-4615-b7fa-74c2b269ac6e.png)
![](https://images.viblo.asia/097ebb4c-3373-4bb9-aea3-f077d9002b97.png)
* Note: 
Sau khi run và chạy thì ở cửa sổ elcipse sẽ hiển thị kết quả Pass/Fail. 
Và export ra file Log/report. 
![](https://images.viblo.asia/b4d70692-6ae1-476f-9875-f6a421793a9f.png)

## 5. Tài liệu tham khảo
1. https://www.youtube.com/watch?v=Y66LpQcTR0g