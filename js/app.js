//======================================================
// Meeting Attendance System
// app.js - Part 1
//======================================================


//======================================================
// Global Variables
//======================================================

// Full attendance list
let participants = [];

// Employee database loaded from Excel
let employeeDatabase = [];

// Currently selected participant for Reason modal
let currentReasonParticipant = null;


//======================================================
// DOM
//======================================================

const excelFile =
    document.getElementById("excelFile");

const searchInput =
    document.getElementById("searchEmployee");

const searchResult =
    document.getElementById("searchResult");


//======================================================
// Load Excel
//======================================================

excelFile.addEventListener(
    "change",
    loadExcel
);


function loadExcel(e) {

    const file = e.target.files[0];

    if (!file) {
        return;
    }


    const reader = new FileReader();


    reader.onload = function(event) {

        const workbook = XLSX.read(
            event.target.result,
            {
                type: "binary"
            }
        );


        const sheet =
            workbook.Sheets[
                workbook.SheetNames[0]
            ];


        //==================================================
        // Read Employee Database
        //==================================================

        employeeDatabase =
            XLSX.utils.sheet_to_json(
                sheet
            );


        console.table(
            employeeDatabase
        );


        //==================================================
        // Create Full Participant List
        //==================================================

        participants =
            employeeDatabase.map(
                (employee, index) => {

                    return {

                        no: index + 1,

                        id:
                            String(
                                employee.id ?? ""
                            ).trim(),

                        name:
                            String(
                                employee.name ?? ""
                            ).trim(),

                        checkIn: null,

                        checkOut: null,

                        reason: ""

                    };

                }
            );


        //==================================================
        // Remove Empty Employees
        //==================================================

        participants =
            participants.filter(
                participant =>

                    participant.id !== "" ||

                    participant.name !== ""

            );


        //==================================================
        // Re-number Participants
        //==================================================

        participants.forEach(
            (participant, index) => {

                participant.no =
                    index + 1;

            }
        );


        //==================================================
        // Enable Search
        //==================================================

        searchInput.disabled = false;


        //==================================================
        // Update Import Status
        //==================================================

        document.getElementById(
            "importStatus"
        ).innerHTML =

        `

            <i class="bi bi-check-circle-fill"></i>

            ${file.name}

            <br>

            ${participants.length}
            employees imported successfully.

        `;


        //==================================================
        // Clear Search
        //==================================================

        searchInput.value = "";

        searchResult.innerHTML = "";


        //==================================================
        // Render Full Employee List
        //==================================================

        renderTable();

        updateSummary();

    };


    reader.readAsBinaryString(file);

}

//======================================================
// Render Absent With Reason
//======================================================

