## I. RuboCop là gì?
RuboCop là một trình phân tích code tĩnh, nó phân tích code dựa trên các phương pháp hay nhất được các nhà phát triển Ruby trên khắp thế giới tuân theo và được định nghĩa trên hướng dẫn về kiểu [Ruby của cộng đồng ](https://rubystyle.guide/).

Ngoài việc phân tích code, nó còn cung cấp cho chúng ta tính năng tự động định dạng code và sửa các cảnh báo bên trong code của chúng ta.

Nếu bạn đến từ nền tảng Javascript, bạn có thể đã nghe nói về ESLint.

* RuboCop là ESLint cho Ruby

Ngoài Ruby, RuboCop cũng cung cấp gem để thực hiện các quy tắc trên các phần mở rộng khác nhau như Rails, Minitest, RSpec, v.v.
## II. Tại sao nên sử dụng RuboCop?
Vậy tại sao chúng ta cần RuboCop? Việc sử dụng RuboCop trong các dự án giúp ích được gì?

Dưới đây là một số lý do tại sao các dự án muốn sử dụng RuboCop:

### 1. Clean Code
Tất cả chúng ta đều muốn viết code rõ ràng tuân theo các phương pháp hay nhất được các nhà phát triển trên khắp thế giới tuân theo. Các phương pháp hay nhất đến từ kinh nghiệm, có thể mất một vài năm để biết về ngôn ngữ và biết các mô hình nên tránh và mô hình tốt để làm theo nếu chúng ta chỉ dựa vào bản thân mình.

Với RuboCop, chúng ta có lợi thế là không cần phải có kinh nghiệm vì các phương pháp hay nhất đã được đóng gói thành quy tắc và chuyển cho chúng ta bên trong `gem "rubocop"`. RuboCop đưa ra các cảnh báo bất cứ khi nào chúng ta vi phạm các quy tắc được định cấu hình cho các phương pháp hay nhất và sau khi khắc phục các vấn đề này, phần lớn code của chúng ta luôn *clean* và *dễ hiểu*.

### 2. Giúp quá trình xem xét code dễ dàng
Mục đích chính của việc xem xét code là sửa lỗi logic trong codes hoặc sửa các lỗ hổng bảo mật hoặc thảo luận về con đường mà chúng ta đã thực hiện để phát triển tính năng.

Hãy tưởng tượng một tình huống mà chúng ta đẩy một đoạn code có lỗi đánh máy và người đánh giá phát hiện ra lỗi đó, sau đó nhận xét về nó để sửa vì rõ ràng là không ai muốn đưa đoạn code có lỗi đánh máy đó lên staging hoặc production. Điều này sẽ làm mất đáng kể thời gian phát triển và tiềm ẩn các incident không đáng có.

RuboCop đảm bảo rằng code có vấn đề sẽ không bao giờ được pass khi đẩy pull request.

### 3. Thực hành tốt nhất là chẳng có gì phù hợp với tất cả
Thông thường, mỗi người sẽ có phong cách code khác nhau, dẫn đến một dự án thường có những template code riêng để hợp nhất code cho cả dự án. Với RuboCop, nó cũng có thể dễ dàng format lại cả phong cách lẫn gợi ý các phưong pháp code tốt, tránh accs đoạn *bad code*.

## III. Thiết lập RuboCop trong Rails
Trong bài viết này, chúng ta sẽ cài đặt `gem 'rubocop'` chính để thực hiện các quy tắc trong code Ruby cùng với phần mở rộng `'rubocop-rails'` cho Rails.

### 1. Thêm gem vào Gemfile
Thêm phần sau vào Gemfile bên trong nhóm `:development`, `:test`
```
group :development, :test do
  # enforce rails best practice with rubocop
  gem 'rubocop', '~> 1.18.0', require: false
  gem 'rubocop-performance', '~> 1.11.0', require: false
  gem 'rubocop-rails', '~> 2.11.0', require: false
end
```

LƯU Ý : bạn có thể cập nhật bản mới nhất phù hơpj cho dự án của mình.

Ở trên thêm các gem sau vào Gemfile:

* rubocop: Đối với Ruby
* rubocop-performance: Đối với các quy tắc liên quan đến code performance
* rubocop-rails: Đối với Rails
### 2. Cài đặt Gem trong Dự án
Cài đặt rubocop trên toàn dự án.

```
gem install rubocop
```

Điều này sẽ giúp chúng tôi chạy các lệnh được cung cấp bởi gem 'rubocop' như định dạng tự động, chạy rubocop trong dự án, v.v.

### 3. Thêm file config

Để kiểm soát (bật / tắt) các quy tắc, chúng ta cần tạo tệp cấu hình cho mỗi tiện ích mở rộng. Nếu không có tệp thì RuboCop sẽ bật các tiện ích mở rộng mặc định. Tôi thích có các tệp cấu hình vì nó mang lại sự linh hoạt cho nhóm.

Hãy tạo các tệp cấu hình cho RuboCop và các phần mở rộng của nó:

```
  $ cd /path/to/our/project
  $ touch .rubocop.yml
  $ touch .rubocop-performance.yml
  $ touch .rubocop-rails.yml
```

### 4. Thêm quy tắc vào file config
Để custom các quy tắc bạn có thể tìm thấy nó tại [RuboCop Configuration Files for Rails](https://prabinpoudel.com.np/articles/rubocop-configuration-files-for-rails/).
Hãy cập nhật các tệp cấu hình và thêm các quy tắc cho Ruby và các phần mở rộng đã cài đặt.

***Ruby***

```
# .rubocop.yml

# The behavior of RuboCop can be controlled via the .rubocop.yml
# configuration file. It makes it possible to enable/disable
# certain cops (checks) and to alter their behavior if they accept
# any parameters. The file can be placed either in your home
# directory or in some project directory.
#
# RuboCop will start looking for the configuration file in the directory
# where the inspected file is and continue its way up to the root directory.
#

inherit_from:
  - '.rubocop-performance.yml'
  - '.rubocop-rails.yml'

require:
  - rubocop-performance
  - rubocop-rails

AllCops:
  TargetRubyVersion: 2.7
  TargetRailsVersion: 6.0
  Exclude:
    - '**/db/migrate/*'
    - 'db/schema.rb'
    - '**/Gemfile.lock'
    - '**/Rakefile'
    - '**/rails'
    - '**/vendor/**/*'
    - '**/spec_helper.rb'
    - 'node_modules/**/*'
    - 'bin/*'

###########################################################
###################### RuboCop ############################
###########################################################

# You can find all configuration options for rubocop here: https://docs.rubocop.org/rubocop/cops_bundler.html

###########################################################
####################### Gemspec ###########################
###########################################################

Gemspec/DateAssignment: # (new in 1.10)
  Enabled: true

###########################################################
######################## Layout ###########################
###########################################################

Layout/ClassStructure:
  ExpectedOrder:
    - module_inclusion
    - constants
    - association
    - public_attribute_macros
    - public_delegate
    - macros
    - initializer
    - public_class_methods
    - public_methods
    - protected_attribute_macros
    - protected_methods
    - private_attribute_macros
    - private_delegate
    - private_methods

Layout/EmptyLineAfterMultilineCondition:
  Enabled: true

Layout/EmptyLinesAroundAttributeAccessor:
  Enabled: true

Layout/FirstArrayElementIndentation:
  EnforcedStyle: consistent

Layout/FirstArrayElementLineBreak:
  Enabled: true

Layout/FirstHashElementIndentation:
  EnforcedStyle: consistent

Layout/FirstHashElementLineBreak:
  Enabled: true

Layout/LineEndStringConcatenationIndentation: # (new in 1.18)
  Enabled: true

Layout/LineLength:
  Max: 150
  Exclude:
    - '**/spec/**/*'

Layout/MultilineArrayBraceLayout:
  EnforcedStyle: new_line

Layout/MultilineOperationIndentation:
  EnforcedStyle: indented

Layout/MultilineHashBraceLayout:
  EnforcedStyle: new_line

Layout/MultilineHashKeyLineBreaks:
  Enabled: true

Layout/MultilineMethodCallBraceLayout:
  EnforcedStyle: new_line

Layout/MultilineMethodDefinitionBraceLayout:
  EnforcedStyle: new_line

Layout/SpaceAroundMethodCallOperator:
  Enabled: true

Layout/SpaceBeforeBrackets: # (new in 1.7)
  Enabled: true

Layout/SpaceInLambdaLiteral:
  EnforcedStyle: require_space


###########################################################
######################## Lint #############################
###########################################################

Lint/AmbiguousAssignment: # (new in 1.7)
  Enabled: true

Lint/AmbiguousBlockAssociation:
  Exclude:
    - '**/spec/**/*'

Lint/AssignmentInCondition:
  AllowSafeAssignment: false

Lint/BinaryOperatorWithIdenticalOperands:
  Enabled: true

Lint/DeprecatedConstants: # (new in 1.8)
  Enabled: true

Lint/DeprecatedOpenSSLConstant:
  Enabled: true

Lint/DuplicateBranch: # (new in 1.3)
  Enabled: true

Lint/DuplicateElsifCondition:
  Enabled: true

Lint/DuplicateRegexpCharacterClassElement: # (new in 1.1)
  Enabled: true

Lint/DuplicateRequire:
  Enabled: true

Lint/DuplicateRescueException:
  Enabled: true

Lint/EmptyBlock: # (new in 1.1)
  Enabled: true

Lint/EmptyClass: # (new in 1.3)
  Enabled: true

Lint/EmptyConditionalBody:
  Enabled: true

Lint/EmptyFile:
  Enabled: true

Lint/EmptyInPattern: # (new in 1.16)
  Enabled: true

Lint/FloatComparison:
  Enabled: true

Lint/LambdaWithoutLiteralBlock: # (new in 1.8)
  Enabled: true

Lint/MissingSuper:
  Enabled: true

Lint/MixedRegexpCaptureTypes:
  Enabled: true

Lint/NoReturnInBeginEndBlocks: # (new in 1.2)
  Enabled: true

Lint/NumberConversion:
  Enabled: true

Lint/NumberedParameterAssignment: # (new in 1.9)
  Enabled: true

Lint/OrAssignmentToConstant: # (new in 1.9)
  Enabled: true

Lint/RaiseException:
  Enabled: true

Lint/RedundantDirGlobSort: # (new in 1.8)
  Enabled: true

Lint/SelfAssignment:
  Enabled: true

Lint/SymbolConversion: # (new in 1.9)
  Enabled: true

Lint/ToEnumArguments: # (new in 1.1)
  Enabled: true

Lint/TrailingCommaInAttributeDeclaration:
  Enabled: true

Lint/TripleQuotes: # (new in 1.9)
  Enabled: true

Lint/UnexpectedBlockArity: # (new in 1.5)
  Enabled: true

Lint/UnmodifiedReduceAccumulator: # (new in 1.1)
  Enabled: true

Lint/UnusedBlockArgument:
  IgnoreEmptyBlocks: false

Lint/UnusedMethodArgument:
  IgnoreEmptyMethods: false

Lint/UselessMethodDefinition:
  Enabled: true

###########################################################
######################## Metric ###########################
###########################################################

Metrics/AbcSize:
 Max: 45

Metrics/BlockLength:
  CountComments: false
  Max: 50
  Exclude:
    - '**/spec/**/*'
    - '**/*.rake'
    - '**/factories/**/*'
    - '**/config/routes.rb'

Metrics/ClassLength:
  CountAsOne: ['array', 'hash']
  Max: 150

Metrics/CyclomaticComplexity:
  Max: 10

Metrics/MethodLength:
  CountAsOne: ['array', 'hash']
  Max: 30

Metrics/ModuleLength:
  CountAsOne: ['array', 'hash']
  Max: 250
  Exclude:
    - '**/spec/**/*'

Metrics/PerceivedComplexity:
  Max: 10

###########################################################
######################## Naming ###########################
###########################################################

Naming/InclusiveLanguage: # (new in 1.18)
  Enabled: true

###########################################################
######################## Style ############################
###########################################################

Style/AccessorGrouping:
  Enabled: true

Style/ArgumentsForwarding: # (new in 1.1)
  Enabled: true

Style/ArrayCoercion:
  Enabled: true

Style/AutoResourceCleanup:
  Enabled: true

Style/BisectedAttrAccessor:
  Enabled: true

Style/CaseLikeIf:
  Enabled: true

Style/ClassAndModuleChildren:
  Enabled: false

Style/CollectionCompact: # (new in 1.2)
  Enabled: true

Style/CollectionMethods:
  Enabled: true

Style/CombinableLoops:
  Enabled: true

Style/CommandLiteral:
  EnforcedStyle: percent_x

Style/ConstantVisibility:
  Enabled: true

Style/Documentation:
  Enabled: false

Style/DocumentDynamicEvalDefinition: # (new in 1.1)
  Enabled: true

Style/EndlessMethod: # (new in 1.8)
  Enabled: true

Style/ExplicitBlockArgument:
  Enabled: true

Style/GlobalStdStream:
  Enabled: true

Style/HashConversion: # (new in 1.10)
  Enabled: true

Style/HashEachMethods:
  Enabled: true

Style/HashExcept: # (new in 1.7)
  Enabled: true

Style/HashLikeCase:
  Enabled: true

Style/HashTransformKeys:
  Enabled: true

Style/HashTransformValues:
  Enabled: true

Style/IfWithBooleanLiteralBranches: # (new in 1.9)
  Enabled: true

Style/ImplicitRuntimeError:
  Enabled: true

Style/InlineComment:
  Enabled: true

Style/InPatternThen: # (new in 1.16)
  Enabled: true

Style/IpAddresses:
  Enabled: true

Style/KeywordParametersOrder:
  Enabled: true

Style/MethodCallWithArgsParentheses:
  Enabled: true

Style/MissingElse:
  Enabled: true

Style/MultilineInPatternThen: # (new in 1.16)
  Enabled: true

Style/MultilineMethodSignature:
  Enabled: true

Style/NegatedIfElseCondition: # (new in 1.2)
  Enabled: true

Style/NilLambda: # (new in 1.3)
  Enabled: true

Style/OptionalBooleanParameter:
  Enabled: true

Style/QuotedSymbols: # (new in 1.16)
  Enabled: true

Style/RedundantArgument: # (new in 1.4)
  Enabled: true

Style/RedundantAssignment:
  Enabled: true

Style/RedundantBegin:
  Enabled: true

Style/RedundantFetchBlock:
  Enabled: true

Style/RedundantFileExtensionInRequire:
  Enabled: true

Style/RedundantSelfAssignment:
  Enabled: true

Style/SingleArgumentDig:
  Enabled: true

Style/StringChars: # (new in 1.12)
  Enabled: true

Style/StringConcatenation:
  Enabled: true

Style/SwapValues: # (new in 1.1)
  Enabled: true
```

Rails 

```
# .rubocop-rails.yml

###########################################################
#################### RuboCop Rails ########################
###########################################################

# You can find all configuration options for rubocop-rails here: https://docs.rubocop.org/rubocop-rails/cops_rails.html

Rails/ActiveRecordCallbacksOrder:
  Enabled: true

Rails/AddColumnIndex: # (new in 2.11)
  Enabled: true

Rails/AfterCommitOverride:
  Enabled: true

Rails/AttributeDefaultBlockValue: # (new in 2.9)
  Enabled: true

Rails/DefaultScope:
  Enabled: true

Rails/EagerEvaluationLogMessage: # (new in 2.11)
  Enabled: true

Rails/ExpandedDateRange: # (new in 2.11)
  Enabled: true

Rails/FindById:
  Enabled: true

Rails/I18nLocaleAssignment: # (new in 2.11)
  Enabled: true

Rails/Inquiry:
  Enabled: true

Rails/MailerName:
  Enabled: true

Rails/MatchRoute:
  Enabled: true

Rails/NegateInclude:
  Enabled: true

Rails/OrderById:
  Enabled: true

Rails/Pluck:
  Enabled: true

Rails/PluckId:
  Enabled: true

Rails/PluckInWhere:
  Enabled: true

Rails/RenderInline:
  Enabled: true

Rails/RenderPlainText:
  Enabled: true

Rails/SaveBang:
  Enabled: true
  AllowImplicitReturn: false

Rails/ShortI18n:
  Enabled: true

Rails/SquishedSQLHeredocs: # (new in 2.8)
  Enabled: true

Rails/TimeZoneAssignment: # (new in 2.10)
  Enabled: true

Rails/UnusedIgnoredColumns: # (new in 2.11)
  Enabled: true

Rails/WhereEquals: # (new in 2.9)
  Enabled: true

Rails/WhereExists:
  Enabled: true

Rails/WhereNot:
  Enabled: true
```

***Performance***
```
.rubocop-performance.yml

###########################################################
#################### RuboCop Performance ##################
###########################################################

# You can find all configuration options for rubocop-performance here: https://docs.rubocop.org/rubocop-performance/

Performance/AncestorsInclude: # (new in 1.7)
  Enabled: true

Performance/BigDecimalWithNumericArgument: # (new in 1.7)
  Enabled: true

Performance/BlockGivenWithExplicitBlock: # (new in 1.9)
  Enabled: true

Performance/CollectionLiteralInLoop: # (new in 1.8)
  Enabled: true

Performance/ConstantRegexp: # (new in 1.9)
  Enabled: true

Performance/MapCompact: # (new in 1.11)
  Enabled: true

Performance/MethodObjectAsBlock: # (new in 1.9)
  Enabled: true

Performance/RedundantEqualityComparisonBlock: # (new in 1.10)
  Enabled: true

Performance/RedundantSortBlock: # (new in 1.7)
  Enabled: true

Performance/RedundantSplitRegexpArgument: # (new in 1.10)
  Enabled: true

Performance/RedundantStringChars: # (new in 1.7)
  Enabled: true

Performance/ReverseFirst: # (new in 1.7)
  Enabled: true

Performance/SortReverse: # (new in 1.7)
  Enabled: true

Performance/Squeeze: # (new in 1.7)
  Enabled: true

Performance/StringInclude: # (new in 1.7)
  Enabled: true

Performance/Sum: # (new in 1.8)
  Enabled: true
```

### 5. Chạy RuboCop
Chúng ta có tùy chọn để chạy RuboCop trên:

* Toàn bộ dự án
* Các tệp bên trong một thư mục
* Chỉ trên một tệp duy nhất

Sau khi chạy các lệnh của RuboCop trong dòng lệnh, chúng ta sẽ được trình bày về các vấn đề được tìm thấy trong code của chúng ta bên trong dự án, sau đó chúng ta có thể khắc phục thủ công hoặc cũng có tùy chọn để tự động sửa các vấn đề trong hầu hết các trường hợp.

***Toàn bộ dự án*** 
```
  $ cd /path/to/your/project
  $ rubocop
```
***Các tệp bên trong một thư mục***

```
  $ rubocop app
```

***Tệp đơn***
```
  $ rubocop app/models/user.rb
```

### 6. Cảnh báo tự động sửa
RubCop cũng cung cấp tính năng tự động sửa các vấn đề trong code của chúng ta.

Có một số điều cần lưu ý về tính năng tự động sửa:

* Đối với một số lỗi, không thể thực hiện sửa lỗi tự động.
* Một số chỉnh sửa tự động có thể có vẫn chưa được thực hiện.
* Một số chỉnh sửa tự động có thể thay đổi (một chút) ngữ nghĩa của mã, nghĩa là chúng sẽ tạo ra mã gần như tương đương với mã gốc, nhưng không tương đương 100%. Chúng tôi gọi hành vi tự động sửa như vậy là "không an toàn"

Chúng ta có thể chạy tự động sửa bằng lệnh sau:

```
$ rubocop -a
# or
$ rubocop --auto-correct
# or
$ rubocop -A
# or
$ rubocop --auto-correct-all
```

### 7. Các tiện ích mở rộng RuboCop khác
RuboCop cũng có các tùy chọn để triển khai các quy tắc trên các tiện ích mở rộng khác như:

* [rubocop-rspec](https://github.com/rubocop/rubocop-rspec) Đối với Rspec; một khung kiểm tra phổ biến để kiểm tra mã Rails
* [rubocop-rake](https://github.com/rubocop/rubocop-rake) : Một plugin RuboCop cho Rake
* [rubocop-minitest](https://github.com/rubocop/rubocop-minitest) : Một thư viện thử nghiệm phổ biến khác để thử nghiệm mã Ruby và Rails

## IV. Kết luận
RuboCop rất hữu ích trong việc duy trì các phương pháp hay nhất và đó là một trong những gem mà chúng ta nên đưa vào tất cả các thiết lập dự án của mình.

Một điều cần nhớ với Trình phân tích code tĩnh là chúng ta có thể linh hoạt để bật và tắt các quy tắc, do đó chúng ta phải luôn thảo luận với nhóm về những gì cần bao gồm, tại sao nên bao gồm và những gì nên tắt.

Đây là hướng dẫn mà tôi hy vọng tôi đã có khi bắt đầu với tư cách là một ruby dev. Tôi hy vọng bạn thấy nó hữu dụng!

Tài liệu: 

https://github.com/rubocop/rubocop

https://github.com/rubocop/rubocop-rails