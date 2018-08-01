// Get the modal
var addPostModal = document.getElementById('modalAddPost');
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
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
      if (event.target == modal) {
            addPostModal.style.display = "none";
      }
};