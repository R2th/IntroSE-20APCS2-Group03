### 1. break
* Trong bài học về [switch - case](https://viblo.asia/p/cau-truc-dieu-khien-if-else-switch-case-trong-java-aWj53moeZ6m), các bạn đã được làm quen với từ khóa break.
* Ngoài dùng trong cấu trúc switch, từ khóa break được dùng để thoát ra khỏi vòng lặp chứa nó ngay lập tức và chuyển sang câu lệnh tiếp theo bên ngoài vòng lặp vừa kết thúc (tức là chương trình sẽ ngừng ngay mọi vòng lặp nếu bên trong vòng lặp đó có chứa từ khóa break).
* Thông thường, từ khóa break thường được dùng với một lệnh if bên trong vòng lặp để kiểm tra điều kiện dừng của vòng lặp.

![image.png](https://images.viblo.asia/839c4aaf-70ee-4b27-8efc-893434f09787.png)

* Trong ví dụ trên chương trình sẽ lặp mãi cho đến khi người dùng nhập 0;

### 2. continue
* Ngoài break, Java còn hỗ trợ cho chúng ta một từ khóa đặc biệt khác cũng được dùng kết hợp với cấu trúc lặp đó là từ khóa continue.
* Khi gặp từ khóa continue thì lần lặp kế tiếp sẽ được thực hiện (tức là bỏ qua không thực hiện các lệnh phía bên dưới từ khóa continue của vòng lặp và quay lên kiểm tra trở lại biểu thức điều kiện lặp).
* Tương tự như break, từ khóa continue cũng thường được dùng với một lệnh if bên trong vòng lặp để kiểm tra khi nào thì cần bỏ qua những lệnh sau nó để tiếp tục thực hiện vòng lặp mới.

![image.png](https://images.viblo.asia/ab379652-7d43-41a4-b371-ff749c313fd6.png)

* Trong ví dụ trên, khi người dùng nhập 1 thì sẽ thực hiện lệnh `continue` : lúc này sẽ bỏ qua các lệnh còn lại của vòng lặp hiện tại để chuyển qua vòng lặp kế tiếp.
* Lưu ý: Nếu có nhiều cấu trúc lặp lồng nhau thì continue chỉ có tác dụng với cấu trúc lặp trong cùng chứa nó.

### 3. Lưu ý
* Một trong những điểm quan trọng khi viết chương trình có sử dụng các cấu trúc lặp do - while, while và for đó là điều kiện dừng của vòng lặp. Nếu không có những điều kiện dừng này thì vòng lặp sẽ rơi vào trạng thái lặp vô hạn và vì vậy chương trình sử dụng vòng lặp đó sẽ không bao giờ dừng lại.
* Để vòng lặp trong chương trình không rơi vào trạng thái lặp vô hạn thì trong quá trình viết chương trình các bạn cần phải chú ý những điều sau:
    * Có ít nhất một lần mà các lệnh trong thân vòng lặp làm cho biểu thức điều kiện lặp bị sai.
    * Trong thân vòng lặp phải tồn tại từ khóa break gắn liền với biểu thức điều kiện if.