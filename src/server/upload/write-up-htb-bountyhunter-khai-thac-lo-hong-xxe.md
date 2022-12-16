![](https://images.viblo.asia/035e1c2e-5313-4a1b-9ab6-7b0a9e7c3655.PNG)

# Giới thiệu
BountyHunter là một machine về leo quyền trên Linux. Mặc dù độ khó được đưa ra chỉ ở mức dễ, nhưng mình nghĩ với những newbie (như mình) thì độ khó sẽ rơi vào khoảng mức dễ - trung bình.

![](https://images.viblo.asia/5d1ee78a-0bd7-43f6-90d6-1d5a8ea5b948.PNG)

![](https://images.viblo.asia/d69e48c2-f4c4-49ae-9a15-3e5b9858ef86.PNG)

![](https://images.viblo.asia/7db0a830-2ebe-4a38-9057-4fde149542c0.PNG)

# Tìm kiếm thông tin
## Rà quét các cổng và dịch vụ
Bước đầu tiên là scan bằng nmap để xem machine này có những cổng nào đang mở và dịch vụ nào đang chạy.

![](https://images.viblo.asia/35bbd167-1e8c-4b3e-8c51-00306b392949.PNG)

Machine này chỉ chạy mỗi SSH tại cổng 22 và 1 trang web tại cổng 80. Như vậy cách duy nhất để vào được server là khai thác lỗ hổng ở dịch vụ web.

## Kiểm tra trang web tại cổng 80
Các chức năng ở trang web này không có gì nhiều. Chỉ có 1 trang chủ chứa thông tin linh tinh cùng 1 trang chứa biểu mẫu.

Trang web trông rất cơ bản. Trên thanh menu có 3 mục: about, contact và portal. Chỉ có mục portal chuyển hướng sang đường dẫn khác. Tại phần about và contact không có thông tin gì hữu ích.

![](https://images.viblo.asia/b2d14ad7-417f-44da-9031-e7ff395f7d91.PNG)

Khi click vào mục portal thì chúng ta được điều hướng đến **/portal.php** tuy nhiên vẫn không có gì ở đây mà chúng ta tiếp tục phải click vào chữ ***here*** để chuyển hướng sang một trang khác.

![](https://images.viblo.asia/1dfebc7f-8f29-495c-ae7f-e9b4f3f46ecc.PNG)

Sau khi click chúng ta được chuyển đến **/log_submit.php**

![](https://images.viblo.asia/0879ee6e-1dfa-4cf6-a169-cd5f97a8b2c1.PNG)

Ở đây có một biểu mẫu với 4 trường cùng 1 nút submit. Sau khi điền dữ liệu và click nút submit thì sẽ có phần thông tin hiện ra - là phần mình đã bôi vàng ở trên ảnh. Khi xem mã nguồn html của trang này thì chúng ta có thể thấy trang này tải một tệp mã JavaScript nằm tại đường dẫn **/resources/bountylog.js**

![](https://images.viblo.asia/de255a41-c425-4601-bf82-7330fb3a23e4.PNG)

Sau khi click vào đường dẫn mình đã bôi vàng thì chúng ta đã có được nội dung của tệp tin **bountylog.js**

![](https://images.viblo.asia/862ced0a-1e8b-4ce9-ba57-fa1ab35f83e4.PNG)

Tệp tin có 2 hàm:
- Hàm **returnSecret**, hàm này sẽ được gọi bởi hàm **bountySubmit**
- Hàm ***async*** **bountySubmit**. Đây cũng là hàm được thực thi khi click vào nút Submit tại **/log_submit.php**
![](https://images.viblo.asia/1f99e845-6019-4bd8-9fd1-bcaa4abe01a5.PNG)

Khi đọc hàm returnSecret, chúng ta thấy tên của 1 tệp tin php nữa khá đáng nghi, thậm chí tên của tệp tin này còn được đặt để tránh bị phát hiện bởi các công cụ rà quét đường dẫn web. Đó là tệp tin **```tracker_diRbPr00f314.php```**

Tuy nhiên có vẻ tệp tin này chẳng có giá trị gì. Tệp tin chỉ chứa template cho đoạn ```"If DB were ready,...``` 

## Rà quét các đường dẫn ẩn
Sau 2 bước trên thì có vẻ lượng thông tin thu thập được về machine cũng gần hết rồi. Để không bỏ sót thì mình sẽ tiến hành rà quét xem có đường dẫn ẩn nào khác không bằng công cụ dirsearch.

Lần này câu lệnh mình chạy là: **```python3 dirsearch.py -r -x 403,404 -u 10.10.11.100```**

Trong bài viết trước của mình về [leo quyền qua SUID - write up geisha](https://viblo.asia/p/write-up-vulnhub-geisha-leo-quyen-qua-suid-m68Z0P4AZkG#_scan-cac-thu-muc-cua-dich-vu-web-6), mình đã sử dụng tham số **-i** để chỉ hiển thị các kết quả có thể truy cập được. Lần này thì mình sử dụng tham số **-x** để loại tất cả các đường dẫn không tồn tại và các đường dẫn không có quyền truy cập.

![](https://images.viblo.asia/a5bca4b8-2e3e-49ed-97da-6715548e7edb.PNG)

Theo như kết quả của dirsearch thì có 2 đường dẫn mới mà chúng ta chưa tìm thấy trước đó:
- **/db.php**: đây chắc là tệp tin chứa thông tin kết nối với cơ sở dữ liệu, chỉ chứa code php nên khi truy cập thì không có gì hiện lên cả.
- **/resources/README.txt**: mình không biết thông tin ở đây có thể là gợi ý hay gì, chưa biết có tác dụng gì.
![](https://images.viblo.asia/5401d9a5-4977-412f-9d16-f3c04f655aeb.PNG)

# Lấy cờ user
## Khai thác lỗ hổng XXE

Chúng ta được cung cấp một manh mối về việc khai thác lỗ hổng XXE qua tệp tin **bountylog.js**

Ở đây, hàm bountySubmit khai báo một biến **xml**, giá trị các trường trong tệp tin xml này được lấy từ các trường chúng ta đã nhập vào ở **log_submit.php**

Biến xml này sau đó sẽ được xử lý rồi hiện ra cho chúng ta xem.

![](https://images.viblo.asia/87b038a1-37ce-4861-a2f8-852615f557b7.PNG)

Điều đáng chú ý ở đây, là toàn bộ quá trình khởi tạo xml => xử lý => hiển thị kết quả đều được thực thi tại client side - browser của chúng ta. Vì thế chúng ta có thể thực hiện thủ công quá trình này, ngay từ việc khai báo giá trị của tệp xml.

Đó chính là dấu hiệu cho việc khai thác lỗ hổng XXE. Các bước khai thác như sau:

**Bước 1: Tạo biến xml chứa payload.**
```xml
var xml = `<?xml version="1.0" encoding="ISO-8859-1"?>
           <!DOCTYPE foo [<!ENTITY xxe SYSTEM "payload-here">]>
           <bugreport>
               <title>&xxe;</title>
               <cwe>aaa</cwe>
               <cvss>aaa</cvss>
               <reward>aaa</reward>
           </bugreport>`
```

**Bước 2: thực thi hàm returnSecret để lấy nội dung xml sau khi được xử lý bởi server.**
```js
await returnSecret(btoa(xml))
```

Biến xml này có mỗi dòng **```<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>```** là thêm mới vào, còn lại cấu trúc xml thì mình bê nguyên từ cấu trúc gốc trong code. Payload này sử dụng để đọc nội dung file.

![](https://images.viblo.asia/4d5d12a9-d164-482f-86a6-0f1ea39ce5c5.PNG)

Sử dụng payload trên mình đã đọc được nội dung file /etc/passwd. Trong ảnh trên có một dòng lệnh ```returnSecret(btoa(xml))``` được mình đánh dấu X - tức là không chạy ra được kết quả, còn sử dụng ```await returnSecret(btoa(xml))``` thì lại được. Đây là một chỗ làm mình mất tầm hơn 15' - vì ngu @@.

Ban đầu, mình chạy hàm  ```returnSecret(btoa(xml))``` nhưng mãi không thấy kết quả. Mình nghĩ là do payload sai nên phải đổi payload và kiểm tra lại rất nhiều lần. Nhưng không có vấn đề gì ở payload cả. Sau đó mình mới chú ý đến file bountylog.js

Hóa ra lí do không có kết quả là vì hàm returnSecret() trả về một **promise** :upside_down_face:. Đó là lí do trong file bountylog.js phải gọi **```await returnSecret(btoa(xml))```**. Tuyệt vời JavaScript, quá tuyệt luôn :clown_face:.

Một payload khác mình sử dụng là **```<!DOCTYPE foo [<!ENTITY xxe SYSTEM "php://filter/read=convert.base64-encode/resource=/var/www/html/db.php">]>```**. 

![](https://images.viblo.asia/adeea41f-331a-48b1-9272-2805bda880b5.PNG)

Payload này sẽ cho phép đọc file php, nhưng nội dung đã được encode base64, chúng ta cần phải decode lại để có nội dung file php.

![](https://images.viblo.asia/864be014-0ec5-4e33-81ab-68fda28a78cf.PNG)

Cả hai payload đều tham khảo ở [xxe-injection-payload-list](https://github.com/payloadbox/xxe-injection-payload-list).

## SSH vào server

Với 2 tệp tin lấy được khi khai thác lỗ hổng XXE, chúng ta đã có dữ kiện để SSH vào server:
- /etc/passwd: tên của user có thể SSH vào server
- db.php: username và password đăng nhập vào DBMS

Với 2 dữ kiện này chúng ta có thể đưa ra phán đoán:
- username ssh == username có uid 1000
- password ssh == password đăng nhập DBMS

![](https://images.viblo.asia/16c3288e-8f2a-4d34-88bf-722717693d4d.PNG)

... SSH vào thành công vào server với 2 thông tin trên. Cũng không khó đoán lắm, người ta thích dùng chung mật khẩu cho nhiều tài khoản mà (not me :stuck_out_tongue:). Giờ chỉ cần ```cat user.txt``` là có cờ user đem đi nộp.

![](https://images.viblo.asia/83457650-e2d7-4f3f-b599-a90cad78783b.PNG)

# Lấy cờ root
## Kiểm tra các thông tin về phân quyền
Khi kiểm tra chúng ta thấy rằng user hiện tại được quyền chạy lệnh **```sudo python3.8 ticketValidator.py```** mà không cần nhập mật khẩu. Ngoài user hiện tại ra thì chỉ có user root được quyền chạy file python này. 

![](https://images.viblo.asia/881ed853-5119-4fed-ba86-7f614f6692f2.PNG)

Ngoài ra có một gợi ý trong file **contract.txt**. Theo như gợi ý thì chúng ta cần chú ý đến khâu xác thực trong file ```ticketValidator.py```

![](https://images.viblo.asia/e7489db3-ff1a-4dd4-8fa0-80f3a477c6a9.PNG)

Vậy thì chắc hẳn ```ticketValidator.py``` chính là con đường để chúng ta lấy quyền root.

## Phân tích mã python ticketValidator
Nội dung của ```ticketValidator.py``` như sau:
```python
#Skytrain Inc Ticket Validation System 0.1
#Do not distribute this file.

def load_file(loc):
    if loc.endswith(".md"):
        return open(loc, 'r')
    else:
        print("Wrong file type.")
        exit()

def evaluate(ticketFile):
    #Evaluates a ticket to check for ireggularities.
    code_line = None
    for i,x in enumerate(ticketFile.readlines()):
        if i == 0:
            if not x.startswith("# Skytrain Inc"):
                return False
            continue
        if i == 1:
            if not x.startswith("## Ticket to "):
                return False
            print(f"Destination: {' '.join(x.strip().split(' ')[3:])}")
            continue

        if x.startswith("__Ticket Code:__"):
            code_line = i+1
            continue

        if code_line and i == code_line:
            if not x.startswith("**"):
                return False
            ticketCode = x.replace("**", "").split("+")[0]
            if int(ticketCode) % 7 == 4:
                validationNumber = eval(x.replace("**", ""))
                if validationNumber > 100:
                    return True
                else:
                    return False
    return False

def main():
    fileName = input("Please enter the path to the ticket file.\n")
    ticket = load_file(fileName)
    #DEBUG print(ticket)
    result = evaluate(ticket)
    if (result):
        print("Valid ticket.")
    else:
        print("Invalid ticket.")
    ticket.close

main()
```

Theo như nội dung mã python thì khi chạy, ```ticketValidator.py``` sẽ đọc nội dung file markdown bất kỳ do chúng ta chỉ định. Sau khi qua vài đoạn if để kiểm tra xem nội dung file markdown đã đúng với cấu trúc đưa ra hay chưa, thì sẽ thực thi phần kiểm tra cuối để quyết định kết quả như sau:
```python
validationNumber = eval(x.replace("**", ""))
if validationNumber > 100:
    return True
else:
    return False
```

Đoạn code trên sẽ kiểm tra tại **dòng x** nào đó, mà dòng này sẽ có khá nhiều dấu hoa thị (asterisk). Nên sẽ loại bỏ hết các cặp dấu hoa thị đi, rồi thực hiện hàm **eval()** với input là toàn bộ **dòng x**.

Vì **eval()** là một hàm có thể chạy các đoạn code python, nên hướng leo quyền của chúng ta là tạo ra mội file markdown có nội dung chứa payload thực thi mã lệnh hệ điều hành. Sau khi vượt qua tất cả các đoạn kiểm tra và đến được **```eval(x.replace("", ""))```** thì payload của chúng ta sẽ được chạy dưới quyền root.

## Viết mã khai thác
Việc đầu tiên là phải xác định nội dung sao cho vượt qua được toàn bộ các đoạn kiểm tra. Sau quá trình tìm kiếm các đường dẫn chứa tệp tin ```ticketValidator.py```, mình đã tìm được một vài file markdown không qua được kiểm tra.

Các file markdown này đều đi qua được gần hết các đoạn if và tới được tận hàm eval(). Vì thế chúng ta chỉ cần copy nguyên nội dung và đưa payload vào là được. Cấu trúc như sau:

![](https://images.viblo.asia/cbe868c3-16e5-430f-ba9c-9b56a49fbccf.PNG)

Như vậy thì **dòng x** chứa các cặp dấu hoa thị đã được xác định là dòng thứ 4. Dựa theo luồng xử lý dưới đây, chúng ta có thể viết được payload thực thi lệnh hệ điều hành **```cat /root/root.txt```**:

![](https://images.viblo.asia/77f6acb1-d6dd-46fe-863e-97e7996666d2.png)

Với payload như sau thì chúng ta có thể đọc được cờ root. Tất nhiên cùng dạng payload như này thì có thể thay đổi nhiều cách viết khác nhau. Mục tiêu chỉ là hàm **eval()** sẽ thực thi được dòng lệnh **```__import__('os').system('cat /root/root.txt')```**:

![](https://images.viblo.asia/1c65d60b-bd94-4699-bcb1-179f8ad9bcca.PNG)