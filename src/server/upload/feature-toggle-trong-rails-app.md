1. Feature Toggle là gì?

Feature Toggle(Feature Flag) là một kỹ thuật cho phép bạn có thể tắt một số chức năng của ứng dụng, thông qua setting mà không cần phải deploy code mới.

2. Khi nào sử dụng Feature Toggle
- Bạn muốn trình bày một số tính năng đã phát triển cho product owner, sales hay support teams, việc thực hiện điều đó dễ dàng hơn trên một hệ thống thực, với dữ liệu thực tế và không hợp nhất nhiều branch.

- Khi bạn làm việc trên một tính năng lớn và commit trực tiếp lên master. Chỉ cần disbale tính năng mới trên production env để không phải public những tính năng mới đó.
- Bạn tạo giải pháp chuyên dụng cho khách hàng chính của nền tảng mà bạn đang làm việc. Chỉ cần enable tính năng cho người dùng

Một vài ừng dụng thực tế:
Feature Control: Tắt/bật tính năng cho toàn bộ hệ thống, hoặc một vài khách hàng cụ thể
Feature rollout một tính năng từ từ cho tập user của mình, có thể trước mắt cho 1 vài user cụ thể, rồi sau đó user trong một nước/region nào đó.

4. Implement
```
class FeatureToggle
  def initialize
    @flags = Hash.new
  end

  def with(name, *args, &block)
    block.call if on?(name, *args)
  end

  def on?(name, *args)
    @flags.fetch(name, proc{|*_args| false }).call(*args)
  end

  def for(name, &block)
    @flags[name] = block
  end
end
```

Defining toggles

```
FT = FeatureToggle.new.tap do |ft|
  ft.for(:new_user_profile) do |user_id:|
    Admin.where(user_id: user_id).exists?
  end
end
```

Enable Feature Toggle

```
class UserProfilesController < ApplicationController
  def show
    FT.with(:new_user_profile, user_id: current_user.id) do
      return render :new_user_profile, locals: { user: NewUserProfilePresenter.new(current_user) }
    end

    render :show, locals: { user: UserProfilePresenter.new(current_user) }
  end
end
```