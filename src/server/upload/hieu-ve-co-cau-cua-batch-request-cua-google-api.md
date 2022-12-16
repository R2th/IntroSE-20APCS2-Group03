2018/3/26
[Discontinuing support for JSON-RPC and Global HTTP Batch Endpoints](
https://developers.googleblog.com/2018/03/discontinuing-support-for-json-rpc-and.html)

Theo thông tin trên thì endpoint của Batch Request sẽ thay đổi. Những ai đang dùng thì hãy lưu ý nội dung dưới đây (cho đến 2019/3/25).

```
www.googleapis.com/batch
↓↓↓
www.googleapis.com/batch/<api>/<version>.
```

---

Trong Google API có 1 cấu trúc cho phép thực hiện nhiều API gọi là **Batch Request**.

Dùng Batch Request sẽ **nâng cao tốc độ thực hiện của bên cung cấp API**.
Mà khi số request giảm đi thì chịu tải bên Google cũng chắc chắn giảm nên cơ bản cấu trúc này không có điểm trừ nào.

**Khi phải thực hiện nhiều API thì hãy tận dụng triệt để Batch Request!**

Ngoài ra cơ cấu của BatchRequest cũng giống với việc bắn mail hay gửi các attach file của Web.

＠Bài viết này nhằm giúp các bạn hiểu về cơ cấu của Batch Request.
Khi dùng nó trên thực tế thì nó cũng được có sẵn trong các library của các loại Google cung cấp do vậy tôi cũng recommend.
https://developers.google.com/discovery/libraries



# Tiền định
Về việc get access token thì hãy tham khảo bài viết này.
http://qiita.com/shin1ogawa/items/49a076f62e5f17f18fe5

Trong bài viết này thì ACCESS_TOKEN  sẽ được cho vào biến môi trường như sau.
```console
export ACCESS_TOKEN=ya29.fAIcwrExRp....
```

# Phát hành API như bình thường
Trước khi BatchRequest hóa thì sẽ thử thực hiện API như bình thường.

## Cách gửi API

<dl>
<dt>URL</dt>
<dd>dựa vào các kiểu API</dd>
<dt>Method</dt>
<dd>dựa vào các kiểu API, chủ yếu là 主にGET、POST、PATCH、DELETE</dd>
<dt>Authorization Header</dt>
<dd>Authorization: Bearer {ACCESS_TOKEN}</dd>
<dt>Body</dt>
<dd>Sử dụng ở POST và PATCH, chủ yếu là JSON</dd>
</dl>


### Ví dụ dùng Drive API để get list

**Request**

```console
curl https://www.googleapis.com/drive/v3/files -H "Authorization: Bearer $ACCESS_TOKEN" 
```

**Response**

```json
{
 "kind": "drive#fileList",
 "files": [
  {
   "kind": "drive#file",
   "id": "1q5eHxwMySsmnAGV4x831txwWVZ6DDD1CmwCP4QcRBAs",
   "name": "Document 001",
   "mimeType": "application/vnd.google-apps.document"
  },
  {
   "kind": "drive#file",
   "id": "1xXnBefD_jDcjZ-vEb50LO7xS01-AsHgdpKioQLegHrQ",
   "name": "Spreadsheet 001",
   "mimeType": "application/vnd.google-apps.spreadsheet"
  },
  {
   "kind": "drive#file",
   "id": "1NT8jIxP_NKbzgdJyQ4FPJTFaiAROmKZmIPq_TBS8wJY",
   "name": "Presentation 001",
   "mimeType": "application/vnd.google-apps.presentation"
  }
 ]
}
```


# Đổi sang Batch Request
Nếu đổi nhiều thì sẽ rất dài, khó hiểu nên tôi sẽ chỉ làm 1 cái BatchRequest.
※Hiểu được 1 cái rồi thì làm nhiều cũng đơn giản thôi.

## Cách gửi Batch Request
Cần gửi Batch Request như sau:

<dl>
<dt>URL</dt>
<dd>https://www.googleapis.com/batch</dd>
<dt>Method</dt>
<dd>POST</dd>
<dt>Authorization Header</dt>
<dd>Authorization: Bearer {ACCESS_TOKEN}</dd>
<dt>Content-Type Header</dt>
<dd>Content-Type: multipart/mixed; boundary=BOUNDARY</dd>
<dt>Request Body</dt>
<dd>Ghi từng request ở đây. Detail ghi sau.</dd>
</dl>

Các bạn để Content-Type thành **multipart/mixed** đi, tôi sẽ cho bạn biết "chứa nhiều request".
**boundary** có vai trò ngăn cách mỗi request. Trong bài viết này sẽ chỉ định string "BOUNDARY".

### Request Body

Format như sau:

```
--{BOUNDARY}
Content-Type: application/http
Content-ID: xxx

Thông tin HTTP

--{BOUNDARY}--
```

Chỉ định Content-ID đối với Content-Type biểu thị HTTP request và mỗi request tương ứng đó.
Content-ID thì thế nào cũng được chỉ cần không để nó trùng lặp nhau. Ngoài ra sẽ dùng khi giải thích response.

Thông tin Request của HTTP mà gửi tin nhiều lần sẽ được để trong Request Body.
Khi này thì sẽ loại bỏ Authorization (dù có để lại thì cũng không có tác dụng gì).
Hình như là các Authorization đã set trong Batch Request sẽ bị cưỡng chế apply.

Như trong hình
![Batch Request overview.png](https://qiita-image-store.s3.amazonaws.com/0/35595/870766bf-958b-1904-a788-4d6c405a62af.png)



## Try to send
Request Body sẽ lưu ở file để thực hiện chỉ định file từ curl.

```databinary.txt
--BOUNDARY
Content-Type: application/http
Content-ID: 1

GET https://www.googleapis.com/drive/v3/files

--BOUNDARY--
```

**Request**

```console
curl https://www.googleapis.com/batch -H "Authorization: Bearer $ACCESS_TOKEN" -H "Content-Type: multipart/mixed; boundary=BOUNDARY" --data-binary @databinary.txt
```

**Response**

```http
--batch_oysSsPRlgxc_AAP4j4WrTtE
Content-Type: application/http
Content-ID: response-1

HTTP/1.1 200 OK
Content-Type: application/json; charset=UTF-8
Date: Tue, 02 Feb 2016 21:40:32 GMT
Expires: Tue, 02 Feb 2016 21:40:32 GMT
Cache-Control: private, max-age=0
Content-Length: 610

{
 "kind": "drive#fileList",
 "files": [
  {
   "kind": "drive#file",
   "id": "1q5eHxwMySsmnAGV4x831txwWVZ6DDD1CmwCP4QcRBAs",
   "name": "Document 001",
   "mimeType": "application/vnd.google-apps.document"
  },
  {
   "kind": "drive#file",
   "id": "1xXnBefD_jDcjZ-vEb50LO7xS01-AsHgdpKioQLegHrQ",
   "name": "Spread sheet 001",
   "mimeType": "application/vnd.google-apps.spreadsheet"
  },
  {
   "kind": "drive#file",
   "id": "1NT8jIxP_NKbzgdJyQ4FPJTFaiAROmKZmIPq_TBS8wJY",
   "name": "Presentation 001",
   "mimeType": "application/vnd.google-apps.presentation"
  }
 ]
}

--batch_oysSsPRlgxc_AAP4j4WrTtE--
```

Giống như khi gửi request, BOUNDARY mà Google set cũng sẽ được set nên bên client sẽ phân cách bằng BOUNDARY và xử lý.

Content-ID khi này sẽ có dạng ``response-{Content-ID đã gửi khi request}``.
Với giá trị này có thể nhận xem request nào sẽ response. (có thể sẽ trả về số number giống với request mà tôi nghĩ nên là như vậy thì an toàn hơn)

# Mở rộng（bên POST request）
Dù không có Content-Length thì nó vẫn chạy được bình thường.

※Nhân đây thì request này, nếu thêm quyền hạn ở cái thứ nhất thì nó sẽ lược bỏ list của quyền hạn ở cái thứ 2, quyền đã thêm từ request đầu sẽ không được thể hiện trong kết quả của list quyền hạn cái thứ 2.
BatchRequest không đảm bảo thứ tự cho nên với những request yêu cầu thứ tự thì sẽ NG.
```
--BOUNDARY
Content-Type: application/http
content-id: 1

POST /drive/v3/files/17zoAl-wCvZdtvXLyW9lnlwODU77golDR_CcLK1mrgiE/permissions
Content-Type: application/json; charset=UTF-8

{
  "emailAddress": "user1@howdylikes.jp",
  "role": "writer",
  "type": "user"
}
--BOUNDARY
Content-Type: application/http
content-id: 2

GET /drive/v3/files/1428x4m9MSiMerQizvKXWbKhXh_a3Ye6lHhUl0HwjkEw/permissions

--BOUNDARY--
```

# Others
## GIới hạn request
Mỗi loại API thì cũng rất đa dạng nên hãy tham khảo thêm các nguồn sau.
Driveは100 https://developers.google.com/drive/v3/web/batch
Calendarは50 https://developers.google.com/google-apps/calendar/batch
Directoyは1000 https://developers.google.com/admin-sdk/directory/v1/guides/batch

## Lưu ý
Không phải tất cả các API đều có thể Batch Request hóa.