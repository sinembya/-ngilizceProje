const AnaEski = document.querySelector(".komut");
const Ekle = document.querySelector(".but");
const KartOlustur = document.querySelector(".kartolustur.hide");
const onyuz = document.getElementById("face");
const arkayuz = document.getElementById("back");
const Submit = document.getElementById("subkart");
const YeniKartlar = document.querySelector(".yenikartlar");


function createResetButton(index) {
    const resetButton = document.createElement('button');
    resetButton.innerHTML = 'DELETE';
    resetButton.id = `resetButton_${index}`;
    resetButton.classList.add('ResetButtons');
    resetButton.addEventListener('click', function () {
        const kartPairContainerToRemove = document.getElementById(`kartPairContainer_${index}`);
        if (kartPairContainerToRemove) {
            kartPairContainerToRemove.remove();

            let storedOnyuzValues = JSON.parse(localStorage.getItem("onyuzValues")) || [];
            let storedArkayuzValues = JSON.parse(localStorage.getItem("arkayuzValues")) || [];

            storedOnyuzValues.splice(index, 1);
            storedArkayuzValues.splice(index, 1);

            localStorage.setItem("onyuzValues", JSON.stringify(storedOnyuzValues));
            localStorage.setItem("arkayuzValues", JSON.stringify(storedArkayuzValues));
        }
    });
    return resetButton;
}

function addNewCard(onyuzValue, arkayuzValue) {
    let storedOnyuzValues = JSON.parse(localStorage.getItem("onyuzValues")) || [];
    let storedArkayuzValues = JSON.parse(localStorage.getItem("arkayuzValues")) || [];

    storedOnyuzValues.push(onyuzValue);
    storedArkayuzValues.push(arkayuzValue);

    localStorage.setItem("onyuzValues", JSON.stringify(storedOnyuzValues));
    localStorage.setItem("arkayuzValues", JSON.stringify(storedArkayuzValues));

    AnaEski.classList.remove("hide");
    KartOlustur.classList.add("hide");

    const karton = document.createElement('dt');
    karton.innerHTML = onyuzValue;
    karton.setAttribute('yenikart', 'yenikart');

    const kartalt = document.createElement('dd');
    kartalt.innerHTML = arkayuzValue;
    kartalt.setAttribute('yenikart', 'yenikart');

    const kartPairContainer = document.createElement('div');
    kartPairContainer.classList.add('kartPairContainer', 'resetClass');
    kartPairContainer.id = `kartPairContainer_${storedOnyuzValues.length - 1}`;


    kartPairContainer.appendChild(karton);
    kartPairContainer.appendChild(kartalt);

    const resetButton = createResetButton(storedOnyuzValues.length - 1);
    kartPairContainer.appendChild(resetButton);

    document.getElementById('benimkartim').appendChild(kartPairContainer);
}

window.onload = function () {
    let storedOnyuzValues = JSON.parse(localStorage.getItem("onyuzValues")) || [];
    let storedArkayuzValues = JSON.parse(localStorage.getItem("arkayuzValues")) || [];
    const kartContainer = document.createElement('div');
    kartContainer.id = 'benimkartim';
    document.body.appendChild(kartContainer);

    let deletedIds = JSON.parse(localStorage.getItem("deletedIds")) || [];

    storedOnyuzValues.forEach((storedOnyuzValue, index) => {
        if (!deletedIds.includes(index)) {
            const kartPairContainer = document.createElement('div');
            kartPairContainer.classList.add('kartPairContainer');
            kartPairContainer.id = `kartPairContainer_${index}`;
            const karton = document.createElement('dt');
            karton.innerHTML = storedOnyuzValue;
            karton.setAttribute('yenikart', 'yenikart');
            kartPairContainer.appendChild(karton);

            const kartalt = document.createElement('dd');
            kartalt.innerHTML = storedArkayuzValues[index];
            kartalt.setAttribute('yenikart', 'yenikart');
            kartPairContainer.appendChild(kartalt);

            const resetButton = createResetButton(index);
            kartPairContainer.appendChild(resetButton);

            kartContainer.appendChild(kartPairContainer);
        }
    });
};

Submit.addEventListener("click", () => {
    var onyuzValue = onyuz.value.trim();
    var arkayuzValue = arkayuz.value.trim();

    if (onyuzValue === "" || arkayuzValue === "") {
        alert("Lütfen her iki kutuyu da doldurun.");
        return;
    }

    addNewCard(onyuzValue, arkayuzValue);
});



Ekle.addEventListener("click", () => {
    onyuz.value = "";
    arkayuz.value = "";
    KartOlustur.classList.remove("hide");
    kartPairContainer.classList.add('hide');
    kartContainer.appendChild(kartPairContainer);    

    // kartPairContainer'ı giz

    }
);
