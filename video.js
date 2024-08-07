// carousel section
$(document).ready(function () {
  var slider_wrapper = new Swiper(".slider-wrapper", {
    wrapperClass: "slider-list",
    slideClass: "slider-item",
    navigation: {
      nextEl: ".next-slide",
      prevEl: ".prev-slide",
    },
    pagination: {
      type: "bullets",
      el: ".pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 1,
      },
      767: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
      1199: {
        slidesPerView: "auto",
      },
    },
    speed: 700,
    slidesPerView: "auto",
    loop: true,

    on: {
      init: function () {
        var swiper_pagination_bulletwe_style = document.createElement("style");
        swiper_pagination_bulletwe_style.type = "text/css";
        swiper_pagination_bulletwe_style.innerHTML = ` .swiper-pagination-bullet{   background:#fff;
    margin-right:8px;
    transition:.2s;
   } `;
        document
          .getElementsByTagName("head")[0]
          .appendChild(swiper_pagination_bulletwe_style);
        var swiper_pagination_bullethoverwe_style =
          document.createElement("style");
        swiper_pagination_bullethoverwe_style.type = "text/css";
        swiper_pagination_bullethoverwe_style.innerHTML = ` .swiper-pagination-bullet:hover{   opacity:.7;
   } `;
        document
          .getElementsByTagName("head")[0]
          .appendChild(swiper_pagination_bullethoverwe_style);
        var swiper_pagination_bullet_activehoverwe_style =
          document.createElement("style");
        swiper_pagination_bullet_activehoverwe_style.type = "text/css";
        swiper_pagination_bullet_activehoverwe_style.innerHTML = ` .swiper-pagination-bullet-active:hover{   opacity:1;
   } `;
        document
          .getElementsByTagName("head")[0]
          .appendChild(swiper_pagination_bullet_activehoverwe_style);
        var swiper_pagination_fractionwe_style =
          document.createElement("style");
        swiper_pagination_fractionwe_style.type = "text/css";
        swiper_pagination_fractionwe_style.innerHTML = ` .swiper-pagination-fraction{   font-size:16px;
   } `;
        document
          .getElementsByTagName("head")[0]
          .appendChild(swiper_pagination_fractionwe_style);
        var slide_imagewe_style = document.createElement("style");
        slide_imagewe_style.type = "text/css";
        slide_imagewe_style.innerHTML = ` .slide-image{   transition:transform .2s;
   } `;
        document
          .getElementsByTagName("head")[0]
          .appendChild(slide_imagewe_style);
        var slide_contentwe_style = document.createElement("style");
        slide_contentwe_style.type = "text/css";
        slide_contentwe_style.innerHTML = ` .slide-content{   transition:opacity .2s;
   } `;
        document
          .getElementsByTagName("head")[0]
          .appendChild(slide_contentwe_style);
        $(".slider-item").on("mouseover", function () {
          $(this).find(".slide-image").css({
            transform: "scale(1.1)",
          });
          $(this).find(".slide-content").css({
            opacity: ".8",
          });
        });
        $(".slider-item").on("mouseout", function () {
          $(this).find(".slide-image").css({
            transform: "scale(1)",
          });
          $(this).find(".slide-content").css({
            opacity: "1",
          });
        });
      },
    },
  });
});


