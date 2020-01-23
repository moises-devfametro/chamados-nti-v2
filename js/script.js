
cpf.addEventListener("blur", function( event ) {
    $('.trigger').hide();
    document.getElementById("error").innerText = "";
    $('.workcontrol_upload').show();
    $('.workcontrol_upload_bar').show();
    cpf = document.getElementById('cpf').value.trim().replace(/[\.-]/g, "");
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8085/api/v1/aluno/',
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
                    document.getElementById('ALUNO_ID').value = e.ID;
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

$.validator.setDefaults({
    submitHandler: function(){
        var form = $("#formAluno");
        var servicoAluno = document.getElementsByClassName('form-check-input');

        for (var i = 0; i < servicoAluno.length; i++){
            if ( servicoAluno[i].checked ) {
                if(servicoAluno[i].value == "1"){
                    var servicoAluno1 = "1";
                    
                }else if (servicoAluno[i].value == "2") {
                    var servicoAluno2 = "1";
                    
                }else if (servicoAluno[i].value == "3") {
                    var servicoAluno3 = "1";
                    
                }
            }
        }

        $.ajax({
            url: 'http://localhost:8085/api/v1/chamado/criar',
            type: 'POST',
            data: {
                "ALUNO_ID": $('#ALUNO_ID').val(),
                "EMAIL": $('#email').val(),
                "ALUNO": $('#aluno').val(),
                "OPCAO_WIFI": servicoAluno1,
                "OPCAO_EMAIL": servicoAluno2,
                "OPCAO_PORTAL": servicoAluno3,
                "OBSERVACAO": $('#observacoes').val().trim(),
                "OPCAOCONTATO_ID": $('#selectContato').val(),
                "CONTATO": $('input[name="contato"]').val().trim().replace(/[\])}[{(-]/g, ''),
            },
            dataType: 'json',
            success: function(data) {
                $(this).fadeOut('slow', function(){
                    $('#spinner').hide();
                });
                if(data.id){
                    $('#ignismyModal').modal({
                        backdrop: 'static',
                        keyboard: true, 
                        show: true
                    });
                    $("#modal-redirect").click(function(){
                        window.location.href = 'http://portal.fametro.com.br:8080/web/app/edu/PortalEducacional/login/';
                    });
                }
            }
        });
    }
});
$('#formAluno').validate({
    rules:{
        cpf:{
            required: true,
            minlength: 11
        },
        observacoes:{
            required: true,
            minlength: 15
        }
    },
    messages:{
        cpf:{
            required: "CPF obrigatório",
            minlength: "CPF inválido",
            maxlength: "CPF inválido"
        },
        observacoes: {
            required: "Campo Observações obrigatório",
            minlength: "Observações deve conter pelo menos 15 caracteres"
        }
    },
    errorElement: "em",
	errorPlacement: function ( error, element ) {
        // Add the `help-block` class to the error element
        error.addClass( "help-block" );

        // Add `has-feedback` class to the parent div.form-group
        // in order to add icons to inputs
        element.parents( ".form-row-teste").addClass( "has-feedback" );

        if (element.prop( "checkbox" ) === "checkbox" ) {
            error.insertAfter( element.parent( "label" ) );
        } else {
            error.insertAfter( element );
        }
        // Add the span element, if doesn't exists, and apply the icon classes to it.
        if ( !element.next( "span" )[ 0 ] ) {
            $( "<span class='fas fa-times form-control-feedback'></span>" ).insertAfter( element );
        }
    },
    success: function ( label, element ) {
        // Add the span element, if doesn't exists, and apply the icon classes to it.
        if ( !$( element ).next( "span" )[ 0 ] ) {
            $( "<span class='fas fa-check form-control-feedback'></span>" ).insertAfter( $( element ) );
        }
    },
    highlight: function ( element, errorClass, validClass ) {
        $( element ).parents( ".form-row-teste" ).addClass( "has-error" ).removeClass( "has-success" );
        $( element ).next( "span" ).addClass( "fa-times" ).removeClass( "fa-check" );
    },
    unhighlight: function ( element, errorClass, validClass ) {
        $( element ).parents( ".form-row-teste").addClass( "has-success" ).removeClass( "has-error" );
        $( element ).next( "span" ).addClass( "fa-check" ).removeClass( "fa-times" );
    }
});
//Mascara de CPF do Aluno
$('#cpf').mask('000.000.000-00', {reverse: true});
//Mascara de telefone do Aluno
$('#WTaluno').mask("(00)90000-0000");
//Mascara data de nascimento
$("#dtNasAluno").mask("99/99/9999");

$('.form-check :checkbox').on("change", function(){
    $(this).parent().toggleClass("active");
    $(".check").remove();
});
$('select[name="selectContato"]').on('change', function() {
    if($(this).find('option:selected').val() == '1'){
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
