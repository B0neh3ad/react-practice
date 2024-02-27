/**
 * 문자열의 길이를 return합니다.
 * @param {String} s
 * @returns s의 길이
 */
function getLength(s){
    return [...s].length;
}

/**
 * 제출된 리뷰의 형식을 검토합니다.
 * @param {Object} formProps 리뷰의 formData로 생성된 object
 * @returns {String} 리뷰가 조건에 맞지 않을 경우 에러 메세지를, 조건에 맞을 경우 빈 문자열을 return
 */
function validateFormProps(formProps) {
    const name = formProps['name'].replace(/\s+/g, "");
    const nameLength = getLength(name);
    if (nameLength < 1) {
        return "공백을 제외한 과자 이름이 1자 미만입니다.";
    } else if (nameLength > 20) {
        return "과자 이름이 너무 깁니다. (20자 초과)";
    }

    const score = Number(formProps['score']);
    if (!Number.isInteger(score) || score < 1 || score > 5) {
        return "평점은 1~5 사이의 자연수여야 합니다.";
    }

    const contents = formProps['contents'];
    const contentsLength = getLength(contents)
    if (contentsLength < 5) {
        return "리뷰 내용이 너무 짧습니다. (5자 미만)";
    } else if (contentsLength > 1000) {
        return "리뷰 내용이 너무 깁니다. (1000자 초과)";
    }

    return "";
}

/**
 * 리뷰 내용으로 HTML Tag를 구성합니다.
 * @param {Object} formProps validation이 이루어졌으며 formData로 만들어진 Object
 * @returns {HTMLLIElement} 리뷰 목록에 추가될 li Tag
 */
function createListElement(formProps) {
    var img = document.createElement("img");
    img.src = formProps['image'];
    img.alt = `${formProps['name']} 사진`;

    var name = document.createElement("span");
    name.className = "name";
    name.innerText = formProps['name'];

    var score = document.createElement("span");
    score.className = "score";
    score.innerText = `★${Number(formProps['score']).toFixed(1)}`;

    var reviewTitle = document.createElement("div");
    reviewTitle.className = "review-title";
    reviewTitle.innerHTML = `${name.outerHTML} / ${score.outerHTML}`

    var contents = document.createElement("p");
    contents.className = 'contents';
    contents.innerText = formProps['contents'];

    var li = document.createElement("li");
    li.appendChild(img);
    li.appendChild(reviewTitle);
    li.appendChild(contents);

    return li;
}

/**
 * 리뷰 form Data를 받아 리스트에 내용을 추가합니다.
 * @param {Element} form 리뷰 내용이 담긴 form Tag
 * @returns {Boolean} 내용 추가 성공 여부
 */
function submitData(form) {
    const formData = new FormData(form);
    const formProps = Object.fromEntries(formData);

    const errorMessage = validateFormProps(formProps);
    if (errorMessage !== "") {
        alert(`리뷰를 추가할 수 없습니다.\n${errorMessage}`);
        return false;
    }

    const listElement = createListElement(formProps);
    
    const reviewListUl = document.querySelector(".review-list ul");
    reviewListUl.appendChild(listElement);

    return true;
}

window.onload = () => {
    const form = document.querySelector(".review-form form");

    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        submitData(form);
    })
}
