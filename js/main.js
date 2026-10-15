/* --- PRODUCT DATA CHANGE --- */
document.addEventListener('DOMContentLoaded', () => {
    const sizesContainer = document.querySelector('.product-card__sizes-list');
    const artNode = document.getElementById('js-art');
    const priceNode = document.getElementById('js-price');
    const priceOldNode = document.getElementById('js-price-old');

    if (sizesContainer) {
        sizesContainer.addEventListener('change', (event) => {
            const radio = event.target;

            if (radio && radio.classList.contains('product-card__radio')) {
                artNode.textContent = radio.dataset.art;
                priceNode.textContent = radio.dataset.price;
                priceOldNode.textContent = radio.dataset.old;
            }
        });
    }
});



/* --- BREADCRUMBS TITLE --- */
const breadcrumbsContainer = document.querySelector('.product-card__breadcrumbs');

if (breadcrumbsContainer) {
    breadcrumbsContainer.addEventListener('mouseenter', (e) => {
        if (e.target.tagName === 'A') {
            const linkText = e.target.textContent.trim();
			
            // Фикс для Главной
            e.target.title = linkText === 'Главная' ?
                'На главную страницу' :
                `Перейти в раздел «${linkText}»`;
        }
    }, true); // capture
}



/* --- SKU TITLE --- */
const sizesList = document.querySelector('.product-card__sizes-list');

if (sizesList) {
    sizesList.addEventListener('mouseenter', (e) => {
        if (e.target.classList.contains('product-card__btn')) {
            const weightText = e.target.textContent.trim();
            e.target.title = `Выбрать фасовку ${weightText}`;
        }
    }, true); // capture
}



/* --- ADD TO FAV */
const favBtn = document.querySelector('.product-card__fav-btn');

if (favBtn) {
    favBtn.addEventListener('click', () => {
        favBtn.classList.toggle('is-favorite');

        if (favBtn.classList.contains('is-favorite')) {
            favBtn.setAttribute('data-tooltip', 'Удалить из избранного');
        } else {
            favBtn.setAttribute('data-tooltip', 'Добавить в избранное');
        }
    });
}



/* --- SLIDER --- */
document.addEventListener('DOMContentLoaded', () => {
    const mainImg = document.getElementById('js-main-img');
    const thumbsTape = document.getElementById('js-thumbs-tape');
    const thumbs = Array.from(document.querySelectorAll('.product-card__thumb-item'));
    const btnPrev = document.getElementById('js-thumb-prev');
    const btnNext = document.getElementById('js-thumb-next');

    let currentIndex = 0;
    let currentScrollStep = 0;

    const stepWidth = 110;
    const visibleCount = 3; /* Viewport Images Count */
    const maxScrollSteps = thumbs.length - visibleCount;

    /* GALLERY UPDATE FULL */
    function updateGallery(index) {
        thumbs.forEach(thumb => thumb.classList.remove('is-active'));
        thumbs[index].classList.add('is-active');
        mainImg.src = thumbs[index].src;
        currentIndex = index;
    }

    /* PREVIEWS */
    if (thumbsTape) {
        thumbsTape.addEventListener('click', (e) => {
            if (e.target.classList.contains('product-card__thumb-item')) {
                const clickedIndex = thumbs.indexOf(e.target);
                updateGallery(clickedIndex);
            }
        });
    }

	/* SLIDER ARROW BUTTONS */
    if (btnNext && btnPrev && thumbsTape) {
        btnNext.addEventListener('click', () => {
            let nextIndex = currentIndex + 1;

            if (nextIndex >= thumbs.length) {
                nextIndex = 0; // Loop
            }

            updateGallery(nextIndex);

            if (nextIndex <= maxScrollSteps) {
                currentScrollStep = nextIndex;
            } else if (nextIndex === 0) {
                currentScrollStep = 0;
            } else {
                currentScrollStep = maxScrollSteps;
            }
            thumbsTape.style.transform = `translateX(-${currentScrollStep * stepWidth}px)`;
        });

        btnPrev.addEventListener('click', () => {
            let prevIndex = currentIndex - 1;

            if (prevIndex < 0) {
                prevIndex = thumbs.length - 1; // Loop
            }

            updateGallery(prevIndex);

            if (prevIndex >= maxScrollSteps) {
                currentScrollStep = maxScrollSteps;
            } else {
                currentScrollStep = prevIndex;
            }
            thumbsTape.style.transform = `translateX(-${currentScrollStep * stepWidth}px)`;
        });
    };


    /* --- PHOTOS ZOOM --- */
    const zoomBtn = document.querySelector('.product-card__zoom-btn');

    if (mainImg) {
        mainImg.style.cursor = 'zoom-in';
		
		const triggerElements = [mainImg, zoomBtn].filter(Boolean);

		 triggerElements.forEach(element => {
			element.addEventListener('click', () => {
				const modal = document.createElement('div');

				modal.style.cssText = `
			  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
			  background: rgba(0, 0, 0, 0.8); z-index: 1000;
			  display: flex; align-items: center; justify-content: center;
			  cursor: zoom-out; opacity: 0; transition: opacity 0.5s;
			`;

				const bigImg = document.createElement('img');
				bigImg.src = mainImg.src;
				bigImg.style.cssText = 'max-width: 90%; max-height: 90%; object-fit: contain; box-shadow: 0 5px 25px rgba(0,0,0,0.5);';

				modal.appendChild(bigImg);
				document.body.appendChild(modal);
				setTimeout(() => modal.style.opacity = '1', 10);

				// Закрытие по клику в любом месте модального окна
				modal.addEventListener('click', () => {
					modal.style.opacity = '0';
					setTimeout(() => modal.remove(), 300);
				});


				// Esc
				document.addEventListener('keydown', function handleEsc(e) {
					if (e.key === 'Escape') {
						modal.style.opacity = '0';
						setTimeout(() => modal.remove(), 300);
						document.removeEventListener('keydown', handleEsc);
					}
				});
			});
		 });
    }
});