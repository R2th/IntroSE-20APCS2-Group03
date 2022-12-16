Khi thao tác với dữ liệu, hẳn là ta sẽ phải làm quen với việc sử dụng file `csv` và `json`, bài viết này mình xin giới thiệu với các bạn công cụ để bạn có thể làm việc với những định dạng file này bằng giao diện dòng lệnh trên Linux.

![](https://images.viblo.asia/10a15c75-b626-4b8a-afd4-30138aa75d40.jpg)

### File CSV
Với những người dùng Ubuntu, bạn vẫn có bộ Office như OpenOffice hoặc LibreOffice để làm việc với file `csv`, tuy nhiên phải thừa nhận rằng nó vẫn thua xa như khi làm việc MS Office (mất $ nó có khác :D). Rất nhiều người lựa chọn giải pháp như cài MS Office trên máy ảo hoặc chuyển qua dùng công cụ Office trực tuyến như Google Drive. Nhưng nếu bạn phải xử lý các file `csv` thường xuyên thì như thế cũng rất bất tiện.

Ubuntu cũng có được tích hợp sẵn một số công cụ để xử lý file `csv` như: `sed`, `grep`, `cut`. Tuy nhiên với một file `csv` [như này](https://media.githubusercontent.com/media/MuseumofModernArt/collection/master/Artists.csv) chẳng hạn, file này có các ô trong cùng một hàng được phân tách bởi dấu `,` và trong nội dung của cột `ArtistBio` cũng có thể có cả dấu `,`. Khi sử dụng những công cụ trên để xử lý thì bạn sẽ ra được kết quả không chính xác vì nó tự động tách cột ở dấu `,`.

Gần đây mình có đọc bài gới thiệu về csvkit [ở đây](https://www.dataquest.io/blog/data-cleaning-command-line/) thấy nó khá hay và tiện dụng nhất là việc xử lý các dữ liệu trên giao diện dòng lệnh.

Trong môi trường Ubuntu, trước tiên bạn phải cài đặt gói này để làm việc với `csvkit`.

```
sudo apt-get install python-dev python-pip python-setuptools build-essential
```

Sau đó bạn có thể cài đặt đơn giản bằng lệnh.

```
pip install csvkit
```

Bạn có thể tìm hiểu chi tiết thêm ở [đây](https://csvkit.readthedocs.io/en/0.9.1/install.html).

Bài viết này mình sẽ làm ví dụ minh họa với file [này](https://media.githubusercontent.com/media/MuseumofModernArt/collection/master/Artists.csv). Down về và lưu nội dung vào file: `artists.csv`

```
curl https://media.githubusercontent.com/media/MuseumofModernArt/collection/master/Artists.csv > artists.csv
```

#### 1. csvlook

Show ra xem vài dòng dữ liệu.

```
~$  head -n 5 artists.csv | csvlook
|-----------------+-----------------+---------------------+-------------+--------+-----------+---------+----------+------------|
|   ConstituentID | DisplayName     | ArtistBio           | Nationality | Gender | BeginDate | EndDate | Wiki QID | ULAN       |
|-----------------+-----------------+---------------------+-------------+--------+-----------+---------+----------+------------|
|  1              | Robert Arneson  | American, 1930–1992 | American    | Male   | 1930      | 1992    |          |            |
|  2              | Doroteo Arnaiz  | Spanish, born 1936  | Spanish     | Male   | 1936      | 0       |          |            |
|  3              | Bill Arnold     | American, born 1941 | American    | Male   | 1941      | 0       |          |            |
|  4              | Charles Arnoldi | American, born 1946 | American    | Male   | 1946      | 0       | Q1063584 | 500027998  |
|-----------------+-----------------+---------------------+-------------+--------+-----------+---------+----------+------------|
```

Yeah, các cột dữ liệu đã được phân tách chuẩn.

#### 2. csvcut

Liệt kê xem có file các cột nào với `-n` chỉ lấy tên các cột.

```
~$ csvcut -n artists.csv
  1: ConstituentID
  2: DisplayName
  3: ArtistBio
  4: Nationality
  5: Gender
  6: BeginDate
  7: EndDate
  8: Wiki QID
  9: ULAN
```

Ví dụ ta cần show cột số 2 và cột số 4 của 5 bản ghi đầu tiên thì sẽ dùng thuộc tính `-c` như sau:

```
~$ head -n 6 artists.csv | csvcut -c 2,4 | csvlook
|------------------+--------------|
|  DisplayName     | Nationality  |
|------------------+--------------|
|  Robert Arneson  | American     |
|  Doroteo Arnaiz  | Spanish      |
|  Bill Arnold     | American     |
|  Charles Arnoldi | American     |
|  Per Arnoldi     | Danish       |
|------------------+--------------|
```

Cũng có thể show ra các cột còn lại trừ cột số 2 và số 4 với thuộc tính `-C`.

```
~$ head -n 6 artists.csv | csvcut -C 2,4 | csvlook
|-----------------+---------------------+--------+-----------+---------+----------+------------|
|   ConstituentID | ArtistBio           | Gender | BeginDate | EndDate | Wiki QID | ULAN       |
|-----------------+---------------------+--------+-----------+---------+----------+------------|
|  1              | American, 1930–1992 | Male   | 1930      | 1992    |          |            |
|  2              | Spanish, born 1936  | Male   | 1936      | 0       |          |            |
|  3              | American, born 1941 | Male   | 1941      | 0       |          |            |
|  4              | American, born 1946 | Male   | 1946      | 0       | Q1063584 | 500027998  |
|  5              | Danish, born 1941   | Male   | 1941      | 0       |          |            |
|-----------------+---------------------+--------+-----------+---------+----------+------------|
```

#### 3. csvgrep
 Ta sẽ dùng để lọc ra dữ liệu.
 
 Ví dụ cần lọc ra `DisplayName` với điều kiện `BeginDate` là năm 1932.
 
 ```
 ~$ head -n 800 artists.csv | csvcut -c 2,6 | csvgrep -c 2 -m '1932' | csvlook
|------------------+------------|
|  DisplayName     | BeginDate  |
|------------------+------------|
|  Eero Aarnio     | 1932       |
|  Stephen Ancona  | 1932       |
|  Wall Batterton  | 1932       |
|  Robert Bechtle  | 1932       |
|  Peter Blake     | 1932       |
|  Fernando Botero | 1932       |
|  Lynn Bowers     | 1932       |
|  Jürgen Brodwolf | 1932       |
|------------------+------------|
 ```

Hoặc điều kiện `BeginDate` là những năm 1930s.

```
~$  head -n 80 artists.csv | csvcut -c 2,6 | csvgrep -c 2 -r "193." | csvlook
|------------------------+------------|
|  DisplayName           | BeginDate  |
|------------------------+------------|
|  Robert Arneson        | 1930       |
|  Doroteo Arnaiz        | 1936       |
|  Jüri Arrak            | 1936       |
|  Eero Aarnio           | 1932       |
|  Magdalena Abakanowicz | 1930       |
|  Robert Abel           | 1937       |
|  Sigmund Abeles        | 1934       |
|  Raimund Abraham       | 1933       |
|  Ivor Abrahams         | 1935       |
|  Rodolfo Abularach     | 1933       |
|  Valerio Adami         | 1935       |
|  Alice Adams           | 1930       |
|  Robert Adams          | 1937       |
|  Dongkuk S. Ahn        | 1937       |
|------------------------+------------|
```

#### 4.csvstat

Dùng để đếm số lượng dòng kết quả thỏa mãn.

```
~$ head -n 80 artists.csv | csvcut -c 2,6 | csvgrep -c 2 -r "193." | csvstat --count
Row count: 14
```

Lấy giá trị min, max, sum...

```
~$  head -n 30 artists.csv | csvcut -c 2,6 | csvstat -c 2 --min
0

~$ head -n 30 artists.csv | csvcut -c 2,6 | csvstat -c 2 --max
1946

~$ head -n 30 artists.csv | csvcut -c 2,6 | csvstat -c 2 --sum
46060
```

#### Convert JSON
Bạn cũng có thể convert file `csv` thành file `json`. Lệnh này cần phải cài đặt `jq` trước đã, cách cài đặt mình có đề cập đến ở phần **[JSON](https://viblo.asia/p/lam-viec-voi-file-csv-va-json-bang-giao-dien-dong-lenh-jvElaW6AKkw#_json-1)** bên dưới nhé.

```
~$ head -n 3 artists.csv | csvjson | jq "."
[
  {
    "﻿ConstituentID": "1",
    "DisplayName": "Robert Arneson",
    "ArtistBio": "American, 1930–1992",
    "Nationality": "American",
    "Gender": "Male",
    "BeginDate": "1930",
    "EndDate": "1992",
    "Wiki QID": "",
    "ULAN": ""
  },
  {
    "﻿ConstituentID": "2",
    "DisplayName": "Doroteo Arnaiz",
    "ArtistBio": "Spanish, born 1936",
    "Nationality": "Spanish",
    "Gender": "Male",
    "BeginDate": "1936",
    "EndDate": "0",
    "Wiki QID": "",
    "ULAN": ""
  }
]
```

Ngoài ra thì còn những câu lệnh khác nữa, bạn có thể tìm hiểu thêm nhé.

### JSON

Để làm việc với file `json` trên giao diện dòng lệnh,  mình sử dụng `jq` - một JSON processor (nó giống với `sed` nhưng cho `json`), kết hợp với `grep`, `sed`, `awk`.

Bạn có thể tham khảo cách cài đặt [ở đây](https://stedolan.github.io/jq/download/). 

![](https://images.viblo.asia/adf13365-9037-4395-869b-60954f6a9a0a.png)

Mình ví dụ với một file `example.json` có nội dung như sau:

```
{
"displayName" : "master",
"offline" : false
},
{
"displayName" : "agent-1",
"offline" : true
},
{
"displayName" : "agent-2",
"offline" : false
},
{
"displayName" : "celery",
"offline" : false
},
{
"displayName" : "kelp",
"offline" : false
},
{
"displayName" : "spinach",
"offline" : false
},
{

}
```

Để show ra tất cả các đối tượng của file ta có thể dùng lệnh `jq '.' example.json` hoặc `jq '.[]' example.json`

#### 1. Kiểm tra độ dài

```
~$ jq 'length' example.json
6
~$ jq '.[] | length' example.json
2
2
2
2
2
2
```

Tất cả có 6 đối tượng và mỗi đối tượng đều có 2 thuộc tính

#### 2.Lấy thuộc tính của đối tượng.

Ví dụ muốn lấy `dislayName` của tất cả đối tượng.

```
~$ jq '.[].displayName' example.json

"master"
"agent-1"
"agent-2"
"celery"
"kelp"
"spinach"
```

#### 3. Xử lý trên từng đối tượng.
Ta sẽ xác định đối tượng nào qua vị trí của nó, bắt đầu từ `[0]`
Lấy ra phần tử đầy tiên.

```
~$ jq '.[0]' example.json

{
  "displayName": "master",
  "offline": false
}
```

Kiểm tra thuộc tính đối tượng thứ 2

```
~$ jq '.[1].offline' example.json
true
```

#### 5. Sắp xếp theo thuộc tính.

Ví dụ muốn sắp xếp theo `displayName`.

```
~$ jq 'sort_by(.displayName)' example.json
[
  {
    "displayName": "agent-1",
    "offline": true
  },
  {
    "displayName": "agent-2",
    "offline": false
  },
  {
    "displayName": "celery",
    "offline": false
  },
  {
    "displayName": "kelp",
    "offline": false
  },
  {
    "displayName": "master",
    "offline": false
  },
  {
    "displayName": "spinach",
    "offline": false
  }
]
```

#### 6. So sánh, điều kiện.

Liệt kê các đối tượng có `displayName` là `master`

```
 ~$ jq '.[].displayName == "master"' example.json
 true
false
false
false
false
false
```

Bạn có thể tham khảo thêm ở [đây](https://stedolan.github.io/jq/manual/).

***

### Kết

Trên đây mình chia sẻ 2 công cụ tương ứng để làm việc với file `CSV` và `JSON` bằng dòng lệnh trên Linux, hi vọng bài viết sẽ có ích với bạn.

### Tham khảo

- https://www.dataquest.io/blog/data-cleaning-command-line/