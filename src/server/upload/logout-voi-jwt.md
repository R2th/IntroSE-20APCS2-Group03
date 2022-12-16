### Cập nhật ngày 9/6/2022
- Sau những năm làm việc với nhiều dự án, mình đã có thêm 1 cách tốt hơn là lưu token này trong REDIS và set expire của nó bằng với thời gian hết hạn của JWT
- khi xác thực token thì sẽ kiểm tra thêm là token này có tồn tại trong REDIS không, nếu có thì không cho thực hiện và khi JWT hết hạn cũng là lúc token trên REDIS cũng được xóa
- Tùy theo mọi người đánh giá về sự cần thiết của nó trong dự án và dự án có dùng REDIS hoặc tương tự REDIS thì có thể suy nghĩ tới cách này
- **Lưu ý**: Không áp dụng lưu REDIS cho những trường hợp như hay reset server, redis hoặc khi thay đổi mật khẩu thì phải logout hết các device, ...

### I. Mở đầu
- JWT hay còn gọi là JSON Web Token là một package hỗ trợ ta trong việc tạo các token trong nhiều trường hợp như authen, gửi data ẩn, ...
- Hầu hết sẽ được dùng trong authentication, vì vậy mình cũng không giới thiệu nhiều về nó
- Sau đây mình xin chia sẻ việc logout bên phía server
- Thường mọi người đều nói jwt không hỗ trợ logout mà bên phía client lưu token trong localStorage nên để client xử lý xóa nó ra khỏi localStorage thì cũng giống như đã logout
- Đúng, nhưng đó là về lý thuyết, nhưng bạn hãy suy nghĩ nếu đoạn token đó được người khác copy, user biết nên họ muốn logout để không bị xử dụng bậy bạ bởi người khác, thì việc xử lý mỗi client đã là đủ hay chưa
- Bạn có thể nói nó là hi hữu, nhưng không có nghĩa là không có
- Vì vậy sau đây mình chia sẻ với mọi người một cách xử lý việc logout bên phía server khi sử dụng jwt

### II. Tạo bảng trong db
- Muốn quản lý việc logout thì chỉ có cách là tạo bảng để lưu trữ :v
- Ở đây thì có 2 cách để lưu trữ là lưu những token hết hạn hoặc là lưu những token còn hạn
- Mình thì thấy việc lưu token còn hạn nó sẽ tốt hơn so với hết hạn vì nó dễ quản lý hơn, nhất là những token rác
- Cấu trúc cơ bản của bảng token sẽ như sau (tùy ngữ cảnh mọi người tự design)

| name | type |
| -------- | -------- |
| id |big int |
| account_id |big int |
| token |varchar |
| created | timestamp |

### III. Login
- Khi có db thì tất nhiên phải có record
- Vậy khi nào tạo record, đó là lúc đăng nhập
- Khi đăng nhập thành công, ta sẽ tạo ra 1 jwt để trả về, cũng như lưu jwt này xuống db
- mình sẽ sử dụng typeorm, nestjs, typescript, để ví dụ:
```
async login(
  requestLoginLogoutDTO: RequestLoginLogoutDTO, // RequestLoginLogoutDTO ở đây có cấu trúc là username và password
): Promise<AccountDTO> {
  let account: AccountEntity;
  let token: string;
  // transaction trong sql chắc mình cũng không cần nói thêm
  await this.connection.transaction(async (manager: EntityManager) => {
    // mình sẽ tìm trong trong db với username và password được cấp
    account = await manager.createQueryBuilder(AccountEntity, 'AccountEntity')
    .where(
      'AccountEntity.username = :username AND AccountEntity.password = :password',
      requestLoginLogoutDTO,
    )
    .getOne();
    if (!account) throw new UnauthorizedException(); // Nếu không tồn tại thì sẽ báo lỗi
    // ok rồi thì tạo token
    token = jwtSign({
      id: account.id,
      username: requestLoginLogoutDTO.username,
    });
    // lưu token vào bảng token
    const authToken = manager.create(AuthTokenEntity, { account, token });
    await manager.save(authToken);
  });

   // trả về phía client account và token;
   return { ...account, authentization: token };
}
```

### IV. Logout
- Đã có login thì phải có logout
- Tất nhiên phần logout này ta sẽ xóa đi những record được lưu
```
async logout(
  token: string | string[], // token có thể truyền 1 hoặc nhiều, chút nữa mình sẽ nói ở những phần sau
) {
  // tìm record token dựa theo token được gửi lên
  const authToken = await this.authTokenRepo
    .createQueryBuilder()
    .innerJoinAndSelect(
      'AuthTokenEntity.account',
      'AccountEntity',
      'AccountEntity.deleted IS NULL',
    )
    .where(
      'AuthTokenEntity.token = :token',
      { token },
    )
    .getOne();

  if (!authToken) { throw UnauthorizedException; } // không tồn tại báo lỗi
  await this.authTokenRepo.delete(authToken.id); // xóa token
  
  return true;
}
```

