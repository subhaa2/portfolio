(function () {
  const galleries = Array.from(document.querySelectorAll("[data-gallery]"));

  galleries.forEach(function (gallery) {
    const stageImage = gallery.querySelector("[data-gallery-image]");
    const caption = gallery.querySelector("[data-gallery-caption]");
    const thumbnails = Array.from(gallery.querySelectorAll("[data-gallery-thumb]"));
    const prevButton = gallery.querySelector("[data-gallery-prev]");
    const nextButton = gallery.querySelector("[data-gallery-next]");
    let currentIndex = 0;

    if (!stageImage || thumbnails.length === 0 || !prevButton || !nextButton) {
      return;
    }

    function setSlide(index) {
      currentIndex = (index + thumbnails.length) % thumbnails.length;

      thumbnails.forEach(function (thumb, thumbIndex) {
        const isActive = thumbIndex === currentIndex;
        thumb.classList.toggle("is-active", isActive);
        thumb.setAttribute("aria-pressed", String(isActive));
      });

      const activeThumb = thumbnails[currentIndex];
      stageImage.src = activeThumb.dataset.src;
      stageImage.alt = activeThumb.dataset.alt;

      if (caption) {
        caption.textContent = activeThumb.dataset.caption;
      }
    }

    thumbnails.forEach(function (thumb, index) {
      thumb.addEventListener("click", function () {
        setSlide(index);
      });
    });

    prevButton.addEventListener("click", function () {
      setSlide(currentIndex - 1);
    });

    nextButton.addEventListener("click", function () {
      setSlide(currentIndex + 1);
    });
  });
}());
