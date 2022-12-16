![](https://images.viblo.asia/40c92226-a80f-4f9b-90f4-492e8a8a1ffc.png)

# Văn vẻ mở đầu
Chắc hẳn các bạn sinh viên khi học các môn lập trình trên trường đều ít nhiều được nghe đến khái niệm **Code sạch - Clean code**: là cách đặt tên biến, tên hàm; cách code sao cho dễ đọc, đễ hiểu.

=> Tránh trường hợp người khác đọc code của mình không hiểu gì. Tệ hơn là tự mình đọc lại code cũ của mình cách đây 3 tháng cũng phải "Thằng nào code cái A#$@xw*& gì đây? - Úi, hóa ra là code của mình".

Khi học lên cao hơn, chúng ta sẽ được làm quen với các ngôn ngữ hướng đối tượng (trường mình dạy Java OOP), thì lúc này chúng ta còn phải luyện thêm cách **Code dễ phát triển, nâng cấp**. Điều đó thể hiện qua cách chia hàm; cách sử dụng kế thừa, implements; cách sử dụng các từ khóa public, private, protected, static,...

Nhưng thường thì chúng ta sẽ không, hoặc ít được biết đến **Code an toàn - Secure coding**. Code an toàn là bộ các nguyên tắc để tránh tạo ra những lổ hổng bảo mật, có thể bị khai thác bởi kẻ xấu. Rất nhiều lỗ hổng bảo mật nguy hiểm có thể được ngăn chặn dễ dàng nếu chúng ta biết về cách để code an toàn.

Nếu đứng ở phía doanh nghiệp, khi code an toàn thì họ có thể tiết kiệm được rất nhiều chi phí tổn thất từ các sự cố do bị kẻ tấn công khai thác lỗ hổng trên web, trên ứng dụng di động, và trên các sản phẩm công nghệ mà công ty đang sử dụng.

=> Secure coding rất quan trọng đúng không.

# Giới thiệu Secure coding CTF
Secure coding CTF là một cuộc thi được tổ chức bởi [The National Cybersecurity Student Association](https://www.cyberstudents.org/secure-coding-challenge/). Cuộc thi được tổ chức dưới hình thức tìm kiếm lỗ hổng trong các trang web, tập trung chủ yếu vào các ngôn ngữ lập trình: **PHP**, **Java** và **Python**. Với mỗi bài, thí sinh sẽ được cung cấp các file mã nguồn cần thiết để tìm kiếm lỗ hổng và khai thác.

Cuộc thi diễn ra tại [https://ctf.vford.com/](https://ctf.vford.com/) và lúc mình viết bài này thì trang web cuộc thi vẫn còn hoạt động.

Cuộc thi chia làm 4 tuần với tổng cộng 20 bài thi. Các bài thi chỉ ở mức độ dễ - trung bình, hàm lượng kiến thức chuyên về An toàn thông tin cũng không quá nhiều, nên kể cả những lập trình viên không hiểu biết nhiều về An toàn thông tin cũng có thể hiểu và làm được. 

Trong bài viết này mình sẽ gom lại các bài theo dạng lỗ hổng trước, rồi đến các bài với lỗ hổng riêng, và cuối cùng là các bài ít liên quan đến lỗ hổng trong thực tế. Những ai muốn xem write up của riêng các bài thì có thể Ctrl+F tìm tên bài để đọc nhé.

Giờ thì là write up của Secure coding CTF :point_down::point_down::point_down:

# 1. Lộ các thông tin, chức năng quan trọng
Lỗ hổng này xảy ra do lập trình viên bất cẩn để lộ các thông tin quan trọng trong code, chưa tắt các chức năng phục vụ debug khi đưa dịch vụ hoạt động chính thức. Khi kẻ tấn công bằng kỹ thuật của mình đọc được 1 phần mã nguồn, tìm được các thông tin, chức năng quan trọng, thì có thể thông qua các thông tin này để tấn công, phá hoại, đánh cắp dữ liệu.

## 1.1. Lộ chức năng debug trong bản phát hành chính thức
Thông tin:
- Tuần: 1
- Bài: Da Bug
- Ngôn ngữ lập trình: Python
- Mã nguồn: https://ideone.com/uuTlWW

Trong code đã comment rất kỹ, chúng ta cần chú ý đoạn code từ dòng 26 - 35:
```python
# for debugging, we can read a specified file
# this functionality exists for admins to test out how stuff works
# admins can use normal linux terminal commands
# users do not need to know about this :)
debug = ''
if '/?debug_cmd_now_you_see_me=' in path:
    command = path.replace('/?debug_cmd_now_you_see_me=', '')
# there are only 2 commands available
# ls - to list the current directory
# cat file_name.txt - to show the content of the file: file_name.txt
```

Theo đó, tác giả của đoạn code nói rằng khi nhập thêm param ```/?debug_cmd_now_you_see_me=``` với lệnh là **```ls```** hoặc **```cat```** thì server sẽ thực thi và trả về kết quả cho chúng ta.

Ví dụ như khi chúng ta muốn xem kết quả lệnh ```ls``` thì sẽ chèn thêm param: **```?debug_cmd_now_you_see_me=ls```**
![](https://images.viblo.asia/4038eedd-6040-4ada-8af2-05888ed12b73.png)

Khi đã có danh sách các tệp tin rồi thì chỉ cần đọc file **flag11.txt** là được. Làm tương tự như trên, để thực thi lệnh ```cat``` chúng ta truyền param: ```?debug_cmd_now_you_see_me=cat flag11.txt```
![](https://images.viblo.asia/65b17ea6-add8-4e6d-9601-4b4ae5adc5e5.png)

Việc không tắt chức năng debug trước khi phát hành bản chính thức có thể khiến trang web bị tấn công thông qua các chức năng này. Nếu như ở trường hợp trên, lập trình viên thiết kế chức năng debug có thể thực thi tùy ý các lệnh hệ thống thì kẻ tấn công có thể sử dụng kỹ thuật của mình để chiếm quyền điều khiển server. Thậm chí nếu các lệnh này được thực thi bởi user có quyền cao thì không khác gì chúng ta đang biếu không server cho họ.

Kể cả các chức năng debug được giấu rất kỹ, được đặt tại đường dẫn vô cùng khó tìm đi chăng nữa thì cũng không đảm bảo 100% rằng không có ai tìm thấy chức năng này. Chúng ta cần cân nhắc đến trường hợp tệ nhất để từ đó đưa ra cách giải quyết.

**Vì vậy, trước khi phát hành phiên bản chính thức, chúng ta cần kiểm tra kỹ lại hết 1 lượt mã nguồn và đảm bảo đã xóa/vô hiệu hóa toàn bộ các chức năng có tác dụng debug**.

## 1.2. Lộ các file log quan trọng
Thông tin:
- Tuần: 3
- Bài: Firewood
- Ngôn ngữ lập trình: Java
- Mã nguồn: https://ideone.com/v8ExqW

Các dòng từ 41 - 43 xác định 3 đường đẫn có thể truy cập được và cách server xử lý khi người dùng truy cập đường dẫn như sau:
```java
server.createContext("/auth.log", new LogHandler());
server.createContext("/login/", new LoginHandler());
server.createContext("/", new IndexHandler());
```

Nhìn qua chúng ta dễ dàng thấy ngay ```/``` là đường dẫn cho trang index, còn ```/login/``` là đường dẫn cho trang đăng nhập, và ```/auth.log``` thì lại khá lạ vì có đuôi ```.log```

Các file ```.log``` có thể chứa 1 số thông tin quan trọng trong quá trình hoạt động của hệ thống. Và thường thì khi có 1 file được cung cấp sẵn như này thì khi truy cập chúng ta có thể đọc được hoặc tải về được, trong trường hợp bị chặn thì sẽ trả về 403.

Để chắc chắn xem điều gì sẽ xảy ra khi truy cập đường dẫn ```/auth.log```, chúng ta có thể kiểm tra **class LogHandler** ở dưới:
```java
static class LogHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange t) throws IOException {
        // read the challenge file and store it in the data
        File file = new File("auth.log");
        BufferedReader br = new BufferedReader(new FileReader(file));
        String line = "";
        String out = "";
        while ((line = br.readLine()) != null) out += line + "<br>";
        br.close();
        generateResponse(t, out);
    }
}
```

Như vậy thì rõ rồi, khi truy cập đường dẫn ```/auth.log``` thì server sẽ không kiểm tra quyền gì cả, mà sẽ đọc luôn file **auth.log** và trả về kết quả cho chúng ta. Sau khi truy cập thì mình tìm được một cặp username/password là **beatrix/do-you-want-to-build-a-hack-land?**
![](https://images.viblo.asia/f07ecabe-a213-42e8-84f0-51f7e79d903b.png)

Và sử dụng cặp username/password này, chúng ta có thể đăng nhập thành công tại đường đẫn ```/login/``` và lấy được flag.
![](https://images.viblo.asia/e91bd098-bb5d-4b7d-900e-57c98dbad110.png)

Các file log thường chứa rất nhiều thông tin quan trọng của hệ thống, 1 số file log quan trọng phổ biến có thể kể đến như: ```access.log```, ```error.log```, ```mysql.log```,... Không chỉ các file ```.log``` thôi đâu, các file ```.txt```, ```.md```, file text,... cũng có thể chứa log của hệ thống.

Bất cứ tệp tin nào, chỉ cần chứa các thông tin quan trọng hoặc có thể hỗ trợ kẻ tấn công khai thác các lỗ hổng bảo mật trên trang web của chúng ta đều cần được giữ bí mật kỹ, tránh xa khỏi tầm tay của kẻ xấu.

**Vì thế, cần thực hiện kiểm tra thường xuyên xem chẳng may có tệp tin nào chứa dữ liệu quan trọng bị lộ ra hay không. Việc này có thể kiểm tra trong mã nguồn, hoặc xem lịch sử truy cập các tệp tin quan trọng. Nếu có, cần thực hiện các biện pháp gỡ bỏ và xử lý sự cố sớm nhất có thể.**

## 1.3. Lộ Git log
Thông tin:
- Tuần: 4
- Bài: Git Gud
- Ngôn ngữ lập trình: Python
- Mã nguồn: https://ideone.com/yPaE6a

Đoạn code từ dòng 52 - 68 cho thấy cách server xử lý khi truyền vào param ```git```:
```python
elif 'git' in urlparse.parse_qs(get_params.query):
    cmd = urlparse.parse_qs(get_params.query)['git'][0]
    # if the user requests viewing logs, show the logs
    if cmd == 'log':
        for line in log_data:
            output += line + '<br>'
    # if the user requests to checkout a specific commit, allow to do that only if the hash is specified as well
    elif cmd == 'checkout' and 'hash' in urlparse.parse_qs(get_params.query):
        ommit_hash = urlparse.parse_qs(get_params.query)['hash'][0]
        try:
            commit_file = open('commits/' + commit_hash, 'r')  # open the file corresponding to that commit
            commit_file_data = commit_file.readlines()  # stores a list of lines from the file
            commit_file.close()
            for line in commit_file_data:
                output += line + '<br>'
        except:
            output = 'File not found'
```

Đoạn code cho thấy có thể sử dụng 2 cách truyền param:
- Truyền vào param git với giá trị là log: ```/?git=log```  
  => Trả về lịch sử git commit
- Truyền vào param git với giá trị là checkout, và param hash với giá trị là mã hash của commit: ```/?git=checkout&hash={commit-hash-id}```  
=> Trả về nội dung tệp tin được commit

Khi truyền vào param ```/?git=log```, chúng ta có toàn bộ lịch sử commit với thứ tự gần nhất - xa nhất. Sau khi tìm ngược từ dưới lên, chúng ta có thể thấy ngay 1 commit đặc biệt có lời nhắn *"Add password and username in challenge"*
![](https://images.viblo.asia/5c64698c-d979-4ec4-8c56-0553d2a93e74.png)

Bây giờ chúng ta sẽ copy hash id để xem nội dung commit này có gì bằng cách sử dụng param ```/?git=checkout&hash=c1dce57829668b82678d4868ec58917fa37cfeab```. Dễ dàng tìm được username và password ngay trong code.
![](https://images.viblo.asia/88f0bbdb-6755-4f18-b470-3e6284eb6a76.png)

Sử dụng cặp username/password này, chúng ta có thể đăng nhập và lấy flag.
![](https://images.viblo.asia/e0c49130-0672-4adc-9598-f691547d39b2.png)

Git commit log là một trong số những loại log rất quan trọng, khi lộ ra có thể hỗ trợ kẻ tấn công rất nhiều do trong đó ghi lại toàn bộ quá trình thay đổi, nâng cấp mã nguồn của chúng ta. 

Như trong bài này, ban đầu lập trình viên gắn thẳng username và password vào trong code. Sau đó đã ngay lập tức gỡ ra và chuyển sang lưu tại 1 tệp tin riêng. Tuy nhiên, khi gỡ ra thì lập trình viên vẫn không thay đổi username và password. Nên khi lộ git log, kẻ tấn công có thể sử dụng username/password đó để đăng nhập bình thường.

**Vì thế, tuyệt đối không được để lộ git log.**

# 2. Lưu các tệp tin với ID không an toàn
Lỗ hổng này xảy ra khi lập trình viên muốn rút gọn đường dẫn tới các tệp tin, và người dùng được truy cập tệp tin nào thì chỉ gửi cho người dùng ID của những tệp tin đó. Mục đích là muốn giới hạn truy cập, tuy nhiên lập trình viên không thực hiện phân quyền đối với tệp tin. 

Do đó, khi biết quy tắc gắn ID, chúng ta có thể truy cập bất cứ tệp tin nào mình muốn.
## 2.1. Sử dụng ID tăng dần
Thông tin:
- Tuần: 1
- Bài: Real ID 1
- Ngôn ngữ lập trình: PHP
- Mã nguồn: *có, nhưng không cần sử dụng tới*

Ở bài này chúng ta không cần mã nguồn để làm chỉ cần xem giao diện web là được. Và đây là giao diện web, chỉ có 1 bảng với tên file và thông tin về quyền truy cập. Tệp tin nào có thể truy cập được thì sẽ hiện màu tím và có chữ "YES" bên cạnh, tệp tin nào không truy cập được thì sẽ có chữ màu trắng.
![](https://images.viblo.asia/ae97a7ac-b5df-46bd-aaa7-112e748dfdd5.png)

Click vào các file màu tím sẽ chuyển hướng sang link khác và tệp tin được tải về máy. Tất nhiên tệp tin ```flag.txt``` chúng ta cần không click vào được.

Lúc này chúng ta sử dụng chức năng Inspect Element (Ctrl + Shift + C trên Chome, Edge) lên và trỏ vào tên các file để kiểm tra các link mà chúng ta sẽ bị điều hướng tới.
![](https://images.viblo.asia/1eca7217-79b7-4f2f-9f84-f0d066066990.png)

Khi kiểm tra thêm đường dẫn của 1 số tệp tin khác, dễ thấy được rằng các tệp tin được xếp theo ID tăng dần. Do đó tệp tin ```flag.txt``` sẽ có ID trong khoảng 10 -> 23. Chúng ta có thể thử lần lượt các ID này, vì có khả năng do server kiểm tra thấy không có quyền truy cập nên không đính kèm link vào, còn truy cập trực tiếp thì vẫn có thể tải tệp tin về được.

Cuối cùng, chúng ta có thể tải được ```flag.txt``` có với id=21 tại ```http://insecure.vford.com:8008/files.php?id=21```

## 2.2. Hash ID không đủ an toàn
Thông tin:
- Tuần: 4
- Bài: Real ID 2
- Ngôn ngữ lập trình: PHP
- Mã nguồn: *có, nhưng không cần sử dụng tới*

Cách làm bài này tương tự với bài Real ID 1. Tuy nhiên lần này lập trình viên đã gắn ID cho tệp tin tốt hơn. ID không còn dùng các số tự nhiên tăng dần nữa, thay vào đó sử dụng 1 đoạn mã 13 ký tự gồm số ký tự số và ký tự in thường
![](https://images.viblo.asia/8d345193-83fa-41d7-bf1a-92900b68aafd.png)

Nhìn vào đây, với người hay chơi CTF hoặc người biết về An toàn thông tin sẽ nghĩ ngay đến Hash. Cụ thể, họ có thể đoán được ID là kết quả khi hash tên tệp tin, hash nội dung tệp tin, hoặc hash ID có ở bài Real ID 1 (:sweat_smile:) bằng 1 thuật toán hash nào đó.

Nếu đem tra google thì không có thuật toán hash nào cho ra output 13 ký tự mà có định dạng như kia cả. Nên có khả năng lập trình viên sử dụng 1 thuật toán hash thông dụng, sau đó lấy 13 ký tự đầu của output làm ID.

Đến đây, hoặc là chúng ta có thể xem gợi ý, hoặc là chúng ta có thể đoán, hoặc thử với các thuật toán hash thông dụng. Kết quả: thuật toán hash được sử dụng là **MD5**. Khi biết là MD5 rồi, thì chúng ta tiếp tục thử hash với các yếu tố đã đề cập ở trên. Và tất nhiên không ngoài dự đoán, **ID này là hash tên tệp tin bằng MD5 rồi lấy 13 ký tự đầu của output**.

![](https://images.viblo.asia/4cf9d23d-dc2e-4823-a6a8-c6c1a4c29336.png)

Như vậy, ID của tệp tin ```flag.txt``` là **159df48875627**, truy cập link ```http://insecure.vford.com:8010/files.php?id=159df48875627``` là sẽ tải được ```flag.txt``` về máy.

Thực ra thì cũng không khó đoán lắm đúng không, nếu có kiên nhẫn và thời gian để thử lần lượt thì kiểu gì cũng tìm được nguyên lý tạo ID thôi. Và một kẻ tấn công ác ý thì không hề thiếu kiên nhẫn và có đủ thời gian để thử.

**Do đó khi cần gắn ID cho các tệp tin, chúng ta có thể sử dụng các thuật toán hash mạnh, hash với các yếu tố khó đoán hơn, sử dụng thêm ```salt``` khi hash. Và tốt nhất là phân quyền truy cập tệp tin thật chặt chẽ, để cho dù có đoán được ID thì những người không được cho phép cũng không thể truy cập.**

-----

Mình xin kết thúc phần 1 tại đây. Qua bài viết, chúng ta đã thấy được sự nguy hiểm khi code thiếu an toàn và 1 số nguyên tắc để tránh các lỗ hổng về lộ thông tin, đánh ID không an toàn.

Trong phần 2, mình sẽ trình bày về các nguyên tắc code an toàn để tránh các lỗ hổng PHP Type Juggling, Hard Coded Credentials, Xử lý dữ liệu quan trọng tại Client side, Sử dụng bộ sinh số ngẫu nhiên không an toàn,...