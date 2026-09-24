// ======================================================
// LANGUAGE MODE
// English <-> Vietnamese
// ======================================================

const LANGUAGE_STORAGE_KEY =
    "meetingAttendanceLanguage";


const translations = {

    en: {

        "Meeting Attendance System":
            "Meeting Attendance System",

        "Meeting History":
            "Meeting History",

        "Meeting Information":
            "Meeting Information",

        "Meeting Title":
            "Meeting Title",

        "Enter meeting title":
            "Enter meeting title",

        "Meeting Date":
            "Meeting Date",

        "Start Time":
            "Start Time",

        "Organizer":
            "Organizer",

        "Organizer name":
            "Organizer name",

        "Location":
            "Location",

        "Meeting location":
            "Meeting location",

        "Employee Attendance":
            "Employee Attendance",

        "Search Employee":
            "Search Employee",

        "Search by Employee ID or Name":
            "Search by Employee ID or Name",

        "Attendance Status":
            "Attendance Status",

        "Participating":
            "Participating",

        "Absent with Reason":
            "Absent with Reason",

        "Add Participant":
            "Add Participant",

        "Absence Reason":
            "Absence Reason",

        "Enter absence reason...":
            "Enter absence reason...",

        "Loading employee database...":
            "Loading employee database...",

        "Participants":
            "Participants",

        "Employee ID":
            "Employee ID",

        "Name":
            "Name",

        "Position":
            "Position",

        "Reason":
            "Reason",

        "Action":
            "Action",

        "Save Meeting":
            "Save Meeting",

        "Export Attendance Report":
            "Export Attendance Report",

        "Participating Employees":
            "Participating Employees",

        "Absent With Reason":
            "Absent With Reason",

        "Back to Meeting":
            "Back to Meeting",

        "Saved Meeting Reports":
            "Saved Meeting Reports",

        "Meeting Name":
            "Meeting Name",

        "Date":
            "Date",

        "Meeting Report":
            "Meeting Report",

        "PDF not available":
            "PDF not available",

        "View PDF":
            "View PDF",

        "No meeting history found.":
            "No meeting history found.",

        "Meeting Statistics":
            "Meeting Statistics",

        "From Date":
            "From Date",

        "To Date":
            "To Date",

        "Employee Name / ID":
            "Employee Name / ID",

        "Search employee...":
            "Search employee...",

        "Generate Statistics":
            "Generate Statistics",

        "Meeting Count":
            "Meeting Count",

        "Employee Count":
            "Employee Count",

        "Total Meetings":
            "Total Meetings",

        "Select a date range and generate statistics.":
            "Select a date range and generate statistics.",

        "No meeting records found for the selected date range.":
            "No meeting records found for the selected date range.",

        "No employee found.":
            "No employee found.",

        "No employee found":
            "No employee found",

        "Remove":
            "Remove",

        "Remove employee from the meeting?":
            "Remove employee from the meeting?",

        "Generated on: ":
            "Generated on: "

    },


    vi: {

        "Meeting Attendance System":
            "Hệ thống điểm danh cuộc họp",

        "Meeting History":
            "Lịch sử cuộc họp",

        "Meeting Information":
            "Thông tin cuộc họp",

        "Meeting Title":
            "Tên cuộc họp",

        "Enter meeting title":
            "Nhập tên cuộc họp",

        "Meeting Date":
            "Ngày họp",

        "Start Time":
            "Thời gian bắt đầu",

        "Organizer":
            "Người tổ chức",

        "Organizer name":
            "Tên người tổ chức",

        "Location":
            "Địa điểm",

        "Meeting location":
            "Địa điểm cuộc họp",

        "Employee Attendance":
            "Điểm danh nhân viên",

        "Search Employee":
            "Tìm nhân viên",

        "Search by Employee ID or Name":
            "Tìm theo mã nhân viên hoặc tên",

        "Attendance Status":
            "Trạng thái tham dự",

        "Participating":
            "Tham dự",

        "Absent with Reason":
            "Vắng có lý do",

        "Add Participant":
            "Thêm người tham dự",

        "Absence Reason":
            "Lý do vắng",

        "Enter absence reason...":
            "Nhập lý do vắng...",

        "Loading employee database...":
            "Đang tải cơ sở dữ liệu nhân viên...",

        "Participants":
            "Người tham dự",

        "Employee ID":
            "Mã nhân viên",

        "Name":
            "Họ và tên",

        "Position":
            "Chức vụ",

        "Reason":
            "Lý do",

        "Action":
            "Thao tác",

        "Save Meeting":
            "Lưu cuộc họp",

        "Export Attendance Report":
            "Xuất báo cáo điểm danh",

        "Participating Employees":
            "Nhân viên tham dự",

        "Absent With Reason":
            "Nhân viên vắng có lý do",

        "Back to Meeting":
            "Quay lại cuộc họp",

        "Saved Meeting Reports":
            "Báo cáo cuộc họp đã lưu",

        "Meeting Name":
            "Tên cuộc họp",

        "Date":
            "Ngày",

        "Meeting Report":
            "Báo cáo cuộc họp",

        "PDF not available":
            "Chưa có PDF",

        "View PDF":
            "Xem PDF",

        "No meeting history found.":
            "Không tìm thấy lịch sử cuộc họp.",

        "Meeting Statistics":
            "Thống kê cuộc họp",

        "From Date":
            "Từ ngày",

        "To Date":
            "Đến ngày",

        "Employee Name / ID":
            "Tên / Mã nhân viên",

        "Search employee...":
            "Tìm kiếm nhân viên...",

        "Generate Statistics":
            "Tạo thống kê",

        "Meeting Count":
            "Số cuộc họp",

        "Employee Count":
            "Số nhân viên",

        "Total Meetings":
            "Tổng số cuộc họp",

        "Select a date range and generate statistics.":
            "Chọn khoảng thời gian và tạo thống kê.",

        "No meeting records found for the selected date range.":
            "Không tìm thấy cuộc họp nào trong khoảng thời gian đã chọn.",

        "No employee found.":
            "Không tìm thấy nhân viên.",

        "No employee found":
            "Không tìm thấy nhân viên",

        "Remove":
            "Xóa",

        "Remove employee from the meeting?":
            "Xóa nhân viên khỏi cuộc họp?",

        "Generated on: ":
            "Tạo lúc: "

    }

};


