Bài viết này mình xin chia sẻ về một số tip nhỏ khi sử dụng Objective-C
### 1. Enum shorthand
### 
Enum hiểu đơn giản là gán nhãn cho một tập hợp các số interger. Đối với những lập trình viên thiếu kinh nghiệm, họ thường sử dụng những con số để biểu thị cho các trạng thái. Ví dụ khi download ảnh chẳng hạn, họ thường sử dụng 0 = queued, 1 = downloading, 2 = downloaded, 3 = completed... Nếu dùng như thế này, chúng ta rất dễ dàng gõ nhầm và gây ra những lỗi vớ vẩn mà lại khó tìm trong khi code. Điều này có thể sẽ gây tốn thời gian lớn.
Đây là lúc nên sử dụng enums. Enums thực sự rất tiện dụng, nó cho phpes chúng ta ghép nối các nhãn với số interger tương ứng. Nếu vô tình bạn gõ nhầm enum không tồn tại, Xcode có thể dễ dàng nhận ra và báo lỗi cho bạn ngay khi biên dịch. Một hiệu qủa khác của enums đó là bạn có thể nhanh chóng thêm một giá trị mới vào enum đã khai báo và code của bạn sẽ tự động làm việc với giá trị mới.
Có nhiều cách để định nghĩa enums, mình xin giới thiệu cách đơn giản sau:
```
typedef NS_ENUM(NSInteger, VRDownloadState) {
  VRDownloadStateQueued,
  VRDownloadStateDownloading,
  VRDownloadStateDownloaded,
  VRDownloadStateError
};
```

### 2. NSNotification NSString constants
Tương tự như cách sử dụng enums để tránh các trường hợp lỗi không đáng có trong quá trình biên dịch, chúng ta cũng nên sử dụng các hằng số NSString để biểu thị cho một số giá trị. Ví dụ như muốn biểu thị thông báo trạng thái VRStateChangeNotification chẳng hạn, thay bằng việc sử dụng chuỗi trực tiếp là "VRStateChangeNotification" ta khai báo hằng như sau:

**VRUploader.h**
```
extern NSString * const VRStateChangeNotification;
```

**VRUploader.m**

```
#import "VRUploader.h"
NSString * const VRStateChangeNotification = @"VRStateChangeNotification";
```

### 3. Gitignore List for Xcode files

Nếu bạn sử dụng Git để quản lý code của mình, việc paste những content trong file .git-ignore và tránh không cho Xcode commit nhưng file này lên Git là một cách để giảm thiểu nhưng conflict không cần thiết. 
Viết vào file .git-ignore như sau:
```
# Mac OS X
*.DS_Store
 
# Xcode
*.pbxuser
*.mode1v3
*.mode2v3
*.perspectivev3
*.xcuserstate
project.xcworkspace/
xcuserdata/
 
# Generated files
*.o
 
# Backup files
*~.nib
&nbsp;
```

