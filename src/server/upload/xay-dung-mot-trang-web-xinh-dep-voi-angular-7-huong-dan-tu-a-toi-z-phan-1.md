Lần trước mình đã có một bài hướng dẫn các bạn [biến một file pts thành 1 giao diện web](https://viblo.asia/p/ho-bien-mot-file-psd-thanh-giao-dien-web-voi-html-css-RnB5pB96ZPG), hôm nay chúng ta sẽ bắt tay vào làm một trang web dự báo thời tiết mà hoàn toàn có thể đem ra sử dụng thật luôn, từ các bước thiết kế cho đến lập trình sử dụng Adobe XD, Angular 7 và Firebase.
## Bước 1: Thiết kế
Bạn có thể down bản thiết kế tại [đây](https://drive.google.com/file/d/17IoWndfi4WrGCPsg-MMW1lYtoy14EjDt/view) để xem các layer xếp chồng lên nhau thế nào để tạo ra được bản thiết kế cuối cùng.
### A. Thương hiệu
![](https://images.viblo.asia/9118f690-53a0-4dfe-a224-6cff5021fbb6.png)

Thương hiệu sẽ thể hiện được giá trị cốt lõi của nó thông qua bản thiết kế, và ở đây thể hiện sự tối giản, gọn gàng và dễ sử dụng.
* **Màu sắc**

    2 màu sắc cơ bản đã bão hòa đem lại sự tươi mới cho giao diện
* **Kiểu chữ**

    Chỉ sử dụng đúng font 'Sans Serif' nên chúng ta không phải tải bất cứ font nào khác, giúp tăng hiệu suất
* **Logo**

![](https://images.viblo.asia/4719b666-2160-4e86-95d0-96855188da10.png)

Việc thiết kế logo nói dễ không dễ, nói khó cũng không hẳn, căn bản là phải phù hợp với mục đích của thương hiệu. Như logo của Nike, chỉ là một dấu chữ check, mất có 35$, trông khi logo của pepsi, cũng chỉ là 3 màu cơ bản xoay qua lại một chút, tốn 1.000.000$ :joy:  Còn đây là logo chúng ta sẽ dùng, chỉ là một chữ M đơn giản, sử dụng 2 hình tam giác giao nhau, vs 2 màu là 2 màu cơ bản của trang web, hiệu quả và chỉ tốn có 0 đồng.
### B. UI/UX
Ứng dụng chủ yếu sử dụng các thẻ có đổ bóng giống như những mảnh giấy trôi nổi. Chỉ những thông tin quan trọng mới được hiển thị ở phía trước để tránh khiến giao diện lộn xộn và sử dụng các hành ảnh động để tăng điểm UX.
* **Light mode (Mặc định)**

![](https://images.viblo.asia/3abc2200-8703-4553-b3f2-e662dd1a2138.png)

   **Dark mode**

![](https://images.viblo.asia/147ced94-e1b0-4078-b3bb-a69bd8ed7c02.png)
* **Icon**

    Người dùng sẽ phải được thông báo về tình hình thời tiết trong nháy mắt, vì thế nên chúng ta sẽ sử dụng bộ icon sau cho cả trang web

![](https://images.viblo.asia/0866ea38-9896-4db3-bfd4-7fbddd4460d8.png)

* **Tranh minh họa**

Có một cách để người dùng có thể dễ dàng đoán ra địa điểm mà lại lấp đầy khoảng trống một cách cực kì trực quan, đấy là thêm một bức tranh minh họa địa điểm, họ sẽ chẳng cần phải đọc chữ, mà hình ảnh thì lúc nào cũng để lại ấn tượng hơn. Cùng nghía qua 1 số hình minh họa nhé!
1. Tunisia

![](https://images.viblo.asia/b262d9ac-3169-476a-b67b-d0db899de5ab.png)
2. Qatar

![](https://images.viblo.asia/a7ab1580-6da6-4faf-b9d0-02421da703a1.png)
3. Nhật bản

![](https://images.viblo.asia/e1f2962d-715b-4437-b336-6f853aac5ace.png)
4. Pháp

![](https://images.viblo.asia/857d118d-d8ad-4de7-a29a-fccbd13b0ffc.png)

## Bước 2: Lập trình
Đã gọi là từ A tới Z thì phải bắt đầu từ người chưa biết gì, nên chúng ta sẽ bắt đầu từ việc install nodejs và angular CLI nhé. Ai biết rồi thì có thể bỏ qua đoạn này.

Install nodejs từ [đây](https://nodejs.org/en/), sau đó mở console, install Angular CLI và typescript  bằng câu lệnh sau
```
npm i -g typescript 
npm i -g @angular/cli
```
![](https://images.viblo.asia/cc052b8c-01ca-4220-ac2a-ef7f328704af.gif)
Sau đấy chạy dòng lệnh sau để generate app sử dụng Angular CLI và đừng quên thêm `--routing` để về sau phân trang và thêm các đường dẫn.
```
ng new Minimus --routing
```
![](https://images.viblo.asia/c09e9760-946c-4109-9cf9-829d5f0cd4cf.gif)

Sau khi đã generate và install xong các thứ cần thiết, chúng ta sẽ khởi động server bằng câu lệnh (thêm `-o` để tự động mở ứng dụng trên tab mới)
```
ng serve -o 
```
![](https://images.viblo.asia/de81e088-3757-46a0-85eb-0e8296d57f8c.gif)
###  A. Template và style
Trước khi đọc tiếp, hãy đảm bảo bạn sẽ tận dụng tối đa bài hướng dẫn này, bằng cách ngưng việc copy + paste, hãy đọc code, mở phần mềm code và trình duyệt cạnh nhau, gõ lại theo cách của bạn, đó là cách duy nhất để bạn có thể hiểu từ đầu đến cuối.

Rồi, giờ thì quay trở lại project, nơi chúng ta đã hoàn thành các bước setup cơ bản, tiếp theo sẽ là viết HTML và CSS. Hãy mở phần mềm code yêu thích của bạn và bắt đầu nào!
* **App Component**

Chúng ta sẽ sử dụng root component `app.component` cho phần navbar component, sẽ làm cho nó ẩn hiện tùy vào việc người dùng có login hay không (sẽ nói đến trong part 2). Có một số thư viện Angular có thể hỗ trợ, nhưng để đảm bảo nó nhẹ nhất có thể, trong bài viết này sẽ không sử dụng đến. 

Đầu tiên mở file `app.component.html`, xóa toàn bộ đoạn HTML mặc định đi, và thêm đoạn HTML này vào:
```
<!-- Slide Menu-->
<aside class="side-menu__container" [ngClass]="{'side-menu__container-active': showMenu}" (click)="toggleMenu()">
<nav class="slide-menu" [ngClass]="{'slide-menu-active': showMenu}" (click)="$event.stopImmediatePropagation();">
    <section class="menu-header">
        <span class="greeting__text">Welcome Back</span>
        <div class="profile-image__container">
            <img src="https://avatars3.githubusercontent.com/u/5658460?s=460&v=4" alt="profile-image"
                 class="profile__image">
        </div>
        <div class="account-details">
            <span class="name__text">Hamed Baatour</span>
            <span class="email__text">hamedbaatour@gmail.com</span>
        </div>
    </section>
    <section class="menu-body">

    </section>
    <section class="menu-footer">

    </section>
</nav>
</aside>

<div class="root__container" >
    <header [ngClass]="{'main__header-dark': darkModeActive}" class="main__header">

        <div class="left__section">
          <svg (click)="toggleMenu()" class="hamburger__icon" id="Menu_Burger_Icon">
              <!-- hamburger icon svg code goes here-->  
          </svg>

            <svg class="logo__icon">
              <!-- logo svg code goes here-->
            </svg>

        </div>

        <h3 class="date__text">Today</h3>


        <div class="mode-toggle__container">
            <span class="mode-toggle__text">Light</span>

            <label class="toggle-button__container">
                <input (click)="modeToggleSwitch()" type="checkbox" class="mode-toggle__input" />
                  <span [ngClass]="{'mode-toggle__bg-checked': darkModeActive}" class="mode-toggle__bg"></span>
                  <span [ngClass]="{'mode-toggle__circle-checked': darkModeActive}" class="mode-toggle__circle"></span>
            </label>


            <span class="mode-toggle__text">Dark</span>
        </div>

    </header>

    <!-- Main Content -->

    <!--<router-outlet></router-outlet>-->
    <main class="main__container">
        <div class="main-container__bg" [ngClass]="{'main-container__bg-dark': darkModeActive}"></div>
        <router-outlet></router-outlet>
    </main>

    <!-- Footer -->

    <footer class="main__footer">
        <small class="copyright__text">Copyright © 2018 Minimus</small>
    </footer>
</div>
```
Thêm hàm này vào file `app.component.ts` để đóng mở sidenav
```
toggleMenu() {
    this.showMenu = !this.showMenu;
 }
 ```

**SVG icon**

SVG icon và logo bạn có thể lấy ở đây (copy + paste)
* [hamburger icon](https://gist.githubusercontent.com/hamedbaatour/9df5e3df4281fcb2ba336025897baace/raw/330466c7c15015069c1d6e7649d5fe2c04c8af15/Minimus%2520-%2520hamburger-icon.svg)
* [logo](https://gist.githubusercontent.com/hamedbaatour/c5f19c873ee2cd98678707948d7f1112/raw/381ab91e4c903800953217eed3e966e25eac3f7f/Minimus%2520-%2520logo.svg)
* [icon thời tiết](https://gist.githubusercontent.com/hamedbaatour/5ec33da214c26529c6a0479a9579a00a/raw/a9f7500364c620f1c4da97b467c102b601939150/Minimus%2520-%2520weather-conditions-icons.svg)

**Thêm style cho root component**

Giờ là thời gian dành cho css, hãy xem nhanh đoạn css bên dưới và xem kết quả đạt được, sau đó tự viết css của bạn, vì mỗi người 1 quan niệm về cái đẹp =))
```
.root__container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 0.5fr auto;
  position: relative;
}

/*
================
    Header
================
*/

/*
    Slide Menu
= = = = = = = = =
*/
.side-menu__container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 25;
}

.side-menu__container-active {
  pointer-events: auto;
}

.side-menu__container::before {
  content: '';
  cursor: pointer;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #0c1066;
  opacity: 0;
  transition: opacity 300ms linear;
  will-change: opacity;
}

.side-menu__container-active::before {
  opacity: 0.3;
}

.slide-menu {
  box-sizing: border-box;
  transform: translateX(-103%);
  position: relative;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100%;
  width: 90%;
  max-width: 26rem;
  background-color: white;
  box-shadow: 0 0 2rem rgba(0, 0, 255, 0.1);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 4fr 1fr;
  grid-gap: 1rem;
  transition: transform 300ms linear;
  will-change: transform;
}

.slide-menu-active {
  transform: none;
}

.menu-header {
  background: linear-gradient(to right, #00FF9B, #5f84fb);
  display: grid;
  grid-template-rows: 1fr 4fr;
  grid-template-columns: 1fr 4fr;
  grid-template-areas: "greeting greeting" "image details";
  box-sizing: border-box;
  width: 100%;
  align-content: center;
  color: white;
  box-shadow: 0 0.5rem 2rem rgba(0, 0, 255, 0.2);
}

.greeting__text {
  grid-area: greeting;
  font-size: 1.25rem;
  letter-spacing: 0.15rem;
  text-transform: uppercase;
  margin-top: 1rem;
  justify-self: center;
  align-self: center;
}

.account-details {
  grid-area: details;
  display: flex;
  flex-flow: column;
  margin-left: 1rem;
  align-self: center;
}

.name__text {
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
}

.email__text {
  font-size: 0.9rem;
  letter-spacing: 0.1rem;
}

.menu-body {
  display: grid;
  width: 100%;
}

.profile-image__container {
  grid-area: image;
  margin-right: 0.5rem;
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  align-self: center;
  margin-left: 2rem;
}

.profile__image {
  max-width: 4rem;
}

/*Header*/
.main__header {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 0.25fr;
  grid-template-rows: 1fr;
  box-shadow: 0 0 2rem rgba(0, 0, 255, 0.1);
  height: 4rem;
  margin: 0;
  align-items: center;
  transition: background-color 500ms linear;
  animation: 1s ease-in-out 0ms 1 fadein;
}

.main__header-dark {
  background-color: #2B244D;
  color: white;
}

.toggle-button__container {
  cursor: pointer;
  position: relative;
  margin: 0 0.5rem;
}

.mode-toggle__input {
  -webkit-appearance: none;
  -moz-appearance: none;
}

.mode-toggle__bg {
  height: 1rem;
  width: 2rem;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  display: inline-block;
  transition: background-color 300ms linear;
}

.mode-toggle__circle {
  height: 1.30rem;
  width: 1.30rem;
  background-color: #2B244D;
  position: absolute;
  top: -0.2rem;
  border-radius: 50%;
  box-shadow: 0 0 0 rgba(0, 0, 255, 0.5);
  transition: left 300ms linear;
  left: 0.1rem;
}

.mode-toggle__circle-checked {
  background-color: white;
  left: 1.75rem;
}

.mode-toggle__bg-checked {
  background-color: #FF0070;
}

.mode-toggle__text {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}

/*Content*/
.left__section {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  max-width: 5rem;
}

.date__text {
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  display: inline;
  margin: 0.5rem 0;
}

/*SVGs*/
.hamburger__icon {
  position: relative;
  z-index: 35;
  height: 1rem;
  padding: 0.5rem 1.5rem;
  margin-right: 1rem;
  cursor: pointer;
}

.logo__icon {
  height: 2rem;
  margin-left: 1rem;
}

.logo__text {
  fill: #2B244D;
}

.logo__text-dark {
  fill: #ffff;
}

.hamburger__icon__fill {
  fill: #2B244D;
}

.hamburger__icon__fill-dark {
  fill: #ffff;
}

/*
================
    Body
================
*/

.main-container__bg {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
  opacity: 0;
  background: white;
  transition: opacity 300ms linear;
}

.main-container__bg-dark {
  opacity: 1;
  background: linear-gradient(to bottom, #B290FF, #2E1D65);
  transition: opacity 300ms linear;
}

/*
================-
    Footer
================
*/
.main__footer {
  background: transparent;
  position: absolute;
  bottom: 1rem;
  left: 1.5rem;
  z-index: 100;
}

.copyright__text {
  letter-spacing: 0.1rem;
  color: white;
}

@media only screen and (max-width: 300px) {
  .slide-menu {
    width: 100%;
  }
}
```
**Hoa mắt nhỉ, giờ giải thích cụ thể hơn đoạn CSS trên nhé**

* Bố cục
```
display: grid;  
grid-template-columns: auto;
grid-template-rows: 0.5fr auto;
```
Ở đây ta dùng CSS grid để chia bố cục, 1 phần nhỏ phía trên cho navbar, phần to phía dưới cho router outlet, cũng chính là nội dung của trang, giống như thế này:

![](https://images.viblo.asia/11a75f08-2ffa-4519-ae26-31dc7540bdf9.png)

* sidenav
```
.side-menu__conatiner {
    position: fixed; 
    left: 0;
    top: 0 
}
```
fix cứng vị trí của sidenav là trên cùng bên tay trái
```
.slide-menu { transform: translateX(-103%); }
```
translateX ở đây sẽ dịch chuyển `slide-menu` theo trục X 1 đoạn -103%, tức là giấu nó vào bên trái ý, sau đó ta thêm vào class `.slide-menu-active`
```
.slide-menu-active {  transform: none; }
```
để reset lại, `slide-menu` sẽ hiện thị ra luôn, ko bị giấu đi nữa.

Bố cục của chúng ta như thế này
![](https://images.viblo.asia/ff7c99b6-c7ae-44ec-8001-84501ecd97a9.png)

Demo
![](https://images.viblo.asia/be75cc71-57e4-4677-ba1b-23d37ec4c410.gif)

* **Nút chuyển đổi**

![](https://images.viblo.asia/12795893-9c94-4f13-8561-b700875e7f61.gif)

Một mẹo nhỏ về UI là cách hiển thị nút chuyển đổi giữa 2 kiểu giao diện. Đầu tiên ta set `none` cho thuộc tính `appearance` để bỏ đi các css mặc định, sau đó sử dụng 2 class cho nền nút chuyển đổi và màu sắc, vị trí của hình tròn, ta dùng 1 biến boolean để lưu trữ kiểu giao diện hiện tại, chuyển đổi giữa 2 class bằng `ngClass` đã được tích hợp sẵn trong Angular.

* **Home component**
Đây là component Home dùng để hiển thị các thẻ thời tiết của thành phố yêu thích của người dùng, từ đây anh ta cũng có thể nhấp vào thêm thành phố để thêm vào trang chủ của mình.

Đầu tiên chúng ta tạo component bằng lệnh sau:
```
ng g c home
```
Trong component này chúng ta sẽ gọi đến và hiển thị 2 component là `weather-card` và `add-card`
```
<div class="main__container">

  <app-weather-card></app-weather-card>
  <app-add-card></app-add-card>

</div>
```
* **Weather card component**

Ở đây ta dùng `ngSwitch` để chuyển giữa các kiểu thời tiết
```
<section class="weather__card" (click)="openDetails()" [ngClass]="{'weather__card-dark': darkMode}">
  <!-- TODO: make the city name dynamic -->
  <span class="city-name__text">Paris</span>
    <div class="weather-icon__container" [ngSwitch]="true">

      <svg *ngSwitchCase="condition === 'Clouds'">
        </svg>

        <svg *ngSwitchCase="condition === 'Rain' || condition === 'Drizzle'">
        </svg>

        <svg *ngSwitchCase="condition === 'Storm'">
        </svg>


        <svg *ngSwitchCase="condition === 'Sunny' || condition === 'Clear'">
        </svg>

      <svg  *ngSwitchCase="condition === 'Fog'"></svg>
    </div>
    <div class="temperature-text__container">
        <span class="temperature__text">{{ currentTemp }}</span>
        <span class="temperature-metric__text">°</span>
        <span class="weather-condition__text">{{ condition }}</span>
    </div>
    <section class="min-max__container">
        <div class="min__container">
            <svg class="min-arrow__icon" viewBox="188.5 807 21 21">
                <path fill="#00ff9b" d="M209.5 817.5h-21L199 828z" data-name="Min Arrow"/>
            </svg>

            <span class="min-temperature__text">{{ minTemp }}</span>
            <span class="min__text">Min</span>
        </div>
        <div class="max__container">
            <svg class="max-arrow__icon" viewBox="449.5 820 21 21">
                <path fill="red" d="M449.5 830.5h21L460 820z" data-name="Max Arrow"/>
            </svg>
            <span class="max-temperature__text">{{ maxTemp }}</span>
            <span class="max__text">Max</span>
        </div>
    </section>
</section>
```
Thêm CSS
```
/*
====================
Weather Card Styling
====================
*/
.weather__card {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  box-shadow: 0 0 2rem rgba(0, 0, 255, 0.1);
  justify-items: center;
  padding: 2rem;
  margin: 2rem;
  width: 19rem;
  height: 30rem;
  cursor: pointer;
  background-color: white;
  border-radius: 1.75rem;
  animation: 1.25s ease-in-out 0ms 1 fadein;
}

.weather__card-dark {
  background: linear-gradient(to bottom, #711B86, #00057A);
  color: white;
}

.city-name__text {
  text-transform: uppercase;
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
  margin-bottom: 1rem;
}

.temperature__text {
  align-self: end;
  width: 100%;
  font-size: 4rem;
  font-weight: 100;
  letter-spacing: 0.1rem;
}

.temperature-metric__text {
  text-align: start;
  font-size: 3rem;
}

.min-max__container {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}

.min__container, .max__container {
  margin: 1rem 3rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
}

.min-arrow__icon, .max-arrow__icon {
  height: 1.25rem;
  margin: auto;
}

.max-arrow__icon {
  margin-bottom: -0.05rem;
}

.weather-condition__text {
  display: block;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  text-align: center;
}

.max__text {
  color: #FF0070;
}

.min__text {
  color: #00FF9B;
}

.max__text, .min__text {
  font-size: 1rem;
  text-align: center;
}

.max-temperature__text, .min-temperature__text {
  text-align: center;
  font-size: 2rem;
  margin: 0 5px 0 20px;
}

.weather-icon__container {
  width: 10rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.weather-icon__container > svg {
  width: 10rem;
}
```
Ta sẽ được demo thế này

![](https://images.viblo.asia/14026d73-d41c-4121-8493-2bf877a9e9e5.png)

**Chế độ ban đêm**

Bạn có thể thấy có 1 số css thêm hậu tố `-dark` là để dùng cho chế độ ban đêm, vẫn dùng `ngClass` để chuyển đổi class. Ví dụ trong trường hợp này, khi chuyển sang chế độ ban đêm

![](https://images.viblo.asia/a1e86ac1-9e08-4ec4-a2bf-a18c79c36368.png)

* **Add card component**

Ở component add card thì ta cũng thêm `ngClass` cho chế độ ban đêm, và thêm `routerLink` để điều hướng người dùng đến trang thêm thành phố khi click vào card đó
```
<div class="add__card" routerLink="/add" [ngClass]="{'add__card-dark': darkMode}">
  <div class="header__container">
  <span class="card__title">Add city</span>
  </div>
  <div class="body__container">
    <svg class="add__icon"></svg>
    <svg class="city__illustration"></svg>
  </div>
</div>
```
Css về cơ bản cũng không khác quá nhiều, vì nó cần đồng bộ vs các card khác, vẫn sử dụng grid layout
```
.add__card {
  background-color: #ffffff;
  box-shadow: 0 0 2rem rgba(0, 0, 255, 0.1);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 2rem;
  margin: 2rem;
  width: 19rem;
  height: 30rem;
  justify-items: center;
  cursor: pointer;
  border-radius: 1.75rem;
  animation: 1.25s ease-in-out 0ms 1 fadein;
  color: #443282;
}

.add__card-dark {
  background: linear-gradient(to bottom, #711B86, #00057A);
  color: white;
}

.card__title {
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}

.city__illustration {
  width: 20rem;
}

.body__container {
  align-self: end;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: column;
}

.add__icon {
  width: 10rem;
  margin-bottom: 1.15rem;
}
```
Kết quả

![](https://images.viblo.asia/a7673b67-1500-44f6-896b-b153a2e4dea0.png)

* **Detail component**

Đây là component để hiển thị chi tiết thời tiết 1 thành phố. Ta sử dụng `WeatherService` để lấy dữ liệu thời tiết trong ngày hôm nay và 5 ngày tới, lưu vào các biến riêng để hiển thị ngoài màn hình
```
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  city: string;
  state: string;
  temp: number;
  hum: number;
  wind: number;

  today: string;

  day1Name: string;
  day1State: string;
  day1Temp: number;


  day2Name: string;
  day2State: string;
  day2Temp: number;

  day3Name: string;
  day3State: string;
  day3Temp: number;

  day4Name: string;
  day4State: string;
  day4Temp: number;

  day5Name: string;
  day5State: string;
  day5Temp: number;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  sub5: Subscription;

  constructor(public activeRouter: ActivatedRoute, public weather: WeatherService) {
  }

  ngOnInit() {

    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];

    this.activeRouter.paramMap.subscribe((route: any) => {

      this.city = route.params.city;
      this.sub1 = this.weather.getWeatherState(this.city).subscribe((state) => this.state = state);
      this.sub2 = this.weather.getCurrentTemp(this.city).subscribe((temperature) => this.temp = temperature);
      this.sub3 = this.weather.getCurrentHum(this.city).subscribe((humidity) => this.hum = humidity);
      this.sub4 = this.weather.getCurrentWind(this.city).subscribe((windspeed) => this.wind = windspeed);
      this.sub5 = this.weather.getForecast(this.city).subscribe((data: any) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          const date = new Date(data[i].dt_txt).getDay();
          console.log(days[date]);
          if (((date === todayNumberInWeek + 1) || (todayNumberInWeek === 6 && date === 0)) && !this.day1Name) {
            this.day1Name = days[date];
            this.day1State = data[i].weather[0].main;
            this.day1Temp = Math.round(data[i].main.temp);

          } else if (!!this.day1Name && !this.day2Name && days[date] !== this.day1Name) {
            this.day2Name = days[date];
            this.day2State = data[i].weather[0].main;
            this.day2Temp = Math.round(data[i].main.temp);

          } else if (!!this.day2Name && !this.day3Name && days[date] !== this.day2Name) {
            this.day3Name = days[date];
            this.day3State = data[i].weather[0].main;
            this.day3Temp = Math.round(data[i].main.temp);

          } else if (!!this.day3Name && !this.day4Name && days[date] !== this.day3Name) {
            this.day4Name = days[date];
            this.day4State = data[i].weather[0].main;
            this.day4Temp = Math.round(data[i].main.temp);

          } else if (!!this.day4Name && !this.day5Name && days[date] !== this.day4Name) {
            this.day5Name = days[date];
            this.day5State = data[i].weather[0].main;
            this.day5Temp = Math.round(data[i].main.temp);

          }
        }
      });

    });

  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
    this.sub5.unsubscribe();
  }
}
```

Phần HTML của trang này có rất nhiều svgs nên rất là dài, vì thế sẽ không đề cập đến trong bài này, bạn có thể vào [đây](https://github.com/hamedbaatour/Minimus) để xem full code nhé. 

Bài dài quá rồi nên lần sau mình sẽ nói tiếp phần service và router nhé. :3

Nguồn: https://medium.com/@hamedbaatour/build-a-real-world-beautiful-web-app-with-angular-6-a-to-z-ultimate-guide-2018-part-i-e121dd1d55e