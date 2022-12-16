### 1. Network Load Balancing là gì?
Tìm đến bài viết này chắc hẳn các bạn cũng đã nắm được NLB là gì rồi, nhưng mình vẫn xin được viết ra đây những điều mình biết về NLB.
    Network Load Balancing theo khái niệm là cân bằng tải -- Nhưng theo ý hiểu của mình sau khi đã ngâm cứu và tham khảo mình xin được miêu tả một các rất dễ hình dung như sau:
    Lại nhờ các bạn hình dung đến mùa Noel, hình ảnh những chú tuần lộc kéo ông già Noel để đi phát quà. Mỗi chú tuần lộc mình coi là 1 server và được nối chung vào cái xe kéo ông già Noel. 
    Tức là nhiều con server sẽ được kết nối đến chung đến một con server được gọi là Load Balancer, nhiệm vụ chính của ông già Noel là chọn quà rồi phát quà, còn nhiệm vụ của Load Balancer là chọn server để điều hướng đến người dùng.
    Ở đây sẽ có bạn thắc mắc nha là những gói quà để trên xe của ông già Noel nhưng với NLB thì sao phần source sẽ để ở đâu? Thì đối với NLB các gói quà sẽ để trên từng con tuần lộc nhé, tức là nơi để cái source của chúng ta là trên các con server chứ không phải trên con Load Balancer nhé.
    ![](https://images.viblo.asia/bfd55ddf-6507-4d64-bb86-95c1cddce169.jpg)
### 2. Cài đặt Network Load Balancing.
##### Chuẩn bị:
Dưới đây là thực tế trên máy của mình nhe.
* 2 máy ảo VM-1 có IP: 10.10.10.36 và VM-2 có IP: 10.10.10.76
* 1 máy làm AD có DNS là DKCTEST.COM.
* Các máy nằm trong cùng Domain.
* Chú ý đến Firewall nha các chế!!!

##### Bắt đầu cài đặt:
**Bước 1: Cài đặt Network load balancing trên 2 máy ảo, VM-1 và VM-2.**

Mình hướng dẫn trên máy 2 máy 1 cài tương tự.

-----

Đầu tiên vào menu **Server Manager** sau đó chọn **Manage**=>**Add Roles and Features** như hình bên dưới.
![](https://images.viblo.asia/3b7ee8d9-eced-4ee1-b1f1-9f56e9d2ca1d.png)

Tiếp theo trên của sổ **Add Roles and Features** sau đó chọn tab **Features**
![](https://images.viblo.asia/b83afd37-330c-432b-be88-74a75060367d.png)

Check vào Feature **Network Load Balancing** sau đó chọn **Add Features**

![](https://images.viblo.asia/4276b6c0-f095-42ee-ab39-a49483548bdb.png)

Next đến hết rồi chọn Install
![](https://images.viblo.asia/17e1ae1a-dec5-4f83-b848-7eb0db50e80a.png)
Với máy 1 cài tương tự.

**Bước 2: Tạo host của 2 máy ảo trong DNS.**

Trên máy sử dụng làm AD mở **DNS Manager** => Chọn **DSN(DKCTEST.COM)** => **Forward lookup Zones**
![](https://images.viblo.asia/53388c41-4ecc-41cf-af26-8e324fdb6f9f.png)

Trên của sổ tạo mới Host bạn nhập thông tin tên host và địa chỉ ip trỏ đến máy VM-1.
![](https://images.viblo.asia/91adb381-54bc-4368-849c-6f3b2b4995c6.png)

**Làm tương tự với máy VM-2.**

**Bước 3: Tạo host Cluster để 2 máy ảo cùng trỏ đến**

Tiếp tục tạo thêm 1 host nữa host này trỏ đến IP ảo (IP này chưa tồn tại trong Domain) để về sau cấu hình cho 2 máy ảo cùng trỏ về địa chỉ này.
Ở đây mình đặt tên host là **www** với IP là 10.10.10.58 (Kiểm tra xem đã tồn tại IP chưa bằng cách sử dụng ping trong cmd).
![](https://images.viblo.asia/dbd24915-250d-48c6-ad86-afb6f03814c7.png)

**Bước 4: Sử dụng IIS để làm nơi chứa website**

Trên máy 1 mình tạo 1 website có nội dung là "Day la may 1"
![](https://images.viblo.asia/69ba7990-79c6-4db1-9c43-4441ee3a8b88.png)

Cũng tương tự trên máy 2 mình tạo 1 website có nội dung "Day la may 2"
![](https://images.viblo.asia/2f69d219-e693-4dfc-bc5e-6940dda5109b.png)

**Bước 5: Cấu hình Network Load Balancing trên 1 máy ảo**

Ở bước này chúng ta chỉ cần cấu hình NLB trên 1 con máy ảo là ok.

-----
Đầu tiên trong menu **Server Manager** => chọn **Tools** => **Network Load Balancing**
![](https://images.viblo.asia/531200be-a32a-48d9-a20d-ff46042c65b3.png)

Trên cửa sổ **Network Load Balancing** => chuột phải chọn **New Cluster**
![](https://images.viblo.asia/bd796627-611c-4d5c-b441-cfba32d8c53b.png)

Ở cửa sổ **New Cluster**

Nhập **Tên Host** của máy 1 => chọn **Connect**
![](https://images.viblo.asia/dae0a302-6217-4624-96c4-3fd18fda9d55.png)

Kiểm tra IP bên dưới xem đúng chưa. Sau đó **Next** tiếp.
Trên màn hình tiếp theo **New Cluster: HostParamaters** chọn **Next**
![](https://images.viblo.asia/9ad798a7-6673-47ce-a8c6-a8a9f4546bbe.png)

Tiếp theo nhập ip cluster được tạo ở **Bước 2** sau đó chọn **OK**. Sau đó **Next**.
![](https://images.viblo.asia/da9b14e9-76c0-43e9-aa9b-6f4bda1f4f83.png)

![](https://images.viblo.asia/50250b26-afea-4e39-9981-30419c9ac1a4.png)

Ở bước **Edit Port Rules** này chú ý **Port Range** để ý cái website mình tạo trên **IIS** có cổng là 80 nên mình để Port range từ 80 => 80;
![](https://images.viblo.asia/825a0aa5-bd51-442e-b729-4c7f85d99f04.png)

Sau khi đã cấu hình xong chọn **Finish**
![](https://images.viblo.asia/7522c7aa-6ad2-460f-8e92-c736b852e458.png)

Đợi 1 lúc thấy Cluster mình vừa tạo xong ở trạng thái **Converged** là OK.

Tiếp theo sẽ cấu hình để 2 máy ảo cùng kết nối được với nhau.
Tạo mới **Host To Cluster**
![](https://images.viblo.asia/923e9d05-3816-484e-8f95-2f4037bb25b8.png)

**Tên Host** mình sẽ nhập tên host của máy 2 => sau đó chọn **Connect** => **Next**
![](https://images.viblo.asia/d1d3a370-fa86-4db2-bbd2-2aa7417af540.png)

Trên cửa sổ **Add Host to Cluster: Host Parameters** chọn **Next** tiếp 
![](https://images.viblo.asia/ea87ee58-9ce9-4ff8-947b-d3248c0e6351.png)

![](https://images.viblo.asia/1cd98e2b-cf0c-440c-995a-e4bd0be41d83.png)

![](https://images.viblo.asia/2b923b90-38c2-4c1c-a7f0-9c6476877672.png)

Vậy là đã cấu hình xong. Giờ chúng ta test thử nhé.

Chúng ta test bằng cách tắt mạng hoặc tắt 1 trong 2 máy, đừng tắt cả 2 máy nhe. hehe
![](https://images.viblo.asia/7a7f1e28-08f0-495e-a56c-6c4c2081a4eb.png)

Sau khi mình tắt mạng máy 2
![](https://images.viblo.asia/406c8e0b-3362-46e4-b67f-41c610f0a775.png)


Chúc các bợn thành công!!