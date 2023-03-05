
"use strict";

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.subButton.addEventListener('click', formSend);

    // =============== validation form ==========================================================================================================================
    async function formSend(e) {

        e.preventDefault();

        let error = formValidate(form);

        if (!error) {
            const userName = form.userName;
            const userSurname = form.userSurname;
            const userEmail = form.userEmail;
            const userGender = form.userGender;
            const userAge = form.userAge;
            const userDescription = form.userDescription;
            const userLanguage = form.language;
            const userImage = form.userImage;

            const valueUserName = userName.value;
            const valueUserSurname = userSurname.value;
            const valueUserEmail = userEmail.value;
            const valueUserGender = userGender.value;
            const valueUserAge = userAge.value;
            const valueUserDescription = userDescription.value;
            const valueUserImage = userImage.files[0];
            const defaultImage = document.querySelector('.default');

            let fileUrl;
            if (valueUserImage) {
                fileUrl = URL.createObjectURL(valueUserImage);
            } else if (defaultImage) {
                fileUrl = defaultImage.innerHTML = `./img/user.jpg`;
            }

            const valueUserLanguageIndex = userLanguage.selectedIndex;
            // const valueUserLanguage = userLanguage.value;
            const valueUserLanguageValue = userLanguage.options[valueUserLanguageIndex].text;

            const userInfoName = document.querySelector('.info__name');
            const userInfoEmail = document.querySelector('.info__emailUser');
            const userInfoGender = document.querySelector('.info__genderUser');
            const userInfoAge = document.querySelector('.info__ageUser');
            const userInfoDescription = document.querySelector('.desc__description');
            const userInfoLanguage = document.querySelector('.info__lang');
            const userInfoImage = document.querySelector('.info__image');

            userInfoName.textContent = `${valueUserName} ${valueUserSurname}`;
            userInfoEmail.textContent = `${valueUserEmail}`;
            userInfoGender.textContent = `${valueUserGender}`;
            userInfoAge.textContent = `${valueUserAge} year`;
            userInfoDescription.textContent = `${valueUserDescription}`;
            userInfoLanguage.textContent = `${valueUserLanguageValue}`;
            userInfoImage.innerHTML = `<img src="${fileUrl}" alt="user photo">`;

            const formBlock = document.querySelector('.account__form');
            const infoBlock = document.querySelector('.info');
            formBlock.style.display = 'none';
            infoBlock.style.display = 'block';

            const prew = document.querySelector('.file__preview img');
            const backButton = document.querySelector('.info__button-back');
            backButton.addEventListener('click', function (event) {
                // prew.firstElementChild.remove();
                form.subButton.disabled = true;
                submitButton.style.cursor = 'not-allowed';
                submitButton.style.backgroundColor = '#f06161b9';
                formBlock.style.display = 'block';
                infoBlock.style.display = 'none';
                prew.style.display = 'none';
                userInfoImage.innerHTML = `<img class="default" src="./img/user.jpg" alt="user photo">`;
                form.reset();
            });
        }


        //===== user information ======================================================================================================================================


    };

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
            input.addEventListener('focus', function (event) {
                formRemoveError(input)
            });
        }
        return error;
    }

    function formAddError(input) {
        input.previousElementSibling.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.previousElementSibling.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    //================= check agree (checkbox) =======================================================================================================================================

    const agreeCheck = document.form.userAgree;
    const submitButton = document.querySelector('.button__submit');
    const resetButton = document.querySelector('.button__reset');

    agreeCheck.addEventListener('click', checkAgree);
    resetButton.addEventListener('click', checkReset);

    function checkAgree() {
        if (agreeCheck.checked) {
            submitButton.removeAttribute('disabled');
            submitButton.style.cursor = 'pointer';
            submitButton.style.backgroundColor = '#F06162';
        } else {
            submitButton.setAttribute('disabled', '');
            submitButton.style.cursor = 'not-allowed';
            submitButton.style.backgroundColor = '#f06161b9';
        }
    }
    function checkReset() {
        const prew = document.querySelector('.file__preview img');
        submitButton.setAttribute('disabled', '');
        submitButton.style.cursor = 'not-allowed';
        submitButton.style.backgroundColor = '#f06161b9';
        prew.style.display = 'none';
    }


    // =========== add image =======================================================================================================================
    const formImage = document.getElementById('formImage');
    const formPreview = document.getElementById('formPreview');

    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });

    function uploadFile(file) {
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Only image');
            formImage.value = '';
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert('File can`t more 2 MB.');
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="userPhoto">`;
        };
        reader.onerror = function (e) {
            alert('Error');
        };
        reader.readAsDataURL(file);
    }

    // ============== customize counter ===========================================================================================================================
    jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function () {
        var spinner = jQuery(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find('.quantity-up'),
            btnDown = spinner.find('.quantity-down'),
            min = input.attr('min'),
            max = input.attr('max');

        btnUp.click(function () {
            var oldValue = parseFloat(input.val());
            if (oldValue >= max) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

        btnDown.click(function () {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

    });
});

// =========================  ===========================================================================================================




















