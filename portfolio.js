$('#fullpage').fullpage({
  anchors: ['main', 'about', 'projects', 'contact'],
  sectionsColor: ['white']
});

var x = document.getElementById("display").offsetHeight;
x*=2;

var marginSetter = document.querySelector("#container");
marginSetter.style.margin =  x + "px auto";
