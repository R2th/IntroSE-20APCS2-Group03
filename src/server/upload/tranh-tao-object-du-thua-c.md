Khi chương trình .NET hoạt động, **Garbage Collector (GC)** có vai trò quản lý bộ nhớ. Một trong những công việc của quản lý bộ nhớ là loại bỏ những object không dùng tới. 

Mặc dù GC thực hiện các công việc này rất hiệu quả, bạn cần trợ giúp nó bằng cách hạn chế tạo ra những object không cần thiết. 

![](https://images.viblo.asia/56a9bd03-baad-439e-b72d-f49271a2d13d.png)


Trong bài này chúng ta sẽ điểm qua một số tình huống xấu mà nhiều bạn mắc phải, qua đó đưa ra một số kinh nghiệm quan trọng trong việc tạo object.

**Tại sao không nên tạo object thừa?** Câu hỏi này nghe hơi ngớ ngẩn. Những gì thừa đương nhiên là không tốt rồi. 

Cụ thể hơn, trong chương trình .NET, tạo object thừa trong đa số trường hợp đem lại những hậu quả rất xấu về hiệu suất. Vấn đề là, các object của chương trình được tạo ra trong một vùng nhớ riêng do CRL quản lý,
gọi là managed heap. GC hoạt động trên vùng nhớ này và giúp bạn quản lý tất cả các object tạo ra. Một khi object được tạo ra, GC sẽ theo dõi nó và hủy bỏ khi bạn không dùng tới object đó nữa. 

Nói cách khác, GC sẽ giúp bạn không phải lo lắng về các vấn đề như rò bộ nhớ (memory leak) thường gặp trong các chương trình native (ví dụ, chương trình viết trên C++).

Chính do sự tiện lợi của việc không phải tự quản lý bộ nhớ, nhiều bạn khi học lập trình C# mắc phải những sai lầm khi vô tình tạo object vô tội vạ.


Bạn không hề biết rằng mình đang tạo gánh nặng cho GC và qua đó giảm hiệu suất ứng dụng. Việc tạo object trên heap thông thường mất nhiều thời gian xử lý của CPU. 

Nếu bạn liên tục tạo object mới (nhất là trong vòng lặp hoặc trong phương thức được gọi liên tục), đồng thời không sử dụng hiệu quả nó, 
bạn đang tạo ra gánh nặng lớn cho GC khi phải quản lý quá nhiều object dư thừa. Việc hủy một object tạo ra trên managed heap cũng không hề đơn giản. 

Để đi đến quyết định xóa bỏ một object, GC phải thực hiện nhiều thuật toán phức tạp. Ngoài ra, GC còn làm nhiệm vụ dồn object vào các ô nhớ liền kề (giúp tăng hiệu suất chương trình). 

Do đó, việc tạo ra nhiều object dư thừa chỉ dùng một lần sẽ làm GC quá tải. Cả hai vấn đề trên (tạo và hủy object) đều dẫn tới lỗ hổng về hiệu suất của chương trình do ép buộc GC hoạt động quá mức. 
Nói tóm lại, trong chương trình .NET, tạo ra nhiều object thừa ảnh hưởng trực tiếp đến hiệu suất của ứng dụng (nhưng không tạo ra rò bộ nhớ)


**Để tránh việc tạo quá nhiều object dư thừa. Có thể cân nhắc sử dụng một số cách như sau:** 

* **Sử dụng hợp lý biến cục bộ và biến thành viên**

Lấy một ví dụ đơn giản. Khi thao tác trong vòng lặp. bạn khởi tạo 1 biến cục bộ mới và thao tác với nó. Đồng nghĩa với việc với số lượng vòng lặp lớn bạn sẽ tạo ra số object tương ứng. Thay vì khai báo 1 biến cục bộ ta có thể khai báo biến thành viên và có thể tái sử dụng. 

* **Sử dụng thành viên static**

Lưu ý đối với một số object mà giá trị được sử dụng đi sử dụng lại nhiều lần trong chương trình hãy cân nhắc sử dụng thành viên static 
Tuy nhiên, cũng phải lưu ý rằng, loại object được tạo ra như thế này sẽ nằm trong bộ nhớ lâu hơn, ngay cả khi bạn không dùng đến nó nữa.

* **Immutable type: string**

String trong C# (và .NET) là một kiểu dữ liệu reference nhưng hơi khác thường: nó thuộc nhóm immutable. Một khi bạn tạo ra một chuỗi, nội dung của nó không thể thay đổi (immutable). Bất kỳ tạo tác thay đổi nội dung của một chuỗi thực tế đều tạo ra một object mới, mặc dù bạn vẫn tưởng rằng mình đang làm việc với object cũ. Điều này có nghĩa là việc sử dụng các phép toán biến đổi chuỗi (như cộng xâu, xóa bỏ phần tử, v.v.) đều tạo ra object mới (và sau đó GC phải loại bỏ object cũ). Vì vậy hãy cân nhắc sử dụng StringBuilder.