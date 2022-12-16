## Characters, Code Points, Graphemes <br>
Tất cả các Unicode regex engines đề cập trong bài biết này coi một Unicode code point là một kí tự. Trong regular expression,   `.` đại diện cho mọi ký tự. Trong Unicode, nó đại diện cho bất kì Unicode code point nào. `à` có thể được encoded thành 2 code points U+0061 (a) và U+0300 (dấu huyền). Do đó  `.`  match với `a` (không có dầu huyền). `^.$`
sẽ không match với `à`, bởi vì `à` chứa 2 code points do đó regex phải `^..$`
```ruby
"à".length
=> 2
```
Woaaaaaa!


Unicode code point U+0300 (dấu huyền) là một combining mark(dấu dùng để kết hợp với các kí tự khác). Bất kì code point khác combining mark có thể được theo sau bởi các combining mark. Người ta gọi U+0061 U+0300  là một grapheme.

Không may, `à` cũng có thể được mã hóa thành Unicode code point U+00E0. Lý do tính hai mặt này là những bộ kí tự cũ mã hóa `à` như một kí tự.

## Regex cho Code Point
Để match một Unicode code point chỉ định, sử dụng \uFFFF trong đó FFFF là số thập lục phân của code point bạn muốn. Bạn phải luôn luôn chỉ ra 4 chữ số thập lục phân. Ví dụ \u00E0 sẽ match với `à`, nhưng chỉ khi `à` được mã hóa thành code point U+00E0.

Một số ngôn ngữ như Perl, PCRE, Boost và std::regex sử dụng `\x{FFFF}` thay vì `\uFFFF`. Bạn có thể bỏ qua các số 0 đứng đầu trong cặp ngoặc nhọn. Bời vì `\x` không phải là regex token hợp lệ nên `\x{1234}` không bị hiểu nhầm thành `\x` 1234 lần. Nó luôn match với Unicode code point U+1234. `\x{1234}{1111}` sẽ match với 1111 lần code point U+1234. 

## Unicode Categories
Chuẩn Unicode được chia thành nhiều category. Mỗi kí tự unicode đều thuộc về một category nhất định. Bạn có thể match kí tự thuộc category "letter" với `\p{L}`, kí tự không thuộc category “letter" với `\P{L}`

Như đã để cập, 1 kí tự tương đương với 1 code point Unicode. `\p{L}` match với 1 code point trong category “letter". Nếu input là `à`(cái này encode sẽ thành U+00e0) thì match với `à`. Nếu input là `à` (cái này tương đương với `a` +  ` ̀`, encode sẽ thành U+0061 U+0300) thì match với a.  Lí do là cả hai code point U+0061 (`a`) và U+00E0 (`à`) đều thuộc category “letter", trong khi U+0300( ` ̀`) thuộc category “mark" 

Sau đây là một vài phép thử đối với `à` (tương đương `a` +  ` ̀`, encode sẽ thành U+0061 U+0300, không phải `à` gõ từ keyboard)

```ruby
"à".match(/\A\P{M}\p{M}\z/)
=> #<MatchData "à">
```
Trong đó \A và \z trong regex của ruby tương đương với ^ và $ trong regex của các ngôn ngữ khác 
`\p{M}`: match những kí tự thuộc "mark" category của unicode

`\P{M}`: match những kí tự không thuộc "mark" category của unicode

```ruby
"à".match(/\A\P{M}/)
=> #<MatchData "a">

"à".match(/\p{M}\z/)
=> #<MatchData "̀"> (chuỗi "̀" này không rỗng nhé)
```

Một số ngôn ngữ như PCRE, PHP, .NET phân biệt hoa thường của chuỗi giữa cặp ngoặc nhọn của token `\p/`. `\p{Zs}` match các kí tự trắng, trong khi `\p{zs}` sẽ quăng ra lỗi. Còn lại phần lớn các bộ phân tích regex khác đều hỗ trợ cả chữ hoa lẫn thường. Bạn nên áp dụng dạng hoa và thường kết hợp với nhau như danh sách bên dưới để regex của bạn hoạt động trên tất cả các bộ phân tích regex.

