'use strict'

const form = document.querySelector('.needs-validation');
const selectPosition = document.querySelector('#position');
const inputName = document.querySelector('#name');
const inputSurname = document.querySelector('#surname');
const inputCity = document.querySelector('#city');
const inputAge = document.querySelector('#age');
const radioGender = document.querySelectorAll('input[name="gender"]');
const inputExperience = document.querySelector('#experience');
const inputSalary = document.querySelector('#salary');
const checkboxChildren = document.querySelector('#has-children');

const tableBody = document.querySelector('.table > tbody');

const setData = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];

class Worker {
    constructor(name, surname, age, city, gender, hasChildren, position, fullName = '') {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.city = city;
        this.gender = gender;
        this.hasChildren = hasChildren;
        this.position = position;
        this._fullName = fullName;
    }

    get fullName() {
        return this._fullName;
    }

    set fullName(value) {
        this.fullName = value;
    }

    render() {
        const workers = getData('workers');
        tableBody.innerHTML = '';

        workers.forEach((worker, i) => {
            const elem = document.createElement('tr');

            worker.fullName = `${worker.name} ${worker.surname}`;

            elem.insertAdjacentHTML('beforeend', `
                <th scope="row">${(i + 1)}. ${worker.position[0].toUpperCase()}${worker.position.slice(1)}</th>
                <td>${worker.fullName}</td>
                <td>${worker.city}</td>
                <td>${worker.age}</td>
                <td>${worker.gender}</td>
                <td>${worker.experience}</td>
                <td>${worker.salary}</td>
                <td>${worker.hasChildren}</td>
                <td><button id="worker-remove">Remove</button></td>
            `);

            tableBody.append(elem);

            const onRemoveButtonClick = () => {
                this.remove(workers, i);

                setData('workers', workers);
                this.render();
            }
            const bindOnRemoveButtonClick = onRemoveButtonClick.bind(this);

            elem.querySelector('#worker-remove').addEventListener('click', bindOnRemoveButtonClick);
        })
    };

    remove(array, i) {
        array.splice(i, 1);
    };
}

class Mechanic extends Worker {
    constructor(name, surname, age, city, gender, hasChildren, position, experience, salary) {
        super(name, surname, age, city, gender, hasChildren, position);
        this.experience = experience;
        this.salary = salary;
    }
}

class Driver extends Worker {
    constructor(name, surname, age, city, gender, hasChildren, position, experience, salary) {
        super(name, surname, age, city, gender, hasChildren, position);
        this.experience = experience;
        this.salary = salary;
    }
}

let newWorker = new Worker();
newWorker.render();

const createWorker = () => {
    const workers = getData('workers');
    const position = selectPosition.options[selectPosition.selectedIndex].value;

    let gender;
    let hasChildren = 'no';

    radioGender.forEach((item) => {
        if (item.checked) {
            gender = item.id;
        }
    });

    if (checkboxChildren.checked) {
        hasChildren = 'yes';
    }

    if (position === 'mechanic') {
        newWorker = new Mechanic(inputName.value, inputSurname.value, inputAge.value, inputCity.value, gender, hasChildren, position, inputExperience.value, inputSalary.value);
    } else {
        newWorker = new Driver(inputName.value, inputSurname.value, inputAge.value, inputCity.value, gender, hasChildren, position, inputExperience.value, inputSalary.value);
    }

    workers.push(newWorker);
    setData('workers', workers);

    newWorker.render();
};

form.addEventListener('submit', function (evt) {
    if (!form.checkValidity()) {
        evt.preventDefault();
        evt.stopPropagation();
    } else {
        // это из документации bootstrapa, моя строчка только эта >
        createWorker();
    }

    form.classList.add('was-validated');
}, false)
