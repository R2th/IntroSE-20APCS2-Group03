## Đôi điều dạo đầu
Khái niệm CI/CD gần đây đã quá đỗi quen thuộc với mỗi dev trong thời gian trở lại đây. Nó từ lâu đã được tích hợp vào hệ thống sản xuất phần mềm của nhiều công ty, startup lớn nhỏ làm phần mềm. Tuy nhiên những bạn mới học, tự học hoặc chưa join vào những team chưa áp dục CI/CD thì có thể không quen thuộc lắm. 

#### Ồ CI/CD là cái gì mà nhìn viết tắt vi diệu thế?
Từ từ hãng quan tâm đến CI/CD đã. Tâm sự một chút. Thưở mới học code, mình học PHP. Hồi đó code web với bạn cứ phải NAT 1 cái ổ LAN, sang nhà nhau cứ code rồi lại copy vào ổ đó, thằng kia lại lấy code về. Cứ chia nhau ra mà code, cứ thằng này code backend thì thằng kia làm frontend. Cá là nhiều ông vẫn còn tư tưởng này phết :v Được một thời gian thì biết Github, Bitbucket, lúc đầu chỉ biết nó là để lưu code về sau mới biết có các tính năng như Pull Reuquest các thứ
![Ngày join Github của mình](https://images.viblo.asia/49ec0630-d863-4210-b872-06d4e5910f3b.png)
Mình cũng chỉ join github từ 1/12/2016, khá là mới đúng không. Ok, mới dùng Github thì coi nó như kiểu Drive thôi, một nơi lưu dữ liệu, tức là kéo code về, thằng bạn "ml" code có bug vẫn phải tìm, mà nhiều khi nó viết bug đổ tại mình thế có cay không.
Tìm tòi một thời gian cũng biết được dăm ba cái CI/CD. Ủa vậy CI/CD giúp được cái gì?


#### CI(Continuous integration)
Dịch ra có nghĩa là hệ thống tích hợp liên tục nghĩa là mỗi dự án của bạn sẽ liên tục liên tục thực hiện 1 quá trình nhất định
Hmmm, khó hiểu quá nhỉ
![Sơ đồ CI](https://cdn-images-1.medium.com/max/800/0*Ibsu7Nvvd9gyhHxO.png)
Các bạn có thể xem ảnh, nó sẽ có 6 bước:
+ Khi bạn push code lên Source Control Server - SCS(Github, Bitbucket,...) thì lập tức Continous Integration Server - CIS(TravisCI, VSTS, CircleCI) sẽ lập tức nhận được qua Webhook
+ Nó sẽ tiến hành một loạt các lệnh bạn đã config từ trước (Build, test,...)
+ Nếu xảy ra lỗi sẽ lập tức ghi đến toàn bộ member trong team (PM, Dev1, Dev2,...)

Bạn hoàn toàn có thể mở log ra để xem lỗi ở đâu, ai gây ra lỗi để từ đó "trừ lương" ông nào gây ra lỗi :v (Nói vui thôi các ông bị trừ lương đừng đổ tại tôi)


#### CD(Continuous delivery)
Dịch theo tiếng Việt có nghĩa là hệ thống chuyển giao liên tục. Nói thì khó hiểu lắm nhưng nó đơn giản lắm. Khi CI làm xong nhiệm vụ của nó thì CD giúp bạn phân phối đến khách hàng thôi. Nó giống kiểu bạn dùng Heroku có 1 chức năng là Auto deploy khi CI checked. Tức là khi code của bạn Ok, thì CD sẽ build thành apk và ipa (ở đây là React Native) và chuyển đến khách hàng của bạn (Có thể là team tester, team muốn dùng beta,...)

Ở bài này mình chỉ nói đơn giản về CI/CD và khái niệm của nó thôi. Vì đây là bài đầu tiên của mình trên Viblo nên mọi người cứ thẳng tay góp ý đặt câu hỏi cho mình dưới comment nhé. :> Bài viết tiếp theo mình sẽ tiến thành tạo 1 app React Native và config CI cho nó (Mình sẽ sử dụng TravisCI)