Ngoài các ký hiệu chuẩn `\p{L}`, Java, Perl, PCRE, JGsoft và XRegExp 3 cho phép bạn sử dụng dạng rút gọn `\pL`. Cách này chỉ hoạt động với các thuộc tính Unicode 1 kí tự. Ví dụ `\pLl`  không tương đương với `\p{Ll}` mà tương đương với `\p{L}l`, nó match "Al", "àl"  hoặc các cụm ký tự mà theo sau là ký tự "l".

Perl, XRegExp và JGsoft cũng hỗ trợ dạng đầy đủ `\p{Letter}`. Bạn có thể xem danh sách đầy đủ các thuộc tính Unicode bên dưới. Bạn có thể bỏ qua dấu gạch dưới `_`, dấu gạch ngang`-` hoặc dấu cách.
```
* \p{L} hoặc \p{Letter}: bất kỳ chữ cái từ bất kỳ ngôn ngữ nào.

* *     \p{Ll} hoặc \p{Lowercase_Letter}: chữ cái thường mà có biến thể chữ hoa

* *     \p{Lu} hoặc \p{Uppercase_Letter}: chữ cái hoa mà có biến thể chữ thường

* *     \p{Lt} hoặc \p{Titlecase_Letter}: một chữ cái xuất hiện ở đầu từ khi chỉ chữ cái đầu tiên của từ được viết hoa.

* *     \p{L&} hoặc \p{Cased_Letter}: ký tự có cả 2 biến thể hoa và thường.

* *     \p{Lm} hoặc \p{Modifier_Letter}: kí tự đặc biệt được sử dụng như 1 chữ cái

* *     \p{Lo} hoặc \p{Other_Letter}: chữ cái hoặc tượng hình không có các biến thể chữ thường, chữ hoa

* \p{M} hoặc \p{Mark}: Ký tự dùng để kết hợp với các ký tự khác (dấu huyền, sắc, ô ... )

* *     \p{Mn} hoặc \p{Non_Spacing_Mark}: Ký tự dùng để kết hợp với các ký tự khác mà không chiếm không gian

* *     \p{Mc} hoặc \p{Spacing_Combining_Mark}: Ký tự dùng để kết hợp với các ký tự khác mà có chiếm không gian

* *     \p{Me} hoặc \p{Enclosing_Mark}: Ký tự bao quanh các ký tự mà nó kết hợp

* \p{Z} hoặc \p{Separator}: Bất kỳ các loại ký tự trắng hoặc các ký tự phân cách vô hình

* *     \p{Zs} hoặc \p{Space_Separator}: Ký tự trắng vô hình nhưng chiếm không gian

* *     \p{Zl} hoặc \p{Line_Separator}: Ký tự phân cách dòng U+2028.

* *     \p{Zp} hoặc \p{Paragraph_Separator}: Ký tự phân cách đoạn U+2029.

* \p{S} hoặc \p{Symbol}: Ký tự toán học, tiền tệ, dingbats, box-drawing...

* *     \p{Sm} hoặc \p{Math_Symbol}: Kí hiệu toán học

* *     \p{Sc} hoặc \p{Currency_Symbol}: Ký hiệu tiền tệ

* *     \p{Sk} hoặc \p{Modifier_Symbol}: Ký tự kết hợp (Mark) là 1 ký tự đầy đủ của riêng mình

* *     \p{So} hoặc \p{Other_Symbol}: Một vài kí tự khác mà nằm ngoài kí hiệu toán học, tiền tệ và kí tự kết hợp

* \p{N} hoặc \p{Number}: Ký tự số

* *     \p{Nd} hoặc \p{Decimal_Digit_Number}: Số không đến chín trong các loại chữ ngoại trừ tượng hình

* *     \p{Nl} hoặc \p{Letter_Number}: Số mà giống như chữ cái. Ví dụ: số La Mã

* *     \p{No} hoặc \p{Other_Number}: số ở dạng superscript hoặc subscript hoặc số không là không đến chín (Không bao gồm số tượng hình)

* \p{P} hoặc \p{Punctuation}: Dấu câu

* *     \p{Pd} hoặc \p{Dash_Punctuation}: Bất kỳ loại dấu gạch nối hoặc dấu gạch ngang

* *     \p{Ps} hoặc \p{Open_Punctuation}: Bất kì các loại ngoặc mở

* *     \p{Pe} hoặc \p{Close_Punctuation}: Bất kì các loại ngoặc đóng

* *     \p{Pi} hoặc \p{Initial_Punctuation}: Bất kì các loại dấu trích dẫn mở

* *     \p{Pf} hoặc \p{Final_Punctuation}: Bất kì các loại dấu trích dẫn đóng

* *     \p{Pc} hoặc \p{Connector_Punctuation}: Các dấu dùng để kết nối các từ như dấu gạch dưới

* *     \p{Po} hoặc \p{Other_Punctuation}: Các dấu câu còn lại

* *     \p{C} hoặc \p{Other}: các ký tự vô hình và các code point không được sử dụng

* \p{Cc} hoặc \p{Control}: Ký tự điều khiển ASCII hoặc Latin-1: 0x00–0x1F và 0x7F–0x9F

* *     \p{Cf} hoặc \p{Format}

* *     \p{Co} hoặc \p{Private_Use}

* *     \p{Cs} hoặc \p{Surrogate}

* *     \p{Cn} hoặc \p{Unassigned}
```

