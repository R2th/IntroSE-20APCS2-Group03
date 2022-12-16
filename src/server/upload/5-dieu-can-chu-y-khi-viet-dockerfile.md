Ở trong bài viết này, mình dựa trên kinh nghiệm cá nhân trong việc quản lý Docker server và thực tế ở những dự án khác trong công ty để đúc kết tóm lược lại những điều cần lưu ý khi viết Dockerfile
## 1. Không để các file không cần thiết ở trong thư mục của Dockerfile 
Khi thực hiện lệnh `docker build` thì context (trạng thái hiện tại của folder) sẽ được transfer đến Docker demon. Cụ thể đó là ở trong thư mục chứa Dockerfile tất cả sẽ được nén lại thành file `tar` và được gửi đi. Do đó ở trong thư mục để không tốn thời gian dư thưa trong việc build chúng ta nên bỏ những file không sử dụng đến. 
Tuy nhiên thì ở trong thư mục project này có nhiều file image đã được build rồi cũng đang nằm ở trong đây, đây cũng là điều hay gặp phải, nên một giải pháp nữa đó là chúng ta khai báo những định dạng file dư thừa vào `.dockerignore` file để nó sẽ bị loại bỏ trong quá trình build nhé

## 2. Không nên chuyển đổi user nhiều
Ở trong Docker container thì cơ bản tất cả các command đều dùng quyền root để thực thi. Tuy nhiên lúc build thì thế nào cũng được, sau khi build nếu Application sử dụng quyền root để thực thi thì sẽ có thể xảy ra những lỗi không mong muốn. Vì vậy thực thế khi viết Dockerfile thì ta thường nên chỉ tạo các App thực thi cho user sử dụng app đó mà thôi. Ở cách viết thì ta không sử dụng các câu USER đa dụng mà đầu tiên ta ta sẽ viết các command cần sử dụng quyền root để thực thi trước, sau đó mới đến các câu command cho user đã được tạo ra. 

## 3. Không phải cd mà là WORKDIR
Chúng ta không nên sử dụng cd đến thư mục trong câu lệnh RUN mà ngay đầu tiên ta hãy setting thư mục bằng WORKDIR. sau đó chúng ta sẽ sử dụng đường dẫn tương đối/tuyệt đối để thực hiện tiếp
Không Nên : 
``` 
RUN cd /var/lib && \
  curl -L ... -O && \
  unzip app.zip
  cd app && \
  ...
```
Mà Nên: 
```
WORKDIR /var/lib/app
RUN curl -L ...
```
Khi câu lệnh RUN được thực hiện thư mục thực hiện được reset nên khi thực hiện thói quen cd có thể sẽ gây nhầm lẫn. Thêm nữa khi chúng ta setting folder WORKDIR thì khi thực hiện `docker run` WORKDIR sẽ trở thành thư mục tác nghiệp luôn. Sau đó khi đăng nhập vào trong container để tác nghiệp sẽ dễ hiểu hơn rất nhiều. 

## 4. Ở câu lệnh RUN bắt đầu bằng `set -x`
```
RUN set -x && \
  apt update && \
  apt upgrade -y --no-install-recommends &&
  apt install -y \
    curl \
    git \
    ...
```

Như ở ví dụ trên khi ta thực thi `set -x` thì khi `docker build` command sẽ được xuất ra nên ta có thể dễ dàng nhìn được quá trình build. Ngoài ra sử dụng `: "comment"` cũng xuất được các dòng ra rất thuận tiện 

## 5. Tạo file setting sử dụng { ... } | tee file
```
RUN : "apache.confを作成する" && { \
  echo "<VirtualHost *:80>";
  echo "  ServerHost example.com";
  echo "  DocumentRoot /var/www/html";
  echo "</VirtualHost>";
} | tee /etc/httpd/conf/apache.conf
```

Khi viết như ví dụ trên, các echo sẽ được add vào trong block, sau đó kết quả sẽ được ghi vào file rất dễ hiểu. 
Nói chi tiết hơn nó giống như `set -x` đó là thực hiện 2 lần xuất, xuất ra màn hình và xuất vào file. 


### Tham Khảo [Qiita](https://qiita.com/c18t/items/f3a911ef01f124071c95)