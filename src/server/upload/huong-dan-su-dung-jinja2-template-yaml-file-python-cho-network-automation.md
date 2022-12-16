### Giới thiệu:
>     Jinja2 is a powerful templating language for Python. If you are in network automation business you are going to love it I guarantee it. Using Jinja2 you can build a template which uses variables instead of hard coded values, Jinja2 then automagically renders template using variable values. Variable values either comes from Python dictionary or yaml file. Jinja2 also allows you to add control statements like ‘for’ loop & ‘If’ statement to create logic in template file.

### 1. Một số câu lệnh Jinja2:

**Variable:**
biến bắt đầu với {{ tên biến và kết thúc với }}
example: tạo biến có tên interface {{ interface }}

**For loop:**
câu lệnh for bắt đầu với {% for statement %} và kết thúc với {% end %}
example: {% for interface in interfaces %}  … {% endfor %}

**If statement:**
Câu lệnh if bắt đầu với {% if statement %} và kết thúc với {% endif %}
example: {% if interface == ‘ge-0/0/2’  %}  …  {% endif %}

**Comment:**
comment starts with ‘{#’ and ends with ‘#}
example: {# set description only for interface ge-0/0/2 #}
 
**Cài đặt:**
pip install jinja2 ( cho python 2.7 )
pip3 install jinja2 ( cho python > 3.6 )

### 2. Các bước thực hiện:
**Bước-1: ** Tạo file Jinja2 template với tên interfaces.j2. Thêm nội dung vào file interfaces.j2, ở đây tôi tạo một mẫu xml nhưng nó có thể là bất kì format:
 ```
<interfaces>
 {% for interface in interfaces %}
      <interface>{{interface}} 
          <description> {{description}} </description>
      </interface>
 {% endfor %}
</interfaces>
```
**Bước-2:** mở terminal hoặc command-line và start python ( ở đây tôi đang dùng terminal trên Linux ), Import packages, set environment và load jinja2 template:
```
$ python3
Python 3.6.7 (default, Oct 22 2018, 11:32:17) 
[GCC 8.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import jinja2
>>> import yaml
>>> import os
>>> from lxml import etree
>>> templateFilePath = jinja2.FileSystemLoader(os.getcwd())
>>> jinjaEvn = jinja2.Environment(loader=templateFilePath, trim_blocks=True, lstrip_blocks=True)
>>> jTemplate = jinjaEvn.get_template('interfaces.j2')
>>> config = {
...         'interfaces' : ['ge-0/0/1', 'ge-0/0/2', 'ge-0/0/3'], 
...         'description': 'interface configured using jinja2 template'
...     }
>>> print(jTemplate.render(config))
<interfaces>
      <interface>ge-0/0/1 
          <description> interface configured using jinja2 template </description>
      </interface>
      <interface>ge-0/0/2 
          <description> interface configured using jinja2 template </description>
      </interface>
      <interface>ge-0/0/3 
          <description> interface configured using jinja2 template </description>
      </interface>
</interfaces>
>>> 
```
Ngoài ra bạn có thể render bằng cách sau:

```
>>> print(jTemplate.render(
...         interfaces={'ge-0/0/1', 'ge-0/0/2', 'ge-0/0/3'}, 
...         description= 'interface configured using jinja2 template'
...         ))
<interfaces>
      <interface>ge-0/0/2 
          <description> interface configured using jinja2 template </description>
      </interface>
      <interface>ge-0/0/1 
          <description> interface configured using jinja2 template </description>
      </interface>
      <interface>ge-0/0/3 
          <description> interface configured using jinja2 template </description>
      </interface>
</interfaces>
>>> 
```


Bước-3: Bạn có thể configuration đến file thay cho biến config ở trên để khi cần thay đổi không phải vào sửa lại code:
Tạo **interfaces.yaml** file để lưu lại các thông tin cấu hình
```
---
interfaces:
- ge-0/0/1
- ge-0/0/2
- ge-0/0/3
description:
 "configured by using jinja2 & yaml"
```
Đọc yaml file trong Python
```
>>> templateVars = yaml.load(open('interfaces.yaml').read())
>>> print(jTemplate.render(templateVars))
<interfaces>
      <interface>ge-0/0/1 
          <description> configured by using jinja2 & yaml </description>
      </interface>
      <interface>ge-0/0/2 
          <description> configured by using jinja2 & yaml </description>
      </interface>
      <interface>ge-0/0/3 
          <description> configured by using jinja2 & yaml </description>
      </interface>
</interfaces>
>>> 
```

Vậy là đến đây bạn đã biết sử dụng Jinja2 template - Yaml File - Python cho network automation.

Tham Khảo:
- Welcome to Jinja2: http://jinja.pocoo.org/docs/dev/
- Lab-10:Python for network automation -using Jinja2 template and YAML file: https://sunnynetwork.wordpress.com/2016/03/17/lab-10jinja2-template-and-yaml-file/