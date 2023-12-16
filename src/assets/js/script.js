const layoutSize = 1440;

let adaptiveMargin = document.querySelectorAll('.adaptive-margin');
let adaptivePadding = document.querySelectorAll('.adaptive-padding');
let adaptiveWidth = document.querySelectorAll('.adaptive-width');
let adaptiveHeight = document.querySelectorAll('.adaptive-height');
let adaptiveFont = document.querySelectorAll('.adaptive-font');
let moreBtn = document.querySelector('.more-btn');

// TODO: Добавить этот же скрипт и для подсчёта height блока hero
// TODO: Написать код, который будет автоматически высчитывать font-size шрифта по пропорциям для разных экранов
// TODO: Переделать абсолютно весь код. Написать заново весь функционал уже с другим подходом. Этот код, хоть и работает, он очень большой, а его задача простая, адаптировать размеры под ширину окна. В идеале логика этого функционала должан занимать около 30 строчек кода.
// * FIXME: Идея такова. Я просто к нужному элементу добавляю класс adaptive-size, а после просматриваю при помощи условий свойства каждого объекта с этим классом. Внутри условий естественно будет код ниже, однако я верю, что при помощи условий я смогу сократить код.

const changeVar = () => {
	adaptiveMargin.forEach(function (item) {
		let min1 = Number(getComputedStyle(item).getPropertyValue('--margin__min1'));
		let min2 = Number(getComputedStyle(item).getPropertyValue('--margin__min2'));
		let max1 = Number(getComputedStyle(item).getPropertyValue('--margin__max1'));
		let max2 = Number(getComputedStyle(item).getPropertyValue('--margin__max2'));

		let desktopSize1 = (3 * (max1 - min1)) / 2;
		let desktopSize2 = (3 * (max2 - min2)) / 2;
		let changeSize1 = max1 - desktopSize1 + desktopSize1 * (window.innerWidth / layoutSize);
		let changeSize2 = max2 - desktopSize2 + desktopSize2 * (window.innerWidth / layoutSize);

		// item.style.setProperty('margin', changeSize1 + ' ' + changeSize2);
		// item.style.setProperty('margin', `${changeSize1} ${changeSize2}`);
		item.style.setProperty('margin', changeSize1 + ' ' + changeSize2);
	});
	adaptivePadding.forEach(function (item) {
		let min1 = Number(getComputedStyle(item).getPropertyValue('--padding__min1'));
		let min2 = Number(getComputedStyle(item).getPropertyValue('--padding__min2'));
		let max1 = Number(getComputedStyle(item).getPropertyValue('--padding__max1'));
		let max2 = Number(getComputedStyle(item).getPropertyValue('--padding__max2'));

		let desktopSize1 = (3 * (max1 - min1)) / 2;
		let desktopSize2 = (3 * (max2 - min2)) / 2;
		let changeSize1 = max1 - desktopSize1 + desktopSize1 * (window.innerWidth / layoutSize);
		let changeSize2 = max2 - desktopSize2 + desktopSize2 * (window.innerWidth / layoutSize);

		item.style.setProperty('padding', changeSize1 + ' ' + changeSize2);
	});
	adaptiveWidth.forEach(function (item) {
		let min = Number(getComputedStyle(item).getPropertyValue('--width__min'));
		let max = Number(getComputedStyle(item).getPropertyValue('--width__max'));

		let desktopSize = (3 * (max - min)) / 2;
		let changeSize = max - desktopSize + desktopSize * (window.innerWidth / layoutSize);

		item.style.setProperty('width', changeSize);
	});
	adaptiveHeight.forEach(function (item) {
		let min = Number(getComputedStyle(item).getPropertyValue('--height__min'));
		let max = Number(getComputedStyle(item).getPropertyValue('--height__max'));

		let desktopSize = (3 * (max - min)) / 2;
		let changeSize = max - desktopSize + desktopSize * (window.innerWidth / layoutSize);

		item.style.setProperty('height', changeSize);
	});
	adaptiveFont.forEach(function (item) {
		let min = Number(getComputedStyle(item).getPropertyValue('--font-size__min'));
		let max = Number(getComputedStyle(item).getPropertyValue('--font-size__max'));

		let desktopSize = (3 * (max - min)) / 2;
		let changeSize = max - desktopSize + desktopSize * (window.innerWidth / layoutSize);

		item.style.setProperty('font-size', changeSize);
	});
};

window.addEventListener('load', changeVar);
window.addEventListener('resize', changeVar);

document.addEventListener(
	'DOMContentLoaded',
	() => {
		moreBtn.addEventListener('click', () => {
			let allStudents = document.querySelectorAll('.students__item#visibility-change');
			allStudents.forEach(function (item) {
				item.classList.toggle('d-n');
				moreBtn.textContent = moreBtn.textContent === 'More' ? 'Close' : 'More';
			});
		});
	},
	false
);
