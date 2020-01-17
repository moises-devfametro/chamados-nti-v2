
cpf.addEventListener("blur", function( event ) {
    $('.trigger').hide();
    document.getElementById("error").innerText = "";
    $('.workcontrol_upload').show();
    $('.workcontrol_upload_bar').show();
    cpf = document.getElementById('cpf').value;
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/v1/aluno/',
        dataType: 'json',
        data:{
            'cpf': `${cpf}`
        },
        success: function(data){
            $('.workcontrol_upload').hide();
            $('.workcontrol_upload_bar').hide();
            if(!jQuery.isEmptyObject(data)){
                data.forEach(function(e){
                    document.getElementById('aluno').value = e.ALUNO;
                    document.getElementById('email').value = e.EMAIL;
                    document.getElementById('curso').value = e.CURSO;
                    document.getElementById('telefone').value = e.TELEFONE;
                    document.getElementById('dtnascimento').value = e.NASCIMENTO;
                    document.getElementById('ra').value = e.RA;
                });
            }
            else{
                $('#formm input').val("");
                $('.trigger').show();
                document.getElementById("error").innerText = "CPF inválido ou inexistente, verifique novamente ou procure o atendimento ao aluno.";                
                $('html, body').animate({scrollTop:0}, 'slow'); //slow, medium, fast
            }
        }
    });
}, true);

$('.form-check :checkbox').on("change", function(){
    $(this).parent().toggleClass("active");
    $(".check").remove();
});
$('select[name="selectContato"]').on('change', function() {
    if($(this).find('option:selected').val() == 'optionWT'){
        addFields("text", "(00)90000-0000", "WTaluno");
    }
    else{
        addFields("email", "Email", "email");
    }
});
function addFields(type, place, id){
    var container = document.getElementById("inputs");
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    //var msg = "obrigatório";
    var input = document.createElement("input");

    input.type = type;
    input.name = "contato";
    input.id = id;
    input.className = "form-control success";
    input.placeholder = place; 
    input.required = true;
    input.style.top = "32px";
    input.style.position = "relative";
    container.appendChild(input);
}
