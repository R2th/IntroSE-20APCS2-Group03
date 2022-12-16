Bạn là sinh viên, bạn là lập trình viên khó khăn về mặt tài chính, bạn không có xiền thuê VPS, VPS được tạo ra bằng Github chỉ tồn tại trong 6 tiếng không đủ làm bạn thỏa mãn, đừng lo lắng🥵😵!!! Hôm nay mình sẽ tiếp nối sự thành công của seri *hướng dẫn tạo VPS free cho mọi nhà* bằng bài viết hướng dẫn tạo **VPS free** vĩnh viễn. Không chần chừ nữa, được rồi 😁 đi thôi !!! 👉
# Oracle Cloud Free Tier
Bạn đã quá chán với Amazon EC2 hay Google Compute Engine,... chỉ với 1GB RAM free??? Hãy đến ngay với Oracle Cloud Free Tier, nơi mà con VPS của bạn có thể lên đến 96GB RAM hoàn toàn miễn phí.  
Chương trình Oracle Cloud Free Tier gồm có hai chương trình con: 30-day Free Trial (30 ngày dùng thử) và New Always Free (miễn phí trọn đời). 
*Link chi tiết:* https://www.oracle.com/cloud/free/  

## 30-day free trial
Ngoài các mục miễn phí được đề cập trên [trang chủ](https://www.oracle.com/cloud/free/), trong 30 ngày dùng thử, người dùng có thể tạo *Instance* với sharp **VM.Standard.A1.Flex** lên đến 96GB RAM free. Hết 30 ngày, con số GB RAM free tối đa đối với VM.Standard.A1.Flex sẽ quay về 24GB.  
![](https://images.viblo.asia/4cb6dd62-1a4d-482a-bc97-73946a5162d9.png)  
Wowww😮😮😮!!! 24GB RAM miễn phí trọn đời!!  

## Always Free  
![](https://images.viblo.asia/74522482-dd04-49c1-8509-fbaa27ebd591.png)  
Woww!! Quá vip, 🤩thật là hào phóng.  
Vậy làm sao để nhận được các ưu đãi này?? Được rồi, lên đồ thôi!!!  

# Lên đồ  
- Đầu tiên bạn truy cập vào trang [Oracle Cloud Free](https://www.oracle.com/cloud/free/#always-free) để đăng ký tài khoản.  Bấm nút *Start for free* để bắt đầu đăng ký tài khoản:
![](https://images.viblo.asia/cf36020e-2a08-4c9f-8f86-02d1e9745c77.png)
- Tiếp theo, điền thông tin Country, First Name, Last Name và Email, sau đó bấm nút để Oracle gửi email xác nhận tài khoản:  
![](https://images.viblo.asia/d7a43206-c8b9-44e8-8fff-e4bd49a2d84c.png)  
- Kiểm tra email của bạn, bấm vào nút Click here để xác nhận tài khoản:
![](https://images.viblo.asia/bd945496-7421-4166-be7a-b6bcff9e0727.png)
- Trang web sẽ điều hướng bạn đến trang điền thông tin, tại đây các bạn tiếp tục điền thông tin cá nhân, password.  
**Chú ý:** Tại mục  **Home Region**, một số bài viết hướng dẫn trước đây khuyên bạn chọn  Japan hoặc Korea để cho kết nối về Việt Nam tốt nhất. Tuy nhiên theo mình,  chúng ta **không nên** chọn Home Region ở Japan hoặc Korea vì nó rất là đông người sử dụng, bạn sẽ rất khó khăn trong viêc tạo **VPS free** (oracle cũng chú ý điều này bên dưới mục *Home Region* ). Bạn **nên** đọc qua [Cloud Regions](https://www.oracle.com/vn/cloud/cloud-regions/data-regions/#emea) để biết thông tin các dịch vụ khả dụng tại Regions bạn chọn.   
**VD**: Nếu bạn chọn Singapore, bạn sẽ **chỉ có** *1 AMD based Compute VMs với 1/8 OCPU và 1 GB memory* trong chương trình  Always Free (Thời điểm hiện tại, trước đây còn không có cơ 😓).  Vì vậy, nên đọc qua docs để chọn Regions phù hợp với nhu cầu của mình🥺.  
![](https://images.viblo.asia/471450b1-7069-4cd5-8c15-7e96cb1637c0.png)  
- Bấm Add payment verification method  > Credit Card > Nhập thông tin thẻ tín dụng và bấm nút Finish. Oracle sẽ rút của bạn khoảng 1$ để xác nhận thẻ tồn tại rồi lập tức trả lại cho bạn nên bạn có thể hoàn toàn an tâm nha.  
![](https://images.viblo.asia/ca857d7d-d424-4d2c-a7b4-94f2d38486e4.jpg)  
- Bấm chọn ở ô Agreement sau đó bấm *Start my free trial* để hoàn tất quá trình đăng ký.  
Được rồi, vậy là có đồ rồi, bây giờ chơi đồ thôi !!!  

# Chơi đồ  
Mục này trên mạng hướng dẫn khá nhiều, mình xin phép lướt nhanh phần này, tập trung vào các mục chính !!!  
- Tại trang Dashboard, trong phần *Launch Resources* chon mục *Create a VM instance*.
![](https://images.viblo.asia/16450f12-499a-470e-9dc7-ade065ec76bd.png)  
- Tại mục **Image and shape** click nút edit để thay đồi image và shape của VPS theo mong muốn của các bạn. Các bạn có thể hiểu nôm na Image là phần mềm (hệ điều hành và các phần mềm được được cài sẵn), shape là phần cứng (CPU, RAM).   
![](https://images.viblo.asia/2e17bd2f-3835-48ac-8d12-83eb659f44a3.png)  
**Lưu ý:** 
    - Chỉ mục nào có chữ *Always Free-eligible* mới là miễn phí cẩn thận kẻo mất xiền oan nha!! Trong 30 ngày đầu, bạn có thể sử dụng 300$ credit mà oracle cho sẵn để tạo các Image, Shape thỏa thích.
    - Nếu bạn tạo 1 instance VM.Standard.A1.Flex với 96GB RAM sau khi hết 30 ngày dùng thử, instance của bạn sẽ bị **terminate**. Tuy nhiên đừng lo lắng, **Boot Volume** của bạn vẫn sẽ được giữ lại, bạn có thể sử dụng **Boot Volume** trước đó để tạo lại instance. Việc này giống như máy tính xịn của bạn bị bố mẹ tịch thu vì chơi game quá nhiều và thay bằng con máy cùi bắp chỉ để lướt web. Bạn tháo ổ cứng của máy cũ chứa đầy dữ liệu **bài tập**(ý mình là bài tập ý, là bài tập ý🤣) và lắp vào cái máy cùi bắp  😢😢😢.  
    
 - Tại mục **Add SSH keys**, thực hiện tải private key hoặc up public key để SSH vào VPS sau khi tạo.  
 ![](https://images.viblo.asia/c464a36a-a6f3-4762-b987-bb32c1904c3f.png)
 - Click "Create" để tạo instance.  
 ![](https://images.viblo.asia/ad7d8594-7ae8-4f4d-9428-936672f1b3df.png)
- Oke, giờ chỉ việc SSH vào VPS là xong.  IP và username để SSH ở trong mục *Instance access*
![](https://images.viblo.asia/ad6a6e73-e58b-437f-a0ef-c3f95b7c2621.png)  
- Tuy nhiên, trong lúc chơi đồ, các dân chơi có thể gãy cánh 🤪🤪🤪. Một lỗi điển hình thường gặp trong lúc tạo instance là **Out of Capacity**

# Ét o ét
## Fix "Out of Capacity"
- Đây là lỗi thường gặp khi tạo Instance đặc biệt là tại các vùng như Singapo, Japan,... Nguyên nhân gây ra lỗi là tài nguyên của oracle có hạn nhưng mà nhu cầu của người dùng lớn dẫn đến việc cạn tài nguyên. Tuy nhiên, [vấn đề ](https://blogs.oracle.com/cloud-infrastructure/post/moving-to-ampere-a1-compute-instances-on-oracle-cloud-infrastructure-oci) đang được giải quyết vì Oracle liên tục bổ sung dung lượng theo thời gian.  
- Khi tài nguyên được bổ sung, nó sẽ nhanh chóng bị khai thác, bạn sẽ không thể kịp tạo *instance* tại thời điểm tài nguyên được bổ sung do số lượng người dùng lớn. Vì vậy, **cách giải quyết** đó là viết tool tự động tạo *instance* khi tài nguyên được bổ sung.  Bạn có thể tự viết script tự động hoặc sử dụng các script do những người dùng khác lập trình. 
Sau đây, mình xin giới thiệu với các bạn một [repo](https://github.com/hitrov/oci-arm-host-capacity) trên github có thể giải quyết được vấn đề này: https://github.com/hitrov/oci-arm-host-capacity.  
![](https://images.viblo.asia/74bbb62d-e17c-473e-923f-bfdbe68c4f9f.png)  
- Đây là một công cụ vô cùng hữu ích, nó sẽ chạy theo schedule được cài đặt và thông báo về Telegram
- Về hướng dẫn sử dụng tác giả đã viết rất chi tiết và có cả [video](https://youtu.be/uzAqgjElc64) nên mình sẽ không nói lại.  
## Fix mở port trên oracle
Nếu bạn không thể mở công được trên VPS hãy thử chạy lệnh sau:  
```bash
sudo iptables-save > ~/iptables-rules
sudo iptables -P INPUT ACCEPT
sudo iptables -P OUTPUT ACCEPT
sudo iptables -P FORWARD ACCEPT
sudo iptables -F
sudo iptables --flush
```  
# Thành quả  
Sau 1 tuần chạy script cuối cùng mình cũng tạo được instance😋😋    
![](https://images.viblo.asia/ad26ebc4-8c64-4125-bd83-e11e8f82a3e6.png)  
![](https://images.viblo.asia/2ae131f0-590e-4161-8268-c20c6fa1aa8e.png)  
24GB RAM để làm gì cơ chứ.😏🥴

(**PS**: Thông tin về số lượng CPU, RAM,$,các mục miễn phí,... được đề cập trong bài viết này chỉ đúng với thời điểm hiên tại.)  
Cảm ơn các bạn đã theo dõi bài viết của mình!!! Chúc một ngày tốt lành😍 🥰 😘