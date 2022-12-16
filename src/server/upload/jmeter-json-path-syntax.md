If you’re here, it’s probably because you need to extract variables from a Json response using **JMeter**.

Good news! You’re on the definitive guide to master **JMeter Json Extractor**. Complementary to our Rest API Testing Guide, you’ll learn everything you need to master Json **Path Expressions.**

Let’s go! And don’t panic, there is nothing difficult down there. :sunglasses:

# Json format
To get a better understanding of what Json is, here is an example Json document: 

![image.png](https://images.viblo.asia/539b5d29-9e99-4f1e-a6db-220296bcc623.png)

## Json path syntax


|1| JSON Path| Description |
| -------- | -------- | -------- |
|2| $   | The root object/element, all JSON Path usually start with this sign.   | 
|3| .   | Child operator, use this dot to move from parent to child.  | 
|4| [] | Using these braces, include with the index to access the elements of an array. Note: index of array start from 0 | 
|5| * | Wildcard. All objects/elements regardless their names. | 
|6| .. | Recursive descent |
|7| @ | Indicate the current object, element |
|8| ?() | Apply a filter (script) expression |

Now, I will show with you guys some examples:
1.  
Following the above Json example, I want to get name is "Zack" and age is 30 :
So, my Json path: $.name and $.age

2. 
I want to get Value of hobbies. So:
* $.hobbies[0] will return value "music"
* $.hobbies[1] will return value "football"
* $.hobbies[2] will return value "movies"

I have another example like that:
![image.png](https://images.viblo.asia/54576005-4f76-4675-a356-66d220e13734.png)


1. 
| JSON Path | Description |
| -------- | -------- | -------- |
| $.store.*     | All things, both books and bicycles|

![image.png](https://images.viblo.asia/fcf1e233-83f8-420f-8e79-026c670a586b.png)

2.
| JSON Path | Description |
| -------- | -------- | -------- |
| $.store..price   |The price of everything |

![image.png](https://images.viblo.asia/c43c6f06-214d-4747-99f2-8235c209f037.png)

3.
| JSON Path | Description |
| -------- | -------- | -------- |
| $..book[-2:]   |The second to last book |
![image.png](https://images.viblo.asia/bf8ac65a-771c-4911-ab09-8e2b610396a0.png)

4.
| JSON Path | Description |
| -------- | -------- | -------- |
| $..book[0,1]   |The first two books |

![image.png](https://images.viblo.asia/55ce37c7-39e0-47a9-b8bf-053dd21802a6.png)

5.
| JSON Path | Description |
| -------- | -------- | -------- |
| $..book[:2]   |All books from index 0 (inclusive) until index 2 (exclusive) |
![image.png](https://images.viblo.asia/16717090-90e4-4e86-a9b4-e0b3d697f5cb.png)

6.
| JSON Path | Description |
| -------- | -------- | -------- |
| $..book[1:2]   |All books from index 1 (inclusive) until index 2 (exclusive)|
![image.png](https://images.viblo.asia/aa691faa-9d53-4bad-9d79-6117a11a2993.png)

7.
| JSON Path | Description |
| -------- | -------- | -------- |
| $..book[2:]   |Book number two from tail|
![image.png](https://images.viblo.asia/15a53351-ec80-4047-84e8-9a24ea445de5.png)

8.
 |JSON Path | Description |
| -------- | -------- | -------- |
| $..book[?(@.isbn)]  |All books with an ISBN number|
![image.png](https://images.viblo.asia/36dbc89e-399c-4e60-93e9-0bda5a7b264a.png)

9.
|JSON Path | Description |
| -------- | -------- | -------- |
| $..book[?(@.price<10)] |All books in store cheaper than 10|
![image.png](https://images.viblo.asia/2a439316-0a0b-4ac6-88d1-9387df917cd0.png)

10.
|JSON Path | Description |
| -------- | -------- | -------- |
|  $..book[?(@.price <= $['expensive'])]  |All books in store that are not ”expensive”|

11.
|JSON Path | Description |
| -------- | -------- | -------- |
| $..book[?(@.author =~ /.*REES/i)]  |All books matching regex (ignore case)|
![image.png](https://images.viblo.asia/96c616c4-42df-4191-ac8d-80bf5330b445.png)

12.
|JSON Path | Description |
| -------- | -------- | -------- |
| $..* |Give me every thing|
![image.png](https://images.viblo.asia/5cd70f16-4222-4ee2-95e6-9ee54eb65207.png)

13.
|JSON Path | Description |
| -------- | -------- | -------- |
| $..book.length() |$..book.length()|