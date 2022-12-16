# Lời mở đầu

Mảng (Array data structure hay đơn giản là array) - kiểu dữ liệu cơ bản nhất của mọi ngôn ngữ. Mặc dù nó rất là cơ bản nhưng bạn đã hiểu bao nhiêu về mảng? những xử lý như truy cập đến phần tử thứ i hay thêm một phần tử hoạt động như thế nào và có độ phức tạp bao nhiêu? 

Hãy cùng mình tìm hiểu nhé.

# Mảng là gì?
Rất đơn giản ai cũng có thể trả lời được như thế này

> Mảng là tập hợp các phần tử, các phần tử được xác định bởi một chỉ mục (index)


Nhưng như vậy đã đủ chưa? Còn gì cần phải đề cập nào? Liệu bạn có biết hết những điều sau đây khi định nghĩa về mảng

* các phần tử có cùng một kiểu dữ liệu. Kiểu dữ liệu của các phần tử có thể là kiểu mảng nên chúng ta có thể có thêm các khái niệm về mảng một chiều và mảng đa chiều
* mảng có kích thước cố định
* các phần tử được lưu trong các ô nhớ liên tiếp nhau hoặc lưu theo cách có thể tính được vị trí của các phần tử bằng một biểu thức toán học

OK vậy cũng là đã đủ về khái niệm của mảng. Nếu còn thêm gì bạn có thể comment cho mình biết nhé.


Và khi nhắc tới mảng thì không thể nào không nói đến mảng động. Hầu hết chúng ta đều thích sử dụng mảng động trong code của mình hơn và mảng với số phần tử xác định. Vậy thế nào là mảng động (dynamic array)? Và nó có khác gì khái niệm ở trên?

> Mảng động là mảng có kích thước thay đổi bằng cách cho phép thêm hoặc xóa phần tử


Một khái niệm ngắn gọn nhưng đầy đủ khi nói về mảng động. Nói thể hiện rõ sự khác biệt so với mảng chính là kích thước của nó có thể thay đổi được. Khi làm việc với mảng, ta không thể thêm hay xóa phần tử trong mảng (chỉ được phép thay đổi giá trị), còn với mảng động thì có thể. Nhắc tới làm việc với mảng, thì có 2 vấn đề chính ở mặt cấu trúc dữ liệu cần phải nắm đó chính là kích thước của mảng và chỉ mục của các phần tử. (bài viết này tập trung về cấu trúc dữ liệu chứ không phải thuật toán he)

# Kích thước mảng

Kích thước của mảng cố định phần tử thì đơn giản rồi, thể hiện ngay trong định nghĩa, là một con số cụ thể. Thế nhưng kích thước của mảng động thì sao. Liệu bạn có trả lời được các vấn đề sau:

> Mảng động cũng là mảng. Mà mảng thì có kích thước cố định. Vậy mảng động có kích thước cố định?
> 
> * Nếu kích thước cố định vậy nó thay đổi kích thước như thế nào?
> * Nếu kích thước không cố định thì xác định kích thước như thế nào?


Không dễ trả lời phải không. Mình cũng đã từng gục ngã trước câu hỏi này và nhận ra mình chẳng biết gì về nó cả. Cứ dùng và chẳng nghĩ suy thì cứ mãi là newbie.  Thực ra thì đây là một cái bẫy trong cách logic của chúng ta. Các bạn nên hiểu đây là hai khái niệm khác biệt:
* Kích thước cố định tức là trong một thời điểm thì kích thước của mảng luôn là một con số có thể xác định được.
* Có thể thay đổi kích thước nghĩa là nó không có một kích thước nhất định ở mọi thời điểm. Đây mới là điều tạo nên sự khác biệt của mảng động.


Và để tìm hiểu sâu hơn về mảng động, chúng ta cần trả lời 2 câu hỏi
> * Mảng động thay đổi kích thước như thế nào?
> * Làm sao mảng động lại xác định được kích thước của nó?


Đây là 2 câu hỏi cơ bản để nắm được cấu trúc của một mảng động. Tuy có sự khác nhau giữa một số ngôn ngữ lập trình, nhưng nhìn chung cơ chế thay đổi kích thước của một mảng động như sau:
* Đầu tiên mảng động sẽ được cấp dựa trên một mảng có kích thước cố định.  Điều này giải thích cho việc bạn gặp phải index error khi thao tác trên mảng động.
* Khi cần có thêm một phần tử mới. Thì lúc này hệ thống sẽ cấp phát một mảng cố định mới với kích thước lớn hơn, copy các phần tử hiện có vào mảng mới và sau đó thêm phần tử mới vào.

