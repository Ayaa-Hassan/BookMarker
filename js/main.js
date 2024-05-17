var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var searchSiteInput = document.getElementById("searchSite");
var submitButtonInput = document.getElementById("submitButton");
var updateButtonInput = document.getElementById("updateButton");
var updateIndex = 0;
var siteContainer = [];

if (localStorage.getItem("sites") != null) {
    siteContainer = JSON.parse(localStorage.getItem("sites"));
    displaySite()
}


function addSite(){
    if (validateSitName() == true && validateSitUrl()==true) {
       var siteData = {
           name: siteNameInput.value,
           url: siteUrlInput.value,
       }

       siteContainer.push(siteData);

       localStorage.setItem("sites", JSON.stringify(siteContainer));
       displaySite()
       clearInput()
   }
}


function displaySite() {
    var cartona = '';
    for (var i = 0; i < siteContainer.length; i++) {
        cartona += `
         <tr>
            <td>${i+1}</td>
            <td>${siteContainer[i].name}</td>
        <td>
            <a href="${siteContainer[i].url}"><button class="btn btn-visit"  >
                <i class="fa-solid fa-eye pe-2"></i>Visit
            </button></a>
        </td>
         <td>
            <button class="btn btn-update pe-2"  onclick="setData(${i})">
                <i class="fa-solid fa-wrench"></i>
                Update
            </button>
        </td>
        <td>
            <button class="btn btn-delete pe-2"  onclick="deleteSite(${i})">
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button>
        </td>
        </tr>
        
        
        `
    }
    document.getElementById("sitesBody").innerHTML=cartona;
}


function searchSite() {
    var search = searchSiteInput.value;
    var cartona = '';

    for (var i = 0; i < siteContainer.length; i++) {
        if (siteContainer[i].name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
            cartona += `
         <tr>
            <td>${i + 1}</td>
            <td>${siteContainer[i].name}</a></td>
        <td>
            <a href="${siteContainer[i].url}"><button class="btn btn-visit"  >
                <i class="fa-solid fa-eye pe-2"></i>Visit
            </button></a>
        </td>
        <td>
            <button class="btn btn-update pe-2"  onclick="">
                <i class="fa-solid fa-wrench"></i>
                Update
            </button>
        </td>
        <td>
            <button class="btn btn-delete pe-2"  onclick="deleteSite(${i})">
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button>
        </td>
        </tr>
        
        
        `
        
       }
    }
    document.getElementById("sitesBody").innerHTML = cartona;


}

function setData(index) {
    updateIndex = index;
    var setSite = siteContainer[index];
    siteNameInput.value = setSite.name;
    siteUrlInput.value = setSite.url;
    submitButtonInput.classList.add("d-none");
    updateButtonInput.classList.remove("d-none");
}

function updateSite() {
    if (validateSitName() == true && validateSitUrl() == true) {
        var siteData = {
            name: siteNameInput.value,
            url: siteUrlInput.value,
        }

        siteContainer.splice(updateIndex, 1, siteData);

        localStorage.setItem("sites", JSON.stringify(siteContainer));
        displaySite()
        updateButtonInput.classList.add("d-none");
        submitButtonInput.classList.remove("d-none");
        clearInput()
    }
}










function deleteSite(index) {
    siteContainer.splice(index,1);

    localStorage.setItem("sites", JSON.stringify(siteContainer));
    displaySite()
}

function clearInput() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
    
}




function validateSitName() {
    var regexName = /^[A-Za-z_]{3,10}$/;
    if (regexName.test(siteNameInput.value) == true) {
        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");



        return true
    } else {
        

        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.remove("is-valid");
        return false
    }


}
function validateSitUrl() {
    var regexUrl = /^(https:\/\/|mailto:\/\/|www\.)[A-Za-z@0-9_\.]{1,30}\.[a-z]{3}$/;
    if (regexUrl.test(siteUrlInput.value) == true) {
       siteUrlInput.classList.add("is-valid");
       siteUrlInput.classList.remove("is-invalid");



        return true
    } else {
        

       siteUrlInput.classList.add("is-invalid");
       siteUrlInput.classList.remove("is-valid");
        return false
    }


}