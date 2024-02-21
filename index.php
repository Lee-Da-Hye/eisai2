<!DOCTYPE html>
<html>
<head>
<title>한국에자이</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,user-scalable=no" />
<meta charset="UTF-8" />

<!-- Global CSS -->
<link href="/src/reset.css?<?=time()?>" type="text/css" rel="stylesheet" />
<link href="/src/common.css?<?=time()?>" type="text/css" rel="stylesheet" />
<!-- /Global CSS -->
<?php if (isset($_GET['sub'])) {?>
<link href="./src/<?=$_GET['sub']?>.css?<?=time()?>" type="text/css" rel="stylesheet" />
<?php } else { ?>
<link href="./src/main.css?<?=time()?>" type="text/css" rel="stylesheet" />
<?php }?>
<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
<link rel="shortcut icon" href="/htdocs/images/common/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="57x57" href="/htdocs/images/common/apple-icon-57x57.png">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script type="text/javascript" src="/src/common.js?<?=time()?>"></script>
<script type="text/javascript" src="/src/fadeIn.js?<?=time()?>"></script>
</head>
<body>
<!-- 상단 영역 -->
<header id="navBar">
<?php
    include('inc/header.php');
    ?>
</header>
<!-- /상단 영역 -->
<!-- 콘텐츠 영역 -->

<main>
        <?php
        if(isset($_GET['sub'])) {
            include "./sub/{$_GET['sub']}.php";
        } else {
            include "./main.php";
        }
        ?>
</main>
<!--/콘텐츠 영역-->
<!--하단 영역-->
<footer>
<?php
    include('inc/footer.php');
    ?>
</footer>
<!--/하단 영역-->

</body>
</html>