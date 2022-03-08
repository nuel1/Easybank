const hero = document.querySelector(".hero__header");

const observerForPageHeader = {
  header: document.querySelector("div.desktop__page__header"),
  isIntersecting: false,

  option: {
    root: null,
    rootMargin: "-84px",
  },

  toggleHeaderAppearance() {
    if (self.innerWidth >= 970) {
      if (this.isIntersecting) {
        this.header.classList.replace("fadeIn", "fadeOut");
        this.header.setAttribute("aria-hidden", "true");
        setTimeout(() => {
          this.header.classList.add("hide");
        }, 301);

        return;
      }
      this.header.classList.remove("hide");
      this.header.classList.replace("fadeOut", "fadeIn");
      this.header.setAttribute("aria-hidden", "false");
    }
  },

  callback(entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      observerForPageHeader.isIntersecting = true;
      observerForPageHeader.toggleHeaderAppearance();
    } else {
      observerForPageHeader.isIntersecting = false;
      observerForPageHeader.toggleHeaderAppearance();
    }
  },
};

const observer = new IntersectionObserver(
  observerForPageHeader.callback,
  observerForPageHeader.option
);
observer.observe(hero);

const observeForPageContent = {
  option: {
    root: null,
  },

  callback(entries) {
    const entry = entries[0];

    const mobileAction = () => {
      if (entry.isIntersecting) {
        entry.target.classList.replace("slideDown", "slideUp");
      }
    };

    const desktopAction = () => {
      const smoothTransition = () => {
        [...entry.target.children].forEach((element, index) => {
          setTimeout(function () {
            element.classList.replace("slideDown", "slideUp");
          }, 300 * index);
        });
      };

      if (entry.isIntersecting) {
        if (entry.target.tagName == "UL") {
          smoothTransition();
        }
        entry.target.classList.replace("slideDown", "slideUp");
      }
    };

    this.flag ? mobileAction() : desktopAction();
  },

  flag: true,
};

const featureHeader = document.querySelector(".features__header h2");
const featurePara = document.querySelector(".features__header p");
const featuresList = document.querySelector(".features__list");
const articleHeader = document.querySelector(".articles__header h2");
const articlesList = document.querySelector(".articles__list");
const heroInfo = document.querySelector(".wow");

self.addEventListener("load", () => {
  if (self.innerWidth < 714) {
    const targets = [
      ...featuresList.children,
      ...articlesList.children,
      featureHeader,
      featurePara,
      articleHeader,
      heroInfo,
    ];

    const observerTwo = new IntersectionObserver(
      observeForPageContent.callback,
      observeForPageContent.option
    );

    targets.forEach((element) => {
      observerTwo.observe(element);
    });
  } else {
    observeForPageContent.flag = false;

    heroInfo.classList.replace("slideDown", "slideUp");

    const targets = [
      featuresList,
      articlesList,
      featureHeader,
      featurePara,
      articleHeader,
    ];

    const observerTwo = new IntersectionObserver(
      observeForPageContent.callback,
      observeForPageContent.option
    );

    targets.forEach((element) => {
      observerTwo.observe(element);
    });
  }
});

const mobileDropDown = {
  mobileNav: document.querySelector(".nav__toggle__container"),
  mobileToggleIcon: document.querySelector(".menu__iconbox a"),

  toggleDropDown(e) {
    e.preventDefault();
    e.stopPropagation();

    if (mobileDropDown.mobileNav.getAttribute("aria-hidden") === "true") {
      mobileDropDown.mobileNav.setAttribute("aria-hidden", "false");
      mobileDropDown.mobileNav.classList.replace("fadeOut", "fadeIn");
      mobileDropDown.mobileNav.classList.remove("hide");

      mobileDropDown.mobileToggleIcon.children[0].classList.add("hide");
      mobileDropDown.mobileToggleIcon.children[1].classList.remove("hide");
    } else {
      mobileDropDown.mobileNav.setAttribute("aria-hidden", "true");
      mobileDropDown.mobileNav.classList.replace("fadeIn", "fadeOut");
      mobileDropDown.mobileToggleIcon.children[0].classList.remove("hide");
      mobileDropDown.mobileToggleIcon.children[1].classList.add("hide");
      setTimeout(() => {
        mobileDropDown.mobileNav.classList.remove("hide");
      }, 301);
    }
  },
};

mobileDropDown.mobileToggleIcon.addEventListener(
  "click",
  mobileDropDown.toggleDropDown
);