## Unicode Scripts
Có những code point đã được gán cho ký tự rồi, bên cạnh đó có những code point chưa được gán cho ký tự nào cả. Chuẩn Unicode phân chia các code point đã được gán thành nhiều script. Mỗi script là một nhóm các code point được sử dụng bởi một hệ thống chữ viết cụ thể. Một số script như `Thai` tương ứng với một ngôn ngữ(ở đây là chữ Thái). Các script khác như `Latin` thì trải rộng nhiều ngôn ngữ.

Một vài ngôn ngữ bao gồm nhiều script. Ví dụ: Không có script Japanese Unicode mà thay vào đó, Unicode cung cấp script như `Hiragana`, `Katakana`, `Han` và `Latin` để sử dụng trong các tài liệu tiếng Nhật.

`Common` là một script đặc biệt. Script này chứa tất cả các loại ký tự phổ biến từ nhiều script khác. Nó bao gồm tất cả các loại dấu câu, khoảng trắng và các biểu tượng linh tinh.

Tất cả các code point đã được gán (match `\P{Cn}`) đều thuộc về các script của Unicode. Các code point chưa được gán (match với `\p{Cn}`) không thuộc về bất kỳ script nào của Unicode.

Perl, PCRE, PHP, Ruby 1.9, Delphi và XRegExp có thể match những script dưới đây.
```
\p{Common}

\p{Arabic}

\p{Armenian}

\p{Bengali}

\p{Bopomofo}

\p{Braille}

\p{Buhid}

\p{Canadian_Aboriginal}

\p{Cherokee}

\p{Cyrillic}

\p{Devanagari}

\p{Ethiopic}

\p{Georgian}

\p{Greek}

\p{Gujarati}

\p{Gurmukhi}

\p{Han}

\p{Hangul}

\p{Hanunoo}

\p{Hebrew}

\p{Hiragana}

\p{Inherited}

\p{Kannada}

\p{Katakana}

\p{Khmer}

\p{Lao}

\p{Latin}

\p{Limbu}

\p{Malayalam}

\p{Mongolian}

\p{Myanmar}

\p{Ogham}

\p{Oriya}

\p{Runic}

\p{Sinhala}

\p{Syriac}

\p{Tagalog}

\p{Tagbanwa}

\p{TaiLe}

\p{Tamil}

\p{Telugu}

\p{Thaana}

\p{Thai}

\p{Tibetan}

\p{Yi}
```
 
