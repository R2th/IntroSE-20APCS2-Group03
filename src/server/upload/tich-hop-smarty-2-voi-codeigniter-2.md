## Mở đầu
Disclaimer: Bài viết được viết chính chủ trên trang viblo.asia 
Bài viết gốc: https://viblo.asia/p/tich-hop-smarty-2-voi-codeigniter-2-bWrZnaJbKxw

Kể về chuỗi ngày bận rộn, vào một ngày đẹp trời, bạn tự dưng nhận được một offer làm freelance code cho 1 dự án web. Code web thì cũng có biết đấy nhưng khi người thuê bạn làm nói về dự án thì dự án sử dụng 1 loạt các công nghệ cũ :disappointed_relieved::disappointed_relieved:
Dự án là một web thương mại điện tử sử dụng CodeIgniter 2 hay còn gọi là CI 2 đã ngừng hỗ trợ từ lâu, hiện tại thì đã có Codeigniter 4  =))
Ngoài lề 1 chút  với anh em là hiện tại Outsouce phần mềm ở Việt Nam thì 50% các dự án là làm cho Nhật, chủ yếu là gia công phần mềm, web ( ở cái công đoạn mà có được ít lợi nhuận nhất) anh em có thể tham khảo ở tháp dưới đây:

![](https://images.viblo.asia/6c702d1b-b9f5-44e5-92df-9f15d52397c7.PNG)

Cũng hơi chệch một chút với ví dụ về tháp ở bên trên rằng  chữ in ở đằng sau 1 chiếc điện thoại Iphone là `Designed by apple in california assembled in china` thì có thể thấy rõ thằng Mỹ nó khôn lỏi như thế nào. Nó chỉ làm công đoạn thiết kế... những công đoạn bên trên đầu tháp, kiếm được nhiều lợi nhuận thôi,  còn công đoạn được ít lợi nhuận nhất thì nó cho Trung Quốc làm, ( cũng vì 1 số chính sách về thuế của thằng Mỹ, nên nó làm thế này để giảm thuế nữa). Nhật Bản với Việt Nam cũng tương tự vậy, phần thiết kế (cũng bên nhật làm?), còn đội Việt Nam sẽ code. 

Thôi chẳng lan man nghĩ về những thứ vĩ mô nữa, quay lại với công việc code nào =))
Bên Nhật lại khá thích CodeIgniter kết hợp với Smarty nên ae có thể xem qua bài của mình biết đâu một ngày ae lại phải làm sửa một dự án dùng công nghệ cũ như thế . 
Và công việc của mình đơn giản chỉ là chuyển cái view sử dụng php thuần của CodeIgniter sang View sử dụng template Smarty thôi. ( Nghĩ đơn giản, mà là sinh viên dạo này phải mất nhiều tiền tiêu quá nên mình nhận lời ngay)

## 1. Tại sao lại là CodeIgniter và Smarty
CodeIgniter là một framework php  rất nhẹ, khi đem so sánh nó với các framwork php khác với chương trình Helloworld thì tốc độ là nhanh nhất. Đúng là framwork càng hỗ trợ ít chức năng, càng nhẹ, thì càng nhanh =)). Cái này mình cũng chưa chắc nha, tuy nhiên mọi so sánh đều là khập khiễng khi chỉ so sánh dựa trên chương trình Helloworld, nhanh hay chậm còn phụ thuộc vào code của người viết như thế nào nữa?? Và hệ thống thư viện của CodeIgniter 2 còn nhiều hạn chế, nghĩa rằng khi ae muốn code một chức năng không phổ biến thì ae sẽ phải tự viết ra mà không có thư viện mà gọi. Nếu tự tin với code của mình chạy ngon hơn code của mấy ông viết ra thư viện của các framwork khác thì ae hoàn toàn có thể ...... sang thung lũng Silicon làm việc nhé ;) 

Trở lại với lý do tại sao lại dùng CodeIgniter kết hợp với Smarty thì ở đây lý do chính chính là tốc độ và độ dễ khi bảo trì.  Hơn nữa
- View của CodeIgniter 2 không được hỗ trợ nhiều, nên đôi khi sẽ gặp khó khăn khi muốn customize theo ý mình muốn. 
Hiện nay thì ae có xu hướng sử dụng Framework được hỗ trợ đến tận răng như Laravel đã tích hợp sẵn template Blade hoặc thậm chí sử dụng hẳn 1 framework frontend như Angular , Vue hay thư viện React  thì  CodeIgniter + Smarty đã từng được mệnh danh là cặp đôi hoàn hảo khi kết hợp với nhau khi các bác sử dụng framework nhẹ như CodeIgniter.
Các bác có thể tham khảo code dưới đây sẽ thấy code khi dùng smarty code sẽ trông "mượt" hơn nhiều. 
Chẳng hạn ta có muốn hiển thị 1 biến `$data` sang view thì:
PHP thuần:
```
<?php echo $data ?>
```
Smarty:
```
{ $data }
```

## 2. Tích hợp Smarty 2 vào CodeIgniter 2
Tích hợp vào CodeIgniter 2 thì ta sử dụng Smarty 2 thôi nhé, Smarty 3 không chạy được, và hiện tại Smarty 2 chỉ hỗ trợ đến PHP 7.2 nên ae nào dùng phiên bản cao hơn có thể bị lỗi nhé.
Còn ở Smarty 3 được viết lại hoàn toàn bằng PHP 5 trở lên nên cũng không dùng được PHP 4 nhé.
Đôi khi có những lỗi ngu không chịu được chỉ vì lỗi xung đột phiên bản mà cả ngày chả biết nguyên nhân sao nó không chạy @@

