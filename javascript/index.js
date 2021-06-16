const fetchData = () => {
	return fetch('user.json')
	.then(response => response.json())
	.then(data => {
		return data;
	})
}

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

const changeLabelPosition = (e) => {
	const label = e.target.nextElementSibling;
	if (e.target.value)
		label.setAttribute('style', 'transform: translateY(-70%); font-size: 1.2rem;');
	else
		label.setAttribute('style', 'left: 2%; top: 25%;');
}

const changeRoleLabel = (e) => {
	const label = e.target.nextElementSibling;
	console.log(label);
	if (e.target.value)
		label.setAttribute('style', 'display:none');
	else 
		label.setAttribute('style', 'display:inline-block');
}

const removeErrorMessage = () => {
	if (document.querySelector('.error-message'))
		document.querySelector('.error-message').remove();
}

const validationErrorDisplay = (errorMessage) => {
	removeErrorMessage();
	const text = document.createElement('p');
	text.className = 'error-message';
	text.setAttribute('style', 'font-size: 1.5rem; color: red; margin-top: 2rem');
	const section = document.querySelector('.new-user-details');
	text.innerHTML = errorMessage;
	section.appendChild(text);
}

const formValidation = (e) => {
	e.preventDefault();
	removeErrorMessage();
	let errorMessages = [];
	const alphanumeric = /^[a-z0-9]+$/i;
	const validEmail = /\S+@\S+\.\S+/;
	if (!alphanumeric.test(username.value))
		errorMessages.push('Username must be Alphanumeric.');
	if (!validEmail.test(email.value))
		errorMessages.push('Enter valid email id.')
	if (!username.value || !email.value || !firstName.value || !lastName.value || !role.value)
		errorMessages.push('All fields must be filled.')

	const errorLength = errorMessages.length;
	if (errorLength > 0 && errorMessagesTracker != errorLength) {
		let message = '' ;
		errorMessagesTracker = errorLength;
		errorMessages.forEach(errorMessage => { 
			message += errorMessage + ' ';
		});
		validationErrorDisplay(message);
	}	
}

displayUserList();
let errorMessagesTracker = 0 ;
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const role = document.querySelector('#role');
username.addEventListener('focusout', changeLabelPosition);
email.addEventListener('focusout', changeLabelPosition);
firstName.addEventListener('focusout', changeLabelPosition);
lastName.addEventListener('focusout', changeLabelPosition);
role.addEventListener('change', changeRoleLabel);
document.querySelector('form').addEventListener('submit', formValidation);