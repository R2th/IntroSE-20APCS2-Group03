# Vấn đề
Mặc dù nội dung seri này là làm trang web đơn giản, nhưng đôi khi cả landing page cũng cần có đa ngôn ngữ phải không? Với các framework thì việc đa ngôn ngữ đã có hướng dẫn sử dụng và cách dùng tràn lan rồi, nhưng seri này thì không sử dụng framwork cho khỏi nặng, điều đó đồng nghĩa với việc chúng ta muốn có đa ngôn ngữ sẽ phải làm bằng "cơm" thôi :D

Có nhiều cách để làm đa ngôn ngữ cho bạn, cách "cùi bắp" nhất là tạo clone page với nội dung đã dịch: tức là bạn sẽ có 2 site: 
`yourwebsite/vi/homepage.html` là trang Home tiếng việt và trang `yourwebsite/en/homepage/html` được 'copy' code ý hệt trang kia nhưng với nội dung thay bằng tiếng anh =))

Tất nhiên nếu bảo các bạn làm cách này thì mình chả tốn công viết làm gì, mình sẽ hướng dẫn các bạn làm kiểu "chuyên nghiệp" hơn. Đó là sử dụng key-value để in dữ liệu dựa vào cookie lưu ngôn ngữ hiện tại (nghe giống i18n của các framework nhỉ?)

Ở đây mình sẽ giới thiệu 2 cách, phụ thuộc vào tính chất web của bạn để chọn cách phù hợp hơn: 
* Với 1 landing page nội dung rất hạn chế thay đổi: Sử dụng đa ngôn ngữ lưu bằng file json sẽ đơn giản dễ xử lý
* Với 1 trang web có nội dung thường xuyên được cập nhật và đã sử dụng google sheet để quản lý nội dung như những bài trước trong seri này, thì chúng ta sẽ tiếp tục tận dụng google sheet để lưu các bản dịch nhé.

Tuy nhiên thực tế thì mình sẽ khuyên là trừ khi làm landing page, các bạn nên kết hợp cả 2 cách nhé. Ở phần cuối sẽ phân tích giúp bạn nên kết hợp như thế nào
# Bắt tay vào xử lý
## Sử dụng json
Thực tế trước đây mình đã viết 1 bài ví dụ và có thể ứng dụng đa ngôn ngữ với JS rồi, nhưng bài này mình sẽ đi vào mục tiêu là sử dụng PHP để làm đa ngôn ngữ nhé. Sở dĩ không thể sử dụng JS ở đây, vì JS không có tính "ném bừa bãi", "vứt đâu cũng chạy" như PHP. Sử dụng JS bạn sẽ phải xác định rõ từng vị trí sẽ dịch trên phần html giao diện, sau đó xuống tới phần JS thì định vị các vị trí chính xác để "replace" chuỗi ký tự dịch được. Làm vậy khá bất tiện, khi nội dung dịch nhiều thì nó sẽ trở thành ác mộng luôn (sohai). Thế nên PHP vẫn là phù hợp để sử dụng ở đây (nếu các bạn làm theo các hướng dẫn trong bài trước thì cũng cài sẵn PHP rồi, chả phải cài đặt thêm gì đâu).

### Tạo 1 nguyên tắc cho các từ khóa
Như đã nói ban đầu, cách này tốt cho 1 landing page - nội dung cố định, ít khi phải thay đổi, và vị trí các nội dung đã được xác định ngay từ đầu - và ít nội dung :)

Vậy thì các bạn hãy xác định cách "định vị" key - value cho các nội dung đa ngôn ngữ của mình nhé. Giả sử mình có 1 website landing page giới thiệu nhà hàng: có các phần: menu page, giới thiệu nhà hàng, giới thiệu món ăn, thông tin liên hệ nhà hàng. Bên trong các phần đó là 1 vài đoạn nội dung xen lẫn html khác. Vậy thì mình sẽ để key của đa ngôn ngữ có 2 cấp, cấp 1 chính là key đại diện cho những phần lớn ở trên. Tất cả nội dung dịch sẽ được viết vào file json, để dễ hình dung mình lấy ví dụ nội dung như này: `vi.json`
```json
[
    {
        "menu": {
            "intro": "Giới thiệu nhà hàng",
            "dishes": "Thực đơn",
            "info": "Thông tin nhà hàng"
        },
        "intro": {
            "title": "Giới thiệu nhà hàng",
            "paragraph": "Đoạn này là giới thiệu cái gì đấy, nói chung là quảng cáo nhà hàng"
        },
        "dishes": {
            "title": "Thực đơn",
            "intro": "Giới thiệu gì đó: Thực đơn với các món ăn đến từ Trung Quốc hoặc đâu đấy"
        },
        "info": {
            "title": "Thông tin nhà hàng",
            "contact_us": "Hãy gọi điện đặt bàn",
            "open": "Giờ mở cửa",
            "tel": "Điện thoại",
        }
    }
]
```
Như các bạn thấy, việc để key 2 cấp giúp mình dễ tìm và nhận biết nội dung nào ở chỗ nào hơn, như vậy khi gọi ra sẽ dễ dàng hơn.
### Tạo file nội dung dịch đa ngôn ngữ

Như file Json ví dụ ở trên, giờ mình sẽ tạo ra 2 file ngôn ngữ nữa là `en.json` và `jp.json`, cả 3 file sẽ bỏ vào 1 folder tên là `lang` nhé:
```
website
├― css
├― lang
│  ├― en.json
│  ├― jp.json
│  └― vi.json 
└―index.php
```
Tất nhiên là 3 file này các key sẽ ý hệt nhau, chỉ khác value chính là nội dung đã được dịch.
### Chọn và lưu lại ngôn ngữ của người dùng

Ở đây mình sẽ chọn lưu lại ngôn ngữ mà người dùng chọn vào cookie. Mỗi lần người dùng bấm chọn thay đổi ngôn ngữ, thì cookie lưu ngôn ngữ sẽ được cập nhật, và mặc định chưa chọn sẽ là tiếng Việt. Mỗi lần load trang sẽ dựa vào chính cookie này để lựa chọn file json của ngôn ngữ nào và đưa nội dung ra.
```php
    //Xử lý lưu ngôn ngữ
    if (isset($_COOKIE['language'])) {
        $choose_lang = $_COOKIE['language'];
    } else {
        $choose_lang = 'VI';
    }
```

Giờ thì cần phải đọc file json kia, như đã nói, dựa vào ngôn ngữ đã chọn để đọc file tương ứng nhé:
```php
    $json = file_get_contents('lang/' . strtolower($choose_lang) . '.json') or die('Unable to open file!');
    //Decode JSON để dễ lôi dữ liệu
    $trans = json_decode($json, true);
```
Vậy là biến $trans kia đang chứa tất cả nội dung file mình đã gọi tới để đọc.

Giờ bạn thử thay đổi giá trị của `$_COOKIE['language']` rồi `var_dump($trans)` ra xem đọc đúng file chưa thử xem nhé :D

### In dữ liệu tương ứng
Giờ những gì mình cần đã ở trong biến `$trans` hết rồi, chỉ việc gọi ra cho đúng thôi. Khi  `var_dump($trans)` ra chắc các bạn cũng đã thấy cấu trúc của biến này là dạng mảng đa chiều, và để gọi tới từng key đa cấp-value như trên, phải thông qua các chiều của mảng ví dụ như sau:
```php
echo $trans[0]['menu']['intro']; //in ra value của key menu.intro trong file ngôn ngữ đã được đọc
```
Vậy là ở mỗi vị trí key mà bạn đã đặt, chỉ việc gọi đúng key là sẽ được nội dung dữ liệu ứng với ngôn ngữ trong cookie rồi :D
### Ưu điểm và nhược điểm
 Ưu điểm của việc sử dụng file json đấy là vì file json được upload lên cùng thư mục với Project của bạn, nên nó luôn luôn là 'file đính kèm', không sợ google sheet của bạn đột nhiên "mất liên lạc" để rồi web của bạn trở thành trống trơn  :v

Tuy nhiên, nhược điểm như ban đầu có nói đến, đấy là mỗi lần muốn thay đổi dữ liệu lại phải can thiệp vào code để sửa. Bạn có thể lưu file json ở 1 nơi dễ sửa hơn là trên server, tuy nhiên lại cần cẩn thận trường hợp "mất liên lạc" với file json đó nhé :)

