![](https://images.viblo.asia/526bc9cc-b3b0-491c-a6a6-f3be4e11908d.PNG)

# Sun* CI 
Sun* CI là hệ thống `CICD` (CI: Continuous Integration, CD: Continuous Deployment), một sản phẩm tự tay nghiên cứu và xây dựng của đội ngũ lập trình viên bộ phận R&D Unit. Dựa trên cảm hứng và ý tưởng của những hệ thống CICD nổi tiếng, Sun* CI cũng hoàn toàn đáp ứng được các tiêu chí của một hệ thống CICD - đó là tính tích hợp liên tục (CI) và triển khai liên tục (CD). 

**CI:** Có thể hiểu đơn giản là mỗi khi bạn hoặc những thành viên trong team của bạn gửi một Pull Request (PR) với mong muốn được merge vào nhánh chính của dự án, hệ thống Sun* CI sẽ tự động pull code của PR đó về và dựng lên một bản build độc lập. Trong bản build ấy sẽ giúp chúng ta biết được các thông tin như ví dụ với dự án Laravel + js : Lỗi phpcs, lỗi eslint, code coverage, phần trăm Unit test ... Từ những thông tin trên sẽ cho người quản lý, người review code biết rằng có nên merge PR đó hay không, giúp giảm thiểu thời gian review `code convention` cũng như tránh được những bug có thể phát sinh so với chỉ dùng cách review truyền thống.

**CD:** Là tính năng cho phép người quản lý setting việc auto deploy source code lên staging hoặc production sau khi đã chỉ định nhánh để deploy. Cũng sẽ bao gốm quá trình CI, code sau khi được merge vào nhánh develop hoặc master, trải qua quá trình build và success. Code sẽ tự động được deploy lên staging nếu người quản lý setting nhánh develop cho staging và nhánh master cho production. Sun* Ci hỗ trợ sử dụng rocketeer và deployer để deploy ứng dụng.

Ngoài PHP, Sun CI còn support các project Ruby, Java và đội ngủ phát triển vẫn đang tiếp tục cải thiện sản phẩm
Để hiểu thêm về Sun* CI các bạn có thể truy cập https://civ3.sun-asterisk.vn/document

Trong bài viết hôm nay mình xin hướng dẫn các bạn Auto deploy một sản phẩm Laravel đã được kích hoạt trên Sun* CI bằng Rocketeer giúp các bạn hiểu hơn cơ chế deploy của Sun* CI.

# Rocketeer
![](https://images.viblo.asia/fdfdcbb3-0bec-4cd4-8139-05eb0b4175fe.jpg)

Là package PHP cho phép chạy và triển khai hệ thống một cách nhanh chóng và hiệu quả. Thay vì phải SSH vào server như thông thường, chúng ta có thể config của Rocketeer chủ động làm điều đó và chạy luôn những lệnh cần thiết giống hệt như làm thủ công.
Để hiểu hơn về Rocketeer mọi người có thể tham khảo tại trang chủ http://rocketeer.autopergamene.eu/

## Cài đặt
```
$ wget http://rocketeer.autopergamene.eu/versions/rocketeer.phar
$ chmod +x rocketeer.phar
$ mv rocketeer.phar /usr/local/bin/rocketeer
```

## Command cơ bản
```
$ php rocketeer
  check        Kiểm tra xem server đã config đúng hay chưa
  cleanup      Dọn dẹp những phiên bản cũ đã release trên server
  current      Hiển thị version hiện tại của bản release
  deploy       Thực hiện deploy ứng dụng
  flush        Xóa bộ nhớ cache của rocketeer
  help         Hiển thị danh sách trợ giúp
  ignite       Khởi tạo rocketeer config
  list         Hiển thi danh sách commands
  rollback     Rollback về bản release trước hoặc chỉ định phiên bản cần rollback
  setup        Thiết lập remote server cho việc deploy
  strategies   Danh sách những options có sẵn cho từng strategy 
  teardown     Remove ứng dụng remote và cách đang tồn tại
  test         Chạy test trên server và trả về kết quả đầu ra
  update       Cập nhật remote server mà không cần tạo 1 bản release mới
```

## Cấu hình cho dự án
Sau khi đã cài đặt rocketeer trên máy, chúng ta cần tạo thư mục .rocketeer cho từng dự án, trong thư mục này sẽ chứa những file cấu hình cần thiết để deploy project.

Ta vào thư mục dự án mở terminal và chạy lệnh khởi tạo sau:
```
$ rocketeer ignite
```
Chúng ta sẽ bỏ qua mọi câu hỏi mà rocketeer gợi ý, vì những thông tin ấy chúng ta có thể thêm vào sau.
![](https://images.viblo.asia/b1c0c30d-32c0-4341-a91e-4bfe84eca75b.png)
Sau khi init .rocketeer cấu trúc thưc mục sẽ như trên. Ở đây mình sẽ không nói cụ thể ý nghĩa của từng thư mục nữa, các bạn có thể đọc rất nhiều bài chi tiết về rocketeer trên viblo hoặc tại trang chủ của rocketeer.

Mở file `config.php`, đây là file config thông tin server, và môi trường staging hay production. Chúng ta đơn giản chỉ cần điền IP server, user sẽ thực hiện deploy, ở đây mình đặt là user `deploy`

![](https://images.viblo.asia/4ce1e220-8007-4b43-8473-78bcfb4a9832.png)

Lưu ý: `key` chính là đường dẫn đến file rsa_key trên máy của bạn để có thể ssh vào server.

Tiếp theo là file remote.php - File này chứa config đường dẫn thư mục dự án sẽ deploy trên server và những file hay folder mà chúng ta muốn cache lại sau mỗi quá trình deploy, ví dụ folder vendor, node_modules ...

![](https://images.viblo.asia/d2d12389-92f0-4040-b23c-12d77139fa61.png)

Tiếp theo là file scm.php - file này chứa thông tin đường dẫn tới repo trên github của bạn

![](https://images.viblo.asia/5bb842b9-51d6-4e59-bf37-97d778369a87.png)

Cuối cùng cần quan tâm là file events.php, file này chứa thông tin những câu lệnh mà bạn muốn chạy để dựng được project lên một cách hoàn chỉnh.

![](https://images.viblo.asia/fd106d52-ac1d-40a7-b5b6-1dae2a5248ef.png)

OK, khá đơn giản phải không. Bây giờ muốn deploy lên server thì trên terminal bạn chỉ cần gõ
```
$ rocketeer deploy --on=staging --branch=develop // Nếu trên môi trường staging với branch develop
$ rocketeer deploy --on=production --branch=master // Nếu trên môi trường production với branch master
```

Đến đây việc auto deploy vẫn chưa hoàn chỉnh, lúc này nếu dự án của bạn đang sử dụng Sun* CI, thì bước tiếp theo sẽ cần thiết cho bạn. Chúng ta có thể hiểu đơn giản rằng, để ssh vào server chúng ta cần file rsa_key trong thư mục .ssh trên máy tính, vậy để Sun* CI làm thay được chúng ta việc ssh vào server thì buộc Sun* CI cũng phải có một rsa_key.

Khi kích hoạt project trên Sun* CI, bạn vào tab secret trong phần setting sẽ thấy có một rsa_key do Sun* CI tự sinh ra, việc cần làm là copy key này và bỏ vào file `authorized_key` của thư mục .ssh trên server của bạn.

![](https://images.viblo.asia/20beb818-5933-44fb-98c5-d361be9df563.jpg)

Tiếp theo việc cần làm là config file .framgia-ci.yml để cho Sun* CI biết rằng bạn muốn deploy

![](https://images.viblo.asia/dc22b25b-635d-4d08-aa66-7ef1af4db28d.png)

Vậy là xong, mỗi khi merge PR, đồng nghĩa với việc bạn muốn Sun* CI deploy nếu không có bất kỳ một lỗi nào sảy ra với bản build đó. tức là không có một lỗi phpcs, lỗi eslint hay fail PhpUnit.

# Kết luận
Trên đây là toàn bộ hướng dẫn của mình về việc auto deploy dự án khi sử dụng Sun* CI, tuy còn nhiều hạn chế so với những đàn anh CICD nổi tiếng, nhưng ít nhiều đây cũng là một sản phẩm do chính chúng ta tạo ra, phần nào đáp ứng được nhu cầu CI, CD của một số project. Trong tương lai không xa R&D Unit sẽ tiếp tục cải tiến và đưa ra sản phẩm Sun* CI hoàn thiện hơn. Mong mọi người ủng hộ. Thanks !