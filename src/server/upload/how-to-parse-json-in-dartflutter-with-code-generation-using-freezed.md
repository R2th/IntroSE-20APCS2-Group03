Việc bóc tách JSON thành type-safe model classes trong Dart bằng tay là công việc tốn nhiều thời gian và dễ phát sinh lỗi khi chúng ta có rất nhiều model classes. May mắn thay chúng ta có thể sử dụng các công cụ sinh mã nguồn như là **[json_serializable](https://pub.dev/packages/json_serializable)** và **[Freezed](https://pub.dev/packages/freezed)** nhằm tự động hoá quá trình xử lý.

Trong bài viết này chúng ta sẽ tìm hiểu các bóc tách dữ liệu JSON bằng cách sinh mã nguồn sử dụng gói **[Freezed](https://pub.dev/packages/freezed)**. Và chúng ta cũng sẽ tìm kiếm một VSCode extenstion cái làm cho quá trình xử lý trở nên dễ dàng hơn.

## Installing the codegen dependencies
Để mọi thứ hoạt động chúng ta sẽ cần thêm một vài dependencies vào trong **pubspec.yaml** file.

```
dependencies:
  flutter:
    sdk: flutter
  freezed_annotation: ^0.14.2
  json_annotation: ^4.0.1

dev_dependencies:
  build_runner: ^2.0.6
  freezed: ^0.14.2
  json_serializable: ^4.1.4
```

5 dependencies mới? Dưới đây là cái mà chúng ta vừa làm:
* **json_serializable**: Cung cấp Dart Build System cùng với một số builders cho quá trình xử lý JSON.
* **json_annotation**: định nghĩa một số annotations được sử dụng bởi **json_serializable**.
* **freezed**: một công cụ sinh mã nguồn mạnh mẽ, cái có thể xử lý những trường hợp phức tạp với những API đơn giản.
* **freezed_annotation**: định nghĩa một số annotations được sử dụng bởi **freezed**.
* **build_runner**: Đây là một gói build độc lập cái có thể sinh ra các files Dart cho chúng ta.

Nghe có vẻ phức tạp đúng không? Nhưng đừng lo lắng: Miễn là bạn thêm tất các các gói cần thiên vào, nó sẽ ổn thôi.

**Note**: Bạn có thể sinh ra mã nguồn bóc tách JSON chỉ với **json_serializable**(không cần **freezed**). Tuy nhiên **freezed** mạnh mẽ hơn và có thể xử lý những trường hợp phức tạp với một hệ thống API đơn giản.

## A sample JSON document
Nhằm giữ lại những dòng json ở bài viết cũ, chúng ta sẽ tái sử dụng cùng một JSON mẫu:

```
{
  "name": "Pizza da Mario",
  "cuisine": "Italian",
  "year_opened": 1990,
  "reviews": [
    {
      "score": 4.5,
      "review": "The pizza was amazing!"
    },
    {
      "score": 5.0,
      "review": "Very friendly staff, excellent service!"
    }
  ]
}
```

Như tham chiếu trên, ở đây có các lớp **Restaurant** và **Review** cái chúng ta đã viết trước đó.

```
class Restaurant {
  Restaurant({
    required this.name,
    required this.cuisine,
    this.yearOpened,
    required this.reviews,
  });
  final String name;
  final String cuisine;
  final int? yearOpened;
  final List<Review> reviews;

  factory Restaurant.fromMap(Map<String, dynamic> data) {
    final name = data['name'] as String;
    final cuisine = data['cuisine'] as String;
    final yearOpened = data['year_opened'] as int?;
    final reviewsData = data['reviews'] as List<dynamic>?;
    final reviews = reviewsData != null
        ? reviewsData.map((reviewData) => Review.fromMap(reviewData)).toList()
        : <Review>[];
    return Restaurant(
      name: name,
      cuisine: cuisine,
      yearOpened: yearOpened,
      reviews: reviews,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'cuisine': cuisine,
      if (yearOpened != null) 'year_opened': yearOpened,
      'reviews': reviews.map((review) => review.toMap()).toList(),
    };
  }
}
```

```
class Review {
  Review({required this.score, this.review});
  final double score;
  // nullable - assuming the review may be missing
  final String? review;

  factory Review.fromMap(Map<String, dynamic> data) {
    final score = data['score'] as double;
    final review = data['review'] as String?;
    return Review(score: score, review: review);
  }

  Map<String, dynamic> toMap() {
    return {
      'score': score,
      if (review != null) 'review': review,
    };
  }
}
```

Như bạn có thể thấy, có rất nhiều mã nguồn và cách thức này không thể mở rộng nếu chúng ta có rất nhiều models khác nhau.

## Model classes with Freezed
Để giúp cho cuộc sống của chúng ta trở nên dễ dàng hơn, hãy sử dụng **[Freezed](https://pub.dev/packages/freezed)** để định nghĩa các lớp **Restaurant** và **Review** của chúng ta.

Bởi vì **Restaurant** phụ thuộc vào **Review**, hãy bắt đầu với lớp **Review** trước:

```
// review.dart
// 1. import freezed_annotation
import 'package:freezed_annotation/freezed_annotation.dart';

// 2. add 'part' files
part 'review.freezed.dart';
part 'review.g.dart';

// 3. add @freezed annotation
@freezed
// 4. define a class with a mixin
class Review with _$Review {
  // 5. define a factory constructor
  factory Review({
    // 6. list all the arguments/properties
    required double score,
    String? review,
  // 7. assign it with the `_Review` class constructor
  }) = _Review;

  // 8. define another factory constructor to parse from json
  factory Review.fromJson(Map<String, dynamic> json) => _$ReviewFromJson(json);
}
```

**Note**: Nó là vô cùng quan trọng nhằm sử dụng chính xác cú pháp ở đây. Nếu chúng ta bỏ lỡ điều gì đó hoặc có một lỗi đánh máy, mã nguồn được sinh ra sẽ phát sinh một số lỗi.

Hãy làm tương tự với lớp **Restaurant**:

```
// restaurant.dart
import 'package:freezed_annotation/freezed_annotation.dart';
// import any other models we depend on
import 'review.dart';

part 'restaurant.freezed.dart';
part 'restaurant.g.dart';

@freezed
class Restaurant with _$Restaurant {
  factory Restaurant({
    required String name,
    required String cuisine,
    // note: using a JsonKey to map our JSON key that uses
    // *snake_case* to our Dart variable that uses *camelCase*
    @JsonKey(name: 'year_opened') int? yearOpened,
    // note: using an empty list as a default value
    @Default([]) List<Review> reviews,
  }) = _Restaurant;

  factory Restaurant.fromJson(Map<String, dynamic> json) =>
      _$RestaurantFromJson(json);
}
```

**Note**: Các lớp **Restaurant** và **Review** có một factory constructor cái liệt kê tất cả các tham số chúng ta cần, nhưng chúng ta không định nghĩa chính xác tác thuộc tính.

Trong thực tế, mã nguồn của chúng ta chưa hoàn thiện và sẽ sinh ra một số lỗi như thế này:

```
Target of URI doesn't exist: 'restaurant.freezed.dart'.
Try creating the file referenced by the URI, or Try using a URI for a file that does exist.

The name '_Restaurant' isn't a type and can't be used in a redirected constructor.
Try redirecting to a different constructor.

The method '_$RestaurantFromJson' isn't defined for the type 'Restaurant'.
Try correcting the name to the name of an existing method, or defining a method named '_$RestaurantFromJson'.
```

Hãy xem xét nó.

## Running the code generator
Để sinh ra các mã nguồn còn thiếu, chúng ta có thể chạy cái này trong console:

```
flutter pub run build_runner build --delete-conflicting-outputs
```

Điều này sẽ sinh ra kết quả bên dưới:

```
[INFO] Generating build script...
[INFO] Generating build script completed, took 419ms

[INFO] Initializing inputs
[INFO] Reading cached asset graph...
[INFO] Reading cached asset graph completed, took 55ms

[INFO] Checking for updates since last build...
[INFO] Checking for updates since last build completed, took 428ms

[INFO] Running build...
[INFO] 1.3s elapsed, 0/2 actions completed.
[INFO] Running build completed, took 2.1s

[INFO] Caching finalized dependency graph...
[INFO] Caching finalized dependency graph completed, took 27ms

[INFO] Succeeded after 2.1s with 5 outputs (5 actions)
```

Và nếu chúng ta xem project explorer, chúng ta có thể thấy một vài file mới:

```
restaurant.dart
restaurant.freezed.dart
restaurant.g.dart
review.dart
review.freezed.dart
review.g.dart
```

Các file **.freezed.dart** chứa rất nhiều mã nguồn. Nếu bạn muốn xem tất cả mã nguồn được sinh ra, bạn có thể xem ở [đây](https://gist.github.com/bizz84/07cb696d46e80627939d009e10ca37c9).

Điều quan trọng đó là mỗi lớp model này, mã nguồn được sinh ra đã thêm vào:

* Tất cả các thuộc tính lưu trữ cái chúng ta cần(và thiết lập chúng là final).
* Phương thức **toString()**.
* Phương thức **==**.
* Biến **hashCode**.
* Phương thức **copyWith()**.
* Phương thức **toJson()**.

Khá tiện dụng!

Và chúng ta không cần chỉnh sửa bất cứ thuộc tính nào trong các lớp model của mình, chúng ta chỉ cần cập nhật factory constructors của chúng:

```
@freezed
class Review with _$Review {
  factory Review({
    // update any properties as needed
    required double score,
    String? review,
  }) = _Review;

  factory Review.fromJson(Map<String, dynamic> json) => _$ReviewFromJson(json);
}
```

```
@freezed
class Restaurant with _$Restaurant {
  factory Restaurant({
    // update any properties as needed
    required String name,
    required String cuisine,
    @JsonKey(name: 'year_opened') int? yearOpened,
    @Default([]) List<Review> reviews,
  }) = _Restaurant;

  factory Restaurant.fromJson(Map<String, dynamic> json) =>
      _$RestaurantFromJson(json);
}
```

Rồi chúng ta có thể chạy lại câu lệnh sinh mã nguồn một lần nữa để Freezed làm việc còn lại:

```
flutter pub run build_runner build --delete-conflicting-outputs
```

Tuyệt vời! Giờ đây chúng ta có thể định nghĩa các lớp type-safe, immutable models cho mình chỉ với vài dòng code, và sinh ra tất cả mã nguồn cho quá trình serialization chỉ với một câu lệnh.

## Basic JSON annotations
Freezed hỗ trợ rất nhiều annotations cái giúp chúng ta tuỳ biến mã nguồn được sinh ra trong quá trình xử lý các models của mình.

Một trong những cái hữu ích nhất đó là **@JsonKey** và **@Default**.

Đây là ví dụ về việc làm thế nào chúng ta sử dụng chúng trong [Movie App](https://github.com/bizz84/movie_app_state_management_flutter).

```
@freezed
class TMDBMovieBasic with _$TMDBMovieBasic {
  factory TMDBMovieBasic({
    @JsonKey(name: 'vote_count') int? voteCount,
    required int id,
    @Default(false) bool video,
    @JsonKey(name: 'vote_average') double? voteAverage,
    required String title,
    double? popularity,
    @JsonKey(name: 'poster_path') required String posterPath,
    @JsonKey(name: 'original_language') String? originalLanguage,
    @JsonKey(name: 'original_title') String? originalTitle,
    @JsonKey(name: 'genre_ids') List<int>? genreIds,
    @JsonKey(name: 'backdrop_path') String? backdropPath,
    bool? adult,
    String? overview,
    @JsonKey(name: 'release_date') String? releaseDate,
  }) = _TMDBMovieBasic;

  factory TMDBMovieBasic.fromJson(Map<String, dynamic> json) =>
      _$TMDBMovieBasicFromJson(json);
}
```

Trong trường hợp này, các keys trong JSON trả về sử dụng một quy tắc đặt tên **snake_case**, và chúng ta có thể sử dụng **@JsonKey** annotation nhằm nói với Freezed về keys được ánh xạ tới thuộc tính tương ứng.

Và chúng ta có thể sử dụng **@Default** annotation nếu chúng ta muốn chỉ rõ một giá trị mặc định cho một thuộc tính không được phép null.

Thuộc tính **Non-Nullable** cũng cần thêm từ khoá **required** hoặc một giá trị mặc định. Nếu một **@Default** annotation được chỉ ra, giá trị của nó sẽ được sử dụng nếu cặp key-value của nó không được tìm thấy.

## Advanced JSON Serialization features with Freezed
Cái mà chúng ta vừa tìm hiểu là không đủ để xử lý quá trình JSON serialization trong hầu hết các trường hợp.
 Nhưng Freezed là một gói mạnh mẽ và chúng ta có thể thực hiện các thao tác tuyệt vời khác như:
 
*  Sinh ra các loại liên kết bằng cách chỉ rõ các constructors.
*  Chỉ ra các JSON convertes tuỳ biến.

Để tìm hiểu thêm về những tính năng nâng cao của Freezed, đọc thêm trong phần tài liệu: **[Freezed | FromJson/ToJson](https://pub.dev/packages/freezed#fromjsontojson)**.

## Code generation drawbacks
Quá trình sinh mã nguồn có một số lợi ích rõ ràng và nó là cách chúng ta có thể thực hiện nếu chúng ta có rất nhiều model classes.
Tuy nhiên nó cũng có một số hạn chế như:

### A lot of extra code
Các lớp models của chúng ta **Restaurant**, **Review** là rất đơn giản, tuy nhiên mã nguồn sinh ra tốn tới [450 dòng](https://gist.github.com/bizz84/07cb696d46e80627939d009e10ca37c9). Điều này tăng lên nhanh chóng nếu chúng ta có rất nhiều model classes.

### Code generation is slow
Quá trình sinh mã nguồn trong Dart là khá chậm.
Ngay cả khi có cách để [giảm thiểu điều này](https://codewithandrea.com/tips/speed-up-code-generation-build-runner-dart-flutter/), mã nguồn sinh ra có thể gây ra sự chậm trễ đáng kể cho quá trình phát triển của bạn trên một dự án lớn.

### Should generated files be added to git?
Nếu bạn làm việc trong một nhóm, và bạn đẩy mã nguồn được sinh ra lên git, Pull Requests trở nên khó khăn cho quá trình review.

Nhưng nếu bạn không đẩy, dự án mặc định không thể chạy được và:

* Mỗi thành viên trong nhóm cần nhớ chạy các bước sinh mã nguồn(có khả năng dẫn tới những mâu thuẫn).
* Cần có một bước build CI tuỳ biến nhằm build ứng dụng.

Và theo như [thăm dò này](https://twitter.com/biz84/status/1423312389483663361), thậm chí không có được sự thống nhất giữa việc có nên đẩy các file được sinh ra nên git hay không.

## Dart Language Limitation
Quá trình sinh ra mã nguồn có thể trợ giúp, tuy nhiên nó không phải là một viên đạn bạc.

Vấn đề bề chìm đó là Dart không(chưa) có bất cứ tính năng về mặt ngôn ngữ nào nhằm giúp cho quá trình JSON serialization trở nên dễ dàng.

Việc giới thiệu [các lớp dữ liệu](https://github.com/dart-lang/language/issues/314) và [static metaprogramming](https://github.com/dart-lang/language/issues/1482) một cách rộng rãi hơn trong Dart có thể giải quyết được một số vấn đề này. Do đó chúng ta có thể kì vọng răng trong tương lai JSON Serialization sẽ trở nên dễ dàng hơn trong Dart.

Nhưng do những giới hạn hiện tại về mặt ngôn ngữ, việc sinh mã nguồn với Freezed vẫn là lựa chọn tốt nhất đối với chúng ta.

## VSCode Extension: Json to Dart Model
Như chúng ta đã tìm hiểu, chúng ta có thể định nghĩa một vài lớp model với các factory constructors của chúng và để quá trình sinh mã nguồn thực hiện những thứ còn lại.
Tuy nhiên Có phải giải pháp tuyệt vời nhất là chúng ta có thể sinh ra mã nguồn trực tiếp từ các mẫu dữ liệu JSON?

Đúng, gói mở rộng [Json to Dart Model](https://marketplace.visualstudio.com/items?itemName=hirantha.json-to-dart) của VSCode thực hiện chính xác điều này.

Hãy thử nó, vì nó thực hiện công việc này khá tốt, và lẽ dĩ nhiên nó hỗ trợ Freezed. Do đó, nếu bạn muốn tiết kiệm một chút thời gian, hãy sử dụng nó.

## Source
https://codewithandrea.com/articles/parse-json-dart-codegen-freezed/#installing-the-codegen-dependencies

## Reference

**[Stacekd State Management](https://github.com/DanhDue/stacked_state_mamagement)**.

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))