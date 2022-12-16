## **I. Giới thiệu**

Rất nhiều người thấy Evernote là một công cụ hữu ích để quản lí cuộc sống của họ tốt hơn. API Evernote cung cấp một số tính năng thật sự hữu ích. Bất kì tính năng nào bạn chọn để tìm hiểu, hãy chắc chắn là bạn đã đọc các điều khoản dịch vụ của họ để bạn tuân thủ các nguyên tắc sử dụng API.

Vì vậy, nhiều doanh nghiệp đang phần loại và tổ chức dữ liệu. Việc có quyền truy cập API để vào Evernote mang lại đòn bẩy tuyệt vời trong việc khai thác các dữ liệu mà bạn đang có. Bạn có thể cải thiện Evernote bằng việc mang công nghệ của bạn vào trong đó.

Chúng ta sẽ bắt đầu từ việc đã cài được môi trường Ruby on Rails và cấu hình được Devise cho người dùng đăng nhập. Chúng ta cần phải tạo một số thông tin để đăng nhập vào API của Evernote trước.

Truy cập vào dev.evernote.com và nhấn vào mục GET AN API KEY. Điền thông tin của bạn vào trong đó, sau đó chọn truyền truy cập cơ bản hoặc đầy đủ. Nếu bạn gặp bất kì một lỗi nào, hãy kiểm tra các kí tự không hợp lệ trong các thông tin mà bạn điền. Bạn sẽ được gửi một email có chứa bản sao của thông tin đăng nhập, và đó là kết quả.

Lưu thông tin đăng nhập của bạn vào một nơi nào đó, vì trang web sẽ không bao giờ chia sẻ với bạn điều này một lần nào nữa. Tại thời điểm này thì bạn đã có thông tin đăng nhập để làm việc với API Sandbox.

Nếu bạn muốn kích hoạt thông tin đăng nhập để sử dụng công khai, hãy vào lại trang dev.evernote.com và nhấn vào mục Resource. Nhấn vào Active an API Key ở trên menu. Khi bạn điền thông tin vào popup bật lên và nhấn vào gửi, thông tin đăng nhập sẽ hoạt động trên cả Sandbox và tài khoản Evernote cá nhân của bạn.

## **II. Rails và Evernote API**

Khi bạn bắt đầu thiết lập sẽ mất một vài bước. Nhưng cũng không phức tạp lắm đâu.
### 1. Các gem cần thiết

Bạn cần một số gem dùng cho việc truy cập API sau. Thêm chúng vào trong Gemfile

```
# Gemfile

# Get & store Evernote API credentials
gem 'omniauth'
gem 'omniauth-evernote'

# Evernote API
gem 'evernote_oauth'
```

3 gem này sẽ cung cấp mọi thứ cho bạn để xử lí API Evernote.

### 2. Khởi tạo

Đầu tiên ta sẽ xây dựng controller để xử lí các phản hồi OmniAuth (vì các gem sẽ xử lí yêu cầu). Thực hiện lệnh sau:

```
rails g controller OmniAuth
```

Tiếp theo hãy tạo trình khởi tạo cho Evernote bằng OmniAuth.

```
# config/initializers/omniauth.rb

# Place the credentials in a secure place
# (do not place them in a file saved to your projects repository)
evernote = {
  consumer_key: ENV['EVERNOTE_KEY'],
  consumer_secret: ENV['EVERNOTE_SECRET'],
  sandbox: true
}

evernote_site = evernote[:sandbox] ? 'https://sandbox.evernote.com' : 'https://www.evernote.com'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :evernote,
           evernote[:consumer_key],
           evernote[:consumer_secret],
           client_options: {site: evernote_site}
end

OmniAuth.config.on_failure = OmniAuthController.action(:failure)
```

### 3. Routes

Tiếp theo cần phải cài các đường link thích hợp trong file routes

```
# config/routes.rb
Rails.application.routes.draw do
  # omniauth
  get '/auth/:provider/callback' => 'omni_auth#callback'
  get '/auth/failure' => 'omni_auth#failure'
end
```

OmniAuth gem sẽ đặt các url xác thực cho các thông tin gửi đi và url thất bại trở lại.

Theo mặc định, OmniAuth sẽ cấo hình đường dẫn `/auth/:provider`. Nó được OmniAuth tạo ra tự động cho bạn và bạn sẽ bắt đầu quá trình xác thực bằng cách đi đến đường dẫn đó.

Cũng cần lưu ý, nếu xác thực không thành công, OmniAuth sẽ tự động phản hồi và sau đó chuyển yêu cầu đến đường dẫn `/auth/failure`, và chuyển thông báo lỗi tương ứng. Bạn cũng có thể thêm một action trong controller để bắt những trường hợp như thế này.

### 4. Database model

