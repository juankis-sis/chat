$(function(){
    
    const socket = io();
    //obteniendo los elementos de DOM desde la interfas
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    //obteniendo los elementos de DOM desde la nicknameForm
    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickname = $('#nickname');

    
    const $users = $('#usernames');

      $nickForm.submit(e => {
        e.preventDefault();
        console.log('enviando....');
            socket.emit('new user', $nickname.val(), data =>{
            if (data){
                $('#nickWrap').hide();
                $('#contentWrap').show();

            }else{
                $nickError.html(`<div class="alert alert-danger">
                el usuario ya existe <div>`);
            }
            $nickname.val('');
        });  
    });


    //capturar los eventos
    $messageForm.submit(e =>{
        e.preventDefault();
        socket.emit('send message',$messageBox.val(), data =>{
            $chat.append(`<p class="error" >${data}</p>`)
        });
        $messageBox.val('');
     //   console.log($messageBox.val());
    });

    socket.on('new message',function (data){
        $chat.append('<b style="color:white;" :>' + data.nick + ' :</b :> '+'<b style="color:white;">'+ data.msg + '<br/>');

    });
    socket.on('usernames',data =>{ 
        let = html ='';
        for(let i =0 ; i < data.length; i++){
            html += `<p style="color:white;" ><i class="fas fa-user" ></i> ${data[i]}</p>`
        }
        $users.html(html);
    });

    socket.on('whisper', data =>{
        $chat.append(`<p class="whisper" style="color:white;"><b>${data.nick}:</b> ${data.msg}</p>`);
    })

    socket.on('load old msgs', msgs =>{
        for(let i = 0 ; i < msgs.length; i++){
            displayMsg(msgs[i]);
        }
    })
    function displayMsg(data){
        $chat.append(`<p class="whisper" style="color:white;"><b>${data.nick}:</b> ${data.msg}</p>`);

    }

})