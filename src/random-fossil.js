import axios from "axios";
document.addEventListener('DOMContentLoaded', () => {
    const getRandomFossilButton = document.getElementById('get-random-fossil');
  
    getRandomFossilButton.addEventListener('click', async () => {
      try {
        // First we make a GET request to /random-fossil.json
        const response = await axios.get('/random-fossil.json');
  
        // We are going to grab the res.json(randomFossil)
        const { name, img } = response.data;
  
        // then Display the fossil image
        const randomFossilImage = document.getElementById('random-fossil-image');
        randomFossilImage.innerHTML = `<img src="${img}" alt="Random Fossil" />`;
  
        // then Display the fossil name
        const randomFossilName = document.getElementById('random-fossil-name');
        randomFossilName.textContent = name;
      } catch (error) {
        
        console.error('Error fetching random fossil:', error);
      }
    });
  });