// ======================================================
// DYNAMIC MESSAGES
// ======================================================

const dynamicMessages = {

    en: {

        databaseLoaded:
            function (n) {
                return `${n} employees loaded successfully.`;
            },

        databaseFailed:
            "Failed to load employee database.",

        pleaseSelectEmployee:
            "Please select an employee.",

        duplicateEmployee:
            "This employee has already been added.",

        absenceReasonRequired:
            "Please enter the absence reason.",

        meetingTitleRequired:
            "Please enter the meeting title.",

        meetingDateRequired:
            "Please enter the meeting date.",

        participantRequired:
            "Please add at least one participant.",

        meetingSaved:
            "Meeting saved successfully.",

        exportRequired:
            "Please add participants before exporting.",

        jsPDFMissing:
            "jsPDF is not loaded.",

        statsDatesRequired:
            "Please select both From Date and To Date.",

        statsDateOrder:
            "From Date cannot be later than To Date."

    },


    vi: {

        databaseLoaded:
            function (n) {
                return `${n} nhân viên đã được tải thành công.`;
            },

        databaseFailed:
            "Không thể tải cơ sở dữ liệu nhân viên.",

        pleaseSelectEmployee:
            "Vui lòng chọn nhân viên.",

        duplicateEmployee:
            "Nhân viên này đã được thêm.",

        absenceReasonRequired:
            "Vui lòng nhập lý do vắng.",

        meetingTitleRequired:
            "Vui lòng nhập tên cuộc họp.",

        meetingDateRequired:
            "Vui lòng nhập ngày họp.",

        participantRequired:
            "Vui lòng thêm ít nhất một người tham dự.",

        meetingSaved:
            "Đã lưu cuộc họp thành công.",

        exportRequired:
            "Vui lòng thêm người tham dự trước khi xuất.",

        jsPDFMissing:
            "Chưa tải được jsPDF.",

        statsDatesRequired:
            "Vui lòng chọn cả Từ ngày và Đến ngày.",

        statsDateOrder:
            "Ngày bắt đầu không thể sau ngày kết thúc."

    }

};


// ======================================================
// CURRENT LANGUAGE
// ======================================================

let currentLanguage =
    localStorage.getItem(
        LANGUAGE_STORAGE_KEY
    ) || "en";


// ======================================================
// ORIGINAL TEXT STORAGE
// ======================================================

const originalTextNodes =
    new WeakMap();


// ======================================================
// TRANSLATE TEXT NODE
// ======================================================

function translateTextNode(node) {

    const text =
        node.nodeValue;

    if (
        !text ||
        !text.trim()
    ) {
        return;
    }


    if (
        !originalTextNodes.has(node)
    ) {

        originalTextNodes.set(
            node,
            text
        );

    }


    const original =
        originalTextNodes.get(node);


    const leading =
        original.match(
            /^\s*/
        )?.[0] || "";


    const trailing =
        original.match(
            /\s*$/
        )?.[0] || "";


    const core =
        original.trim();


    const translated =
        translations[
            currentLanguage
        ][core];


    if (translated) {

        node.nodeValue =
            leading +
            translated +
            trailing;

    }

    else {

        node.nodeValue =
            original;

    }

}


// ======================================================
// TRANSLATE STATIC CONTENT
// ======================================================

function translateStaticContent() {

    const walker =
        document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );


    const nodes = [];

    let node;


    while (
        (node = walker.nextNode())
    ) {

        nodes.push(node);

    }


    nodes.forEach(
        translateTextNode
    );


    document
        .querySelectorAll(
            "input[placeholder], textarea[placeholder]"
        )
        .forEach(
            function (element) {

                const original =
                    element.getAttribute(
                        "data-original-placeholder"
                    ) ||
                    element.placeholder;


                if (
                    !element.hasAttribute(
                        "data-original-placeholder"
                    )
                ) {

                    element.setAttribute(
                        "data-original-placeholder",
                        original
                    );

                }


                const source =
                    element.getAttribute(
                        "data-original-placeholder"
                    );


                element.placeholder =
                    translations[
                        currentLanguage
                    ][source] ||
                    source;

            }
        );

}


