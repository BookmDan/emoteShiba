const apiUrl = 'https://shibe.online/api/shibes?count=10';

const imageContainer = document.getElementById('imageContainer');
const tagDict = {};

let currentImageIndex = 0;

function fetchImages() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(images => {
      shibaImages = images;
      displayImage();
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    });
}

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResultContainer = document.getElementById('searchResultContainer');
const searchResultImage = document.getElementById('searchResultImage');
const messageContainer = document.getElementById('messageContainer'); // New message container

searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    const userInput = searchInput.value.trim();
    if (userInput) {
      searchForTag(userInput);
    }
  }
});

searchButton.addEventListener('click', () => {
  const userInput = searchInput.value.trim();
  if (userInput) {
    searchForTag(userInput);
  }
});

function showMessage(message) {
  messageContainer.textContent = message;
  messageContainer.style.display = 'block';
  setTimeout(() => {
    messageContainer.textContent = '';
    messageContainer.style.display = 'none';
  }, 3000); // Display message for 3 seconds
}

function searchForTag(tag) {
  const matchedImageURL = Object.keys(tagDict).find(
    imageURL => tagDict[imageURL].toLowerCase() === tag.toLowerCase()
  );

  if (matchedImageURL) {
    displayImageMatrix(matchedImageURL);
    showSearchImage(matchedImageURL);
  } else {
    showMessage(`No image associated with the tag: ${tag}`);
  }
}

function showSearchImage(imageURL) {
  searchResultImage.src = imageURL;
  searchResultContainer.style.display = 'block';
}

function displayImageMatrix(highlightedImageURL = null) {
  // clear content of imageContainer
  imageContainer.innerHTML = '';

  const imageGrid = document.createElement('div');
  imageGrid.className = 'image-grid';
  imageContainer.appendChild(imageGrid);

  // iterate through first 9 images from shibaImages api
  shibaImages.slice(0, 9).forEach(imageURL => {
    // create container for image
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'image-wrapper';
    // if current image matches highlighted, then add 'hightlighted' class
    if (imageURL === highlightedImageURL) {
      imageWrapper.classList.add('highlighted');
    }
    // create image elemtn and set source 
    const image = document.createElement('img');
    image.src = imageURL;

    // check if current image url has tag
    if (tagDict.hasOwnProperty(imageURL)) {
      // create div for tag and set its textContent
      const tagDiv = document.createElement('div');
      tagDiv.className = 'tag';
      tagDiv.textContent = tagDict[imageURL];
      imageWrapper.appendChild(tagDiv);
    }
    // append imageEle to image wrapper
    imageWrapper.appendChild(image);
    // append image wrapper to image grid
    imageGrid.appendChild(imageWrapper);

  });
}

function displayImage() {
  // for cycling  through 9 images to put tags on
  if (currentImageIndex < shibaImages.length && currentImageIndex < 9) {
    const image = document.createElement('img');

    image.src = shibaImages[currentImageIndex];
    imageContainer.innerHTML = '';
    imageContainer.appendChild(image);

    // user input for enter emotion tag
    const tagInput = document.createElement('input');
    tagInput.placeholder = 'Enter an emotion tag';

    //keydown for input element, or pressing 'enter'
    tagInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        const tag = tagInput.value.trim(); 
        // check that it is a non-empty and unique tag
        if (tag && isTagUnique(tag)) {
          tagDict[shibaImages[currentImageIndex]] = tag;
          currentImageIndex++; // move to next image
          displayImage(); // display next image
        } else {
          if (!tag) {
            alert('Please enter a non-empty tag.');
          } else {
            alert('Tag must be unique. This tag has already been used.');
          }
        }
      }
    });

    tagInput.focus();
    
    imageContainer.appendChild(tagInput);
  } else {
    displayImageMatrix();
  }
}

function isTagUnique(tag) {
  return Object.values(tagDict).indexOf(tag) === -1;
}

fetchImages();

function showSelectedImage(imageURL) {
  imageContainer.innerHTML = '';
  const selectedImage = document.createElement('img');
  selectedImage.src = imageURL;
  imageContainer.appendChild(selectedImage);
}