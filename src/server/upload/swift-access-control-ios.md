Access controls thường chủ yếu được hỏi khi bạn đang ở giữa cuộc phỏng vấn technical của mình. Người phỏng vấn muốn biết liệu bạn có thể xác định những phần quan trọng trong code của mình và liệu bạn có thể đảm bảo những đoạn code đó được ẩn hay hiển thị tương ứng với các phần khác trong code base của bạn.

# Access Controls trong swift là gì?

Swift cung cấp 5 kiểu khác nhau của Access Controls trong code. Những access levels này hạn chế việc truy cập tới những phần code của bạn từ code trong module và file khác. Chúng liên quan tới source file mà bất kỳ thực thể nào cũng có thể xác định.

* Open: Đây là nơi mà bạn có thể truy cập tất cả data members và member functions trong cùng một module và bên ngoài nó. Bạn có thể subclass hoặc override bên ngoài module. 
* Public: Giống với Open. Điểm khác biệt duy nhất là bạn không thể subclass hoặc override bên ngoài module.
* Internal: Đây là access level mặc định trong Swift, nó cho phép tất cả data members và member functions chỉ được truy cập trong cùng một module và hạn chế truy cập bên ngoài module.
* Private: Đây là nơi bạn có thể truy cập data members and function trong phần khai báo kèm theo của nó cũng như phần mở rộng trong cùng một file. Nó không cho phép truy cập trong subclass với cùng một file hoặc khác file
* File-private: Giống như Private. Sự khác biệt duy nhất là nó cho phép truy cập trong subclass với cùng một file.

# Access level mặc định trong swift là gì?

Nếu chúng ta không đề cập một access level trước một thực thể nào, internal sẽ là mặc định. Nó đã được giải thích trong phần trên.

# So sánh

Người phỏng vấn thường sẽ hỏi bạn về sự khác nhau, ví dụ:

* Open vs Public
* Public vs Internal
* Private vs Fileprivate

# Giải thích sự khác nhau giữa Open và Public

**Public** bạn không thể subclass Public bên ngoài module nhưng **Open** bạn có thể kế thừa hoặc ghi đè một phuong thức. 

Khi sử dụng **Public** trong khi tạo một class bên trong một framework, chúng ta không thể kế thừa class đó trong module khác, như ví dụ dưới đây:

![](https://images.viblo.asia/40bcf606-d86f-4e9c-bfdf-5d6c2ea719ba.png)

Bây giờ, chúng ta import NetworkFramework và cố gắng subclass NetworkFramework thành LoginNetworkManager

![](https://images.viblo.asia/3bce286c-840d-44a4-ae76-f9cbfe7d52ac.png)

Tương tự, khi sử dụng **public** methods trong module khác, nó sẽ báo lỗi trình biên dịch.

![](https://images.viblo.asia/57c4c1bb-9088-4464-9076-38b2f485d8f4.png)

Như chúng ta có thể thấy trình biên dịch báo lỗi. Để loại bỏ lỗi này, chúng tôi sẽ phải sửa đổi quyền truy cập từ **public** thành **open** . Bây giờ nó sẽ hoạt động tốt.

![](https://images.viblo.asia/a9c8acae-6d08-44f1-947c-a1afb03f85bb.png)

Bạn có thể được yêu cầu viết code như trong ví dụ trên trong cuộc phỏng vấn.

# Giải thích sự khác nhau giữa Internal vs Public?

**Public —** cho phép các data members được sử dụng trong bất kỳ source file nào từ module xác định của chúng, **và cũng trong một source file từ một module khác import module xác định.**

**Internal —** cho phép các thực thể được sử dụng trong bất kỳ source file nào từ module xác định của chúng, nhưng **không được sử dụng trong một source file bên ngoài module.**

## Khi nào nên sử dụng internal access level?

Khi chúng ta muốn tạo một framework mà không muốn cho phép các lớp hay thực thể của chúng bị truy cập từ framework hoặc module khác thì **internal** đóng vai trò quan trọng. Điều này được giải thích rõ ràng hơn dưới đây. 

![](https://images.viblo.asia/02933658-5f7c-4c2a-8a46-496af77b1925.png)

Bây giờ, nếu chúng ta cố gắng sử dụng lớp này trong bất kỳ module nào khác thì nó sẽ tạo ra lỗi trình biên dịch như được hiển thị:

![](https://images.viblo.asia/1eb8dba4-3a8e-4ea5-8736-ee4ba95e9e7b.png)

# Giải thích sự khác nhau giữa Private vs Fileprivate

Chúng ta nên giải thích sự khác nhau bằng cách sử dụng ví dụ dưới đây 

**private — Cho phép các data members và function truy cập và hoạt động trong phần khai báo kèm theo cũng như phần mở rộng trong cùng một file.**

**Case 1: Trong cùng một source file**, nếu thuộc tính hoặc hàm được khai báo là private trong lớp - thì phạm vi theo mặc định chỉ là lớp và phần mở rộng của lớp đó.

![](https://images.viblo.asia/8d2f1260-1c48-407a-89a9-2b7e61905c52.png)

**Chúng ta có thể truy cập data members trong subclass không?**

Không, subclass không cho phép truy cập được xác định superclass bên trong cùng một sourcefile như được hiển thị ở trên.

**Case 2: Trong source file khác**, Nếu property hoặc function được khai báo là **private** trong một source file và quyền truy cập trong phần mở rộng / lớp con trong source file khác - **quyền truy cập không được phép**

![](https://images.viblo.asia/79a35d95-06a0-4cc8-8fa0-8259dec4bb0a.png)

Vì vậy, ở đây, chúng ta đã thấy lỗi trình biên dịch có nội dung rõ ràng là “ properties are inaccessible due to private protection level ”, bây giờ chúng ta có thể giải quyết lỗi này bằng cách sử dụng **fileprivate** . Hãy xem ví dụ:

**fileprivate — Cho phép truy cập các data members và functions trong cùng một source file hoặc ở subclass hoặc phần mở rộng**

**Case 1: Trong cùng một source file**, Nếu chúng ta tạo một phần mở rộng hoặc subclass  trong cùng một class file và cố gắng truy cập vào thực thể **fileprivate** trong phần mở rộng / Subclass - **quyền truy cập được phép**

![](https://images.viblo.asia/6789283c-99bd-4f6c-9e93-880fe7e1a264.png)

Vì vậy, như đã thấy trong cấp độ **private** , đã xảy ra lỗi khi tạo subclass trong cùng một tệp nguồn ở đây, chúng tôi đã giải quyết lỗi đó bằng các data members được khai báo là **fileprivate**.

**Case 2: Trong source file khác, fileprivate** hoạt động giống như **private**, ví dụ dưới đây:

![](https://images.viblo.asia/35d8067c-a026-4425-93a3-335f3dcf77ec.png)

Ở đây, lỗi trình biên dịch được tạo ra khi **fileprivate** nói rằng bạn có thể truy cập các data members trong cùng một file mà chúng được khai báo, trong khi **private** nói rằng bạn chỉ có thể truy cập các data members trong phạm vi khai báo và phần mở rộng kèm theo.

# Áp dụng access levels ở đâu?

Người phỏng vấn có thể hỏi câu hỏi này theo cách mà chúng ta có thể sử dụng trong enum hoặc struct không?

* Classes, structs, enumerations, protocols
* Properties, functions, computed properties and subscripts
* Custom types, and nested types

Nguồn: https://medium.com/hash-coding/swift-access-control-ios-dab45a0b79ab