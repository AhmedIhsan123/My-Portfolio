// Define global variables
const formConfig = {
	reference: document.getElementById("guest-form"),
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
			required: false,
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
		other: {
			ref: document.getElementById("other"),
			error: document.getElementById("err-other"),
			required: false,
		},
		format: {
			ref: [document.getElementById("html"), document.getElementById("text")],
			error: document.getElementById("err-format"),
			required: false,
		},
	},
};

// Helper function to check if a string contains a character exactly once
function contains(str, reqCharacter) {
	let occurrences = 0;
	for (let i = 0; i < str.length; i++) {
		if (str[i] === reqCharacter) occurrences++;
	}
	return occurrences === 1;
}

// Validate info on form submit
formConfig.reference.onsubmit = () => {
	const inputs = formConfig.inputs;
	let isValid = true;

	// Required text fields
	["fname", "lname", "jtitle", "company"].forEach((field) => {
		if (inputs[field].required) {
			if (inputs[field].ref.value.trim() === "") {
				inputs[field].error.style.visibility = "visible";
				isValid = false;
			} else {
				inputs[field].error.style.visibility = "hidden";
			}
		}
	});

	// LinkedIn validation
	if (inputs.linkedin.required) {
		const linkedinStr = "www.linkedin.com/in/";
		const currInput = inputs.linkedin.ref.value.trim();
		if (!currInput.startsWith(linkedinStr)) {
			inputs.linkedin.error.style.visibility = "visible";
			isValid = false;
		} else {
			inputs.linkedin.error.style.visibility = "hidden";
		}
	}

	// Email validation (if required)
	if (inputs.email.required) {
		const email = inputs.email.ref.value.trim();
		if (!(contains(email, "@") && contains(email, "."))) {
			inputs.email.error.style.visibility = "visible";
			isValid = false;
		} else {
			inputs.email.error.style.visibility = "hidden";
		}
	}

	// Dropdown validation
	if (inputs.meet.required) {
		if (inputs.meet.ref.value === "") {
			inputs.meet.error.style.visibility = "visible";
			isValid = false;
		} else {
			inputs.meet.error.style.visibility = "hidden";
		}
	}

	// Set required for other textbox is other is selected
	if (inputs.meet.ref.value == "other") {
		inputs.other.required = true;
	}

	// Display error
	if (inputs.other.required) {
		if (inputs.other.ref.value.trim() == "") {
			inputs.other.error.visibility = "visible";
			console.log("1");
			isValid = false;
		} else {
			console.log(22);
			inputs.other.error.visibility = "hidden";
		}
	}

	// Email format radio validation
	if (inputs.format.required) {
		if (inputs.format.ref[0].checked || inputs.format.ref[1].checked) {
			inputs.format.error.style.visibility = "hidden";
		} else {
			inputs.format.error.style.visibility = "visible";
			isValid = false;
		}
	}

	return isValid;
};

// Show/hide 'Other' input
formConfig.inputs.meet.ref.addEventListener("change", () => {
	const otherBox = document.getElementById("other-box");
	otherBox.style.display =
		formConfig.inputs.meet.ref.value === "other" ? "flex" : "none";
});

// Mailing list checkbox
document.getElementById("mail-list").addEventListener("change", () => {
	const emailBox = document.getElementById("email-format-box");
	const checked = document.getElementById("mail-list").checked;

	formConfig.inputs.email.required = checked;
	formConfig.inputs.format.required = checked;
	emailBox.style.display = checked ? "block" : "none";

	// Uncheck the radio buttons
	formConfig.inputs.format.ref.forEach((el) => (el.checked = false));
});
