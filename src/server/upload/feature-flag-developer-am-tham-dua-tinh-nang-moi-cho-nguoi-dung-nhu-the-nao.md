Hãy tưởng tượng, team của bạn đang cần xử lý 1 tình huống như thế này:

* **Tình huống:** Application của công ty đang chạy ổn định, nhưng người dùng phàn nàn UI quá rắc rối, do đó chúng ta phải re-design lại 1 số trang.
* Sau khi đã có desisgn mới, quá trình implement các trang này khá lâu. Để PM và QA có thể test được, ta phải implement các trang này, kết nối với data thật hoặc data ở ***môi trường Staging.***
 
* **Yêu cầu:** Sau khi PM xác nhận, QA đã test xong, ta sẽ **cho 1 số beta user dùng thử** UI mới trước, còn lại vẫn dùng UI cũ. Sau một thời gian, ta sẽ cho toàn bộ người dùng sử dụng UI mới
* Trong quá trình implement các trang này, ta vẫn phải bảo trì, sửa đổi và nâng cấp application cũ.

=> *Redesign hệ thống luôn luôn là chuyện đau đầu*

Một trong những cách đơn giản nhất là tạo 1 branch riêng để implement việc re-design này. Sau đó, khi implement xong thì ta có thể **merge vào branch chính.**

Tuy nhiên, với những thay đổi lớn như vậy, việc merge code/setup về lâu dài sẽ **khá phức tạp**. Ta cũng **khó mà cho beta user dùng thử design mới,** vì họ không thể vào môi trường staging.

Do vậy, ta có 1 cách hay và hiệu quả hơn nhiều, đó là **dùng feature flag.**

# 1. Feature Flag là cái gì?
Nói đơn giản, Feature Flag là 1 kĩ thuật cho phép developer **thay đổi cách hoạt động của ứng dụng, mà không cần phải sửa code** (ngạc nhiên chưa).

Nghe cao siêu như vậy chứ kĩ thuật này không hề phức tạp chút nào. Ta sẽ **sử dụng một biến, xem nó như cờ (flag)** để quyết định luồng chạy của ứng dụng.

Code ở đây cũng khá đơn giản thôi, dựa vào giá trị ***SHOWNEWUI*** là true hay false mà ta sẽ hiển thị UI cũ hay UI mới!

```php
function showPages() {
  // ... Show UI cũ
}

function showPagesV2() {
  // Show UI mới, đang code
}


// Code cũ, trước khi dùng feature flag
function showUI() {
  showPages() // Show UI cũ
}

// Code mới, sau khi có feature flag
function showUI() {
  // Feature flag tên SHOW_NEW_UI, lưu vào variable
  const SHOW_NEW_UI = true;

  if (SHOW_NEW_UI) {
     showPagesV2()
  } else {
     showPages() // Show UI cũ
  }
}
```


Tới đây hẳn bạn đọc sẽ thắc mắc: Ủa nếu vậy muốn thay đổi hoạt động của ứng dụng, ta cũng **phải sửa code** để thay đổi biến SHOW_NEW_UI sang false hoặc true mà ?? Thằng Code Dạo lừa mình à??

Hihi, thật ra mình không lừa các bạn đâu. Để làm được chuyện đó, chúng ta sẽ **không lưu giá trị của feature flag SHOW_NEW_UI trong code**, mà lưu ở … chỗ khác cơ!

# 2. Lưu trữ feature flag ở đâu?
Feature flag được dùng để thay đổi cách hoạt động của một chương trình. Do vậy, để có thể dùng feature-flag hiệu quả, ta phải tìm cách **thay đổi giá trị của Flag đó, mà không cần thay đổi code.**

Do vậy, feature flag thường được lưu trữ như sau:

