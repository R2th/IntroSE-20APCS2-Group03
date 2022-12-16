Tạo và trích xuất data hàng loạt vào file CSV bằng ApacheJMeter

(Lưu ý: bài viết dành cho những bạn đã có kiến thức cơ bản về Jmeter )


Cuộc đời Tester chắc chắn bạn sẽ gặp các yêu cầu như Login 100 tài khoản để sinh ra token của từng tài khoản, sau đó dùng token lấy được để làm các thao tác gì đấy ( tạo post khẩu nghiệp chẳng hạn ) :-? vậy thì token lấy được sau khi login 100 tài khoản mình nhét vào đâu bây giờ. Nếu bạn quyết định login và lấy token bằng tay thì cuộc đời tester của bạn hơi bị ngắn, mình sẽ hướng dẫn các bạn cách trích xuất dữ liệu lấy được từ response data của Jmeter vào file CSV. Một TIP nhỏ nhưng tính ứng dụng cao .


Giả sử mình có tình huống thế này:  Call API để tạo mới Warehouse và Tenant, WarehouseID và TenantID trả về từ response data sau khi call API cần được lưu trữ vào file CSV để sử dụng sau này.  Chúng ta dùng Regular Expression Extractor để lấy WarehouseID và TenantID từ response data. Tiếp theo, để lưu trữ vào file CSV thì chúng ta cần sử dụng BeanShell PostProcessor .

P/s: Vì lý do bảo mật nên mình không show thông tin API, hình demo chỉ show những đoạn data cần lấy, mong các bạn thông cảm. 

Step 1:

![](https://images.viblo.asia/11e5316f-ca8a-43e3-bc2d-79100e530806.png)

Call API để tạo mới Warehouse + Tenant.


![](https://images.viblo.asia/4f73e63d-9c9d-4262-85ed-c8caf5de022a.png)

Đây là response data trả về sau khi call API, nhiêm vụ của ta là dùng Regular Expression Extractor để lấy WarehouseID và TenantID ( 2 ô được khoanh đỏ ) .

Regular expression để lấy WarehouseID như bên dưới:

![](https://images.viblo.asia/f94467d7-f5c7-4e59-b797-97d14ad5ea25.png)

Regular expression để lấy TenantID như bên dưới:

![](https://images.viblo.asia/cc466337-660d-4089-93a1-677bc06b6623.png)

Step 2:
Bây giờ, chúng ta đã có WarehouseID và TenantID được lưu trữ trong các biến warehouseID và tenantsID . Chúng ta cần thêm BeanShell PostProcessor bên dưới HTTP Request, viết mã dưới đây vào BeanShell PostProcessor :

![](https://images.viblo.asia/53bc1453-40de-41c7-b31e-2b7d37974c50.png)

```
warehouse = vars.get("warehouseID"); // get data from var warehouseID
tenant = vars.get("tenantsID"); // get data from var tenantsID 
 
f = new FileOutputStream("D://csvfile/result.csv", true); //specify true if you want to overwrite file. Keep blank otherwise.
p = new PrintStream(f);
this.interpreter.setOut(p);
print(warehouse+ "," + tenant); 

f.close();
```




D://csvfile/result.csv là đường dẫn đến file CSV mà chúng ta cần lưu trữ data, ta cần tạo sẵn 1 file csv với tên file và tên folder đúng như trong đường dẫn ở trên. Công tác chuẩn bị đã xong rồi, chạy thử với 50 lần chạy thử nhé :-?
![](https://images.viblo.asia/da43d37a-8f32-4b89-85f6-a251a646bfdd.png)

Mở file CSV để lấy thành quả thôi nào (go)
![](https://images.viblo.asia/bd220ff1-b933-4947-99ea-38bb3659cf81.png)

Đủ 50 cặp WarehouseID và TenantID được tạo sau khi chạy API nhé :d