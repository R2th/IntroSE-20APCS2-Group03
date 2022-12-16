Hôm nay chúng ta sẽ tìm hiểu về inject method trong ruby. Bất cứ ai đã tìm hiểu đủ lâu về coding. Bạn đã biết các ngôn ngữ  có nhiều method tuyệt vời, đôi khi khó hiểu. Gần đây tôi có gặp một method khá thú vị trong ruby, đó là inject method. Phương thức inject hoạt động như reduce method. inject có thể lấy một phạm vi hoặc mảng các con số, và có thể nhận một block. Khi được gọi, inject sẽ truyền từng phần tử một và tích lũy từng phần một.
```
[3, 6, 10, 13].inject(:+) => (((3 + 6) + 10) + 13) => 32
```
or 
```
[3, 6, 10].inject {|sum, number| sum + number} =>|3, 6| 3 + 6 => 9
                                               =>|9, 10| 9 + 10 =>19
```
Inject lấy phần tử đầu tiên trong collection và sử dụng phần đó làm cơ sở. Sau đó lấy phần tử tiếp theo và thêm chúng lại với nhau, gán kết quả cho sum và thêm phần tử tiếp theo trong collection cho đến khi  các phần tử được chuyển hết qua block. Sum mà chúng ta gọi là bộ tích lũy vì nó đang tích lũy các giá trị. Giá trị trả về sẽ tổng các phần tử trong collection.
Bạn có thể truyền cho một giá trị mặc định:
```
[3, 6, 10, 13].inject(0, :+) => 32
[3, 6, 10].inject(0) {|sum, number| sum + number} => 19
```
Như bạn có thể thấy ở đây phương thức bắt đầu với giá trị là 0. Sau đó phương thức sẽ thêm phần tử đầu tiên về 0 trước khi đến phần tử thứ hai và thứ ba trong collection.
## Building Hashes
Inject có thể mạnh mẽ hơn ngoài viêc thêm các giá trị với nhau. Inject có thể trả về một hash nếu bạn muốn.
```
[[:student, "Terrance Koar"], [:course, "Web Dev"]].inject({}) do |result, element| 
    result[element.first] = element.last 
    result
end
#=> {:student=>"Terrance Koar", :course=>"Web Dev"}
```
Như bạn thấy chúng ta bắt đầu với một mảng, chúng ta muốn trả về kết quả là một hash thì ta truyền vào inject một hash rỗng. result tương đương với hash empty. truyền qua từng phần tử của mảng lấy phần tử đầu tiên làm key,  phần tử cuối làm value, tiếp theo truyền các phần tử tiếp theo cuối cùng ta có được một một kết quả hash mà ta mong muốn.
Inject cũng có thể lọc và xây dựng một mảng mới.
```
[10, 20, 30, 5, 7, 9, 3].inject([]) do |result, element| 
     result << element.to_s if element > 9
     result
end
# => ["10", "20", "30"]
```
Inject sẽ hữu ích khi bạn lặp qua collection để xây dựng một object mới, như ở trên đó là hash, array hoặc có thể là tổng của collection. Cảm ơn bạn đã đọc hy vọng có thể giúp bạn hiểu hơn về inject method trong ruby.
Happy codding!