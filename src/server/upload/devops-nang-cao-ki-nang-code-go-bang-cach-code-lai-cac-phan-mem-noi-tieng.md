## Giới thiệu
Cách học nhanh nhất chính là vừa làm vừa học. Nếu các bạn đang không biết phải làm gì để nâng cao kĩ năng và kiến thức về ngôn ngữ Golang, thì trong bài này mình sẽ giới thiệu cho các bạn một số tài liệu mà hướng dẫn cho ta cách tự viết lại các phần mềm nổi tiếng bằng Golang.

![image.png](https://images.viblo.asia/fad2ee30-4808-4b06-80c9-4cc2d62e80c8.png)

Những bài hướng dẫn này mình lấy từ github repo https://github.com/codecrafters-io/build-your-own-x, đây là một github repo rất nổi tiếng và rất hữu ích cho cộng đồng.

## Build BitTorrent Client
BitTorrent là một phần mền rất nổi tiếng phục vụ cho công việc file sharing. Đây là bài hướng dẫn giúp ta tự viết một phần mền BitTorrent của riêng mình sử dụng ngôn ngữ Golang.

[Building a BitTorrent client from the ground up in Go](https://blog.jse.li/posts/torrent/)

![image.png](https://images.viblo.asia/99ef9d51-6dc0-46f7-9445-7d8d70512374.png)

## Build Blockchain/Cryptocurrency
Blockchain chắc không còn gì xa lạ nếu chúng ta học IT, đây là một chủ để rất hot trong những năm gần đây. Và vì blockchain mà developer nhảy qua hết đi code blockchain, để lại hậu quả là mảng khác quá thiếu dev `:)))`. Đây là loạt bài hướng dẫn về cách xây dựng blockchain bằng Go.

[Building Blockchain in Go](https://jeiwan.net/)

![image.png](https://images.viblo.asia/35fa716e-6d57-45ba-80ab-83c32c5cb1ea.png)

## Build Command-Line Tool
Tiếp theo là những bài hướng dẫn ta xây dựng các công cụ CLI, khi viết các công cụ CLI ta sẽ hiểu rõ hơn phần nào về hệ thống. Dưới đây là bốn bài hướng dẫn ta xây dựng bốn công cụ CLI khác nhau.

[Visualize your local git contributions with Go](https://flaviocopes.com/go-git-contributions/)

[Build a command line app with Go: lolcat](https://flaviocopes.com/go-tutorial-lolcat/)

[Building a cli command with Go: cowsay](https://flaviocopes.com/go-tutorial-cowsay/)

[Go CLI tutorial: fortune clone](https://flaviocopes.com/go-tutorial-fortune/)

![image.png](https://images.viblo.asia/71e0ee78-3f8d-45b5-9de6-ba6edf81dd44.png)

## Build Container
Bài hướng dẫn về cách tự viết Container Runtime bằng Go là bài hay nhất mà mình đã đọc, trong bài này tác giả sẽ giải thích cho ta cách Container làm việc như thế nào, nó có những gì và làm sao dùng Golang để xây dựng nên những thứ đó, **bài này cực hay**. Đây đúng là bài viết mà sẽ giúp bạn phần nào trở nên hiểu rõ hơn về ngôn ngữ Golang và cách làm việc của Linux OS. Thank Julian Friedman and Liz Rice.

[Build Your Own Container Using Less than 100 Lines of Go](https://www.infoq.com/articles/build-a-container-golang/)

[Building a container from scratch in Go - Video](https://www.youtube.com/watch?v=8fi7uSYlOdc)

![image.png](https://images.viblo.asia/183e544d-8eb2-4d64-a65a-6c6db1e63ec5.png)

## Build Game
Các bạn có bao giờ nghĩ rằng Golang có thể dùng để viết Game chưa? Nếu chưa thì bài này sẽ hướng dẫn các bạn.

[Games With Go - Video](https://www.youtube.com/watch?v=9D4yH7e_ea8)

![image.png](https://images.viblo.asia/333961ca-7001-49ec-a5c6-2f578f25703f.png)

## Build Neural Network
Nếu bạn làm AI thì chắc chắn phải biết Neural Network (mình thì không biết nhé 😂), thông thường ta sẽ viết bằng Python, nếu các bạn muốn thử thách bản thân mình thì hãy thử xây dựng một AI Model bằng Go nhé, mình thì chưa đủ trình 🤣.

[Build a multilayer perceptron with Golang](https://made2591.github.io/posts/neuralnetwork)

[How to build a simple artificial neural network with Go](https://sausheong.github.io/posts/how-to-build-a-simple-artificial-neural-network-with-go/)

[Building a Neural Net from Scratch in Go](https://datadan.io/blog/neural-net-with-go)

![image.png](https://images.viblo.asia/3a5ef4b4-c6e2-4da3-8599-952c8720cf7a.png)

## Build Shell
Shell giải thích đơn giản nhất là một Interface để user thao tác với OS thông qua command line. Bài này sẽ chỉ bạn tự viết một Shell Interface bằng Go, sau khi đọc xong bạn sẽ hiểu rõ hơn về cách OS làm việc.

[Writing a simple shell in Go](https://sj14.gitlab.io/post/2018/07-01-go-unix-shell/)

Trong bài này Simon Jürgensmeyer sẽ chỉ ta tự code lại một Shell Interface đơn giản chỉ với ít hơn 80 dòng code.

```main.go
package main

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"os/user"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	for {
		path, err := os.Getwd()
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}

		hostname, err := os.Hostname()
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}

		currentUser, err := user.Current()
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}

		path = strings.Replace(path, "/home/"+currentUser.Username+"", "~", -1)

		fmt.Printf("%s@%s:%s$ ", currentUser.Username, hostname, path)

		// Read the keyboad input.
		input, err := reader.ReadString('\n')
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}

		if err := execInput(input); err != nil {
			fmt.Fprintln(os.Stderr, err)
		}
	}
}

func execInput(input string) error {
	input = strings.TrimSuffix(input, "\n")

	args := strings.Split(input, " ")

	switch args[0] {
	case "cd":
		if len(args) < 2 {
			return errors.New("path required")
		}

		return os.Chdir(args[1])
	case "exit":
		os.Exit(0)
	}

	cmd := exec.Command(args[0], args[1:]...)

	cmd.Stderr = os.Stderr
	cmd.Stdout = os.Stdout

	return cmd.Run()
}
```

Sau khi đọc xong bài này thì mình đã biết được một điểm mà mình học Linux mấy năm cũng không ngờ tới `:)))`. **There is no real cd program**.

## Build Load Balancer
Load Balancer chắc không còn xa lạ với các bạn làm về hệ thống, Load Balancer sẽ giúp ta chia tải request về các server khác nhau. Tự viết Load Balancer sẽ giúp bạn nắm rõ hơn rất nhiều các kiến thức về hệ thống. Đây là bài hướng dẫn ta tự xây dựng Load Balancer bằng Go.

[Let's Create a Simple Load Balancer](https://kasvith.me/posts/lets-create-a-simple-lb-go/)

![image.png](https://images.viblo.asia/ddcbb08f-826a-4f75-bdb1-13eff49746dd.png)

English version [Improve your Golang skill by rewriting popular software](https://medium.com/@hmquan08011996/improve-your-golang-skill-by-rewriting-popular-software-cb715ef0226f). Please follow me on Medium page 😁.

## Kết luận
Trong bài này mình chỉ muốn giới thiệu tới các bạn những resource hữu ích cho việc học và cải thiện kĩ năng của mình, rất nhiều bài ở trên mình cũng chưa đọc tới 😁. Ngoài Go ra thì ở trong github repo mình giới thiệu ở trên còn rất nhiều bài hay khác viết bằng các ngôn ngữ khác nhau, các bạn hãy vào xem nhé, rất hữu ích cho anh em mình. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập từ tháng 8 năm 2021, ban đầu chỉ có hai sếp, một bạn Backend và một bạn Front-end, mình là thành viên thứ 5 và sau đó team từ từ đã có nhiều thành viên hơn. Với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).