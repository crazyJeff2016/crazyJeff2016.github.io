/**
 * Created by Jeff on 2016/2/26.
 */
var t = n = 0, count;
$(document).ready(function () {
    //鼠标移入移出导航栏效果
    showNav();
    //搜索框键盘输入事件
    $("#search_input").bind("keyup", function () {
        var jqueryInput = $(this);
        var searchText = jqueryInput.val();
        $.get('http://api.bing.com/qsonhs.aspx?q=' + searchText);
        $("#search-suggest").show().css({
            top: $("#search-form").offset().top + $("#search-form").height(),
            left: $("#search-form").offset().left
        })
    });
    //点击其他区域 搜索提示框消失
    $("body").bind("click", function () {
        $("#search-suggest").hide()
    });
    //点击获取搜索框提示内容
    var suggests = $("#search-result").find("li");
    suggests.each(function () {
        var $this = $(this);
        var suggestTxt = $this.text();
        $(this).bind("click", function () {
            $("#search_input").val(suggestTxt);
        })
    });
    //右侧导航事件
    $(window).scroll(function () {
        //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
        if ($(window).scrollTop() > 100) {
            $("#rightNav").fadeIn(1500);
        } else {
            $("#rightNav").fadeOut(1500);
        }
        var items = $("#shopContent").find(".shopTit"),
            scrTop = $(document).scrollTop(),
            menu = $("#rightNav"),
            currentID = "";
        items.each(function () {
            var $this = $(this);
            var itemTop = $this.offset().top;
            if (scrTop > itemTop - 300) {
                currentID = "#" + $this.attr("id")
            } else {
                return false;
            }
            var activeLick = menu.find(".active");
            if (currentID && currentID != activeLick.attr("href")) {
                activeLick.removeClass("active");
                menu.find("[href = " + currentID + "]").addClass("active")
            }
        })
    });
    //回到顶部
    $("#toTop").bind("click", function () {
        $("html,body").animate({
            scrollTop: 0
        }, 1500);
        return false;
    });
    count = $("#imgNum a").length;
    $("#imgBox a:not(:first-child)").hide();
    $("#imgNum a").click(function () {
        var i = $(this).text() - 1;
        n = i;
        if (i >= count) return;
        $("#imgBox a").filter(":visible").fadeOut(1000).parent().children().eq(i).fadeIn(1500);
        $("#imgBox").css("background", "");
        $(this).toggleClass("active");
        $(this).siblings().removeAttr("class");
    });
    t = setInterval("showAuto()", 2000);
    $("#banner_big").hover(function () {
        clearInterval(t)
    }, function () {
        t = setInterval("showAuto()",2000)
    });
});
function showAuto() {
    n = n >= (count - 1) ? 0 : ++n;
    $("#imgNum a").eq(n).trigger("click")//有BUG
}
function scrollImg(obj) {
    var imgs = obj.find(".imgBox");
    var imgWidth = imgs.find("img:first").width();
    imgs.animate({
        marginLeft: -imgWidth
    }, 1500, function () {
        imgs.css({marginLeft: 0}).find("li:first").appendTo(imgs)
    })
}
function showNav() {
    var navs = $("#nav").find("a");
    navs.each(function () {
        var $this = $(this);
        $this.bind("mouseover", function () {
            $("#active").removeClass("active");
            $this.addClass("active")
        });
        $this.bind("mouseout", function () {
            $this.removeClass("active")
        })
    });
    $("#nav").mouseleave(function () {
        $("#active").addClass("active")
    })

}




