# Giới thiệu
**SwiftLint** là công cụ thực thi mã nguồn tuân theo theo phong cách và quy tắc của ngôn ngữ Swift.

Nó sẽ tích hợp trong Source Kit framework của Apple để phân tích mã nguồn của dự án và đảm bảo cú pháp và phong cách của mã nguồn tuân theo các quy ước đã thống nhất trong dự án.

# Các bước tích hợp SwiftLint
Để tích hợp SwiftLint vào dự án ta cần thực hiện các bước dưới đây:
- Cài đặt SwiftLint
- Tích hợp với XCode
- Kiểm chứng quá trình tích hợp
- Cấu hình các luật và quy tắc

# Bước 1: Cài đặt SwiftLint
Ta có thể cài đặt SwiftLint bằng nhiều cách

## Cài đặt qua Brew
`brew install swiftlint`

## Cài đặt qua CocoaPods
Ta sẽ phải theo dòng dưới đây vào trong file **Podfile**
`pod 'SwiftLint'`
Nó sẽ cho phép ta tải về mã nguồn và các gói cần thiết của SwiftLint khi chạy lệnh **pod install** và khi chạy script **${PODS_ROOT}/SwiftLint/swiftlint** trong build phase

## Cài đặt qua Mint
`$ mint install realm/SwiftLint`

