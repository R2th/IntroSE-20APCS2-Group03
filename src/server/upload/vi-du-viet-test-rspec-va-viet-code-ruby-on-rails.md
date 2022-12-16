Bài viết này được lấy cảm hứng từ phần thuyết trình của cty S ở Ruby Kaigi 2021.

Xin chào mọi người. Hôm nay sẽ là bài đầu tiên mình viết có code sau 1 khoảng thời gian toàn về học chứng chỉ với best practice các kiểu. Trong năm nay mình sẽ cố gắng làm các bài về code nhiều hơn. Rất mong mọi người ủng hộ.

Và để khởi động thì mình sẽ viết về 1 ví dụ unit test.

# Unit test là gì
Mình biết chúng ta không hề thích khái niệm tí nào cả! Bản thân mình đọc đến dòng này cũng thấy muốn skip để thực hành nhanh rồi. Nhưng vẫn phải đưa ra để chúng ta kiểm tra tiêu chí:
> Unit Test là một loại kiểm thử phần mềm trong đó các đơn vị hay thành phần riêng lẻ của phần mềm được kiểm thử.
Đây là dòng khái niệm nhan nhản ở các giáo trình code tiếng Việt cũng như các blog về unit test. Nhưng cái cần đặt ra ở đây: "Định nghĩa thế nào là ĐƠN VỊ?"

Trong các khái niệm khoa học khác như Toán hay Vật Lý thì đơn vị được dùng ám chỉ về một tiêu chuẩn rất nhỏ không thể chia ra được thêm của 1 sự đo lường nào đó. Với tư cách là ngành khoa học sinh sau đẻ muộn thì Công nghệ thông tin cũng được kế thừa khái niệm ấy. Vì vậy, mình nghĩ là ta phải bổ sung thêm về khái niệm unit code:
> Unit code là chỉ 1 phần code đã được chia nhỏ nhất có thể và hoàn toàn độc lập về chức năng.
Như vậy, unit test với best practice phải là:
> Unit test tốt sẽ chỉ test 1 unit code và không bị phụ thuộc vào các unit test khác
# Ví dụ
Khái niệm lằng nhằng bên trên xong rồi. Bây giờ chúng ta cùng đi vào 1 ví dụ cụ thể và đơn giản. Chúng ta có 1 Rails cơ bản lưu trữ các Article gồm name và body. Yêu cầu ở đây là path `/articles` ở đây chỉ xuất ra tên của Article còn path `/articles/:id` sẽ xuất ra tên và body của article. path `/articles` sẽ phải pagination 10.

Trong bài này, chúng ta sẽ theo practice viết test trước khi viết code. Đây là best practice nhất bởi phải hiểu yêu cầu thì ta mới có thể viết được code. Và 1 trong những cách để hiểu yêu cầu là diễn tả yêu cầu dưới dạng test code.(Mặc dù thực tế mình vẫn là type code trc test và vì nhiều lý do, dự án cũng như sản phẩm khác nhau mà phần unit test cũng có lúc được coi trọng nhưng cũng có lúc bị xem nhẹ). Các điều kiện cần thêm gồm có gem RSpec, FactoryBot và Kaminari. Ngoài ra với test controller tuy có nhiều loại nhưng theo thói quen code thì mình sẽ chọn request test. Các kiểu test controller khác như controller test hay feature test cũng sẽ viết theo triết lý tương tự.

Lưu ý quan trọng khác: Để đúng như triết lý Không bị phụ thuộc các unit test khác, phải có cài đặt clear database sau khi test case chạy xong để tránh trường hợp data cũ gây lỗi cho test case mới hay ở đây là 1 sự phụ thuộc không ai mong muốn

