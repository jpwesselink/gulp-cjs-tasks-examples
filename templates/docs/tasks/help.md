### tasks/help.js

You can automatically create a help task by `task-info`. See the `gulpfile.js` in the root of this project. The part that does the dirty work is this:

```js

var taskInfo = require('gulp-cjs-tasks/task-info');

taskInfo(gulp)
  .addHelpTask();

```

As you can see it the module will take the `gulp` object as an argument, and will 
<%= js.help %>
