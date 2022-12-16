Hầu hết các hướng dẫn này là để phù hợp với tài liệu của Apple và các best practices tốt nhất được cộng đồng chấp nhận. Một số có nguồn gốc từ sở thích cá nhân. Tài liệu này nhằm mục đích thiết lập một cách làm việc tiêu chuẩn để mọi người có thể làm mọi việc theo cùng một cách. Nếu có điều gì đó bạn không thích thú với những hướng dẫn này, thì bạn cũng nên làm điều đó để phù hợp với mọi người khác.

Tài liệu này chủ yếu nhắm vào phát triển iOS, nhưng chắc chắn cũng áp dụng cho Mac.

## Các toán tử: Operators

```
NSString *foo = @"bar";
NSInteger answer = 42;
answer += 9;
answer++;
answer = 40 + 2;
```

++, --, v.v. được ưu tiên đặt sau biến thay vì trước để phù hợp với các toán tử khác. Các toán tử được phân tách phải luôn được bao quanh bởi các khoảng trắng trừ khi chỉ có một toán hạng.

## Kiểu dữ liệu: Types

Nên sử dụng NSInteger và NSUInteger thay cho int, long, v.v. theo các best practices của Apple và an toàn 64 bit. CGFloat được ưa thích hơn float vì những lý do tương tự. Nó chứng minh tương lai này cho các nền tảng 64 bit.

Tất cả các loại kiểu dữ liệu Apple nên được sử dụng trên các loại nguyên thủy. Ví dụ: nếu bạn đang làm việc với các khoảng thời gian, hãy sử dụng NSTimeInterval thay vì double mặc dù nó đồng nghĩa. Đây được coi là best practices và làm cho code rõ ràng hơn.

## Các phương thức: Methods

```
- (void)someMethod {
    // Do stuff
}


- (NSString *)stringByReplacingOccurrencesOfString:(NSString *)target withString:(NSString *)replacement {
    return nil;
}
```

Luôn phải có khoảng trắng giữa - hoặc + và kiểu trả về ((void) trong ví dụ này). Không nên có khoảng trắng giữa kiểu trả về và tên phương thức.

Không bao giờ nên có một khoảng trắng trước hoặc sau dấu hai chấm. Nếu kiểu tham số là một con trỏ, phải luôn có khoảng trắng giữa tên lớp và *.

Luôn phải có một khoảng trắng giữa phần cuối của phương thức và dấu ngoặc mở. Khung mở không bao giờ nên ở dòng sau.

Luôn phải có hai dòng giữa các phương thức. Điều này phù hợp với một số mẫu Xcode (mặc dù chúng thay đổi rất nhiều) và tăng khả năng đọc.

## Pragma Mark và cách tổ chức 

Một đoạn trích của một UIView:

```
#pragma mark - NSObject

- (void)dealloc {
    // Release
    [super dealloc];
}


#pragma mark - UIView

- (id)layoutSubviews {
    // Stuff
}


- (void)drawRect:(CGRect)rect {
    // Drawing code
}
```

Các phương thức nên được nhóm theo kế thừa. Trong ví dụ trên, nếu một số phương thức UIResponder được sử dụng, chúng nên đi giữa các phương thức NSObject và UIView vì đó là nơi chúng nằm trong chuỗi thừa kế.

## Cấu trúc điều khiển: Control Structures

Luôn phải có một khoảng trắng sau cấu trúc điều khiển (ví dụ: if, else, v.v).

### If/Else

```
if (button.enabled) {
    // Stuff
} else if (otherButton.enabled) {
    // Other stuff
} else {
    // More stuf
}
```

Các câu lệnh `else` nên bắt đầu trên cùng dòng với câu lệnh` if` trước đó.

```
// Comment explaining the conditional
if (something) {
    // Do stuff
}

// Comment explaining the alternative
else {
    // Do other stuff
}
```

Nếu các bình luận được mong muốn xung quanh câu lệnh `if` và `else`, thì chúng phải được định dạng như ví dụ trên.

### Switch

```
switch (something.state) {
    case 0: {
        // Something
        break;
    }
    
    case 1: {
        // Something
        break;
    }
    
    case 2:
    case 3: {
        // Something
        break;
    }
    
    default: {
        // Something
        break;
    }
}
```
Dấu ngoặc được mong muốn xung quanh mỗi trường hợp. Nếu nhiều trường hợp được sử dụng, chúng nên nằm trên các dòng riêng biệt. `default` phải luôn là trường hợp cuối cùng và phải luôn được đưa vào.

### For

```
for (NSInteger i = 0; i < 10; i++) {
    // Do something
}


for (NSString *key in dictionary) {
    // Do something
}
```

