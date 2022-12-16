# Mở đầu

Đôi khi chúng ta cần một web server đơn giản, public ra internet để thực thi vài tác vụ linh tinh, hoặc để hosting một số file khi cần. Tuy nhiên, với tư cách là một dev/pentester "nhà nghèo" thì việc có thẻ visa để đăng ký free cloud của Google, AWS, Oracle thôi nhiều khi đã là cả một vấn đề lớn 🤣. Đùa chút thôi, bài viết này mình sẽ giới thiệu Deta - một công cụ cho phép bạn nhanh chóng tạo micro-website/API và public ra internet. Here we go~

## Deta
![image.png](https://images.viblo.asia/49d446fa-7574-460f-9352-a237096f09db.png)

https://deta.sh là công cụ Cloud cá nhân **miễn phí** cho phép chúng ta xây dựng các ứng dụng, prototype rồi public ra internet một cách nhanh chóng.

Deta đi kèm với:

- **Deta Base**: NoSQL database (giống như MongoDB)
- **Deta Micros**: Cho phép bạn deploy ứng dụng của mình lên internet (giống như Heroku). Deta cho tạo thoải mái bao nhiêu micros cũng được hết 😳
- **Deta Drive**: Cho phép lưu trữ file (giống như Google Drive và AWS S3)

Deta hiện đang hỗ trợ các ngôn ngữ: **Python**, **Node.js**, và **Golang**. Với mỗi ngôn ngữ, Deta cũng hỗ trợ các micro-framework ví dụ như Python là **FastAPI** hoặc **Flask**.

Để lấy ví dụ, mình sẽ xây dựng ứng dụng đơn giản dành cho pentester như sau:

1. Cho phép tải file lên theo URL và MIME Type tùy ý. VD: truy cập vào link: "https://myfakeserver.com/aaa.png" nhưng trả ra content là `alert(origin)` và mime type lại là javascript (chứ không phải file ảnh như đuôi PNG).
2. Cho người dùng điền trực tiếp nội dung file.
3. Cho phép xoá file.

## Cài đặt

> Tất cả hướng dẫn sử dụng (đầy đủ và chi tiết) đều có ở https://docs.deta.sh/docs/home

Trước hết là chúng ta cần đăng ký tài khoản. Màn hình quản lý nằm ở: https://web.deta.sh/home

Sau đó, ta tải về `Deta CLI` rồi đăng nhập:

```bash
curl -fsSL https://get.deta.dev/cli.sh | sh
deta login
```

sau đó tạo một micro mới với framework là python:

```bash
deta new payload-server --python

Successfully created a new micro
{
	"name": "payload-server",
	"id": "xxxxxx",
	"project": "xxxxxxx",
	"runtime": "python3.9",
	"endpoint": "https://xxxxxxx.deta.dev",
	"region": "ap-southeast-1",
	"visor": "disabled",
	"http_auth": "disabled"
}
```

xem thử file vừa tạo:

```bash
➜  payload-server cat main.py
def app(event):
    return "Hello, world!"%
```

Ngay ở bước này chúng ta có thể chạy `deta deploy` và app của chúng ta sẽ được deploy lên URL ở trên. Quá nhanh, quá nguy hiểm:

![image.png](https://images.viblo.asia/5ca889ea-28b0-4a2f-9e81-07b031ed4604.png)

Chúng ta cũng có thể cài đặt thêm các thư viện, tạo file `requirements.txt` và điền tên các thư viện vào, ở đây ta sẽ cần đến Flask và Deta

```
flask
deta
```

> Mỗi lần sửa code xong xuôi thì nhớ `deta deploy` để đẩy code lên nhé

## Backend

Sửa lại file `main.py` như sau, vì code cũng khá ngắn có 88 dòng và đơn giản nên mình sẽ không đi vào từng bước mà chỉ giải thích một số vị trí quan trọng.

```python
from flask import Flask
from flask import Flask, request, render_template, abort, Response, flash, redirect
from deta import Deta
import uuid

app = Flask(__name__)

app.secret_key = b'somethingrandom'

deta = Deta("PROJECT_KEY_HERE")
drive = deta.Drive("files")
db = deta.Base("payload_db")

@app.route("/", defaults={"path": ""}, methods=["GET", "POST"])
@app.route("/<path:path>")
def catch_all(path):
    if path == "":
        if request.method == 'POST':
            return upload()
        else:
            res = db.fetch()
            all_items = res.items

            return render_template("index.html", items=all_items)
    elif path == "delete":
        return delete()
    else:
        return download(path)


def upload():
    file = request.files.get("file")
    submitted_mime = request.form.get("mime")
    submitted_path = request.form.get("path")
    content = request.form.get("content")
    mime = "text/plain"

    if submitted_mime:
        mime = submitted_mime

    if file:
        mime = file.content_type
        content = file
    elif not content:
        flash("[ERROR] No content!")
        return redirect("/")

    if not submitted_path:
        flash("[ERROR] No path!")
        return redirect("/")

    if db.fetch({"path": submitted_path}, limit=1).items:
        flash("[ERROR] Duplicate path!")
        return redirect("/")

    filename = str(uuid.uuid4())
    db.put({"path": submitted_path, "filename": filename, "mime": mime})
    res = drive.put(filename, content, content_type=mime)
    if res:
        flash(f"[OK] file uploaded to path: {submitted_path}")
        return redirect("/")


def download(path):
    items = db.fetch({"path": path}, limit=1).items
    if items:
        file = drive.get(items[0]['filename'])
        content = file.read()
        file.close()

        return Response(content, mimetype=items[0]['mime'])
    else:
        return abort(404)


def delete():
    path = request.args.get("p")
    items = db.fetch({"path": path}, limit=1).items
    if items:
        db.delete(items[0]['key'])
        drive.delete(items[0]['filename'])

        flash(f"[OK] path '{path}' deleted!")
        return redirect("/")
    else:
        return abort(404)

# Uncomment this line to debug local
# app.run()
```

Ở đoạn này chúng ta cần tạo `Project Keys` (tương tự API key) trong giao diện ở dưới, `drive` và `db` là các object giúp chúng ta tương tác với database và drive:

![image.png](https://images.viblo.asia/e2b9d754-60d2-4386-9ec8-c415c59e5607.png)

```python
deta = Deta("PROJECT_KEY_HERE")
drive = deta.Drive("files")
db = deta.Base("payload_db")
```

Phần route, chúng ta sẽ tạo một route dùng để catch all (bắt tất cả các request) rồi kiểm tra:
- Nếu là path `index` => chuyển đến trang upload.
- Nếu là path `delete` => chuyển đến trang xoá file
- Còn lại thì mặc định là xử lý trả về nội dung file (nếu có tồn tại)

Deta đã cũng cấp sẵn cho chúng ta các phương thức để tương tác với DB:

```python
db.put({"path": submitted_path, "filename": filename, "mime": mime})
```

Dùng để insert một bản ghi vào DB. Chúng ta sẽ lưu lại `path` (để kiểm tra xem có bị trùng không), `filename` thì sinh ngẫu nhiên bằng `uuid`, `mime` do người dùng tự nhập hoặc lấy ra từ file tải lên. Dữ liệu trong DB sẽ có dạng sau:

```
{'filename': 'ee8945e3-b7aa-4d0a-829a-b472aecb1ef2', 'key': '2zd58xhd6hvi', 'path': 'abc.png'}
```

```python
db.fetch({"path": submitted_path}, limit=1)
```

dùng để lấy ra dữ liệu, có thể query chính xác hoặc theo syntax gần với MongoDB: https://docs.deta.sh/docs/base/queries.

```python
db.delete(items[0]['key'])
```

Dùng để xóa file dựa theo key. Ta cũng có thể tương tác trực tiếp thông qua giao diện ở  https://web.deta.sh/home:

![image.png](https://images.viblo.asia/fa2f4f5f-19ad-4e7b-a001-486c4d4a85d2.png)

Rất đơn giản đúng không nào? Tương tác với Drive cũng hoàn toàn tương tự:

```python
# Upload file
drive.put(filename, content, content_type=mime)

# Đọc nội dung file
file = drive.get(items[0]['filename'])
content = file.read()
file.close()

# Xóa file theo filename 
drive.delete(items[0]['filename'])
```

Drive cũng có giao diện trực quan:

![image.png](https://images.viblo.asia/35044b9b-02d2-4426-b881-c72883169685.png)

## Frontend

Không màu mè, hoa lá, giao diện thuần HTML, no CSS 🤣

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payload Server</title>
</head>
<body>
    <h1>Payload Server</h1>

    {% with messages = get_flashed_messages() %}
    {% if messages %}
    <ul>
    {% for message in messages %}
        <li>{{ message }}</li>
    {% endfor %}
    </ul>
    {% endif %}
    {% endwith %}

    <h2>Upload</h2>
    <form action="/" enctype="multipart/form-data" method="post">
        <input name="file" type="file"><br><br>
        <label for="path">URL Path</label>
        <input name="path" type="text"><br><br>
        <label for="mime">MIME (default to <code>text/plain</code> or file's mime)</label>
        <input name="mime" type="text"><br><br>
        <label for="path">Content (if no file is selected)</label>
        <textarea name="content" id="content" cols="50" rows="5"></textarea><br><br>
        <input type="submit">
    </form>
    <h2>List payloads</h2>
    {% if items %}
    <ul>
        {% for item in items %}
        {% set p = item['path']%}
        <li><a href="/{{p}}">/{{p}}</a> - <a href="/delete?p={{p}}">Delete</a></li>
        {% endfor %}
    </ul>
    {% endif %}
</body>
</html>
```

## It's Demo Time

Chạy `deta deloy` và xem thành quả thôi: https://8r8cjf.deta.dev/

![](https://images.viblo.asia/5dd51359-69e6-4411-9cb7-9f56c50f5568.gif)


## Giới hạn

Tất nhiên là với dịch vụ Free như thế này thì sẽ đi kèm với một số giới hạn chính sau:

- Các micros thực tế là chạy trên Lambda nên thời gian khởi động (sau khi sleep) sẽ có thể bị chậm.
- RAM chỉ có 512MB.
- Các request sẽ time-out sau 10 giây, nên không thể chạy các process trong thời gian dài.
- Nếu không upload lên Drive thì chỉ có thể upload lên thư mục `/tmp/`.
- Drive có dung lượng 10GB.
- Thư viện tối đa 250 MB, source code tối đa 250MB.

Chi tiết hơn ở: https://docs.deta.sh/docs/micros/about

Nhưng với mục đích để prototype và demo thì thế này vẫn quá là OK la 😊

## Ngoài ra còn gì?

Deta còn cung cấp một số tiện ích khá hữu ích:
- **Deta Crons** cho phép chạy các task theo định kỳ (như cronjob trong Linux).
- **Deta Visor** cho phép chúng ta xem log request/response đến micro và log lỗi.
- Cho phép custom subdomain (VD: https://myserver.deta.dev/) và domain riêng, quá tiện lợi cho các anh em dev làm web mời cưới 😅

![image.png](https://images.viblo.asia/4eddadac-5374-4fc8-86fc-81ddb157966a.png)


## Kết

Chúc mọi người tận dụng Deta hiệu quả và có nhiều ý tưởng hay ho nhá 😀