## Cài đặt sử dụng pre-build package
Ta có thể tải và cài đặt pre-build package **SwiftLint.pkg** trên Github
Quá trình cài đặt có thể xuất hiện thông báo dưới đây
![](https://images.viblo.asia/4df45056-970b-4bbe-b928-31ca9bddf738.png)

Ta cần cấp quyền thực thi cho file **SwiftLint.pkg** bằng cách **Menu > System Preferences... > Security & Privacy > General** sau đó click nút  **Open Anyway**
![](https://images.viblo.asia/d022ef49-e5b1-4237-aeed-9ce8fb5e81fe.png)

# Tích hợp với XCode
Ta sẽ cần tích hợp với Xcode để SwiftLint phân tích code và hiển thị các cảnh báo và lỗi trên IDE khi build code.
Ta sẽ thêm "“Run Script Phase” với nội dung như sau:
```
if which swiftlint >/dev/null; then
  swiftlint
else
  echo "warning: SwiftLint not installed, download from https://github.com/realm/SwiftLint"
fi
```

![](https://images.viblo.asia/19bdce59-cf0d-4b59-b779-550180b7fd64.png)

# Kiểm chứng quá trình tích hợp
Để kiểm tra việc tích hợp đã thành công hay chưa?
Ta chỉ cần thực hiện build dự án **Product > Build (⌘B)**, nếu ta nhìn thấy nhiều cảnh báo, hay lỗi liên quan tới cú pháp và style của code thì có nghĩa là quá trình tích hợp đã thành công
![](https://images.viblo.asia/c75220aa-8a7c-45f0-91a8-d4eb1efe6aeb.png)


# Cấu hình các luật
SwiftLint bundle bao gồm hơn 75 luật cơ bản và không phải lúc nào chúng ta cũng sử dụng các luật này.
Do đó ta sẽ cấu hình những luật sẽ sử dụng trong dự án thông qua file .swiftlint.yml
```
$ touch .swiftlint.yml
$ open .swiftlint.yml
```

Ta thử cấu hình theo nội dung sau:
```
disabled_rules:
    - force_cast
    - force_unwrapping
line_length:
    warning: 200
    error: 250
    ignores_function_declarations: true
    ignores_comments: true
    ignores_urls: true
```

Với cấu hình trên ta sẽ nhận được cảnh báo khi một dòng code dài trên 200 ký tự, nhận được thông báo lỗi khi một dòng code dài trên 250 ký tự.
Không hiển thị cảnh báo khi **force_cast** và **force_unwrapping**

Cấu hình luật bao gồm:
- disabled_rules: danh sách các luật không sử dụng
- opt_in_rules: danh sách các luật sử sụng 
- analyzer_rules: các luật cho bộ phân tích cú pháp

Ta có thể tham khảo file cấu hình dưới đây cho dự án của mình
```
reporter: "xcode" # reporter type (xcode, json, csv, checkstyle, junit, html, emoji)

excluded: # paths to ignore during linting. Takes precedence over `included`.
    - Carthage
    - Pods

disabled_rules: # rule identifiers to exclude from running
    - trailing_whitespace
    - force_cast
    - force_unwrapping
    - force_try
    - empty_enum_arguments
    - overridden_super_call
    - sorted_imports
#    - colon # Default configuration: warning, flexible_right_spacing: false, apply_to_dictionaries: true
#    - comma # Default configuration: warning
#    - opening_brace
#    - todo
#    - empty_parentheses_with_trailing_closure
#    - empty_string
#    - unused_closure_parameter
#    - unused_setter_value
#    - unused_optional_binding
#    - redundant_void_return
#    - void_return
#    - redundant_string_enum_value
#    - redundant_objc_attribute
#    - closure_parameter_position
#    - control_statement
#    - notification_center_detachment
#    - legacy_constructor
#    - for_where
#    - unneeded_break_in_switch
#    - implicit_getter
#    - duplicate_imports
#    - trailing_newline

opt_in_rules: # some rules are only opt-in
#    - missing_docs
    - yoda_condition            # Default configuration: warning
    - empty_count               # Default configuration: error, only_after_dot: false
    - empty_string              # Default configuration: warning
    - closure_end_indentation   # Default configuration: warning
    - closure_spacing           # Default configuration: warning
    - explicit_init             # Default configuration: warning
    - first_where               # Default configuration: warning
    - number_separator          # Default configuration: warning, minimum_length: 0
    - explicit_failure_calls
    - fatal_error_message
#    - extension_access_modifier
#    - implicitly_unwrapped_optional
#    - operator_usage_whitespace
    - vertical_parameter_alignment_on_call
    - multiline_parameters
#    - multiple_empty_lines # Defined into custom roles
    - nesting

    - private_outlet
    - prohibited_super_call
    - protocol_property_accessors_order
    - redundant_nil_coalescing
    - syntactic_sugar
    - comments_space
    - comments_capitalized_ignore_possible_code
    - comments_capitalized_find_possible_code

line_length:
    warning: 200
    error: 250
    ignores_function_declarations: true
    ignores_comments: true
    ignores_urls: true

function_body_length:
    warning: 80
    error: 150

function_parameter_count:
    warning: 4
    error: 6

type_name: # class name
    min_length: 3
    max_length:
        warning: 60
        error: 80

type_body_length:
    warning: 300
    error: 500

file_length:
    warning: 500
    error: 800
    ignore_comment_only_lines: true

identifier_name: # Variable name
    allowed_symbols: "_"
    min_length: 1
    max_length:
        warning: 60
        error: 80
    excluded:
        - id
        - URL
        - GlobalAPIKey

vertical_whitespace: # warning, max_empty_lines: 1
    max_empty_lines: 3

large_tuple:
    warning: 4
    error: 5

private_outlet:
    allow_private_set: true

#nesting:
#    type_level:
#      warning: 3
#      error: 6
#    statement_level:
#      warning: 5
#      error: 10
  
number_separator:
    minimum_length: 8

#cyclomatic complexity below 4 is considered good;
#cyclomatic complexity between 5 and 7 is considered medium complexity,
#between 8 and 10 is high complexity,
#and above that is extreme complexity.
cyclomatic_complexity:
    ignores_case_statements: true
    warning: 7
    error: 11

custom_rules:
    comments_space: # From https://github.com/brandenr/swiftlintconfig
        name: "Space After Comment"
        regex: '(^ *//\w+)'
        message: "There should be a space after //"
        severity: warning
    
    comments_capitalized_ignore_possible_code:
        name: "Capitalize First Word In Comment"
        regex: "(^ +// +(?!swiftlint)[a-z]+)"
        message: "The first word of a comment should be capitalized"
        severity: warning
      
    explicit_failure_calls:
        name: “Avoid asserting ‘false’”
        regex: ‘((assert|precondition)\(false)’
        message: “Use assertionFailure() or preconditionFailure() instead.”
        severity: warning
    
    multiple_empty_lines:
        name: "Multiple Empty Lines"
        regex: '((?:\s*\n){3,})'
        message: "There are too many line breaks"
        severity: error
  
    force_https: # From https://github.com/Twigz/Game
        name: "Force HTTPS over HTTP"
        regex: "((?i)http(?!s))"
        match_kinds: string
        message: "HTTPS should be favored over HTTP"
        severity: warning
    
    already_true:
        regex: "== true"
        message: "Don't compare to true, just use the bool value."

    already_bool:
        regex: "== false"
        message: "Don't compare to false, just use !value."
        
```

Nguồn tham khảo

https://medium.com/flawless-app-stories/how-to-enforce-swift-style-and-conventions-into-the-project-using-swiftlint-7588b4ffba66