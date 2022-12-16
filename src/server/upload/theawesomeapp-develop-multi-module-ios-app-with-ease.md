<div align="center"><img src="https://images.viblo.asia/01497c42-c8c9-4b38-add4-2f24ae0ba3ad.png" /></div><br />

Quản lý các ứng dụng lớn cùng với một nhóm lớn là rất khó. Thời gian biên dịch, hợp nhất, xử lý conflicts, thời gian merge, và rất nhiều vấn đề gây rắc rối và tốn thời gian. Vậy có cách nào để làm nó trở nên dễ dàng hơn. Dưới đây là một ví dụ.

### Ưu điểm của cách thức này
#### * Sử dụng các thức này bạn sẽ có thể quản lý nhiều ứng dụng với nhiều modules khác nhau một cách dễ dàng.
#### * Cách thức này nhằm giảm thiểu thời gian biên dịch, xử lý merge, xử lý conflicts, thời gian tích hợp trong khi mở rộng ứng dụng của bạn.

### Yêu cầu
XCode 10.1+, Carthage 0.32.0+, Hiểu biết cơ bản về iOS.

### Mô tả chung về dự án
Hiện nay, chúng ta phải đối mặt với những dự án mang nhiều thách thức cái có rất nhiều modules khác nhau. Do đó quản lý các ứng dụng như vậy là rất khó khăn.

Có 4 modules chính có thể xuất hiện trong ứng như như:

* **Chat** - Tính năng chat thời gian thực tương tự như Whatsapp.
*  **Play** - Tính năng chơi nhạc giống như Spotify.
*  **Pay** - Tính năng thanh toán giống như PayTM.
*  **Shop** - Chức năng mua sắm giống như Flipkart.

Tất cả tích hợp vào một ứng dụng.

Sau đây là các bước làm thế nào để triển khai một ứng dụng có tính năng mở rộng lớn như thế theo từng bước một một cách đơn giản

## Bước 1: Khởi tạo các Projects.
Với cách thức này, chúng ta sẽ tạo ra 5 projects riêng biệt trên Github cũng như XCode.
Một cái sẽ là project chính gọi là **TheAwesomeApp** cái chúng ta sẽ tích hợp tất cả 4 modules khác.

**1. TheAwesomeApp** - là tên của project chính cái sẽ là ứng dụng tập trung chính nơi mà chúng ta sẽ tích hợp 4 modules còn lại.<br />
**2. Chat** - Tên của chat module project.<br />
**3. Play** - Tên của play module project.<br />
**4. Pay** - Tên của pay module project.<br />
**5. Shop** - Tên của shop module project.

<div align="center"><img src="https://images.viblo.asia/92c14361-ff4a-4ed5-86ae-9521ebdd064f.png" /></div><br />
<div align="center"><img src="https://images.viblo.asia/1dd5f3d9-2ec0-457a-b8f7-9a74a201a035.png" /></div><br />
<div align="center"><img src="https://images.viblo.asia/e1738fa8-0634-49c3-8728-bc2098b37904.png" /></div><br />

Một khi tất cả 5 dự án của chúng ta được tạo trên Github cũng như XCode là chúng ta đã sẵn sàng bắt đầu các quá trình thiết lập cơ bản cho ứng dụng của mình.

## Bước 2: Thiết lập ứng dụng chính TheAwesomeApp.
Trong **TheAwesomeApp**, chúng ta sẽ thêm vào **UITabBarController**, và chúng ta sẽ tạo các view controllers cho mỗi tabs cho 4 modules.

Mở **Main.storyboard**, xoá bỏ tất cả mọi thứ bên trong nó và thêm vào **UITabBarController** cho nó.

Sau đó loại bỏ tất cả các view controllers đã được thêm vào nó. Cũng như đánh dấu nó là **Initial View Controller**. Kết quả cuối cùng giống như bên dưới.

<div align="center"><img src="https://images.viblo.asia/edb272ca-3778-46d1-ab7e-e03ac0285f08.png" /></div><br />

Bây giờ nếu bạn chạy ứng dụng, chẳng có gì được hiển thị ngoài một màn hình đen với một tabbar trống như sau:

<div align="center"><img src="https://images.viblo.asia/28c32551-c2d8-4f59-bf0d-c4f141ac8206.png" /></div><br />

Tiếp theo, chúng ta sẽ thêm các view controllers vào cho tabbar này, không phải từ cùng project mà là từ 4 modules khác nhau.

