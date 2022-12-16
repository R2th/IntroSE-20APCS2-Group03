Hello các bạn lại là mình đây 👋👋

Cuối tuần các bạn có đi đâu không?.......Không thì mở blog của mình ra đọc nhé, đọc cho mình cảm thấy blog của mình đỡ ế 🤣🤣🤣🤣

Tiếp tục với [series học Docker](https://viblo.asia/s/jeZ103QgKWz), ở bài này ta sẽ cùng nhau setup Hadolint để lint Dockerfile đảm bảo là project của chúng ta luôn có 1 Dockerfile chuẩn sạch đẹp nhé ;)

Mình hứa đây sẽ là 1 trong những bài ngắn và "tàu nhanh" nhất trong cả series.

Triển thôi nào 🚀🚀🚀
# Giới thiệu vỡ lòng chút
Ở thời điểm hiện tại, gần như bất kì ngôn ngữ (hay script) nào bạn viết, C, C++, Java, javascript, Ruby, YAML, ... thì đều có linter cả. Dockerfile cũng không ngoại lệ.

Linter sẽ giúp chúng ta kiểm tra xem code ta viết có theo 1 chuẩn nào đó xác định không, có lỗi gì không, có biến nào khai báo xong quên không dùng không, .... ti tỉ thứ trên đời.

Ở bài này ta sẽ setup Hadolint để check Dockerfile: cải thiện + tìm ra các lỗi trước khi build và chạy image nhé ;)

# Setup
Đầu tiên ta tạo 1 folder mới tên là: `test-hadolint` nhé (hoặc tên là gì cũng được tuỳ các bạn :))

Trong đó ta tạo 1 file Dockerfile:
```dockerfile
FROM debian
RUN export node_version="0.10" \
&& apt-get update && apt-get -y install nodejs="$node_verion"
COPY package.json usr/src/app
RUN cd /usr/src/app \
&& npm install node-static

EXPOSE 80000
CMD ["npm", "start"]
```
Ở trên như các bạn thấy ta `FROM` từ image `debian` (cùng họ hàng với Ubuntu), sau đó cài nodeJS và start app lên. Giờ ta thử lint Dockerfile xem nó có lỗi gì nhé.

Thật sự là với sự ra đời của Docker thì ta chẳng cần phải mất công cài đặt bất kì thứ gì vào máy nữa: mysql, redis,... và cả Hadolint. Đơn giản là ta chạy image của Hadolint -> xong.

Các bạn chạy cho mình command sau, ở trong folder `test-hadolint` của chúng ta nhé:
```
docker run --rm -i hadolint/hadolint < Dockerfile
```
Ta thấy in ra như sau:

