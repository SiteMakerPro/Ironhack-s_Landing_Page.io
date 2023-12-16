// TODO: Добавить этот же скрипт и для подсчёта height блока hero
// TODO: Написать код, который будет автоматически высчитывать font-size шрифта по пропорциям для разных экранов

const layoutSize = 1440;

let changeSize = 0;

let adaptive = document.querySelectorAll('.adaptive');

const getValueStyle = (item, name_style) => (varValue = String(getComputedStyle(item).getPropertyValue(name_style)));

const adaptiveForEach = (name_style) => {
	return adaptive.forEach(function (item) {
		let size = String(getValueStyle(item, `--${name_style}`)).split(' ');

		let desktopSize1 = (3 * (size[1] - size[0])) / 2;
		let desktopSize2 = (3 * (size[3] - size[2])) / 2;

		let desktopSize = `${desktopSize1} ${desktopSize2}`.split(' ');

		let changeSize1 = size[1] - desktopSize[0] + desktopSize[0] * (window.innerWidth / layoutSize);
		let changeSize2 = size[3] - desktopSize[1] + desktopSize[1] * (window.innerWidth / layoutSize);

		changeSize = size[2] === undefined && size[3] === undefined ? changeSize1 : `${changeSize1} ${changeSize2}`;

		item.style.setProperty(name_style, changeSize);
	});
};

const changeVar = () => {
	let sizeList = ['margin', 'padding', 'width', 'height', 'font-size'];
	sizeList.forEach((el) => {
		adaptiveForEach(el);
	});
};

window.addEventListener('load', changeVar);
window.addEventListener('resize', changeVar);

let moreBtn = document.querySelector('.more-btn');

function showMoreStudent() {
	let allStudents = document.querySelectorAll('.students__item#visibility-change');
	allStudents.forEach((item) => {
		item.classList.toggle('d-n');
		moreBtn.textContent = moreBtn.textContent === 'More' ? 'Close' : 'More';
	});
}
