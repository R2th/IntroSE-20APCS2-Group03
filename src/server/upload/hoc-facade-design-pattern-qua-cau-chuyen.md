[Design Pattern là gì](https://viblo.asia/p/design-pattern-la-gi-V3m5WPbyKO7)

### Rạp chiếu phim tại gia

Trước khi bắt đầu tìm hiểu về Facade Pattern, chúng ta sẽ xem xét về cách xây dựng ứng dụng rạp hát tại nhà.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/qx0xfbv3wb_image.png)

Như bạn đã thấy, đây là 1 hệ thống phức tạp, rất nhiều class và rất nhiều sự tương tác qua lại giữa các lớp. 

Hệ thống bao gồm máy chiếu, âm thanh, DVD, CD, máy tạo bắp rang bơ, đèn,....

Bạn phải mất vài tuần để lắp đặt, kết nối, tích hợp các thiết lại với nhau... Và bây giờ bắt đầu tận hưởng những bộ phim nào.

### Xem phim trong địa ngục

Chọn 1 đĩa phim DVD, và tận hưởng,... Nhưng trước khi xem được phim bạn phải làm những công việc sau:

1. Khởi động máy làm bắp rang bơ.
2. Bấm nút để tạo bắp rang bơ
3. Chỉnh đèn mờ lại.
4. Hạ màn chiếu xuống.
5. Bật máy chiếu.
6. Cài đặt cổng máy chiếu vào DVD.
7. Chuyển trạng thái máy chiếu qua wide-screen (chiều ngang).
8. Kết nối dàn âm thanh(amplifier) với DVD.
9. Chuyển chế độ âm thanh thành surround sound.
10. Chỉnh âm thanh sang chế độ trung bình(5).
11. Mở DVD player.
12. Bấm nút Play để bắt đầu xem phim.

Và đây là code bạn cần phải thực thi:

```
//Mở máy bắp rang bơ và tiến hành tạo bắp
popper.on();
popper.pop();

//Chỉnh độ sáng lại còn 10%
lights.dim(10);

//Hạ màn máy chiếu xuống
screen.dowm();

//Bật máy chiếu và chuyển sang chế độ wideScreen
projector.on();
projector.setInput(dvd);
projector.wideScreenMode();

//Mở máy amplifier, kết nối với DVD và cài đặt âm thanh 5
amp.on();
amp.setDvd(dvd);
amp.setSurroundSound();
amp.setVolume(5);

//Cuối cùng là mở đầu DVD và xem phim 
dvd.on();
dvd.play(movie);
```

### Nhưng chưa kết thúc tại đây...

* Khi bộ phim kết thúc làm thế nào để bạn tắt hết mọi thứ? Không lẽ chúng ta lại làm những điều rồi 1 lần nữa?

* Nó có dễ dãng khi chúng ta muốn nghe 1 đĩa CD hay radio không?
 
* Nếu bạn muốn nâng cấp hệ thống, thì bạn phải học cách hoạt động của từng loại DVD, CD, radio,...

Chúng ta nên làm gì đây? Một hệ thống rạp chiếu phim phức tạp đã xuất hiện, chúng ta bỏ tiền mua chúng nhưng phải phục vụ ngược lại chúng,..

Nào hãy xem các Facade Pattern giúp bạn thoát khỏi tình trạng ngặt ngèo này.

### Facade pattern

Facade(bề ngoài, mặt chính) -> Có nghĩa là bạn chỉ cần 1 lớp đại diện thực thi tất cả các công việc phức tạp của hệ thống con(DVD, CD, radio,..).

Bạn cũng đừng quá lo lắng, nếu muốn sẽ dựng các chứng năng của hệ thống con, bởi vì các chức năng của hệ thống con vẫn còn đó, bạn có thể sử dụng tuỳ ý.

Nhưng nếu bạn muốn 1 hệ thống trực tiếp thực thi các công việc rườm rà thì Facade sẽ giúp bạn.

Và đây là bức tranh tổng thể về mô hình hoạt động của Facade

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/olvq031d35_image.png)

1. Đầu tiên ta tạo class `HomeTheaterFacade` để thực thi cách chức năng chính như `watchMovie()`
2. Facade class xem các thành phần Amplifier, DvdPlayer, CdPlayer, Tuner,... như là 1 hệ thống con (subsystem), và gọi các hệ thống con để thực thi hàm watchMovie().
3. Bây giờ ta chỉ cần thực thi các hàm của Facade, và không cần phải thực thi hàm trong hệ thống con. Bây giờ việc xem phim đối với chúng ta thật dễ dàng, chỉ cần gọi hàm watchMovie() là chúng ta có thể xem phim được ngay.
4. Với thiết kế Facade bạn vẫn có thể truy cập trực tiếp vào hệ thống con, để thực hiện các chứng năng nâng cao (điều chỉnh độ sáng của đèn, chỉnh tăng/giảm âm thanh,...).

### Xây dựng rạp chiếu thông minh

Bước đầu tiên ta xây dựng Facade sử dụng composition, để truy cập các thành phần của hệ thống con:


```
public class HomeTheaterFacade {
	Amplifier amp;
	Tuner tuner;
	DvdPlayer dvd;
	CdPlayer cd;
	Projector projector;
	TheaterLights lights;
	Screen screen;
	PopcornPopper popper;
    
   //Facade truyền những phần tử của hệ thống con vào constructor
	public HomeTheaterFacade(Amplifier amp, 
				 Tuner tuner, 
				 DvdPlayer dvd, 
				 CdPlayer cd, 
				 Projector projector, 
				 Screen screen,
				 TheaterLights lights,
				 PopcornPopper popper) {
 
		this.amp = amp;
		this.tuner = tuner;
		this.dvd = dvd;
		this.cd = cd;
		this.projector = projector;
		this.screen = screen;
		this.lights = lights;
		this.popper = popper;
	}
    
   //Hàm xem phim thực thi tuần tự từng bước như ta đã xét ở trước, 
   //Mỗi nhiệm vụ sẽ được thực thi bới các hệ thống con tương ứng.
	public void watchMovie(String movie) {
		System.out.println("Get ready to watch a movie...");
		popper.on();
		popper.pop();
		lights.dim(10);
		screen.down();
		projector.on();
		projector.wideScreenMode();
		amp.on();
		amp.setDvd(dvd);
		amp.setSurroundSound();
		amp.setVolume(5);
		dvd.on();
		dvd.play(movie);
	}
 
   //Cách hoạt động cũng tương tự như hàm watchMovie nhưng theo hướng ngược lại
	public void endMovie() {
		System.out.println("Shutting movie theater down...");
		popper.off();
		lights.on();
		screen.up();
		projector.off();
		amp.off();
		dvd.stop();
		dvd.eject();
		dvd.off();
	}

	public void listenToCd(String cdTitle) {
		System.out.println("Get ready for an audiopile experence...");
		lights.on();
		amp.on();
		amp.setVolume(5);
		amp.setCd(cd);
		amp.setStereoSound();
		cd.on();
		cd.play(cdTitle);
	}

	public void endCd() {
		System.out.println("Shutting down CD...");
		amp.off();
		amp.setCd(cd);
		cd.eject();
		cd.off();
	}

	public void listenToRadio(double frequency) {
		System.out.println("Tuning in the airwaves...");
		tuner.on();
		tuner.setFrequency(frequency);
		amp.on();
		amp.setVolume(5);
		amp.setTuner(tuner);
	}

	public void endRadio() {
		System.out.println("Shutting down the tuner...");
		tuner.off();
		amp.off();
	}
}
```

Và bắt đầu xem phim nào

