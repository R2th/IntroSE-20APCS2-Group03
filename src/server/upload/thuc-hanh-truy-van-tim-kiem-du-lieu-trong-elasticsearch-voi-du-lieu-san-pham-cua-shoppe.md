## I. Mở Đầu:
Hello mọi người, như mọi người đã biết thì Elasticsearch là một engine mạnh mẽ phục vụ cho việc tìm kiếm dữ liệu thông minh hơn, đáp ứng về mặt tốc độ gần như là Realtime và khả năng phân tán dữ liệu rất tốt của nó. Có rất nhiều bài viết đi từ tổng quan đến chi tiết về Elasticsearch trên Viblo rồi nên mọi người tìm kiếm để tìm hiểu và cài đặt nhé, hôm nay mình sẽ thực hành một số truy vấn cần thiết nhất phục vụ cho việc xây dựng chức năng tìm kiếm hiệu quả hơn trong dự án hay ứng dụng của bạn nhé. (love)

![](https://images.viblo.asia/46a7ae8b-af57-4bbf-becb-e1bc1aa187a0.jpg)

## II. Chuẩn bị dữ liệu:
- Mình có chuẩn bị một cơ sở dữ liệu gồm 3500 sản phẩm thời trang của shoppe gồm các trường (tên, mô tả, giá, danh mục, chất liệu). Mình sẽ dùng cơ sở dữ liệu này mapping sang Elasticsearch với tên index là **shoppe** và  type index là **product**.
- Đây là dữ liệu mình chuẩn bị cho mọi người thực hành với ElasticSearch, sau khi cài đặt thành công Elasticsearch, mọi người sẽ thao tác thông qua port 9200 bằng RESTful API, mình sẽ sử dụng [Post Man](https://www.postman.com/downloads/)  để gửi các request lên Elasticsearch nhé.
* Đầu tiên tiến hành tạo index tên shoppe:
  
    `
    PUT http://localhost:9200/shoppe
    `

* TIến hành lưu trữ và đánh index dữ liệu: 

    `
    POST http://localhost:9200/shoppe/product/_bulk
    `
  
```
{"index":{"_id":1}}
{"name":"lh07 váy body hai dây rút bên đùi","description":" chất thun cotton co giãn  freesize 52 kg tương ứng chiều cao 1m60 đổ lại vòng ngực 80 90cm vòng eo 62 72cm vòng mông 80 95cm đầm dài 85cm 1m55 mặc ngang gối màu đen như hình các bạn mập hay ốm hơn vui lòng nhắn tin để shop tư vấn trực tiếp nhé đầm damnu váy vaynu damombody vayombody thoitrangnu đầmthun váythun chuyensi giare lynashouse","price":49000,"branch":"danh mục thời trang nữ đầm đầm dáng ôm","make_by":"chất liệu thun"}
{"index":{"_id":2}}
{"name":"đầm body khoét vai","description":"fan cuồng đầm body có dịp tậu thêm siêu phẩm musthave roài kiểu khoét vai vừa lạ vừa xinh  màu đen tôn da lại che khuyết điểm nữa đầm body khoét vai sexy sỉ 110k sỉ sll ib giá tốt chất thun co giãn","price":150000,"branch":"danh mục thời trang nữ đầm đầm dáng suông","make_by":"Vải tự chọn"}
{"index":{"_id":3}}
{"name":"váy len tăm đen","description":"váy len tăm đen cực dễ mặc nha các chế dưới 65kg diện vô tư mặc đi làm đi chơi ok hết luôn d d đặt hàng ngay chứ em này bay nhanh lắm đó","price":130000,"branch":"danh mục thời trang nữ đầm đầm dáng ôm","make_by":"chất liệu len"}
{"index":{"_id":4}}
{"name":"đầm phối lưới tay dài","description":"đầm phối lưới tay dài hàng đẹp giá rẻ nhé chị em  giá 65000 đặt hàng nhấn mua ngay nhé","price":65000,"branch":"danh mục thời trang nữ đầm đầm dáng xòe","make_by":"chất liệu vật liệu khác"}
{"index":{"_id":5}}
{"name":"váy thô kẻ xanh","description":" sự kết hợp hoàn hảo của nét nữ tính và vẻ năng động  không kén dáng chẳng kén da xứng đáng là items mà cô gái nào cũng nên sở hữu  chẳng phải đau đầu nghĩ chiêu mix match quất lẹ em ý với 1 đôi giày bất kỳ trong tủ đồ là có ngay 1 set đẹp nguyên cành rồi chọn cùng aran em váy hot hit lắm lắm này nhaaa add aran store 140 trần tử bình cầu giấy  hà nội","price":380000,"branch":"danh mục thời trang nữ đầm đầm dáng ôm","make_by":"chất liệu thun"}
{"index":{"_id":6}}
{"name":"váy kẻ caro cổ vuông tay ngắn eo thắt nơ","description":"c9 hè gần đến rồi mua sắm gì đây những chuyến du lịch hè là cơ hội để các cô nàng ưa thích thời trang khoe được gu thời trang của mình qua các bức hình trên facebook instagram nếu đang băn khoăn không biết đâu là bộ đồ thích hợp cho bạn vào mùa hè thì đến ngay socshop để hốt ngay những set đồ hè ưng ý cho bạn các bức ảnh selfie thêm lôi cuốn nhé nhanh tay inbox cho shop để nhận được mã giảm giá cho những sản phẩm mới thông tin sản phẩm váy caro buộc nơ eo cổ vuông 2 màu xanh vàng đủ size s m l xl s dài váy 107 vai 36 ngực 90 dài tay 21 m dài váy 108 vai 37 ngực 94 dài tay 22 l dài váy 109 vai 38 ngực 98 dài tay 23 xl dài váy 110 vai 39 ngực 102 dài tay 24 cam kết của shop mình  hoàn phí 100 nếu bị sai mẫu mã  giá cả cạnh tranh sản phẩm chất lượng  chất lượng phục vụ sẽ làm bạn hài lòng  hotline 0378563197 0966573529  adress ngọc mỹ quốc oai hà nội váy2dâykẻ váy2dâykẻcaro váykẻ váykẻ2dây váykẻ2019 váykẻa váykẻbody váykẻcaro váykẻcarodángsuông váykẻcarođẹp váykẻcarođỏ váykẻcaroxanh váykẻcaroxanh váykẻdàitay váykẻdángchữa maiaries 0378563197 váykẻdángdài","price":250000,"branch":"danh mục thời trang nữ đầm đầm dáng xòe","make_by":"Vải tự chọn"}
{"index":{"_id":7}}
{"name":"váy babydoll hoa nhí","description":"váy babydoll hoa nhí về nhiều màu cực xinh anyboutique tpninhbinh thoitrangnu donuninhbinh any boutique địa chỉ số 54 hải thượng lãn ông p phúc thành tp ninh bình zalo 0339319201 hanuclothes1","price":160000,"branch":"danh mục thời trang nữ đầm đầm dáng xòe","make_by":"chất liệu vật liệu khác"}
{"index":{"_id":8}}
{"name":" hsk váy suông vải lụa pha ren","description":"giá 250k thanh xuân tan nhanh như mây nên còn trẻ nhất định phải ăn diện các nàng nhé nàng đẹp dịu dàng như làn mây cùng hoạ tiết vạn người mê ngày mai cập bến shop sll khách nhé nhẹ nhàng tinh tế với thiết kế nổi bật khoe đôi vai trần gợi cảm phối chân ren quyến rũ chất vải lụa hàng dư xịn mềm mại nhẹ tênh k hề gây cảm giác bí bách khó chịu mỗi độ hè tới e này đi chơi dạo phố hay đi biển cứ gọi là đẹp lịm tim lun nha hàng lên đủ sz s m l cho mom 40 60kg nha","price":199000,"branch":"danh mục thời trang nữ đầm đầm dáng suông","make_by":"chất liệu lụa pha ren"}
```

Dữ liệu đầy đủ các bạn tải trong [link này](https://notepad.vn/share/rREnWaC43) để đánh index nhé. 
Sau khi đánh index thành công thử xem cấu trúc của một document như thế nào nhé:
![](https://images.viblo.asia/6989197c-d517-4119-aa32-b0dde8c272ed.jpg)

## III. Một số truy vấn trong ElasticSearch:
Sau khi đánh index dữ liệu xong mình practice luôn nhé :

**1. Tìm kiếm sản phẩm có tên chứa các từ "váy hồng có chấm bi" :**

```
{
    "query": {
        "match": {
            "name": "váy hồng có chấm bi :))"
        }
    }
}
```

* Kết quả:

```
{
        "hits": [
            {
                "_index": "shoppe",
                "_type": "product",
                "_id": "1917",
                "_score": 18.90285,
                "_source": {
                    "id": 1917,
                    "name": "váy hồng chấm bi thanh lịch",
                    "description": "  quan niệm thông thường của chị em hay cho rằng bầu bí là khoảng thời gian phải chấp nhận hi sinh nhan sắc vì cơ thể không ngừng tăng cân các đường cong mất dần da thâm đen sạm nám tóc có phần xơ xác hơn mặt mũi nhiều khi cũng phá nétvv tuy nhiên giữ ngoại hình xinh xắn gọn gàng khi mang bầu thật ra không hề khó cũng không quá tốn kém và cầu kỳ hiểu được tâm lý của các mẹ annhi shop đã cho ra mắt các mẫu váy bầu mới nhất hót nhất thị trường với nhiều kiểu dáng sang trọng phù hợp đi làm đi chơi đi dự tiệc đặt biệt các mẫu váy của an nhi đều thiết kế hiện đại sau sinh các mẹ vẫn có thể mặc được là phụ nữ phải luôn xinh đẹp kể cả lúc mang bầu phụ nữ hạnh phúc nhất là khi mang bầu thì con chần chừ gì nữa mà chúng ta lại không tìm cho mình những bộ váy bầu thật đáng yêu thật phong cách để ghi lại nhưng khoảng khắc hạnh phúc nhất của cuộc đời mình đến với annhi shop các mẹ yên tâm về chất lượng shop luôn cam kết chất liệu hình ảnh màu sắc y hình khách hàng được kiểm tra hàng trước khi nhận được đổi trả linh hoạt nếu ko vừa size váy hồng chấm bi chất liệu voan lụa hai lớp mềm mát màu sắc hồng trẻ trung  nhã nhặn lịch sự độ dài qua gối khách hàng đặt mua ghi chú giúp shop màu chiều cao cân nặng tháng bầu để shop lựa size  size m cân nặng từ 42 đến 55kg  size l cân nặng từ 53 đến 62kg  size xl cân nặng từ 60 đến 70kg  size xxl phù hợp cân nặng 68 đến 80kg hoặc lh 0984988070 để được tư vấn thêm về sp vaybau váy bầu thu đông đầm bầu mang thai thai nghén quần tất bầu quần legging bầu vaybau váy bầu thu đông đầm bầu mang thai thai nghén quần tất bầu quần legging bầu vaybaudong vaybaudep vaybaucongso me bé vaybausuong vaybaudam",
                    "price": 250000,
                    "branch": "danh mục thời trang nữ thời trang bầu và sau sinh váy bầu",
                    "make_by": "Vải tự chọn",
                    "created_at": null,
                    "updated_at": null
                }
            },
            {
                "_index": "shoppe",
                "_type": "product",
                "_id": "2114",
                "_score": 18.90285,
                "_source": {
                    "id": 2114,
                    "name": "váy hồng chấm bi thanh lịch",
                    "description": "  quan niệm thông thường của chị em hay cho rằng bầu bí là khoảng thời gian phải chấp nhận hi sinh nhan sắc vì cơ thể không ngừng tăng cân các đường cong mất dần da thâm đen sạm nám tóc có phần xơ xác hơn mặt mũi nhiều khi cũng phá nétvv tuy nhiên giữ ngoại hình xinh xắn gọn gàng khi mang bầu thật ra không hề khó cũng không quá tốn kém và cầu kỳ hiểu được tâm lý của các mẹ annhi shop đã cho ra mắt các mẫu váy bầu mới nhất hót nhất thị trường với nhiều kiểu dáng sang trọng phù hợp đi làm đi chơi đi dự tiệc đặt biệt các mẫu váy của an nhi đều thiết kế hiện đại sau sinh các mẹ vẫn có thể mặc được là phụ nữ phải luôn xinh đẹp kể cả lúc mang bầu phụ nữ hạnh phúc nhất là khi mang bầu thì con chần chừ gì nữa mà chúng ta lại không tìm cho mình những bộ váy bầu thật đáng yêu thật phong cách để ghi lại nhưng khoảng khắc hạnh phúc nhất của cuộc đời mình đến với annhi shop các mẹ yên tâm về chất lượng shop luôn cam kết chất liệu hình ảnh màu sắc y hình khách hàng được kiểm tra hàng trước khi nhận được đổi trả linh hoạt nếu ko vừa size váy hồng chấm bi chất liệu voan lụa hai lớp mềm mát màu sắc hồng trẻ trung  nhã nhặn lịch sự độ dài qua gối khách hàng đặt mua ghi chú giúp shop màu chiều cao cân nặng tháng bầu để shop lựa size  size m cân nặng từ 42 đến 55kg  size l cân nặng từ 53 đến 62kg  size xl cân nặng từ 60 đến 70kg  size xxl phù hợp cân nặng 68 đến 80kg hoặc lh 0984988070 để được tư vấn thêm về sp vaybau váy bầu thu đông đầm bầu mang thai thai nghén quần tất bầu quần legging bầu vaybau váy bầu thu đông đầm bầu mang thai thai nghén quần tất bầu quần legging bầu vaybaudong vaybaudep vaybaucongso me bé vaybausuong vaybaudam",
                    "price": 250000,
                    "branch": "danh mục thời trang nữ thời trang bầu và sau sinh váy bầu",
                    "make_by": "Vải tự chọn",
                    "created_at": null,
                    "updated_at": null
                }
            },
           ..... còn tiếp....
```

**2. Tìm kiếm sản phẩm có tên chứa các từ "váy hồng có chấm bi" trên cả trường name và description lấy 5 kết quả đầu tiên từ offset 0:**

```
{
   "query": {
      "multi_match": {
         "query": "váy hồng chấm bi",
         "fields": ["name", "description"]
      }
   },
   "size": 5,
   "from": 0
}
```

* Kết quả:
```
{
        "hits": [
            {
                "_index": "shoppe",
                "_type": "product",
                "_id": "1917",
                "_score": 18.90285,
                "_source": {
                    "id": 1917,
                    "name": "váy hồng chấm bi thanh lịch",
                    "description": "  quan niệm thông thường của chị em hay cho rằng bầu bí là khoảng thời gian phải chấp nhận hi sinh nhan sắc vì cơ thể không ngừng tăng cân các đường cong mất dần da thâm đen sạm nám tóc có phần xơ xác hơn mặt mũi nhiều khi cũng phá nétvv tuy nhiên giữ ngoại hình xinh xắn gọn gàng khi mang bầu thật ra không hề khó cũng không quá tốn kém và cầu kỳ hiểu được tâm lý của các mẹ annhi shop đã cho ra mắt các mẫu váy bầu mới nhất hót nhất thị trường với nhiều kiểu dáng sang trọng phù hợp đi làm đi chơi đi dự tiệc đặt biệt các mẫu váy của an nhi đều thiết kế hiện đại sau sinh các mẹ vẫn có thể mặc được là phụ nữ phải luôn xinh đẹp kể cả lúc mang bầu phụ nữ hạnh phúc nhất là khi mang bầu thì con chần chừ gì nữa mà chúng ta lại không tìm cho mình những bộ váy bầu thật đáng yêu thật phong cách để ghi lại nhưng khoảng khắc hạnh phúc nhất của cuộc đời mình đến với annhi shop các mẹ yên tâm về chất lượng shop luôn cam kết chất liệu hình ảnh màu sắc y hình khách hàng được kiểm tra hàng trước khi nhận được đổi trả linh hoạt nếu ko vừa size váy hồng chấm bi chất liệu voan lụa hai lớp mềm mát màu sắc hồng trẻ trung  nhã nhặn lịch sự độ dài qua gối khách hàng đặt mua ghi chú giúp shop màu chiều cao cân nặng tháng bầu để shop lựa size  size m cân nặng từ 42 đến 55kg  size l cân nặng từ 53 đến 62kg  size xl cân nặng từ 60 đến 70kg  size xxl phù hợp cân nặng 68 đến 80kg hoặc lh 0984988070 để được tư vấn thêm về sp vaybau váy bầu thu đông đầm bầu mang thai thai nghén quần tất bầu quần legging bầu vaybau váy bầu thu đông đầm bầu mang thai thai nghén quần tất bầu quần legging bầu vaybaudong vaybaudep vaybaucongso me bé vaybausuong vaybaudam",
                    "price": 250000,
                    "branch": "danh mục thời trang nữ thời trang bầu và sau sinh váy bầu",
                    "make_by": "Vải tự chọn",
                    "created_at": null,
                    "updated_at": null
                }
            },
            {
                "_index": "shoppe",
                "_type": "product",
                "_id": "2114",
                "_score": 18.90285,
                "_source": {
                    "id": 2114,
                    "name": "váy hồng chấm bi thanh lịch",
                    "description": "  quan niệm thông thường của chị em hay cho rằng bầu bí là khoảng thời gian phải chấp nhận hi sinh nhan sắc vì cơ thể không ngừng tăng cân các đường cong mất dần da thâm đen sạm nám tóc có phần xơ xác hơn mặt mũi nhiều khi cũng phá nétvv tuy nhiên giữ ngoại hình xinh xắn gọn gàng khi mang bầu thật ra không hề khó cũng không quá tốn kém và cầu kỳ hiểu được tâm lý của các mẹ annhi shop đã cho ra mắt các mẫu váy bầu mới nhất hót nhất thị trường với nhiều kiểu dáng sang trọng phù hợp đi làm đi chơi đi dự tiệc đặt biệt các mẫu váy của an nhi đều thiết kế hiện đại sau sinh các mẹ vẫn có thể mặc được là phụ nữ phải luôn xinh đẹp kể cả lúc mang bầu phụ nữ hạnh phúc nhất là khi mang bầu thì con chần chừ gì nữa mà chúng ta lại không tìm cho mình những bộ váy bầu thật đáng yêu thật phong cách để ghi lại nhưng khoảng khắc hạnh phúc nhất của cuộc đời mình đến với annhi shop các mẹ yên tâm về chất lượng shop luôn cam kết chất liệu hình ảnh màu sắc y hình khách hàng được kiểm tra hàng trước khi nhận được đổi trả linh hoạt nếu ko vừa size váy hồng chấm bi chất liệu voan lụa hai lớp mềm mát màu sắc hồng trẻ trung  nhã nhặn lịch sự độ dài qua gối khách hàng đặt mua ghi chú giúp shop màu chiều cao cân nặng tháng bầu để shop lựa size  size m cân nặng từ 42 đến 55kg  size l cân nặng từ 53 đến 62kg  size xl cân nặng từ 60 đến 70kg  size xxl phù hợp cân nặng 68 đến 80kg hoặc lh 0984988070 để được tư vấn thêm về sp vaybau váy bầu thu đông đầm bầu mang thai thai nghén quần tất bầu quần legging bầu vaybau váy bầu thu đông đầm bầu mang thai thai nghén quần tất bầu quần legging bầu vaybaudong vaybaudep vaybaucongso me bé vaybausuong vaybaudam",
                    "price": 250000,
                    "branch": "danh mục thời trang nữ thời trang bầu và sau sinh váy bầu",
                    "make_by": "Vải tự chọn",
                    "created_at": null,
                    "updated_at": null
                }
            }
            .... còn tiếp....
```

**3. Mùa đông đến rồi tìm sản phẩm hoặc chứa từ áo ấm hoặc áo len hoặc áo khoác và bắc buộc chứa từ Hàn Quốc và giành cho nam giới. **

Truy vấn bool chấp nhận một tham số must(tương đương AND), một tham số must_not (tương đương với NOT) và một tham số should (tương đương với OR). 

```
{
    "query": {
        "bool": {
            "should": [
                {"match": {"name": "áo ấm"}},
                {"match": {"name": "áo len"}},
                {"match": {"name": "áo khoác"}}
            ],
            "must": {"match": {"description": "Hàn Quốc" }},
            "filter": {
                "term": {"branch": "nam"}
            }
        }
    }
}
```

**Tương tự ta cũng có thể sử dụng query_string như sau:**

```
{
    "query": {
        "query_string": {
            "query": "(áo lạnh) OR (áo khoác) OR (áo ấm) AND (hàn quốc) AND (nam)"
        }
    }
}
```

* Kết quả:

```
 "hits": [
            {
                "_index": "shoppe",
                "_type": "product",
                "_id": "502",
                "_score": 13.420389,
                "_source": {
                    "id": 502,
                    "name": "áo len nam cổ lọ",
                    "description": "aolennam aolennam  áolennamđẹp  aolencolo  áolennamcổlo aolencolomautrang áo len nam cổ lọ đủ mẫu đủ size ae lựa chọn ạ bên m chuyên bán buôn lẻ áo len nam cổ lọ tim tròn len hàn quốc địa chỉ 211 khương trung",
                    "price": 108000,
                    "branch": "danh mục thời trang nam áo thun áo len",
                    "make_by": "chất liệu len",
                    "created_at": null,
                    "updated_at": null
                }
            },
            {
                "_index": "shoppe",
                "_type": "product",
                "_id": "841",
                "_score": 12.22987,
                "_source": {
                    "id": 841,
                    "name": " free ship 50k áo khoác nam lông cừu áo khoác lông cừu 2019 đẹp thời trang mới",
                    "description": "áo khoác nam lông cừu áo khoác lông cừu 2019 thời trang mới thông tin mô tả sp áo khoác nam lông cừu áo khoác nam lông cừu dày dặn ấm áp áo khoác vải kaki lót lông đến cổ áo tạo phong cách trang nhã lịch sự chất liệu kaki lông cừu size m l xl xxl xxl xxl kiểu dáng trẻ phong cách mới giới tính nam xuất sứ quảng châu hàng chất giá thật các bạn mua hàng nhớ sử dụng mữ ưu đãi để đc giảm giá ship và giá sp các bạn nhé cam kết hàng đẹp như trong hình kiểm tra hàng trước khi thanh toán đổi trả hàng hoàn lại tiền trong vòng 3 ngày kể từ ngày nhận hàng cho những lý do sau 1 hàng bị lỗi 2 hàng không giống hình mẫu 3 hàng khác size đặt mặc không vừa áo gió áo gió nam áo gió có mũ ylankafashion áo len nam áo len dài tay áo len cổ tròn áo len hàn quốc áo len trẻ trung áo len viet nam áo len mùa thu áo gió áo gió nam áo gió có mũ áo len nam áo len dài tay áo len cổ tròn áo len hàn quốc áo len trẻ trung áo len viet nam áo len mùa thu áo len nam áo len nam thời trang áo len nam cổ lọ áo len cổ tròn ái len cổ tim áo nhung quần bò",
                    "price": 541880,
                    "branch": "danh mục thời trang nam áo khoác áo vest áo khoác nỉ",
                    "make_by": "chất liệu kaki",
                    "created_at": null,
                    "updated_at": null
                }
            },
           .... còn tiếp ....
```

**4. Fuzzy Search (Tìm kiếm mờ) giải pháp khắc phục tìm kiếm sai chính tả, teen code :**

Tư tưởng là Elasticsearch sẽ sử dụng một độ đo khoảng cách gọi là khoảng cách Levenshtein.
Khoảng cách Levenshtein giữa từ S1 và từ S2 là số bước ít nhất biến từ S1 thành từ S2 thông qua 3 phép biến đổi là:
xoá 1 ký tự.
thêm 1 ký tự.
thay ký tự này bằng ký tự khác.
 Ví dụ:
 Khoảng cách Levenshtein giữa 2 chuỗi "Đời" và "đờj" là 1, vì phải dùng ít nhất 1 lần biến đổi.
 Khoảng cách Levenshtein giữa 2 chuỗi "thôi" và "thuj" là 2, vì phải dùng ít nhất 2 lần biến đổi.


Giả sử: khách hàng muốn tìm kiếm "Váy ngủ nữ tính" nhưng unikey bị lag :)) họ lại gõ "**vay ngu nữ tjnh**", chúng ta sẽ apply fuzzy search trong Elasticsearch như sau:

``
{
    "query": {
        "multi_match": {
            "query": "vay ngu nữ tjnh",
            "fields": ["name", "description"],
            "fuzziness": "AUTO"
        }
    }
}
``

* Kết quả:

```
"hits": [
            {
                "_index": "shoppe",
                "_type": "product",
                "_id": "1884",
                "_score": 14.561941,
                "_source": {
                    "id": 1884,
                    "name": "đồ bộ ngủ nữ ngủ gợi cảm",
                    "description": "quyến rũ lắm nhé sexy lắm nhé ôm eo tôn vòng 2 cực mê luôn  freesize cho các nàng 60kg mặc đều xinh  sản phẩm này chỉ một chiếc váy không bao gồm vớ găng tay quần lót  phương pháp giặt nên giặt dưới 40 độ không thể ủi ở nhiệt độ cao không tẩy trắng lưu ý sự khác biệt màu sắc có thể do các màn hình khác nhau gây ra do đó màu sắc của sản phẩm phải tuân theo sản phẩm thực tế và hình ảnh chỉ mang tính tham khảo váy ngủ nữ vay ngu nu váy ngủ sexy váy ngủ vay ngu đầm ngủ nữ dam ngu nu đầm ngủ sexy váy ngủ gợi cảm vay ngu goi cam sexy đồ ngủ dongu do ngu đồ ngủ nữ do ngu nu ao choang ngu đồ ngủ gợi cảm",
                    "price": 175000,
                    "branch": "danh mục thời trang nữ đồ lót đồ ngủ đồ mặc nhà đồ ngủ",
                    "make_by": "chất liệu thun",
                    "created_at": null,
                    "updated_at": null
                }
            },
            {
                "_index": "shoppe",
                "_type": "product",
                "_id": "1881",
                "_score": 13.926961,
                "_source": {
                    "id": 1881,
                    "name": "váy ngủ quyến rũ trong suốt",
                    "description": " chất liệu voan lưới mềm mượt thoải mái tận hưởng giấc ngủ thoải mái làm toát lên được nét sang trọng mà vô cùng tinh tế của người mặc  kiểu dáng được thiết kế giả yếm cột dây sau cổ kết hợp cùng ren ngực điệu đà mang phong cách tiểu thư  màu sắc tông hồng phối trắng xinh xắn trẻ trung  freesize vóc dáng dưới 60kg sản phẩm kèm quần chip dây váy ngủ nữ vay ngu nu váy ngủ sexy váy ngủ vay ngu đầm ngủ nữ dam ngu nu đầm ngủ sexy váy ngủ gợi cảm vay ngu goi cam sexy đồ ngủ dongu do ngu đồ ngủ nữ do ngu nu ao choang ngu đồ ngủ gợi cảm",
                    "price": 130000,
                    "branch": "danh mục thời trang nữ đồ lót đồ ngủ đồ mặc nhà đồ ngủ",
                    "make_by": "chất liệu voan lưới",
                    "created_at": null,
                    "updated_at": null
                }
            },
            ...còn tiếp...
```
 
**5. Highlight kết quả tìm kiếm:**
 
 ``
 {
    "query": {
        "multi_match": {
            "query": "áo dong pkục gja dình",
            "fields": ["name", "description"],
            "fuzziness": "AUTO"
        }
    },
    "highlight": {
        "fields": {
            "name": {},
            "description": {}
        }
    }
}
``

*Kết quả:

```
 "hits": [
            {
                "_index": "shoppe",
                "_type": "product",
                "_id": "204",
                "_score": 13.379673,
                "_source": {
                    "id": 204,
                    "name": "đồng phục gia đình áo thun gia đình hình in micky",
                    "description": "khách hàng lưu ý khi đặt ghi chú màu sắc giúp shop để được nhận đúng màu giá trên là giá 1 áo không phải giá cả set 3 4 áo đặt số lượng lớn trên 10 cái sẽ được giảm thêm giá bảng size ở ảnh cuối con từ 1 25kg chọn size 1 6 con từ 25 40kg size 7 10 xem bảng size rồi quy đổi ra số áo của bé ghi chú khi tạo đơn số đo chiều cao cân nặng của bé hoặc ib cho shop khách hàng đặt hàng vui lòng ghi chú chiều cao cân nặng của từng thành viên hàng việt nam xuất khẩu may tại xưởng nên chất lượng tốt mà giá cực kỳ rẻ shop chỉ bán hàng loại 1 chất lượng tốt không bán hàng loại 2 loại 3 kém chất lượng giá rẻ như 1 số shop khác chất lượng đảm bảo vải 100 cotton phù hợp với làn da trẻ nhỏ và thấm hút mồ hôi cực tốt chất liệu thun cotton 4 chiều giúp bé và bố mẹ thoải mái vận động hàng ngàn mẫu áo gia đình để phục vụ khách hàng và luôn cập nhật mẫu mới ngoài ra khách hàng hoàn toàn có thể in hình theo yêu cầu giá áo tự thiết kế bằng với giá áo có sẵn không mất phí thiết kế sử dụng công nghệ in hiện đại hình in không bị phai không bong tróc không bị dính khi giặt hàng có đủ size từ 5 kg đến 100kg và nhiều màu sắc để lựa chọn ngoài mẫu có sẵn bạn có thể gửi mẫu mình thích để gạo house thiết kế giúp bạn nha phí thiết kế miễn phí 100 sdt tư vấn gọi trực tiếp zalo viber 0886883555 hoặc qua địa chỉ 23 ngõ 97 16 khương trung thanh xuân hà nội để may đo trực tiếp thoitranggiadinh dongphucgiadinh aogiadinh setdogiadinh aothungiadinh aodoi aogiadinhgiare aogiadinhdep đồng phục gia đình áo gia đình áo thun gia đình đồ gia đình đi biển đồ gia đình thiết kế bodogiadinh gia dinh aogiadinhmuahe aogiadinhmuadong aogiadinhvnxk",
                    "price": 120000190000,
                    "branch": "danh mục thời trang nữ đồ đôi đồ gia đình",
                    "make_by": "chất liệu thun",
                    "created_at": null,
                    "updated_at": null
                },
                "highlight": {
                    "name": [
                        "đồng <em>phục</em> <em>gia</em> <em>đình</em> <em>áo</em> thun <em>gia</em> <em>đình</em> <em>hình</em> in micky"
                    ],
                    "description": [
                        "<em>gia</em> <em>đình</em> để <em>phục</em> vụ khách hàng và luôn cập nhật mẫu mới ngoài ra khách hàng hoàn toàn có thể in <em>hình</em>",
                        "theo yêu cầu giá <em>áo</em> tự thiết kế bằng với giá <em>áo</em> có sẵn không mất phí thiết kế sử <em>dụng</em> công nghệ in hiện",
                        "đại <em>hình</em> in không bị phai không <em>bong</em> tróc không bị <em>dính</em> khi giặt hàng có đủ size từ 5 kg đến 100kg và",
                        "thoitranggiadinh dongphucgiadinh aogiadinh setdogiadinh aothungiadinh aodoi aogiadinhgiare aogiadinhdep đồng <em>phục</em>",
                        "<em>gia</em> <em>đình</em> <em>áo</em> <em>gia</em> <em>đình</em> <em>áo</em> thun <em>gia</em> <em>đình</em> đồ <em>gia</em> <em>đình</em> đi biển đồ <em>gia</em> <em>đình</em> thiết kế bodogiadinh <em>gia</em> <em>dinh</em>"
                    ]
                }
            },
            ...còn tiếp...
```

## III. Ứng dụng Elasticsearch vào Laravel:
Mình sẽ sử dụng một package giúp làm việc với Elasticsearch dễ dàng hơn với Model trên Laravel đó là Elasticquent, mọi người có thể tham khảo cách cài đặt và sử dụng [tại đây.](https://github.com/elasticquent/Elasticquent)
Sau khi làm quen với Elasticsearch thì mình sẽ dựa trên các truy vấn cơ bản trên để xây dựng một công cụ search thú vị dựa vào các sản phẩm shoppe này, đây là đoạn query mà mình custom để đưa vào ứng dụng của mình để truy vấn, filter:
Mình sẽ tạo ra một model ShoppeProduct gồm các field: name, descripton, price, make_by, branch
```
       $stringSearch // nội dung string search
       $searchByField // Search trên những trường nào ví dụ ['name', 'description']
       $priceFilter // filter giá ví dụ ['gte' => 50000, 'lte' => 100000]
       
        $items = ShoppeProduct::complexSearch([
                'body' => [
                    'query' => [
                        "bool" => [
                            "must" => [
                                'multi_match' => [
                                    'query' => $stringSearch,
                                    'fields' => $searchByField,
                                    'fuzziness' => 'AUTO',
                                ]
                            ],
                            "filter" => [
                                "range" => [
                                    "price" => $priceFilter
                                ]
                            ]

                        ]

                    ],
                    'highlight' => [
                        'pre_tags' => ['<b> <font color="#3d70a7">'],
                        'post_tags' => ['</font> </b>'],
                        'fields' => [
                            'description' => new \stdClass(),
                            'name' => new \stdClass()
                        ],
                        'require_field_match' => true
                    ]
                ]]
        );
```

* Một số kết quả của ứng dụng:

![](https://images.viblo.asia/acba7174-3833-441c-8fe0-2ba7694faaf1.jpg)

![](https://images.viblo.asia/4ec19d72-91ac-431b-ab38-b1b485bfc7d2.jpg)

![](https://images.viblo.asia/5621d216-bc2a-4f2b-abb9-6509ed3c0034.jpg)



## IV. Kết luận:
Qua những câu truy vấn đơn giản như trên thì chúng ta có thể xây dựng được một search engine thông minh đáp ứng yêu cầu rồi. Tuy nhiên Elastic search còn cung cấp rất nhiều built in hay hơn nữa. Mọi người có thể tìm hiểu thêm để phục vụ cho mục đích của mình nhé.