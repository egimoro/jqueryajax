$(function () {
    
    var $posts = $('#posts');
    var $title = $('#title')
    var $body = $('#body')
    
    var postTemplate = $('#post-template').html() ;
    
    function addPost(post) {
        $posts.append(Mustache.render(postTemplate, post));
        
    }
    
    $.ajax({
        type: 'GET',
        url:  'https://jsonplaceholder.typicode.com/posts',
        success: function(posts){
            $.each(posts, function(i, post) {
            addPost(post)
                
                
            });
        },
        error: function(){
            alert('error loading posts');
        }
    });
    $('#add-post').on('click', function() {
        var post = {
            title: $title.val(),
            body: $body.val()
            
        };
        $.ajax({
            type: 'POST',
            url:  'https://jsonplaceholder.typicode.com/posts',
            data: post,
            success: function(newPost) {
               addPost(newPost);
    
},
    error: function() {
        alert('error saving post');
    }
        });
    });
    
    $posts.delegate('.remove', 'click', function() {
        
        var  $li = $(this).closest('li');
        $.ajax({
            type: 'DELETE',
            url: 'https://jsonplaceholder.typicode.com/posts/' + $(this).attr('data-id'),
            success: function( ) {
                $li.fadeOut(300, function(){
                    $li.remove();
                });
                
            }
        });
        
    });
    
    $posts.delegate('.editPost', 'click', function () {
        var $li = $(this).closest('li');
        $li.find('input.title').val($li.find('span.title').html() );
        $li.find('input.body').val($li.find('span.body').html());
        $li.addClass('edit');
        
    });
   
    $posts.delegate('.cancelEdit', 'click', function () {
        var $li = $(this).closest('li').removeClass('edit');
        
        
    });
    
     $posts.delegate('.editPost', 'click', function () {
         var $li = $(this).closest('li');
         var post = {
             title: $li.find('input.title').val(),
             body: $li.find('input.post').val()
         };
         
          $.ajax({
              type: 'PUT',
              url:  'https://jsonplaceholder.typicode.com/posts/' + $li.attr('data-id') ,
              data: post,
              success: function(newPost) {
              $li.find('span.title').html(post.title);
              $li.find('span.body').html(post.order);
              $li.removeClass('edit');
      
      },
          error: function() {
              alert('error updating post');
          }
              });
         
     });
    
   
        
    });
    

