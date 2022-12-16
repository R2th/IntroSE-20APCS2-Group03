# Xcode Search: Một số Tip cực hay không phải ai cũng biết

![](https://images.viblo.asia/a103dfc6-a74e-4e49-8fa2-f380dce180ed.png)

Là những lập trình viên, ngoài việc dành phần lớn thời gian để viết code (hiển nhiên là phải thế) thì chúng ta cũng dành phần không nhỏ thời gian để đọc ode. Nếu các bạn đã từng đọc qua cuốn Clean Code thì Robert C. Martin có nói:

*"Indeed, the ratio of time spent reading versus writing is well over 10 to 1. We are constantly reading old code as part of the effort to write new code."*

Khi bắt đầu với một dự án mới, việc phải duyệt qua một số thư viện bên thứ ba mà chúng ta sẽ sử dụng hoặc làm việc với một lượng lớn codebase thì kỹ năng tìm kiếm trở nên cực kỳ quan trọng. Vì vậy hãy cùng tớ tìm hiểu về những hidden gem trong Xcode Search Navigator nhé!

## #1 Patterns

Tìm kiếm trong Xcode thực ra rất đơn giản, chỉ cần nhấn tổ hợp phím Cmd+Shift+F và nhập từ khóa cần tìm. Tuy nhiên, chưa hết đâu, chúng ta đôi khi còn cần sử dụng đến một số tìm kiếm nâng cao. 

Giả sử nếu chúng ta muốn tìm kiếm một chuỗi chứa các URL được kết thúc bằng một biểu thức chính quy chẳng hạn. Đây là một trường hợp khá phổ biến đến nỗi Apple quyết định giúp chúng ta bằng cách giới thiệu tính năng tìm kiếm theo một pattern nào đó.

Để làm điều này, chúng ta nhấn vào biểu tượng kính lúp 🔎với mũi tên mở rộng nằm ngay cạnh nó.

![](https://images.viblo.asia/74fe7662-683c-4ca2-a18d-5c7242bebc46.png)

Một dánh sách các pattern sẽ được hiển thị:

![](https://images.viblo.asia/83711c1c-957c-4123-b725-e835ebe0719f.png)

Nhấn chọn vào một pattern URL chẳng hạn và bạn sẽ thấy danh sách các kết quả tìm kiếm có chứa URL được hiển thị:

![](https://images.viblo.asia/fa311dbb-92bb-45cd-8d9e-32f79ba96a9f.png)

## #2 Definitions

Xcode cũng cung cấp cho chúng ta các tùy chọn tìm kiếm dựa trên sự hiểu biết nhất định của nó về project. Tin mình đi, hắn hiểu những gì bạn viết đấy! Giả sử chúng ta đang muốn tìm nơi định nghĩa tất cả các singleton nằm đâu đó trong project thì sao? Thông thường các singleton sẽ được định nghĩa theo tên có cấu trúc `shared+xxx`

Nếu chúng ta đơn giản chỉ là gõ vào ô tìm kiếm chữ "shared" thì sẽ cho ra rất nhiều kết quả, và phần lớn trong số chúng không phải cái mà ta mong muốn:

![](https://images.viblo.asia/76e94930-c315-4d22-88a8-2433f9a120d4.png)

Để thu hẹp kết quả nhận được, chúng ta nhấn vào *Text* (nhìn thì có vẻ như không thể nhấn được mà hóa ra lại nhấn được không trượt phát nào!) và chọn *Definitions*

![](https://images.viblo.asia/4b22f884-5007-4910-b608-59da882ac0c2.png)

Và tận hưởng kết quả tìm kiếm như ý thôi!

![](https://images.viblo.asia/738bd794-a119-4fc0-b200-bb5659896201.png)

Với bộ lọc các *Definitions*, chúng ta cũng có thể tìm kiếm theo tên Class, Struct, Enums, Enum case và nhiều hơn thế nữa.

## #3 Search Scopes (Phạm vi tìm kiếm)

Thông thường chúng ta chỉ cần chọn một project, hoặc một group cần tìm kiếm trong đó là đủ:

![](https://images.viblo.asia/ad9c7246-69d2-4879-be59-815f3ec990ac.png)

Nhưng hãy tưởng tượng rằng chúng ta đang phải làm việc trong một project với hỗn hợp các loại code Swift, Objective-C. Và ta chỉ muốn tìm kiếm cái gì đó bên trong các đoạn code Swift thì sai?

Vậy thì có một cách dễ dàng để làm được điều ấy, đó là sử dụng Search Scopes. Nhấn vào nút New Scope... và tiến hành giới hạn kết quả tìm kiếm bằng cách lọc theo *Location, Name, Path, Path Extension* và *Type*.

Với tìm kiếm theo giả thuyết ban đầu tôi đưa ra chúng ta có thể sử dụng *Path Extention* như sau

![](https://images.viblo.asia/9dcf877d-f954-4ee5-8fdb-08741b226a08.png)


## #4 Call Hierarchy

Tính năng này được thêm vào từ Xcode 7 trở đi, giúp chúng ta có thể có được một cái nhìn tổng quát về cách sử dụng một phương thức và cách hoặt của nó. Mình không sử dụng tính năng này thường xuyên cho lắm, nhưng có vẻ như nó khá là hay ho và hữu ích đấy!

![](https://images.viblo.asia/128c93dc-1ed7-4579-88fa-9277ae69e2ee.png)

## Khi nào thì không cần sử dụng các tính năng Tìm kiếm nêu trên?

Như đã thấy thì Search Navigator của Xcode khá là tuyệt vời, tuy nhiên không phải nó lúc nào cũng là một giải pháp tốt nhất để tìm thấy những gì chúng ta cần tìm.

Ví dụ như khi chúng ta đang chỉ sẵn con trỏ chuột vào một từ thuộc tính, hoặc function nào đó, thì tốt hơn hết là nhấn giữ Cmd+Right click hoặc nhấn tổ hợp phím Cmd+Control+J để di chuyển đến định nghĩa của đối tượng thay vì sử dụng khung Search.

Hoặc khi chúng ta muốn kiểm tra xem một phương thức được gọi ở những đâu chúng ta chỉ cần đặt con trỏ chuộc vào phương thức đó và nhấn tổ họp phím Cmd+1 và chọn Callers để xem mà không cần phải sử dụng khung Search.

![](https://images.viblo.asia/b37b466e-76bf-45da-8bb1-e84543b493e1.png)

# Tổng kết

Vậy là chúng ta vừa tìm hiểu vể một số tính năng Tìm kiếm nâng cao trong Xcode. Khả năng tìm kiếm của Xcode ngày một mạnh mẽ qua từng năm tháng, nó giúp chúng ta tìm kiểu và đọc hiểu code của người khác và thậm chí là của chính chúng ta.

Nhưng cũng như tất cả các công cụ khác (hoặc bất cứ điều gì trong cuộc sống), nó luôn đi kèm với một số sự đánh đổi. Chúng ta cần phải nhớ để sử dụng chúng sao cho hiệu quả nhất trong công việc!

Chúc các bạn có những ngày vui vẻ!