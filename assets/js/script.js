// TODO: Добавить этот же скрипт и для подсчёта height блока hero
// TODO: Написать код, который будет автоматически высчитывать font-size шрифта по пропорциям для разных экранов

function adaptiveSize() {
	const layoutSize = 1440;

	const getValueStyle = (item, nameStyle) => (varValue = String(getComputedStyle(item).getPropertyValue(nameStyle)));

	const extremesSize = (min, max) => (3 * (max - min)) / 2;
	const valueChangeSize = (size, desktopSize) => size - desktopSize + desktopSize * (window.innerWidth / layoutSize);
	['margin', 'padding', 'width', 'height', 'font-size'].forEach((nameStyle) => {
		document.querySelectorAll('.adaptive').forEach((item) => {
			let size = String(getValueStyle(item, `--${nameStyle}`)).split(' ');
			let desktopSize = `${extremesSize(size[0], size[1])} ${extremesSize(size[2], size[3])}`.split(' ');

			changeSize = !size[3]
				? valueChangeSize(size[1], desktopSize[0])
				: `${valueChangeSize(size[1], desktopSize[0])} ${valueChangeSize(size[3], desktopSize[1])}`;

			item.style.setProperty(nameStyle, changeSize);
		});
	});
}

function showMoreStudent() {
	document.querySelectorAll('.students__item#visibility-change').forEach((item) => item.classList.toggle('d-n'));

	let visibilityBtn = document.querySelector('.visibility-btn');

	if (visibilityBtn.innerHTML === 'Close') {
		visibilityBtn.innerHTML = 'More';
		document.querySelector('.students__footer').scrollIntoView({
			behavior: 'smooth',
			block: 'end',
		});
		return;
	}
	return (visibilityBtn.innerHTML = 'Close');
}

// function animateAnchorLink() {
// 	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
// 		anchor.addEventListener('click', (e) => {
// 			e.preventDefault();

// 			const blockId = anchor.getAttribute('href').substring(1);

// 			document.getElementById(blockId).scrollIntoView({
// 				behavior: 'smooth',
// 				block: 'start',
// 			});
// 		});
// 	});
// }

async function statusMWAbout(name, event, command) {
	let promise = await fetch('db.json');
	let database = await promise.json();

	let human = {};
	let defaultHuman = {
		name: `<span style="color: red;">Not found</span>`,
		about: {
			country: '...',
			biography: `<span style="color: red; text-transform: uppercase;">Not information...</span>`,
			character: ['...', '...', '...'],
			hobbies: ['...', '...', '...'],
			inANutshell: '...',
		},
	};

	const clearModalContent = () => {
		human = defaultHuman;

		document.querySelector('.about-overlay #country, .about-overlay #biography, .about-overlay #in_a_nutshell').innerHTML = '';
		document.querySelectorAll('.about-overlay #character li').forEach((el) => (el.innerHTML = ''));
		document.querySelectorAll('.about-overlay #hobbies li').forEach((el) => (el.innerHTML = ''));
	};

	const changeModalWindow = (name, element) => {
		clearModalContent();
		let classOfElement = '';
		let peopleList = {};
		element.classList.forEach((className) => (classOfElement = className));

		classOfElement.includes('students') ? (peopleList = database.studentsList) : (peopleList = database.teachersList);

		peopleList.forEach((item) => item.name === name && (human = item));

		let aboutHuman = human.about;

		let dataPerson = [
			{
				categoryData: aboutHuman.character,
				elementCategory: document.querySelectorAll('.about-overlay #character li'),
			},
			{
				categoryData: aboutHuman.hobbies,
				elementCategory: document.querySelectorAll('.about-overlay #hobbies li'),
			},
		];
		dataPerson.forEach((item) => {
			for (let i = 0; i < item.categoryData.length; i++) {
				item.elementCategory[i].innerHTML += item.categoryData[i];
			}
		});

		document.querySelector('.about-overlay #firstname').innerHTML = human.name;
		document.querySelector('.about-overlay #country').innerHTML = aboutHuman.country;
		document.querySelector('.about-overlay #biography').innerHTML = aboutHuman.biography;
		document.querySelector('.about-overlay #in_a_nutshell').innerHTML = aboutHuman.inANutshell;
	};

	document.querySelector('.about-overlay').classList.toggle('d-n');
	return command === 'close' ? clearModalContent() : changeModalWindow(name, event.target);
}

function statusMWApply(event, command) {
	let valueList = {
		name: '',
		surname: '',
		email: '',
		number: '',
	};

	document.querySelector('.apply-overlay').classList.toggle('d-n');
	let inputList = document.querySelectorAll('.apply-overlay__input');

	const clearInput = (event) => {
		if (event === 'close') {
			return inputList.forEach((el) => el.value !== '' && (el.value = ''));
		}
		return event.target.setAttribute('value', '');
	};

	inputList.forEach((el) => {
		el.addEventListener('change', (event) => el.setAttribute('value', event.target.value));
	});

	const getValue = () => {
		inputList.forEach((el) => (valueList[el.id.toLowerCase()] = el.value));
	};

	document.querySelector('#apply-btn').addEventListener('click', getValue);

	return command === 'close' && clearInput('close');
}

function visibleListCountry() {
	document.querySelector('.apply-overlay__triangle').classList.toggle('rotate');
	document.querySelector('.select-overlay').classList.toggle('d-n');
}

function hiddenListCountry() {
	document.querySelector('.select-overlay').classList.add('d-n');
}

function selectedCountry(event) {
	if (event.target.id === 'selected') {
		return;
	}
	let choicedCountryName = event.target.innerHTML;
	document.querySelector('#default-selected').value = choicedCountryName;
	visibleListCountry();
	document.querySelector('#countryName').placeholder = choicedCountryName;
	let itemLiList = document.querySelectorAll('.select-overlay__list li');
	itemLiList.forEach((el) => {
		if (el.id === 'selected') {
			el.id = '';
		}
	});
	event.target.id = 'selected';
}
