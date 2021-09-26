//UI variables.
const form = document.getElementById('form');
const root = document.getElementById('root');
let localData = {};

//Search Form Event.
form.addEventListener('submit', (e) => {
    e.preventDefault();
    //check name value
    const name = e.target.name.value;

    if (name !== '') {
        //display the data
        loadData(name);

    } else {
        alert('Please enter name!');
    }

    //reset the form
    e.target.reset();
})

const loadData = async (name) => {
    try {

        const res = await fetch(`https://api.nationalize.io?name=${name}`);
        const data = await res.json();
        localData = { ...data };

        console.log(localData.country);
     var totalData = await localData.country;
    

     console.log(sortGreatest(totalData));
   var sum = sortGreatest(totalData)
   var sliceData = sum.slice(0,2);
    console.log(sliceData)
  displayData(sliceData)
    } catch (error) {

       console.error(error.message);

    }

}

function sortGreatest(arr) {
    // manually sort array from largest to smallest:
    // loop forwards through array:
    for (let i = 0; i < arr.length; i++) {
      // loop through the array, moving forwards:
      // note in loop below we set `j = i` so we move on after finding greatest value:
      for (let j = i; j < arr.length; j++) {
        if (arr[i] < arr[j]) {
          let temp = arr[i]; // store original value for swapping
          arr[i] = arr[j]; // set original value position to greater value
          arr[j] = temp; // set greater value position to original value
        };
      };
    };
    return arr;
  };

const displayData = (data) => {

    clearData();
    
    if (data.length > 0) {
        //Countries
        for (let i = 0; i < data.length; i++) {

            const mainDiv = document.createElement("div");
          

            const card = document.createElement("div");
           
          

            const cardBody = document.createElement("div");
          

            const cardTitle = document.createElement('h5');
            
            const cardTitleText = document.createTextNode(`Country ID : ${data[i].country_id}`);
            cardTitle.appendChild(cardTitleText);
            
            const cardText = document.createElement('p');
           
            const cardContentText = document.createTextNode(`Probability : ${data[i].probability}`);
            cardText.appendChild(cardContentText);

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            card.appendChild(cardBody);
            mainDiv.appendChild(card);
            root.appendChild(mainDiv);
            
        }
         
    } 
    else {

        const mainDiv = document.createElement("div");
      

        const card = document.createElement("div");
       
      

        const cardBody = document.createElement("div");
        

        const cardTitle = document.createElement('h5');
     
        const cardTitleText = document.createTextNode(`No Countries Found`);
        cardTitle.appendChild(cardTitleText);

        cardBody.appendChild(cardTitle);
        card.appendChild(cardBody);
        mainDiv.appendChild(card);
        root.appendChild(mainDiv);
    }
}

const clearData = () => {
    if (root.children !== null) {
        while (root.lastElementChild) {
            root.removeChild(root.lastElementChild);
        }
    }
}
