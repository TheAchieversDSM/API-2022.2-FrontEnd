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

        $("#myInputProduct #pesquisar").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myDivProduct").children().filter(function(index) { 
                index = index -1
                $(`#campoProduct-${index} #campoNomeProduct-${index} `).filter(function(){
                    console.log($(this).val())
                    if(!($(this).val().toLowerCase().indexOf(value) > -1)){
                        $(`#campoProduct-${index}`).hide();
                        
                    }else{
                        $(`#campoProduct-${index}`).show();
                        
                    }
                });
               

            });
        
        });

        $("#myInputPackage #pesquisar").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myDivPackage").children().filter(function(index) { 
                index = index -1
                $(`#campoPackage-${index} #campoNomePackage-${index} `).filter(function(){
                    console.log($(this).val())
                    if(!($(this).val().toLowerCase().indexOf(value) > -1)){
                        $(`#campoPackage-${index}`).hide();
                        
                    }else{
                        $(`#campoPackage-${index}`).show();
                        
                    }
                });
               

            });
        
        });

        $("#myInputPromotion #pesquisar").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myDivPromotion").children().filter(function(index) { 
                index = index -1
                $(`#campoPromotion-${index} #campoNomePromotion-${index} `).filter(function(){
                    console.log($(this).val())
                    if(!($(this).val().toLowerCase().indexOf(value) > -1)){
                        $(`#campoPromotion-${index}`).hide();
                        
                    }else{
                        $(`#campoPromotion-${index}`).show();
                        
                    }
                });
               

            });
        
        });

    });
}

