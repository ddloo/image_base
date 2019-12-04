 //导入jquery
//  import $ from "jquery";
(function() {
    //总页面
    let mainWrapEle = document.getElementById("main-wrap");
    //登录和注册页面
    let loginWrapEle = document.getElementById("login-wrap");
    let registerWrapEle = document.getElementById("register-wrap");
    //登录-注册标题
    let titleEle = document.getElementById("login-register-h3");
    //取消登录或注册按钮
    let cancelEle = document.getElementById("cancel");
    //登录界面的注册按钮
    let goRegisterEle = document.getElementById("go-register");
    //注册页面的登录span
    let loginSpanEle = document.getElementById("login-span");
    //登录页面的登录按钮,注册页面的注册按钮
    let registerBtnEle = document.getElementById("register-btn");
    let loginBtnEle = document.getElementById("login-btn");
    //登录的内容与错误显示
    let loginNameEle = document.getElementById("login-name");
    let loginPasswordEle = document.getElementById("login-password");
    let loginErrorEle = document.getElementById("login-error");
    //注册的内容与错误显示
    let registerNameEle = document.getElementById("register-name");
    let registerPasswordEle = document.getElementById("register-password");
    let registerRepasswordEle = document.getElementById("register-repassword");
    let registerEmailEle = document.getElementById("register-email");
    let registerErrorEle = document.getElementById("register-error");
    //登录注册的总体页面
    let loginRegisterDivEle = document.getElementById("login-register-div");
    //外页面登录按钮
    let loginLiEle = document.getElementById("login-li");
    //图片集
    let $imgSum = $("#img-list-div");
    //放大图片的页面
    let showImgWrapEle = document.getElementById("show-img");
    //图片窗口
    let $imgWrap = $("#show-img-wrap");
    //关闭图片窗口
    let closeImageEle = document.getElementById("close-image-div");
    //要显示的图片
    let imgEle = document.getElementById("on-img");
    //上传图片按钮
    let uploadImageEle = document.getElementById("file-input");
    let uploadLabelEle = document.getElementById("file-label");
    //退出账号
    let logoutUser;
    //用户还没登录页面
    let noLoginEle = document.getElementById("no-login");
    //用户还没登录页面去往登录页面的span
    let noLoginSpanEle = document.getElementById("no-login-span");
    //关闭用户还没登录页面
    let closeNoLoginSpanEle = document.getElementById("close-no-login");
    //显示分类名的div
    let categoriesDivEle = document.getElementById("img-categories-div");
    //图片上传选择标签的div
    let $selectLabel = $("#select-div");
    //上传图片总窗口
    let uoloadDivEle = document.getElementById("uoload-img-div");
    //上传图片视图窗口
    let uploadWrapEle = document.getElementsByClassName("upload-img-wrap")[0];
    //关闭上传图片按钮
    let closeUploadEle = document.getElementById("close-upload");
    //点击上传图片按钮
    let uploadBtnEle = document.getElementById("upload-img-btn");
    //上传文件图片名
    let imgNameEle = document.getElementById("img-file-name");
    //上传图片的分类
    let categoriesName = "";
    //用户点击分类的位置所在开关
    let isLine = false;
    //分类窗口
    let $sectionContent = $(".section-content");
    //上一次点击的分类按钮
    let last = -1;
    //热门壁纸按钮
    let popularDivEle = document.getElementById("popular-div");
    //随机壁纸按钮
    let randomDivEle = document.getElementById("random-div");
    //喜欢,收藏按钮
    let collectBtnEle = document.getElementById("img-collect");

    //登录按钮点击出现登录页面
    function appearLoginWrap() {
        titleEle.innerText = "登录";
        loginNameEle.value = "";
        loginPasswordEle.value = "";
        registerNameEle.value = "";
        registerPasswordEle.value = "";
        registerRepasswordEle.value = "";
        registerEmailEle.value = "";
        loginRegisterDivEle.setAttribute("style", "");
        loginWrapEle.className = "login-wrap";
        registerWrapEle.className = "register-wrap hide";
    }
    loginLiEle.onclick = appearLoginWrap;
    //取消按钮
    function hide() {
        loginRegisterDivEle.className = "login-register wrap-disappear-animation curtain";
        setTimeout(() => {
            loginRegisterDivEle.setAttribute("style", "display:none");
            loginRegisterDivEle.className = "login-register curtain";
            loginErrorEle.innerText = "";
            registerErrorEle.innerText = "";
        }, 500)
    }
    cancelEle.onclick = hide;
    //去往注册按钮
    goRegisterEle.onclick = function() {
            loginWrapEle.className = "login-wrap hide";
            titleEle.innerText = "注册";
            setTimeout(() => {
                registerWrapEle.className = "register-wrap";
            }, 550)
        }
        //去往登录的按钮
    loginSpanEle.onclick = function() {
            registerWrapEle.className = "register-wrap hide";
            titleEle.innerText = "登录";
            setTimeout(() => {
                loginWrapEle.className = "login-wrap";
            }, 550)
        }
        //根据用户窗口大小设置大图片的大小
    function setImgSize(innerWidth) {
        let width;
        let height;
        if (innerWidth >= 3840) {
            width = 2560;
            height = 1440;
        } else if (innerWidth >= 2560) {
            width = 1920;
            height = 1080;
        } else if (innerWidth >= 1920) {
            width = 1366;
            height = 768;
        } else if (innerWidth >= 1280) {
            width = 1024;
            height = 576;
        } else if (innerWidth >= 960) {
            width = 720;
            height = 405;
        } else {
            width = 640;
            height = 360;
        }
        return { "width": width, "height": height };
    }
    //大窗口图片比列放大/缩小
    function enlargeImg(imgDiv, src) {
        let size = setImgSize(window.innerWidth);
        let width = size.width;
        let height = size.height;
        let img = new Image();
        // let src = imgDiv.children[0].getAttribute("data-src").replace("../", "");
        img.src = src;
        imgEle.src = src;

        img.onload = function() {
            if (img.width > width && img.height > height) {
                //图片宽高都超过给定的大小,图片的宽与给定的宽相同,高按比例缩小
                img.height = (width / img.width) * img.height;
                img.width = width;
            } else if (img.width > width) {
                //图片仅宽超过给定的大小,图片的宽与给定的宽相同,高按比例缩小
                img.height = (width / img.width) * img.height;
                img.width = width;
            } else if (img.height > height) {
                //图片仅宽超过给定的大小,图片的高与给定的高相同,宽按比例缩小
                img.width = (height / img.height) * img.width;
                img.height = height;
            }
            $imgWrap[0].style.width = img.width + "px";
            $imgWrap[0].style.height = img.height + "px";
            showImgWrapEle.className = "show-img curtain";
        }
    }
    //关闭放大图片
    closeImageEle.onclick = () => {
            showImgWrapEle.className = "show-img hide curtain";
        }
        //去掉字符串中空格符
    function clearSpace(str) {
        str = str.replace(/\s*/g, "");
        return str;
    }
    //若登录了,则给User添加ul
    function setUserUl(userId) {
        $(loginLiEle).append(`<ul id="user-ul">
    <li id="user-collect">我的收藏</li>
    <li id="user-upload">上传的图片</li>
    <li>个人相册</li>
    <li id="logout">退出账号</li>
    </ul>`);
        loginLiEle.setAttribute("data-id", userId)
        logoutUser = document.getElementById("logout");
        //用户查看自己上传的图片按钮
        userUploadImg();
        //用户查看自己收藏的图片
        userCollectImg();
        //给label标签绑上input file
        uploadLabelEle.setAttribute("for", "file-input");
        //退出账号
        logoutUser.onclick = () => {
            $.ajax({
                type: "POST",
                url: "api/userHandle/logout",
                success: function(response) {
                    response = JSON.parse(response);
                    if (response.code === "0000") {
                        loginLiEle.innerText = "用户登录";
                        loginLiEle.classList.remove("login-user");
                        deleteUserUl();
                        loginLiEle.onclick = appearLoginWrap;
                        //退出登录后操作
                        categoriesDivEle.setAttribute("data-name", "最新壁纸");
                        getNewImage();
                    }
                },
                error: function() {
                    registerErrorEle.innerText = "与服务器链接断开";
                }
            });
        }
    }
    //还没登录,则删除掉user的ul
    function deleteUserUl() {
        let userUl = document.getElementById("user-Ul");
        $(userUl).empty();
    }
    //登录按钮
    loginBtnEle.onclick = () => {
            let username = clearSpace(loginNameEle.value);
            let password = clearSpace(loginPasswordEle.value);
            if (username === undefined || username === "") {
                loginErrorEle.innerText = "账号不能为空呢(σ｀д′)σ";
                return;
            } else if (password === undefined || password === "") {
                loginErrorEle.innerText = "密码不能为空呢(σ｀д′)σ";
                return;
            }
            $.ajax({
                type: "POST",
                url: "api/userHandle/auth",
                data: {
                    "username": username,
                    "password": password
                },
                success: function(response) {
                    response = JSON.parse(response);
                    if (response.code !== "0000") {
                        loginErrorEle.innerText = response.msg;
                        return;
                    }
                    let result = response.data;
                    loginLiEle.innerText = result.username;
                    loginLiEle.classList.add("login-user");
                    loginLiEle.onclick = null;
                    setUserUl(result.id);
                    hide();
                },
                error: function() {
                    loginErrorEle.innerText = "与服务器链接断开";
                }
            });
        }
        //网页加载完成时检测之前是否已经登录过
    window.onload = () => {
            $.ajax({
                type: "POST",
                url: "api/userHandle/isAlreadyLogin",
                success: function(response) {
                    response = JSON.parse(response);
                    if (response.code === "0000") {
                        let result = response.data;
                        loginLiEle.innerText = result.username;
                        loginLiEle.onclick = null;
                        loginLiEle.classList.add("login-user");
                        setUserUl(result.id);
                    } else {
                        loginLiEle.innerText = response.msg;
                    }
                },
                error: function() {
                    registerErrorEle.innerText = "与服务器链接断开";
                }
            });
        }
        //加载图片分类
    $("#section-ul").ready(function() {
            $.ajax({
                type: "GET",
                url: "api/imageHandle/getCategories",
                success: function(response) {
                    response = JSON.parse(response);
                    if (response.code !== "0000") {
                        uoloadMessage("获取图片分类失败");
                        return 0;
                    }
                    let data = response.data;
                    for (var i in data) {
                        $("#section-ul").append('<li data-name="' + data[i].title + '" class="section-li" index="' + (data[i].id - 1) + '"><a href="?category=' + data[i].title + '">' + data[i].name + '</a></li>');
                        // $("#section-ul").append('<li data-name="' + data[i].title + '" class="section-li" index="' + (data[i].id - 1) + '"><span >' + data[i].name + '</span></li>')
                    }
                    //阻止a标签跳转页面
                    blockAOnclick();
                    //点击图片分类按钮出现分类后的图片
                    $("#section-ul").children("li").click(function() {
                        let li = this;
                        let index = this.getAttribute("index");
                        let categoriesName = $(li).children("a").text();

                        var lastLiEle = document.getElementById("section-ul").getElementsByTagName("li")[last];
                        categoriesDivEle.setAttribute("data-name", categoriesName);
                        //图片分类出现当前所选择分类的标记
                        if (!isLine) {
                            isLine = true;
                            $sectionContent.append('<div class="line"></div>');
                            window.lineEle = document.getElementsByClassName("line")[0];
                            lineEle.setAttribute("style", "transform: translateY(" + (44 * li.getAttribute("index")) + "px)");
                        } else {
                            lineEle.setAttribute("style", "transform: translateY(" + (li.offsetHeight * index) + "px)");
                        }
                        if (last >= 0) {
                            lastLiEle.classList.add("section-li");
                            last = index;
                            $(this).removeClass("section-li");
                        } else {
                            last = index;
                            $(this).removeClass("section-li");
                        }
                        //得到分类图片
                        $.ajax({
                            type: "POST",
                            url: "api/imageHandle/getCategoriesImg",
                            data: {
                                "categories": this.getAttribute("data-name")
                            },
                            success: function(response) {
                                response = JSON.parse(response);
                                if (response.code !== "0000") {
                                    uoloadMessage(response.msg);
                                    return;
                                }
                                loadImg(response.data);
                            },
                            error: function() {
                                uoloadMessage("与服务器断开连接啦X﹏X");
                            }
                        });
                    })
                }
            });
        })
        //注册按钮
    registerBtnEle.onclick = function() {
            // console.log(registerNameEle);
            let registerName = clearSpace(registerNameEle.value);
            let registerPassword = clearSpace(registerPasswordEle.value);
            let registerRepassword = clearSpace(registerRepasswordEle.value);
            let registerEmail = clearSpace(registerEmailEle.value);
            if (registerName === "" || registerName === undefined) {
                registerErrorEle.innerText = "你创建的账号用户名为空啦(ಥ _ ಥ)";
                return;
            } else if (registerPassword === "" || registerPassword === undefined) {
                registerErrorEle.innerText = "密码还没有填哦(ಥ _ ಥ)";
                return;
            } else if (registerRepassword === "" || registerRepassword === undefined) {
                registerErrorEle.innerText = "密码还没有填哦(ಥ _ ಥ)";
                return;
            } else if (registerEmail === "" || registerEmail === undefined) {
                registerErrorEle.innerText = "邮箱很重要的,快填啦(ಥ _ ಥ)";
                return;
            } else if (registerPassword !== registerRepassword) {
                registerErrorEle.innerText = "密码不一致(/▽＼)";
                return;
            }
            $.ajax({
                type: "POST",
                url: "api/userHandle/register",
                data: {
                    "username": registerName,
                    "password": registerPassword,
                    "email": registerEmail
                },
                success: function(response) {
                    response = JSON.parse(response);
                    if (response.code !== "0000") {
                        registerErrorEle.innerText = response.msg;
                        return;
                    }
                    loginLiEle.innerText = registerName;
                    loginLiEle.classList.add("login-user");
                    loginLiEle.onclick = null;
                    setUserUl();
                    hide();
                    registerNameEle.value = "";
                    registerPasswordEle.value = "";
                    registerRepasswordEle.value = "";
                    registerEmailEle.value = "";
                },
                error: function() {
                    registerErrorEle.innerText = "与服务器链接断开";
                }
            });
        }
        //Base64转换为file二进制
        // function getBlob(url) {
        //     var arr = url.split(','), mime = arr[0].match(/:(.*?);/)[1],
        //         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        //     while (n--) {
        //         u8arr[n] = bstr.charCodeAt(n);
        //     }
        //     return new Blob([u8arr], { type: mime });
        // }
        //上传图片按钮
    uploadLabelEle.onclick = function() {
            if (isAuth("username")) {
                uploadImageEle.onchange = function() {
                    let files = this.files[0];
                    //上传了一个图片时执行
                    if (this.files.length !== 0) {
                        let userName = loginLiEle.innerText;
                        //读取图像文件
                        // console.log(files);
                        let fileReader = new FileReader();
                        fileReader.readAsDataURL(files);
                        fileReader.onload = function() {
                            uoloadDivEle.setAttribute("style", "");
                            imgNameEle.innerText = files.name;
                            let img = new Image();
                            //图片路径转换为base64
                            img.src = fileReader.result;
                            //得到图片分辨率，上传的图片不能太小
                            img.onload = function() {
                                minWidth = 960; //最小宽度
                                minHeight = 540; //最小高度
                                //上传的图片太小,这是个壁纸网站
                                if (this.width < minWidth || this.height < minHeight) {
                                    uoloadMessage("上传的图片太小了,至少要" + minWidth + "*" + minHeight + "");
                                    uploadBtnEle.onclick = function() {
                                        uoloadMessage("上传的图片太小了,至少要" + minWidth + "*" + minHeight + "");
                                    }
                                    return;
                                }
                                size = enlargeDiv(this.width, this.height);
                                uploadBtnEle.onclick = function() {
                                    let formData = new FormData();
                                    if (categoriesName === "") {
                                        uoloadMessage("请小可爱选上一个正确的标签~(●ˇ∀ˇ●)");
                                        return;
                                    }
                                    //上传动画
                                    uploadAppearAnimation();
                                    formData.append('img', files);
                                    formData.append('userId', loginLiEle.getAttribute("data-id"));
                                    formData.append('name', userName);
                                    formData.append('categories', categoriesName);
                                    formData.append('imgWidth', img.width);
                                    formData.append('imgHeight', img.height);
                                    formData.append('viewWidth', size.width);
                                    formData.append('viewHeight', size.height);
                                    $.ajax({
                                        url: "api/imageHandle/uploadImg",
                                        type: "POST",
                                        //一定要加这两个
                                        /**
                                         * processData默认true，这里将其改为false，直接使用data数据，而不是序列化的data数据
                                         * contentType默认true，默认data传JSON数据时自动赋予键值对联接方式，这里将其改为false，因为formdata对象不适用
                                         */
                                        processData: false,
                                        contentType: false,
                                        data: formData,
                                        success: function(response) {
                                            //上传动画消失
                                            uploadNoAppearAnimation();
                                            // console.log(response)
                                            categoriesName = "";
                                            response = JSON.parse(response);
                                            uoloadMessage(response.msg);
                                            closeUploadWrap();
                                            if (response.code === '0000') {
                                                //上传成功
                                            } else if (response.code === '2000') {
                                                //未登录
                                                uploadLabelEle.setAttribute("for", "");
                                                noLoginEle.setAttribute("style", "");
                                            }
                                        },
                                        error: function() {
                                            uoloadMessage("与服务器断开连接啦X﹏X");
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            } else {
                //阻止出现change
                this.setAttribute("for", "");
                noLoginEle.setAttribute("style", "");
            }
        }
        //上传图片时出现上传动画
    function uploadAppearAnimation() {
        $(".upload-img-wrap").css("display", "none");
        $(".uoload-img-div").append('<div class="popup upload-animation-div">\
            <div><span></span><p>正在上传...</p></div>\
        </div> ');
    }
    //上传动画消失
    function uploadNoAppearAnimation() {
        $(".upload-animation-div").remove();
        $(".upload-img-wrap").css("display", "");
    }
    // 上传图片信息弹窗
    function uoloadMessage(msg) {
        setTimeout(() => {
            let div = document.createElement("div");
            let p = document.createElement("p");
            p.innerText = msg;
            div.className = "upload-lose";
            div.appendChild(p);
            div.addEventListener("animationend", function() {
                div.setAttribute("style", "opacity: 1; transform: translateY(7em)");
            })
            mainWrapEle.appendChild(div);
            setTimeout(function() {
                div.classList.add("uoload-out");
                div.setAttribute("style", "opacity: 0; transform: scale(.3)");
            }, 2000)
            setTimeout(function() {
                mainWrapEle.removeChild(div);
            }, 2500)
        }, 100)
    }
    //获取cookie名
    function getCookie(cookieName) {
        //将获取的cookie去掉空格符
        var cookie = document.cookie.replace(/[ ]/g, "");
        //将获取的cookie分成几个键值对
        var cookieList = cookie.split(";");
        //将获得的键值对再分成小数组
        for (var i = 0; i < cookieList.length; i++) {
            var value = cookieList[i].split("=");
            if (cookieName === value[0]) {
                return value[1];
            }
        }
        return -1;
    }
    //查看是否登录
    function isAuth(cookieName) {
        let result = getCookie(cookieName);
        if (result === -1) {
            return false;
        }
        return true;
    }
    //点击还没登录按钮->去往登录页面
    noLoginSpanEle.onclick = function() {
            noLoginEle.setAttribute("style", "display: none");
            appearLoginWrap();
        }
        //关闭用户还没登录窗口
    closeNoLoginSpanEle.onclick = function() {
            noLoginEle.className = "wrap-disappear-animation no-login curtain";
            setTimeout(() => {
                noLoginEle.setAttribute("style", "display: none");
                noLoginEle.className = "no-login curtain";
            }, 500)
        }
        //imgList加载图片
    function loadImg(data) {
        $imgSum[0].innerHTML = "";
        if (data.length === 0) {
            $imgSum.append('<div class="no-img">\
                                    <p>什么数据都没有(～﹃～)~zZ</p>\
                                </div>');
            return;
        }
        for (let i in data) {
            //加载选中的分类图片
            let image = data[i];
            image.src = image.src.replace("../", "");
            image.size = image.size.split("*");
            image.width = image.size[0];
            image.height = image.size[1];
            $imgSum.append('<div class="img-wrap div-wrap" style="height: ' + image.height + 'px; width: ' + image.width + 'px">\
                    <img src=' + image.src + ' alt="" data-src="' + image.original_src + '" title="点击放大图片">\
                </div>');
            isCollect(image.original_src);
        }
        waterFall();
        enlargeDiv(1920, 1080);
    }
    //js控制图片瀑布流布局
    function waterFall() {
        var divList = $(".div-wrap");
        var wrapWidth = $(".img-content").width();
        var divWidth = divList.width();
        //获取图片与图片之间的margin
        var gapRight = parseInt(divList.css("marginRight"));
        var gapTop = parseInt(divList.css("marginTop"));
        //一行里面能放多少个图片
        var columns = parseInt(wrapWidth / (divWidth + gapRight));
        //记录每一列高度
        var columnsHeight = new Array();
        //开始布局
        for (var i = 0; i < divList.length; i++) {
            if (i < columns) {
                //第一行布局
                divList[i].style.top = 0;
                divList[i].style.left = (divWidth + gapRight) * i + "px";
                columnsHeight.push(divList[i].clientHeight);
                // console.log(columnsHeight);
            } else {
                //处理其他行,找到全部列中最小的高度,找到并在该列后放置新的图片
                var minHeight = 999999;
                //记录最小高度所在の位置
                var index;
                for (var j in columnsHeight) {
                    if (minHeight > columnsHeight[j]) {
                        minHeight = columnsHeight[j];
                        index = j;
                    }
                }
                //设置下一行第一个图片摆放的位置
                divList[i].style.top = columnsHeight[index] + gapTop + "px";
                divList[i].style.left = divList[index].offsetLeft + "px";
                //改变该列的高度,原先高度 加上 后来添加的图片高度
                columnsHeight[index] += divList[i].clientHeight + gapTop;
                //设置每张图片的left
                function setLeft(columns) {
                    if (columns === 0) {
                        return;
                    } else if (i % columns) {
                        setLeft(columns - 1);
                    } else {
                        divList[i].style.left = divList[index].style.left;
                        return;
                    }
                }
                setLeft(columns);
            }
        }
    }
    //小窗口图片按比列缩放
    function enlargeDiv(imgWidth, imgHeight) {
        // let divHeight = 180;
        let divWidth = 270;
        imgHeight = Math.floor((divWidth / imgWidth) * imgHeight);
        imgWidth = divWidth;
        return { "width": imgWidth, "height": imgHeight };
    }
    //获取最新上传的图片
    function getNewImage() {
        $.ajax({
            type: "POST",
            url: "api/imageHandle/getNewImg",
            success: function(response) {
                response = JSON.parse(response);
                if (response.code !== "0000") {
                    uoloadMessage(response.msg);
                    return;
                }
                loadImg(response.data);
            },
            error: function() {
                uoloadMessage("与服务器断开连接啦X﹏X");
            }
        })
    }
    $imgSum.ready(getNewImage);
    //生成图片上传种类按钮
    $('#unselect-div').ready(function() {
            $.ajax({
                type: "GET",
                url: "api/imageHandle/getCategories",
                success: function(response) {
                    response = JSON.parse(response);
                    if (response.code !== "0000") {
                        uoloadMessage("获取图片分类失败");
                        return 0;
                    }
                    let data = response.data;
                    for (var i in data) {
                        $('#unselect-div').append('<label class="label-btn section-btn" data-name="' + data[i].title + '"><span>' + data[i].name + '</span></label>')
                    }
                    //图片上传选择种类按钮
                    $("#unselect-div").children("label").click(function() {
                        if (this.getAttribute("data-name") !== $selectLabel.children("label:nth-child(1)").data("name")) {
                            categoriesName = this.getAttribute("data-name");
                            $selectLabel.children().remove();
                            $selectLabel.append('<label class="already-btn section-btn" data-name="' + this.getAttribute("data-name") + '">\
                                        <span>' + this.children[0].innerText + '</span>\
                                     </label>')
                        }
                    })
                }
            })
        })
        //关闭上传图片窗口
    function closeUploadWrap() {
        uploadWrapEle.classList.add("upload-wrap-disappear");
        setTimeout(function() {
            uoloadDivEle.setAttribute("style", "display: none");
            uploadWrapEle.classList.remove("upload-wrap-disappear");
        }, 400);
        $selectLabel.children().remove();
        categoriesName = "";
    }
    closeUploadEle.onclick = closeUploadWrap;

    //随机生成一组不重复随机数(当要获取的随机数据量远小于全部数据量时用hast表排重,当两者接近时用交换算法)
    //mysql随机返回100条数据(用于随机图片,如没有100条,就返回全部数据)

    //随机图片按钮
    randomDivEle.onclick = function() {
            $.ajax({
                type: "POST",
                url: "api/imageHandle/getRandomImg",
                success: function(response) {
                    categoriesDivEle.setAttribute("data-name", "随机壁纸");
                    response = JSON.parse(response);
                    if (response.code !== "0000") {
                        uoloadMessage(response.msg);
                        return;
                    }
                    loadImg(response.data);
                },
                error: function() {
                    uoloadMessage("与服务器断开连接啦X﹏X");
                }
            })
        }
        //热门图片按钮
    popularDivEle.onclick = function() {
            $.ajax({
                type: "POST",
                url: "api/imageHandle/getPopularImg",
                success: function(response) {
                    categoriesDivEle.setAttribute("data-name", "热门壁纸");
                    response = JSON.parse(response);
                    if (response.code !== "0000") {
                        uoloadMessage(response.msg);
                        return;
                    }
                    loadImg(response.data);
                },
                error: function() {
                    uoloadMessage("与服务器断开连接啦X﹏X");
                }
            })
        }
        //查看用户上传的图片
    function userUploadImg() {
        let userUploadImgEle = document.getElementById("user-upload");
        userUploadImgEle.onclick = function() {
            $.ajax({
                type: "POST",
                url: "api/imageHandle/getUserUploadImg",
                data: {
                    "username": decodeURI(getCookie("username"))
                },
                success: function(response) {
                    categoriesDivEle.setAttribute("data-name", decodeURI(getCookie("username")) + "上传的壁纸");
                    response = JSON.parse(response);
                    if (response.code !== "0000") {
                        uoloadMessage(response.msg);
                        return;
                    }
                    loadImg(response.data);
                },
                error: function() {
                    uoloadMessage("与服务器断开连接啦X﹏X");
                }
            })
        }
    }
    //查看用户收藏的图片
    function userCollectImg() {
        let userCollectImgEle = document.getElementById("user-collect");
        userCollectImgEle.onclick = function() {
            $.ajax({
                type: "POST",
                url: "api/imageHandle/getUserCollectImg",
                data: {
                    "username": decodeURI(getCookie("username"))
                },
                success: function(response) {
                    categoriesDivEle.setAttribute("data-name", decodeURI(getCookie("username")) + "的宝藏");
                    response = JSON.parse(response);
                    if (response.code === "0000") {
                        loadImg(response.data);
                    } else if (response.code === "0002") {
                        //没收藏过图片
                        $imgSum[0].innerHTML = "";
                        $imgSum.append('<div class="no-img">\
                                        <p>什么数据都没有(～﹃～)~zZ</p>\
                                    </div>');
                    } else {
                        uoloadMessage(response.msg);
                    }
                },
                error: function() {
                    uoloadMessage("与服务器断开连接啦X﹏X");
                }
            })
        }
    }
    //点击放大图片检查是否收藏过图片
    function isCollect(src) {
        $imgSum.children("div:last-child").click(function() {
            src = src.replace("../", "");
            enlargeImg(this, src);
            //如果没有登录就不执行
            if (isAuth("username")) {
                src = "../" + src;
                //去掉多余的../(只留一个)
                src = src.replace(/(\.(\.(\/)))\1+/, "../");
                $.ajax({
                    type: "POST",
                    url: "api/imageHandle/isCollect",
                    data: {
                        "src": src
                    },
                    success: function(response) {
                        response = JSON.parse(response);
                        if (response.code === "0000") {
                            //已经收藏了，收藏按钮变为取消收藏按钮
                            collectBtnEle.classList.add("is-collect");
                            removeCollectImg(src);
                        } else {
                            //还没收藏，出现收藏按钮
                            collectBtnEle.classList.remove("is-collect");
                            collectImg(src);
                        }
                    }
                });
            } else {
                collectBtnEle.classList.remove("is-collect");
                collectBtnEle.onclick = () => {
                    noLoginEle.setAttribute("style", "");
                    showImgWrapEle.className = "show-img hide";
                }
            }
        })
    }
    //收藏/喜欢按钮
    function collectImg(src) {
        collectBtnEle.onclick = function() {
            //寻找当前节点的父节点的兄弟节点的第一个子节点img
            // let imgEle = collectBtnEle.parentNode.previousElementSibling.firstElementChild;
            src = src;
            $.ajax({
                type: "POST",
                url: "api/imageHandle/userCollectImg",
                data: {
                    "src": src
                },
                success: function(response) {
                    response = JSON.parse(response);
                    if (response.code === "0000") {
                        collectBtnEle.classList.add("is-collect");
                    }
                    uoloadMessage(response.msg);
                    //变成取消收藏按钮
                    removeCollectImg(src);
                }
            });
        }
    }
    //取消收藏/喜欢按钮
    function removeCollectImg(src) {
        collectBtnEle.onclick = function() {
            src = src;
            $.ajax({
                type: "POST",
                url: "api/imageHandle/userRemoveCollectImg",
                data: {
                    "src": src
                },
                success: function(response) {
                    response = JSON.parse(response);
                    if (response.code === "0000") {
                        collectBtnEle.classList.remove("is-collect");
                    }
                    uoloadMessage(response.msg);
                    //变成收藏按钮
                    collectImg(src);
                }
            });
        }
    }
    //界面大小发生变化时，图片重新排版
    window.onresize = function() {
            if (this.innerWidth <= 400) {
                return;
            }
            waterFall();
        }
        //a标签不跳转页面
    function blockAOnclick() {
        $("a").click(function(e) {
            e.preventDefault();
        })
    }
})();