Trước tiên, phân tích yêu cầu có 2 path tương ứng với method index và method show. Vì vậy chúng ta sẽ có test RSpec bước đầu như sau:
```ruby
# spec/requests/articles_spec.rb
require 'rails_helper'

RSpec.describe 'Articles', type: :request do
  describe 'GET /articles' do
    it 'can be access' do
      get articles_path
      expect(response).to have_http_status(:ok)
    end    
  end

  describe 'GET /articles/:id' do
    let!(:article) { FactoryBot.create(:article) }

    it "can be access" do
      expect(response).to have_http_status(:ok)
    end
  end
end
```
Tiếp đó, theo yêu cầu, chúng ta thấy phần method `show` không có thêm yêu cầu nào phải chia nữa do không có điều kiện. Vì vậy ta sửa lại `describe 'GET /articles/:id'` lại như sau:
```ruby
describe 'GET /articles/:id' do
  let!(:article) { FactoryBot.create(:article) }

  it "can be access and have all info of an article" do
    expect(response).to have_http_status(:ok)
    expect(response.body).to include(article.name)
    expect(response.body).to include(article.body)
  end
end
```

Như vậy thì hàm show ở đây chúng ta sẽ tính là 1 unit bởi không thể chia nhỏ được nữa. Chú ý rằng việc đặt tên các `describe`, `context` và `it... do` ở đây cũng quan trọng. Bạn cần đặt tên làm sao cho test case dễ hiểu được chức năng này để làm gì. 

Nhưng liệu `index` có chia được nhỏ như thế không?

Ở đây `index` có tận ít nhất 2 điều kiện: có pagination và dữ liệu hiển thị ra ít hơn so với trang chủ. Như vậy chúng ta phải chia 2 case. Và pagination thì cũng có 3 trường hợp: có đủ dữ liệu `per page`, không đủ dữ liệu `per page` và cuối cùng là không có. Như vậy lại thêm 3 case. Và tới đây cũng không chia nhỏ thêm được nữa nên chúng ta có tổng cộng 4 unit.

Với case cái gì được hiển thị ở trang chủ, ta viết như sau:
```ruby
describe 'GET /articles' do
  describe 'only the name of the article is shown' do
    let(:article) { FactoryBot.create(:article) }
    
    it 'correct' do
        get articles_path
        expect(response).to have_http_status(:ok)
        expect(response.body).to include(article.name)
        expect(response.body).not_to include(article.body)
    end
  end
  .....
end
```
Với Pagination, mình sẽ quyết định chọn số 3 để cho phần test. Nếu làm nguyên phần 10 thì thời gian chạy test sẽ không hề nhanh tí nào. Yên tâm là chúng ta có cách để chọc lại phần code cho đúng 10 sau.
```ruby
describe 'GET /articles' do
  .....
  describe 'pagination' do
    let!(:articles) { FactoryBot.create_list(:article, 4) }

    context 'page 1' do
      before do
        get articles_path, params: { page: 1 }
      end

# Ở đoạn này các bạn có thể đơn giản count. Việc kiểm tra từng tên thế này là do mình lấy theo code viết ngày xưa khi phải kiểm tra cả ranking của dữ liệu được hiển thị đúng hay không
      it 'only article 1,2 and 3 are shown' do
          expect(response.body).to include(articles[0].name, articles[1].name, articles[2].name)
          expect(response.body).not_to include(articles[3].name)
      end
    end

    context 'page 2' do
      before do
        get articles_path, params: { page: 2 }
      end

      it 'only article 4 is shown' do
        expect(response.body).to include(articles[3].name)
        expect(response.body).not_to include(articles[0].name, articles[1].name, articles[2].name)
      end
    end

    context 'page 3' do
      before do
        get articles_path, params: { page: 3 }
      end

      it 'no articles are shown' do
        articles.each do |article|
          expect(response.body).not_to include(article.name)
        end
      end
    end
  end
end
```

Bước tiếp đến chúng ta có thể chạy thử test. Tất nhiên sẽ fail hết vì chưa có code đâu.

