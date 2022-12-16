# Mở đầu

![](https://raw.githubusercontent.com/hackvertor/hackvertor/master/src/main/resources/images/logo-light.png)

Trong thực tế khi thực hiện pentest, sẽ có những trường hợp các payload của chúng ta là không chỉ đơn giản là text, number, json mà cần phải được encode (VD: base64, hex,..), encrypt (VD: AES) thành dạng dữ liệu khác nhau để phù hợp với yêu cầu của server. Một trong những trang cho phép làm điều này một cách nhanh chóng và hỗ trợ nhiều loại nhất là: https://gchq.github.io/CyberChef/. Tuy nhiên, mỗi lần convert thì vẫn phải copy/paste hơi mất công. Với Hackvertor, ta có thể thực hiện ngay trong Burp. Cùng tìm hiểu về Hackvertor thông qua một số use-case dưới đây nhé.

# Hackvertor

Hackvertor là một extension cho Burp Suite, được phát triển bởi Gareth Heyes, research của công ty Portswigger Web Security, cũng chính là công ty phát triển ra công cụ Burp Suite. Extension có thể cài đặt trực tiếp từ **Extender > BApp Store** bên tron Burp Suite hoặc từ trang chủ: https://github.com/hackvertor/hackvertor

![image.png](https://images.viblo.asia/c5316259-c05b-4ed8-a6df-49341e2c4bec.png)

Sau khi cài đặt xong thì ở trên menu sẽ xuất hiện thêm menu của Hackvertor:

![image.png](https://images.viblo.asia/4058e6b6-9b88-4b52-8063-bc2016ca2d25.png)

Ngoài ra các tab của Repeater/Logger sẽ xuất hiện thêm tab Hackvertor:

![image.png](https://images.viblo.asia/af9c48da-89a6-4339-84a2-9b04f2110d8c.png)

Click vào tab đây sẽ hiện ra danh sách các category cũng như các function mà Hackvertor hỗ trợ.

![image.png](https://images.viblo.asia/5efcafa6-877f-4e30-aca8-915da56c86a6.png)

Hackvertor có hỗ trợ rất nhiều các kiểu biến đổi, mã hóa khác nhau, từ thông dụng như: rot13, base64, base58, hex, url encode, md5, sha1, cho đến phức tạp hơn như AES, hmac_sha1,... hay kể cả một số biến đổi đặc biệt như: random, random_unicode, gzip_compress,...

# Ví dụ thực tế

## Case 1: simple tag

> Hackvertor is a tag based conversion tool written in Java implemented as a Burp Suite extension. Tags are constructed as follows: <@base64_0><@/base64_0> the @ symbol is used as an identifier that it's a Hackvertor tag followed by the name of the tag in this case base64, the name is then followed by an underscore and a unique tag number.

Hackvertor là công cụ chuyển đổi, cho phép chúng ta biến đổi payload dựa vào các tag đã được định nghĩa sẵn (người dùng cũng có thể custom thêm, mình sẽ nói cụ thể hơn ở phần sau). Tức là, chúng ta sẽ chèn thêm các tag `<@base64>`  và `<@/base64>` trước và sau payload cần encode base64 thì khi thực hiện request, Hackvertor sẽ tự động biến đổi giúp chúng ta:

```
<@base64>your_payload_here<@/base64>
```

Mình có build 1 server demo bằng Flask, để giúp test xem payload chúng ta đã đẩy lên đúng chưa?

![image.png](https://images.viblo.asia/ec3ecc3a-50c5-4251-8c1c-da1991d8f9a2.png)

Đây là endpoint đơn giản nhận vào một param `p` trong **POST** body và output ra decode base64 của nó.

![image.png](https://images.viblo.asia/e311dccf-4fce-47e8-9ed0-3b0fc1ca2816.png)

Để sử dụng Hackvertor thì, ta cần chuyển sang tab Hackvertor, bôi đen vị trí cần biến đổi, rồi chọn tag tương ứng. VD: *base64* nằm trong category **Encode**:

![](https://images.viblo.asia/0ce14bcc-a4fb-43db-b64a-ea044c67014c.gif)

Giao diện của Hackvertor có 2 panel, khi bạn thay đổi payload thì ở panel thứ 2 sẽ hiện ra preview (hoặc error nếu payload chúng ta bị lỗi) rất tiện cho việc debug. Bấm gửi và ta thấy payload đã đúng format và được server chấp nhận.

Hackvertor hỗ trợ rất nhiều func khác nhau, bạn có thể tìm tên các func được hỗ trợ ở trong tab **Search** của Hackvertor.

## Case 2: nested tags

Hackvertor còn hỗ trợ việc nesting (lồng nhau) của các tag. Nghĩa là nếu payload của chúng ta cần phải biến đổi qua một chuỗi các biến đổi từ A ->  B -> C thì ta có thể lồng các tag này lại theo đúng thứ tự như trên. VD như endpoint dưới yêu cầu truyền vào payload theo biến đổi:

```
base64decode(rot13(your_payload_here))
```

![image.png](https://images.viblo.asia/a0b8229e-8f43-48e6-a114-02c9a32288c8.png)

Với trường hợp này chúng ta cần làm ngược lại: `base64 -> rot13 -> urlencode`

![](https://images.viblo.asia/46aecd76-a939-409a-a076-b8efa575e3c7.gif)

## Case 3: with parameters

Các tag của Hackvertor còn có thể nhận vào các tham số, như ở VD trước, hàm `rot13` thực chất là hàm `rotN` và chúng ta có thể thay đổi số 13, tham số đầu vào để có thể rotate với khoảng cách tùy ý.

```
<@rotN(13)>
```

![](https://images.viblo.asia/4b95a405-f56d-454c-842b-bc7e14799b33.gif)

## Case 4A: custom tag

Cùng đến với một ví dụ khó hơn nữa, đây là trường hợp mô phỏng, payload được truyền lên server sẽ được đi kèm với chữ ký `p`, giá trị của nó được tính toán dựa trên một hay nhiều tham số truyền vào. Để cho đơn giản thì trong trường hợp này, `p` được tính toán dựa trên `i` bằng thuật toán đã biết.

![image.png](https://images.viblo.asia/6ac23c4d-d2db-4811-a539-8644d1f103be.png)

![image.png](https://images.viblo.asia/9b9900c1-996e-4a03-84ee-343a6e4b8a48.png)

Như ở đầu bài mình có nhắc đến, thì Hackvertor cho phép chúng ta tạo custom tag, nhận các tham số và có thể được viết bằng các ngôn ngữ: Python (cần cài thêm JPython), Java, Javascript và Groovy. Tính năng thực thi code của tag mặc định là tắt nên trước hết, ta cần tích vào **Allow code execution tags**:

![image.png](https://images.viblo.asia/58a70760-159a-4475-a205-1617aaaf57c8.png)

Sau đó chọn vào **Create custom tag**:

![image.png](https://images.viblo.asia/a372fe85-38df-4bfc-82e3-26260adcd610.png)

Ở đây ta làm các bước như sau:

- Điền vào Tag name: khi render ra thì custom tag sẽ có thêm `_` ở trước trên, dùng để phân biệt với built-in tag. Ở đây ta chọn tên `custom_algo`.
- Lựa chọn ngôn ngữ cho tag. Ở đây mình sẽ dùng Python.
- Chúng ta có thể truyền tham số cho tag, giống như ở trường hợp `rotN` ở trên. Tham số có thể là *String* hoặc là *Number*. Ví dụ ở đây ta sẽ truyền luôn 2 const `1337` và `7331` của thuật toán trên thành 2 tham số tương ứng là `a` và `b` vào custom tag và đặt làm giá trị mặc định.
- Phần code chúng ta có 2 cách: 
	- Chỉ đường dẫn đến một file code (`.js`, `.java`, `.groovy`, `.py`) ở bên ngoài. Burp sẽ thực thi file code này.
	- Điền trực tiếp code vào.

Dù làm theo cách nào thì Hackvertor cũng sẽ định nghĩa sẵn 2 biến sau trong code:
- biến `input` chính là phần được bọc bên trong `<@_custom_algo>` là input đầu vào.
- biến `output` là kết quả trả ra sau khi thực hiện các biến đổi. Chúng ta sẽ gán giá trị cho biến này.

Với trường hợp này, mình sẽ input code trực tiếp như sau:

```
z = int(input); output = "arg_" +  str(z % a + z * b)
```

Code xong chúng ta có thể test code với input và các tham số mặc định:

![](https://images.viblo.asia/9b6886eb-589d-40df-8d17-4a0daf7cd12f.gif)

Đã ra đúng giá trị mong muốn. Nếu muốn edit/delete custom tag đã tạo, hãy vào menu **Hackvertor > List custom tags** nhé. Các custom tag đã tạo cũng sẽ được liệt kê trong tab **Custom** của Hackvertor.

![image.png](https://images.viblo.asia/e58514c4-e31d-464f-9a1d-7c38fc3ee389.png)

## Case 4B: set and get variables

Trong ví dụ trên, ta đang build được custom tag với output mong muốn và có thể sử dụng như sau:

```
p=<@_custom_algo(1337,7331,'a3cf964d875593734b05e0d8183735b0')>10<@/_custom_algo>&i=10
```

> phần `a3cf964d875593734b05e0d8183735b0` là mã hash ngẫu nhiên được sinh ra để tránh việc các request đi qua proxy của Burp instance có thể lợi dụng code excution tag thực thi câu lệnh tùy ý trên máy của pentester. Chỉ có custom tag có hash hợp lệ mới chạy được.

Tuy nhiên khi giá trị `i` thay đổi thì ta cần thay đổi cả ở bên trong nữa. Hackvertor cho phép chúng ta định nghĩa `i` thành một biến số và ta có thể sử dụng biến này thành input của custom tag:

```
<@set_variable1('false')>10<@/set_variable1>
```

sẽ định nghĩa 1 biến `variable1` (giá trị mặc định là `'false'`). Khi muốn sử dụng biến này ở vị trí khác, ta chỉ cần thêm tag:

```
<@get_variable1/>
```

> Hackvertor hỗ trợ hơn 10 variables khác nhau

Kết hợp lại chúng ta được kết quả như sau:

![](https://images.viblo.asia/5b7fedbd-2a03-4036-95b4-d35f62e3e472.gif)


## Case 5: generic code execution

Đối với những biến đổi phức tạp hơn nữa hoặc cần thư viện riêng thì chúng ta khó có thể sử dụng custom tag, cách tốt hơn là sử dụng tag code execution:

```
<@python('import subprocess;output = subprocess.check_output("C:/Users/Vigo/Desktop/ysoserial/bin/Debug/ysoserial_frmv2.exe -g ActivitySurrogateSelector -f LosFormatter -o raw -c whoami".split(" "));','d40ebaeea912efb340bd45af227efc5f')><@/python>
```

Như ví dụ tag ở trên, sẽ thực thi câu lệnh gen payload bằng ysoserial.NET với custom command truyền vào và đưa ra output.

Hoặc build payload cho https://viblo.asia/p/phan-tich-cve-2021-26295-apache-ofbiz-RQqKLGMO57z như minh họa dưới đây:

![](https://images.viblo.asia/9cfe4718-62ac-415e-afa2-2f532850df88.gif)

# Kết
> Khi chuyển từ tab Hackvertor sang tab Raw/Pretty thì việc xử lý payload của Hackvertor vẫn sẽ được thực hiện

Nên ngoài việc sử dụng ở Repeater thì Hackvertor còn có thể được sử dụng ở nhiều vị trí khác nhau trong Burp:

- **Intruder:** tương tự như ở Repeater, các tag có trong request sẽ được xử lý. Ngoài ra có thể sử dụng tag như là payload. Hackvertor cũng có thể được dùng làm các module cho các flow ở **Payload processing rules**: `Intruder tab -> Payloads tab -> Payload Processing section -> Add -> Invoke Burp Extension -> Select Processor`

![image.png](https://images.viblo.asia/f596df86-9362-4053-a5d0-d4a176b8bb38.png)

- **Proxy:** tag được xử lý khi đi qua Proxy, điều này rất hữu ích khi sử dụng các công cụ bên ngoài như sqlmap và cấu hình để poxy các request đi qua Burp.  Ví dụ: nếu giá trị của tham số  SQL Injection đang được mã hóa ở phía client, chúng ta sẽ cấu hình để payload ở sqlmap chứa các tag, và vị trí inject là tham số của tag. Khi đó, payload được bao trong tag ở sqlmap sẽ được mã hóa như bình thường.

Nếu bạn có cách tip & trick nào với Hackvertor có thể comment thêm để chia sẻ cùng mọi người nhé. See ya!

# Tham khảo
- https://appsec-labs.com/portal/advanced-testing-of-web-application-with-custom-message-signing-using-hackvertor/
- https://portswigger.net/research/bypassing-wafs-and-cracking-xor-with-hackvertor
- https://www.pentagrid.ch/en/blog/burp-suite-hackvertor-custom-tags-email-sms-tan-multi-factor-authentication/