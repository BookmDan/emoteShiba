const apiUrl = 'http://localhost:3000/shibas'; 

let shibaImages = []; // Store the fetched images here

const imageContainer = document.getElementById('imageContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

function fetchImages() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const shibaImages = data;

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

      image.addEventListener('mouseenter', () => {
        image.classList.add('highlighted'); 
      });

      image.addEventListener('mouseleave', () => {
        image.classList.remove('highlighted'); 
      });


      imageWrapper.appendChild(image);
      imageWrapper.appendChild(tagOverlay); 
      rowDiv.appendChild(imageWrapper);
    });

    imageContainer.appendChild(rowDiv);
  });
}

function searchForTag(keyword) {
  const matchedImages = shibaImages.filter((image) =>
    image.tag.toLowerCase() === keyword.toLowerCase()
  );

  if (matchedImages.length > 0) {
    // Display only the matched images and highlight them
    displayImages(matchedImages);
  } else {
    // If no matches found, display all images without highlighting
    displayImages(shibaImages);
  }
}

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

// Call the fetchImages function to load and display the images
fetchImages();