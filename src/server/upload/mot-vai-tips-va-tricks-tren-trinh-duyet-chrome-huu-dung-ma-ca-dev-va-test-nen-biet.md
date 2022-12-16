### Một vài Tips và Tricks trên trình duyệt Chrome khá hữu dụng mà cả Dev và Tester nên biết!
![](https://images.viblo.asia/5bfc116e-d935-4a90-979f-d124b8afad1f.png)

### 1. Điều chỉnh tốc độ internet trên trình duyệt  
Cái này trước giờ mình cũng ít khi sử dụng nhưng đợt vừa qua nó tại tỏ ra khá hiệu quả trong việc debug của mình :D  
Nói là điều chỉnh tốc độ mạng thì nghe có vẻ chưa đúng.  
Nên mình sẽ giải thích thêm bằng tình huống bên dưới.   
**Tình huống**:   
Gần đây do covid nên mọi người được làm remote nhiều, dẫn tới tốc độ mạng của mỗi cá nhân trong team là khác nhau.  
Team của mình gặp ngay một cái lỗi là bên bạn dev thì chạy ngon, còn bên bạn tester thì hay sảy ra lỗi.(thi thoảng mới tái hiện được :( )  
Mặc dù môi trường test là giống nhau.  
Ca bệnh này mình đoán bừa là tốc độ internet.   
Và lỗi có khả năng do trong code có 1 vài chỗ đang bị chạy bất đồng bộ.  
Với tốc độ mạng nhanh thì nó có thể chạy đồng bộ, còn chậm thì nó sẽ là bất đồng bộ.  
Nói thằng ra là trong code có vài chỗ thiếu async await :D   
Và mình có thử chuyển tốc độ mạng của mình về tốc độ 3G thì tái hiện được ngay. Ahihi

Cách điều chỉnh tốc độ mạng về slow 3G trên trình duyệt
Nhấn F12 > chọn vào tab Network > Chọn vào biểu tượng dropdown > chọn slow 3G
![](https://images.viblo.asia/efbf5e6f-a835-448a-a88f-7e646c141dd6.PNG)

Ahihi, đôi khi mạng yếu một tí cũng dễ tìm bug hơn nhỉ, giờ thì các chị em tester team mình hay sài chức năng này để tìm bug **async await**  của mấy anh Dev lắm :D  

### 2. Bật chế độ design mode trên trình duyệt
Cách bật: 
Nhấn F12 > chọn vào tab console > gõ lệnh ``` document.designMode="on" ``` > ấn Enter
![](https://images.viblo.asia/2af81b0c-873e-46ac-88d0-ecfd0bc35c46.PNG)  
Bây giờ bạn có thể sửa giao diện trang web tùy thích. Chỉ cần click vào chỗ muốn sửa và edit thôi.   
Demo: https://gyazo.com/8279f0510e19e1cc123940c43d4da192 
Tất nhiên bạn có thể làm nó bằng nhiều cách khác thư inspect element  >  edit element nhưng mình thấy cách này tiện hơn khá nhiều.  
Mình hay dùng cách này trong quá trình demo với khách hàng và nhận được góp ý trực tiếp, mình sẽ sửa luôn để khách hàng xem luôn.   
Sau đó capture lại rồi gửi cho đội dev sửa lại.

### 3. Chụp lại full màn hình website
Cách chụp:
Nhấn F12 > chọn vào biểu tượng 3 chấm bên cạnh biểu tượng setting > Chọn run command > tìm kiếm command theo từ khóa "capt.." > Chọn capture fullsize screen shot
![](https://images.viblo.asia/32fab71d-f0b3-4727-b2e1-039be4dcbe49.PNG)
Tiếp:
![](https://images.viblo.asia/70a9710a-3ed5-4ff0-9a72-0e484f6e5365.PNG)

Command này sẽ chụp ảnh và lưu ảnh ra thư mục download của bạn.
Trc kia mình hay cài thêm phần mềm của bên thứ 3 để chụp, nhưng sau thấy ko cần lắm nên mình chuyển sang dùng các này =))

Có khá nhiều chức năng thú vị ở trình duyệt mà mình và các bạn có thể còn chưa biết, nên mong các bạn chia sẻ thêm với mình dưới comment nhé.  :kissing_heart:  

**Mình sẽ thường xuyên update post này, nên bạn nào thấy hay nhớ *clip hoặc vote* bài viết lại để theo dõi thêm nhé**  
Cảm ơn các bạn đã dành thời gian đọc bài viết của mình <3 <3 <3