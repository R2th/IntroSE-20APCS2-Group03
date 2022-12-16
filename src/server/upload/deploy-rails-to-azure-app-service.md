Hôm nay mình xin giới thiệu các bạn cách deploy 1 ứng dụng Rails sử dụng db Postgresql lên Azure App Service. Vậy Azure App Service là gì?
**Azure App Service** là một Platform cho phép ta tạo và deploy ứng dụng web/di động/API một cách nhanh chóng, nó khác biệt với Azure Virtual Machine là nó cho bạn sẵn platform bạn chỉ cần bỏ code vào chạy, chứ không cần phải cài đặt nhiều thứ. Bây giờ mình sẽ bắt đầu các bước để các bạn có thể connect được vào db từ local lên Azure cũng như deploy ứng dụng lên Azure App Service.
### 1. Cài đặt môi trường
Đầu tiên trên local của các bạn phải cài đặt đầy đủ những thứ sau:
1. Git
2. Ruby (phiên bản mới nhất)
3. Ruby on Rails
4. Postgresql

Việc cài đặt cũng như kết nối với Postgresql các bạn có thể tự tìm hiểu, mình sẽ không đề cập đến nữa nhé.
Tiếp theo chúng ta sẽ cần phải tạo 1 app Rails để có thể thực hiện việc deploy. Ở trên mạng đã có sẵn project sử dụng db là postgresql nên các bạn có thể clone về
`git clone https://github.com/Azure-Samples/rubyrails-tasks.git`
Tiếp tục các bạn chạy `rake db:create` `rake db:migrate` và sau đó `rails s` để kiểm tra xem ứng dụng chạy ngon lành không nhé   
5. Đăng kí dùng thử trên Azure
- Các bạn có thể truy cập vào link https://azure.microsoft.com/en-us/ chọn tạo tài khoản free nhé. Để có thể dùng gói free 1 năm này bạn cần phải có thẻ visa nhé. Sau khi tạo thành công bạn sẽ bị trừ khoảng 1$ gọi là phí chuyển đổi gì đấy. 
- Ngoài ra bạn được dùng free 1 năm một số service của Azure cũng như được tặng 200$ để có thể dùng tất cả các service của nó.

### 2. Sử dụng Azure Cloud Shell để tạo cài đặt dự án

Để có thể sử dụng Azure Cloud Shell thì có 2 cách là bạn vào https://portal.azure.com/ click vào biểu tượng `Cloud Shell` trên thanh công cụ phía trên bên trái hoặc vào link https://shell.azure.com
1. Tạo Resource Group
    Resource group để quản lý các resource (VM, database, cache) chung 1 dự án cho dễ. Vì vậy bạn sẽ thấy tất cả các config của mình đều đưa chung vào 1 resource group.
    Sau khi bạn đã vào được Azure Cloud Shell thì bạn nhập lệnh sau:
        `az group create --name myResourceGroup --location "Southeast Asia"`
    ở đây mình đặt tên cho server là `myResourceGroup`, còn location đây chính là nơi gần bạn nhất mà Azure cho phép.
