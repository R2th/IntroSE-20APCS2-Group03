The Receptionist design pattern giải quyết vấn đề chung về chuyển hướng một sự kiện xảy ra trong một bối cảnh thực thi của ứng dụng sang bối cảnh thực thi khác để xử lý. Đó là một mô hình lai. Mặc dù nó không xuất hiện trong cuốn sách  Gang of Four, nhưng nó kết hợp các yếu tố của các mẫu thiết kế Command, Memo và Proxy design pattern được mô tả trong cuốn sách đó. Nó cũng là một biến thể của mô hình Trampoline (cũng không xuất hiện trong cuốn sách). Trong mẫu này, một sự kiện ban đầu được nhận bởi một đối tượng trampoline,   nó ngay lập tức bị trả lại hoặc chuyển hướng sự kiện đến một đối tượng đích để xử lý.

### The Receptionist Design Pattern in Practice

Một thông báo KVO gọi observeValueForKeyPath:ofObject:change:context: phương thức được thực hiện bởi một observer. Nếu sự thay đổi đối với thuộc tính xảy ra trên một luồng thứ cấp, thì observeValueForKeyPath:ofObject:change:context: code thực thi trên cùng một luồng. Có đối tượng trung tâm trong mẫu này, hoạt động như một trung gian luồng. Như Hình minh họa, một đối tượng receptionist được chỉ định là observer thuộc tính mô hình đối tượng property. Receptionist thực hiện observeValueForKeyPath:ofObject:change:context: để chuyển hướng thông báo nhận được trên một luồng phụ sang bối cảnh thực thi khác trong hàng đợi hoạt động chính, trong trường hợp này. Khi property thay đổi, receptionist nhận được thông báo KVO. receptionist ngay lập tức thêm một hoạt động khối vào hàng đợi hoạt động chính,khối chứa code được chỉ định bởi máy khách mà cập nhật giao diện người dùng một cách thích hợp.

