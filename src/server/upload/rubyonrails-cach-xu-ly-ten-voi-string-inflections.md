String Inflection định nghĩa các phương thức mới trong String class để thực hiện chức năng biến đổi chuỗi phù hợp theo mỗi mục đích khác nhau. Ví dụ, bạn có thể lấy được tên của database thông qua tên của class. 
Qua đây các bạn sẽ hiểu về các tên được tự động mapping trong Rails và mối quan hệ biện chứng giữa tên của class, model, column,...

## Camelcase() hay camelize()

Mặc định tham số truyền vào là camelize(:upper) đổi chuỗi ký tự thường thành chuỗi UpperCamelCase (chữ in hoa đầu tiên mỗi từ phân biệt bởi dấu "_") .

Bạn có thể truyền tham số camelize(:lower) để đổi thành chuỗi LowerCamelCase.

Nếu chuỗi có dấu "/" thì sẽ được đổi thành dấu "::", điều này thường được sử dụng để đổi path thành namespace.

**Ví dụ:**

```
"active_record".camelize                # => "ActiveRecord"
"active_record".camelize(:lower)        # => "activeRecord"
"active_record/errors".camelize         # => "ActiveRecord::Errors"
"active_record/errors".camelize(:lower) # => "activeRecord::Errors"
```

## underscore()

Ngược lại với camelize. Đổi chuỗi thành các ký tự thường liên kết với nhau bởi dấu "_".

**Ví dụ:**

```
 "ActiveRecord".underscore         # => "active_record"
  "ActiveRecord::Errors".underscore # => active_record/errors
```

## classify()

Phương thức này tạo tên class từ một tên table số nhiều như Rails làm cho tên bảng cho các model. Lưu ý rằng điều này trả về một chuỗi String và không phải là một class.

**Ví dụ:**

```
 "egg_and_hams".classify # => "EggAndHam"
  "posts".classify        # => "Post"
```

**Lưu ý: tên số ít sẽ không cho kết quả chính xác.**

` "business".classify # => "Busines"`

## constantize()

Phương thức này sẽ cố gắng tìm kiếm vào khởi tạo một class với chuỗi ký tự. Nếu chuỗi không phải dạng CamelCase hoặc class không tồn tại sẽ báo lỗi NameError.

**Ví dụ:**

```
 "Module".constantize # => Module
  "Class".constantize  # => Class
```

## dasherize()

Thay thế dấu gạch dưới với dấu gạch ngang.

**Ví dụ:**

` "puni_puni" # => "puni-puni"`

## demodulize()

Loại bỏ các phần module cha trong chuỗi, chỉ trả về phần module hiện tại. Các phần được ngăn cách bởi dấu "::".

**Ví dụ:**

```
 "ActiveRecord::CoreExtensions::String::Inflections".demodulize # => "Inflections"
  "Inflections".demodulize                                       # => "Inflections"
```

## foreign_key(separate_class_name_and_id_with_underscore = true)

Tạo ra một khóa ngoại với tên của class.

**Ví dụ:**

```
 "Message".foreign_key        # => "message_id"
  "Message".foreign_key(false) # => "messageid"
  "Admin::Post".foreign_key    # => "post_id"
```

## humanize()

Phương thức này viết hoa chữ đầu tiên và bỏ bớt "_id"

**Ví dụ:**

```
 "employee_salary" # => "Employee salary"
  "author_id"       # => "Author"
```

## Parameterize()

Thay đổi các kí tự đặc biệt của chuỗi ký tự thành dấu "-". Thường được sử dụng để tạo pretty URL.

**Ví dụ:**

`"Donald E. Knuth".parameterize # => "donald-e-knuth"`

## pluralize() vs singularize()

Trả về hình thức số nhiều hoặc số ít của chuỗi.

**Ví dụ:**

```
 "words".pluralize            # => "words"
  "the blue mailman".pluralize # => "the blue mailmen"
  "CamelOctopus".pluralize     # => "CamelOctopi"
 "word".singularize             # => "word"
  "the blue mailmen".singularize # => "the blue mailman"
  "CamelOctopi".singularize      # => "CamelOctopus"
```

## tableize()

Tạo tên của table thông qua tên của model.

**Ví dụ:**

```
 "RawScaledScorer".tableize # => "raw_scaled_scorers"
  "egg_and_ham".tableize     # => "egg_and_hams"
  "fancyCategory".tableize   # => "fancy_categories"
```

## titlecase() và titleize()

Viết hoa chữ cái đầu của tất cả các từ trong chuỗi và thay thế một số ký tự đặc biệt.

**Ví dụ:**

```
 "man from the boondocks".titleize # => "Man From The Boondocks"
  "x-men: the last stand".titleize  # => "X Men: The Last Stand"
```