## Bước 3: Thiết lập Chat Module.
**Note**: Ở đây, chúng ta sẽ sử dụng các tính năng thú vị của [Carthage](https://github.com/Carthage/Carthage).
Carthage giúp chúng ta tạo một shared framework cho quá trình tái sử dụng các modules của mình(Ví dụ: chat module) và rồi tích hợp các modules đó vào trong ứng dụng chính(**TheAwesomeApp**).

Mở dự án cho **Chat module** và thêm vào **target** mới cho nó.

**File > New > Target > Cocoa Touch Framework**

<div align="center"><img src="https://images.viblo.asia/bfa3c136-7f2d-4e9b-a9ec-3a48d93b4ee1.png" /></div><br />
<div align="center"><img src="https://images.viblo.asia/21d64fd4-f6fa-4d49-8056-e5c55602c158.png" /></div><br />
<div align="center"><img src="https://images.viblo.asia/674c6143-ceb6-4ae0-8d8a-43a8c99f2428.png" /></div><br />
<div align="center"><img src="https://images.viblo.asia/efbba230-ec14-4676-ba63-829ab970a2ae.png" /></div><br />

Để tạo ra shared framework này, đảm bảo rằng các schemes được thiết lập được share như bên dưới.

<div align="center"><img src="https://images.viblo.asia/3529a69d-7bcf-4b14-9707-8e25a9f0f74d.png" /></div><br />

Thêm vào **storyboard** và **ChatViewController** cho ChatModule. **ChatViewController** này sẽ được sử dụng trong **TheAwesomeApp**.

<div align="center"><img src="https://images.viblo.asia/6af55e78-571f-46d7-a2a1-89a226fb1095.png" /></div><br />
<div align="center"><img src="https://images.viblo.asia/d7591310-0735-4904-a9e9-60de44ff77f5.png" /></div><br />
<div align="center"><img src="https://images.viblo.asia/da094e4f-11c3-4d67-bfcb-ee0bc12e3fd1.png" /></div><br />
<div align="center"><img src="https://images.viblo.asia/7daf2bfb-5b34-4fbc-aba4-bbf405506281.png" /></div><br />

Bây giờ chúng ta sẽ bắt đầu thiết kế **ChatViewController** trong **ChatModule.storyboard** và đặt tên lớp cũng như **identifier** cho nó.

Mở **ChatModule.storyboard** và thêm vào một **ViewController** cho nó.

<div align="center"><img src="https://images.viblo.asia/56d275c2-08e2-4ea2-abce-461ef4e6b76b.png" /></div><br />

Đừng quên đặt tên **Class** cũng như **Identifier**.

**Note**: Chú ý đẩy **chat project** lên github.

Bây giờ, chúng ta đã sẵn sàng để sử dụng **ChatViewController** này trong **TheAwesomeApp**.

Đầu tiên, chúng ta sẽ thêm **ChatModule** vào **TheAwesomeApp**. Một khi nó làm việc theo đúng kì vọng, chúng ta sẽ xử lý tương tự cho 3 modules còn lại.

## Bước 4: Thêm Chat Module vào ứng dụng TheAwesomeApp.
Mở **TheAwesomeApp** project trong terminal và chạy câu lệnh bên dưới:

```
touch Cartfile && open Cartfile
```

<div align="center"><img src="https://images.viblo.asia/c4c2598a-9e73-4648-bf93-b20233387cf9.png" /></div><br />

Cartfile này chịu trách nhiệm cho việc lấy **ChatModule** về cho **TheAwesomeApp**.

Trong file **Cartfile** này bạn phải viết đường dẫn với Github Repository của **Chat project** như bên dưới:

```
github "ZaidPathan/Chat" "master"
```

**Note**: Hãy đảm bảo bạn thay thế đúng đường dẫn của bạn vào chỗ **ZaiPathan**.

Chạy câu lệnh bên dưới trong terminal để lấy về **ChatModule** cho **TheAwesomeApp**.

```
carthage update --platform iOS --cache-builds
```

Câu lệnh bên trên sẽ lấy cái mà shared framework được định nghĩa trong danh sách các repositories được định nghĩa trong **Cartfile**, trong trường hợp của chúng ta, nó là **ChatModule** từ **ZaiPathan/Chat** repository.

Nếu mọi thứ được thiết lập chính xác, bạn sẽ thấy **ChatModule** sẽ được lấy về.

<div align="center"><img src="https://images.viblo.asia/bc70d4c1-66bd-471b-bda7-3222bc765a4f.png" /></div><br />

Giờ đây bạn đã có **ChatModule** có thể gắn vào và sử dụng, hãy sử dụng nó trong **TheAwesomeApp**.

## Bước 5: Sử dụng ChatModule trong ứng dụng TheAwesomeApp.
Mở thư mục **TheAwesomeApp** và tới thư mục: Carthage > Build > iOS. Ở đây bạn sẽ thấy **ChatModule.framework**, kéo thả nó vào trong **TheAwesomeApp** project. Cũng như đảm bảo **Add to targets** được chọn.

<div align="center"><img src="https://images.viblo.asia/bdb57787-ad49-406c-bd82-54a5c17d95a7.png" /></div><br />
Thêm **ChatModule** vào **Embedded Binaries** của **TheAwesomeApp**.

<div align="center"><img src="https://images.viblo.asia/1327c3b5-fe7f-4213-9a30-503e2fb27461.png" /></div><br />

Giờ đây, mở **Main.storyboard** trong **TheAwesomeApp** và thêm vào **Storyboard Reference** cho nó.

Chọn **Storyboard Reference** và thiết lập chi tiết như bên dưới cho nó:

**Storyboard**: ChatModule
**Reference ID**: ChatViewController
**Bundle**: com.ZaiPathan.ChatModule (Bundle Identifier của ChatModule framework, cái này sẽ khác đối với bạn).

<div align="center"><img src="https://images.viblo.asia/9f08e543-3ef7-49a8-93f5-fced54fc11b7.png" /></div><br />

**Ctrl + Drag** từ UITabBarController vào Reference Storyboard và thiết lập nó như là **view controller**.

<div align="center"><img src="https://images.viblo.asia/d4668621-8f15-4fa7-b235-2892232df0e8.png" /></div><br />

Nhấn **Command + R**, nếu mọi thứ được triển khai một cách chính xác, bạn sẽ thấy **ChatViewController** của **ChatModule** như là view controller đầu tiên của **UITabBarController**.

<div align="center"><img src="https://images.viblo.asia/a7b27860-8610-4808-aa00-bccac53d6c52.png" /></div><br />

Như vậy là chúng ta đã hoàn thành việc thêm vào **ChatModule** cho **TheAwesomeApp**.

## Bước 6: Tích hợp tất cả 3 modules còn lại vào ứng dụng TheAwesomeApp.
Để thực hiện điều này, làm theo bước 3 tới bước 5 cho tất cả 3 modules còn lại, và cuối cùng **Cartfile** sẽ trông như thế này:

```
github "ZaidPathan/Chat" "master"
github "ZaidPathan/Play" "master"
github "ZaidPathan/Pay" "master"
github "ZaidPathan/Shop" "master"
```

Chạy lại câu lệnh bên dưới để lấy tất cả 4 modules cho **TheAwesomeApp**:

```
carthage update --platform iOS --cache-builds
```

Và kết quả cuối cùng sẽ giống như này:

<div align="center"><img src="https://images.viblo.asia/d50677b9-9e94-40be-9aa9-cb0fa40dc362.png" /></div><br />
<div align="center"><img src="https://images.viblo.asia/eaf140c4-19ef-436a-971c-b27939d4216d.png" /></div><br />
<div align="center"><img src="https://images.viblo.asia/a5a770a3-7fef-4008-9741-eb44cd9a9ccd.png" /></div><br />

Nhấn **Command + R**, nếu mọi thứ được triển khai chính xác bạn sẽ thấy **UITabBarController** với 4 modules được thêm vào nó. Bạn không thể thấy các tabs khác bởi vì bạn không đặt tên cho chúng, nhưng bạn vẫn có khả năng click vào mỗi cái đó.

Để thêm title cho mỗi tabs, thêm **UITabBarItem** cho mỗi ViewControllers trong mỗi storyboards và thêm các title riêng biệt cho chúng.

Nhấn **Command + R**, và kết quả cuối cùng như sau:

<div align="center"><img src="https://images.viblo.asia/6b14ad36-9b5b-4c92-9afa-de0d90281972.png" /></div><br />

Vậy là chúng ta đã hoàn thành.

## Kết luận
Chúng ta đã thêm tất cả 4 modules vào **TheAwesomeApp**. Tất cả các nhà phát triển của 4 modules có thể làm việc một cách độc lập mà không bị confilcts, mất nhiều thời gian build,...

Source code đầy đủ cho mỗi module có thể thấy ở đây: **[TheAwesomeApp](https://github.com/ZaidPathan/TheAwesomeApp)**, **[Pay](https://github.com/ZaidPathan/Pay)**, **[Play](https://github.com/ZaidPathan/Play)**, **[Chat](https://github.com/ZaidPathan/Chat)**, **[Shop](https://github.com/ZaidPathan/Shop)**.

## Source
[TheAwesomeApp: Develop multi module iOS app with ease](https://medium.com/captain-ios-experts/theawesomeapp-develop-multi-module-ios-app-with-ease-7a8b01366812).
## Reference

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))