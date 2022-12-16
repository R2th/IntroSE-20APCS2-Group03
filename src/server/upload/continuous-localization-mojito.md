Mojito là một flatform hỗ trợ cho việc dịch (đa ngôn ngữ), tạo và import translation packages với một cú click.
Có thể search và chỉnh sửa translation

Mojito là một flatform miễn phí bạn có thể tự cài đặt trên server của mình

Full document dễ dàng cho việc sử dụng

# Các tính năng

- Push string cần được translatte lên
- Pull string sau khi đã được translate
- Check content của translation như: Place holder, validation ...
- Sử dụng translation trước đó để hỗ trợ cho việc refactoring
- Generates XLIFFs

# Cài đặt

Mojito sử dụng brew để cài dặt đối với ubuntu bạn có thể sử dụng linuxbrew lib

```
brew tap box/mojito
brew install mojito-cli
brew install mojito-webapp
```

sau khi cài đặt xong sử dụng câu lệnh dưới đây để chạy webapp

```
mojito-webapp
```

run CLI với câu lệnh

```
mojito
```

Default configuration location:

```
usr/local/etc/mojito/cli/application.properties
usr/local/etc/mojito/webapp/application.properties
```

Ngoài ra Mojito cũng có một cách khác để cài đặt đó là sử dụng Excutable Jars  bạn có thể tham khảo thêm ở đây http://www.mojito.global/docs/guides/install/#setup

Mặc định thì việc cài đặt sẽ sử dụng HSQL in-memory database, database authentication và chạy trên cổng 8080
Nhưng đối với môi trường production thì nên sử dụng MySQL

User mặc định là admin/ChangeMe bạn có thể chỉnh sửa thay đổi theo hướng dẫn từ đây http://www.mojito.global/docs/guides/manage-users/#bootstraping

## Server port

Server port có thể thay đổi ở config `server.port`

## MySQL

Cài đặt MySQL 5.7 và tạo database cho mojito

Sử dụng brew để cài đặt

```
brew install mysql@5.7
```

Connect tới Mysql db với root user

mysql -u root

Tạo user ${DB_USERNAME} with ${DB_PASSWORD}

```
mysql> CREATE USER '${DB_USERNAME}'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';
```

Tạo database name và cho full quyền access

```
mysql> CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin';
mysql> GRANT ALL ON ${DB_NAME}.* TO '${DB_USERNAME}'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';
mysql> FLUSH PRIVILEGES;
```

### Config mojito để sử dụng MySQL

```
flyway.enabled=true
l10n.flyway.clean=false
spring.jpa.database=MYSQL
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=none
spring.datasource.url=jdbc:mysql://localhost:3306/${DB_NAME}?characterEncoding=UTF-8&useUnicode=true
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driverClassName=com.mysql.jdbc.Driver
spring.datasource.testOnBorrow=true
spring.datasource.validationQuery=SELECT 1

l10n.org.quartz.jobStore.useProperties=true
l10n.org.quartz.scheduler.instanceId=AUTO
l10n.org.quartz.jobStore.isClustered=true
l10n.org.quartz.threadPool.threadCount=10
l10n.org.quartz.jobStore.class=org.quartz.impl.jdbcjobstore.JobStoreTX
l10n.org.quartz.jobStore.driverDelegateClass=org.quartz.impl.jdbcjobstore.StdJDBCDelegate
l10n.org.quartz.jobStore.dataSource=myDS
l10n.org.quartz.dataSource.myDS.driver=com.mysql.jdbc.Driver
l10n.org.quartz.dataSource.myDS.URL=jdbc:mysql://localhost:3306/${DB_NAME}?characterEncoding=UTF-8&useUnicode=true
l10n.org.quartz.dataSource.myDS.user=${DB_USERNAME}
l10n.org.quartz.dataSource.myDS.password=${DB_PASSWORD}
l10n.org.quartz.dataSource.myDS.maxConnections=12
l10n.org.quartz.dataSource.myDS.validationQuery=select 1
```

## CLI

Default CLI config sẽ map tương ứng với Default server config và cho phép server mà không cần chứng thực
Để access vào production instance, thì server url và port phải được config

```
l10n.resttemplate.host=${HOSTNAME}
l10n.resttemplate.port=${PORT}
l10n.resttemplate.authentication.credentialProvider=CONSOLE
```

# Sử dụng

## Tạo một repository

```
mojito demo-create -n translation-repo
```

Lệnh trên sẽ tạo ra một folder translation-repo với một file demo.properties bên trong
![](https://images.viblo.asia/7dfdec49-d665-4a11-8eed-e5173780c1cd.png)
## Tạo localized files

```
cd translation-repo
mojito pull -r translation-repo
```
![](https://images.viblo.asia/290f0196-92b8-4437-a79b-03c97845446c.png)

## thêm một string mới

```
printf "\nFOR_DEMO=Add a string for the demo" >> demo.properties
mojito push -r translation-repo
```

Sau đó bạn có thể vào server `localhost:8080` để xem key mới được thêm vào trong translation-repo và thực hiện translate

![](https://images.viblo.asia/a59e4cda-b40f-4572-baa1-4f40f6da8004.png)

## Pull file đã được translate

```
mojito pull -r translation-repo
```

Lệnh này sẽ pull những translation đã được chỉnh sửa trong folder `translation-repo`

# Nguồn tham khảo 

http://www.mojito.global/docs/
https://github.com/box/mojito