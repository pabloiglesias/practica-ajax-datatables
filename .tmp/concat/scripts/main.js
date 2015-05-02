'use strict';
////////////////////CARGA INICIAL DE LA CLINICAS PARA SU POSTERIOR USO//////////////////
var clinicas = $.ajax({
        
        url: 'php/clinicas.php',
        type: 'GET',
        dataType: 'json'

    })
        .done(function(data) {
            $.each(data, function(index) {
                $('.listaClinicas').append('<option class="option" value="'+data[index].id_clinica+'" >' + data[index].nombre + '</option>');
            });
        })
        .fail(function() {
            console.log("error al cargar la lista de clinicas");
        })
        .always(function() {
            console.log("complete");
        });
/////////////////////carga de los datos de la tabla/////////////////////////////////////////
$(document).ready(function(){
$('#miTabla').DataTable({
    	   'processing': true,
           'serverSide': true,
           'ajax': 'php/cargar.php',           
           'language': {
               'sProcessing': 'Procesando...',
               'sLengthMenu': 'Mostrar _MENU_ registros',
               'sZeroRecords': 'No se encontraron resultados',
               'sEmptyTable': 'Ningún dato disponible en esta tabla',
               'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
               'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
               'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
               'sInfoPostFix': '',
               'sSearch': 'Buscar:',
               'sUrl': '',
               'sInfoThousands': ',',
               'sLoadingRecords': 'Cargando...',
               'oPaginate': {
                   'sFirst': 'Primero',
                   'sLast': 'Último',
                   'sNext': 'Siguiente',
                   'sPrevious': 'Anterior'
               },
               'oAria': {
                   'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
                   'sSortDescending': ': Activar para ordenar la columna de manera descendente'
               }
           },
           'columns': [{
               'data': 'nombre_doctor'
           }, {
               'data': 'numcolegiado'
           }, {
               'data': 'nombre_clinica'
           }, {
               'data': 'numcolegiado',
               /*añadimos las clases editarbtn y borrarbtn para procesar los eventos click de los botones. No lo hacemos mediante id ya que habrá más de un
               botón de edición o borrado*/
               'render': function(data) {
                   return '<button class="editar btn btn-primary " value=' + data + '>Editar</button>';
               }
           },{
               'data': 'numcolegiado',
                'render': function(data) {
                   return '<button class=" borrar btn btn-warning " value=' + data + '>Borrar</button>';
               }
           }
       	]
       });
});
////////////// Modal ///////////////////////

///////////// Editar doctor/////////////////
$('#mitabla').on('click', '#editar', function (e) {
           e.preventDefault();
           var nRow = $(this).parents('tr')[0];
           var aData = $('#miTabla').row(nRow).data();
           $('.inputNombre').val(aData.nombre_doctor);
           $('#numcolegiado').val(aData.numcolegiado);
           var clinicasOn = aData.clinicas;
           var clin = clinicasOn.split(',');
           $('#forEditar').modal('show');
            });
$('#editarbtn').click(function (e) {
  e.preventDefault();
  $('#formulario').validate({
    rules: {
      nombre: {
        required: true,
        lettersonly: true
      },
      numcolegiado: {
        digits: true
      },
      clinicas: {
        required: true,
        minlength: '1'
      }
    }
  });
});
 