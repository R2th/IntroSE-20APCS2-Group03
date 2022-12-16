Sau một hồi nghịch ngợm tìm hiểu về bash script hôm nay mình có tổng hợp lại một số hàm có thể hay gặp khi sử dụng bash script. MÌnh xin phép được bỏ qua một số những định nghĩa cơ bản và tập trung nhiều hơn vào việc thực hành
# Khai báo biến trong bash script
## Khai báo biến local
Chắc hẳn chúng ta đều đã quen thuộc với cách khai báo một biến trong bash như sau
```bash
var="test"
demo_variable(){
  var2="test variable"
  echo $var
  echo $var2
}

demo_variable
echo $var
echo $var2
```

Kết quả:
```
test
test variable
test
test variable
```


Biến này sẽ được sử dụng xuyên suốt trong script. Dù ở trong function vẫn có thể sử dụng được hoặc khai báo trong function và ở ngoài vẫn có thể dụng được. 

Tuy nhiên trong 1 số trường hợp nếu muốn giới hạn lại phạm vi sử dụng của biến chỉ trong functions thôi chúng ta có thể sử dụng biến local như sau:

```bash
try_local_variable(){
  local var="Test local variable"
  echo $var
}

try_local_variable
if [ -n "$var" ]
then
  echo $var
else
  echo "Parameter not supplied"
fi
```

Kết quả:
```
Test local variable
Parameter not supplied
```

## Lấy giá trị của biến từ string
```bash
var="test"

var2="var"
echo "${!var2}"
```

Kết quả
```
test
```

Ngoài ra có thể thực hiện gán giá trị vào một biến khác như sau 
```bash
var="test"

var2="var"
var3="${!var2}"
echo $var3
```

Kết quả
```
test
```
# Một số hàm hay sử dụng với String
## Thay thế string
```bash
var="test"

# replace first 't' only
bar=${var/t/h}
echo $bar

# replace all 't'
bar=${var//t/h}
echo $bar
```

Kết quả
```
hest
hesh
```

## Cut string
```bash
var="this is a test"
echo "$var" | cut -d' ' -f 4
echo "$var" | cut --delimiter=' ' --fields=4
```

Kết quả 
```
test
```

# Sử dụng array trong bash script
## Duyệt qua tất cả các phần tử của mảng
```bash
array1=(1 2 3)
for element in "${array1[@]}"
do
  echo $element
done
```

Kết quả 
```
1
2
3
```

## Merge 2 mảng 
```bash
array1=(1 2 3)
array2=(4 5 6)
new_array=("${array1[@]}" "${array2[@]}")
for element in "${new_array[@]}"
do
  echo $element
done
```

Kết quả 
```
1
2
3
4
5
6
```

## Thêm phần tử vào mảng
### Thêm phần tử vào đầu của mảng
```bash
array=(2 3 4)
array=(1 "${array[@]}")
for element in "${array[@]}"
do
  echo $element
done
```

Kết quả 
```
1
2
3
4
```

### Thêm phần tử vào cuối của mảng
```bash
new_array=(0)
new_array=( "${new_array[@]}" 1 )  # Cách 1
array=(2 3 4)
for element in "${array[@]}"
do
  new_array+=($element)             # Cách 2
done

for element in "${new_array[@]}"
do
  echo $element
done
```

Kết quả
```
0
1
2
3
4
```

### Thêm phần tử vào vị trí xác định của mảng
Để làm việc này cần phải làm theo 3 bước như sau
1. Lấy tất cả các element trước vị trí index "x"
2. Thêm một element vào mảngAdd an element to the array
3. Lấy tất cả các element từ vị trí index "x" trở về sau,

Ví dụ như format bên dưới: Thêm element 4 vào vị trị index = 2 của mảng

```bash
array=(0 1 3 5)
array=( "${array[@]:0:2}" 4 "${array[@]:2}" )
for element in "${array[@]}"
do
  echo $element
done
```

Kết quả
```
0
1
4
3
5
```

## Xóa phần tử ra khỏi mảng
Chúng ta sẽ cần thực hiện 2 bước sau
1. Lấy tất cả các element trước vị trí index "x"
2. Lấy tất cả các element từ vị trí index "x" + "n" trở về sau

Ví dụ như format bên dưới: Xóa element khỏi vị trí index = 2 của mảng

```bash
array=(0 1 3 5)
array=( "${array[@]:0:2}" "${array[@]:3}" )
for element in "${array[@]}"
do
  echo $element
done
```

Kết quả
```
0
1
5
```

Ngoài ra có thể sử dụng cách khác khi sử dụng hàm `unset` như sau 
```bash
array=(0 1 3 5)
unset -v 'array[1]'
for element in "${array[@]}"
do
  echo $element
done
```

Kết quả
```
0
3
5
```

Một cách khác khi bạn biết chính xác được giá trị của element trong mảng bạn có thể sử dụng cách thay thế tương tự như việc thay thế string theo format. 
```bash
array=( "${array[@]/PATTERN/}" )
```

Ở đây chỉ cần sử dụng 1 dấu `/` là đủ thay thế tất cả các giá trị map

```bash
array=(0 1 3 5 1 2)
array=( "${array[@]/1/}" )
for element in "${array[@]}"
do
  echo $element
done
```

Kết quả
```
1

3
5

2
```
# Làm việc với file
Giả sử chúng ta có một file tên *text.txt* với nội dung như sau:
```
Line number 1
Line number 2
```

