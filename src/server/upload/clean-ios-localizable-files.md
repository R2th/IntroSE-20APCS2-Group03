Apple đã giúp cho việc "bản địa hoá" - `localized` - một ứng dụng đơn giản đi rất nhiều, tuy nhiên để các file localizable ngắn gọn và sạch sẽ - `concise and clean` - lại là một câu chuyện khác, đặc biệt là khi app của bạn hỗ trợ nhiều ngôn ngữ.
Điều thường xảy ra với các file `Localizable.strings` là chúng có xu hướng trở nên dài và cẩu thả 1 cách rất nhanh chóng =)) Như nhiều coder có thể chứng nhận: thêm code thì dễ dàng hơn nhiều so với việc modify hoặc edit code hiện có, và việc thêm 1 cặp key/value vào trong file localizable cũng y hệt như thế. Việc thêm 1 cặp key/value vào thì luôn dễ hơn việc tìm 1 cặp đã tồn tại để reuse. Bỏ qua cơ hội có thể sử dụng 1 cặp đang có có thể dẫn đến việc trừng lặp trong localizable file và dẫn đến các `unexpected behaviors view`.
Không cần phải nói, cấu trúc của các file localizable là rất quan trọng. Một file file localizable được sắp xếp tốt không chỉ vì mục đích thẩm mỹ mà còn vì giúp cho việc tìm kiếm và lướt qua để thấy được các cặp hiện tại. Tuy nhiên, duy trì một file được sắp xếp tốt là không hiệu quả, khi các developers luôn add các cặp mới tuỳ tiện nhất là khi làm việc chung. 
Một vấn đề phổ biến nữa ta thường thấy trong file localizable là việc sử dụng các key trong thực thế. Thông thường, các developer hay quên việc xoá các cặp key/value khi code đã bị xoá. Hoặc ngược lại, key vẫn được sử dụng nhưng developer quên define value trong file localizable. Điều này còn tồi tệ hơn điều trước khi nó trực tiếp gây ra 1 UI bug rất là hãm: để user thấy 1 chuỗi ký tự khó hiểu =)). Tuy nhiên cả 2 trường hợp trên vẫn rát dễ xảy ra khi project được build trên Xcode và ko bao giờ ném ra các errors hay warning nào.
 ### Example
 #### 1. Key duplications:
 ![](https://images.viblo.asia/1bc8eba3-be00-401a-8adb-4fc667bcbffb.png)
 #### 2. Keys between multiple localizable files do not match:
 ![](https://images.viblo.asia/b36c9f6a-3645-4a0c-bfb4-3ba5bde1e98f.png)
 #### 3. Unused keys:
 ![](https://images.viblo.asia/1f47db7e-02eb-409c-9392-fe01ddc57563.png)
 #### 4. Undefined keys:
 ![](https://images.viblo.asia/018808dc-a906-4bd3-8f08-4422f15a4a27.png)
 
 ### Mitigate
 #### Find Duplicated
 Để giảm thiểu những vấn đề này, chúng ta sẽ tạo ra 1 `automated post build script` để clean, maintains và đưa ra các warning/errors trên Xcode cho bất kỳ 1 usage problems nào ở trên. Điều đầu tiên mà script chugns ta nên làm là tìm được tất cả các file localizable trong project, sắp xếp các key, và xác định các key bị duplications.
 ``` swift
 #!/bin/bash

project_name="CleanLocalizableExample"
es_duplicates=9

sort_and_find_duplicates() {
	echo "== Sorting localizable files: $1 =="
 	sed -i '' '/^$/d' $1 #deletes whitespace lines
 	sort $1 -o $1 #sorts file
	duplicates=`sed 's/^[^"]*"\([^"]*\)".*/\1/' $1 | uniq -d`
	if [ ! -z "${duplicates}" ]; then
		echo "error: Found duplicated keys"
		echo "error: $duplicates in file: $1"
		exit $es_duplicates
	fi
}

find ./$project_name -name 'Localizable.strings' |
while read file; do
	sort_and_find_duplicates $file
done
 ```
 Trước tiên, chúng ta xác định tên của project, ở ví dụ này là `CleanLocalizableExample` và 1 `exit status` nết như tìm thấy 1 `duplicated key`. Chúng ta sau đó define 1 method mà đầu vào là 1 file, remove `white spaces` trong file và sắp xếp từng line một. Với 1 chút `sed&regex` chúng ta có thể trích xuất các các `localizable key` từ file bằng cách lấy các string ở giữa  dấu ngoặc kép đầu tiên ( i.e "Fruit:Apple" = "苹果” -> "Fruit:Apple") Sau khi lấy được key chúng ta sẽ kiểm tra xem các keys có bị duplicate hay không. Nếu tìm được 1 duplicated key nào đó, script sẽ output 1 error hoặc warning. Phần cuối của script này sẽ xác định tất cacr các file có tên `Localizable.strings` từ root của project và thực hiện `sort_and_find_duplicates` trên đó. Tiếp theo chúng ta sẽ add 1 functions kiểm tra xem các key trong base localizable có match hết với các key trong các file localizable khác hay không. Điều này sẽ đảm bảo các developer khong quên việc thêm hoặc xoá cặp key/value in mỗi file khi mà sửa đổi chúng.
 
 #### Find Key not match in multiple localizable files
 ``` swift
 es_match=8

keys_match() {
	echo "== Checking if keys match in localizable files: $1 =="
	base_keys=`sed 's/^[^"]*"\([^"]*\)".*/\1/' $development_file`
	localizable_strings=`sed 's/^[^"]*"\([^"]*\)".*/\1/' $1`
	is_different=`diff <(echo "$base_keys") <(echo "$localizable_strings")`

	if [ ! -z "${is_different}" ]; then
		echo "error: Localizable string keys do not match"
		echo "error: $is_different in file: $1"
		exit $es_match
	fi
}
 ```
 Trong method `keys_match`, chúng ta lưu trữ tất cả keys trong file `base localizable` vào 1 biến tên `base_keys` và lưu tất cả keys của các file localizable khác vào biến `localizable_key`. Chúng ta sử dụng `sed` để trích xuất các keys như method truwocs và `diff` để check có sự khác biệt giữa các key hay không. Nếu có keys nào trong các file localizable mà khác nhau, Xcode sẽ throw ra `build error` và output ra key đó ở file nào. Và lúc này, các files đã được sắp xếp, ko có duplicated keys, và tất cả các file đều chứa chúng các keys giống nhau, tiếp theo, 2 methods này sẽ check về việc sử dụng thực tế của các keys.
 
 #### Unused & Undefined Keys:
 ``` swift
 es_not_included=7

keys_not_used() {
	echo "== Checking keys not used in code =="
	sed 's/^[^"]*"\([^"]*\)".*/\1/' $development_file |
	while read key; do
		exist=`grep -rl "NSLocalizedString(\"$key\"" --include \*.swift --include \*.m ./$project_name/*`
		if [ -z "${exist}" ]; then
			echo "warning: Found keys not used in code"
			echo "warning: \"$key\" is not used being used"
		fi
	done
}

keys_not_included() {
	echo "== Checking keys not included in localizable =="
	base_keys=`sed 's/^[^"]*"\([^"]*\)".*/\1/' $development_file`
	# grep NSLocalizedString("anything until first quotes" | sed everything in between quotes | sort and unique
	grep -r -o "NSLocalizedString(\"[^\"]*\"" --include \*.swift --include \*.m ./$project_name/* --exclude ./$project_name/NSLocalizedString.swift |
	grep -v "%d" |
	sed 's/^[^"]*"\([^"]*\)".*/\1/' |
	sort -u |
	while read key; do
		if [[ $base_keys != *$key* ]]; then
			echo "error: Found keys not included in localizable file"
			echo "error: \"$key\" not define in file: $1"
			exit $es_not_included
		fi
	done
}
 ```
 `keys_not_used` method sẽ loop qua toàn bộ keys và apply 1 `grep` cho NSLocalizedString("$key" trong toàn bộ các file .m và .swift thuộc project). Nếu keys nào đó ko được sử dụng trong bất kỳ file nào, script sẽ throws ra 1 Xcode warning. Method này sẽ cần 1 chút tinh chỉnh nhỏ cho phù hợp với project của bạn. Nếu như project bao gồm cả localized string cho việc test, loại trừ đường dẫn trong `grep` function. Kết quả của method sẽ output ra các keys ko được sử dụng và throws ra 1 warning chứ ko phải error vì nếu có 1key ko được sử dụng thì hoàn toàn vô hại từ góc nhìn của user.
 `keys_not_include` tương tự như method `keys_not_used` cũng sẽ kiểm tra qua tất cả các keys xem trong các file .m và .swift có những key nào chưa có trong file base localizable. Nếu có, nó sẽ throws ra 1 error.
 Toàn bộ file script sẽ như sau:
 ```swift
 #!/bin/bash 

project_name="CleanLocalizableExample"
development_file="./$project_name/en.lproj/Localizable.strings"

es_duplicates=9
es_match=8
es_not_included=7

sort_and_find_duplicates() {
	echo "== Sorting localizable files: $1 =="
	sed -i '' '/^$/d' $1 #deletes whitespace lines
	sort $1 -o $1 #sorts file
	duplicates=`sed 's/^[^"]*"\([^"]*\)".*/\1/' $1 | uniq -d`
	if [ ! -z "${duplicates}" ]; then
		echo "error: Found duplicated keys"
		echo "error: $duplicates in file: $1"
		exit $es_duplicates
	fi
}

keys_match() {
	echo "== Checking if keys match in localizable files: $1 =="
	base_keys=`sed 's/^[^"]*"\([^"]*\)".*/\1/' $development_file`
	localizable_keys=`sed 's/^[^"]*"\([^"]*\)".*/\1/' $1`
	is_different=`diff <(echo "$base_keys") <(echo "$localizable_keys")`
	
	if [ ! -z "${is_different}" ]; then
		echo "error: Localizable string keys do not match"
		echo "error: $is_different in file: $1" 
		exit $es_match
	fi
}

keys_not_used() {	
	echo "== Checking keys not used in code =="
	sed 's/^[^"]*"\([^"]*\)".*/\1/' $development_file | 
	while read key; do
		exist=`grep -rl "NSLocalizedString(\"$key\"" --include \*.swift --include \*.m ./$project_name/*`
		if [ -z "${exist}" ]; then
			echo "warning: Found keys not used in code"
			echo "warning: \"$key\" is not used being used"
		fi
	done
}

keys_not_included() {
	echo "== Checking keys not included in localizable =="
	base_keys=`sed 's/^[^"]*"\([^"]*\)".*/\1/' $development_file`	
	# grep NSLocalizedString("anything until first quotes" | sed everything in between quotes | sort and unique
	grep -r -o "NSLocalizedString(\"[^\"]*\"" --include \*.swift --include \*.m ./$project_name/* --exclude ./$project_name/NSLocalizedString.swift | 
	grep -v "%d" |
	sed 's/^[^"]*"\([^"]*\)".*/\1/' | 
	sort -u | 
	while read key; do
		if [[ $base_keys != *$key* ]]; then
			echo "error: Found keys not included in localizable file"
			echo "error: \"$key\" not define in file: $1"
			exit $es_not_included
		fi
	done
}


find ./$project_name -name 'Localizable.strings' |
while read file; do
	sort_and_find_duplicates $file
	keys_match $file
	echo ""
done
keys_not_used
keys_not_included
 ```
 
 ### Use
 Save file trên vào trong `scripts` và thêm nó vào `post build script` trong Xcode
 ![](https://images.viblo.asia/9e170349-7ba8-441a-8b83-9a768a363782.png)
 Build project và bạn sẽ thấy:
 ![](https://images.viblo.asia/532cdd62-9dfc-433d-a2b3-c453f628e601.png)
 
 ### Reference
 https://buildingvts.com/clean-ios-localizable-files-8b910413b985