Đây là xử lý thông thường để tăng kích thước mảng. Tuy nhiên nhược điểm của nó chính là tốn kém tài nguyên cho việc cấp phát một mảng mới và sao chép các phần tử ban đầu. Một giải pháp chính là tạo ra mảng có kích thước lớn hơn số lượng phần tử hiện tại. Việc thêm hay xóa phần tử sẽ không ảnh hưởng đến kích thước của mảng hiện tại. Chỉ khi tất cả ô nhớ được cấp phát thì lúc này hệ thống mới tạo ra mảng mới và thực hiện copy các phần tử. Điều này giúp tăng hiệu suất của hệ thống và giảm bớt độ phức tạp khi thêm hoặc xóa phần tử. Tuy nhiên vì để xác định được kích thước của mảng cho trường hợp này thì có 2 khái niệm cần phải nắm:
- logical size hay array size: thể hiện số lượng phần tử thực tế có trong mảng
- physical size hay capacity: đây là kích thước vật lý của mảng được cấp pháp trong hệ thống. 

![](https://images.viblo.asia/c60e3d3c-da64-49c5-98ce-94c4ead1e03b.png)

Một hình ảnh giải thích rõ hơn về cấu trúc của mảng động. Các ô trống nét đứt thể hiện cho vùng nhớ được sử dụng để thêm phần tử. Nếu như chỉ cần sử dụng các ô nhớ này, việc thêm phần tử sẽ diễn ra rất nhanh và độ phức tạp chỉ là O(1). Tuy nhiên nếu cần phải cấp phát lại bộ nhớ (trường hợp được đánh dấu rùa xanh) thì độ phức tạp lúc này lại là O(n) vì cần phải thao tác sao chép lại n phần tử. Nếu phải đưa ra con số chính xác về độ phức tạp khi thêm hay xóa phần tử trong mảng động ở trường hợp này thì O(1) vẫn là lựa chọn hợp lý.


Bên cạnh đó, chính nhớ logical size, chúng ta mới có thể xác định được kích thước của mảng tại mọi thời điểm. Và tất nhiên độ phức tạp khi xác định kích thước của nó là O(1), chỉ cần lấy giá trị của logic size.

Lưu ý:
* Một số cấc trúc mảng động khác lại không theo cơ chế này. Chẳng hạn như danh sách liên kết. Danh sách liên kết là một cấu trúc mảng động đặc biệt, các phần tử được liên kết tuyết tính, thứ tự không được xác định bởi vị trí vật lý của chúng trong bộ nhớ. Đối với danh sách liên kết, việc thêm phần từ hoặc xóa phần tử khá là đơn giản nếu phần tử cuối cùng được xác định (độ phức tạp O(1)). Tuy nhiên nếu không xác định được phần tử cuối cùng thì nó là O(n). Mặc khác, danh sách liên kết vẫn là mảng cố định phần tử, số phần tử trong một thời điểm là một con số cụ thể. Tuy nhiên để xác định được số lượng phần tử chúng ta bắt buộc phải duyệt qua tất cả phần tử và độ phức tạp của nó chắc chắn là O(n).
* Độ phức tạp khi thêm vào giữa mảng động khác với độ phức tạp khi thêm vào cuối mảng

# Indexing - chỉ mục trong mảng

Như các bạn đã biết thì khi làm việc với mảng, chúng ta có thể truy cập trực tiếp tới phần tử nào đó thông qua chỉ mục của nó (ví dụ: arr[5] dùng để truy cập đến phần tử thứ 6). Trở lại khái niệm của mảng thì các phần tử được lưu trong các ô nhớ liên tiếp nhau hoặc lưu theo cách có thể tính được vị trí của các phần tử bằng một biểu thức toán học. Và chỉ mục chính là tham số chính để xác định được vị trí của phần tử trong bộ nhớ.

Ví dụ: một mảng int gồm 10 phần tử được lưu trữ trong bộ nhớ, với mỗi phần tử int thì cần 4 byte dể lưu trữ thì lúc này hệ thống sẽ dành một vùng nhớ 40 byte để tạo mảng. Giả sử vùng nhớ này là từ ô nhớ 1000 ~ 1039, phần tử đầu tiên sẽ lưu ở 1000, phần tử thứ 2 sẽ là 1004.. Nếu là zero-base indexing thì index của các phần tử sẽ là từ 0 - 9 và biểu thức xác định vị trí của phần tử thứ i sẽ là 1000 + (i x 4)

Thông qua biểu thức này, thì việc truy cập phần tử theo chỉ mục chỉ có độ phức tạp là O(1), tức là rất nhanh. 

# Lời kết

Rất mong qua bài viết này các bạn có cái nhìn sâu hơn về cấu trúc dữ liệu mảng: cách tổ chức lưu trữ trong bộ nhớ cũng như cách nó hoạt động khi thêm/ xóa phần từ hay truy cập phần tử bằng chỉ mục. Ngoài cũng câu lệnh thực thi thì chúng ta cũng đã nắm được những xử lý đằng sau của nó. Thật tuyệt vời đúng không. 

Cảm ơn các bạn đã theo dõi. Chúc các bạn một ngày tốt lành.

# Tham khảo

https://en.wikipedia.org/wiki/Array_data_structure
https://en.wikipedia.org/wiki/Dynamic_array