### V. Kiểm tra token hợp lệ và có logout hay không
- Với mỗi framwork sẽ có 1 hoặc nhiều để kiểm tra gì đấy trước khi vào các function chính để thực hiện
- Với nestjs, ta có đó là guard, mọi người có thể đọc [ở đây](https://docs.nestjs.com/guards)
```
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly accountService: AccountService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const { headers } = http.getRequest();
    const response = http.getResponse();
    response.setHeader('Cache-Control', 'no-store');
    let data: any;
    try {
      data = jwtVerify(headers.authentization).data; // kiểm tra token có được gửi lên hay không
    } catch (error) {
      throw new UnauthorizedException();
    }
    const account = await this.accountService.findOne(data.id); // tìm kiếm account
    const authTokens = account.authTokens.map(authToken => authToken.token); // lấy ra token dựa theo quan hệ 1 - n giữa account và token
    
    // kiểm tra account tồn tại, và token đó có trong account
    if (account && authTokens.includes(headers.authentization)) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
```
- Tới đây có thể mọi người sẽ nghĩ là, ok đã xong
- Nhưng với mình thì nó chưa, vì nó sẽ còn những token rác, nếu người dùng lâu ngày không đăng nhập, lúc đăng nhập lại thì họ sẽ dựa vào refresh token để có lại token mới hoặc đăng nhập lại để có
- Như vậy những token cũ sẽ thành rác

### VI. Xử lý token rác
- Ta sẽ tổng cộng 3 chỗ cần xử lý
- Thứ nhất: đó là đối với khi client gửi lên refreshToken thì cũng giống như logout ta sẽ tìm kiếm và xóa nó đi, còn bạn hỏi refreshToken ở đâu vì jwt không hỗ trợ thì mình thấy hướng dẫn đầy trên mạng ấy mà, search chút là ra nơi á :v 
- Thứ hai: chỗ check lỗi khi mà jwt hết hạn (khi hết hạn jwt sẽ có báo lỗi nha), việc của mình là chỉ cần bắt nó expire thì xóa đi
```
// bên nestjs có hỗ trợ để bắt exception và custom theo ý mình, được gọi là những filter
@Catch()
export class InternalServerExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    // dựa theo name exception mình sẽ chia ra các case để xử lý
    switch (exception.name) {
      case 'UnauthorizedException':
        return response.status(HttpStatus.UNAUTHORIZED).json(ErrorMessageConstant.unauthorized);
      case 'TokenExpiredError': // case này để check expire token
        // tìm token
        const authToken = await getRepository(AuthTokenEntity)
          .createQueryBuilder()
          .where(
            'AuthTokenEntity.token = :token',
            { token: ctx.getRequest().headers.authentization },
          )
          .getOne();
        if (authToken) {
          await getRepository(AuthTokenEntity).delete(authToken.id); // tồn tại thì xóa
        }
        return response.status(HttpStatus.UNAUTHORIZED).json(ErrorMessageConstant.unauthorized); // gửi lại lỗi hoặc có thể xử lý refresh token
      default:
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          errors: ErrorMessageConstant.internalServer,
        });
    }
  }
}
```

- Thứ ba: 2 case trên chỉ là khi có sự tương tác tới app hoặc api thì ta mới có dữ liệu để check, nhưng nếu nó không có tương tác thì sao. Vậy ta phải tạo 1 cái batch job để sử lý token rác
    - Tùy theo thời gian hẹn để chạy batch job (1 ngày , 1 tuần, 1 tháng, ...), ta sẽ get những api có thời gian tạo (created) là từ hiện tại trừ đi khoảng thời gian token (ví dụ 2 ngày) trở về trước
    - ví dụ: hiện tại là ngày 22/9 vậy trước 2 ngày là 20/9 trở về trước (19/9, 18/9, ...)
    - khi đã có những token này thì ta xóa đi là ok
- Xong như vậy là ta đã xóa hết những record rác

### VII. Kết
- Có thể sẽ có những bạn thấy làm chuyện này là dư thừa
- Nhưng với một người có cơ hội được làm từ phía BE lẫn FE như mình, thì mình thấy nó là điều bắt buộc
- Luôn có những công cụ để có thể cheat nếu chúng ta chủ quan
- Nên mình chia sẻ bài viết này, để mong rằng mọi người sẽ có thêm nhận thức rằng, những phần về authen thì ta nên xử lý ở phía server, client chỉ nên là nơi tương tác