## Level up: Sử dụng google sheet
### Tạo nguyên tắc quản lý bản dịch
Xem các bài trước, các bạn có thể thấy nội dung viết trong google sheet để lưu content cho web cần phải rất quy củ, viết vào đúng cột, đúng hàng. Tương tự như vậy, để có thể gọi đúng content dịch cho web của bạn, cần định nghĩa bạn sẽ lưu bản dịch như thế nào đã. Mình có 2 cách gợi ý như sau: 
* Mỗi sheet google là 1 sheet lưu nội dung của mỗi ngôn ngữ. Với cách này bạn hoàn toàn có thể sử dụng cách in dữ liệu từ google sheet của những bài trước để áp dụng. Tùy thuộc vào giá trị của cookie để chọn số thứ tự sheet tương ứng. Tuy nhiên cách này khá bất tiện nếu bạn có rất nhiều sheet nội dung page, mỗi sheet sẽ được x3 nếu bạn lưu 3 ngôn ngữ. Nhỡ về sau bạn muốn xóa 1 ngôn ngữ hoặc thêm 1 ngôn ngữ thì sẽ phải đi sửa code tất cả các page để đảm bảo nội dung được đọc ở đúng sheet theo thứ tự. Vì vậy mình không khuyến khích cách này, dù vậy nó khá đơn giản với những gì đã biết :D
* Mỗi sheet là 1 page nội dung, các nội dung các ngôn ngữ sẽ được dịch sang các cột bên cạnh. Giả sử nội dung 1 Bảng của bạn được lưu trên 3 cột: tiêu đề (cột 1), mô tả (cột 2), nội dung (cột 3). Và bạn cần 3 ngôn ngữ: 3 cột vừa rồi chính là tiếng việt, vậy thì 3 cột tiếp theo (4, 5, 6) sẽ lưu tương ứng tiêu đề, mô tả, nội dung với ngôn ngữ thứ 2, tương tự vậy với cột 7, 8, 9 nhé. Cách này thì 1 sheet chứa nội dung 1 bảng, dễ quản lý sheet và đối chiếu dữ liệu tương ứng hơn, tránh việc nội dung ở hàng m sheet bên này không tương ứng nội dung ở hàng m sheet bên kia (do sai sót thừa thiếu dữ liệu tương ứng).

Vậy dưới đây mình sẽ hướng dẫn cách quản lý tất cả nội dung các ngôn ngữ được lưu trên 1 sheet nhé.
### Vẫn là key - value như file json, nhưng là lưu trên google sheet
**Tạo dữ liệu google sheet**

Giả sử bạn vẫn có cái landing page ít dữ liệu như trên, nhưng mà bạn thỉnh thoảng muốn đổi vài thông tin, như là dăm ba bữa lại chuyển địa chỉ, số điện thoại, có khi lại muốn đổi content giới thiệu "mặn" hơn theo xu thế chẳng hạn. Chẳng lẽ mỗi lần lại vào code sửa nội dung file json, rồi vào server deploy lại? Nghe cứ lằng nhằng kiểu gì ấy nhỉ. Vậy thì cứ chuyển qua google sheet mà lưu, khi nào thay đổi thì vào đó sửa, chẳng cần máy tính, chẳng cần vào server nội dung trên web vẫn thay đổi được như ý muốn.

Tất nhiên, việc định vị key - value trong html giao diện vẫn như trên, chỉ khác ở thao tác với biến `$trans` thôi

Mình sẽ tạo nguyên tắc cho "bảng" google sheet của mình như sau:
* Cột 1: lưu key (giống key trong file json ở trên)
* Cột 2: value ứng với tiếng Việt
* Cột 3: value ứng với tiếng Anh
* Cột 4: value ứng với tiếng Nhật