### 4. Open quickly and header scanning
Một kỹ thuật rất mạnh mẽ thường được sử dụng với Xcode để giảm thiểu thời gian tìm kiếm một file cụ thể trong source code của bạn. Đó là tìm bằng cách nhấn tổ hợp phím Ctr + Shift + O và viết tên file muốn tìm vào đó. Bạn sẽ tìm ra nó thật dễ dàng
![](https://images.viblo.asia/f87b59ac-83d9-4454-b14e-99bf992af020.png)
### 5. Define descriptions in your classes
NSLog đã rất quen thuộc trong quá trình debug. Tuy nhiên ít ai biết được rằng chúng ta có thể sử dụng NSLog cho việc hiển thị các thông tin cụ thể của class thay vì chỉ là một mã địa chỉ bộ nhớ. Bạn có thể hiển thị nội dụng đối tượng của mình giống như làm sao để mảng hiện thị các key của chúng. Để làm điều này thì rất đơn giản, chúng ta implement hàm *- (NSString  ) description* trong subclass của bạn. Nếu bạn cần tên class hoặc địa chỉ bộ nhớ bạn có thể sử dụng *[super description]* hoặc sử dụng %p để format và sử dụng self cho địa chỉ bộ nhớ. Để hiện thị tên class thì sử dụng %@ và giá trị tương ứng là *NSStringFromClass([self class])*
```
- (NSString *)description
{
  NSString *className = NSStringFromClass([self class]);
  return [NSString stringWithFormat:@"<%@: %p %@ - %d>", className, self, self.playerID, self.score];
}
```

### 6. Objective-C Literals
- Đối với NSNumber, thay vì phải khởi tạo dài dòng như `[NSNumber numberWithInt:x]`… chúng ta có thể thay thế bằng các cách dưới đây:
```
// character literals.
  NSNumber *theLetterZ = @'Z';          // tương đương với [NSNumber numberWithChar:'Z']

  // integral literals.
  NSNumber *fortyTwo = @42;             // tương đương với [NSNumber numberWithInt:42]
  NSNumber *fortyTwoUnsigned = @42U;    // tương đương với [NSNumber numberWithUnsignedInt:42U]
  NSNumber *fortyTwoLong = @42L;        // tương đương với [NSNumber numberWithLong:42L]
  NSNumber *fortyTwoLongLong = @42LL;   // tương đương với [NSNumber numberWithLongLong:42LL]

  // floating point literals.
  NSNumber *piFloat = @3.141592654F;    // tương đương với [NSNumber numberWithFloat:3.141592654F]
  NSNumber *piDouble = @3.1415926535;   // tương đương với [NSNumber numberWithDouble:3.1415926535]

  // BOOL literals.
  NSNumber *yesNumber = @YES;           // tương đương với [NSNumber numberWithBool:YES]
  NSNumber *noNumber = @NO;             // tương đương với [NSNumber numberWithBool:NO]

#ifdef __cplusplus
  NSNumber *trueNumber = @true;         // tương đương với [NSNumber numberWithBool:(BOOL)true]
  NSNumber *falseNumber = @false;       // tương đương với [NSNumber numberWithBool:(BOOL)false]
#endif
```
- Đối với NSArray: Thay vì dùng khởi tạo `[NSArray arrayWithObjects:…]` chúng ta có thể dùng:

`NSArray *array = @[ @"Hello", NSApp, [NSNumber numberWithInt:42] ];`

## Mẹo viết code ngắn
- Ví dụ ta có đoạn code sau:
```
[self.tableView registerNib:[UINib nibWithNibName:@"Cell1" bundle:nil] forCellReuseIdentifier:@"Cell1"];
[self.tableView registerNib:[UINib nibWithNibName:@"Cell2" bundle:nil] forCellReuseIdentifier:@"Cell2"];
[self.tableView registerNib:[UINib nibWithNibName:@"Cell3" bundle:nil] forCellReuseIdentifier:@"Cell3"];
[self.tableView registerNib:[UINib nibWithNibName:@"Cell4" bundle:nil] forCellReuseIdentifier:@"Cell4"];
...
```
Thay bằng viết như vậy ta viết như sau:
```
NSArray *arrCellName = @[@"Cell1",@"Cell2",@"Cell3",@"Cell4"];
for( NSString *cellName in arrCellName) {
     [self.tableView registerNib:[UINib nibWithNibName:cellName bundle:nil] forCellReuseIdentifier:cellName];
}
```
Như vậy đã rút ngắn được code lặp đi rất nhiều, nếu muốn thêm 1 cell nữa chỉ cần thêm vào mảng arrCellName là xong.
- Một ví dụ khác với switch, bình thường ta viết như này:
```
switch(type) {
	case type1:
		result = @"value1";
	        break;
	case type2:
		result = @"value2";
		break;
	case type3:
		result = @"value3";
		break;
	case type4:
		result = @"value4";
		break;
	case type5:
		result = @"value5";
		break;
	default:
		result = @"valueDefault";
		break;
}
	return result;
```
Thay vào đó chúng ta có thể viết như này:
```
NSDictionary *map = @{
    @(type1) : @"value1",
    @(type2) : @"value2",
    @(type3) : @"value3",
    @(type4) : @"value4",
    @(type5) : @"value5",
}

return map[type] ? : @"valueDefault";
```
Nếu có type nào mới, mình nhét vào dictionary là xong.

### Tài liệu tham khảo
https://richardwarrender.com/2013/03/5-time-saving-objective-c-tips/