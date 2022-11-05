import $ from 'jquery';
export default function filter(){


    $(document).ready(function(){
        $("#myInput #pesquisar").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myDIV").children().filter(function(index) { 
                index = index -1
                $(`#campo-${index} #campoNome-${index} `).filter(function(){
                    console.log($(this).val())
                    if(!($(this).val().toLowerCase().indexOf(value) > -1)){
                        $(`#campo-${index}`).hide();
                        
                    }else{
                        $(`#campo-${index}`).show();
                        
                    }
                });
               

            });
        
        });
    });
}

