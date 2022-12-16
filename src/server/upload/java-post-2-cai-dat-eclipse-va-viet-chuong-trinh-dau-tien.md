Hi all,

Lại là mình đây, sau nửa ngày hì hục lục lọi, soi mói, hỏi hết bác google, rồi lại forum cuối cùng mình cũng cài đặt và sử dụng được nó. lần đầu mà lúc nào cũng đau lần sau sẽ xướng :D

Lan man đến đây thôi, sau đây mình sẽ hướng dẫn các bạn cài đặt eclipse và viết đại khái mấy cái chương trình ( gọi thế cho hoành tráng) để test cái IDE này cùng theo dõi nhé 

### Cài đặt Eclipse (window)

Cài đặt thôi mà, cần gì nhìn đâu next là được. các bạn chú ý là cần cài đặt java trước nhé, nào bắt đầu thôi: 

không biết sao chứ cài gì thì không biết thì ta tra google, 

![](https://images.viblo.asia/45bb56ca-6e2b-4ef9-a6c5-fd067833229e.png)

Tiếp theo chọn OS và phiên bản phù hợp, mình dùng window X64 (ai không biết có thể check bằng cách mở cửa sổ run `window+R` => nhập `dxdiag` và nhấn Enter nhé) nên sẽ chọn window X64 nhé :D

![](https://images.viblo.asia/41aaa39c-340e-4e1f-adc5-57da7b33aea7.png)

Cuối cùng ta chờ để browser download xong là oki, 


### Đến bước install nào

Các bạn click chuột vào eclipse vừa download và giải nén ra nhé, vì bản t download là bản eclipse portable nên chỉ cần giải nén là sử dụng ngay.

![](https://images.viblo.asia/ddd476e1-8485-4a7b-8217-b47ad36e20fb.png)

Giờ thì vào folder eclipse thôi nào. Tiếp theo click vào eclipse.exe để mở ứng dụng nhé

![](https://images.viblo.asia/4253fb58-77be-4c07-8b25-6c5d0b1f110d.png)

Đây là lần đầu mở dúng dụng nên chúng ta cần chọn nơi lưu workspace (các bạn có thể chọn vào tickbox để không show popup cho lần sau), các bạn chọn nơi lưu nhé! ở đây mình để mặc định. Sau khi chọn các bạn click OK

![](https://images.viblo.asia/9b0b0fe5-27f8-492a-acfb-7dd174bcff48.png)

Install done rồi đấy

![](https://images.viblo.asia/61787de8-54b5-4fc0-ae95-9707280ddfef.png)

Đây là giao diện ban đầu của eclipse.

### Cùng thử tạo một chương trình đầu tiên nào

Từ giao điện của eclipse ta chọn File -> Java Project

![](https://images.viblo.asia/75cc9e8b-a185-4195-9efe-10d5706f38a9.png)

Điền Project name và nhấn Finish nhé

![](https://images.viblo.asia/67d6a4fc-a9c3-4bb9-a790-070ccc5e9acd.png)

Vậy là chúng ta đã tạo được một project rồi đấy, giờ cùng tạo main class cho project nhé. lét gô

Tiếp tục nhấn chuột phải vào project vừa tạo chọn new=>class

![](https://images.viblo.asia/ca72c52d-e01c-46c7-8fdf-ea372e98000a.png)

Nhập đầy đủ nhứ hình nhé:

- Package: 
  VD: demo.java.hellowourld
- Name(Tên class): main
- Tích vào `public static void main(String[] args)` để incluce method main nhé

![](https://images.viblo.asia/29ebd949-3ded-4ae6-841a-db6d196be157.png)

### Hướng dẫn add thư viện
Nhiều khi những cài đặt default sẽ không tự động add jdk đã cài, nên khi run sẽ báo lỗi, giờ mình sẽ hướng dẫn các bạn add jdk vào cho project trong eclipse

![](https://images.viblo.asia/5755b9aa-cc9c-4571-ad1e-ee534afbf398.png)

Đầu tiên click chuột phải vào project chọn Properties, tiếp theo chọn như hình nhé

![](https://images.viblo.asia/d52ca5bd-b95f-40b7-8746-698a6707cfec.png)

Tiếp tục chọn như dưới nhé:

![](https://images.viblo.asia/eafe0a6e-f592-474e-853d-1eb8b5b359c3.png)

Add jdk xong rùi ta cùng run thử xem thế nào, các bạn click chuột phải vào main class chọn Run As => Java Application

![](https://images.viblo.asia/f0da473a-e2d7-4e22-b8cd-91c192a64277.png)

Sau khi hoàn tất chúng ta đã viết được chương trình đầu tiên rồi nhé. Dưới đây là thành quả :

![](https://images.viblo.asia/bfb83319-9c4d-4a47-b993-3a87914fcb64.png)

Sau bài viết này mình và các bạn mới chưa biết gì về java đã có thể tạo ra chương trình đâu tiên của mình và bắt đầu học java được rồi nhé, Từ bài viết sau mình sẽ viết về những thứ cơ bản của một ngôn ngữ lập trình nhé

Cảm ơn các bạn đã theo dõi,
Thanks kiu everyone :D