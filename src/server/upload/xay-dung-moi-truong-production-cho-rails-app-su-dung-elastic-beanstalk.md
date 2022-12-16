![](https://images.viblo.asia/d17c57ef-a240-40e0-ad0c-4711348aa976.png)

Do bài viết trước về EB bị downvote ghê quá, cũng tại mình viết không có tâm ;( nên mình viết bài có tâm hơn chút để bù cho bài bị downvote đó...
Mong anh em đọc và góp ý các cách làm hay hơn.

Đây là các bước tôi đã sử dụng để xây dựng môi trường production của một Rails app sử dụng Elastic Beanstalk của AWS, có cơ sở dữ liệu là Mysql, sử dụng S3 để lưu file và CloudFront để tăng tốc truy cập vào file.
Gồm các bước sau:
1. Tạo programmatic access IAM
2. Cài đặt server deploy trên EC2
3. Khởi tạo Database
4. Tạo mới S3 Bucket và CloudFront
5. Thiết lập môi trường Elastic Beanstalk

## Tạo programmatic access sử dụng IAM

- Vào service IAM > Users > Add User
- Nhập giá trị các mục theo bảng sau:

|Key|Value|
|---|---|
|User name|<tên user của bạn>|
|Access type|Programmatic access|
|Permissions|S3 Full Access Elastic, Beanstalk Full Access, Cloud Front Full Access|

Chú ý: đây không phải là thiết lập tối ưu nhất vì tôi đang dùng Full Access, bạn có thể thiết lập cụ thể hơn để tránh trao những quyền không cần thiết cho User.

Sau đó hãy download file *credentials.csv* về, ACCESS_KEY_ID và SECRET_ACCESS_KEY của user này sẽ được dùng cho biến môi trường và khi khởi tạo application của Elastic Beanstalk

## Cài server deploy trên EC2

### Khởi tạo instance EC2 để thực hiện deploy source code

#### Khởi tạo instance

- Vào service EC2 > Launch Instance và chọn các option như sau (có thể thay đổi tuỳ theo nhu cầu của bạn):

|Mục|Giá trị|
|---|---|
|AMI|Ubuntu Server 16.04 LTS (HVM), SSD Volume Type|
|Instance Type|t2.micro|

- Chọn *Review and Launch* > *Launch* > Create new key pair > Download Key Pair (Hãy lưu keypair này lại)
- Sau khi Download Key Pair, ta có thể Launch Instances.

#### Truy cập vào instance

- Thay đổi quyền access với key pair vừa download để có thể sử dụng nó để access vào instance:

```
chmod 600 ~/Downloads/<keypair name>.pem
```

- Truy cập vào server deploy vừa tạo:

```
ssh ubuntu@<server_ip> -i ~/Downloads/<keypair name>.pem
```

### Cài đặt nodejs

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev nodejs yarn
```

### Cài đặt rbenv

```
cd
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL

git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL
```

### Cài đặt Ruby

```
rbenv install <version>
```

### Cài đặt ssh-agent

- Khởi tạo SSH key mới

```
ssh-keygen -t rsa -b 4096 -C "<email>"
```

Hãy chọn thư mục default để lưu key và không thiết lập passphrase

- Khởi động ssh-agent ở background

```
eval "$(ssh-agent -s)"
```

- Add SSH private key vào ssh-agent

```
ssh-add -K ~/.ssh/id_rsa
```

- Copy public key vào mục *access key (deploy key)* trong github

```
cat /home/ubuntu/.ssh/id_rsa.pub
```

### Lấy code trên bitbucket/github về

```
git clone <git address>
```

### Cài đặt và thiết lập EB-CLI

- Cài đặt Python Development Libraries và Pip

```
sudo apt-get install python-dev
curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
sudo python get-pip.py
```

- Install EB-CLI

```
sudo pip install awsebcli
```

- Configure EB CLI

```
cd <project_path> #di chuyển vào thư mục chứa source code
eb init
```

Lần lượt thiết lập các giá trị như sau (phần này có thể thay đổi tuỳ môi trường bạn muốn thiết lập):

|Mục|Giá trị|
|---|---|
|Region|7 (Singapore)|
|AWS Access Key ID|* * * * * |
|AWS Secret Access Key|* * * * *|
|Application Name|2 (Tạo mới application, chọn application name và chọn platform là Ruby)|
|Platform Version|3 (Ruby 2.4 (Puma)|
|Do you wish to continue with CodeCommit?|Enter (default is No)|
|Do you want to set up SSH for your instances?|n (no)|

### Deploy project

- Tạo môi trường Elastic Beanstalk mới

```
eb create <environment_name>
```

Ở câu lệnh trên, môi trường Elastic Beanstalk mới đã được thiết lập nhưng vẫn chưa thể deploy thành công. 
Ta cần config lại ở các bước sau.

## Khởi tạo Database

- Mở service RDS của AWS

### Bật RDS instance

Launch RDS instance với các thiết lập như sau (có thể thay đổi tuỳ môi trường của bạn, các thiết lập khác để default):
|Mục|Giá trị|Giá trị|
|---|---|---|
|Select Engine|MySQL||
|Use case| Production - MySQL||
|Instance specifications|DB engine version|mysql 5.7.21|
|Instance specifications|DB instance class|db.m4.large - 2vCPU, 8GiB RAM|
|Specify DB details|Setting|DB instance identifier|<instance name>|
|Specify DB details|Setting|Master username|<user name>|
|Specify DB details|Setting|Master password|(chuỗi ký tự random)|
|Specify DB details|Setting|Confirm password|(chuỗi ký tự random)|
|Configure advanced settings|Network&Security|Public accessibility|No|
|Configure advanced settings|Network&Security|VPCsecurity groups|Default|
|Configure advanced settings|Database options|Database name|<db_name>|
|Configure advanced settings|Log exports|Error log, Slow query log|
|Configure advanced settings|Maintainance|Auto minor version upgrade|Disable|
    
### Thiết lập Security Group

- Vào RDS > Instances > <instance_name>
Ta sẽ nhìn thấy một loạt các thiết lập của instance

- Hãy chọn vào security groups của instance này

- Sau khi mở vào trang details của security group, chọn Inbound > Edit > Add Rule
Hãy thêm một Rule như sau:

|Type|Protocol|PortRange|Source|Description|
|---|---|---|---|---|
|MYSQL/Aurora|TCP|3306|Custom|**Security group của instance EC2 của Elastic Beanstalk**|

Sau đó chọn **Save**

## Tạo mới S3 bucket và CloudFront

### Tạo mới S3 bucket

- Vào service S3 > + Create bucket
- Tạo bucket S3 mới với các thiết lập sau (các thiết lập khác để default):

|Mục|Mục con|Giá trị|
|---|---|---|
|Name and region|Bucket name|<bucket_name>|
|Name and region|Region|Asia Pacific (Singapore)|

### Thiết lập CloudFront

- Vào service CloudFront > Create Distribution
- Chọn các thiết lập như sau và tạo mới Distribution

|Tên mục|Giá trị|Giá trị|Giá trị|
|---|---|---|---|
|Select a delivery method|Web|
|Create Distribution|Origin Settings|Origin Domain Name|s3-ap-southeat-1.amazonaws.com|
|Create Distribution|Origin Settings|Origin Path|/<bucket_name>|
|Create Distribution|Origin Settings|Origin ID|S3-<bucket_name>/<bucket_name>|
|Create Distribution|Origin Settings|Origin Protocol Policy|HTTP Only|

## Thiết lập môi trường Elastic Beanstalk

### Điều chỉnh biến môi trường

- Vào service Elastic Beanstalk, chọn môi trường vừa được tạo bằng EB CLI
- Chọn Configuration > Modify software
- Sau đó hãy điền giá trị các biến môi trường như sau đây:

|Mục|Giá trị|
|---|---|
|AVATAR_DEFAULT||
|AWS_ACCESS_KEY_ID|*Access key ID của IAM tạo ở bước 1*|
|AWS_REGION|ap-southeast-1|
|AWS_SECRET_ACCESS_KEY|*Secret access key của IAM tạo ở bước 1*|
|BUNDLE_WITHOUT|test:development|
|DATABASE_HOSTNAME||
|DATABASE_NAME|*Tên DB tạo của instance RDS tạo ở bước 3*|
|DATABASE_PASSWORD|*Password của instance RDS tạo ở bước 3*|
|DATABASE_USERNAME|<db_username>|
|DOC_PASS|*Tuỳ ý thiết lập, đây là password của Basic Authentication vào API DOCS*|
|DOC_USER|*Tuỳ ý thiết lập, đây là username của Basic Authentication vào API DOCS*|
|FCM_SERVER_KEY|*Thiết lập sau*|
|FIREBASE_PRIVATE_KEY|*Thiết lập sau*|
|RACK_ENV|production|
|RAILS_ENV|production|
|RAILS_SKIP_ASSET_COMPILATION|false|
|RAILS_SKIP_MIGRATIONS||
|SECRET_KEY_BASE|*Thiết lập sau*|
|SERVICE_ACCOUNT_EMAIL|*Thiết lập sau*|
|S3_ASSET_HOST|(lấy URL từ CloudFront mới tạo)|
|S3_BUCKET_NAME|*Tên bucket thiết lập ở bước 4*|

### Deploy application

Sau khi điều chỉnh xong các biến môi trường này, ta đã có thể deploy application lên Elastic Beanstalk bằng cách vào server deploy EC2 lúc đầu, và chạy lệnh sau đây:

```
eb deploy
```

### Chú ý

- Ta có thể config được loại instance EC2 sử dụng (tuỳ theo độ lớn của server cần dùng)
- Ta có thể config được Min - Max số lượng instance EC2 của Auto Scaling Group

bằng cách mở service Elastic Beanstalk > <app_name> > <env_name> Configuration > Instance/Capacity

## Kết luận

Chúc bạn tạo thành công server của mình.