## Unicode Blocks
Chuẩn Unicode cũng chia các ký tự thành các khối hoặc phạm vi. Mỗi khối được dùng để định nghĩa các ký tự của một script cụ thể như “Tibetan" hoặc thuộc về một nhóm cụ thể như “Braille Patterns". Hầu hết những khối chứa các code point chưa được gán, dành riêng cho việc mở rộng chuẩn Unicode sau này.

Chú ý rằng các khối Unicode không giống hoàn toàn với các script. Có sự khác nhau cơ bản giữa khối và script. Khối là phạm vi của các code point (như danh sách phía dưới). Còn script chứa các ký tự trên phạm vi toàn bộ Unicode. Các khối có thể bao gồm các code point chưa được gán(những code point khớp với `\p{Cn}`). Script chỉ chứa các code point đã được gán cho ký tự. Nói chung, nếu bạn không biết nên dùng loại nào thì nên chọn script.

Ví dụ, khối Currency không chứa dấu `$` và `¥` nhưng 2 khối `Basic_Latin` và `Latin-1_Supplement` thì có, mặc dù cả 2 dấu này đều không phải là ký tự `Latin`. Việc này là vì lí do lịch sử, bởi vì chuẩn ASCII chứa dấu `$` và chuẩn ISO-8859 chứa dấu `¥`. Bạn không nên mù quáng sử dụng bất kì các khối được liệt kê bên dưới dựa vào tên của chúng. Thay vào đó, hãy xem phạm vi của các ký tự mà chúng match. Một công cụ giống như RegexBuddy có thể giúp bạn. `\p{Sc}` hoặc `\p{Currency_Symbol}` sẽ là lựa chọn tốt hơn `\p{InCurrency_Symbols}` khi bạn đang match các ký hiệu tiền tệ.

