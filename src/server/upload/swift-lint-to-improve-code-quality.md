Swift Lint là một open sourse tool để thực thi swift style và convention. Swift Lint được phát triển bởi Realm. Bạn có thể set coding style rules của bạn và buộc phải tuân theo trong quá trình phát triển. SwiftLint có một command line tool, Xcode plugin, tích hợp AppCode and Atom. Vì vậy, nó luôn phù hợp với môi trường phát triển của bạn. Nó sẽ hiển thị cho bạn các warning và / hoặc error nếu bạn vi phạm các coding style rule. Bài viết này sẽ giúp bạn biết đượccách để thiết lập SwiftLint cho một dự án hiện có, và với Fastlane.
## Bước 1. Install the tool
Thêm vào *Podfile* và gọi *pod install*.
```
pod 'SwiftLint'
```
## Bước 2. Run script on build
trong Target > Build Phases > New Run Script Phase, thêm
```
"${PODS_ROOT}/SwiftLint/swiftlint"
```
Bây giờ, bất cứ khi nào bạn build the target, swiftlint sẽ chạy.
Nếu bạn run với một dự án hiện tại, nó có thể có show warning hoặc error. Điều này là do các rule mặc định đang được sử dụng.
## Bước 3. Customize the rules
Bạn có thể tìm thấy [tất cả các rules](https://github.com/realm/SwiftLint/blob/master/Rules.md) trong wiki. Theo mặc định, khoảng 70% được kích hoạt.
Bạn có thể [customize the rules](https://github.com/realm/SwiftLint#configuration) với file .swiftlint.yml trong thư mục root.
Chúng ta hãy nhìn vào cách thức hoạt động của file cấu hình:
```
# Bạn có thể disable những rules được mặc định enable
disabled_rules:
  - identifier_name
  - force_cast

# Tương tự bạn có thể enable những rules được mặc định disable
opt_in_rules:
  - first_where

# Loại trừ các thư mục mà bạn không muốn Swift Lint check
excluded:
  - Pods
  - fastlane

# Sử dụng "xcode" để khi bạn xây dựng, kết quả sẽ được hiển thị trong Xcode 
reporter: "xcode" 
# Các reporter khác: json, csv, checkstyle, junit, html, emoji

# Rule `function_body_length` mặc định kích hoạt warning ở 40 dòng, error ở 100 dòng
# Ví dụ dưới đây sẽ update  `function_body_length` kích hoạt warning ở 120 dòng, error ở 300 dòng
function_body_length:
  warning: 120
  error: 300
```
Đôi khi, bạn cần tìm hiểu sâu hơn vào [code cho mỗi rule](https://github.com/realm/SwiftLint/tree/master/Source/SwiftLintFramework/Rules) để hiểu cách hoạt động của nó.
Và bạn cũng có thể tạo các [custom rules](https://github.com/realm/SwiftLint#defining-custom-rules).
## Bước 4. Integrate with fastlane
Bạn đã có thể xem các warning bất cứ khi nào bạn build trong Xcode.
Tích hợp với Fastlane là phục vụ một mục đích khác - để tạo ra một HTML report.
```
desc "Run lint"
lane :lint do
  swiftlint(
    mode: :lint,
    executable: "Pods/SwiftLint/swiftlint",
    reporter: "html",
    output_file: "swiftlint-results.html",
    ignore_exit_status: true
  )
end
```
Sử khác biệt với việc sử dụng fastlane là reporter được set là html. Bạn có thể run *fastlane lint*  bằng tay và mở swiftlint-results.html để xem tất cả các vi phạm.
## Bước 5. Autocorrect
Đối với một số rules,  Swift Lint có thể tự động fix code của bạn. 
```
# Add another lane that run autocorrect mode
desc "Run lint autocorrect"
lane :lint_autocorrect do
  swiftlint(
    mode: :autocorrect,
    executable: "Pods/SwiftLint/swiftlint",
    config_file: ".swiftlint-autocorrect.yml"
  )
end
```
Lưu ý rằng chúng ta sử dụng một file cấu hình khác *.swiftlint-autocorrect.yml* . Và trong file này, chúng ta sử dụng một cách tiếp cận khác để định nghĩa rules - whitelisting.
```
# Only work with these rules
whitelist_rules:
  - trailing_whitespace
  - trailing_newline
  - vertical_whitespace
```
Run *fastlane lintautocorrect* và xem kết quả.
## Bước 6: Disable rules in code
Đôi khi, trong một vài trường hợp, bạn muốn phá vỡ các rules. Khi điều đó xảy ra, bạn có thể vô hiệu hóa rules [trong code](https://github.com/realm/SwiftLint#disable-rules-in-code) trong từng trường hợp cụ thể.
```
// swiftlint:disable force_cast
// Now the rule force_cast is disabled
let noWarning = NSNumber() as! Int
// Re-enable back the rules
// swiftlint:enable force_cast

// Disable with `this` (inline), `next` (next line) or `previous`
let noWarning = NSNumber() as! Int // swiftlint:disable:this force_cast
```
## Summary: Cách tiếp cận với dự án có sẵn
*  Sử dụng rules mặc định
*  Build
*  Sửa một rule bằng:
1. Autocorrect, Nếu có thể
2. Remove rule bằng cách thêm vào *disabledrules*
3. Customize rule
4. Disable trong code
Khi tất cả các default rules đã cố định, hãy đi qua những rule mặc định bị disable. Thêm chúng vào *optinrules* nếu cần.
Hy vọng bài viết sẽ hữu ích đối với các bạn