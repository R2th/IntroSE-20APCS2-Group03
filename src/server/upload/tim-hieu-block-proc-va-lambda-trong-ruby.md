# I. Khái niệm
## 1.Block
*  Block đơn giản là một khối mã gồm tất cả những gì bên trong {} hoặc do end.
*  Mọi thứ trong ruby đều là object ngoại trừ block.
*  Có thể được chỉ định thành Proc.

*Block ở bên trong dấu {...} hoặc do ... end.*
![](https://images.viblo.asia/4212c82a-5643-42d0-aab4-e6b3ce4aa7ee.png)
*Block được truyền vào phương thức ở vị trí giống như là một tham số cuối cho phương thức được gọi và được gọi ra bằng câu lệnh yield trong định nghĩa phương thức. Câu lệnh `yield` cũng có thể truyền tham số vào block rất giống với việc truyền tham số cho phương thức.*
![](https://images.viblo.asia/5033c434-a1e7-46b4-bd21-c6b22ca8447a.png)
*Nếu muốn sử dụng rõ ràng hơn về block, hãy thêm 1 đối số cuối cùng vào danh sách đối số cho phương thức của bạn(với `tiền tố &`). Và đối số đó sẽ là `Proc object`.*
![](https://images.viblo.asia/17656774-be7f-4fa0-a424-3bcd48eb6dfd.png)
## 2.Proc
* Proc là đối tượng đại diện cho block
![](https://images.viblo.asia/00865491-3956-494d-aaf9-5cc5ffafee3e.png)
*Proc chính là block được đặt tên. Để ý cách khai báo với `Proc.new` ở hình trên. Coi toàn bộ phần trong ngoặc {} là Block_Content thì `proc_object = Proc.new{ Block_Content }` Sau đó thì ta có thể truyền proc_object làm tham số cho các phương thức cũng như gọi ra bằng phương thức `.call`:* 

## 3.Lambda
Lambda tạm dịch là hàm nặc danh. Nói một cách khác, lambda là function được gọi từ bên trong function, và những gì lambda làm hoàn toàn độc lập với fucntion gọi nó. Vì thế hoạt động của nó giống như một global function.
* Lambda cũng là `Proc object`, Lambda là một `special Proc object `
* Lambda được khởi tạo như sau:
> lambda_say = -> { puts "This is a lambda" }

hoặc có thể thay thế `ký tự mũi tên ->` bằng từ cú pháp `lambda`
> lambda_say = lambda { puts "This is a lambda" }
* Gọi lambda
*Không có đối số*
![](https://images.viblo.asia/76d6349f-682e-4c05-aa0c-c13d9bb61a75.png)
*Có đối số*
![](https://images.viblo.asia/64a299f5-8094-4025-bc53-7c81d519395a.png)


#  II. So sánh
## 1. Blocks, Procs và Lambdas
* Procs và Lambdas đều là closure trong ruby.
* Là những phương pháp nhóm gộp các mã ruby lại để thực thi.
* Blocks không phải đối tượng, còn Procs và Lambdas thì có.
* Procs có hành vi giống với block còn Lambdas thì giống phương thức.
## 2. Blocks và Procs
* Procs là đối tượng còn Blocks thì không.![](https://images.viblo.asia/38f231a1-c8fd-4354-b5ae-263868c792d1.png)
* Tối đa một Block có thể xuất hiện trong một danh sách đối số của phương thức. Ngược lại, như một sự hiển nhiên có thể truyền nhiều tham số proc đến các phương thức bởi vì:
    >  `Procs là đối tượng còn Blocks thì không.`
## 3.Procs và Lambdas
>  Có 2 điểm khác biệt giữa Proc và Lambda mặc dù cả hai đều là Proc object
>  
3.1. Cách xử lý tham số truyền vào
    
    *Không giống Procs thông thường, nếu truyền sai các tham số khi gọi lambda,  sẽ sinh ra ngoại lệ , trong khi đó việc gọi một proc mà không truyền tham số thì mặc định tham số đó là `nil`:*
    
   * Đây là `Lambda:`
    ![](https://images.viblo.asia/96b9651f-492b-4384-8769-7754be7182f0.png)
    Lambda sẽ báo lỗi:
    ![](https://images.viblo.asia/a32e08c0-a0ed-4e23-9474-25f0f81ad166.png)
    * Còn đây là `Proc`
    ![](https://images.viblo.asia/a4a2135f-55bf-4c78-906f-f08fd544ec96.png)
    
  
3.2. Cách trả về return

    Lambda sẽ trả về giá trị của bản thân nó, trong khi Proc chỉ trả về cho ngữ cảnh hiện tại.
Hãy thử chạy đoạn mã sau đây:
![](https://images.viblo.asia/9081f971-fc1c-4a80-a206-fea0fbd123dd.png)
kết quả là `my_lambda.call` trả về `Lambda result: 1`
còn `my_proc.call` xuất hiện lỗi: `unexpected return`
> Lambda đã thể hiện tính chất của một method

OK bây giờ nếu Proc ở bên trong một method thì sao ?
![](https://images.viblo.asia/06b929dc-2520-468a-902c-8417bd20e077.png)
> Như vậy là Proc trả về cho method  gọi đến nó. Vì vậy nó làm việc của 1 block.


    
# III. Lời kết
Rõ ràng việc sử dụng tốt Blocks, Procs và Lambdas là quan trọng đối với việc lập trình với ngôn ngữ Ruby. Và việc nắm được sự khác nhau cũng về cách sử dụng cũng như khám phá ra những điều thú vị về block, proc và lambda sẽ giúp ích rất nhiều cho việc học ruby ngày một tốt hơn. Cảm ơn đã theo dõi bài viết!
*Link tham khảo: http://www.rubyguides.com/2016/02/ruby-procs-and-lambdas/*