Bạn đã từng dành 1 tháng ăn không ngon ngủ không yên vì không thể hiểu **API** là gì dù đã đọc đi đọc lại khái niệm? Tôi là một trong số đó, và **sai lầm của tôi** là: tôi **không code**, tôi **chỉ đọc lý thuyết**.
## Tổng quan ví dụ
Chúng ta sẽ xây dựng **ứng dụng quản lý xăng**, gồm 2 tính năng: **tạo** xăng (**create**) và **liệt kê danh sách** xăng (**read**).<br>
Front-end sẽ chạy ở địa chỉ `http://localhost:4200`<br>
Back-end sẽ chạy ở địa chỉ `http://localhost:8800`<br>
Front-end sử dụng framework Angular, back-end sử dụng Spring boot (Java).<br>
Tôi sẽ giải thích theo cách mà mọi người đều có thể hiểu, hãy theo tôi nhé.
## Tính năng 1: thêm xăng mới
### Front-end
Ở client, ta có giao diện:
<br>
![](https://images.viblo.asia/4fb4bb08-4632-49ca-8853-f7233a44e994.png)
<br><br>
![](https://images.viblo.asia/2d7cfc4f-3fa0-43df-8b4b-32bd2e664d4c.png)
<br>
Nhập dữ liệu xong! Bây giờ, khi ta bấm bút **"Tạo"**, điều gì sẽ xảy ra, bạn đoán xem.
<br>
<br>
Ở đây, ta quan tâm đến file `petrol service` trong front-end, đây chính là phần **quan trọng nhất** để **front-end** và **back-end** có thể **giao tiếp** với nhau:
```
@Injectable({providedIn: 'root'})
export class PetrolService {
  constructor(private http: HttpClient) {}

  public create(petrol: Petrol): Observable<any> {
    return this.http.post('http://localhost:8080/api/petrols', petrol);
  }

  public getAll(): Observable<any> {
    return this.http.get('http://localhost:8080/api/petrols');
  }
}
```
Trong đó, hãy chú ý tới `HttpClient`, đây chính là **cầu nối** giữa **front-end** và **back-end**, nhờ nó mà 2 ông mới nói chuyện với nhau được. 
<br>
 Các công nghệ tương đương: 
*  `axios` trong React
*  `fetch`, `XMLHttpRequest` trong Javascript thuần


<br>Quá trình front-end gửi request lên back-end được thực hiện thông qua phương thức `create`:
```
public create(petrol: Petrol): Observable<any> {
    return this.http.post('http://localhost:8080/api/petrols', petrol);
}
 ```
Phương thức `create` gửi 1 **request** với action `POST` đến **back-end**  (địa chỉ `http://localhost:8080/api/petrols`), kèm theo **data** là  `petrol` có dạng:
```
{
    name: "RON 95",
    price: 28150
}
```
***Dạng dữ liệu này được gọi là JSON***<br>
Sau đó, chờ back-end phản hồi.<br>
Hiểu đơn giản là: 
> 😀Front-end: *"Ê back-end, hãy tạo cho tao 1 loại xăng mới, thông tin của nó đây. Tao sẽ đợi mày ở đây, tạo xong thì nhớ phản hồi lại để tao biết."*

### Back-end
Class Petrol (xăng) của chúng ta sẽ có cấu trúc như này:
```
public class Petrol {
	private long id;
	private String name;
	private double price;
	// contructor, getter, setter,
    // ..
}
```
<br>Hãy quan tâm đến đoạn code bên dưới, nó chính là thành phần **tiếp nhận** **request** từ front-end gửi lên, **xử lý** và **trả về response** cho front-end:
```
@RestController
public class PetrolController {
	@Autowired
	private PetrolRepo petrolRepo;

	@RequestMapping(path = "/api/petrols", method = RequestMethod.GET)
	public ResponseEntity<?> getAll(){
		List<Petrol> petrols = petrolRepo.findAll();// lấy ra danh sách gồm tất cả petrol trong database
		
		return new ResponseEntity<>(petrols, HttpStatus.OK);// trả về danh sách cho client
	}
	
	@RequestMapping(path = "/api/petrols", method = RequestMethod.POST)
	public ResponseEntity<?> createOne(@RequestBody Petrol petrol){
		try {
			Petrol createdPetrol = petrolRepo.save(petrol);// lưu petrol mới vào database
			return new ResponseEntity<>(createdPetrol, HttpStatus.CREATED);// trả về petrol vừa tạo cho client
		} catch(Exception e) {
			return new ResponseEntity<>("Đã có lỗi xảy ra", HttpStatus.INTERNAL_SERVER_ERROR);// trả về thông báo lỗi cho client 
		}
	}
}
```
Request từ front-end với action `POST` tới địa chỉ `http://localhost:8080/api/petrols` sẽ đi vào phương thức `createOne`<br>
Bạn để ý  phương thức `createOne`,  nhận vào tham số chính là dữ liệu mà client gửi lên:
```
{
    name: "RON 95",
    price: 28150
}
```
Sau đó, phương thức thực hiện **lưu dữ liệu** vào database, và **phản hồi** lại client (front-end).<br>
Đến đây, client sẽ nhận được phản hồi (response) và làm những việc tiếp theo (hiển thị thông báo tạo thành công, ...)
<br>
<br>
> Lưu ý: trong quá trình back-end xử lý, **có khả năng** xảy ra **lỗi**. Khi lỗi xảy ra, back-end sẽ trả về lỗi đó.

<br>Tóm lại, quá trình back-end này hiểu đơn giản là: 
> 😀Back-end: *"Tao nhận được dữ liệu rồi, đợi tý... Tao tạo xong rồi, đây là thông tin loại xăng vừa được tạo, cầm lấy."* - Nếu không có lỗi gì xảy ra

<br>Hoặc là<br>

> 😀Back-end: *"Tao nhận được dữ liệu rồi, đợi tý... Tao không tạo được, có lỗi gì ấy mày ạ."* - Nếu có lỗi xảy ra
### Minh hoạ
![](https://images.viblo.asia/7025b4d2-145d-4ac9-90ec-b3fb3f032894.png)
<br>
<br>Kết quả cuối cùng:<br>
![](https://images.viblo.asia/622f5aaf-b0a9-4998-b2b0-9370471d5ed4.png)
<br>
### Ngoài lề
Ở phần front-end, ngoài file `petrol service` ra, còn nhiều thành phần khác mà tôi không đưa vào (tránh dài dòng khó hiểu). Tất nhiên là có code html nhé, nếu không làm sao hiển thị giao diện ra được 😅, đúng không😊?<br>
Back-end cũng thế, phần code bên trên trong Spring framework được gọi là `controller`. Ngoài ra còn các thành phần khác để tương tác với database, vân vân và mây mây😄.
## Tính năng 2: đọc danh sách xăng
### Front-end
Ở client, ta có giao diện:
<br>
![](https://images.viblo.asia/4fb4bb08-4632-49ca-8853-f7233a44e994.png)
<br>
Ta kích nút **"Xem danh sách xăng"**, front-end thực hiện gọi phương thức bên dưới (*trích từ đoạn code front-end ở phần trên*):
```
public getAll(): Observable<any> {
    return this.http.get('http://localhost:8080/api/petrols');
}
  ```
  Phương thức `getAll` gọi 1 request với action `GET` đến địa chỉ `http://localhost:8080/api/petrols` và chờ back-end phản hồi.
  <br>
  Hiểu đơn giản là:<br>
> 😀Front-end: *"Ê back-end, hãy đưa cho tao danh sách xăng. Lấy nhanh lên, tao sẽ đợi."*
  
  ### Back-end
  *Trích từ đoạn code back-end ở phần trên:*
  ```
@RequestMapping(path = "/api/petrols", method = RequestMethod.GET)
	public ResponseEntity<?> getAll(){
		List<Petrol> petrols = petrolRepo.findAll();// lấy ra danh sách gồm tất cả petrol trong database
		
		return new ResponseEntity<>(petrols, HttpStatus.OK);// trả về danh sách cho client
	}
```
Back-end nhận được request, lấy ra danh sách xăng từ database, và trả về cho front-end.
<br>
> 😀Back-end: *"Hiểu rồi, đợi tý... Danh sách xăng đây, cầm lấy."*

Lúc này, front-end nhận lại danh sách xăng từ back-end và làm những việc cần làm (hiển thị danh sách,..)
### Minh hoạ
![](https://images.viblo.asia/8ac9ca08-e67b-4886-87e1-5e9d4d240ce1.png)
<br>
<br>Kết quả cuối cùng:<br>
![](https://images.viblo.asia/ae8f4053-dcbc-426d-8d5f-bc2013e98e66.png)
<br>
## Kết
### 1. Tóm lại
Ứng dụng web của chúng ta có **front-end** giao tiếp với **back-end** thông qua **HttpClient**. Front-end gọi back-end để **lấy** dữ liệu, **thêm** dữ liệu, **sửa** dữ liệu hoặc **xoá** dữ liệu. (Phần sửa và xoá tôi không làm, tránh dài dòng).
### 2. API ...
Nhiều bạn mới học back-end hỏi định nghĩa **API**. Qua ví dụ vừa rồi, bạn thấy đấy, API chính là 2 phương thức `createOne` và `getAll` của **back-end**.<br>
**Gọi API** chính là quá trình **front-end** (**client**)  gọi tới những phương thức này, và nhận về dữ liệu (thường là dưới dạng JSON).<br>
Ngoài ra, trong ngành CNTT, ở phạm vi rộng hơn, API còn dùng để chỉ nhiều thứ khác nữa nha.
### 3. Bảo mật
Đây là một ví dụ đơn giản giúp bạn nắm được **luồng giao tiếp cơ bản** của **front-end** và **back-end**. **Cơ bản** nhưng **rất quan trọng** nha.<br>
Trong các ứng dụng thực tế, ta cần **bảo mật**, khi **gọi API**, ta thường thêm `token` để chứng minh ta đã xác thực (authenticated). Để có token, bạn cần đăng nhập. Nếu đăng nhập thành công tức là bạn đã được xác thực và sẽ được trao 1 token có hạn sử dụng. Mỗi khi gọi API, bạn cần gửi kèm cả `token` đó để back-end kiểm tra. Nếu token hợp lệ thì back-end trả về dữ liệu bạn cần.<br>
Khi học back-end bạn sẽ gặp 2 khái niệm là **Authentication** và **Authorization**, nếu bạn chưa biết chúng, hãy tìm hiểu thêm nhé.<br>
### 4. TL;DR
Mong rằng bài này sẽ giúp ích cho bạn.<br>
Nếu bạn có nhận xét, góp ý thì để hãy lại comment.<br>
Tôi biết bạn lười comment mà, tôi cũng thế😆.<br>
Code vui!