Năm 1988, Barbara Liskov đã phát biểu những điều sau như một cách để định nghĩa các subtype:

> Nếu đối với mỗi đối tượng *o1* thuộc kiểu **S** có một đối tượng *o2* thuộc kiểu **T** sao cho tất cả các chương trình **P** được định nghĩa theo **T**, thì behaviour của **P** không thay đổi khi *o1* được thay thế bằng *o2*, thì **S** được coi là một subtype của **T**.

Nghe mấy cái này mình lại nhớ về mấy cái định lý toán học ngày xưa, nó hàn lâm quá nhưng đôi khi việc định nghĩa cần phải chặt chẽ nên nó vậy.

Nếu chúng ta liên hệ đến tính kế thừa trong lập trình hướng đối tượng rồi đọc lại định nghĩa trên thì sẽ hiểu ngay thôi. Vì đây là một nguyên tắc trong thiết kế nên nó cần được phát biểu tổng quát để cho những trường hợp rộng hơn.

Dịch ra từ chính cái tên, thì đây về cơ bản là nguyên tắc của việc thay thế được tạo ra bởi ông Liskov. Để hiểu về nguyên tắc này, chúng ta hãy cùng xem xét một số ví dụ sau.

## Cách sử dụng đúng đắn tính Kế thừa (Inheritance)

Giả sử chúng ta có một class tên là `License` như hình dưới đây. Class này có một method tên là `calcFee()`, mà được gọi bởi ứng dụng `Billing`. Chúng ta có 2 subtype của `License`: `PersonalLicense` và `BusinessLicense`. Các class này sử dụng các thuật toán khác nhau để tính phí license (kiểu phí bản quyền/giấy phép cho bạn nào không biết license là cái gì).

