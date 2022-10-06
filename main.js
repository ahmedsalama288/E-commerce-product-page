// Functions

// Header Section
// [1] header cart
let cartDiv = document.getElementById("div-cart");
let cart = document.getElementById("cart");
let cartDivClickCounter = 1;
cartDiv.addEventListener("click", (ev) => {
  ++cartDivClickCounter;
  if (cartDivClickCounter % 2 == 0) {
    cart.style.display = "block";
  } else {
    cart.style.display = "none";
  }
});
// [2] header mobile nav
let menuIcon = document.getElementById("menu-icon");
let mobileNav = document.getElementById("mobile-nav");
let mobileNavClose = mobileNav.children[0];
menuIcon.addEventListener("click", () => {
  let screenHeight = document.body.scrollHeight + 110; // 110px = margen
  mobileNav.style.cssText = `display:block; height:${screenHeight}px`;
});
mobileNavClose.addEventListener("click", () => {
  mobileNav.style.display = "none";
});

// Start cart counter
let prodCountDiv = document.getElementsByClassName("prod-count")[0];
let prodCountChildren = [...prodCountDiv.children];
let prodCountValue = 0;

prodCountChildren[0].addEventListener("click", () => {
  let value = +prodCountChildren[1].innerHTML;
  if (value !== 0) {
    prodCountChildren[1].innerHTML = value - 1;
    prodCountValue = value - 1;
  }
});
prodCountChildren[2].addEventListener("click", () => {
  let value = +prodCountChildren[1].innerHTML;
  prodCountChildren[1].innerHTML = value + 1;
  prodCountValue = value + 1;
});

// Add to The cart
let prodAddDiv = document.getElementsByClassName("prod-add")[0];

// Get The Price Of The Product from (p.now [span number one])
let proPrice = document.getElementsByClassName("now")[0].children[0];
proPrice = +proPrice.innerHTML.substring(1); // Remove the Dollar Sign

// The Elements (span) That Change [#product-num, #total, #count]
let productnumSpan = document.getElementById("product-num");
let totalSpan = document.getElementById("total");
let countSpan = document.getElementById("count");

// Cart data if The number of added products = 0 show the (#empty-p)
let CartdataDiv = document.getElementById("cart-data");
let displayProductInfo = CartdataDiv.children[1];
let emptyP = CartdataDiv.children[0];

let changeCartData = function (prodCountValue, proPrice) {
  productnumSpan.innerHTML = prodCountValue;
  totalSpan.innerHTML = `$${proPrice * prodCountValue}.00`;
  countSpan.innerHTML = prodCountValue;
};
let ChangeDisplayProductInfo = function (Info, empty) {
  displayProductInfo.style.display = Info;
  emptyP.style.display = empty;
  // if the product count is zero
  if (empty === "block") {
    countSpan.style.display = "none";
    prodCountChildren[1].innerHTML = 0;
  }
};

// When User click on Add to cart
prodAddDiv.addEventListener("click", () => {
  if (prodCountValue >= 0) {
    changeCartData(prodCountValue, proPrice);
    if (prodCountValue == 0) countSpan.style.display = "none";
    else countSpan.style.display = "flex";
  }
  // Cart data if The number of added products is Empty show the (#empty-p)
  if (prodCountValue === 0) {
    ChangeDisplayProductInfo("none", "block");
  } else {
    ChangeDisplayProductInfo("block", "none");
  }
});

// when User click on deleteIcon
let deleteIcon = document.getElementById("delete-icon");
deleteIcon.addEventListener("click", () => {
  changeCartData(0, 0);
  ChangeDisplayProductInfo("none", "block");
});
// End Header [Done]
// ....................................................................
// Image Section
let mainImage = document.getElementById("main-Image");
let thumbnailImages = [...document.getElementsByClassName("thumb")];

let removeAddActiveImage = function (imageList, divIndex) {
  imageList.forEach((el) => el.classList.remove("active-thumbnail"));
  imageList[divIndex].classList.add("active-thumbnail");
};
let changeMainImage = function (imageNumber, image) {
  image.src = `images/image-product-${imageNumber}.jpg`;
};
let previousImage = function (mainImage, thumbnailImages) {
  let imageNum = +mainImage.src.match(/\d.jpg/gi)[0].match(/\d/)[0];
  imageNum === 1 ? (imageNum = 5) : null;
  changeMainImage(imageNum - 1, mainImage);
  thumbnailImages !== ""
    ? removeAddActiveImage(thumbnailImages, imageNum - 2)
    : null;
};

let nextImage = function (mainImage, thumbnailImages) {
  let imageNum = +mainImage.src.match(/\d.jpg/gi)[0].match(/\d/)[0];
  imageNum === 4 ? (imageNum = 0) : null;
  changeMainImage(imageNum + 1, mainImage);
  thumbnailImages !== ""
    ? removeAddActiveImage(thumbnailImages, imageNum)
    : null;
};

let previousNextImage = function (
  span,
  option,
  mainImage,
  thumbnailImages = ""
) {
  span.addEventListener("click", () => {
    if (option === "previous") previousImage(mainImage, thumbnailImages);
    else nextImage(mainImage, thumbnailImages);
  });
};

// addEventListener To All Thumbnail Images
let eventLisThumbnail = function (listName, Image) {
  listName.forEach((el, index) => {
    el.addEventListener("click", () => {
      removeAddActiveImage(listName, index);
      changeMainImage(index + 1, Image);
    });
  });
};
eventLisThumbnail(thumbnailImages, mainImage);

// popup Section
let popupDiv = document.getElementsByClassName("popup")[0];
let popupThumbnail = document.querySelectorAll(
  "main > .popup .product-imgs .thumbnail-images div"
);

// Control Span
let closePopup = document.getElementById("close-popup");
let popupPrevious = document.getElementById("previous");
let popupNext = document.getElementById("next");

// If The User Click On The Main Image
// Open The popup and active The buttons to work with user clicks
mainImage.addEventListener("click", () => {
  if (window.innerWidth > 992) {
    popupDiv.style.display = "block";
  }
});

// Get The Main Popup Image
let popupMainImage = document.querySelector(
  "main .popup .product-imgs .main-image img"
);
// Add Event lisener to The popup Thumbnail
eventLisThumbnail(popupThumbnail, popupMainImage);
// Add Event lisener to The Close Span (icon)
closePopup.addEventListener("click", () => {
  popupDiv.style.display = "none";
});

previousNextImage(popupPrevious, "previous", popupMainImage, popupThumbnail);
previousNextImage(popupNext, "next", popupMainImage, popupThumbnail);

// ................................

// Next And Previous IN Mobile Screen
let mobilePrevious = document.getElementById("previous-mob-screen");
let mobileNext = document.getElementById("next-mob-screen");
previousNextImage(mobilePrevious, "previous", mainImage, "");
previousNextImage(mobileNext, "next", mainImage, "");
