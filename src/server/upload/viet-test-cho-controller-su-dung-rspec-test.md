Đối với những developer sử dụng ngôn ngữ ruby và frameWork RubyOnRails, chúng ta đã khá quen thuộc với công việc test cùng với gem Rspec.
Chúng ta phải viết unit test cho model, các method, controller,....nói chung là tất tần tật nhưng gì chúng ta code.
Trong đó, việc controller là một phần luôn luôn phải được viết test, mà việc test controller không mấy dễ dàng với newbie.
Bài viết này, tôi xin phép được chia sẻ sơ lược về cách viết rspec cho controller một cách hiệu quả.
## Unauthenticated controller specs
**Chúng ta sẽ bắt đầu với một controller của một app đơn giản. HomeController có công việc: Tải hom page cho người dùng khi họ chưa đăng nhập**

app/controllers/home_controller.rb

```
class HomeController < ApplicationController
	
  skip_before_action :authenticate_user!
   
  def index
  end
end
```

Để tạo file test cho controller này, chúng ta sẽ sử dụng công cụ generator được tạo bở rspec

`bin/rails g rspec:controller home`

Câu lênh sẽ tạo 1 file rspec ở trong đường dẫn: spec/controllers/home_controller_spec.rb và có nội dung khởi điểm như sau:
```

require	'rails_helper'
	
RSpec.describe	HomeController,	type:	:controller	do	

end
```

Tiếp theo, chúng ta tạo một block describe  cho method index bên trong khối RSpec.describe. ta sẽ thực hiện việc request đến controller và kì vọng một response successfully.

```
require	'rails_helper'
	
 RSpec.describe	HomeController,	type:	:controller	do
	describe "#index" do
		it "responds successfully" do
			get	:index
			expect(response).to	be_success
		end
	end
end
```

response là object chứa tất cả dữ liệu mà server trả về chon browser, bao gôm cả mã responsecode. Câu lệnh `be_success` sẽ kiểm tra sem response status của gói tin có phải là successful (200) hoặc không (ví dụ 404, 500..)
Chạy thử chút xem sao nhỉ!

`rspec spec/controllers`

```
Running	via	Spring	preloader	in	process	44906
HomeController
 #index
	responds successfully
Finished in	0.01775	seconds	(files took 0.3492 seconds to load)
1 example, 0 failures
```

Việc test này có vẻ nhàm chán ? Công việc của controller thực tế là như vậy. Chúng ta phải gửi một params từ brower, xử nó với các Ruby object,  rồi respond về browser. Chúng ta thử đi ngược bài test xem có gì xảy ra nào! Thay vì kì vọng be_success, chúng ta hãy kì vọng ngược lại:

```
require	'rails_helper'

RSpec.describe	HomeController,	type:	:controller	do
    describe "#index" do
         it "responds successfully"	do
              get	:index
              expect(response).to_not	be_success
          end
     end
end
```

Sure là có lỗi ngay:

```
Failures:
1)	HomeController#index	responds	successfully
	Failure/Error:	expect(response).to_not	be_success
			expected	`#<ActionDispatch::TestResponse:0x007f9b16cdd350
			@mon_owner=nil,	@mon_count=0,
			@mon_mutex=#<Thread::Mu...:Headers:0x007f9b16cc7230
			@req=#<ActionController::TestRequest:0x007f9b16cdd508	...>>,
			@variant=[]>>.success?`	to	return	false,	got	true
```
be_succes chỉ kiểm tra xem status trả về có successful không. Nếu ta muốn kiểm tra cụ thể là mã HTTp response là 200 hay không thì ta có thể sử dụng cú pháp như sau:

```
it	"returns a 200	response" do
   get	:index
   expect(response).to	have_http_status "200"
end
```
Vẫn có vẻ nhàm chán nhỉ :v. Tuy nhiên, vẫn  có một số thứ thú vị ở đây. Hãy nhìn vào controller lần nữa, chúng ta có một dòng skip_before_action để vô hiệu hóa việc xác thực người dùng, thử comment lại dòng này và chạy test nhé!

```
Failures:
	1)	HomeController	returns	a	200	response
		Failure/Error:	get	:index									
        Devise::MissingWarden:
            Devise	could	not	find the `Warden::Proxy` instance on your
            request	environment.
            Make	sure	that your application	is	loading	Devise	and	Warden
            as	expected	and	that	the	`Warden::Manager`	middleware	is
            present	in	your	middleware	stack.
            If	you	are	seeing	this	on	one	of	your	tests,	ensure	that	your
            tests	are	either	executing	the	Rails	middleware	stack	or	that
            your	tests	are	using	the	`Devise::Test::ControllerHelpers`
            module	to	inject	the	`request.env['warden']`	object	fo
```

