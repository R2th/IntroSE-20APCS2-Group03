**Markdown** là một ngôn ngữ đánh dấu. Thế ngôn ngữ đánh dấu là gì? Ngôn ngữ đánh dấu rất đơn giản là một cách để làm cho một vài đoạn văn bản có ý nghĩa khác với các đoạn khác. - Markdown đã được tạo ra vào năm 2004 bởi John Gruber với sự đóng góp đáng kể từ Aaron Swartz, với mục đích cho phép người sử dụng “dễ viết các định dạng văn bản đơn giản dễ đọc, và tùy chọn chuyển đổi nó thành các mã XHTML hợp lệ (hoặc HTML)”.
Lấy cảm hứng từ các văn bản đơn giản trong email như setext, ngôn ngữ được thiết kế để có thể đọc như - là, không nhìn nó được đánh dấu với thẻ hoặc cú pháp định dạng, không giống như các văn bản đã được định dạng với một ngôn ngữ Markup , chẳng hạn như HTML, trong đó có thẻ rõ ràng và cú pháp định dạng. Markdown là một cú pháp định dạng cho văn bản có thể được đọc bởi con người và có thể dễ dàng chuyển đổi sang HTML.
Gruber đã viết một văn bản Perl - “Markdown.pl”, nó là một văn bản khác đi với XHTML hay HTML bằng việc thay thế các cú pháp thẻ bằng những cú pháp dễ dàng hơn nhưng chức năng thì tương tự nhau. Nó có thể được sử dụng như là một văn bản độc lập, như là một plugin cho Blosxom hay Movable Type, hoặc như một bộ lọc văn bản cho BBEdit.
Các phần mềm sử dụng ngôn ngữ Markdown: GitHub, GitBook, Reddit, Diaspora, Stack Overflow, OpenStreetMap và các ứng dụng khác.
Tệp tin: Một tài liệu Markdown là một file văn bản với phần mở rộng là .md. Bạn có thể mở tệp tin markdown bằng một trình soạn thảo bất kỳ trên máy tính của bạn.

## Tại sao cần sử dụng Markdown

HTML là một ngôn ngữ phổ biến,được sử dụng rộng rãi trong các ứng dụng sử dụng internet từ các trang web tới nội dung email hay rất nhiều các tài liệu hướng dẫn online cũng đều sử dụng ngôn ngữ này.

Tuy nhiên nhược điểm của nó là cú pháp của ngôn ngữ này không được thân thiện lắm với người dùng nếu không phải nói nó quá lằng nhằng và rắc rồi. Ví dụ như một khi bạn đã dùng thẻ p thì bạn sẽ phải đóng nó lại bằng thẻ p Với văn bản ngắn thì không sao nhưng nếu bạn phải viết văn bản hàng chục trang thì sao? Lại còn rất nhiều tính năng thừa thãi so với một writer nữa, có ai nhớ được tất cả các thẻ của HTML không? Thêm cả các thuộc tính riêng cho từng thẻ nữa?

Vì vậy đã có nhiều ngôn ngữ ra đời để thay thế HTML làm ngôn ngữ đánh dấu đơn giản tập trung vào nội dung cho writer. Trong số đó thì nổi bật nhất là Markdown, chủ yếu do nó được lựa chọn làm ngôn ngữ đánh dấu chính cho Github (hosting cho các dự án nguồn mở lớn nhất thế giới). Gần đây
Markdown trở nên khá nổi tiếng trong giới làm web, những blogger và những người viết sách self-publishing nhờ tính đơn giản, gọn nhẹ, dễ học của nó.
Một khi đã quen thì bạn hoàn toàn có thể dùng Markdown thay thế cho MS Word.

## Cú pháp của markdown

### 1. Heading

Markdown hỗ trợ 2 kiểu viết tiêu đề tài liệu: Setext và ATX.

- Với kiểu Setext: ta sử dụng ký tự `=` và `-` gạch chân dưới tiêu đề, sử dụng
  cho 2 thẻ `h1`và `h2`.
- Với kiểu AXT sử dụng ký tự `#` để biểu diễn các thẻ tiêu đề từ `h1` tới `h6`.
- Bạn cũng có thể sử dụng 1 thẻ đóng `#`

```
# Heading 1
# Heading1 #
Heading 1
======
## Heading 2
## Heading ##
Heading 2
------
## Heading 3
## Heading 3 ##
### Heading 4
### Heading 4 ###
#### Heading 5
#### Heading 5####
#### Heading 6
#### Heading 6 ####
```

# Heading 1

## Heading 2

## Heading 3

### Heading 4

#### Heading 5

#### Heading 6

### 2. Character styles

Tạo một đoạn văn bản: Example

```markdown
text
```

Tạo chữ in đậm: **Example**

```markdown
**Text**
**Text**
```

Tạo chữ in nghiêng: _Example_

```markdown
_Text_
_Text_
```

Tạo chữ in đâm và in nghiêng: **_Example_**

```markdown
**_text_**
```

Tạo chữ trong hộp: `Example`

```markdown
`Text`
```

Tạo chữ gạch ngang: ~~Example~~

```markdown
~~Text~~
```

Tạo văn bản trích dẫn: >text2

```markdown
> text2
```

### 3. Lits

Để dánh dấu 1 danh sách không có thứ tự (unorder list) chúng ta sử dụng
dấu `-` hoặc `+` hoặc `*****` trước mỗi dòng. Để đánh dấu một danh sách có
thứ tự bạn sử dụng các số thay vì các dấu như ở trên.

```markdown
- Text1
- Text2

1. Text1
2. Text2
```

- Text1
- Text2

1. Text1
2. Text2

### 4. Links

- Markdown hỗ trợ 2 kiểu chèn liên kết là: **inline** và **refences**.
- Để tạo một liên kết nội tuyến, sử dụng một tập hợp các dấu ngoặc đơn ngay sau ngoặc vuông. Bên trong ngoặc đặt URL mà bạn muốn liên kết, cùng với một tiêu đề tùy chọn cho liên kết, bao bọc trong dấu ngoặc kép.

```markdown
Markdown [Link](http://example.com)
Markdown [Link](../link)

Link1[Link1](1) Link2[Link2](2)
[1]: http://example1.com
[2]: http://example2.com
```

Markdown [Link](http://example.com)
Markdown [Link](../link)

### 5. Images

Hình ảnh trong Markdown tương tự như liên kết. Sự khác biệt là:

- Các dấu ngoặc vuông phải được bắt đầu bằng một dấu chấm than
- Và bên trong chúng có thể có một số văn bản thay thế. Mô tả về hình
  ảnh, nó sẽ được hiển thị nếu hình ảnh bị lỗi.

```markdown
Picture: ![Alt](https://i.imgur.com/nhzMtLm.png)
```

![Crepe](https://i.imgur.com/nhzMtLm.png)

### 6. Table

```markdown
| Number | Next number | Previous number |
| :----- | :---------- | :-------------- |
| Five   | Six         | Four            |
| Ten    | Eleven      | Nine            |
| Seven  | Eight       | Six             |
| Two    | Three       | One             |
```

| Number | Next number | Previous number |
| :----- | :---------- | :-------------- |
| Five   | Six         | Four            |
| Ten    | Eleven      | Nine            |
| Seven  | Eight       | Six             |
| Two    | Three       | One             |

### 7. Code và block

Có 2 loại code có thể viết trong markdown: inline code (code trong dòng) và
code block (đoạn code riêng). sử dụng lần lượt 1 ký tự và 3 ký tự `

```javascript
var foo = function(x) {
  return x + 5;
};
foo(3);
```