const priceBlock = document.querySelector('.price')
const download_button = document.querySelector('.download');
const option_buttons = document.querySelectorAll(".strap_option");
const additional_buttons = document.querySelectorAll(".addition-item");
const send_button = document.querySelector('.send');
const telegram_input = document.querySelector('.telegram-nickname');
let metal_strap_selected = true; // Индикатор выбранного ремешка
let bluetooth_option = document.querySelector('#cbx');


// Настройка дефолтных деталей
const defaultValues = {
    dials: 17,
    displays: 1,
    metal_body: 1,
    straps: 5,
    metal_straps: 1,
    circles: 1,
    arrows: 1,
    clock_points: 1,
}

// Опции доступные для блютуз версии
const optionsForBluetooth = {
    displays: [1, 2, 3],
    clock_points: [9, 5, 17],
    dials: [17],
    arrows: [7, 9, 13],
    circles: [4]
}

// Цены доп. услуг в тыс. руб
const additionalPrices = {
    sapphire: 5,
    engraving: 4,
}

// Выбранные детали при металлическом ремешке
let metalPickedOptions = {
    dials: 17,
    displays: 1,
    metal_straps: 11,
    circles: 1,
    arrows: 1,
    clock_points: 1,
}

// Выбранные детали при каучуковом ремешке

let rubberPickedOptions = {
    dials: 17,
    displays: 1,
    metal_body: 1,
    straps: 5,
    circles: 1,
    arrows: 1,
    clock_points: 1,
}


// Группы элементов влияющих на цену
const groupsChangesPrice = ['dials', 'circles', 'arrows', 'clock_points']


// Функция смены цены

const changePrice = (price) => {
    const firstPart = priceBlock.innerHTML.slice(0,2);
    const secondPart = priceBlock.innerHTML.slice(2);
    priceBlock.innerHTML = (+firstPart + price).toString() + secondPart;
}

// Функция проверки являлась ли выбранная ранее деталь дефолтной
const checkIsBeforeSelectedDefault = (groupName) => {
    let isBeforeSelectedDefault = false;
    document.querySelector(`.${groupName}`).childNodes.forEach(child => {
        if(+child.getAttribute('data-id') === defaultValues[groupName] && child.classList.contains('select_button_active')){
            isBeforeSelectedDefault = true;
        }
    })
    return isBeforeSelectedDefault;
}

// Функция, проверяющая не была ли деталь выбрана ранее
const checkIsSelectedBefore = (groupName, number) => {
    let isSelectedBefore = false;
        document.querySelector(`.${groupName}`).childNodes.forEach(child => {
            if(+child.getAttribute('data-id') === number && child.classList.contains('select_button_active')){
                isSelectedBefore = true;
            }
        })
    return isSelectedBefore;
}