Khi lặp lại bằng cách sử dụng số nguyên, nên bắt đầu từ 0 và sử dụng < thay vì bắt đầu từ 1 và sử dụng <=. Liệt kê nhanh thường được ưa thích.

### While

```
while (something < somethingElse) {
    // Do something
}
```

* Import

Luôn sử dụng @class trong các file header thay vì #import vì nó có hiệu suất tăng thời gian biên dịch.

Từ [Objective-C Programming Guide](http://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/ObjectiveC/ObjC.pdf):


> The @class directive minimizes the amount of code seen by the compiler and linker, and is therefore the simplest way to give a forward declaration of a class name. Being simple, it avoids potential problems that may come with importing files that import still other files. For example, if one class declares a statically typed instance variable of another class, and their two interface files import each other, neither class may compile correctly.

## Header Prefix

Thêm các framework được sử dụng trong phần lớn dự án vào header prefix nên được ưu tiên. Nếu các framework này nằm trong header prefix, chúng sẽ không bao giờ được import vào các source code trong dự án.

Ví dụ:

```
#ifdef __OBJC__
    #import <Foundation/Foundation.h>
    #import <UIKit/UIKit.h>
#endif
```

`#import <Foundation/Foundation.h>` không nên import trong dự án trừ trong header prefix.

## Các thuộc tính: Properties

```
@property (nonatomic, retain) UIColor *topColor;
@property (nonatomic, assign) CGSize shadowOffset;
@property (nonatomic, retain, readonly) UIActivityIndicatorView *activityIndicator;
@property (nonatomic, assign, getter=isLoading) BOOL loading;
```

Nếu thuộc tính là `nonatomic`, thì nó phải là đầu tiên. Tùy chọn tiếp theo phải luôn là `retain` hoặc `assign` vì nếu nó bị bỏ qua, sẽ có một cảnh báo. `readonly` nên là tùy chọn tiếp theo nếu nó được chỉ định. `readwrite` không bao giờ được chỉ định trong file .h. `readwrite` chỉ nên được sử dụng trong phần mở rộng của lớp. `getter` hoặc `setter` nên để cuối cùng. setter hiếm khi được sử dụng.

## Private Methods and Properties

MyShoeTier.h

```
@interface MyShoeTier : NSObject {
    
    ...
}

@property (noatomic, retain, readonly) MyShoe *shoe;

...

@end
```

MyShoeTier.m

```
#import "MyShoeTier.h"

@interface MyShoeTier ()
- (void)_crossLace:(MyLace *)firstLace withLace:(MyLace *)secondLace;
@property (nonatomic, retain, readwrite) MyShoe *shoe;
@property (nonaomic, retain) NSMutableArray *laces;
@end

@implementation MyShoeTier

...

@end
```

Các phương thức private phải luôn được tạo trong một phần mở rộng lớp để đơn giản vì một thể loại được đặt tên không thể được sử dụng nếu nó thêm hoặc sửa đổi bất kỳ thuộc tính nào.

Lưu ý: Ví dụ trên cung cấp một ví dụ cho việc sử dụng thuộc tính `readwrite` được chấp nhận.

## Extern, Const, and Static

```
extern NSString *const kMyConstant;
extern NSString *MyExternString;
static NSString *const kMyStaticConstant;
static NSString *staticString;
```

## Tên: Naming

Nói chung, mọi thứ nên được thêm tiền tố với tiền tố 2-3 chữ cái. Tiền tố dài hơn được chấp nhận, nhưng không được khuyến khích.

Đó là một ý tưởng tốt cho các lớp tiền tố với một ứng dụng cụ thể cho ứng dụng nếu đó là code cụ thể của ứng dụng. Nếu có mã bạn dự định sử dụng trong các ứng dụng khác hoặc tìm nguồn mở, bạn nên làm một cái gì đó cụ thể cho công ty của bạn hoặc tiền tố của bạn.

Nếu tên công ty của bạn là Awesome Buckets và bạn có một ứng dụng có tên là Buck Hunter, đây là một vài ví dụ:

```
ABLoadingView // Simple view that can be used in other applications
BHAppDelegate // Application specific code
BHLoadingView // `ABLoadingView` customized for the Bucket Hunter application
```

## Enums


```
enum {
    Foo,
    Bar
};

typedef enum {
    SSLoadingViewStyleLight,
    SSLoadingViewStyleDark
} SSLoadingViewStyle;

typedef enum {
    SSHUDViewStyleLight = 7,
    SSHUDViewStyleDark = 12
} SSHUDViewStyle;
```