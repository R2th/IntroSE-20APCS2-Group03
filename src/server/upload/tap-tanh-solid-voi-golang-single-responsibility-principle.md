## Lời mở đầu:
Ngày nay, có rất nhiều nguồn tài liệu giúp lập trình viên chúng ta học tập, rèn luyện cũng như triển khai các loại phần mềm khác nhau. Tuy nhiên, để có thể có những đoạn code *đủ tốt*, theo quan điểm cá nhân của tôi, việc học tập và rèn luyện những nguyên tắc là một việc rất quan trọng. **SOLID** là một trong những nguyên tắc đã giúp tôi cải thiện được level cũng như khả năng viết code của tôi và tôi hi vọng với những dòng chia sẻ ngắn ngủi trong series bài viết này sẽ giúp mọi người có thêm một góc nhìn cũng như nhìn nhận về tầm quan trọng của **SOLID** trong ngành công nghiệp phát triển phần mềm. 

## Single Responsibility Principle:
Có thể nói, đây mà một nguyên tắc mà mọi lập trình viên chúng ta đều biết đến và cũng là một trong những câu hỏi khác phổ biến khi tham gia phỏng vấn ở các công ty. Hôm nay chúng ta sẽ cùng nhau thảo luận, đánh giá cũng như nhìn nhận bản chất thật sự của nó là gì? và nó có thật sự phát huy được sức mạnh khi chúng ta áp dụng nó trong công việc.

Không đơn giản để có một bước đột phá trong việc phát triển phần mềm. Hầu hết, chúng đến từ việc viết lại hoặc chỉnh sửa lại các logic sau những lần thay đổi yêu cầu hoặc có thể do những phần kiến thức còn thiếu xót của chính chúng ta chưa đủ để hoàn thành công việc đó. Cá nhân tôi thích cảm giác đó. Vì đó chính là khoảng thời gian tôi được đào sâu cũng như bổ sung những kiến thức mà mình còn thiếu sót. 

Như đã đề cập ở trên, một trong những bước tiến lớn nhất của tôi trong con đường phát triển bản thân đó chính là khi biết đến nguyên tắc **SOLID**. 

Hôm nay, tôi sẽ bắt đầu hành trình của mình với nguyên tắc SOLID và những ví dụ với Go. Đầu tiền, chúng ta sẽ đi tìm hiểu chữ S trong nguyên tắc **SOLID**.  Single Responsibility, hiểu nôm na là một nhiệm vụ duy nhất. 

**Khi chúng ta không tuân thủ (tôn trọng) Single Responsibility:**

**Khái niệm:** *Single Responsibility* phát biểu như sau: mỗi module chỉ nên có một và chỉ một lý do để thay đổi

Phát biểu trên được đưa ra bởi *Chú Bob (Uncle Bob)*.  Ngày nay, SRP (*Single Responsibility Principle*) có độ bao phủ trên một phạm vi lớn hơn, khi mà nó tác động tới nhiều khía cạnh trong ngành công việc phát triển phần mềm. Chúng ta có thể sử dụng chúng với classes, functions, modules và trong Go, chúng ta có thể sử dụng với struct.

```go
type EmailService struct {	
        db           *gorm.DB
        smtpHost     string
        smtpPassword string
        smtpPort     int
}
	
func NewEmailService(db *gorm.DB, smtpHost string, smtpPassword string, smtpPort int) *EmailService {
        return &EmailService{
            db:           db,
            smtpHost:     smtpHost,
            smtpPassword: smtpPassword,
            smtpPort:     smtpPort,
        }
}
	
func (s *EmailService) Send(from string, to string, subject string, message string) error {
        email := EmailGorm{
            From:    from,
            To:      to,
            Subject: subject,
            Message: message,
        }

        err := s.db.Create(&email).Error
            if err != nil {
                log.Println(err)
                return err
        }

        auth := smtp.PlainAuth("", from, s.smtpPassword, s.smtpHost)

        server := fmt.Sprintf("%s:%d", s.smtpHost, s.smtpPort)

        err = smtp.SendMail(server, auth, from, []string{to}, []byte(message))
        if err != nil {
            log.Println(err)
            return err
        }

        return nil
}
 ```

