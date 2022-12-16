Bài viết này mình nói về chủ đề khá cơ bản và muôn thủa ở trong các framework backend về web khác nhau là search. Hiện tại thì các thư viện về search cũng rất đa dạng nhưng ở đây chúng ta sẽ luyện với query thuần cho luyện cơ tay

# Đặt vấn đề
Để làm ví dụ cho bài này thì mình sẽ có 3 bảng sau 

![](https://images.viblo.asia/880d6abc-bac1-449f-996c-8c2c97f0bf8d.png)

 Ngắn gọn thì từ chỗ data này chúng ta sẽ tạo ra 1 app nhỏ, `root_path` sẽ đặt ở `songs#index`. Và mục tiêu của chúng ta chỉ là tìm kiếm các bài hát thôi.
 # Tìm kiếm cơ bản
Tìm kiếm đơn giản với tên bài hát thì như hướng dẫn ở Railscasts viết như sau.

Đầu tiên ở phía view chúng ta sẽ viết:
```haml
/ app/views/layouts/_searchbar.html.slim
- form_tag root_path, method: 'get' do
  p
    = text_field_tag :search, params[:search]
    = submit_tag "Search", name: nil
```
Phía controller sẽ là:
```ruby
# app/controllers/songs_controller.rb
def index
  @songs = Song.search(params[:search])
end
```
Phía model sẽ trình bày:
```ruby
# app/models/song.rb
  scope :search, ->(search) { where("name LIKE ?", "%#{search}%") if search.present? }
```
Các bạn có thể xem bài của Railscast phía dưới và nhận thấy mình đang không dùng self method vì 2 lí do: 
- Bản chất self-method trong bài của Railscast cũng chỉ là query như trên
- Tuỳ tình huống ta sẽ dùng self method. Còn với query thì ta nên dùng `scope`
# Tìm kiếm nâng cao
Giờ chúng ta quay sang tình huống nâng cao. Bây giờ chúng ta sẽ cần tìm nhiều hơn với 1 bài hát, ví dụ như tìm theo tên tác giả, thể loại, năm sáng tác
## Hướng tiếp cận 1
Vẫn theo Railscast và từ đó là 1 sơ số các trang hướng dẫn khác, ta sẽ tạo 1 controller search hẳn hoi:
```bash
rails g model search keywords:string category_id:integer genre_id:integer
lyric:text released_year:datetime
rails db:migrate
rails g controller searches
```
Ở `config/routes.rb`
```ruby
resources :searches
```
Phía model chúng ta sẽ đặt
```ruby
def songs
  @songs ||= find_songs
end

private

def find_songs
  songs = Song.order(:name)
  songs = songs.where("name like ?", "%#{name}%") if name.present?
  songs = songs.where("lyric like ?", "%#{lyric}%") if lyric.present?
  songs = songs.where(genre_id: genre_id) if genre_id.present?
  songs = songs.where(artist_id: artist_id) if artist_id.present?
  songs = songs.where(released_year: released_year) if released_year.present?
  songs
end
```
Về phía view chúng ta có
```haml
/ songs/index.html.slim
p
  = link_to "Advanced Search", new_search_path
```
```haml
/ searches/new.html.slim
h1 Advanced Search
= form_for @search do |f|
  .field
    = f.label :name
    br/
    = f.text_field :name
  .field
    = f.label :lyric
    br/
    = f.text_field :lyric
  .field
    = f.label :genre_id
    br/
    = f.collection_select :genre_id, Genre.order(:name), :id, :name, include_blank: true
  .field
    = f.label :artist_id
    br/
    = f.collection_select :artist_id, Artist.order(:name), :id, :name, include_blank: true
  .field
    = f.label :released_year
    br/
    = f.select_year fieldname: 'released_year', (Time.zone.now.year - 100)..(Time.zone.now.year + 1)
  .actions= f.submit "Search"
```
Kết quả tìm kiếm sẽ trả về
```haml
h1 Search Results
= render @search.songs
```
Tuy nhiên, cách này sẽ gây ra sự lãng phí CSDL khi bạn tạo cả 1 cái bảng searches chỉ để xử lý chỗ trên kia. Vậy có cách nào khác cách hướng dẫn trên không?

Đây là lúc mình xin đưa ra cách mà mình đã học được và thành thục
## Hướng tiếp cận 2
Chúng ta có hướng 1 ở trên kia thì thêm vài trường nữa và vài scope nữa là ổn
```ruby
# app/controllers/songs_controller.rb
def index
  @songs = Song.search_name(params[:name])
               .search_lyric(params[:lyric])
               .search_genre(params[:genre_id])
               .search_artist(params[:artist_id])
               .search_released_year(params[:released_year])
end
```
```ruby
# app/models/song.rb
  scope :search_name, ->(name) { where("name LIKE ?", "%#{name}%") if name.present? }
  scope :search_lyric, ->(lyric) { where("lyric LIKE ?", "%#{lyric}%") if lyric.present? }
  scope :search_genre, ->(genre_id) { where(genre_id: genre_id) if genre_id.present? }
  scope :search_artist, ->(artist_id) { where(artist_id: artist_id) if artist_id.present? }
  scope :search_released_year, ->(released_year) { where(released_year: released_year) if released_year.present? }
```
Thực ra nó cũng chả khác gì ở phần 1 cả =))) Cơ mà có 1 điểm đáng lưu ý ở đây
```ruby
def index
  @songs = Song.search_name(params[:name])
               .search_lyric(params[:lyric])
               .search_genre(params[:genre_id])
               .search_artist(params[:artist_id])
               .search_released_year(params[:released_year])
end
```
Thôi, nhìn mớ này khủng quá. Mình bỏ code đây :v 

Nếu như lắp rubocop thì đây là lỗi AbcSize rất to. Và với phần code ở trên độ phức tập rất cao!

Vậy nên giải pháp ở đây là ở phía model mình tạo thêm 1 chiếc scope nữa
```ruby
# app/models/song.rb
  ...
  scope :search, lambda { |params|
    search_name(params[:name])
    .search_lyric(params[:lyric])
    .search_genre(params[:genre_id])
    .search_artist(params[:artist_id])
    .search_released_year(params[:released_year])
  }
```
Và sửa lại 
```ruby
# app/controllers/songs_controller.rb
def index
  @songs = Song.search(params)
end
```
Và phần view viết lại như sau:
```haml
/ app/views/layouts/_searchbar.html.slim
- form_tag root_path, method: 'get' do
  p
    = text_field_tag :name, params[:name]
    = text_field_tag :lyric, params[:lyric]
    = collection_select(nil, :artist_id, Artist.all, :id, :name, {selected: params[:artist_id], prompt: true})
    = collection_select(nil, :genre_id, Genre.all, :id, :name, {selected: params[:genre_id], prompt: true})
    = select_year(field_name: 'released_year', Date.today, start_year: Time.zone.now.year - 100, end_year: Time.zone.now.year + 1)
    = submit_tag "Search", name: nil
```
Thế là xong rồi.
# Tham khảo
- http://railscasts.com/episodes/37-simple-search-form
- http://railscasts.com/episodes/111-advanced-search-form-revised