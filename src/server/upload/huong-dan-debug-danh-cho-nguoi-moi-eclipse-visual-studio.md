**Hướng dẫn debug dành cho các bạn chưa biết gì ^^**
## 1. Overview
Hôm nay mình sẽ hướng dẫn cho các bạn cách debug một cách cơ bản nhất nhé. Debugging là 1 kĩ năng rất quan trọng trong lập trình, tuy nhiên ở lúc mới lập trình thì các bạn cũng không quan tâm lắm về việc này. Vì thế khi gặp bug hay exception, ... điều tra xem lỗi xảy ra ở đâu rất mất thời gian mà chưa chắc đã tìm được chỗ được mà fix nữa nên dù là dev junior hay senior đều phải nắm được kĩ năng thượng thừa này :)
## 2. Basic concepts
Ở đây mình có 1 ví dụ về bài toán tính xem ai bị nghiện game nếu họ chơi ít nhất 8h 1 ngày hoặc chơi liên tiếp 5h / 1 ngày trở lên.
![](https://images.viblo.asia/2f2116ed-21e1-4ce3-a675-6f02d2741fcc.png)
### 2.1.1. Debug Mode (Eclipse)
Eclipse được tích hợp sẵn debug và nó cực mạnh và dễ dùng nhé. 
Ở đây các bạn chuột phải vào project hoặc class nơi chưa hàm main đều được -> rồi chọn debug nhé. Vì mình chỉ đang chạy ở class chưa hàm main nên chọn **'Java Application'** còn nếu như java web thì chọn **'Spring Boot App'**, ... tùy thuộc vào chương trình của các bạn nhé. Mình chỉ dạy cho các bạn các thao tác cơ bản, còn ứng dụng vào bài của các bạn thì phải linh hoạt lên nhé :)
![](https://images.viblo.asia/488e498b-b1bd-47c7-a121-f41907ed5757.png)
### 2.1.2. Breakpoints (Eclipse)
Chúng ta cần xác định các điểm mà tại đó việc thực hiện chương trình sẽ tạm dừng để điều tra. Chúng được gọi là breakpoints (điểm dừng, tức là chương trình sẽ dừng tại đó để điều tra đó) và được áp dụng cho các methods. Chúng cũng có thể được xác định bất cứ lúc nào trước hoặc trong khi execution.
Cơ bản thì có 3 cách để thêm breakpoint vào chương trình:
- Chuột phải vào marker bar, chọn Toggle Breakpoint
- Ấn vào dòng bạn muốn debug, ấn ctrl + shift + b
- Nhấp chuột 2 lần vào marker bar ở dòng bạn muốn debug
![](https://images.viblo.asia/fc7a102f-c428-4143-8841-77e73776382a.png)
### 2.1.3. Code-Flow Controls (Eclipse)
Giờ cùng thử thao tác để xem debug giúp tao làm những gì nào :)
![](https://images.viblo.asia/0b6aaccc-6890-4455-b999-5c554f51cf8d.png)
Các debug options được sử dụng phổ biến nhất:
- Step Into (F5) - Thao tác này đi vào bên trong các phương thức được sử dụng trong dòng hiện tại (nếu có); còn không thì  nó nhảy tới dòng tiếp theo. Trong ví dụ này, nó sẽ debug vào bên trong phương thức gamePlay ().
![](https://images.viblo.asia/261bf349-8fa8-44be-960a-6277e96e81fe.png)
- Step Over (F6) - Thao tác này xử lý dòng hiện tại và chuyển sang dòng tiếp theo. Trong ví dụ này, điều này sẽ thực thi phương thức gamePlay() và tiến hành dòng tiếp theo.
Thường thì ta hay sử dụng cái này vì nếu là mình, mình sẽ đặt luôn breakpoint trong hàm luôn nên lúc debug nó sẽ chạy vào trong hàm luôn, lúc nào ấn F6 để nó chạy từng dòng một để mình điều tra từng dòng.
- Step Return (F7) - Thao tác này kết thúc phương thức hiện tại và đưa chúng ta trở lại phương thức gọi. Trong trường hợp này, nếu có một breakpoint ở dòng 30 tức là đang set breakpoint ở bên trong method gamePlay() thì khi ấn F7 nó sẽ nhảy tới dòng 18, nơi method gamePlay() được gọi trong hàm Main().
- Resume (F8) - Thao tác này sẽ chạy như bình thường mà không ngừng đến khi chương trình kết thúc trừ khi nếu mình đặt bất kì breakpoint ở các xử lí tiếp theo.
## 3. Techniques
Thường thì ta sẽ dùng debug để check xem giá trị biến hay giá trị ở dòng đó là gì, có như ta mong muốn hay không? Cũng có thể, t sử dụng debug để tìm hiểu xem luồng hay nghiệp vụ của chương trình chạy ra sao?
- Khi debug chạy tới dòng nào thì các bạn có thể ấn vào luôn hàm hay biến đó tùy thuộc, rồi xem giá trị của nó
- Ngoài ra có thể vào variables view tab để xem giá trị của các biến mỗi khi debug chạy tới như ví dụ sau:
![](https://images.viblo.asia/13790a56-02f0-4aa3-a8d5-919283ad8790.png)

Cám ơn các bạn đã đọc, phần tiếp theo mình sẽ làm về Visual Studio, nếu có sai sót gì thì các bạn comment cho mình biết nhé.