Bây giờ chúng ta hãy cùng xem ví dụ ở trên. Chúng ta có một `EmailService` là một `struct` và chỉ có một phương thức là `Send`. Chúng tôi sử dụng *service* này để gửi *email*. Nhìn ở khía cách sự hoạt động, mọi người có thể thấy đoạn code trong ví dụ trên không có vấn đề gì. Tuy nhiên, khi đặt đoạn code trên bên cạnh **SRP** chúng ta có thể thấy nó đang làm nhiều hơn một nhiệm vụ hay nói cách khác nó đã phá vỡ nguyên tắc **SRP**. Nhiệm vụ của `EmailService` không chỉ là gửi *email*, mà nó còn đang lưu trữ thông tin email message xuống **CSDL**. Nếu để ý kỹ hơn một chút, chúng ta sẽ thấy đoạn code trên cũng đã vi phạm nguyên tắc SRP ở cấp độ *function*. Function `Send` thực hiện cùng lúc hai nhiệm vụ, đó là lưu trữ email message xuống **CSDL** và gửi email dựa trên giao thức **SMTP**.

*Chúng ta sẽ phải đối mặt với những vấn đề gì khi làm việc với những đoạn code như trên?*
1. Khi thay đổi cấu trúc bảng hoặc thay đổi CSDL, chúng ta cần phải thay đổi đoạn code thực hiện việc gửi email
2. Khi chúng ta muốn tích hợp với những đơn vị cung cấp dịch vụ gửi email (Mailgun, Mailjet), chúng ta cần phải thay đổi đoạn code liên quan đến lưu trữ message trong CSDL.
3. Đoạn code trên không thể thực hiện unit test.

Bây giờ chúng ta hãy cùng *refactor* lại đoạn code trên để có thể đáp ứng được nguyên tắc **SRP** và giải quyết những vấn đề chúng ta phải đối mặt đã nêu ở trên. Đầu tiên, chúng ta sẽ định nghĩa hai `struct` để thực hiện hai nhiệm vụ riêng biệt, đó là lưu trữ dữ liệu xuống **CSDL** và **Send** email. Chúng ta hãy cùng xem ví dụ bên dưới:

```go
type EmailGorm struct {	
	gorm.Model
	From    string
	To      string
	Subject string
	Message string
  }
	
type EmailRepository interface {
	Save(from string, to string, subject string, message string) error
}
	
type EmailDBRepository struct {
	db *gorm.DB
}
	
func NewEmailRepository(db *gorm.DB) EmailRepository {
	return &EmailDBRepository{
		db: db,
	}
}
	
func (r *EmailDBRepository) Save(from string, to string, subject string, message string) error {
	email := EmailGorm{
		From:    from,
		To:      to,
		Subject: subject,
		Message: message,
	}
	
	err := r.db.Create(&email).Error
	if err != nil {
		log.Println(err)
		return err
	}
	
	return nil
}
	
type EmailSender interface {
	Send(from string, to string, subject string, message string) error
}
	
type EmailSMTPSender struct {
	smtpHost     string
	smtpPassword string
	smtpPort     int
}
	
func NewEmailSender(smtpHost string, smtpPassword string, smtpPort int) EmailSender {
	return &EmailSMTPSender{
      smtpHost:     smtpHost,
      smtpPassword: smtpPassword,
      smtpPort:     smtpPort,
	}
}
	
func (s *EmailSMTPSender) Send(from string, to string, subject string, message string) error {
	auth := smtp.PlainAuth("", from, s.smtpPassword, s.smtpHost)
	
	server := fmt.Sprintf("%s:%d", s.smtpHost, s.smtpPort)
	
	err := smtp.SendMail(server, auth, from, []string{to}, []byte(message))
	if err != nil {
		log.Println(err)
		return err
	}
	
	return nil
}
	
type EmailService struct {
	repository EmailRepository
	sender     EmailSender
}
	
func NewEmailService(repository EmailRepository, sender EmailSender) *EmailService {
	return &EmailService{
      repository: repository,
      sender:     sender,
	}
}
	
func (s *EmailService) Send(from string, to string, subject string, message string) error {
	err := s.repository.Save(from, to, subject, message)
	if err != nil {
		return err
	}
	
	return s.sender.Send(from, to, subject, message)
}
 ```
