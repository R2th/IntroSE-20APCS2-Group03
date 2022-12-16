Ký hiệu Big O – Sử dụng toán học để đo lường hiệu quả thuật toán. Mọi người học cấu trúc dữ liệu và giải thuật hay trong lập trình chắc đều nghe tới khái niệm Big O rồi chứ nhỉ, ví dụ như giải thuật tìm kiếm này mất O(n) đơn vị để thực hiện,….
## Vậy Kí hiệu Big O là gì?
Khái niệm Big O hoặc với tên gọi khác trong tiếng Việt là “độ phức tạp của thuật toán” là thuật ngữ thường dùng để chỉ khoảng thời gian tiêu hao để chạy một thuật toán. Các lập trình viên thường sử dụng Big O như một phương tiện để so sánh mức độ hiệu quả của nhiều cách xử lý khác nhau cho cùng một vấn đề.
Ký hiệu Big O cho phép chúng ta tính toán thời gian chạy tồi tệ nhất của thuật toán hoặc mất bao lâu để thuật toán hoàn thành. Nói cách khác, nó thông báo cho chúng ta về việc nó sẽ chậm lại bao nhiêu dựa trên kích thước đầu vào. Nó luôn luôn tốt để biết một thuật toán chạy nhanh như thế nào bởi vì chúng ta luôn đạt được thời gian nhanh nhất một cách hiệu quả. Hơn nữa, nó là một khái niệm quan trọng cần biết khi thực hiện các cuộc phỏng vấn mã hóa vì nó thực sự cho thấy sự hiểu biết của bạn về giải quyết vấn đề và hiệu quả. Có nhiều thời gian chạy hoặc độ phức tạp thời gian mà Big O bao trùm, nhưng trong phần này, mình sẽ tìm hiểu bao gồm bốn độ phức tạp thời gian chính.
## Bốn độ phức tạp thời gian
![](https://images.viblo.asia/10c7df39-3fcb-4523-938a-5fadc50cd886.png)
Biểu đồ hiển thị 4 độ phức tạp thời gian để hiểu trực quan thời gian chạy
### Thời gian chạy liên tục: “O (1)”
```
arr = [3, 1, 6, 9, 10, 2]
def print_all(arr)
   puts "#{arr[0]}" # prints out 3
   puts "#{arr[1]}" # prints out 1
end
print_all(arr)
```
Thời gian chạy của phương thức này là hằng số hoặc O (1). Lý do là cho dù mảng lớn đến đâu, số lượng thao tác chúng ta thực hiện không bao giờ thay đổi. Nó liên tục. Chúng ta chỉ in ra chỉ mục thứ nhất và thứ hai của mảng mỗi lần.
### Thời gian chạy tuyến tính:  “O (n)”
```
arr = [3, 1, 6, 9, 10, 2]
def print_all(arr)
   arr.each do |num|
      puts "#{num}"
   end
end
print_all(arr)
```
Thời gian chạy của phương thức này là tuyến tính hoặc O (n). Như bạn có thể thấy, chúng ta có một vòng lặp bên trong phương thức lần này lặp lại trên toàn bộ mảng và in ra phần tử. Tuy nhiên, số lượng thao tác mà vòng lặp này thực hiện sẽ thay đổi, vì tùy thuộc vào số lượng phần tử bên trong mảng, vòng lặp sẽ phải thực hiện số lần lặp chính xác dựa trên kích thước đầu vào. Một mảng có kích thước 5 sẽ chỉ mất 5 lần lặp trong khi một mảng có kích thước 10 sẽ mất 10 lần lặp, dài gấp đôi. Vì vậy, khi kích thước đầu vào tăng, thời gian chạy cũng sẽ tăng.
### Thời gian chạy theo cấp số nhân: “O (n²)”
```
def print_all(arr)
   arr.each do |letter1|
      arr.each do |letter2|
         puts "#{letter1}" + "#{letter2}"
      end
   end
end
print_all(["A", "B", "C"]) # prints out 9 pairs
print_all(["A", "B", "C", "D"]) # prints out 16 pairs
```
Thời gian chạy của phương thức này là hàm mũ hoặc O (n²). Trong trường hợp này, chúng ta có một vòng lặp bên trong một vòng lặp. Tùy thuộc vào kích thước của mảng, vòng lặp bên ngoài sẽ thực hiện lần lặp đầu tiên và sau đó vòng lặp bên trong sẽ lặp lại qua mảng **ENTIRE** trước khi quay lại vòng lặp thứ hai của vòng lặp bên ngoài và nó sẽ tiếp tục cho đến khi vòng lặp bên ngoài đạt được sự kết thúc của mảng. Thời gian chạy này rất không hiệu quả. Khi bạn có một mảng lớn, tốt nhất là tránh sử dụng các thuật toán sử dụng thời gian chạy này vì sẽ mất rất nhiều thời gian. Trong phương thức, kích thước mảng 3 sẽ in ra 9 cặp và kích thước mảng 4 sẽ in ra 16 cặp: vòng lặp phải bình phương số lần lặp dựa trên kích thước đầu vào, do đó tại sao nó gọi là thời gian chạy theo hàm mũ. Một cái gì đó với kích thước mảng là 100 sẽ mất 10.000 lần lặp. và không ai muốn điều đó.
### Thời gian chạy logarit: “O (log n)”
Mình sẽ không chỉ ra một phương pháp cho việc này vì nó tốt hơn để giải thích nó. Thời gian chạy logarit là một thời gian chạy cực kỳ hiệu quả. Nếu một mảng có kích thước 4000 phần tử, có thể sẽ chỉ mất 12 thao tác để tìm thấy những gì bạn đang tìm kiếm trái ngược với việc lặp lại trên toàn bộ mảng. Một ví dụ luôn có thời gian chạy logarit là Binary Search (cấu trúc dữ liệu). Tìm kiếm nhị phân hoạt động như thế này: giả sử bạn nói rằng bạn đã đưa ra một mảng được sắp xếp theo thứ tự số hoặc chữ cái. Trong trường hợp này, chúng ta sẽ thực hiện một mảng theo thứ tự số.
```
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
Mục tiêu của chúng ta là tìm một số nhất định trong mảng này, giả sử 9. Chà, dự đoán đầu tiên của bạn có lẽ là tạo một vòng lặp và chỉ bắt đầu từ đầu của mảng để đến đó, nhưng sẽ mất 9 lần lặp để bạn đạt được 9, sẽ chỉ làm cho nó một thời gian chạy tuyến tính. Nếu bạn có một mảng được đặt hàng với 1..1000 và bạn muốn tìm 999, bạn sẽ phải lặp lại theo nghĩa đen 999 lần để có được số. Nhưng tất nhiên, tìm kiếm nhị phân làm cho điều này dễ dàng hơn bằng cách bắt đầu ở giữa mảng. Có hai giá trị trung bình ở đây nhưng chúng ta sẽ chọn 5 và bắt đầu từ đó. Sau đó, chúng ta nhìn vào bên trái và bên phải của 5. Là giá trị 9, mà chúng ta đang tìm kiếm, ở bên trái hoặc bên phải của 5? 9 ở bên phải của 5, vì vậy chúng ta bỏ qua phía bên trái của 5 và bắt đầu ở giữa nửa bên phải của 5.
```
[5, 6, 7, 8, 9, 10]
```
Bây giờ chúng ta tìm kiếm thông qua một phần rút ngắn của mảng. Và chúng ta chỉ lặp lại quá trình tương tự! Hãy nhìn vào giữa của mảng này, chúng ta sẽ chọn 8 cho mảng này. Sau đó, chúng ta nhìn sang bên trái và bên phải của 8. 9 ở bên phải của 8, vì vậy chúng ta hoàn toàn bỏ qua phía bên trái của 8 và bây giờ chúng ta tìm kiếm thông qua một mảng thậm chí còn rút ngắn hơn.
```
[8, 9, 10]
```
Một lần nữa, chúng ta bắt đầu ở giữa mảng, là 9. Nhưng hãy nhìn xem, giữa của mảng bắt đầu bằng 9, giá trị mà chúng ta đang tìm kiếm! Vì vậy, bây giờ chúng ta có thể lấy giá trị đó một cách dễ dàng. Điều này thực sự mất 3 thao tác khi mảng có kích thước đầu vào là 10.
## Kết luận
Biết được thời gian chạy của các thuật toán và cách cải thiện chúng là lý do tại sao Big O Notation tồn tại. Phát triển các thuật toán hiệu quả hơn dẫn đến thời gian chạy nhanh hơn và ít mã hơn (độ phức tạp không gian). (Mình chỉ đi qua khía cạnh phức tạp về thời gian của Big O, nhưng cũng có sự phức tạp về không gian mà mình có thể làm trong một blog tương lai.) Và như mình đã nói trước đây, điều này không bao gồm mọi thứ trong sự phức tạp về thời gian của Big O khi mình chỉ đề cập đến các nguyên tắc cơ bản và phổ biến nhất vì vậy đừng lấy mọi thứ ở đây vì "Đây là về Big O, bây giờ tôi đã sẵn sàng cho các cuộc phỏng vấn về mã hóa"! Chỉ cần chắc chắn để thực hiện một số nghiên cứu về thời gian chạy khác và làm thế nào các thuật toán khác minh họa điều đó.