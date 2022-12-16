# Giới thiệu
 - Trong phát triển ứng dụng iOs, việc sử dụng dependency từ bên ngoài là việc rất cần thiết. Điều này khiến ta tiết kiện thời gian khi tận dụng được các component mà người khác xây dựng từ trước. Có nhiều cách để tích hợp dependency vào project của mình.
 - Cách đơn giản nhất ta có thể dowload trực tiếp lib từ github và kéo các component tương ứng vào project của mình. Tuy nhiên, việc handle thủ công như vậy sẽ mất thời gian, vào không chuyên nghiệp. Hơn nữa các component này có thể liên quan đển các component của dependency khác khiến việc handle thủ công trở nên khó khăn hơn 
 - Cách thứ hai, chúng ta sử dụng tool quản lí dependency Coapods, Carthage.. để build dependency tự động. Như vậy, việc quản lí sẽ hiệu quả và chuyên nghiệp hơn. Bài viết này sẽ hướng dẫn từng bước để build ứng dụng với Carthage.
# Cài đặt
Có nhiều cách để cài đặt Carthage,
**Cách 1:** Dowload file .pkg tại https://github.com/Carthage/Carthage/releases và run file để cài đặt.

**Cách 2:** Cài đặt trên terminal bằng Homebrew.
    
   **Cài đặt Home brew:**

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```


**Update version mới nhất**
```
brew update
```

Sau khi cài đặt Homebrew ta sẽ cài đặt Carthage bằng lệnh 

```
brew install Carthage
```
# Build Project
Carthage sử dụng file Cartfile để list danh sách các thư viện và version để tích hợp vào project. 

**Tạo file Cart**
    
   
B1: cd đến thư mục project 

B2: Tạo file Cart bằng lệnh 
```
nano Cartfile
```
B3: list các thư viện tương ứng vào file cart. Ví dụ
![](https://images.viblo.asia/29e8610f-fc5d-4c3d-9816-b62c7b2c8779.png)

B4: Crtl + C để thoát và lưu file.

File Cart được định nghĩa theo OGDL: Ordered Graph Data Language.
Có 3 thành phần trong khai báo file Cart.

 *- Dependency origin:* Để nói với Carthage nguồn để fetch dependency.
-  ví dụ: git , github....

*- Tên dependency:* Tên của denpendency cần add vào project. 

*- Dependency Version:* Version muốn add. Cú pháp

-  == 1.0 :  Dùng version 1.0
-  >= 1.0: Các version lơn hơn hoặc bằng 1.0
-  ~> 1.5: Các version tương ứng với 1.5. 

**Build Dependency**

```
carthage update --platform iOS
```

keyword --platform iOS để giới hạn build cho platform ios. Nếu ko có keyword này thì sẽ build cho tấc cả MacOS và Watch

Sau khi build xong trong project sẽ tạo ra file Resolve và folder Carthage như sau:
![](https://images.viblo.asia/fdd34aa3-0fea-4770-9a2d-59fdad3282d4.png)

Mở thư mục Build/iOS. Kéo file Alamofire.framework và AlamofireImage.framework trong BuildPharse/Link Binary with Libraries
![](https://images.viblo.asia/116111db-2ce9-47c4-a79e-d62be4f9ab26.png)

- Add Run Script
- ![](https://images.viblo.asia/883c5660-336e-4d22-93a7-9d02d1da74b3.png)

Add lệnh sau vào link
```
/usr/local/bin/carthage copy-frameworks
```

và input file

```
$(SRCROOT)/Carthage/Build/iOS/Alamofire.framework
$(SRCROOT)/Carthage/Build/iOS/AlamofireImage.framework

```
Đến đây tab BuildPharse sẽ giống như sau  
![](https://images.viblo.asia/d821ba67-d662-4859-9a13-112c651cd074.png)


- Như vậy, chúng ta đã hoàn thành xong config và tích hợp dependency cần thiết vào project. Bây giờ chúng ta có thể import và sử dụng.

![](https://images.viblo.asia/eb00b487-fd46-4942-8d47-19d427030c7a.png)


# Tổng kết