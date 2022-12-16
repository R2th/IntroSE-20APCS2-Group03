> Ở phần trước mình đã học về các thành phần trong JMeter và kết hợp các thành phần đó để viết ra một test plan hoàn chỉnh. Tuy nhiên trong thực tế, việc phải viết thủ công từng request một khá tốn thời gian và công sức do đó xuất hiện các công cụ giúp cho Tester có thể record lại các script một cách tự động. Điều này giúp giảm thiểu thời gian viết Test plan  và giảm được các sai sót khi tự viết request. Tuy nhiên mình vẫn để cách làm thủ công lên trước vì chỉ khi hiểu bản chất bạn mới hoàn toàn làm chủ được test plan của mình và tự tin sửa lại các request khi cần thiết chứ không chỉ là copy paste script một cách máy móc. 

### Cài đặt BlazeMeter
* Truy cập [Link](https://chrome.google.com/webstore/detail/blazemeter-the-continuous/mbopgmdnpcbohhpnfglgohlbhfongabi?hl=vi) 
* Chọn "Thêm vào Chrome"


 ![image.png](https://images.viblo.asia/59c9aa55-0c28-4fba-aa6e-e3ca3bc82fdb.png)
* Chọn thêm tiện ích


![image.png](https://images.viblo.asia/211e9229-3157-48fe-8507-9bf401d379dc.png)

### Step 1: Login BlazeMeter
* Click icon BlazeMeter ở góc trên bên phải trình duyệt Chrome

 ![image.png](https://images.viblo.asia/7409f4d1-baa8-4174-b704-bf96f5b89bfa.png)
 * Thực hiện sign up sau đó log in vào BlazeMeter


### Step 2: Record Script
 * Điền tên cho Script. Sau đó click vào button để bắt đầu record

  ![image.png](https://images.viblo.asia/940eaef9-5e6f-477b-a4d3-2522d6c8420f.png)
 
 * Thực hiện các thao tác cần test trên trình duyệt. BlazeMeter sẽ tự động lưu lại các request bạn đã thực hiện. Sau khi thực hiện các thao tác xong. Click vào Stop để dừng việc record
 
 ![image.png](https://images.viblo.asia/c7c8b233-78f7-48c6-aee7-1b7ad526e017.png)
 
 ### Step 3: Download Script
 * Click mũi tên sổ xuống cạnh Edit, chọn JMeter Script
 
 ![image.png](https://images.viblo.asia/78773569-99e7-48c2-a1a2-107c8e74fb02.png)
 
* Chọn các request muốn lưu. Sau đó click button .JMX để tải file

![image.png](https://images.viblo.asia/d95ec5ad-03b9-46d4-978a-569c9ac9fb61.png)
### Step 4: Import .JMX vào JMeter
* Click File chọn Open. Hoặc dùng tổ hợp phím Ctrl + O
* Chọn File .jmx mình vừa tải

![image.png](https://images.viblo.asia/b5478cc9-03c9-4dcc-9fcb-c2f7a89cd9dc.png)
* Bạn đã có toàn bộ các request mà mình cần. Ấn Play và tận hưởng nào

## Phần 3: Tôi đã dùng JMeter kiếm được 50.000.000 MARS AirDrop như thế nào ?