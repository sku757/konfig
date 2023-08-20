const stickItemInit = () => {
  const stickyElement = document.querySelector(".main_watch");
  const rect = stickyElement.getBoundingClientRect();
  console.log(rect.y);

  window.addEventListener("scroll", () => {
    // Get the current vertical scroll position
    const scrollPosition = window.scrollY;

    if (scrollPosition >= rect.y) {
      stickyElement.classList.add("fixed-top-wrapper");
      appendStickyBlock();
    } else {
      stickyElement.classList.remove("fixed-top-wrapper");
      removeStickyBlock();
    }
  });
};

const appendStickyBlock = () => {
  const existingStickyBlock = document.querySelector("#replacement");
  if (!existingStickyBlock) {
    const stickyBlock = document.createElement("div");
    stickyBlock.id = "replacement";
    stickyBlock.style.height = "240px";
    console.log(stickyBlock);
    const buttonElement = document.querySelector(
      "#sticky_watch_block .actions-buttons"
    );
    buttonElement.parentNode.insertBefore(stickyBlock, buttonElement);
  }
};

const removeStickyBlock = () => {
  const existingStickyBlock = document.querySelector("#replacement");
  if (existingStickyBlock) {
    existingStickyBlock.remove();
  }
};

document.addEventListener("DOMContentLoaded", function () {
   if (window.innerWidth < 640) {
    stickItemInit();
  }
});
