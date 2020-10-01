var rp = require('request-promise');

function generarNombres(...nombres){
    primerNombre = true;
    texto = "";
    nombres.forEach((nombre)=>{
        if(primerNombre)
        {
            texto += "name="+nombre;
            primerNombre = false;
        }
        else{
            texto += "&name="+nombre;
        }
    });
    return texto;
}
function textoProbabilidad(variable){
    return `"${variable.name}" tiene una probabilidad de ${variable.probability.toFixed(2)*100}% de ser un nombre ${variable.gender==="male"?"Masculino":variable.gender==="female"?"Femenino":"Unknown"}`
}
function adivinarGeneroPorNombres(...nombres) {
    var options = {
        uri: `https://api.genderize.io?${generarNombres(...nombres)}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    return rp(options);
}


adivinarGeneroPorNombres("juan","lola","pepe").then(predicciones => {
    if(predicciones.length > 1){
        predicciones.forEach(prediccion => {
            console.log(textoProbabilidad(prediccion));
        });
    }
    else{
        console.log(textoProbabilidad(predicciones));
    }
});