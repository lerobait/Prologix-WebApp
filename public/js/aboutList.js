// Author: Anna Geenko

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.tab-button');
    const infos = document.querySelectorAll('.about-us');
    const selectDeveloper = document.querySelector('#select-develop');



    // Function to hide all the information about developers
    function hideAllInfos() {
        infos.forEach(info => {
            info.style.display = 'none';
            info.style.opacity = '0';
        });
    }

    // Function to show information about a developer
    function showInfo(index) {
        infos[index].style.display = 'flex';
        setTimeout(() => {
            infos[index].style.opacity = '1';
        }, 5);
    }

    // Event listener for each button
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            hideAllInfos();
            showInfo(index);

            // Remove border from all buttons
            buttons.forEach((button) => {
                button.style.borderLeft = '';
            });
            button.style.borderLeft = '5px solid blue';
            selectDeveloper.style.display = 'none';
        });
    });

    hideAllInfos();
});