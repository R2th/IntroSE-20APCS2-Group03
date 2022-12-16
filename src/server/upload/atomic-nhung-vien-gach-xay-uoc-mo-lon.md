<p align="center">Đang ngồi nghĩ cách đặt tên,</p>
<p align="center">Có thằng em đến kêu "ngừng dùng BEM"...</p>

![](https://images.viblo.asia/ff51de8c-9d49-4065-a943-682c5d2bbedd.png)

Trong các dự án markup HTML mà mình đang support, ngoại những án React dùng [styled component](https://www.styled-components.com/) thì **96,69%** thống nhất xây dựng theo kiểu **BEM** `Block__Element--Modifier` - một dạng tổ chức CSS theo kiểu OOCSS tuyệt vời mà mình từng biết.
Nhưng trong vòng 1 năm trở lại đây, khái niệm Atomic được léo nhéo bên tai, nó là cái khỉ gì mà giang hồ đồn dữ vậy.

## 1. Tổng quan Atomic CSS là gì?
Thông thường, khi dùng [Bootstrap](https://getbootstrap.com/), [Foundation](https://foundation.zurb.com/) hoặc code CSS truyền thống, trường hợp phải selector đến nhiều cấp là tất nhiên, rồi đau đầu nghĩ đến cách đặt tên biến sao cho ngữ nghĩa... thật là một thảm hoạ.

Khi dự án của bạn phát triển, nhiều component xuất hiện đồng nghĩa với kích thước tập tin CSS ngày càng to ra. Đáng buồn là, không phải tất cả CSS được gửi xuống cho người dùng sẽ thật sự được sử dụng trong trang.

```html
<!-- Code truyền thống -->
<style>
  .btn {
    display: inline-block;
    color: blue;
    padding-left: 10px;
    padding-right: 10px;
  }
  .btn--secondary {
    color: blue;
  }
</style>

<button class="btn btn--secondary"></button>
```
```html
<!-- Dùng Atomic -->
<style>
  .dib {
    display: inline-block;
  }
  .text-red {
    color: red;
  }
 .text-blue {
    color: blue;
 }
.px-10 {
  padding-left: 10px;
  padding-right: 10px;
}
</style>

<button class="dib text-red px-10"></button>
```
Trong ví dụ trên, class `text-red` chỉ làm duy nhất một việc là đổi chữ sang màu đỏ, `dib` sẽ định nghĩa một khối `display: inline:block`, trong khi `px-10` chỉnh padding ở bên trái và phải (trục x / trục hoành) thành 10px.

-----
#### Thực hành xong rồi đọc chút lý thuyết nào

Atomic CSS hiểu ngắn gọn là một cách viết CSS mà chúng ta không cần viết một dòng CSS nào cả. Tức là không cần phải define trong CSS source nữa, chỉ cần reuse nhưng thuộc tính đã khai báo trước đó là xong. Thay vì viết code CSS, chúng ta sẽ sử dụng các class có sẵn mà một Atomic CSS Framework cung cấp. Trong các framework này, mỗi class có nhiệm vụ định nghĩa một thuộc tính duy nhất (vậy nên mới gọi là atomic).

**Ưu điểm lớn nhất** của Atomic CSS có lẽ là giúp tránh được cảnh binh đao anh em tương tàn vì không làm xảy ra tranh chấp CSS specificity (mức độ ưu tiên của các thuộc tính), gây ra do cách viết kế thừa class.

Bên cạnh đó ưu điểm đứng sau là cách đặt tên biến ngắn gọn do đó sẽ chiếm ít ký tự dẫn đến size CSS giảm đi đáng kể.

![](https://images.viblo.asia/82c53cfe-001b-43d5-b255-eca0810ce642.png)

> **Specificity là gì?**
> 
> Specificity là một trọng số được trình duyệt sử dụng để quyết định CSS style nào sẽ được áp dụng cho các element. Specificity được tính toán dựa vào phân loại selector và số lượng selector áp dụng lên một element. Bạn có thể đọc thêm về chủ đề này ở đây hoặc trên trang MDN. https://dev.to/emmawedekind/css-specificity-1kca minh hoạ khá cụ thể cách tính specificity.

## 2. Library CSS Atomic
- [Tachyons](https://tachyons.io/): Đây là một thư viện CSS Atomic dễ hiểu, nhẹ và rất tiện do cách đặt tên mang tính tượng hình cao.
- [Tailwind](https://tailwindcss.com/): Mình mới dùng cho những ngày đầu tập tành biết đến Atomic, tên class cũng khá đầy đủ, tượng hình, tuy nhiên tên class dài hơn thanh niên Tachyons
- [basscss](https://basscss.com/): Gọn nhẹ được Google AMP khuyên dùng.

Một số thư viện như đã kể trên, hôm nay mình sẽ cùng mọi người đi sâu hơn vào [Tailwind](https://tailwindcss.com/) - một thư viện mình dùng lần đầu khi làm quen với Atomic CSS.

#### Tailwind là gì?
Tailwind là CSS framework khá nổi tiếng cho việc xây dựng template UI một cách nhanh chóng. Đối với mình nó là một library tốt để viết inline styling và để building template tuyệt vời mà chẳng cần tự viết một dòng CSS nào.
Tuy nhiên, điều duy nhất khiến hầu hết anh em ban đầu sẽ cảm thấy hơi phiền với Tailwind CSS là nó làm HTML nhìn rối hơn khi mới bắt đầu. Tailwind không phải là thư viện CSS tiện ích đầu tiên, nhưng nó là thư viện nổi tiếng nhất hiện nay.

#### Tích hợp vào project
Không có quá nhiều thứ rườm rà như bao framework CSS khác. Để tích hợp Tailwind vào project anh em chỉ cần import link CSS là xong.
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.1.4/tailwind.min.css">
```

#### Một số ví dụ
Đoạn code dưới đây là ví dụ đơn giản khi tạo một card với Tailwind CSS framework - và nếu bạn đã thành thục CSS, bạn có thể tạo những thứ khác biệt với styling này. Có thể lúc đầu sẽ hơi khó để nhớ tất cả, nhưng khi bạn quen hơn với cú pháp, mọi thứ sẽ rất dễ dàng.

```html
<div class="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
  <div class="px-6 py-4 sm:flex sm:items-center">
    <img class="block h-16 rounded-full mx-auto mb-4 sm:h-24 sm:mb-0 sm:mr-4 sm:ml-0" src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/s960x960/52929797_2385506548348670_6546641172654194688_o.jpg?_nc_cat=104&amp;_nc_ohc=_Fp_0F9lk5gAQlW-43SLLPjRbSestKKim2DeND8W_T5wAwi6NhyLcdv8w&amp;_nc_ht=scontent.fsgn2-1.fna&amp;oh=4fc8c9030f7b25a1d0c5f156cb64458c&amp;oe=5E72748E" alt=""/>
    <div class="text-center sm:text-left sm:flex-grow">
      <div class="my-4">
        <p class="text-xl leading-tight mb-2">Khuyen Nguyen H.</p>
        <p class="text-sm leading-tight text-grey-dark">Frontend Developer.</p>
      </div>
      <div>
        <button class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white">Info</button>
      </div>
    </div>
  </div>
</div>
```
[Demo](https://codepen.io/nguyenhuukhuyenudn/pen/wvBJqmo)

Hoặc anh em cũng có thể dựng 1 landing page nhanh gọn mà không cần viết thêm bất kỳ một dòng CSS nào.
{@embed: https://codepen.io/nguyenhuukhuyenudn/pen/povRYQN}

## 3. Một số tip hay
Khi tìm hiểu một library hay framework, keyword mình luôn tìm kiếm đó là `cheat sheet` để tóm gọn lại những thứ tổng quan và bộ cheat sheet này dành cho Tailwind là không ngoại lệ: https://nerdcave.com/tailwind-cheat-sheet

Bên cạnh đó nếu dùng VS Code bạn cũng có thể dùng extension này để *tăng tốc độ gió*: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss

> **Bản tin ngoài lề:**
> 
> Nếu đã nâng cấp lên giao diện Beta mới của Facebook, bạn sẽ nhận thấy styled của Facebook được chuyển hoàn toàn sang Atomic, điều này khiến cho tốc độ lướt web nhanh hơn và source cũng được tối ưu đáng kể.

## 4. Tổng kết
Nhìn chung, Atomic CSS là một khái niệm mới rất thú vị. Phù hợp với câu hát ***"khổ trước sướng sau thế mới giàu, tình nghĩa anh em có chắc bền lâu"***  bởi nó sẽ cực ban đầu cho những người mới và phải dành thời gian tìm hiểu để phải quen với những class được định nghĩa sẵn.

Cảm ơn anh em đã đọc bài, nếu có những điều thú vị về Atomic CSS hãy chia sẻ ở bên dưới nhé.