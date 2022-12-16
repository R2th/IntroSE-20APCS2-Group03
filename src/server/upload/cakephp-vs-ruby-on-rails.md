Phải vừa làm CakePHP vừa học Ruby on Rails ngốn rất rất nhiều thời gian của mình. Tất nhiên là khi nhìn vào cấu trúc thư mục của 2 framework mình thấy có 1 sự tương đồng không hề nhẹ. Thế nên vừa làm thằng này vừa làm thằng nọ cũng đc 1 tháng, mình cũng đã phải đưa ra 1 số ý kiến so sánh giữa 2 framework. Tóm tắt lại thì cảm giác CakePHP nó cứ như thế này:

{@embed: https://youtu.be/EnnpbVW7Yb8}

Sau đây là các lý do cụ thể:
# Cài đặt 
Đây là mặt mà 2 bên mỗi bên có điểm mạnh và điểm yếu riêng theo như trường hợp của mình.
- Trên Windows thì cài CakePHP chạy được, nhưng các họ hàng của Unix liên tục báo thiếu `intl`.
- Còn cài Rails trên Windows bị sao thì có nhiều case đi trước rồi, và các họ hàng Unix thì chào đón Rails rất rất nồng nhiệt.
Mặc dù trông có vẻ ngang nhau nhưng bản thân CakePHP lại yêu cầu nhiều extension hơn Rails và cứ yêu cầu cần Apache, đổi nginx không chịu chạy. Rails thì chỉ cần gõ lệnh là chạy. Và sau 1 hồi loay hoay cài cắm CakePHP mình phải tìm hiểu Docker để chiến. Mà có Docker xong cũng vẫn mệt(bài [cũ](https://viblo.asia/p/long-ngong-voi-cakephp-tren-moi-truong-docker-maGK7DpOZj2)). Thế quái nào cách tối ưu lại ko phải chạy composer mà là download cục zip từ github về rồi chạy composer? Hôm qua tạm xài lại win để code thì trời ơi, chỉ là `git clone` rồi `composer install` thôi mà giao diện hiện ra hiện như Thanos búng tay vậy :'( Docker ơi cứu cháu

Nói có sách mách có chứng, đây là hình ảnh

![](https://images.viblo.asia/5ab4352d-ad44-4f16-a235-b8a636e0a0e5.jpg)

Clone project rồi chạy trên windows

![](https://images.viblo.asia/1856e8d9-6f7c-443f-977a-bfa11f62f17f.png)

Còn đây là chạy trên MacOS

Ngoài ra theo như **1 bác nói trên stackoverflow, đã có lúc 1 nửa cái app của bác ấy trống không do bộ nhớ chặn sử dụng quá nhiều component.**
# Cấu trúc thư mục
![](https://images.viblo.asia/0347f2ff-09dc-4582-be53-2bf07ba81f8d.png)

Về cấu trúc thư mục thì 2 bên không khác gì nhau. Thậm chí mọi người cứ bảo Laravel và Rails giống nhau nhưng thực chất Rails và CakePHP mới đúng gọi là giống nhau.

À nhưng hãy xem 1 controller mặc định được gen ra bằng lệnh ra sao:
- Với CakePHP:
```php
<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Speeches Controller
 *
 * @property \App\Model\Table\SpeechesTable $Speeches
 *
 * @method \App\Model\Entity\Speech[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class SpeechesController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $speeches = $this->paginate($this->Speeches);

        $this->set(compact('speeches'));
    }

    /**
     * View method
     *
     * @param string|null $id Speech id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $speech = $this->Speeches->get($id, [
            'contain' => ['Tags']
        ]);

        $this->set('speech', $speech);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $speech = $this->Speeches->newEntity();
        if ($this->request->is('post')) {
            $speech = $this->Speeches->patchEntity($speech, $this->request->getData());
            if ($this->Speeches->save($speech)) {
                $this->Flash->success(__('The speech has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The speech could not be saved. Please, try again.'));
        }
        $tags = $this->Speeches->Tags->find('list', ['limit' => 200]);
        $this->set(compact('speech', 'tags'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Speech id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $speech = $this->Speeches->get($id, [
            'contain' => ['Tags']
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $speech = $this->Speeches->patchEntity($speech, $this->request->getData());
            if ($this->Speeches->save($speech)) {
                $this->Flash->success(__('The speech has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The speech could not be saved. Please, try again.'));
        }
        $tags = $this->Speeches->Tags->find('list', ['limit' => 200]);
        $this->set(compact('speech', 'tags'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Speech id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $speech = $this->Speeches->get($id);
        if ($this->Speeches->delete($speech)) {
            $this->Flash->success(__('The speech has been deleted.'));
        } else {
            $this->Flash->error(__('The speech could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
```
- Với Rails:
```ruby
class SongsController < ApplicationController
  # include Songs
  before_action :set_song, only: [:show, :edit, :update, :destroy]

  # GET /songs
  # GET /songs.json
  def index
    @songs = Song.all
  end

  # GET /songs/1
  # GET /songs/1.json
  def show
  end

  # GET /songs/new
  def new
    @song = Song.new
  end

  # GET /songs/1/edit
  def edit
  end

  # POST /songs
  # POST /songs.json
  def create
    @song = Song.new(song_params)

    respond_to do |format|
      if @song.save
        format.html { redirect_to @song, notice: 'Song was successfully created.' }
        format.json { render :show, status: :created, location: @song }
      else
        format.html { render :new }
        format.json { render json: @song.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /songs/1
  # PATCH/PUT /songs/1.json
  def update
    respond_to do |format|
      if @song.update(song_params)
        format.html { redirect_to @song, notice: 'Song was successfully updated.' }
        format.json { render :show, status: :ok, location: @song }
      else
        format.html { render :edit }
        format.json { render json: @song.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /songs/1
  # DELETE /songs/1.json
  def destroy
    @song.destroy
    respond_to do |format|
      format.html { redirect_to songs_url, notice: 'Song was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_song
      @song = Song.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def song_params
      params.require(:song).permit(:name, :lyric)
    end
end
```
Dù là mình đang quen với PHP nhưng nhìn đống chỉ trỏ lằng ngoằng của CakePHP bên trên mình phát sợ luôn. Và việc mỗi component của CakePHP ăn hàng **megabytes** của bộ nhớ với chỗ code này cũng không có gì là lại cả
# So sánh các câu lệnh
Rails có  
```bash
bin/rails server
```
CakePHP cũng 
 ```bash
 bin/cake server
 ```
 Nhưng mà Rails cũng `rails s` được. Còn CakePHP thì phải gõ đủ lệnh ra.
 
 Chưa hết, cái này sẽ liên quan tới phần tiếp theo.
 
 Rails có:
 - Tạo db mới : `rails db:create`
 - Xoá db : `rails db:drop`
 - Lập lại toàn bộ db : `rails db:reset`(giống Laravel `php artisan migrate:refresh --seed`)
 - Seed: `rails db:seed`
 - Rollback toàn bộ `rails db:rollback`
 
 Còn CakePHP:
 - Tạo db mới: tự tạo tay đi cưng
 - Xoá db: tự xoá tay nốt nhé
 - Reset lại db: ơ có lệnh ấy à? ai tìm cho mình với
 - seed: `bin/cake migrations seed`
 - rollback toàn bộ: `bin/cake migrations rolback -t 0`(rollback tại thời điểm t=0)
# Thao tác với database 
Thôi cái này thì đừng nói nữa. Mình lấy file docker cho CakePHP từ bên ngoài vào mà chỉ có mỗi file đó chạy được kết nối với database, còn các docker khác thì có vẻ chỉ tự đúng với trường hợp của họ. Và theo nguồn stackoverflow bên dưới thì bác kia **mất 2 ngày để kết nối đúng database** . Và ngoài ra bác ấy còn phải **xoa vuốt sờ soạng nắn bóp cấu trúc dữ liệu để XML nó chạy đúng(massaging data structures to make XML output work correctly)**. Và gọi tên nó là **nghệ thuật trong tối(black art)**

ỐI NGÀNH ƠI!

Việc đó thì mình ko rõ thế nào nhưng rollback của CakePHP chỉ rollback 1 bước, trong khi đó Rails và Laravel đều rollback toàn bộ các bước. Và lỡ migrate nhầm, ta có thể drop db rồi create lại mà không cần đăng nhập vào mysql trên terminal. Còn CakepHP à? Nhầm 1 phát rollback không được thì mời bạn `mysql -u root -p`.

Ngoài ra theo Peter Kai: 
"
Trình quản lý schema lố bịch có ý định rất tốt, nhưng cố gắng tự động hóa quá nhiều. Thay vì bắt bạn viết các thay đổi schema của riêng bạn như Rails, nó cố gắng tự mình tìm ra schema - với kết quả thảm hại. Hãy nói rằng bạn đổi tên một cột và muốn chuyển đổi sang cơ sở dữ liệu khác bằng cake console. Thay vì đổi tên, nó sẽ bỏ cột và tạo một cột mới, có nghĩa là - có - tất cả dữ liệu cột của bạn đã biến mất. Điều này là do có một cách không chắc chắn để biết chắc chắn sự khác biệt giữa đổi tên và xoá/thêm sau khi nó đã xảy ra. Nhưng nó là vấn đề chết người.
"

Và mình đã trải nghiệm điều này rõ nhất ở việc thêm cột foreign key cho 1 bảng. Việc rollback/migrate bị lỗi luôn xảy ra ở đây.

Btw, quả "ý định tốt" nhưng cách làm thì thảm hại có vẻ giống giống 1 nơi nào đó mình biết: mơ rất cao nhưng tính khả thi ko có, dự án fail liên miên
# Cộng đồng hỗ trợ
Rails phát triển khá mạnh và cộng đồng hỗ trợ thì thôi, khỏi nói là đông đảo như lào rồi.

Còn CakePHP có nhiều người hỏi đáp, tut và video thật. Cơ mà làm theo đc nó thì hoặc ko bao giờ hoặc gấp 10 lần thời gian bạn bỏ ra theo lý thuyết trơn tru như video. Ngoài ra khi bạn gặp bug và google giải pháp, CakePHP có 1 núi issue ở GitHub đưa ra vấn đề của bạn và các issue bị đóng lại 1 cách không thể nào hiểu nổi vì có cái comment nào là giải pháp hay xác nhận là issue đã bị xử đâu.
# Kết luận rút ra
Bày tỏ 1 chút cảm xúc cá nhân thì đây là Cứ...PHP chứ CakePHP cái nỗi gì. Mặc dù ra đời trước Rails nhưng bug tùm lum, cài đặt các kiểu cũng đủ chết chứ đừng nói là code. Giao diện có thể trông đẹp nhưng code thì rối tung lên. Mình mất tới 1 tuần để đc 1 cái authen cho CakePHP(với PHP là học cũng lâu lâu rồi) mà mất có 2 ngày để được cả Authorization trên Rails(mới học không biết gì). Nếu tránh được CakePHP, các bạn hãy tránh nó ra giúp mình.(tránh CakePHP chứ ko tránh PHP nhé. Mình vốn từ code Laravel đang chuyển dần sang Rails mà. Ghét đúng đứa để gây war đúng chứ gây war với toàn ngôn ngữ PHP thì.... mình ko đào ngũ nha).
# Tham khảo
- https://stackoverflow.com/questions/493950/how-different-is-cakephp-from-ruby-on-rails
- https://petercai.com/why-i-dont-like-cakephp/
# Lời cuối
Hôm nay là tròn 1 năm ngày mình viết bậy ở đây với bài cũng khá là nhắng nhít: https://viblo.asia/p/cach-lay-chung-chi-hoan-chinh-tren-free-code-camp-XL6lAX8gZek. Xin chân thành cảm ơn trang web đã cho mình viết lăng nhăng linh tinh ở đây suốt năm vừa qua. Tổng kết lại cũng đc vài lần lên Trending và 1 lần đc Editor's Choice. Mình xin đặt mục tiêu là năm nay nhất định sẽ phải thêm đc 1 bài nữa đc Editor's Choice. Rất mong nhận được sự động viên của mọi người.

p/s: Đau thật. Kỉ niệm 1 năm tưởng đc bài nào hay ho, cuối cùng là bài đi chửi.