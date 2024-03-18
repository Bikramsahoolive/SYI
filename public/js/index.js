

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}












function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}




//SCROLL ANIMATE
var scroll = window.requestAnimationFrame ||
             function(callback){ window.setTimeout(callback, 1000/60)};
var elementsToShow = document.querySelectorAll('.show-on-scroll'); 
function loop() {

    Array.prototype.forEach.call(elementsToShow, function(element){
      if (isElementInViewport(element)) {
        element.classList.add('is-visible');
      } else {
        element.classList.remove('is-visible');
      }
    });

    scroll(loop);
}
loop();

function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}




var myVar;
function myLoader() {
  myVar = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}








//////////////////////////////////////////////////////////

function dataURL(){
  document.querySelector('.modal').style.display='flex';
  let file = document.getElementById('file');
  let textarea = document.getElementById('file-url');
 file = file.files[0];
 console.log(file);
 let size= file.size;
 let filename= file.name;
 let extainsion = filename.split(".")[1];
 if(extainsion!=='pdf'){
  document.getElementById('modal-heading').innerHTML="Opps...Error";
  document.getElementById('modal-content').innerHTML=" Only PDF file allowed.";
  setTimeout(()=>{
    document.querySelector('.modal-content').classList.add('modal-open');
  },500);
  file.value='';
 }else if(size>512000){
  document.getElementById('modal-heading').innerHTML="Opps...Error";
  document.getElementById('modal-content').innerHTML="File size is more than 500KB.";
  setTimeout(()=>{
    document.querySelector('.modal-content').classList.add('modal-open');
  },500);
  file.value='';
 }else{
   let reader= new FileReader();
 reader.addEventListener('load',(e)=>{
  let url = e.target.result;
  textarea.value = url;
  document.querySelector('.modal').style.display='none';
 });
 reader.readAsDataURL(file);
 }

}

function downloadResume(url){
  let a = document.createElement('a');
  a.href=url;
  a.download="SYI_Resume";
  a.click();
}

function deleteData(did){
    fetch('/delete-application',{
      method:'delete',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({id:did})
    })
    .then(response=>{
      if(response.ok){
        // console.log(response.json());
        return response.json();
      }else{
        // console.error(response.json());
      }
    })
    .then(data=>{
      console.log(data);
      if (data.status){
        location.reload();
      }
    }).catch(err=>console.error(err));
}




// let registerForm = document.getElementById('regdForm');
// registerForm.addEventListener('submit',(e)=>{
//   e.preventDefault();

//   submitFormData();
// })



function submitFormData(){

  document.querySelector('.modal').style.display='flex';

  
// document.getElementById('model-heading').innerHTML="";
// document.getElementById('model-heading').innerHTML="";
// document.querySelector('.modal-content').classList.add('modal-open');


let student = document.getElementById('radioOne');
let employ = document.getElementById('radioTwo');
let name = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let male = document.getElementById('male');
let female = document.getElementById('female');
let fileInput = document.getElementById('file');
let file = document.getElementById('file-url');
let type;
if(!student.checked && !employ.checked){
document.getElementById('modal-heading').innerHTML="Opps...Error";
document.getElementById('modal-content').innerHTML="Please Check Applicant Type.";
setTimeout(()=>{
  document.querySelector('.modal-content').classList.add('modal-open');
},500)
  return;
}else if(employ.checked){
  type = "employ";
}else if(student.checked){
  type = "student";
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let validEmail = emailRegex.test(email.value);

if (name.value==''){
  document.getElementById('modal-heading').innerHTML="Opps...Error";
document.getElementById('modal-content').innerHTML=" Name Can't be blank";
setTimeout(()=>{
  document.querySelector('.modal-content').classList.add('modal-open');
},500);
  return;
}
if (email.value==''|| !validEmail ){
  document.getElementById('modal-heading').innerHTML="Opps..Error";
document.getElementById('modal-content').innerHTML="Enter a valid Email";
setTimeout(()=>{
  document.querySelector('.modal-content').classList.add('modal-open');
},500);
  return;
}
let pval = phone.value;
let pvalL = pval.length;

if (pval=='' || pvalL!==10){
  document.getElementById('modal-heading').innerHTML="Opps Error";
document.getElementById('modal-content').innerHTML="Enter a Valid Phone no.";
setTimeout(()=>{
  document.querySelector('.modal-content').classList.add('modal-open');
},500);
  return;
}

if (file.value==''){
  document.getElementById('modal-heading').innerHTML="Opps Error";
document.getElementById('modal-content').innerHTML="Choose a valid file for resume.";
setTimeout(()=>{
  document.querySelector('.modal-content').classList.add('modal-open');
},500);
  return;
}
let gender;
if(!male.checked && !female.checked){
  document.getElementById('modal-heading').innerHTML="Opps Error";
document.getElementById('modal-content').innerHTML="Gender Not Checked.";
setTimeout(()=>{
  document.querySelector('.modal-content').classList.add('modal-open');
},500);
  return;
}else if(male.checked){
  gender = "male";
}else if(female.checked){
  gender = "female";
}



let data = {
  type:type,
  name:name.value,
  email:email.value,
  phone:phone.value,
  gender:gender,
  file:file.value
      }
console.log(data);


 fetch('/request-form',{
    method:'post',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
})
.then((response)=>{
  if (!response.ok)throw new Error("network response was not ok.");
  return response.json();
})
.then((data)=>{
  console.log(data);
  if(data.status){
document.getElementById('modal-heading').innerHTML="Successfully Registered.";
document.getElementById('modal-content').innerHTML=`Your Request submitted with request id : ${data.id},Please wait for our response, thank You.`;
setTimeout(()=>{
  document.querySelector('.modal-content').classList.add('modal-open');
},500);

student.checked = false;
employ.checked = false;
name.value = "";
email.value = "";
phone.value = "";
male.checked = false;
female.checked =false;
fileInput.value = "";
file.value ="";


  }else{
    document.getElementById('modal-heading').innerHTML=" Server Error.";
document.getElementById('modal-content').innerHTML=data.message;
setTimeout(()=>{
  document.querySelector('.modal-content').classList.add('modal-open');
},500);

  }
})
.catch((err)=>console.log(err));


}


function closeModal(){
  setTimeout(()=>{
    document.querySelector('.modal').style.display='none';
  },500)
    
    document.querySelector('.modal-content').classList.remove('modal-open');
}





function loginUser(){
  document.querySelector('.modal').style.display='flex';
  let username = document.getElementById('username');
  let password = document.getElementById('password');

  fetch('/login',{
    method:'post',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({username:username.value,password:password.value})
  })
  .then((response)=>response.json())
  .then((res)=>{
    if(res.status==false){

      document.getElementById('modal-heading').innerHTML="Login Failed";
      document.getElementById('modal-content').innerHTML=res.message;
      setTimeout(()=>{
        document.querySelector('.modal-content').classList.add('modal-open');
      },500);

    }else if(res.status){
      username.value="";
      password.value="";
      document.querySelector('.modal').style.display='none';
      window.location.href="/reg-data";
    }
  })
}