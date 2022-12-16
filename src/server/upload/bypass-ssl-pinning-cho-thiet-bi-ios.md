Trong quá trình kiểm thử đối với ứng dụng iOS, việc sử dụng proxy để theo dõi các lưu lượng mạng mà ứng dụng sử dụng là điều hết sức cần thiết. Tuy nhiên, trong vấn đề bảo mật, việc đường truyền giữa ứng dụng và server bị chặn bắt, đọc và sửa đổi vốn đã vi phạm đến tính bảo mật và toàn vẹn của thông tin. Do đó, người ta đã tạo ra các phương pháp để ngăn chặn việc bị chặn bắt, đọc hay sửa đổi với thông tin trên đường truyền. Đầu tiên có thể kể tới là sử dụng SSL/TLS. Đây là cơ chế gần như mặc định chúng ta sẽ sử dụng trong hầu hết các kết nối Internet hiện nay. Tuy nhiên, trong trường hợp với ứng dụng mobile, việc kẻ xấu có thể cài đặt các chứng chỉ của hắn lên thiết bị và chặn bắt gói tin trên đường truyền rất dễ xảy ra. Do đó, người ta thường sử dụng thêm một cơ chế là **SSL/TLs pinning**. 

Đây là một cơ chế bảo vệ tính an toàn trên đường truyền của dữ liệu. Nó hoạt động rất tốt trong việc ngăn chặn việc chặn bắt các gói tin trên đường truyền. Tuy nhiên, trong kiểm thử ứng dụng, đây đồng thời là một khó khăn khi muốn chặn bắt các gói tin, các pentester sẽ cần có cách bỏ qua cơ chế này. Vậy trong bài này, mình sẽ giới thiệu về cách thiết lập proxy cho thiết bị di động trong quá trình kiểm thử cũng như cách bypass ssl pinning mà mình thường sử dụng trong quá trình kiểm thử ứng dụng. Trong bài này mình sử dụng burp proxy cho tất cả các ví dụ. Các ví dụ dưới đây được thực hiện trên thiết bị đã jailbreak.

## I. Thiết lập proxy cho thiết bị iOS

