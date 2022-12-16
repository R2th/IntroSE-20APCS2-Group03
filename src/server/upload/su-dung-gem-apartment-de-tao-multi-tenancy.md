Khái niệm multi-tenant đã luôn là một điều quan trọng với các developer Rails vì nó có thể phục vụ cho nhiều dự án với cùng một source code mà không gây nhầm lẫn giữa các tài nguyên với nhau.
Trong bài viết này, mình sẽ giới thiệu cho các bạn cách sử dụng gem "apartment" để tạo một app Rails có sử dụng multi-tenant .
## Tạo app
Ta sẽ tạo một app có nhiều tenant (nói cách khác là có nhiều loại user), mỗi người sở hữu các project của riêng. Mỗi tenant có subdomain riêng và có các tài nguyên riêng. 
- Tạo app, tạo các tenant và project.

```
rails new multitenant
cd multitenant
rails g scaffold Tenants name email subdomain
rails g scaffold Projects title
rails db:migrate
```
- Thêm `gem "apartment"` vào Gemfile.

- Chạy bundle.

- Chạy `rails g apartment:install`.

## Tùy chỉnh Apartment
- Trong config/initializers/apartment.rb, tìm dòng này:
```ruby
config.tenant_names = lambda { ToDo_Tenant_Or_User_Model.pluck :database }
```
đổi nó thành:
```ruby
config.tenant_names = lambda { Tenant.pluck :subdomain }
```

> Nếu không sửa đúng, khi chạy `rails db:migrate` thì app sẽ báo lỗi như là:  “Migrating database tenant. The tenant database cannot be found.”. Đó là vì bạn quên chưa đổi `:database` thành `:subdomain`.

Vẫn file đó, bỏ comment dòng excluded_models.
```ruby
config.excluded_models = %w{ Tenant }
```

> Mình dùng subdomain để chia các tenant trong ví dụ này. Apartment tự dùng như thế theo mặc định ở cuối file apartment.rb. Nếu bạn muốn dùng cách khác subdomain để chia các user thì bạn có thể tùy chỉnh middleware. Xem thêm tại [đây](https://github.com/influitive/apartment#switching-tenants-per-request) 

## Tạo subdomain khi tạo tài khoản
Trong file model Tenant, thêm một số hàm để tạo một subdomain mới khi tạo tài khoản.
```ruby
# tenant.rb

# trước
class Tenant < ApplicationRecord
end

# sau
class Tenant < ApplicationRecord
  after_create :create_tenant

  private

    def create_tenant
      Apartment::Tenant.create(subdomain)
    end
end
```
## Chạy server multi-tenant
Ta đã gần như có thể test được subdomain rồi. Tuy nhiên, link  http://localhost:3000 lại không phải một domain thực sự, nên ta không thể dùng các subdomain như là http://subdomain.localhost:3000. Ơn giời, chúng ta vẫn có lvh.me để dùng trong Rails. Nó trỏ về máy local của bạn nên chúng ta có thể test subdomain được. Chúng ta sẽ cần câu lệnh như sau:
```
rails s -p 3000 -b lvh.me
```
> Nếu bạn dùng OSX, thì nên tạo một [alias](https://zeph.co/alias) rồi gọi nó bằng lvh.
> 
## Tạo tenant đầu tiên

Chạy server như trên rồi tạo 2 tenant với subdomain là sun và kne. Mình tạo ở /tenants/new mà mình đã chạy scaffold. (Nếu bạn không chạy scaffold thì hãy đảm bảo các tenant có trường subdomain trong form đăng kí. Nếu bạn dùng devise, hãy thêm một trường subdomain và form đăng kí.)

Giờ thì vào sun.lvh.me:3000 và check subdomain thôi!

## Tạo project đầu tiên

Truy cập vào sun.lvh.me:3000/projects/new và tọa project mới. Database sẽ được phân ra nhờ Apartment và project được tạo bởi sun sẽ không ảnh hưởng tới kne.
## Tùy biến trang chính

Nhiều lúc, bạn sẽ muốn trang chính của mình phải khác so với các trang subdomain. Ví dụ như sử dụng nó như một trang để marketing với danh mục "Home", "About", "Signup",...

Nên để trang này ở subdomain là "www". Khi mà bạn chạy app ở môi trường production, bạn có lẽ sẽ muốn chuyển những subdomain dạng không có "www" thành "www.1..."

Thêm một thư mục mới trong config/initializers là apartment. Trong đó tạo file subdomain_exclusions.rb và thêm vào đó:
```ruby
# subdomain_exclusions.rb

Apartment::Elevators::Subdomain.excluded_subdomains = ['www']
```

Chạy lại server. Giờ thì hãy vào www.lvh.me:3000 và tận hưởng.

Cuối cùng, nếu bạn muốn "/projects" trên trang chính và bỏ "/tenants" trên các trang subdomain của user. Hãy thêm vào file routes.rb:
```ruby
# routes.rb

class SubdomainConstraint
  def self.matches? request
    subdomains = %w{ www }
    request.subdomain.present? && !subdomains.include?(request.subdomain)
  end
end

Rails.application.routes.draw do
  resources :tenants, constraints: { subdomain: 'www' }
  
  constraints SubdomainConstraint do
    resources :projects
  end
end
```

Bây giờ, bạn chỉ có thể truy cập vào "/project" từ trang subdomain của tenant thôi. Và bạn không thể đăng kí một tenant mới trừ khi đang ở trang có "www".
Cụ thể:
* Trang này sẽ báo lỗi: http://www.lvh.me:3000/projects
* Trang này sẽ không sao: http://sun.lvh.me:3000/projects
* Trang này sẽ báo lỗi: http://sun.lvh.me:3000/tenants
* Trang này sẽ không sao: http://www.lvh.me:3000/tenants

Trong tương lai, khi cần thiết phải thêm các tài nguyên mới vào app, hãy chú ý tới file routes.rb. Lưu ý là bạn không thể truy cập được các tài nguyên thuộc về tenant từ trang chính và ngược lại nhé.

OK! Giờ thì bạn đã tạo được một app multi-tenant rồi đó. Khá dễ đúng không? 

Tham khảo: https://github.com/influitive/apartment