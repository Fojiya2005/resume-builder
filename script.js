// Add Dynamic Work Experience Fields 
function addExperience() { 
    const container = document.getElementById('experienceContainer'); 
    const newField = document.createElement('textarea'); 
    newField.placeholder = "Describe your work experience"; 
    container.appendChild(newField); 
}

// Generate Resume Preview 
function generateResume() { 
    document.getElementById('previewName').textContent = document.getElementById('name').value; 
    document.getElementById('previewContact').textContent = 
        `${document.getElementById('email').value} | ${document.getElementById('phone').value} | ${document.getElementById('address').value}`; 
        document.getElementById('previewSummary').textContent = document.getElementById('summary').value;

// Populate Skills
const skillsList = document.getElementById('previewSkills');
skillsList.innerHTML = '';
document.getElementById('skills').value.split(',').forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill.trim();
    skillsList.appendChild(li);
});

// Profile Picture Preview
const file = document.getElementById('profilePic').files[0];
if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('previewImage').src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Experience
const previewExperience = document.getElementById('previewExperience');
previewExperience.innerHTML = '';
Array.from(document.querySelectorAll('#experienceContainer textarea')).forEach(experience => {
    const p = document.createElement('p');
    p.textContent = experience.value;
    previewExperience.appendChild(p);
});

// Education
document.getElementById('previewEducation').textContent = document.getElementById('education').value;

// Apply Template
const selectedTemplate = document.getElementById('template').value;
const resumePreview = document.getElementById('resumePreview');
resumePreview.className = `resume-preview ${selectedTemplate}`;

}

// Save Resume to LocalStorage 
function saveResume() { 
    const formData = new FormData(document.getElementById('resumeForm')); 
    const resumeData = Object.fromEntries(formData); 
    localStorage.setItem('resumeData', JSON.stringify(resumeData)); 
    alert('Resume Saved!'); }

// Load Resume from LocalStorage 
function loadResume() { 
    const data = JSON.parse(localStorage.getItem('resumeData')); 
    if (data) { 
        for (const key in data) { 
            let element = document.getElementById(key); 
            if (element) { 
                if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') { 
                    element.value = data[key]; 
                } 
            } 
        } alert('Resume Loaded!'); 
    } 
}

// Download Resume as PDF 
function downloadResume() { 
    if (typeof html2pdf === "undefined") { 
        alert("Error: html2pdf library not found!"); 
        return; 
    } 
    html2pdf().from(document.getElementById('resumePreview')).save('Resume.pdf'); 
}