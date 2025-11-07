// Define global variables
const formConfig = {
	reference: document.getElementById("guest-form"),
	dropdowns: [document.getElementById("meet")],
	inputs: {
		fname: {
			ref: document.getElementById("fname"),
			error: document.getElementById("err-fname"),
			required: true,
		},
		lname: {
			ref: document.getElementById("lname"),
			error: document.getElementById("err-lname"),
			required: true,
		},
		jtitle: {
			ref: document.getElementById("job-title"),
			error: document.getElementById("err-jtitle"),
			required: false,
		},
		linkedin: {
			ref: document.getElementById("linkedin"),
			error: document.getElementById("err-linkedin"),
			required: true,
		},
		company: {
			ref: document.getElementById("company"),
			error: document.getElementById("err-company"),
			required: false,
		},
		email: {
			ref: document.getElementById("email"),
			error: document.getElementById("err-email"),
			required: false,
		},
		meet: {
			ref: document.getElementById("meet"),
			error: document.getElementById("err-meet"),
			required: true,
		},
		format: {
			ref: [document.getElementById("html"), document.getElementById("text")],
			error: document.getElementById("err-format"),
			required: false,
		},
	},
};

// Validate info on form submit
formConfig.reference.onsubmit = () => {
	// Reference Variables
	const inputs = formConfig.inputs;

	// Variable to track form validity
	let isValid = true;

	// Check validation for all required inputs
	// Validate first name
	if (inputs.fname.required) {
		if (inputs.fname.ref.value.trim() == "") {
			inputs.fname.error.style.visibility = "visible";
			isValid = false;
		} else {
			inputs.fname.error.style.visibility = "hidden";
		}
	}

	// Validate last name
	if (inputs.lname.required) {
		if (inputs.lname.ref.value.trim() == "") {
			inputs.lname.error.style.visibility = "visible";
			isValid = false;
		} else {
			inputs.lname.error.style.visibility = "hidden";
		}
	}

	// Validate job title
	if (inputs.jtitle.required) {
		if (inputs.jtitle.ref.value.trim() == "") {
			inputs.jtitle.error.style.visibility = "visible";
			isValid = false;
		} else {
			inputs.jtitle.error.style.visibility = "hidden";
		}
	}

	// Validate company
	if (inputs.company.required) {
		if (inputs.company.ref.value.trim() == "") {
			inputs.company.error.style.visibility = "visible";
			isValid = false;
		} else {
			inputs.company.error.style.visibility = "hidden";
		}
	}

	// Validate linked in
	if (inputs.linkedin.required) {
		if (inputs.linkedin.ref.value.trim() != "") {
			const linkedinStr = "https://linkedin.com/in/";
			let currInput = inputs.linkedin.ref.value;
			for (let i = 0; i < linkedinStr.length; i++) {
				if (currInput[i] != linkedinStr[i]) {
					isValid = false;
					inputs.linkedin.error.style.visibility = "visible";
					break;
				}
				inputs.linkedin.error.style.visibility = "hidden";
			}
		}
	}

	// Validate email address
	if (inputs.email.required) {
		let email = inputs.email.ref.value;
		if (!(contains(email, "@") && contains(email, "."))) {
			inputs.email.error.style.visibility = "visible";
			isValid = false;
		} else {
			inputs.email.error.style.visibility = "hidden";
		}
	}

	// Validate other
	if (inputs.meet.required) {
		if (inputs.meet.ref.value == "") {
			inputs.meet.error.style.visibility = "visible";
			isValid = false;
		} else {
			inputs.meet.error.style.visibility = "hidden";
		}
	}

	// Validate email format
	if (inputs.format.required) {
		if (inputs.format.ref[0].checked || inputs.format.ref[1].checked) {
			inputs.format.error.style.visibility = "hidden";
		} else {
			inputs.format.error.style.visibility = "visible";
			isValid = false;
		}
	}

	// Return if the form is valid
	return isValid;
};

// Changing the meet select value
formConfig.inputs.meet.ref.addEventListener("change", function () {
	// variable to track value of dropdown
	let dropdownVal = document.getElementById("meet").value.trim();

	// Flex/none based on if the user selects other option
	if (dropdownVal == "other") {
		document.getElementById("other-box").style.display = "flex";
	} else {
		document.getElementById("other-box").style.display = "none";
	}
});

// Checking/Unchecking the mailing list
document.getElementById("mail-list").addEventListener("change", function () {
	// Case check for if checked
	if (document.getElementById("mail-list").checked == true) {
		// Enable required for email input/radio
		formConfig.inputs.email.required = true;
		formConfig.inputs.format.required = true;

		// Show the radio buttons
		document.getElementById("email-format-box").style.display = "block";
	} else {
		// Disable required for email input/radio
		formConfig.inputs.email.required = false;
		formConfig.inputs.format.required = false;

		// Hide the radio buttons
		document.getElementById("email-format-box").style.display = "none";
	}

	// Uncheck the radio buttons
	document.querySelectorAll(".radio").forEach((el) => {
		el.checked = false;
	});
});

// Contains function recieves a string
// Checks if a character is inside the string
// Must have one occurrence of the required character
// At max in the string
function contains(str, reqCharacter) {
	// Variables for checks
	let occurences = 0;
	let contains = false;

	// Iterate and check every character in the string
	for (let i = 0; i < str.length; i++) {
		// Check if the current character is the req char
		if (str[i] == reqCharacter) {
			// Increment count and set contains to true
			occurences++;
			contains = true;
		}
	}

	// Only return true if checks pass
	return occurences == 1 && contains;
}
