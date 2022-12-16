# Tản mạn
Dạo gần đây thì dân tình xôn xao về những bug hằng trăm nghìn $ của **Microsoft** như trên **Microsoft Mail Exchange Server**, **Sharepoint** hay các công ty nổi tiếng khác như **Solarwind**. Nhìn các con số dài như thế thì ai mà chẳng ham, phải không các bạn, mình cũng không ngoại lệ. Nên cũng tính đi vào học chọc chọc bug mấy sản phẩm này xem hình thù nó ra như thế nào, hơn nữa thì mình cũng đã tìm hiểu về java deserialization một thời gian rồi mà bug của các sản phẩm mình kể trên lại là .NET deserialization. Nghe có vẻ quen, nên chốt vào học thôi. Tất nhiên khi vừa mới bắt đầu như mình thì chẳng thể nào mà lập tức xách mấy cái sản phẩm to đùng bên trên mà chọc ngoáy được. Nên mình có tìm kiếm các bài CTF về .NET deserialization trên mạng (với mình thì cách học qua các bài CTF mang lại cho mình kiến thức rất nhanh), rất không may là mình chẳng tìm được bài nào (bạn nào tìm được thì giới thiệu mình với nhé). Và rồi thì lại may sao mình có đứa em [@dieulink81](https://twitter.com/dieulink81) có nghiên cứu và làm 1 cái đề CTF về .NET deserialization. Và bạn í cũng có bài phân tích về SharePoint tại [https://blog.khonggianmang.vn/phan-tich-ban-va-thang-05-2021-tren-sharepoint-server-2013/](https://blog.khonggianmang.vn/phan-tich-ban-va-thang-05-2021-tren-sharepoint-server-2013/). Các bạn quan tâm có thể theo dõi nhé. OK. Không dài dòng nữa, mình sẽ write up lại bài này. 

# Cài đặt
Để có thể làm lại được bài này các bạn cần cài đặt một số thành phần sau:

* Tool Dnspy: [https://github.com/dnSpy/dnSpy  ](https://github.com/dnSpy/dnSpy  ) 
* .NET framework: các bạn có thể cài đặt thông qua Visual Studio hoặc qua : [https://dotnet.microsoft.com/download](https://dotnet.microsoft.com/download)
* Source code của bài CTF: [https://drive.google.com/file/d/1-g3JujWB2YXkEiSTDxbRHktsS8p0pC72/view?usp=sharing](https://drive.google.com/file/d/1-g3JujWB2YXkEiSTDxbRHktsS8p0pC72/view?usp=sharing)

# Write up
## Khởi chạy

![](https://images.viblo.asia/04aa4462-3740-4a6c-a46f-1bd935fd2f5f.png)


Trong thư mục source code các bạn tải vể sẽ có một file là BKSEC.exe. và BKSEC.dll để thuận tiện cho việc debug. Mình sẽ load file dll vào DnSpy và khởi chạy nó lên như sau:

![](https://images.viblo.asia/cf0a53c5-140b-4a9e-8903-8069600f5580.png)

Nếu mọi thứ đều ổn các bạn sẽ thấy hiển thị như sau và truy cập vào [http://localhost:5000](http://localhost:5000) để truy cập vào bài CTF của chúng ta

![](https://images.viblo.asia/044862fd-80ed-4f35-acd6-3955dc7d3851.png)

![](https://images.viblo.asia/f8cfa41a-a953-4736-87ee-53d31c30808e.png)

## Phân tích

Trước tiên thì lướt 1 vong cái web xem có gì thú vị nào

![](https://images.viblo.asia/5f0b58ac-5813-4bf8-9780-6828749f7db4.png)

Khi nhập name và pass bất kì ta nhận lại được một chuỗi được mã hóa base64. Vứt chuỗi này vào **cyberchef** thì được như sau

![](https://images.viblo.asia/90e66c33-ba38-4858-81bf-ba141d15d79b.png)

Sau khi giải mã thì được một chuỗi XML như trên. Với thông tin bây giờ khi chưa đọc code thì ta chưa biết nó có tác dụng gì. Tuy nhiên thì ta thấy được `Normal user doesn't have flag` nên có thể rằng khi ta truy cập được vào admin thì sẽ bật ra flag. 
Tiếp theo qua chức năng `Start` nhập bất kì và ta được như sau:

![](https://images.viblo.asia/7fc8e2b3-23f6-43d3-b998-4f46cf6b24d4.png)

Có vẻ nhe bây giờ chúng ta phải đọc code rồi.

![](https://images.viblo.asia/7acc1543-4548-4a83-9195-818e731c3ca7.png)

Bên trong class `HomeController` có đoạn code trên. Rõ ràng là nếu ta thỏa mãn điều kiện để pass qua hàm `CheckAdmin` thì sẽ thực thi đoạn code `auth = AdminUserModel.Serialize(HomeController.Hash(Encoding.UTF8.GetBytes(name + "||" + pass)));`. Nhảy vào `AdminUserModel.Serialize` thì thấy code sẽ đọc file `flag.txt` và trả về cho chúng ta flag

![](https://images.viblo.asia/f9b0e7e5-3f5c-45c3-93a6-ab7be8f23231.png)

Để có thể đi theo hướng này ta phải pass qua được hàm `CheckAdmin`. Nhảy đến hàm này:

![](https://images.viblo.asia/93003c46-c8a1-403f-8a19-c491b939760f.png)

Giải quyết hàm này các bạn có thể dùng MD5 collision. Và lấy được flag. Tất nhiên đây cũng là một cách giải nhưng không phải cách mà chúng ta bàn đến hôm nay. Theo tiêu đề các bạn thấy đấy. Chúng ta sẽ sử dụng .NET deserialization để RCE server. Để ý đến bài sử dụng `DataContractSerializer` để thực hiện de/serialization. 

![](https://images.viblo.asia/af6db6f8-ff7b-41d0-a392-6967677ac07e.png)

Tra trên google về chức năng của hàm thì theo [https://docs.microsoft.com/en-us/dotnet/api/system.runtime.serialization.datacontractserializer?view=net-5.0](https://docs.microsoft.com/en-us/dotnet/api/system.runtime.serialization.datacontractserializer?view=net-5.0), hàm này được sử dụng để  *Serializes and deserializes an instance of a type into an XML stream or document using a supplied data contract. This class cannot be inherited.* Tức là nó thực hiện serialization 1 đối tượng có kiểu nào đó thành dạng XML stream hoặc từ XML stream thực hiện deserialization tạo lại thành 1 đối tượng. Mình có tìm hiểu thêm về **Attacking .NET Serialization** thì tìm thêm được hình sau;

![](https://images.viblo.asia/c0307bad-c08a-4486-9f18-06cab1d6f682.png)

Để có thể RCE thông qua thằng `DataContractSerializer` này thì cần phải thỏa mãn một số điều kiện nhất định  
Class phải có thuộc tính:
* DataContract: Chỉ (de)serialize các property có thuộc tính DataMember, khi deserialize thì chỉ những property nào có thuộc tính DataMember mới được gọi đến setter
* Serializable: (de)serialize được mọi property

Điều kiện:
* Điều khiển được kiểu dữ liệu trong constructor

hoặc

* Chứa các property có kiểu dữ liệu object,... và DataContractResolver có method ResolveName() trả về kiểu dữ liệu của gadget

hoặc

* Kiểu dữ liệu của gadget có trong thuộc tính KnownType

Vậy trong trường hợp của chúng ta liệu có thỏa mãn một trong các điều kiện trên không. Và gadget của chúng ta ở đây là gì? Tất nhiên là 1 bài CTF cố ý để chúng ta RCE được thì phải thỏa mãn điều kiện rồi. 

![](https://images.viblo.asia/72a8dc4e-3f5a-44c7-9c16-e6156d13555b.png)

Để ý method `Run` trong class `BKSEC.Models.ErrorModel`. Nếu chúng ta control được `prefix` và `message` thì chúng ta hoàn toàn có thể RCE server nếu bằng cách nào đó chúng ta chạy được `Run()` lên. Ví dụ `prefix = poweshell.exe` và `message = calc.exe` thì khi chúng ta thành công màn hình calculator sẽ được bật lên. Rõ ràng đây là sink của chúng ta, và để ý class này có dòng `[KnownType(typeof(ErrorModel))]` thỏa mãn điều kiện thứ 3 của chúng ta, các property đều có thuộc tính `DataMember`. Xác định được sink rồi vậy chúng ta phải xây dựng payload như thế nào và truyền vào đâu.

![](https://images.viblo.asia/f357d535-b07e-4ff7-9aa6-a6fd122b0c05.png)

để ý hàm start. Kể cả có là admin hay là không thì server đều thực hiện deserial data chúng ta gửi lên. Như vậy chúng ta cũng chẳng cần phải quan tâm admin hay là không. Đi vào class`UserModel`. 

![](https://images.viblo.asia/cb7560f8-8c91-4e58-a6ae-569efba0c7a0.png)

Để ý có 1 thuộc tính là id có kiểu là Object. Như vậy ta cần truyền vào id một đối tượng của class `ErrorModel`. Lý do làm vậy là vì class `NormalUserMdel` là class kế thừa class `UserModel` và chính nó thực hiện serialize và trả về cho người dùng. Lợi dụng điểm đó chúng ta sửa lại source code và gen ra payload. Mình sửa source 2 class `ErrolModel` và `UserModel` ở một số điểm sau:

![](https://images.viblo.asia/d230137c-fe0d-435b-8d0b-015c55dd7b2d.png)

![](https://images.viblo.asia/597940fc-a5d8-43b4-b748-688e1ce85ff2.png)


Khởi chạy chương trình và chúng ta nhập name, pass bất kì và chúng ta có payload

![](https://images.viblo.asia/477cce37-8d9c-4217-9b84-daff0e538baa.png)

```PE5vcm1hbFVzZXJNb2RlbCB4bWxucz0iaHR0cDovL3NjaGVtYXMuZGF0YWNvbnRyYWN0Lm9yZy8yMDA0LzA3L0JLU0VDLk1vZGVscy5Ob3JtYWxVc2VyIiB4bWxuczppPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSI+PGZsYWcgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLmRhdGFjb250cmFjdC5vcmcvMjAwNC8wNy9CS1NFQy5Nb2RlbHMiPk5vcm1hbCB1c2VyIGRvZXNuJ3QgaGF2ZSBmbGFnPC9mbGFnPjxpZCBpOnR5cGU9IkVycm9yTW9kZWwiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5kYXRhY29udHJhY3Qub3JnLzIwMDQvMDcvQktTRUMuTW9kZWxzIj48bWVzc2FnZT5jYWxjLmV4ZTwvbWVzc2FnZT48cHJlZml4PnBvd2Vyc2hlbGwuZXhlPC9wcmVmaXg+PC9pZD48L05vcm1hbFVzZXJNb2RlbD4=```

Sau đó gửi payload lên ở `Start` chúng ta đã thành công bật calc trên máy tính, như vậy là đã RCE thành công rồi. À quên nói một điểm là để có thể RCE thành công thì trong sink của chúng ta class `ErrolModel`

![](https://images.viblo.asia/c08f4196-6896-496d-9ac1-74405ff50a61.png)

Method `Run` có thuộc tính là `[OnDeserialized]` có nghĩa là hàm này sẽ được thực thi sau khi deserialize. Có vẻ để có thể RCE được trên .NET cần rất nhiều điều kiện đi kèm. OK và bài phân tích của mình xong xuôi rồi. Các bạn có câu hỏi gì thì comment nhé. Demo cho uy tín này

![](https://images.viblo.asia/f0462684-3384-4955-ad63-7776b7fa2f4b.gif)