3. Tạo Postgres Server
    Bạn chạy câu lệnh dưới đây để thực hiện tạo server cho Postgres, ở đây mình sử dụng gói General Purpose Gen 5_v2 (GP_Gen5_2), chỉ mất khoảng 0.2$/1h, 1 chút phí là bạn có thể vọc vạch thoải mái rồi
    
    `az postgres server create --location "Southeast Asia" --resource-group myResourceGroup --name <input-postgres-server-name> --admin-user adminuser --admin-password <input-password> --sku-name GP_Gen5_2`
    
    Ở đây mình sẽ tạo 1 server lên cái `resource group` mà mình vừa tạo ở trên. ở đây bạn sẽ cần phải nhập <input-postgres-server-name> và <input-password>. Và kết quả sẽ trả ra 1 đoạn JSON như sau:
    
    ```
    {
          "administratorLogin": "adminuser",
          "earliestRestoreDate": "2019-10-01T12:38:25.280000+00:00",
          "fullyQualifiedDomainName": "<postgres-server-name>.postgres.database.azure.com",
          "id": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.DBforPostgreSQL/servers/<postgres-server-name>",
          "location": "Southeast Asia",
          "name": "<postgres-server-name>",
          "resourceGroup": "myResourceGroup",
          "sku": {
            "capacity": 2,
            "family": "Gen5",
            "name": "GP_Gen5_2",
            "size": null,
            "tier": "GeneralPurpose"
          },
          < Output has been truncated for readability >
   }
              
4. Configure server firewall  
    Tiếp theo mình sẽ tạo tường lửa để cho phép các client kết nối vào nó.
              
     `az postgres server firewall-rule create --resource-group myResourceGroup --server <input-postgres-server-name> --name AllowAllIps --start-ip-address 0.0.0.0 --end-ip-address 255.255.255.255`
     
5. Tạo Database trên Postgres của Azure  
     Sau khi đã kết nối thành công ở bước 4, tại prompt của postgres bạn nhập những dòng sau 
     ```
       CREATE DATABASE sampledb;
       CREATE USER railsappuser WITH PASSWORD 'passpostgres';
       GRANT ALL PRIVILEGES ON DATABASE sampledb TO railsappuser;
     ```
6. Kết nối app đến Azure Postgres  
    Tiếp theo, khi đã clone cái project ở trên về, bạn thêm dòng này vào file `config/database.yml`
    ```
      production:
      <<: *default
      host: <%= ENV['DB_HOST'] %>
      database: <%= ENV['DB_DATABASE'] %>
      username: <%= ENV['DB_USERNAME'] %>
      password: <%= ENV['DB_PASSWORD'] %>
     ```
    Thực hiện export các file env và xem thử khi chạy với môi trường production có kết nối được đến Azure Postgres hay không.
    ```
    export DB_HOST=<postgres-server-name>.postgres.database.azure.com
    export DB_DATABASE=sampledb 
    export DB_USERNAME=railsappuser@<postgres-server-name>
    export DB_PASSWORD=passpostgres
    ```
    Thực hiện migrate lên production  
              
    ```
    rake db:migrate RAILS_ENV=production
    rake assets:precompile
    ```
    Như các bạn đã biết để deploy lên production thì chúng ta cần phải tạo 1 secret key, các bạn tiếp tục làm theo sau: 
    ```
    rails secret
    export RAILS_MASTER_KEY=<output-of-rails-secret>
    export SECRET_KEY_BASE=<output-of-rails-secret>        
    export RAILS_SERVE_STATIC_FILES=true     
    ```
    Sau đó bạn thực hiện `rails server -e production` để xem thành quả nhé.
### 3.  Deploy lên Azure.
3.1. Cài đặt tài khoản cho việc deploy

 FTP và local Git có thể dploy đến Azure thông qua deployment user, vì vậy chúng ta sẽ cần set user bằng lệnh sau
       ` az webapp deployment user set --user-name <username> --password <password> `
              
3.2.  Tạo App Service Plan

   Trước hết chúng ta sẽ nói qua 1 chút về App Service Plan. Ở đây sẽ có 2 khái niệm rất dễ nhầm lần là App Service Plan và App Service. Đối với App Service Plan nó giống như 1 con server, bạn sẽ cần phải tạo cái server này, còn App Service nó chính là những ứng dụng ta sẽ cài đặt lên App Service Plan. Để sử dụng nó mình sẽ dùng gói **Basic** khá rẻ các bạn có thể tham khảo giá ở đây https://azure.microsoft.com/en-us/pricing/details/app-service/windows/ . Để tạo App Service Plan bạn sử dụng câu lệnh sau: 
    ` az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku B1 --is-linux` 
   
Response trả ra sẽ có kết quản như bên dưới
```
{ 
  "adminSiteName": null,
  "appServicePlanName": "myAppServicePlan",
  "geoRegion": "Southeast Asia",
  "hostingEnvironmentProfile": null,
  "id": "/subscriptions/0000-0000/resourceGroups/myResourceGroup/providers/Microsoft.Web/serverfarms/myAppServicePlan",
  "kind": "linux",
  "location": "Southeast Asia",
  "maximumNumberOfWorkers": 1,
  "name": "myAppServicePlan",
  < JSON data removed for brevity. >
  "targetWorkerSizeId": 0,
  "type": "Microsoft.Web/serverfarms",
  "workerTierName": null
} 
   