![](https://images.viblo.asia/7c912111-0847-49a7-a536-dfd345faf649.png)

Vậy là bạn sẽ có dữ liệu gần tương tự như cách làm bằng json kia rồi.

Đọc google sheet và lưu vào biến nội dung dịch

ĐIều đầu tiên để có thể đọc được dữ liệu từ google sheet đó làn bạn cần xuất bản public sheet dịch đó lên web, tiếp đó là đọc và xử lý dữ liệu lấy được cho phù hợp với mục đích. Bạn có thể đọc lại hướng dẫn xuất bản web [ở đây](https://viblo.asia/p/quan-ly-web-voi-google-sheet-in-du-lieu-tu-google-sheet-back-to-basic-Ljy5VpEjZra#_su-dung-php-5) nhé

```php
//kiểm tra cookie để chọn ngôn ngữ
if (isset($_COOKIE['language'])) {
    $choose_lang = $_COOKIE['language'];
} else {
    $choose_lang = 'vi';
}

//đọc dữ liệu từ google sheet
$url = 'http://spreadsheets.google.com/feeds/cells/YOURGOOGLESHEETCODE/SHEETPAGENUMBER/public/values?alt=json';
$file = file_get_contents($url);
$json = json_decode($file);

$rows = $json->{'feed'}->{'entry'}; //dữ liệu nội dung mình cần ở trong đây

$data = []; //tạo 1 mảng lưu dữ liệu nội dung key - value
foreach ($rows as $record) {
    if ((int)($record->{'gs$cell'}->{'col'}) == 1) { //cột 1 là cột keyword
        $key = $record->{'gs$cell'}->{'$t'}; //gán tên key là nội dung ô ở cột 1
    }
    if ((int)($record->{'gs$cell'}->{'col'}) == 2) { //cột 2 là tiếng việt
        $data["$key"]['vi'] = $record->{'gs$cell'}->{'$t'};
    }
    if ((int)($record->{'gs$cell'}->{'col'}) == 3) { //cột 3 là tiếng anh
        $data["$key"]['en'] = $record->{'gs$cell'}->{'$t'};
    }
    if ((int)($record->{'gs$cell'}->{'col'}) == 4) { //cột 3 là tiếng nhật
        $data["$key"]['jp'] = $record->{'gs$cell'}->{'$t'};
    }
}
```
Đọc kỹ đoạn trên các bạn sẽ thấy giờ biến `$data` đang lưu toàn bộ nội dung của sheet và cả 3 ngôn ngữ. Vậy giờ chỉ cần gọi đúng key và ngôn ngữ đang được chọn là được. Giả sử mình muốn gọi tới value của key 'menu.intro' theo ngôn ngữ hiện tại `$choose_lang` thì sẽ gọi như sau:

```php
echo $data['menu.intro'][$choose_lang];
```
Giờ thay thế hết đoạn trên tương tự như vậy vào file html đang sử dụng json hồi nãy bạn tạo, vậy là được. Lúc này thì có thể xóa luôn folder lang và bước đọc file json đi cho gọn gàng nhé :D
### Nội dung content phức tạp
Với các dữ liệu của web như là trang list tin tức chẳng hạn, thì bạn lại không thể sử dụng key - value cho các vị trí in được, vì sẽ cần dùng vòng lặp để in ra, nên nếu dùng key - value như trên để đa ngôn ngữ sẽ rất phức tạp. Vậy thì quay lại đoạn "Tạo nguyên tắc bản dịch" ở trên, mình đã nói sẽ tổ chức dữ liệu của bảng như sau: 
> Mỗi sheet là 1 page nội dung, các nội dung các ngôn ngữ sẽ được dịch sang các cột bên cạnh. Giả sử nội dung 1 Bảng của bạn được lưu trên 3 cột: tiêu đề (cột 1), mô tả (cột 2), nội dung (cột 3). Và bạn cần 3 ngôn ngữ: 3 cột vừa rồi chính là tiếng việt, vậy thì 3 cột tiếp theo (4, 5, 6) sẽ lưu tương ứng tiêu đề, mô tả, nội dung với ngôn ngữ thứ 2, tương tự vậy với cột 7, 8, 9 nhé
> 
![](https://images.viblo.asia/4a602457-be25-49b6-b23c-8e6e4e2270d9.png)
Ở đây phần lấy dữ liệu sẽ tương tự như trên:
```php
//đọc dữ liệu từ google sheet
$url = 'http://spreadsheets.google.com/feeds/cells/YOURGOOGLESHEETCODE/SHEETPAGENUMBER/public/values?alt=json';
$file = file_get_contents($url);
$json = json_decode($file);

$rows = $json->{'feed'}->{'entry'}; //dữ liệu nội dung mình cần ở trong đây

$data = []; //tạo 1 mảng lưu dữ liệu nội dung key - value
```

Để xác định các cột được lấy dữ liệu ứng với ngôn ngữ đang lưu trong cookie, mình sẽ xử lý chọn như sau:
```php
$curr_lang = $_COOKIE['language'];

// giả sử mỗi ngôn ngữ lưu ở j = 3 cột như ví dụ ở trên:
$j = 3;
switch ($curr_lang) {
    case 'vi':
        $i = 1; //vì cột 1, 2, 3 lưu tiếng việt, nên nếu lang = vi đọc từ cột 1 (tức cột A)
        break;
    case 'en':
        $i = 1 + $j; //bỏ qua j cột đầu để đọc ngôn ngữ thứ 2
        break;
    case 'jp':
        $i = 1 + $j * 2; //bỏ qua j * 2 cột đầu để đọc ngôn ngữ thứ 3
        break;
    default:
        $i = 1; //mặc định cứ đọc ngôn ngữ đầu tiên đi
}
```

Giờ bạn cần tổ chức dữ liệu từ biến `$rows` vào biến `$data`:
```php
foreach ($rows as $record) { //mỗi dữ liệu của ô lấy được ra là 1 $record
    //Lưu số thứ tự bản ghi vào biến $id
    $id = $row->{'gs$cell'}->{'row'};

    if ((int)($record->{'gs$cell'}->{'col'}) == $i) { //cột $i được xác định theo biến $curr_lang ở trên để chọn ngôn ngữ
        //cột đầu tiên là cột chứa tiêu đề theo ngôn ngữ
        $data[$id]['title'] = $record->{'gs$cell'}->{'$t'};
    }
    if ((int)($record->{'gs$cell'}->{'col'}) == $i + 1) { //cột tiếp theo chứa mô tả
        $data[$id]['describe'] = $record->{'gs$cell'}->{'$t'};
    }
    if ((int)($record->{'gs$cell'}->{'col'}) == $i + 3) { //cột tiếp nữa chứa nội dung
        $data[$id]['information'] = $record->{'gs$cell'}->{'$t'};
    }
}
```
Vậy là giờ biến `$data` của bạn đã chứa tất cả nội dung của ngôn ngữ theo cookie rồi. Việc còn lại chỉ là gọi ra đúng chỗ, sử dụng vòng lặp hoặc gọi thế nào là tùy vào mục đích của bạn thôi :D
### Ưu điểm và nhược điểm
Ưu điểm thì đã nói mãi trong các bài trước rồi, bạn có thể tùy ý thay đổi, cập nhật nội dung, thậm chí giao việc quản lý content cho người chẳng biết gì về code, chỉ cần biết "viết đúng chỗ, không sắp xếp lại cấu trúc bảng - sheet và thứ tự sheet", là có thể làm content cho web rồi.

Nhược điểm so với cách sử dụng file json thì đấy là sẽ mất thêm công sức "liên lạc" tới google sheet, vậy là sẽ mất thêm 1 khoảng thời gian và 1 bước "gọi điện thoại cho người thân" mới lấy được dữ liệu để in ra. Nhỡ mà "mất sóng" thì chịu, trang web trống trơn :v
# Kết
Mình có 1 chút lời khuyên cho các bạn khi chọn cách làm đa ngôn ngữ như trên, dựa theo những gì mình đã thực hành cho website, thì với các dữ liệu tĩnh cho web (ví dụ như tiêu đề các mục, các dữ liệu không thay đổi), các bạn vẫn nên sử dụng dữ liệu dạng Json để giảm tối đa khả năng "vô tình" can thiệp vào các value này. Còn đối với các nội dung thường xuyên cập nhật, cần lấy bằng vòng lặp, hoặc dữ liệu tương tự như các 'Bảng' trong CSDL, thì sử dụng google sheet với cách làm đa ngôn ngữ như phương pháp cuối nhé. Với việc kết hợp như vậy thì bạn sẽ tận dụng được lợi thế của cả 2 cách :D. Với bạn nào đọc còn chưa hiểu thì xem các bài trước của seri này để hiểu hơn các bước trong bài nhé