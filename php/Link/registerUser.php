<?php

include_once("linkSql.php");
class registerUser extends linkSql{
    //连接数据库
    public function __construct()
    {
        parent::__construct();
    }
    //检查用户名,密码,邮箱格式是否正确
    public function isReg($username, $password, $eamil){
        //正则表达式
        $strEmail = '/^\w{2,}@\w{2,5}\.[a-zA-Z]{1,5}$/';
        $strpassword = '/^[\S]{6,16}$/';
        //用户名暂不做判断
        // $strUsername = '';
        //去掉空格
        trim($username);
        trim($password);
        trim($eamil);
        //判断邮箱格式是否正确
        $result = preg_match($strEmail, $eamil);
        if(!$result){
            //邮箱匹配发生错误
            return 1;
        }
        else if($result === 0){
            //邮箱格式错误
            return 2;
        }
        //判断密码是否6-16位
        $result = preg_match($strpassword, $password);
        if(!$result){
            //密码匹配发生错误
            return 3;
        }
        else if($result === 0){
            //密码格式错误
            return 4;
        }
        if($username === ""){
            //用户名为空
            return 5;
        }
        return 0;
    }
    //用户注册
    public function register($username, $password, $eamil){
        $isRegisterEamil = $this->query('select `email` from `user` where `email` = "'.$eamil.'"');
        $isRegisterNick = $this->query('select `username` from `user` where `username` = "'.$username.'"');
        //邮箱被注册
        if($isRegisterEamil->num_rows !== 0){
            return 6;
        }
        //用户名被注册
        else if($isRegisterNick->num_rows !== 0){
            return 7;
        }
        //插入数据库
        $result = $this->query('insert into `user` (`username`, `password`, `email`) values ("'.$username.'", "'.$password.'", "'.$eamil.'")');
        //插入错误(服务器可能断开)
        if(!$result){
            return 8;
        }
        else{
            session_start();
            $_SESSION['username'] = $username;
            setcookie('username', $username, time() + 60 * 60 * 24 * 7, '/');
            return 0;
        }
    }
}