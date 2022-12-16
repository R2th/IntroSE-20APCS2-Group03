# Lời mở đầu
Ở bài viết trước đây, mình đã giới thiệu về  cách setup elasticsearch, java và sử dụng searchkick để query record các bạn có thể  đọc ở link sau
https://viblo.asia/p/elasticsearch-ket-hop-voi-searchkick-vyDZOPdxlwj
bài viết này mình sẽ đề cập đến query elasticsearch script. 
Tại sao phải sử dụng query script? bởi vì khi mà không thể sử dụng DSL query thì nên sử dụng query script, nó sẽ dễ dàng hơn.
chú ý query script sử dụng java code. muốn viết nó các bạn cần biết chút về java code nhé.
# 1. Elasticsearch script query
Cú pháp
```
must: {
	script: {
		script: {
			source: "doc['name_field_mapping'].value > 1",
			lang: :painless
		}
	}
}
```
Ở đây mình đưa script vào trong `must` nếu các bạn sử dụng có thể đưa vào trong `should, filter`... tùy bài toán yêu cầu. bên trong `source` là java code và đó là một đoạn code so sách  trả về true thì bản ghi sẽ được lấy ra và ngược lại, ngoài cách viết `source` như trên các bạn có thể viết source như sau `source: return "doc['num1'].value > 1;"` hoặc `if(doc['num1'].value > 1) return true;` các bạn nhớ phải có chấm phẩu ở cuối lệnh vì chúng ta đang viết java code. doc là viết tắt của document, chắc các bạn đã biết mỗi một model cúng ta sẽ chuyển thành một document, **chú ý**: sử dụng `.value` để lấy ra giá trị field của bản ghi hiện tại
# 2. Elasticsearch script sort
```
sort: {
	_script: {
		script:{
			lang: :painless,
			inline: "doc['revisions'] === null ? doc['title'].raw.value : doc['revisions.title'].raw.value"
		},
		type: :string,
		order: :asc
	}
}
```
Ở đây chúng ta sẽ viết sciprt trong `sort` và tương tự như script query thì script sort viết java code trong `inline`. nhưng có một điều khác trong sort sciprt là chúng ta sẽ trả về  giá trị bên trong inline để có thể sort được. có vẻ mình nói hơi khó hiểu đúng không, mình sẽ ví dụ như sau:
bản ghi 1 chúng ta sẽ viết `inline: "return 'a'"`
bản ghi 2 chúng ta sẽ viết `inline: "return 'c'"`
bản ghi 3 chúng ta sẽ viết `inline: "return 'b'"`
và `type: :string` `order: :asc`
cuối tùng ta sẽ có được thứ tự bản ghi như sau 1,  3,  2 bây giờ thì các bạn hiểu rõ rồi chứ.
đó là mình đang hướng dẫn sort với giá trị trả về string, nếu các bạn muốn sort theo số thì các bạn trả về trong inline là số và `type: :string`
# 3 ví dụ
Mình có một ví dụ nhỏ như sau: cần sắp xếp thứ tự của sản phẩm, sản phẩm có giá từ 1 - 5 đứng cuối, sản phẩm từ 5 - 10 đứng thứ nhất, sản phẩm từ 10 - 15 đứng thứ 2.
ở đây mình sẽ sử dụng sort script nhé.
```
{
    query: {
            match_all: {}
    },
    sort: {
        _script: {
            script:{
                lang: :painless,
                inline: "
                    if (doc['price'].value > 5 && doc['price'].value <= 10)
                        return 1;
                    elseif (doc['price'].value > 10 && doc['price'].value <= 15)
                        return 2;
                    elseif (doc['price'].value > 1 && doc['price'].value <= 5)
                        return 3;
                    else 
                        return 4;
                "
            },
            type: :int,
            order: :asc
        }
    }
    
}
```
đó mình đã trả về 1 ,2 ,3,4 cho từng mốc giá của bản ghi sau đó sắp xếp nó theo script sort.
# Tổng kết
Trên đây mình đã giới thiệu cho các bạn biết về Elasticsearch script query và Elasticsearch script sort và mình xin hết bài viết ở đây.
các bạn có thể tham khảo painless language ở đây nhé: https://www.elastic.co/guide/en/elasticsearch/reference/master/modules-scripting-painless.html