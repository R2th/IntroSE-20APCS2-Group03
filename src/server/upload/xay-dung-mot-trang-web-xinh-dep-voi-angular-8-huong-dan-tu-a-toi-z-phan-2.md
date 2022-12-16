Nếu mọi người còn nhớ, mình từng có 1 bài [Xây dựng một trang web xinh đẹp với Angular 7 - Hướng dẫn từ A tới Z (phần 1)](https://viblo.asia/p/xay-dung-mot-trang-web-xinh-dep-voi-angular-7-huong-dan-tu-a-toi-z-phan-1-1Je5EvXjKnL). Mình có nói lần sau mình sẽ nói tiếp về phần service và router, mà giờ tác giả ra đến cả phần 2 update lên cả Angular 8 rồi :rofl:

Thôi thì chúng ta cứ đi nốt phần service và router rồi sẽ update lên Angular 8 sau nhé :D
# Bước 2: Lập trình
## B. Services
Đầu tiên ta sẽ tách phần gọi API lấy dữ liệu sang 1 service riêng, để có thể gọi đến ở bất cứ chỗ nào mà không phải viết lại nữa.

Dùng CLI để tự động generate luôn
* **Weather Service**
```
ng g s weather
```
Service này gọi đến API của [OpenWeatherMap](https://openweathermap.org/) để lấy thông tin thời tiết.
```
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {first, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private readonly forcastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  private readonly appID = environment.appID;

  constructor(public http: HttpClient) {
  }

  getWeather(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.baseURL}${city}&units=${metric}&APPID=${this.appID}`).pipe((first()));
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.forcastURL}${city}&units=${metric}&APPID=${this.appID}`)
      .pipe(first(), map((weather) => weather['list']));
  }
}
```
Ở đây ta có 2 function:

**getWeather()**: Lấy thời tiết hiện tại của thành phố mà ta truyền vào params

**getForecast()**: Lấy thời tiết 5 ngày tiếp theo của thành phố mà ta truyền vào params. 

* **UI service**
Đây là 1 service nhỏ để chứa các function dùng để chia sẻ trạng thái UI, như kiểu người dùng đang chọn chế độ dark mode hay light mode
```
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UiService {

  darkModeState: BehaviorSubject<boolean>;

  constructor() {
    // TODO: if the user is signed in get the default value from Firebase
    this.darkModeState = new BehaviorSubject<boolean>(false);
  }
}
```
## C. Routing
Về cơ bản khi chúng ta generate app bằng CLI thì nó đã có sẵn file routing rồi, nhưng vẫn phải sửa lại để thêm url các trang và nó liên kết vs component nào
```
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {DetailsComponent} from './pages/details/details.component';
import {AddComponent} from './pages/add/add.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'details/:city', component: DetailsComponent},
    {path: 'add', component: AddComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
```
Rồi, xong 2 phần còn sót lại của bài trước, giờ tiếp phần 2 nhé! :grinning:
## D. Refactor
### Update Angular mới nhất
Nếu bạn đã follow bài viết từ phần 1 thi chắc hẳn project của bạn vẫn đang là bản Angular 7, vì vậy mình sẽ hướng dẫn các bạn cách update lên version mới nhất. Cũng khá dễ thôi vì từ bản 7 lên bản 8 không có phần nào gây ảnh hưởng đến code cũ. 

