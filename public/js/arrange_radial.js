/*
Arrange Radial Script
Porter L

    > Arrange divs in a euclidian circle in parent

    2 / 3 / 19 : Initial commit + add templates
    2 / 4 / 19 : Fix null error
    2 / 12 / 19 : Add connections to backend and populate all function for general
*/
console.log("arrange_radial loaded");
var dot_template1 = document.createElement('div'); // template for dot to populate circles
dot_template1.setAttribute('class', 'dot');
dot_template1.setAttribute('id', 'dot1');
var dot_template2 = document.createElement('div'); // template for dot to populate circles
dot_template2.setAttribute('class', 'dot');
dot_template2.setAttribute('id', 'dot2');
var dot_template3 = document.createElement('div'); // template for dot to populate circles
dot_template3.setAttribute('class', 'dot');
dot_template3.setAttribute('id', 'dot3');

function populateAll(){  //change all three voices at the same time [ THIS IS THE ONE THAT SHOULD BE CALLED ON CHANGE ( FOR GENERAL )]
  var n = document.getElementById("step_val").value;
  updateSeq()
  populate(n, 'circle1', 1);
  populate(n, 'circle2', 2);
  populate(n, 'circle3', 3);
  pulses();
}

function populate(n,p,m){ // populate circle with n dots
  var parent = document.getElementById(p);
  if (parent){
    parent.innerHTML = '';
    for (var x = 0; x < n; x++){
      var cln;
      if (m == 1){
        cln = dot_template1.cloneNode(true);
      }
      else if (m == 2){
        cln = dot_template2.cloneNode(true);
      }
      else{
        cln = dot_template3.cloneNode(true);
      }
      parent.appendChild(cln);
    }
    arrange(p); // call to arrange after each time the number of dots changes
  }
}
function arrange(p){ // arrange dots with euclidian spacing
  var parent = document.getElementById(p);
  var children = parent.getElementsByTagName('div');
  var rad = parent.clientWidth / 2;
  var radial_dist = 360 / children.length;
  for (var x = 0; x < children.length; x++){
    var dist_degree = radial_dist * x;
    var dist_radian = dist_degree * (Math.PI / 180);
    var coord_x = Math.cos(dist_radian) * rad + rad - 15;
    var coord_y = Math.sin(dist_radian) * rad + rad - 15;
    children[x].style.bottom = coord_x+'px';
    children[x].style.right = coord_y+'px';
  }
}

function setPulses(id){
    var circle_id = "circle" + String(id+1);
    var parent = document.getElementById(circle_id);
    var children = parent.getElementsByTagName('div');
    for (var x = 0; x < cycles[id].length;x++){
        if (cycles[id][x] == 1){
            children[x].setAttribute('class', 'dot_pulse');
        }else{
            children[x].setAttribute('class', 'dot');
        }
    }
}

function pulses(){
    for (var i = 0; i < 3; i++){
        setPulses(i);
    }
}
console.log(cycles);
