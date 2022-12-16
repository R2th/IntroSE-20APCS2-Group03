### 1. String pool là gì ?
* String pool là một vùng nhớ đặc biệt nằm trong vùng nhớ Heap (Heap memory), dùng để lưu trữ các biến được khai báo theo kiểu String.
* String pool giúp tối ưu hoá việc lưu trữ và sử dụng vùng nhớ khi khai báo biến String, giúp hạn chế tình trạng tràn bộ nhớ Java Heap Space.
#### Sơ lược về String.
* String là một immutable class. Vậy immutable class là gì ? Immutable class là là một lớp bất biến, các thuộc tính của nó không bao giờ bị thay đổi và chỉ có thể thiết lập lúc khởi tạo.
* Biến khai báo theo kiểu String khi được tạo ra sẽ được lưu vào String Pool.
* Có 2 cách để khai báo biến kiểu String:

Cách 1:
```
String value = “abc”;
```
Cách 2:
```
String value = new String(“abc”);
```
Hai cách trên có vẻ là giống nhau nhưng thật ra thì không phải vậy.
### 2. String pool và cách thức làm việc.
![](https://images.viblo.asia/f3625ca6-d760-46be-8742-62110da8184a.png)
#### Ở ví dụ trên:
#### Cách 1:
* Khi khai báo bằng cách 1: Java sẽ truy cập vào String Pool,  rồi tìm ở trong Pool ô nhớ nào có cùng giá trị  với nó, nếu tìm thấy thì sẽ tham chiếu đến địa chỉ của ô nhớ đó, còn không thì nó sẽ tạo ô nhớ mới ở trong Pool rồi sẽ thực hiện việc tham chiếu.
* Khai báo biến String s1 = “Cat”, nó sẽ tạo mới trong String Pool một ô nhớ có  giá trị là “Cat”  vì lúc này ở trong Pool chưa có ô nhớ nào giá trị đó.
* Lúc khai báo String s2 = “Cat”; nó tìm thấy trong Pool giá trị một ô nhớ có giá trị là “Cat “, s2 chỉ việc tham chiếu đến địa chỉ của ô nhớ này. Như vậy s2 đã có giá trị là “Cat” nhờ vào việc tham chiếu mà không cần phải tạo 1 ô nhớ khác.
* Vì s1 và s2 cùng tham chiếu đến cùng một địa chỉ ô nhớ vùng nhớ heap nến s1 == s2
#### Cách 2:
* Khi khai báo biến cách 2: Java sẽ không tạo ô nhớ mới ở bộ nhớ String Pool mà sẽ tạo ở Java Heap Space. Và khi đó nó sẽ luôn luôn tạo ô nhớ mới cho dù đã có sẵn những ô nhớ khác có cùng giá trị.
* String s3 = new String(“Cat”),  dòng này sẽ tạo 1 ô nhớ ở Java Heap Space có giá trị là “Cat”, biến s3 này sẽ tham chiếu địa chỉ của ô nhớ đó.
* Và nếu có: String s4 = new String(“Cat”), tương tự dòng này cũng sẽ tạo 1 ô nhớ khác ở Java Heap Space cũng có giá trị là “Cat” (không giống ở trên là sẽ tìm ô nhớ nào có giá trị như vậy rồi tham chiếu đến nhé), biến s4 này sẽ tham chiếu đến địa chỉ của ô nhớ mới.
* Và vì s3 và s4 ko tham chiếu đến cùng địa chỉ ô nhớ  ở vùng nhớ heap nên s3 != s4
### 3. So sánh String
* Có 2 cách so sánh string: sử dụng toán tử **==** và sử dụng phương thức **equals()**.
* Toán tử **==** so sánh sự tham chiếu của đối tượng, sự giống nhau về vùng nhớ. Vì thế, nếu 2 đối tượng string a và b cùng tham chiếu đến một literal trong string pool, hoặc cùng tham chiếu đến một object trong vùng nhớ heap thì a == b sẽ trả về true. Ngược lại, sẽ trả về false
* Phương thức **equals()** được override trong lớp String. Nó kiểm tra giá trị của chuỗi kí tự lưu trữ trong string object. Vì thế, nếu a và b cùng chứa chuỗi kí tự như nhau thì a.equals(b) luôn trả về true, bất kể chúng có tham chiếu tới đâu đi nữa.