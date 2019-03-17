var ListOfIcons = ["icon0","icon1","icon2","icon3"]

function show1(inpt) {
  var div1 = document.getElementById("infoDiv");
  div1.style.display = "none";
  var div2x = document.getElementById("workDiv");
  div2x.style.display = "none";
  var div2 = document.getElementById("formationDiv");
  div2.style.display = "none";
  var div3 = document.getElementById("hobbiesDiv");
  div3.style.display = "none";


  var toShow = document.getElementById(inpt);
  toShow.style.display = "block";


  if (inpt == "formationDiv") {
    for (var i = 0; i < ListOfIcons.length; i++) {
      var iconoff = document.getElementById(ListOfIcons[i]);
      iconoff.classList.remove('circled-active'); iconoff.classList.add('circled');
    }

    var iconon = document.getElementById("icon1");
    iconon.classList.remove('circled')
    iconon.classList.add('circled-active');
  }

  if (inpt == "workDiv") {
    for (var i = 0; i < ListOfIcons.length; i++) {
      var iconoff = document.getElementById(ListOfIcons[i]);
      iconoff.classList.remove('circled-active'); iconoff.classList.add('circled');
    }
    var iconon = document.getElementById("icon2");
    iconon.classList.remove('circled')
    iconon.classList.add('circled-active');
  }

  if (inpt == "hobbiesDiv") {
    for (var i = 0; i < ListOfIcons.length; i++) {
      var iconoff = document.getElementById(ListOfIcons[i]);
      iconoff.classList.remove('circled-active'); iconoff.classList.add('circled');
    }
    var iconon = document.getElementById("icon3");
    iconon.classList.remove('circled')
    iconon.classList.add('circled-active');
  }

  if (inpt == "infoDiv") {
    for (var i = 0; i < ListOfIcons.length; i++) {
      var iconoff = document.getElementById(ListOfIcons[i]);
      iconoff.classList.remove('circled-active'); iconoff.classList.add('circled');
    }
    var iconon = document.getElementById("icon0");
    iconon.classList.remove('circled')
    iconon.classList.add('circled-active');
  }
}

document.getElementById('hobbiesDiv').onchange = function() {
  document.getElementById('mailCV').disabled = this.checked;
  if (document.getElementById('defMail').checked == 1) {
    document.getElementById('mailCV').placeholder = "Emailoo"
  }
  if (document.getElementById('defMail').checked == 0) {
    document.getElementById('mailCV').placeholder = "";
    document.getElementById('mailCV').select = 1;
  }
};


// duplication
var i = 0;

function duplicate() {
  var original = document.getElementById('duplicater' + i);
  var clone = original.cloneNode(true); // "deep" clone
  clone.id = "duplicater" + ++i; // there can only be one element with an ID
  original.parentNode.appendChild(clone);
}
function work0() {
  var original = document.getElementById('work' + i);
  var clone = original.cloneNode(true); // "deep" clone
  clone.id = "work" + ++i; // there can only be one element with an ID
  original.parentNode.appendChild(clone);
}
function hobby0() {
  var original = document.getElementById('hobby' + i);
  var clone = original.cloneNode(true); // "deep" clone
  clone.id = "hobby" + ++i; // there can only be one element with an ID
  original.parentNode.appendChild(clone);
}
