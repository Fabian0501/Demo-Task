document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fileTable').style.display = "none";
    document.getElementById('formContainer').style.display = "none";
    document.getElementById('header').style.display = "none";
    document.getElementById('inputContainer').style.display = "none";
    document.getElementById('line').style.display = "none";
})


function showFormFile() {
    const inputContainer = document.getElementById('inputContainer');
    if (inputContainer.style.display === "block") {
        inputContainer.style.display = "none";
    }
    document.getElementById('formContainer').style.display = "block";
    document.getElementById('line').style.display = "block";
}

function showFormText() {
    const formContainer = document.getElementById('formContainer');
    if (formContainer.style.display === "block") {
        formContainer.style.display = "none";
    }
    document.getElementById('inputContainer').style.display = "block";
}


function uploadFiles() {
    const fileInput = document.getElementById('fileInput');
    const userNameInput = document.getElementById('userName');

    if (userNameInput.value === "") {
        alert("Please enter a valid username");
        return;
    }
    if (fileInput.value === "") {
        alert("Please enter a valid file");
        return;
    }

    document.getElementById('header').style.display = "block";
    document.getElementById('fileTable').style.display = "table";

    for (const file of fileInput.files) {
        const newRow = document.getElementById('tableBody').insertRow();
        const titleCell = newRow.insertCell(0);
        const authorCell = newRow.insertCell(1);
        const previewCell = newRow.insertCell(2);
        const actionsCell = newRow.insertCell(3);

        const url = URL.createObjectURL(file);
        titleCell.textContent = file.name;
        authorCell.textContent = userNameInput.value;
        actionsCell.innerHTML = '<button onclick="deleteRow(this)">Löschen</button>';

        if (file.type === "application/pdf") {
            previewCell.innerHTML = `<iframe src="${url}"></iframe>`;
        } else {
            previewCell.textContent = "No preview available";
        }
    }

    fileInput.value = '';
    userNameInput.value = '';
}

function uploadText() {
    const textArea = document.getElementById('inputText');
    const userNameInput = document.getElementById('userName2');
    const fileNameInput = document.getElementById('fileName2');

    if (userNameInput.value === "" || fileNameInput.value === "" || textArea.value === "") {
        alert("Please fill all fields");
        return;
    }

    document.getElementById('header').style.display = "block";
    document.getElementById('fileTable').style.display = "table";

    const newRow = document.getElementById('tableBody').insertRow();
    const titleCell = newRow.insertCell(0);
    const authorCell = newRow.insertCell(1);
    const previewCell = newRow.insertCell(2);
    const actionsCell = newRow.insertCell(3);

    titleCell.textContent = fileNameInput.value;
    authorCell.textContent = userNameInput.value;
    previewCell.textContent = textArea.value;
    actionsCell.innerHTML = '<button onclick="deleteRow(this)">Löschen</button>';

    textArea.value = '';
    userNameInput.value = '';
    fileNameInput.value = '';
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);

    const tableBody = document.getElementById('tableBody');
    if (tableBody.rows.length === 0) {
        const fileTable = document.getElementById('fileTable');
        fileTable.style.display = "none";

        document.getElementById('header').style.display = "none";
        document.getElementById('line').style.display = "none";
    }
}