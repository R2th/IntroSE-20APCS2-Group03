Trong 1 buổi học ngồi trong lớp rảnh rỗi ko có việc gì làm (thật ra là chẳng có wifi để có thể làm gì), mình đã thử nghịch ngợm 1 chút với Linux Terminal, và sau 2 tiếng mình đã có 1 chút thành quả. Hôm nay mình sẽ chia sẻ với mọi người 1 vài *funny command* trong Linux để nhỡ ai đó rơi vào trường hợp như mình (ngồi rảnh rỗi chả có j để làm) có thể lôi ra nghịch ^^

### 1. Xeyes
Các bạn hãy thử copy paste vào terminal 2 câu lệnh sau:
```
sudo apt-get install xeyes
xeyes
```
Câu lệnh này hơi boring 1 chút, nhưng cũng khá thú vị mà nhỉ :D

### 2. Con bò nói
Đùa chút thôi, thực ra câu lệnh của nó là *cowsay*. 
Câu lệnh này sẽ cho chúng ta 1 số hình ảnh vui nhộn, được vẽ bằng các ký tự, kể cả **Darth Vader** (tuy nhìn hơi giống bò - sorry các fan của StarWar).
Chạy 3 câu lệnh này trong terminal nhé :D
```
sudo apt-get install cowsay
cowsay -l
cowsay -f ghostbusters LinuxIsBest
```
Sử dụng lệnh ``` cowsay -l ``` sẽ cho chúng ta 1 list các hình ảnh có thể được vẽ: Vader, Dragon, Dragon&Cow, Cock ...
Các bạn hãy thử & chiêm ngưỡng kết quả nhé!

- Các bạn thử thêm lệnh sau nhé:
```
sudo apt-get install xcowsay
xcowsay You're pretty!
```

**Note**
Với các fan của StarWar, sẽ có 1 chút bất ngờ nho nhỏ ở phần cuối, vì vậy đừng vội vàng skip bài viết này nhé ^^

### 3. Cute Little Cat
Dành cho những bạn yêu mèo.
Mình sẽ ko spoil j đâu, như vậy sẽ phá hỏng trải nghiệm của các bạn.
Hãy thử chạy 2 câu lệnh sau trong terminal nhé:
```
sudo apt-get install oneko
oneko
```
Và hãy thử Alt-Tab ra Desktop và di chuột quanh màn hình xem sao.

### 4. Digital
- Digital Rain:
```
sudo apt-get install cmatrix
cmatrix
```
- Digital Fire:
```
sudo apt-get install aafire
aafire
```
- Check it yourself:
```
sudo apt-get install bb
bb
```

### 5. Colourful Clock
Cái tên nói lên tất cả rồi, chắc mình cũng ko cần nói dài dòng nữa nhỉ:
```
while true; do echo "$(date '+%D %T' | toilet -f term -F border --gay)"; sleep 1; done
while true; do clear; echo "$(date '+%D %T' | toilet -f term -F border --gay)"; sleep 1; done
```

### 6. Fork bomb **(DO NOT TRY THIS PLEASE!)**
Câu lệnh dưới đây thực sự là 1 quả bomb. Đừng nghịch dại nhé.
Nếu muốn thử, ít nhất bạn cũng nên google xem nó là gì đã.
```
:(){ :|:& }:
```

### 7. Asciiquarium
Cái này cài đặt sẽ hơi phức tạp 1 chút, nhưng khá đẹp. Và bạn có thể ngằm nó cả giờ =))
```
apt-get install libcurses-perl
cd /tmp 
wget http://search.cpan.org/CPAN/authors/id/K/KB/KBAUCOM/Term-Animation-2.4.tar.gz
tar -zxvf Term-Animation-2.4.tar.gz
cd Term-Animation-2.4/
perl Makefile.PL &&  make &&   make test
sudo chmod -R 777 /usr/share/
make install

cd /tmp
wget http://www.robobunny.com/projects/asciiquarium/asciiquarium.tar.gz
tar -zxvf asciiquarium.tar.gz
cd asciiquarium_1.1/
cp asciiquarium /usr/local/bin
chmod 0755 /usr/local/bin/asciiquarium

asciiquarium
```
Khá đẹp đúng không nào (love)

### 8. SL - Steam Locomotive
Try this:
```
sudo apt-get install sl
sl
```
### 9. Some nice quote
```
sudo apt-get install fortune
fortune
```

### 10. STARWAR
Với các fan của series Starwar, hãy thử cậy lệnh duới đây nhé. Mình đảm bảo nó sẽ ko làm các bạn thất vọng đâu.

***Welcome to TerminalCinema!***
```
telnet towel.blinkenlights.nl
```

Vừa rồi là 1 số câu lệnh khá hay trong Linux. Hy vọng những câu lệnh này sẽ giúp ích cho các bạn.
Thanks for watching!
## Source:
- https://www.unixmen.com/list-10-funny-linux-commands/
-  https://www.tecmint.com/linux-funny-commands/
-  https://www.tecmint.com/20-funny-commands-of-linux-or-linux-is-fun-in-terminal/