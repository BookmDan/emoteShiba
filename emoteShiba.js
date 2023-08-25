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
const searchResultContainer = document.getElementById('searchResultContainer'); // Get the search result container element
const searchResultImage = document.getElementById('searchResultImage');

searchButton.addEventListener('click', () => {
  const userInput = searchInput.value.trim();
  if (userInput) {
    searchForTag(userInput);
  }
});

function searchForTag(tag) {
  const matchedImageURL = Object.keys(tagDict).find(imageURL =>
    tagDict[imageURL].toLowerCase() === tag.toLowerCase()
  );

  if (matchedImageURL) {
    displayImageMatrix(matchedImageURL);
    showSearchImage(matchedImageURL);
  } else {
    alert(`No image associated with the tag: ${tag}`);
  }
}

function showSearchImage(imageURL) {
  searchResultImage.src = imageURL;
  searchResultContainer.style.display = 'block'; // Show the search result container
}

function displayImageMatrix(highlightedImageURL = null) {
  imageContainer.innerHTML = '';

  const imageGrid = document.createElement('div');
  imageGrid.className = 'image-grid';
  imageContainer.appendChild(imageGrid);

  shibaImages.slice(0, 9).forEach(imageURL => {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'image-wrapper';
    if (imageURL === highlightedImageURL) {
      imageWrapper.classList.add('highlighted');
    }

    const image = document.createElement('img');
    image.src = imageURL;

    if (tagDict.hasOwnProperty(imageURL)) {
      const tagDiv = document.createElement('div');
      tagDiv.className = 'tag';
      tagDiv.textContent = tagDict[imageURL];
      imageWrapper.appendChild(tagDiv);
    }

    imageWrapper.appendChild(image);
    imageGrid.appendChild(imageWrapper);

    imageWrapper.addEventListener('click', () => {
      const tag = tagDict[imageURL];
      const userInput = prompt(`Enter the tagword associated with this image (${tag}):`);
      if (userInput === tag) {
        showSelectedImage(imageURL);
        displayImageMatrix(imageURL);
      } else {
        alert('Incorrect tagword. Try again.');
      }
    });
  });
}


function displayImage() {
  if (currentImageIndex < shibaImages.length) {
    const image = document.createElement('img');
    image.src = shibaImages[currentImageIndex];
    imageContainer.innerHTML = '';
    imageContainer.appendChild(image);

    const tagInput = document.createElement('input');
    tagInput.placeholder = 'Enter an emotion tag';
    tagInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        const tag = tagInput.value;
        tagDict[shibaImages[currentImageIndex]] = tag;
        currentImageIndex++;
        displayImage();
      }
    });
    imageContainer.appendChild(tagInput);
  } else {
    displayTags();
  }
}

function displayTags() {
  imageContainer.innerHTML = '';

  const imageGrid = document.createElement('div');
  imageGrid.className = 'image-grid';
  imageContainer.appendChild(imageGrid);

  shibaImages.slice(0, 9).forEach(imageURL => {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'image-wrapper';

    const image = document.createElement('img');
    image.src = imageURL;

    if (tagDict.hasOwnProperty(imageURL)) {
      const tagDiv = document.createElement('div');
      tagDiv.className = 'tag';
      tagDiv.textContent = tagDict[imageURL];
      imageWrapper.appendChild(tagDiv);
    }

    imageWrapper.appendChild(image);
    imageGrid.appendChild(imageWrapper);

    image.addEventListener('click', () => {
      const tag = tagDict[imageURL];
      const userInput = prompt(`Enter the tagword associated with this image (${tag}):`);
      if (userInput === tag) {
        showSelectedImage(imageURL);
        imageWrapper.classList.add('highlighted'); // Highlight the selected image
      } else {
        alert('Incorrect tagword. Try again.');
      }
    });
  });
}

fetchImages();

function showSelectedImage(imageURL) {
  imageContainer.innerHTML = '';
  const selectedImage = document.createElement('img');
  selectedImage.src = imageURL;
  imageContainer.appendChild(selectedImage);
}