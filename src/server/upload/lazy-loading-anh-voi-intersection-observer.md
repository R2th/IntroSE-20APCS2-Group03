Hình ảnh là thành phần gần như không thể thiếu trong các trang web hiện nay khi mà nó có thể là banner, hình ảnh sản phầm, logo...  giúp cho trang web trở nên sinh động, dễ nhìn hơn. Nhưng đáng buồn thay nó lại là một trong những thứ có kích thước lớn nhất trong trang web, chiếm một phần không nhỏ trong dữ lệu tải về của người dùng. Thử tưởng tượng rằng bạn vào một trang web thương mại điện tử, trong trang đó có hàng chục bức ảnh mô tả sản phẩm và bạn phải đợi trình duyệt tải từng bức ảnh về một, điều đó thật tệ hại phải không?

Trong bài viết này mình sẽ nói sơ qua về kỹ thuật **Lazy loading** giúp cho việc tải nội dung của trang web một cách linh động và hiệu quả hơn bằng cách tải từng phần thay vì tải toàn bộ nội dung của trang web.

# Lazy loading
Lazy loading là kỹ thuật chỉ tải những nội dung đang được được người dùng sử dụng đến thay vì tải toàn bộ trang web. Lazy loading được dùng với mục đích làm tăng hiệu suất và giúp cho trải nghiệm của người dùng trở nên tốt hơn.


## Tại sao cần đến Lazy loading?
**Tăng trải nghiệm người dùng**

Thử tưởng tượng rằng bạn có một trang web với hàng chục sản phẩm, mỗi sản phẩm lại chứa 2 đến 3 bức ảnh mô tả. Nếu người dùng truy cập vào trang web lần đầu tiên thì họ sẽ phải tải toàn bộ số ảnh đó về máy mà kích thước của số ảnh đó là không hề nhỏ dẫn đến thời gian tải trang web sẽ bị kéo dài ra. Thứ đập vào mắt anh ta là hàng loạt những icon đang xoay đều như những... Điều đó thực sự gây khó chịu vì chẳng ai là thích chờ đợi cả, sau nhiều lần như vậy anh ta quyết định không quay trở lại trang web đó nữa. Còn đối với lazy loading, lưu lượng mạng sẽ được ưu tiên dùng để tải những tài nguyên cần thiết, những thứ đang hiển thị trên màn hình, người dùng scroll đến đâu tài nguyên sẽ được load đến đó.

**Tránh lãng phí dữ liệu**

Không phải lúc nào người dùng cũng xem hết nội dung trang web thế nên việc kéo toàn bộ dữ liệu về là việc không cần thiết nhất là đối với các kiểu kết nối có lưu lượng bị giới hạn.

**Tránh lãng phí tài nguyên và thời gian xử lý**

Việc tránh tải những dữ liệu chưa dùng đến giúp tiết kiệm tài nguyên CPU, bộ nhớ, lưu lượng... cho phía người dùng cũng như giảm tải cho phía cung cấp dịch vụ.

