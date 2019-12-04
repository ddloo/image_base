<?php 

include_once("linkSql.php");
class image extends linkSql{
    //连接数据库
    public function __construct(){
        parent::__construct();
    }

    //得到上传图片分类的ID
    public function getCategoryId($categories){
        $result = $this->query('select category_id from `category` where title = "'. $categories .'" limit 1');
        if(!$result){
            //查找失败
            return 0;
        }
        $message = $result->fetch_assoc();
        return $message['category_id'];
    }

    //上传缩略图
    public function uploadThumbnail($width, $height, $src){
        $result = $this->query('select pid from `image` order by pid desc limit 1');
        if(!$result){
            return 1;
        }
        $message = $result->fetch_assoc();
        $pid = $message['pid'];
        //插入缩略图表
        $result = $this->query('insert into `thumbnail` (`pid`, `size`, `t_src`) values ("'.$pid.'", "'.$width.'*'.$height.'", "'.$src.'")');
        if(!$result){
            return 1;
        }
        return 0;
    }

    //数据库接收图片
    public function uploadImage($src, $userId, $categories){
        $date = date("Y-m-d H:i:s");
        $categoryId = $this->getCategoryId($categories);
        if($categoryId === 0){
            return 1;
        }
        $result = $this->query('insert into `image` (`src`, `user-id`, `time`, `category-id`) values ("'.$src.'","'.$userId.'","'.$date.'","'.$categoryId.'")');
        if(!$result){
            return 1;
        }
        return 0;
    }

    //数据库返回最新图片(限30张)
    public function getNewImage(){
        //获取30个图片
        $result = $this->query('select * from `image` i inner join `thumbnail` t on i.pid = t.pid order by i.pid desc limit 30');
        if(!$result){
            return 1;
        }
        return $result;
    }

    //数据库返回用户点击的种类图片
    public function getCategoriesImage($categories){
        $categoryId = $this->getCategoryId($categories);
        if($categoryId === 0){
            return 1;
        }
        $result = $this->query('select * from `image` i inner join `thumbnail` t on i.pid = t.pid and `category-id` = "'.$categoryId.'" order by i.pid desc');
        if(!$result){
            return 1;
        }
        return $result;
    }

    //数据库最多随机返回50条图片数据
    public function getRandomImage($num){
        if($num > 50){
            $num = 50;
        }
        $result = $this->query('select * from `image` i inner join `thumbnail` t on i.pid = t.pid and i.pid >= (select floor(rand() * (select MAX(pid) from `image`))) order by i.pid desc limit '.$num.'');
        if(!$result){
            return 1;
        }
        return $result;
    }

    //返回被收藏数最多的50张图片(热门图片)
    public function getPopluarImage($num){
        if($num > 50){
            $num = 50;
        }
        $result = $this->query('select * from `image` i inner join `thumbnail` t on i.pid = t.pid order by i.`collectionCount` desc, i.pid desc limit '.$num.'');
        if(!$result){
            return 1;
        }
        return $result;
    }
    
    //得到全部数据的长度
    public function getTotalCount(){
        $result = $this->query('select count(*) as total_count from `image`');
        if(!$result){
            return "-1";
        }
        $row = $result->fetch_assoc();
        return $row['total_count'];
    }

    //返回用户对图片收藏状态
    public function getCollectStatus($uid, $pid){
        $result = $this->query('select * from `collection` where uid = "'.$uid.'" and pid = "'.$pid.'"');
        if(!$result){
            return 1;
        }
        else if($result->num_rows === 0){
            //没进行过收藏
            return 2;
        }
        //已经收藏
        return 0;
    }

    //返回用户id和点击收藏图片id
    public function getPidUid($src, $username){
        $result = $this->query('select pid, id from `image` i, `user` u where i.src = "'.$src.'" and u.username = "'.$username.'"');
        if(!$result){
            return 1;
        }
        //查找成功
        return $result;
    }

    //插入用户收藏某张图片记录
    public function insertCollectImage($uid, $pid){
        $result = $this->query('insert into `collection` (pid, uid) values ("'.$pid.'", "'.$uid.'")');
        if(!$result){
            return 1;
        }
        $result = $this->updateImageCollectionCount($pid, true);
        if($result === 1){
            return 2;
        }
        //插入成功
        return 0;
    }

    //删除用户收藏某张图片记录
    public function deleteCollectImage($uid, $pid){
        $result = $this->query('delete from `collection` where uid = "'.$uid.'" and pid = "'.$pid.'"');
        if(!$result){
            return 1;
        }
        $result = $this->updateImageCollectionCount($pid, false);
        if($result === 1){
            return 2;
        }
        //插入成功
        return 0;
    }

    //用户收藏/取消收藏行为对图片被收藏数进行更新
    /**
     * $pid: 图片id
     * $isAdd: 判断图片被收藏数减1还是加1
     */
    public function updateImageCollectionCount($pid, $isAdd){
        if($isAdd){
            $result = $this->query('update `image` set collectionCount = collectionCount + 1 where pid = "'.$pid.'"');
        }
        else{
            $result = $this->query('update `image` set collectionCount = collectionCount - 1 where pid = "'.$pid.'"');
        }
        if(!$result){
            return 1;
        }
        //更新图片被收藏数成功
        return 0;
    }

    //返回用户50张收藏的图片
    public function getAllCollectImage($username){
        $result = $this->query('select * from `image` i inner join `collection` c on i.pid = c.pid and c.uid in (select id from `user` where `username` = "'.$username.'") inner join `thumbnail` t on i.pid = t.pid order by i.pid desc limit 50');
        if(!$result){
            return 1;
        }
        else if($result->num_rows === 0){
            //该用户没收藏过图片
            return 2;
        }
        //获取收藏图片成功
        return $result;
    }

    //返回数据库图片全部分类
    public function getCategories(){
        $result = $this->query('select * from `category`');
        if(!$result){
            return 1;
        }
        return $result;
    }

    //得到用户上传的图片
    public function getUserUploadImage($username){
        $result = $this->query('select * from `image` i inner join `thumbnail` t on i.pid = t.pid inner join `user` u on u.username = "'.$username.'" and u.id = i.`user-id` order by i.pid desc');
        if(!$result){
            return 1;
        }
        return $result;
    }
    
    //上传的图片生成缩略图
    public function createThumb($type, $i_src, $d_width, $d_height, $t_src){
        //准确获取图片类型,有些虽然后缀名是png或者jpg,但是真正的图片类型却不是png或jpg
        $pic = getimagesize($i_src);
        //以.为切割点,分成有两个元素的数组
        $temp = explode("/", $pic["mime"]);
        //取得数组最后一个元素,即图片后缀名
        $type = end($temp);
        //将jpg后缀名改为jpeg
        if($type === "jpg"){
            $type = "jpeg";
        }
        //拼接打开图像的函数
        $open_img = "imagecreatefrom".$type;
        //创建一个画布,并载入原图
        $original = $open_img($i_src);
        //获取原图的宽和高
        $original_width = imagesx($original);
        $original_height = imagesy($original);
        //创建目标图(缩略图)
        $dest = imagecreatetruecolor($d_width, $d_height);

        //生成缩略图(失败返回false)
        imagecopyresampled($dest, $original, 0, 0, 0, 0, $d_width, $d_height, $original_width, $original_height);

        //TODO:检查生成缩略图是否成功

        //将图片以jpeg形式保存(jpeg的存储空间比png小挺多的)
        imagejpeg($dest, $t_src);
        //销毁创建或者得到的画布，释放内存
        imagedestroy($dest);
        imagedestroy($original);
    }
}