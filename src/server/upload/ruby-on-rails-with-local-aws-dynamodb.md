Mysql, hệ cơ sở dữ liệu đã quá quen thuộc với bất cứ lập trình viên nào hiện nay, tuy vậy cùng với sự phát triển của công nghệ và yêu cầu mới đặt ra có vẻ mysql với cấu trúc lưu trữ dữ liệu cũ giường như vẫn chưa đủ. 

Trong bài viết này mình xin giới thiệu đến các bạn `DYNAMODB` một dạng nosql đã và đang chinh phục được rất nhiều lập trình viên trên thế giới. 

AWS cho phép các bạn tải phiên bản DynamoDB từ trang chủ để phục vụ nhu cầu phát triển ứng dụng dưới môi trường development. Vậy chúng ta cùng bắt đầu bằng việc cài đặt DynamoDB để sử dụng trong ứng dụng Ruby on Rails


Về cơ bản trong bài viết sẽ có:
* Introduction
* Install Java
* Get downloadable DynamoDB
* Setup DynamoDB via shell
* Setup Rails project
* Connect Rails app to local DynamoDB


# 1. Introduction

Để thuận lợi cho quá trình phát triển ứng dụng AWS cho phép tải phiên bản đầy đủ của `DynamoDB` về local để cài đặt và sử dụng không cần kết nối trực tiếp tới AWS. Các bạn có thể tìm hiểu các phiên bản khác nhau của dịch vụ tại [đây](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.UsageNotes.html)

Trong lần này mình sử dụng demo dựa trên:

* Ruby 2.3.1
* Rails 5.0.1
* Ubuntu 16.04 LTS (Xenial)

# 2. Install Java

Để có thể sử dụng được `DynamoDB` chúng ta cần Java được chạy, các bạn có thể cài đặt java JRE hoặc JDK đều được:

```Ruby
$ sudo apt-get update
$ sudo apt-get install default-jre
```

*Note: Nếu bạn gặp phải lỗi 'E: dpkg was interrupted' các bạn có thể khắc phục bằng cách chạy lệnh `sudo dpkg –configure -a`, sau đó tiếp tục các bước để cài đặt java*

```Ruby
sudo dpkg --configure -a
```

# 3. Get downloadable DynamoDB

Để có nhiều thông tin hơn về version `DynamoDB` các bạn có thể tham khảo tại [đây](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html).
Một chú ý là đường url dưới đây có thể thay đổi, để chắc chắn đường url này tồn tại các bạn có thể check tại [đây](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)

```Ruby
wget https://s3-us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.tar.gz
```

Giải nén tập tin tải về bằng lệnh:
```Ruby
tar -xvzf dynamodb_local_latest.tar.gz
```

