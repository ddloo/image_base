<?php
//入口文件
class app{
    public static $host = "localhost";
    public static $admin = "root";
    public static $password = "";
    public static $port = "3306";
    public static $db = "ddloowallpaper";
    public static $base = __DIR__;
}

$handle = $_GET['handler'];
$method = $_GET['method'];

include_once(app::$base."/handle/".$handle.".php");

$method();