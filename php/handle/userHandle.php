<?php

//用户登录
function auth(){
    $response = [];
    if(!isset($_POST['username']) || !isset($_POST['password'])){
        $response = [
            'code' => '1000',
            'msg' => '发生了某些不可告人的错误呢┭┮﹏┭┮'
        ];
        die(json_encode($response));
    }

    include_once(app::$base."/Link/loginUser.php");

    $login = new loginUser();
    //登录操作
    $result = $login->auth($_POST['username'], md5($_POST['password']));
    if($result === 1){
        //用户不存在
        $response = [
            'code' => '0001',
            'msg' => '不存在该用户呢QAQ'
        ];
        die(json_encode($response));
    }
    else if($result === 2){
        //查找错误(服务器)
        $response = [
            'code' => '0002',
            'msg' => '出现未知错误,请再试一次╯︿╰'
        ];
        die(json_encode($response));
    }
    else if($result === 3){
        //账号或密码错误
        $response = [
            'code' => '0003',
            'msg' => '账号或者密码错误~'
        ];
        die(json_encode($response));
    }
    else{
        //登录成功
        session_start();
        $_SESSION['username'] = $result['username'];
        setcookie('username', $_SESSION['username'], time() + 60 * 60 * 24 * 7, '/');
        $response = [
            "code" => "0000",
            "msg" => "登录成功",
            "data" => [
                "username" => $_SESSION['username'],
                "id" => $result['id']
            ]
        ];
        die(json_encode($response));
    }
}

//用户之前是否已经登录过(7天内)
function isAlreadyLogin(){
    $response = [];
    if(isset($_COOKIE['username'])){
        $_SESSION['username'] = $_COOKIE['username'];
    }
    //已经登录
    if(isset($_SESSION['username'])){
        include_once(app::$base."/Link/loginUser.php");
        $login = new loginUser();
        //获取用户ID
        $result = $login->getUserId($_SESSION['username']);
        $response = [
            "code" => "0000",
            "msg" => "登录成功",
            "data" => [
                "username" => $_SESSION['username'],
                "id" => $result['id']
            ]
        ];
        die(json_encode($response));
    }
    //尚未登录
    else{
        $response = [
            "code" => "0001",
            "msg" => "用户登录"
        ];
        die(json_encode($response));
    }
}

//退出账号
function logout(){
    $response = [];
    session_start();
    setcookie("username", '',time() - 60 * 60,'/');
    $response = [
        "code" => "0000",
        "msg" => "退出成功!"
    ];
    die(json_encode($response));
}

//用户注册
function register(){
    $response = [];
    if(!isset($_POST['username']) || !isset($_POST['password']) || !isset($_POST['email'])){
        $response = [
            'code' => '1000',
            'msg' => '发生了某些不可告人的错误呢┭┮﹏┭┮'
        ];
        die(json_encode($response));
    }

    include_once(app::$base."/Link/registerUser.php");
    $register = new registerUser();
    //输入格式是否正确
    $result = $register->isReg($_POST['username'], $_POST['password'], $_POST['email']);
    if($result === 1){
        //邮箱格式匹配发生错误
        $response = [
            'code' => '0001',
            'msg' => '邮箱格式匹配发生错误哦~'
        ];
        die(json_encode($response));
    }
    else if($result === 2){
        //邮箱格式错误
        $response = [
            'code' => '0002',
            'msg' => '邮箱格式错误哦~'
        ];
        die(json_encode($response));
    }
    else if($result === 3){
        //密码格式匹配发生错误
        $response = [
            'code' => '0003',
            'msg' => '密码格式匹配发生错误哦~'
        ];
        die(json_encode($response));
    }
    else if($result === 4){
        //密码格式错误
        $response = [
            'code' => '0004',
            'msg' => '密码格式错误哦~'
        ];
        die(json_encode($response));
    }
    else if($result === 5){
        //用户名为空
        $response = [
            'code' => '0005',
            'msg' => '用户名为空哦~'
        ];
        die(json_encode($response));
    }
    //注册操作
    $result = $register->register($_POST['username'], md5($_POST['password']), $_POST['email']);
    if($result === 6){
        //邮箱被注册
        $response = [
            'code' => '0006',
            'msg' => '该邮箱已经被别人占有了≧ ﹏ ≦'
        ];
        die(json_encode($response));
    }
    else if($result === 7){
        //用户名被注册
        $response = [
            'code' => '0007',
            'msg' => '该名字已经被别人占有了≧ ﹏ ≦'
        ];
        die(json_encode($response));
    }
    else if($result === 8){
        //插入出现错误(服务器)
        $response = [
            'code' => '0008',
            'msg' => '出现未知错误,请再试一次╯︿╰'
        ];
        die(json_encode($response));
    }
    else{
        //注册成功
        $response = [
            "code" => "0000",
            "msg" => "注册成功"
        ];
        die(json_encode($response));
    }
}