Ở bài viết lần trước ([Ruby căn bản - String](https://viblo.asia/p/ruby-can-ban-string-ByEZkVk4KQ0)) , chúng ta đã biết rằng strings có thể được coi là một chuỗi các ký tự theo thứ tự nào đó. Trong bài này, chúng ta cùng nhau tìm hiểu về kiểu dữ liệu mảng (Array), đó là một Ruby container chứa một list các phần tử tùy ý theo một thứ tự nào đó. Chúng ta sẽ bắt đầu bằng cách liên kết giữa string và array thông qua method **String#split**, sau đó cùng tìm hiểu về rất nhiều các array methods trong bài viết này. 
## Splitting
Cho đến hiện tại chúng ta đã tìm hiểu khá nhiều về string, có một cách đơn giản để chuyển string sang array đó là sử dụng method **split**.
```ruby
>> "ant bat cat".split(" ")     # Split a string into a three-element array.
=> ["ant", "bat", "cat"]
```
Từ kết quả trả về như trên, ta thấy rằng **split** trả về một list string mà đã được phân tách với nhau bằng khoảng trắng trong string gốc.<br>
Chúng ta thường phân tách dựa trên khoảng trắng (space), tuy nhiên chúng ta cũng có thể phân tách dựa trên bất kỳ thứ gì khác.
```ruby
>> "ant,bat,cat".split(",")
=> ["ant", "bat", "cat"]
>> "ant, bat, cat".split(", ")
=> ["ant", "bat", "cat"]
>> "antheybatheycathey".split("hey")
=> ["ant", "bat", "cat"]
```
Thậm chí, ta có thể phân chia (split) string thành các ký tự bằng cách phân chia dựa trêm empty string.
```ruby
>> "badger".split("")
=> ['b', 'a', 'd', 'g', 'e', 'r']
```
Thực tế, có lẽ split phổ biến nhất đó là không dùng đối số (arguments), trong trường hợp này, sẽ split mặc định theo khoảng trắng, tabs, hoặc newlines.
```ruby
>> "ant bat cat".split
=> ["ant", "bat", "cat"]
>> "ant     bat\t\tcat\n    duck".split
=> ["ant", "bat", "cat", "duck"]
```
## Array access
Hiện tại, chúng ta đã có được một mảng các ký tự bằng cách dùng **split** method. Tiếp theo, chúng ta thử gán mảng đó vào một biến. 
```ruby
>> a = "badger".split("")
=> ["b", "a", "d", "g", "e", "r"]
```
Sau đó, thì chúng ta có thể truy cập tới một element cụ thể trong mảng bằng cách sử dụng dấu ngoặc vuông.
```yaml
>> a[0]
=> "b"
>> a[1]
=> "a"
>> a[2]
=> "d"
```
Tương tự như với string, array cũng là *zero-offset*, nghĩa là phần tử đầu tiên sẽ có index là **0**, phần tử thứ hai là **1**, ... <br>
Hiện tại chúng ta mới biết là array thì chưa một mảng các ký tự, tuy nhiên là Array trong Ruby có thể chứa bất kỳ thể loại phần tử nào.
```ruby
>> soliloquy = "To be, or not to be, that is the question:"
>> a = ["badger", 42, soliloquy.include?("To be")]
=> ["badger", 42, true]
>> a[2]
=> true
>> a[3]
=> nil
```
ta thấy, bằng cách dùng dấu ngoặc vuông [], ta có thể truy cập tới bất kỳ thể loại phần tử nào trong mảng. Chúng ta cũng đã cố truy cập vào index nằm ngoài phạm vị, kết quả là đã return về **nil**. Điều này có thể gây ngạc nhiên cho những bạn đã có kinh nghiệm lập trình trước đó, vì ở nhiều ngôn ngữ khác hệ thống sẽ báo lỗi nếu ta cố truy cập vào phần tử nằm ngoài phạm vi, nhưng Ruby thì lại khá mềm dẻo trong vấn đề này.<br>

Một tính năng tiện lợi khác của Ruby đó là cho phép chỉ mục âm, được tính từ cuối mảng.
```ruby
>> a[-2]
=> 42
```
Qua đó, chúng ta có một số cách tiện lợi để lấy phần tử cuối cùng: 
```ruby
>> a[a.length - 1]
=> true
```
```ruby
>> a[-1]
=> true
```
Và Ruby cũng cung cấp một hàm đặc biệt để làm điều này đó là dùng **last** method
```ruby
>> a.last
=> true
```

## Array slicing
Ngoài việc dùng dấu ngoặc vuông để truy cập các phần tử như ở bên trên, Ruby còn cung cấp một kỹ thuật là array slicing để truy cập cùng lúc nhiều phần tử. Chúng ta có mảng **a** như sau: 
```ruby
>> a = [42, 8, 17, 99]
=> [42, 8, 17, 99]
```
Để cắt một mảng, ta cần truyền vào 2 đối số. Một là index. Hai là số lượng phần từ cần trả về bắt đầu từ index đã truyền vào. Ví dụ, mảng **a** có 4 phần tử, thì **slice(2, 2)** sẽ trả về phần tứ thứ 2 và thư 3 (chú ý, là index bắt đầu của mảng là từ **0**)
```ruby
>> a.slice(2, 2)
=> [17, 99]
```
Một cách khác để làm điều đó là sử dụng kiểu dữ liệu **Range**, nó sẽ trả về các phần từ giữa index đầu và index cuối đã truyền vào.
```ruby
>> a.slice(1..3)
=> [8, 17, 99]
```
Cũng tương tự như các ngôn ngữ khác, Ruby cho phép chúng ta cắt mảng trực tiếp bằng cách sử dụng dấu ngoặc vuông.
```ruby
>> a[2, 2]
=> [17, 99]
>> a[1..3]
=> [8, 17, 99]
```
Cuối cùng, chúng ta có thể dễ dàng chuyển đối một **Range** (phạm vi), thành một mảng, bằng cách sử dụng hàm **to_a** (to array).
```ruby
>> (1..10).to_a
=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
>> ('a'..'z').to_a
=> ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
    "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
```
## More array methods
Ngoài hàm **last**, **length**, hay **slice**, thì Ruby còn hỗ trợ vô số các method khác. Bạn có thể tham khảo thêm ở [documentation](https://ruby-doc.org/core-2.5.0/Array.html) của Ruby.
Tương tự như string, array cũng hỗ trợ method **include?** để kiểm tra phần tử trong array.
```ruby
>> a = [42, 8, 17, 99]
=> [42, 8, 17, 99]
>> a.include?(42)       # Test for element inclusion.
=> true
>> a.include?("foo")
=> false
```
### Sorting and reversing
Trong ruby, chúng ta có thể thực hiện sort một cách đơn giản bằng cách gọi hàm **sort**.
```ruby
>> a.sort
=> [8, 17, 42, 99]
>> a                     # `a` hasn't changed as the result of `sort`.
=> [42, 8, 17, 99]
```
Chúng ta thấy rằng, hàm **sort** đã sắp xếp mảng trên mà không làm thay đổi giá trị của bản thân mảng đó.
Để thay đổi hẳn giá trị của mảng, Ruby hỗ trợ câu lệnh dưới đây:
```ruby
>> a.sort!
=> [8, 17, 42, 99]
>> a                     # `a` has changed as the result of `sort!`.
=> [8, 17, 42, 99]
```
Như ta thấy hàm **sort!** (đọc là "sort-bang"), đã thêm ký tự **!** (bang) sau tên hàm, để thay đổi giá trị của object. Bất kỳ khi nào bạn nhìn thấy kí hiệu đó, thì khả năng lớn là hàm đó sẽ thay đổi hẳn giá trị của object.<br>
Có một phương thức hữu ích khác, mà chúng ta cũng thường xuyên sử dụng đó là **reverse** method.
```ruby
>> a.reverse
=> [99, 42, 17, 8]
>> a                     # Like `sort`, `reverse` doesn't mutate the array.
=> [8, 17, 42, 99]
```
Cũng tương tự như hàm **sort**, hàm **reverse** sẽ trả về một mảng mới, mà không thay đổi giá trị của bản thân mảng đó.
### Pushing and popping
Có một cặp method rất hữu ích mà chúng ta cũng thường xuyên sử dụng đó là **push** và **pop**. **push** cho phép ta nối một phần tử vào cuối mảng, trong khi **pop** sẽ xóa nó.
```ruby
>> a.push(6)                   # Pushing onto an array
=> [8, 17, 42, 99, 6]
>> a.push("foo")
=> [8, 17, 42, 99, 6, "foo"]
>> a.pop                      # `pop` returns the value itself
=> "foo"
>> a.pop
=> 6
>> a.pop
=> 99
>> a
=> [8, 17, 42]
```
Như comment ở trên, **pop** trả về phần tử cuối cùng (và cũng xóa nó khỏi mảng), còn **push** thì chỉ return về mảng kết quả.
```ruby
>> the_answer_to_life_the_universe_and_everything = a.pop
=> 42
```
Cuối cùng, Ruby có hỗ trợ một ký hiệu để thêm phần tử vào mảng đó là "**<<**" (gọi là "shovel operator").
```ruby
>> a << "badger"
=> [8, 17, "badger"]
>> a << "ant" << "bat" << "cat"
=> [8, 17, "badger", "ant", "bat", "cat"]
```
### Undoing a split
Một ví dụ tiếp theo về Array method đó là hàm **join**. Trong khi hàm **split** tách string thành các phần tử của một mảng, thì **join** lại kết nối chúng với nhau thành một string. 
```ruby
>> a = ["ant", "bat", "cat", 42]
=> ["ant", "bat", "cat", 42]
>> a.join                         # Join on default (empty space).
=> "antbatcat42"
>> a.join(", ")                   # Join on comma-space.
=> "ant, bat, cat, 42"
>> a.join(" -- ")                 # Join on double dashes.
=> "ant -- bat -- cat -- 42"
```
Chú ý rằng, phần tử cuối - số **42** sẽ tự động được convert thành string, trong phép **join**.
### Array iteration
Một trong những công việc phổ biến với mảng, là lặp qua từng phần tử trong mảng và thao tác với chúng. 
```ruby
>> for i in 0..a.length do
?>   puts a[i]
>> end
ant
bat
cat
42
```
Dùng hàm **for** có vẻ cũng khá tiện lợi, tuy nhiên đó không phải là cách tốt nhất để lặp qua các phần tử trong mảng. <br> Chúng ta sẽ dùng một phương thức nổi trội của Ruby đó là hàm **each**.
```ruby
>> a.each do |element|
?>   puts element
>> end
ant
bat
cat
42
```
Với hàm **each**, chúng ta có thể nhanh chóng lặp qua từng phần tử trong mảng và thao tác với chúng (như ở ví dụ trên là ta in ra màn hình từng phần tử một) mà không phải viết dài dòng như hàm **for**: “for (i = 0; i < N; i++)”. Qua đó, code của chúng ta sẽ trở nên rõ ràng hơn và dễ đọc hơn.
<br><br><br>

*Hết. Chúng ta sẽ cùng nhau tìm hiểu các chủ đề khác trong Ruby ở các bài viết lần tới nhé.<br>
Nguồn: [Learn-enough](https://www.learnenough.com/)*