Chúng ta sẽ có `struct EmailDBRepository` là một triển khai của `EmailRepository interface`, nhiệm vụ của nó sẽ là lưu trữ dữ liệu xuống **CSDL**. Tiếp theo, chúng ta sẽ thấy `struct EmailSMTPSender` là triển khai của `EmailSender interface`, nhiệm vụ của chỉ là gửi email dựa trên giao thức **SMTP**. Cuối cùng chúng ta sẽ thấy một hình hài mới cho `EmailService`, `EmailService` sẽ chứa hai interfaces là `EmailSender` và `EmailRepository`. Đến đây hẳn là nhiều người không khỏi thắc mắc, vậy chẳng phải `EmailService` vẫn thực hiện nhiều hơn một nhiệm vụ đó sao. Nhưng trong trường hợp này, tôi có thể trả lời là **KHÔNG**. `EmailService` không có trách nhiệm là lưu trữ email message vào **CSDL**, và đương nhiên nó cũng ko chịu trách nhiệm gửi email. Nó chịu trách nhiệm uỷ quyền (*delegate*) nhiệm vụ cho các *service* chịu trách nhiệm tương ứng.

Có sự khác biệt giữa việc nắm giữ và uỷ quyền trách nhiệm. Nếu sự điều chỉnh của một mã cụ thể có thể loại bỏ toàn bộ mục đích của trách nhiệm, chúng ta sẽ nói về việc nắm giữ. Nếu trách nhiệm đó vẫn tồn tại ngay cả sau khi xóa một mã cụ thể, thì chúng ta sẽ nói về ủy quyền.

Đến đây, mọi người có thể thấy ngay cả khi chúng ta không không dùng `EmailService`, chúng ta vẫn có thể gửi email dựa trên giao thức **SMTP** hay lưu trữ email xuống **CSDL**. Chính vì thế, chúng ta có thể khẳng định `EmailService` không hề làm 2 nhiệm vụ.

OK. Và giờ chúng ta hãy cùng xem xét ví dụ tiếp theo nhé. Như đã đề cập ở trên, **SRP** không chỉ nhìn nhận ở hướng tiếp cận cho một *struct*, nó có thể phá vỡ nguyên tắc ở cấp độ *function*. Để làm rõ hơn vấn đề này, chúng ta cùng xem ví dụ bên dưới:

```go
func extractUsername(header http.Header) string {
  raw := header.Get("Authorization")
  parser := &jwt.Parser{}
  token, _, err := parser.ParseUnverified(raw, jwt.MapClaims{})
  if err != nil {
  	return ""
  }

  claims, ok := token.Claims.(jwt.MapClaims)
  if !ok {
  	return ""
  }

	return claims["username"].(string)
}
```

Function `extractUsername` nhìn có vẻ ổn. Function này thực hiện lấy token từ *HTTP header* **VÀ** trả về *username* nếu nó tồn tại bên trong `token` đó. Nó đang thực hiện nhiều hơn một nhiệm vụ. Bây giờ chúng ta hãy cùng refactor chính nó là không làm thay đổi mục đích của function này.

```go
import "github.com/dgrijalva/jwt-go"	

func extractUsername(header http.Header) string {
  raw := extractRawToken(header)
  claims := extractClaims(raw)
  if claims == nil {
  	return ""
  }

  return claims["username"].(string)
}

func extractRawToken(header http.Header) string {
	return header.Get("Authorization")
}

func extractClaims(raw string) jwt.MapClaims {
  parser := &jwt.Parser{}
  token, _, err := parser.ParseUnverified(raw, jwt.MapClaims{})
  if err != nil {
  	return nil
  }

  claims, ok := token.Claims.(jwt.MapClaims)
  if !ok {
  	return nil
  }

  return claims
}
```

Bây giờ chúng ta có hai chức năng mới. Đầu tiên, `extractRawToken`, chịu trách nhiệm lấy *JWT* từ *HTTP header*. Nếu tôi thay đổi một `key` trong `HTTP header`, chúng tôi chỉ nên chạm vào một *function*. Cái thứ hai là `extractClaims`, chức năng này chịu trách nhiệm lấy các xác nhận quyền sở hữu từ mã thông báo JWT. Cuối cùng, hàm cũ của tôi `extractUsername` lấy giá trị cụ thể từ các xác nhận quyền sở hữu sau khi ủy quyền các yêu cầu lấy mã thông báo cho các phương pháp cơ bản.

