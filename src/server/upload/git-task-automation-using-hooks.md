![](https://images.viblo.asia/232aa900-c3e5-41a1-a6b0-67e15bd70185.png)

Git hooks are event callbacks that fire when an important event occurs (e.g. *a commit is made*, *a rebase is about to take place*, etc.). Hooks can be classified into,

- Server hooks
- Client hooks

As the name implies, client hook executes on the local repository, where server hook executes on the remote server. In this article, we'll briefly go through the features, usage and example usage scenarios of some client git hooks.

Hooks are powerful as they provide access to the critical transition points of a git operation flow. Many repetitive tasks can be automated by utilizing hooks. To name such,

- Performing static checks before a push
- Generating commit message before a commit
- Generating documentation on commit

## Client Hooks

Client hooks are usually stored in the `.git/hooks` sub-directory, in a repository. Initially, the following hook templates are provided with each repository.

- `applypatch-msg.sample`
- `commit-msg.sample`
- `post-update.sample`
- `pre-applypatch.sample`
- `pre-commit.sample`
- `prepare-commit-msg.sample`
- `pre-push.sample`
- `pre-rebase.sample`
- `update.sample`

Any script (e.g. *bash*, *ruby*, *python*, ...) will work as git hook, as long as the formatting is correct, and execution runtime is available.

### Installing a Hook

Each hook name must represent the associated hook type. For an example, if we want to deploy a `pre-push` hook, we need to put the script exactly in the following file.

`.git/hooks/pre-push`

And, the hook file must be executable.

In order to install a dummy `pre-commit` hook, we can do the followings.

```bash
$ cd $PROJECT_ROOT
$ printf '#!/bin/sh\necho "Hook invoked!"' > .git/hooks/pre-commit
$ chmod +x .git/hooks/pre-commit
```

### Usage Scenarios

#### Example scenario #1: Generate default commit message

Consider a project that has a commit message template. In general, we need to repeatedly type the commit message before commiting.

Using hooks, it is possible to entirely skip writing the commit message during each commit.

Consider the following Ruby implementation of the `prepare-commit-msg` hook that prepares the default git commit message for us.

```ruby
#!/usr/bin/env ruby

File.open(ARGV.first, "w"){|file| file.write Time.now.strftime("%F %T Bump")}
```

The above hook prepare a default commit message, that can be edited as necessary, or we can just skip writing the commit message altogether! :) This way, in order to commit, we just need to invoke the followings,

```bash
git commit --no-edit
```

Please note that, in order to install the above hook we must put it in `.git/hooks/prepare-commit-msg` file, and make the file executable (e.g. by running `chmod +x .git/hooks/prepare-commit-msg`)

#### Example scenario #2: Build Docusaurus documentation on markdown change