![](https://images.viblo.asia/ad1928d5-706c-44bd-91b0-04c1c3be4051.png)

Thiết kế này được nói là tuân theo LSP (Liskov Substitution Principle) vì behaviour của ứng dụng `Billing` không bị phụ thuộc vào việc ta sử dụng subtype nào trong hai cái trên. Cả hai đều có thể thay thế cho `License`.

## Vấn đề về Square và Rectangle

Một ví dụ kinh điển về vi phạm LSP là mối liên kết giữa Square (hình vuông) và Rectangle (hình chữ nhật).

![](https://images.viblo.asia/2278bf9a-eff1-41e2-914c-fe4718824e1f.png)
Chúng ta đều biết trong toán học thì hình vuông được coi là một hình chữ nhật. Cách hiểu này gây nên cách định nghĩa subtype như hình trên.

Thực tế, việc định nghĩa `Square` là một subtype của `Rectangle` là không đúng cho lắm. Bởi vì `width` và `height` của `Rectangle` có thể khác nhau còn của `Square` thì không thể.

Và vì `User` nghĩ rằng đang tương tác với một `Rectangle` nên sẽ rất dễ để dẫn đến sai lầm như đoạn code dưới đây:

```
Rectangle r = ...

r.setW(5);

r.setH(2);

assert(r.area() == 10);
```
Nếu cái đoạn `...` kia khởi tạo một `Square`, thì lệnh assert sẽ trả fail. Bởi vì với hình vuông thì khi ta thay đổi `width`, thì `height` sẽ phải đổi theo.

Cách duy nhất để đối phó với kiểu vi phạm LSP này là thêm một đoạn logic check kiểu ở trong `User` để xem là đang tương tác với `Square` hay là `Rectangle`. Bởi vì behaviour của `User` thay đổi dựa trên kiểu mà nó tương tác, theo LSP, `Square` không phải là một subtype phù hợp của `Rectangle`.

## LSP và Architecture

Trong những năm đầu của cuộc cách mạng hướng đối tượng, người ta nghĩ rằng LSP là một cách để định hướng cho việc sử dụng tính kế thừa, như ta vừa nói ở phần trước. Tuy nhiên qua thời gian, LSP đã biến thành một nguyên tắc thiết kế phần mềm rộng hơn liên quan đến interface và implementation.

Các interface được nhắc đến ở đây có thể ở nhiều dạng. Đó có thể là kiểu Java interface mà được implement bởi các class. Hoặc có thể là các Ruby class chia sẻ cùng những method signature. Hoặc có thể là một tập các service đều để respond cho một REST interface.

Trong tất cả những trường hợp đó, LSP được áp dụng bởi vì có những người dùng phụ thuộc vào các interface được định nghĩa rõ ràng, và dựa vào khả năng thay thế của các implementation của các interface đó.

Cách tốt nhất để hiểu LSP từ góc nhìn kiến trúc là hãy xem xem điều gì sẽ xảy ra với kiến trúc của hệ thống khi nguyên tắc này bị vi phạm.

## Ví dụ về vi phạm LSP
Giả sử rằng chúng ta đang xây dựng một ứng dụng tổng hợp cho nhiều dịch vụ đưa đón taxi. Khách hàng sử dụng website của chúng ta để gọi chiếc xe taxi thích hợp nhất để sử dụng, mà không cần quan tâm đến hãng taxi. Một khi khách hàng tạo một lựa chọn, hệ thống của chúng ta sẽ gửi taxi được chọn dựa vào một restful service.

Giờ giả dụ rằng một URI cho restful dispatch service (dispatch là ý là gọi xe đó) là một phần của thông tin chứa trong cơ sở dữ liệu của các tài xế. Khi hệ thống của chúng ta chọn một tài xế thích hợp cho khách hàng, nó sẽ lấy URI đó từ bản ghi của tài xế và sau đó sử dụng nó để gửi lời gọi xe đến tài xế.

Giả sử tài xế Bob có một dispatch URI trông như thế này:
```
purplecab.com/driver/Bob
```
Hệ thống của chúng ta sẽ thêm thông tin gọi xe vào URI này và gửi đi với method PUT, như sau:
```
purplecab.com/driver/Bob
        /pickupAddress/24 Maple St.
        /pickupTime/153
        /destination/ORD
```
Rõ ràng thì điều này có nghĩa là tất cả các dịch vụ gọi xe, ở tất cả các công ty khác nhau, phải tuân theo một REST interface chung. Chúng phải xét các trường `pickupAddress`, `pickupTime`, `destination` theo một cách giống nhau.

Giờ giả sử rằng công ty taxi Acme tuyển một vài lập trình viên mà không chịu đọc specs kỹ càng. Họ viết tắt trường `destination` thành `dest`. Giả dụ như Acme là một công ty taxi lớn nhất vùng, và vợ cũ của CEO của Acme là vợ mới của CEO chúng ta... Well, bạn hiểu đấy, đại thể là với nhiều lý do mà chúng ta không bắt thằng Acme nó đổi được. Vậy thì điều gì sẽ xảy ra với kiến trúc của hệ thống này?

Tất nhiên, giờ chúng ta lại phải thêm vào logic của một case đặc biệt. Yêu cầu gọi xe cho bất cứ tài xế Acme nào sẽ phải được cấu trúc sử dụng một tập các rule khác so với tất cả những tài xế còn lại.

Cách đơn giản nhất thì là thêm một lệnh rẽ nhánh `if` vào module mà sử dụng đế cấu trúc lên lệnh gọi xe:

```
if (driver.getDispatchUri().startsWith("acme.com"))...
```
Nhưng tất nhiên là chẳng có kiến trúc sư nào cho phép một cấu trúc như vậy tồn tại trong hệ thống của mình. Việc đưa từ "acme" vào trong code sẽ tạo cơ hội cho những lỗi rất kinh khủng và ma giáo xảy ra, còn chưa kể đến vấn đề bảo mật.

Ví dụ, sẽ thế nào nếu Acme làm ăn ra tiền và mua lại công ty Purple Taxi. Sẽ thế nào nếu việc sát nhập công ty vẫn duy trì hai thương hiệu riêng biệt, nhưng lại hợp nhất hệ thống của Purple vào Acme? Liệu của chúng ta có phải thêm một lệnh `if` nữa cho "purple"?

Người kiến trúc sư cần phải cách ly hệ thống khỏi những bug như thế này bằng việc tạo ra một số module tạo lệnh gọi xe mà có thể điều phối được bằng một cấu hình database dựa trên khoá bởi các dispatch URI. Dữ liệu cấu hình có thể trông như sau:

| URI | Dispatch Format |
| -------- | -------- | -------- |
| `Acme.com` | `/pickupAddress/%s/pickupTime/%s/dest/%s` |
| `*.*` | `/pickupAddress/%s/pickupTime/%s/destination/%s` |

Như vậy, người kiến trúc sư sẽ phải thêm một cơ chế quan trọng và phức tạp để đối phó với một thực tế là các interface của restful service không hoàn toàn thay thế được.

## Tóm lại
LSP có thể, và nên, được mở rộng tới cấp độ kiến trúc. Một vi phạm đơn giản về khả năng thay thế, có thể dẫn đến một kiến trúc hệ thống "thối" với một lượng đáng kể các cơ chế phụ để xử lý.

---
    
*Dịch và tham khảo từ [Clean Architecture: A Craftsman's Guide to Software Structure and Design (Robert C. Martin Series)](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)*