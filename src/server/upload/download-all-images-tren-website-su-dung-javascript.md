# 1. Vấn đề
Chắc hẳn trong thực tế khi làm các dự án việc phát sinh tính năng tải ảnh là rất nhiều.
Ví dụ như việc đơn giản là tải 01 ảnh chúng ta có thể làm như thế này. Như đoạn code dưới quá là đơn giản đúng không, ngay trong thẻ ``<a>`` chúng ta thể thuộc tính *"download"*  sẽ được tải xuống khi người dùng nhấp vào liên kết.
    
```
<a href="/images/myw3schoolsimage.jpg" download>
  <img src="/images/myw3schoolsimage.jpg" alt="W3Schools" width="104" height="142">
</a>
```
   
Nhìn qua ta thấy rõ việc tải ảnh là đơn giản đúng không. Vậy nếu ta phát sinh nhu cầu muốn click 1 lần mà tải được all ảnh thì sao? Tính năng đó không phải là một tính năng khó, đặc biệt đối với những bạn đã quá *"lão luyện"* javascript, nhưng đối với một số bạn *"newbie"* thì cũng phải mất chút thời gian tìm kiếm các giải quyết. Vậy nên hãy để mình giúp bạn.
Bài viết này của mình sẽ không thiên về giải thuật hay công nghệ mà chỉ đơn giản là chia sẻ cách làm của mình để có thể giúp các bạn xử lý những tính năng này nhanh hơn. Những bạn đã quá *"lão luyện"* có thể bỏ qua bài này
    
# 2. Giải pháp
Đâu tiên ta sẽ bắt click event ở nút tải ảnh

```
<input type="file" class="hide" id="images-src" data-images-src="{{ json_encode($images) }}">
```
    
```
$(document).on("click", "#download-images-btn", function() {
        const urls = $('#images-src').data('imagesSrc'); // get json imamges url
        downloadImages(urls);
    });
```
    
Sau khi ta đã có được 1 mảng các đường dẫn ảnh ta sẽ xử lý phần lấy tên file ta sẽ sử dụng hàng splitUrl. Còn nếu bạn muốn tất cả các ảnh render ra chung 1 tên thì có bỏ qua bước này và sẽ *fix cứng*  phần name ở bước sau.

```
const splitUrl = url.split("/");
const filename = splitUrl[splitUrl.length - 1];
```
    
Giờ tên ảnh cũng có rồi thì mình sẽ xử lý phần ảnh. Bình thường khi bạn lấy đường dẫn ảnh từ phía server trả về thì máy bạn sẽ chưa thể lưu lại về máy được bắt buộc bạn phải xử lý về đúng định dạng. Javascript đã cung cấp cho bạn để xử lý việc đó,  mình xử dụng arrayBuffer lưu ảnh dưới dạng `typedArray`, khởi tạo thành 1 object khi đi qua Blob và cuối cùng là tạo thành 1 đường dẫn từ ojbect đó createObjectURL. Chúng ta sẽ có 1 dạng như dưới ảnh
    
 ![](https://images.viblo.asia/3b8187f7-8bff-4335-a544-6621f492c237.png)


Đến đoạn này thì quá dễ rồi tên ảnh và đường dẫn ảnh cũng có rồi thì mình chỉ cần khởi tạo thẻ  ```<a>``` setAttribute là ```download``` append vào body đồng thời trigger click và thẻ ```a``` vừa tạo để tải ảnh về thôi. Mình sẽ show code ở dưới cho bạn tham khảo:
    
```
downloadImages = () => {
    if (_.isEmpty(urls)) {
        return false;
    }

    urls.map((url) => {
        const splitUrl = url.split("/");
        const filename = splitUrl[splitUrl.length - 1];
        fetch(url)
            .then((response) => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", filename); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });
}
```
    
   *Lưu ý:
    Nếu ảnh từ server trả về là link từ cdn thì cdn đó phải access CORS nhé, lúc ý mới tải được ảnh.*
    
# 3. Kết luận
Như vậy mình đã giúp những bạn *"newbie"* xử lý một task rất dễ dàng bằng javascript.
Bài viết dựa trên những hiểu biết cá nhân nên không tránh khỏi những thiếu sót, mọi người có thắc mắc hay phản hồi gì thì hãy comment xuống bên dưới để mình có thể giải đáp cũng như bổ sung để bài viết được hoàn thiện hơn. Cảm ơn các bạn đã theo dõi bài viết.