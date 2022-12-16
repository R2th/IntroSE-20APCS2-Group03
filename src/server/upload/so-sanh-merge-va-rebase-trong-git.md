Khi làm việc với Git, chúng ta không còn lạ với cả hai lệnh **rebase** và **merge**. Chúng đều dùng để giải quyết cùng một vấn đề: tích hợp những thay đổi từ một nhánh vào một nhánh khác. Tuy nhiên, chúng thực hiện điều này theo những cách rất khác nhau. Hôm nay chúng ta cùng đi tìm hiểu kỹ hơn về 2 lệnh này nhé

### 1. Bài toán 
Ta có 1 nhánh chính **master** và nhánh con **bugFix**. Hiện tại, ta đang đứng ở branch **master**. Sản phẩm tiếp tục được phát triển, thành viên khác làm việc ở nhánh **bugFix** đã cập nhật thêm những commit mới. Để chuẩn bị cho buổi demo sản phẩm, ta phải tích hợp những commit ở nhánh bugFix vào nhánh master. Git đưa ra 2 cách giải quyết vấn đề: **Merge** hoặc **Rebase**.

![](https://images.viblo.asia/68e1202c-a45c-4b16-81c5-4f0a2b0b2382.png)

### 2.Merge
Ta merge nhánh **bugFix** vào nhánh đang làm việc bằng các thao tác:
```
git checkout master
git merge bugFix
```
	
Với cách làm này, một **commit merge** mới sẽ xuất hiện ở lịch sử commit của nhánh **master**, giống như một mối nối để ghép lại lịch sử của cả 2 nhánh. Ta sẽ có một cấu trúc commit trông giống như này:

![](https://images.viblo.asia/22ffe8df-a916-4c0d-ab63-0815a58c4701.png)

**Merge** làm cho những nhánh đang tồn tại không bị thay đổi. 

### 3. Rebase

Để tích hợp những thay đổi ở nhánh **bugFix** vào nhánh master, ta sử dụng rebase:
```
git checkout bugFix
git rebase master
```

Thao tác này sẽ đưa toàn bộ những commit mới tạo ở nhánh **bugFix** nối tiếp vào "ngọn" của nhánh **master**, nó sẽ viết lại lịch sử của project bằng cách tạo ra những commit mới ứng với mỗi commit ban đầu của nhánh **bugFix**

![](https://images.viblo.asia/c28e69ad-3866-4f67-807a-cea023d69586.png)

**Rebase** sẽ giúp loại bỏ những commit không cần thiết như khi sử dụng git **merge** và giúp tạo ra lịch sử commit có dạng tuyến tính, xuyên suốt project từ khi bắt đầu cho đến hiện tại. Ta có thể dễ dàng điều hướng và kiểm tra lịch sử project bằng **git log**. 

### 4. Sự khác nhau
Nếu so với **rebase** thì **merge** là cách có thể tích hợp với master với rất nhiều nhánh trong 1 lần . Tuy nhiên trường hợp tích hợp bằng merge thì những commit của branch sẽ hoàn toàn không được record lại . Do vậy nếu chúng ta muốn lưu lại một cách chuẩn xác flow của dự án thì Rebase là phương pháp nên được sử dụng

![](https://images.viblo.asia/024fc4ae-0262-446e-8f19-eefb22f82a62.png)

* Chú ý vào **rebase**, ta sẽ thấy commit của **rebase** nằm phía trên commit mới nhất của **master**. Còn ở **merge**, mọi người sẽ thấy commit của **master** nằm phía trên commit mới nhất của **merge**, ngoài ra một commit **merge branch** cũng được tạo ra.

* Ta sử dụng git **rebase** nếu như muốn các sự thay đổi thuộc về branch của mình luôn luôn là mới nhất. Và có thể log một cách có hệ thống dễ nhìn, dễ tracking sau này.

* Ta sử dụng git **merge** nếu muốn sắp xếp các commit theo mặc định. Nếu không biết về những gì mình làm trên branch đó thì dùng **merge** chắc chắn việc tracking sau này có thể tốn nhiều thời gian lần mò.