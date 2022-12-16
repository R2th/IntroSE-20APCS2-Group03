### Giới thiệu
Những người làm trong lĩnh vưc lập trình như chúng ta, thì hệ điều hành sử dụng chủ yếu là Ubuntu. 
Hầu như chúng ta ăn ngủ cùng Ubuntu. 

Nhưng sau 1 thời gian dài sử dụng thì hệ điều hành của chúng ta thường bị giật lag, chậm, gây ức chế cho chúng ta là điều không tránh khỏi được. 

Vậy vì sao nó lại giật lag, chậm?. Có rất nhiều lý do

- Máy bạn yếu, cấu hình không đáp ứng đủ yêu cầu của ubuntu
- Bạn cài quá nhiều ứng dụng không cần thiết
- Bạn cài những ứng dụng nặng, tốn nhiều tài nguyên để khởi chạy và sử dụng

Trên đó là 1 số lý do gây chậm, lag, giật, gây ức chế cho chúng ta trong quá trình sử dụng. 

Vậy có cách nào để tăng tốc, giảm tải, giảm bơt tình trạng giật là, giảm bớt ức chế cho chúng ta không. Hãy cùng tham khảo những cách sau đây để khiến ubuntu của bạn hoạt động tốt hơn

### 1: Giảm thời gian tải grub mặc định
Khi khởi động ubuntu, thì bạn có 10s để chọn giữa các chế độ khởi động. 

- Chọn hệ điều hành để khởi động
- Chọn chế độ khôi phục

Nếu bạn không sử dụng hệ điều hành khác ngoài ubuntu trên máy thì bạn nen giảm grub này xuống thấp nhất để tăng tốc khởi động hơn

**Chú ý: Bạn nên cân nhắc tùy chọn này, vì đôi khi mình cần khởi động vào chế độ khôi phục, nếu load quá nhanh mình không kịp chọn thì cũng không tôt :)**

Để giảm grub thì chúng ta làm như sau

- Đầu tiên `sudo apt update` để ubuntu update thông tin mới nhất
- Chạy câu lệnh `sudo gedit /etc/default/grub &` để mở file config lên

![](https://images.viblo.asia/dc41cf58-d106-4b46-96f6-93c9396d1633.png)
Bạn tìm đến tùy chọn `GRUB_TIMEOUT=10` thay đổi từ 10 xuống 2. Không nên đổi xuống 0, vì như thế bạn sẽ không thể chọn load hệ điều hành khác hoặc load chế độ khôi phục khi khởi động máy
### 2: Quản lý các ứng dụng khởi động cùng máy tính
Khi bạn cài 1 ứng dụng, mặc định một vài cái sẽ được đưa vào chế độ khởi động cùng hệ điều hành ở lần khởi động tiếp theo. Đây thực sự là ác mộng. Nếu quá nhiều ứng dụng khởi động cùng lúc, thì bạn biết thế nào rồi đấy, giật lag, và chậm như rùa

Trong ubuntu nó cũng có trình quản lý ứng dụng khởi động cùng giống như trên window. Để mở ứng dụng này lên thì bạn nhấn phím window trên máy và gõ vào `Startup application` , trình quản lý ứng dụng khởi động cùng sẽ mở lên. 
![](https://images.viblo.asia/3952fa3e-83a2-4fd4-90a2-879b91223635.png)
![](https://images.viblo.asia/fd399a32-bd3d-47ba-bf0e-4526307ab28b.png)

Bạn hãy chọn ứng dụng nào được phép khởi động cùng hệ điều hành, ứng dụng nào không được khởi động cùng. 

Kiểm soát được điều này, bạn sẽ tiết kiệm được kha khá thời gian khi khỏi động đấy. 

Nhưng nếu bạn vẫn muốn một số ựng dụng khởi động cùng thì sao. Không có gì khó khăn cả, ta sẽ cho nó delay khởi động sau khi hệ điều hành khởi động song. Chọn ứng dụng cần khởi động, edit và thêm câu lệnh `sleep 30` vào trước command
![](https://images.viblo.asia/b93e611d-d29d-4546-8da1-685a45edd7a4.png)

Như vậy thì ứng dụng sẽ delay khởi chạy khi hệ điều hành khởi động, và bạn có thể thay giá trị 30 bằng giá trị bất kỳ

### 3: Cài preload để quá trình khởi động app được nhanh hơn
Preload là 1 ứng dụng chạy nền, nó phân tích hành vi của người dùng, và các ứng dụng thường xuyên chạy, để áp dụng tăng tốc vào chúng 
```
sudo apt-get install preload
```
Bạn nhớ khởi động lại để có thể sử dụng được preload nhé

### 4: Chọn khu vực máy chủ để cập nhập phần mềm
Chọn 1 server máy chủ chứa các bản cài đặt cập nhập tốt cũng giúp quá trình chạy nhanh hơn
Chọn `Software & Updates` 
![](https://images.viblo.asia/99ef0f6a-bcf0-47a8-885f-567c9a6e7c1e.png)
Ở mục download from chọn server for Viet Nam. Hoặc click vào tùy chọn sổ xuống, chọn other, nhấn `Select best Server` để hệ điều hành tự chọn cho bạn 1 server tốt nhất để tải bản cập nhập. Rồi nhấn choose server để lưu lại thôi![](https://images.viblo.asia/8f1dc186-8d3b-469f-86ab-b3c87b95c697.png)
### 5: dụng apt-fast thay cho apt-get 
Giống như apt-get, apt-fast cải thiện tốc độ tải xuống và cập nhập package từ nhiều kết nối cùng lúc
```
sudo add-apt-repository ppa:apt-fast/stable
sudo apt-get update
sudo apt-get install apt-fast
```
Sử dụng như sau
`sudo apt-fast install abcxyz` 

### 6: nhiệt máy tính
Máy tính quá nóng, là 1 vấn đề khác phổ biến với tất cả các dòng máy tính đang có trên thị trường. Máy quá nóng thì quá trình xử lý cũng bị chậm lại. 

Trên ubuntu có 1 ứng dụng quản lý điện năng cho các máy tính sử dụng ubuntu tên là TLP. TLP tối ưu hóa điện năng một cách tự động, giúp máy tính hạ nhiệt tự động. Để cài đặt và sử dụng chúng ta làm như sau
```
sudo add-apt-repository ppa:linrunner/tlp
sudo apt-get update
sudo apt-get install tlp tlp-rdw
```

Khởi động TLP lên và tận hưởng thôi
```
sudo tlp start
```

### 7: Lựa chọn sử dụng các app khác nhẹ hơn
Một số ứng dụng mặc định thì thường tốn rất nhiều tài nguyên khi sử dụng, và không phù hợp với những máy cấu hình thấp. 

Bạn có thể thay thế 1 số ứng dụng mặc định thành những ứng dụng khác nhẹ hơn

VD:  Có thể sử dụng `AbiWord` thay vì dùng `LibreOffice Writer`. Và còn nhiều ứng dụng nhẹ khác có thể thay thế được những ứng dụng mặc định

### Kết
Trên đây là 1 số cách để giúp máy tính sử dụng ubuntu có thể chạy nhanh hơn.  Các bạn hãy lựa chọn phương án phù hợp cho mình nhé