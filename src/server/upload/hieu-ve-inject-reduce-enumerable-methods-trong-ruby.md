Enumerable methods có thể được hiểu như là các methods có đi qua, tìm kiếm, sắp xếp thông qua một mảng hoặc một hash nhất định. `#inject` và `#reduce` enumerable methods được định nghĩa trong tài liệu chính thức của Ruby như cùng một methods. Cả hai đều có cùng chức năng và có hiệu suất như nhau vì vậy mình sẽ đề cập đến chúng thay thế cho nhau trong suốt bài viết này.

Để bắt đầu, phương thức này cần một mảng và hai đối số khi được định nghĩa. Điều này có thể được hình dung như sau:
```
[1, 2, 3, 4, 5].inject { |memo, value|  
   #more lines of code here
}
[1, 2, 3, 4, 5].reduce { |memo, value|  
   #more lines of code here
}
```
Biến `memo` này rất cần thiết vì nó lưu trữ dữ liệu nào bạn muốn phương thức này ghi nhớ trong khi nó đi ngang qua mảng,  nó có thể được đặt tên bất cứ thứ gì bạn muốn vì nó chỉ là một biến.

Tôi sẽ đề cập đến biến `memo` trong suốt lời giải thích này.

`memo` có thể được cung cấp một giá trị bắt đầu nhưng nó không bắt buộc phải có. Nếu một giá trị bắt đầu không được xác định thì `memo` lấy giá trị đầu tiên của mảng.
```
### The starting value for memo is 5
[1, 2, 3, 4, 5].inject(5) { |memo, value|  
   #more lines of code here
}
### The starting value for memo is 1 (first value of the array)
[1, 2, 3, 4, 5].reduce { |memo, value|  
   #more lines of code here
}
```
`#inject / #reduce` sẽ luôn trả về một đối tượng dữ liệu duy nhất - dữ liệu mà `memo` giữ ở cuối cùng. Điều đó đang được nói, `memo` được thay đổi và trả lại khi nó được lặp lại nếu không nó sẽ giữ nguyên giá trị.

Bây giờ chúng ta đã hiểu được ngữ nghĩa, mình sẽ chạy qua một số ví dụ để thấy `#inject / #reduce` hữu ích.

**Ví dụ 1: Dùng #inject / #reduce để áp dụng numeric operation**

Cách phổ biến nhất để sử dụng phương pháp này là khi được cung cấp một mảng các số nguyên và bạn áp dụng một phép toán số trên toàn bộ mảng. Trong ví dụ này, tôi sẽ trình bày cách tìm tổng của toàn bộ một mảng.

`#inject / #reduce` sẽ được minh họa như sau:

```
[1, 2, 3, 4, 5].reduce { |memo, value|
    memo += value
} 
## The following is to illustrate how this method was traversed
~> 1 += 2    #memo returns 3
~> 3 += 3    #memo returns 6
~> 6 += 4    #memo returns 10
~> 10 += 5   #memo returns 15
#=> 15
```

**Ví dụ 2: Dùng #inject / #reduce để tìm chuỗi dài nhất**

Trong ví dụ này, giả sử bạn được cung cấp một mảng các chuỗi và bạn phải tìm chuỗi dài nhất trong mảng đó.

`#inject / #reduce` sẽ được minh họa như sau:

```
sentences = ["The ice cream truck is rolling on by", "There is a dog in the park", "There are jumping lizards on the fountain", "Why is there no rain today? I brought an umbrella for nothing.", "There is a dog park nearby!"]
sentences.inject{ |memo, sentence| 
    if memo.size < sentence.size
        memo = sentence
    else
        memo
     end
}
#=> "There are jumping lizards on the fountain"
```

Trong trường hợp này chúng ta không nên khởi tạo biến `memo` với một giá trị, nó sẽ lấy đối tượng đầu tiên trong mảng, `sentences[0]` trong ví dụ này. Trong method của chúng ta, chúng ta có một câu lệnh if để so sánh độ dài `memo` của chúng ta với mỗi độ dài của `sentence`.

Câu lệnh `if` là nơi phép màu xảy ra: nếu `sentence` dài hơn cái được lưu trữ trong `memo` thì sẽ gán `sentence` cho `memo`, ngược chỉ trả về cùng một giá trị

Theo cách này giá trị của `memo` sẽ liên tục cập nhật với giá trị `sentence` lớn hơn và `#inject / #reduce` sẽ trả về giá trị của biến `memo` cuối cùng.

Nếu bạn muốn xem từng bước minh họa. Bạn có thể chạy nó trong [Repl.it](https://repl.it/languages/Ruby)
để xem.

```
sentences = ["The ice cream truck is rolling on by", "There is a dog in the park", "There are jumping lizards on the fountain", "Why is there no rain today? I brought an umbrella for nothing.", "There is a dog park nearby!"]
sentences.inject { |memo, sentence|
    puts "Memo length is: #{memo.length}\nSentence length is: #{sentence.length}"
    if memo.length < sentence.length
        puts "Our sentence is longer"
        memo = sentence
    else
        puts "Our memo is longer"
        memo
    end
    puts "Our memo is: #{memo}\n \n"
    memo
}
```

**Ví dụ 3: Dùng #inject / #reduce để tìm số lặp lại nhiều nhất trong một mảng**

Bây giờ chúng ta đã thực hành sử dụng methods này theo nhiều cách khác nhau, hãy để mình làm một ví dụ tương tự. Giả sử bạn được cung cấp một dãy số ngẫu nhiên và bạn muốn tìm số nào lặp lại nhiều hơn.

Trong trường hợp này bạn dùng `#inject / #reduce` như sau:

```
numbers = [1, 4, 2, 4, 1, 2, 5, 5, 2, 2, 1, 5, 5, 2, 3, 5, 5, 1]
numbers.reduce { |memo, number|
     if numbers.count(memo) <= numbers.count(number)
        memo = number
    else
        memo
    end
}
```
Logic này tương tự như những gì chúng ta đã làm trong ví dụ 2, sự khác biệt duy nhất là trong câu lệnh `if` của chúng ta. Chúng tôi sử dụng `#count` trên mảng ban đầu của chúng ta để tìm và lưu trữ giá trị nào có số lượng lớn hơn hoặc bằng. Bằng cách này, chúng ta chỉ được trả về số có số đếm lớn nhất cuối cùng.


![](https://images.viblo.asia/ade3a860-cda3-4f78-aecc-ecd28051f874.gif)

Bây giờ bạn đã hiểu rõ hơn về cách `#inject / #reduce` hoạt động. Go forth and keep learning and coding, one method at a time