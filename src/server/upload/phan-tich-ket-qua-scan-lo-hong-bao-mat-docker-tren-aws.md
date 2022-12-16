Bất chợt một ngày, bạn nhận ra Image hiện tại của mình đang bị Amazon ECR Basic Scan tìm ra một loạt các lỗ hổng bảo mật : 1 CRITICAL, 8 HIGH... 
Phải làm sao phải làm sao @@ ? Vậy thì hãy cùng thử đọc bài viết này để tìm cách giải quyết vấn đề đó nhé 🤗,  Gét go!
# 1 Các khái niệm cần biết trước khi đọc bài 
1. **Amazon ECR Basic Scan**: Dịch vụ scan lỗ hổng bảo mật của Image được lưu trữ trên ECR của AWS, sử dụng các dữ liệu lỗ hổng bảo mật được public tại CVE (vì vậy bạn sẽ thường thấy các lỗ hổng AWS tìm ra sẽ có key dạng CVE-year-code)
1. **CVE**: Viết tắt của Common Vulnerabilities and Exposures, là một danh sách các lỗi bảo mật máy tính được tiết lộ công khai. Nhằm giúp các chuyên gia CNTT nỗ lực cùng phối hợp để ưu tiên và giải quyết các lỗ hổng này, để làm cho hệ thống máy tính an toàn hơn.
2. **LTS** : là từ viết tắt của “Long-term support”, là chính sách hỗ trợ dài hạn đối với các phầm mềm (Ví dụ như hệ điều hành Linux Mint phiên bản 13 là phiên bản Hỗ trợ dài hạn LTS, thời gian hỗ trợ phiên bản này kéo dài từ 3 đến 5 năm, trong khi phiên bản 16 không phải là phiên bản LTS sẽ chỉ có thời gian hỗ trợ 6 tháng.)
# 2 Phân tích các lỗ hổng
Image hiện tại mình đang dùng được base trên image **php-8.0-fpm-bullseye** (OS image:  debian:bullseye-slim) vì vậy, m sẽ cùng tìm hiểu và phần tích các lỗi hổng trên image này!

Dưới đây là đánh giá tổng quan các lỗ hổng AWS đã scan ra của mình:

| Mã lỗ hổng | Package name| Độ quan trọng | Phân loại của Debian |Kết luận của mình | Status
| -------- | -------- | -------- | -------- | -------- | -------- |
| CVE-2019-19814 |	linux:5.10.127-1 | CRITICAL |	no-dsa / Minor issue   |	Bỏ qua   |	Close
| CVE-2019-8457 |	db5.3:5.3.28+dfsg1-0.8 |	HIGH |	no-dsa / Minor issue |	Bỏ qua   |	Close
| CVE-2022-24765 |	git:1:2.30.2-1	| HIGH |	no-dsa / Minor issue |	Bỏ qua   |	Close
| CVE-2022-29187 |	git:1:2.30.2-1	| HIGH |	no-dsa / Minor issue |	Bỏ qua   |	Close
| CVE-2022-1679 |	linux:5.10.127-1 |	HIGH |	 |	Bỏ qua(Vấn đề nhỏ vì phải liên quan đến 1 thiết bị wireless đặc biệt)	  |Close
| CVE-2013-7445 |	linux:5.10.127-1 |	HIGH |	ignored / Minor issue, requires invasive changes |	Bỏ qua	  |Close
| CVE-2021-3847 |	linux:5.10.127-1 |	HIGH |	 |	Bỏ qua(Ảnh hưởng nhỏ đến kiến trúc hệ thống)	  |close
| CVE-2019-15794 |linux:5.10.127-1 |	HIGH |	 (fixed bookworm)   |		Bỏ qua(Ảnh hưởng nhỏ đến kiến trúc hệ thống)	   | Close
| CVE-2021-39686 |	linux:5.10.127-1 |	HIGH |	(fixed buster,bookworm)  |	Nếu bullseye k sử dụng kernel 5.15 thì có khả năng k được fix	   | Open

Bây giờ hãy cùng đi vào phân tích chi tiết  một vài lỗ hổng.

## **CVE-2019-19814**

https://security-tracker.debian.org/tracker/CVE-2019-19814

