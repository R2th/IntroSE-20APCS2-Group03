# 1. Giới thiệu bài toán:
- Khi làm dự án tất cả các dữ liệu sẽ được xử lý thông qua model và lưu vào trong DB, ví dụ thông tin user, sản phẩm, hoá đơn ....
- Tuy nhiên cũng có 1 số dữ liệu đóng vai trò như master data của hệ thống và không cần lưu vào trong DB nhưng vẫn có nhu cầu được xử lý thông qua model, ví dụ 12 khối lớp, bảng chữ cái, ....
- Hôm nay mình sẽ giới thiệu 1 số cách mà mình đã xử lý bài toán trên.

# 2. Tabless Actice Record Model:
- Mình sẽ tạo class Letter và implement các hàm cần thiết như 1 model thật sự
    ```ruby
    # app/models/letter.rb
    class Letter
      class << self
        def all
          ("a".."z").map {|char| Letter.new(char)}
        end

        def find_by params
          all.detect {|letter| letter.char == params[:char] }
        end
      end

      attr_reader :char

      def initialize char
        @char = char
      end

      def to_params
        char
      end

      def products
        Product.where("name LIKE ?", "#{char}%")
      end
    end
    ```
- Ở đây mình đã implement 1 số hàm để `Letter` có thể được sử dụng như `ActiveRecord` của Rails.
    ```ruby
    Letter.all
    Letter.find_by(char: "a")
    Letter.find_by(char: "")
    letter = Letter.new("a")
    letter.products
    ```
- Bạn có thể tiếp tục implement thêm các methods khác như `Letter.first`, `Letter.last`, `letter.valid?`, .... 
- Bạn cũng có thể tạo LettersController cho Letter như model bình thường
    ```ruby
    # app/controllers/letters_controller.rb
    class LettersController < ApplicationController
      before_action :load_letter, only: :show

      def index
        @letters = Letter.all
      end

      def show
        @letters = Letter.all
        @products = @letter.products
      end

      private
      def load_letter
        @letter = Letter.find_by char: params[:id]
        return if @letter

        flash[:danger] = "Letter not found"
        redirect_to root_path
      end
    end
    ```
    
    ``` ruby
    # app/views/letters/index.html.erb
    <div class="container">
      <h3>Letter List</h3>

      <ul class="pager">
        <% @letters.each do |letter| %>
          <li><%= link_to letter.char.upcase, letter_path(id: letter.char) %></li>
        <% end %>
      </ul>
    </div>
    ```
    
    ```ruby
    # app/views/letters/show.html.erb
    <div class="container">
      <h3>Product List</h3>

      <ul class="pager">
        <% @letters.each do |letter| %>
          <li><%= link_to letter.char.upcase, letter_path(id: letter.char), class: ("active" if params[:id] == letter.char)  %></li>
        <% end %>
      </ul>

      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <% @products.each do |product| %>
            <tr>
              <td><%= product.id %></td>
              <td><%= product.name %></td>
              <td><%= product.description %></td>
              <td><%= number_to_currency product.price %></td>
            </tr>
          <% end %>
        </tbody>
      </table>
    </div>
    ```

- Kết quả thu được khi access vào action show.
![](https://images.viblo.asia/6c46f005-0d53-4326-8cf5-cb975d6a8d4e.png)

# 3. Source code:
- Github: https://github.com/thanhlt-1007/tabless_model
-