[Bài viết trước: Fastlane - Auto capture screenshots](https://viblo.asia/p/fastlane-auto-capture-screenshots-aWj538GYK6m)
Như trong bài viết trước, mình đã hướng dẫn các bạn sử dụng fastlane để tự động chụp ảnh màn hình thông qua việc viết UITesting. Trong bài viết này, mình sẽ hướng dẫn các bạn add thêm frame cho mỗi ảnh đã được chụp trước đó.
## Add frame một cách đơn giản.
- Imagemagick: trong terminal, các bạn gõ lệnh
```
brew install imagemagick
```
Sau khi cài đặt xong, chúng ta sẽ cd đến project path và chạy lệnh 
```
fastlane frameit silver
```
Sau khi chạy câu lệnh trên, các ảnh chụp màn hình đã được chụp trước đó sẽ được add vào frame tương ứng với devices bạn đã chọn trong Snapfile với viền là Silver.
Các bạn có thể mở thư mục screenshots và xem ảnh chụp.
Dưới đây là các màu của devices mà fastlane hỗ trợ.
![](https://images.viblo.asia/5b0e34f6-8632-4a60-8161-fb45f78a7bf2.png)
## Add frame bao gồm text.
Chắc chắn rằng đã không ít lần bạn phải tự mình chụp screenshots sau đó sử dụng phần mềm nào đó để tạo một ảnh đưa lên Itunes giống như dưới đây: 
![](https://images.viblo.asia/5b943a8d-a7f5-4fe2-b37f-44d75c0a52f1.png)
Như trong ảnh trên, chúng ta chỉ cần thiết lập một vài đoạn mã cơ bản đã có thể giúp bạn tạo được ảnh như vậy.
### Step 1: Đầu tiên, các bạn mở thư mục chứa screenshots lên và tạo cho mình một file json có tên "Framefile.json".
Mở file đó lên và thêm đoạn json sau vào: 
```
{
  "device_frame_version": "latest",
  "default": {
    "keyword": {
      "font": "./fonts/SFCompactDisplay-Heavy.otf"
    },
    "title": {
      "font": "./fonts/SFCompactDisplay-Heavy.otf",
      "color": "#545454"
    },
    "background": "./background.jpg",
    "padding": 50,
    "show_complete_frame": false,
    "stack_title" : false,
    "title_below_image": true
  },

  "data": [
    {
      "filter": "Menu",
      "keyword": {
        "color": "#d21559"
      }
    },
    {
      "filter": "Setting",
      "keyword": {
        "color": "#feb909"
      }
    }
  ]
}
```
- "font": "./fonts/SFCompactDisplay-Heavy.otf" => Bạn cần copy font path mà bạn muốn vào đây.
- "background": "./background.jpg", => Tương tự đây cũng là file path của background image.
### Step 2: Tạo 2 file keyword.strings và title.strings trong thư mục chứa ảnh tương ứng với ngôn ngữ mà ứng dụng của bạn hỗ trợ.
File keyword.strings.
```

"Menu" = "MENU";

"Setting" = "SETTING";

```

File title.strings
```
"Menu" = "Let Your Ideas Grow";

"Setting" = "Think Content, Not Layout";

```
Menu và Setting : chính là tên mà chúng ta đã đặt cho ảnh khi viết trong file UITesting. Dựa vào 2 key này mà fastlane sẽ filter ra title tương ứng cho các ảnh chụp được frame.
* Lưu ý: 2 file keyword.strings và title.strings phải được encode với định dạng utf-16. 
### Sửa lại Fastfile.
Mở Fastfile và thêm dòng sau vào trong lane screenshots
```
frame_screenshots(silver: true)
```
* silver: có thể tuỳ chỉnh theo màu devices mà Fastlane support.
Sau khi thêm và lưu lại, mở terminal và chạy lại câu lệnh:
```
fastlane screenshots
```
Sau khi chạy xong câu lệnh trên, trong thư mục tương ứng sẽ như hình dưới đây:
![](https://images.viblo.asia/3d0224c5-e45a-4ad5-bbb2-bc5a3d3ea93f.png)
Và thử mở 1 ảnh chụp từ Iphone X đã được add frame:
![](https://images.viblo.asia/cc3f6b3b-a6c2-45e6-b34c-223ab1093cd1.png)
### Kết:
Trông khá là đẹp đúng ko các bạn. Cảm ơn vì đã theo dõi bài viết.