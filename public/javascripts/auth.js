$(()=>{
    $('#signin').on('click', ()=>{
        const studentId = $('#studentId').val();
        const password = $('#password').val();
        if(studentId==''||password=='') return;
        const data = {
            studentId:studentId,
            password:password
        };

        $.ajax({
            url: '/api/auth/signin',
            type: 'post',
            contentType:'application/json;charset=utf-8',
            dataType:'json',
            data: JSON.stringify(data)
        })
        .done((res)=>{
            if(res.result=='ok') alert('ok');
            else alert('ng');
        })
        .fail((err)=>{});
    });
});