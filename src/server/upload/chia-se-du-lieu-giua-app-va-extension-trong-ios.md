### Giới thiệu

Chắc hẳn khái niệm extensions đã khá quen thuộc với chúng ta, vì chúng là các tiện ích tính năng mở rộng cho app. Tuy nhiên các tiện ích mở rộng ứng dụng iOS chạy như một phần của ứng dụng máy chứ không phải là một phần của ứng dụng chứa ứng dụng (ví dụ ứng dụng của bạn chạy trong ứng dụng của người khác), chia sẻ dữ liệu không tự động. Do vậy việc tìm các vị trí của thư mục tài liệu không hoạt động với dữ liệu được chia sẻ. Trong bài viết này chúng ta sẽ cùng tìm hiểu cách để chia sẻ dữ liệu giữa iOS app và extensions.

**Nào chúng ta cùng tìm hiểu nhé!**

### Sharing non-local or non-app data

Tất nhiên cách dễ dàng là không cần phải chia sẻ dữ liệu ứng dụng địa phương cụ thể. Nếu dữ liệu không thuộc địa phương hoặc không cụ thể cho ứng dụng của bạn, chia sẻ có thể đã được bảo vệ.

Dữ liệu phi địa phương ngụ ý rằng nó được liên kết hoặc có sẵn từ một số nguồn không nằm trong ứng dụng, như một máy chủ web ở đâu đó. Vì các tiện ích mở rộng ứng dụng thường không chạy rất lâu, việc thêm độ trễ mạng có thể không khả thi. Nhưng về nguyên tắc, không có lý do gì mà phần mở rộng không thể thực hiện các cuộc gọi mạng tương tự như ứng dụng.

Cách tiếp cận của Apple trong ứng dụng demo Lister của họ là sử dụng iCloud với Core Data. Đó cũng không phải là địa phương vì nó đồng bộ với dịch vụ iCloud, nhưng có lợi ích của bộ nhớ đệm cục bộ ở cấp hệ thống để tránh sự chậm trễ của mạng. Tất nhiên, Core Data với iCloud có tập hợp riêng của các vấn đề ...

Dữ liệu không cụ thể cho ứng dụng của bạn sẽ giống như cơ sở dữ liệu sổ địa chỉ iOS. Nếu bạn đang sử dụng dữ liệu mà Apple đã cung cấp cho bạn một API cho dữ liệu chia sẻ, bạn đã được thiết lập.

### Set up an App Group

App Group là sơ đồ mà iOS sử dụng để cho phép các ứng dụng khác nhau chia sẻ dữ liệu. Nếu ứng dụng có quyền và quyền cung cấp phù hợp, họ có thể truy cập thư mục dùng chung bên ngoài dữ liệu bảo mật IOS sanbox. 

Chúng ta cùng xem cách thiết lập App Group trên Xcode như sau:

