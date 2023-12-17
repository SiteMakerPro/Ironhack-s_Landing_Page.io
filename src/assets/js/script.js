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
}
