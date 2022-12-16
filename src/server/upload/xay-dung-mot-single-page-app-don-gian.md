**Single Page App đang dần trở thành một xu hướng trong việc phát triển ứng dụng Web, cứ nhìn vào việc google hay facebook cũng đang áp dụng nó vào sản phẩm của mình là biết =)). Mình cũng là người mới bắt đầu tìm hiểu về nó bài viết này mang tính giới thiệu cho nhưng người đang quan tâm đến SPA và muốn 1 bản demo đơn giản để có động lực đào sâu nghiên cứu.**
1. **Single Page App (SPA) là gì?**
* Cái tên nói lên tất cả :) SPA  là một trang web hay một ứng dụng web, mà tất cả những thao tác xử lý của trang web đều được diễn ra trên một trang duy nhất. Với mục đích chính là nâng cao trải nghiệm người dùng, giúp người dùng cảm thấy như đang sử dụng desktop application.
* Với một trang web truyền thống, khi người dùng yêu cầu một trang web, thì server sẽ tính toán và trả về trang web đó cho người dùng toàn bộ trang web dưới dạng mã html. Hầu như không có bất kỳ sự liên kết nào giữa 2 yêu cầu gần nhau. Do đó khi có nhiều yêu cầu được diễn ra thì sẽ làm quá trình tính toán diễn ra lâu hơn, bởi hệ thống phải tính toán nhiều thành phần trước khi trả về một trang web hoàn chỉnh.
* Với SPA lại khác, ở lần request đầu tiên, hệ thống sẽ trả về tất cả code xử lý cũng như code hiển thị của toàn bộ trang web, ở những yêu cầu tiếp theo client chỉ phải requets những phần nào mình cần, và server sẽ trả về dữ liệu dưới dạng thô (json), giúp rút ngắn thời gian truyền tải, đồng thời client có cơ hội sử dụng những hiệu ứng được xây dựng sẵn, giúp nâng cao trải nghiệm của người dùng hơn, quá trình thao tác với dữ liệu không khác gì với desktop application.
2. **Ý tưởng.**
*  Chúng ta sẽ xây dựng một trang web hiển thị ra những bộ phim và trang hiển thị thông tin giới thiệu về bộ phim 
*  trong giới hạn bài viết này để đơn giản mình sẽ lấy dữ liệu từ 1 file JSON và hiển thị ra bằng các sử dụng  handlebar một thư viện của js để tìm hiểu thêm về nó bạn có thể vào http://handlebarsjs.com/installation.html để đọc thêm.
3. **Bắt đầu xây dựng**
* **Cấu trúc file**

    ![](https://images.viblo.asia/4aa86b18-cbd0-48ab-87ae-fc048ebac210.png)
* **File json**

    Sử dụng file json để lưu data của các quyển sách
```
[
  {
    "id": 1,
    "name": "The Avengers (2012)",
    "details": {
      "publisher": "Marvel",
      "author": "Evans ",
      "date": 2012
    },
    "description": "Loki, người em trai nuôi độc ác của Thor đến từ hành tinh Asgard xa xôi, đột nhập vào căn cứ của S.H.I.E.L.D để chiếm khối Tesseract chứa nguồn năng lượng vô hạn. Hắn còn âm mưu dẫn một đội quân tới Trái đất thôn tính và biến loài người thành nô lệ. Nick Fury, giám đốc của S.H.I.E.L.D nỗ lực tập hợp một đội quân tinh nhuệ nhất để bảo vệ trái đất khỏi âm mưu của Loki.",
    "rating": 4,
    "image": {
      "small": "assets/images/avenger-2012-l.jpg",
      "large": "assets/images/avenger-2012-l.jpg"
    }
  },
  {
    "id": 2,
    "name": "Avengers 2: Age of Ultron (2015)",
    "details": {
      "publisher": "Marvel",
      "author": "Joss",
      "date": 2015
    },
    "description": "Lấy khởi đầu từ nhân vật Tony Stark - siêu anh hùng Iron Man. Khi chàng tỷ phú tái khởi động dự án gìn giữ hòa bình bị ngưng hoạt động từ lâu, mọi chuyện diễn ra không hề suôn sẻ. Các siêu anh hùng vĩ đại nhất trên Trái đất gồm Iron Man, Captain America, Thor, Hulk, Black Widow và Hawkeye đứng trước một thử thách vô cùng khó khăn trong việc đem lại cân bằng cho toàn thế giới.",
    "rating": 4,
    "image": {
      "small": "assets/images/avenger-2016.jpg",
      "large": "assets/images/avenger-2016.jpg"
    }
  }
 ]
```
* **File HTML**
```
<div class="main-content">
    <div class="all-products page">
        <div class="filters">
            <form>
                Checkboxes here
            </form>
        </div>
    <ul class="products-list">
      <script id="products-template" type="x-handlebars-template">​
        {{#each this}}
          <li data-index="{{id}}">
            <a href="#" class="product-photo"><img src="{{image.small}}" height="130" alt="{{name}}"/></a>
            <h2><a href="#"> {{name}} </a></h2>
            <ul class="product-description">
              <li><span>Nhà sản xuất: </span>{{details.publisher}}</li>
              <li><span>Đạo diễn: </span>{{details.author}}</li>
              <li><span>Năm xuất bản: </span>{{details.date}} Mpx</li>
            </ul>
            <div class="highlight"></div>
          </li>
        {{/each}}
      </script> 
    </ul>
    </div>
    <div class="single-product page">
        <div class="overlay"></div>
        <div class="preview-large">
            <h3>Single product view</h3>
            <img src=""/>
            <p></p>
            <span class="close">&times;</span>
        </div>
    </div>
    <div class="error page">
        <h3>Sorry, something went wrong :(</h3>
    </div>

</div>
```
Như các bạn thấy chúng ta có 3 div `class="error page"`(trang cảnh báo) `class="all-products page"`(trang hiển thị tất cả sản phẩm) và `class="single-product page"`(trang hiển thị description của 1 sản phẩm) nó là 3 trang, cùng được tải xuống và mình muốn chỉ 1 trang hiển thị tại 1 thời điểm. Việc hiển thị trang nào vào sẽ được xử lý bởi js và css. Phần checkbox để xây dựng chức năng filter. 
* **Code Javascript**

Chúng ta sẽ không đi vào chi tiết code mà sẽ xem chúng ta cần xây dựng những hàm nào nhé còn xây dựng như thế nào thì tùy cách xử lý của mỗi người mình sẽ để link github cuối bài bạn có thể tham khảo.
```
$(function () {

    checkboxes.click(function () {
        // Ở đây mỗi khi người dùng nhấp chuột, chúng ta thêm hoặc xóa các tiêu chí lọc khỏi một đối tượng filter

        // sau đó chúng ta gọi hàm để đưa các tiêu chí lọc lên url hash.
        createQueryHash(filters);
    });

    $.getJSON( "products.json", function( data ) {
    // lấy dữ liệu từ file product.json và chuyển nó ra HTML
        generateAllProductsHTML(data);
        $(window).trigger('hashchange');
    });

    $(window).on('hashchange', function(){
        //để điều hướng trang mỗi khi hash thay đổi thì function render được gọi với hash mới
        render(decodeURI(window.location.hash));
    });

    function render(url) {
        //hàm này quyết định trang nào sẽ được hiện thị dựa vào hash value tại url
    }

    function generateAllProductsHTML(data){
        // Sử dụng Handlebars để tạo ra một danh sách các sản phẩm sử dụng dữ liệu được lấy từ file json nó được gọi chỉ khi tải trang.
    }
    
    function renderProductsPage(data){
        // Ẩn và hiển thị các sản phẩm trong Trang sản phẩm tùy thuộc vào dữ liệu mà nó nhận được phục vụ cho chức năng filter.
    }
    
    function renderSingleProductPage(index, data){
        // hiển thị trang 1 sản phẩm.
    }
    
    function renderFilterResults(filters, products){
        // Gán một đối tượng với các sản phẩm được lọc và chuyển nó đến renderProductsPage
        renderProductsPage(results);
    }
    
    function renderErrorPage(){
        // hiển thị error page.
    }
    
     function createQueryHash(filters){
        // Lấy các filter object, biến nó thành một chuỗi và viết nó vào băm hash.
    }
});
```
**khái niệm SPA là không có bất kỳ hành động tải trang nào xảy ra trong khi ứng dụng đang chạy. Đó là lý do tại sao sau khi tải trang ban đầu, người dùng sẽ ở lại cùng một trang, nơi mà mọi thứ họ cần đều đã được tải xuống từ máy chủ.**

**Tuy nhiên khi người dùng muốn sao chép url và gửi cho bạn bè. Nếu không bao giờ thay đổi địa chỉ url  bạn bè sẽ chỉ nhận được 1 trang duy nhất. Để giải quyết vấn đề này, chúng ta sẽ viết thông tin về trạng thái của ứng dụng trong url là #hash. Hashes sẽ không tải lại trang.**
* **kết quả**
   
    https://ninhunest.github.io/demospa/

    link github:

    https://github.com/ninhunest/demospa