// Функция для смены активного элемента группы
// Функция принимает элемент, который был установлен по дефолту, имя группы и номер элемента
const changeElement = (el, name, num) => {

    let isSelectedSomeAdditionalBeforeChange = false;
    let isSelectedSomeAdditionalAfterChange = false;

    groupsChangesPrice.forEach((groupName) => {
        document.querySelector(`.${groupName}`).childNodes.forEach(child => {
            if( child.classList.contains('select_button_active')
                && defaultValues[groupName] !== +child.getAttribute('data-id')
            ) {
                isSelectedSomeAdditionalBeforeChange = true;
            }
        })
    })

    // Изменение состояния выбранных деталей для отправки на сервер
    switch (name){
        case 'transparent_body':
            rubberPickedOptions['transparent_body'] = num
            delete rubberPickedOptions['metal_body']
            break;
        case 'metal_body':
            rubberPickedOptions['metal_body'] = num
            delete rubberPickedOptions['transparent_body']
            break;
        case 'straps':
            rubberPickedOptions['straps'] = num
            break;
        case 'metal_straps':
            metalPickedOptions['metal_straps'] = num
            break;
        default:
            rubberPickedOptions[name] = num
            metalPickedOptions[name] = num
            break;
    }

    // проверка при выборе прозрачного корпуса
    if(name === 'transparent_body' ) {
        let isActiveBefore = false;
        document.querySelector('.transparent_body').childNodes.forEach(child => {
            // проверка был ли ранее уже выбран прозрачный корпус
            if(child.classList.contains('select_button_active')) isActiveBefore = true
        })
        // если раньше не был выбран прозрачный корпус
        if(!isActiveBefore){
            changePrice(-1);
        }
    }

    // Проверка при выборе металлического корпуса
    if(name === 'metal_body' ) {
        let isActiveBefore = false;
        document.querySelector('.metal_body').childNodes.forEach(child => {
            // проверка был ли ранее уже выбран прозрачный корпус
            if(child.classList.contains('select_button_active')) isActiveBefore = true
        })
        // если раньше не был выбран металлический корпус
        if(!isActiveBefore){
            changePrice(1)
        }
    }


    // если меняется элемент влияющий на ценообразование
    if(groupsChangesPrice.includes(name)){
        checkIsBeforeSelectedDefault(name) && !checkIsSelectedBefore(name, num)
            ? changePrice(2)
            : null
    }

    // если выбранный элемент дефолтный
    if(groupsChangesPrice.includes(name)){
        defaultValues[name] === num && !checkIsSelectedBefore(name, num)
            ? changePrice(-2)
            : null
    }

    document.getElementById(name+"_watch").src = `https://raw.githubusercontent.com/sku757/konfig/main/image//${name}/${name}${num}.png`;
    const infoTextElement = document.getElementById("info-text");
    const infoTextElement1 = document.getElementById("info-text1");
    const infoTextElement2 = document.getElementById("info-text2");
    infoTextElement.style.display = "none";
    infoTextElement1.style.display = "none";
    infoTextElement2.style.display = "none";
    
    if (name === 'metal_straps' && num === 16 && metal_strap_selected) {
        infoTextElement.style.display = "block"; 
    } 
    if (name === 'metal_straps' && num === 17 && metal_strap_selected) {
        infoTextElement.style.display = "block"; 
    } 
    if (name === 'metal_straps' && num === 18 && metal_strap_selected) {
        infoTextElement.style.display = "block"; 
    } 
    if (name === 'metal_straps' && num === 19 && metal_strap_selected) {
        infoTextElement.style.display = "block"; 
    } 
    if (name === 'metal_straps' && num === 20 && metal_strap_selected) {
        infoTextElement.style.display = "block"; 
    } 
    if (name === 'metal_straps' && num === 21 && metal_strap_selected) {
        infoTextElement1.style.display = "block"; 
    } 
    if (name === 'metal_straps' && num === 22 && metal_strap_selected) {
        infoTextElement1.style.display = "block"; 
    } 
    if (name === 'metal_straps' && num === 23 && metal_strap_selected) {
        infoTextElement2.style.display = "block"; 
    } 
    if (name === 'metal_straps' && num === 24 && metal_strap_selected) {
        infoTextElement2.style.display = "block"; 
    } 
    if (name === 'metal_body' && num === 17 && !metal_strap_selected) {
        infoTextElement.style.display = "block"; 
    }
    if (name === 'metal_body' && num === 18 && !metal_strap_selected) {
        infoTextElement1.style.display = "block"; 
    }
    if (name === 'metal_body' && num === 19 && !metal_strap_selected) {
        infoTextElement1.style.display = "block"; 
    }
    if (name === 'metal_body' && num === 20 && !metal_strap_selected) {
        infoTextElement.style.display = "block"; 
    }

    for (let item of el.parentNode.childNodes) {
        item.classList && item.classList.remove('select_button_active');
    }

    el.classList.toggle('select_button_active');
    if(name === 'transparent_body') {
        document.querySelector('.metal_body_watch').classList.add('hide');
        document.querySelector('.transparent_body_watch').classList.remove('hide');
    } else if(name === 'metal_body'){
        document.querySelector('.transparent_body_watch').classList.add('hide');
        document.querySelector('.metal_body_watch').classList.remove('hide');
    }
    if (name === 'transparent_body'){
        document.querySelector('.metal_body').childNodes.forEach(child => {
            child.classList.remove('select_button_active');
        })
    } else if(name === 'metal_body'){
        document.querySelector('.transparent_body').childNodes.forEach(child => {
            child.classList.remove('select_button_active');
        })
    }

    groupsChangesPrice.forEach((groupName) => {
        document.querySelector(`.${groupName}`).childNodes.forEach(child => {
            if( child.classList.contains('select_button_active')
                && defaultValues[groupName] !== +child.getAttribute('data-id')
            ) {
                isSelectedSomeAdditionalAfterChange = true;
            }
        })
    })


    if(!isSelectedSomeAdditionalBeforeChange && isSelectedSomeAdditionalAfterChange){
        changePrice(2)
    }
    if(isSelectedSomeAdditionalBeforeChange && !isSelectedSomeAdditionalAfterChange){
        changePrice(-2)
    }
}