```      
3.3 Tạo App Service
    Ở đây mình đang sử dụng ngôn ngữ Ruby nên cần phải set runtime là `Ruby | 2.6.2`. Trong câu lệnh này `deployment-local-git` là để bật chế độ deploy từ local của bạn, sau khi chạy xong câu lệnh dưới bạn sẽ có 1 app chạy bằng ngôn ngữ ruby, cứ tưởng tượng nó như lúc bạn tạo 1 project mới hoàn toàn trên github vậy.
    `az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name <app-name> --runtime "RUBY|2.6.2" --deployment-local-git`
     Và đây là kết quả:
```
      Local git is configured with url of 'https://<username>@<app-name>.scm.azurewebsites.net/<app-name>.git'
{
  "availabilityState": "Normal",
  "clientAffinityEnabled": true,
  "clientCertEnabled": false,
  "cloningInfo": null,
  "containerSize": 0,
  "dailyMemoryTimeQuota": 0,
  "defaultHostName": "<app-name>.azurewebsites.net",
  "deploymentLocalGitUrl": "https://<username>@<app-name>.scm.azurewebsites.net/<app-name>.git",
  "enabled": true,
  < JSON data removed for brevity. >
}
```
   **Lưu ý** Bạn sẽ cần phải lưu cái `https://<username>@<app-name>.scm.azurewebsites.net/<app-name>.git` để lần sau mỗi lần deploy thì bạn đẩy thẳng lên đây nhé.

3.4 Config Database và các biến môi trường   
      Để file `database.yml` có thể nhận các biến env thì bạn cần phải cài đặt nó trên App Service này, các biến env này bao gồm `DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD`, password ở đây chính là password mà bạn đã cài đặt ở bước tạo server postgres trên Azure nhé.     
          `az webapp config appsettings set --name <app-name> --resource-group myResourceGroup --settings DB_HOST="<postgres-server-name>.postgres.database.azure.com" DB_DATABASE="sampledb" DB_USERNAME="railsappuser@<postgres-server-name>" DB_PASSWORD="<input-your-password>"`   
      
   Tiếp tục sẽ như các bước deploy lên production:   
         - `rails secret`  
         -  `az webapp config appsettings set --name <app-name> --resource-group myResourceGroup --settings RAILS_MASTER_KEY="<output-of-rails-secret>" SECRET_KEY_BASE="<output-of-rails-secret>" RAILS_SERVE_STATIC_FILES="true" ASSETS_PRECOMPILE="true"`
     
3.5 Push code lên Azure từ Git   
     Ở local của bạn, tạo remote đến Git của Azure, url chính là chỗ lưu ý mình vừa nhắc ở trên nhé.                     
```
  git remote add azure <paste-copied-url-here>
  git add .   
  git commit -m "init project"  
  git push azure master  
```   
  Sau khi thành công các bạn vào đường dẫn `htp://<app-name>.azurewebsites.net` để xem kết quả nhé, ngoài ra có thể vào https://portal.azure.com vào cái App service plan để lấy cái url cũng như kiếm tra tất cả hoạt động của cái app mình nhé

### 4. Một số lỗi thường gặp  
   Trong quá trình deploy lên Azure mình chỉ gặp một vài lỗi nhỏ, nhưng do sử dụng chưa quen nên mò mẫm khá lâu. Mất thời gian nhất chính là sau khi deploy thì bị lỗi 500, như các biết lỗi 500 thường do lỗi project của mình, tuy nhiên không biết xem log ở đâu nên khá mất thời gian. Để giải quyết vấn đề này, bạn cứ vào https://portal.azure.com rồi chọn cái App service plan mà bạn tạo, ở mục Deployment Center -> FTP sẽ hiện ra cái dòng FTPS  Endpoint, nó sẽ nhảy đến 1 trang web mới chính là nơi chứa thư mục dự án, các bạn tìm đến folder `log/production.log` xem log nhé. Lỗi của mình là do setting biến env password của DB bị sai :pensive:
      
   Mình xin kết thúc bài hướng dẫn ở đây, sau khi đăng kí tài khoản nó cấp cho bạn 200$ nên cứ thoải mái mà nghịch nhé. Do mình sử dụng hết 200$ từ lâu, nên xóa hết cái đống dự án mình deploy lên nên không có hình ảnh chân thực để các bạn có thể dễ quay tay tưởng tượng. Nếu có gì không hiểu vui lòng comment ở dưới bài viết ợ...