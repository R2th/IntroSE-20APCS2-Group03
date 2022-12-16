Css3 thật vi diệu, nó có thể làm được rất nhiều hiệu ứng đẹp lung hoặc vui vẻ đến bất ngờ.
Trong quá trình làm việc mình đã tham khảo từ nhiều nguồn khác nhau, 
và đã được thấy những hiệu ứng rất đẹp ý nghĩa chỉ với HTML & CSS.

Trong bài này mình giới thiệu đến các bạn 1 hiệu ứng chữ trôi - trượt như trên phim chỉ với HTML và CSS3.

- Đầu tiên ta viết đoạn HTML với nội dung như dưới đây:

```
<p id="start">STUDYREPORT</p>

<h1>TEXT 3D TRÔI<sub>VỚI -> CSS3</sub></h1>

<div id="titles">
  <div id="titlecontent">

    <p class="center">Bài Ca Không Quên</p>

    <p>
		Có một bài ca không bao giờ quên
		Là lời đất nước tôi chẳng phút bình yên
		Có một bài ca không bao giờ quên
		Là lời mẹ ru con đêm đêm.
	</p>

    <p>
		Bài ca tôi không quên, tôi không quên
		Tháng ngày vất vả
		Bài ca tôi không quên, tôi không quên
		Gót mòn hành quân hối hả
		Làm bạn cùng trăng
		Và ôm súng ngắm sao khuya.
	</p>

    <p class="center">
		Có một bài ca không bao giờ quên 
		Là mẹ dõi bước con bạc tóc thời gian
		Có một bài ca không bao giờ quên 
		Là rừng lạnh sương đêm trăng suông
	</p>
  
    <p>
		Bài ca tôi không quên, tôi không quên
		Những người đã ngã
		Bài ca tôi không quên, tôi không quên
		Gửi trọn đời cho tất cả
		Là đồng đội tôi
		Còn ôm súng giữ biên cương.
	</p>
  
    <p>
		Nhưng giờ đây có giây phút bình yên
		Sao tôi quên, sao tôi quên.
	</p>

    <p class="center">
		Bài ca tôi đã hát, bài ca tôi đã hát
		Với quê hương, với bạn bè, với cả cuộc đời
		Tôi không thể nào quên
		Bài ca tôi đã hát, bài ca tôi đã hát 
		Với em yêu, với đồng đội, với cả lòng mình
		Tôi không thể nào quên.
	</p>
    </div>
</div>
```

Đoạn HTML trên dùng để định vị nội dung, nó bao gồm các thuộc tính và các phần tử để định vị vị trí.

- CSS

Ta viết đoạn css dưới đấy để tạo ra hiệu ứng không gian ba chiều, để nội dung(text) bên trong nó,
chạy theo chiều dọc của màn hình, mang đến cho chúng ta hiệu ứng text trôi - trượt từ dưới lên trên và xa dần.

