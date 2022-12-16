# Mở đầu
Chào bạn, khi bạn đọc được bài viết này, chắc hẳn đã không ít lần bạn search từ khóa Docker là gì? Và những thứ liên quan đến nó thì tìm được vô vàn những câu trả lời, có lẽ cũng giống như tôi, một câu trả lời là chưa đủ, thậm chí nếu đã dừng lại ở câu trả lời nào đó thì cũng chỉ mông lung rất khó có thể diễn tả cái mình hiểu cho người khác. Tôi không chắc bài viết này sẽ là câu trả lời cuối cùng cho bạn nhưng ít ra tôi nghĩ nó sẽ cho bạn cách hiểu khác thú vị hơn về Docker, may mắn thì cách diễn đạt này sẽ làm bạn hiểu hơn chăng. Trong phần này tôi sẽ không đề cập gì đến câu lệnh, hay cách cài cắm Docker mà chỉ đưa ra cái nhìn tổng quát để các phần sau được dễ dàng hơn. Và đây là cách mà tôi đã hiểu:

# 1.	Docker là gì?
Docker là dự án mã nguồn mở giúp tự động triển khai các ứng dụng linux và windows vào trong các container ảo hóa :( (Hiểu được chết liền)

Số là như này: 
Mình đang hăng say code một dự án để đời, máy cài win 10, apache, php7, angularjs, redis … các thứ. Tự dưng sếp bảo chuẩn bị triển khai maintain cho tôi một con mới, đọc qua yêu cầu thì cũng không có gì cài cắm phức tạp cho lắm, chỉ có php5.6.12, nginx, và một số thư viện có vẻ cài cắm trên linux thì sẽ đơn giản hơn nhiều. Chả lẽ gỡ win ra cài ubuntu. Rồi mai lại có một dự án khác, cài cắm toàn thứ của nợ thì làm thế nào.  Đó là lúc bạn nghĩ đến Docker, nó cho phép tạo các môi trường ảo hóa, giúp việc triển khai các ứng dụng trở nên đơn giản hơn. Nghe thì có vẻ khá giống việc bạn dùng vmware để tạo máy ảo ubuntu vậy.

# 2.	Docker và Hypervisor (máy ảo)
Hypervisor là các máy ảo (Virtual Machine - VM) cũng được tạo ra để triển khai các dự án khác nhau với các điều kiện môi trường và công nghệ khác nhau. Vậy điểm khác nhau giữa Docker và VM là gì:
Giả sử bạn có 2 mảnh đất, mỗi mảnh 500m2.

-	 Trên mảnh thứ nhất, bạn phân ra làm 10 lô nhỏ , mỗi lô 50m2 để bán, ai mua lô nào thì họ tự xây nhà , tự thiết kế, muốn nhà quay hướng nào thì xây, thích lắp điện nước như nào thì lắp, không lắp thì không dùng.
-	 Trên mảnh thứ 2 bạn bán cho một chủ đầu tư, họ xây chung cư 40 tầng, với rất nhiều căn hộ có các kích thước khác nhau tùy túi tiền người mua.

Rõ ràng bạn thấy ở trường hợp 2, các căn hộ phải sử dụng chung đường ống nước , đường điện từ 1 nguồn nào đó, chung sân, chung nóc vv… cùng chia sẻ tài nguyên với nhau. 

Trường hợp 1 thì mỗi nhà có quyền sử dụng riêng, không chia sẻ gì với ai.
VM cũng giống TH1 vậy, mỗi máy ảo sử dụng một OS riêng, được cấp phát bộ nhớ ngay từ lúc đầu tạo ra, nên dẫn đến dư thừa không cần thiết. Còn Docker như những căn chung cư , các container (được ví như căn hộ) được tạo ra sử dụng chung tài nguyên, cần bao nhiêu dùng bấy nhiêu, tùy vào mục đích sử dụng nên tiết kiệm tài nguyên hơn VM.
![](https://images.viblo.asia/4c0e1b8f-b9b8-4e3a-b3e2-ce5b905c9e69.PNG)
[Các bạn có thể đọc thêm tại đây](https://www.docker.com/what-container#/package_software)

# 3.	Docker image và Docker container
Hiểu theo lập trình hướng đối tượng thì Image được xem như là một class, chứa các phương thức và thuộc tính. Còn container như một thực thể  (instance) của class đó.

Còn hiểu theo kiểu của Docker thì image là một package chứa tất tần tật những thứ cần thiết cho ứng dụng như thư viện, biến môi trường, mã nguồn, file cấu hình…Chỉ cần run image một cái là sẽ build ra container tương ứng phục vụ cho ứng dụng của bạn, mọi hoạt động trong container này sẽ không ảnh hưởng đến container khác, và sau khi sử dụng nếu không cần thiết có thể xóa bỏ.

# 4.	Dockerfile
Vậy docker image tạo ra từ đâu, nó được tạo ra từ một đống câu lệnh được tổng hợp lại trong một file gọi là Dockerfile, sau khi build Dockerfile sẽ tạo ra docker image.

# 5.	Docker compose
Là file .yml (thường là docker-compose.yml)  chứa cấu hình của container,  hiểu theo kiểu căn chung cư của mình thì nó như bản vẽ thiết kế , gồm chi tiết các vật dụng cần thiết, sơ đồ đường điện, nước. giúp cho căn nhà hoạt động đúng với chức năng và mong muốn của người dùng.

# 6.	Docker volume
Là cơ chế tạo và sử dụng dữ liệu của docker, đã liên quan đến tạo và sử dụng dữ liệu thì bạn hoàn toàn có thể backup hoặc restore volume.
Sử dụng volume để:
-	Bảo toàn dữ liệu khi một container bị xóa
-	Chia sẻ dữ liệu giữa máy chủ (host) và container
-	Chia sẻ dữ liệu giữa các container với nhau

Volume là cách bạn chỉ định đường dẫn (một command line) trong Docker compose xem đâu là nơi sẽ lưu trữ và chia sẻ data với container.
Quay lại với ví dụ căn chung cư, thì bể nước để cung cấp nước cho căn hộ có thể hiểu như volume, và cách bạn bố trí đường ống chính là cách cấu hình đường dẫn trong file docker-compose.

# 7.	Kết luận
Trên đây là đôi chút hiểu biết của mình về docker và những khái niệm liên quan mà bạn có thể đang tìm kiếm câu trả lời. Hy vọng những tưởng tượng về docker của mình không đi quá xa với ý nghĩa thực của nó. Rất mong sự ủng hộ của các bạn trong các bài viết tiếp theo. Thanks!

# 8.	Tham khảo
[https://docs.docker.com/](https://docs.docker.com)

[http://docker-ghichep.readthedocs.io/en/latest/README](http://docker-ghichep.readthedocs.io/en/latest/README/)