## Đọc tất cả các dòng trong một file 
```bash
while IFS="" read -r line || [ -n "$line" ]
do
    echo $line
done < text.txt
```

Kết quả 
```
Line number 1
Line number 2
```

## Chỉnh sửa file
### Thêm vào đầu file
```bash
filename="text.txt
(echo "New line added" | cat - $filename)  > "$filename".tmp && mv "$filename".tmp "$filename"
cat $filename
```

Kết quả
```
New line added
Line number 1
Line number 2
```

Với cách này chúng ta sẽ thực hiện bằng cách tạo ra file với đuôi *.tmp* sau đó thực hiện lệnh `mv` để tổi file tmp thành tên file ban đầu

### Thêm vào một line bất kỳ của file
Chúng ta có thể sử dụng bằng lệnh `sed` với format `<line>i<PATTERN>`. 

Ví dụ dưới đây chúng ta sẽ thêm vào dòng số 1 của file với nội dung là "Line number 0". Lưu ý ở đây rằng `<line>` phải nhỏ hơn hoặc bằng số dòng trong file

```bash
filename="text.txt
sed -i "1iLine number 0" $filename
cat $filename
```

Kết quả 
```
Line number 0
Line number 1
Line number 2
```

### Thêm vào cuối file
```bash
filename="text.txt
echo "Line number 3" >> $filename
cat $filename
```

Kết quả 
```
Line number 1
Line number 2
Line number 3
```

Lưu ý ở đây nếu chúng ta chỉ sử dụng 1 dấu `>` thì điều có nghĩa là sẽ tạo ra file mới ví dụ như sau
```bash
filename="text.txt
echo "Line number 3" > $filename
cat $filename
```

Kết quả 
```
Line number 3
```

### Thay thế một text gặp trong file

Chúng ta sẽ tiếp tục sử dụng với lệnh `sed` với format như sau
```bash
sed -i "s/PATTERN/REPLACE_PATTERN/" filename
```

Ví dụ chúng ta sẽ thực hiện thay thế từ "Line" thành "This is line"
```bash
filename="text.txt
sed -i "s/Line/This is line/" $filename
cat $filename
```

Kết quả 
```
This is line number 1
This is line number 2
```

# Đọc file yaml từ bash script
Sau một hồi tìm hiểu thì may mắn tìm được một link [github](https://github.com/jasperes/bash-yaml/blob/master/script/yaml.sh) viết về hàm khá đẩy đủ để đọc được file yaml với nội dung như sau:

```bash
#!/usr/bin/env bash
# shellcheck disable=SC1003

# Based on https://gist.github.com/pkuczynski/8665367

parse_yaml() {
    local yaml_file=$1
    local prefix=$2
    local s
    local w
    local fs

    s='[[:space:]]*'
    w='[a-zA-Z0-9_.-]*'
    fs="$(echo @|tr @ '\034')"

    (
        sed -e '/- [^\“]'"[^\']"'.*: /s|\([ ]*\)- \([[:space:]]*\)|\1-\'$'\n''  \1\2|g' |

        sed -ne '/^--/s|--||g; s|\"|\\\"|g; s/[[:space:]]*$//g;' \
            -e "/#.*[\"\']/!s| #.*||g; /^#/s|#.*||g;" \
            -e "s|^\($s\)\($w\)$s:$s\"\(.*\)\"$s\$|\1$fs\2$fs\3|p" \
            -e "s|^\($s\)\($w\)${s}[:-]$s\(.*\)$s\$|\1$fs\2$fs\3|p" |

        awk -F"$fs" '{
            indent = length($1)/2;
            if (length($2) == 0) { conj[indent]="+";} else {conj[indent]="";}
            vname[indent] = $2;
            for (i in vname) {if (i > indent) {delete vname[i]}}
                if (length($3) > 0) {
                    vn=""; for (i=0; i<indent; i++) {vn=(vn)(vname[i])("_")}
                    printf("%s%s%s%s=(\"%s\")\n", "'"$prefix"'",vn, $2, conj[indent-1],$3);
                }
            }' |

        sed -e 's/_=/+=/g' |

        awk 'BEGIN {
                FS="=";
                OFS="="
            }
            /(-|\.).*=/ {
                gsub("-|\\.", "_", $1)
            }
            { print }'
    ) < "$yaml_file"
}

create_variables() {
    local yaml_file="$1"
    local prefix="$2"
    eval "$(parse_yaml "$yaml_file" "$prefix")"
}
```

Hàm `parse_yaml` cần 2 giá trị input là tên file và giá trị prefix. Hàm `create_variables` là để khai báo các biến sau khi đã parse các key trong file ra. Như ở ví dụ dưới đây chúng ta có file *database.yml* và prefix là *config_*
```yml
default: 
  adapter: mysql2
  reconnect: true
  encoding: utf8mb4
  pool: 5
  host: local
  username: root
  password: 123456
  port: 
    - 3306
    - 33306
```

Chúng ta sẽ  thực hiện lệnh sau
```bash
create_variables database.yml "config_"
echo $config_default_adapter      # Được tạo thành từ giá trị prefix, key :default và key key :adapter

for element in "${config_default_port[@]}"
do
  echo $element
done
```

Kết quả
```
mysql2
3306
33306
```

Các bạn có thể sử dụng file [mẫu](https://github.com/jasperes/bash-yaml/blob/master/test/file.yml) để thử các case các.

Trên đây là một số hàm mình mới tìm hiểu được. Cảm ơn các bạn đã theo dõi.