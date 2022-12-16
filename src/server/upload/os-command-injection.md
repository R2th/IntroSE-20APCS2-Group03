![](https://images.viblo.asia/c27f6711-53bd-44a4-9867-61324eb3d2bb.png)

## I. Khái niệm
### 1. OS command injection là gì?
**OS Command Injection** (hay còn gọi là shell injection) là lỗ hổng cho phép kẻ tấn công thực thi các lệnh bất kì của hệ điều hành trên server chạy ứng dụng với đặc quyền của web server. Lỗ hổng xảy ra khi một ứng dụng gọi tới lệnh shell để thực thi một tác vụ với input do người dùng nhập vào nhưng không lọc các input một cách cẩn thận.

Lỗ hổng OS command injection có thể cho phép kẻ tấn công thực  hiện các hành vi như:
- Thực thi lệnh hệ thống.
- Làm tổn hại tới ứng dụng, server chạy ứng dụng cũng như dữ liệu trên đó.
- Thực hiện SSRF.
- Lấy được reverse shell.
- ...

tuỳ theo đặc quyền của web server mà lỗ hổng này có thể cho phép kẻ tấn công thực hiện được các hành vi khác nhau.

## II. Ví dụ 
### 1. Demo
Ví dụ trong phần này mình sẽ sử dụng của DVWA (*Damn Vulnerabilities Web Application*) - một ứng dụng web phổ biến được dùng để học về các lỗ hổng bảo mật của ứng dụng web.

Ở đây, ứng dụng có một chức năng thực hiện lệnh `ping` với giá trị **ip** do người dùng nhập vào.

![](https://images.viblo.asia/930e04ac-cba4-452b-b86a-453207dacc63.png)

Đoạn code thực hiện chức năng này là:

```php
<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
	// Get input
	$target = $_REQUEST[ 'ip' ];

	// Determine OS and execute the ping command.
	if( stristr( php_uname( 's' ), 'Windows NT' ) ) {
		// Windows
		$cmd = shell_exec( 'ping  ' . $target );
	}
	else {
		// *nix
		$cmd = shell_exec( 'ping  -c 4 ' . $target );
	}

	// Feedback for the end user
	$html .= "<pre>{$cmd}</pre>";
}

?>
```

Như bạn thấy ở đoạn code trên, không hề có bất cứ sự chuẩn hoá nào với tham số `ip` được gửi lênh. Ứng dụng sẽ sử dụng giá trị này và truyền vào câu lệnh shell. Giá trị trả về sẽ được in ra màn hình. 

Chính vì không có sự chuẩn hoá dữ liệu, kẻ tấn công có thể truyền vào thêm các lệnh OS vào tham số ip như `192.168.0.10&ls`

![](https://images.viblo.asia/05517242-1b25-4901-9016-50420d1f0910.png)

Như ảnh trên có thể thấy, kết quả trả về có bao gồm cả một đoạn 
```
help
index.php
source
```
là kết quả của lệnh `ls` được chèn vào trong tham số ip. Đồng nghĩa với việc kẻ tấn công có thể tấn công OS command injection trên ứng dụng.

### 2. Các lỗ hổng trên thực tế
Lỗ hổng OS Command Injection là một lỗ hổng có từ rất lâu rồi. Tuy nhiên, không vì thế mà ngày nay nó không còn nữa. Trên trang [https://cve.mitre.org/](https://cve.mitre.org/), ta có thể tìm thấy các CVE của lỗ hổng loại này vẫn còn, thậm chí là được mới công bố trong năm nay như:
- [CVE-2020-9478](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-9478): được tìm thấy trong Rubrik 5.0.3-2296.
- [CVE-2020-9020](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-9020): được tìm thấy trong các thiết bị Iteris Vantage Velocity Field Unit 2.3.1, 2.4.2, and 3.0.
- [CVE-2020-8427](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-8427): được tìm thấy trong các phiên bản trước 9.5.20 của Kaseya Traverse.

Có thể xem thêm các CVE của lỗ hổng này trên trang [https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=OS+Command+Injection](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=OS+Command+Injection).

## III. Cách tránh lỗ hổng OS Command Injection
Để hạn chế lỗ hổng OS Command Injection, chúng ta cần:
- Nếu không thực sự cần thiết, không sử dụng lệnh gọi các lệnh hệ thống trong code của ứng dụng.
- Nếu không thể tránh việc sử dụng các lệnh hệ thống, hãy chắc chắn rằng việc chuẩn hoá dữ liệu được áp dụng đúng:
    - giá trị nhập vào nằm trong whitelist các giá trị được sử dụng
    - giá trị nhập vào đúng kiểu được kì vọng bởi ứng dụng (số hay string...).
    - giá trị nhập vào chỉ chứa các kí tự chữ và số, không có các định dạng hay cú pháp.
    - ...

## IV. Tổng kết
Lỗ hổng OS Command Injection là lỗ hổng truyền thống nhưng hết sức nguy hiểm khi cho phép kẻ tấn công chạy được các lệnh hệ thống. Hi vọng qua bài viết ngắn này có thể giúp mọi người biết và tránh được lỗ hổng này.