Dựa theo các yêu cầu trên thì chúng ta sẽ viết code controller:
```ruby
# app/controllers/articles_controller.rb
class ArticlesController < ApplicationController
  before_action :find_article, only: :show
  PAGE_LIMIT = 10

  def index
    @articles = Article.
               select('name').
               page(params[:page]).
               per(PAGE_LIMIT)
    render :index
  end

  def show; end

  private

  def find_spot
    @article = Article.find_by(id: params[:id])
    return if @article

    flash[:alert] = t('articles.not_found')
    redirect_to articles_url
  end
end
```
Tới đây thì chắc chắn chúng ta sẽ pass được các test trừ phần pagination. Tuy nhiên code ở đây chạy đúng! Vậy nên chúng ta sẽ sửa test bằng cách stub:
```ruby
# spec/requests/articles_spec.rb
....
      before do
        stub_const('ArticlesController::PAGE_LIMIT', 3)
      end
```

Ngoài ra, mình lỡ quên mất cover cả case không tồn tại article rồi. Như vậy lúc này chúng ta lại phải chia tiếp ra method show gồm 2 trường hợp là tồn tại và không tồn tại:
```ruby
describe 'GET /articles/:id' do
  let!(:article) { FactoryBot.create(:article) }

  describe 'the article exists' do
    it "can be access and have all info of an article" do
      get article_path(article)
      expect(response).to have_http_status(:ok)
      expect(response.body).to include(article.name)
      expect(response.body).to include(article.body)
    end
  end
  
  describe 'the article doesn't exist' do
    it "errors in homepage" do
      get article_path(0)
      expect(response).to redirect_to(articles_url(locale: I18n.locale))
      follow_redirect!

      expect(response.body).to include(I18n.t('articles.not_found'))
    end
  end
end
```
Và cuối cùng, chúng ta sẽ có test hoàn chỉnh như sau:
```ruby
# spec/requests/articles_spec.rb
require 'rails_helper'

RSpec.describe 'Articles', type: :request do
  describe 'GET /articles' do
    describe 'only the name of the article is shown' do
      let(:article) { FactoryBot.create(:article) }
    
      it 'correct' do
        get articles_path
        expect(response).to have_http_status(:ok)
        expect(response.body).to include(article.name)
        expect(response.body).not_to include(article.body)
      end
    end
    
    describe 'pagination' do
      let!(:articles) { FactoryBot.create_list(:article, 4) }
      
      before do
        stub_const('ArticlesController::PAGE_LIMIT', 3)
      end

      context 'page 1' do
        before do
          get articles_path, params: { page: 1 }
        end

        it 'only article 1,2 and 3 are shown' do
            expect(response.body).to include(articles[0].name, articles[1].name, articles[2].name)
            expect(response.body).not_to include(articles[3].name)
        end
      end

      context 'page 2' do
        before do
          get articles_path, params: { page: 2 }
        end

        it 'only article 4 is shown' do
          expect(response.body).to include(articles[3].name)
          expect(response.body).not_to include(articles[0].name, articles[1].name, articles[2].name)
        end
      end

      context 'page 3' do
        before do
          get articles_path, params: { page: 3 }
        end

        it 'no articles are shown' do
          articles.each do |article|
            expect(response.body).not_to include(article.name)
          end
        end
      end
    end
  end

  describe 'GET /articles/:id' do
    let!(:article) { FactoryBot.create(:article) }

    describe 'the article exists' do
      it "can be access and have all info of an article" do
        get article_path(article)
        expect(response).to have_http_status(:ok)
        expect(response.body).to include(article.name)
        expect(response.body).to include(article.body)
      end
    end
  
    describe 'the article doesn't exist' do
      it "errors in homepage" do
        get article_path(0)
        expect(response).to redirect_to(articles_url(locale: I18n.locale))
        follow_redirect!

        expect(response.body).to include(I18n.t('articles.not_found'))
      end
    end
  end
end
```
Bài viết này của mình tới đây là hết. Cảm ơn mọi người đã đọc tới phút cuối