// Функция для получения всех элементов и их вывод в интерфейс
// В функцию передается обязательный параметр последнего номера в наименовании картинки
// Также опционально передается параметр, являющийся индексом выбранного по дефолту эл-та
const getElements = (lastIndex, groupName, defaultIndex = null) => {
    for (let i = 1; i <= lastIndex; i++) {
        const className = i === defaultIndex ? `class="select_button select_button_active"` : `class="select_button"`
        document.querySelector(`.${groupName}`).insertAdjacentHTML('beforeend',
            `<div data-id="${i}" ${className} onclick="changeElement(this, '${groupName}', ${i})"><img src="https://raw.githubusercontent.com/sku757/konfig/main/image/${groupName}/${groupName}${i}.png" alt=""></div>`);
    }
}

const getBluetoothElements = (groupName, nums, defaultIndex) => {
    nums.forEach(num => {
        const className = num === defaultIndex ? `class="select_button select_button_active"` : `class="select_button"`
        document.querySelector(`.${groupName}`).insertAdjacentHTML('beforeend',
            `<div data-id="${num}" ${className} onclick="changeElement(this, '${groupName}', ${num})"><img src="https://raw.githubusercontent.com/sku757/konfig/main/image/${groupName}/${groupName}${num}.png" alt=""></div>`);
    })
}

// Количество элементов в каждой группе
const groupsCountItems = {
    dials: 63,
    displays: 3,
    metal_body: 21,
    transparent_body: 4,
    straps: 13,
    metal_straps: 31,
    circles: 16,
    arrows: 17,
    clock_points: 16,
}

getElements(groupsCountItems['dials'],'dials', defaultValues['dials']);
getElements(groupsCountItems['displays'],'displays', defaultValues['displays']);
getElements(groupsCountItems['metal_body'],'metal_body', defaultValues['metal_body']);
getElements(groupsCountItems['transparent_body'],'transparent_body');
getElements(groupsCountItems['straps'],'straps', defaultValues['straps']);
getElements(groupsCountItems['metal_straps'],'metal_straps', defaultValues['metal_straps']);
getElements(groupsCountItems['circles'],'circles', defaultValues['circles']);
getElements(groupsCountItems['arrows'],'arrows', defaultValues['arrows']);
getElements(groupsCountItems['clock_points'],'clock_points', defaultValues['clock_points']);


const resetToDefaults = (type) => {
    switch (type){
        case 'rubber':
            changePrice(-1);
            break;
        case 'metal':
            changePrice(+1);
            break;
    }
}

// Действия при смене типа ремешка металлический/каучуковый
option_buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if( metal_strap_selected && e.target.classList.contains('rubber_strap_option') ||
            !metal_strap_selected && e.target.classList.contains('metal_strap_option')
        ) {
            option_buttons.forEach((oldButton) => {
                oldButton.classList.toggle('selected_option');
            });
            const metalBlocks = document.querySelectorAll('.metal_strap_option_selected')
            metalBlocks.forEach(block => {
                block.classList.toggle('hide');
            });
            const rubberBlocks = document.querySelectorAll('.rubber_strap_option_selected')
            rubberBlocks.forEach(block => {
                block.classList.toggle('hide');
            });
            metal_strap_selected = !metal_strap_selected;
            if (metal_strap_selected) {
                resetToDefaults('metal');
            } else {
                resetToDefaults('rubber');
            }
        }
    })
})

// Действия при клике на доп опции
additional_buttons.forEach((option) => {
    option.addEventListener('click', (e) => {
        const optionName = e.target.getAttribute('data-id');
        if(e.target.classList.contains('addition-item-active')){
            changePrice(-additionalPrices[optionName]);
            e.target.classList.remove('addition-item-active');
            delete metalPickedOptions[optionName];
            delete rubberPickedOptions[optionName];
        } else {
            changePrice(additionalPrices[optionName]);
            e.target.classList.add('addition-item-active');
            metalPickedOptions[optionName] = 1;
            rubberPickedOptions[optionName] = 1;
        }
    })
})

// // Функция отправки формы
// const sendRequest = async (message) => {
//     return await fetch('https://someCrm.org', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(message)
//     });
// }

// // Действие при клике на кнопку отправить
// send_button.addEventListener('click', () => {
//     let resultObject = metal_strap_selected ? metalPickedOptions : rubberPickedOptions;
//     resultObject['telegram'] = document.querySelector('.telegram-nickname').value;
//     resultObject['comment'] = document.querySelector('.comment').value;
//     sendRequest(resultObject).then(r => console.log(r));
// })

// telegram_input.oninput = (e) => {
//     send_button.disabled = !e.target.value;
// }

