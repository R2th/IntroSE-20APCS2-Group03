Sau khi đã hiểu postgresSQL là gì và cài đặt nó, thì ở bài viết này mình sẽ giới thiệu đến anh em các kiểu dữ liệu(Data types) trong postgresSQL nhé.

### Numberic Types (Kiểu số)
Kiểu dữ liệu kiểu số trong postgresSQL có những kiểu sau, anh em xem bảng dưới này nhé:


| Loại | Kích cỡ | Khoảng |
| -------- | -------- | -------- |
| smallint     | 2 bytes     | -32768 đến +32768     |
| integer     | 4 bytes     | -2147483648 đến +2147483648     |
| bigint     | 8 bytes     | -9223372036854775808 đến +9223372036854775808     |
| decimal     | variable    | đây là loại dữ liệu động nên có thể có đến 131072 chữ số trước dấu thập phân và 16383 chữ số sau dấu thập phân     |
| numeric     | variable     | đây là loại dữ liệu động nên có thể có đến 131072 chữ số trước dấu thập phân và 16383 chữ số sau dấu thập phân    |
| real     | 4 bytes     | kiểu dữ liệu số thực, có độ chính xác lên đến 6 chữ số thập phân     |
| double precission     | 8 bytes     | kiểu dữ liệu số thực, có độ chính xác lên đến 15 chữ số thập phân      |
| smallserial     | 2 bytes     | 1 đến 32767     |
| serial     | 4 bytes    | 1 đến 2147483647     |
| bigserial     | 8 bytes     | 1 đến 9223372036854775807     |

Umm, ở đây có gì lưu ý không nhỉ, anh em không xa lạ gì với những kiểu dữ liệu trên đúng không nào. 
Ở đây mình sẽ có lưu ý một chút giữa 1 số loại trên.

Kiểu numeric, với thằng này khi sử dụng anh em sẽ có 3 cách sử dụng như sau:

> **NUMERIC(*percision*, *scale*)**
> 
> **NUMERIC(*percision*)**
> 
> **NUMERIC**
> 
Ở cách khai báo trên chúng ta sẽ có 2 tham số là percision(độ chính xác tối đa) và scale(tỉ lệ tối đa), hiểu đơn giản như này. Ví dụ chúng ta có số 374.2341 vậy theo con số này thì percision=7 và scale=4 và trong số nguyên thì dĩ nhiên scale sẽ bằng 0.

Tiếp theo là sự khác biệt giữa 2 thằng numeric và double precission:

Ở ví dụ này mình sẽ sử dụng câu lệnh sau nhé:

> SELECT x,
  round(x::numeric) AS num_round,
  round(x::double precision) AS dbl_round
FROM generate_series(-3.5, 3.5, 1) as x;


Mình giải thích một chút câu query trên cho bạn nào chưa rõ nhé: chúng ta sẽ sử dụng hàm *generate_series* hàm này sẽ truyền vào 3 tham số lần lượt là: số bắt đầu, số kết thúc, và đơn vị. Câu lệnh trên nó sẽ gen ra các số từ -3.5 đến 3.5 với mỗi số cách nhau 1 đơn vị, hàm *round*  mình sẽ dùng để làm tròn, trước khi làm tròn thì mình sẽ dùng cú pháp *::* như trên để ép kiểu về 2 dạng trên, từ đó chúng ta có thể so sánh sự khác nhau giữa 2 kiểu dữ liệu trên.

