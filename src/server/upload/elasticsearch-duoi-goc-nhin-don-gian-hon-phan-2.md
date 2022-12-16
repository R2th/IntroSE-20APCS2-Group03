Tiếp nối phần trước, phần này mình sẽ xây dựng 1 Demo nho nhỏ sử dụng Rails thuần kết hợp với gem Searckick để Implement Elasticsearch nha ^^
Để các bạn có 1 cái nhìn trực quan hơn khi sử dụng Elasticsearch mình xây dựng 1 Database nho nhỏ. Bài toán cụ thể như sau:

**"Tìm kiếm danh sách cầu thủ bóng đá theo các thông tin cơ bản như tên, tên đầy đủ, ngày tháng năm sinh, chiều cao, cân năng, quốc tịch, châu lục và các câu lạc bộ đã thi đấu"**

OK, giờ chúng ta đi nàooo !!!

## I. Cài cắm 1 số thứ

### 1.1 Cài Elasticsearch
- Để sử dụng được Elasticsearch trước hết chúng ta cần cài cắm 1 chút, hiểu đơn giản thì ES là 1 tool, muốn dùng thì phải cài nó :v 
- Cài cắm ES khá đơn giản và có nhiều cách, cụ thể các bạn có thể tự tìm kiếm trên Google nhé. Để chắc chắn mình đã cài thành công thì các bạn mở cổng http://localhost:9200/ trên trình duyệt, nếu có response trả về kiểu kiểu như thế này là oke rồi đó

```
{
    name: "",
    cluster_name: "elasticsearch",
    cluster_uuid: "",
    version: {
    number: "6.2.0",
    build_hash: "",
    build_date: "2018",
    build_snapshot: ,
    lucene_version: "7.2.1",
    minimum_wire_compatibility_version: "5.6.0",
    minimum_index_compatibility_version: "5.0.0"
    },
    tagline: "You Know, for Search"
}
```
 
 **Tip 1**: Chú ý phiên bản ES khi cài, vì Syntax các version có thể khác nhau 1 vài chỗ dẫn đến những lỗi syntax k mong muốn (kiểu như 1 máy ver 2.x.x và 1 máy ver 6.x.x là không ổn)
**Tip 2**: Khi muốn thay đổi cài đặt ES cần restart hoặc stop/start server ES bằng command
```
sudo service elasticsearch start
#tương tự với: stop và restart
```

### 1.2 Cài Plugin Elasticsearch
- Muốn sử dụng 1 số tính năng đặc biệt của Elasticsearch chúng ta cần cài cắm các Plugin nhất định,
ví dụ: muốn search file PDF, .DOCX ... thì cần cài [Ingest Attachment Processor Plugin](https://www.elastic.co/guide/en/elasticsearch/plugins/master/ingest-attachment.html#ingest-attachment) 
- Trong Demo này, ví dụ mình muốn search bằng Tiếng Việt, kiểu search tên có dấu của Đặng Văn Lâm (tuyển Việt Nam) chẳng hạn =)) thì cần cài Plugin hỗ trợ  phân tích ngôn ngữ tiếng Việt [Analysis Vietnamese Plugin](https://github.com/duydo/elasticsearch-analysis-vietnamese) vì mặc định ES sẽ là tiếng Anh rồi :D

**Tip 1**: Chú ý khi cài đặt Plugin cần `cd` vào thư muc cài đặt ES, thường sẽ như sau: `/usr/share/elasticsearch`

### 1.3 Cài Searchkick
- Ngay từ đầu Series này mình tập trung vào sử dụng Gem `Searchkick` để Implement Elasticsearch trên Rails, nên cách cài đặt cũng sẽ như các Gem khác: nhét vào `Gemfile` rồi `bundle` thôi 
```
gem "searchkick"
```

Thế là tạm ổn về vụ cài cắm ES, giờ chúng ta sẽ đi vào triển khai ES qua từng bước Đánh Index -> Push Data lên Server ES -> Query trên ES 

## II. Xây dựng Mapping (Đánh Index)
Như mình đã nói ở phần trước thì đây là phần quan trọng nhất khi triển khai ES vì nó quyết định cách mình xây dựng *"mục lục"* cho tìm kiếm, đòi hỏi chúng ta cần phân tích bài toán đang gặp phải để thiết kế Mapping cho hợp lý nhất.
Trong bài toán cụ thể ở Demo này thì mục đích chính của chúng ta là search các Player theo các điều kiện nhất định. Tạm thời, phần này mình thiết kế giao diện Search với các điều kiện search như hình

![](https://images.viblo.asia/4da81f29-d0cb-43f9-a42b-9a0daac0d8e0.png)

Để thiết kế Mapping cho hợp lý thì bên cạnh các điều kiện mà bài toán yêu cầu (Search theo trường nào, filter theo cái gì ...) chúng ta cần nắm rõ các mối quan hệ trong DB. Mình sẽ nói 1 chút về DB của mình nhé =))
DB này mình cố gắng xây dựng gần với thực tế nhất để các bạn dễ hình dung nhất có thể (lol)

