Đối với việc quản lý version của từng record trong Database, có lẽ một số bạn đã không còn xa lạ, nghiễm nhiên trở thành một vấn đề bình thường khi thao tác với DB. Nhưng đối với một số bạn newbie thì đây là một vấn đề ít/không được đề cập rõ ràng lúc đi học. Mình xin viết một bài nho nhỏ để tìm hiểu lại kỹ càng và chia sẻ...

# 1. Vậy trước tiên version là gì?
Đối với 1 record trong DB, user sẽ thao tác xử lý với nó nhiều lần, có thể là Create/Update/Delete. Đối với một trang web/app được cùng lúc nhiều người sử dụng, sẽ có trường hợp nhiều người dùng lại đang tương tác với cùng một đối tượng/record trong DB, hoặc nói đơn giản hơn, ta cần tracking việc tương tác của người dùng lên một đối tượng. 

Ta sẽ có một column/property của 1 record được gọi chung là **version** để đảm nhiệm việc này. 
```
public class Product {

private long id;

private String name;

private String model;

private double cost;

   private long version;

}
```
Ở trường hợp INSERT => Version default auto insert là 0, nếu có người update chính record này, trường version sẽ được update lên 1 => Đã có 1 sự thay đổi.....vv. 

Ví dụ : *Trong khi User A đã query và update record X, thì User B đã saved record X với một số sự thay đổi dữ liệu(với version += 1 so với thời điểm trước khi User A thực hiện saved dữ liệu record X xuống DB) ==> Văng Exception/văng alert ==> Tracking được flow nhé* 

Và như tiêu đề mình đã nhắc, mình sẽ tìm hiểu về version thông qua Hibernate và Java Spring. May thay, hibernate đã mặc định hỗ trợ việc quản lý tự động đối với version. Và thường các trường **version** này sẽ được lưu trữ dưới kiểu dữ liệu là numeric/timestamps

# 2. Config version với Hibernate và Java
Việc mapping giữa Hibernate và Java có 2 cách : Annotation và XML
- Đối với XML, trong file mapping xml khai báo về cấu trúc của 1 table, ta có thể sử dụng tag <version> để define thay vì sử dụng tag <property> như các property khác.
```
<version name=”version” type=”long” />
```
    
- Hoặc sử dụng annotation, một cách được recommended hơn thay vì sử dụng cách cũ kỹ là config bằng XML
```
@Version
public long getVersion() {
return version;
}
```

- Và thay vì sử dụng version có kiểu dữ liệu là numeric, mình cũng đã nhắc về việc sử dụng kiểu dữ liệu là timestamp. Nhưng vấn đề là không hẳn toàn bộ các loại DB đều hỗ trợ việc truy vấn database timestamp hiện tại.
```
<timestamp name=”version” source=”db”/>
```

# 3.Result
Thường thì sql khi execute sẽ generate ra một câu như này :
```
UPDATE TABLE_NAME
set DESCRIPTiON=?, STATUS=?, version=*updated version
where id=? and version=*old version
```

Vậy khi trong trường hợp 2 user cùng update 1 record/bảng ghi có *version=1* trong 1 thời gian gần như là cùng lúc, thì flow của sql sẽ xử lý như này:

1. User 1
```
UPDATE TABLE_NAME
set DESCRIPTiON='des', STATUS=true, version=2
where ID=1 and VERSION=1
```
và câu lệnh được thực thi thành công sau khi commit. 

2. Trong khi đó, User 2 cũng vừa update xong và gửi request chính record này :
```
UPDATE TABLE_NAME
set DESCRIPTiON='des2', STATUS=false, version=2
where ID=1 and VERSION=1
```
và tất nhiên do version của record có ID=1 này đã được update thành 2 nên việc update record này sẽ có kết quả là fail. Và lỗi thì sẽ văng ra một kiểu exception là org.hibernate.StaleObjectStateException

![](https://images.viblo.asia/bdff671b-f4c1-4653-bd72-3e6a13062ec1.png)

Ở trên là một ví dụ đơn giản để các bạn có một cái nhìn khái quát về việc sử dụng version. Cảm ơn đã đọc