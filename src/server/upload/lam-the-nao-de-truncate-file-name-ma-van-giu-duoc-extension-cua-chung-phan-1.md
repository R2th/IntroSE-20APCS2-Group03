# Mở đầu
Xin chào tất cả các bạn hôm nay mình sẽ giới thiệu cho các bạn cách truncate file name/text mà vẫn dữ được extension trên nhiều line. Hi vọng nó sẽ giúp ích cho các bạn.
## 1. Vấn đề hay gặp phải :
Các bạn muốn nó hiển thị 2 line và vẫn giữ đc phần extension, những phần bị truncate sẽ hiển thị dấu '...' nhưng nó lại ra như thế này :
![image.png](https://images.viblo.asia/2201b136-c1ad-4cc2-b044-6f13127a05a4.png)
## 2. Cách khắc phục :
**Mục tiêu là 2 line và truncate vẫn giữ được extension name nha các bạn.**

Để giải quyết được vấn đề này thì có rất nhiều cách để giải quyết sẽ có một số cách sẽ phù hợp với một số bạn:
### Cách 1: Mình dùng [Tailwind](https://tailwindcss.com/) nha :
```
<div className="min-h-[50px] break-all line-clamp-2">
    {name} // Tên file
</div>
```
Thì nó sẽ cho ra kết quả như thế này : 

![image.png](https://images.viblo.asia/f442186a-5665-453b-b52b-f30aae7c7495.png)

Ở đây như các bạn sẽ thấy nó đã hiển thị được 2 line rồi, UI không bị bể như trên nữa nhưng nó lại không đáp ứng được việc hiển thị extension ở cuối uhmmm.... vậy là không được rồi bây giờ qua cách 2 nha
### Cách 2: Mình dùng chút JavaScript : 
Ở đây mình sẽ có một hàm như sau :
```
const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return (
        text.substring(0, 20) +
        '...' +
        text.substring(text.length - 10, text.length)
      );
    }
    return text;
  };
  
 truncateText(name, 35)
```
Và kết quả sẽ ở đây : 
![image.png](https://images.viblo.asia/b02d6dcf-ccb6-49ad-8d99-e88504984dcd.png)

Như chúng t thấy hiện tại nó đã được 2 line, có extension hiện đã đáp ứng đúng nhưng nếu nhìn kĩ thì sẽ thấy chưa max width mà đã truncate rồi như thế là không ổn rồi, rồi còn một số trường hợp nếu **name** chỉ chỉ chứa 1 ký tự nữa, nói thật ra cách thì này khá lúa :v
### Cách 3: Sử dụng thư viện [React-Text-Truncate](https://github.com/ShinyChang/react-text-truncate) :
Đây là [Demo](http://shinychang.github.io/React-Text-Truncate/) nhé các bạn.

Cách cài :
```
//npm
npm install react-text-truncate

//yarn
yarn add react-text-truncate
```

Cách sử dụng khá đơn giản :
```
<div className="min-h-[50px] mt-3 break-all">
    <TextTruncate
      line={2}
      truncateText={`...${removeExtension(name).slice(-3,)}.${getExtensionFile(name)}`}
      text={name}
    />
</div>
```
Kết quả nó sẽ như thế nay: 
![image.png](https://images.viblo.asia/18dcf7ed-66c5-4f2e-b4d8-9ef5b636420a.png)

Bây giờ nhìn trong ổn phết đấy chứ nhỉ =)))

Ở đây sẽ có 2 hàm **removeExtension()** và hàm **getExtensionFile()** 

Nếu muốn biết 2 hàm này từ đâu mà ra thì hãy đón xem **phần 2** nha =))))

## 3 Kết luận

Hãy đón xem **phần 2** với những hàm xử lý truncate text. Cảm ơn bạn đã đọc bài viết.