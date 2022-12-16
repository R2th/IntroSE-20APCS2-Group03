# Mở đầu
Chắc hẳn trong chúng ta ai cũng đã từng sử dụng những dịch vụ rút gọn link để phục vụ công việc rồi nhỉ. Ngày xưa mình hay sử dụng chúng để phục vụ trong việc tiếp thị cũng như đặt thuê hàng hóa trên các trang thương mại điện tử. Vậy thì những trang web ấy hoạt động ra sao, thiết kế ra sao thì có ai đã từng nghĩ. Qua bài viết này mình sẽ mô phỏng cách hoạt động của nó, tất nhiên để hệ thống có thể hoạt động tốt với lượng truy cập lớn thì sẽ cần rất nhiều yếu tố khác nữa.
# Xây dựng hệ thống
## Khởi tạo dự án và các thứ cần thiết
Khởi tạo một dự án mới
```
rails new short-link-basic
```
Chạy scaffold
```
rails g scaffold link origin_url:string shorted_code:string
```
Trong đó, origin_url là link gốc mà người dùng muốn rút gọn và shorted_code là code dùng để xác định origin_url tương ứng.

Ở view _form.html.erb dùng mỗi origin_url là đủ
```
rails db:migrate
```
## Coding
Ở bước này mình sẽ chia làm 2 giai đoạn:

Link rút gọn sẽ có dạng: http://localhost:3000/6b8b3e, trong đó 6b8b3e là shorted_code(duy nhất trong hệ thống)

**Giai đoạn 1**: Tạo link rút gọn

![](https://images.viblo.asia/95746241-7679-4a78-ab87-89335337a1e8.png)
Giao diện sẽ yêu cầu nhập link cần được rút gọn

Ở links_controller.rb
```
  def create
    @link = Link.new(link_params.merge(shorted_code: generate_shorted_code))

    respond_to do |format|
      if @link.save
        format.html { redirect_to @link, notice: "Link was successfully created." }
        format.json { render :show, status: :created, location: @link }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @link.errors, status: :unprocessable_entity }
      end
    end
  end
```
private func
```
  def generate_shorted_code
    shorted_code = SecureRandom.hex(3)
    generate_shorted_code if Link.where(shorted_code: shorted_code).exists?
    shorted_code
  end
```
generate_shorted_code với code duy nhất, mình không xử lý trùng original_link

**Giai đoạn 2**: Chạy link rút gọn

Tại routes.rb
```
get "/:shorted_code", to: "links#redirect", as: :short
```
Ở links_controller.rb
```
  def redirect
    if get_origin_link
      redirect_to URI(get_origin_link.origin_url).to_s
    else
      redirect_to root_url
    end
  end
```
private func
```
  def get_origin_link
    @get_origin_link = Link.find_by shorted_code: params[:shorted_code]
  end
```
Mình thực hiện find với shorted_code, có thì sẽ redicrect tới link gốc, ngược lại cho về root url.

## Chạy thử
Rất nhanh chóng, chúng ta đã xây dựng được 1 ứng dụng rút gọn link đơn giản.

Sau đây là gif mình chạy demo :v: 
Do file có dung lượng khá lớn nên mình upload 1 bên thứ 3, các bạn [click vào link](https://im.ge/i/0IKor) để xem
# Kết
Source đã demo trong bài viết: [Link github](https://github.com/loctx-2273/short-link-basic)

Trên đây là mô phỏng nho nhỏ cho 1 hệ thống rút gọn link đơn giản. Tất nhiên trong quá trình viết sẽ không tránh khỏi những thiếu sót về hình thức cũng như nội dung, mong bạn đọc góp ý để mình hoàn thiện hơn cho bạn đọc sau.

Cám ơn đã dành thời gian đọc bài chia sẻ của mình :space_invader::space_invader::space_invader: