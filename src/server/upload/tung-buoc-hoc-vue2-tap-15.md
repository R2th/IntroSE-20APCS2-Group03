**Giới thiệu cơ bản về Vue 2**

Xin chào lại là mình quay trở lại với series về Vue2

Nếu ai theo dõi series Vue2 của mình thì cũng đã được làm quen dần theo từng cấp độ với Vue2 rồi. Hôm nay chúng ta sẽ cùng bắt tay vào những bài tập kết hợp giữa Vue2 và laravel nhé

Hôm nay mình sẽ cùng các bạn tạo 1 form create Project đơn giản nhưng theo mình thì sẽ khá là hữu ích trong quá trình làm việc cùng Vue của các bạn. Cùng bắt đầu thôi nào !!!

Vì bài hôm nay khá dài nên những đoạn cơ bản tạo project thì mọi người sẽ tự thực hiện như những bài trước nhé

Okie, sau khi tạo ra 1 project thì mình sẽ tạo 1 Controller tên là ProjectsController như sau:

Controller thì có 2 chức năng chính là List toàn bộ dự án
![](https://images.viblo.asia/84605bed-7fc1-4916-8614-2f3300898337.jpg)

Và tạo 1 dự án với name và description là bắt buộc
![](https://images.viblo.asia/89d3cb84-d953-4b24-b39d-7203b518eaed.jpg)

Tiếp theo là 1 view đặt tên create.blade.php như sau
![](https://images.viblo.asia/a5bb5b17-6e84-48c8-a93e-79c125c1c180.jpg)

Ở dưới script mình include axios.js để xử lý ajax như bài trước, vue.js và app.js để xử lý
![](https://images.viblo.asia/2d30c4e7-ff81-40e2-aa9c-93490957e469.jpg)

Để có thể nhận data từ form chúng ta sẽ thêm v-model cho 2 input name và description
![](https://images.viblo.asia/c3b104d1-4d61-406a-a023-8a1026f466ee.jpg)

Okie giờ đến app.js bước đầu mình sẽ khởi tạo đơn giản như sau :
![](https://images.viblo.asia/045a3dba-82c0-4f3d-94fd-c45e5b0ad2c5.jpg)

Giờ chúng ta sẽ bắt sự kiện onSubmit cho form bằng Vue bằng cách viết thêm @submit="onSubmit"
![](https://images.viblo.asia/83644fc0-ef3a-4b6a-b68d-f9b0cc28212e.jpg)

Quay lại với app.js mình sẽ thêm method onSubmit với alert đơn giản để xem form đã hoạt động okie chưa
![](https://images.viblo.asia/b0ef4891-d75f-4456-92c6-895efea7b884.jpg)

Tiếp theo mở chorme và submit thử chúng ta sẽ thấy alert được hiện ra. Okie bước đầu vậy là mọi thứ đã đang hoạt động đúng
![](https://images.viblo.asia/4112e730-92e6-4727-af9d-8d33df02b8a8.jpg)

Sau khi click vào OK ở popup sẽ show ra lỗi
![](https://images.viblo.asia/4da4f6dd-88ef-4bad-bf44-e62098a4f63a.jpg)

Đơn giản là vì chúng ta chưa có xử lý gì cho đoạn này nên form sẽ tự động submit lên form được define ở action
Lưu ý chúng ta có thể dùng thêm sự kiện cho submit ở Vue. có thể dùng submit.once để chỉ submit 1 lần hoặc những thuộc tính khác các bạn có thể tìm hiểu thêm còn hnay mình sẽ dùng submit.prevent để dừng việc submit form lại

![](https://images.viblo.asia/cc68cde7-7a36-4066-814d-0d0e845eb9ce.jpg)

Hãy thử lại trên chorme và giờ thì mọi thứ đã đúng như chúng ta mong muốn form đã dừng việc submit lại. Và mình sẽ dùng ajax và call api để thực hiện việc tạo 1 project.

Đầu tiên hãy tạo routes cho ProjectsController
![](https://images.viblo.asia/3353fe18-5ec5-47c0-a2a7-9ebd89a379a8.jpg)

Tiếp đó là quay lại app.js để xử lý method onSubmit, các bạn có thể truyền từng data lên như sau nhưng nếu với form nhiều input data thì sẽ khá là tốn công.
![](https://images.viblo.asia/801ffad4-6a05-45ec-b35c-ffd665352293.jpg)

Nên mình đã khởi tạo data object ở trên và giờ đơn giản là chúng ta chỉ cần
![](https://images.viblo.asia/45602d96-22a9-429d-9e58-16cea495a4d9.jpg)

Giờ quay lại chorme và test thử nhập 1 Project nhé, hãy bật inscpect lên và kiểm tra việc xử lý đã được api trả về message báo thành công.
![](https://images.viblo.asia/2946cade-4995-4825-98fd-08892f1809b4.jpg)

F5 lại trình duyệt và list project sẽ được show ra
![](https://images.viblo.asia/e1dbbc63-f594-4084-ab68-df426741c830.jpg)

Giờ nếu giả sử không nhập input Name chỉ nhập Description và submit xem sao
![](https://images.viblo.asia/dea93a6e-25f7-4e77-8f3b-0c2f3a492aeb.jpg)
Đương nhiên là lỗi sẽ xảy ra do chúng ta đang bắt validate required cho dữ liệu name ở Controllers. Vậy giờ chúng ta cần validate thêm ở form nữa để đảm bảo người dùng sẽ nhập đúng những trường required

Quay trở lại app.js chúng ta sẽ thêm vào method onSubmit khi thực hiện thành công sẽ show alert, khi gặp lỗi xảy ra thì mình sẽ tạo sẵn 1 data object là errors để hứng những message được trả ra từ api
![](https://images.viblo.asia/dd394626-87fa-4d9a-89b6-f13115d9532b.jpg)

Cùng quay lại trình duyệt và thử check xem data ở Vue đã hoạt động đúng chưa
![](https://images.viblo.asia/1bb359d2-48cc-4353-b1a7-f32763461fc1.jpg)

Okie vậy là chúng ta đã bắt được message erors từ api trả về. Tiếp đến chúng ta sẽ dùng thẻ span show message ở dưới những input bị lỗi validate nhé. Theo như ở dữ liệu vừa nhận được thì sẽ có mảng phần tử 0 nữa nên theo lý thuyết chúng ta sẽ thêm v-text như sau
![](https://images.viblo.asia/bd96f525-739f-4d8d-a134-4603a5ab047a.jpg)

Back to Chorme, chúng ta sẽ có lỗi khi inspect, đơn giản là khi chưa có lỗi xảy ra thì data errors đang là 1 object rỗng
![](https://images.viblo.asia/f094782c-4f91-4bee-84bf-c0b16cceba52.jpg)

Cùng quay lại app.js và chúng ta sẽ edit data errors, đầu tiên chúng ta sẽ gán errors => new Errors class.Và trong class Errors chúng ta khởi tạo constructor là 1 object rỗng. Sau đó tạo 1 hàm get() để lấy ra message errors từ api xử lý đơn giản như sau
![](https://images.viblo.asia/410532de-65f1-4b60-b322-965499862422.jpg)

Tiếp theo mình sẽ tạo hàm record để ghi message errors từ api vào class errors
![](https://images.viblo.asia/62b18625-07f7-48f4-a709-d173a99735b6.jpg)

Sửa method onSubmit sẽ gọi record khi xảy ra lỗi
![](https://images.viblo.asia/4f021232-5719-4ae1-b090-64020e0ebccc.jpg)

Trở lại trình duyệt mình sẽ submit luôn mà không nhập gì nhưng không có gì xảy ra. Sau khi check lại code thì mình đã quên return ở hàm get() để trả về dữ liệu :))
![](https://images.viblo.asia/1a1d53c0-d317-4c38-a412-0d2dc054f39e.jpg)

![](https://images.viblo.asia/3a8085c0-af0d-45c8-bf00-7e6417462450.jpg)

Sau khi thêm return thì mọi thứ đã hoạt động rồi. Okie giờ chỉ cần copy tương tự và sửa name thành description cho input Description thôi
![](https://images.viblo.asia/ca5c98d0-70d8-41ed-b433-88dafd6ef683.jpg)

Nhưng sau khi báo lỗi và người dùng nhập dữ liệu thì errors message không được tắt đi nên chúng ta sẽ xử lý tiếp cho mềm mịn với người dùng hơn

Mình sẽ thêm hàm clear() vào app.js đơn giản là delete đi field được truyền vào trong object errors
![](https://images.viblo.asia/8cc0e19c-07fb-4a37-a5ab-9e7cb5f0f595.jpg)

Ngoài blade chúng ta sẽ bắt sự kiện keydown để sau khi người dùng nhập liệu thì errors message sẽ biến mất
![](https://images.viblo.asia/bb350a9f-cbf9-47e1-935b-5acf9bb2edad.jpg)

Cùng test lại với trình duyệt, chúng ta sẽ submit luôn khi chưa nhập liệu. sau đó thử nhập liệu ở Name và mọi thứ đã hoạt động quá là đúng mong muốn
![](https://images.viblo.asia/863ef572-44b2-4cff-b4e5-ea779ee7e671.jpg)

Giờ lại đi copy event keydown xuống description thì cũng được nhưng với những form lớn thì việc này trở nên khá là nhàm chán và tốn công sức, nên mình sẽ chỉ cho các bạn 1 cách khác là sẽ bắt sự kiện keydown ở toàn form luôn. Với những input đều có property là name, như trong example thì mình có name="name", name="description". Nên mình sẽ dùng event.target để xử lý toàn bộ input ở form
![](https://images.viblo.asia/b6ede6fd-1de1-4143-8767-203a49551656.jpg)

Cuối cùng thì khi mà form đang gặp lỗi đương nhiên là chúng ta sẽ không cho việc submit được thực hiện tiếp bằng cách đơn giản là disable button submit mà ở example này thì là button Create đi. Do disable sẽ bắt khi được gán dữ liệu là true nên mình sẽ viết thêm 1 hàm ở class Errors.Đơn giản là khi có errors message thì object sẽ có key lenght > 0 
![](https://images.viblo.asia/3c36d82b-f113-4c04-8621-bede224af456.jpg)

Sau đó thì mình sẽ dùng hàm any() ở để bắt button disable ở blade
![](https://images.viblo.asia/b699e7be-8a60-4ef9-b5ed-7572048dc342.jpg)

Sau cùng thì chúng ta sẽ thực hiện test lại 1 vòng toàn bộ form vừa được tạo và những gì chúng ta muốn xử lý nhé. Chúc các bạn thành công !!!!

Okie, bài học hôm nay cũng dừng lại ở đây, vào tập tiếp theo mình sẽ giới thiệu đến các bạn những phần khác của Vue2, cùng đón chờ nhé

Hẹn gặp lại các bạn vào bài tiếp theo trong Series nhé !!!!