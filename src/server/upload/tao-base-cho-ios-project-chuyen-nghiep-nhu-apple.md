Các iOS Developer khi trải qua mỗi dự án đều có thêm cho mình nhiều kinh nghiệm và cách nhìn vào hệ thống cũng chuẩn xác và đầy đủ hơn. Bản thân mình cũng kinh qua đôi chục dự án, có những cái cấu trúc rất chuẩn chỉnh (thường là dự án của những công ty lớn, có quy trình chuyên nghiệp) nhưng cũng có những dự án mà mở cái file `.xcworkspace`  lên không có một thư mục nào, toàn bộ file nằm hết trong thư mục gốc (thường là của những ông mới học và code theo kiểu ăn xổi), khá là sợ hãi :cold_sweat:

Sau khi rút ra kinh nghiệm hay có thêm một góc nhìn mới, chúng ta bắt đầu hoàn thiện dần cấu trúc thư mục chuẩn cho bản thân mình. Và đến một lúc bạn nhận thấy việc tạo base project phải lặp đi lặp lại quá nhiều lần và cần thiết phải có sự thống nhất, đó là lúc chúng ta cần phải bắt tay vào làm một cái base chung.

Chúng ta thường có suy nghĩ là tạo một project sẵn, sau đó tạo hết các thư mục và file cần thiết trong đó, đến khi dùng cho dự án mới ta chỉ cần đổi tên là xong. Nhưng rất tiếc, ngoài tên bạn sẽ còn phải đổi một mớ các thông tin khác như bundleID, organization, cập nhật các configuration bị outdate (do bạn để cái base quá lâu mới dùng tới), refactor lại phiên bản Swift, cập nhật hoặc bỏ đi các tính năng mới do không support các iOS version cũ,... vân vân và mây mây. Nói thật chứ mình tạo lại một cái project mới còn đỡ đau đầu hơn.

Để tránh khỏi những rắc rối khi tạo base project bằng việc tạo sẵn project như trên, ta có thể thay thế bằng cách chỉ tạo sẵn cấu trúc thư mục và các file cần thiết. Rồi sau đó khi áp vào dự án mới ta chỉ việc bê nguyên cái cấu trúc đó vào project (nhưng nhớ là bạn vẫn còn phải đổi lại file header đấy nhé). Tuy nhiên, cách này cũng khá là thủ công trong cái thời buổi mọi thứ đều được tự động hóa như thế này.

Và không nói dông nói dài nữa, mình sẽ hướng dẫn cho bạn cách chuyên nghiệp và xịn sò nhất có thể để tạo ra một base project, đảm bảo bạn mà triển khai xong là thấy bá đạo hết xẩy.

Sử dụng **Xcode Template**.

-----

# Xcode Template là gì?

Nghe *Xcode Template* thì chắc là các bạn lạ chứ nhìn mấy cái hình dưới đây thì mình nghĩ chẳng có ông nào làm iOS mà lạ đâu :relieved:

