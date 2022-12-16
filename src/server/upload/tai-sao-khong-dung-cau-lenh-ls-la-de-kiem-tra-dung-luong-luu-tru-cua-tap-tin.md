## Giới thiệu 
Với người dùng Linux, có thể bạn đã từng giống mình, đó là khi kiểm tra dung lượng một tập tin/thư mục lần lượt bằng câu lệnh `ls` ( `exa` alternative) hay `du` (disk usage) thì nhận được hai kết quả khác nhau.

Ví dụ với câu lệnh sau:

```
echo "1" > foo.txt; exa -lh foo.txt |awk '{print $2}'; du foo.txt; du -h foo.txt

# alternative
echo "1" > foo.txt; ls -l foo.txt |awk '{print $5}'; ls -ls foo.txt | awk '{print $1}'; ls -lsh foo.txt | awk '{print $1}'
```

Ta được kết quả:
```
# exa
# Mình dùng exa thay cho ls command ở đây bởi vì exa show header, tiện hơn cho việc đọc còn về bản chất hai câu lệnh này là như nhau.
Size
2

# size in blocks
4	foo.txt
# human-readable size
4,0K	foo.txt
```

Đến đây chúng ta có thể thấy rằng, hai câu lệnh này không phải cho hai kết quả khác nhau mà là mình đã hiểu sai ý nghĩa thực sự của chúng. Đó là câu lệnh list (`ls` | `exa`) cho chúng ta biết **kích cỡ của nội dung chứa trong file** và câu lệnh `du` cho chúng ta biết **file chiếm bao nhiêu dung lượng lưu trữ trên ổ cứng**. Tuy nhiên thì những con số trên trông có vẻ không được thuyết phục lắm.
### Size  = 2KB dù chỉ có một ký tự.
Nếu xem những nhận định trên là đúng, thì file size chỉ là 1KB , mình đoán là file có chứa thêm ký tự đặc biệt ngoài số 1 nên mới xảy ra sự sai khác như trên. Chúng ta thử xem hexdump của file này xem có gì đặc biệt không nhé.
```
hexyl foo.txt

# alternative
xxd foo.txt
hexdump -C foo.txt
```

Ta được kết quả
![image.png](https://images.viblo.asia/7c470e7f-7c9f-41f5-94f8-2879810b78d1.png)

Check giá trị Hex:
![image.png](https://images.viblo.asia/1890a9ae-c596-4019-96fd-43ce8901bc98.png)

Hóa ra là ngoài số 1 còn có dấu xuống dòng nữa. Còn tại sao lại thế thì mình chưa rõ =)) Nếu bạn không dùng câu lệnh `echo` mà tự tạo file rồi điền số 1 vào một cách cẩn thận thì kết quả vẫn y hệt.

### Disk usage = 4KB.

Câu lệnh `du -h foo.txt` có thể viết lại một cách tương đương:
```
du --block-size=1024 foo.txt
```

Trong đó 1024 là default block size như được miêu tả trong man page:

```
man du

-B, --block-size=SIZE
              scale sizes by SIZE before printing them; e.g., '-BM' prints sizes in units of 1,048,576 bytes; see SIZE format below
              
Display values are in units of the first available SIZE from --block-size, and the DU_BLOCK_SIZE, BLOCK_SIZE and BLOCKSIZE environment variables.  Otherwise, units default to 1024 bytes  (or
       512 if POSIXLY_CORRECT is set).
```

Đầu tiên chúng ta phải hiểu rằng, khi nói đến size của một file thì chúng ta dùng đơn vị là byte như là đơn vị nhỏ nhất có thể đo lường được. Còn khi nói đến disk usage của một file thì chúng ta phải dùng đơn vị block-size, đây chính  là đơn vị nhỏ nhất là kernel có thể đọc/ghi data trên hard-drive. Tuy nhiên block-size=1024 ở trên là block-size theo quy ước của câu lệnh `du`, còn block-size của hard-drive thì bạn có thể kiểm tra với câu lệnh `tune2fs` như sau:

![image.png](https://images.viblo.asia/a3b88242-6360-408f-8655-baa6f0da4c4a.png)

Điều này có nghĩa rằng dù bạn có tạo một empty file đi chăng nữa thì cũng phải allocate 4KB disk space cho nó. Với `ext4` file system thì 4KB block-size là giá trị mặc định, giá trị này tăng dần từ các hệ thống file system `ext2`, `ext3` trước đó để đạt được hiểu quả sử dụng tối ưu.

![image.png](https://images.viblo.asia/a3a52d30-76d4-443f-ba7a-6e74a2f68f03.png)

## Directory size
Có một vấn đề khác liên quan đến việc check directory size bằng `ls` command nhưng bởi vì có kiến thức liên quan đến `VFS (Virtual File System)` nên mình xin được viết ở một bài khác . 

Thanks for reading.
## References
- https://stackoverflow.com/questions/23789031/size-vs-ls-la-vs-du-h-which-one-is-correct-size
- https://stackoverflow.com/questions/26666642/why-the-size-of-an-empty-directory-in-linux-is-4kb