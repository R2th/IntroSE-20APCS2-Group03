Ở trong [phần trước](https://htknguyen.com/tu-dong-hoa-cong-viec-nham-chan-voi-heroku-phan-1/), mình đã thực hiện viết một con bot đơn giản để đăng lên Fan Page của mình. Trong phần này thì mình sẽ tiếp tuc sử dụng Heroku để deploy một con bot lên và không hề tốn bất cứ một chi phí nào hết nhé.


# Heroku là gì?
![](https://d1o2okarmduwny.cloudfront.net/wp-content/uploads/2015/08/Asset-6.png)

Heroku là một PaaS (Platform as a service) dùng để giúp các bạn có thể deploy ứng dụng lên mà không cần tốn quá nhiều công sức cho việc config linh tinh. Đôi với các bạn còn chưa biết nhiều về Devops thì code xong rồi deploy lên là một vấn đề lớn. Với Heroku thì đơn giản chỉ cần, code xong và deploy lên thôi, không cần quan tâm tới https, docker này nọ. Bù lại thì chi phí khá là đắt đỏ so với một VPS thông thường. 
Tuy nhiên, Heroku có cung cấp cho các bạn gói Free để sử dụng, đâu đó hình như được 5 app deploy lên Heroku thì phải, cộng với 550 giờ dyno hours.

# Thế Dyno Hours là gì?
Mỗi mỗi tài khoản Heroku mặc định được cung cấp cho 5 app để deploy với tổng số lượng Dyno Hours là 550.

Dyno Hour là **tổng số giờ online của cả 5 app** khi nó đang **thức** sau khi deploy lên hệ thống. 

**Tức là bạn làm cái gì trực tiếp lên Website nó cũng tính vào Dyno Hour cả. Nói chung, bạn có connect vào app là nó tính Dyno, bao cần biết là bạn dùng Terminal, hay là làm cái gì cả.**

Ví dụ như sau:

Bạn Deploy một trang web lên Heroku, mọi người có thể truy cập vào website của bạn. Trang web của bạn có thể sống đc 550 giờ một tháng (Tầm 22, 23 ngày liên tục). Sau khi bạn hết 550 giờ thì trang web của bạn sẽ tự động bị ngắt, và chờ đến tháng sau, sau khi số giờ Dyno được reset lại.

Lưu ý là Dyno Hours là cộng dồn của tất cả các app trong account của bạn lại, cho nên nếu bạn dùng 5 app thì số giờ Dyno sẽ cạn rất nhanh. 

Tuy nhiên, nếu các bạn nhập vào Credit Card thì nó sẽ gia hạn lên được 100 app và 1000 giờ Dyno, đủ để các bạn viết con bot nho nhỏ thoải mái. Vì một con bot chỉ chạy một vài giờ nhất định, và một lần chạy thì chỉ tốn vài phút nên với 1000 giờ Dyno thì xài thoải con gà mái, không lo về Dyno Hours. Khi mà Dyno Hours xài tới tầm 70% thì nó sẽ gửi mail về cho bạn nên không lo bị lố giờ đâu nhé.
# Bắt tay vào deploy thôi 
## Tạo một tài khoản Heroku
Step này thì đơn giản, cứ vào [Heroku](https://www.heroku.com/) rồi tạo một tài khoản Developer bình thường thôi. Nếu như muốn thêm Credit Card vào để có thêm nhiều app và nhiều giờ Dyno thì các bạn thêm ở Account Settings -> Billig -> Add Credit Card là xong.

## Tải về Heroku CLI
Cài cái này cũng đơn giản, không có gì fuck tạp cả. Bạn cứ vào [đây](https://devcenter.heroku.com/articles/heroku-cli) rồi tải về thôi. Mình dùng Linux nên chỉ cần gõ 
```bash
sudo snap install --classic heroku
```

## Deploy bằng Heroku CLI
Sau khi có hai thứ đó rồi vào Dashboard của mình, click Create New App để tạo một App mới thôi. Sau đó thì vào cái project của mình dưới local ấy, bắt đầu deloy lên. Heroku CLI sử dụng giống y chang như mấy câu lệnh git nên chả có gì để nói cả. Đầu tiên là login vào Heroku CLI

```bash
heroku login
```

Sau đó thì push lên remote của Heroku thôi

```bash
git add .
git commit -m "First commit"
git push heroku master
```

Sau đó nó sẽ push lên, còn lại cài đặt linh tinh thì Heroku lo hết, ngồi chơi và chờ thôi.

**Chú ý:** Thường thì khi deploy một hệ thống NodeJS lên, người ta hay hướng dẫn phải thêm một file là Procfile để auto start server. Tuy nhiên, ở đây mình viết một con bot, mà nó chỉ có thể chạy thông qua CLI nên không cần cái file này nhé.

Sau khi deploy lên thì bắt đầu sử dụng thử xem nào. Các bạn vào More, chọn Run Console, rồi gõ vào `bash` để truy cập terminal.

![Screenshot-from-2019-12-25-18-17-26](https://htknguyen.com/content/images/2019/12/Screenshot-from-2019-12-25-18-17-26.png)

Sau khi xong xuôi thì gõ như `node index.js` xem nó có trả về dúng kết quả không. Được như sau là chuẩn con mẹ nó chỉnh

![Screenshot-from-2019-12-25-18-17-57](https://htknguyen.com/content/images/2019/12/Screenshot-from-2019-12-25-18-17-57.png)


## Sử dụng Scheduler để tự động
Giờ chỉ còn một step cuối cùng là cài một Ađd On của Heroku có tên là **Heroku Scheduler** để hẹn giờ, bắt nó chạy mỗi giờ một lần thôi. 
Các bạn vào [đây](https://elements.heroku.com/addons/scheduler) rồi bấm vào Install Heroku Scheduler, chọn plan là Free vào install vào cái app của mình nhé. 

![Heroku](https://htknguyen.com/content/images/2019/12/Heroku.png)

Sau khi xong xuôi, các bạn quay lại trang Dashboard của app mình thì nó sẽ hiện cái Heroku Scheduler ở đấy.

![listen-to-this-nguyen-47---Heroku](https://htknguyen.com/content/images/2019/12/listen-to-this-nguyen-47---Heroku.png)

Click vào Configure Add On rồi click vào Add Job để hẹn giờ thôi. Ví dụ ở đây mình sẽ để nó run mỗi giờ một lần.

![listen-to-this-nguyen-47---Scheduler---Heroku](https://htknguyen.com/content/images/2019/12/listen-to-this-nguyen-47---Scheduler---Heroku.png)

Thế là xong, bây giờ thì cứ ngồi chờ rồi nó sẽ tự động chạy script cho bạn. 
# Kết luận

Sau khi deploy xong thì cứ mỗi một giờ, Heroku sẽ tự động chạy lệnh đó một lần để thực hiện việc post bài lên trên Facebook. Dựa vào cơ chế này thì mình có thể thực hiện các cộng việc tương tự khác, ví dụ như tự động gửi email mỗi ngày, tự động backup dữ liệu mỗi ngày hay tự động bật script scrap dữ liệu` mỗi ngày chẳn hạn. Các bạn có thể tùy cơ ứng biến cho phù hợp với nhu cầu của mình.

Các bạn có thễ xem thử kết quả ở Page http://fb.com/listenthisawesomesong của mình. Mình để đó cả tháng rồi mà nó cứ post ầm ầm thôi, chả cần động tay động chân gì cả :v

Hiện tại mình đang tập tọe viết Blog ở địa chỉ https://htknguyen.com/. Nếu bạn nào có hứng thú thì ghé vào blog của mình nghe mình chém gió loạn lên dưới góc độ một thằng Developer cùi nhé. Bắn tim