Đối với model, chúng ta sẽ đi cùng với mô hình mã hóa của API với mạng xã hội. Nhiều xác web cũng sử dụng cùng loại thông tin xác thực OmniAuth/OAuth, do đó, việc tổ chức nó dưới dạng một bảng trong cơ sở dữ liệu là hợp lí nhất. Nhập lệnh sau để tạo model:

```
rails g model Social kind:integer:index username:string:index uid:text:index token:text token_expires:datetime verified:datetime user:references
```

Hãy lưu ý. Trước khi bạn migrate nó, hãy sử migration file và đặt username thành mội chuỗi blank làm mặc định:

```
# db/migrate/20170116234721_create_socials.rb
class CreateSocials < ActiveRecord::Migration[5.0]
  def change
    create_table :socials do |t| 
      t.integer :kind
      t.string :username, default: ""
      t.text :uid
      t.text :token
      t.datetime :token_expires
      t.datetime :verified
      t.references :user, foreign_key: true

      t.timestamps
    end 
    add_index :socials, :username
    add_index :socials, :kind
    add_index :socials, :uid
  end 
end
```

Và bây giờ thì bạn có thể migrate nó được rồi

Sau đó hãy cập nhập các quan hệ model, chúng ta sẽ thêm một enumerator cho một loại mạng xã hội có sẵn dựa vào một xác nhận cho loại đó.

```
# app/models/social.rb
class Social < ApplicationRecord
  belongs_to :user
  enum kind: [:evernote]
  validates_presence_of :kind
end
```

Và cung cấp cho model User mối quan hệ của nó với mạng xã hội

```
# app/models/user.rb
class User < ApplicationRecord
  has_many :socials, dependent: :destroy
end
```

### 5. Controller

Tiếp theo chúng ta cần sửa controller để bắt các phản hồi từ Evernote cho token gửi đi

```
# app/controllers/omni_auth_controller.rb
class OmniAuthController < ApplicationController
  rescue_from OAuth::Unauthorized, with: Proc.new{redirect_to root_path}

  def callback
    case params['provider']
    when 'evernote'
      current_user.socials.evernote.where(username: request_auth["extra"]["raw_info"].username).
        first_or_create.update(
          uid: request_auth["uid"].to_s,
          token: request_auth["credentials"]["token"],
          token_expires: Time.at(request_auth['extra']['access_token'].params[:edam_expires].to_i).utc.to_datetime,
          verified: DateTime.now
      )   
        flash[ :notice ] = "You've successfully Authorized with Evernote"
        session[:return_to] ||= root_path
    end 
    redirect_to session.delete(:return_to) || root_path
  end 

  def oauth_failure
    redirect_to root_path
  end 

  private
  def request_auth
    request.env['omniauth.auth']
  end 
end
```

Khi người dùng đồng ý quyền truy cập cho tài khoản của họ vào ứng dụng của bạn, Evernote sẽ gửi lại một hash chứa các bits các nhau của thông tin. Controller sẽ lưu các dữ liệu liên quan cho token của user vào database.

Có rất nhiều thứ đang diễn ra ở đây.

Gọi current_user một cách an toàn đảm bảo chúng ta chỉ hoạt động với những gì mà người dùng hiện tại sử hữu. Phương thức `evernote` ở trên các loại mạng xã hội là một phương thức helper được xây dựng bởi mã enum của Rails.

Mệnh đề where khiến cho tên người dùng phải rõ ràng và đó là lí do tại sao chúng ta phải đặt mặc định thành chuỗi blank ở trong model. Nếu không có nó, sẽ gây ra lỗi ở đây.

first_or_create sẽ tìm các thông tin và có rồi, nếu mà chưa có nó sẽ tự động tạo vào cập nhật.

Bây giờ chúng ta được đảm bảo các mục nhập Evernote thích hợp cho người dùng hiện tại và người dùng đó có thể cập nhật.

session[:return_to] là một lựa chọn. Chúng ta sử dụng điều này để trang web của chúng ta lưu trữ và biết được trang cuối mà người dùng truy cập là trang nào, có thể có nhiều loại trang khác nhau mà họ muốn quay lại.

### 6. The view

Đối với view, bạn chỉ cần đặt một liên kết đến `/auth/evernote` và gems sẽ xử lí phần còn lại.

### 7. The API

Bây giờ bạn đã có đủ các kết nối thành công vào lưu trữ token của Evernote, bạn có thể dùng API

API nó là một thiết kế hơi lạ, và chúng ta cần làm quen với schema một chút. Ta sẽ coi folder là `Notebooks` và các mục ở trong folder là `Notes`. Notes có thể chứ nhiều các tệp media và các tệp khác.

Việc tìm kiếm mọi thứ trong API có thể tốn khác nhiều thời gian để làm quen.