![Screenshot 2022-10-29 at 12.13.43 PM.png](https://images.viblo.asia/76fc2e37-bf5d-4b77-acc1-16dfe6f29e60.png)

Như ở trên ta thấy báo 1 số lỗi như:
- Warning (cảnh báo): nên luôn thêm tag cho image FROM, hiện tại ta không nói gì thì mặc định là `latest`, nhưng latest ở năm 2022 là v11, nhưng 2030 có thể là v50 rồi. Do vậy để viết Dockerfile mà 10 năm sau vẫn chạy thì nhớ để tag nhé các bạn
- Info (kiểu đề xuất, gợi ý cho mình, còn không thì cũng không sao)
- Error (có lỗi hoặc thứ gì đó không hợp lệ): ở đây ta EXPOSE port 80000 trong khi port cho phép là 0 -> 65535

Từ những thông tin này ta có thể update để có 1 Dockerfile tốt hơn, rõ ràng hơn, không gặp lỗi (ở hiện tại hoặc tương lai), 10 năm sau vẫn chạy 💪💪💪

Ngoài ra Hadolint cũng cho ta thêm 1 số option khác để custom những rule để check, ignore error, format output,.... Các bạn có thể check [ở đây](https://github.com/hadolint/hadolint#cli) nhé.

Hết!

.

.

.

.

.

Ủa gì mà nhạt dữ vậy, đã mất công viết thì vết cái gì cho "ra dẻ" tí đi chứ?😂😂😂. 

Oke thì ra dẻ 😎
# Tích hợp với CICD
Ở trên như các bạn thấy là ta đang chạy Hadolint ở local, tự chạy, nhưng ở trong 1 project nhiều người, sẽ khó để đảm bảo là anh em luôn chạy Lint trước khi commit, và kể cả anh em có chạy thì có đảm bảo là anh em sẽ fix những lỗi in ra hay không. Hay anh em giả vờ "mắt không thấy tai không nghe" 🙃🙃

Để đảm bảo là ta luôn check thì ta nên có 1 công cụ check tự động mọi commit đẩy lên git, và tất nhiên giải pháp đầu tiên ta nghĩ tới là dùng CICD rồi.

Hadolint có sẵn [Hadolin Action](https://github.com/hadolint/hadolint-action) nên ở bài này ta sẽ dùng Github nhé ;)

Vẫn ở trong folder `test-hadolint` các bạn tạo cho mình 1 folder tên là `.github`, bên trong đó tạo tiếp 1 folder tên là `workflows`, bên trong `workflows` thì ta tạo file `lint-dockerfile.yml` với nội dung như sau:
```yml
name: Lint Dockerfile

on: [push]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2 
    - uses: hadolint/hadolint-action@v2.0.0
      with:
        dockerfile: Dockerfile
```

Oke tiếp theo ta lên Github tạo repo tên là `test-hadolint`, public hay private đều được nhé. Và sau đó ta commit code ở local lên, mở terminal ở folder `test-hadolint` của chúng ta ở local và chạy lần lượt các command sau:

```
git init
git remote add origin https://github.com/maitrungduc1410/test-hadolint.git
git add .
git commit -m "first commit"
git push -u origin master
```
> ở trên đoạn add origin là username của mình, các bạn thay tên github username của các bạn vào nhé

Ngay sau khi push, ta lên Github sẽ thấy Action bắt đầu chạy:

![Screenshot 2022-10-29 at 12.32.06 PM.png](https://images.viblo.asia/5cb6f9c4-fca9-4509-857e-791791f5f4da.png)

Click vào job đang chạy đó để xem chi tiết ta thấy như sau:

![Screenshot 2022-10-29 at 12.32.13 PM.png](https://images.viblo.asia/74208f29-9bf8-4dbb-8a8c-bf7bc47e8456.png)

![Screenshot 2022-10-29 at 12.32.23 PM.png](https://images.viblo.asia/112caf05-fae9-4e2d-8f8c-30938211ef5e.png)

Như ở trên các bạn thấy rằng khi chạy Hadolint thì cũng cho ta kết quả tương tự nhưng pipeline bị lỗi, vì mặc định Hadolint action sẽ cho fail cả pipeline nếu bất kì check nào bị failed, không cần biết đó là error, warning hay info. Mình thấy cái default check này cũng ổn rồi, vì những thứ mà hadolint nói với chúng ta cũng toàn là thứ cần fix cả :)

Nếu các bạn không muốn Hadolint làm fail cả pipeline thì các bạn update lại như sau:
```yml
name: Lint Dockerfile

on: [push]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2 
    - uses: hadolint/hadolint-action@v2.0.0
      with:
        dockerfile: Dockerfile
        no-fail: true # ---->>> thêm vào đây
```
Sau đó ta commit lại code:
```
git add .
git commit -m "ci: ignore hadolint if failed"
git push origin master
```
Sau đó ta quay trở lại github, check job mới nhất sẽ thấy success, mặc dù Hadolint check thấy có lỗi:

![Screenshot 2022-10-29 at 12.38.21 PM.png](https://images.viblo.asia/6f796ecf-87ef-4f22-91ed-2a8765b46b00.png)

Hadolint Action cũng cho ta cấu hình các options giống như lúc chạy ở local, các bạn có thể xem thêm [ở đây](https://github.com/hadolint/hadolint-action) nhé.

> Thường thì mình sẽ cho fail luôn cả action, vì Dockerfile là file quan trọng, ta dùng nó để build cả app chạy cho production nên mọi thứ phải chuẩn chỉ
# Tí quên
Ở Github action ta đang để là `on: [push]` tức là mọi commit từ mọi branch push lên thì action sẽ đều chạy nhưng  bởi vì ở đây ta chỉ lint Dockerfile, nên ta sẽ không muốn chạy đi chạy lại action này trong trường hợp không có gì thay đổi cả, nên ta update lại 1 chút như sau nhé:
```yml
name: Lint Dockerfile

on:
  push:
    paths:
      - Dockerfile

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2 
    - uses: hadolint/hadolint-action@v2.0.0
      with:
        dockerfile: Dockerfile
        no-fail: true
```
Sau đó ta commit tiếp nhé:
```
git add .
git commit -m "ci: only run action if Dockerfile changed"
git push origin master
```
Sau đó ta quay trở lại Github để chắc chắn là không có job nào vừa được chạy:

![Screenshot 2022-10-29 at 12.42.47 PM.png](https://images.viblo.asia/dace4f7a-111b-4281-b639-81588d8f2ad8.png)

Oke ổn rồi đó, từ giờ thì chỉ khi nào ta đổi Dockerfile thì action mới chạy lại. Phần này là bài tập về nhà các bạn tự làm nhé (thử tạo thêm file mới xong commit lên xem, rồi sau đó thử update Dockerfile nữa ;))

# Chấm hết
Hi vọng qua bài này ta đã có thêm 1 tool hữu ích để có thêm cải thiện Dockerfile của chúng ta thêm nữa. Có 1 Dockerfile tốt cũng là giúp app của chúng ta khi được build và deploy cũng sẽ chạy tốt hơn.

Mong là bài nãy vẫn đủ "tàu nhanh" không quá dài với các bạn 😊

Thân ái chào tạm biệt, hẹn gặp lại các bạn ở những bài sau 👋👋