# Intersection Observer
**Intersection Observer** là một API giúp bạn xác định xem vùng nào của trang web đang hiển thị trên màn hình của người sử dụng từ đó có thể đưa ra những phương pháp xử lý phù hợp. Intersection Observer khá là đơn giản và dễ dùng, đem lại hiệu suất cao nhưng có một lưu ý nhỏ là một vài trình duyệt phiên bản cũ không hỗ trợ nó vì nó mới xuất hiện gần đây. Riêng hai đứa là IE và Opera Mini là không chơi với thằng này, bạn có thể tham khảo [ở đây](https://caniuse.com/intersectionobserver).

![](https://images.viblo.asia/f565055d-8f5e-4f57-93b3-43f51c85cc95.PNG)

Chính vì nó có thể xác định được vùng nào đang hiển thị với người dùng nên sử dụng để lazy loading ảnh khá hiệu quả, ngoài ra nó còn được sử dụng để làm chức năng cuộn vô hạn, hay tính toán khả năng hiển thị của quảng cáo...

## Lazy loading ảnh với Intersection Observer
Thông thường một bức ảnh sẽ được tải xuống thông qua thẻ `<img>` hoặc thuộc tính `background, background-image...`. Hãy xét trường hợp thẻ `img` trước.

Trong thẻ `<img>` đường dẫn của ảnh được khai báo thông qua thuộc tính `src`. Nếu thuộc tính đó có chứa dữ liệu thì trình duyệt sẽ tự động tạo request để tải về nội dung của bức ảnh mà không cần biết nó nằm ở đâu, nó đã được hiển thị trên màn hình của người dùng hay chưa mà chỉ cần biết là có `src` thì tải về mà thôi. Vì vậy để lưu lại đường dẫn của ảnh để thực hiện lazy loading ta có thể sử dụng thuộc tính `data-src` lúc đó trình duyệt sẽ bỏ qua và không tải ảnh về nữa.

Một đối tượng `IntersectionObserver` thì sẽ trông như thế này:
```
const observer = new IntersectionObserver(callback, options)
```
IntersectionObserver nhận vào hai tham số là `callback` và `options`. Mình sẽ nói qua về `options`, nó là tham số được truyền vào dưới dạng *object* cho phép tùy biến lại một vài cấu hình giúp cho việc sử dụng trở nên linh hoạt hơn. `Options` gồm 3 thuộc tính chính:
```
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
}
```
- **root**: phần tử cha của phần tử cần áp dụng lazy loading và có thể cuộn được, dùng để xác định xem phần tử nhắm đến hiện đang nằm trong nó hay không. Thông thường `root` sẽ là phần của trang web đang hiển thị trên màn hình của người sử dụng (viewport). Để khai báo *viewport* là root, ta để giá trị là null và đó cũng là giá trị mặc định. Trong ảnh dưới vùng màu xanh là `root`, phần màu cam đất là phần tử nhắm đến, trong bài viết này sẽ là ảnh cần áp dụng lazy loading.

![](https://images.viblo.asia/a4333cfd-78ba-4fd0-8b26-ba8a654438bd.png)

- **rootMargin**: bạn có thể hiểu nó là lề của thành phần `root` kể trên, cách sử dụng thì cũng giống như thuộc tính *margin* trong CSS, có thể chứa một hay nhiều tham số truyền vào tùy theo cách sử dụng. Nó giúp tăng hoặc giảm giới hạn của `root`, từ đó giúp cho việc sử dụng trở nên linh hoạt hơn. Giá trị mặc định của nó là 0px.

![](https://images.viblo.asia/14314e77-55e6-47e1-af09-7ec716fe5a30.png)


- **threshold**: thuộc tính này cho biết tỷ lệ phần trăm mức độ hiển thị của đối tượng nhắm đến, nếu vượt quá con số đó hàm `callback` sẽ được thực hiện. Mặc định giá trị này là 0, nghĩa là chỉ cần 1 pixel của đối tượng nhắm đến hiển trị trên viewport của người dùng thì `callback` sẽ được thực thi ngay lập tức.

![](https://images.viblo.asia/e4e19d4f-da45-4ba7-8611-1732d5a97a91.png)

Để áp dụng lazy loading với ảnh trong thẻ `img`, ta lưu đường dẫn đến ảnh qua thuộc tính `data-src` rồi trong phần callback thì sẽ đặt lại giá trị thuộc tính `src` của ảnh bằng với `data-src`. Khi đó trình duyệt sẽ tải xuống ảnh ngay lập tức.
```
let observer = new IntersectionObserver((entries, observer) => { 
    entries.forEach(entry => {
    if(entry.isIntersecting){
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
    }
    });
}, {
    threshold: 0.7
});

document.querySelectorAll('img').forEach(img => { observer.observe(img) });
```

{@embed: https://codepen.io/nam-dng-the-animator/pen/LYNBKJM}

Ngoài thẻ `img` ra thì ảnh còn được tải xuống qua thuộc thính `background`. Để áp dụng lazy loading cho thuộc tính `background` thì ta sẽ phải dùng đến một số mẹo nhỏ trong CSS. 

Ví dụ ta có thẻ `div` có class là *content* và trong class *content* đó có khai báo đủ thuộc tính `background-image`. Để ngăn trình duyệt tải xuống ảnh của phần background-image, ta thêm một class *lazy-background* sau class *content*. Class *lazy-background* sẽ khai báo `background-image` là **none** hoặc đường dẫn của ảnh placeholder, ghi đè lên giá trị có trong class *content* kia. Và khi cần load background thì ta chỉ cần loại bỏ class *lazy-background* đi, background sẽ được trả về với giá trị ban đầu và ảnh sẽ được tải xuống.

```
let observer = new IntersectionObserver((entries, observer) => { 
    entries.forEach(entry => {
    if(entry.isIntersecting){
        entry.target.classList.remove("lazy-background");
		observer.unobserve(entry.target);
    }
    });
}, {
    threshold: 0.7
});

document.querySelectorAll('div').forEach(div => { observer.observe(div) });
```

{@embed: https://codepen.io/nam-dng-the-animator/pen/ZEWjgvm}

## Image placeholder

Để cải thiện chút về mặt trải nghiệm của người dùng thì trong khi đợi ảnh chính được tải về thì chúng ta nên tạm thay thế nó bằng một ảnh *placeholder*. Thông thường cách hay dùng nhất là thay thế tất cả bằng một ảnh [**trông như thế này**](https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081) hoặc sử dụng một ảnh có chung màu nền để thay thế.

Đó là cách đơn giản nhất và dễ thực hiện nhất nhưng để tăng thêm trải nghiệm cho người dùng thì ta có thể thay thế nó bằng màu sắc chủ đạo của bức ảnh đang được tải xuống. Điều đó tránh sự thay đổi đột ngột về màu sắc khi bức ảnh được tải về hoàn chỉnh đồng thời cũng tránh được sự tẻ nhạt khi gặp quá nhiều bức ảnh placeholder giống nhau. Để làm điều đó bạn có thể tham khảo một thư viện của [**manu.ninja**](https://manu.ninja/dominant-colors-for-lazy-loading-images/).

Có một ý tưởng tốt hơn đó là sử dụng ảnh có chất lượng thấp hơn ảnh gốc nhiều lần làm placeholder. Lưu ý rằng đây là ảnh có chất lượng thấp nên kích thước sẽ nhỏ hơn ảnh gốc rất nhiều lần có thể chỉ bằng 1/10, 1/15.. kích thước so với ảnh gốc và thường nó sẽ được sử dụng với chức năng *infinite scrolling* thế nên xét chung nó chỉ ảnh hưởng nhỏ đến phần hiệu năng mà tăng được đáng kể trải nghiệm của người dùng, cũng đáng để đánh đổi.

# Tham khảo
https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

https://blog.arnellebalane.com/the-intersection-observer-api-d441be0b088d

https://codepen.io/rpsthecoder/pen/pByZjR