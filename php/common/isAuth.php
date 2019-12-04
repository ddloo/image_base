<?php 
function isAuth()
{
    //当前是否有会话,没有则创建一个
   if(session_start() === PHP_SESSION_NONE){
        session_start();
   }
   //是否已经登录
   if(isset($_COOKIE['username'])){
       $_SESSION['username'] = $_COOKIE['username'];
   }

   if(isset($_SESSION['username'])){
       return true;
   }
   return false;
}