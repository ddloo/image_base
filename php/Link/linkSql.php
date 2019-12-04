<?php

class linkSql extends mysqli{
    private $host = "";
    private $admin = "";
    private $password = "";
    private $port = "";
    private $db = "";

    public $isLinkSql = false;

    public function __construct()
    {
        $this->host = app::$host;
        $this->admin = app::$admin;
        $this->password = app::$password;
        $this->port = app::$port;
        $this->db = app::$db;

        parent::__construct($this->host, $this->admin, $this->password, $this->db, $this->port);

        if(!$this->connect_error){
            $this->isLinkSql = true;
            $this->set_charset("utf8");
        }
        return $this->isLinkSql;
    }
}