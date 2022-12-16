Vì mình mới sử dụng git, nên mình muốn chia sẻ với các bạn một vấn đề mình gặp trong lúc dùng git. Đây là vấn đề cơ bản, nhưng lại tốn thời gian cho những người mới như mình. Bởi vậy, bài viết này là dành cho các bạn mới làm quen với git như mình. Các pro xin đừng ném đá :)

Trong bài viết này mình sẽ hướng dẫn các bạn cách tạo SSH Key cho Github trên Window và Ubuntu. Sau đó là config SSH Key này trên Github để mỗi lần thực hiện các thao tác với git (clone, commit, push, pull,..) thì  Github không yêu cầu nhập mật khẩu nữa.


-----

Lúc clone một repository trên git về máy của mình, chúng ta sẽ thấy có 2 lựa chọn là Clone with HTTPS và Clone with SSH:


![](https://images.viblo.asia/d33cb21c-b9e0-49f9-a780-317ae8fffcfd.png)


![](https://images.viblo.asia/7a75ba1a-68ed-45b5-a87b-e69ddc7a2369.png)
    
    
Việc Clone with HTTPS khá đơn giản, git chỉ yêu cầu chúng ta nhập thông tin đăng nhập khi clone, và trong quá trình sau này khi thao tác một số câu lệnh của git nó vẫn tiếp tục yêu cầu chúng ta nhập mật khẩu. Điều này khiến mình cảm thấy hơi phiền lòng. Việc Clone with SSH sẽ giúp ta tránh được nỗi phiền này, song nó lại bắt chúng ta cấu hình trước khi dùng. Vậy là một cái là đau khổ triền miên, cái kia là khổ trước sướng sau.  Lúc ban đâu, mình đã thử Clone with SSH như cách mình Clone with HTTPS dĩ nhiên là lúc đó mình chưa cấu hình gì cho SSH Key cả, người mới mà, thì mình nhận được thông báo như sau:
![](https://images.viblo.asia/588d5e2e-c371-4166-9680-dba1ce6dd9a3.png)
   
   
   Các bạn mà bị như mình thì hãy tiếp tục, dứoi đây là cách config SSH Key, đánh bay "lỗi" như ở trên.
Nếu bạn sử dụng HĐH Window:
   
   
   Bước 1: Vào thư mục cài đặt git và tìm file: github_rsa.pub (Các bạn có thể dùng câu lệnh cd %userprofile%/.ssh trên comand prompt)
    ![](https://images.viblo.asia/d3e3b0ed-45c1-4c2a-8181-81c4a6ec9b9e.png)
   
Note: Để mở folder trên dùng câu lệnh [start .]

   Bước 2: Mở file github_rsa.pub và copy ssh-key
    ![](https://images.viblo.asia/5b9ba220-3906-4595-ab85-71d4cbdd2238.png)
   
   
   Bước 3: Trên trang github của bạn, chọn Setting
    ![](https://images.viblo.asia/5de5ef43-6e3a-4661-b96d-41c2899a073e.png)
   
   
   Bước 4: Chọn SSH and GPG keys > New SSH key
    ![](https://images.viblo.asia/309c12e4-930e-4164-b071-fa3547f69142.png)
   
   
   Bước 5: Điền title và patse đoạn key bạn đã copy ở bước 2 vào box Key > Add SSH key
    ![](https://images.viblo.asia/89743ead-787f-4187-8010-c8684a93ec5c.png)
   
   
   Bước 6: Git đưa ra thông báo xác nhận, sau khi bạn xác nhận thì kết quả sẽ như sau:
    ![](https://images.viblo.asia/6f6eb890-84e3-4862-be60-9c30172793bb.png)
    
    
   Cuối cùng các bạn hãy clone lại và tận hưởng kết quả đi nhé, từ nay về sau sẽ không còn gặp phiền phức khi git yêu cầu nhập mật khẩu nữa rồi =)))
    ![](https://images.viblo.asia/9366ef63-4374-4f90-a58c-9db10f72a305.png)
 
 
 Với những bạn không tìm thấy file: github_rsa.pub, hãy làm như sau:
     1. Mở cmd với quyền administrator.
     2. Chạy câu lệnh: ssh-keygen -t rsa -C "your_email@example.com"
     =>> Thế là các bạn đã tạo xong file github_rsa.pub rồi. Quay lại bước 1 và làm tiếp nhé
  
  ## Với các bạn sử dụng Ubuntu:
 
 Đầu tiên các bạn mở Terminal lên và chạy các lệnh sau:
 ```
 cd ~/.ssh
 ls id_*
 cat < ~/.ssh/id_rsa.pub
 ```
  
  
  ![](https://images.viblo.asia/bebf8f85-df43-47e6-948c-02396a3a087b.png)
  
  
  ![](https://images.viblo.asia/bebf8f85-df43-47e6-948c-02396a3a087b.png)
 
 
 ![](https://images.viblo.asia/8693058e-5fbd-401e-b313-70fa5ada442a.png)
  
  
  Sau khi có ssh-key, các bạn tiến hành cấu hình tiếp tương tự như trên Window (Trường hợp tìm không thấy ssh-key cũng thực hiện tương tự như cách trên window.