Phần download đã xong bây giờ chúng ta sẽ chạy `DynamoDB` bằng lệnh sau:
```Ruby
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

Nhận được log như dưới là thành công: 
```Ruby
Port:   8000
InMemory:       false
DbPath: null
SharedDb:       true
shouldDelayTransientStatuses:   false
CorsParams:     *
```

Hiện giờ `DynamoDB` đã chạy localhost trên cổng 8000 các bạn có thể run `http://localhost:8000/shell/` sẽ có kết quả như sau:
![](https://images.viblo.asia/62eb5bbb-b3c9-4f27-b162-cd0639651708.png)


# 4. Setup DynamoDB via shell

Hiện giờ chúng ta đã có `DynamoDB` chạy ở local, việc tiếp theo là thử thao tác những câu lệnh cơ bản như `create table`, `Insert`, . . . 

Chú ý là những thao tác trên các bạn hoàn toàn có thể thực hiện trên app đang phái triển hoặc cũng có thể dùng shell để tạo dữ liệu
Truy cập vào giao diện `DynamoDB` ở đường dẫn `http://localhost:8000/shell/` và làm theo như trong hình

![](https://images.viblo.asia/5cfd57d7-4f29-4b7c-976c-f8203ea8288d.png)

Các bạn có thể thấy đoạn code sample cho chức năng create table như sau:
```Ruby
var params = {
    TableName: 'my_table1',
    KeySchema: [ 
        { // Required HASH type attribute
            AttributeName: 'user_id',
            KeyType: 'HASH',
        }
    ],
    AttributeDefinitions: [
        {
            AttributeName: 'user_id',
            AttributeType: 'N',
        }
        
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1, 
    }
};
dynamodb.createTable(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});
```

Để insert một bản ghi vào trong DB sử dụng shell như dưới: 
```Ruby
var params = {
    TableName: 'my_table1',
    Item: { // a map of attribute name to AttributeValue
        user_id: 11,
        age: 19,
        phone: '55589xxx'
    }
};
docClient.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});
```

Tương tự với câu lệnh lấy item
```Ruby
var params = {
    TableName: 'my_table1'
};
dynamodb.scan(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});
```

# 5. Setup Rails project

Sử dụng câu lệnh sau để init một project Rails cơ bản bỏ qua active record. Đồng thời thêm gem file để có thể sử dụng dịch vụ của AWS

```Ruby
rails new my_app --skip-active-record
```

```Ruby
gem 'aws-sdk', '~>2'
```


# 6. Connect Rails app to local DynamoDB

1. Store AWS settings

Thiết lập các thông số của AWS trong `secrets.yml`
```Ruby
development:
  secret_key_base: 42xxx35
  dynamodb_access_key_id: <%= ENV["DYNAMODB_ACCESS_KEY_ID"] %>
  dynamodb_secret_access_key: <%= ENV["DYNAMODB_SECRET_ACCESS_KEY_ID"] %>
  region: <%= ENV["DYNAMODB_REGION"] %>
  
 
test:
  secret_key_base: 9dfcxxx5e
  dynamodb_access_key_id: <%= ENV["DYNAMODB_ACCESS_KEY_ID"] %>
  dynamodb_secret_access_key: <%= ENV["DYNAMODB_SECRET_ACCESS_KEY_ID"] %>
  region: <%= ENV["DYNAMODB_REGION"] %>
 
production:
  secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>
  dynamodb_access_key_id: <%= ENV["DYNAMODB_ACCESS_KEY_ID"] %>
  dynamodb_secret_access_key: <%= ENV["DYNAMODB_SECRET_ACCESS_KEY_ID"] %>
  region: <%= ENV["DYNAMODB_REGION"] %>
```

Hiển nhiên các thông số quan trọng này các bạn cần phải đặt tại biến môi trường của Ubuntu
2. Setup connection to local DynamoDB

Thêm file sau `config/initializers/aws.rb` với  nội dung
```Ruby
require 'aws'
```

Thêm file `lib/aws.rb` với nội dung
```Ruby
module Aws
  
 require 'time'
 
 # Initialiaze access to DynamoDB
 def self.init
 
   # Set up Client with settings from secrets.yml:
   if Rails.env.development?
   
    @client ||= Aws::DynamoDB::Client.new(
      endpoint: "http://localhost:8000",
      region: "localhost"
      )
   
   else
   
   @client ||= Aws::DynamoDB::Client.new(
        access_key_id: Rails.application.secrets.dynamodb_access_key_id,
        secret_access_key: Rails.application.secrets.dynamodb_secret_access_key,
        region: Rails.application.secrets.region
      )
   
   end
     
 end
 
 # Save records in DynamoDB table
 def self.save_items_to_my_table1(params)
   
   
   return if !@client
   
   resp = @client.put_item({
       item: {
        "user_id" => params['user_id'].to_i, 
        "age" => params['age'],  
        "created_at" => Time.now.utc.iso8601,
      }, 
      return_consumed_capacity: "TOTAL", 
      table_name: "my_table1",
   })
   
 end
 
 # Get all items from DynamoDB my_table1:
 def self.get_items
 
  resp = @client.scan({
    table_name: "my_table1", 
  })
  
  # Returns array of items:
  return resp.items
  
 end
 
end
```

Thêm cài đặt trong `config/environment.rb`
```Ruby
# Put after Rails.application.initialize!
Aws.init
```
# Use my_table1 in Rails app

Việc tạo `controller` và setup `routes` cũng tương tự như những ứng dụng khác. 

Dưới đây là demo code của `app/controller/my_table1_controller.rb`

```Ruby
class MyTable1Controller < ApplicationController
  
  
  def index
    @my_table1_items = Aws.get_items
  end
  
  def new
  end
  
  
  def create
 
    user_id = params['user_id']
    age     = params['age']
 
    aws_params = Hash.new
    #aws_params[:mob] = mob
    aws_params = {
        'user_id'    => user_id,
        'age'        => age
    }
    
    if Aws.save_items_to_my_table1(aws_params)
      flash[:notice] = "Created!"
    else
      flash[:error] = "Error!"
    end
    
    redirect_to my_table1_index_path
    
  end
  
  
end
```

Còn đây là form tạo mới `app/views/my_table1/new.html.erb`
```Ruby
<%= form_tag(my_table1_index_path) do %>
   <input type="text" required="" placeholder="user_id" value="" name="user_id">
   <input type="text" required="" placeholder="age" value="" name="age">
   <input type="submit" value="submit" name="submit">

```

Việc hiển thị dữ liệu sau khi lấy ra cũng rất dễ dàng

```Ruby
<h1>My Table 1</h1>
 
<ul>
	<% @my_table1_items.each do |t| %>
		<li>
			<p>User ID: <%= t['user_id'].to_i %></p>
			<p>Age: <%= t['age'] %></p>
			<p>Created at: <%= t['created_at'] %></p>
		</li>	
	<% end %>
</ul>
```

Thật dễ dàng phải không? Trên đây chỉ là demo cơ bạn giúp các bạn có cái nhìn sơ bộ về `DynamoDB` để tìm hiểu chi tiết về nó các bạn có thể tham khảo ở trang chủ của AWS đã có hướng dẫn đầy đủ và khá chi tiết.
*Thanks for reading!!!*