### 1. Thiết lập burp proxy
Trước tiên, nếu bạn chưa cài đặt BurpSuite thì có thể tải file cài đặt của ứng dụng này tại [trang download của BurpSuite](https://portswigger.net/burp/releases/professional-community-2021-5-1?requestededition=community)

Sau khi đã tải về và cài đặt thành công, chúng ta khởi động Burp Suite lên. Đây là giao diện sau khi chạy ứng dụng 

![](https://images.viblo.asia/ccfd83d6-882e-413e-a923-317e600fb8ad.png)

Tiếp theo, ta sẽ cấu hình proxy tại Proxy > Option > Edit Proxy

![](https://images.viblo.asia/e68be720-867c-4437-a20c-2300510d72f4.png)

Ở đây, có thể chọn *All interfaces* hoặc *Specific address* tùy theo nhu cầu. Với lựa chọn *Specific address* thì chúng ta sẽ nhập vào địa chỉ của thiết bị iOS trong mạng. Tiếp theo, bên phía TLS Protocol, chúng ta sẽ chọn *Use custom protocol* và bỏ đi TLS v1.3. Lí do là vì với một số ứng dụng, việc sử dụng giao thức này có thể phát sinh lỗi nên bỏ trước cho chắc ăn.

![](https://images.viblo.asia/cbb1f0d8-336f-4295-8601-924ba4e1cbc9.png)

Ok, giờ lưu lại cấu hình này là xong.


### 2. Thiết lập cho thiết bị iOS

Tiếp theo, với thiết bị iOS, ta sẽ thực hiện với 2 trường hợp là kết nối USB và kết nối WIFI.

#### a. Kết nối USB
Để gửi các gói tin của thiết bị kết nối qua USB đến burp proxy, trước tiên, ta sẽ thực hiện remote port forwarding. Đầu tiên là kết nối một cổng bất kì trên máy tính với 1 cổng trên máy iOS với **iproxy**. 

```bash
iproxy ${local port} ${device port}
```

Ví dụ

```bash
iproxy 2222 22
```

Tiếp theo thực hiện remote port forwarding thông qua ssh.

```bash
ssh -p 2222 8080:localhost:8080 root@localhost
```
Cuối cùng vào phần wifi của thiết bị chọn chi tiết, kéo xuống *Proxy HTTP* và thiết lập cấu hình proxy.

![](https://images.viblo.asia/8ba7ae3b-7451-4526-889b-ab32c41a5efa.jpg)

Giờ mở trình duyệt lên và chúng ta đã có thể truy cập tới các trang http rồi.

![](https://images.viblo.asia/97c0027f-db85-41f0-999a-b9888bd24efa.jpg)

#### b. Kết nối WIFI
Kết nối máy tính và thiết bị vào cùng một mạng wifi, chúng ta cũng có thể gửi các kết nối từ thiết bị iOS tới máy tính. Đầu tiên, thiết lập burp proxy tương tự như bên trên.

Trên thiết bị iOS, vào cài đặt wifi để thiết lập HTTP Proxy như trên.

![](https://images.viblo.asia/5d34ed01-6a1d-40d1-8d40-6926cc93f3d3.jpg)

Ở đây thì phần host chúng ta sẽ truyền vào địa chỉ IP của máy tính.

### 3. Cài đặt chứng chỉ trên thiết bị iOS
Bây giờ, khi chúng ta đã có kết nối tới các trang http. Tuy nhiên, để có thể gửi các request https, chúng ta cần cài đặt chứng chỉ của proxy lên thiết bị. Với BurpSuite, truy cập tới *http://burp* bằng safari.

![](https://images.viblo.asia/d4003c2e-1cd2-443e-a3dc-21df471101fc.jpg)

Bấm vào *CA Certificate* để tải về cấu hình.

![](https://images.viblo.asia/fe165372-c282-4871-b109-be6195cb009b.jpg)

Sau khi tải về, cấu hình sẽ nằm trong cài đặt

![](https://images.viblo.asia/c2223568-eaf2-4a58-92ee-e13158a5deae.jpg)

Bấm vào *Đã tải về hồ sơ* và tiến hành cài đặt

![](https://images.viblo.asia/912d60c4-c51c-4226-a618-e20bf20772d3.jpg)

![](https://images.viblo.asia/21f476a2-f06c-4e72-a16e-6e2811667607.jpg)

Cuối cùng là đặt chứng chỉ này thành root CA. Vào **Cài đặt > Cài đặt chung > Giới thiệu > Cài đặt tin cậy chứng nhận** và enable root CA cho chứng chỉ chúng ta vừa cài đặt.

![](https://images.viblo.asia/73086b92-b756-4aef-a1cb-529d63f71c51.jpg)

Giờ ta đã có thể truy cập tới các trang web thông thường được rồi.

![](https://images.viblo.asia/44a08c39-b293-4cf2-86f9-7c429c3fec1e.jpg)

Trên phần intercept của burp ta có thể xem các gói tin gửi từ thiết bị iOS

![](https://images.viblo.asia/b4fe649b-55aa-4344-af3e-e273184cfdff.png)

## II. Bypass SSL/TLS Pining
### 1. Khái niệm SSL/TLS Pinning

SSL/TLS pinning hay gọi ngắn gọn là pinning là một kĩ thuật, trong đó các chứng chỉ SSL/TLS định danh một *host* sẽ được gắn vào (pinning) ứng dụng. Ứng dụng sẽ sử dụng các chứng chỉ này trong xác thực SSL/TLS thay vì sử dụng các chứng chỉ của hệ điều hành. Vì cài đặt một chứng chỉ khác vào ứng dụng là rất khó khăn, nên việc chặn bắt gói tin sẽ trở nên khó khăn hơn rất nhiều.

Cơ chế chung của việc bypass việc kiểm tra này là vô hiệu hoá các hàm kiểm tra SSL pinning. Điều này có thể thực hiện từ việc sửa mã nguồn hoặc là trước khi chạy ứng dụng. Dưới đây là một số cách đơn giản và phổ biến mà mình thường sử dụng

### 2. Sử dụng Frida

Chúng ta có thể các đoạn script để tắt đi các hàm kiểm tra SSL/TLS pinning có trong ứng dụng. Có thể tham khảo một đoạn script tại [đây](https://codeshare.frida.re/@snooze6/ios-pinning-disable/)

```javascript
/*
    https://kov4l3nko.github.io/blog/2018-05-27-sll-pinning-hook-sectrustevaluate/

	****************************************
	 killSSL.js Frida script
	 by Dima Kovalenko
	****************************************
	
	Usage:
		
		1. Run Viber on the device
		
		2. Inject the script to the process:
			$ frida -U -n Viber  -l path/to/killSSL.js
		
		3. SSL pinning in Viber HTTPs is
		   disabled. Now you can intercept
		   Viber HTTPs requests, e.g. with
		   mitmproxy.
*/

function disable_SecTrustEvaluate() {
    // Are we debugging it?
    DEBUG = true;
		
	// Get SecTrustEvaluate address
	var SecTrustEvaluate_prt = Module.findExportByName("Security", "SecTrustEvaluate");
	if (SecTrustEvaluate_prt == null) {
		console.log("[!] Security!SecTrustEvaluate(...) not found!");
		return;
	}
		
	// Create native function wrappers for SecTrustEvaluate
	var SecTrustEvaluate = new NativeFunction(SecTrustEvaluate_prt, "int", ["pointer", "pointer"]);
	
	// Hook SecTrustEvaluate
	Interceptor.replace(SecTrustEvaluate_prt, new NativeCallback(function(trust, result) {
		// Show "hit!" message if we are in debugging mode
		if (DEBUG) console.log("[*] SecTrustEvaluate(...) hit!");
		// Call original function
		var osstatus = SecTrustEvaluate(trust, result);
		// Change the result to kSecTrustResultProceed
		Memory.writeU8(result, 1);
		// Return errSecSuccess
		return 0;
	}, "int", ["pointer", "pointer"]));
	// It's done!
	console.log("[*] SecTrustEvaluate(...) hooked. SSL should be pinning disabled.");	
}

// Run the script
// disable_SecTrustEvaluate();
```

đoạn code này khá đơn giản và ít chức năng nhưng đủ để ta hình dung được về cách sử dụng của frida script. Để sử dụng đoạn code này, ta có thể dùng lệnh

```bash
frida --codeshare snooze6/ios-pinning-disable -f YOUR_BINARY
```
### 3. Sử dụng Objection
Objection là một tiện ích được phát triển trên nền tảng của frida. Trong các module của nó, có module để tắt các hàm kiểm tra SSL/TLS pinning. Để sử dụng objection, trước tiên, ta mở ứng dụng với objection:

```bash
objection --gadget "App Bundle ID" explore
```

Trong console của objection, ta sử dụng lệnh sau để tắt SSL/TLS pinning

```bash
ios sslpinning disable
```
### 4. Sử dụng SSL Killing Switch 2
**SSL Killing Switch 2**  là một tweak thường được sử dụng để loại bỏ các hàm kiểm tra SSL/TLS pinning. Reposity của dự án có thể xem tại [https://github.com/nabla-c0d3/ssl-kill-switch2](https://github.com/nabla-c0d3/ssl-kill-switch2). Ngoài ra, có thể cài đặt tweak này với Cydia.

Sau khi đã cài đặt, trong phần cài đặt của thiết bị iOS sẽ có một mục *SSL Kill Switch 2*. Ta có thể chọn disable hay enable tweak này tại đây.
### 5. Dịch ngược
Khi mà tất cả cách trên đã không thể hoạt động, giải pháp cuối cùng mình lựa chọn là dịch ngược ứng dụng và tìm các hàm nào có vẻ liên quan tới SSL/TLS pinning và disable các hàm này. Sau đó tạo một file mới, kí lại ứng dụng và cài đặt lại.

Tuy nhiên, dịch ngược đòi hỏi nhiều kĩ năng và kiến thức. Hơn nữa nếu ứng dụng đã được mà hóa và obfuscate thì công việc này không hề đơn giản chút nào. May mắn là đại đa số các ứng dụng thông thường sẽ không yêu cầu cao tới mức này :))))

## III. Kết luận
Trên đây là một số hiểu biết của mình về việc kiểm thử với các ứng dụng có sử dụng SSL pinning. Nhìn chung thì có thể còn các phương pháp khác nữa để có thể bypass công nghệ này. Giống như một phương châm mà mình từng được về ngành này là "Không có hệ thống tuyệt đối an toàn, càng không có giải pháp hoàn hảo", tất cả những gì chúng ta có thể làm là hạn chế tối đa các rủi ro có thể có cũng như ảnh hưởng của chúng mà thôi. Hi vọng bài viết có thể có ích với mọi người.