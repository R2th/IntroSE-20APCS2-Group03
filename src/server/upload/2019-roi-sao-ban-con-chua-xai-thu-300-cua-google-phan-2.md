Như đã giới thiệu ở [phần trước](https://viblo.asia/p/2019-roi-sao-ban-con-chua-thu-sai-300-cua-google-E375zXWWZGW), GAE là một công cụ tuyệt vời để chúng ta có thể triển khai ứng dụng web của mình lên đó để mọi người có thể cùng sử dụng và chiêm ngưỡng.
Vậy còn chờ gì nữa mà không bắt đầu thôi 😊
Để nhận 300$ từ anh Google các bạn truy cập https://cloud.google.com và đăng nhập bằng tài khoản Google, sau đó chọn “Get started for free” ta sẽ được chuyển đến trang để đăng kí một số thủ tục trước khi nhận $$

![](https://images.viblo.asia/3461a249-9d49-4c3e-80da-8dee685a35be.png)
 
Đã đến được với bài viết này thì hẳn ai cũng có thể tự mình hoàn thành các thủ tục rồi, nên chúng ta sẽ bỏ qua phần đăng kí thông tin này <br>
**Lưu ý**: ở bước đăng kí sẽ yêu cầu nhập thông tin thẻ thanh toán quốc tế, các bạn cứ nhập như bình thường, nó sẽ không trừ gì đâu 😊 <br>
Sau khi thủ tục hoàn tất nó sẽ đưa ta trở lại trang chủ. 
 
 ![](https://images.viblo.asia/337304b7-0e54-4c08-b82b-2429c8c829fc.png)

Các bạn chọn “Go to console” để vào trang quản lý các dự án

 ![](https://images.viblo.asia/7a21631f-efdd-46cf-828c-37d5aa3eba24.png)

Để bắt đầu bạn chọn “Select a project” và “New project”

![](https://images.viblo.asia/bc4e89fd-5e3c-4103-a654-f4d81cc4e2d6.png)
 
Các bạn tiến hành đặt tên cho dự án của mình.
Một lưu ý nhỏ là các bạn muốn trang web của mình có tên miền ra sao thì có thể click vào nút “EDIT” ở dòng Project ID để sửa lại theo ý mình
Ở đây mình sửa thành “my-fist-app-hello-word”
Cố gắng đặt cái tên lạ lạ xíu để không trùng với thằng khác, nếu trùng ID của các bạn sẽ phải thêm 1 dãy số ở phía sau nhìn xấu lắm.
 
 ![](https://images.viblo.asia/182ef814-c928-45e3-b5f9-163bfc8df505.PNG)

Chờ xíu để nó tạo project, sau đó ở menu bên trái chọn “App Engine”
Tiếp tục ở ô “Select project” các bạn chọn tên project vừa tạo, của mình là “My fist App”
 
![](https://images.viblo.asia/6bf320a0-1cd6-483c-a159-4c96247ae395.png)

Sau khi chọn xong các bạn sẽ có giao diện như này 

![](https://images.viblo.asia/43f0d1bd-b07a-43d7-a56b-7019fea041fd.png)
 
Để thực hiện các bước tiếp theo các bạn click vào mục “DOWNLOAD THE SDK”, tiến hành tải và cài đặt như bình thường.
Gcloud SDK là một phần mềm giúp chúng ta có thể sử dụng và deploy các ứng dụng lên GCP bằng terminal hoặc cmd một cách dễ dàng hơn. (với những bạn nào từng sử dụng github hoặc gitlab thì nó tương tự như Git thôi).
 Trong khi chờ cài đặt bạn click chọn “Create Application”
Tiến hành setup cho nó thôi: 
Đầu tiên là chọn vị trí đặt server của bạn, tùy vào nơi bạn hướng tới có thể chọn khác nhau để cải thiện tốc độ load cho trang web của mình
 
 ![](https://images.viblo.asia/d4fa4e69-0545-4904-9bf6-ece55c5f191b.png)
 
Tiếp theo là lựa chọn ngôn ngữ cho ứng dụng và môi trường, trong phạm vi bài viết mình sẽ sử dụng Nodejs kèm ExpressJs để có bản demo nhanh hơn.
Tùy vào nhu cầu mà bạn có thể chọn Environment là flex hoặc standard, mình thì khuyến khích các bạn sử dụng standard hơn. Flex nếu sử dụng sẽ phải trả thêm phí, còn nó được dùng làm gì thì mình sẽ nói sau.

![](https://images.viblo.asia/59525b9a-15ed-44ef-b3b2-89971d1d9d97.png) 

Tạo thành công bạn sẽ có màn hình hiển thị tương tự như sau
   
   ![](https://images.viblo.asia/1098f489-02c0-431f-8d84-a77196e19108.PNG)

Chúng ta kệ nó ở đấy 1 xíu, quay về với việc tạo trang web hello word bằng expressJs
Ở đây mình sử dụng ExpressJs để khởi tạo nhanh 1 dự án, các bạn có thể làm với các ngôn ngữ khác tương tự, miễn sao tạo được một trang web là ok
 
 ![](https://images.viblo.asia/313c9958-b7d5-42cd-b646-eb04946f2af6.PNG)
 
Sau khi tạo xong ta vào thư mục gốc của dự án và tạo file tên “app.yaml”
Mở app.yaml bằng notepad hoặc trình editor nào đó các bạn config nó như sau:
```
runtime: nodejs10
env: standard
```
 
 ![](https://images.viblo.asia/ad74ff4e-7cba-4f32-bc9f-198e07d7a65d.PNG)
 
Đối với các ngôn ngữ khác sẽ có cách config khác nhau nhưng về cơ bản chỉ cần 2 thông số này là đủ.
Các bạn kham khảo về config theo từng ngôn ngữ tại [đây](https://cloud.google.com/appengine/docs/standard/nodejs/config/appref)
 
 ![](https://images.viblo.asia/68d4f9ba-c473-41c6-9e15-b4e596d99b24.PNG)
 
Các bạn kham khảo chỗ mình đánh dấu đỏ ứng với từng ngôn ngữ nha

**Question**: File này để làm gì :thinking::thinking::thinking:?

**Answer**: Vì GAE được thiết kể để tự động khởi chạy ứng dụng bạn đưa lên, nên nó cần có cái gì đó để nói cho nó biết là nó đang chạy ứng dụng viết bằng ngôn ngữ nào và phiên bản của ngôn ngữ đó là bao nhiêu để chạy đúng. Giả dụ bạn viết bằng Python 3.7 mà nó lại chạy bằng Python 2.7 thì sẽ bị mất một số chức năng có khi lỗi cả hệ thống :cry::cry:

*Runtime*: khai báo môi trường chạy cho ứng dụng ví dụ nodejs10, nodejs8, python2.7,….
*Env*: có 2 biến là “flex” và “standard”, “flex” thì đúng như tên gọi của nó vậy – flexible. 
Bạn không biết mình đang viết bằng nodejs 10 hay 8 hoặc python2.7 hay 3.7, nếu vậy ta sẽ đặt giá trị cho runtime là nodejs hoặc python và set giá trị cho env là flex như vậy GAE sẽ tự động quét và nhận dạng phiên bản và chạy ứng dụng của ta. Thật tuyệt vời phải không, nhưng bù lại sử dụng giá trị “flex” thay vì “standard” sẽ làm ta mất phí duy trì nhiều hơn :)))
<br>
Roài, giờ lưu lại và mở terminal hoạc cmd trong thư mục dự án nào
Nếu các bạn đã cài Gcloud SDK rồi thì bây giờ bấm <br>
`gcloud init`
 
 ![](https://images.viblo.asia/0faaa88f-2fd0-43f0-9640-a41f7cd504fc.PNG)
 
Ở bước này gcloud sẽ hướng dẫn các bạn đăng nhập bằng tài khoản mà bạn đăng kí GCP
Còn nếu đã đăng nhập trước đó bạn sẽ có giao diện như này:
Nó sẽ yêu cầu bạn cài đặt một số thứ như vị trí lưu trữ web, khu vực trang web bạn hướng tới. Để không phải mất thời gian chúng ta sẽ chọn mục 3 là “default”
 
 ![](https://images.viblo.asia/00e14f91-35b0-4dc4-b05d-b43644375087.PNG)
 
Sau đó tới bước chọn tài khoản để sử dụng lưu trữ ứng dụng, cứ chọn cái bạn vừa đăng nhập là được :v
 
 ![](https://images.viblo.asia/075e1e8f-e55f-4199-bb7e-d7f718263e56.PNG)
 
Bước tiếp theo là chọn project vừa tạo:
Lưu ý là khi làm việc trên cmd nó chỉ hiện project  ID thôi nên các bạn chú ý chỗ này không nhầm đấy :v 
 
 ![](https://images.viblo.asia/f6ab16b3-5f5d-4023-adc9-a70d8ee96757.PNG)
 
Sau khi chọn xong, để bắt đầu đưa ứng dụng của mình lên GAE ta bấm <br>
`gcloud app deploy `
 
 ![](https://images.viblo.asia/82713a7b-e0a0-4877-b76d-c87a7d2aa6cb.PNG)
 
Lúc này nó sẽ hiện một số thông tin cần thiết về ứng dụng web của ta
Ta chỉ cần chú ý dòng “target url” -> đây chính là đường dẫn của trang web chúng ta
 
 ![](https://images.viblo.asia/706f6783-bb0a-43b9-a534-5915e72a1831.PNG)
 
Ta bấm Y để xác nhận thông tin và bắt đầu chờ đời GAE làm những gì còn lại cho mình 
 
 ![](https://images.viblo.asia/e70b6bab-b20f-43e7-8db4-c240cc7e1834.PNG)

Và đây là hậu quả sau 30p vọc vạch: https://my-fist-app-hello-word.appspot.com <br>

**Một vài lưu ý**: 
+ Project ID sẽ được dùng làm tên miền nên các bạn nhớ sửa nha
+ Hoàn toàn có thể tạo project ở commandline nhưng mình hướng dẫn tạo trên web để trực quan & dễ tiếp cận hơn
+ Với một số bạn có sẵn project trên Git thì hoàn toàn có thể dùng cmd của google trên web để deploy
+ Với một số bạn làm app có sử dụng database có thể nghiên cứu thêm về DataStore, Big Query 

“*Bài viết này dựa trên những gì mình học hỏi được trong quá trình tìm hiểu GCP nên có nhiều sai sót, hi vọng khi gặp lỗi chúng ta có thể cùng nhau fix bug 😊.*”
__Cảm ơn các bạn đã ủng hộ