Để tích hợp Smarty 2 vào CodeIgniter 2 anh em tải Smarty 2 và CodeIgniter 2 về nhé. Sau đó giải nén 2 file zip đó ra rồi đưa thư mục Smarty-version vào trong thư mục `application/third_party` và đổi tên nó thành Smarty thôi cho tiện. 

Tiếp theo anh em vào application/libraries tạo mới 1 file đặt tên là Smarty.php và copy code dưới đây vào:
```
<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
// dẫn đúng vào đường dẫn file Smarty.class.php
require_once( APPPATH.'third_party/smarty/libs/Smarty.class.php');

class CI_Smarty extends Smarty {
	
    public function __construct()
    {
        parent::__construct();
        // Config đường dẫn
        $this->compile_dir = APPPATH . "views/templates_c";
        $this->template_dir = APPPATH . "views/templates";
        $this->config_dir = APPPATH . "views/config";
        $this->cache_dir = APPPATH . "cache";
        $this->assign( 'APPPATH', APPPATH );
        $this->assign( 'BASEPATH', BASEPATH );

        // Assign đối tượng CodeIgniter
        if ( method_exists( $this, 'assignByRef') )
        {
            $ci =& get_instance();
            $this->assignByRef("ci", $ci);
        }

        log_message('debug', "Smarty Class Initialized");
    }
   // Tạo 1 function view hoạt động giống như function view của CI_Controller
    function view($template, $data = array(), $return = FALSE)
    {
        foreach ($data as $key => $val)
        {
            $this->assign($key, $val);
        }

        if ($return == FALSE)
        {
            $CI =& get_instance();
            if (method_exists( $CI->output, 'set_output' ))
            {
                $CI->output->set_output( $this->fetch($template) );
            }
            else
            {
                $CI->output->final_output = $this->fetch($template);
            }
            return;
        }
        else
        {
            return $this->fetch($template);
        }
    }
  // Tạo 1 function gọi khi muốn sử dụng cache
    public function enable_caching()
    {
        $this->caching = 1;
    }
// Tạo 1 function gọi khi NGƯNG sử dụng cache
    public function disable_caching()
    {
        $this->caching = 0;
    }
}

```

Đây là cách tích hợp Smarty thông qua việc sử dụng Smarty như một thư viện custom mà ta tự viết thêm vào CodeIgniter, các bác có thể xem thêm cách viết 1 thư viện cho CodeIgniter qua đây:
https://www.codeigniter.com/userguide2/general/creating_libraries.html

Ở trên code bên trên ta thấy:
```
$this->compile_dir = APPPATH . "views/templates_c";
$this->template_dir = APPPATH . "views/templates";
```
Qua cơ chế hoạt động của Smarty thì Smarty được viết bằng PHP để tự tạo ra bộ quy tắc viết code riêng hay ae có thể gọi là ngôn ngữ của Smarty. Và cơ chế hoạt động của nó sẽ là
> Bạn viết code smarty và rồi khi chạy, như cơ chế của một trình biên dịch nó sẽ dịch code smarty đó sang thành code PHP để chạy.

Anh em thấy ở đây có 2 đường dẫn `$this->template_dir = APPPATH . "views/templates";` là nơi bạn viết view sử du code Smarty.
Còn `$this->compile_dir = APPPATH . "views/templates_c";` là đường dẫn dẫn đến thư mục mà code smarty đã được chuyển đổi sang PHP ở đó. `APPPATH = application/` nên:

```
APPPATH . "views/templates_c" = application/views/templates_c
```
anh em nhé. Code ở đây ae cũng  không cần quan tâm luôn =)).

Tiếp đến anh em tạo 2 folder giống như đường dẫn mình vừa config là `application/views/templates` và `application/views/templates_c` 

Chuyển qua `application/config/autoload.php`  thêm autoload cho thư viện smarty. Như vậy khi config xong, mỗi request được gọi thì thư viện Smarty của ta cũng sẽ được load.
```
$autoload['libraries'] = array('smarty');
```

Như vậy là ta đã hoàn thành xong việc tích hợp Smarty 2 vào CodeIgniter 2 và thử chạy xem nhé.

## 3. Thử chạy
Tạo một controller đặt tên là Test.php trong thư mục application/controllers 
```
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Test extends CI_Controller {

	public function abc() {
				
		$data = [
			'numbers' => array(1,2,3),
			'name' => APPPATH,
		];
		
		$this->smarty->view('abc_view.tpl',$data);

	}
  }
```
Rồi config route `application/config/routes.php` 
```
$route['test_smarty'] = "test/abc";
```

Trong forder application/views/templates vừa tạo, tạo 1 file `abc_view.tpl` 
```
{ $numbers }
{ $name }
```
Và hưởng thụ thành quả :))

Bài này viết chắc ae cũng ít quan tâm nhưng biết đâu sau này dính phải dự án có công nghệ tương tự thì ở đây có bài của mình nhé. Ae nào cần thêm bài về cách sử dụng smarty thì có thể comment dưới bài này rồi mình sẽ viết một bài hướng dẫn sau hoặc có thể hỏi bất cứ thứ gì nhé =))