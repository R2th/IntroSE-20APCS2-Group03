Chào mọi người. Bài viết trước mình đã giới thiệu về Android Library và cách publish lên remote (cụ thể ở đây là [Jitpack.io]((https://jitpack.io/)))

Tiếp nối chuỗi bài liên quan đến Library này.

Hôm nay mình đưa ra một tình huống. Khi bạn muốn thay đổi (add, update, fix, …)  thứ gì đó trên Library.
Sau khi thay đổi source xong, theo thứ tự bạn phải update version của nó -> tạo bản release trên git -> send chúng lên JitPack -> Mong đợi chúng không có lỗi gì.
Tiếp đến là bên Project chính, các bạn update version của Library trên Project chính và tiếp đó check nó chạy ổn không.
Các bước này sẽ tiếp tục lặp lại nếu như source mà bạn code trong Lib của bạn bị fail.  

Tình huống trên gây ra sự mất time và sự chờ đợi. Để giải quyết bài toán trên mình thấy có một giải pháp đó là Local Maven Repository.

Tất nhiên Lib của bạn thường chứa Sample App để sử dụng tất cả các tính năng của Library, vì vậy bạn có thể kiểm tra xem nó có hoạt động hay không mà không cần toàn bộ quá trình mình liệt kê ở trên, nhưng đôi khi vẫn chưa đủ và bạn cần phải kiểm tra trên dự án mà bạn thật sự muốn triển khai Library trên đó.

Những lợi ích mà Local Maven Repository có thể thấy được là:
1. Đưa cho bạn 1 lựa chọn nếu bạn chỉ muốn lưu Android Library hoặc module dưới local như là một maven repository trong máy tính của bạn. Từ đó bạn có import dependency một cách trực tiếp vào Project của bạn như thể nó đã từng được publish.
2. Đưa ra giải pháp phù hợp để tiết kiệm về mặt thời gian, tránh sự chờ đợi không cần thiết, cũng như tạo ra sự chủ động cho Developer trong quá trình phát triển. 

Nào chúng ta cùng đi vào các bước để triển khai.

1. Đầu tiên như thiết lập 2 project mà chúng ta đã setup trước đó: CalculatedApp (Main Project) and CalculatedLib (Lib)
2. Library 
    1. Trong file build.gradle, thêm plugin 

    [![image](https://www.linkpicture.com/q/Screen-Shot-2022-09-19-at-15.40.33_4.png)](https://www.linkpicture.com/view.php?img=LPic6329bdd378814802601469)
    
    2. Định nghĩa artifactId và groupId
    
    [![image](https://www.linkpicture.com/q/Screen-Shot-2022-09-19-at-15.40.46.png)](https://www.linkpicture.com/view.php?img=LPic6329c37a2fea7562405672)

    3. Add Config

        1. Nếu Lib của bạn là single module, hoặc là có nhiều modules nhưng các modules không có sự phụ thuộc lẫn nhau.

        [![image](https://www.linkpicture.com/q/Screen-Shot-2022-09-19-at-15.41.03.png)](https://www.linkpicture.com/view.php?img=LPic6329c62e176d5106798837)

        2. Nếu Project của bạn có nhiều module là các thư viện độc lập và một module là là tập hợp của các lib đó.

        [![image](https://www.linkpicture.com/q/Screen-Shot-2022-09-19-at-15.41.15.png)](https://www.linkpicture.com/view.php?img=LPic6329c6a88d9411850057494)

        3. Tip: Nếu project của bạn chứa nhiều modules. Để config chúng, chúng ta phải tạo cho mỗi một Lib một config giống như trên. Để đơn giản hơn chúng ta có thể tạo 1 file publish_local.gradle file. Trong file này mình cài đặt trong một config chung cho các Lib. 

        [![image](https://www.linkpicture.com/q/Screen-Shot-2022-09-20-at-21.01.39.png)](https://www.linkpicture.com/view.php?img=LPic6329c7d613a26615482980)


        [![image](https://www.linkpicture.com/q/Screen-Shot-2022-09-19-at-15.41.28.png)](https://www.linkpicture.com/view.php?img=LPic6329c822b8834212654600)

        
        Trong mỗi lib mình chỉ cần set-up groupId và artifactId tương ứng

        [![image](https://www.linkpicture.com/q/Screen-Shot-2022-09-19-at-15.41.43.png)](https://www.linkpicture.com/view.php?img=LPic6329c9954273f623350461)

        Đặc biệt là add link dẫn đến file config tổng

        [![image](https://www.linkpicture.com/q/Screen-Shot-2022-09-19-at-15.41.55.png)](https://www.linkpicture.com/view.php?img=LPic6329c9d2b76591294166093)

        4. Publish To Maven Local

         Tất cả những gì cần lúc này là run task: publishToMavenLocal
    
        [![image](https://www.linkpicture.com/q/Screen-Shot-2022-09-19-at-15.42.07.png)](https://www.linkpicture.com/view.php?img=LPic6329ca45141751555807790)


        Hoặc chạy lệnh Terminal: 

       <pre>
       ./gradlew clean
       ./gradlew build
       ./gradlew publishToMavenLocal   
       </pre>

       [![image](https://www.linkpicture.com/q/Screen-Shot-2022-09-19-at-15.42.21.png)](https://www.linkpicture.com/view.php?img=LPic6329cabcafa641144754033)


       Cụ thể ở đây là 2 file: 
	     1. File .pom chứa thông tin của Lib (dạng XML)
         2. File .aar là file Lib được build ra

       5. Cuối cùng là Add dependency và config vào Project chính sử dụng thư viện của bạn

        [![image](https://www.linkpicture.com/q/Screen-Shot-2022-09-19-at-15.42.35.png)](https://www.linkpicture.com/view.php?img=LPic6329cb3b06ce41085217798)

        - Enable mavenLocal() repository vào file Build Systems
        - Chú ý là add mavenLocal() vào đầu danh sách. Cần lưu ý rằng việc có mavenLocal ở đầu danh sách sẽ giúp bạn luôn chọn các thư viện có sẵn trong thư mục  ~/ .m2 / repository / trước tiên


        Tiếp Theo, Add dependency tương ứng vào Project chính và sử dụng functions Library trong source code chính.

        [![image](https://www.linkpicture.com/q/Screen-Shot-2022-09-19-at-15.42.50.png)](https://www.linkpicture.com/view.php?img=LPic6329cb8feac101114831938)

        Vâng. Đó là chia sẻ nhỏ của mình liên quan đến Library, publish remote vs local của chúng. 

        Các bạn có thể tham khảo source code mình để bên dưới.

        Mong rằng bài viết của mình đâu đấy sẽ giúp các bạn trong cộng đồng Android GST mình. Hẹn gặp lại trong bài viết sắp tới. 

        **Source code**: 

        [Library](https://github.com/PhongPhungNgoc/CalculatedLibrary.git)

        [Main Project](https://github.com/PhongPhungNgoc/CalculatedApp.git)