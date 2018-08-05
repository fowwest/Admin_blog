// Get the modal
var addPostModal = document.getElementById('addPostModal');
// Get the button that opens the modal
var btn = document.getElementById("addPostBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeAddPost")[0];
// When the user clicks the button, open the modal
btn.onclick = function() {
      addPostModal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
      addPostModal.style.display = "none";
};