```
\p{InBasic_Latin}: U+0000–U+007F

\p{InLatin-1_Supplement}: U+0080–U+00FF

\p{InLatin_Extended-A}: U+0100–U+017F

\p{InLatin_Extended-B}: U+0180–U+024F

\p{InIPA_Extensions}: U+0250–U+02AF

\p{InSpacing_Modifier_Letters}: U+02B0–U+02FF

\p{InCombining_Diacritical_Marks}: U+0300–U+036F

\p{InGreek_and_Coptic}: U+0370–U+03FF

\p{InCyrillic}: U+0400–U+04FF

\p{InCyrillic_Supplementary}: U+0500–U+052F

\p{InArmenian}: U+0530–U+058F

\p{InHebrew}: U+0590–U+05FF

\p{InArabic}: U+0600–U+06FF

\p{InSyriac}: U+0700–U+074F

\p{InThaana}: U+0780–U+07BF

\p{InDevanagari}: U+0900–U+097F

\p{InBengali}: U+0980–U+09FF

\p{InGurmukhi}: U+0A00–U+0A7F

\p{InGujarati}: U+0A80–U+0AFF

\p{InOriya}: U+0B00–U+0B7F

\p{InTamil}: U+0B80–U+0BFF

\p{InTelugu}: U+0C00–U+0C7F

\p{InKannada}: U+0C80–U+0CFF

\p{InMalayalam}: U+0D00–U+0D7F

\p{InSinhala}: U+0D80–U+0DFF

\p{InThai}: U+0E00–U+0E7F

\p{InLao}: U+0E80–U+0EFF

\p{InTibetan}: U+0F00–U+0FFF

\p{InMyanmar}: U+1000–U+109F

\p{InGeorgian}: U+10A0–U+10FF

\p{InHangul_Jamo}: U+1100–U+11FF

\p{InEthiopic}: U+1200–U+137F

\p{InCherokee}: U+13A0–U+13FF

\p{InUnified_Canadian_Aboriginal_Syllabics}: U+1400–U+167F

\p{InOgham}: U+1680–U+169F

\p{InRunic}: U+16A0–U+16FF

\p{InTagalog}: U+1700–U+171F

\p{InHanunoo}: U+1720–U+173F

\p{InBuhid}: U+1740–U+175F

\p{InTagbanwa}: U+1760–U+177F

\p{InKhmer}: U+1780–U+17FF

\p{InMongolian}: U+1800–U+18AF

\p{InLimbu}: U+1900–U+194F

\p{InTai_Le}: U+1950–U+197F

\p{InKhmer_Symbols}: U+19E0–U+19FF

\p{InPhonetic_Extensions}: U+1D00–U+1D7F

\p{InLatin_Extended_Additional}: U+1E00–U+1EFF

\p{InGreek_Extended}: U+1F00–U+1FFF

\p{InGeneral_Punctuation}: U+2000–U+206F

\p{InSuperscripts_and_Subscripts}: U+2070–U+209F

\p{InCurrency_Symbols}: U+20A0–U+20CF

\p{InCombining_Diacritical_Marks_for_Symbols}: U+20D0–U+20FF

\p{InLetterlike_Symbols}: U+2100–U+214F

\p{InNumber_Forms}: U+2150–U+218F

\p{InArrows}: U+2190–U+21FF

\p{InMathematical_Operators}: U+2200–U+22FF

\p{InMiscellaneous_Technical}: U+2300–U+23FF

\p{InControl_Pictures}: U+2400–U+243F

\p{InOptical_Character_Recognition}: U+2440–U+245F

\p{InEnclosed_Alphanumerics}: U+2460–U+24FF

\p{InBox_Drawing}: U+2500–U+257F

\p{InBlock_Elements}: U+2580–U+259F

\p{InGeometric_Shapes}: U+25A0–U+25FF

\p{InMiscellaneous_Symbols}: U+2600–U+26FF

\p{InDingbats}: U+2700–U+27BF

\p{InMiscellaneous_Mathematical_Symbols-A}: U+27C0–U+27EF

\p{InSupplemental_Arrows-A}: U+27F0–U+27FF

\p{InBraille_Patterns}: U+2800–U+28FF

\p{InSupplemental_Arrows-B}: U+2900–U+297F

\p{InMiscellaneous_Mathematical_Symbols-B}: U+2980–U+29FF

\p{InSupplemental_Mathematical_Operators}: U+2A00–U+2AFF

\p{InMiscellaneous_Symbols_and_Arrows}: U+2B00–U+2BFF

\p{InCJK_Radicals_Supplement}: U+2E80–U+2EFF

\p{InKangxi_Radicals}: U+2F00–U+2FDF

\p{InIdeographic_Description_Characters}: U+2FF0–U+2FFF

\p{InCJK_Symbols_and_Punctuation}: U+3000–U+303F

\p{InHiragana}: U+3040–U+309F

\p{InKatakana}: U+30A0–U+30FF

\p{InBopomofo}: U+3100–U+312F

\p{InHangul_Compatibility_Jamo}: U+3130–U+318F

\p{InKanbun}: U+3190–U+319F

\p{InBopomofo_Extended}: U+31A0–U+31BF

\p{InKatakana_Phonetic_Extensions}: U+31F0–U+31FF

\p{InEnclosed_CJK_Letters_and_Months}: U+3200–U+32FF

\p{InCJK_Compatibility}: U+3300–U+33FF

\p{InCJK_Unified_Ideographs_Extension_A}: U+3400–U+4DBF

\p{InYijing_Hexagram_Symbols}: U+4DC0–U+4DFF

\p{InCJK_Unified_Ideographs}: U+4E00–U+9FFF

\p{InYi_Syllables}: U+A000–U+A48F

\p{InYi_Radicals}: U+A490–U+A4CF

\p{InHangul_Syllables}: U+AC00–U+D7AF

\p{InHigh_Surrogates}: U+D800–U+DB7F

\p{InHigh_Private_Use_Surrogates}: U+DB80–U+DBFF

\p{InLow_Surrogates}: U+DC00–U+DFFF

\p{InPrivate_Use_Area}: U+E000–U+F8FF

\p{InCJK_Compatibility_Ideographs}: U+F900–U+FAFF

\p{InAlphabetic_Presentation_Forms}: U+FB00–U+FB4F

\p{InArabic_Presentation_Forms-A}: U+FB50–U+FDFF

\p{InVariation_Selectors}: U+FE00–U+FE0F

\p{InCombining_Half_Marks}: U+FE20–U+FE2F

\p{InCJK_Compatibility_Forms}: U+FE30–U+FE4F

\p{InSmall_Form_Variants}: U+FE50–U+FE6F

\p{InArabic_Presentation_Forms-B}: U+FE70–U+FEFF

\p{InHalfwidth_and_Fullwidth_Forms}: U+FF00–U+FFEF

\p{InSpecials}: U+FFF0–U+FFFF
```