Ví dụ này giả định rằng có một model Card có thể tải lên hình ảnh với [Cloudinary](https://cloudinary.com/)

```
module CardImporter
  def self.get_cards(notebook, user_id)
    user = User.find(user_id)

    token = user.socials.evernote.first.try(:token) 

    client = EvernoteOAuth::Client.new( token: token )

    note_store = client.note_store.listNotebooks( token ).
                   detect { |i| i.name =~ /#{notebook}/i }.
                   note_store

    notes = pick_notes_with_images(token, note_store)

    notes.each do |note|

      note_resources(note.guid, token, note_store).
        select {|i| i.mime =~ /image\/(?:jpg|jpeg|png|gif)/}.
        each do |resource|

          card = create_card(
            resource.data.body,
            user,
            note.guid,
            resource.mime.split('/')[-1].gsub("jpeg", "jpg"),
            note.title
          )

          # enqueue OCR work here if card exists

        end

    end

  end

  private
  def self.grab_notes(user_token, note_store)
    page_size = 1000

    filter = Evernote::EDAM::NoteStore::NoteFilter.new(
      order:         Evernote::EDAM::NoteStore::NoteFilter::ORDER
      #              Evernote::EDAM::NoteStore::NoteFilter::ASCENDING
      #              Evernote::EDAM::NoteStore::NoteFilter::WORDS
      #              Evernote::EDAM::NoteStore::NoteFilter::NOTEBOOKGUID
      #              Evernote::EDAM::NoteStore::NoteFilter::TAGGUIDS
      #              Evernote::EDAM::NoteStore::NoteFilter::TIMEZONE
      #              Evernote::EDAM::NoteStore::NoteFilter::INACTIVE
      #              Evernote::EDAM::NoteStore::NoteFilter::EMPHASIZED
    )


    spec = Evernote::EDAM::NoteStore::NotesMetadataResultSpec.new(
      includeTitle: Evernote::EDAM::NoteStore::NotesMetadataResultSpec::INCLUDETITLE,
      #includeContentLength: Evernote::EDAM::NoteStore::NotesMetadataResultSpec::INCLUDECONTENTLENGTH,
      #includeCreated: Evernote::EDAM::NoteStore::NotesMetadataResultSpec::INCLUDECREATED,
      #includeUpdated: Evernote::EDAM::NoteStore::NotesMetadataResultSpec::INCLUDEUPDATED,
      #includeDeleted: Evernote::EDAM::NoteStore::NotesMetadataResultSpec::INCLUDEDELETED,
      #includeUpdateSequenceNum: Evernote::EDAM::NoteStore::NotesMetadataResultSpec::INCLUDEUPDATESEQUENCENUM,
      #includeNotebookGuid: Evernote::EDAM::NoteStore::NotesMetadataResultSpec::INCLUDENOTEBOOKGUID,
      #includeTagGuids: Evernote::EDAM::NoteStore::NotesMetadataResultSpec::INCLUDETAGGUIDS,
      #includeAttributes: Evernote::EDAM::NoteStore::NotesMetadataResultSpec::INCLUDEATTRIBUTES,
      includeLargestResourceMime: Evernote::EDAM::NoteStore::NotesMetadataResultSpec::INCLUDELARGESTRESOURCEMIME #,
      #includeLargestResourceSize: Evernote::EDAM::NoteStore::NotesMetadataResultSpec::INCLUDELARGESTRESOURCESIZE
    )

    note_store.findNotesMetadata(user_token, filter, 0, page_size, spec).notes
  end

  def self.pick_notes_with_images(user_token, note_store)
    grab_notes(user_token, note_store).select {|i|
      i.largestResourceMime =~ /image\/(?:jpg|jpeg|png|gif)/
    }
  end

  def self.note_resources(guid, user_token, note_store)
    note_store.getNote(user_token, guid, false, true, true, true).resources
  end

  def self.create_card(data, user, evernote_guid, format='',name='')
    format.prepend('.') unless format[0]['.']
    t = Tempfile.new(['card', format], Dir.tmpdir, 'wb')
    t.binmode; t.write data; t.rewind
    card = Card.create!(user_id: user.id, picture: t, name: name, evernote_guid: evernote_guid)
    t.delete
    card
  end
end
```

Bạn có thể thấy có rất nhiều điều phức tạp điều hướng xung quoanh API. Phương thức get_cards ở đây cho phép bạn chọn một `notebook` có tên cụ thể thông qua. Nó lokc ra tất các các `notes` cá nhân cho người có hình ảnh trong đó. Sau đó nó đi qua tất cả hình ảnh và kết xuất dữ liệu thô từ hình ảnh thành 1 tệp.

Chúng ta đã bao gồm tất các các tham số tùy chọn trong note_store.findNotesMetadata trong phước thức grab_notes như là các dòng comment. Bạn được yêu cầu phải pass qua ít nhất một vài trong các tham số này.

Cảm ơn các bác đã theo dõi bài viết của mình

Dịch từ: https://blog.codeship.com/the-evernote-api-in-rails/