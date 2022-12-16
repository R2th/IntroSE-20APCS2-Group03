Một công việc quen thuộc với các developer khi phát triển một dự án web là cài đặt môi trường phát triển. Khi join dự án, ban đầu dev sẽ nhận đc một danh sách các công nghệ sẽ sử dụng để dự án có thể vận hành trên môi trường production. Và tất nhiên dev cần tái hiện gần giống nhất môi trường production dưới local của mình, để tránh phát sinh trường hợp "ơ dưới máy em vẫn chạy bình thường mà" với new dev. 

Có nhiều cách khác nhau cho dev lựa chọn để thực hiện việc cài đặt này.
* Cách 1: bằng "tay". Đại loại là chúng ta sẽ ngồi gõ “sudo apt-get install package-abc package-xyz….”. Với những dự án mà việc cài đặt đơn giản thì thực hiện cách này cũng không có vấn đề gì lắm. Nhưng với những dự án mà tài liệu hướng dẫn cài đặt môi trường dài đến vài trang A4 thì đọc và làm theo nó step by step thật là ngán ngẩm và dễ phát sinh lỗi trong quá trình cài đặt (facepalm)
* Cách 2: sử dụng shell script. Là một bước nâng cấp so với cách 1. Việc cài đặt đã có thể thực hiện một cách tự động ở mức nào đó và có thể chia sẻ file cài đặt này giữa nhiều máy để tiết kiệm công sức. Tuy nhiên ta vẫn khó quản lý các thành phần cần cài đặt. Và shell script cũng là một trong những môn khoai nhất hồi còn là sinh viên, ít nhất là với đa số mọi người.
* Cách 3: sử dụng một công cụ quản lí các thiết lập cho server. Là một bước nâng cấp của cách 2 khi việc cài đặt có thể thực hiện tự động giữa nhiều máy và việc quản lý cũng dễ dàng.

Chúng ta sẽ đi tìm hiểu một công cụ quản lí các thiết lập cho server là Chef. Như đã nói ở trên Chef là một công cụ quản lý giúp cho việc config một hay nhiều server được thực hiện tự động và dễ dàng. Nhờ đó developer có thể giành thời gian và tâm trí cho việc phát triển sản phẩm của mình.

### Các khái niệm trong chef
* Chef Client: command line tool, để thực hiện các thao tác config server
* Chef Solo: một phiên bản của Chef Client cho phép config server mà không phụ thuộc vào bất kỳ server nào khác.
* Node: host chạy Chef Client, đó có thể là web server, database server...
* Recipes: các file Ruby chứa các câu lệnh chạy trên node để thực thi các tác vụ cài đặt hay cấu hình một service (nginx, apache, mysql...)
* Cookbook: tập hợp các Recipes phục vụ cho một chức năng lớn nào đó. Mỗi recipe chỉ nên thực hiện một chức năng đơn giản, sau đó các recipe đơn giản này được tập hợp trong một cookbook để thực hiện đầy đủ một chức năng phức tạp hơn.
* Template: là 1 file erb chứa các nội dung soạn sẵn cho các file config, html...trong đó ta có thể nhúng code ruby để linh hoạt trong việc sử dụng và tùy biến nội dung. Thường được sử dụng để tạo file config cho các service.
* Attribute: định nghĩa các biến được truyền trong Chef và có thể sử dụng ở recipes, templates.
* Resources: là nơi chứa đựng các resource của các node bao gồm files, directories, users và services.
* Role: gồm các file config có thể tái sử dụng ở nhiều node

### Ưu điểm của Chef?
* Ruby dễ đọc hơn rất nhiều so với shell script, hơn nữa nhiều dev lại biết sẵn ruby rồi. Và nếu bạn sử dụng Chef với vagrant, thì chỉ cần học ruby bạn sẽ viết được cả Chef và Vagrantfile, một công đôi việc.
* Có rất nhiều cookbook được chia sẻ trên supermarket của chef và cả các nguồn khác nữa. Như các công thức nấu ăn hay bản thiết kế in 3D vậy, bạn chỉ việc kéo chúng về và sử dụng chứ không cần xây dựng từ đầu. Thêm nữa những cookbook chất lượng cao được viết bởi các cao thủ sẽ được cộng đồng đánh giá cao với lượt tải lớn, do đó bạn dễ dàng tìm thấy chúng.
* Có thể thay thế cho tài liệu hệ thống. Với những đoạn code ruby rất clear và rành mạch thì những tài liệu hệ thống có thể không cần đến nữa
* Có khả năng làm việc với các hệ điều hành khác nhau một cách dễ dàng. Với Chef chúng ta dễ dàng detect các hệ điều hành khác nhau để đưa ra các hành động phù hợp. Ví dụ cùng một package nhưng mỗi OS sử dụng một lệnh khác nhau để cài đặt
```
case node['platform_family']
    when 'rhel', 'fedora'
        #some code here
    when 'debian'
        #some code here
    end
```
* Chef vừa có khả năng quản lý thiết lập cho 1 máy cũng như quản lý cho cả 1 hệ thống server của công ty
* Chef có thể tích hợp trong các platform điện toán đám mây phổ biến gồm Rackspace, Internap, Amazon EC2, Google Cloud Platform, OpenStack, SoftLayer, and Microsoft Azure để có thể tự động config nhiều server cùng lúc. Điều này rất hữu ích vì hiện nay nhu cầu sử dụng các platform này ngày càng tăng cao.

