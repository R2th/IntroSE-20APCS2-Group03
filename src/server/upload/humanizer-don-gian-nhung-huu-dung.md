Hôm nay, tôi sẽ giới thiệu đến các bạn một thư viện khá thú vị trong C# : Humanizer
Nuget: https://www.nuget.org/packages/Humanizer/

Github: https://github.com/Humanizr/Humanizer

Thư viện này sẽ đáp ứng tất cả các nhu cầu .NET của bạn để thao tác và hiển thị chuỗi, enum, ngày, thời gian, thời gian, số lượng và số lượng. 
Chuyển string, ngày tháng, … thành chữ mà con người đọc được (Đúng như tên gọi Humanizer tức là “người hóa”)

Dưới đây mình sẽ giới thiệu 1 số thứ hay ho trong thư viện này: 

1. Chuyển tên hàm, tên biến thành chuỗi có nghĩa (Humanize String)
Trong lập trình, ta hay đặt tên trường, tên hàm, tên biến theo naming convension. Humanizer cho phép biến những tên này thành một chuỗi có nghĩa
```

"PascalCaseInputStringIsTurnedIntoSentence".Humanize();
//"Pascal case input string is turned into sentence
 
"Underscored_input_string_is_turned_into_sentence".Humanize();
//"Underscored input string is turned into sentence
 
"Underscored_input_String_is_turned_INTO_sentence".Humanize();
//Underscored input String is turned INTO sentence
```
 
 Ta cũng có thể chuyển đổi ngược lại bằng các hàm Pascalize, Camelize, Underscore(Dehumanize String)
```
 "some title".Pascalize(); //SomeTitle
"some title".Camelize(); //someTitle
"some title".Underscore(); //some_title
```

Có thể transform một string thành thành: chữ hoa, chữ thường, viết hoa đầu dòng, đầu mỗi chữ(Transform String)
```
"Sentence casing".Transform(To.LowerCase);//sentence casing
"Sentence casing".Transform(To.SentenceCase); //Sentence casing
"Sentence casing".Transform(To.TitleCase); //Sentence Casing
"Sentence casing".Transform(To.UpperCase); //SENTENCE CASING
```

2. Thu gọn chuỗi (Truncate String)
Để hiển thị thông tin dài, ta thường viết hàm cắt chuỗi, sau đó kết thúc bằng dấu … Humanizer có sẵn hàm hỗ trợ việc này. Ta còn có thể cắt theo số kí tự hoặc số từ
```
"Long text to truncate".Truncate(10, Truncator.FixedLength); //Cắt 10 kí tự
//Long text…
"Long text to truncate".Truncate(2, Truncator.FixedNumberOfWords); //Cắt 2 từ
//Long text…
```
3. Chuyển enum thành chuỗi có nghĩa(Humanize Enums)
Với 1 số enum dài, ta thường dùng Annotation để chuyển nó thành chuỗi có nghĩa. Humanizer xử lý chuyện này rất dễ dàng.
```
public enum EnumUnderTest
{
    [Description(Custom description)]
    MemberWithDescriptionAttribute,
    MemberWithoutDescriptionAttribute,
}
 
// Nếu có DescriptionAttribute thì đọc từ Attribute
EnumUnderTest.MemberWithDescriptionAttribute.Humanize(); //Custom description
// Nếu không có thì tự chuyển tên enum sang chuỗi
EnumUnderTest.MemberWithoutDescriptionAttribute.Humanize(); //Member without description attribute
```
4. Xử lý DateTime (Humanize DateTime)
Bạn muốn làm chức năng tính thời gian post của comment như facebook (1 giờ trước, 2 giờ trước, v…v). Humanizer có chức năng này, hỗ trợ cả tiếng Anh lẫn Việt 

Thread.CurrentThread.CurrentUICulture = new CultureInfo("vi-VN"); //Set ngôn ngữ Việt
 
```
DateTime.UtcNow.AddHours(-30).Humanize(); // "hôm qua
DateTime.UtcNow.AddHours(-60).Humanize(); //"cách đây 2 ngày
 
DateTime.UtcNow.AddHours(2).Humanize(); //2 giờ nữa
DateTime.UtcNow.AddDays(1).Humanize(); //Ngày mai
```

5. Xử lý TimeSpan (Humanize TimeSpan)
Chức năng xử lý TimeSpan cũng tương tự, cả tiếng anh lẫn tiếng Việt đều chạy rất tốt.
```
TimeSpan.FromMilliseconds(2).Humanize(); //2 milliseconds
TimeSpan.FromDays(1).Humanize(); //1 day
TimeSpan.FromDays(16).Humanize(); //2 weeks
 
// Mặc định, hàm Humanize() sẽ đưa ra đơn vị lớn nhất (năm - tháng - tuần, ...).
// Ta truyền thêm tham số để hiển thị các đơn vị nhỏ hơn
TimeSpan.FromMilliseconds(1299630020).Humanize(); //2 weeks
TimeSpan.FromMilliseconds(1299630020).Humanize(3); //2 weeks, 1 day, 1 hour
TimeSpan.FromMilliseconds(1299630020).Humanize(4); //2 weeks, 1 day, 1 hour, 30 seconds
```
6. Chuyển số thành chữ
```
1.ToWords(); //one
10.ToWords(); //ten
11.ToWords(); //eleven
122.ToWords(); //one hundred and twenty-two
3501.ToWords(); //three thousand five hundred and one
```

7. Xử lý file size (Khá hay) (ByteSize)
Humanizer cho phép xử lý các số liệu liên quan tới filesize (KB, MB, GB, …) một cách dễ dàng

```
var fileSize = (10).Kilobytes();
 
fileSize.Bits //=> 81920
fileSize.Bytes //=> 10240
fileSize.Kilobytes //=> 10
 
//Ta có thể cộng trừ file size
var total = (10).Gigabytes() + (512).Megabytes() - (2.5).Gigabytes();
 
//Hiển thị dưới dạng text
7.Bits().ToString(); // 7 b
8.Bits().ToString(); // 1 B
(.5).Kilobytes().Humanize(); // 512 B
(1000).Kilobytes().ToString(); // 1000 KB
(1024).Kilobytes().Humanize(); // 1 MB
 
//Parse ngược từ text ra (Không phân biệt hoa thường)
ByteSize.Parse("1.55 mB");
ByteSize.Parse("1.55 mb");
ByteSize.Parse("1.55 GB");
ByteSize.Parse("1.55 gB");
ByteSize.Parse("1.55 gb");
ByteSize.Parse("1.55 TB");
```