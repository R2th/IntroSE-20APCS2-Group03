Chào mọi người,

Trong quá trình thực hiện project **Angular** thì mình có tìm hiểu về **Lifecycle hooks** nên quyết định tạo bài viết này để cùng mọi người thảo luận.<br>
Bài viết được tham khảo từ nguồn (English article): [Xem tại đây](https://medium.com/bb-tutorials-and-thoughts/angular-understanding-angular-lifecycle-hooks-with-a-sample-project-375a61882478)

Ok, bắt đầu thôi!!!!

Mỗi **component** hay **directive** trong **Angular** đều trải qua 1 thứ được gọi là **Lifecycle hooks**, gọi nôm na là **vòng đời**. Con người cũng có vòng đời phát triển như: sinh ra, trưởng thành, già đi và chết. 

Vậy trong **Angular** thì sao? Có **những thành phần** nào trong cái vòng đời đó, **tại sao** chúng ta cần dùng và sử dụng trong **trường hợp nào**???
![](https://images.viblo.asia/655973cf-7ecb-451e-94cb-1cd5794d6955.png)

Mặc định, **Angular** đã cung cấp sẵn cho ta 8 **interface** như hình trên, công việc của chúng ta là **implement** chúng  qua một số ví dụ sau đây.
+ **Sample Project**
+ **Understand lifecycle methods order**
+ **Lifecycle methods With Some Examples**
+ **Summary**
+ **Conclusion**

### Sample project
Dưới đây là project mẫu về Lifecycle hook, bạn có download về và chạy thử nhé:
```
git clone https://github.com/bbachi/angular-lifecycle-hooks.git// install dependencies
npm install// start the project
npm start
```

Đây là app Todo list cho phép thêm, xoá, sửa các công việc. Qua ví dụ đơn giản này bạn sẽ về **Lifecycle hooks**.
![](https://images.viblo.asia/5ccd97d6-565a-4156-9444-2fcbdc6ede89.png)

### Understand lifecycle methods order
Chúng ta sẽ bắt đầu tìm hiểu **thứ tự hoạt động** của các method này, khi nào và tại sao chúng được dùng.<br>
Ở đây, chúng ta thêm các component header và footer màu xanh vào **App components'** view. Sau đó, đặt tất cả các method vào trong component footer, trong header chúng ta có 1 nút **Toggle Footer** dùng để kiểm tra phương thức ngOnDestroy().

### Without any input to component
Bắt đầu test với phần footer khi chưa có @Input decorator và nhấn **Toggle footer** để test phương thức **ngOnDestroy()**.

{@embed: https://gist.github.com/bbachi/0aad3ec852531db63043b89a93802c5d#file-app-component-html}

**Kết quả khi không có @Input decorator trong component**
![](https://images.viblo.asia/2d9429d1-cbf8-4aeb-9ea7-9991e76ee58c.png)

### With the input to component
Ok. Bây giờ thì test với @Input **footerText**  trong footer component để thấy sự thay đổi về thứ tự vòng đời nhé. Để ý là lần này thằng **ngOnChanges()** sẽ được gọi trước **ngOnInit()**.

{@embed: https://gist.github.com/bbachi/fc640e4b6fb240dd677b7e859e76301b#file-app-component-html}

... và kết quả là đây
![](https://images.viblo.asia/c320d9bf-b8cd-4fbf-8664-65b71a3ff1ec.png)

*Biểu đồ tổng quát thứ tự thực hiện các method trong Angular*

![](https://images.viblo.asia/31e6001f-ff3a-4eb8-b94d-e791251d532a.png)

Ok, **phần 1** bài viết chắc tới đây thôi. Cùng đợi tới bài viết kế tiếp nhé.