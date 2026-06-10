const API =
'https://diagnostic-backend-jmsu.onrender.com';

async function login() {

    const email =
    document.getElementById('email').value;

    const password =
    document.getElementById('password').value;

    const response =
    await fetch(`${API}/api/admin/login`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            email,
            password
        })

    });

    const result =
    await response.json();

    if(result.success){

        localStorage.setItem(
            'adminToken',
            result.token
        );

        location.href =
        'dashboard.html';

    }else{

        alert(result.message);

    }

}

async function loadDashboard() {

    const token =
    localStorage.getItem('adminToken');

    if(!token) return;

    const statsResponse =
    await fetch(`${API}/api/admin/stats`, {

        headers: {
            Authorization:
            `Bearer ${token}`
        }

    });

    const stats =
    await statsResponse.json();

    document.getElementById(
        'totalStudents'
    ).innerText =
    stats.stats.totalStudents;

    document.getElementById(
        'y12'
    ).innerText =
    stats.stats.y12;

    document.getElementById(
        'y34'
    ).innerText =
    stats.stats.y34;

    document.getElementById(
        'y56'
    ).innerText =
    stats.stats.y56;

    document.getElementById(
        'y78'
    ).innerText =
    stats.stats.y78;

    const studentsResponse =
    await fetch(`${API}/api/admin/students`, {

        headers: {
            Authorization:
            `Bearer ${token}`
        }

    });

    const students =
    await studentsResponse.json();

    const tbody =
    document.querySelector(
        '#studentTable tbody'
    );

    students.students.forEach(student => {

        tbody.innerHTML += `
<tr>
    <td>${student.firstName} ${student.lastName}</td>
    <td>${student.yearLevel}</td>
    <td>${student.schoolName}</td>
    <td>${student.parentName}</td>
    <td>${student.parentEmail}</td>
    <td>${student.parentPhone}</td>
    <td>
        <button onclick="viewReport('${student._id}')">
            View Report
        </button>
    </td>
</tr>
`;

    });

}

if(
window.location.pathname.includes(
'dashboard'
)
){
    loadDashboard();
}