* Lưu trữ trong code, mỗi khi sửa phải deploy lại code
* Lưu trữ trong configuration file (web.config trong C#, .env trong NodeJS) hoặc biến môi trường. Khi cần sửa chỉ cần sửa config và chạy lại
* Lưu trữ trong 1 số service bên ngoài, developer/PM có thể vào và bật/tắt flag này


![](https://images.viblo.asia/8a6d2f3c-52e9-4bad-a4b4-9ddf5ff965ae.png)

*Sử dụng launchdarkly, PM hoặc dev chính có quyền vào thay đổi flag*
 

Lúc này, feature flag có thể được dùng như sau:

```php
function showUI() {
  // Dùng hàm isFlagEnable để lấy giá trị flag, thay vì hardcode
  const SHOW_NEW_UI = isFlagEnable('show-new-ui');

  if (SHOW_NEW_UI) {
     showPagesV2()
  } else {
     showPages() // Show UI cũ
  }
}

isFlagEnable(flagName) {
  // Lấy giá trị flag từ config hoặc biến môi trường
  const flagEnable = Env[flagName] || Config[flagName]; 
  // Lấy giá trị flag từ 1 service nào đó
  flagEnable = flagService.getFlag(flagName) 
  
  return flagEnable
}
```


# 3. Ứng dụng của Feature Flag
Các bạn thấy không, Feature Flag chỉ là 1 kĩ thuật đơn giản, nhưng ta có thể làm được khá nhiều hay ho với nó:

* Code chưa hoàn chỉnh ta cũng có thể deploy được, chỉ cần set feature flag thành false là code đó sẽ không chạy
* Set feature flag khác nhau ở mỗi môi trường khác nhau. Ví dụ flag đó là true ở môi trường test và stage,  cho PM và QA có thể tha hồ test, không ảnh hưởng đến môi trường production.
* Khi gắn feature flag, ta nên **truyền thêm context và thông tin người dùng**. Do vậy, ta có thể show tính năng mới cho beta user, cho 1 số người dùng được chỉ định.

```php
isFlagEnable(flagName) {
  // Lấy tên, email của người dùng hiện tại
  const currentUser = userService.getCurrentUser(); 
  
  // Kiểm tra xem người dùng hiện tại
  // có được dùng chức năng có tên "flagName" không
  const flagEnable = flagService.getFlag(flagName, currentUser) 
  
  return flagEnable
}
```

![](https://images.viblo.asia/94b96bbf-bfdf-46a3-9890-93311746cca0.png)

*Với feature flag, ta có thể roll out dần tính năng cho người dùng*

# 4. Một số kinh nghiệm khi dùng feature-flag
Ngoài ra, một số kinh nghiệm nho nhỏ khi dùng feature flag

* **Đặt tên flag dễ hiểu**: Tên flag cũng như tên biến vậy, các bạn nên viết rõ ràng flag này dùng cho chức năng gì, chứ đừng ghi “flagA”, “flagB” sau này kiểm tra lại mệt lắm đấy
*** Gắn vô nhớ gỡ**: Khi thêm 1 flag vào code, các bạn nên tạo ticket/note lại để gỡ flag đó ra khỏi code sau này. Ví dụ các bạn đã code xong chức năng mới, thay vì để flag đó true hoài thì hãy … xoá luôn flag đó, sửa lại code là được
* **Hạn chế độ phức tạp**: Đôi khi, flow của ứng dụng sẽ khá phức tạp. Nếu dùng Feature Flag, bạn sẽ thêm if/else vào nên càng phức tạp hơn. Để hạn chế, bạn nên code chức năng mới trong hàm/mobile mới, sau đó **dùng flag để show/UI những UI** gọi code mới đó
* **Cho phép PM/QA sửa feature-flag**: Một số tool quản lý feature-flag có kèm theo dashboard, phân quyền, cho phép ta phân quyền những người được đổi flag. Theo kinh nghiệm của mình cứ cho PM/QA và đổi flag khi cần để họ test. Nếu ổn thì PM cũng có thể bật flag trên Production để relase 1 tính năng luôn.
# 5. Tạm kết
- Bài viết này dùng khá nhiều thuật ngữ kĩ thuật, do đó có đoạn nào chưa rõ ràng, các bạn có thể tìm hiểu thêm nhé!

- Bản thân bạn và team có dùng feature-flag không? Bạn có kinh nghiệm gì hay ho với nó không? Hãy chia sẽ trong mục comment nha!

 

***Tìm hiểu thêm:***

1. https://martinfowler.com/articles/feature-toggles.html
1. http://featureflags.io
1. https://en.wikipedia.org/wiki/Feature_toggle
1. https://stackoverflow.com/questions/7707383/what-is-a-feature-flag