console.log('This is my project 6 from javascript course');

// 1. Utility function to get Dom element from string

function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}



// initialize no of parameters
let addedParamsCount =0; 

// Hide the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display='None';


// if the user clicks on params  box, hide the json box

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display ='None';
    document.getElementById('parametersBox').style.display ='block';
})

// if the user clicks on json  box, hide the params box

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('parametersBox').style.display ='None';
    document.getElementById('requestJsonBox').style.display ='block';
});

// if the user clicks on + button, add more parameters

let addParam = document.getElementById('addParam');
addParam.addEventListener('click',()=>{
    let params = document.getElementById('params');
    let string =`<div class="row g-3 my-2">
                        <!-- row g-3 -->
                        <label for="url" class="col-sm-2 col-form-label">parameter${addedParamsCount+2}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" placeholder="Enter parameter ${addedParamsCount+2} key" id="parameterkey${addedParamsCount+2}"
                                aria-label="First name">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" placeholder="Enter parameter ${addedParamsCount+2} value" id="parameterValue${addedParamsCount+2}"
                                aria-label="Last name">
                        </div>
                        <button  class="btn btn-primary col-md-1 deleteParam">-</button>
                    </div>`;
                    // convert the element string to dom element
                    let paramElement = getElementFromString(string);
                    params.appendChild(paramElement);
                    // Add an event listener to remove the parameter on clicking - button
                    
                    let deleteParam = document.getElementsByClassName('deleteParam');
                        for(item of deleteParam){
                            item.addEventListener('click',(e)=>{
                                // TODO : add a confirmation box to confirm parameter deletion
                                e.target.parentElement.remove();
                            })
                        }
                    addedParamsCount++;
});


let submit = document.getElementById('submit');

submit.addEventListener('click',()=>{
    // show please wait in the response box to request from the user
    // document.getElementById('responseJsonText').value = "please wait... Fetching response...";
    document.getElementById('responsePrism').innerHTML = "please wait... Fetching response...";

    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    
    
    // if user has used params option instead of json, collect all the parameters in an object

    if(contentType == 'params'){
        data={};
        for(i=0;i<addedParamsCount+1;i++){
            if(document.getElementById('parameterkey'+(i+1)) !=undefined){

                let key = document.getElementById('parameterkey'+(i+1)).value;
                let value = document.getElementById('parameterValue'+(i+1)).value;
                data[key]=value;
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('requestJsonText').value;
    }

    // log all the values in the console for debugging
    console.log("url is",url);
    console.log("requestType is",requestType);
    console.log("contentType is",contentType);
    console.log("data is",data);


    // if the request type is get, invoke fetch api to create a post request

    if(requestType == 'GET'){
        fetch(url,{
            method:'GET'
        })
        .then(response=> response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
    else{
        fetch(url,{
            method:'POST',
            body:data,

            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
        .then(response=> response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
})