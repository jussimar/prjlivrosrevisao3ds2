// This is a JavaScript file
var urlImage;
$(document).on("click","#salvar",function(){
   /* var parametros = {
      "livro":$("#titulo").val(),
      "autor":$("#autor").val(),
      "ano":$("#ano").val()
    }
    // url:"https://dominioappsjussa.000webhostapp.com/cadastra.php",//para onde enviar
    $.ajax({
        type:"post", //como enviar
        url:"https://appmobile3i2.000webhostapp.com/cadastra.php",//para onde enviar
        data:parametros,//o que enviar
        //se der certo
        success: function(data){
            navigator.notification.alert("msg:"+data);
           $("#titulo").val(""),
           $("#autor").val(""),
           $("#ano").val("")
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });*/
    var prop = document.getElementById('caminho').files[0];
    var nome_imagem = prop.name;
    var extensao_imagem = nome_imagem.split('.').pop().toLowerCase();
    
    if(jQuery.inArray(extensao_imagem,['png','jpg','jpeg']) == -1){
        navigator.notification.alert("imagem invalida");
    }else{
      var form_data = new FormData();
      form_data.append("foto",prop);
      form_data.append("livro",$("#titulo").val());
      form_data.append("autor",$("#autor").val());
      form_data.append("ano",$("#ano").val());
      $.ajax({
        url:"https://appmobile3i2.000webhostapp.com/cadastra.php",
        method:'POST',
        data:form_data,
        contentType:false,
        cache:false,
        processData:false,
        success:function(data){
          navigator.notification.alert(data);
          location.reload(); 
        }
      });
    }    
});

function habilita(){
  $("#titulo").prop("readonly",false);
  $("#autor").prop("readonly",false);
  $("#ano").prop("readonly",false);
}

function desabilita(){
  $("#titulo").prop("readonly",true);
  $("#autor").prop("readonly",true);
  $("#ano").prop("readonly",true);
}

$(document).on("click","#novo",function(){
  habilita();
});

$(document).on("click","#cancelar",function(){
  desabilita();
});


$(document).on("click","#listar",function(){
    $(location).attr("href","lista.html");
});

function preencherLista(){
  var itemlista = "";
  $.ajax({
        type:"post", //como enviar
        url:"https://appmobile3i2.000webhostapp.com/listar.php",//para onde enviar
        dataType:'json',//o que enviar
        //se der certo
        success: function(data){
            $.each(data.livros, function(i, dados){
              itemlista+="<option value='"+dados.codigo+"'>"+dados.titulo+"</option>";
            });
            $("#listalivros").html(itemlista);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
}

$(document).on("change","#listalivros",function(){
  var parametro ={
    "codigo":$("option:selected",("#listalivros")).val()
  }
  
  $.ajax({
        type:"post", //como enviar
        url:"https://appmobile3i2.000webhostapp.com/listarUm.php",//para onde enviar
        data:parametro,
        dataType:'json',//o que enviar
        //se der certo
        success: function(data){
           $("#codigo").val(data.livro.codigo);
           $("#titulo").val(data.livro.titulo);
           $("#autor").val(data.livro.autor);
           $("#ano").val(data.livro.ano);
           $("#imagem").attr('src',"https://appmobile3i2.000webhostapp.com/"+data.livro.imagem);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });
});

$(document).on("click","#deletar",function(){
  var parametro ={
    "codigo":$("#codigo").val()
    
  }
 
  $.ajax({
        type:"post", //como enviar
        url:"https://appmobile3i2.000webhostapp.com/deletar.php",//para onde enviar
        data:parametro,
        //se der certo
        success: function(data){
           location.reload();
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });
});

$(document).on("click","#salvarAlt",function(){
    var parametros = {
      "livro":$("#titulo").val(),
      "autor":$("#autor").val(),
      "ano":$("#ano").val(),
      "codigo":$("#codigo").val()
    }
    // url:"https://dominioappsjussa.000webhostapp.com/cadastra.php",//para onde enviar
    $.ajax({
        type:"post", //como enviar
        url:"https://appmobile3i2.000webhostapp.com/editar.php",//para onde enviar
        data:parametros,//o que enviar
        //se der certo
        success: function(data){
            navigator.notification.alert("msg:"+data);
           location.reload();
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
});

$(document).on("click","#editar",function(){
  habilita();
});

$(document).on("click","#cancelarEdit",function(){
  desabilita();
});

//codigo para chamar a camera

$(document).on("click","#foto",function(){
    navigator.camera.getPicture(onSuccess, onFail, { 
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      saveToPhotoAlbum:true,
      correctOrientation:true
    });

    function onSuccess(imageURI) {
        navigator.notification.alert("imagem registrada com sucesso!");
    }

    function onFail(message) {
       navigator.notification.alert('erro ao capturar imagem: ' + message);
    }
});