// Обработка клика на сохранение изображения

download_button.addEventListener('click', () => {
    document.querySelector('.main-div').scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
        document.body.style.overflow = 'hidden';
        document.querySelector('.loader').classList.remove('hide');

        let target = document.querySelector('.main_watch');

        document.querySelector('.main_price').classList.add('hide');
        document.querySelector('.info-text').classList.add('hide');
        target.style.backgroundImage = "url('https://raw.githubusercontent.com/sku757/konfig/main/image/bg/bg.png')";
        target.style.borderRadius = '0px';
        target.style.backgroundRepeat = 'repeat-y';

        requestAnimationFrame(() => {
            setTimeout(() => {
                domtoimage.toSvg(target, {
                    bgcolor: '#1d1827',
                    scale: window.innerWidth < 1024 ? 2 : 1
                })
                .then(function (dataUrl) {
                    target.style.backgroundImage = "none";
                    target.style.borderRadius = '25px';
                    document.querySelector('.main_price').classList.remove('hide');
                    document.querySelector('.info-text').classList.remove('hide');
                    let modal = document.createElement('div');
                    modal.style.position = 'fixed';
                    modal.style.left = '0';
                    modal.style.top = '0';
                    modal.style.width = '100%';
                    modal.style.height = '100%';
                    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                    modal.style.zIndex = '9999';

                    let img = new Image();
                        img.src = dataUrl;
                        img.style.display = 'block';
                        img.style.margin = 'auto';
                        img.style.marginTop = '10%';
                        img.style.maxWidth = '90%';
                        img.style.maxHeight = '90%';
                        img.style.objectFit = 'contain';

                        modal.appendChild(img);
                        document.body.appendChild(modal);

                        // Новая кнопка для сохранения как PNG
                        let saveAsButton = document.createElement('button');
                        saveAsButton.innerHTML = "Скачать";
                        saveAsButton.className = 'actions-buttons download'
                        saveAsButton.style.fontFamily = '"Days One", sans-serif'; 
                        saveAsButton.style.backgroundColor = 'none'
                        saveAsButton.style.position = 'relative'
                        saveAsButton.style.color = 'black'
                        saveAsButton.style.margin = 'auto'
                        saveAsButton.style.marginTop = '25px'
                        saveAsButton.style.backgroundColor = 'white'
                        modal.appendChild(saveAsButton);

                        // Обработчик для новой кнопки
                        saveAsButton.addEventListener('click', () => {
                        let img = new Image();
                        img.src = dataUrl;
                    
                        img.onload = function () {
                            // Исходные размеры для десктопной версии
                            const desktopWidth = 815;  
                            const desktopHeight = 515; 
                    
                            // Создание холста с размерами для десктопной версии
                            let canvas = document.createElement('canvas');
                            canvas.width = desktopWidth;
                            canvas.height = desktopHeight;
                            let ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0, desktopWidth, desktopHeight);
                            let pngUrl = canvas.toDataURL('image/png', 1);  // 1 - качество изображения

                            // Скачивание PNG
                            let a = document.createElement('a');
                            a.href = pngUrl;
                            a.download = 'image.png';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        };
                    });

                    modal.addEventListener('click', () => {
                    document.body.removeChild(modal);
                    });
                    
                    document.querySelector('.loader').classList.add('hide');
                    document.body.style.overflow = 'auto';
                })
                .catch(function (error) {
                    console.error('Ошибка!', error);
                });
            }, 3500);
        });
    }, 1000);
});

// Обработка события клика на чекбокс блютуз версии

bluetooth_option.addEventListener('click', (e) => {
    const bluetoothKeys = Object.keys(optionsForBluetooth)
    if(bluetooth_option.checked){
        changePrice(5)
        bluetoothKeys.forEach((keyName) => {
            document.querySelector(`.${keyName}`).innerHTML = ""
            getBluetoothElements(keyName, optionsForBluetooth[keyName], defaultValues[keyName])
            document.getElementById(`${keyName}_watch`).src = `https://raw.githubusercontent.com/sku757/konfig/main/image//${keyName}/${keyName}${defaultValues[keyName]}.png`;
        })
    } else {
        changePrice(-5)
        bluetoothKeys.forEach((keyName) => {
            document.querySelector(`.${keyName}`).innerHTML = ""
            getElements(groupsCountItems[keyName], keyName, defaultValues[keyName]);
            document.getElementById(`${keyName}_watch`).src = `https://raw.githubusercontent.com/sku757/konfig/main/image//${keyName}/${keyName}${defaultValues[keyName]}.png`;
        })
    }

})


