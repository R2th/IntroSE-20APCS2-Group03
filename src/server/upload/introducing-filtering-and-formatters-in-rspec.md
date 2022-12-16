### I. Introduction
Rspec is a framework use to testing for Ruby. It's  a little bit different to another frameworks by easy to read syntax and understanding by people who do not have much programming knowledge. Rspec mostly focus on  how you describe the behavior of your application and it does't mention about your process or flow in your application. In this article, I will show you about 2 feature in rspec: **filtering** and **formatter**. 

### II. Filtering
Every example in Rspec has associated metadata and you can append arbitrary information to it. By add metadata with any value you want, you can run rspec and filtering them by value you set to metadata.
Example: now we have a file rspec: spec/sample_spec.rb as below:
```
require "spec_helper"

describe "Testing" do
  it "example 1" do
  end

  it "example 2" do
  end
end
```
After the test run sample_spec.rb we get the results:

```
..

Finished in 0.00168 seconds
2 examples, 0 failures
```
Now we add metadata `first and second` into our file `sample_spec.rb` as below:
```
require "spec_helper"

describe "Testing" do
  it "example 1", first: true do
  end

  it "example 2", second: true do
  end
end
```
By adding the metadata , now you can filter example to run by command below:
- In case: `first: true`
```
rspec --tag first sample_spec.rb
```
you can see the result only example was run:
```
Run options: include {:first=>true}
.

Finished in 0.00124 seconds
1 example, 0 failures
```
- In case: `second: true` and result as below:
```
Run options: include {:second=>true}
.

Finished in 0.00124 seconds
1 example, 0 failures
```

### III. Formatters
Formatters allow RSpec to display test results output in a variety of ways. Rspec provide you some formatters and use it with output result that you want . Another way, RSpec allows customization of the output by creating your own Formatter class.
Below are some Formatters that you can use in Rspec:
* `progress (default)` - Prints dots for passing examples, F for failures, * for pending.
* `documentation` - Prints the docstrings passed to describe and it methods (and their aliases).
* `html`
* `json` - Useful for archiving data for subsequent analysis.
The progress formatter is the default, anyway you can choose one or more of the other formatters by passing with the `--format` (or -f for short) command-line option.
```
rspec --format documentation
rspec --format documentation --format html
```

Suppose we have a file `spec/sample_spec.rb`:
```
require "spec_helper"

describe "Testing" do
  it "example 1" do
  end

  it "example 2" do
  end
end
```

Let's try running with option `--format progress`:
```
rspec --format progress spec/sample_spec.rb
```
After we run the command you can see no different to what we run without `--format progress`. Rspec will set ` --format progress` as defualt format.
```
..

Finished in 0.00205 seconds
2 examples, 0 failures
```
Let's try running with option `--format documentation`:
```
rspec --format documentation spec/sample_spec.rb
```
Result:
```
Testing
  example 1
  example 2

Finished in 0.00169 seconds
2 examples, 0 failures
```
### IV. Conclusion
I hope this article can help all of you to understand more about Rspec freature. Especially, about the 2 feature that i talk above:
- How to filtering example that you want to run by add metadata.
- How to format the output result with Rspec formatters.