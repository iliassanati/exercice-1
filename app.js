let btnGet = document.querySelector('button');
let myTable = document.querySelector('#table');
const form = document.querySelector('#user-form');

let status = document.getElementById('status');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let userName = document.getElementById('userName');
let registrationNumber = document.getElementById('registrationNumber');
let createdDate = document.getElementById('createdDate');

// Get the modal
var modal = document.getElementById('myModal');

let localUsers = [
  {
    id: '123456789',
    createdDate: '2021-01-06T00:00:00.000Z',
    status: 'En validation',
    firstName: 'Mohamed',
    lastName: 'Taha',
    userName: 'mtaha',
    registrationNumber: '2584',
  },
  {
    id: '987654321',
    createdDate: '2021-07-25T00:00:00.000Z',
    status: 'Validé',
    firstName: 'Hamid',
    lastName: 'Orrich',
    userName: 'horrich',
    registrationNumber: '1594',
  },
  {
    id: '852963741',
    createdDate: '2021-09-15T00:00:00.000Z',
    status: 'Rejeté',
    firstName: 'Rachid',
    lastName: 'Mahidi',
    userName: 'rmahidi',
    registrationNumber: '3576',
  },
];

let storageUsers;

let headers = [
  'ID',
  'Date de création',
  'Etat',
  'Nom',
  'Prénom',
  "Nom d'utilisateur",
  'Matricule',
  'Action',
];

let table = document.createElement('table');
table.className = 'table table-hover';
let headerRow = document.createElement('tr');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getUsers);
  // Add user event
  form.addEventListener('submit', addUser);

  // Remove user event
  myTable.addEventListener('click', removeUser);
}

// Load users from the array
function getUsers() {
  headers.forEach((headerText) => {
    let header = document.createElement('th');

    let textNode = document.createTextNode(headerText);
    header.appendChild(textNode);
    headerRow.appendChild(header);
  });
  table.appendChild(headerRow);

  if (localStorage.getItem('storageUsers') === null) {
    storageUsers = [];
  } else {
    storageUsers = JSON.parse(localStorage.getItem('storageUsers'));
  }

  let users = [...localUsers, ...storageUsers];

  users.forEach((user) => {
    let row = document.createElement('tr');
    let id = document.createElement('td');
    let idTextNode = document.createTextNode(user.id);
    id.appendChild(idTextNode);
    row.appendChild(id);

    let createdDate = document.createElement('td');
    let createdDateTextNode = document.createTextNode(
      convertDate(user.createdDate)
    );
    createdDate.appendChild(createdDateTextNode);
    row.appendChild(createdDate);

    let status = document.createElement('td');
    status.innerHTML = `
     <span class="w3-tag ">${user.status}</span>`;
    {
      user.status === 'En validation'
        ? (status.children[0].className = 'w3-orange')
        : user.status === 'Validé'
        ? (status.children[0].className = 'w3-green')
        : (status.children[0].className = 'w3-red');
    }
    row.appendChild(status);

    let lastName = document.createElement('td');
    let lastNameTextNode = document.createTextNode(user.lastName);
    lastName.appendChild(lastNameTextNode);
    row.appendChild(lastName);

    let firstName = document.createElement('td');
    let firstNameTextNode = document.createTextNode(user.firstName);
    firstName.appendChild(firstNameTextNode);
    row.appendChild(firstName);

    let userName = document.createElement('td');
    let userNameTextNode = document.createTextNode(user.userName);
    userName.appendChild(userNameTextNode);
    row.appendChild(userName);

    let registrationNumber = document.createElement('td');
    let registrationNumberTextNode = document.createTextNode(
      user.registrationNumber
    );
    registrationNumber.appendChild(registrationNumberTextNode);
    row.appendChild(registrationNumber);

    let cell = document.createElement('td');
    const link = document.createElement('a');
    // Add icon html
    link.innerHTML = '<i class="fa fa-trash"></i>';
    // Add class
    link.className = 'delete-item';
    cell.appendChild(link);
    row.appendChild(cell);
    table.appendChild(row);
    table.appendChild(row);
  });

  myTable.appendChild(table);
}

// Add a new user
function addUser(e) {
  if (
    status.value === '' ||
    firstName.value === '' ||
    lastName.value === '' ||
    registrationNumber.value === '' ||
    userName.value === '' ||
    createdDate.value === ''
  ) {
    alert('Veuillez remplir tous les champs svp !!!');
  }

  if (createdDate.value.indexOf('/') === -1) {
    alert(
      "La separation entre le jour, le mois et l'annee doit etre avec des slashs !!!"
    );
  }

  const dateParts = createdDate.value.split('/');
  const userCreatedDate = new Date(
    +dateParts[2],
    dateParts[1] - 1,
    +dateParts[0]
  ).setUTCHours(0, 0, 0, 0);

  const user = {
    id: Math.random().toString().slice(2, 11),
    createdDate: userCreatedDate,
    status: status.value,
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    registrationNumber: registrationNumber.value,
  };

  let row = document.createElement('tr');
  Object.values(user).forEach((text) => {
    let cell = document.createElement('td');
    let textNode = document.createTextNode(text);
    cell.appendChild(textNode);
    row.appendChild(cell);
  });

  // Store in LS
  storeUserInLocalStorage(user);

  // Clear input
  (status.value = ''),
    (firstName.value = ''),
    (lastName.value = ''),
    (registrationNumber.value = ''),
    (userName.value = '');
  createdDate.value = '';

  e.preventDefault();
  modal.style.display = 'none';
}

// Store user
function storeUserInLocalStorage(user) {
  if (localStorage.getItem('storageUsers') === null) {
    storageUsers = [];
  } else {
    storageUsers = JSON.parse(localStorage.getItem('storageUsers'));
  }
  storageUsers.push(user);
  localStorage.setItem('storageUsers', JSON.stringify(storageUsers));
}

// Remove User
function removeUser(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Vous etes sure?')) {
      e.target.parentElement.parentElement.parentElement.remove();
      // Remove from Local Storage
      removeUserFromLocalStorage(
        e.target.parentElement.parentElement.parentElement
      );
    }
  }
}

// Remove from Local Storage
function removeUserFromLocalStorage(userItem) {
  if (localStorage.getItem('storageUsers') === null) {
    storageUsers = [];
  } else {
    storageUsers = JSON.parse(localStorage.getItem('storageUsers'));
  }
  storageUsers.forEach(function (user, index) {
    if (userItem.cells[0].textContent === user.id) {
      storageUsers.splice(index, 1);
    }
  });

  localStorage.setItem('storageUsers', JSON.stringify(storageUsers));
}

// format the createdDate
function convertDate(inputFormat) {
  function pad(s) {
    return s < 10 ? '0' + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
}
