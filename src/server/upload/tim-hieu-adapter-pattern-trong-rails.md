![](https://images.viblo.asia/59b76b36-adaf-4df3-a75d-6665bf6789d6.jpg)

Nếu là một web developer chắc hẳn chúng ta đã không ít lần đọc qua về các Design patterns hay cách áp dụng chúng để làm cho code trở nên hướng đối tượng hơn, dễ đọc, dễ hiểu, dễ maintain, dễ mở rộng, … Các design patterns được áp dụng khá nhiều trong các Rails projects như Service Object, Decorators, Form Object, Query Objects, Policies, Null Objects, … Những design patterns này có lẽ đã khá quen thuộc nên trong bài viết này ta sẽ cùng tìm hiểu 1 design pattern rất hiệu quả khác đó là Adapter Pattern. <br>
# 1. Giới thiệu
> Adapters là các objects được sinh ra với mục đích đóng gói các công việc gọi API của bên thứ 3. <br>

Adapters có thể coi là 1 abstraction layer bên trên mỗi khi chúng ta gọi API ra bên ngoài. Tất cả các công việc như tạo input, call api, xử lý dữ liệu trả về, … sẽ được nhóm chung vào 1 chỗ để dễ quản lý. Đồng thời nếu trong tương lai, chúng ta muốn thay đổi gem đã dùng để gọi API, chúng ta có thể dễ dàng chuyển đổi hơn, chỉ cần tìm và thay thế 1 chỗ chứ không phải sửa trong toàn project. <br>
Trong Rails, Adapter objects được đặt ở **/app/adapters/folder** <br>
# 2. Đặt vấn đề
Giả sử ta cần làm một task như sau: Gọi API của Instagram với 1 access token có sẵn, sau đó lấy về feed của tài khoản đó.
## Solution 1
Ta có thể làm việc này rất đơn giản, chỉ cần viết API call trong controller hoặc trong Service Object: Tạo Instagram client trong controller bằng token có sẵn, sau đó gọi API và lấy kết quả trả về <br>
``` ruby
    class InstagramsController < ApplicationController
      Rails.application.secrets.instagram_access_token

      def index
        instagram_client = Instagram.client(access_token: INSTAGRAM_ACCESS_TOKEN)
        feed = instagram_client.user_recent_media

        render json: feed
      end
    end
```
Có 1 nhược điểm mà ta có thể nhận thấy, đó là những đoạn code của chúng ta có thể bị trùng lặp, và nằm ở nhiều nơi. Nếu sau này muốn thay thế gem khác (hoặc có thể code của gem thay đổi) thì sẽ gặp khó khăn trong việc search trong project và sửa lại code. <br>
## Solution 2
Chúng ta sẽ tách phần gọi API của Instagram ra 1 chỗ, InstagramAdapter. Các dữ liệu cần thiết để khởi tạo client cũng sẽ được move vào trong Adapter class. Bằng cách này, chúng ta sẽ dễ chuyển đổi gem với 1 gem khác. Bên cạnh đó, ta cũng đảm bảo được Single Responsibility Prrinciple, do InstagramAdapter class chỉ có nhiệm vụ là handle việc gọi API tới Instagram. <br>
``` ruby
    class InstagramsController < ApplicationController
      def index
        render json: instagram_client.recent_media_with_location
      end

      def instagram_client
        InstagramAdapter.new
      end
    end
```

``` ruby
    # app/adapters/instagram/instagram_adapter.rb
    class InstagramAdapter
      INSTAGRAM_ACCESS_TOKEN = "token"

      def initialize
        @client = Instagram.client(access_token: INSTAGRAM_ACCESS_TOKEN)
      end

      def recent_media
        @recent_media ||= @client.user_recent_media(count: 20)
      end

      def recent_media_with_location
        recent_media.reject { |item| item.location.nil? }
      end
    end
```
Như vậy, việc gọi API tới Instagram đã được tách hẳn ra bên ngoài. Nếu như gọi tới nhiều API của 1 bên thứ 3 khác chúng ta cũng có thể tạo nhiều Adapter.  <br>
Ví dụ chúng ta cần gọi dữ liệu liên quan tới Commit và Repo trên Github, ta có thể chia thành 2 adapters: app/adapters/github/commits_adapter.rb và app/adapters/github/repos_adapter.rb thừa kế từ app/adapters/github/base_adapter.rb. Khá dễ dàng để quản lý và mở rộng. <br>
Tuy nhiên, tới đây chúng ta lại gặp phải 1 vấn đề: Nếu như chúng ta muốn xây dựng 1 wrapper đầy đủ để tương tác với API của bên thứ 3 (bao gôm việc handle requests/response khi gọi API đó) thì việc chỉ sử dụng adapters là không đủ. <br>
Ví dụ như khi gọi API, dữ liệu trả về ở dạng XML nhưng chúng ta lại muốn sử dụng dạng JSON chẳng hạn. Nếu như gem chúng ta dùng không đáp ứng đầy đủ được, chúng ta sẽ phải tìm 1 giải pháp hợp lý khác. (Thay vì việc viết thêm hàm vào trong Adapter để xử lý response trả về ) <br>
Để giải quyết vấn đề này, chúng ta sẽ xây dựng Serializers và Deserializers Objects. Trong đó: Serializers sử dụng để xử lý đầu vào trước khi nó được gửi lên server của bên thứ 3. Deserializers sử dụng để parse responses trả về từ API <br>
## Deserializers Objects
Trong thực tế, chúng ta rất dễ gặp những trường hợp như format của response trả về từ API không phù hợp với việc chúng ta đang cần làm. <br>
Deserializers được lưu ở /app/adapters/{api_service}/deserializers/. Trong đó api_service có thể là facebook, github... Ví dụ: <br>
``` ruby
    module Instagram
      module Deserializers
        class RecentMedia
          attr_reader :response_body

          def initialize(response_body)
            @response_body = response_body
          end

          def success?
            stripped_response_body[:response_code] == "0"
          end

          def failed?
            !success?
          end

          def status_code
            stripped_response_body[:response_code]
          end

          def status_message
            stripped_response_body[:response_code_description]
          end

          private

          def stripped_response_body
            @stripped_response_body ||=
              @response_body[:hosted_page_authorize_response][:hosted_page_authorize_result]
          end
        end
      end
    end
```
Khi đã có Deserializer này rồi, chúng ta sẽ dễ dàng xử lý response trả về trong Adapter: <br>
``` ruby
    module Adapters
      class InstagramAdapter
        INSTAGRAM_ACCESS_TOKEN = "token"

        def initialize
          @client = Instagram.client(access_token: INSTAGRAM_ACCESS_TOKEN)
        end

        def recent_media
          Instagram::Deserializer::RecentMedia.new(raw_recent_media)
        end

        def recent_media_with_location
          recent_media.reject { |item| item.location.nil? }
        end

        private

        def raw_recent_media
          client.user_recent_media(count: 20)
        end
      end
    end
```
## Serializer Objects
Serializers Objects được dùng để chuẩn bị dữ liệu trước khi gửi nó lên trên server. Nó đặc biệt hữu dụng khi chúng ta dùng để tạo xml request. <br>
``` ruby
    module Serializer
      class InstagramSerializer
        def initialize(id)
          @id = id
        end

        def method
          "post"
        end

        def request_body
          @xml_request_body ||= "<?xml version='1.0'?>" + Insta.xml(
            method_call: {
              method_name: "feeds",
              params: {
                param: {
                  value: {
                    struct: {
                      member: [
                        {
                          name: "content_id",
                          value: { int: @id }
                        },
                        {
                          name: "omit_author_data",
                          value: { int: 1 }
                        },
                        {
                          name: "get_basic_data",
                          value: { boolean: 1 }
                        }
                      ]
                    }
                  }
                }
              }
            }
          )
        end
      end
    end
```

``` ruby
    module Instagram
      module Adapter
        class InstagramAdapter < BaseAdapter
          def feed(id)
            @id = id
            InstagramSerializer.new(fetch_feed)
          end

          private

          def fetch_feed
            execute_request InstagramSerializer.new(@id)
          end
        end
      end
    end
```
trong BaseAdapter, chúng ta sẽ viết 1 hàm excute_request chung cho tất cả các adapters để các adapter có thể gọi tới API được. <br>
``` ruby
    module MyModule
      module Adapter
        class BaseAdapter

          API_BASE_URL = "http://www.instagram.com/api/"

          def self.execute_request(request)
            RestClient::Request.execute(request.method,
                                        url: API_BASE_URL,
                                        payload: request.body,
                                        headers: { content_type: "application/xml" }
                                       )
          end
        end
      end
    end
```

Như vậy, chúng ta có thể thấy, lợi ích của việc sử dụng Adapter Objects là: <br>
- Giúp tạo ra 1 abstraction layer xung quanh việc sử dụng API bên ngoài. Bằng cách này, chúng ta sẽ tách sự phụ thuộc vào lib ra 1 chỗ riêng, sẽ dễ để maintain/ scale sau này.
- Tiện dụng cho việc testing (do nó đã được tách thành các object riêng biệt, có đầu vào - trong serializer và đầu ra - trong deserializer).
- Code hướng đối tượng hơn <br>

Hy vọng thông qua bài viết, mọi người có thể nắm được nguyên lý cơ bản của Adapter Pattern để áp dụng vào projects của mình. Hẹn gặp lại!
# Reference
https://blog.arkency.com/2014/08/ruby-rails-adapters/ <br>
http://rustamagasanov.com/blog/2014/11/16/adapter-design-pattern-usage-in-rails-application-on-examples/ <br>
https://www.thegreatcodeadventure.com/rails-refactoring-part-i-the-adapter-pattern/