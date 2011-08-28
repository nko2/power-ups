//zero ou um
function z(){
  return Math.round(Math.random());
}

var cubo = [];

//andar
for(i=0; i<3; i++){
  var andar = [];
  //linha
  for(j=0; j<3; j++){ 
    var linha = [];
    linha.push([z(),z(),z()]);
    andar.push(linha);
  }
  cubo.push(andar);
}
console.log(JSON.stringify(cubo));