```
* { padding: 0; margin: 0; }

body, html
{
  width: 100%;
  height: 100%;
	font-weight: 700;
	color: #ff6;
	background-color: #000;
	overflow: hidden;
}

p#start
{
	position: relative;
	width: 16em;
	font-size: 200%;
	font-weight: 400;
	margin: 20% auto;
	color: #4ee;
	opacity: 0;
	z-index: 1;
	-webkit-animation: intro 2s ease-out;
	-moz-animation: intro 2s ease-out;
	-ms-animation: intro 2s ease-out;
	-o-animation: intro 2s ease-out;
	animation: intro 2s ease-out;
}

@-webkit-keyframes intro {
	0% { opacity: 1; }
	90% { opacity: 1; }
	100% { opacity: 0; }
}

@-moz-keyframes intro {
	0% { opacity: 1; }
	90% { opacity: 1; }
	100% { opacity: 0; }
}

@-ms-keyframes intro {
	0% { opacity: 1; }
	90% { opacity: 1; }
	100% { opacity: 0; }
}

@-o-keyframes intro {
	0% { opacity: 1; }
	90% { opacity: 1; }
	100% { opacity: 0; }
}

@keyframes intro {
	0% { opacity: 1; }
	90% { opacity: 1; }
	100% { opacity: 0; }
}

h1
{
	position: absolute;
	width: 2.6em;
	left: 50%;
	top: 25%;
	font-size: 10em;
	text-align: center;
	margin-left: -1.3em;
	line-height: 0.8em;
	letter-spacing: -0.05em;
	color: #000;
	text-shadow: -2px -2px 0 #ff6, 2px -2px 0 #ff6, -2px 2px 0 #ff6, 2px 2px 0 #ff6;
	opacity: 0;
	z-index: 1;
	-webkit-animation: logo 5s ease-out 2.5s;
	-moz-animation: logo 5s ease-out 2.5s;
	-ms-animation: logo 5s ease-out 2.5s;
	-o-animation: logo 5s ease-out 2.5s;
	animation: logo 5s ease-out 2.5s;
}

h1 sub
{
	display: block;
	font-size: 0.3em;
	letter-spacing: 0;
	line-height: 0.8em;
}

@-webkit-keyframes logo {
	0% { -webkit-transform: scale(1); opacity: 1; }
	50% { opacity: 1; }
	100% { -webkit-transform: scale(0.1); opacity: 0; }
}

@-moz-keyframes logo {
	0% { -moz-transform: scale(1); opacity: 1; }
	50% { opacity: 1; }
	100% { -moz-transform: scale(0.1); opacity: 0; }
}

@-ms-keyframes logo {
	0% { -ms-transform: scale(1); opacity: 1; }
	50% { opacity: 1; }
	100% { -ms-transform: scale(0.1); opacity: 0; }
}

@-o-keyframes logo {
	0% { -o-transform: scale(1); opacity: 1; }
	50% { opacity: 1; }
	100% { -o-transform: scale(0.1); opacity: 0; }
}

@keyframes logo {
	0% { transform: scale(1); opacity: 1; }
	50% { opacity: 1; }
	100% { transform: scale(0.1); opacity: 0; }
}

#titles
{
	position: absolute;
	width: 18em;
	height: 50em;
	bottom: 0;
	left: 50%;
	margin-left: -9em;
	font-size: 350%;
	text-align: justify;
	overflow: hidden;
	-webkit-transform-origin: 50% 100%;
	-moz-transform-origin: 50% 100%;
	-ms-transform-origin: 50% 100%;
	-o-transform-origin: 50% 100%;
	transform-origin: 50% 100%;
	-webkit-transform: perspective(300px) rotateX(25deg);
	-moz-transform: perspective(300px) rotateX(25deg);
	-ms-transform: perspective(300px) rotateX(25deg);
	-o-transform: perspective(300px) rotateX(25deg);
	transform: perspective(300px) rotateX(25deg);
}

#titles:after
{
	position: absolute;
	content: ' ';
	left: 0;
	right: 0;
	top: 0;
	bottom: 60%;
	background-image: -webkit-linear-gradient(top, rgba(0,0,0,1) 0%, transparent 100%);
	background-image: -moz-linear-gradient(top, rgba(0,0,0,1) 0%, transparent 100%);
	background-image: -ms-linear-gradient(top, rgba(0,0,0,1) 0%, transparent 100%);
	background-image: -o-linear-gradient(top, rgba(0,0,0,1) 0%, transparent 100%);
	background-image: linear-gradient(top, rgba(0,0,0,1) 0%, transparent 100%);
	pointer-events: none;
}

#titles p
{
	text-align: justify;
	margin: 0.8em 0;
}

#titles p.center
{
	text-align: center;
}

#titles a
{
	color: #ff6;
	text-decoration: underline;
}

#titlecontent
{
	position: absolute;
	top: 100%;
	-webkit-animation: scroll 100s linear 4s infinite;
	-moz-animation: scroll 100s linear 4s infinite;
	-ms-animation: scroll 100s linear 4s infinite;
	-o-animation: scroll 100s linear 4s infinite;
	animation: scroll 100s linear 4s infinite;
}

@-webkit-keyframes scroll {
	0% { top: 100%; }
	100% { top: -170%; }
}

@-moz-keyframes scroll {
	0% { top: 100%; }
	100% { top: -170%; }
}

@-ms-keyframes scroll {
	0% { top: 100%; }
	100% { top: -170%; }
}

@-o-keyframes scroll {
	0% { top: 100%; }
	100% { top: -170%; }
}

@keyframes scroll {
	0% { top: 100%; }
	100% { top: -170%; }
}
```

- Kết quả

khi kết hợp 2 đoạn html và css bên trên, với những hiệu ứng được đoạn css tạo ra
chúng ta sẽ có được 1 hiệu ứng chữ trôi đẹp mắt như hình dưới đây.

![](https://images.viblo.asia/32b8a1d3-b23a-470b-95e0-6515ec5d9a6d.png)

[LINK DEMO](https://codepen.io/hoatnv/full/BGJVoa/)

Trên đây là 1 chia sẻ nhỏ của mình, hy vọng nó hữu ích và giúp các bạn vui vẻ hơn trong công việc.
Cảm ơn các bạn đã theo dõi !!