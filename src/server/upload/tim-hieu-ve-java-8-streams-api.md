## Khái niệm
Có lẽ đối với Java 8 Stream API đã qus quen thuộc với những lập trình viên Java rồi. Bài viết này, sẽ là cách nhìn của tôi về Streams API.
Stream là một abstract layer mới được giới thiệu trong Java 8. Sử dụng Streams, bạn có thể xử lý dữ liệu theo cách khai báo giống như các câu lệnh SQL.
**Stream** dịch sang tiếng việt nghĩa là **Suối**. Vì thế khi sử dụng **stream()**, ta như chuyển hóa List thành 1 dòng suối chảy theo một luồng xác định nào đó. Luồng xác định này sẽ được lọc (filter), biến đổi (map), .... sau đó phải được thu lại (collect) để lấy kết quả.
## Methods in Streams
Sau khi chuyển hóa một List thành Stream, dòng chảy sẽ được đưa vào các method. Các method này sẽ được viết bằng 2 cách:
* Method chỉ có 1 câu lệnh: 
```
parameter -> 1 câu lệnh
VD:  lists.stream().filter(x -> x.checked())
```
* Method với nhiều hơn 1 câu lệnh:
```
parameter -> {
    // Câu lệnh 1
    // Câu lệnh 2
    ....
}
```
Sau khi dòng chảy, chảy vào các method xác định để biến đổi theo ý ta muốn, ta phải thu lại dòng chảy đó theo tính chất mà ta muốn (dạng đá, dạng lỏng,... ) bằng cách collect chúng lại theo kiểu list, optional,.... 
```
lists.stream().filter(x -> x.checked()).collect(Collectors.toList());
lists.stream().filter(x -> x.checked()).collect(Collectors.groupingBy(Employee::getEmployeeId));
```
Phần Collection, tôi sẽ nói ở phần tiếp theo. Còn sau đây tôi sẽ liệt kê và giải thích một số methods mà ta thường sử dụng.
### forEach
'foreach' dùng để duyệt hết các phần thử của List. Ta sử dụng tương tự như vòng for:
```
for (Student student : studentList ){
    system.out.print(student.name)
}
// Sử dụng foreach streams api
list.forEach(x-> system.out.print(x.name));
```
Giả sử,  ta muốn sử dụng nhiều câu lệnh hơn trong vòng foreach. Ta sẽ viết như sau:
```
list.forEach(x-> {
    system.out.print(x.name);
    system.out.print(x.age)
});
```

### map 
'map' dùng để biến đổi mỗi phần tử của list sang một kết quả tương ứng. Ví dụ ta có một list các số nguyên, và muốn nhận lại kết quả là list bình phương các số nguyên đó.
```
List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);

//get list of unique squares
List<Integer> squaresList = numbers.stream().map( i -> i*i).distinct().collect(Collectors.toList());
```
### filter
'filter' được dùng để lọc ra các kết quả theo một điều kiện xác định nào đó. Ví dụ ta có một list các số nguyên và muốn lọc ra một list các số chẵn. 
```
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9);
List<Integer> evenNumberList = numbers.stream().filter( x -> x%2 == 0).collect(Collectors.toList());
```
### Kết hợp nhiều methods
Khi ta muốn kết hợp nhiều method trong 1 streams, ta chỉ cần nối chúng lại với nhau, tạo thành 1 dòng chảy tuần tự, rồi collect chúng vào theo dạng mà chúng ta muốn. Ở bài này, chúng ta chỉ sử dụng Collectors.toList() là collect chúng về dạng list thông thường.
Giả sử, ta có một list các số nguyên, ta muốn lọc lấy các số chẵn và trả về một list các bình phương của các số chẵn đó. Ở đây ta sẽ sử dụng method 'filter' để lọc ra các số chẵn của list, sau đó dùng method 'map' để biến đổi chúng thành bình phương của chính nó.
```
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9);
List<Integer> quareEvenNumberList = numbers.stream().filter( x -> x%2 == 0).map( i -> i*i).collect(Collectors.toList());
```
Đây là một bài chia sẻ cơ bản của tôi về Java 8 Streams API. Hi vọng sẽ giúp bạn hình dung về Streams API một cách đơn giản hơn và cảm thấy thích thú khi làm việc với nó.
## Tài liệu tham khảo
https://www.tutorialspoint.com/java8/java8_streams.htm