## 1. Mở đầu

+ Chào các bạn, sau khi đi qua ba phần đầu của series: `Docker - Chưa biết gì đến biết dùng` 
+ Chúng ta đã tìm hiểu vai trò, cách sử dụng `Dockerfilke` && `docker-compose.yml` để ứng dụng `Docker` vào trong dự án.

![](https://images.viblo.asia/48deb81c-a4bd-4294-9202-266cc90b2f18.png)

+ Hôm nay, chúng ta sẽ tiếp tục tìm hiểu một số cách để `tối ưu` công cụ này nhé !

+ Bài viết tiếp tục dựa trên `Rails framework` để tìm hiểu, nhưng tác giả sẽ cố gắng để viết tổng quát vấn đề.
## 2. Docker-compose up

+ Sau khi chúng ta gõ [docker-compose up](https://docs.docker.com/compose/reference/up/) thì 

  + Câu lệnh này sẽ  `pull` / `build` tất cả cả các `images` mà chúng ta đã định nghĩa
  
  + Trong trường hợp máy đã `có sẵn` image thì sẽ được skip bước này

    ![](https://images.viblo.asia/373824de-9ca1-4126-a76e-b54cc0e549c7.png)

  + Tiếp theo là `run image` và `create container`.

    ![](https://images.viblo.asia/1d627995-28cc-4405-9e4c-26898f1ea68c.png)


   +  Rồi đính kèm chúng với các `service` tương ứng (Luôn nhớ rằng mỗi `container` ứng với một máy ảo)


  + Câu lệnh này sẽ tổng hợp `logs` của tất cả các `container` và hiển thị lên `Terminal`  

  + Ở [đây](https://github.com/HoanKy/docker_tutorial/tree/rails) có `mysql service` và `app service` nên có `logs` của 2 bác này, màu hiển thị cũng khác nhau cho chúng ta dễ phân biệt.

    ![](https://images.viblo.asia/9cafeb3b-a420-450d-9f53-09a73550493d.png)

  + Khi muốn tắt `service` thì nhấn tổ hợp phím  `Ctrl + C`

    ![](https://images.viblo.asia/026d6812-0d03-49cb-a57a-62ce2096f327.png)

  + Nếu như bạn dùng  `docker-compose up -d` thì các `containers` sẽ chạy ngầm, màn hình `Terminal` sẽ không hiển thị `logs`
 
    ![](https://images.viblo.asia/3c6f738b-07e8-4ff7-9d1d-cbf268ddc76c.png)

---

+ Với cách triển khai này thì có chút nhược điểm như sau:

  + Như bạn thấy ở trên, khi `Ctrl + C` thì sẽ tắt tất cả `service`, 
  + Khi `docker-compose up` thì lại bật tất cả chúng lên. 
  + Cứ tắt bật, tắt bật tất cả `service` liên tục như thế, trong project này chỉ có 2 `service` nên có vẻ chưa hề hấn gì nhưng nếu số lượng `service` lớn hơn (ví dụ `mysql` + `redis` + `nginx` ....) thì cũng mất kha khá thời gian đấy.

  + Hơn nữa, khi chúng ta debug code trên Terminal, kiểu như thế này

    ![](https://images.viblo.asia/fd541956-bfc7-47fc-9c04-2d8293327ebc.png)

  + Thì `docker-compose up` sẽ không dừng hiển thị `logs` để chúng ta `kiểm tra giá trị` của các biến chẳng hạn, 
  + Mà bỏ qua một cách lạnh lùng, như thế này.

    ![](https://images.viblo.asia/7e189d7a-c7eb-4212-8aeb-806277b46ded.png)

  + Bởi vì `docker-compose up`  hiển thị `logs` tổng hợp của tất cả `service`
  + Không vì một `service` nào mà dừng lại cả, như vậy là chúng ta không `debug` được.

---

` -> Giải pháp là gì ?`

+ Thay vì bật tất cả `containers` lên cùng một lúc 

+ Chúng ta sẽ bật các `background containers` lên trước (ví dụ: mysql, redis ...) 

+ Sau đó mới bật ` main container` (ví dụ: app). 

+ Khi stop thì ta chỉ stop `main container` thôi, các `background containers` vẫn chạy ngầm bên dưới.

+ Câu lệnh

  + Start background container( chỉ 1 lần khi mới mở máy tính lên )

    ```
     docker-compose up -d mysql 
     docker-compose up -d redis
     docker-compose up -d woker 
    ```

  + Start main container
    ```
     docker-compose run --rm -p 3000:3000 app rails s
    ```
        
   
   -> Với cách này chúng ta sẽ luôn có `background service already running` , thời gian khởi động ứng dụng sẽ giảm xuống.
   
   -> `docker-compose run` sẽ dừng để bạn có thể debug, `--rm` sẽ xóa chính container này đi khi bạn stop nó.
   

## 3. Makefile

+ Phải công nhận là gõ những dòng `docker-compose up -d ...` nhiều như vậy thật là mệt.

![](https://images.viblo.asia/bd1e63a7-fec6-4522-98c0-fd86f7a64c38.gif)

+  Chưa kể `docker-compose build`, `up` rồi `down`, `run` ...

+ Vậy thì hãy dùng [Makefile](https://www.google.com/search?newwindow=1&ei=dGHnXKL9CNOvoASssrrQAw&q=what+is+makefile&oq=what+is+makefile&gs_l=psy-ab.3..0j0i7i30l9.5372.10460..10962...8.0..0.100.1267.14j1......0....1..gws-wiz.......0i71j35i39j35i304i39j0i13j0i19j0i13i30i19j0i8i13i30i19j0i13i30.Nb1soXCxWms), công dụng của nó thì có nhiều hơn nhưng ở đây mình chỉ ứng dụng nôm na giống như [Git alias](https://viblo.asia/p/hieu-ro-hon-toi-uu-va-su-dung-phim-tat-cho-terminal-ORNZqowM50n#_5-tao-alias-trong-terminal-12) vậy, không cần phải ghi nhớ và gõ nhiều câu lệnh. 

+ Thay vì phải gõ từng câu lệnh một 
  
    ```
    docker-compose up -d mysql 
    docker-compose up -d redis
    docker-compose up -d worker 
    ```

  hoặc ngắn hơn 
    ```
    docker-compose up -d mysql redis worker
    ```

  thì hãy  viết vào trong Makefile:
     ```
    up:
        docker-compose up -d mysql redis worker
    ```

  và 
    ```
    dev: 
        docker-compose run --rm -p 3000:3000 app rails s
    ```

+ Khi đó, trên Terminal gõ `make up`  để start các `background containers`, sau đó gõ `make dev` để start `main container`

+ Mình có push code mẫu lên [GitHub](https://github.com/HoanKy/docker_tutorial/blob/rails_mysql_optimum/Makefile#L22)

+ Hơn nữa, khi có một member mới vào dự án và chưa rõ về Docker (có thể là member của team front end chẳng hạn), khi support setup project, bạn chỉ cần [hướng dẫn](https://github.com/HoanKy/docker_tutorial/tree/rails_mysql_optimum#use-docker-for-development).

   + Chạy `make up` để bật các tiến trình nền.
   + Chạy `make dev` để start project.
   + Chạy `make test` để test code trước khi gửi pull request.

Mà bản thân họ không cần phải có quá nhiều kiến thức về Docker, khá là tiện lợi phải không  :v:

![](https://images.viblo.asia/9ba52ce7-d018-485c-b69b-7b134ecee5fb.jpg)

## 3. Depends_on && links

+ Ở một số [hướng dẫn](https://docs.docker.com/compose/rails/), chúng ta có thể nhìn thấy sử dụng [depends_on](https://docs.docker.com/compose/compose-file/#depends_on) & [links](https://docs.docker.com/compose/compose-file/#links), ví dụ:
```
  app:
    build: .
    container_name: app
    depends_on:
      - mysql
      - redis
```

hoặc 
```
  app:
    build: .
    container_name: app
    links:
      - mysql
      - redis
```

+ `depends_on` và `links` được dùng để thể hiện sự phụ thuộc giữa các `service`, nó tạo ra các hành vi:

    +  `docker-compose up` sẽ khởi động các `service` theo thứ tự phụ thuộc, ở đây sẽ là khởi động `mysql` và `redis` trước. 
    +  `docker-compose up app` - tức là khi bạn chỉ khởi động 1 service đơn lẻ thì service `mysql` và `redis` vẫn sẽ được khởi động.

+ [Sự khác nhau giữa hai đồng chí này](https://stackoverflow.com/a/39658359), thậm chí [links](https://docs.docker.com/compose/compose-file/#links) cuối cùng có thể được gỡ bỏ, thay vào đó các service nằm trong cùng một network thì có thể tự tìm thấy nhau.
+ Thì đấy, bạn có thể giải quyết [vấn đề này](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-3-docker-compose-3P0lPm6p5ox#_note-11) bằng cách sử dụng `depends_on` nhưng nhược điểm thì đã nên ở trên, cứ bật lên tắt xuống mất khá nhiều thời gian, trong thực tế `service mysql` có thể mất tới gần 20s để khởi động.
+ Thậm chí khi `mysql container` đã chạy sẵn mà bạn `run container app` lên thì Docker vẫn tạo mới một `mysql container` nữa chứ không sử dụng `mysql container` đó. 

## 4. CMD && entrypoint



## 5. Layers và images
  + `Docker image` được xây dựng dựa trên các `layers` xếp chồng, giống như việc bạn xếp nhiều viên gạch chồng lên nhau vậy.
  + Cùng xem cách Docker build image
        ![](https://images.viblo.asia/54faf26c-2c3b-4c77-bf87-a878d94b80b2.png)
    +  `mysql uses an image, skipping`: Container mysql sử dụng image có sẵn bên không cần build image nữa -> `skipping`
    +  `Building app`:  Bắt đầu build image cho `container app`.
    +  `Step 1/15`, `Step 2/15`, `Step 3/15` ... Từng câu lệnh trong `Dockerfile` sẽ được thực thi và sẽ tạo ra các `layers` tương ứng.
            
          Nếu câu lệnh trước đó đã được thực thi và tạo `layer` thì Docker sẽ sử dụng `layer` cũ đó chứ không tạo `layer` mới nữa, giúp `giảm thời gian` build image và nếu ở một `layer` có sự thay đổi thì kể từ layer đó trở về sau, tất cả sẽ được build lại.
          
          

  +  Dùng `docker images -a` để kiểm ra danh sách các images nhé.
  
        ![](https://images.viblo.asia/b31445f2-1123-4f74-a3d8-07df1ba6ca28.png)

   > Oài, sao nhiều `none image` vậy ? Chúng là gì, sao dung lượng của chúng lớn vậy ? Nó sẽ tiêu thụ nhiều không gian ổ cứng à ?
   + Thực ra `none image` chính là những `layers`, hãy xem cách Docker pull images về như thế nào.
   
   ![](https://images.viblo.asia/87c80422-d1ae-4c53-bb45-983a62855606.png)
   
   + Cũng tương tự như khi chúng ta `build image` vậy, từng `layer` được xây dựng theo mô hình cha con, sinh sau đẻ muộn hơn thì là `layer con`, kế thừa từ `layer cha`, tất cả đều được đặt tên là `<none>` như bức ảnh ở trên, đến `layer` cuối cùng thì mới đầy đủ `image` của chúng ta và đặt tên chính xác. Cùng xem kích thước các `layers` tăng dần kìa.
   
     ![](https://images.viblo.asia/b075da82-5b20-4317-b2a2-e9f393412c59.png)
     
     + Dòng ` ---> Using cache` xuất hiện mỗi khi bạn `build image` chính là tái sử dụng các `layers`. Những `layers` mà không được tái sử dụng nữa được gọi là `dangling images`, tạm dịch là những `image` lơ lửng -> nó không trỏ tới `images` nào cả.
   
     + Ủa lạ hây, phải gọi mà `dangling layers` mới đúng chứ nhỉ ? Các tài liệu mà mình tham khảo chưa thấy có khái niệm [dangling layers](https://www.google.com/search?newwindow=1&ei=w1uXXLuFGIO_wAO49rfoDQ&q=dangling+layers+docker&oq=dangling+layers+docker&gs_l=psy-ab.3..0i22i30.1838.4144..4153...2.0..0.407.1522.1j2j3j0j1......0....1..gws-wiz.fz1wnCHDa1c), chỉ có [dangling images](https://www.google.com/search?newwindow=1&ei=yFuXXJ2CIZi5wAOx1ovADQ&q=dangling+images+docker&oq=dangling+images+docker&gs_l=psy-ab.3..0i203l2j0i5i30l5j0i7i5i30j0i5i30j0i8i30.161652.162575..162597...1.0..2.484.1547.1j1j1j2j1......0....1..gws-wiz.......0i71j0i7i30j0i8i7i30j0i8i7i10i30.dK2m3zte-DY) thôi. Mà câu lệnh `docker images -a` cũng trả về cả danh sách `images` && danh sách `layers` nữa, `-a` là viết tắt của `all`, thế `layers` với `images` là `sêm sêm` nhau à. Cũng có thể hiểu như vậy, vì nếu trong `Dockerfile`, ta xóa bỏ đi vài dòng cuối, thì `layers` ngoài cùng đó trở thành `images` còn gì :D :D :D 
    
## 6. Một vài lưu ý nhỏ

Có một chút lưu ý khi sử dụng Docker như sau:

+ Quy định `phiên bản` của image chi tiết nhất có thể.
     + Nếu bạn define 
        ```
        services:
          mysql:
            image: mysql
            container_name: mysql
        ```
        thì mặc định, Docker sẽ pull `image mysql phiên bản mới nhất về`, ở thời điểm bạn viết `Dockerfile` thì có thể mysql phiên bản mới nhất là `5.7` nhưng đến khi người khác settup project thì có thể nó đã lên tới phiên bản `8.0`
        
   + Và ở giữa phiên bản có những sự thay đổi nhất định, có thể một `hàm, phương thức` nào đó hoạt động tốt ở `mysql 5.7` nhưng không hoạt động tốt ở `mysql 8.0`, ví dụ vậy. Như thế sẽ dễ phát sinh bug tiềm ẩn và cũng vi phạm tính đồng nhất môi trường mà `Docker` lấy làm tôn chỉ.

+ Ở Dockerfile, các phần dễ thay đổi thì thực hiện về sau.

  + Như lý thuyết về phần `layer` đã nhắc tới, nếu ở một `layer` có sự thay đổi thì kể từ layer đó trở về sau, tất cả sẽ được build lại
  
  + Do vậy, những câu lệnh nào có khả năng thay đôỉ cao, bạn hãy đặt nó xuống dưới cùng.
  
+ Hãy xóa bỏ những `layers` không cần thiết
     + Những `dangling images` không còn hữu ích nữa, chúng cũng không được Docker tự động xóa, mà chúng ta sẽ xóa thủ công nó đi để giải phóng bộ nhớ. Cũng chưa rõ các phiên bản sau này, Docker có tự động xử  lý việc này không 
     
     + Hôm nay là 24/03/2019, Dương lịch, Linux OS
     
        `docker -v -->> Docker version 18.09.0, build 4d60db4`
     
       1. Danh sách images:
       
       ![](https://images.viblo.asia/28cacecc-3f9c-41bf-91c0-5cceb9f637d5.png)
       
       2. Chỉnh sửa nội dung 1 dòng lệnh gần cuối của `Dockerfile` (giữ nguyên số lượng câu lệnh) và tiến hành `build image` thì thấy từ vị trí thay đổi trở đi không còn được sử dụng `cache` nữa
       
       ![](https://images.viblo.asia/0bf4a9b6-1371-43fa-8981-1620a83c11f3.png)
       
       3. Kiểm danh sách images thì thấy số lượng `none images` tăng lên -> Oh, đúng rồi ^_^
       
       ![](https://images.viblo.asia/1777c384-9f5e-4429-b7ce-e0ceed647696.png)
       
       4. Kiểm tra danh sách image "lơ lửng", xóa nó đi và kiểm tra lại
       
       ![](https://images.viblo.asia/453ca6cd-1842-439d-8709-f54bfaa4de1c.png)
       
       Danh sách `none images` chỉ hiển thị id của `layer` tại vị trí mà bạn thay đổi, khi xóa nó thì sẽ xóa tất cả `layers con` đi kèm.
       
       Ngoài ra có thể  tham khảo lệnh ` docker system prune` để dọn dẹp cho `Docker`
## 5. Updating ...

+ Trong phần 5 chúng ta sẽ cùng tìm hiểu về deploy with Docker nhé (bao gồm cấu hình nginx, sử dụng haproxy ....) Mời mọi người đón đọc.