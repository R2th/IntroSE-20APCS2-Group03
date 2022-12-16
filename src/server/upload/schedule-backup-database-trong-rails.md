# Giới thiệu

Vấn đề dữ liệu của người dùng là rất quan trọng. Vậy server admin phải backup dữ liệu thường xuyên.

 Ở đây mình sẽ sử dụng gem `backup` và gem `whenever` để thực hiện việc backup thường xuyên (hàng ngày, ...).
 
Gem `backup `được dùng để hỗ trợ việc backup một cách dễ dàng và hiệu quả với khá nhiều chức năng quan trọng:
 + backup files archives và databases (mongodb, mysql, postgresql, redis, riak)
 + storage (cloud_files, dropbox, ftp, local, rsync, s3, scp, sftp)
 + notifier (campfire, hipchat, http_post, mail, nagios, prowl, pushover, twitter)
 + ...


Gem `whenver` được dùng để tạo cronjob. Ở đây sẽ dùng để tạo backup cronjob.

# Cài đặt
### Gem backup

```ruby
#ruby < 2.5
gem 'backup', '~> 4.4', '>= 4.4.1'
# hoặc
gem install backup
```

```ruby
#ruby >= 2.5+
gem 'backup', '~> 5.0.0.beta.3'
# hoặc
gem install backup --pre
```

### Gem whenever
```ruby
gem 'whenever', require: false
#hoặc
gem install whenever
```

# Sử dụng
### Generate backup
Để tạo backup, đầu tiên mình phải run generator của backup gem để tạo config mình cần. 
Đây là những options mình có thể dùng tuỳ thuộc vào yêu cầu của mình.

```
Usage:
  backup generate:model -t, --trigger=TRIGGER

Options:
  -t, --trigger=TRIGGER            # Trigger name for the Backup model
      [--config-file=CONFIG_FILE]  # Path to your Backup configuration file
      [--databases=DATABASES]      # (mongodb, mysql, postgresql, redis, riak)
      [--storages=STORAGES]        # (cloud_files, dropbox, ftp, local, rsync, s3, scp, sftp)
      [--syncers=SYNCERS]          # (cloud_files, rsync_local, rsync_pull, rsync_push, s3)
      [--encryptor=ENCRYPTOR]      # (gpg, openssl)
      [--compressor=COMPRESSOR]    # (bzip2, custom, gzip)
      [--notifiers=NOTIFIERS]      # (campfire, hipchat, http_post, mail, nagios, prowl, pushover, twitter)
      [--archives]                 # Model will include tar archives.
      [--splitter]                 # Add Splitter to the model
```

Vi dụ: 
tạo backup cho:
+ tên backup: my_backup
+ database: mysql
+ storage: local
+ compressor: gzip
+ notifier: mail

```
$ backup generate:model --trigger my_backup  --databases='mysql' --storages='local' --compressor='gzip' --notifiers='mail'
```
```
$ Generated configuration file: '~/Backup/config.rb'.
$ Generated model file: '~/Backup/models/my_backup.rb'.
```
Nó sẽ generate ra 2 file như trên. Đó là những config default. 

Bây giờ mình phải vào my_backup.rb để update một số biến:

```ruby
#~/Backup/models/my_backup.rb

# encoding: utf-8

##
# Backup Generated: my_backup
# Once configured, you can run the backup with the following command:
#
# $ backup perform -t my_backup [-c <path_to_configuration_file>]
#
# For more information about Backup's components, see the documentation at:
# http://backup.github.io/backup
#
Model.new(:my_backup, 'Description for my_backup') do

  ##
  # MySQL [Database]
  #
  database MySQL do |db|
    # To dump all databases, set `db.name = :all` (or leave blank)
    db.name               = "my_database_name"
    db.username           = "my_username"
    db.password           = "my_password"
    db.host               = "localhost"
    db.port               = 3306
    db.socket             = "/tmp/mysql.sock"
    # Note: when using `skip_tables` with the `db.name = :all` option,
    # table names should be prefixed with a database name.
    # e.g. ["db_name.table_to_skip", ...]
    db.skip_tables        = ["skip", "these", "tables"]
    db.only_tables        = ["only", "these", "tables"]
    db.additional_options = ["--quick", "--single-transaction"]
  end

  ##
  # Local (Copy) [Storage]
  #
  store_with Local do |local|
    local.path       = "~/backups/"
    local.keep       = 5
    # local.keep       = Time.now - 2592000 # Remove all backups older than 1 month.
  end

  ##
  # Gzip [Compressor]
  #
  compress_with Gzip

  ##
  # Mail [Notifier]
  #
  # The default delivery method for Mail Notifiers is 'SMTP'.
  # See the documentation for other delivery options.
  #
  notify_by Mail do |mail|
    mail.on_success           = true
    mail.on_warning           = true
    mail.on_failure           = true

    mail.from                 = "sender@email.com"
    mail.to                   = "receiver@email.com"
    mail.cc                   = "cc@email.com"
    mail.bcc                  = "bcc@email.com"
    mail.reply_to             = "reply_to@email.com"
    mail.address              = "smtp.gmail.com"
    mail.port                 = 587
    mail.domain               = "your.host.name"
    mail.user_name            = "sender@email.com"
    mail.password             = "my_password"
    mail.authentication       = "plain"
    mail.encryption           = :starttls
  end

end
```
Như trên mình cần update tham số theo thực tế trong phần:
+ database
+ storage
+ Compressor
+ Notifier

Sau đó mình có thể chạy backup:
```
$ backup perform --trigger my_backup
```
Nếu không có error gì thì nó sẽ tạo file backup trong thư mục mình đã config ở trên.

### Tạo cronjob
```
$ cd /apps/my-great-project
$ bundle exec wheneverize .
```
Nó sẽ tạo `config/schedule.rb` dùng để config schedule.
Ví dụ: tạo backup hàng ngày lúc 12:00 PM

```ruby
every 1.day, at: "12:00 pm" do
  command "backup perform --trigger my_backup"
end
```

update cronjob:
``` 
$ whenever --update-crontab
```

Đến đây là xong.  Hàng ngày lúc 12:00 PM nó sẽ tạo backup và sẽ gửi email cho mình. Vậy mình sẽ không lo về việc mất dữ liệu nữa :).

# Reference
Bạn có thể tham khảo chi tiết hơn:

https://backup.github.io/backup/v4/

http://vladigleba.com/blog/2014/06/30/backup-a-rails-database-with-the-backup-and-whenever-gems/

https://github.com/javan/whenever