// dashboard.js
document.addEventListener("DOMContentLoaded", () => {
    const ctxAdmissions = document.getElementById('patientAdmissionsChart').getContext('2d');
    const ctxOutcomes = document.getElementById('treatmentOutcomesChart').getContext('2d');
    const ctxMonthly = document.getElementById('monthlyAdmissionsChart').getContext('2d');

    // Sample Data (can be dynamic)
    const patientAdmissionsData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Patient Admissions',
            data: [12, 19, 3, 5, 2, 3, 15],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }]
    };

    const treatmentOutcomesData = {
        labels: ['Successful', 'Unsuccessful', 'Pending'],
        datasets: [{
            label: 'Treatment Outcomes',
            data: [80, 10, 10],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
        }]
    };

    const monthlyAdmissionsData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Monthly Admissions',
            data: [300, 200, 150, 400, 250, 350, 300],
            fill: false,
            borderColor: 'rgba(255, 159, 64, 1)',
            tension: 0.1
        }]
    };

    // Create Charts
    const patientAdmissionsChart = new Chart(ctxAdmissions, {
        type: 'bar',
        data: patientAdmissionsData,
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                tooltip: { enabled: true },
                zoom: {
                    pan: { enabled: true, mode: 'xy' },
                    zoom: { enabled: true, mode: 'xy' }
                }
            }
        }
    });

    const treatmentOutcomesChart = new Chart(ctxOutcomes, {
        type: 'pie',
        data: treatmentOutcomesData,
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Treatment Outcomes' },
                tooltip: { callbacks: { label: function(tooltipItem) { return `${tooltipItem.label}: ${tooltipItem.raw}%`; } } }
            }
        }
    });

    const monthlyAdmissionsChart = new Chart(ctxMonthly, {
        type: 'line',
        data: monthlyAdmissionsData,
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Monthly Admissions' },
                tooltip: { callbacks: { label: function(tooltipItem) { return `Admissions: ${tooltipItem.raw}`; } } }
            },
            scales: {
                y: { beginAtZero: true }
            },
            zoom: {
                pan: { enabled: true, mode: 'xy' },
                zoom: { enabled: true, mode: 'xy' }
            }
        }
    });

    // Event Listeners for Filters
    const timePeriodSelect = document.getElementById('timePeriod');
    const departmentSelect = document.getElementById('departmentFilter');

    timePeriodSelect.addEventListener('change', updateCharts);
    departmentSelect.addEventListener('change', updateCharts);

    function updateCharts() {
        const timePeriod = timePeriodSelect.value;
        const department = departmentSelect.value;

        // Update data dynamically based on selected filters
        // Example: you can make API calls or adjust the chart data based on filters
        if (timePeriod === 'monthly') {
            patientAdmissionsChart.data.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        } else if (timePeriod === 'yearly') {
            patientAdmissionsChart.data.labels = ['2023', '2024'];
        }

        if (department !== 'all') {
            // You could update the data based on the department selected
            console.log(`Filtering data for ${department} department`);
        }

        // Update the charts with the new data
        patientAdmissionsChart.update();
        treatmentOutcomesChart.update();
        monthlyAdmissionsChart.update();
    }
});
