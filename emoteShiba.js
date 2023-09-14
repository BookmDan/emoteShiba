const apiUrl = 'http://localhost:3000/shibas'; 

let shibaImages = []; // Store the fetched images here

const imageContainer = document.getElementById('imageContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResultContainer = document.getElementById('searchResultContainer');
const searchResultImage = document.getElementById('searchResultImage');

function fetchImages() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      shibaImages = data; // Remove the 'const' keyword here

      // Split the array into rows of 3 for the 3x3 grid
      const rows = chunkArray(shibaImages, 3);

      // Display the images in a 3x3 grid
      displayImageGrid(rows);
    })
    .catch((error) => {
      console.error('Error fetching images:', error);
    });
}

function chunkArray(array, chunkSize) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  return chunkedArray;
}

function displayImageGrid(rows) {
  imageContainer.innerHTML = '';

  rows.forEach((row) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'image-row';

    row.forEach((imageData) => {
      const { id, imageUrl, name, tag } = imageData;
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'image-wrapper';

      const image = document.createElement('img');
      image.src = imageUrl;
      image.alt = `Image ${id} - ${name}`;
      image.title = `Tag: ${tag}`;

      const tagOverlay = document.createElement('div');
      tagOverlay.className = 'tag-overlay';
      tagOverlay.textContent = tag; 

      // Add a like button initially hidden
      const likeButton = document.createElement('div');
      likeButton.className = 'like-button';
      likeButton.style.display = 'none';
      likeButton.innerHTML = '<button id="likeButton">Like</button>';

      // Double-click event to show the like button
      image.addEventListener('dblclick', (event) => {
        // Prevent the event from bubbling up to the document click listener
        event.stopPropagation();

        // Toggle the visibility of the like button within the same image wrapper
        likeButton.style.display = likeButton.style.display === 'none' ? 'block' : 'none';
      });

      image.addEventListener('mouseenter', () => {
        image.classList.add('highlighted'); 
      });

      image.addEventListener('mouseleave', () => {
        image.classList.remove('highlighted'); 
      });

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(tagOverlay); 
      imageWrapper.appendChild(likeButton); 
      rowDiv.appendChild(imageWrapper);
    });

    imageContainer.appendChild(rowDiv);
  });
}

function searchForTag(keyword) {
  const matchedImages = shibaImages.filter((image) =>
    image.tag.toLowerCase() === keyword.toLowerCase()
  );

  removeHighlightFromImages();

  if (matchedImages.length > 0) {
    matchedImages.forEach((matchedImage) => {
      const imageWrapper = document.querySelector(`.image-wrapper img[alt="${matchedImage.name}"]`);
      if (imageWrapper) {
        imageWrapper.parentElement.classList.add('highlighted');
      }
    });

    const firstMatchedImageURL = matchedImages[0].imageUrl;
    showSearchImage(firstMatchedImageURL);
    console.log('Matched images:', matchedImages); 
  } else {
    console.log('No matches found.');
  }
  searchInput.value = ""
}

function showSearchImage(imageURL) {
  searchResultImage.src = imageURL;
  searchResultContainer.style.display = 'block';
}

function removeHighlightFromImages() {
  const images = document.querySelectorAll('.image-wrapper img');
  images.forEach((image) => {
    image.classList.remove('highlighted');
  });
}

// // Add this inside your displayImageGrid function after creating the image elements
// image.addEventListener('dblclick', () => {
//   const likeButton = imageWrapper.querySelector('.like-button');
//   if (likeButton) {
//     likeButton.style.display = 'block';
//   }
// });

// // Add this code to hide the like button when clicking anywhere else on the page
// document.addEventListener('click', (event) => {
//   const likeButtons = document.querySelectorAll('.like-button');
//   likeButtons.forEach((likeButton) => {
//     if (!likeButton.contains(event.target)) {
//       likeButton.style.display = 'none';
//     }
//   });
// });


searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    const userInput = searchInput.value.trim();
    if (userInput) {
      searchForTag(userInput);
    }
  }
});

searchButton.addEventListener('click', () => {
  const keyword = searchInput.value.trim();
  if (keyword) {
    searchForTag(keyword);
  }
});

fetchImages();
