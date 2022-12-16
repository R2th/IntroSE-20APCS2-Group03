Render một trang web là quá trình hiển thị trang web bắt đầu từ lúc bạn nhận được dữ liệu từ server đến khi trang web được hiển thị đầy đủ trên màn hình (bao gồm hình ảnh, âm thanh, chữ viết). Quá trình này thực tế khá phức tạp và trải qua nhiều xử lý khác nhau, việc nắm được cách thức render giúp ích rất nhiều cho việc optimize tốc độ load trang. Quá trình này có thể được chia thành các giai đoạn chính sau:

1. Bắt đầu parse HTML.
2. load và parse external resources
3. Thực thi JavaScript
4. Hợp nhất DOM và CSSOM để xây dựng cây kết xuất
5. Tính toán bố cục và hiển thị cho người dùng

## Parse HTML

* Khi trình duyệt bắt đầu nhận dữ liệu HTML của một trang web, nó sẽ ngay lập tức đặt trình phân tích cú pháp của nó hoạt động để chuyển đổi HTML thành Document Object Model (DOM).

* Bước đầu tiên của quá trình phân tích cú pháp này là chia nhỏ HTML thành các tokens đại diện cho thẻ bắt đầu, thẻ kết thúc và nội dung của chúng. Từ đó nó có thể xây dựng DOM nodes.

![](https://images.viblo.asia/c240f720-e658-4438-9912-e4ba585e785b.png)

## External Resource
* Khi parser gặp một file extenal CSS, JS nó sẽ lấy các file đó, việc parse vẫn tiếp tục khi file CSS đang được tải nhưng việc render sẽ bị chặn cho đến khi nó được hoàn tất việc tải và parse.
* Các file JS có một chút khác  biệt là mặc định việc parse HTML sẽ bị chặn cho đến khi JS được tải xong. Tuy nhiên bằng cách thêm hai thuộc tính defer hoặc async vào thẻ script thì việc parse vẫn được thực hiện trong khi các file JS đang được tải. 
* Với defer thì file sẽ được execute sau khi việc parse document hoàn tất. Khi nhiều file có thuộc tính defer thì nó sẽ được execute theo thứ tự trên HTML

```
<script type="text/javascript" src="script.js" defer>
```

* Với async file sẽ được execute ngay khi load có thể là trong lúc parse hoặc sau lúc parse document.

```
<script type="text/javascript" src="script.js" async>
```
![](https://images.viblo.asia/119d9e50-1bfd-4163-8308-d19b7a251e57.png)

* Ngoài ra, các trình duyệt hiện đại sẽ tiếp tục quét HTML trong khi bị chặn và 'nhìn trước' những extenal resourse nào sắp xuất hiện và sau đó tải xuống. Để đánh dấu resource là quan trọng và cần được tải xuống trước thì có thể sử dụng thẻ link với rel = "preload".

```
<link href="style.css" rel="preload" as="style" />
```

## Parse CSS và build CSSOM
* Có thể bạn đã nghe nói về DOM trước đây, nhưng bạn đã nghe nói về CSSOM (CSS Object Model) bao giờ chưa?
* CSS Object Model (CSSOM) là một bản đồ của tất cả các selectors CSS và các trạng thái tương ứng với mỗi selector ở dạng cây.
* CSSOM, cùng với DOM, để xây dựng render tree, cây này được trình duyệt sử dụng để bố trí và vẽ trang web.
* Tương tự như các tệp HTML và DOM, khi các tệp CSS được tải, chúng phải được parse sang dạng cây - CSSOM. Nó mô tả tất cả các selector CSS trên trang, cấp và thuộc tính của chúng.

![](https://images.viblo.asia/461eaa74-d15c-4826-86c5-37ced0a32f68.jpeg)

## Execute the JavaScript
Các trình duyệt khác nhau việc thực hiện parse-compile-execute sẽ khác nhau. Lưu ý rằng việc parse JS rất tốn tài nguyên.
### Load events
* Sau khi JS đã được tải và DOM đã được parse event document.DOMContentLoaded sẽ được kích hoạt.
* Sau khi mọi thứ khác như async JavaScript, hình ảnh, v.v. tải xong thì sự kiện window.load sẽ được kích hoạt.
![](https://images.viblo.asia/64927bd0-217a-42ba-8604-a9d18e6dc05e.png)

## Merge DOM và CSSOM để tạo ra render tree
* render tree là sự kết hợp của DOM và CSSOM, và đại diện cho mọi thứ sẽ được hiển thị trên trang bao gồm cả các các node có style là opacity: 0 hoặc visibility: hidden nhưng sẽ không bao gồm node có style là display: none. Ngoài ra các thẻ như <head> không chứa thông tin hiển thị cũng sẽ bị bỏ qua.
    
![](https://images.viblo.asia/02dc75e1-8e9f-4021-b567-5eb33478e7dc.png)

## Tính toán layout và hiển thị
* Bây giờ chúng ta đã có một render tree hoàn chỉnh, trình duyệt biết phải kết xuất những gì, nhưng không biết render nó ở đâu. Do đó, bố cục của trang (tức là vị trí và kích thước của mọi node) phải được tính toán. Render engine đi qua render tree, bắt đầu từ trên cùng và làm việc xuống dưới, tính toán tọa độ mỗi node sẽ được hiển thị.
* Sau khi hoàn tất, bước cuối cùng là lấy thông tin bố cục đó và hiển thị lên màn hình (paint).
    
 ![](https://images.viblo.asia/7c6c7277-d737-4cee-8368-342a4507c0df.png)