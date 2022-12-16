![](https://images.viblo.asia/209d6210-77b6-407b-a98b-c5f0b4c7cb0b.png)

Điều gì sẽ xảy ra khi bạn mở `irb` và chạy 1 đoạn code `ruby`, ( ex: `puts 100` ) ? 

Đoạn code đó đã được xử lý như thế nào để ra in ra được số 100 trên màn hình console ?

Bài viết này mình sẽ nói về quá trình này :cloud_with_lightning_and_rain: .

---

## Tokenization

Đầu tiên, đoạn code được ruby token hóa, đọc tất cả các dòng text trong file source code và convert chúng thành những `tokens`.

Ví dụ, viết 1 đoạn code ruby và lưu nó vào trong 1 file:

```ruby
# simple.rb
10.times do |n|
    puts n
end
```

Khi chạy `ruby simple.rb`, đầu tiên ruby sẽ mở file này lên đọc toàn bộ text có trong file này:

![](https://images.viblo.asia/b8123659-aeb7-40d3-a7ec-3edbc350582c.png)

Ruby C [source code](https://github.com/ruby/ruby/blob/master/parse.y#L9168) loop từng kí tự và process từng kí tự một.

Bắt đầu scanning từ character đầu tiên:

![](https://images.viblo.asia/ec490377-5686-47d8-9fba-cea9f5ce14a1.png)

Kí tự `1` được ruby hiểu là bắt đầu của một `numeric` và tiếp tục lặp tới kí tự kế, là `0`:

![](https://images.viblo.asia/538e7565-e752-41d0-bd42-63ed471af784.png)

tiếp tục:

![](https://images.viblo.asia/4f48e7bf-c23d-4795-83b7-8a3d9d71d7c2.png)

Kí tự này là dấu chấm `.`, ruby cho rằng có thể nó là một phần của `float` value và tiếp tục lặp:

![](https://images.viblo.asia/6c5df19c-8f48-4803-9c12-66c298666949.png)

Kí tự kế lại là `t`, vì nó không phải là một kí tự `numeric`, ruby "hiểu" rằng không có số `numeric` nào sau dấu chấm `.` :laughing:, vậy nên nó cho rằng `.` là một `token` riêng biệt và quay lại 1 step:

![](https://images.viblo.asia/d2ea7994-6703-45f3-8af5-2f8f1e6f819d.png)

Vì `.` được cho là một `token` nên hai kí tự đầu `1`, `0` sẽ là một số `integer`, ruby convert chúng thành 1 `token` ( loại `tINTEGER` )

![](https://images.viblo.asia/520acb02-894a-474e-9dc4-e26610961366.png)

Tiếp tục convert `.` thành một `token`:

![](https://images.viblo.asia/1f93abe0-ebd6-4365-88c4-8dce0a34be8a.png)

Kế tiếp, ruby lặp và tìm thấy 5 kí tự và convert thành `token`: `times` ( loại `tIDENTIFIER` ):

![](https://images.viblo.asia/b9f3e2db-d861-4349-a201-14987bb79a0f.png)

`Identifiers` trong ruby code không phải là các [reserved words](https://docs.ruby-lang.org/en/2.2.0/keywords_rdoc.html), chúng là các tên biến, method hay tên class.

Tiếp, ruby đọc được kí tự `do` và convert nó thành `keyword_do` ( `do` là một trong những [reserved words](https://docs.ruby-lang.org/en/2.2.0/keywords_rdoc.html) trong ruby ):

![](https://images.viblo.asia/3c314c9e-32a6-4646-bd00-262873c1546d.png)

Các [reserved words](https://docs.ruby-lang.org/en/2.2.0/keywords_rdoc.html) đã được định nghĩa trong [C source code](https://github.com/ruby/ruby/blob/master/parse.y#L1106-L1155).

Cuối cùng, các kí tự còn lại đều được convert thành các `tokens`:

![](https://images.viblo.asia/ff61787c-f55f-4745-a910-76a7d1abb131.png)

Ta có thể kiểm tra đoạn code của mình đã được convert thành các `token`:

```ruby
code = <<STR
  10.times do |n|
  puts n
end
STR

pp Ripper.lex(code)
```

![](https://images.viblo.asia/c751b72e-1942-42ad-8720-ed0e5cd2079c.png)


## Parsing

Sau khi convert cả file text, ruby đi tới quá trình `parsing`.

Trong quá trình `parsing`, các `tokens` được gom nhóm thành những `sentences` hoặc `phrases` mà ruby có thể hiểu được.

Quá trình này ruby sử dụng `parser generator` ( được gọi là `Bison` ).

Quá trình `Tokenization` và `Parsing` trong lúc build time và run time được minh họa ở hình dưới:

![](https://images.viblo.asia/4ff682a1-8091-404b-9fea-05728d4476b5.png)

Trong thời gian Ruby build time, Ruby build process dùng `Bison` để gen ra file `parse.c` từ file [parse.y](https://github.com/ruby/ruby/blob/master/parse.y) , vì thế nên `parse.c` sẽ chứa phần code `token` hóa ở mục trước.

Trong quá trình run time, 2 tiến trình `tokenization` và `parsing` sẽ diễn ra đồng thời, `parsing` sẽ `token` hóa khi nào nó cần `token` mới.

### LALR Parse Algorithm
Thuật toán được `parsing` dùng là `LALR` (  Look-Ahead Left Reversed Rightmost
Derivation ), bao gồm 2 phần: 

* Left Reversed Rightmost Derivation ( `LR` ): `parsing` xử lý các `tokens` từ trái sang phải, match theo thứ tự xuất hiện của `tokens` dựa trên các `grammar rules` có trong `parse.y`.
* Look ahead ( `L` ): `parsing` cũng đồng thời kiểm tra các `token` phía trước trong quá trình process để quyết định match đúng `grammar rule` phù hợp.

Ví dụ, mong muốn dịch một câu từ tiếng `Spanish` sang `English`:
```ruby
"Me gusta el Ruby" => "I like Ruby"
```
Các `grammar rules` được định nghĩa trong [parse.y](https://github.com/ruby/ruby/blob/master/parse.y). `parser generator` ( `Bison` ) gen ra file `parse.c` từ file này, và các rule trong `parse.y` đều có syntax quy định:

![](https://images.viblo.asia/0bbbdb47-ce51-4c1a-9dfd-f12f58513e89.png)

Theo rule trên thì nếu các `tokens` bằng với `me`, `gusta`, `eq`, `ruby` thì match với `SpanishPhrase` rule, và nếu match thì đoạn code C bên trong sẽ được chạy:

![](https://images.viblo.asia/4183223e-0a06-4562-874d-b7bbef5aba40.png)

Một ví dụ khác, lúc này có 2 câu tiếng `Spanish` và muốn kiếm tra xem input sẽ match với câu ( `rule` ) nào:
```ruby
"Me gusta el Ruby" => "I like Ruby"

"Le gusta el Ruby" => "She/He/It likes Ruby"
```

File `parse.y` sẽ như sau:

![](https://images.viblo.asia/ce2ab58b-11a8-4e51-ac2e-d440aa59e421.png)

Lúc này sẽ có tới 4 `grammar rule` thay vì 1 như ví dụ trước. Có 2 `directive` ở đây, đó là: 

* `$$`: Chứa giá trị trả về từ `child grammar rule` cho `parent grammar rule`
* `$1`: Chứa giá trị lấy từ `child grammar rule` và dùng trong `parent grammar rule`

Ở đây `SpanishPhrase` rule là parent của `VerbAndObject`, `VerbAndObject` là parent của `SheLikes` và `ILike`.

Bắt đầu quá trình `parsing`, các `tokens` được thực hiện từ trái qua phải ( `LR` ):

![](https://images.viblo.asia/8b02bda7-1639-4a87-8193-e2d357caf802.png)

Đầu tiên,  token `le` được `shift` ( đẩy ra ) khỏi mảng `tokens`, đưa vào một stack ( `grammar rule stack` ):

![](https://images.viblo.asia/30a50f3f-af13-40fd-8585-c28cfcd8a617.png)

Vì `le` không match với bất kì `grammar rule` nào, nên parse tiếp tục `shift` `gusta` vào:

![](https://images.viblo.asia/d542bb57-560b-47e2-b54a-59cbdb2e48bf.png)

Lúc này có 2 token trong stack: `le` và `gusta`,

parser check các `rules` được defined, thấy match với rule `SheLikes`, do vậy, parser thay thế cặp token `le` + `gusta` thành rule `SheLikes` được match ( `reduce` ):

![](https://images.viblo.asia/49efbb9d-5277-46df-8147-1505d9645f74.png)

Tiếp tục, parser `reduce` lần nữa với một match rule khác ( `VerbAndObject` ):

![](https://images.viblo.asia/ad666a7e-dae2-42b5-bdd7-e841d6f42680.png)

Vậy tại sao parser lại biết được có thể tiếp tục `reduce` lần thứ 2 này mà không tiếp tục `shift` thêm `token` mới ?

Làm thế nào `parser` quyết định khi nào thì `shift` hay `reduce` ?

Quay lại thời điểm 2 token được `shift` vào stack: `le` + `gusta`:

![](https://images.viblo.asia/cf24921b-014c-4daf-a7e9-f1d8bb789763.png)

Đây là lúc parser sử dụng phần `LA` ( look ahead ) trong thuật toán.

Để tìm kiếm đúng rule, parser check `token` kế tiếp trong mảng `tokens`:

![](https://images.viblo.asia/3c489cf0-abae-4f45-a0f5-d01855077b9f.png)

Dựa vào 1 bảng được tính toán từ trước, bảng này chứa các khả năng xảy ra dựa theo `token` kế tiếp và `rule` vừa được match là gì, parser sẽ quyết định rule nào mới được match.

Theo đó, bảng này sẽ chỉ ra nếu `rule` vừa được match ( `SheLikes` ) nếu đi theo với `token` kế tiếp ( `el` ) thì sẽ match được một `rule` mới ( `VerbAndObject` ).

Sau khi `reduce` với rule `VerbAndObject`, parser tiếp tục `shift` token `el` vào stack:

![](https://images.viblo.asia/d9785241-c468-45b9-9905-2e82b3bc863c.png)

Không có rule nào match, tiếp tục `shift` token `ruby`:

![](https://images.viblo.asia/9dc0b30d-1b0b-4d5d-ad60-640b16938e46.png)

Cuối cùng, rule match là `SpanishPhrase`:

![](https://images.viblo.asia/9c7ebc34-7598-4e90-a48c-3537dc6604ee.png)

Trên thực tế, các `grammar rule` được defined trong `parse.y` rất nhiều và phức tạp, nhưng sẽ tuân theo các syntax như trên ( `$$`, `$1`, `$2`, ... )

Sau đây là ví dụ thực tế về code sẽ được parse sang `grammar rules`:

![](https://images.viblo.asia/ce55a348-f2d4-420c-a5b4-39d26a182a65.png)

Sau khi tất cả source code được parse sang các `grammar rules`, và tiếp tục được convert sang một data structure được gọi là `abstract syntax tree` (  `AST` ):

![](https://images.viblo.asia/f1def9f3-164d-48eb-b3ce-f09e9c1ade42.png)

Sau đó,  các `AST nodes`này sẽ được `compile` thành `YARV instructions` ( sẽ nói ở bài viết khác ).

Cảm ơn mn đã đọc bài viết của mình.