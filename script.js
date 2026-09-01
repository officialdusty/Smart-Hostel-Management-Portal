

document.addEventListener("DOMContentLoaded", function () {

    console.log("Smart Hostel Portal loaded successfully.");

    setupNavigation();
    setupButtons();
    setupForms();
    setupServiceCards();

});



function setupNavigation() {

    const currentPage = window.location.pathname.split("/").pop();

    const navLinks = document.querySelectorAll(".navbar nav a");

    navLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });

}



function setupButtons() {

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            console.log("Button clicked:", button.textContent.trim());

        });

    });

}



function setupServiceCards() {

    const cards = document.querySelectorAll(".service-card");

    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            card.style.cursor = "pointer";
        });

    });

}



function setupForms() {

    const forms = document.querySelectorAll("form");

    forms.forEach(function (form) {

        form.addEventListener("submit", function (event) {

            const inputs = form.querySelectorAll(
                "input[required], select[required], textarea[required]"
            );

            let formIsValid = true;

            inputs.forEach(function (input) {

                if (input.value.trim() === "") {

                    formIsValid = false;

                    input.style.borderColor = "#EF4444";

                } else {

                    input.style.borderColor = "";

                }

            });


            if (!formIsValid) {

                event.preventDefault();

                showNotification(
                    "Please fill in all required fields.",
                    "error"
                );

                return;

            }


            showNotification(
                "Form submitted successfully!",
                "success"
            );

        });

    });

}



function showNotification(message, type = "success") {

    const notification = document.createElement("div");

    notification.className = "notification";

    notification.textContent = message;


    if (type === "error") {

        notification.style.borderLeft = "4px solid #EF4444";

    } else {

        notification.style.borderLeft = "4px solid #22C55E";

    }


    notification.style.position = "fixed";
    notification.style.top = "90px";
    notification.style.right = "25px";
    notification.style.zIndex = "9999";

    notification.style.padding = "15px 20px";

    notification.style.background = "#1E293B";
    notification.style.color = "#F8FAFC";

    notification.style.borderRadius = "10px";

    notification.style.boxShadow =
        "0 10px 30px rgba(0, 0, 0, 0.3)";

    notification.style.fontSize = "14px";
    notification.style.fontWeight = "600";


    document.body.appendChild(notification);


    setTimeout(function () {

        notification.style.opacity = "0";
        notification.style.transition = "0.4s ease";

        setTimeout(function () {
            notification.remove();
        }, 400);

    }, 2500);

}



function getRoomStatus(availableBeds, totalBeds) {

    if (availableBeds === 0) {
        return "Occupied";
    }

    if (availableBeds === totalBeds) {
        return "Available";
    }

    return "Partially Available";

}



function calculatePendingFee(totalFee, paidFee) {

    const pendingFee = totalFee - paidFee;

    return pendingFee < 0 ? 0 : pendingFee;

}



function getComplaintStatus(status) {

    const statuses = {
        pending: "Pending",
        progress: "In Progress",
        resolved: "Resolved"
    };

    return statuses[status] || "Pending";

}



function formatDate(date) {

    const options = {
        day: "2-digit",
        month: "short",
        year: "numeric"
    };

    return new Date(date).toLocaleDateString(
        "en-IN",
        options
    );

}


function selectRoom(roomNumber) {

    alert(
        "Room " + roomNumber +
        " selected!\n\n" +
        "This room has been selected for your allocation."
    );

}


function openGroundFloor() {

    window.location.href = "ground-floor.html";

}


function openFirstFloor() {

    window.location.href = "first-floor.html";

}


function higherSemesterNotice(floor) {

    alert(
        floor +
        " is reserved for higher-semester students."
    );

}


document.addEventListener("DOMContentLoaded", function () {

    const complaintForm =
        document.getElementById("complaintForm");

    if (!complaintForm) {
        return;
    }


    complaintForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const category =
            document.getElementById("complaintCategory").value;

        const room =
            document.getElementById("roomNumber").value;

        const description =
            document.getElementById("complaintDescription").value;


        if (
            category === "" ||
            room.trim() === "" ||
            description.trim() === ""
        ) {

            showNotification(
                "Please complete all complaint details.",
                "error"
            );

            return;
        }


        const ticketList =
            document.getElementById("ticketList");


        const total =
            document.getElementById("totalComplaints");

        const pending =
            document.getElementById("pendingComplaints");


        const newNumber =
            String(ticketList.children.length + 1)
                .padStart(3, "0");


        const ticket =
            document.createElement("div");

        ticket.className = "ticket-card";


        ticket.innerHTML = `
            <div class="ticket-main">

                <div class="ticket-category maintenance">
                    🛠️
                </div>

                <div>

                    <div class="ticket-title">

                        <h3>
                            ${description}
                        </h3>

                        <span class="ticket-id">
                            #CMP${newNumber}
                        </span>

                    </div>

                    <p>
                        Room ${room} · ${category}
                    </p>

                </div>

            </div>


            <div class="ticket-right">

                <span class="ticket-status pending">
                    Pending
                </span>

                <small>
                    ${formatDate(new Date())}
                </small>

            </div>
        `;


        ticketList.prepend(ticket);


        total.textContent =
            Number(total.textContent) + 1;

        pending.textContent =
            Number(pending.textContent) + 1;


        complaintForm.reset();


        showNotification(
            "Complaint submitted successfully!",
            "success"
        );

    });

});