![](https://images.viblo.asia/43b53fb4-f3a3-452d-ad2f-114bd7cba218.jpg)

**Bouncing cập nhật KVO vào hàng đợi hoạt động chính**
                                
                                
Bạn định nghĩa một lớp receptionist để nó có các yếu tố cần thiết để tự thêm vào như một observer của một thuộc tính và sau đó chuyển đổi một thông báo KVO thành một nhiệm vụ cập nhật. Do đó, nó phải biết đối tượng mà nó đang quan sát, thuộc tính của đối tượng mà nó đang quan sát, nhiệm vụ cập nhật nào để thực hiện và hàng đợi để thực hiện nó. Đoạn code dưới cho thấy khai báo ban đầu của lớp RCRecellectist và các biến thể hiện của nó.

Declaring the receptionist class
```swift 

@interface RCReceptionist : NSObject {
    id observedObject;
    NSString *observedKeyPath;
    RCTaskBlock task;
    NSOperationQueue *queue;
}

 ```
 
**Biến đối tượng RCTaskBlock là một đối tượng khối của kiểu khai báo sau**
```swift 
typedef void (^RCTaskBlock)(NSString *keyPath, id object, NSDictionary *change);
 ```
 
 Các tham số này tương tự như tham số của phương thức observeValueForKeyPath:ofObject:change:context ,Tiếp theo  lớp tham số khai báo một phương thức factory lớp duy nhất trong đó một đối tượng RCTaskBlock là một tham số:
```swift 
+ (id)receptionistForKeyPath:(NSString *)path
        object:(id)obj
         queue:(NSOperationQueue *)queue
          task:(RCTaskBlock)task;
 ```
 
**Phương thức factory lớp để tạo một đối tượng receptionist**

```swift  

+ (id)receptionistForKeyPath:(NSString *)path object:(id)obj queue:(NSOperationQueue *)queue task:(RCTaskBlock)task {
    RCReceptionist *receptionist = [RCReceptionist new];
    receptionist->task = [task copy];
    receptionist->observedKeyPath = [path copy];
    receptionist->observedObject = [obj retain];
    receptionist->queue = [queue retain];
    [obj addObserver:receptionist forKeyPath:path
             options:NSKeyValueObservingOptionNew | NSKeyValueObservingOptionOld context:0];
    return [receptionist autorelease];
}

 ```
 
 Lưu ý rằng code  sao chép đối tượng khối thay vì giữ lại nó. Vì khối có thể được tạo trên ngăn xếp, nên nó phải được sao chép vào heap để nó tồn tại trong bộ nhớ khi thông báo KVO được gửi.

Cuối cùng, lớp tham số triển khai phương thức observeValueForKeyPath:ofObject:change:context:

```swift  
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object
        change:(NSDictionary *)change context:(void *)context {
    [queue addOperationWithBlock:^{
        task(keyPath, object, change);
    }];
}
 ```

Code này chỉ đơn giản là liệt kê nhiệm vụ vào hàng đợi hoạt động đã cho, chuyển khối nhiệm vụ cho đối tượng được quan sát, đường dẫn chính cho thuộc tính đã thay đổi và từ điển chứa giá trị mới. Tác vụ được gói gọn trong một đối tượng NSBlockOperation thực thi tác vụ trên hàng đợi.

Đối tượng máy khách cung cấp mã khối cập nhật giao diện người dùng khi nó tạo một đối tượng receptionist, Lưu ý rằng khi nó tạo đối tượng receptionist, máy khách sẽ chuyển vào hàng đợi hoạt động mà khối sẽ được thực thi, trong trường hợp này là hàng đợi thao tác chính.


**Creating a receptionist object**
```swift 

 RCReceptionist *receptionist = [RCReceptionist receptionistForKeyPath:@"value" object:model queue:mainQueue task:^(NSString *keyPath, id object, NSDictionary *change) {
            NSView *viewForModel = [modelToViewMap objectForKey:model];
            NSColor *newColor = [change objectForKey:NSKeyValueChangeNewKey];
            [[[viewForModel subviews] objectAtIndex:0] setFillColor:newColor];
        }];

 ```


### Khi nào nên sử dụng Receptionist Pattern

Bạn có thể áp dụng mẫu thiết kế Receptionist bất cứ khi nào bạn cần chuyển công việc sang bối cảnh thực thi khác để xử lý. Khi bạn quan sát thông báo hoặc triển khai trình xử lý khối hoặc trả lời thông báo hành động và bạn muốn đảm bảo rằng mã của bạn thực thi trong ngữ cảnh thực thi phù hợp, bạn có thể triển khai mẫu Receptionist để chuyển hướng công việc phải được thực hiện cho việc thực thi đó bối cảnh. Với mẫu Receptionist, bạn thậm chí có thể thực hiện một số bộ lọc hoặc kết hợp dữ liệu đến trước khi bạn thoát khỏi một tác vụ để xử lý dữ liệu. Ví dụ: bạn có thể thu thập dữ liệu thành các đợt và sau đó, trong khoảng thời gian đó sẽ gửi các lô đó đi nơi khác để xử lý.

Một tình huống phổ biến trong đó mẫu Receptionist hữu ích là key-value observing. Trong key-value observing, các thay đổi đối với giá trị của một đối tượng mô hình thuộc tính mô tả được truyền đạt tới người quan sát thông qua các thông báo KVO. Tuy nhiên, thay đổi đối tượng mô hình có thể xảy ra trên một luồng nền. Điều này dẫn đến sự không phù hợp của luồng, bởi vì các thay đổi đối với trạng thái mô hình đối tượng mô hình thường dẫn đến các cập nhật cho giao diện người dùng và những điều này phải xảy ra trên luồng chính. Trong trường hợp này, bạn muốn chuyển hướng các thông báo KVO đến luồng chính. nơi các bản cập nhật cho giao diện người dùng ứng dụng có thể xảy ra.