Bảo mật dữ liệu cá nhân của người dùng hiện nay cũng là một vấn đề khá quan trọng. Mỗi năm lại có đến  [hơn chục công ty lớn nhỏ](https://monitor.firefox.com/breaches) để lộ dữ liệu người dùng.

Encrypt dữ liệu trong databse có thể giảm thiểu nguy cơ rò rỉ thông tin khi dữ liệu bị đánh cắp, tuy nhiên lại làm mất đi tính năng quan trọng của DB là tìm kiếm và sắp xếp. Đây là một ví dụ cho dễ hiểu, mình encrypt cùng một đoạn text `AAAA` 10 lần với cùng một secret bằng *AES*.

{@embed: https://jsfiddle.net/thphuong/bvw3e8c7}

Với 10 lần encrypt thì ta sẽ được 10 kết quả khác nhau. Bạn có thể chạy lại vài chục lần và thấy kết quả vẫn khác nhau. Vậy nên dù có muốn search thì cũng không thể nào kiếm được 1 string giống với string đã encrypt để mà search cả. Vậy giờ hãy cùng tìm hiểu xem nào thế nào để index và search được trong đống dữ liệu đã được encrypt kia nha.

## Threats

Nhưng mà trước khi bắt đầu thì có một chút lưu ý đã.

### Secure your app/server first

Đúng là encrypt database sẽ bảo vệ dữ liệu của bạn. Nhưng chỉ là khi ai đó có DB của bạn mà không thể decrypt thôi. Nếu kẻ tấn công mà chiếm được quyền điều khiển web/api server của bạn thì mọi thứ đã kết thúc. Vậy nên encrypted DB không có nghĩa là bạn có thể xem nhẹ security cho app của bạn được. Nhớ không để encryption key cùng với DB, đặt DB và web/api app ở 2 chỗ khác nhau để giảm thiểu rủi ro.

### Information leakage

Nếu đã muốn search được thì bạn cần index dữ liệu. Mà index thì sẽ để lộ thông tin về dữ liệu, không hẳn là bản thân dữ liệu mà thường có thể là metadata. Ví dụ một index cho phép sắp xếp dữ liệu thì có thể tiết lộ thứ tự của dữ liệu. Index để tìm kiếm như chúng ta sắp làm thì sẽ tiết lộ thông tin về các đoạn text có thể liên quan đến nhau hoặc là giống hệt nhau. Đây là một tác dụng phụ không thể tránh khỏi, vấn đề là ở mức độ nào, hoặc tùy vào dữ liệu của bạn phân bố thế nào hay quan trọng đến đâu.

Tùy theo mức độ bảo mật mà bạn cũng có thể để index ở một chỗ khác với DB, hoặc thậm chí là lưu in-memory và chỉ build mỗi khi bắt đầu chạy app thôi.

## Deterministic encryption

Cách đầu tiên mà có thể mọi người đều nghĩ đến là làm thế nào để kết quả của mỗi lần encrypt đều giống nhau. Hay còn gọi là [deterministic encryption](https://en.wikipedia.org/wiki/Deterministic_encryption). Với cách này thì bạn có thể dễ dàng tạo ra string đã được encrypt để search trong DB, tất nhiên là chỉ search được kết quả chính xác thôi chứ không search kiểu `LIKE` được. Đây là ví dụ 2 cách để làm như thế với AES.

{@embed: https://jsfiddle.net/thphuong/3m0v8dtb}

Các thuật toán phổ biến mà chúng ta hay dùng (DES, AES, Blowfish) đều thuộc loại *block cipher*. Nghĩa là đoạn text cần được encrypt sẽ được chia thành các block và encrypt từng block một. Ví dụ AES có block size là 128 bit. Nghĩa là đoạn `AAAAAAAAAAAAAAAABBBB` sẽ được chia thành 2 block `AAAAAAAAAAAAAAAA` và `BBBB` để encrypt. Đây là cách để thuật toán có được kết quả giống nhau với cùng một text như ví dụ trên. AES có các mode hoạt động khác nhau. Mode vừa rồi gọi là *ECB* (Electronic Codebook) mode. Để có kết quả khác nhau với cùng một text như ví dụ đầu tiên, AES dùng kết quả của block trước để kết hợp với block sau (*XOR*) trước khi encrypt nó và cứ lặp lại như vậy. Với block đầu tiên, vì không có block nào trước đó nên chúng ta chọn 1 key random gọi là *IV* (Initialization vector). Mỗi lần encrypt ta lại chọn một IV khác để kết quả được random. Mode này gọi là *CBC* (Cipher Block Chaining) mode. Như ví dụ trên, 2 cách mà mình dùng là dùng ECB mode và chọn một IV cố định thay vì thay đổi mỗi lần encrypt.

Theo miêu tả trên thì bạn có thể thấy là encrypt kiểu này thì mỗi block luôn luôn encrypt ra một kết quả giống nhau. Đây là ví dụ.

{@embed: https://jsfiddle.net/thphuong/qcma0pyx}

Bạn có thể nhận ra là với ECB mode thì `AAAAAAAAAAAAAAAA` luôn luôn ecrypt thành `cXraKOjg/jsIVEuHTNcaz` và `BBBBBBBBBBBBBBBB` luôn luôn encrypt thành `hYSoRAWWIqJHFkMsvlpVg`. CBC mode với static IV thì đỡ hơn vì kết quả của block sau phụ thuộc vào block trước nhưng block đầu tiên thì vẫn sẽ không đổi.

Nếu thông tin được encrypt là thông tin mà user có thể nhập vào (thông qua web/mobile app, API) thì bất kì ai cũng có thể dễ dàng build 1 cái codebook để giải mã toàn bộ dữ liệu đã được mã hóa của bạn mà không cần đến encryption key. Kiểu tấn công đó gọi là [chosen-plaintext attack](https://en.wikipedia.org/wiki/Chosen-plaintext_attack) và thuật toán mã hóa như trên không thể bảo vệ được dữ liệu của bạn. Vậy nên cách này cũng không hẳn là một cách hay mà bạn nên dùng.

## Use a blind index

Khi nhắc đến tạo 1 giá trị gì đó tương ứng với 1 đoạn dữ liệu mà mỗi lần đều cho ra kết quả giống nhau thì cách đầu tiên bạn nên nghĩ tới hẳn không phải là encrypt như trên mà phải là hash rồi. Chúng ta sẽ tạo 1 index để tìm kiếm bằng cách hash dữ liệu và lưu vào 1 chỗ khác (cột khác). Cách này gọi là [blind indexing](https://www.sitepoint.com/how-to-search-on-securely-encrypted-database-fields/#implementingliteralsearchofencrypteddata).

Tất nhiên không thể dùng MD5 hay SHA-1 rồi vì như thế thì ai cũng có thể dễ dàng tạo 1 cái [lookup table](https://en.wikipedia.org/wiki/Rainbow_table) để lấy được dữ liệu ban đầu. Trong trường hợp đơn giản thì có thể thêm HMAC thôi là đủ, như thế bạn sẽ cần key để tạo được đúng đoạn hash để tìm kiếm. Đây là ví dụ với HMAC-SHA-256.

{@embed: https://jsfiddle.net/thphuong/73jbh0tq}

Chúng ta vẫn có dữ liệu được encrypt với kết quả random và vẫn có index để search. Nếu dữ liệu quan trọng hơn thì bạn có thể dùng những thuật toán hash khó break hơn (nhưng chậm hơn) như PBKDF2, bcrypt hay Argon2 chẳng hạn. Tất nhiên lưu ý là không lưu encryption key cùng với DB mà phải để ở chỗ khác nhé.

Có thể dễ thấy là cách này cũng làm rò rỉ thông tin vì dữ liệu giống nhau thì index cũng sẽ giống hệt nhau. Nhất là nếu dữ liệu của bạn chỉ có vài giá trị (kiểu boolean hoặc enum) thì cái này khá nghiêm trọng đó.

## Fields with small input domain

Index cho kiểu dữ liệu boolean hay enum như trên là không an toàn lắm, nhưng mà dù sao thì chúng ta vẫn phải encrypt nếu như dữ liệu đó quan trọng.

Nói chung là dữ liệu có ít giá trị quá thì bạn có thể làm thế nào đó để tăng số lượng lên, làm cho nó trông có vẻ random hơn. Cách đơn giản nhất là với mỗi giá trị thì transform nó thành nhiều giá trị khác trước khi hash. Ví dụ kiểu dữ liệu boolean có 2 giá trị `true` và `false` thì có thể transform `true` thành một trong số các string `ture`, `tuer`, `treu`... Khi search thì cũng làm tương tự và query tất cả các kết quả hash có thể.

Một cách khác có thể tạo thêm nhiều giá trị hơn là kết hợp trường đó với một trường khác có nhiều giá trị để dữ liệu random hơn. Cái này gọi là [compound blind index](https://paragonie.com/blog/2019/01/ciphersweet-searchable-encryption-doesn-t-have-be-bitter#compound-blind-indexes). Tất nhiên khả năng search sẽ bị giảm đi đáng kể vì bây giờ bạn chỉ có thể search kèm theo 1 trường khác. Vậy nên tốt nhất là kết hợp các trường có lien quan đến nhau mà mình muốn search. Ví dụ mình có cột `t_virus_infected` kiểu enum với 2 giá trị `yes` và `no`. Mình sẽ kết hợp nó với cột `country` chẳng hạn. Khi đó mình có thể tìm kiếm những người đã bị nhiễm T-virus ở 1 quốc gia nào đó. Nhưng tất nhiên không phải lúc nào cũng có thể kết hợp tiện lợi như thế rồi.

## Introduce some noise

Trong trường hợp có ít giá trị thì bạn có thể làm theo cách trên. Còn nếu bạn có nhiều giá trị hơn nhưng vẫn có khá nhiều trùng lặp thì bạn có thể giảm bớt mức độ nguy hiểm một chút bằng cách thêm vào một chút *noise* bằng cách transform index trước khi lưu lại (cũng giống như cách transform dữ liệu ở trên). Thay vì lưu cả đoạn hash làm index thì bạn chỉ lưu 1 phần thôi, có thể là vài chục kí tự đầu, hoặc lấy mỗi phần vài kí tự ở các vị trí khác nhau rồi ghép với nhau. Ví dụ có 2 string khác nhau hash thành:

```
bb4367f35e06e4da1684f089442ecc93e80a66160894d4149f60aee1b8606870
bb4367f35e06e4da1684f089442ecc931f6d20f1bb3650293402f4926b536741
```

Thay vì lưu nguyên cả cái hash làm index thì bạn lấy 32 kí tự đầu chẳng hạn. Thì cả 2 string sẽ có cùng index là `bb4367f35e06e4da1684f089442ecc93` dù chẳng liên quan gì đến nhau. Tất nhiên làm thế này thì sẽ có trường hợp false positive, nên bạn có thể filter lại từ kết quả của query. Nhưng nếu nhiều false positive quá thì index lại chẳng còn ý nghĩa lắm. Vậy nên phải tính sao cho cái index này phù hợp. Chọn index string càng ngắn thì tỉ lệ trùng nhau càng cao, mà chọn dài quá thì lại vô dụng vì hầu như chả có cái nào trùng nhau. Bạn có thể tham khảo cách tính toán sao cho phù hợp ở [đây](https://ciphersweet.paragonie.com/security#blind-index-information-leaks).

Như thế thì mỗi giá trị trong index sẽ không phải là duy nhất cho mỗi string nữa, nên không thể từ giá trị trong index giống nhau mà kết luận là dữ liệu giống nhau nữa. Kiểu cấu trúc dữ liệu này gọi là [Bloom filter](https://en.wikipedia.org/wiki/Bloom_filter) nếu bạn muốn tìm hiểu.

## Fuzzy search

Với cách vừa rồi thì bạn cũng thấy là mình chỉ search được kết quả chính xác, còn search kiểu `LIKE` thì hoàn toàn không được. Tuy nhiên chúng ta vẫn có thể phần nào search được hơi fuzzy 1 tí bằng cách transform dữ liệu thành 1 dạng khác có thể fuzzy search được trước khi tạo index. Khi search thì lại transform nó thành dạng giống như lúc index để search.

Ví dụ bạn cần search tiếng Việt không dấu chẳng hạn, thì bạn có thể transform text thành tiếng Việt không dấu trước khi tạo index. Hay khi index số điện thoại thì chỉ index mấy số cuối thôi chẳng hạn. Đây là code ví dụ index cho tiếng Việt.

{@embed: https://jsfiddle.net/thphuong/tvufbeq6}

Như bạn thấy thì mình chuyển string thành tiếng Việt không dấu và bỏ luôn khoảng trống, kết quả là các string đều có index giống nhau. Cách này thì kết quả query sẽ có các trường hợp false positive. Ví dụ tìm *mèo* thì kết quả sẽ bao gồm cả *mèo* và *méo*. Bạn vẫn có thể filter kết quả chính xác nếu muốn sau khi đã query.

Tùy trường hợp mà cách này cũng có thể giảm bớt một chút mức độ rò rỉ thông tin, vì bây giờ các dữ liệu khác nhau, có thể không liên quan đến nhau lắm vẫn có thể có index giống nhau.

Nếu muốn search theo nhiều cách khác nữa thí bạn có thể tạo thêm vài cái index nữa và transform theo cách bạn muốn.

Nếu muốn thực sự search được kiểu `LIKE` query thì bạn có thể thử tạo 1 cái index khổng lồ bằng [n-gram](https://scoutapm.com/blog/how-to-make-text-searches-in-postgresql-faster-with-trigram-similarity). Sẽ khá là phức tạp cả về cách thực hiện lẫn cách lưu trữ. Tất nhiên là cũng cần cân nhắc về việc index sẽ để lộ thông tin nữa.

## Existing Libraries

Nếu bạn muốn ecnrypt và index database theo cách trên thì có sẵn vài thư viện để bạn dùng luôn nhé.

- PHP: [paragonie/ciphersweet](https://packagist.org/packages/paragonie/ciphersweet)
- Laravel: [paragonie/eloquent-ciphersweet](https://packagist.org/packages/paragonie/eloquent-ciphersweet)
- NodeJS: [ciphersweet-js](https://npm.im/ciphersweet-js)
- Rails: [attr_encrypted](https://github.com/attr-encrypted/attr_encrypted) + [blind_index](https://github.com/ankane/blind_index)