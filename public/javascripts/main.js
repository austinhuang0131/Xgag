$(function(){

  var likeHandler = function (type, target) {
      // progress-dislike
      var likeNode = target.find(".like");
      var dislikeNode = target.find(".dislike");
      var like, dislike, total;

      if (type === "like") {
        like = parseInt(likeNode.html(), 10) + 1;
        dislike = parseInt(dislikeNode.html(), 10);
        likeNode.html(like);
      } else {
        like = parseInt(likeNode.html(), 10);
        dislike = parseInt(dislikeNode.html(), 10) + 1;
        dislikeNode.html(dislike);
      }

      total = dislike + like;
      like = Math.ceil(like/total * 100);
      dislike = 100 - like;
      target.find(".progress-dislike").css({width: dislike + "%"});
      target.find(".progress-like").css({width: like + "%"});
  };

  getPostsAjax = function(){
    $.get( "/getPosts", function( data ) {
      $("#contentTmpl").tmpl(data.posts,{
            myValue: "somevalue",
            count: function() {
              data = this.data.messages
              console.log(this.data.messages)
              if(data)
                return Object.keys(data).length;
              return 0;
            },
            message: function() {
              $("#contentTmplComment").tmpl(this.data.messages).appendTo(".aaa");
              return true;
            }
        }).appendTo(".post-clump");
      $('.comment-btn').on('click', function(){
        $(this).parent().parent().find('textarea').focus();
      });
      $("img").error(function () {
        $(this).attr("src", "/images/error/error.png");
      });
    });
  }

  getCommentsAjax = function(postId){
    $.get("/getComments/" + postId , function(data){
      $("#commentTmpl").tmpl(data.result, {
        formatDate: function(){
          date = this.data.create_date;
          return moment(date).format('YYYY-MM-DD HH:mm');
        }
      }).appendTo(".comment-area");
    })

  }

  $("#user-post-url").focusout(function(){
    var url = $(this).val();
    $.get( "/news/urlPreview", {url:url}, function( data ) {
      var string = "<h3 class='preview-title'>${title}</h3><p>${content}</p><img class='img-rounded' style='width:100%' src='${newspic}'/>";
      $("#news-prewiew").html($.tmpl( string, data ));
    });
  });

  $(".container" ).delegate(".motion", "click", function(e) {
    e.preventDefault();

    var target = $(e.currentTarget);
    var url = target.attr("href");
    var id = url.split("/").pop();

    $.get(target.attr("href"), function (result) {

      if (result.code !== 200) {
        console.log(result);
        return alert("Please login and try again");
      }

      var inTarget = (url.indexOf("dislike") > -1 ) ? "dislike" : "like";

      likeHandler(inTarget, $("#" + id))
      // var actionTarget = $("#" + id + " ." + inTarget);
      // actionTarget.html(parseInt(actionTarget.html(), 10) + 1);

      return;
    })

  });


});
