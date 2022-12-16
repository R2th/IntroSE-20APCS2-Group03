## Regular Expressions
### Không nên sử dụng regular expressions nếu bạn chỉ muốn tìm kiếm văn bản trong chuỗi string
### Đối với cấu trúc đơn giản, bạn có thể sử dụng regexp trong string index
```
match = string[/regexp/]             # get content of matched regexp
first_group = string[/text(grp)/, 1] # get content of captured group
string[/text (grp)/, 1] = 'replace'  # string => 'text replace'
```
### Sử dụng non-capturing khi bạn không sử dụng kết quả thu được của dấu ngoặc đơn
```
/(first|second)/   # bad
/(?:first|second)/ # good
```
### Không sử dụng các biến kiểu Perl khó hiểu, biểu thị các kết quả khớp nhóm regex. Hãy sử dụng `Regexp.last_match[n]`
```
/(regexp)/ =~ string
...

# bad
process $1

# good
process Regexp.last_match[1]
```
### Hãy cẩn thận với ^ và $ vì chúng khớp với đầu và cuối dòng chứ ko phải kết thúc chuỗi. Nếu bạn muốn khớp toàn bộ chuỗi hãy dùng \A và \z
```
string = "some injection\nusername"
string[/^username$/]   # matches
string[/\Ausername\z/] # don't match
```
### Sử dụng x để sửa đổi cho các regexp phức tạp. Điều này làm chúng dễ đọc hơn và bạn có thể thêm comment cho nó
```
regexp = %r{
  start         # some text
  \s            # white space char
  (group)       # first group
  (?:alt1|alt2) # some alternation
  end
}x
```
## Percent Literals
### Sử dụng %() cho các chuỗi 1 dòng. Và heredocs cho chuỗi có nhiều dòng
```
# bad (no interpolation needed)
%(<div class="text">Some text</div>)
# should be '<div class="text">Some text</div>'

# bad (no double-quotes)
%(This is #{quality} style)
# should be "This is #{quality} style"

# bad (multiple lines)
%(<div>\n<span class="big">#{exclamation}</span>\n</div>)
# should be a heredoc.

# good (requires interpolation, has quotes, single line)
%(<tr><td class="name">#{name}</td>)
```
### Tránh sử dụng %q nếu chuỗi của bạn có cả dấu nháy đơn và nháy đôi trong đó
```
# bad
name = %q(Bruce Wayne)
time = %q(8 o'clock)
question = %q("What did you say?")

# good
name = 'Bruce Wayne'
time = "8 o'clock"
question = '"What did you say?"'
```
### Chỉ sử dụng %r cho các cụm từ thông dụng khớp với nhiều hơn 1 ký tự
```
# bad
%r(\s+)

# still bad
%r(^/(.*)$)
# should be /^\/(.*)$/

# good
%r(^/blog/2011/(.*)$)
```
### Tránh sử dụng %x trừ khi bạn gọi 1 lệnh có dấu ngoặc kép trong đó
```
# bad
date = %x(date)

# good
date = `date`
echo = %x(echo `date`)
```
## Metaprogramming
### Tránh sử dụng metaprograming không cần thiết
### `class_eval` thích hợp hơn `string-interpolated `
### Khi sử dụng `class_eval` add thêm comment cho nó nếu được
```
# from activesupport/lib/active_support/core_ext/string/output_safety.rb
UNSAFE_STRING_METHODS.each do |unsafe_method|
  if 'String'.respond_to?(unsafe_method)
    class_eval <<-EOT, __FILE__, __LINE__ + 1
      def #{unsafe_method}(*args, &block)       # def capitalize(*args, &block)
        to_str.#{unsafe_method}(*args, &block)  #   to_str.capitalize(*args, &block)
      end                                       # end

      def #{unsafe_method}!(*args)              # def capitalize!(*args)
        @dirty = true                           #   @dirty = true
        super                                   #   super
      end                                       # end
    EOT
  end
end
```
### Tránh sử dụng `method_missing` để lập trình metaprograming, bởi vì dấu vết trở nên lộn xộn. Nếu bắt buộc phải sử dụng `method_missing`
- Hãy chắc chắn cũng xác định `respond_to_missing?`
- Chỉ bắt các phương thức có tiền tố được xác định rõ
- Hãy gọi `super` vào cuối `statement` của bạn
- Ủy quyền cho các method
```
# bad
def method_missing?(meth, *args, &block)
  if /^find_by_(?<prop>.*)/ =~ meth
    # ... lots of code to do a find_by
  else
    super
  end
end

# good
def method_missing?(meth, *args, &block)
  if /^find_by_(?<prop>.*)/ =~ meth
    find_by(prop, *args, &block)
  else
    super
  end
end
```
## Kết
Mình đã giới thiệu với các bạn, cách làm thế nào để viết code dễ đọc hơn trong Ruby, Ruby on Rails. 
Cảm ơn các bạn đã đọc bài viết.