Mojo Ninja
--------------

Mojo Ninja is a super simple mojo playground.

All you need to do is to copy your BIWebApp `javascript` folder to the root of this project.

Write down your code in index.html as:

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Mojo Ninja - Mojo Playground</title>
  <link href="/javascript/mojo/css/core.css" type="text/css" rel="stylesheet">
</head>
<body>
  <script>
  // Your code goes here, something magical will happen
  mstrmojo.requiresCls('mstrmojo.Widget');
  </script>
</body>
</html>
```

You will get the page as below once you hit the server:

```
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Mojo Ninja - Mojo Playground</title>
	<link href="/javascript/mojo/css/core.css" type="text/css" rel="stylesheet" />
	<script src='/javascript/mojo/js/source/mstrmojo.js'></script>
	<script src='/javascript/mojo/js/source/hash.js'></script>
	<script src='/javascript/mojo/js/source/Base.js'></script>
	<script src='/javascript/mojo/js/source/registry.js'></script>
	<script src='/javascript/mojo/js/source/array.js'></script>
	<script src='/javascript/mojo/js/source/publisher.js'></script>
	<script src='/javascript/mojo/js/source/_Provider.js'></script>
	<script src='/javascript/mojo/js/source/Obj.js'></script>
	<script src='/javascript/mojo/js/source/_LoadsScript.js'></script>
	<script src='/javascript/mojo/js/source/Binding.js'></script>
	<script src='/javascript/mojo/js/source/_HasBindings.js'></script>
	<script src='/javascript/mojo/js/source/string.js'></script>
	<script src='/javascript/mojo/js/source/dom.js'></script>
	<script src='/javascript/mojo/js/source/_HasMarkup.js'></script>
	<script src='/javascript/mojo/js/source/_HasTooltip.js'></script>
	<script src='/javascript/mojo/js/source/css.js'></script>
	<script src='/javascript/mojo/js/source/Widget.js'></script>
</head>
<body>
  <script>
  // Your code goes here, something magical will happen
  mstrmojo.requiresCls('mstrmojo.Widget');
  </script>
</body>
</html>
```

The server will help you resolve the dependencies recursively and add the script tag within the head of the page so that your mojo code is debuggable.
