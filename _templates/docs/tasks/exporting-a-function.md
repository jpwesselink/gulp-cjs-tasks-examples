### Exporting a function

Another way to create a task module is by exporting a function which takes `gulp`
as an argument, so you can have access to other gulp tasks. Next to that any
subsequent arguments are passed to the tasks modules as well. This can come in
handy to pass along plugin loaders, state modules or any other useful purpose
you can come up with.

<%= js.exportingAFunction %>

Here's a small example using a task loader with multiple arguments. You can find
the actual example in `./examples/passing-multiple-arguments`.

<%= examplesJs.gulpfile %>

<%= examplesJs.multiple %>

To try this setup change your working directory to `./examples/passing-multiple-arguments`.

```bash
$ cd examples/passing-multiple-arguments
$ gulp multiple
```
