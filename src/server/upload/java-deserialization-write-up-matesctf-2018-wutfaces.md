# Mở đầu

Bài ctf này là 1 bài rất hay về lỗ hổng java deserialization mà các bạn muốn tìm hiểu về lỗ hổng này nên làm. Mức độ kiến thức trong bài cũng khá cao. Thông qua bài này chúng ta có 1 cái nhìn tổng quan về lỗ hổng cũng như focus ta vào cách viết PoC 1 day. Một lĩnh vực khá là thú vị. Cảm ơn bài viết [MatesCTF 2018 WutFaces & CVE-2013-2165](https://web.archive.org/web/20190501081457/https://tint0.com/matesctf-2018-wutfaces-cve-2013-2165/) của anh **@tint0**. Bài viết của anh không đi vào chi tiết mà mang tính gợi mở để chúng ta tự phải debug, tự xây dựng lại Poc. Và cũng cảm ơn anh [**@peterjson**](https://twitter.com/peterjson) đã hướng dẫn em để có thể tìm hiểu về lỗ hổng java deserialization này. 

# Giới thiệu
Do bài ctf này diễn ra cũng khá là lâu rồi, nên mình không thể get flag từ server được nữa, mục đích chỉ đến RCE được thôi nha. Source code của bài các bạn có thể lấy từ [https://firebasestorage.googleapis.com/v0/b/blog-resources-3df04.appspot.com/o/ctf_wutfaces_resources.zip?alt=media&token=041ca951-b2fc-4dc9-a8e9-484639cff28d](https://firebasestorage.googleapis.com/v0/b/blog-resources-3df04.appspot.com/o/ctf_wutfaces_resources.zip?alt=media&token=041ca951-b2fc-4dc9-a8e9-484639cff28d). 
# Nhắc lại một số kiến thức
* Source: là điểm bắt đầu của gadgetchain. Khi deser, java sẽ gọi method readObject() của source Object.
* Sink: sau khi ghép nối các chain thì sẽ dẫn tới sink, hay cách khác, sink chính là điểm cuối của gadgetchain. Thường sink sẽ có các metod hữu ích như Reflection method invoke, file write, …
* Reflection in java: đây là 1 API của java, cho phép truy xuất, sửa đổi hành vi của method, field, class, interfaces. Do vậy việc tìm hiểu và viết được gadgetchain phụ thuộc rất nhiều vào cái Java Reflection. (for more detail: https://www.geeksforgeeks.org/reflection-in-java/, [https://o7planning.org/vi/10155/huong-dan-java-reflection](https://o7planning.org/vi/10155/huong-dan-java-reflection))
* Method call: method A gọi method B, method A -> method B 
## Gadget and chains
Về cơ bản Gadget là 1 công cụ hoặc 1 chức năng mình dùng để khai thác. Cụ thể như sau. Thuật ngữ Gadget được mô tả như là 1 class hoặc 1 function mà có sẵn trong phạm vi thực thi của 1 ứng dụng. Chain tức là 1 bước trong quá trình khai thác. Về cơ bản, gadgetchain là kết quả của việc lắp ghép các method call, gán ghép các field làm sao cho nó đi theo luồng mà mình mong muốn: RCE, write file, … Tưởng tượng các method call như các đoạn ống nước riêng lẻ thì công việc tìm gadgetchain chính là quá trình lắp ghép các đoạn ống thích hợp lại với nhau, và kết quả là có thể dẫn nước từ nguồn (source) tới đích (~sink).

![](https://images.viblo.asia/5975b04c-ac3b-4f98-982d-41d649446413.png)

# MatesCTF 2018 WutFaces
## Setup môi trường debug
Sau khi dowload source code của bài về các bạn giải nén thì được như sau:

![](https://images.viblo.asia/2632fa2d-ee6d-463e-9ac5-2567dae09ac9.png)

Trong đó file `wutfaces-1.0.1-SNAPSHOT.war` là file chúng ta cần deploy. Ở đây thì mình dùng IDE là Intelij nha. Đầu tiên ta tạo mới một project

![](https://images.viblo.asia/af072a36-43b9-4f00-b2d5-4f121ca63203.png)

Chúng ta cần phải cài Tomcat để có thể chạy được web trên đó. Link download : [http://tomcat.apache.org/](http://tomcat.apache.org/)

Sau đó làm theo các bước sau để deploy cũng như setup debug
### Setup phía server
1. Chọn Add Configurations -> '+' -> Tomcat Server -> Local

![](https://images.viblo.asia/30d1a008-60d7-4c6a-b885-374afdcd635e.png)

![](https://images.viblo.asia/bc57d051-b7ba-453e-9daf-9cabe964024f.png)

2. Ở phần Server/Application server, các bạn chọn đến thư mục cài tomcat nhé. 

![](https://images.viblo.asia/2c18226b-8f13-468b-94b3-bd7f299b9130.png)

3. Ở phần deployment các bạn click vào icon '+' và chọn file `wutfaces-1.0.1-SNAPSHOT.war`

![](https://images.viblo.asia/110208dd-ec84-4149-a625-8d32540506e1.png)

4. Ở phần Startup/Connection các bạn chọn Run. Trong phần Environment variables các bạn chọn '+' và thêm vào biến `JAVA_OPTS` với giá trị là `-agentlib:jdwp=transport=dt_socket,address=127.0.0.1:5005,suspend=n,server=y`. Bước này rất quan trọng nha

![](https://images.viblo.asia/0a7620b4-1340-419c-b9f3-db6deb13601d.png)

5. Nhấn OK và chúng ta đã xong phần setup phía server. 

### Setup phía client
1. Tiếp theo chúng ta sẽ tạo mới một project như các bước mình đã giới thiệu
2. Giải nén file war bằng câu lệnh `jar -xvf .\wutfaces-1.0.1-SNAPSHOT.war` để có thể lấy hết lib ra

![](https://images.viblo.asia/e66146b1-2ada-45c4-b287-da8d6f71fa13.png)

3. add hết các file jar trong thư mục WEB-INF\lib thành lib trong project của chúng ta. Chọn File -> Project Structure sau đó chọn Libraries -> '+' -> java, và chọn hết các file jar

![](https://images.viblo.asia/15da1335-e2f6-4953-b710-b6f89b3b2b7b.png)

4. Khởi chạy server và client. Nếu hiển thị như thế này là đã kết nối remote debug thành công

![](https://images.viblo.asia/e3452696-0d1f-4649-b42b-f0b3b8be866e.png)

## Thu thập thông tin

Khi vào bài thì được như sau: 

![](https://images.viblo.asia/a7ad6593-fca4-4b18-ac92-196b98a4b87c.png)

Thử dùng qua các chức năng hiện có thì không có gì đặc biệt cả, rất đơn giản. Kiểm tra các dependencies trong `META-INF\maven\com.tint0.matesctf\wutfaces\pom.xml` thì thấy web đang dùng 1 thư viện là `Richfaces 4.3.2.Final`. 

![](https://images.viblo.asia/49f4c788-422c-464b-9d05-5293ab6b665d.png)

Thử tra google xem với phiên bản này thì có những lỗi gì thì tìm được bài viết này : [https://codewhitesec.blogspot.com/2018/05/poor-richfaces.html](https://codewhitesec.blogspot.com/2018/05/poor-richfaces.html). Thông qua bài viết thì phiên bản này có 2 lỗi.

![](https://images.viblo.asia/8550cdfa-2847-4b95-bc3d-fc97af7af6a7.png)

Cần phải nói thêm là thông qua class `BookHolder` trong `WEB-INF\classes\com\tint0\wutfaces` chúng ta biết được sink của chain chúng ta cần tìm nằm ở method `hashCode`

![](https://images.viblo.asia/ee2c4c71-a91a-41ff-bf3b-58a12e6d08ba.png)

Điểu chúng ta cần quan tâm là phải tìm được Source và chain để có thể đi đến method này. Như đã nói ở đầu bài viết. Bài ctf này hay ở chỗ hướng chúng ta đến cách viết PoC cho 1day. Nên cách chúng ta làm là sẽ diff 2 bản có lỗi và đã fix mà cụ thể ở đây là 4.3.2 và 4.3.3. Bản diff các bạn có thể xem trên github ở [https://github.com/richfaces4/core/compare/4.3.2.20130513-Final...4.3.3.20130710-Final](https://github.com/richfaces4/core/compare/4.3.2.20130513-Final...4.3.3.20130710-Final). Như chúng ta có thể thấy điểm khác biệt duy nhất ở đây là việc giải quyết vấn đề về deserialization bằng cách thay thế `ObjectInputStream` bằng `LookAheadObjectInputStream` trước khi thực hiện `readObject`.

![](https://images.viblo.asia/fba51263-c307-4de4-89e0-8d1e648b02b4.png)

## Phân tích 
Ok. Chúng ta đã có endpoint để trigger deserialization. Một vấn đề nữa xảy ra ở đây. Dường như enpoint này không liên quan đến flow chương trình. Vậy làm sao để tìm ra nơi nhập input serialized object của chúng ta. Trước tiên thì mình sẽ bật network của dev tool lên để xem xem những resource nào được load từ đó xem ta có thể control được những gì

![](https://images.viblo.asia/2b2caf81-84ed-402c-a4c3-3c49bc6afab9.png)

Ghi nhớ những resource này nhé. Sau đó ta sẽ sử dụng Intelij nhay vào method `decodeObjectData` mà chúng ta tìm ra ở bước diff 2 phiên bản bằng cách nhấn tổ hợp phím **Ctrl+N** và gõ `Util` để nhảy vào class này

![](https://images.viblo.asia/c5847877-d8d4-42b5-b458-655e8bff3d6b.png)

Nhấn **Ctrl+F12** để list toàn bộ method ra và đi đến method `decodeObjectData`. Bước tiếp theo ta sẽ sử dụng tính năng **find Usage** để trace ngược từ đây về xem có chạm được đến chỗ nào là user input hay không.

![](https://images.viblo.asia/0cb71f07-a097-4ec5-ac96-240a6e27d683.png)

Như ta thấy thì `org.richfaces.resource.DefaultCodecResourceRequestData.getData()` có gọi đến method `decodeObjectData` của chúng ta. Tuy nhiên vẫn chưa cham được đến điểm nào là user input. Lặp lại các bước như trên. Ta được 1 chuỗi như sau

* Find Usage `org.richfaces.util.Util.decodeObjectData()` -> `org.richfaces.resource.DefaultCodecResourceRequestData.getData()`
* Find Usage `org.richfaces.resource.DefaultCodecResourceRequestData.getData()` -> `org.richfaces.resource.ResourceFactoryImpl.createResource()`
* Find Usage `org.richfaces.resource.ResourceFactoryImpl.createResource()` -> `org.richfaces.resource.ResourceHandlerImpl`

Đến đây các bạn để ý trường `public static final String RICHFACES_RESOURCE_IDENTIFIER = "/rfRes/";` chứ, rất giống với resource khi chúng ta load trang ở bước sử dụng dev tool. Đặt breakpoint tại method `org.richfaces.resource.ResourceHandlerImpl.handleResourceRequest()` và chú ý rằng mọi request yêu cầu resource đều bị chặn tại đây. Đặt các breakpoint như hình dưới để có thể hiểu hơn về cách code xử lý các request

![](https://images.viblo.asia/06dff996-799e-4078-b6cf-3322712bd247.png)

Ở breakpoint line 142 điều kiện này check xem request của ta có phải yêu cầu resource hay không. Breakpoint line 145 lấy dữ liệu ra từ path. Cụ thể khi nhảy vào method này

![](https://images.viblo.asia/ecc1beec-73f1-49b7-a5fa-94b7238a036f.png)

Có thể thấy các request resource phải bắt đầu với `/rfRes`.  Đi sau hơn vào method `decodeResource` ở line 149. 

![](https://images.viblo.asia/5dda141d-56c7-49e4-8627-e79a1ed91a09.png)

Nhận thấy nó sẽ set các biến từ path như **Resource name** , **Library name**, **Version**, ngoài ra còn 1 lưu ý quan trọng ở đây là param `do`

![](https://images.viblo.asia/66deb28d-5d47-4eda-a1b4-3f56d56afb4a.png)

Nó là gì. Nó chính là dataSerialized mà chúng ta có thể truyền vào đấy. Bình thường thì trong các request không thấy xuất hiện param này, nên chúng ta phải thêm nó vào request để có thể exploit được. Cần phải nói thêm giá trị của param `do` sẽ được set cho biến `dataString`. Ví dụ với request `http://localhost:8085/wutfaces_1_0_1_SNAPSHOT_war/rfRes/buttonBackgroundImage.png.jsf?v=4.3.2.Final&db=eAFjZGBkZOBm!P-f8f!bV88Y!185f5yBCQBPWAk3&ln=org.richfaces.images&do=notnul` thì ta được

![](https://images.viblo.asia/a1af0a29-04ea-44e8-82b0-808baae18dfb.png)

Như vậy ta chỉ cần thêm payload của chúng ta vào param `do` và gửi lên là sẽ exploit thành công.  Tổng kết phần này lại chúng ta có trace back từ sink về source như sau:

* org.richfaces.util.Util 										                                                    => trigger deserialization
* org.richfaces.resource.DefaultCodecResourceRequestData.getData()      => trigger org.richfaces.util.Util.decodeObjectData()
* org.richfaces.resource.ResourceFactoryImpl.createResource()		           => trying create resource from request
* org.richfaces.resource.DefaultResourceCodec.decodeResource()	           => decode from request
* org.richfaces.resource.ResourceHandlerImpl.handleResourceRequest() => handle request
    
## Xây dựng payload
Chúng ta đã biết gửi payload ở đâu. Bây giờ đến bước xây dựng payload. Như tôi cũng đã có nói, chúng ta cần tìm chain trigger được method `hashCode` trong class `BookHolder`. Với những ai đã đọc qua series [The Art of Deserialization Gadget Hunting](https://sec.vnpt.vn/2020/02/co-gi-ben-trong-cac-gadgetchain/) của anh **Nguyễn Tiến Giang** thì hẳn đã đọc qua chain `URLDNS` vì bài viết của anh đã phân tích rất kĩ chain này rồi. Chúng ta có thể lợi dụng nó để đi đến được `BookHolder.hashCode()`. Chain sẽ như sau:

 *       ObjectInputStream.readObject()
 *          java.util.HashMap.readObject()
 *              java.util.HashMap.putVal()
 *                  java.util.HashMap.hash()
 *                      com.tint0.wutfaces.BookHolder.hashCode()

Code xây dựng payload của mình như sau. Chủ yếu dựa trên code URLDNS thôi nha. Chi tiết mình đã ghi trong code

![](https://images.viblo.asia/f7fd40bb-417b-41b3-abd3-a3087f3c333b.png)

Cần chú ý là chúng ta muốn xây dựng được payload thì cần thêm 2 class là `BookHolder` và `BookBean` giống với trong source mà chúng ta giải nén ra. Đồng thời cũng phải để 2 class này trong package có tên giống trong file giải nén. Lí do là chúng ta gửi payload lên server. Server thực hiện derseralization nó ra, nếu ta để tên hay package sai thì server sẽ báo lỗi không tìm thấy và chúng ta khai thác không thành công. Một điều nữa, payload chúng ta cần gửi lên ở dạng String, mà chúng ta mới chỉ ghi ra file ở dạng byte thôi. Chúng ta cần sử dụng đúng định dangh encode thì khi server thực hiện decode ra mới thành công được. Chú ý method `org.richfaces.util.Util.decodeObjectData()` sử dụng method `decodeBytesData` để decode. Như vậy để encode ta sẽ sử dụng method `encodeBytesData`

![](https://images.viblo.asia/795c6955-52aa-44a7-a3e1-29fc475c6a7e.png)

và payload của chúng ta sẽ là:

```
eAFb85aBtbiIQTArsSxRr7QkM0fPI7E4wzexgJX91sHDYgkXmRmY3Bi4cvITU9wSk0vyizwZOEsyilKLM!JzUioK7B0YQICnnANICgAxI9Aw2eT8XL2SzLwSA73y0pK0xOTUYj2n!PxsD6CW1KJTWlvWbpV7coeJgdmTgS0JKO6Z4sPA7ePvHu!s7-vr6OdSwiDkA3KPfk5iXrp-cElRZl66tQ8DJ0htSGZJTmohQx0Dc0UByOYSBpbkxJzkghIGjsS8ypIMoNIKALTGQh0_
```

Request trông sẽ như thế này nhé: 

```
http://localhost:8085/wutfaces_1_0_1_SNAPSHOT_war/rfRes/buttonBackgroundImage.png.jsf?v=4.3.2.Final&db=eAFjZGBkZOBm!P-f8f!bV88Y!185f5yBCQBPWAk3&ln=org.richfaces.images&do=eAFb85aBtbiIQTArsSxRr7QkM0fPI7E4wzexgJX91sHDYgkXmRmY3Bi4cvITU9wSk0vyizwZOEsyilKLM!JzUioK7B0YQICnnANICgAxI9Aw2eT8XL2SzLwSA73y0pK0xOTUYj2n!PxsD6CW1KJTWlvWbpV7coeJgdmTgS0JKO6Z4sPA7ePvHu!s7-vr6OdSwiDkA3KPfk5iXrp-cElRZl66tQ8DJ0htSGZJTmohQx0Dc0UByOYSBpbkxJzkghIGjsS8ypIMoNIKALTGQh0_
```

Trigger được calc lên xem như thành công rồi nhé.

![](https://images.viblo.asia/9b1405dc-d7e9-4e2c-b5d2-9e30ae54eeac.png)