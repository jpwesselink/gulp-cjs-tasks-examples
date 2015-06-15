<%= title %>
<%= introduction %>
<%= about.installation %>

## Rationale

- Module with task with a callback
- Module with task with a promise
- Module with task which exports an object, without gulp
- Module with task which exports a function, with gulp

## Task modules
###
<%= tasks.generic %>
<%= tasks.promised %>
<%= tasks.exportingAnObject %>
<%= tasks.exportingAFunction %>

## Optional arguments

// simple example
// inherited arguments

## Sequences

// simple example
// elaborate example
## Dependencies
## Prioritization

<%= tasks.priorities %>

## Self generating documentation
<%= k.map(function(task){ console.log(task); }) %>
<%= tasks.help %>



<%= tasks.readme %>

## About

<%= about.versionAlignment %>
<%= about.todo %>
