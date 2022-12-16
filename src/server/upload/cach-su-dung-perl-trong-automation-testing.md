Perl được sử dụng rộng rãi trong automation. Nó có thể không phải là ngôn ngữ lập trình tốt nhất trên thế giới nhưng phù hợp nhất với các loại tasks. Chúng ta hãy thảo luận về nguồn gốc & tại sao Perl được sử dụng cho Kiểm tra tự động.

## Kiểm tra lưu trữ

![](https://images.viblo.asia/1db5035c-1560-4a95-b6be-afbdbdce3b2b.png)https://images.viblo.asia/1db5035c-1560-4a95-b6be-afbdbdce3b2b.png


Lưu trữ là gì? Dữ liệu được lưu trữ trong Files

Giả sử, chúng ta có trường hợp "kiểm tra liên quan đến lưu trữ, nơi chúng ta phải ghi dữ liệu trên một phân vùng, đọc nó và xác minh rằng dữ liệu được ghi chính xác."

Điều này có thể được thực hiện thủ công, nhưng một người kiểm tra thủ công làm sao có thể thực hiện cùng lúc 10000 lần không? Nó sẽ là một cơn ác mộng! :)

Vì vậy chúng ta cần automation

Công cụ tốt nhất để tự động hóa mọi thứ liên quan đến lưu trữ là Perl vì Kỹ thuật xử lý tệp, REGEX và phân tích tệp mạnh mẽ của nó tiêu tốn ít thời gian thực hiện nhất so với các ngôn ngữ lập trình khác.

Tại sao chúng ta cần kiểm tra lưu trữ? Hãy suy nghĩ về Trung tâm dữ liệu lớn nơi dữ liệu sẽ được truyền liên tục từ hệ thống này sang hệ thống khác với 1000 hồ sơ được lưu trữ mỗi giây. Kiểm tra độ bền của cơ chế lưu trữ như vậy là cần thiết.

Nhiều công ty như HP, Dell, IBM và nhiều nhà sản xuất máy chủ sử dụng Perl làm giao diện để kiểm tra chức năng trong các lĩnh vực Lưu trữ và Mạng. NetApp là một trong những công ty hoàn toàn hoạt động trên Storage và sử dụng Perl làm ngôn ngữ Lập trình để tự động hóa các trường hợp thử nghiệm.

Nếu bạn quan tâm đến Tự động hóa Perl, thì nên tìm hiểu về các khái niệm lưu trữ và kết nối mạng.


## Kiểm tra Sever và Network


![](https://images.viblo.asia/0e4ccb46-96bc-44ce-ad13-97cc10e71e1a.png)

PERL được sử dụng rộng rãi trong giám sát hiệu suất và thời gian hoạt động của máy chủ.

Hãy xem xét một trung tâm dữ liệu có 100 hosts (servers). Bạn được yêu cầu kết nối với từng máy chủ, thực hiện một số lệnh từ xa. Bạn cũng muốn khởi động lại hệ thống và kiểm tra khi nó trở lại trực tuyến.

Làm thủ công nhiệm vụ này cho tất cả 100  hosts sẽ là một cơn ác mộng. Nhưng chúng ta có thể dễ dàng tự động hóa việc này bằng PERL

Các bước thiết kế để đạt được điều này tự động hóa trên bằng cách sử dụng PERL:


1. Lấy đầu vào từ tệp về thông tin máy chủ như (IP, Tên người dùng và Mật khẩu).
2. Sử dụng Net :: SSH2 để kết nối với từng hệ thống và thiết lập kênh để thực hiện các lệnh.
3. Thực thi lệnh yêu cầu ex: ls, dir, ifconfig, ps, v.v.
4. Khởi động lại hệ thống.
5. Đợi 10 phút để hệ thống xuất hiện.
6. Ping hệ thống bằng mô-đun Net :: Ping và in trạng thái.

Chúng ta sẽ code theo kịch bản trên.

Chúng ta hãy lấy một tệp có tên Input.txt sẽ lưu trữ thông tin đầy đủ về tất cả các máy chủ mà chúng ta cần kết nối và thực hiện lệnh.

**Input.txt**

192.168.1.2 root password

192.168.1.3 root password

192.168.1.4 root root123



**HostCheck.pl**

```
use Net::SSH2;
use Net::Ping;
use strict;
use warnings;
my $ping = Net::Ping->new();    #Tạo đối tượng cho Net::Ping
my $SSHObj = Net::SSH2->new();  #Tạo đối tượng cho Net::SSH2
open( FH, "Input.txt" );        #Mở tệp và đặt nội dung vào FH
my @hosts = <FH>;
my $ip;
my @ips;
foreach (@hosts)
{
    if ( $_ =~ /(.*)\s+(\w+)\s+(.*)/ )    #Regex to get each info from file
    {
        $ip = $1;
        my $user = $2;
        my $password = $3;
        $SSHObj->connect($ip);
        print "Connecting to host -- $ip --Uname:$user --Password:$password\n";
        my $status = $SSHObj->auth_password( $user, $password );
        print "$status\n";
        die("unable to establish connection to -- $ip") unless ($status);
        my $shell = $SSHObj->channel();
        print "$_\n" while <$shell>;
        $shell->blocking(1);
        $shell->pty('tty');
        $shell->shell();
        sleep(5);
        #Thực hiện danh sách lệnh trên máy chủ lưu trữ cụ thể. Có thể là bất kỳ lệnh nào
        print $shell "ls \n";
        print "$_\n" while <$shell>;
        print $shell "ps \n";
        print "$_\n" while <$shell>;
        print $shell "dir \n";
        print "$_\n" while <$shell>;
        print $shell "init 6\n";    #rebooting the system
        push( @ips, $ip );
    }
}
sleep 600;
foreach (@ips)
{
    if ( $ping->ping($_) )
    {
        print "$_ is alive.\n" if $ping->ping($_);
    }
    else
    {
        print "$_ is not still up --waiting for it to come up\n";
    }
}
```


**Kiểm tra Web**


Perl không chỉ giới hạn trong thử nghiệm Lưu trữ & Mạng. Chúng tôi cũng có thể thực hiện kiểm tra dựa trên Web bằng PERL. WWW-Mechanize là một mô-đun được sử dụng để kiểm tra web. Về cơ bản, nó sẽ không khởi chạy bất kỳ trình duyệt nào để kiểm tra chức năng của ứng dụng web thay vì nó sử dụng mã nguồn của các trang html.

Chúng ta cũng có thể thực hiện kiểm tra dựa trên trình duyệt bằng trình điều khiển Selenium IDE, RC, Web. Perl được hỗ trợ cho Selenium.



*Nguồn dịch: * https://www.guru99.com/how-perl-is-used-in-automation-testing.html