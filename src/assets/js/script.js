// TODO: Добавить этот же скрипт и для подсчёта height блока hero
// TODO: Написать код, который будет автоматически высчитывать font-size шрифта по пропорциям для разных экранов

const layoutSize = 1440;

let adaptive = document.querySelectorAll('.adaptive');

const getValueStyle = (item, name_style) => (varValue = String(getComputedStyle(item).getPropertyValue(name_style)));

const extremesSize = (min, max) => (3 * (max - min)) / 2;

const valueChangeSize = (size, desktopSize) => size - desktopSize + desktopSize * (window.innerWidth / layoutSize);

const adaptiveForEach = (name_style) => {
	return adaptive.forEach(function (item) {
		let size = String(getValueStyle(item, `--${name_style}`)).split(' ');

		let desktopSize = `${extremesSize(size[0], size[1])} ${extremesSize(size[2], size[3])}`.split(' ');

		let changeSize =
			size[2] === undefined && size[3] === undefined
				? valueChangeSize(size[1], desktopSize[0])
				: `${valueChangeSize(size[1], desktopSize[0])} ${valueChangeSize(size[3], desktopSize[1])}`;

		item.style.setProperty(name_style, changeSize);
	});
};

const changeVar = () => {
	let sizeList = ['margin', 'padding', 'width', 'height', 'font-size'];
	sizeList.forEach((el) => {
		adaptiveForEach(el);
	});
};

function showMoreStudent() {
	let visibilityBtn = document.querySelector('.visibility-btn');

	let allStudents = document.querySelectorAll('.students__item#visibility-change');
	allStudents.forEach((item) => {
		item.classList.toggle('d-n');
		visibilityBtn.textContent = visibilityBtn.textContent === 'More' ? 'Close' : 'More';
	});

	if (visibilityBtn.textContent === 'More') {
		let elemCoords = visibilityBtn.getBoundingClientRect().top + document.body.scrollTop - window.innerHeight / 1.2;

		let scrollCoords = document.body.scrollTop;

		let smoothScroll = setInterval(function () {
			scrollCoords -= 15;
			window.scrollTo(0, scrollCoords);
			scrollCoords <= elemCoords && clearInterval(smoothScroll);
		}, 20);
	}
}

let anchorList = document.querySelectorAll('a[href^="#"]');

anchorList.forEach((anchor) => {
	anchor.addEventListener('click', (e) => {
		e.preventDefault();

		const blockId = anchor.getAttribute('href').substring(1);

		document.getElementById(blockId).scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	});
});
// Modal Window of blocks: "Students" and "Teachers"
let modalWindowList = document.querySelectorAll('.overlay');

let database = {};

async function getDatabase() {
	let promise = await fetch('db.json');

	return (database = await promise.json());
}

getDatabase();

let human = {
	name: '',
	about: {
		country: '...',
		biography: `<span style="color: red; text-transform: uppercase;">Not information...</span>`,
	},
};

function clearModalContent() {
	document.querySelector('.modal-window--about #country, .modal-window--about #biography').innerHTML = '';
	human = {
		name: '',
		about: {
			country: '...',
			biography: `<span style="color: red; text-transform: uppercase;">Not information...</span>`,
		},
	};
}

const changeModalWindow = (name, element) => {
	document.querySelector('.modal-window--about #firstname').innerHTML = name;

	let classList = element.classList;
	let classOfElement;

	classList.forEach((className) => {
		return (classOfElement = className);
	});

	let peopleList = null;

	classOfElement.includes('students') ? (peopleList = database.studentsList) : (peopleList = database.teachersList);

	peopleList.forEach((item) => {
		if (item.name === name) {
			return (human = item);
		}
	});

	let aboutHuman = human.about;

	document.querySelector('.modal-window--about #country').innerHTML = aboutHuman.country;
	document.querySelector('.modal-window--about #biography').innerHTML = aboutHuman.biography;
};

const showMWAbout = (event, name) => {
	modalWindowList.forEach((el) => {
		let classList = el.classList;
		classList.forEach((item) => {
			if (item.includes('about')) {
				el.classList.remove('d-n');
			}
		});
	});
	changeModalWindow(name, event.target);
};

const hiddenMWAbout = () => {
	modalWindowList.forEach((el) => {
		let classList = el.classList;
		classList.forEach((item) => {
			if (item.includes('about')) {
				el.classList.add('d-n');
			}
		});
	});
	clearModalContent();
};
