Trong bài trước mình có chia vẻ về cách Export CSV thông qua một demo đơn giản(export thông tin của một model). Hôm nay mình sẽ tăng độ khó lên 1 chút đó là export thông tin của nhiều bảng một lúc. 

Link phần 1:

[Export Csv Trong Rails(p1)](https://viblo.asia/p/export-csv-trong-rails-Ljy5VB1b5ra)

Source code:

[Export csv](https://github.com/cuongtobi/export_csv)

Mình sẽ lấy ví dụ đơn giản là user sẽ biết nhiều ngôn ngữ và có nhiều chứng chỉ. Oke mình sẽ thêm 2 model quan hệ với user mình tạo hôm trước: 
* Model `Language`
* Model `Certification`

### Tạo model quan hệ với user

Tạo model
```ruby
rails g model language name:string
rails g model certification name:string
```

Thêm quan hệ vào file migrate
```ruby
class CreateLanguages < ActiveRecord::Migration[5.2]
  def change
    create_table :languages do |t|
      t.string :name
      t.references :user

      t.timestamps
    end
  end
end
```

```ruby
class CreateCertifications < ActiveRecord::Migration[5.2]
  def change
    create_table :certifications do |t|
      t.string :name
      t.references :user

      t.timestamps
    end
  end
end
```

Migrate
```ruby
rails db:migrate
```

Thêm quan hệ cho model
```ruby
class User < ApplicationRecord
  has_many :languages, dependent: :destroy
  has_many :certifications, dependent: :destroy
  
  # Mình sẽ xóa dòng này đi vào khai báo ở chỗ khác
  #CSV_ATTRIBUTES = %w(name address phone).freeze
end
```
```ruby
class Certification < ApplicationRecord
  belongs_to :user
end
```
```ruby
class Language < ApplicationRecord
  belongs_to :user
end

```

Ở bài trước mình có khai báo các attributes cần export trong model `User`, để tránh model phình to và dễ bảo trì mình sẽ tạo 1 model ảo để khai báo các constant cho phần export csv này:
```ruby
class ExportCsv::RowFormat
  RELATIONSHIP_EXPORT_CSV = %w().freeze
  
  ARR_DECORATE_RELATION = %w().freeze

  ATTRIBUTE_EXPORT_CSV = %w().freeze

  ATTRIBUTES_LANGUAGE = %i().freeze
  ATTRIBUTES_CERTIFICATION = %i().freeze
end
```

### Cài gem Draper
Tại sao cần dùng gem Draper?
Vì khi chúng ta export không phải lúc nào chúng ta cũng lấy nguyên dữ liệu từ database ra, đôi khi chúng ta phải biến tấu dữ liệu sao cho phù hợp với yêu cầu đặt ra.
Các bạn muốn tìm hiểu về gem này thì xem bài biết này nhé [Draper in Rails](https://viblo.asia/p/draper-in-rails-RnB5p0Nw5PG)

Thêm đoạn này vào gemfile và tiến hành bundle
```ruby
gem "draper"
```

Tạo decorator cho user
```ruby
rails g decorator User
```

### Khai báo constant cần thiết và thêm các hàm cần thiết trong decorator

Khai báo constant trong model ảo:
* RELATIONSHIP_EXPORT_CSV: các quan hệ cần export
* ARR_DECORATE_RELATION: tên các hàm decorate lấy dữ liệu của các quan hệ
* ATTRIBUTE_EXPORT_CSV: attribute cần export
* ATTRIBUTES_LANGUAGE: attribute cần export của `Language`
* ATTRIBUTES_CERTIFICATION: attribute cần export của `Certification`


```ruby
class ExportCsv::RowFormat
  RELATIONSHIP_EXPORT_CSV = %w(languages certifications).freeze

  ARR_DECORATE_RELATION = %w(arr_languages arr_certifications).freeze

  ATTRIBUTE_EXPORT_CSV = %w(name address phone arr_languages arr_certifications).freeze

  ATTRIBUTES_LANGUAGE = %i(name).freeze
  ATTRIBUTES_CERTIFICATION = %i(name).freeze
end
```

Khai báo các hàm lấy dữ liệu trong decorator:
```ruby
class UserDecorator < Drape::Decorator
  delegate_all

  def arr_languages
    arr_relationship_export languages, ExportCsv::RowFormat::ATTRIBUTES_LANGUAGE, 5
  end

  def arr_certifications
    arr_relationship_export certifications, ExportCsv::RowFormat::ATTRIBUTES_LANGUAGE, 5
  end

  private
  def arr_relationship_export objects, attributes, max_column_export
    arr_relationship = objects.limit(5).map do |object|
      attributes.map do |attr|
        object.public_send(attr)
      end
    end.flatten
    number = max_column_export - arr_relationship.count
    arr_relationship.concat([""] * number)
  end
end
```
Ở đây mình sẽ fix cứng lấy ra thành 5 cột dạng `["value 1", "value 2", "", "", ""]`, nếu không có giá trị thì để phần tử mảng rỗng

### Thêm settings
Các bạn nhớ cài thêm gem `config` nhé
```ruby
languages: languages
certifications: certifications
decorate_languages:
  - language_name
decorate_certifications:
  - certification_name
```

### Thêm I18n
```ruby
en:
  home:
    index:
      link_export: Export Users
      title: Export CSV
  header_csv:
    name: Full Name
    address: Address
    phone: Phone Number
    language_name: "Language_%{number}"
    certification_name: "Certification_%{number}"
```

### Tạo service khởi tạo header cho file csv
Mình sẽ tạo header theo dạng `["name", "phone", "address", "language_1", "language_2", ...]`
Đoạn code dưới đây sẽ lặp các attributes rồi push các giá trị I18n tương ứng vào mảng và tạo thành header cho file csv
```ruby
class HeaderCsv
  def initialize attributes, csv
    @attributes = attributes
    @csv = csv
  end

  def perform
    arr_header = attributes.inject([]) do |arr, attr|
      if ExportCsv::RowFormat::ARR_DECORATE_RELATION.include? attr
        5.times do |n|
          decorate_relationship(attr).each do |decorate|
            arr << (I18n.t("header_csv.#{decorate}", number: n.next))
          end
        end
      else
        arr << (I18n.t("header_csv.#{attr}"))
      end
      arr
    end
    csv << arr_header.map { |header| header }
  end

  private
  attr_reader :attributes, :csv

  def decorate_relationship attr
    relation = ExportCsv::RowFormat::RELATIONSHIP_EXPORT_CSV.detect{ |r| attr.include?(Settings.public_send r) }
    Settings.public_send("decorate_#{relation}")
  end
end
```

### Tạo service lấy data
Service này cũng tương tự service tạo header, nó sẽ lấy value tương ứng push vào 1 mảng
```ruby
class DataCsv
  def initialize attributes, candidate
    @attributes = attributes
    @candidate = candidate
  end

  def perform
    attributes.inject([]) do |arr, attr|
      if candidate.public_send(attr).is_a?(Array)
        candidate.public_send(attr).each { |value| arr << value }
      else
        arr << candidate.public_send(attr)
      end
      arr
    end
  end

  private
  attr_reader :attributes, :candidate
end
```

### Sửa lại service export csv
Ở service này gọi đến 2 service trên để tạo content cho file csv
```ruby
require "csv"

class ExportCsvService
  def initialize objects
    @attributes = attributes
    @objects = objects.decorate
  end

  def perform
    CSV.generate encoding: Encoding::SJIS do |csv|
      @csv = csv
      HeaderCsv.new(ExportCsv::RowFormat::ATTRIBUTE_EXPORT_CSV, csv).perform
      export_content
    end
  end

  private
  attr_reader :attributes, :objects, :csv

  def export_content
    objects.each do |object|
      push_line object
    end
  end

  def push_line object
    data_export = DataCsv.new(ExportCsv::RowFormat::ATTRIBUTE_EXPORT_CSV, object).perform
    csv << data_export
  end
end
```

### Update lại controller
```ruby
class ExportUsersController < ApplicationController
  def index
    csv = ExportCsvService.new User.all
    respond_to do |format|
      format.csv { send_data csv.perform,
        filename: "users.csv" }
    end
  end
end
```

Như vậy là chúng ta đã hoàn thành được chức năng export CSV, bài viết mình xin kết thúc ở đây, mong nhận được sự góp ý của các bạn. Cảm ơn các bạn đã quan tâm đến bài viết này!

source code:
https://github.com/cuongtobi/export_csv