![Project Template](https://images.viblo.asia/9e4640d4-64f1-4c1b-bb23-c360ffe6258a.png)

![File Template](https://images.viblo.asia/408b6f56-3aaf-47c5-bd88-dd907f77e250.png)

Hai cái hình trên chính là thể hiện của hai loại template: **Project Template** (cái trên) và **File Template** (cái dưới). Một cái là để generate ra cả project còn một cái là để generate ra các files đơn lẻ... ừ thì cái tên nói lên tất cả rồi mà. 

Và để biết nó đặt ở đâu thì rất là đơn giản thôi, sau đây là đường dẫn cho bạn :wink:
```
/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/Library/Xcode/Templates
```

Vào đó là bạn có thể tìm thấy một mả *Template* luôn, vậy là biết *Xcode Template* cụ thể là cái gì rồi nhé!

![](https://images.viblo.asia/0a3ac3bf-6b63-4f2c-9438-12bbb2c8280a.png)

Để triển khai base project thì tùy vào mức độ cụ thể và mức độ tự động hóa mà bạn muốn, chúng ta sẽ phải implement cả *Project Template* và *File Template*. Thường thì *Project Template* sẽ để define cấu trúc thư mục còn *File Template* sẽ dùng để cấu trúc chung của các file trong một module theo một pattern nào đó như MVP, VIPER, MVVM... Tuy nhiên mọi chuyện không phải đơn giản nên lần này mình sẽ chỉ hướng dẫn tạo *Project Template*, còn *File Template* thì chúng ta sẽ xem xét sau nhé!

# Triển khai Template của bạn

### Clone template mẫu từ Apple
Về cơ bản thì chúng ta không có tool để generate ra một cái template gốc nào đó, thế nên việc đầu tiên đó là đi clone lại một trong số các template của iOS, ta sẽ lấy template của Single View App. Vì đơn giản thì đây là template mà khi tạo project mới chúng ta đều chọn.
```
/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/Library/Xcode/Templates/Project\ Templates/iOS/Application/Single\ View\ App.xctemplate
```
Để tạo ra custom template thì trước hết chúng ta cần tạo thư mục Templates trong thư mục:
```
~/Library/Developer/Xcode
```
Như sau:

![](https://images.viblo.asia/b628138d-e604-435a-91d3-f5b3e5e74144.png)


Trong thư mục *Templates* tạo hai thư mục con là *File Templates* và *Project Templates* giống với format của thư mục *Templates* ở folder gốc.
Sau đó copy thư mục *Single View App.xctemplate* ở folder gốc sang folder *Project Templates* mới tạo và đổi cái tên đi trông cho nó thành của riêng hé hé :relieved: Ở đây mình đổi thành Sun Asterisk App chẳng hạn.

Mở Xcode lên và chọn *File -> New -> Project* và chúng ta sẽ thấy điều kì diệu như sau:

![](https://images.viblo.asia/d6a01bc8-86c9-4114-9540-bd5ab8641559.png)

Tuy nhiên nếu bạn để ý thì template Single View App đã bị biến mất. Đừng lo, chúng ta sẽ giải thích điều này ngay sau đây.

### Phân tích template mẫu

Vào thư mục *Sun Asterisk App.xctemplate*, ta có thể thấy cây thư mục sau:

![](https://images.viblo.asia/3176c753-6472-4730-9123-9b4005703589.png)

Trong đó:
- *Preview Assets.xcassets*, *Main.storyboard*, *ContentView.swift* là các template file được tạo sẵn để đưa vào trong project khi project được tạo. 
- *TemplateIcon* chính là icon của template. Chắc bạn hiểu ý mình rồi đó, có nghĩa là chúng ta có thể thay cái icon :smiling_imp:
- *TemplateInfo.plist* là file quan trọng nhất, là một *property list* định nghĩa toàn bộ project template. Các file template được đặt vào đâu cũng define trong đó cả.

Để chỉnh sửa template, ta sẽ cần phải làm việc với TemplateInfo.plist

![](https://images.viblo.asia/4e54d838-2cd0-43b9-a2b9-068e745b025d.png)

- ***Kind***: Nhằm xác định xem đây là project template hay file template, ta sẽ thiết lập trường này giá trị `Xcode.Xcode3.ProjectTemplateUnitKind` vì đây là project template.
- ***Identifier***: Là giá trị định danh của template, giống như kiểu BundleID để phân biệt app này app khác thì đây là giá trị để phân biệt template này với template khác. *Đó là lý do tại sao chúng ta thấy Single View App template biến mất*. Vì chúng ta clone nhưng chưa đổi giá trị này, nó đã bị trùng.
- ***Ancestors***: Về cơ bản thì đây là cơ chế kế thừa của hệ thống template. Ancestors là một mảng các *template identifier* mà template hiện tại kế thừa lại. Hiện tại chúng ta thấy template hiện tại kế thừa:
    - `com.apple.dt.unit.coreDataCocoaTouchApplication` mà ta có thể tìm thấy tại `/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/Library/Xcode/Templates/Project\ Templates/iOS/Application/Core\ Data\ Cocoa\ Touch\ App.xctemplate`
    - `com.apple.dt.unit.sceneLifecycleApplication` mà ta có thể tìm thấy tại `/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/Library/Xcode/Templates/Project\ Templates/iOS/Application/UIScene\ Lifecycle.xctemplate`

Các template con sẽ kế thừa lại các option và định nghĩa của template cha, nếu như không muốn support UIScene thì ta có thể thay thế `com.apple.dt.unit.sceneLifecycleApplication` bằng `com.apple.dt.unit.storyboardApplication` chẳng hạn.

- ***Concrete***: Nếu bằng NO hoặc không define giá trị này trong template info, Xcode sẽ hiểu rằng đây là abstract template và sẽ không hiển thị nó ra khi chúng ta lựa chọn template để tạo project mới.
- ***Description***: Khá là rõ ràng, đây là mô tả cho template.
- ***SortOrder***: Mô tả thứ tự của template trong bảng template, nếu không thiết lập thì nó sẽ xếp theo thứ tự bảng chữ cái.
- ***NameOfInitialFileForEditor***: Từ hồi có SwiftUI thì nó mọc ra cái này. Đọc nội dung file Content.swift thì có lẽ là để dùng cho SwiftUI.
- ***Options***: Nơi ta define các option ở đây, chính là các ô nhập để user có thể chọn hoặc điền các giá trị mong muốn khi tạo project.

> TemplateInfo.plist nhìn qua trông có vẻ đơn giản nhưng thực sự thì nó đã kế thừa một đống các thuộc tính từ 2 abstract template `com.apple.dt.unit.coreDataCocoaTouchApplication` và `com.apple.dt.unit.sceneLifecycleApplication` do đó nếu bạn thấy cái options nào là lạ thì thực tế là nó nằm ở template cha đó.

### Custom

Để bắt đầu với việc custom Template, đầu tiên là ta cần phải đổi Identifier, ở đây mình sẽ đổi thành `com.sun-asterisk.singleViewApplication`.

Tiếp theo đó là thay thế Icon, mình sẽ thay thế 2 file `TemplateIcon@2x.png` và `TemplateIcon.png` bằng một file `TemplateIcon.pdf` của mình.
> Nếu như các bạn chưa biết thì nếu Android đọc trực tiếp file .svg là file vector thì iOS làm tương tự với file .pdf nhé
> 

Sau khi thay thế chúng ta có:

![](https://images.viblo.asia/86df2fb1-0ee3-494a-b813-ac52d324d535.png)

![](https://images.viblo.asia/b57ef68e-b877-4eef-9ce4-25abf3b6a411.png)

Tiếp theo đó hãy quit hẳn Xcode và mở lại, thử tạo một Project mới và ta sẽ có kết quả:

![](https://images.viblo.asia/6719a4ff-dbb9-45b0-961c-30c9eae8242d.png)

Trông xịn chưa!!!

Cơ mà đấy mới chỉ là cái vẻ bề ngoài, giờ tạo project ra thì nó cũng không khác gì một *Single View App* cả. Giờ ta sẽ thử đi thêm thư mục và file tự define vào nhé!

Đầu tiên, chúng ta tạo thử một file tên là TestFile.swift và đặt vào thư mục TestFolder. Thư mục TestFolder sẽ đặt trong thư mục của template như sau:

![](https://images.viblo.asia/4ee9c535-c68e-4d07-ba21-b0fa4b99fcde.png)

Nội dung file:

```
//___FILEHEADER___

import Foundation

class HuyC {
}
```
Hoặc bạn có thể ghi bất cứ cái gì. Việc của chúng ta là làm sao để khi tạo project, các thư mục và file chúng ta đã tạo sẵn sẽ xuất hiện ngay trong project của mình.

Truy xuất thông tin trong *TemplateInfo.plist*, bạn sẽ thấy xuất hiện các thẻ ***Nodes*** và ***Definitions***, đây là hai thẻ để chúng ta có thể định nghĩa các file và folder sẽ có trong project. Các thẻ này có lúc nằm ngoài, nhưng cũng có lúc nằm khá sâu trong các option, bởi vì thực tế tùy theo từng lựa chọn ngôn ngữ Objective-C hay Swift, SwiftUI hay Storyboard mà khi đó các file và folder được thiết lập sẵn sẽ khác nhau.

Cũng chính dựa vào bố cục thẻ như vậy mà ta có thể định nghĩa một cách linh hoạt cho các option, ví dụ nếu ta định nghĩa thêm một option về pattern của code và define 2 giá trị như VIPER, MVVM. Ta có thể thiết lập project và file cho mỗi option là khác nhau. Người dùng khi sử dụng template chỉ việc lựa chọn và OK, mọi thứ được tự động generate ra hết sức chuyên nghiệp.

![](https://images.viblo.asia/4fd19f26-9603-4564-b44a-50258e4547fd.png)

Như các bạn có thể thấy bên trên, mình đã define thêm 1 Node: `TestFolder/TestFile.swift` và 1 Definition `TestFolder/TestFile.swift` nằm trong option ở đó ngôn ngữ lựa chọn là Swift và với userInterface là Storyboard. Nghĩa là nếu mình tạo một Sun Asterisk App với tùy chọn như sau:

![](https://images.viblo.asia/c5baa82a-8379-4429-83d3-dfa307165b9f.png)

Chúng ta sẽ được một Project có sẵn folder TestFolder với teamplate file TestFile.swift đã được generate ra như sau:

![](https://images.viblo.asia/a38edae9-0016-46cb-9f89-edb4b3b573d9.png)

Đó, vậy là từ đây bạn đã có thể tự tạo cho mình một project template với một cấu trúc thư mục và file như mong muốn rồi nhé, quẩy lên nào các bạn :sunglasses:

#  Tiếp theo là gì?
Trên đây mới chỉ là giới thiệu để các bạn biết tới và có cái nhìn tổng quan và tự động hóa trong việc tạo base project. Tuy nhiên cũng đủ để chúng ta tạo cấu trúc thư mục và các file có sẵn rồi đó chứ. Việc tiếp theo mà bạn có thể làm đó là hãy thử một số thứ như:
- Chọc vào các template có sẵn của Apple và xem cách họ triển khai.
- Thử định nghĩa ra các option riêng cho template của mình.
- Nghiên cứu thêm về các template string để viết file template.
# Kết

Hy vọng sau bài này các bạn sẽ có thêm những kiến thức bổ ích và nâng tầm bản thân hơn trong công việc. Chúc mọi người có một ngày làm việc hiệu quả nhé :kissing_heart: