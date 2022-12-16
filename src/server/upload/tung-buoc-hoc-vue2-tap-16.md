**Giới thiệu cơ bản về Vue 2**

Xin chào lại là mình quay trở lại với series về Vue2

Tiếp tục với bài tập của tập 15, thì hôm trước mình đã giới thiệu với các bạn 1 bài tập xử lý form được kết hợp bởi Vue2 và Laravel. Hôm nay mình sẽ trích xuất nó thành 1 Class Form để có thể sử dụng đi sử dụng lại ở nhiều form mà chúng ta sẽ đỡ tốn công viết đi viết lại 1 đoạn xử lý nhé

Đầu tiên chúng ta sẽ  cần xử lý tách các function của form ra 1 Class riêng, đầu tiên mình sẽ chuyển function reset()
![](https://images.viblo.asia/762eba31-7393-4e0f-93dd-f504e71be364.jpg)

Chúng ta sẽ khởi tạo class Form với function reset(). Về cở bản khi tách ra thì sẽ xử lý việc xét lại các data về rỗng. 
![](https://images.viblo.asia/f599fcb3-74a1-4d15-a64a-e4bb2d7db12d.jpg)

Nhưng trước hết để có các trường trong Form thì chúng ta cần khởi tạo 2 trường name và description
![](https://images.viblo.asia/945ca6db-a95a-49e2-bfc3-62ef6e4d9cfd.jpg)

Quay lại Class Form chúng ta sẽ thêm 1 hàm khởi tạo. Nhưng mình sẽ không muốn dữ liệu hiển thị là this.data.name nữa thay vào đó mình mong muốn sẽ hiển thị form.name
![](https://images.viblo.asia/55b96f79-bac2-47d6-b387-192b7a29bae9.jpg)

Vậy tiếp theo chúng ta sẽ xử lý như sau
![](https://images.viblo.asia/28c5307a-2a24-4a72-a05c-90fd4d23de5a.jpg)

Quay trở lại trình duyệt bật tab Console chúng ta sẽ có error như ảnh dưới. Đó là do cách gọi các trường đã thay đổi
![](https://images.viblo.asia/4fd54790-3770-4b94-a680-e34c63c9ba39.jpg)

 Đơn giản là chúng ta sẽ đổi v-model="name" => v-model="form.name" tương tự với cả trường description ở file view blade
![](https://images.viblo.asia/2f669276-c7e3-43f9-8536-579f4d4062d7.jpg)

Refesh lại trình duyệt đã không còn lỗi xảy ra và ở tab Vue chúng ta sẽ có Object như sau
![](https://images.viblo.asia/0fde9632-3fac-4ca9-8a1f-751d9d92cb4f.jpg)

Thử nhập liệu vào 2 trường chúng ta sẽ thấy data được nhận ở Object vậy là mọi thứ đã đang hoạt động đúng như bài tập trước
![](https://images.viblo.asia/8d94fec0-8f7e-4f4f-8dfe-eff66e1611e5.jpg)

Okie, giờ quay lại với app.js chúng ta tách thêm function submit()
![](https://images.viblo.asia/03f39632-01e6-4f7a-af71-c7c4ed76bcc5.jpg)

Nhưng ở phần hàm khởi tạo chúng ta còn thiếu object errors cho đoạn xử lý lỗi hiển thị, hãy thêm nó vào hàm constructor() và đồng thời xóa ở new Vue đi nhé
![](https://images.viblo.asia/0aa39606-ec43-45ba-ad52-974bfbab818f.jpg)

 Quay trở lại trình duyệt chúng ta sẽ gặp lỗi tương tự lỗi name ở phía trên. Đó là do tên object errors đã được đổi
 ![](https://images.viblo.asia/3ff9c735-3421-40c6-a162-d6af24bbde0c.jpg)
 
 Đơn giản chúng ta sẽ xử lý thêm form vào trước object errors được gọi ở event keydown và đoạn xử lý v-if, v-text show errors như sau
 ![](https://images.viblo.asia/5dc81354-7598-4d7a-bc73-6c360b75681d.jpg)

 Trở lại trình duyệt refesh và chúng ta sẽ thấy không còn lỗi ở Console nhưng khi nhập thử dữ liệu sai và Create sẽ có lỗi xảy ra như sau
 ![](https://images.viblo.asia/0817b564-4e2f-4b26-9b74-7602ba217e85.jpg)

Đó là cũng đơn giản là do cần thêm form trước object errors ở methods onSubmit đoạn catch như sau
![](https://images.viblo.asia/252d1d0c-e1ab-4fea-90b6-39c6d4a480f8.jpg)

Quay trở lại trình duyệt không nhập dữ liệu ấn Create và message errors đã được show ra
![](https://images.viblo.asia/7643dd61-e8c7-43e0-a761-c81409ac1508.jpg)

Okie giờ chúng ta sẽ xử lý việc reset form. Mình sẽ thay đổi tên ở hàm khởi tạo thành this.originalData.
Và ở dưới function reset() chúng ta sẽ thực hiện tương tự việc khởi tạo là chạy vòng lặp và xét các trường về rỗng hoặc null tùy ý.Ở đây mình sẽ xét về rỗng
![](https://images.viblo.asia/c40ab332-3640-4d26-8ed4-813b207d8ca3.jpg)

Tiếp đến chúng ta sẽ tách tiếp phần xử lý trong methods onSubmit đơn giản là :
![](https://images.viblo.asia/13cc939a-0466-4f44-95ff-31d44a320118.jpg)

Trong class Form đã khai báo tiếp tục tạo thêm function submit() trong đó sẽ xử lý việc call AJAX vs requestType và url được truyền vào.
![](https://images.viblo.asia/4cb48e76-0e11-4f2c-b60c-e91fee2f2e1c.jpg)

this.$data cũng sẽ được chuyển thành đơn giản là this.data và tách thêm function onSuccess() và onFail()
![](https://images.viblo.asia/06ce65cd-6479-4401-890c-625c43c5c6cd.jpg)

Các bạn nhớ thêm .bind(this) ở đoạn gọi function cho onSuccess và onFail như sau, cùng vs đó là xử lý onSuccess()
![](https://images.viblo.asia/9a97491b-0e74-440d-a9fe-7eed3c19f4ca.jpg)

Tiếp đến chúng ta sẽ khai báo data đơn giản là clone object như sau
![](https://images.viblo.asia/b0af1e93-fc57-469b-8043-253bd162601c.jpg)

Quay trở lại trình duyệt và test nào. Mọi thứ đã hoạt động okie như lúc ban đầu, nhưng dữ liệu thì chưa được reset sau khi Create Project
![](https://images.viblo.asia/6d82802b-dc4d-48cd-8ea5-eb102b21c6e7.jpg)

Đơn giản vì chúng ta chưa gọi form.reset() trong onSuccess()
![](https://images.viblo.asia/a28ff7be-ce2c-47e1-91a8-ba5b3ab74899.jpg)

Giờ cùng trở lại trình duyệt và test lại 1 vòng nhé.
![](https://images.viblo.asia/aba56a7e-9735-46bd-946d-8de9b8790a78.jpg)


Okie, bài học hôm nay cũng dừng lại ở đây, vào tập tiếp theo mình sẽ giới thiệu đến các bạn những phần khác của Vue2, cùng đón chờ nhé

Hẹn gặp lại các bạn vào bài tiếp theo trong Series nhé !!!!