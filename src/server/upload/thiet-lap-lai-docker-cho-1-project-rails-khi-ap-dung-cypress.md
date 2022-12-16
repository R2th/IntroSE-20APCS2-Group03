Xin chào. Dạo gần đây mình có tiếp xúc với cypress và được yêu cầu áp dụng cypress vào 1 cái project Rails của mình có dùng Docker. Và thế là từ đó mình đã bắt đầu có bài này

# Thiết lập docker đang có và thêm Cypress
File Docker của mình hiện đang như thế này
```docker
version: '3'
services:
  db:
    image: postgres
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
  web:
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/app
      - bundle:/usr/local/bundle 
    ports:
      - "3000:3000"
    depends_on:
      - db
volumes:
  bundle:
```
Và khi nhận yêu cầu thì mình thêm Cypress rất nhanh với `yarn install --dev cypress`

Tiếp đó thì mình thêm lệnh ở `package.json` 
```json
{
  ...
  "scripts": {
    "cypress:open": "cypress open"
  }
}
```
Ở trên mình đang đặt là cổng 3000 nên `baseUrl` mình cũng sẽ đặt như sau
```json
{
  "baseUrl": "http://localhost:3000"
}
```
Và tạo testcase rồi `cy.visit()`, ta sẽ được kết quả sau:

![](https://images.viblo.asia/13f50c69-ef7d-4e56-b3df-efbaec9e64ca.png)

Trông có vẻ cũng khá ổn, trừ việc bạn đang tương tác với dữ liệu được định nghĩa là KHÔNG ĐƯỢC PHÉP TƯƠNG TÁC THẬT VỚI NÓ(cục này của mình cũng là giả thôi, nhưng nó cũng được coi là cấm kị nếu viết test tương tác với nó)

Và hiện cái cần thiết trong trường hợp này là dùng môi trường test, nhưng nếu chỉnh trực tiếp ở câu lệnh bên trên cũng không ổn.
# Chỉnh lại docker-compose
Giải pháp là trước tiên chỉnh lại `docker-compose.yml` vài dòng
```docker
version: '3'
services:
  db:
    image: postgres
  web:
    build: .
    volumes:
      - .:/app
      - bundle:/usr/local/bundle
    depends_on:
      - db
volumes:
  bundle:
```
Ở đây mình đã xoá vài phần đi. Và những phần bị xoá mình sẽ dùng cho docker-compose.dev.yml như sau
```docker
version: '3'
services:
  db:
    image: postgres
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
  web:
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/app
      - bundle:/usr/local/bundle 
    ports:
      - "3000:3000"
    depends_on:
      - db
volumes:
  bundle:
```
Bằng cách này, khi chạy `docker-compose
			-f docker-compose.yml
			-f docker-compose.dev.yml
		up` thì sẽ như file cũ chạy với `docker-compose up`. Truy cập `localhost:3000` là ổn.

Còn với thiết lập về test, mình sẽ làm như sau:
```docker
version: '3'
services:
  db:
    image: postgres
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
  test:
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -e test -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/app
      - bundle:/usr/local/bundle 
    ports:
      - "3001:3000"
    depends_on:
      - db
volumes:
  bundle:
```
Tương tự, chạy `docker-compose
			-f docker-compose.yml
			-f docker-compose.test.yml
		up` thì sẽ link cần truy cập là `localhost:3001`. Lý do ở `docker-compose.test.yml`, lệnh khởi động rails đã có `-e test` và mình đặt ở port 3001. Khi đó, khởi động cypress chỉnh lại `baseUrl` của `cypress.json` là ta có kết quả
        
   ![](https://images.viblo.asia/74837346-2118-4740-86f2-3971f85c47cc.png)
   
 À nhưng khi các bạn chạy `docker-compose down` thì xảy ra cảnh báo `orphan containers`.  Mình sẽ có phần giới thiệu về orphan container cũng như hậu quả sau. Còn để remove nốt các bạn sẽ dùng `docker-compose down  --remove-orphans`
 # Làm Makefile
 Vậy là chúng ta đã có 2 server riêng biệt để khởi động cho các mục đích khác nhau. Tuy nhiên số command nó đã nhiều lên cả về số lượng lẫn khối lượng. Vì vậy chúng ta phải làm đời đơn giản hơn bằng Makefile
```makefile
dev:
	@docker-compose down --remove-orphans && \
		docker-compose \
			-f docker-compose.yml \
			-f docker-compose.dev.yml \
		up

test:
	@docker-compose down  --remove-orphans && \
		docker-compose \
			-f docker-compose.yml \
			-f docker-compose.test.yml \
		up

clean:
	@docker-compose down  --remove-orphans
```
Và cuối cùng rất đơn giản: bật server dev thì ta dùng `make dev`, test thì `make test`, còn tắt hết thì `make clean`

Đó, ý tưởng là thế. Còn hiện tại thì đây là Makefile đầy đủ của mình:
```makefile
build:
	@docker-compose build

data:
	@docker-compose run web rails db:create db:migrate VERSION=xxxxxxxxxxxxxx && \
		docker-compose run db psql -h db -U postgres project_development < backup_db && \
	docker-compose run web rails db:migrate

dev:
	@docker-compose \
		-f docker-compose.yml \
		-f docker-compose.dev.yml \
	up

test:
	@docker-compose \
		-f docker-compose.yml \
		-f docker-compose.test.yml \
	up

clean:
	@docker-compose down --remove-orphans
```
Và giải thích thắc mắc tại sao `make data` của mình lại chơi migrate giữa chừng như thế kia?

Lý do ở đây là phiên bản `xxxxxxxxxxxxxy`(y=x+1), mình dùng counter_cache
```ruby
# db/migrate/xxxxxxxxxxxxxy_comments_count.rb
class CommentsCount < ActiveRecord::Migration[6.0]
  def up
    Post.find_each do |post|
      Post.reset_counters(post.id, :comments)
    end
  end
end
```
Vì vậy, việc migrate hết rồi mới restore db là không ổn cho lắm. Đây là lúc mình sẽ dừng migrate để restore, sau đó sẽ tiếp tục migrate. Vậy là ngoài làm gọn shell command cho project, Makefile cũng giúp kiểm soát luồng và thứ tự của command rất tốt.

Cảm ơn các bạn đã đọc bài viết của mình