Vì hệ điều hành của Image mình đang dùng là base trên Debian bullseye nên mình sẽ focus thông tin vào bullseye và thấy như sau :
* Status: vulnerable
* Notes: [bullseye] - linux <no-dsa> (Minor issue)
* Fixed version: unfixed 
![image.png](https://images.viblo.asia/e681f49a-7ebd-484e-8cbf-4c8910f374a4.png)
    
**Kết luận** : Debian bullseye vẫn **chưa có bản update để fix lỗ hổng** này, hơn nữa ở phần phân loại đánh giá (Notes), nó được gắn tag là no-dsa (Lỗ hổng khó khai thác trực tiếp. Các sự cố không xảy ra nếu không có sự can thiệp vào phía infra) -> được đánh giá là lỗ hổng nhỏ (Minor issue) -> **chưa thể fix được.**
    
   ### Ngoài lề: 
  Debian sẽ k fix tất cả các lỗ hổng được đưa lên CVE, họ sẽ đánh giá chúng trước và ms quyết định có fix hay không, dưới đây là 1 vài tag được sử dụng khi phân loại và đánh giá:
    
1. **postponed** : Các vấn đề nhỏ không khẩn cấp và có thể được khắc phục sau. Tuy nhiên, cũng có trường hợp khi LTS không có bản phát hành hỗ trợ=> các vấn đề nhỏ chồng chất lên nhau và những vấn đề nghiêm trọng tồn đọng xảy ra.
1. **ignored**: Có một lý do chính đáng và mạnh mẽ để không sửa chữa
1. **not-affected**: Các vấn đề không liên quan đến các phiên bản phát hành LTS tương ứng
1. **no-dsa**: Một vấn đề khó khai thác trực tiếp. Các sự cố không xảy ra nếu không có sự can thiệp đến hạ tầng infra
    
## CVE-2021-3847
   https://security-tracker.debian.org/tracker/CVE-2021-3847
* Status: vulnerable 
* Notes: chưa có phân loại
* Fixed version: unfixed 

![image.png](https://images.viblo.asia/e6efa1f4-cd05-4d3b-a4c2-6dcca35d1154.png)
  
  **Kết luận** : Debian bullseye vẫn **chưa có bản update để fix lỗ hổng** này, hơn nữa ở phần Notes cũng chưa có đánh giá gì -> Lỗ hổng này là lỗ hổng tại thời điểm mount file file system. **Ứng dụng hiện tại của mình chạy trên ECS sử dụng s3 và Database Manager -> không thực hiện mount file file system**, do đó tác động được đánh giá là nhỏ. -> **chưa thể fix được.**
    
# 3 Thực hiện thử update hệ thống hiện tại
 Sau khi cứ đánh giá lần lượt như vậy và đưa ra được 1 bảng đánh giá tổng quan ở trên, thì mình bắt tay vào thử nâng cấp hệ thống hiện tại và so sánh kết quả.
    
Image hiện tại của mình base trên ` php-8.0-fpm-bullseye`, tương ứng vs image đó đang có 1 vài  image nâng cấp version php được công khai như dưới đây .
    
Mình sử dụng trivy và scan 1 lượt số lượng các lỗ hổng  trên từng image (ở đây mình gắn tag ignore-unfixed để loại bỏ đi số lượng các lỗ hổng sẽ k được hệ điều hành fix) thì được kết quả như dưới đây:
* php-8.0-fpm-bullseye: 0
* php-8.0.22-fpm-bullseye: 1
* php-8.0.23-fpm-bullseye: 0
* php-8.1-fpm-bullseye: 0
* php-8.1.10-fpm-bullseye: 0

 **Do đó、nếu liên quan đến 8.0 thì có php-8.0.23-fpm-bullseye là ok、8.1 thì có php-8.1.10-fpm-bullseye -> Suggest nâng lên 1 trong 2 thằng này。(version mới + k có lỗ hổng nào nghiêm trọng)**.
    Ngoài ra khi nâng lên bạn cũng cần đánh giá lại 1 lượt các package có liên quan xem có bị ảnh hưởng gì k.

 Tham khảo về trivy: 
    
   https://medium.com/how-tos/how-to-check-your-docker-images-for-vulnerabilities-287bd61aacc6
     https://aquasecurity.github.io/trivy/v0.31.3/
    
   # 4 Kết luận
   Túm lại là sau khi có được 1 list các lỗ hổng bảo mật của Image hiện tại thì việc chúng ta cần làm là:
1.    Tổng hợp lại cấu hình base của hệ thống hiện tại như OS, verison ngôn ngữ ....
1.    Dựa vào thông tin hệ thống hiện tại đánh giá lại 1 lượt sự ảnh hưởng và hướng giải quyết của các lỗ hổng hiện tại.
1.    Bắt tay vào test thử và đưa ra kết luận phù hợp
    
   Bài viết này mình tham khảo hoàn toàn ở https://zenn.dev/starnishi/scraps/f1578f26951399 khi dự án của mình cũng đang gặp vấn đề tương tự, hi vọng sẽ giúp ích cho mọi người.