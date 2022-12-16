# Lời nói đầu
Hiện nay, việc lựa chọn và sử dụng các thư viện icon trong dự án đôi khi sẽ trở nên khó khăn do ngày càng có nhiều thư viện icon ra đời, thư viện nào cũng thiết kế ra những icon đẹp đẽ, bắt mắt, và hiện đại. Mỗi icon lại mang một ý nghĩa và truyền đạt thông tin nhất định nên nhiều khi icon của thư viện này trông sẽ đẹp và phù hợp hơn thư viện kia, đồng nghĩa với việc nên kết hợp nhiều thư viện icon trong một dự án. Ở bài viết này, mình sẽ liệt kê những thư viện icon miễn phí, phổ biến mà mình thấy khá là đẹp mắt. Mọi người có thể tham khảo để áp dụng vào dự án một cách nhanh chóng và dễ dàng.

## 1. [Ionicons](https://ionic.io/ionicons)
![](https://images.viblo.asia/b50c1ab8-1fde-4669-bcf0-f583763cb19e.png)

Đây là thư viện icon được sử dụng trong dự án mà mình tham gia luôn. Các biểu tượng được thiết kế để sử dụng trong các ứng dụng web, iOS, Android và desktop app. Hỗ trợ SVG và webfont. Hoàn toàn mã nguồn mở, MIT được cấp phép và xây dựng bởi [Ionic](https://ionic.io/). Nó có 2 phiên bản: material design và iOS.

![](https://images.viblo.asia/7e60726b-86e5-41c0-8d43-bff35aaef40d.png)

Để sử dụng thư viện Ionicons, có thể cài đặt package đó.
```
npm install ionicons
```

Hoặc include liên kết CDN của nó trong dự án của bạn:
```
<script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
```

Sau đó, sử dụng component `ion-icon` để hiển thị các biểu tượng:
```
<ion-icon name="circle"></ion-icon>
```

Hãy thử truy cập [Ionicons](https://ionic.io/ionicons) để xem nhiều icon khác nữa nhé :D

## 2. [Feather](https://feathericons.com/)
![image.png](https://images.viblo.asia/e4656aed-5f53-45b9-a189-0ea7bf8e87cf.png)

**Feather** là một bộ sưu tập các biểu tượng mã nguồn mở đơn giản đẹp mắt. Mỗi biểu tượng được thiết kế trên lưới 24x24 với trọng tâm là sự đơn giản, nhất quán và linh hoạt. Tất cả các biểu tượng trong Feather đều dựa trên SVG, có nghĩa là bạn có thể sử dụng chúng bên trong hầu hết các thuộc tính HTML và CSS, chẳng hạn như `img`, `background-image`, `inline`, `object`, `embed`, `iframe`,...

![](https://images.viblo.asia/7dcd21d8-f50e-4c1b-adba-f43f8e221af9.png)

Để sử dụng thư viện Feather, có thể cài đặt package đó:

```
npm install feather-icons

yarn add feather-icons
```

Hoặc cũng có thể fetch nó từ CDN:
```
<!-- choose one -->
<script src="https://unpkg.com/feather-icons"></script>
<script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
```

Để sử dụng biểu tượng trên trang của bạn, hãy thêm thuộc tính có tên icon vào element `data-feather`:
```
<i data-feather="circle"></i>
```

**Feather** có các [thư viện của bên thứ ba](https://github.com/feathericons/feather#related-projects) giúp dễ dàng sử dụng các biểu tượng bên trong các framework phổ biến hiện đại như Angular, Vue và React. Hãy thử truy cập  [Feather docs](https://github.com/feathericons/feather) để tham khảo thêm cách áp dụng vào dự án của bạn nhé :D

## 3. [Tabler Icons](https://tabler-icons.io/)
![](https://images.viblo.asia/4b0db111-8a1b-45d6-9d93-f08efcb526ec.png)

**Tabler Icons** là một tập hợp các biểu tượng hỗ trợ SVG và web fonts miễn phí, được cấp phép MIT. Mỗi biểu tượng được thiết kế mặc định với size 32px và nét viền 2px, bạn có thể thay đổi 2 thuộc tính này theo các lực chọn mà họ cung cấp.

Tất cả các biểu tượng đều được xây dựng bằng SVG, vì vậy bạn có thể đặt chúng dưới dạng `<img>`, `background-image`, inline trong HTML code, hoặc import vào react component,...

![image.png](https://images.viblo.asia/81de7c72-6a94-44e7-a72a-4384cc47fa81.png)

Để sử dụng thư viện Tabler Icons, có thể cài đặt package đó:

```
npm install @tabler/icons --save
```

Hoặc include liên kết CDN của nó trong dự án của bạn:
```
<link rel="stylesheet" href="https://unpkg.com/@tabler/icons@latest/iconfont/tabler-icons.min.css">
<script src="https://unpkg.com/@tabler/icons@latest/icons-react/dist/index.umd.min.js"></script>
```

Có rất nhiều cách để sử dụng biểu tượng trên trang của bạn:

```
# Web font
<i class="ti ti-arrow-big-down"></i>
# React
import { IconArrowBigDown } from '@tabler/icons';
...
```

Hãy thử truy cập [Tabler Icons](https://tabler-icons.io/) để xem nhiều icon khác nữa và tham khảo [docs](https://github.com/tabler/tabler-icons) để áp dụng vào dự án của bạn nhé :D

## 4. [css.gg](https://css.gg/)
![image.png](https://images.viblo.asia/25652ee7-d650-45a1-9b0c-3b2f5a1b7fb2.png)

Ban đầu css.gg được tạo ra bởi Astrid Malsija như một dự án cá nhân, nhưng nó đã thu hút sự chú ý của cộng đồng và một số nhà thiết kế đã góp phần thêm phiên bản SVG, một gói thiết kế cho [Figma](https://www.figma.com/community/file/834587122842084475) và [Adobe XD](https://xd.adobe.com/view/258f1c41-07d1-4036-7c67-f9f75a375f91-53be/) và các thành phần web cho [React](https://github.com/astrit/css.gg#react).

![](https://images.viblo.asia/449ec352-566a-4007-a3a0-7306eb10bd49.png)

Đây là một thư viện khá hay ho và thú vị bởi vì các biểu tượng được tạo hoàn toàn bằng CSS thuần túy. Chính vì thế mà sẽ hiển thị rất nhanh vì chúng không yêu cầu bất kỳ tài nguyên nào khác. Thư viện này bao gồm hơn 700 biểu tượng và nó hoàn toàn miễn phí. Mỗi biểu tượng cụ thể sẽ được css.gg show chi tiết thiết kế CSS của biểu tượng đó, bạn cũng có thể thay đổi kích cỡ, màu sắc, animations của icon đó.

![](https://images.viblo.asia/06b72234-10aa-4d8e-a092-a49e7979e2fe.png)

Để lựa chọn sử dụng cho dự án, bạn có thể cài đặt package, sử dụng liên kết CDN, tải xuống SVG hoặc sử dụng các component của React. Hãy truy cập [docs](https://github.com/astrit/css.gg) để tham khảo thêm cách cài đặt và sử dụng cho dự án của bạn nhé :D

## 5. [React Icons](https://react-icons.github.io/react-icons)
![image.png](https://images.viblo.asia/ee20b6ea-4292-4dd5-b4de-6112c5bd5731.png)

Khác với các thư viện icon đã nói ở trên, **React Icons** là một thư viện biên dịch biểu tượng cho phép bạn thêm các biểu tượng từ các thư viện khác nhau vào dự án React của bạn dưới dạng phần tử SVG.

![](https://images.viblo.asia/825ad63a-33d4-4e7a-8378-b732891f4eaa.png)


Để thêm icon, hãy cài đặt package và import vào component của bạn:

```
yarn add @react-icons/all-files
# or
npm install @react-icons/all-files --save

# example usage: FaBeer component will be rendered as an SVG

import { FaBeer } from "@react-icons/all-files/fa/FaBeer";
class Question extends React.Component {
  render() {
    return <h3> Lets go for a <FaBeer />? </h3>
  }
}
```

**React Icons** bao gồm các icon từ các thư viện sau:

* Ant Design Icons
* Bootstrap Icons
* Devicons
* Feather
* Flat Color Icons
* Font Awesome
* Game Icons
* Github Octicons icons
* Grommet-Icons
* Ionicons
* Material Design icons
* Remix Icon
* Typicons
* Weather Icons

## 6. [Line Awesome](https://icons8.com/line-awesome)
![image.png](https://images.viblo.asia/58eb1c1c-0523-4642-83a1-c0ec61b993e8.png)

Đây là thư viện miễn phí thay thế cho Font Awesome rất tuyệt vời, nó render sẵn CSS và chỉ với class nhỏ là có thể dùng được nó. **Line Awesone** bao gồm ~1380 flat icon cung cấp độ phủ hoàn toàn cho bộ biểu tượng Font Awesome chính.

Bạn có thể sử dụng **Line Awesome** bằng cách cài đặt package, dùng CDN:

```
# npm
npm i line-awesome

# yarn
yarn add line-awesome

# CDN
<link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/font-awesome-line-awesome/css/all.min.css" >
```

![](https://images.viblo.asia/9d93a2de-4808-4f5d-ab5b-b11c157e569d.png)


## 7. [iconmonstr](https://iconmonstr.com/iconicfont/)
![image.png](https://images.viblo.asia/b6f8778e-f332-4aa3-aaac-ae24214e0381.png)

Thư viện **Iconmonstr**  có sẵn hơn 300 biểu tượng, tất cả chúng đều được thiết kế khá bắt mắt so với các thư viện khác. Nó hỗ trợ SVG, PNG, EPS, PSD và webfont. Bạn có thể include liên kết CDN của nó trong dự án của bạn hoặc download các file mà thư viện hỗ trợ về rồi import vào dự án.

![](https://images.viblo.asia/9d1d38fd-9c0b-4214-925f-85ecb0fa72c8.png)

## 8. Thư viện khác
Ngoài những thư viện icon mà mình liệt kê ở trên, thì còn rất nhiều các thư viện quá quen thuộc khác như  [Bootstrap Icons](https://icons.getbootstrap.com/), [Font Awesome](https://fontawesome.com/v5.15/icons?d=gallery&p=2), [Material Icons](https://fonts.google.com/icons),... hầu hết các developer đều đã từng làm quen với nó nên mình sẽ không mô tả chi tiết hơn, hãy xem lại docs của các thư viện đó nếu muốn sử dụng nhé :D

# Tổng kết

Vậy là mình đã liệt kê các thư viện icon mà mình biết với mọi người, ngoài ra còn rất nhiều các thư viện khác tuyệt vời hơn mà có thể mình chưa biết, nếu biết thêm các thư viện khác thì bạn có thể để lại comment để mọi người cùng tìm hiểu và sử dụng. Hãy lựa chọn những bộ icon phù hợp và bắt mắt nhất để có thể mang lại giao diện đẹp nhất tới người dùng nhé!!!

Cảm ơn mọi người đã theo dõi bài viết :wink: