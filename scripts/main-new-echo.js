const textarea = document.querySelector("textarea");

textarea.addEventListener("input", () => {
  textarea.style.height = "auto"; // Reset height
  textarea.style.height = textarea.scrollHeight + "px"; // Set to content height
});




window.addEventListener("load", () => {
  const temp = document.createElement("div");

  const styles = getComputedStyle(textarea);
  temp.style.position = "absolute";
  temp.style.visibility = "hidden";
  temp.style.whiteSpace = "pre-wrap";
  temp.style.font = styles.font;
  temp.style.lineHeight = styles.lineHeight;
  temp.style.padding = styles.padding;
  temp.style.width = textarea.offsetWidth + "px";
  temp.textContent = textarea.placeholder;

  document.body.appendChild(temp);
  textarea.style.height = temp.scrollHeight + "px";
  document.body.removeChild(temp);
});

let tags = document.querySelector(".tags");

let add = document.createElement("input");
add.classList.add("tag-input");



function tagsHandler(event) {
  if (event.target.closest(".tag-button")) {
    
    tags.append(add);
  }
}


tags.addEventListener("click", tagsHandler);

tags.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let tag = document.createElement("div");
    tag.textContent = event.target.value;
    tag.classList.add("tag");
    tags.append(tag);
  }
});

tags.addEventListener("blur",() => {
  console.log(event.target);
  if (event.target.closest(".tag-input")) {
    event.target.style.display = "none";
  }
});