```
1 cầu thủ sẽ có các thông tin cơ bản như sau: tên, tên đầy đủ, chiều cao, cân nặng, quốc tịch, vị trí ...
1 cầu thủ chỉ có 1 quốc tịch
1 quốc gia thuộc về 1 châu lục
1 cầu thủ có thể thi đấu cho nhiều CLB trong nhiều giai đoạn khác nhau
...
```

Sau khi, đã xác định được rõ ràng Business Model chúng ta sẽ define trong Model Player như sau (Search cái gì thì define Mapping trong Model đó), Searchkick cũng hỗ trợ chúng ta trong việc xây dựng Mapping, như sau:

```Ruby
  def search_data
    {
      name: name,
      full_name: full_name,
      dob: dob,
      height: height,
      weight: weight,
      clubs: clubs.pluck(:name),
      nation: nation.name,
      continent: nation.continent,
      position: position,
      club_ids: clubs.pluck(:id),
      nation_id: nation.id,
      position_id: Player.positions[position],
      continent_id: continent_id,
    }
  end
```

Như giao diện phía trên mình sẽ search theo name, full_name của Player trong ô Free Text Search. Có Filter theo Clubs, Nation, Continent và Positions. Ngoài ra có search theo min max Height, Weight và Age Player
Do đó chúng ta sẽ Define Mapping đầy đủ như hình, các field k dùng để Search như Information, Created_at hay Updated_at k cần dùng do đó mình sẽ k define trong Mapping

**Tip 1**: trong quá trình xây dựng Mapping chúng ta có thể gọi các method trong các bảng Relation của Player (hiểu đơn giản thì đây chính là quá trình `join` các bảng khi query SQL bình thường).

**Tip 2**: trong Model Player k có cột `continent_id`, vậy `continent_id`. Thực tế mình có define 1 method `continent_id` ở bên dưới như sau. Để xem chi tiết hơn các bạn xem trong Source Code nha :D
```Ruby
  def continent_id
    Nation.continents[nation.continent]
  end
```

## III. Push Data to Server ES

Sau khi đánh Index chúng ta push dữ liệu lên Server ES đơn giản như sau (vì Searchkick đã define sẵn việc này cho chúng ta rồi)
```
Player.reindex
```

Để xóa hết dữ liệu sau khi đánh Index chúng ta làm như sau
```
Player.searchkick_index.delete
```

Để xem thành quả các bạn truy cập vào localhost9200 với Url như sau:
```
http://localhost:9200/_all/_mapping
```

**Tip 1**: Sau khi đánh index thì mỗi một Mapping cho 1 Model sẽ được hiểu là 1 Database tách biệt, thay vì chỉ là 1 Table như trong Database thuần túy :D

## Source Code 
https://github.com/thanhtt/elasticsearch-demo

Phần tới mình sẽ nói về các Query trong ES để get dữ liệu về, các bạn có thể tham khảo Source Code trước nha ^^