document.addEventListener("DOMContentLoaded", function () {
  // carousel cursor
  const customCursorAreas = document.querySelectorAll(".custom-cursor-area");
  const arrowCursors = document.querySelectorAll(".arrow-cursor");

  arrowCursors.forEach((arrowCursor) => {
    arrowCursor.style.transition = "opacity 0.3s ease";
  });

  customCursorAreas.forEach((customCursorArea, index) => {
    customCursorArea.style.cursor = "none";

    customCursorArea.addEventListener("mouseenter", () => {
      arrowCursors[index].style.opacity = "1";
    });

    customCursorArea.addEventListener("mouseleave", () => {
      arrowCursors[index].style.opacity = "0";
    });

    customCursorArea.addEventListener("mousemove", (event) => {
      arrowCursors[index].style.left = `${event.offsetX}px`;
      arrowCursors[index].style.top = `${event.offsetY}px`;
    });
  });

  const sections = document.querySelectorAll(".section");
  const stickyBarTitle = document.getElementById("fixedBarTitle");
  const contactSection = document.querySelector(".contact-section");
  const contactSectionItems = document.querySelector(".contact-section-items");
  const mobileContactSection = document.querySelector(
    ".mobile-contact-section-container"
  );
  let activeSection = null;
  const initialTitleContent = stickyBarTitle.textContent;

  function setActiveSection() {
    let newActiveSection = null;
    const fixedBarRect = stickyBarTitle.getBoundingClientRect();
    const fixedBarMidPoint = fixedBarRect.top + fixedBarRect.height / 2;

    // If we're in the contact section, make stickyBarTitle invisible and skip updating it
    if (isElementPartiallyInViewport(contactSection)) {
      stickyBarTitle.style.display = "none";
      contactSectionItems.style.opacity = 1;
      mobileContactSection.style.transform = "translateX(0px)";
      mobileContactSection.style.transition = "all 0.3s ease-in-out";
      return; // Skip the rest of the function
    } else {
      stickyBarTitle.style.display = "block";
    }

    if (window.pageYOffset < 100) {
      stickyBarTitle.textContent = initialTitleContent;
    }

    sections.forEach((section) => {
      const sectionTitle = section.querySelector(
        "h1.section-title, h1.invisible-section-title"
      );
      if (sectionTitle) {
        const titleRect = sectionTitle.getBoundingClientRect();
        const titleMidPoint = titleRect.top + titleRect.height / 2;

        section.style.backgroundColor = "";

        if (Math.abs(titleMidPoint - fixedBarMidPoint) < 150) {
          newActiveSection = section;
        }
      }
    });

    if (activeSection !== newActiveSection) {
      activeSection = newActiveSection;
      if (activeSection) {
        const h1 = activeSection.querySelector(
          "h1.section-title, h1.invisible-section-title"
        );
        if (h1) {
          smoothTextTransition(h1.textContent);
        }
      }
    }

    // Adjust the opacity of contactSectionItems based on visibility
    if (!isElementPartiallyInViewport(contactSection)) {
      contactSectionItems.style.opacity = 0;
      mobileContactSection.style.transform = "translateX(1000px)";
    }
  }

  function smoothTextTransition(newText) {
    let opacity = 1;
    const animationInterval = setInterval(() => {
      opacity -= 0.1;
      stickyBarTitle.style.opacity = opacity;
      if (opacity <= 0) {
        stickyBarTitle.textContent = newText;
        clearInterval(animationInterval);
        opacity = 0;
        fadeIn(stickyBarTitle);
      }
    }, 15);
  }

  function fadeIn(element) {
    clearInterval(element.fadeInterval); // Clear any existing interval
    let opacity = parseFloat(window.getComputedStyle(element).opacity);
    element.style.opacity = opacity; // Ensure the element's current opacity is used
    element.fadeInterval = setInterval(() => {
      opacity += 0.1;
      element.style.opacity = opacity;
      if (opacity >= 1) {
        clearInterval(element.fadeInterval);
      }
    }, 15);
  }

  function fadeOut(element) {
    clearInterval(element.fadeInterval); // Clear any existing interval
    let opacity = parseFloat(window.getComputedStyle(element).opacity);
    element.style.opacity = opacity; // Ensure the element's current opacity is used
    element.fadeInterval = setInterval(() => {
      opacity -= 0.1;
      element.style.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(element.fadeInterval);
      }
    }, 15);
  }

  function isElementPartiallyInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    // Check if any part of the element is in the viewport
    return (
      rect.top < windowHeight &&
      rect.bottom >= 0 &&
      rect.left < windowWidth &&
      rect.right >= 0
    );
  }

  setActiveSection();
  window.addEventListener("scroll", setActiveSection);

  const serviceBlockSection = document.querySelector(".service-block-section");
  const serviceBlocks = document.querySelectorAll(".service-block");
  const images = document.querySelectorAll(".image-hover");
  const customCursor = document.createElement("div");
  customCursor.style.position = "fixed";
  customCursor.style.width = "20px";
  customCursor.style.height = "20px";
  customCursor.style.pointerEvents = "none";
  customCursor.style.zIndex = "-1";
  customCursor.style.opacity = "0";
  customCursor.style.transition = "opacity 0.3s ease-in-out";
  document.body.appendChild(customCursor);

  serviceBlocks.forEach((block, index) => {
    serviceBlockSection.addEventListener("mousemove", (e) => {
      customCursor.style.left = e.clientX - 450 + "px";
      customCursor.style.top = e.clientY - 250 + "px";
    });

    block.addEventListener("mouseenter", () => {
      customCursor.style.opacity = "1";
      customCursor.style.zIndex = 0;
      customCursor.style.backgroundImage = `url(${images[index].src})`;
      customCursor.style.backgroundSize = "cover";
      customCursor.style.width = images[index].width + "px";
      customCursor.style.height = images[index].height + "px";
      customCursor.style.borderRadius = "10px";
      block.style.transition = "opacity 0.3s ease-in-out";

      serviceBlocks.forEach((otherBlock, otherIndex) => {
        if (otherIndex !== index) {
          otherBlock.style.opacity = "0.5";
        }
      });
    });

    block.addEventListener("mouseleave", () => {
      customCursor.style.opacity = "0";
      serviceBlocks.forEach((otherBlock) => {
        otherBlock.style.opacity = "1";
      });
    });
  });

  let isHidden = false;
  const navButton = document.getElementById("open-nav-menu");
  const buttonTitle = document.querySelector(".nav-menu-button-title");
  const menu = document.querySelector(".mobile-nav-menu-container");
  const navItemLinks = document.querySelectorAll(".nav-item-link");
  const navItemMiddle = document.querySelector(".nav-middle-title");
  const fixedSectionContainer = document.querySelector(
    ".fixed-section-container"
  );
  const firstSection = document.getElementById("section1");

  let cumulativeWidth = 0;

  navItemLinks.forEach((item, index) => {
    const minWidth = 40;
    const maxWidth = 70;
    const widthRange = maxWidth - minWidth;
    const increment = widthRange / navItemLinks.length;
    const width = minWidth + index * increment;

    item.addEventListener("click", () => {
      menu.style.transform = "translate(1000px, 0px)";
      menu.style.opacity = 0;
      buttonTitle.textContent = "menu";
      navItemMiddle.textContent = "makeout.studio";
    });

    item.style.width = width + "%";
    cumulativeWidth += width;
  });

  function showMenu() {
    menu.style.transform = "translate(0px, 0px)";
    menu.style.opacity = 1;
    buttonTitle.textContent = "close";
    navItemMiddle.style.textTransform = "lowercase";
    navItemMiddle.textContent = "navigation";
    fixedSectionContainer.style.transform = "translate(-1000px, 0px)";
    fixedSectionContainer.style.opacity = 0;
    mobileContactSection.style.transform = "translateX(1000px)";
  }

  function closeMenu() {
    menu.style.transform = "translate(1000px, 0px)";
    menu.style.opacity = 0;
    buttonTitle.textContent = "menu";
    navItemMiddle.style.textTransform = "uppercase";
    navItemMiddle.textContent = "makeout.studio";

    if (!isHidden) {
      fixedSectionContainer.style.transform = "translate(0px, 0px)";
      fixedSectionContainer.style.opacity = 1;
    } else {
      fixedSectionContainer.style.transform = "translate(-1000px, 0px)";
      fixedSectionContainer.style.opacity = 0;
      mobileContactSection.style.transform = "translateX(0px)";
    }
  }

  navButton.addEventListener("click", () => {
    if (menu.style.opacity == 0) {
      showMenu();
    } else {
      closeMenu();
    }
  });

  function handleScroll() {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const fixedSectionBottom =
      fixedSectionContainer.getBoundingClientRect().bottom;
    const firstSectionTop = firstSection.getBoundingClientRect().top;

    if (fixedSectionBottom >= firstSectionTop && !isHidden) {
      fixedSectionContainer.style.transform = "translateX(-1000px)";
      isHidden = true;
    } else if (fixedSectionBottom < firstSectionTop && isHidden) {
      fixedSectionContainer.style.transform = "translateX(0px)";
      isHidden = false;
    }

    if (scrollPosition <= firstSectionTop) {
      fixedSectionContainer.style.transform = "translateX(0px)";
      fixedSectionContainer.style.opacity = 1;
      isHidden = false;
    }
  }

  window.addEventListener("scroll", handleScroll);

  // video section
  const cmsVideoLinks = document.querySelectorAll(".cms-video-link");
  cmsVideoLinks.forEach((link) => {
    let videoUrl = link.innerText.trim();
    if (videoUrl) {
      if (videoUrl.includes("youtube.com")) {
        videoUrl += "&autoplay=1&controls=0&loop=1";
      } else if (videoUrl.includes("vimeo.com")) {
        videoUrl += "&autoplay=1&muted=1&controls=0&loop=1";
      }

      const iframe = document.createElement("iframe");
      iframe.src = videoUrl;
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.frameBorder = "0";

      const videoReplacer = link
        .closest(".slider-item")
        .querySelector(".video-replacer");
      if (videoReplacer) {
        const parentContainer = videoReplacer.parentElement;
        parentContainer.innerHTML = "";
        parentContainer.appendChild(iframe); 
      }
    }
  });
  
});
