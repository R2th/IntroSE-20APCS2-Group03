![](https://images.viblo.asia/c78bbe5f-4bac-407f-a499-57cb1119972d.png)

# Introduce
Cách mà google tìm kiếm từ câu truy vấn của người dùng, đó cũng là fulltext search, nhưng chắc rằng nó không đơn giản chỉ là fulltext search mà chắc phải có những sự tối ưu để đạt được tốc độ thần thánh như vậy (cái này thì mình chưa đủ trình độ để nhận biết được)

Ở đây, mình chỉ xin giới thiệu về fulltext trên engine mongodb.
MongoDB cho phép đánh index cho text để hỗ trợ việc query bằng string. text indexes có thể là string hoặc array string.
Collection (table đó) phải có text index. 1 collection chỉ có 1 text search index, nhưng trong nó có thể có nhiều trường, `indexes` chính là  ` nhiều trường` đó.

Ví dụ:

> db.stores.createIndex( { field_1: "text", field_2: "text" } )

Sau khi tạo indexes xong thì có thể chạy lệnh sau để tìm kiếm:

> db.stores.find( { $text: { $search: "keyword1 keyword2 keyword3" } } )


Mình có từng thấy qua câu hỏi:
# Like và Fulltext ?

[](https://images.viblo.asia/65b46785-b3fb-4418-ba3f-473098226d5a.png)
Về Like!
Chính xác thì Like chỉ trả về các kết quả có chứa keyword, phải chứa keyword thì mới trả về nhé.

Và nó còn là search theo từng field nữa, khai báo nhiều tốn công vãi, mà nhiều khi index còn không chạy đối với dạng `like '%abc'`. ( mặc dù với fulltext dể search thì còn phải tạo cả đống index và khai báo cũng tốn công hơn nhiều)

Nhưng lý do tại sao rất nhiều nơi vẫn dùng fulltext thay vì like ?

Mạo muội phát biểu like perfor cao hơn fulltext. Fulltext yêu cầu bộ nhớ lớn hơn nhiều cho việc đánh index, đến mức nhiều nhà cung cấp lưu trữ disable tính năng này hoặc bắt bạn trả phí để có thể sử dụng.
Nhưng, giá trị đem lại, benefit của fulltext lại khiến nó đc sử dụng nhiều hơn.

Như ví dụ bên trên nếu bạn muốn tìm kiếm `%abc` thì like không tận dụng đc index và sẽ chậm hơn, nhưng fulltext thì có bởi bản thân việc tìm kiếm bằng fulltext đã là %abc% rồi (cách đánh index kiểu nhà giàu `abcde` thì đánh đến vài cái index tùy theo config: abc, bcd, cde).
đây là cái khả năng break content của thằng fulltext. từ 1 cục data, theo config hoặc default settings nó sẽ break thành các từ theo `word_separators` hoặc theo độ rộng config (ví dụ là 3) thì nó tách content ra và đánh index và cả khi tìm kiếm để từ đó ta đưa ra được các gợi ý từ khi mà bạn nhập sai, nhập thiếu..

![](https://images.viblo.asia/abcd749d-4699-4fbb-bc2f-47a3d3843d61.jpg)

Tính năng "AI" của fulltext cũng đem lại lợi ích rất lớn khi nếu bạn tìm kiếm con chuột bằng tiếng anh -> bạn nhập mice
like sẽ không bao giờ trả về thằng mouse nào đâu. Nhưng fulltext thì có. Dựa vào thư viện stem sử dụng nó sẽ tìm ra các từ kiểu đồng nghĩa để tìm kiếm. mice -> mouse
hoặc computer, computing, computed. Bảo sao mà google nó đưa ra được kết quả gần giống với từ mình nhập vào.

![](https://images.viblo.asia/e71e9c87-5be4-49be-a78f-b4d370a767c5.jpg)

Rank, sắp tới đợt review rank rồi :( fulltext nó cũng đánh rank cho các kết quả trả về nữa. từ đó mà kết quả nào có điểm to rank cao mình đưa lên trên hiển thị để show cho người dùng, ấy thế mà mới có seo web tăng rank, để search engine của google nó tìm thấy nhiều kết quả trỏ về nó đánh rank web mình cao hơn.

![](https://images.viblo.asia/2e67dd51-a279-45b5-b4a5-fb1a9b98ed35.jpeg)


# Mongoid Search
Hỗ trợ Mongoid 3, 4, 5 và 6 và có performs tốt cho quy mô dữ liệu nhỏ. Nếu có khoảng > 1 triệu bản ghi thì nên xử dụng monogid_fulltext bên dưới hoặc tìm hiểu về ElasticSearch (hình như trên viblo đã có bài giới thiệu về nó), Solr hoặc Sphinx.
Nếu xông xênh thì các bạn có thể xài CloudSearch của Amazon, bọn này thì support sẵn các ngôn ngữ có chữ cái đặc thù, chứ mấy gem này chỉ default tiếng anh, còn sang ngôn ngữ khác thì config khá là rắc rối.

Đầu tiên là cài gem

> gem 'mongoid_search'

include và khai báo field muốn đánh index
> include Mongoid::Search
> search_in :symbol_name_field

Support cả search theo quan hệ và hash

```
  search_in name_association: :field_of_association, name_field_hash: %i[list_keys_of_hash_write_like_string_cách_nhau_bằng_dấu_cách]
```

Quan hệ:

> name_association: :symbol_name_field

Hash:

> name_field: %i[list keys of hash]

trong trường hợp 1 model mà bạn khai báo đến 2 index thì nên đặt tên cho nó, đừng xử dụng mặc định. Bằng cách sử dụng option `index` khi khai báo hoặc khi gọi method `full_text_search`

> search_in :unit, index: :_unit_keywords

hoặc

> Model.full_text_search("keyword", index: :_unit_keywords)

Lưu ý: nó chỉ tự đánh chỉ mục cho các bản ghi mới. Đối với các bản ghi cũ thì cần chạy lệnh update:
>  rake mongoid_search:index

Một số option khác của gem:

**match**: mặc định là `any` chỉ cần data trùng với 1 phần input thì correct,  `all` yêu cầu tất cả input đều phải có trong data thì mới correct.

**allow_empty_search**: default false trả về [] nếu input để tìm kiếm là `nil`. true thì nguợc lại, trả về `Model.all`.

**relevant_search**: default false, nếu true thì trong kết quả sẽ trả về số lượng từ mà data match với list từ input.

Bạn còn có thể tạo file initializer cho gem

tạo 1 file mongoid_search.rb trong thư mục `conffig/initializer`

```
Mongoid::Search.setup do |config|
  ##  như giải thích bên trên
  config.match = :any

  ##  như giải thích bên trên
  config.allow_empty_search = false

  ##  như giải thích bên trên
  config.relevant_search = false

  ## Stem keywords, AI hàng fake, ví dụ là compute, computing, computututu thì tất cả đều sẽ match với comp :v: 
  config.stem_keywords = false

  # For example using ruby-stemmer:
  # config.stem_proc = Proc.new { |word| Lingua.stemmer(word, :language => 'nl') }

  ## Words to ignore, danh sách các từ sẽ bị bỏ qua không đánh index và như vậy thì chắc rồi, nó cũng không đc match khi tìm kiếm.
  config.ignore_list = []

  ## An array of words
  # config.ignore_list = %w{ a an to from as }

  ## Or from a file
  # config.ignore_list = YAML.load(File.open(File.dirname(__FILE__) + '/config/ignorelist.yml'))["ignorelist"]

  ## Search using regex (slower), cho phép input keyword là regex, dĩ nhiên là nó sẽ chậm hơn, mà đa số enduser cũng không biết xài regex =))
  config.regex_search = true
  ## Regex to search
  ##  input phải khớp 100% (chậm)
  #config.regex = Proc.new { |query| /#{query}/ }
  ## input là đầu hoặc cuối của chuỗi, nhanh(slightly faster)
  # config.regex = Proc.new { |query| /^#{query}/ }
  # config.regex = Proc.new { |query| /#{query}$/ }

  # config để thay thế 1 số từ đắc biệt, như kiểu chúng ta xài gsub ý.
  # http://en.wikipedia.org/wiki/Typographic_ligature
  config.ligatures = { "œ"=>"oe", "æ"=>"ae" }

  # Các kí hiệu trong input sẽ được thay thế bằng space
  config.strip_symbols = /[._:;'\"`,?|+={}()!@#%^&*<>~\$\-\\\/\[\]]/

  # Các kí tự sẽ bị ghi đè sau khi chạy strip_symbols
  config.strip_accents = /[^\s\p{Alnum}]/

  #  độ dài của các từ sẽ đc đánh index, ví dụ abcs thì nó tách ra đánh các index là ad bc cs.
  config.minimum_word_size = 2
end
```
# Mongoid Fulltext
Từ phiên bản 0.61 trở lên sẽ chạy trên ruby 1.9.3+ và mongoid 3, 4, 5, 6, 7

Phiên bản 0.5.x cho mongoid 2.4.x và ruby <=1.8.7
Cài đặt
> gem 'mongoid_fulltext'

Khai báo trong model

> include Mongoid::FullTextSearch
> fulltext_search_in :field, :field_khac_1, :field_khac_2

Cú pháp sử dụng để chạy lệnh

> Model.fulltext_search("keyword")

Giới hạn số lượng result trả về khi chạy lệnh

> Model.fulltext_search("keyword", {max_result: 5})

Mặc định khi chạy tìm kiếm bằng method `fulltext_search` thì kết quả trả về sẽ khoong bao gồm cả `score` của kêt quả trả về, để yêu cầu cả score để từ đó sắp xếp các kết quả trả về theo score như google ế, thì ta xài cái này:

> Model.fulltext_search("keyword", {return_ten_field: true})

Tên các chỉ mục tạo tự động đc đánh theo format `mongoid_fulltext.index_nameModel_0`, để đặt tên cho các chỉ mục này (mục đích là để sử dụng cho việc find trên nhiều bảng bằng quan hệ) thì dùng option `index_name` trong model khi khai báo fulltext_search_in
> fulltext_search_in :title, :index_name => 'title_index'

Thằng fulltext này còn cung cấp cả filters cho chúng ta sử dụng giúp tăng tốc tìm kiếm.
ví dụ:
>  fulltext_search_in :title, :filters => { :is_expensive => lambda { |x| x.price > 10000 }}

Chạy lệnh
> Model.fulltext_search("keyword", is_expensive: true)

Sẽ trả về các kết quả thỏa mãn với keyword và có `price > 10000` tăng tốc đáng kể cho truy vấn vì giảm thiểu được phạm vi search.

Ngoài ra, các bạn còn có thể dùng filter dạng bộ lọc để từ đó mà lệnh tìm kiếm chỉ chạy trong array trả về của filter.
bằng cách khai báo
```
    :filters => {
      :exhibitions => lambda { |artist| artist.exhibitions }
    }
```

Các option của gem fulltext nhiều hơn kha khá so với search nhưng không hiểu sao search lại có nhiều star hơn trên github :( bản thân mình thấy dùng fulltext tiện hơn search, cũng một phần vì nó có khá nhiều option, mình chỉ giải thích một số cái tiêu biểu, các bạn có thể tham khảo thêm tại đây: [Indexing Options](https://github.com/mongoid/mongoid_fulltext#indexing-options)

**alphabet**: Khai báo chuỗi kí tự mà bạn sẽ lọc để đánh index, mặc định là chuỗi latin `abcdefghijklmnopqrstuvwxyz0123456789`, dùng tiếng nhật bổn với gem này thì khá là bất khả thi nên mình đã phải xài CloudSearch của aws sau khi thấy option này =))

**word_separators**: Kí tự mà tại đó gem sẽ ngắt từ, mặc đinh là space.

**ngram_width**: độ rộng của các từ đc đánh index, mặc định là 3, `abcd` thì sẽ đc tách thành `abc` và `bcd` để đánh thành 2 index.

**update_if**: option khai báo trong model để chạy update các index của field đó khi thỏa mãn condition của option này.

**reindex_immediately**: option khai báo để kiểm tra xe liệu có đánh index lại sau khi đối tượng đc udate, mặc định là true. nếu set thành false, bạn phải chạy class method `update_ngram_index` để update index cho old data.

Một số option khác các bạn tìm hiểu thêm trong link github nhé.

Cũng như search, fulltext gem không tự tạo index cho data cũ, các bạn phải chạy lệnh Model.update_ngram_index để đánh chỉ mục text cho datat cũ.
Ngoài ra các bạn cũng có sẵn một instance method cùng tên `update_ngram_index` để update chỉ mục text cho một đối tượng thay vì toàn bộ.
Để xóa các index thì chạy method `remove_from_ngram_index` cho class hoặc instance.

Để dev thì các bạn chạy lệnh cho instance thôi nhé chứ chạy cho cả Model có khi nó out memory đấy =))
```
Model.update_ngram_index
Model.find(id).update_ngram_index
Model.remove_from_ngram_index
Model.find(id).remove_from_ngram_index
```

Bonus:
Mongoid cung cấp rake task để tạo indexes dự trên các collection và các trường của nó để phục vụ full text search:

> rake db:mongoid:create_indexes


Chốt: tâm sự vậy thôi chứ sau khi reseach 2 gem này thì mình qua xài CloudSearchDomain của AWS rồi,
dự án nó yêu cầu làm với tiếng nhật mà để viết cái alphabet của japanese vào model thì chắc chớt, xài hàng aws dù tốn tiến nhưng mà ngon hơn hẳn =))

Xài CloudSearch thì được cái hỗ trợ tốt hơn nhưng config khá lằng nhằng, từ cấu trúc dữ liẹu để upload lên aws rồi đến lấy về config param truyền lên và cả update data trên server nữa.

Để mà đánh index trên cloud thì quả thật nó lâu kinh khủng, cỡ vài triệu bản khi mà đánh index không thôi mất 5 6 tiếng. Bù lại nó support nhiều thứ tiếng, nhiều loại dữ liệu, text, array text, hash,..

Chúc các bạn test thành công, có gì khúc mắc thì comment chúng ta cùng tìm hiểu chứ mình chắc cũng không biết nhiều để hướng dẫn đâu :v

Nguồn:

Gem mongoid_fulltext: https://github.com/mongoid/mongoid_fulltext

Gem mongoid_search: https://github.com/mongoid/mongoid_search