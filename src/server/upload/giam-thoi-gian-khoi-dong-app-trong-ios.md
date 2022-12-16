Apple khuyến cáo chúng ta nên lập trình sao cho thời gian khởi động app dưới 4s là tối ưu nhất. Tuy nhiên thì vì nhiều lý do app chúng ta thường khởi động lâu hơn thế. Bên cạnh việc xử lý những tác vụ tiền khởi động ở trong AppDelegate thì chúng ta cũng cần phải biết cách debug việc khởi động chậm và biết được những gì đã xảy ra trước khi app chạy vào AppDelegate. Dưới đây là một số mẹo vặt từ hội nghị WWDC 2016 cho những vấn đề trên.


Sự thật thì đã có rất nhiều tác vụ xử lý đã xảy ra trước khi app gọi đến hàm main() và  applicationWillFinishLaunching. Cho đến trước iOS 10 thì việc tìm hiểu tại sao app khởi động chậm là một việc rất khó khăn và phức tạp. Chúng ta có thể thêm biến DYLD_PRINT_STATISTICS vào trong project scheme nhưng rất khó để đọc output. Đến iOS 10 thì Apple đã điều chỉnh để việc này trở nên dễ hiểu hơn. Ở đây chúng ta sẽ add enviroinment variable DYLD_PRINT_STATISTICS và set giá trị là 1 vào trong project scheme

![](https://images.viblo.asia/a205b860-f598-4a04-b415-b0bbddc04e2b.png)


Và dưới đây là output cho một dự án viết bằng Objective-C chạy trên  iPad Air 2 ( iOS 10 beta 3). Và tác vụ tiền xử lý mất 75ms:

```
Total pre-main time:  74.37 milliseconds (100.0%)
       dylib loading time:  41.05 milliseconds (55.2%)
      rebase/binding time:   8.10 milliseconds (10.9%)
          ObjC setup time:   9.87 milliseconds (13.2%)
         initializer time:  15.23 milliseconds (20.4%)
         slowest intializers :
           libSystem.B.dylib :   6.58 milliseconds (8.8%)
 libBacktraceRecording.dylib :   6.27 milliseconds (8.4%)
```

Từ đây thì chúng ta đã có thể track được thời gian khởi động app một cách chính xác nhất. Trong 

When testing for slow app launch times remember to use the slowest device you support (if you can). Trong video "WWDC 2016 Session 406 Optimizing App Startup Time" tại hội nghị WWDC đã đi vào chi tiết từng bước trong quá trình khởi động app và một vài mẹo nhỏ để giúp tăng tốc quá trình trên: 

dylib loading time là một dynamic loader có nhiệm vụ tìm và đọc những dependent dynamic libraries (dylibs) được sử dụng bởi app. Mỗi một thư viện đều có dependencies của nó. Cơ chế load framework hệ thống của Apple là rất tối ưu tuy nhiên thì khi load những thư viện nhúng của riêng bạn thì lại không như vậy. Để tăng tốc việc load các dylib thì Apple khuyến cáo bạn nên hạn chế các thư viện bên ngoài hoặc gộp chúng lại với nhau làm một framework.

Rebase/binding time là khoảng thời gian app rebase và binding các pointer. Ứng dụng chứa nhiều Objectoive-C class, selector hay category có thể tốn thêm 800ms cho việc khởi động. Sử dụng Struct sẽ làm giảm khoảng thời gian này một cách đáng kể. 

ObjC setup time là lúc Objective-c runtime cần setup một vài tác vụ như class registration, category registration và phân biệt các selector, vì vậy những điều chỉnh ở rebase/binding cũng sẽ áp dụng cho bước này. 

Initializer time là lúc các hàm initializer chạy, nếu bạn sử dụng phương thức +load ở Objective-C thì hãy thay thế nó bằng +initialise.**

Sau những bước trên thì hệ thống sẽ gọi đến hàm main() và UIApplicationMain() trước khi gọi đến các methods trong AppDelegate.

Để tổng kết lại thì tôi có chạy một thí nghiệm nhỏ để kiểm chứng việc thêm nhiều framwork sẽ ảnh hưởng đến thời gian khởi động app. Tôi lấy cột mốc là thời gian khởi động một ứng dụng viết bằng Swift mới được tạo bởi Xcode 8 và chạy trên iPad Air 2.

```
Total pre-main time: 408.97 milliseconds (100.0%)
     dylib loading time: 383.84 milliseconds (93.8%)
    rebase/binding time:   7.86 milliseconds (1.9%)
        ObjC setup time:   6.82 milliseconds (1.6%)
       initializer time:  10.36 milliseconds (2.5%)
       slowest intializers :
         libSystem.B.dylib :   2.33 milliseconds (0.5%)
```


Hệ thống tốn mất 380ms để load framwork. Giả dụ là các thư viện Swift đã được nhúng vào trong App bundle và dưới đây là kết quả sau khi tôi thêm khoảng 10 framework vào trong cocoapod:

```
Total pre-main time: 682.90 milliseconds (100.0%)
     dylib loading time: 631.17 milliseconds (92.4%)
    rebase/binding time:  17.06 milliseconds (2.4%)
        ObjC setup time:  17.47 milliseconds (2.5%)
       initializer time:  17.09 milliseconds (2.5%)
       slowest intializers :
         libSystem.B.dylib :   6.05 milliseconds (0.8%)
```

Như vậy là app tốn thêm gần 300ms nữa để khởi động. Hy vọng là qua ví dụ trên các bạn sẽ có cái nhìn tổng quát về việc tối ưu/sử dụng các library, framework bên ngoài, từ đó tối ưu được việc khởi động project của mình.

Nguồn bài viết: https://useyourloaf.com/blog/slow-app-startup-times