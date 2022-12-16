![](https://images.viblo.asia/985b2fe2-7fbd-4288-a9ed-f922b0ef1ce0.jpg)

Chào các bạn, như vậy là tết cũng sắp tới rồi, ở mình thì có tết dương và tết âm, còn ở tây họ chỉ có tết âm thôi!

Và mỗi dịp tết, thì hình ảnh được chúng ta thấy nhiều nhất, đó chính là pháo hoa.

Vì vậy hôm nay chúng ta sẽ cùng thử tạo ra hiệu ứng pháo hoa trong Unity để coi nó có dễ không nhé ;)

Tất nhiên trong môi trường làm game thì có vô vàn cách để tạo ra các hiệu ứng, ví dụ như frame by frame, tức là các bạn render ra nhiều frame sau đó cho chạy theo thứ tự để tạo ra effect. Hay như sử dụng các clip ghép vào, hoặc dùng nhiều object bay theo các hướng để tạo ra hiệu ứng, hoặc phức tạp hơn thì dùng bone cũng có thể tạo ra hiệu ứng nữa.

Nhưng ở trong bài viết này chúng ta sẽ thử 1 cách tốn ít công hơn, đó chính là sử dụng particle.

Bài viết này sẽ dành cho những bạn có kiến thức cơ bản Unity rồi vì vậy mình sẽ ko giải thích chi tiết tại sao lại thế, mà chỉ làm các bước để có thể tạo ra hiệu ứng thôi nhé ;)

Bước 1: Các bạn tạo ra 1 particle cha.

- Sở dĩ tạo ra particle cha là vì sau đó chúng ta sẽ tạo ra particle con :v

- Particle cha này sẽ tạo ra hiệu ứng quả pháo hoa được bắn lên từ dưới mặt đất, và bắn về các hướng khác nhau với độ cao khác nhau.

![](https://images.viblo.asia/2025aaba-864b-490a-bc05-5f64b6f46fd0.PNG)

Bước 1.1: Các bạn setting Particle System như sau.

![](https://images.viblo.asia/1d76c840-72b7-4f02-8c5a-1731abc5fb3b.PNG)

Bước 1.2: Các bạn setting Emission như sau.

![](https://images.viblo.asia/75da7b9b-acfb-4f0f-84fe-d00fe50beee0.PNG)

Bước 1.3: Các bạn setting Shape như sau.

![](https://images.viblo.asia/a003a6ec-cfa8-4b3e-85b1-f367dc052e34.PNG)

Bước 1.4: Các bạn setting Color over Lifetime như sau.

![](https://images.viblo.asia/0fb8d2db-0b53-4a03-aa96-17efedbb951d.PNG)

Bước 1.5: Các bạn setting Trails như sau.

![](https://images.viblo.asia/e53a67d7-023a-44bb-a49e-85f172f0f021.PNG)

Bước 2: Các bạn tạo ra 1 particle con.

- Particle con này sẽ làm nhiệm vụ tạo ra hiệu ứng nổ và tỏa ra các hướng của pháo hoa.

- Nó cũng tạo ra hiệu ứng màu sắc khác nhau cho thêm phần đa dạng ;)

![](https://images.viblo.asia/6ef77724-8104-4cde-98cb-c9bcd0e6b187.PNG)

Bước 2.1: Các bạn setting Particle System như sau.

![](https://images.viblo.asia/aeab8cf3-4753-4033-8dd5-e483191703da.PNG)

Bước 2.2: Các bạn setting Emission như sau.

![](https://images.viblo.asia/ab7beb2a-34d7-43f7-9ec9-72b47fb4412a.PNG)

Bước 2.3: Các bạn setting Shape như sau.

![](https://images.viblo.asia/3fae2f7c-0500-45bc-b730-75aa3a87b572.PNG)

Bước 2.4: Các bạn setting Trails như sau.

![](https://images.viblo.asia/4b3896f1-dbd8-4bfe-8e2f-fa1fc6afaad0.PNG)

Bước 3: Các bạn tạo ra 1 Material.
- Để có thể đổ màu cho pháo hoa.

![](https://images.viblo.asia/106193dd-f9c3-4168-af26-bc1c725c1acc.PNG)

Bước 3.1: Các bạn setting cho material vừa tạo như sau.

![](https://images.viblo.asia/30784fc2-dbc9-4780-b454-222a09135e42.PNG)

Bước 2.5: Các bạn setting Renderer như sau.

![](https://images.viblo.asia/0e0c32b3-4d75-4df2-9072-7adca9bc33b8.PNG)

Bước 1.6: Các bạn setting Sub Emitters như sau.

![](https://images.viblo.asia/4ba704f9-0c46-45d6-aa5d-a69f5cb13ec2.PNG)

Và bây giờ các bạn thử run sẽ có thấy kết quả như mình ko nhé ;)

![](https://images.viblo.asia/c27aae74-c84a-4389-a350-66f2a03db175.PNG)

Hi vọng qua bài viết này bạn sẽ thấy Unity thú vị hơn và có thể tạo ra 1 sản phẩm khoe bạn bè trong dịp tết sắp tới nhé ^_^