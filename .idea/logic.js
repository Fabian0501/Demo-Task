/**
 * Sets default views upon DOM Content Loaded.
 * Hides the elements with IDs 'fileTable', 'formContainer', 'header',
 * 'inputContainer', and 'line' when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fileTable').style.display = "none";
    document.getElementById('formContainer').style.display = "none";
    document.getElementById('header').style.display = "none";
    document.getElementById('inputContainer').style.display = "none";
    document.getElementById('line').style.display = "none";
})


/**
 * Toggles visibility of form elements to ensure only one is displayed at a time.
 * Used in combination with 'showFormText()' to guarantee that only one of the two elements is visible at any time.
 */
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


/**
 * Handles file upload, validating inputs before processing and displaying the uploaded file.
 * Ensures the username and file inputs are not empty, alerting the user if they are.
 * If inputs are valid, it displays the header and file table, creates a new row in the table,
 * and populates it with the file details.
 * The file is temporarily stored for display, with special handling for PDF files to show a preview.
 * Finally, resets the file and username input fields.
 */
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

    const file = fileInput.files[0];
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

    fileInput.value = '';
    userNameInput.value = '';
}



/**
 * Handles the upload of user-entered text, validating inputs before processing and displaying the text.
 * Ensures the username, file name, and text area inputs are not empty, alerting the user if any are missing.
 * If inputs are valid, it displays the header and file table, creates a new row in the table,
 * and populates it with the file details including a preview of the entered text.
 * Finally, resets the text area, username, and file name input fields.
 */
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
    actionsCell.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';

    textArea.value = '';
    userNameInput.value = '';
    fileNameInput.value = '';
}



/**
 * Deletes a row from the table and hides the table if no rows remain.
 * Finds the row containing the delete button that was clicked, removes the row from the table,
 * and checks if there are any remaining rows in the table body.
 * If no rows remain, hides the file table, header, and line elements.
 */
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