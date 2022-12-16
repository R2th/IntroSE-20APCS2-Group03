### Tuyệt chiêu tìm ra các công nghệ sử dụng trong bất kì website nào trong vòng 1 nốt nhạc
![](https://images.viblo.asia/cf6b9942-50b3-4417-a77c-409f2beaf26e.png)

> Các bạn đã bao giờ vào một website nào đó và bỗng nhiên trong đầu hiện ra câu hỏi: 
>  "Trang web này được xây dựng bằng công nghệ gì hay chưa?" :clown_face:
>  

Mình cũng hay tự đặt ra câu hỏi này khi gặp những trang web mà bản thân thấy nó thật tuyệt vời. Sau đó tìm ra các công nghệ trang web đó đã sử dụng và vọc dần dần... :)

Có thể sẽ có nhiều bạn đã biết rồi, nhưng mình xin phép chia sẻ cho bạn nào chưa biết một extension khá hay giúp bạn trace ra được những công nghệ mà website bất kỳ đang sử dụng.  
> À, điều kiện là người tạo ra website đó không cố tính che dấu nó nhé. (điều mà ít developer nào để ý)

Phần mềm đó có tên là **Wappalyzer**
Các bạn có thể tải extension[ tại đây](https://chrome.google.com/webstore/detail/wappalyzer/gppongmhjkpfnbhagpmjfkannfbllamg?hl=en)  
Hoặc xem thêm tại https://www.wappalyzer.com/

Cách dùng cũng tương đối đơn giản.
Sau khi cài extension, bạn vào website bất kì, và click vào biểu tượng của extension là nó sẽ tự bóc tách các công nghệ của website đó cho bạn (tất nhiên là không được 100%, nhưng đa phần sẽ được những thứ mà bạn muốn biết). 

Giờ chúng mình cũng thử qua vài trang web nhé. 

**1. Trang Viblo.asia**  
Thử xem team viblo đã áp dụng những công nghệ gì vào việc phát triển website này nào.  
![](https://images.viblo.asia/bfc8a602-8ce8-4fa0-a5f2-a41fbfb50711.PNG) 

Đúng là chỉ bằng 1 nốt nhạc bạn có thể thấy:  
Phía Frontend: viblo đang dùng 
* VueJs: library khá thời thượng hiện nay
* NuxtJS: framework được xây dựng bằng VueJS, hỗ trợ khá tốt về routes và server rendering
* Element UI: giống như bootstrap, dùng để build giao diện cho nhanh.  
* Webpack: dùng để bundle (đóng gói) các resource css, js...

Phía backend:
* NodeJs: có lẽ là để làm server, tận dụng cơ chế single thread để tăng khả năng tiếp nhận requests (mình đoán vậy)
* Cloundflare: mình chỉ biết dùng cái này để giao phần trống DDos cho bên khác làm.(chưa được dùng thử bao giờ).
* Phía API: có thể cũng là NodeJS hoặc Laravel hay Ruby chăng... 

**2. Trang Github.com** 

![](https://images.viblo.asia/fda81157-fbd6-4ce8-bc03-c32485a38f8f.PNG)

Vẫn  *** 1 nốt nhạc ***  
Mình lại biết được Github sử dụng Bootstrap và ReactJS phía frontend  
Và Ruby on Rails phía backend.  
Do có một số xử lý realtime nên có thêm cà websocket.
OK! Giờ bạn có thể tự tìm ra công nghệ ở những website mà bạn thích rồi đó.    ư

***Kết bài thôi!***  
Sẽ có một số bạn hỏi, tại sao phần mềm có thể làm được như vậy.  
Và có cách nào che dấu nó đi không. 
Về phía backend mình xin trả lời là có, vì mình đã từng bị ông sếp bắt dấu nó đi (sếp bảo kém bảo mật :sweat_smile: , nếu có nhiều người quan tâm mình sẽ chia sẻ ở một bài khác).  
Còn phía frontend thì mình chưa làm nên cũng không rõ.  

Đến đây thôi nha, cảm ơn các bạn đã đọc bài của mình.   
Nếu các bạn thấy hay nhớ LIKE SHARE SUBCRIBE nhé (quen mồm khi làm Vlog).