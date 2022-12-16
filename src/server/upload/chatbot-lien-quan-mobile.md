## 1. Ý tưởng
***Game Liên Quân Mobile*** chắc chẳng còn xa lạ gì với mọi người. Mình đây chơi game cũng khoảng 1 năm rồi, nhưng cũng chỉ biết chơi vài Tướng như **Valhein**, **Toro**, **Baldum**, . Mình chỉ biết tướng mình chơi có skill gì, nội tại gì mà không biết nhiều thông tin về Tướng phía bên địch, mấy Tướng hay đánh còn biết, chứ mấy con ít đánh thì không biết luôn. Do mình ít xem Livestream, ít xem đánh giải nên không biết nhiều các vị Tướng (vì thế giờ chơi game vẫn gà, huhu =)))

--> Có một ứng dụng tra cứu thông tin thì sao nhỉ

Với lại, dạo gần đây mình chỉ thích chơi **Taara**. Và mình có đọc tiểu sử của *Taara*. Ồ, hay vậy, mỗi nhân vật đều có một câu chuyện riêng của mình, và liên quan đến một vài vị tướng khác
> Trong ngày ánh sáng hồi sinh, Taara cùng các bộ lạc tổ chức một bữa tiệc linh đình. Họ thắp lên ngọc lửa sáng sâu trong những ngọn núi và đốt lên những cột lửa sáng lóa. Các sứ giả của Thane đến, mang tới mệnh lệnh từ vị vua đáng kính: Vì sự trung thành của Taara trong chiến tranh, cô xứng đáng được trao danh hiệu cao quý

Hay như:
> Trước khi Taara có thể lên kế hoạch cho những điều mới mẻ, sự giận dữ của Gildur đã lan đến Sông Thép

Thế là mình quyết định làm một Chatbot giúp tra cứu nhanh các thông tin của tướng.