Chỉ cần chạy lệnh sau và đợi nó update:
```
ng update @angular/cli @angular/core
```
### Refactor weather card để dùng lại trong trang thêm thành phố
Chúng ta sẽ thêm 1 trang để người dùng có thể thêm thành phố mới vào trang homepage của mình, nên có thể dùng lại weather card làm card kết quả tìm kiếm và thêm 1 biến boolean để component cha truyền xuống để phân biệt.
```
<button class="add-city-btn" *ngIf="addMode" (click)="addCity()">ADD CITY +</button>

<div *ngIf="cityAdded" class="city-added-note">
  <h5 class="add-success-text">City has been successfully added!</h5>
  <svg viewBox="0 0 50 50" height="5rem">
    <circle cx="25" cy="25" r="25" fill="#25ae88"/>
    <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
          stroke-width="2"
          d="M38 15L22 33l-10-8"/>
  </svg>
</div>
```
Để biết được `addMode` là biến truyền sang, chúng ta sẽ thêm `@input` vào phía trước nó khi khai báo. Biến `city` cũng tương tự vậy, có điều, ta muốn lấy điều kiện thời tiết của thành phố từ component cha dưới dạng 1 string, và để làm được điều này thì ta thêm `@input` cho 1 hàm thay vì 1 biến, để được gọi đến mỗi khi có thành phố được tạo thành công. 
```
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import {UiService} from '../../services/ui/ui.service';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {FbService} from '../../services/fb/fb.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit, OnDestroy {

  @Input() set city(city: string) {
    this.cityName = city;
    this.weather.getWeather(city)
      .pipe(first())
      .subscribe((payload) => {
        this.state = payload.weather[0].main;
        this.temp = Math.ceil(payload.main.temp);
      }, (err) => {
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });
    this.weather.getForecast(city)
      .pipe(first())
      .subscribe((payload) => {
        this.maxTemp = Math.round(payload[0].main.temp);
        this.minTemp = Math.round(payload[0].main.temp);
        for (const res of payload) {
          if (new Date().toLocaleDateString('en-GB') === new Date(res.dt_txt).toLocaleDateString('en-GB')) {
            this.maxTemp = res.main.temp > this.maxTemp ? Math.round(res.main.temp) : this.maxTemp;
            this.minTemp = res.main.temp < this.minTemp ? Math.round(res.main.temp) : this.minTemp;
          }
        }
      }, (err) => {
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });

  }

  @Input() addMode;
  @Output() cityStored = new EventEmitter();
  citesWeather: Object;
  darkMode: boolean;
  sub1: Subscription;
  state: string;
  temp: number;
  maxTemp: number;
  minTemp: number;
  errorMessage: string;
  cityName;
  cityAdded = false;

  constructor(public weather: WeatherService,
              public router: Router,
              public ui: UiService,
              public fb: FbService) {
  }

  ngOnInit() {
    this.sub1 = this.ui.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  openDetails() {
    if (!this.addMode) {
      this.router.navigateByUrl('/details/' + this.cityName);
    }
  }

  addCity() {
    this.fb.addCity(this.cityName).subscribe(() => {
      this.cityName = null;
      this.maxTemp = null;
      this.minTemp = null;
      this.state = null;
      this.temp = null;
      this.cityAdded = true;
      this.cityStored.emit();
      setTimeout(() => this.cityAdded = false, 2000);
    });
  }
}
```
Bên trong mỗi phương thức `subcribe`, có sử dụng 1 số phương thức Javascript thông thường như `Math.round` để gán các giá trị hiển thị ngoài HTML, nó giúp cho WeatherService đơn giản hết mức có thể, chỉ trả về đúng dữ liệu API, đề phòng sau này ta sẽ muốn dùng dữ liệu API trả về làm cái gì khác. 

