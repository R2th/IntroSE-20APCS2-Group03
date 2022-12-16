Hôm trước mình đã có một bài viết nói về <strong><a href="https://hungphamdevweb.com/laravel-vai-phut-tim-hieu-laradock.html">Laradock</a></strong>, cóvài anh em hỏi mình về cách tạo nhiều <strong>Database</strong> cùng một lúc.

Do đang rảnh rỗi nên hôm nay mình sẽ viết một tí chia sẽ cho các anh em nhé.

Có 2 cách nhanh chóng để tạo nhiều <strong>Database</strong> trong <strong>Laradock:</strong>
<ul>
 	<li>Có thể tạo một file SQL và thực thi nó để tạo <strong>Database</strong></li>
 	<li>Hoặc có thể sử dụng vài câu lệnh trên container của <strong>MariaDB</strong> để tạo <strong>Database</strong></li>
</ul>
<h2>Cách đầu tiên:</h2>
Cách này khá đơn giản, nhưng đầu tiên các anh em cần vào <strong><a href="https://mariadb.com/kb/en/library/create-database/">trang này</a></strong> và tìm hiểu sơ về các câu lệnh có trong <strong>MariaDB</strong> trước đã.

Kế đến truy cập Floder theo thứ tự như sau: <strong>laradock</strong> &gt; <strong>mariadb</strong> &gt; <strong>docker-entrypoint-initdb.d</strong>.

Trong Floder <strong>docker-entrypoint-initdb.d</strong> hãy tạo một file <code>create.sql</code> và copy dòng lệnh bên dưới vào:
```
CREATE DATABASE IF NOT EXISTS db1 COLLATE = 'utf8_general_ci';
CREATE DATABASE IF NOT EXISTS db2 COLLATE = 'utf8_general_ci';
CREATE DATABASE IF NOT EXISTS db3 COLLATE = 'utf8_general_ci';
```
<strong>Giải thích một tí ở đoạn mã phía trên:</strong>

Ở đây chúng ta sẽ tạo lần lượt 3 <strong>Database</strong> : "db1, db2, db3" với unicode character là <code>utf8_general_ci</code>

Và hệ thống sẽ tự động check tự tồn tại của <strong>Database</strong> dựa vào cú pháp <code>IF NOT EXISTS</code>. Trong trường hợp <strong>Database</strong> đã tồn tại rồi thì nó sẽ báo lỗi.

Sau khi đã run container <strong>MariaDB</strong>, chúng ta sẽ truy cập bằng lệnh sau:
```
docker-compose exec mariadb bash
```
<em>Lưu ý: ở đây mình sử dụng <code>mariadb</code> nên ai sử dụng <code>mysql</code> có thể thay lại nha.</em>

Tiếp theo đó run command line bên dưới để bắt đầu tạo <strong>Database</strong>:
```
mysql -u root -p < /docker-entrypoint-initdb.d/create.sql
```
Và đừng quên nhập password root cho để cấp quyền cho nó nha.
<h2>Cách thứ hai:</h2>
Cách này cũng tương tự như cách trên một xíu nhưng khác ở chỗ là chúng ta sẽ chạy trực tiếp câu lệnh trên container <strong>MariaDB</strong>

Đầu tiên chúng ta sẽ truy cập vào <strong>MariaDB</strong> bằng dòng lệnh sau:
```
docker-compose exec mariadb bash
```
Tiếp đó chúng ta sẽ dùng lệnh bên dưới để tạo <strong>Database</strong>:
```
CREATE DATABASE newdb COLLATE = 'utf8_general_ci';
```
Và enter thế là xong.
<h2>Kết luận:</h2>
Bình thường mình hay truy cập <code>phpmyadmin</code> để tạo mới <strong>Database</strong> nhưng cách này nó thật là củ chuối. Với việc sử dụng cú pháp SQL mình nghĩ nó sẽ nhanh hơn nhiều.

Hy vọng bài viết sẽ giúp các anh em có thêm một số kiến thức về SQL cũng nhưng cách sử dụng <strong>Laradock</strong> hiệu quả hơn.

Mọi thắc mắc vui lòng để lại bình luận bên dưới nhé thân chào và quyết thắng :stuck_out_tongue_closed_eyes:

Theo dõi bài viết gốc của mình ở link bên dưới nhé:
**[https://hungphamdevweb.com/docker-tao-multiple-db-trong-laradock.html](https://hungphamdevweb.com/docker-tao-multiple-db-trong-laradock.html)**