### Cài đặt
Do code Chef sử dụng ngôn ngữ Ruby nên việc đầu tiên là ta cần cài Ruby cho máy cần chạy Chef. Dao sắc không gọt được chuôi. Việc cài đặt Ruby đành phải thực hiện bằng tay, shell script hoặc một công cụ quản lí các thiết lập cho server thôi (yaoming).
Sau khi cài ruby bạn cài 2 gem knife-solo và librarian-chef để có thể bắt đầu thao tác với Chef. Nếu muốn thực hiện các thao tác nâng cao thì bạn có thể download và cài đặt Chefdk từ https://downloads.chef.io/chefdk. Chefdk bao gồm chef-client, an embedded version of Ruby, RubyGems, OpenSSL, key-value stores,... nói chung là tất cả những gì bạn cần có để làm việc với Chef.

```
yum install -y gcc-c++ patch readline readline-devel zlib zlib-devel libyaml-devel libffi-devel openssl-devel make bzip2 autoconf automake libtool bison iconv-devel sqlite-devel
curl -sSL https://rvm.io/mpapis.asc | gpg --import -
curl -L get.rvm.io | bash -s stable
source /etc/profile.d/rvm.sh
rvm reload
rvm requirements run
rvm install 2.1
gem install bundler

cat <<EOF >Gemfile
source "https://rubygems.org"
gem 'knife-solo'
gem 'librarian-chef'
EOF

bundle install
```

Sau đây mình sẽ giới thiệu 3 thao tác cơ bản và đơn giản nhất khi sử dụng Chef để cài đặt môi trường. Xin nhắc lại Chef là một công cụ cực kỳ mạnh và đây chỉ là 3 trong số rất nhiều các thao tác ta có thể thực hiện với Chef mà thôi. Nhưng như thế cũng là tạm đủ để công việc cài đặt của chúng ta đc thoải mái và chính xác hơn rất nhiều.

Khởi tạo thư mục làm việc với tên chef-repo-demo:
```
mkdir ~/chef-repo-demo
cd ~/chef-repo-demo
```
#### Làm việc với file
Đây là thao tác đơn giản nhất để tìm hiểu về Chef. Bạn sẽ cần dùng đến nó khi tạo file config của apache hoặc nginx chẳng hạn. Ví dụ kinh điển là sử dụng Chef tạo một file helloworld.txt với nội dung "hello world".

Tạo file hello.rb như sau:
```
file 'helloworld.txt' do
  content 'hello world'
end
```
Rồi sử dụng lệnh ```chef-apply file_name``` để thực thi code Chef vừa viết:
```
chef-apply hello.rb
```
Output nhận được như sau:
```
Recipe: (chef-apply cookbook)::(chef-apply recipe)
  * file[helloworld.txt] action create
    - create new file helloworld.txt
    - update content in file helloworld.txt from none to b94d27
    --- helloworld.txt	2018-05-27 15:02:39.766562300 +0000
    +++ ./.chef-helloworld.txt20180527-246-189odei	2018-05-27 15:02:39.764699300 +0000
    @@ -1 +1,2 @@
    +hello world


```
Một điều quan trọng là, nếu nội dung phần 'content' ở trên không thay đổi, hoặc đã tồn tại một file helloworld.txt với nội dung như vậy thì khi chạy lệnh trên ta sẽ nhận được output thông báo mọi thứ đã update và không có action nào được thực thi. May mắn là điều trên cũng được áp dụng với các tài nguyên như package và service. Nếu ta thực hiện install một package hay service với version đã tồn tại trong hệ thống thì hành động này sẽ được bỏ qua giúp tiết kiệm thời gian và tài nguyên.

