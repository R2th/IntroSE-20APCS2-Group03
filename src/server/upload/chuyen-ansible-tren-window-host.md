Lại là mình và một bài viết ít hàm lượng kĩ thuật đây :duck: 

Chuyện là mình được giao cho việc thiết kế một cái playbook để install phần mềm con vịt trên một window server. Cái thú vị ở đây là phần mềm con vịt được sử dụng bởi ngân hàng. Theo như manager của mình thì ngân hàng thường sẽ không thích dùng bất cứ server nào để connect cho server core banking system. Vậy nên, chúng ta phải come up với một solution mà có thể chạy trên localhost của window server. :slightly_smiling_face: 


## Challenges

Mỗi khi gặp việc bế tắc, mình thường ... google. :laughing: . Đầu tiên mình search xem chạy ansible trên window server có được hay không. Và câu trả lời là:

![image.png](https://images.viblo.asia/6d072416-8f43-46bd-8f8d-54bfd52b8bee.png)

Nhìn hơi chán xíu xíu. Nhưng mình không bỏ cuộc. Tại mình nghĩ  con người ta khi không làm được cái gì đó, người ta thường bị giới hạn và nghĩ rằng nó là không thể. Nếu chạy trên window không được thì mình chạy trên [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) xem sao?

Lại lục đục search thêm một hồi, à à, ansible chạy được trên WSL. Vậy thì configuration nào.

```
sudo apt-get update 
sudo apt-get install software-properties-common 
sudo apt-add-repository ppa:ansible/ansible 
sudo apt-get update 
sudo apt-get install ansible
```

Ok, vậy là có ansible để chơi rồi. Tuy nhiên giờ lại có một câu hỏi bỏ ngỏ: Làm sao để kết nối WSL với window local machine? 

## Keep digging

Khi chúng ta sử dụng WSL, chúng ta đang có một sub system trên máy tính. Vậy nên khi ta dùng **localhost**, nó sẽ refer đến cái host của cái system hiện tại. Hiển nhiên là của cái linux system.

![image.png](https://images.viblo.asia/7a77a7c3-e46c-418d-8f36-5ad1fc3920a6.png)

Lại một vòng lọ mò một hồi, mình tìm ra cách "tốt nhất" (mà mình tìm được) để connect với window machine là [winrm](https://docs.microsoft.com/en-us/windows/win32/winrm/portal). Sau khi config xong chúng ta được như sau:

![image.png](https://images.viblo.asia/fb44924d-4d30-4c79-8fe9-97d24b2cd455.png)

Thế giờ chắc được rồi ha. Mình nghĩ thế rồi chạy thử thêm lần nữa. Và ồ ...
![image.png](https://images.viblo.asia/ec307c12-ac48-4aea-be5a-cc4901dd495a.png)

Ngó xem port có đang mở hay không

![image.png](https://images.viblo.asia/b0c47fe8-6d26-434c-8472-82787f5fe0f5.png)

Ờ có mở nè. Vậy vấn đề đến từ IP rồi. Sau một hồi lại lọ mọ thì mình tìm ra được cách để extract ip server:

```
export hostip=$(cat /etc/resolv.conf | grep nameserver | awk '{ print $2 }')
```

Giờ thì thử lại nào
![image.png](https://images.viblo.asia/52b572cf-1476-4e2f-af58-40515d7dc08a.png)

## Notes

Chạy được thấy ổn ổn rồi ha. Tuy nhiên vẫn còn vài vấn đề lấn cấn trong lòng mình vì: 
![image.png](https://images.viblo.asia/f91d90f6-c8dd-470c-807f-1820bbb980c3.png)

Tạm thời thì mình vẫn chưa thấy down side của cách này. Nên tính cứ trình lên cho sếp rồi tính sau. :laughing: 

Bài hôm nay hơi ngắn nhỉ? Thôi kể thêm cho các bạn câu chuyện cho vui.

Chuyện là ngày còn trong trường, mình nhớ bọn mình cần phải học về state machine. Thật sự thì state machine khá phức tạp, nhiều công thức. Lúc đó lớp mình khá nhiều đứa trượt. Thầy dạy lúc đó khá lớn tuỏi, cũng khá nóng tính. Mình nhớ thầy quát cả lớp là: **If you do not want to learn it, then don't.** (Chúng mày không muốn thì đừng có học)

Sau khi tốt nghiệp, mình có email cho thầy, gọi là cảm ơn thầy đã giúp đỡ tụi em. Thầy bảo sang năm thầy cũng nghỉ rồi, thầy thấy quý mình vì mình không ca thán nhiều khi học (thực ra không phải không ca :laughing: ). Thầy nói tất cả kiến thức mình học đều đã cũ mấy chục năm, kể cả ông thầy đứng dạy cũng cũ rồi. Khi thầy dạy, thầy không muốn mọi người chỉ học kiến thức, thầy còn muốn mọi người **học cách bổ sung kiến thức mới** khi còn trên ghế nhà trường.

Mình nghĩ cái email đó ảnh hưởng tới mình khá nhiều. Từ đó mỗi khi gặp vấn đề không-thể-giải-quyết, mình thường ... không tin lời người khác nói. Luôn cố gắng tự tìm kiến thức (dù đôi lúc hơi ngu). Vì mình nghĩ kiến thức là vô hạn, nó cập nhật từng ngày mà.

Ví như hôm qua bitcoin, hôm nay ai ai cũng chơi eth, ngày mai rất có thể là cardano. :laughing: 

Thế nhé. Chúc các bạn một tuần vui vẻ.

Somewhere, xx-xx-20xx

Rice