## 1. Giới thiệu.
Nếu như bạn cài đặt và sử dụng thư viện thông qua CocoaPods hay Cathage thì bạn có thể nhận thấy hầu hết các thư viện đều có MIT license.

Về cơ bản bạn có thể sử dụng miễn phí thư viện đó, miễn là bạn có đề cập tới nó ở đâu đó trong ứng dụng của bạn. Có nhiều cách để bạn có thể đưa License vào ứng dụng của mình, trong bài viết này sẽ hướng dẫn bạn bằng cách sử dụng LicensePlist của Mono96 để tạo ra danh sách các pods mà bạn đã sử dụng trong ứng dụng của mình.

## 2. Thêm Pods vào Project.

Khởi tạo một ứng dụng mới để thêm các pods
![](https://images.viblo.asia/752b630e-4a16-4810-8618-91471ea9aaf0.png)

Tiếp theo bạn hãy khởi tạo pod cho project bằng cách chạy lệnh '```pod init``` bằng Terminal tại thư mục của project. 

Thêm các thư viện vào PodFile như hình dưới:
![](https://images.viblo.asia/055a2833-e13a-4923-8c81-085c39ee675a.png)

Giờ bạn hãy tiến hành cài đặt các Pods bằng cách chạy lệnh ``` pod install```.
![](https://images.viblo.asia/6127bae9-743a-40bf-9c1a-08080778c175.png)

## 3.  Thực thi LicensePlist
Sau khi đã cài đặt Homebrew, bạn hãy sử dụng Homebrew để cài đặt LicensePlist

```$ brew install mono0926/license-plist/license-plist```

Lệnh trên sẽ cài đặt thư viện cho chúng ta. Nó sẽ mất một chút thời gian và khi hoàn thành sẽ như sau:


![](https://images.viblo.asia/51f4718a-07ac-46db-8503-c9f100eb5449.png)

 Điều hướng Terminal đến thư mục bạn chứa project và chạy lệnh sau để tạo ra các License:
 
``` license-plist```

Nó sẽ tạo ra các file cho chúng ta. Một cửa sổ mới sẽ hiện ra cùng với các file vừa được tạo ra:
![](https://images.viblo.asia/c188ca4d-42d9-4d47-8295-01e109640980.png)

## 4. Setting Bundle.
Việc tiếp theo cần làm đó tạo file settingbundle trong project của bạn.

![](https://images.viblo.asia/26418fb6-5a47-4378-bbb1-aa99ce707624.png)

Giờ thì bạn hãy kéo các file vừa tạo ở trên vào project của mình như hình: 
![](https://images.viblo.asia/a7362bb8-32bb-4429-814b-a6a4f4c893f3.png)

Bạn hãy build và chạy app xem điều gì xảy ra nhé. 
Sau khi app đã chạy bạn hãy vào phần cài đặt của máy và kéo xuống phần hiển thị app. 
![](https://images.viblo.asia/a530d239-0ad3-45af-bf10-4327e11f5248.png)

Mở nó lên và nhìn xem..
![](https://images.viblo.asia/900ca3b4-60c0-44f4-8fcc-e340e90c96f6.png)

Bạn sẽ không thấy các pods đã cài bởi vì bạn đang dùng settingbundle mặc đinh. Vì vậy hãy và Root.plist để tuỳ chỉnh lại.
![](https://images.viblo.asia/78f93d95-35d9-4d1a-97da-f84dd9562a12.png)

File này sẽ cho chúng ta biết những gì sẽ được hiển thị lên. Bạn hãy xoá hết các entries trong Group đó đi. 
Tạo 1 group mới để sử dụng các Pods. Group này cần có 2 entries là Type và title với kiểu "Child Pane".
![](https://images.viblo.asia/588841ae-066d-4ff3-b814-15b8ed0ae97d.png)

Tiếp theo bạn hãy thêm 1 dòng gọi là Filename

![](https://images.viblo.asia/4c8f832c-fa14-444c-9bc2-948ec1ef3ecd.png)

Bây giờ bạn muốn liên kết Filename với các License, trên kia là 1 cái tên ví dụ để hiển thị. Title sẽ là thứ được hiển thị trong menu cài đặt.
![](https://images.viblo.asia/9ba826e7-0c0b-473d-ab1a-5d618af7c269.png)

Cài đặt và chạy ứng dụng để xem kết quả:

![](https://images.viblo.asia/4c61c8d9-361a-49be-b1e8-2ec7ff872876.png)

Click vào acknowledgements để hiển thị danh sách Pods
![](https://images.viblo.asia/df68baf0-b050-4404-be1e-c8c538eab4d7.png)

Click để xem chi tiết
![](https://images.viblo.asia/7ee599e6-20be-4505-b6f5-0e41fe09a0b7.png)


Chúc bạn thành công. :D

Tham khảo: https://alexduffell.wordpress.com/2017/11/09/how-to-use-licenseplist-to-organise-your-settings-bundle-in-ios/