function renderAbsentWithReason(){

    const tbody =
        document.getElementById(
            "absentReasonBody"
        );

    if(!tbody){
        return;
    }


    const absentEmployees =
        participants.filter(
            p =>
                !p.checkIn &&
                p.reason &&
                p.reason.trim() !== ""
        );


    //==================================================
    // No Absent With Reason
    //==================================================

    if(absentEmployees.length === 0){

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    class="text-muted">

                    No absent employees with reason.

                </td>

            </tr>

        `;

        return;

    }


    //==================================================
    // Render List
    //==================================================

    tbody.innerHTML = "";


    absentEmployees.forEach(
        (participant, index) => {

            tbody.innerHTML += `

                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${participant.id}
                    </td>

                    <td>
                        ${participant.name}
                    </td>

                    <td
                        class="reason-cell">

                        ${participant.reason}

                    </td>

                </tr>

            `;

        }
    );

}



//======================================================
// Search Employee for Check-In
//======================================================

searchInput.addEventListener(
    "input",
    searchEmployee
);


function searchEmployee() {

    const keyword =

        searchInput.value
            .trim()
            .toLowerCase();


    // Clear previous results

    searchResult.innerHTML = "";


    // Empty search

    if (keyword === "") {

        return;

    }


    //==================================================
    // Search Participants
    //==================================================

    const filtered =

        participants

            .filter(
                participant => {

                    const id =

                        String(
                            participant.id
                        )
                        .toLowerCase();


                    const name =

                        String(
                            participant.name
                        )
                        .toLowerCase();


                    return (

                        id.includes(keyword)

                        ||

                        name.includes(keyword)

                    );

                }
            )


            //==================================================
            // Only Show Employees Who Have NOT Checked In
            //==================================================

            .filter(
                participant =>
                    !participant.checkIn
            )


            //==================================================
            // Maximum 5 Suggestions
            //==================================================

            .slice(0, 5);



    //==================================================
    // No Result
    //==================================================

    if (filtered.length === 0) {

        searchResult.innerHTML =

        `

            <div
                class="list-group-item text-muted">

                No employee found.

            </div>

        `;

        return;

    }


    //==================================================
    // Display Search Results
    //==================================================

    filtered.forEach(
        participant => {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";


            button.className =
                "list-group-item " +
                "list-group-item-action";


            button.innerHTML =

            `

                <div class="fw-bold">

                    ${participant.id}

                </div>

                <small>

                    ${participant.name}

                </small>

            `;


            //==================================================
            // Check In When Selected
            //==================================================

            button.onclick = function() {

                checkInFromSearch(
                    participant.no
                );

            };


            searchResult.appendChild(
                button
            );

        }
    );

}



//======================================================
// Check In From Search
//======================================================

function checkInFromSearch(no) {

    const participant =

        participants.find(
            p => p.no === no
        );


    if (!participant) {

        return;

    }


    //==================================================
    // Prevent Duplicate Check-In
    //==================================================

    if (participant.checkIn) {

        return;

    }


    //==================================================
    // Check In
    //==================================================

    participant.checkIn =
        new Date();


    //==================================================
    // Clear Search
    //==================================================

    searchInput.value = "";

    searchResult.innerHTML = "";


    //==================================================
    // Refresh Table
    //==================================================

    renderTable();

}



//======================================================
// Hide Search Dropdown
//======================================================

document.addEventListener(
    "click",
    function(e) {

        if (

            !searchResult.contains(
                e.target
            )

            &&

            e.target !== searchInput

        ) {

            searchResult.innerHTML = "";

        }

    }
);



//======================================================
// Utility
//======================================================

function formatTime(time) {

    if (!time) {

        return "-";

    }


    return time.toLocaleTimeString(
        "en-GB",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}



//======================================================
// Get Participant Status
//======================================================

function getStatus(participant) {

    if (participant.checkOut) {

        return `

            <span
                class="badge bg-primary">

                Completed

            </span>

        `;

    }


    if (participant.checkIn) {

        return `

            <span
                class="badge bg-warning text-dark">

                Present

            </span>

        `;

    }


    return `

        <span
            class="badge bg-danger">

            Absent

        </span>

    `;

}





//======================================================
// Remove Participant
//======================================================

function removeParticipant(no){

    if(!confirm("Remove this participant?")){

        return;

    }

    participants =

    participants.filter(p=>p.no!==no);

    //--------------------------------------------------
    // Re-number
    //--------------------------------------------------

    participants.forEach((p,index)=>{

        p.no=index+1;

    });

    renderTable();

}



//======================================================
// Render Table
//======================================================

function renderTable(){

    const tbody =

    document.getElementById("tableBody");

    tbody.innerHTML="";

    participants.forEach(participant=>{

        tbody.innerHTML +=

        `

        <tr>

            <td>

                ${participant.no}

            </td>

            <td>

                ${participant.id}

            </td>

            <td>

                ${participant.name}

            </td>

            <td>

                ${formatTime(participant.checkIn)}

            </td>

            <td>

                ${formatTime(participant.checkOut)}

            </td>

            <td>

                ${getStatus(participant)}

            </td>

            
            <td class="reason-cell">

                ${participant.reason || "-"}

            </td>
            <td>

            <button
                class="btn btn-success btn-sm"
                onclick="checkIn(${participant.no})"
                ${participant.checkIn ? "disabled" : ""}>

                Check In

            </button>

            <button
                class="btn btn-danger btn-sm ms-1"
                onclick="checkOut(${participant.no})"
                ${(!participant.checkIn || participant.checkOut) ? "disabled" : ""}>

                Check Out

            </button>

            <button
                class="btn btn-warning btn-sm ms-1"
                onclick="openReasonModal(${participant.no})">

                Reason

            </button>

            <button
                class="btn btn-outline-secondary btn-sm ms-1"
                onclick="removeParticipant(${participant.no})">

                <i class="bi bi-trash"></i>

            </button>

        </td>

        </tr>

        `;

    });

    updateSummary();

}



//======================================================
// Check In
//======================================================

function checkIn(no){

    const participant =

    participants.find(p=>p.no===no);

    if(!participant){

        return;

    }

    if(!participant.checkIn){

        participant.checkIn = new Date();

    }

    renderTable();

}



//======================================================
// Check Out
//======================================================

function checkOut(no){

    const participant =

    participants.find(p=>p.no===no);

    if(!participant){

        return;

    }

    if(

        participant.checkIn

        &&

        !participant.checkOut

    ){

        participant.checkOut = new Date();

    }

    renderTable();

}



//======================================================
// Attendance Summary
//======================================================

function updateSummary(){

    const total =
        participants.length;

    const checkedIn =
        participants.filter(
            p => p.checkIn
        ).length;

    const checkedOut =
        participants.filter(
            p => p.checkOut
        ).length;

    const absent =
        participants.filter(
            p => !p.checkIn
        ).length;

    // ==============================================
    // Absent With Reason
    // ==============================================

    const absentWithReason =
        participants.filter(
            p =>
                !p.checkIn &&
                p.reason &&
                p.reason.trim() !== ""
        ).length;


    // ==============================================
    // Update Summary Cards
    // ==============================================

    document.getElementById(
        "totalParticipants"
    ).innerHTML =
        total;

    document.getElementById(
        "checkedIn"
    ).innerHTML =
        checkedIn;

    document.getElementById(
        "checkedOut"
    ).innerHTML =
        checkedOut;

    document.getElementById(
        "absent"
    ).innerHTML =
        absent;


    // ==============================================
    // Absent With Reason Card
    // ==============================================

    const absentWithReasonElement =
        document.getElementById(
            "absentWithReason"
        );

    if(absentWithReasonElement){

        absentWithReasonElement.innerHTML =
            absentWithReason;

    }
    renderAbsentWithReason();

}



//======================================================
// Initial
//======================================================

renderTable();

function exportPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF("p", "mm", "a4");

    // ==================================================
    // Set Times New Roman
    // ==================================================

    doc.setFont("times", "normal");

    // ==================================================
    // Meeting Information
    // ==================================================

    const meetingTitle =
        document.getElementById("meetingTitle").value.trim()
        || "Untitled Meeting";

    const meetingDate =
        document.getElementById("meetingDate").value
        || "-";

    const startTime =
        document.getElementById("startTime").value
        || "-";

    const endTime =
        document.getElementById("endTime").value
        || "-";

    const organizer =
        document.getElementById("organizer").value.trim()
        || "-";

    const location =
        document.getElementById("location").value.trim()
        || "-";

    const meetingStatus =
        document.getElementById("meetingStatus").value
        || "-";


    // ==================================================
    // Meeting Summary
    // ==================================================

    const discussion =
        document.getElementById("discussion").value.trim()
        || "-";

    const decision =
        document.getElementById("decision").value.trim()
        || "-";

    const actionItems =
        document.getElementById("actionItems").value.trim()
        || "-";


    // ==================================================
    // Attendance Data
    // ==================================================

    const rows = [];

    participants.forEach((participant, index) => {

        let status = "Absent";

        if (participant.checkOut) {

            status = "Completed";

        } else if (participant.checkIn) {

            status = "Present";

        }

        rows.push([

            index + 1,

            participant.id || "-",

            participant.name || "-",

            formatTime(participant.checkIn),

            formatTime(participant.checkOut),

            status,

            participant.reason || "-"

        ]);

    });


    // ==================================================
    // Attendance Statistics
    // ==================================================

    const total =
        participants.length;

    const checkedIn =
        participants.filter(
            p => p.checkIn
        ).length;

    const checkedOut =
        participants.filter(
            p => p.checkOut
        ).length;

    const absent =
        participants.filter(
            p => !p.checkIn
        ).length;

    const absentWithReason =
        participants.filter(
            p =>
                !p.checkIn &&
                p.reason &&
                p.reason.trim() !== ""
        );


    // ==================================================
    // PDF Title
    // ==================================================

    doc.setFont("times", "bold");

    doc.setFontSize(20);

    doc.text(
        "Meeting Attendance Report",
        105,
        18,
        {
            align: "center"
        }
    );


    // Meeting title

    doc.setFontSize(14);

    doc.setFont("times", "bold");

    doc.text(
        meetingTitle,
        105,
        28,
        {
            align: "center"
        }
    );


    // Divider

    doc.setDrawColor(180);

    doc.line(
        14,
        35,
        196,
        35
    );


    // ==================================================
    // Meeting Information
    // ==================================================

    let y = 45;

    doc.setFont("times", "bold");

    doc.setFontSize(13);

    doc.text(
        "Meeting Information",
        14,
        y
    );


    y += 8;

    doc.setFont("times", "normal");

    doc.setFontSize(11);

    doc.text(
        "Meeting : " + meetingTitle,
        14,
        y
    );

    y += 7;

    doc.text(
        "Date : " + meetingDate,
        14,
        y
    );

    y += 7;

    doc.text(
        "Time : " + startTime + " - " + endTime,
        14,
        y
    );

    y += 7;

    doc.text(
        "Organizer : " + organizer,
        14,
        y
    );

    y += 7;

    doc.text(
        "Location : " + location,
        14,
        y
    );

    y += 7;

    doc.text(
        "Status : " + meetingStatus,
        14,
        y
    );


    // ==================================================
    // Meeting Summary
    // ==================================================

    y += 12;

    doc.setFont("times", "bold");

    doc.setFontSize(13);

    doc.text(
        "Meeting Summary",
        14,
        y
    );


    // ==================================================
    // Discussion
    // ==================================================

    y += 9;

    doc.setFont("times", "bold");

    doc.setFontSize(11);

    doc.text(
        "Discussion",
        14,
        y
    );


    y += 7;

    doc.setFont("times", "normal");

    const discussionText =
        doc.splitTextToSize(
            discussion,
            170
        );

    doc.text(
        discussionText,
        20,
        y
    );


    y +=
        discussionText.length * 6 + 8;


    // ==================================================
    // Decision
    // ==================================================

    doc.setFont("times", "bold");

    doc.text(
        "Decision",
        14,
        y
    );


    y += 7;

    doc.setFont("times", "normal");

    const decisionText =
        doc.splitTextToSize(
            decision,
            170
        );

    doc.text(
        decisionText,
        20,
        y
    );


    y +=
        decisionText.length * 6 + 8;


    // ==================================================
    // Action Items
    // ==================================================

    doc.setFont("times", "bold");

    doc.text(
        "Action Items",
        14,
        y
    );


    y += 7;

    doc.setFont("times", "normal");

    const actionText =
        doc.splitTextToSize(
            actionItems,
            170
        );

    doc.text(
        actionText,
        20,
        y
    );


    y +=
        actionText.length * 6 + 12;


    // ==================================================
    // Attendance List
    // ==================================================

    doc.setFont("times", "bold");

    doc.setFontSize(13);

    doc.text(
        "Attendance List",
        14,
        y
    );


    y += 5;


    // ==================================================
    // Attendance Table
    // ==================================================

    doc.autoTable({

        startY: y,

        head: [[

            "No",

            "Employee ID",

            "Name",

            "Check In",

            "Check Out",

            "Status",

            "Reason"

        ]],

        body: rows,

        theme: "grid",

        styles: {

            font: "times",

            fontStyle: "normal",

            fontSize: 9,

            halign: "center",

            valign: "middle",

            cellPadding: 2,

            lineColor: [180, 180, 180],

            lineWidth: 0.3

        },

        headStyles: {

            font: "times",

            fontStyle: "bold",

            fillColor: [
                13,
                110,
                253
            ],

            textColor: 255,

            halign: "center",

            valign: "middle",

            lineColor: [
                13,
                80,
                180
            ],

            lineWidth: 0.4

        },

        alternateRowStyles: {

            fillColor: [
                245,
                245,
                245
            ]

        },

        columnStyles: {

            0: {
                cellWidth: 10
            },

            1: {
                cellWidth: 27
            },

            2: {
                cellWidth: 40
            },

            3: {
                cellWidth: 22
            },

            4: {
                cellWidth: 22
            },

            5: {
                cellWidth: 22
            },

            6: {
                cellWidth: 39,
                halign: "left"
            }

        }

    });


    // ==================================================
    // Attendance Statistics
    // ==================================================

    y =
        doc.lastAutoTable.finalY + 15;


    //==================================================
    // Check Page Space
    //==================================================

    if (y > 250) {

        doc.addPage();

        y = 20;

    }


    //==================================================
    // Statistics Title
    //==================================================

    doc.setFont(
        "times",
        "bold"
    );

    doc.setFontSize(13);

    doc.text(
        "Attendance Statistics",
        14,
        y
    );


    y += 10;


    //==================================================
    // Statistics
    //==================================================

    doc.setFont(
        "times",
        "normal"
    );

    doc.setFontSize(11);

    doc.text(
        "Total Participants : " + total,
        14,
        y
    );


    y += 7;

    doc.text(
        "Checked In : " + checkedIn,
        14,
        y
    );


    y += 7;

    doc.text(
        "Checked Out : " + checkedOut,
        14,
        y
    );


    y += 7;

    doc.text(
        "Absent : " + absent,
        14,
        y
    );


    //==================================================
    // Absent With Reason Count
    //==================================================

    y += 7;

    doc.text(
        "Absent With Reason : " +
        absentWithReason.length,
        14,
        y
    );


    //==================================================
    // Absent With Reason Table
    //==================================================

    y += 12;


    //==================================================
    // Check Page Space
    //==================================================

    if (
        absentWithReason.length > 0 &&
        y > 250
    ) {

        doc.addPage();

        y = 20;

    }


    //==================================================
    // Absent With Reason Title
    //==================================================

    if (absentWithReason.length > 0) {

        doc.setFont(
            "times",
            "bold"
        );

        doc.setFontSize(13);

        doc.text(
            "Absent With Reason",
            14,
            y
        );


        y += 5;


        //==================================================
        // Create Absent With Reason Rows
        //==================================================

        const absentReasonRows =

            absentWithReason.map(
                (participant, index) => {

                    return [

                        index + 1,

                        participant.id || "-",

                        participant.name || "-",

                        participant.reason || "-"

                    ];

                }
            );


        //==================================================
        // Absent With Reason Table
        //==================================================

        doc.autoTable({

            startY: y,

            head: [[

                "No",

                "Employee ID",

                "Name",

                "Reason"

            ]],

            body: absentReasonRows,

            theme: "grid",

            styles: {

                font: "times",

                fontStyle: "normal",

                fontSize: 10,

                halign: "center",

                valign: "middle",

                cellPadding: 3,

                lineColor: [
                    180,
                    180,
                    180
                ],

                lineWidth: 0.3

            },

            headStyles: {

                font: "times",

                fontStyle: "bold",

                fillColor: [
                    255,
                    193,
                    7
                ],

                textColor: [
                    0,
                    0,
                    0
                ],

                halign: "center",

                valign: "middle",

                lineColor: [
                    200,
                    150,
                    0
                ],

                lineWidth: 0.4

            },

            alternateRowStyles: {

                fillColor: [
                    248,
                    248,
                    248
                ]

            },

            columnStyles: {

                0: {
                    cellWidth: 12
                },

                1: {
                    cellWidth: 35
                },

                2: {
                    cellWidth: 50
                },

                3: {
                    cellWidth: 85,

                    halign: "left"

                }

            }

        });

    }


    // ==================================================
    // Footer
    // ==================================================

    const generatedTime =
        new Date().toLocaleString();


    doc.setDrawColor(180);

    doc.line(
        14,
        280,
        196,
        280
    );


    doc.setFont(
        "times",
        "normal"
    );

    doc.setFontSize(9);

    doc.setTextColor(
        100
    );

    doc.text(
        "Generated on: " + generatedTime,
        105,
        286,
        {
            align: "center"
        }
    );


    // Reset text color

    doc.setTextColor(
        0
    );


    // ==================================================
    // Save PDF
    // ==================================================

    const safeFileName =
        meetingTitle
            .replace(/[\\/:*?"<>|]/g, "")
            .replace(/\s+/g, "_");

    doc.save(
        safeFileName +
        "_Attendance_Report.pdf"
    );

}

function openReasonModal(no){

    currentReasonParticipant =

    participants.find(

        p=>p.no===no

    );

    if(!currentReasonParticipant){

        return;

    }

    document.getElementById(

        "reasonEmployeeName"

    ).innerHTML =

    currentReasonParticipant.id +

    " - " +

    currentReasonParticipant.name;

    document.getElementById(

        "reasonText"

    ).value =

    currentReasonParticipant.reason;

    const modal =

    new bootstrap.Modal(

        document.getElementById(

            "reasonModal"

        )

    );

    modal.show();

}

function saveReason(){

    if(!currentReasonParticipant){
        return;
    }

    const value =
        document.getElementById("reasonText").value;

    console.log(value);
    console.log(JSON.stringify(value));

    currentReasonParticipant.reason = value;

    bootstrap.Modal.getInstance(
        document.getElementById("reasonModal")
    ).hide();

    renderTable();
}
