Trong bài này, mình sẽ hướng dẫn mọi người để xây dựng chức năng mention đơn giản nhất trong Rails giống như mention của các mạng xã hội. 

Mình đã search trên google và thấy rất nhiều thư viện js, vậy trong bài này chúng ta sẽ tìm hiểu và làm demo sử dụng libray `tribute` https://github.com/zurb/tribute .

## Giới thiệu về tribute
Nó là engine @mention có hỗ trợ khá nhiều browser như Firefox, Chrome, iOS Safari, Safari, IE 9+, Edge 12+, Android 4+, Windows Phone, ... được viết lên bằng ES6.

## Cách cài đặt cho Rails
Lib này có hỗ trợ nhiều loại cài đặt  khác nhau tuỳ theo việc lựa chọn của mình, bạn có thể xem chi tiết trong document của nó.

Ở đây mình sẽ cài đặt bằng việc sử dụng gem.

* Thêm vào trong Gemfile:
```
gem "tribute"
```

* Thêm vào trong file `app/assets/javascripts/application.js`
```
//= require tribute
```

* Thêm vào trong file `app/assets/stylesheets/application.css`
```
*= require tribute
```

## Cách sử dụng
* Mình có html như sau:
```html
<div id="mention-area">Mention here</div>
```

* Trong js, initial một biến và truyền các array object như sau:

```js
  var tribute = new Tribute({
    values: [
      { name: "Phil Heartman", username: "pheartman", avatar: 'http://cdn0.4dots.com/i/customavatars/avatar7112_1.gif' },
      { name: "Gordon Ramsey", username: "gramsey", avatar: 'http://cdn0.4dots.com/i/customavatars/avatar7112_1.gif' }
    ]
  });
```

* Attach nó vào elements
Sau khi đã intitial biến xong, mình có thể attach nó với input, textarea, hoặc element mà hỗ trợ contenteditable.

```js
tribute.attach(document.getElementById("mention-area"));
```

Bây giờ mình đã làm xong chức năng mention với các config default của tribute. 

Kết quả như sau

![](https://images.viblo.asia/d5f39333-911a-4368-b8e1-8eabbe4063fa.png)

Đây là những attributes default https://github.com/zurb/tribute#a-collection , và bạn có thể tự customize các attributes đó tuỳ theo yêu cầu của mọi người.

Bây giờ, mình sẽ customize dropdown list và item sau khi select xong cho nó đẹp hơn. Vậy chúng ta sẽ cần ovveride lại 2 attributes: `selectTemplate`, `menuItemTemplate` như sau.

```js
  var tribute = new Tribute({
    values: [
      { key: "Phil Heartman", value: "pheartman", avatar: 'http://cdn0.4dots.com/i/customavatars/avatar7112_1.gif' },
      { key: "Gordon Ramsey", value: "gramsey", avatar: 'http://cdn0.4dots.com/i/customavatars/avatar7112_1.gif' }
    ],
    selectTemplate: function(item) {
      return (
        '<span contenteditable="false"><a href="http://zurb.com" target="_blank">' +
          item.original.key +
        "</a></span>"
      );
    },
    menuItemTemplate: function (item) {
      return '<img width="20" src="'+item.original.avatar + '">' + item.original.key;
    }
  });
```

Kết quả: 
![](https://images.viblo.asia/9dc75e77-41ef-4901-be25-d904c19b585e.png)

Đến đây chúng ta đã làm xong bài demo đơn giản nhất về chức năng mention rồi. 

Tuỳ nhiên, có nhiều events, attributes, ... bạn cần tham khảo thêm chi tiết trong tài liệu của tribute này để hiểu rõ hơn nữa.

https://github.com/zurb/tribute