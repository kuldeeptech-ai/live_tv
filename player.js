<!DOCTYPE html>
<html>
<head>
<title>Admin Panel</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body class="admin-body">

<div id="login" class="card">
  <h3>Admin Login</h3>
  <input type="password" id="pass" placeholder="Password">
  <button onclick="login()">Login</button>
</div>

<div id="panel" class="hidden">
  <h3>Edit channels.json</h3>
  <textarea id="editor"></textarea>
  <button onclick="info()">Save</button>
</div>

<script src="js/admin.js"></script>
</body>
</html>