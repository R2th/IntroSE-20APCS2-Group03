# Mở đầu 
Sau khi làm xong bài SecureCode1 ([write-up](https://viblo.asia/p/write-upvulnhub-securecode1-6J3Zgd2glmB)), mình được giới thiệu một tựa game siêu phẩm mo bi lé là Flick2, lần này chúng ta được cho một file apk và mục tiêu của chúng ta là đi tìm lỗi trong app client từ đó có thể tấn công vào server. Ngôn ngữ được sử dụng ở đây là java, ngôn ngữ mình không thích cho lắm nhưng biết sao giờ :). Let's **GO**
# Write-up
Sau khi tải file từ Vulnhub ta sẽ có 2 file chính cần để ý là file *flick-check-dist.apk* và file *flickII-dist.ova*. Như mình đã nói ở trên đây là bài review source code nên mình sẽ tập trung vào file apk trước.
## Source code
Việc đầu tiên ta cần làm đó là tìm cách decompile từ file apk thành các file source code. Ta có thể dễ dàng decompile các file apk thông qua cả web và phần mềm, trong bài này mình sẽ dùng phần mềm [jadx](https://github.com/skylot/jadx/releases) bạn chỉ việc tải file exe nếu bạn đã cài jre còn không bạn có thể chọn tả file zip có chứa kèm jre
![image.png](https://images.viblo.asia/fcb6bf50-7543-4457-92f6-a3cc3be668d3.png)
Sau khi tải phần mềm bạn chỉ việc chọn đường dẫn đến thư mục của file apk là xong các việc còn lại phần mềm sẽ làm hết. Đợi một lúc để phần mềm chạy xong ta sẽ được các file như sau<br>
![image.png](https://images.viblo.asia/52fe31ba-015a-4d40-a4e9-b46058ee078f.png)<br>
Sau khi decompile ta có khá là nhiều file làm ta hoang mang nhưng ta có thể bỏ qua các thư mục khác vả chỉ tập vào thư mục com. Tuy nhiên trong thư mục com không phải tất cả các file đều cần quan tâm ví dụ như jcraft.jsh mình có search thử thì biết đây là thư viện hỗ trỡ giống như android.support nên mình bỏ qua luôn.
Giờ mình đã giảm được khá nhiều các file nên bây giờ mình sẽ cố gắng hiểu các hành vi của từng fuction trong chương trình. Sau một lúc đọc tất cả các file mình tiếp tục rút gọn được các class cần tập trung là DoRegisterActivity, CommandActivity và R
Giờ mình cùng tìm hiểu xem các class làm gì
### DoRegisterActivity
![image.png](https://images.viblo.asia/f706854b-eab3-49b0-a344-f92ce0f7e4d4.png)
![image.png](https://images.viblo.asia/daeb7b6c-6ad0-4d80-8ab6-3e4108a2c78f.png)
![image.png](https://images.viblo.asia/9fe98561-2472-4d91-a561-3270fdc640ad.png)

Về cơ bản thì đầu tiên chương trình sẽ lấy android_id và gửi thông tin này với POST request có dữ liệu dưới dạng json để đăng kí mới
```
urlConnection.setRequestMethod("POST");
urlConnection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
JSONObject uuid = new JSONObject();
uuid.put("uuid", deviceId);
```
Nếu đăng kí thành công ta sẽ nhận được một mã token 
```
if (responseJson.getString("registered").equals("ok")) {
                    return responseJson.getString("token"); 
                    }
```
Từ những thông tin trên mình đã viết một hàm bằng Go để lấy token 
![image.png](https://images.viblo.asia/b6aec9eb-8bc3-4434-8e15-a8dd36fd27da.png)
Giờ ta đã có được token nhưng ta phải làm gì với nó? Để trả lời câu hỏi này ta phải tiếp tục đến với hàm CommandActivity
### CommandActivity
![image.png](https://images.viblo.asia/b00f6994-81d6-44ac-bf71-ba4d5f705a7f.png)
![image.png](https://images.viblo.asia/815d7c50-93a0-44d7-aabc-fb26dee5ce97.png)
![image.png](https://images.viblo.asia/f9135611-81a4-4f64-a1a4-722d8823a7f2.png)
![image.png](https://images.viblo.asia/4070bc00-9006-4669-bf7b-a3c70bb8e43b.png)

Ngay ở đầu ta có một chuỗi integrity_check nhưng chưa biết phải làm gì với nó nên mình tạm bỏ qua
```
String integrity_check = "YFhaRBMNFRQDFxJEFlFDExIDVUMGEhcLAUNFBVdWQGFeXBIVWEsZWQ==";
```
Sau khi đọc toàn bộ class thì mình biết được chương trình sẽ gửi một GET request đến chương trình. Trong request đó sẽ chứa X-UUID và X-Token header tương ứng là UUID của ta và Token mà ta sau khi đăng kí nhận được, cuối cùng là một lệnh bất kì mà ta truyền vào được encode base64
```
String base64_command = Base64.encodeToString(view.getTag().toString().getBytes(), 0);
new CallAPI().execute("https://" + api_server + "/do/cmd/" + base64_command, deviceId, api_auth_token);
urlConnection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
urlConnection.setRequestProperty("X-UUID", deviceId);
urlConnection.setRequestProperty("X-Token", api_auth_token);
```
Sau tất cả các thông tin mình có mình đoán đây là một lỗi liên quan đến Command Injection.
![image.png](https://images.viblo.asia/2366fe3f-2d2c-43b7-943c-542fdf6cdff7.png)
Xác nhận là thực thi được command nên mình sẽ cố gắng lấy reverse shell. Mình có code một hàm để lấy reverse shell
![image.png](https://images.viblo.asia/4dbf4e01-6ef9-434b-a814-77cbc9811484.png)
Giờ ta đã có được shell đầu 
![image.png](https://images.viblo.asia/9ed4684b-1883-49f8-9cba-262142c7302e.png)
## Privilege Escalation 
Khác với bài securecode1, bài này chúng ta có thể leo thang đặc quyền lên root
### Robin
Các bạn có nhớ chuỗi integrity_check không? Giờ đã đến lúc dùng đến nó. Trong hàm CommandActivity ta đã bỏ qua hai hàm quan trọng
![image.png](https://images.viblo.asia/068c9847-59f6-410d-a265-787961fa161a.png)
Về cơ bản thì hàm validate trả lại một chuỗi passoword và hàm còn lại sử dụng kết quả đó để kết nối ssh với username là robin. Việc cần làm bây giờ là tìm được chuỗi password. Mình cũng đã code một hàm để lấy được password 
![image.png](https://images.viblo.asia/a007c9b1-6b01-406e-9f83-9e27b78c4b5c.png)
Giờ ta đã có được mật khẩu của robin kết hợp với việc ta đang có reverse shell của nginx nên dễ dàng có được shell của robin<br>
![image.png](https://images.viblo.asia/d1ac6832-d4fd-4e14-8d6e-ca3db5ad9bbd.png)
### Bryan
Kiểm tra với `sudo -l `
![image.png](https://images.viblo.asia/b074bb39-6dd0-4153-b61d-5232cd3b420c.png)<br>
Để ý ở đây ta thấy có option **env_keep+=LD_PRELOAD** nên ta dễ dàng có được shell của bryan (chi tiết các làm ở bài [này](https://viblo.asia/p/write-upretired-privilege-escalation-ctf-oct-16-20-RQqKLo7m57z#_root-4)).
Điểm thú vị ở đây là ta phải tìm được đường dẫn đến *cc1* <br>
Sử dụng lệnh `find / 2>/dev/null -name cc1`<br>
Sau khi tìm được đường dẫn tiến hành export vào biến PATH
![image.png](https://images.viblo.asia/bd18ef89-041f-4d2f-8e42-6751be8149cc.png)<br>
Và ta làm tương tự như link ở trên, ta có shell của bryan 
![image.png](https://images.viblo.asia/80ab5616-2f97-4ef9-a29c-90a01a29cb24.png)
### Sean
Tiếp tục recon với lệnh `find / 2>/dev/null -perm -u=s -exec ls -la {} +`
![image.png](https://images.viblo.asia/1754f7d5-3885-4b8c-b2b6-03a3e8a41765.png)
Dùng lệnh strings để kiểm tra `strings /usr/local/bin/backup`
![image.png](https://images.viblo.asia/3d2f47e8-dec6-4d89-b61a-3f4cac253653.png)
Kết quả làm mình khá là ngạc nhiên vì nó cho ra khá rõ ràng các lệnh được sử dụng và điều mình để ý ở đây là lệnh tar đi với dấu * ( hay còn gọi là wildcard). Mình cũng đã trình bày cách leo thang thông qua cách này ở [đây](https://viblo.asia/p/write-upretired-privilege-escalation-ctf-oct-16-20-RQqKLo7m57z#_admin-3)
Ta tiếp tục có được shell của sean 
![image.png](https://images.viblo.asia/99eaec31-0098-4862-ad8f-47e8407343c5.png)
### Root
Để ý lệnh find ở trên ta còn có một file khác có SUID và owner là root <br>
`-rwsr-x---  1 root sean  866169 Aug 15  2015 /usr/local/bin/restore`<br>
Mình chạy thử xem file làm gì nhưng lại báo lỗi không có quyền mặc dù mình đang là sean <br>
![](https://images.viblo.asia/11faca84-279e-48f2-a90e-2b42823d5430.jpg)<br>
Mình vẫn chưa hiểu tại sao lệnh id thông báo mình đang thuộc group sean mà lại không đọc được file cộng với mình biết bài này cần phải khai thác buffer overflow mà mình chưa biết gì về bof nên mình sẽ tạm dừng bài ở đây, khi nào đã nắm vững được cách khai thác mình sẽ quay lại làm tiếp
# Conclusion
Qua bài này mình cần tìm hiểu thêm về bof cũng như phải tìm hiểu thêm vì sao trong trường hợp này  thuộc group sean mà lại không có quyền chạy. Nếu có bạn nào biết câu trả lời mong các bạn comment giải đáp giúp mình :heartpulse::heartpulse:
<br>Link code khai thác ở [đây](https://github.com/n00b-bot/Golang/blob/main/flick1.go)