## Giới thiệu

Nếu đã là dân dev thì chắc hẳn ai cũng đã từng nghe đến và sử dụng Github. GitHub là một dịch vụ cung cấp kho lưu trữ mã nguồn Git dựa trên nền web cho các dự án phát triển phần mềm. Người dùng có thể tạo các repositories (repo) của mình công khai (public) hoặc riêng tư (private). Trước đây, để tạo các public repo (hay các phần mềm mã nguồn mở) thì không cần trả phí, tạo các private repo thì người dùng cần trả phí. Hiện nay, GitHub đã mở rộng cho chúng ta tạo private repo với tối đa 5 team member. Có thể coi, dù trước hay sau khi rơi vào tay Microsoft thì Github vẫn là nơi hosting source code lớn nhất trên thế giới. Một chút số liệu thống kê.

> As of January 2020, **GitHub** reports having over 40 million users and more than 190 million **repositories** (including at least 28 million **public repositories**), making it the largest host of source code in the world.

Còn số liệu chính thức trên trang About (2021/05/17):

![](https://images.viblo.asia/b0f4d8dd-287b-4f38-b5bc-3bae4c8806db.png)


Ngoài việc cho hosting, Github còn có một chức năng tuyệt vời nữa là cho phép chúng ta tìm kiếm code trong số hơn 28 triệu public repo. Đây thực sự là một kho big data tuyệt vời nếu ta có thể tận dụng hết khả năng mà nó đem lại. Với coder là tìm kiếm code tham khảo, với pentester/bug hunter là mục đích recon, tìm kiếm leaks và juice informations. Bài viết này mình chia sẻ hướng dẫn nâng cao và một số tip, trick có thể dùng để tăng hiệu quả và tự động hóa việc tìm kiếm, hi vọng có ích cho mọi người.

> Ở đây mình sẽ chỉ tập trung vào tìm kiếm source code, ngoài ra thì Github cũng cho chúng ta tìm kiếm thông tin về repo, user, issues

## Github Search Syntax

Cũng giống như Google có [google dorks](https://www.exploit-db.com/google-hacking-database) thì Github cũng có những syntax riêng và kết hợp chúng lại, giúp chúng ta giới hạn phạm vi tìm kiếm lại.

> Bài toán ví dụ: Tìm kiến các Github API Token (sẽ dùng trong phần sau của bài viết) được người dùng hard-code trong repo

### Keywords

Đơn giản nhất là search chỉ có keyword. Với github token, trong code thường sẽ được định nghĩa là `TOKEN` (chung chung, sẽ ra nhiều kết quả nhất) hoặc `GITHUB_ACCESS_TOKEN` hoặc `GITHUB_API_TOKEN`.

Thử với đường link: https://github.com/search?q=GITHUB_API_TOKEN&type=code

![](https://images.viblo.asia/0be358d6-dcdc-4d54-9fe3-0202da7f7692.png)


cho ra `9,116 code results` và không phân biệt chữ hoa, thường. Liệu ta có nên dừng ở đây và ngồi duyệt hết 9K kết quả này. Khoan, đọc tiếp đã nhé 😂

Chú ý: cho dù ta thử từ khóa `GITHUB_API_TOKEN=` thì vẫn ra kết quả tương tự là do: Tất cả những ký tự đặc biệt sau sẽ bị ignore khi tìm kiếm:

```
.,:;/\`'"=*!?#$&+^|~<>(){}[]
```

tất nhiên ta có thể tìm với nhiều từ khóa cùng lúc và Github sẽ ra cho ra kết quả chứa 1 trong các từ khóa trên

### User & Org
Giới hạn tìm kiếm từ người dùng hoặc một tổ chức nhất định. VD: với organization Uber ở https://github.com/uber

```
org:uber ACCESS_TOKEN
```
hoặc 
```
user:uber ACCESS_TOKEN
```

![](https://images.viblo.asia/b3f7cc00-5536-4cd3-9b4d-0dee5058f85d.png)


### Extension

Nếu bạn đoán được là những file extension nào thường chứa config này thì có thể sử dụng syntax `extension:` để giới hạn lại. Thường những cấu hình này sẽ để trong các file `yml`, `yaml`, `cfg`, `ini` vân vân và vân vân.

```
extension:yml GITHUB_ACCESS_TOKEN
```

Số lượng đã giảm khá nhiều, và đã thấy có một vài kết quả khả quan 😀

![](https://images.viblo.asia/2e56bd41-3fd0-4801-94a2-e0a68d7761d7.png)


### Filename

Sau một hồi search, bạn sẽ nhận thấy là từng framework sẽ có những file cấu hình có tên cố định, VD với Rails à `secrets.yml` hay Flask thường là file `config.py`. Sử dụng cú pháp `filename:`

```
filename:secrets.yml GITHUB_ACCESS_TOKEN
```

![](https://images.viblo.asia/db9c2c34-83cc-4a6e-accd-f367153e65bd.png)


giờ đã rút gọn kết quả về 25, chỉ trong một trang màn hình 👌

> Kết quả trả về có thể chứa cả các file có dạng như `secrets-wwp-test.yml` 🙃

### Một số cú pháp khác

Cụ thể thêm về các cú pháp khác ở đây: https://docs.github.com/en/github/searching-for-information-on-github/searching-code

|Syntax|Giải thích|
|-|-|
|`in:file`|Giới hạn tìm kiếm từ khóa trong nội dung file|
|`in:path`|Giới hạn tìm kiếm từ khóa trong đường dẫn file|
|`language:xml element`|Tìm file được nhận dạng là file XML có chứa từ khóa `element`|
|`repo:org_in_black/aptx-4869 antidote`|Tìm thuốc giải trong code của repo `aptx-4869` của tổ chức áo đen|
|`fork:true cloned`|Tìm kiếm từ khóa `cloned` trong code của các repo là fork (nghĩa là clone ra từ 1 repo gốc)|
|`path:docs/ examples`|Tìm kiếm các ví dụ trong đường dẫn `/docs/` và các thư mục con của nó|
|`size:<1000 password`|Tìm kiếm từ khóa `password` trong code của các file có kích thước nhỏ hơn 1000 bytes (1KB)|

Bạn có thể thử kết hợp các cú pháp trên để ra được kết quả mong muốn nhé.

## Github API

OK, ở phần tiếp theo chúng ta sẽ tìm cách để tự động hóa  công việc tìm kiếm này.

Github có cung cấp các API cho phép chúng ta tự động việc tìm kiếm, tuy nhiên các API đều có giới hạn (bằng IP). Cụ thể ở [đây](https://docs.github.com/en/rest/reference/rate-limit) Riêng phần search sẽ có một rate limit riêng. Chúng ta có thể kiểm tra thử trong trường hợp unauthenticated:

```json
➜  Vigo curl "https://api.github.com/rate_limit"
{
  "resources": {
    "core": {
      "limit": 60,
      "remaining": 60,
      "reset": 1621225398,
      "used": 0,
      "resource": "core"
    },
    "graphql": {
      "limit": 0,
      "remaining": 0,
      "reset": 1621225398,
      "used": 0,
      "resource": "graphql"
    },
    "integration_manifest": {
      "limit": 5000,
      "remaining": 5000,
      "reset": 1621225398,
      "used": 0,
      "resource": "integration_manifest"
    },
    "search": {
      "limit": 10,
      "remaining": 10,
      "reset": 1621221858,
      "used": 0,
      "resource": "search"
    }
  },
  "rate": {
    "limit": 60,
    "remaining": 60,
    "reset": 1621225398,
    "used": 0,
    "resource": "core"
  }
}
```

Vậy là nếu chưa authen thì ta chỉ được request tối đa là 10 requests/1 phút. Ngoài JSON thì trong header trả về cũng chứa các thông tin rate limit này:

```yml
x-ratelimit-limit: 60
x-ratelimit-remaining: 60
x-ratelimit-reset: 1621225886
x-ratelimit-resource: core
x-ratelimit-used: 0
```

### Github Token

Để có thể request được nhiều hơn, ta cần cung cấp access token. Token này là acces token cho từng người dùng, và Github sẽ rate limit dựa trên người dùng đó (tức là cho dù bạn tạo nhiều token đi chăng nữa nhưng nếu vẫn là của một người dùng thì vẫn bị áp dụng tổng rate limit chung cho người đó). Nên muốn query nhiều chỉ có cách dùng nhiều token của nhiều người khác nhau 🙃. Bạn hoàn toàn có thể gen các token này từ account của mình, chú ý chỉ để duy nhất quyền `read` thôi nhé (Mục **Settings > Developer settings > Personal access tokens**)

![](https://images.viblo.asia/f31bc09f-60a7-49af-b994-33bd27922f4c.png)


Thử lại với token của mình (hoặc lấy được từ phần trước 😆) ta thấy sự khác biệt:
```json
➜  Vigo curl -H "Authorization: token aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" "https://api.github.com/rate_limit"
{
  "resources": {
    "core": {
      "limit": 5000,
      "used": 2,
      "remaining": 4998,
      "reset": 1621223321
    },
    "search": {
      "limit": 30,
      "used": 0,
      "remaining": 30,
      "reset": 1621222527
    },
    "graphql": {
      "limit": 5000,
      "used": 0,
      "remaining": 5000,
      "reset": 1621226067
    },
    "integration_manifest": {
      "limit": 5000,
      "used": 0,
      "remaining": 5000,
      "reset": 1621226067
    },
    "source_import": {
      "limit": 100,
      "used": 0,
      "remaining": 100,
      "reset": 1621222527
    },
    "code_scanning_upload": {
      "limit": 500,
      "used": 0,
      "remaining": 500,
      "reset": 1621226067
    }
  },
  "rate": {
    "limit": 5000,
    "used": 2,
    "remaining": 4998,
    "reset": 1621223321
  }
}
```

Sử dụng authenticated token đã giúp chúng ta có thể query x3 lần lên thành 30 requests/phút 😅

> Chú ý đưa token vào trong Header `Authorization` chứ không phải vào query `&access_token=` nếu không muốn Github gửi mail phàn nàn 🤣

![](https://images.viblo.asia/65bf2d3b-be45-4888-af66-04b59919ea47.png)


### Code Search API

Cấu trúc cơ bản như sau: (chi tiết hơn ở [đây](https://docs.github.com/en/rest/reference/search#search-code))

```bash
https://api.github.com/search/code?q=YOUR_QUERY&sort=indexed&o=desc&page=1&per_page=100
```

Điểm qua một số tham số:

- `q`: query của bạn, VD: `password filename:.htaccess`
- `sort` và `order`: tương ứng với options trên giao diện web:

![](https://images.viblo.asia/e341081a-51ef-4308-9218-391149a22f08.png)

   - mặc định `sort` không có giá trị gì sẽ là *Best match*, còn lại tương ứng với 2 option dưới sẽ là `indexed` và lúc đấy `order` sẽ nhận giá trị `asc` hoặc `desc`.
 - `page`: số thứ tự trang kết quả
 - `per_page`: số kết quả trong 1 trang (max là 100)

Mỗi 1 lần query đến endpoint sẽ sử dụng 1 lần search API (và reset sau 1 phút lại về 30). Kết quả trả về là 1 JSON với rất nhiều thông tin khác nhau:

```json
➜  Vigo curl -H "Authorization: token aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" "https://api.github.com/search/code?q=filename:secrets.yml%20GITHUB_ACCESS_TOKEN&sort=&page=1&per_page=1"
{
  "total_count": 25,
  "incomplete_results": false,
  "items": [
    {
      "name": "secrets.yml",
      "path": "config/secrets.yml",
      "sha": "38b6f47492ad7baf0c7a323d6a2615b87b9b8507",
      "url": "https://api.github.com/repositories/18796777/contents/config/secrets.yml?ref=6c3b91e8f7822392fe40f85dc54e2d485b11f716",
      "git_url": "https://api.github.com/repositories/18796777/git/blobs/38b6f47492ad7baf0c7a323d6a2615b87b9b8507",
      "html_url": "https://github.com/timepad/tracker/blob/6c3b91e8f7822392fe40f85dc54e2d485b11f716/config/secrets.yml",
      "repository": {
        ...
      },
      "score": 1.0
    }
  ]
}
```

và chúng ta chỉ cần quan tâm đến trường `url`. Query tiếp vào URL này ta được:

```json
➜  Vigo curl -H "Authorization: token aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" "https://api.github.com/repositories/18796777/contents/config/secrets.yml?ref=6c3b91e8f7822392fe40f85dc54e2d485b11f716"
{
  "name": "secrets.yml",
  "path": "config/secrets.yml",
  "sha": "38b6f47492ad7baf0c7a323d6a2615b87b9b8507",
  "size": 763,
  "url": "https://api.github.com/repos/timepad/tracker/contents/config/secrets.yml?ref=6c3b91e8f7822392fe40f85dc54e2d485b11f716",
  "html_url": "https://github.com/timepad/tracker/blob/6c3b91e8f7822392fe40f85dc54e2d485b11f716/config/secrets.yml",
  "git_url": "https://api.github.com/repos/timepad/tracker/git/blobs/38b6f47492ad7baf0c7a323d6a2615b87b9b8507",
  "download_url": "https://raw.githubusercontent.com/timepad/tracker/6c3b91e8f7822392fe40f85dc54e2d485b11f716/config/secrets.yml",
  "type": "file",
  "content": "ZGV2ZWxvcG1lbnQ6CiAgc2VjcmV0X2t....",
  "encoding": "base64",
  "_links": {
    "self": "https://api.github.com/repos/timepad/tracker/contents/config/secrets.yml?ref=6c3b91e8f7822392fe40f85dc54e2d485b11f716",
    "git": "https://api.github.com/repos/timepad/tracker/git/blobs/38b6f47492ad7baf0c7a323d6a2615b87b9b8507",
    "html": "https://github.com/timepad/tracker/blob/6c3b91e8f7822392fe40f85dc54e2d485b11f716/config/secrets.yml"
  }
}
```

và trường `content` chính là chỗ sẽ lưu nội dung file được encode bằng base 64. Mỗi một lần query vào đây sẽ sử dụng 1 lần core API (tối đa là 5000, reset sau 1 tiếng). Vậy chỉ cần search 1 lần, lấy ra 100 kết quả, rồi query tiếp thì việc bị rate limit 30 search request/1 phút cũng không phải là vấn đề gì quá khó.


Đến đây, ta có thể cơ bản tự động hóa việc tìm kiếm và extract dữ liệu 👍

### Tips and Tricks

Có một vấn đề phát sinh đó là: nếu chúng ta để `page` là > 10 thì sẽ có kết quả trả về:

```json
{
  "message": "Only the first 1000 search results are available",
  "documentation_url": "https://docs.github.com/v3/search/"
}
```

Vì Github giới hạn chỉ trả về 1000 kết quả đầu tiên và yêu cầu chúng ta phải tối ưu hóa câu query để ra được ít kết quả hơn.

Để bypass việc này, chúng ta có thể kết hợp với cú pháp `size`. Ta sẽ query từng đoạn kết quả:

Lần 1: `GITHUB_API_TOKEN size:0..99`
![](https://images.viblo.asia/037a2694-a4bf-4422-b0cd-61e68e8735f0.png)


Lần 2: `GITHUB_API_TOKEN size:100..199`
![](https://images.viblo.asia/7a6e87cc-4c17-4c9e-94c7-92bbd5ab675f.png)


để truy vấn các file có kích thước trong khoảng 0 đến 99 bytes, 100 bytes đến 199 bytes, vân vân, chọn bước nhảy phù hợp, miễn sao số kết quả trả về < 1000 là sẽ dần dần truy vấn hết được 9K kết quả 😇

### Limitations

Tuy nhiên có những giới hạn mà Github đặt ra thì không thể tránh khỏi. Ngoài giới hạn về ký tự đặc biệt trong từ khóa tìm kiếm còn có các giới hạn đáng chú ý sau:
- Cần đăng nhập (token) để tìm kiếm code trong các public repo.
- Code trong các repo là **forks** chỉ được đánh index và searchable khi có số star > repo gốc.
- Chỉ tìm kiếm trên `default branch` của repo (thường là *master* hoặc *main*)
- Chỉ tìm kiếm được cái file nhỏ hơn 384KB.
- Chỉ tìm kiếm được với các repo có ít hơn 500,000 files.
- Chỉ tìm kiếm được trong các report có hoạt động (tức là ko phải tạo ra để đó phủ bụi) và có trong kết quả tìm kiếm năm trước.
- ....

## Kết

Ngoài ra cũng có 1 số trang khác cho phép tìm kiếm source code:

- https://grep.app/ (cho phép sử dụng regex)
- https://searchcode.com/ (nhiều nguồn hơn, ngoài Github còn có Gitlab, Bitbucket, CodePlex, (old) Google Code, Sourceforge...)
- Google 😂

mình sẽ viết thêm về các app này nếu có dịp. Cheer!

## Bonus
{@embed: https://www.youtube.com/watch?v=UwzB5a5GrZk}