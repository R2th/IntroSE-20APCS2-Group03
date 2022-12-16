## Mở đầu
Đối với kỹ sư thì năng lực thu thập, cập nhập thông tin thường xuyên là rất quan trọng. Ban đầu thì quyết tâm thu thập thông tin hằng ngày nhưng mà không chịu đọc, hoặc là không có thói quen hàng ngày thu thập thông tin hoặc là việc cập nhật thông tin mới nhất hàng ngày có người lại cảm thấy rất chán ngắt. 
Dù chỉ một chút thì tôi cũng muốn giúp những người như vậy bằng cách chia sẻ phương pháp thu thập thông tin hiện tại của mình.

Website đang follow
Hàng ngày các site mà tôi đang follow hầu như chỉ có dưới đây
* http://b.hatena.ne.jp/hotentry/it (technology)
* [Tổng hợp ITpro](http://tech.nikkeibp.co.jp/top/it/index.html)
* Add Twitter của những người nổi tiếng vào list
* Xu hướng của GitHub hoặc là activity của những người đang follow
* Xu hướng của Qiita

Thi thoảng cũng follow những site sau
* [モヒカンSlack](https://qiita.com/kotakanbe@github/items/32cf4eb3de1741af26fb)
* [connpass](https://connpass.com/)
* [log commit Rails của Github](https://github.com/rails/rails/commits/master)
* ngoài ra site của các company hoặc blog cá nhân...

Các kênh thu thập thông tin tuỳ từng người sẽ khác nhau nhưng mà thời điểm ban đầu thì đọc ở đâu, đọc cái gì có rất nhiều người không nắm được. Ngoài ra các bạn có thể tham khảo thêm ở bài viết này [Tổng hợp phương pháp thu thập thông tin cho kỹ sư](https://qiita.com/nesheep5/items/e7196ba496e59bb2aa28)


## Phương pháp đơn giản để thu thập thông tin 
Rõ ràng là để theo dõi được tất cả thông tin mới nhất của các site đã nói ở trên thì rất là khó vì thế tôi sử dụng Feedly (news aggregator application)
Theo wikipedia 
Feed Reader hay là Feed aggregator là những ứng dụng đọc và kéo thông tin của blog, những site tin tức. Format file của feed là RSS nên hiện tại người ta cũng có rất nhiều trường hợp gọi là "RSSリーダー", trong tiếng anh thường gọi là "news reader" hoặc đơn giản là "aggregator" 

Freedly có thể sử dungj để quản lý tổng hợp những site mà lúc nào cũng muốn cập nhập thông tin mới nhất.
Bắt đầu bằng các account dưới đây
* Google
* Facebook
* Twitter
* Windowsアカウント
* Evernote

Các tính năng chủ yếu (bản thân đang sử dụng) là 
* kiểm tra những cập nhật mới nhất được chia theo category
* các tính năng đọc lúc sau

Ngoài ra, ưu điểm nữa của Freedly  là tìm kiếm URL site trong Feedly thì RSS của site liên quan cũng được hiển thị.
Cái này cực kì tiện lợi, ví dụ khi tìm kiếm repository của Rails (https://github.com/rails/rails) chúng ta có thể confirm được tất cả commit vào branch master hoặc là những note release.
![](https://images.viblo.asia/bbade1dc-0a1b-4d41-ad4f-26af9ba4fb1b.png)

Quiita sẽ có giao diện như sau
![](https://images.viblo.asia/67dc9797-901d-48a9-bf43-6c8f16e97a56.png)

## Đăng kí activity của những người đang follow ở github vào Feedly
Việc này có nghĩa là những user khác mà chúng ta đang follow được hiển thị ở top của GIthub
Cái này liên kết đến những user mà bạn đã đăng kí nên là cần có thứ tự để lấy được RSS.

### Phương pháp 
Cách làm sẽ là sử dụng curl trên môi trường mac
mở terminal và thực hiện câu lệnh sau

Command thực thi
```php
curl -u "Username Github của bạn" https://api.github.com/feeds
# Input password
```

Response trả về
```php
{
  "timeline_url": "https://github.com/timeline",
  "user_url": "https://github.com/{user}",
  "current_user_public_url": "https://github.com/あなたのGitHubユーザーネーム",
  "current_user_url": "https://github.com/あなたのGitHubユーザーネーム.private.atom?token=yourtoken",
  "current_user_actor_url": "https://github.com/あなたのGitHubユーザーネーム.private.actor.atom?token=yourtoken",
  "current_user_organization_url": "",
  "current_user_organization_urls": [

  ],
  "_links": {
    "timeline": {
      "href": "https://github.com/timeline",
      "type": "application/atom+xml"
    },
    "user": {
      "href": "https://github.com/{user}",
      "type": "application/atom+xml"
    },
    "current_user_public": {
      "href": "https://github.com/あなたのGitHubユーザーネーム",
      "type": "application/atom+xml"
    },
    "current_user": {
      "href": "https://github.com/あなたのGitHubユーザーネーム.private.atom?token=yourtoken",
      "type": "application/atom+xml"
    },
    "current_user_actor": {
      "href": "https://github.com/あなたのGitHubユーザーネーム.private.actor.atom?token=yourtoken",
      "type": "application/atom+xml"
    },
    "current_user_organization": {
      "href": "",
      "type": ""
    },
    "current_user_organizations": [

    ]
  }
}
```

trong response trên, activity của những người mình đang follow sẽ có dạng như dưới đây
```
"current_user": {
      "href": "https://github.com/あなたのGitHubユーザーネーム.private.atom?token=yourtoken",
      "type": "application/atom+xml"
}
```

url của href nếu đăng kí ở Feedly thì có thể sẽ check được activity của những người mà bạn đang follow ở Github

Trường hợp Github đang setting chế độ authenticate 2 lớp
Command thực thi
```
curl -u "Username github của bạn" -H "X-GitHub-OTP: onetime password" https://api.github.com/feeds
```

## Tổng kết
Phương pháp thu thập thông tin của kỹ sư thì có rất nhiều trong đó thì lần này tôi chia sẻ với các bạn cách thu thập và cập nhập thông tin của bản thân

Đối với những bạn sinh viên hoặc là những kỹ sư trẻ bắt đầu bước vào nghề thì chắc hẳn sẽ có gặp phaỉ vấn đề này nên hãy tham khảo bài viết này.

Link tham khảo https://qiita.com/minakawa-daiki/items/edfc3d1ff1270756b52a?utm_source=Qiita%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9&utm_campaign=12a9de55b1-Qiita_newsletter_312_05_23_2018&utm_medium=email&utm_term=0_e44feaa081-12a9de55b1-33755445