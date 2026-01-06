addEventListener('DOMContentLoaded', () => {
  const url = 'https://api.freeapi.app/api/v1/public/cats/cat/random';
  const Display = document.getElementById('show-img');
  const Desc = document.getElementById('desc');
  const temperament=document.getElementById('temperament');
  const origin=document.getElementById('origin');

  async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Not Found");
    }
    return await response.json();
  }

  function showImg(data) {
    const imgURL = data.data.image;
    Display.innerHTML = `<img src="${imgURL}" />`;
  }
  function showBehaviour(data){
    
    origin.textContent=`Cat is From ${data.data.origin}`
    Desc.textContent=`Description: ${data.data.description}`
    temperament.textContent=`Behaviour: ${data.data.temperament}`
  }

  document.querySelector("button").addEventListener('click', async () => {
    try {
      const data = await fetchData(url);
      console.log(data);
      showImg(data); 
      showBehaviour(data);
    } catch (error) {
      console.error(error);
    }
  });
});