// ======================================================
// TRANSLATE DYNAMIC CONTENT
// ======================================================

function translateDynamicContent() {

    const databaseStatus =
        document.getElementById(
            "databaseStatus"
        );


    if (databaseStatus) {

        const text =
            databaseStatus.textContent.trim();


        const englishMatch =
            text.match(
                /^([0-9]+) employees loaded successfully\.$/
            );


        const vietnameseMatch =
            text.match(
                /^([0-9]+) nhân viên đã được tải thành công\.$/
            );


        if (
            englishMatch ||
            vietnameseMatch
        ) {

            const count =
                englishMatch
                    ? englishMatch[1]
                    : vietnameseMatch[1];


            databaseStatus.innerHTML =
                `<i class="bi bi-check-circle-fill"></i> ${
                    dynamicMessages[
                        currentLanguage
                    ].databaseLoaded(count)
                }`;

        }


        if (
            text.includes(
                "Failed to load employee database."
            ) ||
            text.includes(
                "Không thể tải cơ sở dữ liệu nhân viên."
            )
        ) {

            databaseStatus.innerHTML =
                `<i class="bi bi-x-circle-fill"></i> ${
                    dynamicMessages[
                        currentLanguage
                    ].databaseFailed
                }`;

        }

    }

}


// ======================================================
// APPLY LANGUAGE
// ======================================================

function applyLanguage() {

    document.documentElement.lang =
        currentLanguage === "vi"
            ? "vi"
            : "en";


    translateStaticContent();

    translateDynamicContent();


    document
        .querySelectorAll(
            ".language-toggle-btn"
        )
        .forEach(
            function (button) {

                button.innerHTML =
                    currentLanguage === "en"
                        ? `<i class="bi bi-translate"></i> VI`
                        : `<i class="bi bi-translate"></i> EN`;


                button.setAttribute(
                    "aria-label",
                    currentLanguage === "en"
                        ? "Switch to Vietnamese"
                        : "Chuyển sang tiếng Anh"
                );

            }
        );

}


// ======================================================
// TOGGLE LANGUAGE
// ======================================================

function toggleLanguage() {

    currentLanguage =
        currentLanguage === "en"
            ? "vi"
            : "en";


    localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        currentLanguage
    );


    applyLanguage();

}


// ======================================================
// INSTALL LANGUAGE BUTTON
// ======================================================

function installLanguageButton() {

    const historyButtons =
        document.querySelectorAll(
            'button[onclick="toggleMeetingHistory()"]'
        );


    historyButtons.forEach(
        function (historyButton) {

            const container =
                historyButton.parentElement;


            if (
                !container ||
                container.querySelector(
                    ".language-toggle-btn"
                )
            ) {

                return;

            }


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "btn btn-light ms-2 language-toggle-btn";


            button.onclick =
                toggleLanguage;


            container.appendChild(
                button
            );

        }
    );

}


// ======================================================
// TRANSLATE ALERT MESSAGE
// ======================================================

function translateAlertMessage(
    message
) {

    const text =
        String(message || "");


    const m =
        dynamicMessages[
            currentLanguage
        ];


    const map = {

        "Please select an employee.":
            m.pleaseSelectEmployee,

        "This employee has already been added.":
            m.duplicateEmployee,

        "Please enter the absence reason.":
            m.absenceReasonRequired,

        "Please enter the meeting title.":
            m.meetingTitleRequired,

        "Please enter the meeting date.":
            m.meetingDateRequired,

        "Please add at least one participant.":
            m.participantRequired,

        "Meeting saved successfully.":
            m.meetingSaved,

        "Please add participants before exporting.":
            m.exportRequired,

        "jsPDF is not loaded.":
            m.jsPDFMissing,

        "Please select both From Date and To Date.":
            m.statsDatesRequired,

        "From Date cannot be later than To Date.":
            m.statsDateOrder

    };


    return (
        map[text] ||
        text
    );

}


// ======================================================
// OVERRIDE ALERT
// ======================================================

const originalAlert =
    window.alert;


window.alert =
    function (message) {

        originalAlert(
            translateAlertMessage(
                message
            )
        );

    };


// ======================================================
// OBSERVE DYNAMIC DOM CHANGES
// ======================================================

const languageObserver =
    new MutationObserver(
        function () {

            if (!document.body) {
                return;
            }


            languageObserver.disconnect();


            applyLanguage();


            languageObserver.observe(
                document.body,
                {
                    childList: true,
                    subtree: true
                }
            );

        }
    );


// ======================================================
// INITIALIZE LANGUAGE
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        installLanguageButton();

        applyLanguage();


        languageObserver.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );

    }
);


// ======================================================
// EXPOSE FUNCTIONS
// ======================================================

window.toggleLanguage =
    toggleLanguage;


window.applyLanguage =
    applyLanguage;
