const fetchData = () => {
	return fetch('user.json')
	.then(response => response.json())
	.then(data => {
		return data;
	})
}

//displays user list table
const displayUserList = async () => {
	const userList = await fetchData();
	const table = document.querySelector('table');
	const tableBody = document.createElement('tbody');
	userList.forEach(user => {
		let row = tableBody.insertRow();
		let name = row.insertCell(0);
		let role = row.insertCell(1);
		let action = row.insertCell(2);
		name.innerHTML = user.firstName + ' ' + user.lastName ;
		role.innerHTML = user.role;
		action.innerHTML = "action";
	});
	table.appendChild(tableBody);
}

//changes label position in the form on focusout
const changeLabelPosition = (e) => {
	const label = e.target.nextElementSibling;
	if (e.target.value)
		label.setAttribute('style', 'transform: translateY(-70%); font-size: 1.2rem;');
	else
		label.setAttribute('style', 'left: 2%; top: 25%;');
}

const changeRoleLabel = (e) => {
	const label = e.target.nextElementSibling;
	if (e.target.value)
		label.setAttribute('style', 'display:none');
	else 
		label.setAttribute('style', 'display:inline-block');
}

const removeMessage = () => {
	if (document.querySelector('.message'))
		document.querySelector('.message').remove();
}

const validationDisplay = (message, textColor) => {
	removeMessage();
	const text = document.createElement('p');
	text.className = 'message';
	text.setAttribute('style', `font-family: sans-serif; 
		font-size: 1.5rem; 
		color: ${textColor}; 
		margin-top: 2rem`);
	const section = document.querySelector('.new-user-details');
	text.innerHTML = message;
	section.appendChild(text);
}

const formValidation = (e) => {
	e.preventDefault();
	let errorMessages = [];
	const allowedUsername = /^[a-z0-9]+$/i;
	const allowedEmail = /\S+@\S+\.\S+/;
	let validate = true;

	if (!allowedUsername.test(username.value))
		errorMessages.push('Username must be Alphanumeric.');
	if (!allowedEmail.test(email.value))
		errorMessages.push('Enter valid email id.');
	if (!username.value || !email.value || !firstName.value || 
		!lastName.value || !role.value || !uploadedImage.value)
		errorMessages.push('All fields must be filled.');
	if (uploadedImageSize > 1000)
		errorMessages.push('Size of Profile Picture should be less then 1Kb.');
	if (uploadedImageType != 'jpg' && uploadedImageType != 'png')
		errorMessages.push('Profile picture should be a png or a jpg file.');

	const errorLength = errorMessages.length;
	if (errorLength > 0) {
		let message = '' ;
		validate = false;
		errorMessagesTracker = errorLength;
		errorMessages.forEach(errorMessage => { 
			message += errorMessage + ' ';
		});
		validationDisplay(message, 'red');
	}

	if (validate) {
		validationDisplay('New User was Added.', 'green');
	}
}

const imageProperties = (e) => {
	uploadedImageSize = e.explicitOriginalTarget.files[0].size;
	uploadedImageType = e.explicitOriginalTarget.files[0].type.split('/')[1];
}

// 
displayUserList();

let uploadedImageSize = 0;
let uploadedImageType = '';

//document elements
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const role = document.querySelector('#role');
const uploadedImage = document.querySelector('#img-upload');
const form = document.querySelector('form');

//events
uploadedImage.addEventListener('change', imageProperties);
username.addEventListener('focusout', changeLabelPosition);
email.addEventListener('focusout', changeLabelPosition);
firstName.addEventListener('focusout', changeLabelPosition);
lastName.addEventListener('focusout', changeLabelPosition);
role.addEventListener('change', changeRoleLabel);
form.addEventListener('submit', formValidation);