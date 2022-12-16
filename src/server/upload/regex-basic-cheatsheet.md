## 1. Basic topics

### Anchors `—`, `^` và `$`
- `^The` khớp với bất kì chuỗi nào bắt đầu bằng `The `
- `end$` khớp với chuỗi mà có kết thúc bằng `end`
- `^The end$` khớp chuỗi bắt đầu và kết thúc bằng `The end`
- `roar` khớp với bất kì chuỗi nào có chứa từ `roar`

### Quantifiers `—`, `*`, `+`, `?` and `{}`

- `abc*` khớp với một chuỗi mà có ab và sau nó có thể có 0 hoặc nhiều c
- `abc+` khớp với một chuỗi mà có ab và sau nó có 1 hoặc nhiều c
- `abc?` khớp với một chuỗi mà có ab và sau nó có thể có 0 hoặc 1 c
- `abc{2}` khớp với một chuỗi mà có ab và sau nó có 2 c
- `abc{2,} ` khớp với một chuỗi mà có ab và sau nó có 2 hoặc nhiều c
- `abc{2,5}` khớp với một chuỗi mà có ab và sau nó có 2 tới 5 c
- `a(bc)* ` khớp với một chuỗi mà có a và sau nó có thể có 0 hoặc nhiều cặp `bc`
- `a(bc){2,5}` khớp với một chuỗi mà có a và sau nó có từ 2 tới 5 cặp `bc`

### `OR` operator `—`, `|`, or `[]`
- `a(b|c)` khớp với một chuỗi mà có a và sau nó có b hoặc c
- `a[bc]` khớp với 1 chuỗi mà có và sau nó ko có b hoặc c

### Character classes — `\d`, `\w`, `\s` and `.`
- `\d` khớp với 1 kí tự dạng số
- `\w` khớp với 1 từ (bao gồm các chữ trong bảng chữ cái + kí tự `_`) 
- `\s` khớp với một kí tự `whitespace` (bao gồm cả tab và xuống dòng)
- `. ` khớp với bất kì kí tự nào

Ứng với `\d`, `\w` và `\s` có một dạng phủ định tương ứng là `\D`, `\W` và `\S`.
Ví dụ: `\D` sẽ khớp với một kí tự không phải dạng số

### Flags

Một regex thường có format dạng `/abc/`, cụm pattern dùng để tìm kiếm được đặt trong 2 dấu `\`. Cuối của mỗi regex chúng ta có thể đặt một vài cờ (thường dùng) như dưới đây:
- `g` (global): không trả về kết quả tìm kiếm đầu tiên mà tiếp tục tìm kiếm
- `m` (multi-line): tìm kiếm trên nhiều dòng
- `i` (insensitive): không phân biệt chữ hoa - chữ thường
- `x` (extended): bỏ qua khoảng trống (space)

## Intermediate topics

### Grouping and capturing — ()
- `a(bc)`: tạo 1 group `bc`
- `a(?:bc)*` sử dụng `?:` sẽ vô hiệu hóa group, ví dụ regex trên sẽ match với `a`, `abc`
- `a(?<foo>bc)`: đặt tên cho group `bc` là `foo`

Việc đặt tên cho group sẽ rất hữu ích khi bạn cần trích xuất kết quả từ regex, đặc biệt với các regex phức tạp

### Bracket expressions — []
- `[abc]` khớp với 1 chuỗi mà có a, b, hoặc c (tương tự với `a|b|c`)
- `[a-c]` khớp với 1 chuỗi bao gồm 1 trong các kí tự từ `a` tới `c` (a, b, c)
- `[a-fA-F0-9]` khớp với 1 số hệ 16, không phân biệt chữ hoa - thường.
- `[0-9]% ` khớp với 1 chuỗi có 1 kí tự là kí tự số từ 0 tới 9 và sau nó là 1 kí tự %
- `[^a-zA-Z]` khớp với 1 chỗi không chứa các chữ cái từ a-z và không phân biệt chữ hoa - thường

### Greedy and Lazy match

Các kí tự `(`, `*`, `+`, `{`, `}`, `)` được gọi là `greedy operators`, chúng sẽ mở rộng chuỗi khớp với regex tới mức tối đa

Ví dụ, `<.+>` sẽ khớp với đoạn text này `<div>simple div</div> in This is a <div> simple div</div> test`.

Nếu bạn chỉ cần tìm thẻ `div` thì bạn có thể sử dụng `?`:
- `<.+?>` khớp với bất kì kí tự nào một hoặc nhiều lần nằm trong `<>` 

Còn 1 cách đơn giản hơn, chúng ta sử dụng `Bracket expressions` như ở trên kết hợp với phép phủ định `^`, chúng ta sẽ có một solution ổn hơn mà ko phải sử dụng `.`:
- `<[^<>]+>` khớp với bất kì kí tự nào không phải `<` hoặc `>` một hoặc nhiều lần nằm trong `<>` 

## Summary

Như bạn đã thấy, các ứng dụng của regex có thể có nhiều và chắc chắn rằng bạn đã nhận ra ít nhất một trong những ứng dụng của nó trong công việc của bạn:
- xác thực dữ liệu (validate data)
- quét dữ liệu (đặc biệt là quét web) - data scraping

Việc áp dụng một cách hợp lý regex vào trong công việc của bạn sẽ làm nó đơn giản và hiệu quả hơn
Reference: https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285