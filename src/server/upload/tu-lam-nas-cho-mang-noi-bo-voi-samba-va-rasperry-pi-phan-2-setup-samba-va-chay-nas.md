Chào mọi người, lại là mình đây, mong là tất cả mọi người đang đọc bài này đều khỏe mạnh và bình yên giữa mùa dịch bệnh này. Để có thể nhanh chóng vượt qua đại dịch thì mọi người cũng nhớ tuân thủ các khuyến cáo của bộ y tế và đặc biệt là phải tuần thủ 5K nha.

Kỳ trước mình đã có việt phần một của loạt bài tìm hiểu và tự làm NAS cho mạng nội bộ với Samba và Rasperry Pi rồi. Thì phần 1 chúng ta chủ yếu chỉ dừng ở việc setup và first boot cho Pi thôi, hôm nay chúng ta sẽ đến với phần chính của nội dung series lần này đó là setup Samba để tiền hành chạy NAS của chúng ta thôi nào. Mình hy vọng sau bài này mọi người sẽ có thể tự setup cho mình một con NAS để sử dụng trong mạng nội bộ, tại nhà hoặc workspace của mọi người.

Bật mí cho mọi người là cách cài đặt cũng như setting để sử dụng Samba cực kỳ dễ nha, với những bạn không có kiến thức chuyên môn nhiều thì vẫn có thể tự mày mò và làm được, giờ thì bắt đầu thôi nào!

# 1. Cài đặt và setting cho Samba Server
Mọi người còn nhớ cách SSH vào Pi mà mình đã đề cập ở phần 1 chứ? Lần này chúng ta cũng sẽ làm y như vậy để truy cập vào Pi nhé. Sau khi đã truy cập vào Pi thành công thì giờ chúng ta cùng đi vào phần chính nha.

### 1.1 Cài đặt Samba Server trên Ubuntu

Trước tiên để có thể host được Samba trên Rasperry Pi thì chúng ta cần cài đặt Samba Server nhé mọi người. Trên Ubuntu để cài đặt Samba thì các bạn chạy giúp mình 2 dòng lệnh dưới nhé, mọi người sử dụng Linux thì chắc không còn xa lạ gì rồi.

```
sudo apt update
sudo apt install samba
```

Ziiip, cài xong thì chúng ta nên check xem thử Samba đã hoạt động bình thường chưa nha mọi người, chúng ta chạy lệnh `samba --version` thì sẽ biết được đã cài samba thành công chưa và version của samba luôn  

Của mình đang là 

```
Version 4.11.6-Ubuntu
```

"Vậy là xong phần cài đặt rồi, giờ chạy NAS và sử dụng thôi nhờ?".

Chắc hẳn đến đây nhiều bạn sẽ có suy nghĩ như bên trên, nhưng khoan đã bạn ơi, dừng lại khoảng chừng là 2 giây. Chúng ta còn một vài steps setting cho Samba Server nữa trước khi có thể chạy NAS nha, cùng mình đi tiếp vào phần setting thôi nào.

### 1.2 Setting Samba Server

Trước tiên chúng ta sẽ tiến hành tạo một đường dẫn để Samba có thể share ra cho các thiết bị trong mạng nội bộ cùng truy cập. A piece of cake, yeah? :sunglasses:

```
mkdir /home/<username>/shared-folder
```

Mình vừa tạo một thư mục shared-folder ở user mà mình đang đăng nhập trên Pi, mình xài luôn user ubuntu mặc định, và sẽ thao tác chia sẽ cũng như setting cho nó luôn, mọi người nhớ check username mà mình đang đăng nhập để tránh config nhầm nha. Tiếp theo đến phần config Samba.

File config của Samba mọi người có thể tìm thấy ở đường dẫn này nhé `/etc/samba/smb.conf`. Cụ thể thì chúng ta sẽ phải thêm thư mục vừa tạo cùng 1 vài config khác của Samba để nó có thể biết thư mục đó nằm được chia sẻ nằm đâu, chia sẻ với tên gì, hay có quyền hạn với user truy cập như nào, blah blah blah.

Để kể hết thì rất là nhiều, thế nên hôm nay mình sẽ chỉ chia sẻ cho mọi người những config cơ bản để làm quen trước đã nhé. Vì thật ra mình cũng đã biết hết đâu :satisfied: Không dài dòng nữa, bắt tay vào làm thôi.