![image.png](https://images.viblo.asia/15d1c5c1-2d40-4009-b663-bee333e5ecea.png)

Như kết quả ở trên anh em thấy, 2 loại dữ liệu numeric và double percission có sự khác biệt khi làm tròn đúng không nào.
Theo như kết quả trên thì thằng numeric sẽ làm tròn theo nguyên tắc nếu số thập phân tại vị trí cần làm tròn >=0.5 thì sẽ được làm tròn lên và <0.5 thì sẽ được làm tròn xuống, còn đối với thằng  double percission thì nó sẽ theo nguyên tắc làm tròn đến số chẵn gần nhất. Ví dụ 3.5 thì thằng double percission sẽ làm tròn lên 4 bởi vì 4 sẽ gần 3.5 hơn là 2 và với 2.5 thì nó sẽ làm tròn xuống 2 vì 2 sẽ gần 2.5 hơn là 4.
Với ví dụ trên thì anh em nên lưu ý khi sử dụng các kiểu dữ liệu trên nhé, để tránh sai sót về mặt dữ liệu.

### Monetary Types
Đây là loại dữ liệu dữ liệu lưu trữ một lượng tiền tệ với độ chính xác được cài đặt:


| Loại | Kích cỡ | Khoảng |
| -------- | -------- | -------- |
| money     | 8 bytes      | -92233720368547758.08 đến +92233720368547758.07     |

Ở loại dữ liệu này anh em có thể thử query vài ba cái xem như nào nhé.

> 	SELECT '12.34'::money;
>![image.png](https://images.viblo.asia/7b18e4a6-37f1-4b7d-9653-aa45c4fbaecf.png)

### Character Types

Đây là loại dữ liệu không thể thiếu trong sql, trong postgresSQL thì nó sẽ có các loại sau:

| Loại | Khoảng |
| -------- | -------- |
| character varying(n), varchar(n)   | Chiều dài thay đổi có giới hạn     |
| character(n), char(n)   | Chiều dài cố định     |
| text   | Chiều dài không giới hạn   |

Bây giờ chúng ta sẽ làm một số ví dụ nhỏ để so sánh sự khác nhau giữa các loại dữ liệu trên nhé:

Đầu tiên anh em sẽ tạo ra 1 table với 3 kiểu dữ liệu như trên:
```
CREATE TABLE users(
	id character varying(10),
	name character(10),
	info text
)
```

Xong chúng ta đã có table users với 3 kiểu dữ liệu trên, giờ sẽ INSERT 1 dòng dữ liệu bất kì nhé

```
INSERT INTO users(id, name, info) VALUES('8392d2-3ed', 'My name is ', 'this is my info')
```

Với câu lệnh trên id chúng ta sẽ để đúng 10 kí tự và với name chúng ta sẽ để khoảng trắng ở cuối, những khoảng trắng này sẽ không có nghĩa về mặt văn bản, nên nó sẽ tự động được loại bỏ khi chúng ta thêm mới vào. Vậy điều này có ảnh hưởng gì tới dữ liệu khi chúng ta thêm vào hay không ? 🤔

Bây giờ ta sẽ làm một ví dụ như sau:
```
SELECT 'a '::CHAR(2) collate "C" < E'a\n'::CHAR(2)
```
Câu query trên sẽ trả ra kết quả là true.

Mình sẽ giải thích 1 chút câu query trên nhé: câu query trên sẽ so sánh 2 chuỗi là *'a '* và *'a\n'* theo chuẩn collation "C" anh em có thể xem thêm các chuẩn khác trong postgresSQL với câu query: 
`SELECT * FROM pg_collation` hiểu đơn giản chuẩn collation là 1 nguyên tắc sắp xếp các kí tự và phương thức chuyển mã kí tự, ví dụ như A=65 trong máy tính. Anh em có thể tìm hiểu thêm nhé.
Theo như chuẩn "C" thì kí tự *space* sẽ lớn hơn kí tự *\n* nhưng tại sao kết quả trả về lại là true 🤨, chính là do việc tự động xóa kí tự khoảng trắng ở cuối trong postgresSQL, nên anh em lưu ý vấn đề này trong việc sử dụng nhé.

### Binary Data Types

| Loại | Kích cỡ | Thông tin |
| -------- | -------- | -------- |
| bytea     | 1 hoặc 4 byte     | chuỗi nhị phân có độ dài thay đổi     |

Kiểu dữ liệu nhị phân thì chắc chắn là dùng để lưu dữ liệu dạng nhị phân rồi đúng không anh em.
Giá trị đầu vào của kiểu dữ liệu này có thể được lấy theo định dạng 'hex' hoặc 'Escape'  và đầu ra cũng tương tự, anh em có thể cấu hình loại định dạng đầu ra theo câu query: `SET bytea_output = 'escape';` mặc định giá trị bytea_output là 'hex'.
Vậy thì loại dữ liệu này có thể được ứng dụng như nào nhỉ ?.
Bây giờ ta sẽ tạo ra một table với 1 trường dữ liệu có kiểu *bytea* xem sao:
```
CREATE TABLE img(
	id text,
	img_name character varying,
	img_data bytea
)
```

Giờ mình sẽ viết 1 demo nhỏ để đẩy 1 hình ảnh lên postgresSQL và lấy về xem như nào nhé
```
package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "postgres"
	dbname   = "postgres"
)

type Img struct {
	ID      string `json:"id" db:"id"`
	ImgName string `json:"img_name" db:"img_name"`
	ImgData []byte `json:"img_data" db:"img_data"`
}

func main() {
	// start connect database
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}
	fmt.Println("Successfully connected!")
	// end connect database
	
	// read file image
	imgData, err := os.ReadFile("nature.png")

	//insert data to database
	_, err = db.Exec("INSERT INTO img(id, img_name, img_data) VALUES($1, $2, $3)", "1", "nature", imgData)
	if err != nil {
		fmt.Println(err)
	}

	// read file from database
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		img := []byte{}
		err = db.QueryRow("SELECT img_data FROM img LIMIT 1").Scan(&img)
		if err != nil {
			fmt.Println(err)
		}
		writer.Write(img)
	})
	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatalf("Error creating server %s\n", err.Error())
	}

}
```
![ảnh.png](https://images.viblo.asia/023ba19f-3e66-4869-9c4a-b579bb52ef89.png)

Mình giải thích một chút đoạn code trên nhé: mình sẽ dùng golang để connect tới database, sau khi connect thành công mình sẽ insert 1 hình ảnh vào database dưới dạng bytea và lấy ra show trên trình duyệt.
Và đây là hình ảnh mình lấy từ database:
![ảnh.png](https://images.viblo.asia/505a7d10-f152-4814-be77-8b9fab05fbbe.png)

Ngoài ra anh em có thể insert data hình ảnh trực tiếp bằng query, postgresSQL cũng đã hỗ trợ sẵn hàm để đọc file với câu query như sau:
```
insert into img values ('2', 'nature', pg_read_binary_file('/Users/huy/dev/nature.png')::bytea);
```

Câu query trên sẽ dùng hàm *pg_read_binary_file* để đọc file từ đường dẫn và insert vào data, khi lấy ra và show trên trình duyệt thì kết quả sẽ tương tự.

Đó là một ứng dụng đại diện cho kiểu dữ liệu bytea, anh em có thể tìm hiểu thêm nhé.

### Date/Time Types
Kiểu dữ liệu ngày giờ, tương tự như các hệ quản trị cơ sở dữ liệu khác, postgresSQL cũng cung cấp đủ các kiểu dữ liệu ngày giờ cần thiết theo bảng sau:


| Loại | Kích cỡ | Thông tin | Giá trị thấp nhất | Giá trị cao nhất | Resolution |
| -------- | -------- | -------- | -------- | -------- | -------- |
| timestamp [ (p) ] without time zone    | 8 bytes | ngày/tháng/năm và thời gian (không time zone) | 4713 BC | 294276 AD | 1 microsecond |
| timestamp [ (p) ] with time zone    | 8 bytes | ngày/tháng/năm và thời gian (có time zone)| 4713 BC | 294276 AD | 1 microsecond |
| date    | 4 bytes | ngày/tháng/năm| 4713 BC | 5874897 AD | 1 day |
| time [ (p) ] without time zone    | 8 bytes | Thời gian(giờ-phút-giây) (không time zone)| 00:00:00 | 24:00:00 | 1 microsecond |
| time [ (p) ] with time zone    | 12 bytes | Thời gian(giờ-phút-giây) (có time zone)| 00:00:00+1559 | 24:00:00-1559 | 1 microsecond |
| interval [fields] [ (p) ]    | 16 bytes | Thời gian(giờ-phút-giây) (có time zone)| -178000000 years | 178000000 years| 1 microsecond |

Với bảng thông tin trên ta có một tham số là *p*, nó dùng để cấu hình số chữ số phân số trong trường giây, Ví dụ: *2022-10-04 23:22:58.66* trong dữ liệu này thì ta xác định tham số *p* bằng 2 (sau dấu chấm gồm 2 chữ số), đây là tham số tùy chọn (optional) nên khi không truyền vào thì mặc định sẽ lưu đầy đủ số phân số trong trường giây.

Trong phần giá trị thấp nhất, giá trị cao nhất anh em thấy có đơn vị BC, AD. Thế nó là gì nhỉ ?
Mình xin giải thích thêm 1 chút về 2 từ này:
*  **BC**  trong tiếng Latin là **Ante Christum**, trong tiếng Anh là **Before Christ**, là trước khi chúa Jesus ra đời, nghĩa là trước công nguyên.
*  **AD** trong tiếng Latin là **Anmo Domini** trong tiếng Anh là **Refer to the years after the birth of Jesus Christ** , là năm chúa Jesus ra đời, nghĩa là sau công nguyên.

Ngoài code ra thì giờ anh em còn biết thêm kiến thức xã hội nữa đúng không nào. 😁😁



### Boolean Type

Boolean type là kiểu dữ liệu dạng đúng sai, nó có thể có các giá trị *true*, *false* hoặc là null


| Loại | Kích cỡ | Thông tin |
| -------- | -------- | -------- |
| boolean     | 1 byte     | true hoặc false     |

Ở loại dữ liệu này không còn lạ gì với anh em nữa đúng không nào.
Nhưng mình sẽ làm 1 ví dụ nhỏ cho anh em hiểu hơn một chút về nó nhé:
Trước tiên mình sẽ tạo một table là *test1* như sau
```
CREATE TABLE test1 (a boolean, b text);
```
Sau đó mình insert data như sau:
```
INSERT INTO test1 VALUES (TRUE, 'sic est');
INSERT INTO test1 VALUES (FALSE, 'non est');
```

![image.png](https://images.viblo.asia/ef342e55-bf21-4e49-9590-56a8e61bc0a9.png)

Như các bạn thấy data được insert vào không có gì đặc biệt:
Vậy có cách nào khác để thêm dữ liệu dạng boolean khác 2 từ khóa *TRUE* và *FALSE* không ?
Ngoài 2 từ khóa trên thì trong postgresSQL còn hỗ trợ thêm các loại như sau thay thế cho *true* và *false*:
* true: yes  , 1 , on
* false: no,  0, off

Khi đó query của chúng ta sẽ như sau:
```
INSERT INTO test1 VALUES ('yes'::boolean, 'sic est');
INSERT INTO test1 VALUES ('no'::boolean, 'non est');
```


### Enumerated Types

Enumerated (kiểu liệt kê) đây là một kiểu dữ liệu gồm tập các giá trị tĩnh, có thứ tự. Nó tương đương với kiểu dữ liệu enum có trong một số ngôn ngữ lập trình.

Cùng mình sử dụng qua kiểu dữ liệu này xem có gì hay không nhé.

Trước tiên mình sẽ tạo ra 1 giá trị có kiểu dữ liệu là enum như sau:

```
CREATE TYPE user_type AS ENUM ('customer', 'employee', 'admin');
```

Câu query trên sẽ tạo ra enum là user_type với các giá trị như trên, khi này chúng ta đã có có kiểu user_type để dùng rồi, ví dụ:
```
CREATE TABLE users(
	id text,
	name text,
	user_type user_type	
)
```

Mình sẽ tạo ra bảng users với các trường dữ liệu như trên, và trường user_type có kiểu dữ liệu là user_type mà anh em mới tạo phía trên.

Giờ mình sẽ thử thêm data vào xem chuyện gì sẽ xảy ra nhé.
```
INSERT INTO users VALUES ('1', 'Xuân Huy', 'customer');
```

![ảnh.png](https://images.viblo.asia/8be38c22-408d-4981-92a2-e621f7de3b2f.png)

Như anh em thấy, không có chuyện gì xảy ra đúng không, và chúng ta vẫn có dữ liệu được thêm vào bình thường.

Mình thử thêm data với giá trị của user_type khác với các giá trị của enum nó có xem sao nhé.

```
INSERT INTO users VALUES ('2', 'Van A', 'president');
```

![ảnh.png](https://images.viblo.asia/b224f8ad-1e5d-4590-a3aa-bbe86b30a903.png)

Khi đó anh xem sẽ nhận được thông báo lỗi như trên hình.

Rất đơn giản để hiểu tác dụng của kiểu dữ liệu enum đúng không nào 😁.


### Network Address Types

Đây là kiểu dữ liệu mà PostgresSQL cung cấp cho anh em lưu các địa chỉ IPv4, IPv6 và MAC. Anh em nên sử dụng kiểu dữ liệu này khi lưu các loại địa chỉ mạng nhé, thay vì dùng kiểu dữ liệu text, khi dùng kiểu dữ liệu này nó sẽ đảm bảo dữ liệu có tính đúng đắt nhất nhé.

Nó bao gồm các loại sau:



| Loại| Kích cỡ | Thông tin |
| -------- | -------- | -------- |
| cidr     | 7 hoặc 19 bytes     | IPv4 và IPv6     |
| inet     | 7 hoặc 19 bytes     | IPv4 và IPv6     |
| macaddr     | 6 bytes     | Địa chỉ mac     |
| macaddr8     | 8 bytes     | Địa chỉ mac(EUI-64 format)     |


Kiểu dữ liệu này không có gì đặc biệt, các bạn có thể tìm hiểu thêm ở link chính thức của PostgresSQL nhé 😁😁:

https://www.postgresql.org/docs/current/datatype-net-types.html




### Text Search Types
### UUID Type
### XML Types
### JSON Types
### Arrays
### Composite Types
### Range Types
### Domain Types
### Object Identifier Types
### pg_lsn Types
### Pseudo-Types