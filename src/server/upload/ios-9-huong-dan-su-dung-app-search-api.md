# iOS 9 App Search

Xin chào anh em, hôm nay tôi sẽ hướng dẫn các bạn lập trình app iOS một cách để làm sao cho người dùng có thể tìm kiếm nội dung bên trong app của các bạn bằng Spotlight thông qua API được gọi là iOS 9 app search.

Thời gian vừa qua tôi có viết app tutorial cho một trò chơi moba có tên là [Vainglory](https://www.vainglorygame.com/) (Các bạn có thể tải ứng dụng của mình ở đây [VainGuide](https://apps.apple.com/vn/app/vainguide/id1475257736?l=vi)). Sau khi tò mò sử dụng một vài app từ điển linh tinh, tôi thấy có một ý tưởng rất hay có thể implement cho ứng dụng của mình, đó là ngay khi người dùng không sử dụng app, nhưng khi sử dụng Spolight để tìm kiếm và gõ vào một từ khóa bất kì trùng với tên một hero chẳng hạn. 

![](https://images.viblo.asia/a0d97061-4ebf-4f3c-b23f-45e61d53768d.PNG)

Người dùng sẽ ngay lập tức nhìn thấy thông tin của hero ấy, nếu họ nhấn chọn thì sẽ mở đến ứng dụng, qua đó tăng thời lượng sử dụng ứng dụng. Một cách rất hay để níu chân người dùng đúng không nào.

Lan man quá rồi, cùng xem chúng ta phải làm những gì nào?

# Getting Started

App search trong iOS 9 có ba thành phần mà chúng ta cần lưu ý sau:

* **NSUserActivity**: Được xuất hiện lần đầu trên iOS 8 dùng cho chức năng Handoff. Bạn có thể tìm đọc về Handoff để có thể có được cái nhìn tổng quát hơn
* **Core Spotlight**: Được xuất hiện trên iOS 9 chính là cái mà chúng ta cần để có thể tìm kiếm nội dung trong app bằng Spotlight.
* **Web Markup**: Dùng cho các trang web, nghĩa là chúng ta có thể sử dụng nó để tìm kiếm nội dung trên trang web bằng spotlight, nhưng tôi sẽ không đề cập đến nó trong bài viết này.

Bây giờ tôi giả sử ứng dụng của mình có một màn hình chứa danh sách các hero như thế này:

![](https://images.viblo.asia/4442843b-e2e5-411c-84ea-4a71c80b950c.png)

Bây giờ tôi muốn có thể tìm kiếm theo tên các hero bên ngoài Spotlight. Việc đầu tiên đó là import CoreSpotlight

```
#import <CoreSpotlight/CoreSpotlight.h>
```

Đối tượng mà chúng ta quan tâm đến đó là `CSSearchableIndex` và phương thức của nó là [`indexSearchableItems(_:completionHandler:)`](https://developer.apple.com/documentation/corespotlight/cssearchableindex/1620333-indexsearchableitems)

Như đã thấy, tham số truyền vào của phương thức này là một mảng, nghĩa là chúng ta cần tạo một mảng các thông tin của những hero sẽ có thể tìm kiếm bằng Spotlight.

Các phần tử của mảng này có kiểu là [`CSSearchableItem`](https://developer.apple.com/documentation/corespotlight/cssearchableitem). Như trong tài liệu chúng ta có thể thấy một thuộc tính của `CSSearchableItem` có tên là [`attributeSet`](https://developer.apple.com/documentation/corespotlight/cssearchableitem/1621649-attributeset). 

Vì mỗi item này ứng với một hero nên tôi sẽ đặt một phương thức khởi tạo `CSSearchableItem` và `attributeSet` trong class Hero như sau:

```
- (CSSearchableItemAttributeSet *)attributeSet {
    CSSearchableItemAttributeSet *attributeSet = [[CSSearchableItemAttributeSet alloc] initWithItemContentType:@"com.viblo.search.hero"];
    attributeSet.title = self.name;
    attributeSet.contentDescription = self.heroInfo;
    NSMutableArray *keywords = [NSMutableArray arrayWithArray:[attributeSet.contentDescription componentsSeparatedByString:@" "]];
    [keywords append:self.name];
    attributeSet.keywords = [[NSSet alloc] initWithArray:keywords].allObjects;
    attributeSet.thumbnailData = UIImageJPEGRepresentation([UIImage imageNamed:self.name], 0.9);
    return attributeSet;
}

- (CSSearchableItem *)searchableItem {
    CSSearchableItem *item = [[CSSearchableItem alloc] initWithUniqueIdentifier:[NSString stringWithFormat:@"com.viblo.search.hero.%@",self.name]
                                                               domainIdentifier:[NSString stringWithFormat:@"com.viblo.search.hero",self.name] attributeSet:self.attributeSet];
    return item;
}

```

Và bây giờ là lúc gọi đến phương thức `indexSearchableItems(_:completionHandler:)`. Vậy chúng ta cần gọi phương thức này khi nào? Tùy thuộc vào cách xử lý của mỗi ứng dụng, chúng ta có thể đặt ở AppDelegate hoặc ở đâu đó đảm bảo là nó được gọi đến đầu tiên khi chúng ta sử dụng ứng dụng.

Trong ví dụ này tôi đặt nó bên trong màn hình danh sách các hero:

```
NSMutableArray *searchableItems = [NSMutableArray array];
for (Hero *hero in self.heroes) {
        [arr addObject:hero.searchableItem];
}
[[CSSearchableIndex defaultSearchableIndex] indexSearchableItems:searchableItems completionHandler:^(NSError * _Nullable error) {
        if (error) {
            NSLog(@"CSSearchableIndex ERROR: %@",error.localizedDescription);
        }
}];
```

Done. Và bây giờ tôi đã có thể tìm kiếm theo tên hero trong Spotlight:

![](https://images.viblo.asia/a4aacb3e-4441-4b7b-8450-c07a465d36d7.png)

Nhưng khi nhấn vào kết quả tìm kiếm để có thể hiển thị đúng thông tin của từng hero thì chúng ta cần thêm một bước xử lý nữa.

#  Handle Action

Mỗi khi người dùng nhấn vào kết quả hiển thị trên Spotlight, app của chúng ta sẽ được mở và một phương thức được gọi đến là 

```
- (BOOL)application:(UIApplication *)application 
continueUserActivity:(NSUserActivity *)userActivity 
 restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> *restorableObjects))restorationHandler;
```

Để phân biệt trường hợp Handoff và Spotlight Search, chúng ta sử dụng thuộc tính có thên là `activityType`, nếu nó là `CSSearchableItemActionType` thì chúng ta sẽ tiến hành xử lý tương ứng.:

```
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
    if ([userActivity.activityType isEqualToString:CSSearchableItemActionType]) {
      NSDictionary *userInfo = userActivity.userInfo;
      NSString *uniqueIdentifier = [userInfo objectForKey:CSSearchableItemActivityIdentifier];
       // Do something
      return YES;
    }
    return NO;
}
```

Bên trong câu lệnh if chúng ta kiểm tra `uniqueIdentifier` xem nó ứng với hero nào và mở detail của hero tương ứng. Sau bước xử lý này, mỗi khi người dùng tìm kiếm và nhấn vào kết quả trong Spotlight, ứng dụng của chúng ta sẽ được mở và tự điều hướng đến đúng hero được chọn. Pretty cool, isn't it?

![](https://images.viblo.asia/92341500-f932-473e-9ed6-bb60f4943592.png)

# Tổng kết

Vậy là tôi của cùng các bạn có được một cái nhìn cơ bản về cách làm sao để implement Spotlight app search trên iOS. Hi vọng bài viết này hữu ích và giúp các bạn tăng khả năng tương tác của người dùng với ứng dụng của mình hơn.

À mà nói qua một chút [Vainglory](https://www.vainglorygame.com/) là một game moba cực hay đa nền tảng mobile/PC chiến được tất. Đồ họa thì phải nói cực đẹp, game play rất cân bằng và thú vị. Tuy nhiên ở Việt Nam có vẻ nhiều bạn vẫn chỉ biết đến Liên Quân mô bai. Nếu các bạn có đã, đang và sẽ có ý định chơi thử game Vainglory này thì ứng dụng [VainGuide](https://apps.apple.com/vn/app/vainguide/id1475257736?l=vi) của mình là một cẩm nang không thể thiếu đấy.

Chúc các bạn có những phút giây vui vẻ! Cheers!