```
public class HomeTheaterTestDrive {
	public static void main(String[] args) {
       //Khởi tạo các hệ thống con
		Amplifier amp = new Amplifier("Top-O-Line Amplifier");
		Tuner tuner = new Tuner("Top-O-Line AM/FM Tuner", amp);
		DvdPlayer dvd = new DvdPlayer("Top-O-Line DVD Player", amp);
		CdPlayer cd = new CdPlayer("Top-O-Line CD Player", amp);
		Projector projector = new Projector("Top-O-Line Projector", dvd);
		TheaterLights lights = new TheaterLights("Theater Ceiling Lights");
		Screen screen = new Screen("Theater Screen");
		PopcornPopper popper = new PopcornPopper("Popcorn Popper");
       
       Tích hợp hệ thống con
		HomeTheaterFacade homeTheater = 
				new HomeTheaterFacade(amp, tuner, dvd, cd, 
						projector, screen, lights, popper);
 
        //Sử dụng hệ thống
		homeTheater.watchMovie("Raiders of the Lost Ark");
		homeTheater.endMovie();
	}
}
```

Kết quả hiển thị: 

> Get ready to watch a movie...
> 
> Popcorn Popper on
> 
> Popcorn Popper popping popcorn!
> 
> Theater Ceiling Lights dimming to 10%
> 
> Theater Screen going down
> 
> Top-O-Line Projector on
> 
> Top-O-Line Projector in widescreen mode (16x9 aspect ratio)
> 
> Top-O-Line Amplifier on
> 
> Top-O-Line Amplifier setting DVD player to Top-O-Line DVD Player
> 
> Top-O-Line Amplifier surround sound on (5 speakers, 1 subwoofer)
> 
> Top-O-Line Amplifier setting volume to 5
> 
> Top-O-Line DVD Player on
> 
> Top-O-Line DVD Player playing "Raiders of the Lost Ark"
> 
> Shutting movie theater down...
> 
> Popcorn Popper off
> 
> Theater Ceiling Lights on
> 
> Theater Screen going up
> 
> Top-O-Line Projector off
> 
> Top-O-Line Amplifier off
> 
> Top-O-Line DVD Player stopped "Raiders of the Lost Ark"
> 
> Top-O-Line DVD Player eject
> 
> Top-O-Line DVD Player off

### Định nghĩa về Facade Pattern

>  The Facade Pattern provides a unified interface to a set of interfaces in a subsytem. Facade defines a higher- level interface that makes the subsystem easier to use.

Tạm dịch là:

> Facade Pattern cung cấp một giao diện thống nhất cho các hệ thống con. Facade định nghĩa giao diện ở cấp cao(high-level interface) để dễ dàng cho việc sử dụng các hệ thống con.

### Mô hình tổng thể Facade Pattern

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/j12t09cq41_image.png)

### Lời kết:

Với Facade Pattern bạn có làm những việc sau:

1. Có thể sử dụng Facade để thực thi hàng loạt các lệnh của hệ thống con. Trường hợp bạn muốn tuỳ chỉnh riêng 1 chức năng của hệ thông con, thì bạn vẫn có thể truy cập trực tiếp.
2. Ngoài chức năng gom nhóm các hệ thống con, Facade còn có chức năng là kiếm tra, thực thi các lệnh một cách thông minh, như là: muốn xem DVD thì phải mở đầu DVD trước.
3. Trong ví dụ trên ta chỉ có 1 Facade, nhưng trong thực tế bạn có thể thêm bao nhiêu Facade cũng được, tuỳ theo từng trường hợp.
4. Facade còn giúp tách biệt code của client và code thực thi, khi có thay đổi, bạn chỉ cần chỉnh sửa lại code Facade mà không ảnh hưởng tới client. (Lưu ý, 1 Facade có thể được sử dụng bởi nhiều clients)

Source code: https://github.com/bethrobson/Head-First-Design-Patterns/tree/master/src/headfirst/designpatterns/facade/hometheater

### Đóng góp

Các bạn bỏ ra 1 phút giúp mình nhé. Vui lòng để lại ý kiến của bạn để giúp người sau dễ đọc và dễ hiểu hơn. 

Cảm ơn các bạn đã quan tâm bài viết này. Chúc các bạn 1 ngày tốt lành! :)

Tham khảo từ: Head First Design Pattern (Eric Freeman & Elisabeth Freeman)

### Bài viết liên quan:

[Design Pattern là gì](https://viblo.asia/p/design-pattern-la-gi-V3m5WPbyKO7)