![](https://viblo.asia/uploads/9ede0f0c-c301-4905-b429-e62bfcd90dda.png)

Tất nhiên trước khi làm bước này, chúng ta cần tạo App Group trên trang develop của Apple, và tiến hành enable tính năng AppGroup trong ID của app và extension.

### Using your App Group

Cách đơng giản nhất để sử dụng app group là thông qua việc chia sẻ user default. Thay vì sử dụng lệnh [NSUserDefaults standardUserDefaults] , hãy tạo custom user defaults object:

```Swift
NSUserDefaults *myDefaults = [[NSUserDefaults alloc]
    initWithSuiteName:@"group.com.atomicbird.demonotes"];
[myDefaults setObject:@"foo" forKey:@"bar"];
```

Nếu bạn cần chia sẻ dữ liệu nhiều hơn thì ngoài sử dụng user defaults, bạn có thể truy cập shared group directory thông qua NSFileManager:

```Swift
NSURL *groupURL = [[NSFileManager defaultManager]
    containerURLForSecurityApplicationGroupIdentifier:
        @"group.com.atomicbird.demonotes"];
```

Bất kỳ ứng dụng hoặc tiện ích mở rộng nào với quyền lợi nhóm phù hợp đều có thể truy cập vào cùng một thư mục, do đó, bất kỳ dữ liệu nào lưu trữ ở đó đều được chia sẻ trong số tất cả chúng. Nếu bạn muốn bất kỳ thư mục phụ, bạn sẽ cần phải tạo chúng.

### Keep Your Data Intact

Nhưng trước tiên , đảm bảo rằng bạn không vô tình làm hỏng dữ liệu. Chia sẻ các tập tin dữ liệu có nghĩa là có thể có nhiều quá trình cố gắng sử dụng một tệp cùng một lúc. Sandboxing trên iOS có nghĩa là đây là một tình huống khá hiếm hoi, nhưng điều đó không có nghĩa là bạn có thể bỏ qua nó.

Bạn sẽ muốn sử dụng NSFileCoordinator bất cứ lúc nào bạn muốn đọc hoặc ghi các tập tin chia sẻ của bạn. Bạn cũng sẽ muốn thực hiện NSFilePresenter bất cứ lúc nào bạn cần biết nếu một tập tin đã thay đổi. Chúng được giới thiệu dưới dạng đồng hành với iCloud, trong đó cả ứng dụng của bạn và trình nền iCloud đều có thể muốn truy cập cùng một tệp. Họ không phải là iCloud cụ thể, mặc dù.

**NSFileCoordinator**
NSFileCoordinator thực hiện khóa đọc / ghi để truy cập tệp có thể kết hợp truy cập giữa các quy trình khác nhau. Nó giúp đảm bảo rằng một quá trình được độc quyền truy cập vào một tập tin khi đang writing vào nó.

```Swift
NSFileCoordinator *fileCoordinator = [[NSFileCoordinator alloc] 
    initWithFilePresenter:self];
NSError *fileCoordinatorError = nil;
__block NSArray *savedNotes = nil;

[fileCoordinator coordinateReadingItemAtURL:[self demoNoteFileURL] options:0 
    error:&fileCoordinatorError byAccessor:^(NSURL *newURL) {
    
    NSData *savedData = [NSData dataWithContentsOfURL:newURL];
    
    if (savedData != nil) {
        savedNotes = [NSKeyedUnarchiver unarchiveObjectWithData:savedData];
    }
}];
 }
 }]; 
 ```

Điều quan trọng cần lưu ý là phương pháp NSFileCoordinator chạy đồng thời , do đó, mã của bạn sẽ chặn cho đến khi hoàn tất. Đó là thuận lợi vì bạn không phải chờ đợi cho một callback khối không đồng bộ. Nhưng nó cũng có nghĩa là chúng chặn chủ đề hiện tại. Nếu một số quá trình khác sẽ bận rộn với tệp tin trong một thời gian dài, bạn sẽ kết thúc với việc chờ đợi nó.

**NSFilePresenter**

NSFilePresenter là một giao thức mà bạn có thể thêm vào bất kỳ lớp nào. Trình trình diễn tập tin chỉ là bất kỳ đối tượng nào quan tâm đến trạng thái của tệp và muốn biết khi nào sự việc xảy ra. Hầu hết các phương pháp là tùy chọn và có để thông báo cho bạn rằng tập tin đã thay đổi trong cách này hay cách khác để mã của bạn có thể đáp ứng. Một số phương pháp khác khuyên bạn nên mã của bạn về những điều cần làm - ví dụ: "hey, bây giờ sẽ là thời điểm tốt để lưu bất kỳ thay đổi nào bạn có" ( savePresentedItemChangesWithCompletionHandler: .

Các phương pháp trình trình tập tin mà bạn thực hiện phụ thuộc vào số lượng bạn cần biết về các thay đổi đối với các tệp tin được chia sẻ của bạn. Trường hợp đơn giản nhất có thể sử dụng presentedItemDidChange nhưng không có ai khác. Đó là cuộc gọi chung cho bạn biết rằng một số quy trình khác (ứng dụng hoặc tiện ích của bạn) đã thay đổi nội dung của tệp. Những gì bạn làm phụ thuộc vào cách bạn sử dụng dữ liệu.

Đảm bảo vượt qua đối tượng trình bày tệp tin tới NSFileCoordinator khi bạn tạo nó. Mặc dù nó không cần thiết, nó giúp ngăn chặn mã của bạn được thông báo về những thay đổi của chính nó. Ngoài ra, nếu bạn đang thực hiện các phương pháp như NSFileCoordinator chắc chắn để nói với NSFileCoordinator rằng bạn quan tâm:

```Swift
[NSFileCoordinator addFilePresenter:self];
 ```

### Notifications between Apps and App Extensions

Vẫn không có cơ chế IPC đầy đủ trên iOS. NSDistributedNotificationCenter đã không thực hiện bước nhảy vọt từ OS X tới iOS và có lẽ sẽ không bao giờ. Tuy nhiên, tập tin phối hợp và trình bày có thể phục vụ cùng một mục đích, miễn là các ứng dụng sử dụng cùng một nhóm ứng dụng.

Khi tôi thêm tập tin điều phối và trình bày cho ứng dụng demo của tôi, tôi nhận ra rằng chúng cũng có thể được sử dụng cho các thông báo giữa một ứng dụng và các phần mở rộng của nó. Nếu một trong số họ viết một bài viết phối hợp, trong khi một người khác đang sử dụng một trình trình diễn tập tin cho tập tin, cuộc gọi đến presentedItemDidChange xảy ra gần như ngay lập tức. Thông báo là toàn bộ mục đích của phương pháp đó, vì vậy nó có ý nghĩa nó sẽ làm việc theo cách này. Tôi muốn được thông báo nếu một tệp tin cụ thể thay đổi và đó là cách tôi nhận được thông báo.

Nhưng bạn không cần phải quan tâm đến nội dung tệp để quan tâm đến thông báo. Nếu bạn chỉ muốn có một thông báo, hãy chọn một tên tệp và sử dụng nó làm cơ chế thông báo. Bất cứ lúc nào một quá trình cần phải thông báo cho người khác, thực hiện thay đổi đối với tệp. Các khác sẽ nhận được một cuộc gọi trình bày tập tin, và thông báo là hoàn thành. Nó cảm thấy giống như một hack, nhưng thực sự chính xác đây là cách API được thiết kế để hoạt động.

Một cách tiếp cận khác đã trở nên phổ biến là dự án MMWormhole . Nó bỏ qua thuyết trình tập tin và sử dụng các thông báo cấp độ Darwin thông qua CFNotificationCenterGetDarwinNotifyCenter . Điều này thực sự là một chút giống như NSDistributedNotificationCenter 

**For Watch Apps Only**
Nếu bạn đang viết một ứng dụng của Apple Watch, bạn sẽ có thêm một tùy chọn không có sẵn cho các loại tiện ích mở rộng ứng dụng khác. Trong lớp con của bạn, gọi openParentApplication:reply: để truyền dữ liệu đến ứng dụng có chứa và nhận câu trả lời. Điều đó sẽ kích hoạt một cuộc gọi đến application:handleWatchKitExtensionRequest:reply: trong delegate ứng dụng có chứa ứng dụng. Phương pháp này phục vụ như một thông báo trực tiếp nhưng cũng có thể mang dữ liệu tùy ý.

Không giống các cách tiếp cận khác, điều này có lợi ích mà nó sẽ khởi chạy ứng dụng có chứa nếu nó chưa chạy. Sử dụng phối hợp tập tin hoặc MMWormhole là rất tốt nhưng họ không thể khởi chạy ứng dụng có chứa.

Hạn chế của cách tiếp cận này là nó chỉ có thể được bắt đầu từ ứng dụng Xem. Ứng dụng chứa không có cuộc gọi tương ứng để nói với ứng dụng Xem rằng dữ liệu mới khả dụng.

### Kết Luận

Mặc dù AppExtension và ứng dụng có chứa của nó nằm trong cùng một **Bundle**, chúng không thể trực tiếp liên lạc hoặc chia sẻ dữ liệu. Ngay cả việc liên lạc trực tiếp giữa các Ứng dụng iOS cũng không thể thực hiện được. Tại đây, AppGroups đã giúp chúng ta, AppGroup được sử dụng để chia sẻ dữ liệu giữa AppExtension và ứng dụng chứa của nó và cũng giúp chia sẻ dữ liệu giữa các ứng dụng iOS khác nhau.

##### _Nguồn:_

[http://www.theappguruz.com/blog/ios8-app-groups](http://www.theappguruz.com/blog/ios8-app-groups)
[http://www.atomicbird.com/blog/sharing-with-app-extensions](http://www.atomicbird.com/blog/sharing-with-app-extensions)