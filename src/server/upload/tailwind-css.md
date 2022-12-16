# Tailwind Css
![](https://images.viblo.asia/a7b4a81f-999c-478a-9f44-da71d9446fa8.jpg)

Chúng ta hầu hết đều làm việc với các framework CSS như Bootstrap, Foundation, vv từ những ngày đầu tiên nhập môn Frontend và làm cho đến tận bây giờ, nhưng khi mà chúng ta đã quá quen thuộc với nó, chúng ta sẽ cảm thấy nhàm chán với những UI như vây, và mỗi khi bạn muốn có một thay đổi nhỏ trong UI đó thì bản lại phải override một cách thủ công, nhìn chung đến một ngưỡng nào đó, bạn sẽ thấy nhàm chán. 
Ví dụ đôi khi mình cũng chỉ cần dùng grid của các framework đó thôi, các ui khác là thừa, vì nó chẳng thể đáp ứng được bản design, override lại thì có mà override hết, thà viết mới cho xong, và thế là tự nhiên thừa một đống code.

Và TailWind ra đời.
Nó là gì? Từ docs của họ (https://tailwindcss.com/docs/installation) thì:
> Tailwind is a utility-first CSS framework for rapidly building custom user interfaces.

Tailwind không giống như các framework khác, nó không phải là một UI kit với những components xây dựng sẵn, thực tế là nó chẳng có components nào cả, cũng không có một default theme luôn. Có nghĩa là nếu bạn cần một navbar giống foundation hay bootstrap thì sẽ không có. Vậy tailwind có gì, bạn có thể bắt đầu bằng việc hình dung tới các ultility class của bootstrap ấy, ví dụ .mb-0, .mt-1, .d-flex v.vv, đấy, thì tailwind nó sẽ bao gồm toàn là các class như vậy, mỗi class làm việc, có người gọi nó là 'raw` css, mình cũng ko hiểu lắm. Nhưng bạn cứ tưởng tượng, semantic hay bootstrap thì nó như là một cái máy tính có mọi thứ và kết hợp vs nhau hết rồi, đồng bộ. Còn thằng Tallwind thì nó cung cấp cho các bạn linh kiện, bạn tự lắp ráp nó thành cái case mà bạn muốn, không thừa ko thiếu, không chỉnh sửa, ko chắp vá. Và để build 1 UI đẹp, theo cá nhân mình thôi nhé, thì thậm chí còn chẳng phải viết thêm một dòng css nào. Nói chung là ngon.

Giờ mình sẽ thử một ví dụ:

### Cài đặt
cài qua yarn hoặc npm đều được `yarn add tailwind --dev`

### Html started
```
<!DOCTYPE html>
<html>
    <head>
        <title>Tailwind CSS</title>
        <link rel="stylesheet" href="tailwind.css" />
    </head>
    <body>
        <!-- Magic starts here -->

        <!-- ./End of Magic -->
    </body>
</html>
```
File css ở trên mình đặt là tallwind luôn

### Init Tailwind
Bước này init tailwind thì output ra đặt tên là tailwind như trên luôn
```
./node_modules/.bin/tailwind init [filename]
```
Nó sẽ gen ra 1 file như này: 
![](https://images.viblo.asia/8d7ac44e-f3e1-4a28-8f65-f1d18c296f79.png)

Ok, mở file output đó ra và bạn sẽ thấy một object, trong đó chính là các config cho css của bạn, từ button cho tới typo, rất là nhiều. Có thể tuỳ chỉnh luôn ở đây.
Tiếp, bạn tạo một file input.css, trong này thêm 2 dòng này vào:
```
@tailwind preflight;

@tailwind utilities;
```

Đây là cái gì, đây là directive được cung cấp bởi tailwind: `@tailwind`, kiểu vậy, nó sẽ import các base styles và ulility từ cái file js cofing hồi nãy generate ra ấy.

Giờ chạy command này: `./node_modules/.bin/tailwind build input.css -o tailwind.css`

Tailwind sẽ lấy các directive bên trong file input.css như là đầu vào, sử dụng file config tailwind.js để làm công thức, và cuối cùng produces ra file tailwind.css. Trông nó như này:
![](https://images.viblo.asia/811fb747-9ec6-4f29-92ba-9b457b798dd7.png)

### demo
Trong file index.html lúc đầu, ta add thử đoạn code sau:
```
<div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-grey-darker text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
  </div>
</div>
```
Kết quả:
![](https://images.viblo.asia/72cd1503-a346-4c24-b6b9-1c7083110a71.png)

Thử tiếp
```
<div class="max-w-md w-full lg:flex">
  <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('https://tailwindcss.com/img/card-left.jpg')" title="Woman holding a mug">
  </div>
  <div class="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div class="mb-8">
      <p class="text-sm text-grey-dark flex items-center">
        <svg class="fill-current text-grey w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
        </svg>
        Members only
      </p>
      <div class="text-black font-bold text-xl mb-2">Can coffee make you a better developer?</div>
      <p class="text-grey-darker text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
    </div>
    <div class="flex items-center">
      <img class="w-10 h-10 rounded-full mr-4" src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg" alt="Avatar of Jonathan Reinink">
      <div class="text-sm">
        <p class="text-black leading-none">Jonathan Reinink</p>
        <p class="text-grey-dark">Aug 18</p>
      </div>
    </div>
  </div>
</div>
```

kết quả:
![](https://images.viblo.asia/e9971b53-420c-4c92-aa71-b1c56b816b46.jpg)

Tiếp:

```
<div class="border m-6 rounded-lg bg-white mx-auto shadow-lg max-w-xs overflow-hidden">
        <img class="h-24 min-w-full block" src="https://png.pngtree.com/thumb_back/fh260/back_pic/00/02/62/305619b17d2530d.jpg" />
        <div class="px-4 py-3 relative min-h-3"> 
            <div class="sm:flex sm:items-center">
                <img class="w-16 border-4 border-white border-white mr-3 rounded-full" src="https://avatars3.githubusercontent.com/u/13323281?s=460&v=4" />
                <div class="w-full">
                    <button class="float-right text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-blue text-blue hover:bg-blue hover:text-white">Follow</button>
                </div>
            </div>
            <div class="mt-2 text-center sm:text-left sm:flex-grow">
                <div class="mb-4">
                    <p class="text-xl font-bold leading-tight">Ezeugwu Paschal</p>
                    <p class="text-sm leading-tight text-grey-dark">@paschaldev</p>
                </div>
                <div>
                    <p class="leading-tight text-grey-darkest text-sm">
                        This is a cool profile card showcasing the awesomeness of <a class="text-blue no-underline" href="https://tailwindcss.com">Tailwindcss</a> built by awesome people who want to make the web a better place.
                    </p>
                </div>
                <p class="mt-6 text-xs text-grey-dark">
                    Followed by <a class="text-blue no-underline" href="#">Google</a> and <a class="text-blue no-underline" href="5 others">5 others</a>
                </p>
            </div>
        </div>
    </div>
```

kết quả:
![](https://images.viblo.asia/334658bc-1366-4415-a87f-e6de6f670e54.png)

Tiếp:

```
<div class="font-sans leading-tight min-h-screen bg-grey-lighter p-8">
  <div class="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
    <div class="bg-cover h-40" style="background-image: url('https://images.unsplash.com/photo-1522093537031-3ee69e6b1746?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a634781c01d2dd529412c2d1e2224ec0&auto=format&fit=crop&w=2098&q=80');"></div>
    <div class="border-b px-4 pb-6">
        <div class="text-center sm:text-left sm:flex mb-4">
            <img class="h-32 w-32 rounded-full border-4 border-white -mt-16 mr-4" src="https://randomuser.me/api/portraits/women/21.jpg" alt="">
            <div class="py-2">
                <h3 class="font-bold text-2xl mb-1">Cait Genevieve</h3>
                <div class="inline-flex text-grey-dark sm:flex items-center">
                    <svg class="h-5 w-5 text-grey mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
                    New York, NY
                </div>
            </div>
        </div>
        <div class="flex">
            <button class="flex-1 rounded-full bg-blue text-white antialiased font-bold hover:bg-blue-dark px-4 py-2 mr-2">Follow</button>
            <button class="flex-1 rounded-full border-2 border-grey font-semibold text-black px-4 py-2">Message</button>
        </div>
    </div>
    <div class="px-4 py-4">
        <div class="flex items-center text-grey-darker mb-4">
            <svg class="h-6 w-6 text-grey mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"/></svg>
            <span><strong class="text-black">12</strong> Followers you know</span>
        </div>
        <div class="flex">
            <div class="flex flex-row-reverse justify-end mr-2">
              <img class="border-2 border-white rounded-full h-10 w-10" src="https://randomuser.me/api/portraits/men/32.jpg" alt="">
              <img class="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/women/31.jpg" alt="">
              <img class="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/men/33.jpg" alt="">
              <img class="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/women/32.jpg" alt="">
              <img class="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/men/44.jpg" alt="">
              <img class="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/women/42.jpg" alt="">
            </div>
              <span class="flex items-center justify-center text-sm text-grey-darker font-semibold border-2 border-grey-light rounded-full h-10 w-10">+3</span>
        </div>
    </div>
  </div>
</div>
```
kết quả: 
![](https://images.viblo.asia/37679082-f193-4caf-b3d4-2706a25e4cc9.jpg)

Như các bạn thấy đấy, có thể tuỳ chỉnh cực kỳ nhiều mà từ nãy tới giờ mình chưa phải viết thêm một dòng css nào cả.
Để sử dụng tốt cái tailwind này thì phải thực hành nhiều để nhớ thôi chứ cũng không có cách nào khác. Goodluck!
Tham khảo: https://github.com/tailwindcss/tailwindcss/releases