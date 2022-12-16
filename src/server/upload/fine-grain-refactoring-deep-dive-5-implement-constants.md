## 1. Issue
Thông thường trong quá trình phát triển phần mềm, một trong những việc gần như luôn phải có đó chính là implement constants để có thể dùng được ở nhiều nơi khác nhau khắp hệ thống đơn cử như đoạn code sau:
```
public interface FieldConst {
	String ID = "_id";
	String NAME = "name";
}
```
Việc implement constants thì sẽ có nhiều cách làm, ở đây chúng ta sẽ không cố gắng để tìm `BEST PRATICE` mà chỉ tìm `GOOD PRACTICE` mà thôi. Và trước khi đến với `GOOD PRACTICE` thì chúng ta phải hiểu tại sao đoạn code trên tại là `BAD PRACTICE`.
Ở dòng đầu tiên định nghĩa một `interface` dành cho việc khai báo constants, việc này có lợi thế là khi khai báo thì code trở nên gọn gàng khi không phải viết `public static final` ở trước data type bởi vì interface không thể khởi tạo instance được. Nghe có vẻ khá ổn, tuy nhiên hãy cùng xem lại định nghĩa thế nào là một interface và nó dùng để giải quyết vấn đề gì:

> An interface in the Java programming language is an abstract type that is used to specify a behavior that classes must implement. [[1]](https://en.wikipedia.org/wiki/Interface_(Java))https://en.wikipedia.org/wiki/Interface_(Java)
>
> Interface trong ngôn ngữ lập trình Java là một kiểu trừu tượng dùng để chỉ định một(?) hành vi mà các class phải thực hiện.

Bạn có thể thấy, đoạn code trên là sự lạm dụng `interface` cho một mục đích sai lệch hoàn toàn với ý nghĩa ban đầu của nó. Mặc dù vẫn hoạt động ổn, nhưng cách thiết kế như vậy là không tốt, nên tránh.

## 2. Solution
Ngoài sử dụng interface chúng ta có hai hướng tiếp cận chính:
1. Standalone enum
2. Standalone class

Vì enum sinh ra để giải quyết bài toán `necessary of a fixed set of constants` nên có thể nói là lựa chọn hàng đầu để implement constants (bạn có thể xem thêm về cách thiết kế enum ở bài trước) tuy nhiên khi truy cập thuộc tính của enum lại hơi rườm rà thông qua getter/setter nên mình sẽ giới thiệu với các bạn cách tiếp cận thứ hai thông qua standalone class.
Trước khi đi vào thiết kế thì chúng ta cùng điểm qua các requirement cần phải đạt trước đã:
1. Class must be read-only (immutable class).
3. Class must be accessible anywhere.
4. Class must not allow extend.

Và cuối cùng chúng ta có một final class với private constructor như sau:
```
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class FieldConst {
	public static final String ID = "_id";
    public static final String NAME = "name";
}
```
## 3. Final thought
Việc implement constants thành standalone class sẽ khiến code của chúng ta không còn thuần hướng đối tượng nữa vì class không có cả instance lẫn method. Chúng ta nên đặt câu hỏi về thứ tự ưu tiên khi khai báo constant trong class hay tách ra riêng thành standalone class.

Cảm ơn mọi người đã đọc bài. Happy coding! 😍😆

#### References:
- https://stackoverflow.com/questions/66066/what-is-the-best-way-to-implement-constants-in-java