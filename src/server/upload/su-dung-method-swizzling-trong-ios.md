- Method swizzling là gì và sử dụng nó thế nào? Hôm nay chúng ta cùng tìm hiểu về nó nhé.
- Method swizzling là một sức mạnh mà Objective C Runtime mang lại cho chúng ta nhằm mục đích chuyển đổi việc thực hiện ngay tại thời điểm runtime.
- Hay nói đơn giản hơn là khi bạn call một method thì có thể việc thực hiện nội dung trong method đó không được tiến hành, mà thực tế lại tiến hành một nội dung của method khác. Có thể nó ít được biết tới và sử dụng nhưng nó lại có sức mạng riêng và nghe thật ảo diệu đúng không, nhưng khi nào thì nên sử dụng nó và khi nào thì không nên sử dụng nó? Bởi vì nó có thể thay đổi nội dung implement nên nó cũng rất nguy hiểm nếu sử dụng không hợp lý, sử dụng quá nhiều và có thể dẫn tới chính bản thân bạn cũng không biết nội dung thực tế nó sẽ implement là gì :v.

### 1. Trước tiên chúng ta cùng nhau đặt vấn đề nhé.
- Khi lập trình iOS chắc hẳn ai cũng đã từng sử dụng NSUserDefaults. Trong dự án của bạn sẽ có rất nhiều chỗ bạn sử dụng nó. Nhưng bây giờ bạn muốn mỗi khi bạn lưu một giá trị gì đó thì console sẽ in ra giá trị của giá trị đó. Vậy bạn sẽ làm thế nào? Bạn sẽ subclass hay tạo category đúng không? Thật đơn giản quá đi mà.
- Ví dụ bạn sẽ tạo category cho NSUserDefaults như sau:
```ObjectiveC
#import "NSUserDefaults+SZUserDefaults.h"

@implementation NSUserDefaults (SZUserDefaults)

- (void)szSetObject:(id)value forKey:(NSString *)defaultName 
{
    [self setObject:value forKey:defaultName];
    NSLog(@"[SZ] Set object %@ for key %@", value, defaultName);
}
@end
```
- Và việc sử dụng nó cũng rất đơn giản phải không?
```ObjectiveC
#import "ViewController.h"
#import "NSUserDefaults+SZUserDefaults.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
    [userDefaults szSetObject:@"A value" forKey:@"aKey"];
}

@end
```
- Tới đây có vẻ các bạn đã đạt được mục đích. Nhưng trên thực tế nhìn vào code thì thấy bạn đang sử dụng một method khác thay vì method chuẩn **NSUserDefaults#setObject:forKey:** Người đọc sẽ thấy tò mò là vì sao bạn lại viết một method khác **szSetObject:forKey** và jump vào đọc nó, thực thể chả có vẹo gì ngoài việc log giá trị.

### 2. Giải quyết vấn đề
- Để giải quyết vấn đề này thì chúng ta sử dụng **method swizzling**.
```ObjectiveC
#import "NSUserDefaults+MonitoringWrites.h"
#import <objc/runtime.h>

@implementation NSUserDefaults (MonitoringWrites)

+ (void)load
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Class class = [self class];
        
        SEL defaultSelector = @selector(setObject:forKey:);
        SEL swizzledSelector = @selector(swizzled_setObject:forKey:);
        
        Method defaultMethod = class_getInstanceMethod(class, defaultSelector);
        Method swizzledMethod = class_getInstanceMethod(class, swizzledSelector);
        
        BOOL isMethodExists = !class_addMethod(class, defaultSelector, method_getImplementation(swizzledMethod), method_getTypeEncoding(swizzledMethod));
        
        if (isMethodExists) {
            method_exchangeImplementations(defaultMethod, swizzledMethod);
        } else {
            class_replaceMethod(class, swizzledSelector, method_getImplementation(defaultMethod), method_getTypeEncoding(defaultMethod));
        }
    });
}

#pragma mark - Method Swizzling
- (void)swizzled_setObject:(id)value forKey:(NSString *)defaultName 
{
    [self swizzled_setObject:value forKey:defaultName];
    NSLog(@"Set Object %@ for key %@", value, defaultName);
}
```