Đây là cấu trúc đầy đủ của một block file trong Chef (bạn có thể tham khảo kỹ hơn tại https://docs.chef.io/resource_file.html)
```
file 'name' do
  atomic_update              True, False
  backup                     False, Integer
  checksum                   String
  content                    String
  force_unlink               True, False
  group                      String, Integer
  inherits                   True, False
  manage_symlink_source      True, False
  mode                       String, Integer
  notifies                   # see description
  owner                      String, Integer
  path                       String # defaults to 'name' if not specified
  rights                     Hash
  sensitive                  True, False
  subscribes                 # see description
  verify                     String, Block
  action                     Symbol # defaults to :create if not specified
end
```
#### Làm việc với package và service
Điều không thể thiếu khi cài đặt môi trường là cài đặt package và service. Nginx, httpd, php, nodejs, npm, yarn, git, open ssl...là những package và service thường xuyên được sử dụng trong các web server. Với Chef ta có thể cài đặt và quản lý nhiều service một cách đơn giản và rành mạch.
Cú pháp để cài đặt và khởi động nginx như sau:
```
########## install nginx ##########
['epel-release', 'nginx'].each do |p|
    package p do
        action :install
    end
end

########## start nginx ##########
service 'nginx' do
    action [:enable, :start]
end
```
Cấu trúc đầy đủ của một block pakage như sau:
```
package 'name' do
  allow_downgrade            True, False # Yum, RPM packages only
  arch                       String, Array # Yum packages only
  default_release            String # Apt packages only
  flush_cache                Array
  gem_binary                 String
  homebrew_user              String, Integer # Homebrew packages only
  notifies                   # see description
  options                    String
  package_name               String, Array # defaults to 'name' if not specified
  response_file              String # Apt packages only
  response_file_variables    Hash # Apt packages only
  source                     String
  subscribes                 # see description
  timeout                    String, Integer
  version                    String, Array
  action                     Symbol # defaults to :install if not specified
end
```
Cú pháp đầy đủ cho tất cả thuộc tính của resouce service:
```service 'name' do
  init_command               String
  notifies                   # see description
  options                    Array, String
  pattern                    String
  priority                   Integer, String, Hash
  reload_command             String
  restart_command            String
  service_name               String # defaults to 'name' if not specified
  start_command              String
  status_command             String
  stop_command               String
  subscribes                 # see description
  supports                   Hash
  timeout                    Integer # Microsoft Windows only
  action                     Symbol # defaults to :nothing if not specified
end
```
#### Làm việc với command
Một thao tác khác cũng khá thường xuyên được sử dụng đó là thực thi các command. Bởi vì không phải service nào cũng có thể cài đặt đơn giản thông qua các trình quản lý package mà chúng ta phải download về từ đâu đó rồi thực hiện. Và nhiều thao tác khác nữa cần thực thi bằng command.

Ví dụ cài đặt php composer:
```
execute 'download composer' do
    command 'curl -sS https://getcomposer.org/installer | php'
    not_if { File.exist?('/usr/local/bin/composer') || File.exist?('composer.phar') }
end

execute 'move to /usr/local/bin/' do
    command 'mv -f composer.phar /usr/local/bin/composer'
    not_if { File.exist?('/usr/local/bin/composer' || !File.exist?('composer.phar')) }
end
```

Đây là cấu trúc đầy đủ của một block thực thi command trong Chef:
```
execute 'name' do
  command                    String, Array # defaults to 'name' if not specified
  creates                    String
  cwd                        String
  environment                Hash # env is an alias for environment
  group                      String, Integer
  live_stream                True, False
  notifies                   # see description
  returns                    Integer, Array
  sensitive                  True, False
  subscribes                 # see description
  timeout                    Integer, Float
  umask                      String, Integer
  user                       String
  password                   String
  domain                     String
  action                     Symbol # defaults to :run if not specified
end
```

Đến đây ta đã có thể sử dụng Chef để cài đc rất nhiều các service và package phổ biến như nginx, apache, php, nodejs, mysql,... Sau đây là code đầy đủ để có thể cài đặt php7.1 và composer lên server Centos:
```
########################## install php
execute 'epel-release-latest-7' do
    command 'rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm'
    not_if 'rpm -qa | grep epel-release-7-[0-9]*.noarch'
end

execute 'install webtatic-release' do
    command 'rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm'
    not_if 'rpm -qa | grep webtatic-release*.'
end

%w(php71w-cli php71w-common php71w-curl php71w-json php71w-mbstring php71w-mcrypt php71w-mysql php71w-fpm php71w-pdo php71w-gd php71w-xml php71w-zip).each do |p|
    package p do
        action :install
    end
end

### start php-fpm
service 'php-fpm' do
    action [:enable, :start]
end

########################## install composer
execute 'download composer' do
    command 'curl -sS https://getcomposer.org/installer | php'
    not_if { File.exist?('/usr/local/bin/composer') || File.exist?('composer.phar') }
end

execute 'move to /usr/local/bin/' do
    command 'mv -f composer.phar /usr/local/bin/composer'
    not_if { File.exist?('/usr/local/bin/composer' || !File.exist?('composer.phar')) }
end

```


Ở bài viết sau ta sẽ tiếp tục tìm hiều các khái niệm cơ bản khác để sử dụng được Chef trong nhiều trường hợp hơn, đó là Cookbook, recipe và template.


#### Tham khảo:

https://viblo.asia/p/huong-dan-su-dung-chef-al5XRBd3GqPe

https://viblo.asia/p/tim-hieu-vagrant-phan-2-vagrant-chef-wznVGLqQvZOe

https://docs.chef.io/