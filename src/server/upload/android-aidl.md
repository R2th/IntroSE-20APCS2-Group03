Lần trước mình có viết 1 bài giới thiệu tổng quan về process trong Android. Bạn nào muốn có thể tham khảo [tại đây](https://viblo.asia/p/android-process-va-do-uu-tien-ByEZkNQyKQ0). Vì vậy chủ đề bài viết của mình bữa này cũng liên quan đến process. :)). <br/>

OK. Các bạn đã bao giờ có (tạo) 2 apps có cùng logic hay có các giá trị giống nhau trong cùng 1 database chưa ? Nói 1 cách dễ hiểu hơn là bạn muốn **truyền data** giữa 2 apps với nhau. Vậy thì phải làm thế nào bây giờ ??. :)) Rất may cho Android developers là Android có cung cấp 1 cách để share data giữa các apps hay nói chính xác hơn là giữa các [processes](https://viblo.asia/p/android-process-va-do-uu-tien-ByEZkNQyKQ0). Với **AIDL** thì công việc này chưa bao giờ dễ dàng hơn thế :rofl:  (Đấy là mấy **pro** nói thế chứ mình thì không thấy như vậy). **Now Let's started**

# Tổng quan
**AIDL** (Android Interface Definition Language) được sử dụng khi ta muốn thực hiện **IPC**(interprocess communication) tức là truyền thông liên tiến trình. Tuy nhiên **AIDL** chỉ thích hợp cho các trường hợp cần xử lí **multithreading**, còn không thì chúng ta có thể sử dụng **Messenger**.
# Nguyên lí hoạt động
- AIDL làm việc giống như là thành phần trung gian giữa client vá server application
- AIDL sẽ cho phép tạo 1 **interface** để cả client và service có thể giao tiếp thông qua nó
- Client app sẽ tạo 1 vài actions cụ thể và truyền **data/request** tới server app để xử lí. Sau đó server sẽ trả về kết quả thích hợp cho client
- Có thể truyền **primitive type data** hoặc **custom object** giữa các app với nhau
- Với **custom object** thì ta phải phân rã nó thành các thành phần dữ liệu nguyên thủy để system có thể đọc và sau đó AIDL sẽ marshalling lại object đó
# Cách sử dụng 
OK. Giờ sẽ là thực hành :)). Như đã nói ở nguyên lí hoạt động trên, thì chúng ta phải có ít nhất là 2 app đóng vai trò là server và client để giao tiếp với nhau. Trước hết hãy cùng tạo server app trước nhé :))
### Tạo server app
- Tạo 1 project như bình thường. Có thể lấy tên là **MyServer** chẳng hạn :))
- Tạo empty activity làm launching activity 
- Tạo file .aidl trong **src** directory. Với ví dụ này sẽ là IAdd.aidl 

![](https://images.viblo.asia/8a7c70f4-94db-4500-be72-c8c18c330758.png)
- Sau đó ta có thể thêm các method vào trong AIDL interfacce như ví dụ trong hình

 ![](https://images.viblo.asia/a2edb0d8-4fbd-49d3-ae6e-3b04d43e046a.png)
- Tiếp đến ta tạo 1 file java kế thừa **Service** class và **giá trị trả về trong onBind() phải** implement AIDL interface vừa được tạo để override lại các method trong nó. Trong vd này mình lấy tên là **AdditionService** (Khi buil project thì android sẽ tự sinh ra Stub class trong **gen** directory)

![](https://images.viblo.asia/136b3b21-c814-4a62-a25d-0ba2525907e9.png)
- Cuối cùng ta cũng không quên là phải khai báo **AdditionService** trong **AndroidManifest.xml** và thêm thuộc tính **exported=true** cho service để nó có thể dk public cho client, đồng thời khai bao intent-filter cho service 

![](https://images.viblo.asia/86399eb4-0b85-4929-9a72-b06bf08242c1.png)

Ok vậy là phần server đã xong :joy::joy:
### Tạo client app
- Tương tự như server app ta cũng tạo 1 project như bình thường
- Sau đó ta copy .aidl file trong server app đã tạo trước đó vào **src** directory của client
- Trong MainActivity của client ta sẽ phải **bind** đến service của server thông qua **ServiceConnection** để lấy được IBinder trong service và gọi các method thông qua interface này. 

![](https://images.viblo.asia/f6496141-1e85-4bc4-b251-528879e11eb6.png)

![](https://images.viblo.asia/51250215-df8f-4054-ac60-6a573832f88c.png)

Ok vậy client cũng đã xong. Nhưng đó chỉ là cách mà chúng ta thực hiện đối với các dữ liệu đơn giản hay primitive data. Vậy đối với các object mà user custom thì sao ? :rofl::rofl: Có vẻ khó dần đều rồi đấy :))
## Truyền custom object 
Để truyên được custom object giữa client và server thì ta thay đổi 1 vài thứ ở cả client và server. 
### Với server app
- Tạo model class như bình thường nhưng phải implement **Parcelable** và override lại các hàm trong nó. Trong ví dụ này sẽ là Person.java 

![](https://images.viblo.asia/eae190d0-324c-451d-b571-3f7e6d59c1e8.png)
- Tạo 1 file .aidl có cùng tên với tên của model class => person.aidl và cũng đặt trong **src** directory 
- Trong person.aidl chỉ thêm đúng 1 dòng như hình bên dưới

![](https://images.viblo.asia/a34ee34a-1e1e-48f7-8cab-d6955264e926.png)
- Cuối cùng ta phải import class Person trong IAdd interface và thêm các method cần thiểt cho client request.
### Với client app
- Copy model class (Person.java) vào client
- Copy person.aidl vào thư mục giống hệt như của server app 
- Cũng import Person.java vào IAdd.aidl của client app giống như của server 
- Giờ thì chúng ta có thể gọi bất cứ method nào mà IAdd interface cung cấp từ bên phía client từ IBinder đã lấy được trước đó trong MainActivity

Phù :joy::joy::joy: Cũng khá đơn giản phải không nào ? :v
# Kết luận
Nói dài vậy chứ nhưng theo mình thì các bạn có thể kết luận thành vài điểm chính sau đây:
1. AIDL hoạt động như 1 thành phần trung gian giữa client app và server app
2. Ta có thể truyền simple data (primitive data) hoặc custom object (phải implement **Parcelable**) thông qua AIDL
3. Các file .aidl của server và client có nội dung giống hệt nhau và được đặt trong **src** directory và có cùng đường đẫn
4. Giá trị trả về trong **onBind()** của service phải implement các method có trong AIDL interface
5. Client sẽ **bind** lấy service và gọi được các method mà AIDL interface cung cấp
=> That done! Happy coding :smiley:
# Tài liệu tham khảo
- [Android developer](https://developer.android.com/guide/components/aidl.html?hl=in)
- [Android AIDL](https://android.jlelse.eu/android-aidl-937daf89e685)
- [Github project](https://github.com/chintandesai49/AIDLDemo)