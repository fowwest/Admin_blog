// Get the modal
var deletePostModal = document.getElementById('deletePostModal');
// Get the button that opens the modal
var btn = document.getElementById("deletePostBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeDeletePost")[0];
// When the user clicks the button, open the modal
btn.onclick = function() {
      deletePostModal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
      deletePostModal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
      if (event.target == modal) {
            deletePostModal.style.display = "none";
      }
};