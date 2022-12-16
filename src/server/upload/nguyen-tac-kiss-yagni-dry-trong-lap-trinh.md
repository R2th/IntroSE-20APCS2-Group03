# Mở đầu

Là một lập trình viên phần mềm, bạn sẽ chấp nhận rằng chúng ta sẽ phải đối mặt với tất cả các thách thức. Từ những dự án đơn giản nhất đến những dự án phức tạp và những giải pháp mà người dùng của chúng ta muốn. Tuy nhiên, thường thì những trường hợp này sẽ đưa chúng ta rơi vào những cách thiết kế phức tạp hơn mức cần thiết. 

![](https://itexico.com/wp-content/uploads/2017/11/Headers-Blogpost-06.jpg)

Trong những năm tôi đã giành rất nhiều thời gian trong thế giới lập trình tuyệt vời này. Tôi đã thấy một vài đoạn code thực sự phức tạp, không làm cho tôi có thể hiểu được ngay. Nói cách khác, Tôi đã thấy đoạn code này chỉ những lập trình viên, người đã viết ra nó mới có thể hiểu được cách mà nó làm việc. Tuy nhiên, khi một người nào đó hỏi những lập trình viên này giải thích về đoạn code này làm gì thì anh ấy hoặc cô ấy chỉ nói: "Chỉ Thánh mới biết được" =)). Đừng hiểu lầm tôi. Tôi biết có những tình huống đôi khi sẽ không có cách nào dễ dàng để giải quyết vấn đề đó, nhưng tại sao lại để nó phức tạp hơn trong khi bạn có thể giải quyết nó dễ dàng hơn?

Đây là lí do mà tôi sẽ muốn nói về một vài nguyên tắc cơ bản (nhưng rất hiệu quả) sẽ giúp cho cuộc sống của bạn dễ dàng hơn. 

## **KISS**

**"Keep It Simple, Stupid"**  -  **KISS** là một thuật ngữ trong lập trình, đặc biệt và thực sự quan trọng. Hãy luôn giữ điều này trong tâm trí cũng như trong nỗ lực của bạn. Code của bạn đơn giản, điều này sẽ dễ bảo trì trong tương lai. Điều này sẽ được đánh giá cao bởi bất kỳ ai khi họ xem đoạn code của bạn trong tương lai.

KISS là một nguyên tắc được đặt ra bởi Kelly Johnson, và nó nói rằng *Hầu hết những hệ thống hoạt động tốt nếu như chúng giữ được sự đơn giản hơn là làm cho chúng trở nên phức tạp,  sự đơn giản nên là mục tiêu chính để thiết kế và sự phức tạp là không cần thiết và nên tránh.*

Lời khuyên của tôi là hãy tuân theo phương pháp phát triển phần mềm KISS và tránh sử dụng những những tính năng mà bạn thích từ ngôn ngữ lập trình bạn đang làm việc. Điều này không có nghĩa là bạn không nên sử dụng những tính năng của chúng, nhưng chỉ sử dụng chúng khi nhận thấy rằng những lợi ích đáng kể cho vấn đề bạn đang giải quyết. Với những tiền đề này trong đầu, tôi sẽ giới thiệu cho ban nguyên tắc tiếp theo.

## **YAGNI**

**You Aren't Gonna Need It** - Đôi khi, là những lập trình viên, chúng ta cố gắng nghĩ cách để tiến về phía trước, về tương lai của dự án, Làm thêm một vài tính năng "*Trong trường hợp chúng ta cần chúng*" hoặc nghĩ rằng "*cuối cùng chúng ta sẽ cần chúng*". Chỉ một từ thôi: **Wrong!** Bạn không cần nó, bạn không cần làm điều này và trong nhiều trường hợp ... "Bạn thực sự không cần".

YAGN là một nguyên tắc đằng sau extreme programming (XP) practice của " *Do the Simplest Thing That Could Possibly Work* ". Ngay cả khi những nguyên tắc này là một phần của XP, Nó được áp dụng trong tất cả các phương pháp và quá trình của nhà phát triển. Bằng cách thực hiện các ý tưởng của "You Aren't Gonna Need It". Bạn sẽ tiết kiệm được thời gian của chính bạn và cũng có thể tiến lên phía trước với những dự án hiệu quả.

Khi bạn cảm thấy lo lắng, khó hiểu để làm thêm vài tính năng mở rộng thì trong lúc này là không cần thiết, nhưng bạn nghĩ rằng chúng sẽ hữu ích trong tương lai, Hãy bình tĩnh và xem lại những công việc đang chờ bạn xử lý ngay lúc này. Bạn không thể lãng phí thời gian để làm những tính năng mà bạn có lẽ cần sửa, thay đổi, xóa vì chúng không phù hợp với nhu cầu của sản phẩm. 

## **DRY**

**"Don't Repeat Yourself"** - Bạn thấy được bao nhiêu lần những đoạn code giống nhau có trong các phần khác nhau của hệ thống? 
Nguyên tắc DRY, được xây dựng bởi Andrew Hunt và David Thomas trong cuốn sách của họ *The Pragmatic Programmer, states*, đã nói rằng "mỗi một phần kiến thức phải độc lập, rõ ràng, có căn cứ đại diện cho một hệ thống. "Nói cách khác bạn phải cố gắng duy trì hành vi của một chức năng trong hệ thống với một đoạn code duy nhất.

Mặt khác, Khi nguyên tắc DRY không được tuân theo, điều này được gọi là những giải pháp WET, viết tắt của từ " *Write Everything Twice* hoặc *We Enjoy Typing*.

DRY trong lập trình thực sự có ích, đặc biệt trong những ứng dụng lớn, nơi mà code được bảo trì liên tục, được thay đổi và mở rộng bởi nhiều lập trình viên khác. Nhưng bạn cũng không nên lạm dụng DRY và thực hiện nó trong tất cả những dự án của bạn. Hãy nhớ 2 nguyên tắc đầu tiên: KISS và YAGNI.

Tham khảo [link](https://www.itexico.com/blog/software-development-kiss-yagni-dry-3-principles-to-simplify-your-life)