Consider a project where documentation is written in Markdown, and the project script can automatically build HTML equivalent for the documentation (e.g. [Docusaurus](https://docusaurus.io/)).
Developer may want to track markdown and synchronized HTML, both.

The non-hook solution will be to run the build script manually, every time there is a change in the documentation.

But, if we use git client hook, we may skip the entire flow, since hook will take care of the file change checking and building, automatically.

An example bash script implementation of the above mentioned hook may look as follows.

```bash
#!/bin/sh
root_dir=$(git rev-parse --show-toplevel)
doc_app_dir="$root_dir/documentation/website"
doc_build_dir="$root_dir/docs"
target_dir_patt="documentation/"

if git diff --cached --name-only | grep --quiet "$target_dir_patt"
then
  echo "Rebuilding docs before committing changes..."
  (cd $doc_app_dir && npm run build)
  git add $doc_build_dir
fi

exit 0
```

Let's go through the code a bit.

The bash script above collects references of relevant project directories.

```bash
root_dir=$(git rev-parse --show-toplevel)
doc_app_dir="$root_dir/documentation/website"
doc_build_dir="$root_dir/docs"
target_dir_patt="documentation/"
```

Then, it checks for any documentation (markdown) change in the `target_dir_patt`.

```bash
if git diff --cached --name-only | grep --quiet "$target_dir_patt"
```

Then, if changes are found, it rebuilds the documentation. And, on a successful build, it stores the build files in `doc_build_dir`.

```bash
  echo "Rebuilding docs before committing changes..."
  (cd $doc_app_dir && npm run build)
```

And, finally, the generated changes are staged for commit.

```bash
  git add $doc_build_dir
```

We return the exit code `0` immediately before EOF to indicate a successful execution.

Our hook will effectively track the changes and build without developer's intervention, which effectively increases the productivity.

### Some Significant Hooks

#### Committing-Workflow Hooks

##### `pre-commit` Hook

###### Usage

- Used to inspect the snapshot that is about to be committed
- Used to check if something is forgotten
- Code style (e.g. `lint`) can be checked
- Trailing whitespace check (default hook)
- To make sure that tests are run
- Check appropriate documentation on new methods

###### Execution

This hook runs before a commit, before commit message is provided

###### Behavior

Exiting non-zero from this hook aborts the commit

##### `prepare-commit-msg` Hook

###### Usage

- Can be used to edit the default message before commit author sees it
- Can be used in conjunction with a commit template to programmatically insert information

**NOTE**

- Not usually useful for normal commits
- Useful for commits where default messages are auto-generated (e.g. templated commit messages, merge commits, squashed commits, amended commits)

###### Execution

Runs before commit message editor is fired up, but after the default message is created

###### Parameters

- Path to the file that holds commit message
- Type of commit
- Commit SHA-1, if this is an amended commit

##### `commit-msg` Hook

###### Usage

- Can be used to validate project state or commit message
- Can be used to check that commit message is conformant to a required pattern

###### Parameters

Path to a temporary file that contains the commit message written by the developer

###### Behavior

If script exits non-zero, git aborts the commit process

##### `post-commit` Hook

###### Usage

- Usually used for notification or something similar

###### Execution

Runs after the entire commit process is completed

###### Parameters

- None

###### Features

Last commit can be retrieved by running `git log -1 HEAD`

#### Other Hooks

##### `pre-rebase` Hook

###### Usage

- Can be used to disallow rebasing any commit that have already been pushed

###### Execution

Runs before anything is rebased

###### Behavior

Non-zero exit halts the rebase process

##### `post-rewrite` Hook

###### Usage

- Has identical usage like `post-checkout` and `post-merge` hooks

###### Execution

Runs by commands that replace commits (e.g. `git commit --amend`, `git rebase`)

**Warning**: This hook is not run by `git filter-branch`

###### Parameters

- The command that triggered the rewrite
- Also receives a list of rewrites on `stdin`

##### `post-checkout` Hook

###### Usage

- Can be used to setup working directory properly for project environment
- Example includes,
  - Moving in large binary files that are not source controlled
  - Auto generating documentation or something of that sorts

###### Execution

Runs after a successful `git checkout`

##### `post-merge` Hook

###### Usage

- Can be used to restore data in the working tree that Git can't track (e.g. permission data)
- Can be used to validate the presence of files external to Git control that may need to be copied in when working tree changes

###### Execution

Runs after a successful `merge`

##### `pre-push` Hook

###### Usage

- Can be used to validate a set of ref updates before a push occurs

**WARNING**: Updating commit (e.g. amend) will not be effective, cause, only the original commit gets submitted, regardless of any change in the hook

###### Execution

Runs during `git push`, after the remote refs have been updated, but before any objects have been transferred.

###### Parameters

- Name of the remote
- Location of the remote
- List of to-be-updated refs through `stdin`

###### Behavior

- A non-zero exit code aborts the push

##### `pre-auto-gc` Hook

###### Usage

- Can be used for notification
- Can be used to abort

###### Execution

Occasionally Git does garbage collection as part of its normal operation. This hook runs before garbage collection process takes place

## Bypassing Hooks

One of the advantage of Git client hook includes it's flexibility. For an example, when hooks are installed, you may need to skip the callback during a certain git operation. You may simply achieve this by using the `--no-verify` flag with the git command. This will bypass all the associated hooks.

```bash
git commit --no-verify # No hooks will be triggered
```

---

Hooks can be integrated as a part of the development workflow to accelerate the development process. It is advantageous to use since it provides the flexibility of developing script in virtually any language with the expected runtime support. Give it a try, and, happy hacking! :)

## References

- Git-SCM: https://git-scm.com/docs/githooks
- MAN page: http://man7.org/linux/man-pages/man5/githooks.5.html