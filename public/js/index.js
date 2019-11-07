function changeMap() {
  var current_image = document.getElementById("currentMap").src;
  if (current_image == "1.jpg") {
    document.getElementById("currentMap").src = "2.jpg";
  } else if (current_image == "2.jpg") {
    document.getElementById("currentMap").src = "3.jpg";
  } else if (current_image == "3.jpg") {
    document.getElementById("currentMap").src = "4.jpg";
  } else if (current_image == "4.jpg") {
    document.getElementById("currentMap").src = "5.jpg";
  } else if (current_image == "5.jpg") {
    document.getElementById("currentMap").src = "1.jpg";
  }
  document.getElementById("mapzoom").contentWindow.location.reload(true);
}