- Method load là một class method, vì method swizzling có tầm ảnh hưởng toàn bộ (global state) nên ở đây tạo 1 class method.
- Nếu bạn đã quen với việc sử dụng **dispatch_once** thì bạn đã biết nó được để thực thi chỉ 1 lần trên các luồng khác nhau (nó cũng liên quan tới vấn đề race conditions). Tức là đoạn mã trong block chỉ được thực hiện duy nhất 1 lần trong vòng đời ứng dụng.
- Chúng ta cùng nhau phân tích đoạn mã sau nhé:
```ObjectiveC
SEL defaultSelector = @selector(setObject:forKey:);
SEL swizzledSelector = @selector(swizzled_setObject:forKey:);
        
Method defaultMethod = class_getInstanceMethod([self class], defaultSelector);
Method swizzledMethod = class_getInstanceMethod([self class], swizzledSelector);
BOOL isMethodExists = !class_addMethod([self class], defaultSelector, method_getImplementation(swizzledMethod), method_getTypeEncoding(swizzledMethod));
```
- Selector là một chuỗi đại diện cho tên phương thức trong thời gian chạy. Hai dòng đầu nhằm mục đích lấy ra 2 method mà chúng ta sẽ thực hiện swizzle.
- Hai dòng tiếp theo là chúng ta lấy ra method dựa trên class và selector đã có. Sau 2 dòng này chúng ta sẽ có reference tới 2 method chúng ta đang cần swizzle.
- Để lấy ra con trỏ tới phần implement của method thì sử dụng dòng cuối ở đoạn code trên. Ngoài ra các bạn có thể tham khảo hình ảnh sau để dễ dàng hiểu hơn
![](https://images.viblo.asia/3351ac05-d478-4feb-945b-bd0dd20d6f1a.png)

### 3. Phần khó khăn nhất
- Có lẽ đoạn code đã viết bên trên thì phần khó hiểu và cần giải thích chính là mã sau:
```ObjectiveC
BOOL isMethodExists = !class_addMethod([self class], defaultSelector, method_getImplementation(swizzledMethod), method_getTypeEncoding(swizzledMethod));
        
if (isMethodExists) {
    method_exchangeImplementations(defaultMethod, swizzledMethod);
} else {
    class_replaceMethod([self class], swizzledSelector, method_getImplementation(defaultMethod), method_getTypeEncoding(defaultMethod));
}
```
- Method **class_addMethod** dùng để add method **swizzledMethod**. Kết quả trả ra nếu method được add thành công. Ở đây tại sao chúng ta lại check isMethodExists? Là bởi vì chúng ta cần phải check, nếu add thành công tức là bạn có thể sử dụng method mà bạn đã add, còn nếu bạn không check và luôn thực hiện **method_exchangeImplementations** thì lại có vấn đề đúng không (crash đó)? Còn nếu đã tồn tại thì cứ sử dụng thôi.
- Giờ đây bất cứ đâu sử dụng setObject:forKey thì đều có Log của bạn nhé :D

### 4. Có nên sử dụng Swizzle?
- Tuy rằng sức mạng và mục đích của nó đã được nói tới bên trên. Nhưng để sử dụng nó chúng ta cũng nên cân nhắc nó
    - Đừng sử dụng nó khi bạn không hiểu về nó.
    - Việc khắc phục nó sẽ rất khó khăn. Vì khi bạn sử dụng 2 lần liên tiếp method swizzling thì nó lại như bạn đầu. Vậy bạn sẽ không thể kiểm soát được nó nếu bạn sử dụng nó một cách bừa bãi. Dẫn tới bạn mất kiểm soát.
    - Nếu đoạn code của bạn viết trong framework và sử dụng nó cho 1000 app thì toàn bộ apps như đang chuẩn bị nổ =)). Vì vậy hãy tránh sử dụng nó trong framework.

Trên đây là một số ý kiến giúp bạn cân nhắc trước khi sử dụng nó.

Cám ơn các bạn đã đọc.