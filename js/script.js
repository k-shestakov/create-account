// form
const createForm = document.forms.create;
const formWrapper = document.querySelector('.form__wrapper');
const submitButton = document.querySelector('.button__submit');

// user block
const userInfo = document.querySelector('.created');
userInfo.style.display = 'none';

const signoutButton = document.querySelector('.button__signout');

const userName = document.querySelector('.created__name-surname');
const userEmail = document.querySelector('.created__email');
const userGender = document.querySelector('.created__icon img');
const userPositions = document.querySelector('.created__position');

// disabled button while checkbox not checked
createForm.buttonSubmit.disabled = true;
createForm.agree.addEventListener('click', function (event) {
    if (createForm.agree.checked) {
        submitButton.style.backgroundColor = '#37B16D';
        createForm.buttonSubmit.disabled = false;
    }
    else if (!createForm.agree.checked) {
        submitButton.style.backgroundColor = '';
        createForm.buttonSubmit.disabled = true;
    }
});

// submit form
createForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // get form value
    const userFirstName = createForm.firstName.value;
    const userSecondName = createForm.secondName.value;
    const userValueEmail = createForm.userEmail.value;
    const userValueGender = createForm.sex.value;
    const getSelectedIndex = createForm.position.selectedIndex;
    const userValuePosition = createForm.position[getSelectedIndex].text;
    // assign this value
    const profileName = `${userFirstName} ${userSecondName}`;
    const profileEmail = `${userValueEmail}`;
    userGender.src = userValueGender === 'man' ? './img/male-user.png' : './img/female-user.png';
    const profilePosition = `${userValuePosition}`;
    // inner this value
    userName.innerHTML = profileName;
    userEmail.innerHTML = profileEmail;
    userPositions.innerHTML = profilePosition;

    // back to form
    userInfo.style.display = 'block';
    formWrapper.style.display = 'none';

    signoutButton.addEventListener("click", function (event) {
        userInfo.style.display = 'none';
        formWrapper.style.display = 'block';
        submitButton.style.backgroundColor = '';
        createForm.buttonSubmit.disabled = true;
        createForm.reset();
    });
});



