Chúng ta mắc phải những sai lầm trên hằng ngày. Có rất nhiều cạm bẫy dẫn tới những sai lầm đó, có thể vì một cách tiếp cận nào đó chưa đúng, cũng có thể do một số khuôn khổ hoặc thậm chí nó đến từ sự lười biếng đưa ra cách triển khai phù hợp của chính chúng ta. Hãy cùng xem ví dụ bên dưới:

```go
type User struct {
  db *gorm.DB
  Username string
  Firstname string
  Lastname string
  Birthday time.Time
  //
  // some more fields
  //
}
	
func (u User) IsAdult() bool {
	return u.Birthday.AddDate(18, 0, 0).Before(time.Now())
}

func (u *User) Save() error {
	return u.db.Exec("INSERT INTO users ...", u.Username, u.Firstname, u.Lastname, u.Birthday).Error
}
```
Ví dụ trên cho thấy việc triển khai điển hình của mẫu **Active Record**. Trong trường hợp này, chúng tôi cũng đã thêm một logic nghiệp vụ bên trong cấu trúc Người dùng, không chỉ lưu trữ dữ liệu vào cơ sở dữ liệu. 
Ở đây, chúng tôi đã trộn mục đích của mẫu **Active Record** và **Entity** từ *domain-driven-design*. Để phân phối mã đúng cách, chúng ta cần cung cấp các cấu trúc riêng biệt: một cấu trúc dành cho dữ liệu tồn tại trong cơ sở dữ liệu và cấu trúc thứ hai đóng vai trò của **Entity**. Sai lầm tương tự cũng được áp dụng trong ví dụ dưới đây:

```go
type Wallet struct {	
  gorm.Model
  Amount     int `gorm:"column:amount"`
  CurrencyID int `gorm:"column:currency_id"`
}
	
func (w *Wallet) Withdraw(amount int) error {
	if amount > w.Amount {
		return errors.New("there is no enough money in wallet")
	}
	
	w.Amount -= amount
	
	return nil
}
```

Ở đây chúng ta có hai trách nhiệm một lần nữa, nhưng bây giờ, trách nhiệm thứ hai (ánh xạ cho một bảng trong cơ sở dữ liệu, bằng package Gorm) không được thể hiện trực tiếp dưới dạng thuật toán mà là tag **Go**. Ngay cả bây giờ, cấu trúc `Wallet` phá vỡ nguyên tắc **SRP** vì nó đóng nhiều vai trò. Nếu chúng ta thay đổi cấu trúc bảng ở **CSDL**, chúng ta cần điều chỉnh cấu trúc này. Nếu chúng tôi thay đổi các quy tắc để rút tiền, chúng tôi cần điều chỉnh `struct` này.

```go
type Transaction struct {
    gorm.Model
    Amount     int       `gorm:"column:amount" json:"amount" validate:"required"`
    CurrencyID int       `gorm:"column:currency_id" json:"currency_id" validate:"required"`
    Time       time.Time `gorm:"column:time" json:"time" validate:"required"`
}
```

Đoạn mã từ trên là một ví dụ khác về việc phá vỡ **SRP**. Và, theo tôi, đây là một trong những nỗi đau của lập trình viên chúng ta! Tôi không thể cung cấp một cấu trúc nhỏ hơn với nhiều trách nhiệm hơn. Bằng cách xem xét cấu trúc `Transaction`, chúng tôi nhận ra rằng nó ở đó để mô tả ánh xạ tới bảng trong cơ sở dữ liệu và là bộ lưu trữ cho phản hồi *JSON* trong *REST API*, nhưng vì tag `validate`, nó cũng có thể là phần *body* *JSON* cho *API* yêu cầu. Một cấu trúc để dùng cho nhiều mục đích. Chúng là những vấn đề âm thầm sẽ sớm bắt đầu phá vỡ logic của chúng ta.

## Kết luận:
**Single Responsibility Principle** là nguyên tắc đầu tiên từ các nguyên tắc **SOLID**. Nó đại diện cho chữ **S** trong từ **SOLID**. Nó được phát biểu rằng một cấu trúc mã chỉ có một lý do để tồn tại. Tôi xem những lý do đó là trách nhiệm. Một cấu trúc có thể giữ trách nhiệm hoặc ủy quyền cho một cấu trúc khác. Bất cứ khi nào cấu trúc của chúng ta chứa nhiều trách nhiệm, chúng ta nên cấu trúc lại đoạn mã đó.