```
sudo nano /etc/samba/smb.conf
```

Sau đó mình sẽ thêm vào config ở cuối file như bên dưới

```
[Shared Folder]
    path = /home/ubuntu/shared-folder
    read only = no
    browsable = yes  
```

Xong rồi save lại nhé mọi người. Và mình sẽ giải thích qua một chút về những config chúng ta vừa thêm vào

* `[Shared Folder]`: Trong [] là tên của mục chia sẻ thôi, đặt tên gì thì tùy mọi người thôi :D
* `path`: Đường dẫn thực mục chúng ta muốn chia sẻ, ở đây mình dùng thư mục shared-folder vừa tạo ở trên. Username thì mỗi mãy mỗi khác nên mọi người check lại username mà mình đang login trên Pi nhé.
* `read only`: Đây là config quyền thay đổi, chỉnh sửa nội dung có trong thư mục share. Ở đây mình set là `no` vì mình muốn thao tác được trên thư mục share đó ở những thiết bị khác.
* `browsable`: Ở đây nếu set là yes thì thư mục share của chúng ta sẽ được add vào list các phân vùng chia sẻ có trong mục Network của các ứng dụng file manager, nhằm mục đích cho phép truy cập nhanh hơn.

Ở trên như mình đã đề cập thì chỉ là những config cơ bản thôi, còn rất nhiều nữa, ở phần sau mình sẽ chia sẻ thêm một vài config tiêu biểu, ngoài ra thì mọi người có thể tìm hiểu thêm ở nhiều nguồn khác nhé ;) 

Tiếp theo, chúng ta tạo user account và đặt password trên Samba. Để làm việc này thì các bạn chạy lệnh
```
sudo smbpasswd -a <username>
```
Với username là tên user mà bạn muốn tạo, lưu ý là user này phải tồn tại trong hệ thống của Ubuntu nhé. Xong Samba sẽ yêu cầu bạn nhập password cho account vừa tạo, lát nữa chúng ta sẽ dùng account này để truy cập trên các thiết bị khác luôn nên mọi người đừng quên mật khẩu nhé :joy:

Config xong xuôi cả thì restart lại Samba. Mọi người nhớ là cứ mỗi lần thay đổi config thì phải restart lại nhé ;)

```
sudo systemctl restart smbd
```

:tada: All done!!! Dễ quá phải không mọi người. Chuẩn bị hưởng thụ thành quả nào :tada:

# 2. Truy cập thư mục share
Một lưu ý trước khi tiến hành truy cập là thiết bị hiện thời của mọi người phải chung Network với Pi nhé. Nếu không thì không truy cập được đâu vì chúng ta đang làm cho mạng nội bộ mà ;)

Mình xài chính là Ubuntu, Windows và Android nên sẽ chỉ demo trên 3 hệ điều hành này thôi. Nếu mọi người đang sử dụng các HĐH khác thì tham khảo thêm các nguồn khác nhé.

### 2.1 Truy cập trên Ubuntu
Trên Ubuntu thì các bạn có thể làm theo các step bên dưới để truy cập vào phân vùng share trong network nhé.

1. Truy cập vào ứng dụng Files (Ubuntu file manager mặc định).
2. Chọn mục Other Locations.
3. Trong phần Connect to Server nhập địa chỉ server có dạng: `smb://<địa chỉ IP của Pi trong mạng nội bộ>` ( Giao thức kết nối của chúng ta sẽ là SMB).
4. Tại đây bạn sẽ thấy 2 phân vùng chia sẻ là print$ (dùng cho mục đích in ấn, chúng ta sẽ bỏ qua thằng này) và tên phân vùng mà chúng ta vừa tạo ở trên.
5. Chọn phân vùng vừa tạo và tiến hành đăng nhập với account đã đăng ký với Samba trước đó. (Vì chúng ta không setting Workgroup nên cứ để giá trị default là WORKGROUP thôi nhé).
6. Hooray!! Vậy là truy cập thành công rồi, bây giờ mọi người có thể thao tác bình thường trên phần vùng mà chúng ta đã chia sẻ rồi nha ;)