![](https://images.viblo.asia/5986ff59-5972-45ba-a941-663ce62a3023.png)

## 2. Chức năng
Mang đặc điểm của 1 Chatbot, hoạt động trên Messenger Facebook, rất tiện lợi cho việc tra cứu.

Chức năng chính gồm:
* Tra cứu thông tin tướng
        * Cho tôi hỏi thông tin tướng valhein
        * van heo
* Xem kỹ năng của tướng
* Xem tiểu sử của tướng (mấy tướng mới tiểu sử max dài, chat như spam có thể sẽ tích hợp voice đọc)
* Xem trang phục Tướng
* Xem chỉ số tướng (chưa phát triển)
## 3. Triển khai
Ok, bắt tay vào thực hiện thôi, trước hết cần có dữ liệu đã.

### Thu thập dữ liệu

#### Thiết kế cơ sở dữ liệu
Vào trang chủ của Liên Quân thì thấy ngay trang danh sách tướng ([danh sách tướng Liên Quân](https://lienquan.garena.vn/tuong)), và click vào một tướng sẽ thấy trang thông tin chi tiết của vị Tướng đó ([Taara](https://lienquan.garena.vn/tuong-chi-tiet/22))

Rồi lọc xem thông tin nào mình cần để đáp ứng được các chức năng trên, sau đó tiến hành thiết kế cơ sở dữ liệu.

Cơ sở dữ liệu gồm các bảng:
* heros: lưu thông tin Tướng cơ bản, tiểu sử
* hero_types: các loại tướng như Xạ thủ, Đấu Sĩ, ...
* hero_skills: kĩ năng của Tướng
* hero_skins: skin trang phục (sờ kin ke)
* hero_info_details: Chỉ số tướng
* Nếu chat không nhận được vị Tướng nào sẽ trả lời random kiểu câu huyền thoại: `Chỉ cần bạn có mặt, thắng thua không quan "tọng"`

![](https://images.viblo.asia/c3df2b9d-af3c-468a-ab86-09a43bc62a77.png)

Cơ sở dữ liệu ở đây mình dùng Mysql, vì tiện sử dụng cho xử lý PHP (Laravel)

#### Crawl dữ liệu
Các bảng dữ liệu đã có, mình bắt đầu thu thập dữ liệu từ Website trên, ở đây mình sử dụng Python 3

Sử dụng `requests` để request đến trang [danh sách Tướng](https://lienquan.garena.vn/tuong)
```python
res = requests.get('https://lienquan.garena.vn/tuong')
data =res.text
```

Sử dụng `BeautifulSoup` để parse dữ liệu, phân tích cấu trúc html thì thẻ chứa Tướng có class là `list-champion`

![](https://images.viblo.asia/2c7a3bd5-8398-4ea1-b5d9-58e1030b7057.png)

```python
soup = BeautifulSoup(data)
heros = soup.findAll('li', {"class": "list-champion"})
```

Lấy  tên Tướng, loại Tướng, link chi tiết Tướng, rồi từ link này request đến để lấy các thông tin về kỹ năng, tiểu sử, trang phục.

```python
arr_type_hero = ['', 'Đấu Sĩ', 'Pháp Sư', 'Trợ Thủ', 'Đỡ Đòn', 'Sát Thủ', 'Xạ Thủ']

for hero in heros:

	name = hero.find('p', {'class': 'name'})
	hero_name = name.getText()
	print(hero_name)

	type_id = int(name['data-type'])
	type_name = arr_type_hero[type_id]
	image = domain + hero.find('img')['src']
	
	link_origin = hero.find('a')['href']

	res = requests.get(link_origin)
	detail_data = res.text

	soup_detail = BeautifulSoup(detail_data)
```

Trang chi tiết có đầy đủ các thông tin về tướng rồi, chỉ cần phân tích giá trị nào nằm ở thẻ html nào, rồi từ đó bóc tách dữ liệu, sử dụng `mysql.connector` để insert vào **Mysql**

```python
    infos = soup_detail.findAll('div', {"class": "tabs-content"})
	story = infos[1].getText()

	data_hero = (hero_name, image, story, type_id, type_name, link_origin)

	# insert hero
	hero_id = insert_hero(mycursor, data_hero)

	skills = infos[2].find('table').findAll('tr')
	data_skill = []
	for skill in skills:
		skill_image = domain + skill.find('img')['src']
		name_skill = skill.find('strong').getText()
		desc_skill = skill.findAll('td')[1].getText().strip()

		tmp = (name_skill, skill_image, desc_skill, hero_id)
		data_skill.append(tmp)
	
	#insert skill
	insert_skills(mycursor, data_skill)

	skins = soup_detail.find('div', {"class": "cont-skin"}).findAll('img')
	data_skin = []
	for skin in skins:
		if skin['src'] != '':
			link_skin = domain + skin['src']

			tmp = (link_skin, hero_id, hero_name)
			data_skin.append(tmp)

	#insert skin
	insert_skins(mycursor, data_skin)

	attributes = soup_detail.find('div', {"class": "cont"}).findAll('p')

	attr_val = []
	data_increate = []
	for attr in attributes:
		val = attr.find('span').getText().strip()
		attr_val.append(val)
		
		try:
			incr = attr.find('span')['data-increase']
			data_increate.append(val)

		except Exception as e:
			pass

	data_increate = ";".join(data_increate)
	attr_val.append(data_increate)
	attr_val.append(hero_id)

	attr_val = tuple(attr_val)
	insert_attrs(mycursor, attr_val)
```
Xem toàn bộ Source crawl data [ở đây](https://github.com/thapcamtool/knowledge-chatbot/blob/master/python/lq/hero_first.py)


### Xử lý Chatbot
Sử dụng Laravel để viết luồng xử lý Webhook của Facebook

#### Hàm nhận diện tên Tướng
Logic: so toàn bộ danh sách tướng có trong database với câu chat, sử dụng trường `name` và trường `other_names` (từ đồng nghĩa của tên), check xem câu chat có chứa 1 trong những tên đó không. Nếu không tìm thấy tìm sử dụng hàm `similar_text` của PHP, hàm này tính ra độ tương đồng của 2 string, lấy tỉ lệ tương đồng lớn nhất và phải lớn hơn 50%

```php
<?php
namespace App\Helpers\Entity;

use App\Models\Hero;

class EntityDetection
{
	public static function findHeros($sentence) {
		$result = [];
		$heros = Hero::all()->toArray();

		foreach ($heros as $hero) {
			$heroName = $hero['name'];
			$arrCheck[] = $heroName;

			$otherNames = $hero['other_names'];
			if ($otherNames) {
				$otherNames = explode(';', $otherNames);

				$arrCheck = array_merge($arrCheck, $otherNames);
			}
			if (self::checkContain($arrCheck, $sentence)) {
				$result[] = $hero;
			}
		}
		if (count($result) == 0) {
			$currentMax = 0;
			$tempResult = null;
			foreach ($heros as $hero) {
				$heroName = $hero['name'];
				$heroName = strtolower(trim($heroName));
				similar_text($heroName, $sentence, $perc);
				if ($perc >= 50 && $perc > $currentMax) {
					$currentMax = $perc;
					$tempResult = $hero;
				}
			}

			if ($tempResult != null) {
				$result[] = $tempResult;
			}
		}

		return $result;
	}

	public static function checkContain($arr, $sentence) {

		$sentence = strtolower($sentence);
		foreach ($arr as $heroName) {
			$heroName = strtolower(trim($heroName));
			if(strpos($sentence, $heroName) !== false){
			    return true;
			}
		}

		return false;
	}
}
```
#### Xử lý Postback
Nếu tìm thấy tướng, câu trả lời sẽ trả về tên tướng, ảnh tướng, và các postback cho các chức năng: Tiểu sử, Kỹ năng, Trang phục

(ở đây mình bỏ qua bước parse data gốc của Facebook để có được *text* hay *payload*, chi tiết các bạn có thể xem link source code phía cuối bài)

```php
[
	"type"		=> "postback",
	"title"		=> "Tiểu sử",
	"payload"	=> "LQ::story|" . $hero['id']
],
[
	"type"		=> "postback",
	"title"		=> "Kỹ năng",
	"payload"	=> "LQ::skill|" . $hero['id']
],
[
	"type"		=> "postback",
	"title"		=> "Trang phục",
	"payload"	=> "LQ::skin|" . $hero['id']
]
```

##### Tiểu sử
Chỉ đơn giản là từ payload, lấy ra `id` của Tướng, rồi `where` trong cở sở dữ liệu để có trường `story`

```php
$hero = Hero::find($id);
$result[] = [
	'id'	=>	null,
	'type'	=>	'text',
	'message'	=>	$hero['story']
];
```
##### Kỹ năng
Tìm trong bảng heros_skill với `hero_id` trong payload rồi trả về list các skill này dưới dạng [Template generic](https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic). Button chứa payload có `skill_id`, click vào xem chi tiết thì xử lý tương tự giống *story*

```php
$skills = Skill::where('hero_id', $id)->get()->toArray();

$elements = [];

$arrTitle = ['Nội tại', 'Chiêu 1', 'Chiêu 2', 'Chiêu cuối'];
$count = 0;
foreach ($skills as $skill) {

	$buttons = [
		[
			"type"		=> "postback",
			"title"		=> "Xem chi tiết",
			"payload"	=> "LQ::detail_skill|" . $skill['id']
		]
	];

	$el = new ElementTemplate($arrTitle[$count] . ' - ' . $skill['name'], $skill['image'], $buttons);
	$elements[] = $el;
	$count += 1;
}

$result[] = [
	'id'	=>	null,
	'type'	=>	'generic',
	'elements'	=>	$elements
];
```
##### Skin 

Xử lý tương tự giống Kĩ năng

Ok, có **$result** rồi, có mấy dạng câu trả lời như text, button, generic. Cần format và gửi sang Facebook thôi. Chi tiết bạn có thể xem link source:
Github: https://github.com/thapcamtool/knowledge-chatbot/

Trong đó:
- https://github.com/thapcamtool/knowledge-chatbot/blob/master/app/Helpers/Entity/EntityDetection.php --> nhận diện tướng
- https://github.com/thapcamtool/knowledge-chatbot/blob/master/app/Helpers/LQHelper.php --> xử lý payload
- https://github.com/thapcamtool/knowledge-chatbot/blob/master/app/Helpers/KnowledgeHelper.php --> parse bản tin gốc của Facebook, gửi câu trả lời các loại cho Facebook.

## 4. Kết luận
Ảnh demo:

![](https://images.viblo.asia/b500b732-2710-4eee-86bc-ddb19d36711f.png)

Link Messenger đây nhé: https://www.facebook.com/messages/t/106731697685858

Mong được nhận Gạch đá từ ae :))

Mà không hiểu từ hồi có Bot, mình chơi đa dạng tướng hắn, không chỉ độc chơi mỗi Taara nữa (nhưng toàn feed, haha =)))

Add friend hẹn kèo cuối tuần nào, id: `emluonsansang`