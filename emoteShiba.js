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

      // function hover() {
      // }
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

  // Remove the highlighting from all images first
  removeHighlightFromImages();

  if (matchedImages.length > 0) {
    // Highlight matched images

    matchedImages.forEach((matchedImage) => {
      const imageWrapper = document.querySelector(`.image-wrapper img[alt="${matchedImage.name}"]`);
      if (imageWrapper) {
        imageWrapper.parentElement.classList.add('highlighted');
      }
    });

    // Display the first matched image

    // Get the imageURL of the first matched image
    const firstMatchedImageURL = matchedImages[0].imageUrl;

    // Display the first matched image
    showSearchImage(firstMatchedImageURL);
    console.log('Matched images:', matchedImages); 
  } else {
    console.log('No matches found.');
  }
  searchInput.value = ""
}

// function searchForTag(keyword) {
//   const matchedImages = shibaImages.filter((image) =>
//     image.tag.toLowerCase() === keyword.toLowerCase()
//   );

//   if (matchedImages.length > 0) {
//     // Remove the highlighting from all images first
//     removeHighlightFromImages();

//     // Highlight matched images

//     // Get the imageURL of the first matched image
//     const firstMatchedImageURL = matchedImages[0].imageUrl;

//     // Display the first matched image
//     showSearchImage(firstMatchedImageURL);
//     // console.log('Matched images:', matchedImages); 
//   } else {
//     // If no matches found, display all images without highlighting
//     removeHighlightFromImages();
//     // console.log('No matches found.');
//   }
//   searchInput.value = ""
// }

// Function to show the matching image
function showSearchImage(imageURL) {
  const searchResultImage = document.getElementById('searchResultImage');
  searchResultImage.src = imageURL;
  searchResultImage.style.display = 'block';
}

// Helper function to remove highlighting from all images
function removeHighlightFromImages() {
  const images = document.querySelectorAll('.image-wrapper img');
  images.forEach((image) => {
    image.classList.remove('highlighted');
  });
}

// Helper function to add highlighting to matched images
function highlightImages(matchedImages) {
  matchedImages.forEach((matchedImage) => {
    const image = document.querySelector(`.image-wrapper img[alt="${matchedImage.name}"]`);
    if (image) {
      image.classList.add('highlighted');
    }
  });
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

function showSearchImage(imageURL) {
  searchResultImage.src = imageURL;
  searchResultContainer.style.display = 'block';
}



// function displayImage() {
//   // for cycling  through 9 images to put tags on
//   if (currentImageIndex < shibaImages.length && currentImageIndex < 9) {
//     const image = document.createElement('img');

//     image.src = shibaImages[currentImageIndex];
//     imageContainer.innerHTML = '';
//     imageContainer.appendChild(image);

//     // user input for enter emotion tag
//     const tagInput = document.createElement('input');
//     tagInput.placeholder = 'Enter an emotion tag';

//     //keydown for input element, or pressing 'enter'
//     tagInput.addEventListener('keydown', function(event) {
//       if (event.key === 'Enter') {
//         event.preventDefault();
//         const tag = tagInput.value.trim(); 
//         // check that it is a non-empty and unique tag
//         if (tag && isTagUnique(tag)) {
//           tagDict[shibaImages[currentImageIndex]] = tag;
//           currentImageIndex++; // move to next image
//           displayImage(); // display next image
//         } else {
//           if (!tag) {
//             alert('Please enter a non-empty tag.');
//           } else {
//             alert('Tag must be unique. This tag has already been used.');
//           }
//         }
//       }
//     });

// Call the fetchImages function to load and display the images
fetchImages();