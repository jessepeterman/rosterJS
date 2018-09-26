(() => {
  let firstNameInput = document.getElementById('input-name');
  let inputDescription = document.getElementById('input-description');
  let submitBtn = document.getElementById('submit-button');
  let userList = document.querySelector('.user-list');
  let listVisibleSelector = 1;
  let listLength = 0;
  let bottomCard;
  const scrollDownBtn = document.getElementById('scroll-down-btn');

  function User(firstName, description) {
    this.firstName = firstName;
    this.description = description;

    const print = () => {
      console.log(`Hello ${this.firstName}, ${this.description}`);
    };

    const changeName = (
      first = this.firstName,
      description = this.description
    ) => {
      this.firstName = first;
      this.description = description;
    };

    return {
      details: {
        name: this.firstName,
        description: this.description
      },
      printUser: function() {
        print();
      },
      changeName: function(first, description) {
        changeName(first, description);
      }
    };
  }

  const getFormInput = () => {
    const user1 = new User(firstNameInput.value, inputDescription.value);
    return user1.details;
  };

  // const printUser = user => {
  //   user.printUser();
  // };

  const addCard = user => {
    const output = `<div class="card" style="width: 18rem">
      <img src="./Jesse-ProfilePic.JPG" alt="" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${user.name}</h5>
          <p class="card-text">${user.description}</p>
          <a href="#" class="btn btn-primary">LinkedIn</a>
        </div>
          </div>`;

    const div = document.createElement('div');
    div.className = 'col-sm col-md-4';
    div.innerHTML = output;
    userList.appendChild(div);
  };

  submitBtn.addEventListener('click', e => {
    e.preventDefault();
    user = getFormInput();
    addCard(user);
    const users = getStoredUsers();
    users.push(user);
    listLength = users.length;
    localStorage.setItem('users', JSON.stringify(users));
  });

  // const users = [
  //   { name: 'Jesse', description: 'Programmer' },
  //   { name: 'Cassidy', description: 'Wife' },
  //   { name: 'Johnny', description: 'Dude' }
  // ];

  const getStoredUsers = () => {
    const users = JSON.parse(localStorage.getItem('users'));
    localStorage.setItem('users', JSON.stringify(users));
    if (users) {
      return users;
    } else {
      return [];
    }
  };

  const updateStorageUsers = () => {};

  const loadStorage = () => {
    const users = getStoredUsers();
    if (users) {
      populateUsers(users);
    }
  };

  const populateUsers = () => {
    userList.innerHTML = '';
    const users = getStoredUsers();

    const visibleList = users.slice(
      listVisibleSelector !== 1 ? listVisibleSelector : 0,
      listVisibleSelector * 10
    );

    const list = document.createElement('div');
    list.className = 'row';

    for (let i = 0; i < visibleList.length; i++) {
      // for (let i = 0; i < listLength; i++) {
      const output = `<div class="card mb-4" style="width: 18rem">
      <img src="./Jesse-ProfilePic.JPG" alt="" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${visibleList[i].name}</h5>
          <p class="card-text">${visibleList[i].description}</p>
          <a href="#" class="btn btn-primary">LinkedIn</a>
        </div>
          </div>`;
      const div = document.createElement('div');
      div.className = 'col-sm col-lg-4';
      div.innerHTML = output;
      list.appendChild(div);
      bottomCard = div.offsetTop;
    }
    userList.append(list);
  };

  const populateList = () => {
    for (let i = 0; i < listLength; i++) {
      const a = document.createElement('a');
      a.setAttribute('id', i + 1);
      document.querySelector('.select-list-1').appendChild(a);
    }
  };

  document.querySelector('.user-list-selector').addEventListener('click', e => {
    listVisibleSelector = e.target.textContent;
    populateUsers();
    // console.log(`${listVisibleSelector}, ${listLength}, ${bottomCard}`);
  });

  loadStorage();
  populateList();

  window.addEventListener('scroll', e => {
    if (window.scrollTop >= bottomCard) {
      console.log('heyo');
    }
  });

  scrollDownBtn.addEventListener('click', e => {
    e.stopPropagation();
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  });
})();
