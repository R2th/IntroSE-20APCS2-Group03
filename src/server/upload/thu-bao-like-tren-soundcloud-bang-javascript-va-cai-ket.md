Giả sử bây giờ crush của bạn làm nhạc trên soundcloud và bạn muốn thể hiện tình yêu đuyên doại với crush. Một trong những cách bạn có thể làm là like + repost tất cả các track của crush cho vui. Crush sẽ nhận một đống notification và thốt lên rằng "Oh wtf this guy is mah craziest fan" . Ở bài viết này, mình sẽ không đề cập đến tính khả thi trong câu chuyện tình fan-idol của bạn, mình chỉ giúp bạn thực hiện công việc trên. Sau đây mình sẽ giúp bạn viết 1 đoạn `script` rất đơn giản và hướng dẫn bạn auto like hoặc auto repost tất cả các track trên trang `soundcloud` của một ai đó . Tuy nhiên, phần mình muốn nhấn mạnh là CÁI KẾT của việc này :) . Hãy cùng đọc bài viết này đến đoạn kết nhé. 

## 1. Ý tưởng viết script (dành cho các bạn dev thoai)
Khi nghĩ về bài toán này mình nghĩ ra 2 hướng giải quyết :
### 1.1 Hướng số 1: 
Sử dụng [soundcloud api](https://developers.soundcloud.com/docs/api/guide) . Nếu các bạn đọc tài liệu sẽ thấy, soundcloud cung cấp api để bạn có thể thực hiện các HTTP request với các đối tượng như track nhạc, comment, ........ Như vậy, để giải quyết bài toán auto like tất cả bài nhạc trên trang cá nhân của một ai đó, cần 2 bước :
* **Bước 1**: Lấy ra id của tất cả các track cần like
* **Bước 2**: Thực hiện một bó n request dạng như sau (n là số track nhạc cần like)
```
POST https://api.soundcloud.com/me/favorites/#{track.id}
```

Mình đã thử làm cách này với [gem soundcloud](https://github.com/soundcloud/soundcloud-ruby) của Ruby on Rails và cuối cùng gặp phải vấn đề về việc đăng ký redirect_uri với soundcloud (đại loại là vì mình ko có domain https và cũng ko thích deploy lên các Saas như Heroku) . Và, mình quyết định BỎ CUỘC để chuyển sang một hướng đơn giản hơn. 

### 1.2 Hướng số 2: 
Hướng số 2 là sử dụng javascript để thực hiện sự kiện `click()` :D . Phải nói là cách này rất đơn giản nhưng hãy chờ đến cuối bài để biết có nên dùng nó hay không. Tuy vậy, hướng này cũng có 2 bước :
* **Bước 1**: Get ra tất cả các element đại diện cho nút like. 
* **Bước 2**: Dùng vòng lặp để thực hiện click vào tất cả các button trên. 

OK rất dễ phải không nào. Và đây là đoạn script:
```javascript
function scrollAndHandleAllTrack(method){
  //Scroll đến cuối của trang soundcloud
  let scrollId = setInterval(() => {
    endButton = document.getElementsByClassName('paging-eof sc-border-light-top');
    if(endButton.length === 0)
    {
    // Nếu chưa thấy icon kết thúc trang thì tiếp tục scroll
      window.scrollTo(0,document.body.scrollHeight);
    }
    else {
    //Nếu đã scroll đến cuối trang thì ngừng scroll
      clearInterval(scrollId);
      //Lấy ra toàn bộ reaction_buttons và like
      mainContent = document.getElementsByClassName('userMain__content');
      reaction_buttons = mainContent[0].getElementsByClassName(`sc-button-${method}`);
      for (const element of reaction_buttons) {
        element.click();
      }
    }
  }, 3000);
}

scrollAndHandleAllTrack('like'); // Thực hiện bão like.
// Thay 'like' thành 'repost' để thực hiện bão repost.
```
Nếu là các bạn web developer thì chắc chắn đã hoàn toàn hiểu ý tưởng roài. Giờ chúng ta hướng dẫn cho các bạn non-IT thực hiện ý tưởng này nhé.

## 2. Thực hiện bão like (bão repost) (dành cho các bạn non-IT)
Ok để bắt đầu bão like, bước số một là bay đến trang soundcloud mà các bạn muốn thực hiện siêu bão . Ví dụ : 

Click vô link này : [Wxrdie soundcloud](https://soundcloud.com/wxrdie)

Nhớ chuyển đến tab `track`, vì nó là trang chứa tất cả track mà user post lên, thay vì ở tab all (bao gồn cả các track mà user repost).

Tiếp theo, các bạn click chuột phải vào khoảng trắng và thực hiện inspect (hoặc ấn nút F12) và chuyển đến tab `console` :

![](https://images.viblo.asia/115052ad-8762-418b-af89-b7f880bee9db.gif)


Sau đó bạn cop đoạn script dưới đây vào console và ấn Enter, kết quả sẽ như trong ảnh:
```javascript
//setInterval to scroll
function scrollAndHandleAllTrack(method){
  let scrollId = setInterval(() => {
    endButton = document.getElementsByClassName('paging-eof sc-border-light-top');
    if(endButton.length === 0)
    {
      window.scrollTo(0,document.body.scrollHeight);
    }
    else {
      clearInterval(scrollId);
      mainContent = document.getElementsByClassName('userMain__content');
      reaction_buttons = mainContent[0].getElementsByClassName(`sc-button-${method}`);
      for (const element of reaction_buttons) {
        element.click();
      }
    }
  }, 3000);
}

scrollAndHandleAllTrack('like');

```

![](https://images.viblo.asia/115052ad-8762-418b-af89-b7f880bee9db.gif)

Các bạn có thể làm điều tương tự với chức năng repost:
![](https://images.viblo.asia/289cb1e1-df4b-4920-bc4b-940b8727f425.gif)

OK, câu hỏi bây giờ là bạn có nên thực hiện ý tưởng hoàn toàn tương tự trên các trang mạng xã hội khác như facebook, twitter, weibo hay không ? Chúng ta cùng đi đến phần 3 để trả lời câu hỏi này.

## 3. Khi nào và ở đâu thì có thể thực hiện trò bão like, bão repost này ?
Câu trả lời là khi soundcloud chưa fix bug này và ít nhất chúng ta không nên thực hiện nó trên facebook. 
Mình đã từng thử trò này trên facebook và cuối cùng thì mình đã bị khóa comment, like trong 1 thời gian dài. 
Mình tin là trong tương lai có thể soundcloud sẽ care đến việc này. 

Bài viết của mình đến đây là hết. Hy vọng nó có ích với các bạn.


-----

## MỘT PHÚT QUẢNG CÁO .

Mình mới viết demo một ca khúc trên soundcloud. Nếu các bạn quan tâm, có thể vào cho mừn nhận xét .

Link : https://soundcloud.com/hieukulee/girl-u-make-ur-dance-thuot-tha

Tên bài hát : Vũ thần (girl u make your dance thướt tha).

Song by Tớ đến từ Cậu Phải Nghiện Tớ.
Prod: Roko Tensei.