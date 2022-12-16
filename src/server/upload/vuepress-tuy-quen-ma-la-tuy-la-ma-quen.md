![](https://images.viblo.asia/ebeb605f-d459-4479-965a-aecac38c602e.png)
<div align="center">

# Lời mở đầu
</div>

Chào mừng các bạn đã quay trở lại với viblo nói chung và với mình nói riêng. Sau một thời gian mình lên tìm hiểu documents của VueJS thì mình chợt nảy ra một câu hỏi (có lẽ hơi ngu 1 chút :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:), đó là `Muốn làm một trang documents giống như vậy thì phải làm như thế nào?`.

Và mình không mất quá nhiều thời gian để tìm được câu trả lời. Đó là [**Vuepress**](https://vuepress.vuejs.org/).

<div align="center">

# Nội dung
</div>

<div align="center">

## Vuepress là gì?

</div>    

Theo định nghĩa trên trang chủ thì Vuepress là một **static site generator**, được xây dựng dựa trên framework VueJS. Hiểu nôm na nó là một công cụ hỗ trợ sinh ra trang **static site**. Vậy **static site** là gì, mình sẽ giải thích cho các bạn ngay đây!
- **Static site** là 1 website phục vụ để lưu trữ thông tin, hầu như không có bất cứ sự tương tác nào giữa client-server ngoại trừ nhúng bên thứ 3 vào page, do đó có tốc độ nhanh và giảm nhẹ khả năng của lỗ hổng bảo mật.

Đấy là định nghĩa mà mình tìm được trên mạng thì nó lằng nhằng khó hiểu như thế, còn mình thì lấy ví dụ đơn giản nó là mấy trang docs giống như [laravel docs](https://laravel.com/docs/5.8),  [vuejs docs](https://vuejs.org/v2/guide/), chủ yếu chỉ chứa text và có một số tương tác của người dùng như là tìm kiếm. 

Và Vuepress sẽ giúp bạn tạo ra một trang docs giống như thế!
<div align="center">

## Sự phát triển của Vuepress

</div>    

Giờ đã biết [Vuepress](https://github.com/vuejs/vuepress) là gì rồi thì cùng ngó qua một số thông tin bên lề một chút nhé!

![](https://images.viblo.asia/f599810a-3ef9-4946-b77b-3d5fce8887b4.jpg)

- Đầu tiên hãy cùng xem commit đầu tiên là vào ngày 14 tháng 4 năm 2018, tức là vuepress mới ra đời chưa tới 1 năm
- Và các commit mới liên tục được cập nhật khá đều đặn. Bạn có thể thấy commit mới nhất là một giờ trước (thời điểm mình chụp screenshot là 0h ngày 14/03). 


Còn dưới đây là một số chỉ số cơ bản để đánh giá "độ phổ biến" trên github của vuepress:
- **Star**: 11747
- **Fork**: 1567

Đây chắc chắn là một con số đáng ngưỡng mộ đối với một thư viện chưa đầy 1 năm tuổi! Tuy vẫn còn kha khá **Issues** nhưng mình nghĩ  là nó sẽ được giải quyết sớm thôi 

![](https://images.viblo.asia/bfdad8b9-a538-4fdc-a973-63735eb13ce8.jpg)

<div align="center">

## Cài đặt như thế nào?
</div>    

Nếu bạn đã từng làm việc với javascript thì chắc rằng bạn đã rất quen thuộc với 2 công cụ quản lí thư viện javascript là **NPM** và **YARN** rồi đúng không? Còn nếu bạn chưa biết thì cũng không sao, mình sẽ nói qua luôn:
- **NPM (Node Package Manager)**: là một công cụ (chương trình) quản lý các thư viện lập trình Javascript cho Node.js, công cụ này là thật sự cần thiết cho thế giới mã nguồn mở. Và khi bạn cài đặt Node.js sẽ có kèm theo cả NPM nữa.
- [**YARN**](https://yarnpkg.com/en/): là công cụ quản lý thư viện javascript mã nguồn mở được hình thành bởi các kỹ sư Facebook, Google, Exponent và Tilde. Mục đích của nó là giải quyết các vấn đề, mà các team ở những công ty trên đã gặp phải khi sử dụng npm, đó là:
    - Việc cài đặt các package không đủ nhanh và nhất quán.
    - Các lo ngại về bảo mật 

> Có thể hơi thừa nhưng mà vuepress yêu cầu tối thiểu [Node.js](https://nodejs.org/en/download/) v8 nhé các bạn (vì phiên bản LTS mới nhất bây giờ đã là 10.15.3 rồi)

<br>

Giờ đã có công cụ quản lí rồi, bắt tay vào cài đặt thôi nào!

### Cài đặt global

Nếu như bạn là một newbie muốn thử nghiệm với Vuepress thì rất đơn giản, bạn chỉ cần chạy 3 câu lệnh thôi, còn việc mày mò là phần của bạn
```bash
# cài đặt global
yarn global add vuepress #su dung yarn 
#hoặc
npm install -g vuepress #su dung npm

# tạo ra file markdown readme
echo '# Hello VuePress' > README.md

# chạy lên thôi nào (2 cái này khác gì nhau chắc mình không cần nói đâu nhỉ?)
vuepress dev
vuepress build
```

<hr>

### Cài đặt vào một project có sẵn
Còn nếu bạn muốn tích hợp vuepress với một project có sẵn của bạn thì sẽ hơi khác một chút đấy, chú ý nhé:

- B1: install as a local dependency 


    ```bash
    yarn add vuepress -D       # Bản 0.x, tuy nhiên bản này hiện đang bảo trì 
    yarn add vuepress@next -D  # Bản 1.x.
    ```

- B2: thêm vào đoạn scripts bên trong `package.json`
    ```javascript:package.json
     "scripts": {
         "docs:dev": "vuepress dev docs",
         "docs:build": "vuepress build docs"
     }
    ```
- B3: Cài đặt xong xuôi rồi thì giờ bắt tay vào dev thôi nào:

    ```bash
    yarn dev  
    yarn test 
    ```

>**CHÚ Ý**: Trang chủ của vuepress khuyến cáo sử dụng **Yarn** thay vì **Npm** khi tích hợp Vuepress vào project có sẵn (sử dụng **webpack** 3.x) vì nếu sử dụng **Npm** sẽ bị lỗi khi sinh ra dependency tree.

<div align="center">

## Cấu trúc thư mục

</div>    

Cài đặt xong rồi, cùng tìm hiểu xem cấu trúc thư mục của Vuepress như thế nào nhé
![](https://images.viblo.asia/4c34c1ca-c695-4af3-92b2-9387e66e7f5e.jpg)

<div align="center">

## Một số tính năng nổi bật?

</div>    

### 1. Hỗ trợ cú pháp markdown

------updating------

### 2. Hỗ trợ đa ngôn ngữ (i18n)
`i18n là viết tắt của Internationalization (quốc tế hoá), do có 18 chữ cái ở giữ I và n nên mới được gọi tắt là i18n!`

Đối với một trang web nói chung, việc hỗ trợ đa ngôn ngữ (i18n) là khá quan trọng nếu bạn hướng tới đối tượng người dùng là người nước ngoài. Và đối với một trang documents hướng dẫn sử dụng một thư viện/framework lại càng quan trọng hơn. Bởi vì rõ ràng bạn sẽ muốn càng nhiều người sử dụng sản phẩm của mình càng tốt đúng không, và rào cản ngôn ngữ gần như là rào cản đầu tiên.

Nếu bạn để ý thì khi thay đổi ngôn ngữ trên trang docs của Vue thì đường dẫn cũng sẽ thay đổi, cụ thể là có thêm phần ngôn ngữ. Và trong Vuepress, bạn có thể thực hiện đa ngôn ngữ bằng cách cấu hình trong config.js, kiểu kiểu như thế này!

```javascript:config.js
module.exports = {
  locales: {
    '/': { //đường dẫn, ở đây đường dẫn mặc định là tiếng Anh
      lang: 'en-US', // ngôn ngữ ở đây là tiếng Anh
      title: 'Viblo',
      description: 'Welcome to Viblo!'
    },
    '/vi/': {  //thêm /vi/ vào đường dẫn để chuyển sang tiếng Việt
      lang: 'vi-VN',
      title: 'Viblo',
      description: 'Chào mừng bạn đến với cộng đồng Viblo!'
    }
  }
}
```

### 3. Last Updated dựa trên git
Cái này sẽ lấy timestamps của commit mới nhất sửa file này ở trên Git để hiện thị ra ở dưới footer giống như thế này :
![](https://images.viblo.asia/76027458-1ff8-4ec4-8dcb-e276bdbce208.jpg)

Nó cho phép người đọc biết được là thông tin mà họ đang đọc đã được cập nhật theo những thay đổi mới chưa, từ đó tránh được việc bị outdate thông tin. Để làm được điều này, bạn chỉ cần thêm 1 dòng vào trong config thôi:

```javascript:config.js
module.exports = {
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
  }
}
```

### 4. Chức năng tìm kiếm
Bạn vào một trang docs giống như bạn đang đọc một quyển sách vậy, tại một thời điểm bạn chỉ quan tâm đến một vấn đề cụ thể thôi, vì vậy công cụ tìm kiếm là hết sức cần thiết. Biết điều đó, Vuepress cung cấp cho bạn 2 công cụ tìm kiếm để lựa chọn:
- **Built-in Search**: 

    ```javascript:config.js
    module.exports = {
      themeConfig: {
        search: true/false //tuỳ chỉnh enable, disable built-in search
        searchMaxSuggestions: 10 //số lượng kết quả tối đa gợi ý trả về
      }
    }
    ```
    
    Với lựa chọn này, bạn sẽ tìm kiếm dựa trên việc đánh chỉ số index cho các title và headers (h2, h3, ...). Còn nếu muốn sử dụng full text search thì hãy đến với **Algolia Search** nhé
- **Algolia Search**: để sử dụng được [algolia search](https://community.algolia.com/docsearch/), bạn cần phải submit trang web của bạn lên hệ thống để có thể đánh chỉ số index trước khi hoạt động, và trong phần config bạn cũng cần phải cung cấp tối thiểu là 2 thông số **apiKey** và **indexName**

    ```javascript:config.js
    module.exports = {
      themeConfig: {
        algolia: {
          apiKey: '<API_KEY>',
          indexName: '<INDEX_NAME>'
        }
      }
    }
    ```


### 5. Git Repo and Edit Links
- Bạn chỉ cần cung cấp thông tin repo để trang có thể tự động thêm link để 

    ```javascript:config.js
    module.exports = {
      themeConfig: {
        // Assumes GitHub. Can also be a full GitLab url.
        repo: 'vuejs/vuepress',
        // Customising the header label
        // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
        repoLabel: 'Contribute!',

        // Optional options for generating "Edit this page" link

        // if your docs are in a different repo from your main project:
        docsRepo: 'vuejs/vuepress',
        // if your docs are not at the root of the repo:
        docsDir: 'docs',
        // if your docs are in a specific branch (defaults to 'master'):
        docsBranch: 'master',
        // defaults to false, set to true to enable
        editLinks: true,
        // custom text for edit link. Defaults to "Edit this page"
        editLinkText: 'Help us improve this page!'
      }
    }
    ```

<div align="center">
    
# Lời kết
</div>

Cái này mình thấy nó cũng mới nên muốn chia sẻ cho mọi người làm thử cho biết thôi, chứ thực ra việc làm một trang document đối với mình (ít nhất là đến thời điểm hiện tại) có vẻ không thiết thực lắm. 

Nhưng biết đâu sau này mình hoặc các bạn tự tạo ra một thư viện (hoặc framework đi cho hoành tráng :scream::scream::scream::scream::scream:) thì lúc ấy bạn không cần phải đi tìm hiểu nữa mà cứ VuePress mà quẩy thôi :smile::smile::smile::smile:
<div align="center">
    
# Tài liệu tham khảo
    
</div>

- Trang chủ vuepress:  https://v1.vuepress.vuejs.org/