When editing JSON or writing any source code, I always want to add comments, I thought that it would be easier to keep tracking and make fewer mistakes, so I tried to create a program that opens JSON with comments in Python (or a program to delete comments) .

What you are doing is just deleting comments (ignoring the comment symbols in double quotes) and then reading them, so you can apply it to CSV.

Writing comments is similar to C and C ++.

Line comment → `// line`

Block comment → `/* block */`

Note: As far as i know, there seems to be a data format called **`YAML`** that can perform comments, so that is also one of the options.

# Source code:

I will take one character from the string respectively, and judge whether or not it is contained in the comment. Comment marks surrounded by double quotation marks can be ignored. I use a lot of flags. Please let me know if you find a bug:


```
"""
Comment out method
take care characters one by one, then delete the comment
input:
string: string that contains comment
quot_invalid: Comment marks surrounded by double quotation marks can be ignored
output: string that has comments deleted
"""
def comment_out(string, quot_invalid=True):
    o_s = "" #string that has comments deleted
    slash_start_flag = False # flag showing if the previous character is slash or not
    slash_asterisk_delete_flag =  False # flag showing if is in block comment or not
    slash_asterisk_end_flag = False # flag showing if the previous character in the block comment is the asterisk or not
    double_slash_delete_flag = False # flag showing if is in line comment or not
    in_dq_flag = False # flag showing if is in double quote or not
    for c in string:
        if in_dq_flag and quot_invalid:
            o_s += c
            if c == '"':
                in_dq_flag = False
        elif slash_asterisk_end_flag:
            if c == "/":
                slash_asterisk_delete_flag = False
            slash_asterisk_end_flag = False
            if c == "*":
                slash_asterisk_end_flag = True
        elif slash_asterisk_delete_flag:
            if c == "*":
                slash_asterisk_end_flag = True
        elif double_slash_delete_flag:
            if c == "\n":
                o_s += "\n"
                double_slash_delete_flag = False
        else: # when not being in comment, or comment starting with '/'(slash) or '*'(asterisk)
            if slash_start_flag:
                if c == "*":
                    slash_asterisk_delete_flag = True
                elif c == "/":
                    double_slash_delete_flag = True
                else:
                    o_s += "/" + c
                    if quot_invalid and c == '"':
                        in_dq_flag = True
                slash_start_flag = False
        elif c == "/":
            slash_start_flag = True
        else:
            o_s += c
            if quot_invalid and c == '"':
                in_dq_flag = True
#delete the blank line
return '\n'.join(filter(lambda x: x.strip(), o_s.split('\n')))
```
    
   # Source code using regular expressions
   
The above source code is taught in comment. I use regular expressions and the code is short and easy to understand. It returns the same output as when the above method's `quot_invalid` is `false`. Comment symbols in double quotes are not ignored.
```
import re

def comment_out(string):
    # Delete block comment
    string = re.sub(r'/\*.*?\*/', r'', string, flags=re.DOTALL)

    # delete line comment
    string = re.sub(r'//.*\n', r'\n', string)
    return '\n'.join(filter(lambda x: x.strip(), string.split('\n')))
```

# Executing result:
That is an execution example. Comment disappears when `comment_out` is used. Here is the result when `false` is inserted as the second argument.
```
string = '''/*
this is sample of JSON
*/
{
    "name":"asasan",//this is name
    "comment_test":"this will remains /*this will be deleted*/"
}
'''
print(comment_out(string,quot_invalid=False))


====executing result====

{
    "name":"asasan",
    "comment_test":"this will remains"
}
```
In the upper column, the comment marks in the part surrounded by double quotes are also deleted without being ignored. To ignore the comment mark in the part enclosed by double quotation, put `true` in the second argument. The default is `true`.

```
string = '''/*
samle of JSON
*/
{
    "name":"asasan",//this is name
    "comment_test":"this will remain /*this will also remain */"
}
'''
print(comment_out(string,quot_invalid=True))

====executing result====

{
    "name":"asasan",
    "comment_test":"this will remain /*this will also remain */"
}
```

When reading from a file, the value is stored in json_data as below.

```
import json
f = open('sample.json')
string = f.read()
f.close()
json_data = json.loads(comment_out(string))
```