Mình cũng có kèm một video demo lại các step bên dưới để mọi người tham khảo nhé.

{@embed: https://vimeo.com/584429927}

### 2.2 Truy cập trên Windows
Trên Windows thì sẽ hơi khác một chút so với Ubuntu nhé mọi người, mình đang sử dụng Windows 10 nên sẽ mô tả và demo trên Windows 10 thôi, ở các bản Windows khác thì mọi người tìm hiểu thêm nhé.

1. Mở ứng dụng File Explorer.
2. Nhấp chuột phải và chọn Add Network Location.
3. Nhấn Next để tiếp tục.
4. Tiếp theo sẽ đến màn hình nhập địa chỉ của phân vùng đang chia sẻ.
5. Trong mục Internet or Network Address, mọi người nhập địa chỉ với format như này nhé `\\<địa chỉ IP của Pi\<tên của phân vùng chia sẻ>`.
6. Ở màn hình tiếp theo chúng ta sẽ đặt tên cho phân vùng vừa add, đặt tên gì cũng được nhé.
7. Sau đó các bạn sẽ được yêu cầu đăng nhập account, phần này thì tương tự như bên Ubuntu thôi, nhập đúng thì các bạn đã thêm và truy cập thành công phần vùng chia sẻ rồi đó.

Dưới đây là video demo trên Windows 10.

{@embed: https://vimeo.com/584479475}

### 2.3 Truy cập trên Android
Trên Android thì mỗi nhà sản xuất sẽ có trình duyệt file đi kèm khác nhau. Như mình dùng Samsung thì họ có cung cấp chức năng truy cập Network Storage trên trình duyệt file mặc định của máy luôn nên không cần cài thêm gì cả. Nếu máy các bạn không có thì cũng có thể tìm các ứng dụng trình duyệt file khác nha, mình nhớ là có Xplore hay ES File Manager có hỗ trợ thì phải.

Bên dưới là video mình demo trên máy Samsung, cách truy cập mình nghĩ là cũng tương tự nhau thôi không khác nhiều lắm đâu.

{@embed: https://vimeo.com/584432541}

Có một vài lưu ý.

* *Một số trình duyệt file sẽ yêu cầu mọi người nhập port của SMB. Thì mặc định sẽ là 445 nhé mọi người.*
* *Cũng giống như khi kết nối bằng Ubuntu thì chúng ta cũng chọn giao thức kết nối là SMB nhé.*
* *Như mọi người thấy thì trên Android khi xem hoặc chỉnh sửa file thì thiết bị sẽ tiến hành tải về trước. Cái này mình cũng chưa tìm hiểu rõ nhưng có vẻ là tùy vào trình duyệt nữa.*

# 3. Tổng kết
Vậy là chúng ta vừa đi qua cách setup Samba cho Pi cũng như truy cập vào phân vùng share đối với các thiết bị trong mạng nội bộ. Tuy nhiên vẫn còn một vài vấn đề như bên dưới

* Hiện tại chỉ chia sẻ được thư mục có trong hệ thống. Nếu muốn sử dụng các thiết bị lưu trữ ngoài gắn trên Pi như USB hay External Drive để làm phân vùng share thì sao?
* Những config tiêu biểu cho Samba.

Ở phần sau mình sẽ chia sẻ thêm về 2 vấn đề trên cũng như một use case mà mình hay sử dụng với NAS.
Bài viết cũng dài rồi nên chúng ta sẽ tạm dừng ở đây thôi. Mong là qua bài chia sẻ này mọi người đã có thể setup và truy cập thành công NAS của mình. Nếu có thắc mắc hay cần hỗ trợ gì thì đừng ngại comment vào bên dưới nhé.

À chia sẻ thêm cho mọi người thì bên dưới là hình full không che của em Pi nhé :drooling_face:, bên cạnh là con Jetson Nano của Nvidia, con này mình mới mua nên chưa có thời gian vọc nhiều, hy vọng có thể làm được gì đó hay ho để chia sẻ với mọi người ở những bài sau, giờ thì chào tạm biệt mọi người tại đây thôi.

![](https://images.viblo.asia/6bf2ed90-f4de-4cef-b104-8a86f2dcec4b.jpg)

Hẹn gặp mọi người ở phần sau. Stay Tuned!!!!