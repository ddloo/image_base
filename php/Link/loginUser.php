<?php

include_once("linkSql.php");
class loginUser extends linkSql{
    //连接数据库
    public function __construct(){
        parent::__construct();
    }

    //判断用户是否存在
    public function isExist($username){
        $result = $this->query('select `username` from `user` where `username` = "'.$username.'"');
        //用户不存在
        if($result->num_rows === 0){
            return 1;
        }
        return 0;
    }
    //判断账号密码是否错误
    public function auth($username, $password){
        $userExist = $this->isExist($username);
        //用户不存在
        if($userExist === 1){
            return 1;
        }
        $result = $this->query('select `username`,`password`,`id` from `user` where `username` = "'.$username.'" and `password` = "'.$password.'" limit 1');
        //查找错误(服务器)
        if(!$result){
            return 2;
        }
        else if($result->num_rows !== 0){
            $userMessage = $result->fetch_assoc();
            return $userMessage;
        }
        //密码或者账号错误
        return 3;
    }
    //获取用户ID
    public function getUserId($username){
        $result = $this->query('select `id` from `user` where `username` = "'.$username.'" limit 1');
        //查找错误(服务器)
        if(!$result){
            return 2;
        }
        else if($result->num_rows !== 0){
            $userMessage = $result->fetch_assoc();
            return $userMessage;
        }
    }
}