Trang home cũng phải sửa lại 1 chút
```
<app-weather-card *ngFor="let city of cities | async;" [city]="city?.name"></app-weather-card>
```
## E: Bổ sung và thêm tính năng mới
### CSS animation
{@embed: https://www.youtube.com/watch?v=h4odsIgm-Wk}
Khi người dùng chuyển giữa các trang, thêm animation sẽ giúp người dùng cảm thấy đỡ nhàm chán và thể hiện được tính liên tục giữa các phần khác nhau của ứng dung. Sẽ ấn tượng hơn nếu ta sử dụng Javascript, nhưng để đơn giản và dễ hiểu, thì chỉ cần thêm 1 số hiệu ứng của CSS cũng đã đẹp rồi.

Đầu tiên, bạn nên định nghĩa các trạng thái CSS khác nhau (ở đây chỉ dùng `transform` và `opacity` để tối ưu hiệu suất), để bên trong `@keyframe`. Bạn có thể sử dụng keyword `from` để đánh dấu lúc bắt đầu và keyword `to` để kết thúc hiệu ứng hoặc bạn cso thể sử dụng phần trăm nếu muốn chi tiết hơn. (ví dụ như: 0% {...} 50% {...} 100% {...})
```
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slidedown {
  from {
    transform: translateY(-25%);
  }
  to {
    transform: translateY(0);
  }

}

@keyframes slideup {
  from {
    transform: translateY(50%);
  }
  to {
    transform: translateY(0);
  }

}

@keyframes slideright {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }

}

@keyframes scaleup {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }

}

@keyframes scaleup-circle {
  from {
    transform-origin: top;
    transform: scale(0) translateY(-50%) rotate(0deg);
  }
  to {
    transform-origin: center;
    transform: scale(1) translateY(-50%) rotate(360deg);
  }
}
```
Sau khi khai báo xong các hiệu ứng, giờ là lúc có thể sử dụng chúng, bên trong thẻ CSS cần thêm hiệu ứng, ta thêm thuộc tính sau:
```
animation: slideup 1s ease-in-out, fadein 1.25s ease-in-out 0s 1;
```
giờ sẽ giải thích từng thành phần theo thứ tự nhé:
- tên của animation sẽ được khai báo đầu tiên (slideup, fadein...)
- thời gian chạy animation (1s, 2s,...)
- tốc độ chạy animation, có thể nhanh hoặc chậm (ease, ease-in, ease-in-out...)
- thời gian trễ, kiểu như nếu có 2 cái animation thì sẽ delay bao lâu mới chạy tiếp sau khi cái đầu tiên chạy xong (1s, 3s, 4s,...)
- số lần lặp lại animation (vô hạn, 1, 5, 10,...)

### Trang thêm thành phố
![](https://images.viblo.asia/94e8dffe-e2d9-4390-903a-b515c5e87d65.png)

Trang này có tác dụng thêm thành phố yêu thích của người dùng để họ có thể dễ dàng xem và theo dõi nhiệt độ trên trang chủ.

**Firebase Serivce**

Trước khi đi vào phần HTML hay CSS cụ thể nào, chúng ta sẽ tạo 1 service để lưu thành phố người dùng chọn vào database Firebase Firestore.

![](https://images.viblo.asia/9df00c9a-cd91-4e3e-afc9-a834e31126da.png)

Tạo 1 service cho Firebase và đặt tên là `fb.service.ts` hoặc bạn có thể dùng CLI để tạo `ng g s service/fb/fb`.

Import `AngularFireLiteFirestore` từ `angularfire-lite` và thêm vào constructor.  Tiếp theo tạo 1 function `addCity(cityName)` để ghi vào file `uid/cityNames`.  Ngoài ra, thêm 1 function `getCities()` để ngoài component Home sẽ gọi để lấy dự liệu các thành phố mỗi lần người dùng đăng nhập.
```
getCities() {
    return this.auth.uid().pipe(switchMap((uid) => {
      return this.fs.read(`${uid}`);
    }));
  }

  addCity(name: string) {
    return this.auth.uid()
      .pipe(switchMap((uid) => {
        return this.fs
          .write(`${uid}/${name}`, {name, added: new Date()})
          .pipe(first());
      }), first());
  }
```
`this.auth.uid` được lấy từ service `AngularFireLiteAuth` để lấy ID người dùng hiện tại đang đăng nhập (sẽ được nói rõ hơn ở phần Authenticatication phía sau).

**Add city component**

Bắt đầu với bố cục của trang, ở đây ta có 1 ô tìm kiếm và bên cạnh gợi ý thành phố nổi bật để người dùng có thể theo dõi (ở đây ví dụ là Rome nhưng bạn có thể thay bằng bất cứ thành phố nào mà bạn thích, có thể lấy hình ảnh từ API miễn phí của Unspalsh).
```
<div class="add-wrapper">
  <section class="main-card">
    <div class="city-search-wrapper">
      <div class="city-search-header">
        <h3 class="city-search-title">SEARCH CITIES</h3>
        <div class="search-city-input-wrapper">
          <input class="search-city-input" auto-complete-placeholder="search city" placeholder="search city"
                 auto-complete [(ngModel)]="selectedCity"
                 (keyup.enter)="selectCity(input.value)"
                 (ngModelChange)="selectCity(input.value)"
                 [source]="capitals" [max-num-list]="5" [close-on-focusout]="false" #input/>
          <button class="search-city-btn" (click)="selectCity(input.value)">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451 451">
              <path fill="#FFF"
                    d="M447 428L337.6 318.4A192.5 192.5 0 0 0 192.4 0C86.3 0 0 86.3 0 192.3s86.3 192.3 192.3 192.3c48.2 0 92.3-17.8 126-47.2L428.2 447a13.2 13.2 0 0 0 19 0 13.5 13.5 0 0 0 0-19zM27 192.3C27 101.1 101 27 192.3 27c91.1 0 165.3 74.2 165.3 165.3s-74.2 165.4-165.4 165.4A165.6 165.6 0 0 1 27 192.3z"></path>
            </svg>
          </button>
        </div>
        <span class="city-search-hr">O  O  O</span>
      </div>

      <div class="city-search-body">
        <span *ngIf="showNote" class="city-invalid-note">City name is not valid. Note: only capital cities are supported for now</span>
        <app-weather-card (cityStored)="selectedCity = ''" *ngIf="cardCity" [city]="cardCity"
                          [addMode]="true"></app-weather-card>
      </div>
    </div>
    
    <div class="fav-city-wrapper">
      <img class="fav-city-image"
           src="https://www.viajarsolo.com/thumbnails/gallery_image_full/components/kcfinder/kcfinder-3.12/upload/images/0B8ejrJ3IlSZvQUdyWHgtZjdtVVE.jpg?itok=Y2KZ6rfH"/>
      <div class="fav-city-image-overlay"></div>

      <div class="fav-city-header">
        <h3 class="fav-city-title">CITY OF THE MONTH</h3>
        <hr class="fav-city-hr">
        <span class="fav-city-date">Sunday, 31th July</span>
      </div>

      <div class="fav-city-body">
        <div class="fav-city-body-subwrapper">

          <div class="fav-weather-icon" [ngSwitch]="true">
            <svg *ngSwitchCase="state === 'Clouds' || state=== 'Haze'" viewBox="2436.9 -843.1 275.5 274.1">
              <g data-name="cloudy icon" transform="translate(84 790)">
                <circle cx="137" cy="137" r="137" fill="#fff" data-name="Ellipse 23"
                        transform="translate(2354 -1633)"/>
                <path fill="#ffde17"
                      d="M2523.4-1361.5a37.2 37.2 0 0 0 8.4-23.4c0-22-19.8-40-44.1-40l-3.4.1h-.5a39.8 39.8 0 0 0-39.4-33.7 40.1 40.1 0 0 0-10 1.2 40 40 0 0 0-35.2-21.2 40.1 40.1 0 0 0-38.5 29 137.4 137.4 0 0 1-7.8-45.8 138.8 138.8 0 0 1 2.8-27.8 137 137 0 0 1 8-25.8 137.8 137.8 0 0 1 12.7-23.4 138.8 138.8 0 0 1 16.8-20.4 138.8 138.8 0 0 1 20.4-16.9 137.8 137.8 0 0 1 23.4-12.7 137 137 0 0 1 25.9-8 138.8 138.8 0 0 1 27.7-2.8 138.8 138.8 0 0 1 27.8 2.8 137 137 0 0 1 25.9 8 137.8 137.8 0 0 1 23.4 12.7 138.8 138.8 0 0 1 20.4 16.9 138.7 138.7 0 0 1 16.8 20.4 137.8 137.8 0 0 1 12.7 23.4 137 137 0 0 1 8 25.8 138.8 138.8 0 0 1 2.8 27.8 137.4 137.4 0 0 1-8 46.1 137.2 137.2 0 0 1-21.9 39.6 138.2 138.2 0 0 1-33.2 30.1 136.8 136.8 0 0 1-41.9 18z"
                      data-name="Subtraction 1"/>
              </g>
            </svg>
            <svg *ngSwitchCase="state === 'Rain' || state === 'Drizzle' || state === 'Mist'"
                 viewBox="3170 -843.1 163.5 242.7">
              <g data-name="Rain Icon">
                <g data-name="Water Drops">
                  <path fill="#0032cc" d="M3295.4-824.5s85.8 133.5 0 133.5 0-133.5 0-133.5z" data-name="Path 7"/>
                  <path fill="#003eff" d="M3239.4-843s-156.1 242.6 0 242.6 0-242.7 0-242.7z" data-name="Path 3"/>
                </g>
              </g>
            </svg>
            <svg *ngSwitchCase="state === 'Storm' || state === 'Thunderstorm'" viewBox="3487.9 -810.7 291.2 200.3">
              <g data-name="Strom icon" transform="translate(1959 -1260.7)">
                <ellipse cx="55.3" cy="51.7" class="cls-1" data-name="Ellipse 14" rx="55.3" ry="51.7"
                         transform="translate(1529 490.4)"/>
                <ellipse cx="55.3" cy="51.7" class="cls-1" data-name="Ellipse 15" rx="55.3" ry="51.7"
                         transform="translate(1569.6 467.8)"/>
                <circle cx="55.3" cy="55.3" r="55.3" class="cls-1" data-name="Ellipse 16"
                        transform="translate(1618.9 476.8)"/>
                <ellipse cx="55.3" cy="51.7" class="cls-1" data-name="Ellipse 17" rx="55.3" ry="51.7"
                         transform="translate(1631.8 450)"/>
                <ellipse cx="55.3" cy="51.7" class="cls-1" data-name="Ellipse 18" rx="55.3" ry="51.7"
                         transform="translate(1687.1 477.5)"/>
                <ellipse cx="55.3" cy="51.7" class="cls-1" data-name="Ellipse 19" rx="55.3" ry="51.7"
                         transform="translate(1709.6 507.3)"/>
                <circle cx="55.3" cy="55.3" r="55.3" class="cls-1" data-name="Ellipse 20"
                        transform="translate(1639.6 500.1)"/>
                <ellipse cx="55.3" cy="51.7" class="cls-1" data-name="Ellipse 21" rx="55.3" ry="51.7"
                         transform="translate(1569.6 507.3)"/>
                <path fill="none" stroke="#fd0" stroke-width="18"
                      d="M1732.5 644l-61.4-61.4 22.5-10.3 26.8 5.1 9.5-22.4-38-37.2" data-name="Path 59"/>
                <path fill="none" stroke="#fd0" stroke-width="15" d="M1597.2 539.5l31.2 25.9-24.8 22.2 17.3 36.2"
                      data-name="Path 60"/>
              </g>
            </svg>
            <svg *ngSwitchCase="state === 'Sunny' || state === 'Clear'" viewBox="2050 -845 262 262">
              <circle cx="131" cy="131" r="131" fill="#ffde17" data-name="Sun Icon" transform="translate(2050 -845)"/>
            </svg>
            <svg *ngSwitchCase="state === 'Haze' || state === 'Fog'" viewBox="0 0 454 366">
              <path fill="#12bcff"
                    d="M340 110c-40 0-75-14-110-26-30-11-61-21-92-27-35-6-65 6-89 34a28 28 0 0 1-40 3C-3 83-3 66 8 54 53 1 110-9 174 7c36 9 71 25 106 36 19 5 39 10 58 11 27 2 48-13 65-33 12-13 29-15 41-5s13 28 1 41c-28 33-63 53-105 53zM120 312c-27-1-51 11-70 34-11 13-29 15-41 4-12-10-12-28-1-40 45-53 103-63 167-47 37 10 72 25 108 36 18 6 37 10 55 11 27 2 47-12 64-32 8-9 17-15 30-12 21 4 29 28 16 45-37 45-85 65-143 51-34-8-66-21-99-32-27-9-53-18-86-18zM123 128c42 1 81 15 120 29 26 9 52 18 79 24 28 6 53-3 74-24l11-11c11-11 27-11 39-1 10 10 11 26 1 38-35 43-81 64-137 52-34-7-67-20-100-32-29-10-59-20-91-19-28 1-51 13-69 34-12 13-29 15-41 4s-12-28 0-41c30-35 68-52 114-53z"/>
            </svg>
          </div>

          <div class="fav-city-info">
            <span class="fav-city-temp">{{temp}}°</span>
            <div class="fav-city-name-wrapper"><span class="fav-city-name">ROME</span><span
              class="fav-city-country">IT</span></div>
            <span class="fav-city-state">{{state}}</span>
          </div>
          <button class="fav-city-add-btn" [ngClass]="{'fav-city-added-btn': followedCM}" (click)="addCityOfTheMonth()" [disabled]="followedCM">{{followedCM ? "FOLLOWED" : "FOLLOW"}}</button>
        </div>
      </div>
    </div>
  </section>
</div>
```
*đi lướt qua các phần nhé* 
- `<div class="city-search-wrapper">`: phần tìm kiếm bên trái
- `<h3 class="city-search-title">`: tiêu đề của trang
- `input class="search-city-input"...`: ô input để tìm kiếm, sự kiện `(keyup.enter)` để search khi người dùng ấn enter trên bàn phím, tự động gợi ý hoàn thiện nốt từ khi người dùng nhập vài kí tự với thư viện `@ngui/auto-complete`, `[source]` để lấy các options để gợi ý cho người dùng.
- `button class="search-city-btn"`: button search được gán với sự kiện `selectCity()`
- `<div class="city-search-body">`: nơi hiển thị kết quả tìm kiếm
- `<app-weather-card...`: sử dụng lại app-weather-card component để hiện thị thành phố mà người dùng vừa tìm kiếm
- `<div class="fav-city-wrapper">`: phần thành phố nổi bật bên phải
- `<img class="fav-city-image">`:  hình nên của thẻ bên phải (ở đây dùng thuộc tính postion là absolute)
- `<div class="fav-weather-icon"...>`: điều kiện thời tiết của thành phố nổi bật, ở đây dùng `[ngSwitch]` để chuyển giữa các điều kiện thời tiết. 

Giờ là phần CSS
```
.add-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}


.main-card {
  height: 87vh;
  width: 90vw;
  background-color: #fff;
  border-radius: 1rem;
  display: flex;
  margin-top: -4rem;
}

.add-city-btn {
  padding: 0.75rem 1.5rem;
  background-color: #003EFF;
  outline: none;
  border: none;
  color: white;
  border-radius: 2rem;
  font-size: 1rem;
}

.city-search-wrapper {
  display: flex;
  flex-flow: column;
  flex: 1 1;
  position: relative;;
  overflow-y: auto;
}

.city-search-header {
  width: 100%;
  min-height: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: column;
}

.city-search-body {
  width: 100%;
  min-height: 60%;
  display: flex;
  justify-content: center;
}

.city-search-hr {
  word-spacing: 1rem;
  margin: 2rem;
}


.search-city-input-wrapper {
  position: relative;
  width: 80%;
  box-sizing: border-box;
}

.search-city-input {
  box-sizing: border-box;
  width: 100%;
  padding: 1.5rem;
  border-radius: 3rem;
  outline: none;
  border: none;
  box-shadow: 0 0 2rem 0.15rem rgba(0, 0, 255, 0.1);
  font-size: 1rem;
  color: #131F69;
  text-transform: uppercase;
}

.search-city-input::placeholder {
  font-size: 1rem;
  color: #131F69;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}

.search-city-btn {
  cursor: pointer;
  position: absolute;
  background-color: #31feae;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  right: 0;
  top: -0.35rem;
  outline: none;
  border: none;
  z-index: 5;
  box-shadow: 0 0 2rem 0.15rem rgba(0, 0, 255, 0.1);
}

.search-icon {
  height: 50%;
  width: 50%;
}

.fav-city-wrapper {
  flex: 1 1;
  position: relative;;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  height: 100%;
}

.fav-city-image {;
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 0 1rem 1rem 0;
  height: 100%;
}


.fav-city-image-overlay {
  min-height: 100%;
  width: 100%;
  position: absolute;
  background: rgba(43, 36, 77, 0.5);
  border-radius: 0 1rem 1rem 0;
}



.fav-city-body, .fav-city-header {
  position: relative;
  color: white;
  display: flex;
  flex-flow: column;
  align-items: center;
  box-sizing: border-box;
}

.fav-city-body-subwrapper {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}

.fav-city-hr {
  width: 3rem;
}

.fav-city-title, .city-search-title {
  font-size: 1.85rem;
  letter-spacing: 0.1rem;
  word-break: break-all;
}

.fav-city-title {
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}

.city-search-title {
  color: #0c1066;
  margin: 4rem 0 3rem 0;
}


.fav-city-date {
  margin-top: 0.5rem;
}

.fav-city-temp {
  font-size: 5rem;
  text-align: center;
}

.fav-city-name {
  font-size: 2rem;
  letter-spacing: 0.1rem;
}

.fav-weather-icon {
  width: 7rem;
  margin-bottom: 4rem;
}


.fav-city-info {
  display: flex;
  flex-flow: column;
  text-align: center;
  margin-top: -2rem;
}

.fav-city-state {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5rem;
  margin-bottom: 2rem;
}

.fav-city-country {
  margin-left: 0.75rem;
}

.fav-city-name-wrapper {
  margin-bottom: 2rem;
}

.fav-city-add-btn {
  cursor: pointer;
  outline: none;
  margin-bottom: 2rem;
  border: 2px solid white;
  border-radius: 3rem;
  padding: 1.25rem 2rem;
  background-color: transparent;
  color: white;
  font-weight: bold;
}

.fav-city-add-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.fav-city-added-btn {
  border: none;
  background-color: rgba(255, 255, 255, 0.6);
}

app-weather-card {
  margin: 2rem 0;
  min-width: 28rem;
}

/* Media Query:   LT-XL  */
@media screen and (max-width: 1919px) {
  .add-city-btn {
    height: 80%;
    width: 75%;
  }
}

/* Media Query:   LT-MD   */
@media screen and (max-width: 959px) {

  app-weather-card {
    width: 90%;
    margin-bottom: 2rem;
  }

  .fav-city-wrapper {
    height: auto;
  }

  .add-wrapper {
    flex-flow: column;
  }

  .main-card {
    flex-flow: column;
    margin-left: -1rem;
    margin-bottom: 2rem;
    height: auto;
  }

  .city-search-title {
    margin: 2rem;
  }

  .fav-city-wrapper, .city-search-wrapper, .city-search-header, .city-search-body, .fav-city-header, .fav-city-body, .fav-city-body {
    width: 100%;
  }

  .fav-city-wrapper, .fav-city-image, .fav-city-image-overlay {
    border-radius: 0 0 1rem 1rem;
  }

  .fav-city-image {
    background-size: cover;
    background: no-repeat 50% 50%;
  }

}
.add-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}


.main-card {
  height: 87vh;
  width: 90vw;
  background-color: #fff;
  border-radius: 1rem;
  display: flex;
  margin-top: -4rem;
}

.add-city-btn {
  padding: 0.75rem 1.5rem;
  background-color: #003EFF;
  outline: none;
  border: none;
  color: white;
  border-radius: 2rem;
  font-size: 1rem;
}

.city-search-wrapper {
  display: flex;
  flex-flow: column;
  flex: 1 1;
  position: relative;;
  overflow-y: auto;
}

.city-search-header {
  width: 100%;
  min-height: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: column;
}

.city-search-body {
  width: 100%;
  min-height: 60%;
  display: flex;
  justify-content: center;
}

.city-search-hr {
  word-spacing: 1rem;
  margin: 2rem;
}


.search-city-input-wrapper {
  position: relative;
  width: 80%;
  box-sizing: border-box;
}

.search-city-input {
  box-sizing: border-box;
  width: 100%;
  padding: 1.5rem;
  border-radius: 3rem;
  outline: none;
  border: none;
  box-shadow: 0 0 2rem 0.15rem rgba(0, 0, 255, 0.1);
  font-size: 1rem;
  color: #131F69;
  text-transform: uppercase;
}

.search-city-input::placeholder {
  font-size: 1rem;
  color: #131F69;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}

.search-city-btn {
  cursor: pointer;
  position: absolute;
  background-color: #31feae;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  right: 0;
  top: -0.35rem;
  outline: none;
  border: none;
  z-index: 5;
  box-shadow: 0 0 2rem 0.15rem rgba(0, 0, 255, 0.1);
}

.search-icon {
  height: 50%;
  width: 50%;
}

.fav-city-wrapper {
  flex: 1 1;
  position: relative;;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  height: 100%;
}

.fav-city-image {;
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 0 1rem 1rem 0;
  height: 100%;
}


.fav-city-image-overlay {
  min-height: 100%;
  width: 100%;
  position: absolute;
  background: rgba(43, 36, 77, 0.5);
  border-radius: 0 1rem 1rem 0;
}



.fav-city-body, .fav-city-header {
  position: relative;
  color: white;
  display: flex;
  flex-flow: column;
  align-items: center;
  box-sizing: border-box;
}

.fav-city-body-subwrapper {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}

.fav-city-hr {
  width: 3rem;
}

.fav-city-title, .city-search-title {
  font-size: 1.85rem;
  letter-spacing: 0.1rem;
  word-break: break-all;
}

.fav-city-title {
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}

.city-search-title {
  color: #0c1066;
  margin: 4rem 0 3rem 0;
}


.fav-city-date {
  margin-top: 0.5rem;
}

.fav-city-temp {
  font-size: 5rem;
  text-align: center;
}

.fav-city-name {
  font-size: 2rem;
  letter-spacing: 0.1rem;
}

.fav-weather-icon {
  width: 7rem;
  margin-bottom: 4rem;
}


.fav-city-info {
  display: flex;
  flex-flow: column;
  text-align: center;
  margin-top: -2rem;
}

.fav-city-state {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5rem;
  margin-bottom: 2rem;
}

.fav-city-country {
  margin-left: 0.75rem;
}

.fav-city-name-wrapper {
  margin-bottom: 2rem;
}

.fav-city-add-btn {
  cursor: pointer;
  outline: none;
  margin-bottom: 2rem;
  border: 2px solid white;
  border-radius: 3rem;
  padding: 1.25rem 2rem;
  background-color: transparent;
  color: white;
  font-weight: bold;
}

.fav-city-add-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.fav-city-added-btn {
  border: none;
  background-color: rgba(255, 255, 255, 0.6);
}

app-weather-card {
  margin: 2rem 0;
  min-width: 28rem;
}

/* Media Query:   LT-XL  */
@media screen and (max-width: 1919px) {
  .add-city-btn {
    height: 80%;
    width: 75%;
  }
}

/* Media Query:   LT-MD   */
@media screen and (max-width: 959px) {

  app-weather-card {
    width: 90%;
    margin-bottom: 2rem;
  }

  .fav-city-wrapper {
    height: auto;
  }

  .add-wrapper {
    flex-flow: column;
  }

  .main-card {
    flex-flow: column;
    margin-left: -1rem;
    margin-bottom: 2rem;
    height: auto;
  }

  .city-search-title {
    margin: 2rem;
  }

  .fav-city-wrapper, .city-search-wrapper, .city-search-header, .city-search-body, .fav-city-header, .fav-city-body, .fav-city-body {
    width: 100%;
  }

  .fav-city-wrapper, .fav-city-image, .fav-city-image-overlay {
    border-radius: 0 0 1rem 1rem;
  }

  .fav-city-image {
    background-size: cover;
    background: no-repeat 50% 50%;
  }
}
```
(to be continue...)
https://medium.com/@hamedbaatour/build-a-real-world-beautiful-web-app-with-angular-8-the-ultimate-guide-2019-part-ii-fe70852b2d6d