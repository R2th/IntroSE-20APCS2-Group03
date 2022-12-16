Xin chào mọi người lâu quá rồi chúng ta mới gặp lại nhau nhỉ, hôm nay mình sẽ chia sẻ với mọi người một tips nhỏ để cache response API trong một khoảng thời gian chúng ta cấu hình. Nhiều khi trong một ứng dụng đó là 1 response khó có thể cập nhật trong 1 khoảng thời gian hoặc các bạn không muốn gọi API đó liên tục thì ta có thể cache lại phía client. Chúng ta sẽ kết hợp RxJS và HttpModule trong Angular để tạo nên cơ chế này nhé. Mình sẽ tạo một class Cacheable<T> với kiểu dữ liệu Generic để có thể dừng cho nhiều API. Sử dụng ReplaySubject của RxJS để lưu dữ liệu. Cơ chế hoạt động của class này vô cùng cơ bản như sau:
```
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

declare type GetDataHandler<T> = () => Observable<T>;

export class Cacheable<T> {

    constructor() {
        this.subjectData = new ReplaySubject(1);
        this.observableData = this.subjectData.asObservable();
        this.cacheTimeout = 5; // default 5 minutes
    }

    protected data: T;
    protected subjectData: Subject<T>;
    protected observableData: Observable<T>;
    protected cacheTimeout: number; // minutes
    protected lastCallAPI: number; // long milliseconds
    public getHandler: GetDataHandler<T>;

    get shouldCallAPI() {
        const now = new Date().getTime();
        return (now - this.lastCallAPI) > Cacheable.convertMinutesToMilliseconds(this.cacheTimeout);
    }

    private static convertMinutesToMilliseconds(min: number) {
        return min * 60 * 1000;
    }

    public getData(): Observable<T> {
        if (!this.getHandler) {
            throw new Error('getHandler is not defined');
        }
        if (!this.data || this.shouldCallAPI) {
            this.getHandler().pipe(map((r: T) => {
                this.data = r;
                this.lastCallAPI = new Date().getTime();
                return r;
            })).subscribe(
                result => this.subjectData.next(result),
                err => this.subjectData.error(err)
            );
        }
        return this.observableData;
    }

    public resetCache(): void {
        this.data = null;
    }

    public refresh(): void {
        this.resetCache();
        this.getData();
    }

    public setCacheTimeout(time: number): void {
        this.cacheTimeout = time;
    }

}
```
Một số điểm mọi người lưu ý trong đoạn code bên trên là hàm shouldCallAPI là hàm check hợp lệ thời gian cache API lại và nên gọi API hay không. Hàm getData là hàm để lấy dữ liệu từ các component khi mình gọi hàm này thì nó sẽ load dữ liệu API cache để binding lên component. Hàm resetCache thì chắc dễ hiểu quá rồi nó sẽ remove dữ liệu đang cache của API nhen. Cuối cùng là hàm setCacheTimeout dùng để set thời gian mình cache dữ liệu API.

Cách sử dụng trong Service của Angular ở đây mình setTimeout cho Cache API Data là 1 phút nghĩa là cứ sau 1 phút nó sẽ gọi lại API để refresh data:
```
data: Cacheable<any> = new Cacheable<any>();

    constructor(private http: HttpClient,
    private authenticationService: AuthenticationService
    ) {
        this.data.setCacheTimeout(1);
        this.data.getHandler = () => {
            return this.http.get<any>(API_URL).pipe(map((r: Response) => r));
        };
    }
```
Cách lấy dữ liệu Cache trong Component:
```
export class HomePageComponent implements OnInit {

    homeData: any;

    constructor(

        private cacheService: CacheService,
    ) {
        this.cacheService.data.getData().subscribe(data => {
            if (data) {
                this.homeData = data;
            }
        });
    }
```
Trên đây là một mẹo nhỏ cho các bạn sử dụng RxJS trong một ứng dụng Angular để cache lại dữ liệu mọi người có thể bình luận nếu có thắc mặc hoặc cách nào hay hơn nhé. Chúc mọi người một tuần làm việc vui vẻ và hẹn gặp mọi người trong bài viết lần sau nhé!
    
Link bài viết gốc trên blog mình ở dưới này nha ^^
[ https://gociter.wordpress.com/2020/08/02/cache-response-trong-ung-dung-angular-9/](https://gociter.wordpress.com/2020/08/02/cache-response-trong-ung-dung-angular-9/)