document.addEventListener("DOMContentLoaded", function () {

    const receiptButton =
        document.getElementById("receiptButton");

    if (!receiptButton) {
        return;
    }


    receiptButton.addEventListener("click", function () {

        const receiptWindow = window.open(
            "",
            "_blank",
            "width=700,height=700"
        );


        receiptWindow.document.write(`

            <!DOCTYPE html>

            <html>

            <head>

                <title>Smart Hostel - Fee Receipt</title>

                <style>

                    body {
                        font-family: Arial, sans-serif;
                        padding: 50px;
                        color: #26332D;
                    }

                    .receipt {
                        max-width: 600px;
                        margin: auto;
                        border: 1px solid #DDE8D5;
                        padding: 35px;
                    }

                    h1 {
                        color: #356859;
                    }

                    .line {
                        border-top: 1px solid #DDE8D5;
                        margin: 25px 0;
                    }

                    .amount {
                        font-size: 24px;
                        font-weight: bold;
                        color: #356859;
                    }

                    .footer {
                        margin-top: 35px;
                        color: #6B756F;
                        font-size: 13px;
                    }

                </style>

            </head>


            <body>

                <div class="receipt">

                    <h1>🏠 Smart Hostel</h1>

                    <p>
                        Official Fee Payment Receipt
                    </p>

                    <div class="line"></div>

                    <p>
                        <strong>Student Name:</strong>
                        Hostel Student
                    </p>

                    <p>
                        <strong>Transaction ID:</strong>
                        TXN2026001
                    </p>

                    <p>
                        <strong>Payment Date:</strong>
                        ${formatDate(new Date())}
                    </p>

                    <p>
                        <strong>Payment For:</strong>
                        Hostel Accommodation
                    </p>

                    <div class="line"></div>

                    <p>
                        Amount Paid
                    </p>

                    <p class="amount">
                        ₹30,000
                    </p>

                    <div class="footer">

                        This is a system-generated receipt
                        from the Smart Hostel Portal.

                    </div>

                </div>

            </body>

            </html>

        `);


        receiptWindow.document.close();

        receiptWindow.focus();

    });

});


function messFeedback(rating) {

    showNotification(
        "Thank you! Your " + rating.toLowerCase() +
        " rating has been recorded.",
        "success"
    );

    console.log("Mess Feedback:", rating);

}


document.addEventListener("DOMContentLoaded", function () {

    const maintenanceForm =
        document.getElementById("maintenanceForm");

    if (!maintenanceForm) {
        return;
    }


    maintenanceForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const type =
            document.getElementById("maintenanceType").value;

        const room =
            document.getElementById("maintenanceRoom").value;

        const priority =
            document.getElementById("maintenancePriority").value;

        const description =
            document.getElementById("maintenanceDescription").value;


        if (
            type === "" ||
            room.trim() === "" ||
            priority === "" ||
            description.trim() === ""
        ) {

            showNotification(
                "Please complete all maintenance details.",
                "error"
            );

            return;
        }


        const maintenanceList =
            document.getElementById("maintenanceList");


        const total =
            document.getElementById("maintenanceTotal");

        const pending =
            document.getElementById("maintenancePending");


        const requestNumber =
            String(maintenanceList.children.length + 1)
                .padStart(3, "0");


        const request =
            document.createElement("div");

        request.className = "maintenance-request";


        request.innerHTML = `

            <div class="request-icon electrical">
                🔧
            </div>


            <div class="request-details">

                <div class="request-title">

                    <h3>
                        ${description}
                    </h3>

                    <span>
                        #MNT${requestNumber}
                    </span>

                </div>

                <p>
                    Room ${room} · ${type}
                </p>

                <small>
                    Submitted ${formatDate(new Date())}
                </small>

            </div>


            <div class="request-meta">

                <span class="priority ${priority.toLowerCase()}">
                    ${priority} Priority
                </span>

                <span class="maintenance-status pending">
                    Pending
                </span>

            </div>

        `;


        maintenanceList.prepend(request);


        total.textContent =
            Number(total.textContent) + 1;

        pending.textContent =
            Number(pending.textContent) + 1;


        maintenanceForm.reset();


        showNotification(
            "Maintenance request submitted successfully!",
            "success"
        );

    });

});


function requestService(serviceName) {

    const serviceList =
        document.getElementById("serviceRequestList");

    if (!serviceList) {
        return;
    }


    const request =
        document.createElement("div");

    request.className =
        "service-request-item";


    request.innerHTML = `

        <div class="request-service-icon">
            ✨
        </div>

        <div>

            <h3>
                ${serviceName}
            </h3>

            <p>
                New service request submitted
            </p>

            <small>
                ${formatDate(new Date())}
            </small>

        </div>

        <span class="service-request-status upcoming-service">
            Requested
        </span>

    `;


    serviceList.prepend(request);


    showNotification(
        serviceName + " request submitted successfully!",
        "success"
    );

}
 

function showHigherSemesterMessage(floorName) {

    showNotification(
        floorName +
        " is reserved for higher-semester students.",
        "info"
    );

}