Thú vị phải không =)))) BÀi tesst trả về một lỗi thông báo rằng thiếu Devise helpers trong bài test. Điều đó có nghĩa là dòng skip_before_action trong controller đang hoạt động. Chúng ta sẽ xem xét việc add thêm helper để xử lí vấn đề này sau. bây giờ hãy uncomment lại dòng code để hồi phục controller như cũ.

## Authenticated controller specs

Trong phần này, chúng ta sẽ giải quyết trường hợp controller có sử dụng authenticated.
```
class ProjectsController < ApplicationController
   
  def index
  end
end
```

Chúng ta tiếp tục create một file rspec test giống như trên với bài test status code:

`rails g rspec:controller projects`

```
1 require	'rails_helper'
2	
3	RSpec.describe	ProjectsController,	type:	:controller	do
4			describe	"#index"	do
5					it	"responds	successfully"	do
6							get	:index
7							expect(response).to	be_success
8					end
9	
10					it	"returns	a	200	response"	do
11							get	:index
12							expect(response).to	have_http_status	"200"
13					end
14			end
15	end
```

Chạy rspec chúng ta có thể thấy lỗi báo thiếu Devise helpers giống ví dụ trên. Cách giải quyết là thêm dòng sau vào file spec/rails_helper.rb

```
1	RSpec.configure	do	|config|
2			#	Other	stuff	from	the	config	block	omitted	...
3	
4			#	Use	Devise	test	helpers	in	controller	specs
5			config.include	Devise::Test::ControllerHelpers,	type:	:controller
6	end
```

Chạy rspec tiếp tục vẫn lỗi?????!!!!!!, nhưng chúng ta có một lỗi khác. Ở bài test,chúng ta kì vọng status code là 200, nhưng thực tế lại trả về 302. Vấn đề ở đây là  action index yêu cầu user phải đăng nhập, nhưng chúng ta không có làm điều đó trong bài test.

Bây giờ, chung ta cần tạo rá một user ảo, sau đó dùng user này để đăng nhập. Ta sẽ create user trong một khối `before` block, và sưr dụng method `sign_in` để đăng nhập:

```
1	require	'rails_helper'
2	
3	RSpec.describe	ProjectsController,	type:	:controller	do
4			describe	"#index"	do
5					before	do
6							@user	=	FactoryGirl.create(:user)
7					end
8	
9					it	"responds	successfully"	do
10							sign_in	@user
11							get	:index
12							expect(response).to	be_success
13					end
14	
15					it	"returns	a	200	response"	do
16							sign_in	@user
17							get	:index
18							expect(response).to	have_http_status	"200"
19					end
20			end
21	end
```

Giờ chạy rspec toàn màu xanh rồi nhỉ ==))))))

Bản chất của việc viết test là chúng ta cần cover hết tất cả các trường hợp có thể xảy ra, nếu không, bài test là vô nghĩa.
Ở đây, chúng ta đã test trường hợp người dùng đã đăng nhập. Giờ ta cần test trường hợp người dùng khách (không đăng nhập)
Ta sẽ đặt phần test bên trên vào một `context` block và viết phần test mới vào một `context` khác.

```
1	require	'rails_helper'
2	
3	RSpec.describe	ProjectsController,	type:	:controller	do
4			describe	"#index"	do
5					context	"as	an	authenticated	user"	do
6							before	do
7									@user	=	FactoryGirl.create(:user)
8							end
9	
10							it	"responds	successfully"	do
11									sign_in	@user
12									get	:index
13									expect(response).to	be_success
14							end
15	
16							it	"returns	a	200	response"	do
17									sign_in	@user18									get	:index
19									expect(response).to	have_http_status	"200"
20							end
21					end
22	
23					context	"as	a	guest"	do
24							#	tests	will	go	here
25					end
26			end
27	end
```

Giờ ta đang có 2 context nằm trong một describe cho action `index`. context đầu tiên test cho trường người dùng đã đăng nhập. Phần `before` block dùng để tạo user đã nằm ngoài context "as a guest".

```
1	context	"as	a	guest"	do
2			it	"returns	a	302	response"	do
3					get	:index
4					expect(response).to	have_http_status	"302"
5			end
6	
7			it	"redirects	to	the	sign-in	page"	do
8					get	:index
9					expect(response).to	redirect_to	"/users/sign_in"
10			end
11	end
```
Bài test trên kì vọng trong trường hợp user không đăng nhập sẽ trả về status 302 và redirect trình duyệt về trang 'user/sign_in'

Công việc tiếp theo tuơng tự chúng ta sẽ lần lượt test các method trong controller như: create, show, update, delete, edit,.....theo mindset như trên.
Hi vọng mọi người đã nắm được bước đầu tiên trong việc viết test và yêu thích nó. Chúc các bạn may mắn !!