Không phải tất cả các trình phân tích regex đều sử dụng cùng cú pháp để match các khối Unicode. Java, Ruby 2.0 và XRegExp sử dụng cú pháp `\p{InBlock}` như danh sách liệt kê ở trên. Nhưng .Net và XML thì sử dụng `\p{IsBlock}`. Perl và JGsoft flaver hỗ trợ cả hai loại cú pháp. Bạn nên dùng `In` nếu trình phân tích hỗ trợ nó. `In` chỉ có thể được dùng cho các khối Unicode trong khi `Is` còn có thể được dùng cho các property và script của Unicode.

Đối với .NET và XML, bạn phải bỏ qua dấu gạch dưới nhưng giữ lại dấu gạch ngang ở tên của khối. Ví dụ: dùng `\p{IsLatinExtended-A}` thay vì dùng `\p{InLatin_Extended-A}`. Trong Java, bạn phải bỏ qua dấu gạch ngang. `.NET` và `XML` cũng phân biệt chữ hoa chữ thường, trong khi Perl, Ruby và JGsoft flavor thì không. `Java 4` phân biệt hoa thường nhưng Java 5 trở về sau thì chỉ phân biệt hoa thường đối với tiền tố `Is`.

Tên của các khối đều giống với tên trong các trình phân tích regex. Tên các khối được định nghĩa trong chuẩn Unicode. PCRE và PHP không hỗ trợ khối Unicode nhưng lại hỗ trợ script
 
## Bạn có cần phải lo lắng về việc mã hóa khác nhau không?
Trong khi bạn nên nhớ rằng những cạm bẫy được tạo ra bằng nhiều cách khác nhau để mã hóa các ký tự có dấu, nhưng bạn không phải luôn lo lắng về chúng. Nếu bạn chắc chắn chuỗi input và regex của bạn sử dụng cùng một kiểu thì không cần lo lắng gì nữa. Quá trình này gọi là chuẩn hóa Unicode. Tất cả các ngôn ngữ lập trình có hỗ trợ Unicode gốc như Java, C# và VB.NET có thư viện để chuẩn hóa chuỗi. Nếu bạn chuẩn hóa cả subject và regex trước khi thực hiện match, sẽ không có bất kỳ xung đột nào.

Nếu sử dụng Java, bạn có thể truyền vào cờ `CANON_EQ` với vài trò là tham số thứ 2 của hàm Pattern.compile(). Điều này nói với trình phân tích regex của Java rằng các ký tự nhìn giống nhau là như nhau. Ví dụ, regex match với à (U+00E0) sẽ match với à (U+0061 U+0300) và ngược lại. Ngoài Java thì không có trình phân tích regex nào hỗ trợ điều này.

Nếu bạn gõ `à` bằng bàn phím, hầu hết các trình xử lý văn bản sẽ nhập code point U+00E0 vào file. Vì vậy nếu bạn đang làm việc với văn bản do bạn gõ thì bất kỳ các regex mà bạn gõ cũng được match theo cùng một cách.