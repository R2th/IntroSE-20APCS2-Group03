# I. Class Diagram:

-----


**Class diagrams** bao gồm các **class**, **protocol**, **property**, **method**, **relationship**.
Mỗi hình chữ nhật biểu thị một **Class**. Dưới đây là một ví dụ về Class Diagram cho class **Dog**:
 
![](https://images.viblo.asia/f08167a3-ebf3-4a3d-852f-a53ff58b8e29.png)


 Để biểu diễn một **class** kế thừa từ một class khác, ta sử dụng một mũi tên có có đầu là hình tam giác rỗng:
 
![](https://images.viblo.asia/94d41a99-f5d0-4474-99a9-f6fa3d11fb57.png)
 
 Thay vì đọc là "inherits from", chúng ta sẽ đọc là "is a". Ví dụ, để biểu thị **SheepDog** kế thừa từ **Dog**, ta sẽ vẽ Class Diagram như sau:
 
![](https://images.viblo.asia/5a58c090-2bb2-4353-bc28-e5680d29c644.png)
 
 Trong Class Diagram phía trên, chúng ta sẽ đọc như sau: "SheepDog is a Dog".
 
 Để biểu thị một **property**, chúng ta sử dụng mũi tên nhọn
 
![](https://images.viblo.asia/60d90a86-fe65-4af6-b427-380a5bf74e4f.png)
 
 Class Diagram có thể viết theo trình từ dưới lên trên, từ trái qua phải,... hoặc theo bất cứ trình tự nào mà bạn muốn. Bất kể hướng bạn chọn là gì, hướng của mũi tên xác định ý nghĩa: Mũi tên biểu hiện sự kế thừa luôn hướng vào **lớp cha** (super class) và mũi tên biểu thị thuộc tính luôn hướng vào lớp **thuộc tính**.
 
 Mũi tên biểu thị **quan hệ thuộc tính** (property) được đọc là "has a". Ví dụ, nếu một người nông dân (Farmer) có một chú chó (Dog) thì Class Diagram sẽ được vẽ như sau:
 
![](https://images.viblo.asia/2e84d4f1-cbe2-4bce-8825-ad1ae6b81a2c.png)
 
 Chúng ta có thể biểu diễn **quan hệ một - nhiều** (one - to - many). Ví dụ một người nông dân (Farmer) có thể sở hữu nhiều chó (Dog):
 
![](https://images.viblo.asia/42af8592-7fa5-4acc-a713-45822d71ec58.png)
 
Phải luôn luôn sử dụng dạng số ít của tên lớp trong sơ đồ lớp, ngay cả khi đang truyền đạt mối **quan hệ một - nhiều** (one - to - many). Trong trường hợp này, chúng ta nên viết **Dog**, không phải **Dogs**.

Chúng ta có thể sử dụng không giới hạn số lượng mũi tên chỉ quan hệ và các class trong một Class Diagram. Ví dụ cách thức  biểu thị một người nông dân (Farmer) có một con chó chăn cừu (SheepDog) là một con chó (Dog):

![](https://images.viblo.asia/a9551032-be7f-40d4-8c2c-412530262ed7.png)

Chúng ta cũng có thể dùng hình chữ nhật để biểu diễn **protocol**. Tuy nhiên, chúng ta cần phải viết tiền tố `<<protocol>>` phía bên trên tên.
    
![](https://images.viblo.asia/a9d718d4-3593-48f1-9196-4bcbe3fdc926.png)
    
Để biểu diễn một **class** được **implement** một **protocol**, ta sử dụng mũi tên đứt đoạn với đầu mũi tên là một hình tam giác rỗng:

![](https://images.viblo.asia/9f550964-c4ff-4a21-9fdf-624e24d48864.png)

Chúng ta có thể đọc quan hệ này là "implement" hoặc "conform to". Ví dụ, chúng ta biểu diễn class **Farmer** **implements** **PetOwning** **protocol** như sau:

![](https://images.viblo.asia/5bc86cbe-fec4-41a8-aa09-0d29edf02899.png)

Sử dụng mũi tên nhọn đứt đoạn để để sở hữu quan hệ phụ thuộc (use)

![](https://images.viblo.asia/f62514ea-626a-417e-94ac-c0cefdf81665.png)

Sử dụng "**use**" để thể hiện những yếu tố sau:
- **Weak property** hoặc **delegate**.
- Một **object** được truyền vào một **phương thức** như một **parameter**, nhưng không được giữ như một **thuộc tính**.
- Một **liên kết** hoặc **callback**, ví dụ như IBAction trong ViewController.

![](https://images.viblo.asia/106f73d9-ee9b-4ea6-8fd5-a9b1320dbcd7.png)

Có thể biểu thị các **thuộc tính** và **phương thức** trong Class Diagram. Ví dụ, chúng ta có thể biểu diễn class `PetOwning` có thuộc tính `name` và phương thức `petNeedsFood(_:)` như sau:

![](https://images.viblo.asia/4800ea52-0c1b-43a0-94ca-2589260bb654.png)

Chúng ta có thể bỏ qua chú thích đối với những mũi tên biểu thị quan hệ khi nó đã rõ ràng về ý nghĩa. Ví dụ, ta thường có thể bỏ qua các giải thích cho các quan hệ inheritance, property và implement. Tuy nhiên, chúng ta nên ghi chú thích cho quan hệ **use** vì ý nghĩa của chúng không phải là rõ ràng.
Ở đây, sơ đồ lớp hoàn chỉnh cho một nông dân (Farmer) có chó chăn cừu (SheepDog), SheepDog có delegate tới một đối tượng PetOwning:

![](https://images.viblo.asia/70b0f4f4-db23-4da2-8c28-87a1c66572d9.png)

# II. Tài liệu tham khảo:

-----


- Design Pattern by Tutorials - 2nd