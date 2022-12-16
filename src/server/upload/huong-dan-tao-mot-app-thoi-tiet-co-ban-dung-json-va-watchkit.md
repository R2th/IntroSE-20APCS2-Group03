Ở trong bài hướng dẫn này chũng ta sẽ xây dựng một ứng dụng cực kì đơn giản dùng API của OpenWeatherMap để lấy thông tin về thời tiết của thành phố bất kì nào đó. Dưới đây là hình ảnh cụ thể của ứng dụng sau khi được làm xong:

![](https://images.viblo.asia/c82f67e3-41ce-4a6e-851f-10c148c46238.png)

# Tạo project Xcode

Đầu tiên chúng ta sẽ tạo project bằng cách chọn  Single View Application và tuỳ chỉnh bằng ngôn ngữ Objective-C. 

![](https://images.viblo.asia/a72bb13a-a21c-4946-ac81-4b9fa66f9787.png)

Để tạo một Watch App, vào menu của Xcode, chọn Editor > Add Target. Chọn Apple Watch > WatchKit App. Băng cách sử dung template của WatchKit App, nó sẽ tự động tạo ra tất cả những thứ chúng ta cần để xây một Watch App.

![](https://images.viblo.asia/62da800c-5bd5-4343-ba91-15fcd3e632b4.png)

Bỏ chọn “Include Notification Scene” và để mặc định những lựa chọn còn lại sau đố bấm Finish.

![](https://images.viblo.asia/e3965621-7c0d-4c2d-bd75-5ba3cce3a004.png)

Bây giờ bạn sẽ nhận được một cảnh báo hỏi rằng bạn có muốn tạo một scheme không, hãy chọn Active. Bạn sẽ có hai thư mục: WatchKit Extension và WatchKit App.

![](https://images.viblo.asia/df635077-4a2a-4778-8c80-af1442ef13ae.png)

# Xây dựng UI

Tiếp theo, chúng ta bắt đầu thiết kế giao diện của Watch app. Để làm được việc đó, bạn hãy di chuyển đến “SimpleWeather WatchKit App” và chọn Interface.Storyboard.

Đầu tiên, kéo một label trong Object Library và trong Interface Controller. Đặt tên nó là  "Weather in London". Có lẽ bạn sẽ phải giảm độ lớn của chữ. Sau đó kéo một image vào, tiếp đó là kéo thêm một button vào. Bạn sẽ thấy rằng image và button được sắp xếp một cách tự động theo chiều dọc. Thay đổi tiêu đề của button thành "Update" và chuyển thành màu xanh lá cây. Thay đổi kích cỡ của image sao cho giống với hình bên dưới:

![](https://images.viblo.asia/a1a13326-807e-4731-a4b6-083e46eeba17.png)

Label được sử dụng để hiển thị loại thời tiết, trong khi image được dùng để hiển thị hình ảnh của thời tiết. Button update là yếu tố duy nhất để tương tác với người dùng để cập nhật thông tin về thời tiết.

Interface Builder cho phép bạn xem thiết kể trong nhiều phiên bản của Apple Watch. Mặc định Interface Controller sẽ đặt là Any Screen Size. Bạn có thể chọn "Any Screen Size" ở bên đưới cùng của Interface Builder và chỉnh sang Apple Watch 38/42mm. Nếu bạn chuyển sang Apple Watch 42mm, bạn sẽ thấy rằng ảnh không được dãn hết ra. Hãy thay đổi kích cỡ của ảnh và đảm bảo rằng tất cả đều được sắp xếp chính xác. Khi bạn thay đổi kích cỡ của ảnh, Xcode sẽ thêm một đặc tả riêng về kết cấu chỉ cho Apple Watch 42mm

![](https://images.viblo.asia/efc69aa7-45a4-4c1b-9dbe-73f5bddcb381.png)

# Tìm hiểu về JSON và API của OpenWeatherMap

Như đã tìm hiểu ở trên, chúng ta sẽ sử dụng API của OpenWeatherMap để lấy dữ liệu về thời tiết. Để tìm hiểu cơ chế hoạt động của nó, hãy mở link sau : https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22 . Hãy lấy kết quả và dán nó vào trang sau  http://json.parser.online.fr . Bán sẽ thấy dữ liệu của JSON, được viết lại một cách có cấu trúc. Ở đây, điều chúng ta cần lấy là loại thời tiết, chính là nằm trong phần "main" của "weather" dictionary. Thông tin này chúng ta sẽ hiển thị trên màn hình.

![](https://images.viblo.asia/263576d1-04b6-4c1f-9e90-7c535e5e45b5.png)

Để rõ hơn về API hãy [tham khảo ở đây](http://openweathermap.org/api) .

Bây giờ, làm cách nào để dịch được JSON này và đưa thông tin lấy được lên ứng dụng.

Để bắt đầu, hãy mở Assistant editor. Control-kéo từ label đến code của bạn trong InterfaceController.h. Đặt tên outlet này là "weatherType" như sau:

![](https://images.viblo.asia/d7949f6a-eb38-4c57-8caf-d2c1c8c72673.png)

Hãy lắp lại bước trên đối với image. Đặt tên outlet là "weatherImage". Khi nối button, thay vì chọn Outlet, hãy chọn Action và đặt tên nó là "updateAction".

![](https://images.viblo.asia/6e72e771-be25-4379-a714-fa0c4deb64f8.png)

Hãy thêm logic vào trong updateAction của InterfaceController.m như sau:

```swift
- (IBAction)updateAction
{
    NSURLRequest* requestForWeatherData = [NSURLRequest requestWithURL:[NSURL URLWithString:@"http://api.openweathermap.org/data/2.5/weather?q=London,uk"]];
    NSURLResponse* response = nil;
    NSError* error = nil; //do it always
 
    NSData* data = [NSURLConnection sendSynchronousRequest:requestForWeatherData returningResponse:&response error:&error]; //for saving all of received data in non-serialized view
    
    NSMutableDictionary *allData = [ NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:&error]; //data in serialized view
    NSString* currentWeather = nil;
    
    NSArray* weather = allData[@"weather"];
    
    for (NSDictionary* weatherDictionary in weather)
    {
        currentWeather = weatherDictionary[@"main"];
    }
}
```

Trong hàm này, chúng ta dùng NSURLConnection để tạo một request đồng bộ tới API của OpenWeatherMap. Bạn có thể dùng NSJSONSerialization để chuyển JSON sang object của Foundation. Chúng ta dịch dữ liệu và lưu chúng vào trong "currentWeather".

Tiếp theo. chúng ta cần phải cập nhật label và image. Chúng ta viết như sau:

![](https://images.viblo.asia/5133015b-7d67-4652-9ed1-af6d1dd9d7a7.png)

Nếu viết như trên thì code quá xấu và nó không được mở rộng nếu có thêm loại thời tiết mới.
Thay vì hardcode như trên thì hãy viết như sau:
```swift
-(void)setImageAndTextWithWeather:(NSString* ) weatherName
{
        NSString* weatherNameWithoutSpaces = [weatherName stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]]; //delete potential spaces in JSON array
        [_weatherImage setImageNamed:[weatherNameWithoutSpaces stringByAppendingString:@".jpg"]];
    
    NSMutableAttributedString *customString = [[NSMutableAttributedString alloc] initWithString:weatherNameWithoutSpaces];
    [customString addAttribute:NSFontAttributeName
                         value:[UIFont systemFontOfSize:18] 
                  range:NSMakeRange(0, [weatherNameWithoutSpaces length])]; //Making text more readable by creating a custom string
 
    [_weatherType setAttributedText:customString];
}
```
Sau đó thêm đoạn code sau:
```swift
[self setImageAndTextWithWeather:currentWeather];
```

# Thêm ảnh vào trong Asset Chúng

Một phần việc cuối cùng trước khi chạy ứng dụng. Hãy tải về bộ ảnh [sau](https://www.dropbox.com/s/p959x4w4uzhleuv/weather-images.zip?dl=0), giải nén nó và thêm ảnh vào trong Images.Xcassets bên dưới thư mục SimpleWeather WatchKit App.

![](https://images.viblo.asia/b6a10d17-7a0a-46ea-908e-50360dae0630.png)

Bạn có thể thoải mái thêm bất kì ảnh nào bạn muốn, ứng dụng vẫn hoạt động bình thường.

# Chạy ứng dụng 

Đó là tất cả những hướng dẫn cần thiết để chạy ứng dụng. Hãy build và chạy ứng dụng bằng simulator của Apple Watch. Để chạy ứng dụng, hãy chọn scheme “WatchKitDemo WatchKit App” và chọn loại device mong muốn. Sau đó bấm vào nút chạy ứng dụng để kiểm tran Watch App. 

![](https://images.viblo.asia/3b24d0b4-e56e-46c0-9525-f61d63b31850.png)

Bạn có tải về project hoàn chỉnh [ở đây để tham khảo ](https://www.dropbox.com/s/wdg0zjpxgdjmpg8/SimpleWeather.zip?dl=0) .

Đến đây là kết thúc bài hướng dẫn, mong rằng các bạn có thể kiếm thêm nhiều kinh nghiệm bổ ích, cảm ơn các bạn đã xem.

Ref: https://www.appcoda.com/weather-watchkit-app/